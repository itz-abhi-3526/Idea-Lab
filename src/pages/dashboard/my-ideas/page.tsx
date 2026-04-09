
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import IdeaTimeline from "@/components/ideas/IdeaTimeline"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "ideas-fonts"
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
type IdeaStatus = "submitted" | "approved" | "rejected" | "completed" | "cancelled"

type Idea = {
  id: string
  idea_title: string
  idea_description: string
  domain: string | null
  status: IdeaStatus
  created_at: string
}

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
const STATUS_CONFIG: Record<IdeaStatus, { label: string; color: string; bg: string; border: string }> = {
  submitted: { label: "SUBMITTED", color: "rgba(249,115,22,0.85)", bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.3)"  },
  approved:  { label: "APPROVED",  color: "rgba(34,197,94,0.85)",  bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.3)"   },
  completed: { label: "COMPLETED", color: "rgba(99,102,241,0.85)", bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.3)"  },
  rejected:  { label: "REJECTED",  color: "rgba(239,68,68,0.8)",   bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.28)"  },
  cancelled: { label: "CANCELLED", color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)" },
}

/* ─────────────────────────────────────────
   IDEA CARD
───────────────────────────────────────── */
function IdeaCard({
  idea,
  onCancel,
  index,
}: {
  idea: Idea
  onCancel: (id: string) => void
  index: number
}) {
  const [hov, setHov] = useState(false)
  const cfg     = STATUS_CONFIG[idea.status]
  const shortId = idea.id.slice(0, 8).toUpperCase()

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
          transition: "border-color 0.25s",
        }}
      />

      <div className="p-6 pl-7 space-y-5">

        {/* ── TOP ROW: id + status ── */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="space-y-1.5">
            {/* meta row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[9px] tracking-[0.28em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}
              >
                IDEA·{shortId}
              </span>
              <span
                className="text-[9px] tracking-[0.18em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(255,255,255,0.18)" }}
              >
                · {new Date(idea.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
              {/* domain pill */}
              {idea.domain && (
                <span
                  className="px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color:      "rgba(249,115,22,0.65)",
                    background: "rgba(249,115,22,0.08)",
                    border:     "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  {idea.domain}
                </span>
              )}
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
              {idea.idea_title}
            </h3>
          </div>

          {/* status badge */}
          <span
            className="px-3 py-1 shrink-0 text-[9px] tracking-[0.25em]"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color:      cfg.color,
              background: cfg.bg,
              border:     `1px solid ${cfg.border}`,
            }}
          >
            {cfg.label}
          </span>
        </div>

        {/* ── DESCRIPTION ── */}
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize:   "0.875rem",
            color:      "rgba(255,255,255,0.45)",
          }}
        >
          {idea.idea_description}
        </p>

        {/* ── TIMELINE — original component, untouched ── */}
        <IdeaTimeline status={idea.status} />

        {/* ── FOOTER ROW ── */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.68rem",
              letterSpacing: "0.1em",
              color:         "rgba(255,255,255,0.2)",
            }}
          >
            {new Date(idea.created_at).toLocaleString()}
          </span>

          {idea.status === "submitted" && (
            <motion.button
              onClick={() => onCancel(idea.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{   scale: 0.97 }}
              className="relative overflow-hidden px-4 py-2 text-[9px] tracking-[0.22em]"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color:      "rgba(239,68,68,0.8)",
                background: "rgba(239,68,68,0.06)",
                border:     "1px solid rgba(239,68,68,0.25)",
                cursor:     "pointer",
              }}
            >
              CANCEL IDEA
            </motion.button>
          )}
        </div>

      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────── */
function EmptyState({ tab }: { tab: "current" | "previous" }) {
  return (
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
      <p
        style={{
          fontFamily:    "'Share Tech Mono', monospace",
          fontSize:      "0.72rem",
          letterSpacing: "0.22em",
          color:         "rgba(255,255,255,0.2)",
        }}
      >
        NO {tab === "current" ? "ACTIVE" : "PREVIOUS"} IDEAS FOUND
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase logic untouched
───────────────────────────────────────── */
export default function MyIdeasPage() {
  useFonts()

  const [ideas,     setIdeas]     = useState<Idea[]>([])
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current")
  const [loading,   setLoading]   = useState(true)

  /* ── ALL ORIGINAL FETCH LOGIC — UNCHANGED ── */
  const fetchIdeas = async () => {
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setIdeas([])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from("idea_submissions")
      .select("id, idea_title, idea_description, domain, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setIdeas(data ?? [])
    setLoading(false)
  }

  /* ── ALL ORIGINAL CANCEL LOGIC — UNCHANGED ── */
  const cancelIdea = async (id: string) => {
    const { error } = await supabase
      .from("idea_submissions")
      .update({ status: "cancelled" })
      .eq("id", id)

    if (!error) {
      setIdeas(prev =>
        prev.map(idea => idea.id === id ? { ...idea, status: "cancelled" } : idea)
      )
    }
  }

  /* ── ALL ORIGINAL EFFECTS — UNCHANGED ── */
  useEffect(() => {
    fetchIdeas()
  }, [])

  const current  = ideas.filter(i => i.status === "submitted")
  const previous = ideas.filter(i => i.status !== "submitted")

  /* ── LOADING STATE ── */
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
            LOADING YOUR IDEAS...
          </span>
        </div>
      </div>
    )
  }

  const displayed = activeTab === "current" ? current : previous

  return (
    <div
      className="relative min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-10 overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-[45rem] w-[45rem] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize:  "36px 36px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── PAGE HEADER ── */}
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
              FISAT AICTE IDEA LAB · SUBMISSIONS
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
            My{" "}
            <span style={{ color: "rgb(249,115,22)" }}>Ideas</span>
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
            Track the status of ideas you've submitted
          </p>
        </motion.div>

        {/* ── TABS ── */}
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
          {(["current", "previous"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2 text-[10px] tracking-[0.22em] uppercase"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color:      activeTab === tab ? "#000000" : "rgba(255,255,255,0.3)",
                background: "transparent",
                border:     "none",
                cursor:     "pointer",
                transition: "color 0.2s",
              }}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="ideas-tab-pill"
                  className="absolute inset-0"
                  style={{ background: "rgb(249,115,22)", zIndex: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab === "current" ? "Current" : "Previous"}</span>
              <span
                className="relative z-10 ml-2 px-1.5 py-0.5 text-[8px]"
                style={{
                  background: activeTab === tab ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.07)",
                  color:      activeTab === tab ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.3)",
                }}
              >
                {tab === "current" ? current.length : previous.length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── IDEA LIST ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="space-y-4"
          >
            {displayed.length === 0 ? (
              <EmptyState tab={activeTab} />
            ) : (
              displayed.map((idea, i) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onCancel={cancelIdea}
                  index={i}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
