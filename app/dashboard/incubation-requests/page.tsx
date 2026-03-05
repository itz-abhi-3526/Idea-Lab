"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import JSZip from "jszip"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "incubation-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap"
    document.head.prepend(l)
  }, [])
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
const STATUS_FALLBACK = { label: "UNKNOWN", color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)" }

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:     { label: "PENDING",     color: "rgba(251,191,36,0.85)", bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.28)" },
  approved:    { label: "APPROVED",    color: "rgba(99,102,241,0.85)", bg: "rgba(99,102,241,0.07)", border: "rgba(99,102,241,0.28)" },
  rejected:    { label: "REJECTED",    color: "rgba(239,68,68,0.85)",  bg: "rgba(239,68,68,0.07)",  border: "rgba(239,68,68,0.28)"  },
  completed:   { label: "COMPLETED",   color: "rgba(34,197,94,0.85)",  bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.28)"  },
  in_progress: { label: "IN PROGRESS", color: "rgba(249,115,22,0.85)", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.28)" },
  cancelled:   { label: "CANCELLED",   color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.04)",border: "rgba(255,255,255,0.1)" },
}

/* ─────────────────────────────────────────
   ZIP DOWNLOAD — unchanged
───────────────────────────────────────── */
async function downloadRequestFiles(req: IncubationRequest) {
  const zip = new JSZip()
  const folder = zip.folder(`incubation-request-${req.id}`)
  if (!folder) return

  const files: { url: string; name: string }[] = []

  if (req.sliced_model_screenshot_url)
    files.push({ url: req.sliced_model_screenshot_url, name: "sliced-model.png" })

  if (req.payment_screenshot_url)
    files.push({ url: req.payment_screenshot_url, name: "payment-proof.png" })

  req.design_files_urls?.forEach((url, index) => {
    files.push({ url, name: `design-file-${index + 1}.stl` })
  })

  for (const file of files) {
    const res  = await fetch(file.url)
    const blob = await res.blob()
    folder.file(file.name, blob)
  }

  const content = await zip.generateAsync({ type: "blob" })
  const link    = document.createElement("a")
  link.href     = URL.createObjectURL(content)
  link.download = `incubation-request-${req.id}.zip`
  link.click()
  URL.revokeObjectURL(link.href)
}

