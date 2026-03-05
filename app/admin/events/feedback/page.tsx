"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"
import { ChevronDown, ChevronUp, Download, Search, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* types unchanged */
type EventRow = {
  id: string; title: string; start_datetime: string
  is_paid: boolean; price: number | null
}
type FeedbackRowRaw = {
  id: string; rating: number; comments: string | null; submitted_at: string
  user: { name: string | null; email: string | null } | null
}

export default function AdminEventFeedbackPage() {
  const [events,       setEvents]       = useState<EventRow[]>([])
  const [expanded,     setExpanded]     = useState<string | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [search,       setSearch]       = useState("")
  const [feedbacks,    setFeedbacks]    = useState<Record<string, FeedbackRowRaw[]>>({})
  const [loadingEvent, setLoadingEvent] = useState<string | null>(null)
  const [searchFoc,    setSearchFoc]    = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("events")
        .select("id,title,start_datetime,is_paid,price")
        .order("start_datetime", { ascending: false })
      setEvents(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase()
    return events.filter(e => e.title.toLowerCase().includes(q))
  }, [events, search])

  const loadFeedback = async (eventId: string) => {
    if (feedbacks[eventId]) return
    setLoadingEvent(eventId)
    const { data } = await supabase
      .from("event_feedback")
      .select("id,rating,comments,submitted_at,user:users!event_feedback_user_id_fkey(name,email)")
      .eq("event_id", eventId)
      .order("submitted_at", { ascending: false })
      .returns<FeedbackRowRaw[]>()
    setFeedbacks(p => ({ ...p, [eventId]: data ?? [] }))
    setLoadingEvent(null)
  }

  const exportCsv = (event: EventRow) => {
    const rows = feedbacks[event.id] ?? []
    if (!rows.length) return
    const header = ["Name","Email","Rating","Comment","Submitted At"]
    const body   = rows.map(r => [r.user?.name ?? "", r.user?.email ?? "", r.rating, r.comments ?? "", new Date(r.submitted_at).toLocaleString()])
    const csv    = [header, ...body].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob   = new Blob([csv], { type: "text/csv" })
    const url    = URL.createObjectURL(blob)
    const a      = document.createElement("a")
    a.href = url; a.download = `${event.title}-feedback.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", background:BG, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`}</style>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:AMBER(0.8), animation:"mcblink 0.9s ease-in-out infinite" }} />
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.68rem", letterSpacing:"0.25em", color:AMBER(0.35) }}>LOADING EVENTS...</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight:"100vh", background:BG, color:DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes fbshimmer{ from{left:-40%} to{left:140%} }
        input::placeholder  { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em }
        .fbtable::-webkit-scrollbar { height:3px;background:${BG} }
        .fbtable::-webkit-scrollbar-thumb { background:${AMBER(0.2)} }
      `}</style>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px 48px" }}>

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.32em", color:AMBER(0.45), whiteSpace:"nowrap" }}>SYS · EVENT FEEDBACK</span>
          <div style={{ flex:1, height:1, background:`linear-gradient(to right,${AMBER(0.25)},transparent)` }} />
        </div>

        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} style={{ marginBottom:24 }}>
          <h1 style={{ fontFamily:"'IBM Plex Sans Condensed',sans-serif", fontWeight:700, fontSize:"clamp(1.6rem,4vw,2.4rem)", letterSpacing:"-0.01em", color:AMBER(0.9), lineHeight:1, margin:0 }}>
            Event Feedback
          </h1>
          <p style={{ fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:300, fontSize:"0.85rem", color:DIMWHITE(0.3), marginTop:5 }}>
            View and export feedback submitted for events
          </p>
        </motion.div>

        <div style={{ position:"relative", maxWidth:380, marginBottom:22 }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:searchFoc?2:1, background:searchFoc?`linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)`:`linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition:"background 0.2s,width 0.15s" }} />
          <Search style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", width:13, height:13, color:AMBER(searchFoc?0.5:0.2), pointerEvents:"none" }} />
          <input
            placeholder="SEARCH EVENTS..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFoc(true)}
            onBlur={() => setSearchFoc(false)}
            style={{ width:"100%", paddingLeft:32, paddingRight:12, paddingTop:9, paddingBottom:9, background:searchFoc?"rgba(255,176,0,0.04)":PANEL, borderTop:`1px solid ${searchFoc?AMBER(0.28):AMBER(0.1)}`, borderRight:`1px solid ${searchFoc?AMBER(0.28):AMBER(0.1)}`, borderBottom:`1px solid ${searchFoc?AMBER(0.28):AMBER(0.1)}`, borderLeft:"none", outline:"none", color:DIMWHITE(0.8), fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.7rem", letterSpacing:"0.06em", transition:"background 0.2s" }}
          />
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <AnimatePresence>
            {filteredEvents.map((event, i) => {
              const open = expanded === event.id
              const rows = feedbacks[event.id] ?? []
              return (
                <motion.div key={event.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }} transition={{ duration:0.22, delay:i*0.03 }}>
                  <FeedbackAccordion
                    event={event} open={open} rows={rows}
                    loadingFeedback={loadingEvent === event.id}
                    onToggle={() => { if (open) { setExpanded(null) } else { setExpanded(event.id); loadFeedback(event.id) } }}
                    onExport={() => exportCsv(event)}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"60px 0", border:`1px solid ${AMBER(0.08)}`, background:PANEL }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:AMBER(0.3), animation:"mcblink 2s ease-in-out infinite" }} />
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:AMBER(0.25) }}>NO EVENTS FOUND</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FeedbackAccordion({ event, open, rows, loadingFeedback, onToggle, onExport }: {
  event: EventRow; open: boolean; rows: FeedbackRowRaw[]
  loadingFeedback: boolean; onToggle: () => void; onExport: () => void
}) {
  const [hov, setHov] = useState(false)
  const shortId   = event.id.slice(0, 8).toUpperCase()
  const avgRating = rows.length ? (rows.reduce((s, r) => s + r.rating, 0) / rows.length).toFixed(1) : null

  return (
    <div style={{ position:"relative", overflow:"hidden", border:`1px solid ${open?AMBER(0.28):hov?AMBER(0.2):BORDER}`, background:open?"rgba(255,176,0,0.05)":hov?"rgba(255,176,0,0.03)":PANEL, transition:"border 0.22s,background 0.22s" }}>
      {open && (
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, bottom:0, width:"40%", background:`linear-gradient(to right,transparent,${AMBER(0.5)},transparent)`, animation:"fbshimmer 2.5s linear infinite" }} />
        </div>
      )}
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:open?2:1, background:`linear-gradient(to bottom,transparent,${AMBER(open?0.8:hov?0.3:0.15)},transparent)`, transition:"background 0.22s,width 0.15s" }} />

      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onToggle} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"14px 16px 14px 18px", cursor:"pointer", flexWrap:"wrap" as const }}>
        <div style={{ minWidth:0 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.47rem", letterSpacing:"0.2em", color:AMBER(0.28), marginBottom:4 }}>EVT·{shortId}</div>
          <div style={{ fontFamily:"'IBM Plex Sans Condensed',sans-serif", fontWeight:700, fontSize:"1rem", color:DIMWHITE(0.9), lineHeight:1.1, marginBottom:4 }}>{event.title}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" as const }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.08em", color:AMBER(0.35) }}>
              {new Date(event.start_datetime).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}
            </span>
            {event.is_paid && (
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.48rem", letterSpacing:"0.18em", padding:"2px 8px", color:AMBER(0.8), background:AMBER(0.07), border:`1px solid ${AMBER(0.25)}` }}>
                PAID · Rs{event.price}
              </span>
            )}
            {avgRating && (
              <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.12em", color:"rgba(250,204,21,0.8)" }}>
                <Star style={{ width:10, height:10, fill:"rgba(250,204,21,0.7)", stroke:"none" }} />
                {avgRating} avg
              </span>
            )}
            {rows.length > 0 && (
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.48rem", letterSpacing:"0.15em", color:GREEN(0.5) }}>
                {rows.length} RESPONSE{rows.length !== 1 ? "S" : ""}
              </span>
            )}
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8 }} onClick={e => e.stopPropagation()}>
          {open && rows.length > 0 && <ExportBtn onClick={onExport} />}
          <button onClick={onToggle} style={{ width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:`1px solid ${AMBER(0.18)}`, color:AMBER(0.5), cursor:"pointer" }}>
            {open ? <ChevronUp style={{ width:14, height:14 }} /> : <ChevronDown style={{ width:14, height:14 }} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }} transition={{ duration:0.25 }} style={{ borderTop:`1px solid ${AMBER(0.1)}`, overflow:"hidden" }}>
            {loadingFeedback ? (
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"18px" }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:AMBER(0.6), animation:"mcblink 0.9s ease-in-out infinite" }} />
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.2em", color:AMBER(0.35) }}>LOADING FEEDBACK...</span>
              </div>
            ) : rows.length === 0 ? (
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"18px" }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:AMBER(0.25), animation:"mcblink 2s ease-in-out infinite" }} />
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.2em", color:AMBER(0.22) }}>NO FEEDBACK SUBMITTED</span>
              </div>
            ) : (
              <div className="fbtable" style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", minWidth:640 }}>
                  <thead>
                    <tr style={{ background:"rgba(0,0,0,0.3)" }}>
                      {["NAME","EMAIL","RATING","COMMENT","SUBMITTED"].map(h => (
                        <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.47rem", letterSpacing:"0.25em", color:AMBER(0.4), fontWeight:400, borderBottom:`1px solid ${AMBER(0.1)}`, whiteSpace:"nowrap" as const }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((f, i) => (
                      <tr key={f.id} style={{ borderBottom:`1px solid ${AMBER(0.05)}`, background:i%2===0?"transparent":"rgba(255,176,0,0.015)", verticalAlign:"top" }}>
                        <td style={{ padding:"9px 14px", fontFamily:"'IBM Plex Sans Condensed',sans-serif", fontWeight:500, fontSize:"0.88rem", color:DIMWHITE(0.8), whiteSpace:"nowrap" as const }}>{f.user?.name || "—"}</td>
                        <td style={{ padding:"9px 14px", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.6rem", color:AMBER(0.45) }}>{f.user?.email || "—"}</td>
                        <td style={{ padding:"9px 14px" }}>
                          <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.68rem", color:"rgba(250,204,21,0.85)" }}>
                            <Star style={{ width:11, height:11, fill:"rgba(250,204,21,0.75)", stroke:"none" }} />
                            {f.rating}
                          </span>
                        </td>
                        <td style={{ padding:"9px 14px", fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:300, fontSize:"0.8rem", color:DIMWHITE(0.5), maxWidth:380, whiteSpace:"pre-wrap", wordBreak:"break-word" as const }}>{f.comments || "—"}</td>
                        <td style={{ padding:"9px 14px", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", color:AMBER(0.3), whiteSpace:"nowrap" as const }}>
                          {new Date(f.submitted_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}
                          <br />
                          <span style={{ color:AMBER(0.2), fontSize:"0.5rem" }}>{new Date(f.submitted_at).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ExportBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.52rem", letterSpacing:"0.18em", padding:"6px 12px", background:hov?AMBER(0.07):"transparent", borderTop:`1px solid ${hov?AMBER(0.35):AMBER(0.18)}`, borderRight:`1px solid ${hov?AMBER(0.35):AMBER(0.18)}`, borderBottom:`1px solid ${hov?AMBER(0.35):AMBER(0.18)}`, borderLeft:"none", color:hov?AMBER(0.85):AMBER(0.5), cursor:"pointer", position:"relative", overflow:"hidden", transition:"all 0.18s" }}
    >
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:1, background:`linear-gradient(to bottom,transparent,${AMBER(hov?0.7:0.25)},transparent)`, transition:"background 0.18s" }} />
      <Download style={{ width:11, height:11 }} />
      <span style={{ position:"relative", zIndex:1 }}>EXPORT CSV</span>
    </button>
  )
}