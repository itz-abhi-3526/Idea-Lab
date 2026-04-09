
import { useState } from "react"
import { supabase } from "@/lib/supabase"

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
const STATUS_CFG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  submitted: { label: "SUBMITTED", color: AMBER(0.8),   bg: AMBER(0.07),   border: AMBER(0.28)   },
  approved:  { label: "APPROVED",  color: SKY(0.8),     bg: SKY(0.07),     border: SKY(0.28)     },
  rejected:  { label: "REJECTED",  color: RED(0.8),     bg: RED(0.07),     border: RED(0.28)     },
  completed: { label: "COMPLETED", color: GREEN(0.8),   bg: GREEN(0.07),   border: GREEN(0.28)   },
  cancelled: { label: "CANCELLED", color: DIMWHITE(0.3),bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" },
}
const STATUS_FALLBACK = { label: "UNKNOWN", color: DIMWHITE(0.3), bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" }

/* ─────────────────────────────────────────
   TYPES
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
   ACTION BUTTON
───────────────────────────────────────── */
function ActionBtn({
  label, onClick, disabled, color, bg, border,
}: {
  label: string; onClick: () => void; disabled: boolean
  color: string; bg: string; border: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:    "'IBM Plex Mono', monospace",
        fontSize:      "0.58rem",
        letterSpacing: "0.18em",
        padding:       "8px 18px",
        background:    hov && !disabled ? bg : "transparent",
        borderTop:     `1px solid ${border}`,
        borderRight:   `1px solid ${border}`,
        borderBottom:  `1px solid ${border}`,
        borderLeft:    "none",
        color:         disabled ? DIMWHITE(0.25) : color,
        cursor:        disabled ? "not-allowed" : "pointer",
        position:      "relative",
        overflow:      "hidden",
        transition:    "background 0.18s, color 0.18s",
        opacity:       disabled ? 0.5 : 1,
        flex: "1 1 auto", /* Allow buttons to grow and fill row on mobile */
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 1,
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        opacity: hov && !disabled ? 1 : 0.4,
        transition: "opacity 0.18s",
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ─────────────────────────────────────────
   CARD
───────────────────────────────────────── */
export default function AdminIdeaCard({
  idea,
  onStatusChange,
}: {
  idea: Idea
  onStatusChange: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [hov,     setHov]     = useState(false)

  const updateStatus = async (status: IdeaStatus) => {
    setLoading(true)
    await supabase.from("idea_submissions").update({ status }).eq("id", idea.id)
    setLoading(false)
    onStatusChange()
  }

  const cfg      = STATUS_CFG[idea.status] ?? STATUS_FALLBACK
  const shortId  = idea.id.slice(0, 8).toUpperCase()

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:   "relative",
        background: hov ? `rgba(255,176,0,0.045)` : PANEL,
        border:     `1px solid ${hov ? AMBER(0.25) : BORDER}`,
        overflow:   "hidden",
        transition: "border 0.22s, background 0.22s",
      }}
    >
      {/* top shimmer on hover */}
      {hov && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.5)}, transparent)` }} />
      )}

      {/* left accent stripe */}
      <div style={{
        position:   "absolute", left: 0, top: 0, bottom: 0,
        width:      hov ? 2 : 1,
        background: `linear-gradient(to bottom, transparent, ${cfg.color}, transparent)`,
        opacity:    hov ? 0.85 : 0.35,
        transition: "opacity 0.22s, width 0.15s",
      }} />

      {/* HUD corner */}
      <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

      <div style={{ padding: "16px 18px 14px 20px" }}>

        {/* ── TOP ROW ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div style={{ minWidth: 200, flex: "1 1 0" }}>
            {/* id eyebrow */}
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.28), marginBottom: 5 }}>
              IDEA·{shortId}
            </div>
            {/* title */}
            <h3 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 4vw, 1.2rem)", letterSpacing: "0.01em", color: DIMWHITE(0.92), lineHeight: 1.15, margin: 0 }}>
              {idea.idea_title}
            </h3>
          </div>

          {/* status badge */}
          <div style={{
            flexShrink:    0,
            padding:       "3px 10px",
            background:    cfg.bg,
            border:        `1px solid ${cfg.border}`,
            fontFamily:    "'IBM Plex Mono', monospace",
            fontSize:      "0.5rem",
            letterSpacing: "0.2em",
            color:         cfg.color,
            whiteSpace:    "nowrap" as const,
          }}>
            {cfg.label}
          </div>
        </div>

        {/* ── DESCRIPTION ── */}
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.45), lineHeight: 1.7, margin: "0 0 12px" }}>
          {idea.idea_description}
        </p>

        {/* ── DOMAIN TAG ── */}
        {idea.domain && (
          <div style={{ marginBottom: 12 }}>
            <span style={{
              fontFamily:    "'IBM Plex Mono', monospace",
              fontSize:      "0.5rem",
              letterSpacing: "0.18em",
              padding:       "3px 10px",
              color:         AMBER(0.7),
              background:    AMBER(0.07),
              border:        `1px solid ${AMBER(0.22)}`,
            }}>
              {idea.domain.toUpperCase()}
            </span>
          </div>
        )}

        {/* ── DIVIDER ── */}
        <div style={{ height: 1, background: `linear-gradient(to right, ${AMBER(0.1)}, transparent)`, margin: "12px 0" }} />

        {/* ── FOOTER ROW ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            {/* date */}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: AMBER(0.28) }}>
              SUBMITTED · {new Date(idea.created_at).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>

          {/* action buttons container */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {idea.status === "submitted" && (
              <>
                <ActionBtn
                  label="REJECT"
                  onClick={() => updateStatus("rejected")}
                  disabled={loading}
                  color={RED(0.8)} bg={RED(0.08)} border={RED(0.28)}
                />
                <ActionBtn
                  label="APPROVE"
                  onClick={() => updateStatus("approved")}
                  disabled={loading}
                  color={GREEN(0.8)} bg={GREEN(0.08)} border={GREEN(0.28)}
                />
              </>
            )}

            {idea.status === "approved" && (
              <ActionBtn
                label="MARK COMPLETED"
                onClick={() => updateStatus("completed")}
                disabled={loading}
                color={SKY(0.8)} bg={SKY(0.08)} border={SKY(0.28)}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