/* ─────────────────────────────────────────
   TIMELINE — restyled, same step logic
───────────────────────────────────────── */
function RequestTimeline({ status }: { status: IncubationRequest["status"] }) {
  const steps: { key: IncubationRequest["status"]; label: string }[] = [
    { key: "pending",   label: "SUBMITTED" },
    { key: "approved",  label: "APPROVED"  },
    { key: "rejected",  label: "REJECTED"  },
    { key: "completed", label: "COMPLETED" },
  ]

  const activeIndex = steps.findIndex(s => s.key === status)

  return (
    <div className="relative pt-4">
      {/* baseline track */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{ top: "calc(1rem + 5px)", background: "rgba(255,255,255,0.06)" }}
      />
      {/* progress fill */}
      <motion.div
        className="absolute h-px"
        style={{
          top:        "calc(1rem + 5px)",
          left:       0,
          background: "linear-gradient(to right, rgba(249,115,22,0.7), rgba(249,115,22,0.2))",
        }}
        initial={{ width: "0%" }}
        animate={{ width: activeIndex >= 0 ? `${(activeIndex / (steps.length - 1)) * 100}%` : "0%" }}
        transition={{ duration: 0.8, ease }}
      />

      <div className="flex justify-between relative">
        {steps.map((step, i) => {
          const isActive = i === activeIndex
          const isDone   = i < activeIndex

          return (
            <div key={step.key} className="flex flex-col items-center">
              {/* dot */}
              <motion.div
                animate={{
                  background: isActive
                    ? "rgb(249,115,22)"
                    : isDone
                    ? "rgba(249,115,22,0.45)"
                    : "rgba(255,255,255,0.1)",
                  boxShadow: isActive
                    ? "0 0 10px rgba(249,115,22,0.6), 0 0 4px rgba(249,115,22,0.4)"
                    : "none",
                  borderColor: isActive
                    ? "rgba(249,115,22,0.8)"
                    : isDone
                    ? "rgba(249,115,22,0.3)"
                    : "rgba(255,255,255,0.12)",
                }}
                transition={{ duration: 0.4 }}
                className="w-[10px] h-[10px] z-10"
                style={{
                  border: "1px solid",
                  borderRadius: 0,
                }}
              />
              {/* label */}
              <span
                className="mt-2 text-center"
                style={{
                  fontFamily:    "'Share Tech Mono', monospace",
                  fontSize:      "0.6rem",
                  letterSpacing: "0.14em",
                  color: isActive
                    ? "rgba(249,115,22,0.75)"
                    : isDone
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.15)",
                  transition: "color 0.3s",
                }}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   REQUEST CARD
───────────────────────────────────────── */
function RequestCard({ req, index }: { req: IncubationRequest; index: number }) {
  const [hov, setHov] = useState(false)
  const cfg     = STATUS_CONFIG[req.status] ?? STATUS_FALLBACK
  const shortId = req.id.slice(0, 8).toUpperCase()
  const is3D    = req.request_type === "3d_printing"
  const hasFiles =
    req.sliced_model_screenshot_url ||
    req.payment_screenshot_url ||
    (req.design_files_urls?.length ?? 0) > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden"
      style={{
        background:     "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        border:         hov ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow:      hov
          ? "0 0 0 1px rgba(249,115,22,0.08), 0 20px 50px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.25)",
        transition: "border 0.25s, box-shadow 0.25s",
      }}
    >
      {/* top shimmer on hover */}
      {hov && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease }}
          style={{
            background:      "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)",
            transformOrigin: "left",
          }}
        />
      )}

      {/* left accent stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: hov
            ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.6), transparent)"
            : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)",
          transition: "background 0.25s",
        }}
      />

      {/* HUD corner */}
      <div
        className="absolute top-3 right-3 w-3 h-3"
        style={{
          borderTop:   `1px solid ${hov ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"}`,
          borderRight: `1px solid ${hov ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"}`,
          transition:  "border-color 0.25s",
        }}
      />

      <div className="p-6 pl-7 space-y-5">

        {/* ── TOP ROW ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1.5">
            {/* meta */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[9px] tracking-[0.28em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}
              >
                {is3D ? "3DP" : "LSR"}·{shortId}
              </span>
              <span
                className="text-[9px] tracking-[0.18em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(255,255,255,0.18)" }}
              >
                · {new Date(req.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            </div>

            {/* title */}
            <h3
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    700,
                fontSize:      "clamp(1.1rem, 2.5vw, 1.4rem)",
                letterSpacing: "-0.01em",
                color:         "#ffffff",
                lineHeight:    1.1,
              }}
            >
              {is3D ? "3D Printing Request" : "Laser Printing Request"}
            </h3>
          </div>

          {/* badges */}
          <div className="flex flex-wrap gap-2 items-center shrink-0">
            <span
              className="px-3 py-1 text-[9px] tracking-[0.25em]"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color:      cfg.color,
                background: cfg.bg,
                border:     `1px solid ${cfg.border}`,
              }}
            >
              {cfg.label}
            </span>

            <span
              className="px-3 py-1 text-[9px] tracking-[0.2em]"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color:      "rgba(249,115,22,0.65)",
                background: "rgba(249,115,22,0.07)",
                border:     "1px solid rgba(249,115,22,0.2)",
              }}
            >
              ₹{req.estimated_cost}
            </span>
          </div>
        </div>

        {/* ── SCHEDULE ── */}
        <div
          className="flex items-center gap-3 px-3 py-2.5"
          style={{
            background: "rgba(0,0,0,0.2)",
            border:     "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span
            className="text-[9px] tracking-[0.25em] shrink-0"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.4)" }}
          >
            SCHEDULED
          </span>
          <div className="w-px h-3 bg-white/10" />
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.75rem",
              letterSpacing: "0.1em",
              color:         "rgba(255,255,255,0.55)",
            }}
          >
            {req.preferred_date} · {req.preferred_time}
          </span>
        </div>

        {/* ── TIMELINE ── */}
        <RequestTimeline status={req.status} />

        {/* ── ADMIN REMARKS ── */}
        {req.admin_remarks && (
          <div
            className="p-4 space-y-1.5"
            style={{
              background: "rgba(249,115,22,0.04)",
              border:     "1px solid rgba(249,115,22,0.18)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-[9px] tracking-[0.25em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.6)" }}
              >
                ADMIN REMARKS
              </span>
              <motion.div
                className="w-1 h-1 rounded-full bg-orange-500"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize:   "0.875rem",
                color:      "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
              }}
            >
              {req.admin_remarks}
            </p>
          </div>
        )}

        {/* ── DOWNLOAD FILES ── */}
        {hasFiles && (
          <motion.button
            onClick={() => downloadRequestFiles(req)}
            whileHover={{ scale: 1.015 }}
            whileTap={{   scale: 0.985 }}
            className="relative overflow-hidden flex items-center gap-2.5 px-4 py-2"
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.68rem",
              letterSpacing: "0.2em",
              color:         "rgba(249,115,22,0.75)",
              background:    "rgba(249,115,22,0.06)",
              border:        "1px solid rgba(249,115,22,0.22)",
              cursor:        "pointer",
            }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">↓ DOWNLOAD FILES</span>
          </motion.button>
        )}

      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase/realtime logic untouched
