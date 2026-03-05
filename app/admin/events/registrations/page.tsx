"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { ChevronDown, ChevronUp, Search, ExternalLink, Download } from "lucide-react"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ── TYPES — unchanged ── */
type Event = {
  id: string; title: string; start_datetime: string
  is_paid: boolean; price: number | null
}

type Registration = {
  id: string; full_name: string; email: string; phone: string
  department: string; year: string; section: string
  payment_ss_url: string | null
}

/* ── PAGE — all supabase/CSV/expand logic unchanged ── */
export default function AdminEventRegistrationsPage() {
  const [events,        setEvents]        = useState<Event[]>([])
  const [expanded,      setExpanded]      = useState<string | null>(null)
  const [registrations, setRegistrations] = useState<Record<string, Registration[]>>({})
  const [search,        setSearch]        = useState("")
  const [loading,       setLoading]       = useState(true)
  const [searchFoc,     setSearchFoc]     = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("events")
        .select("id, title, start_datetime, is_paid, price")
        .order("start_datetime", { ascending: false })
      setEvents(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const loadRegistrations = async (eventId: string) => {
    if (registrations[eventId]) return registrations[eventId]
    const { data } = await supabase
      .from("event_registrations")
      .select("id, full_name, email, phone, department, year, section, payment_ss_url")
      .eq("event_id", eventId)
    const rows = data ?? []
    setRegistrations(prev => ({ ...prev, [eventId]: rows }))
    return rows
  }

  const exportCSV = async (event: Event) => {
    const rows = await loadRegistrations(event.id)
    if (!rows.length) { alert("No registrations to export."); return }
    const headers = ["Full Name", "Email", "Phone", "Department", "Year", "Section", "Payment Screenshot URL"]
    const csvContent = [
      headers.join(","),
      ...rows.map(r =>
        [r.full_name, r.email, r.phone, r.department, r.year, r.section, r.payment_ss_url ?? ""]
          .map(v => `"${v.replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url  = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href     = url
    link.download = `${event.title.replace(/\s+/g, "_").toLowerCase()}_registrations.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))

  /* ── LOADING ── */
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`}</style>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>LOADING EVENTS...</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes mcpulse  { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes shimmer  { from{left:-40%} to{left:140%} }
        input::placeholder  { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em }
        .reg-table::-webkit-scrollbar { height:3px;background:${BG} }
        .reg-table::-webkit-scrollbar-thumb { background:${AMBER(0.2)} }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · EVENT REGISTRATIONS</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        {/* header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Event Registrations
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Search events, view participants, export registrations
            </p>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.22em", color: AMBER(0.3), padding: "8px 14px", border: `1px solid ${AMBER(0.12)}` }}>
            {filteredEvents.length} EVENT{filteredEvents.length !== 1 ? "S" : ""}
          </div>
        </div>

        {/* search */}
        <div style={{ position: "relative", maxWidth: 380, marginBottom: 22 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: searchFoc ? 2 : 1, background: searchFoc ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`, transition: "background 0.2s, width 0.15s" }} />
          <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: AMBER(searchFoc ? 0.5 : 0.2), pointerEvents: "none" }} />
          <input
            placeholder="SEARCH EVENTS..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFoc(true)}
            onBlur={() => setSearchFoc(false)}
            style={{
              width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
              background: searchFoc ? "rgba(255,176,0,0.04)" : PANEL,
              borderTop: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
              borderRight: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
              borderBottom: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
              borderLeft: "none", outline: "none",
              color: DIMWHITE(0.8), fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem", letterSpacing: "0.06em", transition: "background 0.2s",
            }}
          />
        </div>

        {/* event list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filteredEvents.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>NO EVENTS FOUND</span>
            </div>
          ) : (
            filteredEvents.map(event => (
              <EventAccordion
                key={event.id}
                event={event}
                open={expanded === event.id}
                regs={registrations[event.id] ?? []}
                onToggle={async () => {
                  const isOpen = expanded === event.id
                  setExpanded(isOpen ? null : event.id)
                  if (!isOpen) await loadRegistrations(event.id)
                }}
                onExport={() => exportCSV(event)}
              />
            ))
          )}
        </div>

      </div>
    </div>
  )
}

/* ── EVENT ACCORDION ── */
function EventAccordion({ event, open, regs, onToggle, onExport }: {
  event: Event; open: boolean; regs: Registration[]
  onToggle: () => void; onExport: () => void
}) {
  const [hov, setHov] = useState(false)
  const shortId = event.id.slice(0, 8).toUpperCase()

  return (
    <div style={{
      position: "relative", overflow: "hidden",
      border: `1px solid ${open ? AMBER(0.28) : hov ? AMBER(0.2) : BORDER}`,
      background: open ? "rgba(255,176,0,0.05)" : hov ? "rgba(255,176,0,0.03)" : PANEL,
      transition: "border 0.22s, background 0.22s",
    }}>
      {/* top shimmer when open */}
      {open && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right, transparent, ${AMBER(0.5)}, transparent)`, animation: "shimmer 2.5s linear infinite" }} />
        </div>
      )}

      {/* left stripe */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: open ? 2 : 1,
        background: `linear-gradient(to bottom, transparent, ${AMBER(open ? 0.8 : hov ? 0.3 : 0.15)}, transparent)`,
        transition: "background 0.22s, width 0.15s",
      }} />

      {/* tile header */}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "14px 16px 14px 18px", cursor: "pointer", flexWrap: "wrap" as const }}
        onClick={onToggle}
      >
        {/* left info */}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.28), marginBottom: 4 }}>
            EVT·{shortId}
          </div>
          <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: DIMWHITE(0.9), lineHeight: 1.1, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
            {event.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", color: AMBER(0.35) }}>
              {new Date(event.start_datetime).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.18em",
              padding: "2px 8px",
              color:       event.is_paid ? AMBER(0.8)  : GREEN(0.8),
              background:  event.is_paid ? AMBER(0.07) : GREEN(0.07),
              border:      `1px solid ${event.is_paid ? AMBER(0.25) : GREEN(0.25)}`,
            }}>
              {event.is_paid ? `PAID · Rs${event.price}` : "FREE"}
            </span>
            {regs.length > 0 && (
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.15em", color: AMBER(0.4) }}>
                {regs.length} REG{regs.length !== 1 ? "S" : ""}
              </span>
            )}
          </div>
        </div>

        {/* right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} onClick={e => e.stopPropagation()}>
          <ExportBtn onClick={onExport} />
          <button
            onClick={onToggle}
            style={{ background: "transparent", border: `1px solid ${AMBER(0.18)}`, color: AMBER(0.5), cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {open
              ? <ChevronUp  style={{ width: 14, height: 14 }} />
              : <ChevronDown style={{ width: 14, height: 14 }} />
            }
          </button>
        </div>
      </div>

      {/* registrations panel */}
      {open && (
        <div style={{ borderTop: `1px solid ${AMBER(0.1)}` }}>
          {regs.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "18px 18px" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: AMBER(0.25) }}>NO REGISTRATIONS YET</span>
            </div>
          ) : (
            <div className="reg-table" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.3)" }}>
                    {["NAME", "EMAIL", "PHONE", "CLASS", "PAYMENT"].map(h => (
                      <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.25em", color: AMBER(0.4), fontWeight: 400, borderBottom: `1px solid ${AMBER(0.1)}`, whiteSpace: "nowrap" as const }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regs.map((r, i) => (
                    <tr key={r.id} style={{ borderBottom: `1px solid ${AMBER(0.05)}`, background: i % 2 === 0 ? "transparent" : "rgba(255,176,0,0.015)" }}>
                      <td style={{ padding: "9px 14px", fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 500, fontSize: "0.88rem", color: DIMWHITE(0.8) }}>{r.full_name}</td>
                      <td style={{ padding: "9px 14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", color: AMBER(0.45) }}>{r.email}</td>
                      <td style={{ padding: "9px 14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", color: DIMWHITE(0.5) }}>{r.phone}</td>
                      <td style={{ padding: "9px 14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: DIMWHITE(0.45) }}>{r.department} {r.year} {r.section}</td>
                      <td style={{ padding: "9px 14px" }}>
                        {r.payment_ss_url ? (
                          <a href={r.payment_ss_url} target="_blank" rel="noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: AMBER(0.7), textDecoration: "none", borderBottom: `1px solid ${AMBER(0.3)}`, paddingBottom: 1 }}
                          >
                            VIEW SS <ExternalLink style={{ width: 10, height: 10 }} />
                          </a>
                        ) : (
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: AMBER(0.2) }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── EXPORT BUTTON ── */
function ExportBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em",
        padding: "6px 12px", background: hov ? AMBER(0.07) : "transparent",
        borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`,
        borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`,
        borderBottom: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`,
        borderLeft: "none", color: hov ? AMBER(0.85) : AMBER(0.5),
        cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.18s",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${AMBER(hov ? 0.7 : 0.25)}, transparent)`, transition: "background 0.18s" }} />
      <Download style={{ width: 11, height: 11 }} />
      <span style={{ position: "relative", zIndex: 1 }}>EXPORT CSV</span>
    </button>
  )
}