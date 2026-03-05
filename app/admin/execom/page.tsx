"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AddExecomModal, { ExecomMember } from "../../../components/admin/AddExecomModal"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "execom-mc-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

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

/* ─────────────────────────────────────────
   MEMBER CARD
───────────────────────────────────────── */
function MemberCard({
  member,
  index,
  onToggle,
  onEdit,
}: {
  member: ExecomMember
  index: number
  onToggle: () => void
  onEdit: () => void
}) {
  const [hov, setHov] = useState(false)
  const shortId = member.id?.toString().slice(0, 6).toUpperCase() ?? "------"

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:     "relative",
        display:      "flex",
        flexDirection:"column",
        gap:          0,
        background:   hov ? `rgba(255,176,0,0.05)` : PANEL,
        border:       `1px solid ${hov ? AMBER(0.3) : BORDER}`,
        overflow:     "hidden",
        transition:   "border 0.22s, background 0.22s",
      }}
    >
      {/* top shimmer on hover */}
      {hov && (
        <div style={{
          position:   "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(to right, transparent, ${AMBER(0.6)}, transparent)`,
        }} />
      )}

      {/* left stripe */}
      <div style={{
        position:   "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1,
        background: hov
          ? `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)`
          : `linear-gradient(to bottom, transparent, ${AMBER(0.15)}, transparent)`,
        transition: "background 0.22s, width 0.15s",
      }} />

      {/* HUD corner */}
      <div style={{ position: "absolute", top: 8, right: 8, width: 10, height: 10, borderTop: `1px solid ${hov ? AMBER(0.4) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.4) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

      {/* ── BODY ── */}
      <div style={{ padding: "16px 16px 12px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>

        {/* avatar */}
        <div style={{
          width: 52, height: 52, flexShrink: 0,
          border: `1px solid ${member.is_active ? AMBER(0.3) : AMBER(0.1)}`,
          overflow: "hidden",
          position: "relative",
          background: AMBER(0.05),
        }}>
          {member.image_url ? (
            <img src={member.image_url} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: AMBER(0.4) }}>
              {member.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
          )}
          {/* active pulse overlay */}
          {member.is_active && (
            <div style={{ position: "absolute", bottom: 4, right: 4, width: 5, height: 5, borderRadius: "50%", background: GREEN(0.9), boxShadow: `0 0 5px ${GREEN(0.6)}`, animation: "mcpulse 2s ease-in-out infinite" }} />
          )}
        </div>

        {/* info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.2em", color: AMBER(0.3), marginBottom: 3 }}>
            MBR·{shortId}
          </div>
          <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "0.01em", color: DIMWHITE(0.9), lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {member.name}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: AMBER(0.65), marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {member.designation}
          </div>
          {member.role && (
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: DIMWHITE(0.35), marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {member.role}
            </div>
          )}
        </div>
      </div>

      {/* ── STATUS + ACTIONS ── */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "9px 16px 9px 18px",
        borderTop:      `1px solid ${AMBER(0.08)}`,
        background:     "rgba(0,0,0,0.15)",
      }}>
        {/* status badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 4, height: 4, borderRadius: "50%",
            background:  member.is_active ? GREEN(0.85) : AMBER(0.2),
            boxShadow:   member.is_active ? `0 0 5px ${GREEN(0.5)}` : "none",
            animation:   member.is_active ? "mcpulse 2.5s ease-in-out infinite" : "none",
          }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.2em", color: member.is_active ? GREEN(0.6) : AMBER(0.25) }}>
            {member.is_active ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>

        {/* action buttons */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={onToggle}
            style={{
              fontFamily:    "'IBM Plex Mono', monospace",
              fontSize:      "0.52rem",
              letterSpacing: "0.18em",
              padding:       "4px 10px",
              background:    member.is_active ? RED(0.07) : GREEN(0.07),
              border:        `1px solid ${member.is_active ? RED(0.25) : GREEN(0.25)}`,
              color:         member.is_active ? RED(0.8) : GREEN(0.75),
              cursor:        "pointer",
              transition:    "background 0.18s",
            }}
          >
            {member.is_active ? "DISABLE" : "ENABLE"}
          </button>

          <button
            onClick={onEdit}
            style={{
              fontFamily:    "'IBM Plex Mono', monospace",
              fontSize:      "0.52rem",
              letterSpacing: "0.18em",
              padding:       "4px 10px",
              background:    "transparent",
              border:        `1px solid ${AMBER(0.2)}`,
              color:         AMBER(0.55),
              cursor:        "pointer",
              transition:    "background 0.18s, border-color 0.18s, color 0.18s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = AMBER(0.07)
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.4)
              ;(e.currentTarget as HTMLButtonElement).style.color = AMBER(0.85)
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent"
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.2)
              ;(e.currentTarget as HTMLButtonElement).style.color = AMBER(0.55)
            }}
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase/realtime/modal logic untouched
───────────────────────────────────────── */
export default function ExecomPage() {
  useFonts()

  const [members,    setMembers]    = useState<ExecomMember[]>([])
  const [loading,    setLoading]    = useState(true)
  const [showAdd,    setShowAdd]    = useState(false)
  const [editMember, setEditMember] = useState<ExecomMember | null>(null)
  const [search,     setSearch]     = useState("")
  const [searchFoc,  setSearchFoc]  = useState(false)

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  const fetchExecom = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("execom_members")
      .select("*")
      .order("display_order", { ascending: true })
    setMembers(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchExecom()

    const channel = supabase
      .channel("execom-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "execom_members" }, fetchExecom)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const filteredMembers = members.filter(m =>
    `${m.name} ${m.designation} ${m.role ?? ""}`.toLowerCase().includes(search.toLowerCase())
  )

  const toggleActive = async (member: ExecomMember) => {
    await supabase
      .from("execom_members")
      .update({ is_active: !member.is_active })
      .eq("id", member.id)
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        input::placeholder { color: ${AMBER(0.25)}; }
      `}</style>

      {/* scan lines */}
      <div aria-hidden style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,176,0,0.009) 3px, rgba(255,176,0,0.009) 4px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* ── RULE ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>
            SYS · EXECOM REGISTRY
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        {/* ── HEADER ROW ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Execom Members
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.35), marginTop: 5 }}>
              Manage IDEA Lab executive committee
            </p>
          </div>

          {/* count + add */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", color: AMBER(0.35), paddingRight: 10, borderRight: `1px solid ${AMBER(0.1)}` }}>
              {filteredMembers.length} / {members.length}
            </div>
            <button
              onClick={() => setShowAdd(true)}
              style={{
                position:      "relative",
                overflow:      "hidden",
                fontFamily:    "'IBM Plex Mono', monospace",
                fontSize:      "0.65rem",
                letterSpacing: "0.2em",
                padding:       "9px 20px",
                background:    AMBER(0.9),
                color:         BG,
                fontWeight:    600,
                border:        "none",
                cursor:        "pointer",
                boxShadow:     `0 0 16px ${AMBER(0.25)}`,
                transition:    "box-shadow 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 24px ${AMBER(0.45)}`}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 16px ${AMBER(0.25)}`}
            >
              + ADD MEMBER
            </button>
          </div>
        </div>

        {/* ── SEARCH ── */}
        <div style={{ position: "relative", maxWidth: 360, marginBottom: 24 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: searchFoc ? `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`, transition: "background 0.22s" }} />
          <input
            type="text"
            placeholder="SEARCH MEMBER..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFoc(true)}
            onBlur={() => setSearchFoc(false)}
            style={{
              width:         "100%",
              paddingLeft:   14,
              paddingRight:  12,
              paddingTop:    9,
              paddingBottom: 9,
              background:    searchFoc ? `rgba(255,176,0,0.04)` : PANEL,
              borderTop:     `1px solid ${searchFoc ? AMBER(0.25) : AMBER(0.1)}`,
              borderRight:   `1px solid ${searchFoc ? AMBER(0.25) : AMBER(0.1)}`,
              borderBottom:  `1px solid ${searchFoc ? AMBER(0.25) : AMBER(0.1)}`,
              borderLeft:    "none",
              outline:       "none",
              color:         DIMWHITE(0.8),
              fontFamily:    "'IBM Plex Mono', monospace",
              fontSize:      "0.72rem",
              letterSpacing: "0.1em",
              transition:    "background 0.22s",
            }}
          />
        </div>

        {/* ── CONTENT ── */}
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "40px 0" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>
              LOADING REGISTRY...
            </span>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>
              NO MEMBERS FOUND
            </span>
          </div>
        ) : (
          <>
            {/* result count row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.22em", color: AMBER(0.25) }}>
                {filteredMembers.length} RECORD{filteredMembers.length !== 1 ? "S" : ""} FOUND
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)` }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
              {filteredMembers.map((member, i) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={i}
                  onToggle={() => toggleActive(member)}
                  onEdit={() => setEditMember(member)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── MODAL — unchanged ── */}
      <AddExecomModal
        open={showAdd || !!editMember}
        onClose={() => { setShowAdd(false); setEditMember(null) }}
        member={editMember}
      />
    </div>
  )
}