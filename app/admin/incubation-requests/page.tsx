'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import JSZip from 'jszip'

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const SKY      = (a = 1) => `rgba(56,189,248,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
const STATUS_FALLBACK = { label: "UNKNOWN",   color: DIMWHITE(0.3), bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" }
const STATUS_CFG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  submitted: { label: "SUBMITTED", color: AMBER(0.85), bg: AMBER(0.07), border: AMBER(0.28) },
  approved:  { label: "APPROVED",  color: SKY(0.85),   bg: SKY(0.07),   border: SKY(0.28)   },
  rejected:  { label: "REJECTED",  color: RED(0.85),   bg: RED(0.07),   border: RED(0.28)   },
  completed: { label: "COMPLETED", color: GREEN(0.85), bg: GREEN(0.07), border: GREEN(0.28) },
}

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
type IncubationRequest = {
  id: string; name: string; contact_number: string
  request_type: '3d_printing' | 'laser_printing'
  status: 'submitted' | 'approved' | 'rejected' | 'completed'
  estimated_cost: number; preferred_date: string; preferred_time: string
  created_at: string; admin_remarks: string | null
  sliced_model_screenshot_url: string | null
  payment_screenshot_url: string | null
  design_files_urls: string[] | null
}

/* ─────────────────────────────────────────
   ZIP DOWNLOAD — unchanged
───────────────────────────────────────── */
async function downloadZip(req: IncubationRequest) {
  const zip = new JSZip()
  const folder = zip.folder(`incubation-request-${req.id}`)
  if (!folder) return
  const files: { url: string; name: string }[] = []
  if (req.sliced_model_screenshot_url) files.push({ url: req.sliced_model_screenshot_url, name: 'sliced-model.png' })
  if (req.payment_screenshot_url)      files.push({ url: req.payment_screenshot_url,      name: 'payment-proof.png' })
  req.design_files_urls?.forEach((url, i) => files.push({ url, name: `design-file-${i + 1}.stl` }))
  for (const file of files) { const blob = await (await fetch(file.url)).blob(); folder.file(file.name, blob) }
  const content = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(content)
  a.download = `incubation-request-${req.id}.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

/* ─────────────────────────────────────────
   ACTION BUTTON
───────────────────────────────────────── */
function ActionBtn({ label, onClick, color, bg, border }: {
  label: string; onClick: () => void; color: string; bg: string; border: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em",
        padding: "6px 14px", background: hov ? bg : "transparent",
        borderTop: `1px solid ${border}`, borderRight: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`, borderLeft: "none",
        color, cursor: "pointer", position: "relative", overflow: "hidden",
        transition: "background 0.18s", whiteSpace: "nowrap" as const,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, opacity: hov ? 1 : 0.4, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ─────────────────────────────────────────
   TAB BUTTON
───────────────────────────────────────── */
function TabBtn({ label, active, onClick, count }: {
  label: string; active: boolean; onClick: () => void; count?: number
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em",
        padding: "9px 16px",
        background: active ? `rgba(255,176,0,0.09)` : hov ? `rgba(255,176,0,0.04)` : "transparent",
        borderTop:    `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
        borderRight:  `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
        borderBottom: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
        borderLeft:   "none",
        color: active ? AMBER(0.9) : DIMWHITE(0.3),
        cursor: "pointer", position: "relative", transition: "background 0.18s, color 0.18s",
      }}
    >
      {active && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)` }} />}
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
      {count !== undefined && (
        <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: active ? AMBER(0.85) : DIMWHITE(0.25), background: active ? AMBER(0.1) : "rgba(255,255,255,0.04)", padding: "0 5px", border: `1px solid ${active ? AMBER(0.2) : "rgba(255,255,255,0.06)"}` }}>
          {count}
        </span>
      )}
    </button>
  )
}

