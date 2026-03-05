"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
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
        flex: "1 1 auto"
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, opacity: hov && !disabled ? 1 : 0.4, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

export default function AdminIdeaDialog({
  idea,
  onStatusChange,
}: {
  idea: Idea
  onStatusChange: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [open,     setOpen]    = useState(false)

  const updateStatus = async (status: "approved" | "rejected") => {
    setLoading(true)
    const { error } = await supabase
      .from("idea_submissions")
      .update({ status })
      .eq("id", idea.id)
    setLoading(false)
    if (!error) { 
      setOpen(false);
      onStatusChange(); 
    }
  }

  const cfg = STATUS_CFG[idea.status] ?? STATUS_FALLBACK

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @keyframes dlgshimmer { from{left:-40%} to{left:140%} }
        
        .dialog-panel {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: ${BG};
          border-top: 1px solid ${BORDER};
          box-shadow: 0 -10px 50px rgba(0,0,0,0.8);
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dialog-panel.is-open {
          transform: translateY(0);
        }

        .dialog-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .dialog-overlay.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        @media (min-width: 640px) {
          .dialog-panel {
            position: absolute;
            bottom: auto;
            top: 100%;
            left: auto;
            right: 0;
            width: 420px;
            margin-top: 8px;
            border: 1px solid ${BORDER};
            border-radius: 4px;
            transform: translateY(10px) scale(0.98);
            opacity: 0;
            pointer-events: none;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          }
          .dialog-panel.is-open {
            transform: translateY(0) scale(1);
            opacity: 1;
            pointer-events: auto;
          }
          .dialog-overlay { display: none; }
        }
      `}</style>

      {/* ── TRIGGER ── */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor:        "pointer",
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
      </div>

      {/* ── MOBILE OVERLAY ── */}
      <div className={`dialog-overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} />

      {/* ── PANEL ── */}
      <div className={`dialog-panel ${open ? 'is-open' : ''}`}>
        {/* top shimmer */}
        <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right, transparent, ${AMBER(0.65)}, transparent)`, animation: "dlgshimmer 2.5s linear infinite" }} />
        </div>

        {/* HUD corners (Desktop only visual) */}
        <div className="hidden sm:block" style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft: `1px solid ${AMBER(0.4)}` }} />
        <div className="hidden sm:block" style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}` }} />

        <div style={{ padding: "20px 20px 24px" }}>
          {/* id + close row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.22em", color: AMBER(0.3) }}>
              RECORD_ID·{idea.id.slice(0, 8).toUpperCase()}
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >✕</button>
          </div>

          <h3 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: DIMWHITE(0.92), lineHeight: 1.2, margin: "0 0 12px" }}>
            {idea.idea_title}
          </h3>

          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.45), lineHeight: 1.6, margin: "0 0 16px", maxHeight: "200px", overflowY: "auto" }}>
            {idea.idea_description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 20 }}>
            {idea.domain && (
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em", padding: "3px 10px", color: AMBER(0.7), background: AMBER(0.07), border: `1px solid ${AMBER(0.22)}` }}>
                {idea.domain.toUpperCase()}
              </span>
            )}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em", padding: "3px 10px", color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              {cfg.label}
            </span>
          </div>

          <div style={{ height: 1, background: `linear-gradient(to right, ${AMBER(0.12)}, transparent)`, margin: "16px 0" }} />

          {idea.status === "submitted" && (
            <div style={{ display: "flex", gap: 8 }}>
              <ActionBtn label="REJECT"  onClick={() => updateStatus("rejected")} disabled={loading} color={RED(0.8)}   bg={RED(0.08)}   border={RED(0.28)}   />
              <ActionBtn label="APPROVE" onClick={() => updateStatus("approved")} disabled={loading} color={GREEN(0.8)} bg={GREEN(0.08)} border={GREEN(0.28)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}