───────────────────────────────────────── */
export default function MyIncubationRequestsPage() {
  useFonts()

  const [requests, setRequests] = useState<IncubationRequest[]>([])
  const [filter,   setFilter]   = useState<"all" | "3d" | "laser">("all")
  const [loading,  setLoading]  = useState(true)

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
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
      .on("postgres_changes", { event: "*", schema: "public", table: "incubation_requests" }, loadRequests)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const filtered = requests.filter(r => {
    if (filter === "3d")    return r.request_type === "3d_printing"
    if (filter === "laser") return r.request_type === "laser_printing"
    return true
  })

  /* ── LOADING ── */
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "hsl(var(--background))" }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-orange-500"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.7rem",
              letterSpacing: "0.25em",
              color:         "rgba(255,255,255,0.3)",
            }}
          >
            LOADING INCUBATION REQUESTS...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen px-4 sm:px-6 md:px-12 py-10 overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-[45rem] w-[45rem] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span
              className="text-[9px] tracking-[0.32em] uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.55)" }}
            >
              FISAT AICTE IDEA LAB · FABRICATION
            </span>
          </div>
          <h1
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(2rem, 5vw, 3.5rem)",
              lineHeight:    0.92,
              letterSpacing: "-0.02em",
              color:         "#ffffff",
            }}
          >
            My Incubation{" "}
            <span style={{ color: "rgb(249,115,22)" }}>Requests</span>
          </h1>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize:   "0.9rem",
              color:      "rgba(255,255,255,0.3)",
            }}
          >
            Track status of your 3D printing and laser printing requests.
          </p>
        </motion.div>

        {/* ── FILTER TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
          className="flex items-center gap-1 p-1"
          style={{
            background: "rgba(0,0,0,0.3)",
            border:     "1px solid rgba(255,255,255,0.07)",
            width:      "fit-content",
          }}
        >
          {([
            { id: "all",   label: "All",           count: requests.length },
            { id: "3d",    label: "3D Printing",   count: requests.filter(r => r.request_type === "3d_printing").length    },
            { id: "laser", label: "Laser Printing", count: requests.filter(r => r.request_type === "laser_printing").length },
          ] as const).map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="relative px-5 py-2 text-[10px] tracking-[0.18em] uppercase"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color:      filter === f.id ? "#000000" : "rgba(255,255,255,0.3)",
                background: "transparent",
                border:     "none",
                cursor:     "pointer",
                transition: "color 0.2s",
              }}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="incubation-tab-pill"
                  className="absolute inset-0"
                  style={{ background: "rgb(249,115,22)", zIndex: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
              <span
                className="relative z-10 ml-2 px-1.5 py-0.5 text-[8px]"
                style={{
                  background: filter === f.id ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.07)",
                  color:      filter === f.id ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.3)",
                }}
              >
                {f.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── REQUEST LIST ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="space-y-4"
          >
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="relative overflow-hidden py-16 flex flex-col items-center gap-4"
                style={{
                  background:     "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(12px)",
                  border:         "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="absolute top-3 left-3 w-3 h-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)" }} />
                <div className="absolute top-3 right-3 w-3 h-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }} />
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-orange-500/30"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)" }}>
                  NO INCUBATION REQUESTS FOUND
                </p>
              </motion.div>
            ) : (
              filtered.map((req, i) => (
                <RequestCard key={req.id} req={req} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}