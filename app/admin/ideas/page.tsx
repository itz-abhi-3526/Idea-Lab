"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AdminIdeaCard from "@/components/admin/ideas/AdminIdeaCard"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "ideas-mc-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

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
   FILTER TABS
───────────────────────────────────────── */
const FILTERS: { key: "all" | "pending" | "ongoing" | "completed"; label: string }[] = [
  { key: "all",       label: "ALL"       },
  { key: "pending",   label: "PENDING"   },
  { key: "ongoing",   label: "ONGOING"   },
  { key: "completed", label: "COMPLETED" },
]

/* ─────────────────────────────────────────
   PAGE — all supabase/realtime/filter logic untouched
───────────────────────────────────────── */
export default function AdminIdeasPage() {
  useFonts()

  const [ideas,   setIdeas]   = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState("")
  const [filter,  setFilter]  = useState<"all" | "pending" | "ongoing" | "completed">("all")
  const [searchFoc, setSearchFoc] = useState(false)

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  const fetchIdeas = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("idea_submissions")
      .select("id, idea_title, idea_description, domain, status, created_at")
      .order("created_at", { ascending: false })
    setIdeas(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchIdeas()
    const channel = supabase
      .channel("admin-ideas-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "idea_submissions" }, fetchIdeas)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch =
      idea.idea_title.toLowerCase().includes(search.toLowerCase()) ||
      idea.idea_description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "pending"   && idea.status === "submitted") ||
      (filter === "ongoing"   && idea.status === "approved")  ||
      (filter === "completed" && idea.status === "completed")
    return matchesSearch && matchesFilter
  })

  const stats = {
    total:     ideas.length,
    pending:   ideas.filter(i => i.status === "submitted").length,
    ongoing:   ideas.filter(i => i.status === "approved").length,
    completed: ideas.filter(i => i.status === "completed").length,
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes shimmer { from{left:-40%} to{left:140%} }
        input::placeholder { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em; }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* ── RULE ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>
            SYS · IDEA PIPELINE
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
            Ideas
          </h1>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
            Review and manage ideas submitted to IDEA Lab
          </p>
        </div>

        {/* ── STATS STRIP ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
          {[
            { label: "TOTAL",     val: stats.total,     active: filter === "all"       },
            { label: "PENDING",   val: stats.pending,   active: filter === "pending"   },
            { label: "ONGOING",   val: stats.ongoing,   active: filter === "ongoing"   },
            { label: "COMPLETED", val: stats.completed, active: filter === "completed" },
          ].map(s => (
            <div
              key={s.label}
              onClick={() => setFilter(s.label.toLowerCase() as any)}
              style={{
                position:   "relative",
                padding:    "12px 16px",
                background: s.active ? `rgba(255,176,0,0.07)` : PANEL,
                border:     `1px solid ${s.active ? AMBER(0.3) : BORDER}`,
                cursor:     "pointer",
                overflow:   "hidden",
                transition: "border 0.2s, background 0.2s",
              }}
            >
              {s.active && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.6)}, transparent)` }} />
              )}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: s.active ? 2 : 1, background: s.active ? `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.12)}, transparent)` }} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.28em", color: s.active ? AMBER(0.55) : AMBER(0.28), marginBottom: 5 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: s.active ? AMBER(0.9) : DIMWHITE(0.55), lineHeight: 1 }}>
                {s.val}
              </div>
            </div>
          ))}
        </div>

        {/* ── CONTROLS ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 8, marginBottom: 20 }}>
          {/* search */}
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: searchFoc ? 2 : 1,
              background: searchFoc
                ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)`
                : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`,
              transition: "background 0.2s, width 0.15s",
            }} />
            <input
              type="text"
              placeholder="SEARCH IDEAS..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFoc(true)}
              onBlur={() => setSearchFoc(false)}
              style={{
                width: "100%", paddingLeft: 14, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
                background:   searchFoc ? `rgba(255,176,0,0.04)` : PANEL,
                borderTop:    `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                borderRight:  `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                borderBottom: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                borderLeft:   "none",
                outline:      "none",
                color:        DIMWHITE(0.8),
                fontFamily:   "'IBM Plex Mono', monospace",
                fontSize:     "0.7rem",
                letterSpacing:"0.06em",
                transition:   "background 0.2s",
              }}
            />
          </div>

          {/* filter tabs */}
          <div style={{ display: "flex", gap: 4 }}>
            {FILTERS.map(f => (
              <FilterBtn
                key={f.key}
                label={f.label}
                active={filter === f.key}
                onClick={() => setFilter(f.key)}
              />
            ))}
          </div>
        </div>

        {/* ── RESULT COUNT ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.22em", color: AMBER(0.25) }}>
            {filteredIdeas.length} IDEA{filteredIdeas.length !== 1 ? "S" : ""} FOUND
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)` }} />
          {/* live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: `rgba(0,255,120,0.85)`, boxShadow: `0 0 4px rgba(0,255,120,0.5)`, animation: "mcpulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: `rgba(0,255,120,0.45)` }}>LIVE</span>
          </div>
        </div>

        {/* ── CONTENT ── */}
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "40px 0" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>
              LOADING PIPELINE...
            </span>
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>
              NO IDEAS FOUND
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filteredIdeas.map(idea => (
              <AdminIdeaCard
                key={idea.id}
                idea={idea}
                onStatusChange={fetchIdeas}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   FILTER BUTTON
───────────────────────────────────────── */
function FilterBtn({ label, active, onClick }: {
  label: string; active: boolean; onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:    "'IBM Plex Mono', monospace",
        fontSize:      "0.58rem",
        letterSpacing: "0.18em",
        padding:       "9px 14px",
        background:    active ? `rgba(255,176,0,0.09)` : hov ? `rgba(255,176,0,0.04)` : "transparent",
        borderTop:     `1px solid ${active ? `rgba(255,176,0,0.32)` : `rgba(255,176,0,0.1)`}`,
        borderRight:   `1px solid ${active ? `rgba(255,176,0,0.32)` : `rgba(255,176,0,0.1)`}`,
        borderBottom:  `1px solid ${active ? `rgba(255,176,0,0.32)` : `rgba(255,176,0,0.1)`}`,
        borderLeft:    "none",
        color:         active ? `rgba(255,176,0,0.9)` : `rgba(220,215,200,0.3)`,
        cursor:        "pointer",
        whiteSpace:    "nowrap" as const,
        transition:    "background 0.18s, color 0.18s",
        position:      "relative",
      }}
    >
      {active && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, rgba(255,176,0,0.8), transparent)` }} />
      )}
      {label}
    </button>
  )
}