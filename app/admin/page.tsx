"use client"

import { useEffect, useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "admin-mc-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   PALETTE helpers
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL_BG = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.15)"

/* ─────────────────────────────────────────
   LIVE CLOCK
───────────────────────────────────────── */
function LiveClock() {
  const [t, setT] = useState("")
  useEffect(() => {
    const tick = () => setT(new Date().toUTCString().slice(17, 25) + " UTC")
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", color: AMBER(0.55), letterSpacing: "0.08em" }}>
      {t}
    </span>
  )
}

/* ─────────────────────────────────────────
   SCAN LINES
───────────────────────────────────────── */
function ScanLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,176,0,0.011) 3px, rgba(255,176,0,0.011) 4px)",
        mixBlendMode: "screen",
      }}
    />
  )
}

/* ─────────────────────────────────────────
   BLIP dot
───────────────────────────────────────── */
function Blip({ color = AMBER(0.85) }: { color?: string }) {
  return (
    <span style={{
      display: "inline-block", width: 6, height: 6,
      borderRadius: "50%", background: color,
      boxShadow: `0 0 6px ${color}`, flexShrink: 0,
    }} />
  )
}

/* ─────────────────────────────────────────
   RULE divider
───────────────────────────────────────── */
function Rule({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 10px" }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   READOUT row
───────────────────────────────────────── */
function Readout({ label, value, alert = false }: {
  label: string; value: number | string; alert?: boolean
}) {
  const c = alert ? RED() : DIMWHITE(0.8)
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${AMBER(0.06)}`, fontFamily: "'IBM Plex Mono', monospace" }}>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: AMBER(0.45), textTransform: "uppercase" as const }}>{label}</span>
      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: c, letterSpacing: "0.05em" }}>{value}</span>
    </div>
  )
}

/* ─────────────────────────────────────────
   BIG NUMBER CARD
───────────────────────────────────────── */
function BigNum({ label, value, sub, alert = false }: {
  label: string; value: number; sub?: string; alert?: boolean
}) {
  return (
    <div style={{
      background: PANEL_BG,
      border:     `1px solid ${alert ? RED(0.35) : BORDER}`,
      padding:    "14px 18px",
      position:   "relative",
      overflow:   "hidden",
      boxShadow:  alert ? `inset 0 0 20px ${RED(0.05)}` : "none",
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 14px 14px 0", borderColor: `transparent ${alert ? RED(0.5) : AMBER(0.22)} transparent transparent` }} />

      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.28em", color: alert ? RED(0.65) : AMBER(0.45), textTransform: "uppercase" as const, marginBottom: 6 }}>
        {label}
      </p>
      <p style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem, 3vw, 2.2rem)", lineHeight: 1, color: alert ? RED(0.9) : AMBER(0.9), letterSpacing: "-0.02em" }}>
        {value.toLocaleString()}
      </p>
      {sub && (
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: AMBER(0.3), marginTop: 4, letterSpacing: "0.12em" }}>
          {sub}
        </p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   PANEL WRAPPER
───────────────────────────────────────── */
function Panel({ title, id, children, style = {} }: {
  title: string; id: string; children: React.ReactNode; style?: React.CSSProperties
}) {
  return (
    <div style={{ background: PANEL_BG, border: `1px solid ${BORDER}`, overflow: "hidden", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderBottom: `1px solid ${AMBER(0.15)}`, background: `rgba(255,176,0,0.05)` }}>
        <Blip />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.25em", color: AMBER(0.5) }}>{id}</span>
        <div style={{ width: 1, height: 10, background: AMBER(0.2) }} />
        <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 500, fontSize: "0.82rem", color: DIMWHITE(0.85), letterSpacing: "0.04em" }}>{title}</span>
        <div style={{ flex: 1 }} />
        <span className="live-indicator" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: AMBER(0.2), letterSpacing: "0.15em" }}>■ LIVE</span>
      </div>
      <div style={{ padding: "16px 14px" }}>
        {children}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   TOOLTIP
───────────────────────────────────────── */
function MCTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: "rgba(10,9,0,0.95)", border: `1px solid ${AMBER(0.4)}`, padding: "6px 10px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}>
      {label && <p style={{ color: AMBER(0.5), marginBottom: 3 }}>{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: AMBER(0.9) }}>{p.value}</p>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   DONUT LEGEND
───────────────────────────────────────── */
function MCLegend({ data, colors }: { data: any[]; colors: string[] }) {
  return (
    <div style={{ marginTop: 10 }}>
      {data.map((d, i) => (
        <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: `1px solid ${AMBER(0.06)}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, background: colors[i] }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: AMBER(0.35), textTransform: "uppercase" as const }}>{d.name}</span>
          </div>
          <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: colors[i] }}>{d.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
type Stats = {
  execomTotal: number; execomActive: number
  ideasTotal: number; inventoryTotal: number
  eventsTotal: number; eventsActive: number; eventsUpcoming: number
  usersTotal: number; usersActive: number
  incubationTotal: number; incubationPending: number
}
type CalendarEvent = {
  id: string; title: string; start_datetime: string
  venue: string; is_featured: boolean; is_active: boolean
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function AdminDashboard() {
  useFonts()

  const [stats,           setStats]           = useState<Stats | null>(null)
  const [ideasByMonth,    setIdeasByMonth]    = useState<any[]>([])
  const [execomSplit,     setExecomSplit]     = useState<any[]>([])
  const [inventoryHealth, setInventoryHealth] = useState<any[]>([])
  const [usersActivity,   setUsersActivity]   = useState<any[]>([])
  const [upcomingEvents,  setUpcomingEvents]  = useState<CalendarEvent[]>([])
  const [loading,         setLoading]         = useState(true)

  const fetchDashboard = async () => {
    setLoading(true)

    const now         = new Date().toISOString()
    const activeSince = new Date(Date.now() - 30 * 60 * 1000).toISOString()

    const [
      execomTotal, execomActive, ideasTotal, inventoryItems,
      eventsTotal, eventsActive, eventsUpcoming,
      usersTotal,  usersActive,
      incubationTotal, incubationPending,
    ] = await Promise.all([
      supabase.from("execom_members").select("*", { count: "exact", head: true }),
      supabase.from("execom_members").select("*", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("idea_submissions").select("*", { count: "exact", head: true }),
      supabase.from("inventory_items").select("quantity_available"),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("events").select("*", { count: "exact", head: true }).gt("start_datetime", now),
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("users").select("*", { count: "exact", head: true }).gte("last_sign_in_at", activeSince),
      supabase.from("incubation_requests").select("*", { count: "exact", head: true }),
      supabase.from("incubation_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    ])

    const { data: ideas } = await supabase.from("idea_submissions").select("created_at")
    const monthMap: Record<string, number> = {}
    ideas?.forEach(i => {
      const month = new Date(i.created_at).toLocaleString("default", { month: "short" })
      monthMap[month] = (monthMap[month] || 0) + 1
    })
    setIdeasByMonth(Object.keys(monthMap).map(m => ({ month: m, count: monthMap[m] })))

    setExecomSplit([
      { name: "Active",   value: execomActive.count ?? 0 },
      { name: "Inactive", value: (execomTotal.count ?? 0) - (execomActive.count ?? 0) },
    ])

    let criticallyLow = 0, low = 0, available = 0
    inventoryItems.data?.forEach(item => {
      if      (item.quantity_available < 5)  criticallyLow++
      else if (item.quantity_available < 10) low++
      else                                   available++
    })
    setInventoryHealth([
      { name: "Critical", value: criticallyLow },
      { name: "Low",       value: low            },
      { name: "OK",        value: available      },
    ])

    setUsersActivity([
      { name: "Active",   value: usersActive.count ?? 0 },
      { name: "Inactive", value: (usersTotal.count ?? 0) - (usersActive.count ?? 0) },
    ])

    const { data: events } = await supabase
      .from("events")
      .select("id, title, start_datetime, venue, is_featured, is_active")
      .gte("start_datetime", now)
      .order("start_datetime", { ascending: true })
      .limit(5)
    setUpcomingEvents(events ?? [])

    setStats({
      execomTotal:       execomTotal.count       ?? 0,
      execomActive:      execomActive.count      ?? 0,
      ideasTotal:        ideasTotal.count        ?? 0,
      inventoryTotal:    inventoryItems.data?.length ?? 0,
      eventsTotal:       eventsTotal.count       ?? 0,
      eventsActive:      eventsActive.count      ?? 0,
      eventsUpcoming:    eventsUpcoming.count    ?? 0,
      usersTotal:        usersTotal.count        ?? 0,
      usersActive:       usersActive.count       ?? 0,
      incubationTotal:   incubationTotal.count   ?? 0,
      incubationPending: incubationPending.count ?? 0,
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboard()
    const channel = supabase
      .channel("admin-dashboard-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "idea_submissions"    }, fetchDashboard)
      .on("postgres_changes", { event: "*", schema: "public", table: "inventory_items"     }, fetchDashboard)
      .on("postgres_changes", { event: "*", schema: "public", table: "execom_members"      }, fetchDashboard)
      .on("postgres_changes", { event: "*", schema: "public", table: "events"              }, fetchDashboard)
      .on("postgres_changes", { event: "*", schema: "public", table: "incubation_requests" }, fetchDashboard)
      .on("postgres_changes", { event: "*", schema: "public", table: "users"               }, fetchDashboard)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes mcbar { 0%{transform:translateX(-100%)} 50%{transform:translateX(150%)} 100%{transform:translateX(-100%)} }`}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: AMBER(0.5) }}>
            INITIALISING MISSION CONTROL...
          </span>
          <div style={{ width: 200, height: 1, background: AMBER(0.12), position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent, ${AMBER(0.9)}, transparent)`, animation: "mcbar 1.4s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85), position: "relative" }}>
      <ScanLines />
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;background:${BG}}
        ::-webkit-scrollbar-thumb{background:${AMBER(0.2)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.25}}
        
        /* THE FIX: Adjust grid and layering for mobile */
        .dashboard-main-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 12px 16px 48px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 768px) {
           .dashboard-main-container {
             padding-top: 60px; /* Offset for Top Bar */
           }
        }

        .grid-numbers {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 8px;
        }
        .grid-readout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .grid-charts {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          margin-bottom: 8px;
        }
        .event-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 70px;
          gap: 8px;
        }
        .header-title { font-size: 0.95rem; }
        .clock-container { display: flex; align-items: center; gap: 20px; }

        @media (min-width: 768px) {
          .grid-numbers { grid-template-columns: repeat(4, 1fr); }
          .grid-readout { grid-template-columns: repeat(2, 1fr); gap: 0 48px; }
          .grid-charts { grid-template-columns: repeat(3, 1fr); }
          .event-row { grid-template-columns: 2fr 1fr 100px; gap: 12px; }
        }

        @media (min-width: 1024px) {
          .grid-numbers { grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); }
        }
        
        @media (max-width: 480px) {
          .header-title { font-size: 0.75rem; }
          .clock-container { gap: 10px; }
          .live-indicator { display: none; }
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div style={{
        position: "sticky", 
        top: 0, 
        zIndex: 100, /* Lower than Sidebar's 200 */
        background: "rgba(10,9,0,0.94)", 
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${AMBER(0.18)}`,
        padding: "0 16px", 
        height: 52,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, border: `1px solid ${AMBER(0.5)}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: AMBER(0.9), boxShadow: `0 0 8px ${AMBER(0.7)}` }} />
          </div>
          <div>
            <div className="header-title" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.06em", color: AMBER(0.9), lineHeight: 1 }}>
              IDEA LAB FISAT
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.45rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>
              MISSION CONTROL
            </div>
          </div>
        </div>

        <div className="clock-container">
          <LiveClock />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN(0.9), boxShadow: `0 0 6px ${GREEN(0.5)}`, animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: GREEN(0.6) }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="dashboard-main-container">

        <Rule label="SYS · OVERVIEW" />

        <div className="grid-numbers">
          <BigNum label="Execom Total"      value={stats.execomTotal}       sub={`${stats.execomActive} act`}       />
          <BigNum label="Ideas Submitted"   value={stats.ideasTotal}                                                   />
          <BigNum label="Inventory Items"   value={stats.inventoryTotal}                                               />
          <BigNum label="Total Events"      value={stats.eventsTotal}       sub={`${stats.eventsActive} act`}       />
          <BigNum label="Upcoming Events"   value={stats.eventsUpcoming}                                               />
          <BigNum label="Incubation Req."   value={stats.incubationTotal}   sub={`${stats.incubationPending} pend`} alert={stats.incubationPending > 0} />
          <BigNum label="Registered Users"  value={stats.usersTotal}        sub={`${stats.usersActive} online`}    />
        </div>

        <Panel title="System Readout" id="SYS.01" style={{ marginBottom: 8 }}>
          <div className="grid-readout">
            <Readout label="Execom Active Ratio"   value={`${stats.execomActive} / ${stats.execomTotal}`} />
            <Readout label="Events Currently Active" value={stats.eventsActive} />
            <Readout label="Incubation Pending"    value={stats.incubationPending} alert={stats.incubationPending > 0} />
            <Readout label="Users Online (30 min)" value={stats.usersActive} />
            <Readout label="Inventory Tracked"     value={stats.inventoryTotal} />
            <Readout label="Ideas in Pipeline"     value={stats.ideasTotal} />
          </div>
        </Panel>

        <Rule label="SYS · ANALYTICS" />

        <Panel title="Ideas Submitted — Monthly Trend" id="ANA.01" style={{ marginBottom: 8 }}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ideasByMonth} margin={{ top: 4, right: 4, left: -25, bottom: 0 }}>
              <XAxis
                dataKey="month"
                tick={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fill: AMBER(0.4) }}
                axisLine={{ stroke: AMBER(0.1) }} tickLine={false}
              />
              <YAxis
                tick={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fill: AMBER(0.3) }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<MCTooltip />} cursor={{ fill: AMBER(0.04) }} />
              <Bar dataKey="count" fill={AMBER(0.8)} radius={[1,1,0,0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <div className="grid-charts">
          <Panel title="Execom Status" id="ANA.02">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={execomSplit} dataKey="value" nameKey="name" innerRadius={45} outerRadius={65} paddingAngle={3} strokeWidth={0}>
                  <Cell fill={AMBER(0.85)} />
                  <Cell fill={AMBER(0.12)} />
                </Pie>
                <Tooltip content={<MCTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <MCLegend data={execomSplit} colors={[AMBER(0.85), AMBER(0.25)]} />
          </Panel>

          <Panel title="Inventory Health" id="ANA.03">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={inventoryHealth} dataKey="value" nameKey="name" innerRadius={45} outerRadius={65} paddingAngle={3} strokeWidth={0}>
                  <Cell fill={RED(0.85)}  />
                  <Cell fill={AMBER(0.7)} />
                  <Cell fill={GREEN(0.7)} />
                </Pie>
                <Tooltip content={<MCTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <MCLegend data={inventoryHealth} colors={[RED(0.85), AMBER(0.7), GREEN(0.7)]} />
          </Panel>

          <Panel title="User Activity — 30 Min" id="ANA.04">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={usersActivity} dataKey="value" nameKey="name" innerRadius={45} outerRadius={65} paddingAngle={3} strokeWidth={0}>
                  <Cell fill={GREEN(0.8)}  />
                  <Cell fill={AMBER(0.1)} />
                </Pie>
                <Tooltip content={<MCTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <MCLegend data={usersActivity} colors={[GREEN(0.8), AMBER(0.25)]} />
          </Panel>
        </div>

        {upcomingEvents.length > 0 && (
          <>
            <Rule label="SYS · UPCOMING EVENTS LOG" />
            <Panel title="Upcoming Events" id="EVT.01">
              <div className="event-row" style={{ padding: "4px 6px", borderBottom: `1px solid ${AMBER(0.18)}`, marginBottom: 4 }}>
                {["EVENT TITLE", "VENUE", "DATE"].map(h => (
                  <span key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: AMBER(0.35) }}>{h}</span>
                ))}
              </div>

              {upcomingEvents.map(ev => (
                <div key={ev.id} className="event-row" style={{ padding: "7px 6px", borderBottom: `1px solid ${AMBER(0.06)}`, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                    <Blip color={ev.is_featured ? AMBER(0.9) : AMBER(0.3)} />
                    <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontSize: "0.8rem", color: DIMWHITE(0.8), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</span>
                  </div>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: AMBER(0.4), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {ev.venue || "—"}
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: AMBER(0.55), whiteSpace: "nowrap" }}>
                    {new Date(ev.start_datetime).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                  </span>
                </div>
              ))}
            </Panel>
          </>
        )}

        {/* ── FOOTER ── */}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", justifyContent: "center", paddingTop: 12, borderTop: `1px solid ${AMBER(0.1)}` }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: AMBER(0.2), textAlign: "center" }}>
            FISAT AICTE IDEA LAB · ADMIN CONSOLE v1.0
          </span>
          <LiveClock />
        </div>
      </div>
    </div>
  )
}