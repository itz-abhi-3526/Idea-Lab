"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Event } from "@/app/admin/events/page"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

export default function EventCard({ event, onEdit }: { event: Event; onEdit: () => void }) {
  const [hov,       setHov]       = useState(false)
  const [deleteFor, setDeleteFor] = useState(false)   // ← replaces confirm()

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  const toggle = async (field: "is_active" | "is_featured") => {
    await supabase.from("events").update({ [field]: !event[field] }).eq("id", event.id)
  }

  const remove = async () => {
    await supabase.from("events").delete().eq("id", event.id)
    setDeleteFor(false)
  }

  const shortId = event.id.slice(0, 8).toUpperCase()

  return (
    <>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          background: hov ? "rgba(255,176,0,0.045)" : PANEL,
          border: `1px solid ${hov ? AMBER(0.25) : BORDER}`,
          padding: "16px 18px",
          overflow: "hidden",
          transition: "border 0.22s, background 0.22s",
        }}
      >
        {hov && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.5)}, transparent)` }} />
        )}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1, background: `linear-gradient(to bottom, transparent, ${AMBER(hov ? 0.75 : 0.4)}, transparent)`, transition: "width 0.15s, background 0.22s" }} />
        <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

        {/* ── HEADER ROW ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px", minWidth: 0 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: AMBER(0.35), marginBottom: 5 }}>
              LOG_ENTRY · {shortId}
            </div>
            <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: DIMWHITE(0.9), lineHeight: 1.2, wordBreak: "break-word" }}>
              {event.title}
            </div>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: DIMWHITE(0.4), marginTop: 3 }}>
              {event.event_type ?? "UNCLASSIFIED"} · {event.venue ?? "REMOTE_LINK"}
            </div>
          </div>

          <div style={{ fontFamily: "'IBM Plex Mono', monospace", textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.12em", color: AMBER(0.4) }}>
              {new Date(event.start_datetime).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </div>
            <div style={{ color: AMBER(0.28), fontSize: "0.55rem", letterSpacing: "0.1em" }}>
              {new Date(event.start_datetime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} UTC
            </div>
          </div>
        </div>

        {/* ── STATUS BADGES ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          <SysBadge active={event.is_active}           label={event.is_active ? "ACTIVE" : "INACTIVE"} color={GREEN(0.8)} onClick={() => toggle("is_active")} />
          <SysBadge active={event.is_featured}          label="FEATURED"                                 color={AMBER(0.9)} onClick={() => toggle("is_featured")} />
          <SysBadge active={event.is_registration_open} label={event.is_registration_open ? "REG OPEN" : "REG CLOSED"} color={AMBER(0.6)} />
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)`, marginBottom: 12 }} />

        {/* ── ACTION BUTTONS ── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <ActionBtn label="EDIT_PROTOCOL" onClick={onEdit}               color={AMBER(0.7)} hoverBg={AMBER(0.07)} hoverBorder={AMBER(0.3)} />
          <ActionBtn label="PURGE"         onClick={() => setDeleteFor(true)} color={RED(0.7)}  hoverBg={RED(0.07)}  hoverBorder={RED(0.3)}  />
        </div>
      </div>

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteFor && (
        <DeleteConfirmModal
          onConfirm={remove}
          onCancel={() => setDeleteFor(false)}
        />
      )}
    </>
  )
}

/* ── DELETE CONFIRM MODAL ── */
function DeleteConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 360, background: BG, border: "1px solid rgba(255,60,60,0.35)", boxShadow: "0 32px 64px rgba(0,0,0,0.7)", position: "relative", overflow: "hidden" }}>
        <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(255,60,60,0.55),transparent)" }} />
        <div style={{ position: "absolute", top: 8, left: 8,   width: 9, height: 9, borderTop: "1px solid rgba(255,60,60,0.45)", borderLeft:  "1px solid rgba(255,60,60,0.45)" }} />
        <div style={{ position: "absolute", top: 8, right: 8,  width: 9, height: 9, borderTop: "1px solid rgba(255,60,60,0.45)", borderRight: "1px solid rgba(255,60,60,0.45)" }} />
        <div style={{ padding: "22px 22px 20px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,60,60,0.5)", marginBottom: 6 }}>SYS · CONFIRM PURGE</div>
          <h3 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "rgba(255,60,60,0.88)", margin: "0 0 8px" }}>Delete Event</h3>
          <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.84rem", color: "rgba(220,215,200,0.4)", marginBottom: 20 }}>
            This action is permanent and cannot be undone.
          </p>
          <div style={{ height: 1, background: "linear-gradient(to right,rgba(255,60,60,0.12),transparent)", marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={onCancel}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 16px", background: "transparent", border: `1px solid ${hov ? "rgba(255,176,0,0.3)" : "rgba(255,176,0,0.15)"}`, color: hov ? "rgba(255,176,0,0.65)" : "rgba(255,176,0,0.4)", cursor: "pointer", transition: "all 0.18s" }}
            >CANCEL</button>
            <button onClick={onConfirm}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 20px", background: "rgba(255,60,60,0.85)", border: "none", color: BG, fontWeight: 600, cursor: "pointer", boxShadow: "0 0 14px rgba(255,60,60,0.3)" }}
            >PURGE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── ACTION BUTTON ── */
function ActionBtn({ label, onClick, color, hoverBg, hoverBorder }: {
  label: string; onClick: () => void; color: string; hoverBg: string; hoverBorder: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
        padding: "8px 16px", background: hov ? hoverBg : "transparent",
        borderTop: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
        borderRight: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
        borderBottom: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
        borderLeft: "none", color, cursor: "pointer",
        position: "relative", overflow: "hidden", transition: "all 0.18s",
        flex: "1 1 auto", minWidth: "100px", maxWidth: "160px",
        whiteSpace: "nowrap" as const,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, opacity: hov ? 1 : 0.3, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ── SYSTEM BADGE ── */
function SysBadge({ label, active = true, color, onClick }: {
  label: string; active?: boolean; color: string; onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  const activeBg     = color.replace(/[\d.]+\)$/, "0.08)")
  const activeBorder = color.replace(/[\d.]+\)$/, "0.3)")
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em",
        padding: "4px 10px",
        background: active ? (hov && onClick ? color.replace(/[\d.]+\)$/, "0.13)") : activeBg) : "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? activeBorder : "rgba(255,255,255,0.08)"}`,
        color: active ? color : "rgba(220,215,200,0.3)",
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap" as const,
        transition: "background 0.18s",
      }}
    >
      {label}
    </span>
  )
}