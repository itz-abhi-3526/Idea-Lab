"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Event } from "@/app/admin/events/page"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

export default function EventCard({ event, onEdit }: { event: Event; onEdit: () => void }) {
  const [hov, setHov] = useState(false)

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  const toggle = async (field: "is_active" | "is_featured") => {
    await supabase.from("events").update({ [field]: !event[field] }).eq("id", event.id)
  }

  const remove = async () => {
    if (!confirm("Delete this event?")) return
    await supabase.from("events").delete().eq("id", event.id)
  }

  const shortId = event.id.slice(0, 8).toUpperCase()

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        background: hov ? "rgba(255,176,0,0.045)" : PANEL,
        border: `1px solid ${hov ? AMBER(0.25) : BORDER}`,
        padding: "16px 18px 14px 20px",
        overflow: "hidden",
        transition: "border 0.22s, background 0.22s",
      }}
    >
      {/* top shimmer on hover */}
      {hov && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.5)}, transparent)` }} />
      )}

      {/* left rail */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hov ? 2 : 1,
        background: `linear-gradient(to bottom, transparent, ${AMBER(hov ? 0.75 : 0.4)}, transparent)`,
        transition: "width 0.15s, background 0.22s",
      }} />

      {/* HUD corner */}
      <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

      {/* header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 10, flexWrap: "wrap" as const }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: AMBER(0.35), marginBottom: 6 }}>
            EVT · {shortId}
          </div>
          <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: DIMWHITE(0.9), lineHeight: 1.1 }}>
            {event.title}
          </div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.8rem", color: DIMWHITE(0.4), marginTop: 4 }}>
            {event.event_type ?? "—"} · {event.venue ?? "—"}
          </div>
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: AMBER(0.4), whiteSpace: "nowrap" as const }}>
          {new Date(event.start_datetime).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          <br />
          <span style={{ color: AMBER(0.28), fontSize: "0.55rem" }}>
            {new Date(event.start_datetime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {/* status badges */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, marginBottom: 12 }}>
        <SysBadge active={event.is_active}          label={event.is_active ? "ACTIVE" : "INACTIVE"} color={GREEN(0.8)} onClick={() => toggle("is_active")} />
        <SysBadge active={event.is_featured}         label="FEATURED"                                color={AMBER(0.9)} onClick={() => toggle("is_featured")} />
        <SysBadge active={event.is_registration_open} label={event.is_registration_open ? "REG OPEN" : "REG CLOSED"} color={AMBER(0.6)} />
      </div>

      {/* divider */}
      <div style={{ height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)`, marginBottom: 10 }} />

      {/* actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
        <ActionBtn label="EDIT"   onClick={onEdit}  color={AMBER(0.7)} hoverBg={AMBER(0.07)} hoverBorder={AMBER(0.3)} />
        <ActionBtn label="DELETE" onClick={remove}  color={RED(0.7)}   hoverBg={RED(0.07)}   hoverBorder={RED(0.3)}   />
      </div>
    </div>
  )
}

/* ── ACTION BUTTON ── */
function ActionBtn({ label, onClick, color, hoverBg, hoverBorder }: {
  label: string; onClick: () => void
  color: string; hoverBg: string; hoverBorder: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
        padding: "6px 14px", background: hov ? hoverBg : "transparent",
        borderTop: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
        borderRight: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
        borderBottom: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
        borderLeft: "none", color, cursor: "pointer",
        position: "relative", overflow: "hidden", transition: "background 0.18s, border-color 0.18s",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, opacity: hov ? 1 : 0.3, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ── SYSTEM BADGE — unchanged logic ── */
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
        padding: "3px 9px",
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