'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import JSZip from 'jszip'

/* ================= TYPES ================= */

type IncubationRequest = {
  id: string
  name: string
  contact_number: string
  request_type: '3d_printing' | 'laser_printing'
  status: 'submitted' | 'approved' | 'rejected' | 'completed'
  estimated_cost: number
  preferred_date: string
  preferred_time: string
  created_at: string

  admin_remarks: string | null

  sliced_model_screenshot_url: string | null
  payment_screenshot_url: string | null
  design_files_urls: string[] | null
}

/* ================= STATUS STYLES ================= */

const STATUS_STYLE: Record<string, string> = {
  submitted: 'bg-yellow-500/20 text-yellow-400',
  approved: 'bg-blue-500/20 text-blue-400',
  rejected: 'bg-red-500/20 text-red-400',
  completed: 'bg-green-500/20 text-green-400',
}

/* ================= ZIP DOWNLOAD ================= */

async function downloadZip(req: IncubationRequest) {
  const zip = new JSZip()
  const folder = zip.folder(`incubation-request-${req.id}`)
  if (!folder) return

  const files: { url: string; name: string }[] = []

  if (req.sliced_model_screenshot_url)
    files.push({ url: req.sliced_model_screenshot_url, name: 'sliced-model.png' })

  if (req.payment_screenshot_url)
    files.push({ url: req.payment_screenshot_url, name: 'payment-proof.png' })

  req.design_files_urls?.forEach((url, i) =>
    files.push({ url, name: `design-file-${i + 1}.stl` })
  )

  for (const file of files) {
    const blob = await (await fetch(file.url)).blob()
    folder.file(file.name, blob)
  }

  const content = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(content)
  a.download = `incubation-request-${req.id}.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

/* ================= PAGE ================= */

export default function AdminIncubationRequestsPage() {
  const [requests, setRequests] = useState<IncubationRequest[]>([])
  const [loading, setLoading] = useState(true)

  const [tab, setTab] = useState<'pending' | 'past'>('pending')
  const [search, setSearch] = useState('')

  const [remarksFor, setRemarksFor] = useState<IncubationRequest | null>(null)
  const [remarksText, setRemarksText] = useState('')

  const [rejectFor, setRejectFor] = useState<IncubationRequest | null>(null)

  /* ================= FETCH ================= */

  const fetchRequests = async () => {
    const { data } = await supabase
      .from('incubation_requests')
      .select('*')
      .order('created_at', { ascending: false })

    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchRequests()

    const channel = supabase
      .channel('admin-incubation-requests')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'incubation_requests' },
        fetchRequests
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  /* ================= FILTER ================= */

  const filteredRequests = useMemo(() => {
    return requests
      .filter(r =>
        tab === 'pending'
          ? r.status === 'submitted'
          : r.status !== 'submitted'
      )
      .filter(r =>
        `${r.name} ${r.contact_number}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  }, [requests, tab, search])

  /* ================= STATUS UPDATE ================= */

  const updateStatus = async (
    req: IncubationRequest,
    status: IncubationRequest['status']
  ) => {
    await supabase
      .from('incubation_requests')
      .update({ status })
      .eq('id', req.id)

    setRequests(prev =>
      prev.map(r =>
        r.id === req.id ? { ...r, status } : r
      )
    )

    // auto move to Past tab (visual + logical)
    if (status !== 'submitted') {
      setTimeout(() => setTab('past'), 150)
    }
  }

  /* ================= REMARKS ================= */

  const saveRemarks = async () => {
    if (!remarksFor) return

    await supabase
      .from('incubation_requests')
      .update({ admin_remarks: remarksText })
      .eq('id', remarksFor.id)

    setRequests(prev =>
      prev.map(r =>
        r.id === remarksFor.id
          ? { ...r, admin_remarks: remarksText }
          : r
      )
    )

    setRemarksFor(null)
    setRemarksText('')
  }

  const deleteRemarks = async () => {
    if (!remarksFor) return

    await supabase
      .from('incubation_requests')
      .update({ admin_remarks: null })
      .eq('id', remarksFor.id)

    setRequests(prev =>
      prev.map(r =>
        r.id === remarksFor.id
          ? { ...r, admin_remarks: null }
          : r
      )
    )

    setRemarksFor(null)
    setRemarksText('')
  }

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      <h1 className="text-3xl font-semibold">Incubation Requests</h1>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setTab('pending')}
          className={`px-5 py-2 rounded-full text-sm ${
            tab === 'pending'
              ? 'bg-orange-500 text-black'
              : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          Pending Requests
        </button>

        <button
          onClick={() => setTab('past')}
          className={`px-5 py-2 rounded-full text-sm ${
            tab === 'past'
              ? 'bg-orange-500 text-black'
              : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          Past Requests
        </button>
      </div>

      {/* Search */}
      <input
        placeholder="Search name or contact number…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-sm bg-zinc-900 px-4 py-2 rounded-xl outline-none text-sm"
      />

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : filteredRequests.length === 0 ? (
        <p className="text-muted-foreground">No requests found</p>
      ) : (
        <div className="space-y-6 transition-all">
          {filteredRequests.map(req => (
            <div
              key={req.id}
              className="rounded-2xl bg-zinc-900/70 border border-white/5 p-6 flex flex-col sm:flex-row justify-between gap-6 transition-all"
            >
              {/* Left */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {req.request_type === '3d_printing'
                    ? '3D Printing'
                    : 'Laser Printing'}
                </h3>

                <p className="text-sm text-neutral-400"><b>Name:</b> {req.name}</p>
                <p className="text-sm text-neutral-400"><b>Contact:</b> {req.contact_number}</p>
                <p className="text-sm text-neutral-400">
                  <b>Slot:</b> {req.preferred_date} • {req.preferred_time}
                </p>

                {req.admin_remarks && (
                  <div className="mt-2 rounded-xl bg-orange-500/10 border border-orange-500/20 p-3 text-sm text-orange-300">
                    <b>Admin Remark:</b> {req.admin_remarks}
                  </div>
                )}

                <div className="flex gap-3 pt-3 flex-wrap">
                  <button
                    onClick={() => downloadZip(req)}
                    className="bg-orange-500 text-black px-4 py-1.5 rounded-full text-sm"
                  >
                    Download ZIP
                  </button>

                  <button
                    onClick={() => {
                      setRemarksFor(req)
                      setRemarksText(req.admin_remarks || '')
                    }}
                    className="text-sm text-orange-400 underline"
                  >
                    {req.admin_remarks ? 'Edit Remark' : 'Add Remark'}
                  </button>
                </div>
              </div>

              {/* Right */}
              {/* Right */}
<div className="flex flex-col items-start sm:items-end gap-3">
  <span className={`px-4 py-1 rounded-full text-xs ${STATUS_STYLE[req.status]}`}>
    {req.status.toUpperCase()}
  </span>

  {/* ✅ STATUS ACTIONS — AVAILABLE FOR PENDING + PAST */}
  <div className="flex gap-2 flex-wrap">
    {req.status !== 'approved' && (
      <button
        onClick={() => updateStatus(req, 'approved')}
        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-xs"
      >
        Approve
      </button>
    )}

    {req.status !== 'rejected' && (
      <button
        onClick={() => setRejectFor(req)}
        className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-xs"
      >
        Reject
      </button>
    )}

    {req.status !== 'completed' && (
      <button
        onClick={() => updateStatus(req, 'completed')}
        className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-xs"
      >
        Complete
      </button>
    )}
  </div>

  <span className="bg-zinc-800 px-4 py-1 rounded-full text-sm">
    ₹{req.estimated_cost}
  </span>
</div>

            </div>
          ))}
        </div>
      )}

      {/* Reject Confirmation */}
      {rejectFor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-red-400">
              Confirm Rejection
            </h3>
            <p className="text-sm text-neutral-400">
              Are you sure you want to reject this request?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRejectFor(null)}
                className="text-sm text-zinc-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateStatus(rejectFor, 'rejected')
                  setRejectFor(null)
                }}
                className="bg-red-500 text-black px-4 py-1.5 rounded-full text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remarks Modal */}
      {remarksFor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Admin Remarks</h3>

            <textarea
              value={remarksText}
              onChange={e => setRemarksText(e.target.value)}
              rows={4}
              className="w-full bg-zinc-800 rounded-xl p-3 text-sm outline-none"
              placeholder="Enter remarks…"
            />

            <div className="flex justify-between items-center">
              {remarksFor.admin_remarks && (
                <button
                  onClick={deleteRemarks}
                  className="text-sm text-red-400 underline"
                >
                  Delete Remark
                </button>
              )}

              <div className="flex gap-3 ml-auto">
                <button
                  onClick={() => setRemarksFor(null)}
                  className="text-sm text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  onClick={saveRemarks}
                  className="bg-orange-500 text-black px-4 py-1.5 rounded-full text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