/* ─────────────────────────────────────────
   REQUEST CARD
───────────────────────────────────────── */
function RequestCard({ req, onApprove, onReject, onComplete, onDownload, onRemark }: {
  req: IncubationRequest
  onApprove: () => void; onReject: () => void; onComplete: () => void
  onDownload: () => void; onRemark: () => void
}) {
  const [hov, setHov] = useState(false)
  const cfg     = STATUS_CFG[req.status] ?? STATUS_FALLBACK
  const shortId = req.id.slice(0, 8).toUpperCase()
  const typeLabel = req.request_type === '3d_printing' ? '3D PRINTING' : 'LASER PRINTING'

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        background: hov ? `rgba(255,176,0,0.045)` : PANEL,
        border: `1px solid ${hov ? AMBER(0.25) : BORDER}`,
        transition: "border 0.22s, background 0.22s",
      }}
    >
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.5)}, transparent)` }} />}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1, background: `linear-gradient(to bottom, transparent, ${cfg.color}, transparent)`, opacity: hov ? 0.85 : 0.35, transition: "opacity 0.22s, width 0.15s" }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

      <div style={{ padding: "16px 18px 14px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16 }}>

          {/* ── LEFT ── */}
          <div style={{ flex: 1, minWidth: 240 }}>
            {/* eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.28) }}>INC·{shortId}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.18em", padding: "1px 7px", color: AMBER(0.6), border: `1px solid ${AMBER(0.2)}`, background: AMBER(0.05) }}>{typeLabel}</span>
            </div>

            {/* name */}
            <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: DIMWHITE(0.9), lineHeight: 1.1, marginBottom: 6 }}>
              {req.name}
            </div>

            {/* details */}
            {[
              { k: "CONTACT", v: req.contact_number },
              { k: "SLOT",    v: `${req.preferred_date} · ${req.preferred_time}` },
              { k: "CREATED", v: new Date(req.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
            ].map(d => (
              <div key={d.k} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.14em", color: AMBER(0.3), minWidth: 55 }}>{d.k}</span>
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: DIMWHITE(0.55) }}>{d.v}</span>
              </div>
            ))}

            {/* admin remark */}
            {req.admin_remarks && (
              <div style={{ marginTop: 10, padding: "8px 12px", background: AMBER(0.05), border: `1px solid ${AMBER(0.2)}`, borderLeft: "none", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, ${AMBER(0.7)}, transparent)` }} />
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.45), marginBottom: 3 }}>ADMIN REMARK</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: AMBER(0.7), lineHeight: 1.55 }}>{req.admin_remarks}</div>
              </div>
            )}

            {/* download + remark buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" as const }}>
              <button
                onClick={onDownload}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em",
                  padding: "7px 14px", background: AMBER(0.9), border: "none",
                  color: BG, fontWeight: 600, cursor: "pointer",
                  boxShadow: `0 0 12px ${AMBER(0.2)}`,
                }}
              >
                ↓ DOWNLOAD ZIP
              </button>

              <button
                onClick={onRemark}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em",
                  padding: "7px 14px", background: "transparent",
                  borderTop: `1px solid ${AMBER(0.18)}`, borderRight: `1px solid ${AMBER(0.18)}`,
                  borderBottom: `1px solid ${AMBER(0.18)}`, borderLeft: "none",
                  color: AMBER(0.5), cursor: "pointer",
                }}
              >
                {req.admin_remarks ? 'EDIT REMARK' : 'ADD REMARK'}
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, minWidth: 160 }}>
            {/* status badge */}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", padding: "3px 10px", color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, whiteSpace: "nowrap" as const }}>
              {cfg.label}
            </span>

            {/* cost */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, padding: "5px 10px", background: "rgba(0,0,0,0.2)", border: `1px solid ${AMBER(0.1)}` }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.15em", color: AMBER(0.3) }}>COST</span>
              <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: AMBER(0.85) }}>₹{req.estimated_cost}</span>
            </div>

            {/* action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              {req.status !== 'approved'  && <ActionBtn label="APPROVE"  onClick={onApprove}  color={SKY(0.8)}   bg={SKY(0.08)}   border={SKY(0.28)}   />}
              {req.status !== 'rejected'  && <ActionBtn label="REJECT"   onClick={onReject}   color={RED(0.8)}   bg={RED(0.08)}   border={RED(0.28)}   />}
              {req.status !== 'completed' && <ActionBtn label="COMPLETE" onClick={onComplete} color={GREEN(0.8)} bg={GREEN(0.08)} border={GREEN(0.28)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   REJECT CONFIRM MODAL
───────────────────────────────────────── */
function RejectModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 360, background: BG, border: `1px solid ${RED(0.3)}`, boxShadow: `0 32px 64px rgba(0,0,0,0.7)`, position: "relative", overflow: "hidden" }}>
        <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${RED(0.5)}, transparent)` }} />
        <div style={{ position: "absolute", top: 8, left: 8,  width: 9, height: 9, borderTop: `1px solid ${RED(0.4)}`, borderLeft:  `1px solid ${RED(0.4)}`  }} />
        <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${RED(0.4)}`, borderRight: `1px solid ${RED(0.4)}`  }} />
        <div style={{ padding: "22px 22px 18px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: RED(0.5), marginBottom: 6 }}>SYS · CONFIRM ACTION</div>
          <h3 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: RED(0.85), margin: "0 0 8px" }}>Confirm Rejection</h3>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.84rem", color: DIMWHITE(0.4), marginBottom: 20 }}>Are you sure you want to reject this request?</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={onCancel} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 16px", background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), cursor: "pointer" }}>CANCEL</button>
            <button onClick={onConfirm} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 18px", background: RED(0.85), border: "none", color: BG, fontWeight: 600, cursor: "pointer" }}>REJECT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   REMARKS MODAL
