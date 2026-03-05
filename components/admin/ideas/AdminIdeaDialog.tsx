"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

const STATUS_CFG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  submitted: { label: "SUBMITTED", color: AMBER(0.8),   bg: AMBER(0.07),   border: AMBER(0.28)   },
  approved:  { label: "APPROVED",  color: GREEN(0.8),   bg: GREEN(0.07),   border: GREEN(0.28)   },
  rejected:  { label: "REJECTED",  color: RED(0.8),     bg: RED(0.07),     border: RED(0.28)     },
  completed: { label: "COMPLETED", color: `rgba(56,189,248,0.8)`, bg: `rgba(56,189,248,0.07)`, border: `rgba(56,189,248,0.28)` },
  cancelled: { label: "CANCELLED", color: DIMWHITE(0.3),bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" },
}
const STATUS_FALLBACK = { label: "UNKNOWN", color: DIMWHITE(0.3), bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" }

type IdeaStatus = "submitted" | "approved" | "rejected" | "completed" | "cancelled"

type Idea = {
  id: string
  idea_title: string
  idea_description: string
  domain: string | null
  status: IdeaStatus
  created_at: string
}

function ActionBtn({ label, onClick, disabled, color, bg, border }: {
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
        transition:    "background 0.18s",
        opacity:       disabled ? 0.5 : 1,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, opacity: hov && !disabled ? 1 : 0.4, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ─────────────────────────────────────────
   COMPONENT — all supabase logic untouched
───────────────────────────────────────── */
export default function AdminIdeaDialog({
  idea,
  onStatusChange,
}: {
  idea: Idea
  onStatusChange: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [open,    setOpen]    = useState(false)

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  const updateStatus = async (status: "approved" | "rejected") => {
    setLoading(true)
    const { error } = await supabase
      .from("idea_submissions")
      .update({ status })
      .eq("id", idea.id)
    setLoading(false)
    if (!error) { onStatusChange() }
  }

  const cfg = STATUS_CFG[idea.status] ?? STATUS_FALLBACK

  return (
    <details
      open={open}
      onToggle={e => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      style={{ position: "relative" }}
    >
      {/* ── TRIGGER ── */}
      <summary
        style={{
          cursor:        "pointer",
          listStyle:     "none",
          fontFamily:    "'IBM Plex Mono', monospace",
          fontSize:      "0.55rem",
          letterSpacing: "0.2em",
          color:         open ? AMBER(0.85) : AMBER(0.45),
          borderBottom:  `1px solid ${open ? AMBER(0.35) : AMBER(0.15)}`,
          paddingBottom: "2px",
          display:       "inline-block",
          transition:    "color 0.18s, border-color 0.18s",
          userSelect:    "none",
        }}
      >
        {open ? "CLOSE ▲" : "VIEW ▼"}
      </summary>

      {/* ── PANEL ── */}
      <div style={{
        position:       "fixed",
        bottom:         0,
        left:           0,
        right:          0,
        zIndex:         50,
        // sm: absolute, right-aligned
      }}
      className="sm:!fixed-none"
      >
        {/* Use a wrapper to handle sm vs mobile layout */}
        <div style={{
          background:     BG,
          border:         `1px solid ${BORDER}`,
          boxShadow:      `0 -4px 40px rgba(0,0,0,0.7), 0 0 0 1px ${AMBER(0.05)}`,
          maxHeight:      "85vh",
          overflowY:      "auto",
          position:       "relative",
          overflow:       "hidden",
        }}
          className="w-full sm:absolute sm:bottom-auto sm:right-0 sm:w-[420px] sm:mt-2 sm:max-h-[85vh] sm:overflow-y-auto"
        >
          {/* top shimmer */}
          <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right, transparent, ${AMBER(0.65)}, transparent)`, animation: "dlgshimmer 2.5s linear infinite" }} />
          </div>
          <style>{`@keyframes dlgshimmer{from{left:-40%}to{left:140%}} details>summary::-webkit-details-marker{display:none}`}</style>

          {/* HUD corners */}
          <div style={{ position: "absolute", top: 6, left: 6,  width: 8, height: 8, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft: `1px solid ${AMBER(0.4)}` }} />
          <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}` }} />

          <div style={{ padding: "18px 18px 16px" }}>

            {/* id + close row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.22em", color: AMBER(0.3) }}>
                IDEA·{idea.id.slice(0, 8).toUpperCase()}
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", width: 22, height: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.18s, color 0.18s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.4); (e.currentTarget as HTMLButtonElement).style.color = AMBER(0.8) }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.15); (e.currentTarget as HTMLButtonElement).style.color = AMBER(0.4) }}
              >✕</button>
            </div>

            {/* title */}
            <h3 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: DIMWHITE(0.92), lineHeight: 1.15, margin: "0 0 8px" }}>
              {idea.idea_title}
            </h3>

            {/* description */}
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.45), lineHeight: 1.7, margin: "0 0 12px" }}>
              {idea.idea_description}
            </p>

            {/* domain */}
            {idea.domain && (
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em", padding: "3px 10px", color: AMBER(0.7), background: AMBER(0.07), border: `1px solid ${AMBER(0.22)}` }}>
                  {idea.domain.toUpperCase()}
                </span>
              </div>
            )}

            {/* status row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: AMBER(0.3) }}>STATUS</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em", padding: "2px 9px", color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                {cfg.label}
              </span>
            </div>

            {/* divider */}
            <div style={{ height: 1, background: `linear-gradient(to right, ${AMBER(0.12)}, transparent)`, margin: "12px 0" }} />

            {/* actions */}
            {idea.status === "submitted" && (
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
                <ActionBtn label="REJECT"  onClick={() => updateStatus("rejected")} disabled={loading} color={RED(0.8)}   bg={RED(0.08)}   border={RED(0.28)}   />
                <ActionBtn label="APPROVE" onClick={() => updateStatus("approved")} disabled={loading} color={GREEN(0.8)} bg={GREEN(0.08)} border={GREEN(0.28)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </details>
  )
}