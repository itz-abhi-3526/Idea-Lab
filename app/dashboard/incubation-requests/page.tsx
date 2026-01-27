"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import JSZip from "jszip"

type IncubationRequest = {
  id: string
  request_type: "3d_printing" | "laser_printing"
  estimated_cost: number
  status: "pending" | "approved" | "rejected" | "completed"
  preferred_date: string
  preferred_time: string
  created_at: string

  admin_remarks: string | null

  sliced_model_screenshot_url: string | null
  payment_screenshot_url: string | null
  design_files_urls: string[] | null
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  approved: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
  completed: "bg-green-500/15 text-green-400 border-green-500/30",
}

/* ================= ZIP DOWNLOAD ================= */

async function downloadRequestFiles(req: IncubationRequest) {
  const zip = new JSZip()
  const folder = zip.folder(`incubation-request-${req.id}`)
  if (!folder) return

  const files: { url: string; name: string }[] = []

  if (req.sliced_model_screenshot_url) {
    files.push({ url: req.sliced_model_screenshot_url, name: "sliced-model.png" })
  }

  if (req.payment_screenshot_url) {
    files.push({ url: req.payment_screenshot_url, name: "payment-proof.png" })
  }

  req.design_files_urls?.forEach((url, index) => {
    files.push({ url, name: `design-file-${index + 1}.stl` })
  })

  for (const file of files) {
    const res = await fetch(file.url)
    const blob = await res.blob()
    folder.file(file.name, blob)
  }

  const content = await zip.generateAsync({ type: "blob" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(content)
  link.download = `incubation-request-${req.id}.zip`
  link.click()
  URL.revokeObjectURL(link.href)
}

/* ================= TIMELINE ================= */

function RequestTimeline({ status }: { status: IncubationRequest["status"] }) {
  const steps: { key: IncubationRequest["status"]; label: string }[] = [
    { key: "pending", label: "Submitted" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "completed", label: "Completed" },
  ]

  const activeIndex = steps.findIndex(s => s.key === status)

  return (
    <div className="relative pt-6">
      {/* Baseline */}
      <div className="absolute left-0 right-0 top-8 h-px bg-border" />

      {/* Steps */}
      <div className="flex justify-between relative">
        {steps.map((step, i) => {
          const isActive = i === activeIndex
          const isDone = i < activeIndex

          return (
            <div
              key={step.key}
              className="flex flex-col items-center w-full"
            >
              {/* Dot */}
              <div
                className={`h-3 w-3 rounded-full z-10 ${
                  isActive
                    ? "bg-accent"
                    : isDone
                    ? "bg-accent/60"
                    : "bg-muted"
                }`}
              />

              {/* Label */}
              <span className="mt-3 text-xs text-muted-foreground text-center">
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}



/* ================= PAGE ================= */

export default function MyIncubationRequestsPage() {
  const [requests, setRequests] = useState<IncubationRequest[]>([])
  const [filter, setFilter] = useState<"all" | "3d" | "laser">("all")
  const [loading, setLoading] = useState(true)

  const loadRequests = async () => {
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return

    const { data } = await supabase
      .from("incubation_requests")
      .select("*")
      .eq("user_id", auth.user.id)
      .order("created_at", { ascending: false })

    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadRequests()

    const channel = supabase
      .channel("my-incubation-requests-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "incubation_requests" },
        loadRequests
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filtered = requests.filter(r => {
    if (filter === "3d") return r.request_type === "3d_printing"
    if (filter === "laser") return r.request_type === "laser_printing"
    return true
  })

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 md:px-12 space-y-10">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          My Incubation Requests
        </h1>
        <p className="text-sm text-muted-foreground">
          Track status of your 3D printing and laser printing requests.
        </p>
      </div>

      <div className="inline-flex rounded-full bg-card/60 border border-border/60 p-1 backdrop-blur">
        {[
          { id: "all", label: "All" },
          { id: "3d", label: "3D Printing" },
          { id: "laser", label: "Laser Printing" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-5 py-2 text-sm rounded-full transition ${
              filter === f.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading requests…</div>
      ) : filtered.length === 0 ? (
        <div className="glass-surface rounded-2xl p-8 text-center text-sm text-muted-foreground">
          No incubation requests found.
        </div>
      ) : (
        <div className="grid gap-6">
          {filtered.map(req => (
            <div
              key={req.id}
              className="glass-surface rounded-2xl p-6 soft-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-medium">
                    {req.request_type === "3d_printing"
                      ? "3D Printing Request"
                      : "Laser Printing Request"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Submitted on{" "}
                    {new Date(req.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${
                      STATUS_STYLES[req.status]
                    }`}
                  >
                    {req.status.toUpperCase()}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs bg-muted/20 text-muted-foreground border border-border">
                    ₹{req.estimated_cost}
                  </span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Preferred schedule:{" "}
                <span className="text-foreground">
                  {req.preferred_date} at {req.preferred_time}
                </span>
              </div>

              {/* ✅ TIMELINE */}
              <RequestTimeline status={req.status} />

              {req.admin_remarks && (
                <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 text-sm">
                  <p className="font-medium text-accent mb-1">
                    Admin Remarks
                  </p>
                  <p className="text-muted-foreground">
                    {req.admin_remarks}
                  </p>
                </div>
              )}

              {(req.sliced_model_screenshot_url ||
                req.payment_screenshot_url ||
                (req.design_files_urls?.length ?? 0) > 0) && (
                <button
                  onClick={() => downloadRequestFiles(req)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 transition"
                >
                  Download Files
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