───────────────────────────────────────── */
function RemarksModal({ remarksFor, remarksText, onChange, onSave, onDelete, onCancel }: {
  remarksFor: IncubationRequest; remarksText: string
  onChange: (v: string) => void; onSave: () => void
  onDelete: () => void; onCancel: () => void
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)", padding: 16 }}>
      <style>{`@keyframes rmkshimmer{from{left:-40%}to{left:140%}} textarea::placeholder{color:${AMBER(0.2)};font-family:'IBM Plex Mono',monospace;font-size:0.72rem}`}</style>
      <div style={{ width: "100%", maxWidth: 440, background: BG, border: `1px solid ${BORDER}`, boxShadow: `0 32px 64px rgba(0,0,0,0.7)`, position: "relative", overflow: "hidden" }}>
        <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right, transparent, ${AMBER(0.65)}, transparent)`, animation: "rmkshimmer 2.5s linear infinite" }} />
        </div>
        <div style={{ position: "absolute", top: 8, left: 8,   width: 9, height: 9, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft:  `1px solid ${AMBER(0.4)}`  }} />
        <div style={{ position: "absolute", top: 8, right: 8,  width: 9, height: 9, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}`  }} />
        <div style={{ padding: "22px 22px 18px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: AMBER(0.4), marginBottom: 4 }}>SYS · ADMIN REMARKS</div>
          <h3 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: AMBER(0.9), margin: "0 0 16px" }}>
            {remarksFor.admin_remarks ? 'Edit Remark' : 'Add Remark'}
          </h3>

          {/* textarea */}
          <div style={{ position: "relative", marginBottom: 18 }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1, background: foc ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`, transition: "background 0.2s, width 0.15s" }} />
            <textarea
              value={remarksText}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFoc(true)}
              onBlur={() => setFoc(false)}
              rows={4}
              placeholder="Enter remarks…"
              style={{
                width: "100%", paddingLeft: 12, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
                background: foc ? `rgba(255,176,0,0.04)` : "rgba(0,0,0,0.35)",
                borderTop: `1px solid ${foc ? AMBER(0.28) : AMBER(0.1)}`, borderRight: `1px solid ${foc ? AMBER(0.28) : AMBER(0.1)}`,
                borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.1)}`, borderLeft: "none",
                outline: "none", resize: "none",
                color: DIMWHITE(0.85), fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.65,
                transition: "background 0.2s",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {remarksFor.admin_remarks && (
              <button onClick={onDelete} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", background: "transparent", border: "none", color: RED(0.65), cursor: "pointer", borderBottom: `1px solid ${RED(0.3)}`, paddingBottom: 1 }}>DELETE REMARK</button>
            )}
            <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
              <button onClick={onCancel} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 16px", background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), cursor: "pointer" }}>CANCEL</button>
              <button onClick={onSave}   style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 20px", background: AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: "pointer" }}>SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase/filter/remarks logic untouched
───────────────────────────────────────── */
export default function AdminIncubationRequestsPage() {
  const [requests,    setRequests]    = useState<IncubationRequest[]>([])
  const [loading,     setLoading]     = useState(true)
  const [tab,         setTab]         = useState<'pending' | 'past'>('pending')
  const [search,      setSearch]      = useState('')
  const [remarksFor,  setRemarksFor]  = useState<IncubationRequest | null>(null)
  const [remarksText, setRemarksText] = useState('')
  const [rejectFor,   setRejectFor]   = useState<IncubationRequest | null>(null)
  const [searchFoc,   setSearchFoc]   = useState(false)

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  const fetchRequests = async () => {
    const { data } = await supabase.from('incubation_requests').select('*').order('created_at', { ascending: false })
    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchRequests()
    const channel = supabase.channel('admin-incubation-requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incubation_requests' }, fetchRequests)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const filteredRequests = useMemo(() => {
    return requests
      .filter(r => tab === 'pending' ? r.status === 'submitted' : r.status !== 'submitted')
      .filter(r => `${r.name} ${r.contact_number}`.toLowerCase().includes(search.toLowerCase()))
  }, [requests, tab, search])

  const updateStatus = async (req: IncubationRequest, status: IncubationRequest['status']) => {
    await supabase.from('incubation_requests').update({ status }).eq('id', req.id)
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status } : r))
    if (status !== 'submitted') { setTimeout(() => setTab('past'), 150) }
  }

  const saveRemarks = async () => {
    if (!remarksFor) return
    await supabase.from('incubation_requests').update({ admin_remarks: remarksText }).eq('id', remarksFor.id)
    setRequests(prev => prev.map(r => r.id === remarksFor.id ? { ...r, admin_remarks: remarksText } : r))
    setRemarksFor(null); setRemarksText('')
  }

  const deleteRemarks = async () => {
    if (!remarksFor) return
    await supabase.from('incubation_requests').update({ admin_remarks: null }).eq('id', remarksFor.id)
    setRequests(prev => prev.map(r => r.id === remarksFor.id ? { ...r, admin_remarks: null } : r))
    setRemarksFor(null); setRemarksText('')
  }

  const pendingCount = requests.filter(r => r.status === 'submitted').length
  const pastCount    = requests.filter(r => r.status !== 'submitted').length

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        input::placeholder { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · INCUBATION REQUESTS</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        {/* header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
            Incubation Requests
          </h1>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
            Review, approve, and manage incubation requests
          </p>
        </div>

        {/* tabs + search row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 8, marginBottom: 20 }}>
          <TabBtn label="PENDING" active={tab === 'pending'} onClick={() => setTab('pending')} count={pendingCount} />
          <TabBtn label="PAST"    active={tab === 'past'}    onClick={() => setTab('past')}    count={pastCount}    />

          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: searchFoc ? 2 : 1, background: searchFoc ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`, transition: "background 0.2s, width 0.15s" }} />
            <input
              placeholder="SEARCH NAME OR CONTACT..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFoc(true)}
              onBlur={() => setSearchFoc(false)}
              style={{
                width: "100%", paddingLeft: 12, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
                background: searchFoc ? `rgba(255,176,0,0.04)` : PANEL,
                borderTop: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`, borderRight: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                borderBottom: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`, borderLeft: "none",
                outline: "none", color: DIMWHITE(0.8), fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.06em", transition: "background 0.2s",
              }}
            />
          </div>
        </div>

        {/* result row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.22em", color: AMBER(0.25) }}>
            {filteredRequests.length} REQUEST{filteredRequests.length !== 1 ? "S" : ""}
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)` }} />
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: `rgba(0,255,120,0.85)`, boxShadow: `0 0 4px rgba(0,255,120,0.5)`, animation: "mcpulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: `rgba(0,255,120,0.45)` }}>LIVE</span>
          </div>
        </div>

        {/* content */}
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "40px 0" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>LOADING REQUESTS...</span>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>NO REQUESTS FOUND</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filteredRequests.map(req => (
              <RequestCard
                key={req.id} req={req}
                onApprove={() => updateStatus(req, 'approved')}
                onReject={() => setRejectFor(req)}
                onComplete={() => updateStatus(req, 'completed')}
                onDownload={() => downloadZip(req)}
                onRemark={() => { setRemarksFor(req); setRemarksText(req.admin_remarks || '') }}
              />
            ))}
          </div>
        )}
      </div>

      {/* reject confirm */}
      {rejectFor && (
        <RejectModal
          onConfirm={() => { updateStatus(rejectFor, 'rejected'); setRejectFor(null) }}
          onCancel={() => setRejectFor(null)}
        />
      )}

      {/* remarks modal */}
      {remarksFor && (
        <RemarksModal
          remarksFor={remarksFor} remarksText={remarksText}
          onChange={setRemarksText} onSave={saveRemarks}
          onDelete={deleteRemarks} onCancel={() => setRemarksFor(null)}
        />
      )}
    </div>
  )
}