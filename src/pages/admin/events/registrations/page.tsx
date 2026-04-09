
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { ChevronDown, ChevronUp, Search, ExternalLink, Download } from "lucide-react"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ── TYPES ── */
type Event = {
  id: string; title: string; start_datetime: string
  is_paid: boolean; price: number | null
}

type Registration = {
  id: string; full_name: string; email: string; phone: string
  department: string; year: string; section: string
  payment_ss_url: string | null
}

/* ── PAGE ── */
export default function AdminEventRegistrationsPage() {
  const [events,         setEvents]        = useState<Event[]>([])
  const [expanded,       setExpanded]      = useState<string | null>(null)
  const [registrations, setRegistrations] = useState<Record<string, Registration[]>>({})
  const [search,         setSearch]        = useState("")
  const [loading,        setLoading]       = useState(true)
  const [searchFoc,      setSearchFoc]     = useState(false)

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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`}</style>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s infinite" }} />
          <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.68rem", color: AMBER(0.35) }}>LOADING...</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes shimmer  { from{left:-40%} to{left:140%} }
        input::placeholder  { color:${AMBER(0.22)};font-family:'IBM Plex Mono';font-size:0.7rem; }
        .reg-table::-webkit-scrollbar { height:3px;background:${BG} }
        .reg-table::-webkit-scrollbar-thumb { background:${AMBER(0.2)} }
        
        .header-flex { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .search-container { position: relative; width: 100%; max-width: 380px; margin-bottom: 22px; }

        @media (min-width: 768px) {
          .header-flex { flex-direction: row; align-items: flex-start; justify-content: space-between; }
          .search-container { margin-bottom: 30px; }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 16px 48px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · EVENT REGISTRATIONS</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        <div className="header-flex">
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: AMBER(0.9), margin: 0 }}>
              Event Registrations
            </h1>
            <p style={{ fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Participant tracking and export logs
            </p>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.47rem", color: AMBER(0.3), padding: "8px 14px", border: `1px solid ${AMBER(0.12)}`, width: 'fit-content' }}>
            {filteredEvents.length} EVENT{filteredEvents.length !== 1 ? "S" : ""}
          </div>
        </div>

        <div className="search-container">
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: searchFoc ? 2 : 1, background: searchFoc ? AMBER(0.85) : AMBER(0.18), transition: "all 0.2s" }} />
          <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: AMBER(searchFoc ? 0.5 : 0.2) }} />
          <input
            placeholder="SEARCH EVENTS..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFoc(true)}
            onBlur={() => setSearchFoc(false)}
            style={{ width: "100%", padding: "10px 12px 10px 34px", background: searchFoc ? "rgba(255,176,0,0.04)" : PANEL, border: "none", borderTop: `1px solid ${AMBER(0.1)}`, borderRight: `1px solid ${AMBER(0.1)}`, borderBottom: `1px solid ${AMBER(0.1)}`, outline: "none", color: "#fff", fontFamily: "'IBM Plex Mono'", fontSize: "0.7rem" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredEvents.length === 0 ? (
            <div style={{ padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL, textAlign: "center" }}>
              <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.65rem", color: AMBER(0.25) }}>NO RECORDS MATCH SEARCH</span>
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
    <div style={{ position: "relative", border: `1px solid ${open ? AMBER(0.28) : BORDER}`, background: open ? "rgba(255,176,0,0.05)" : PANEL }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: open ? 2 : 1, background: open ? AMBER(0.8) : AMBER(0.1) }} />

      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: "flex", flexDirection: 'column', gap: 12, padding: "16px", cursor: "pointer" }}
        onClick={onToggle}
      >
        <style>{`
          @media (min-width: 640px) {
            .evt-tile-header { flex-direction: row !important; justify-content: space-between; align-items: center; }
            .evt-meta-row { margin-top: 0 !important; }
          }
        `}</style>
        
        <div className="evt-tile-header" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.47rem", color: AMBER(0.28), marginBottom: 4 }}>EVT·{shortId}</div>
            <div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "1.05rem", color: DIMWHITE(0.9), marginBottom: 4 }}>{event.title}</div>
            <div style={{ display: "flex", flexWrap: 'wrap', alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.55rem", color: AMBER(0.35) }}>{new Date(event.start_datetime).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
              <span style={{ fontSize: "0.48rem", padding: "2px 8px", background: event.is_paid ? AMBER(0.07) : GREEN(0.07), border: `1px solid ${event.is_paid ? AMBER(0.2) : GREEN(0.2)}`, color: event.is_paid ? AMBER(0.8) : GREEN(0.8) }}>{event.is_paid ? `PAID · ₹${event.price}` : "FREE"}</span>
              {regs.length > 0 && <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.48rem", color: AMBER(0.4) }}>{regs.length} REGISTREES</span>}
            </div>
          </div>

          <div className="evt-meta-row" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }} onClick={e => e.stopPropagation()}>
            <ExportBtn onClick={onExport} />
            <button onClick={onToggle} style={{ background: "transparent", border: `1px solid ${AMBER(0.18)}`, color: AMBER(0.5), width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${AMBER(0.1)}`, background: 'rgba(0,0,0,0.2)' }}>
          {regs.length === 0 ? (
            <div style={{ padding: "20px", fontSize: "0.6rem", color: AMBER(0.3), fontFamily: "'IBM Plex Mono'" }}>NO ENTRIES DETECTED</div>
          ) : (
            <div className="reg-table" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.4)" }}>
                    {["NAME", "EMAIL", "PHONE", "CLASS", "PAYMENT"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "0.47rem", color: AMBER(0.4), letterSpacing: '0.1em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regs.map((r, i) => (
                    <tr key={r.id} style={{ borderBottom: `1px solid ${AMBER(0.05)}` }}>
                      <td style={{ padding: "10px 16px", fontSize: "0.85rem", fontWeight: 500 }}>{r.full_name}</td>
                      <td style={{ padding: "10px 16px", fontSize: "0.65rem", fontFamily: "'IBM Plex Mono'", color: AMBER(0.5) }}>{r.email}</td>
                      <td style={{ padding: "10px 16px", fontSize: "0.65rem", fontFamily: "'IBM Plex Mono'" }}>{r.phone}</td>
                      <td style={{ padding: "10px 16px", fontSize: "0.75rem", color: DIMWHITE(0.4) }}>{r.department} {r.year}</td>
                      <td style={{ padding: "10px 16px" }}>
                        {r.payment_ss_url ? (
                          <a href={r.payment_ss_url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.55rem", color: AMBER(0.7), textDecoration: "none", borderBottom: `1px solid ${AMBER(0.2)}` }}>VIEW <ExternalLink size={10} /></a>
                        ) : "—"}
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
  return (
    <button
      onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "transparent", border: `1px solid ${AMBER(0.2)}`, color: AMBER(0.6), fontSize: "0.55rem", cursor: "pointer", fontWeight: 600, letterSpacing: '0.1em' }}
    >
      <Download size={12} /> CSV
    </button>
  )
}
