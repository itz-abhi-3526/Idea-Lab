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
  onToggle,
  onEdit,
}: {
  member: ExecomMember
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
        background:   hov ? `rgba(255,176,0,0.05)` : PANEL,
        border:       `1px solid ${hov ? AMBER(0.3) : BORDER}`,
        overflow:     "hidden",
        transition:   "border 0.22s, background 0.22s",
      }}
    >
      {hov && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.6)}, transparent)` }} />
      )}

      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1, background: hov ? `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.15)}, transparent)`, transition: "background 0.22s, width 0.15s" }} />

      <div style={{ position: "absolute", top: 8, right: 8, width: 10, height: 10, borderTop: `1px solid ${hov ? AMBER(0.4) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.4) : AMBER(0.15)}` }} />

      <div style={{ padding: "16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 52, height: 52, flexShrink: 0, border: `1px solid ${member.is_active ? AMBER(0.3) : AMBER(0.1)}`, background: AMBER(0.05), overflow: "hidden", position: "relative" }}>
          {member.image_url ? (
            <img src={member.image_url} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: AMBER(0.4) }}>
              {member.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
          )}
          {member.is_active && (
            <div style={{ position: "absolute", bottom: 4, right: 4, width: 5, height: 5, borderRadius: "50%", background: GREEN(0.9), boxShadow: `0 0 5px ${GREEN(0.6)}`, animation: "mcpulse 2s infinite" }} />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.2em", color: AMBER(0.25), marginBottom: 3 }}>MBR·{shortId}</div>
          <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: DIMWHITE(0.9), lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{member.name}</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", color: AMBER(0.6), marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{member.designation}</div>
          {member.role && (
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: DIMWHITE(0.3), marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{member.role}</div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: `1px solid ${AMBER(0.08)}`, background: "rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: member.is_active ? GREEN(0.8) : AMBER(0.2) }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: member.is_active ? GREEN(0.6) : AMBER(0.3) }}>{member.is_active ? "ACTIVE" : "INACTIVE"}</span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={onToggle} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", padding: "4px 10px", background: member.is_active ? RED(0.07) : GREEN(0.07), border: `1px solid ${member.is_active ? RED(0.2) : GREEN(0.2)}`, color: member.is_active ? RED(0.8) : GREEN(0.7), cursor: "pointer" }}>
            {member.is_active ? "DISABLE" : "ENABLE"}
          </button>
          <button onClick={onEdit} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", padding: "4px 10px", background: "transparent", border: `1px solid ${AMBER(0.2)}`, color: AMBER(0.55), cursor: "pointer" }}>
            EDIT
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ExecomPage() {
  useFonts()

  const [members,    setMembers]    = useState<ExecomMember[]>([])
  const [loading,    setLoading]    = useState(true)
  const [showAdd,    setShowAdd]    = useState(false)
  const [editMember, setEditMember] = useState<ExecomMember | null>(null)
  const [search,     setSearch]     = useState("")
  const [searchFoc,  setSearchFoc]  = useState(false)

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
    const channel = supabase.channel("execom-realtime").on("postgres_changes", { event: "*", schema: "public", table: "execom_members" }, fetchExecom).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const filteredMembers = members.filter(m =>
    `${m.name} ${m.designation} ${m.role ?? ""}`.toLowerCase().includes(search.toLowerCase())
  )

  const toggleActive = async (member: ExecomMember) => {
    await supabase.from("execom_members").update({ is_active: !member.is_active }).eq("id", member.id)
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        input::placeholder { color: ${AMBER(0.25)}; }
        .grid-header { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .search-wrapper { position: relative; width: 100%; max-width: 360px; margin-bottom: 24px; }
        .members-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }

        @media (min-width: 768px) {
          .grid-header { flex-direction: row; align-items: flex-start; justify-content: space-between; }
        }
      `}</style>

      <div aria-hidden style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,176,0,0.009) 3px, rgba(255,176,0,0.009) 4px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "28px 16px 48px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: 'nowrap' }}>SYS · EXECOM REGISTRY</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        <div className="grid-header">
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: AMBER(0.9), margin: 0 }}>Execom Members</h1>
            <p style={{ fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>Manage committee records</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.58rem", color: AMBER(0.3) }}>{filteredMembers.length} / {members.length}</div>
            <button onClick={() => setShowAdd(true)} style={{ background: AMBER(0.9), color: BG, border: "none", padding: "10px 20px", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.15em", cursor: "pointer" }}>+ ADD MEMBER</button>
          </div>
        </div>

        <div className="search-wrapper">
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: searchFoc ? AMBER(0.85) : AMBER(0.18), transition: "all 0.2s" }} />
          <input
            placeholder="SEARCH MEMBER..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFoc(true)}
            onBlur={() => setSearchFoc(false)}
            style={{ width: "100%", padding: "10px 14px", background: searchFoc ? `rgba(255,176,0,0.04)` : PANEL, border: "none", borderTop: `1px solid ${AMBER(0.1)}`, borderRight: `1px solid ${AMBER(0.1)}`, borderBottom: `1px solid ${AMBER(0.1)}`, outline: "none", color: DIMWHITE(0.85), fontFamily: "'IBM Plex Mono'", fontSize: "0.7rem" }}
          />
        </div>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "40px 0" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.68rem", color: AMBER(0.35) }}>LOADING REGISTRY...</span>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div style={{ padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL, textAlign: "center" }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.65rem", color: AMBER(0.25) }}>NO MEMBERS FOUND</span>
          </div>
        ) : (
          <div className="members-grid">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} onToggle={() => toggleActive(member)} onEdit={() => setEditMember(member)} />
            ))}
          </div>
        )}
      </div>

      <AddExecomModal
        open={showAdd || !!editMember}
        onClose={() => { setShowAdd(false); setEditMember(null) }}
        member={editMember}
      />
    </div>
  )
}