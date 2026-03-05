'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Shield, User, Search, Download } from 'lucide-react'

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "users-mc-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ─────────────────────────────────────────
   TYPE — unchanged
───────────────────────────────────────── */
type UserRecord = {
  id: string
  email: string
  name: string | null
  role: 'admin' | 'guest' | null
  created_at: string
  last_sign_in_at: string | null
}

/* ─────────────────────────────────────────
   USER CARD
───────────────────────────────────────── */
function UserCard({ user }: { user: UserRecord }) {
  const [hov, setHov] = useState(false)
  const isAdmin  = user.role === 'admin'
  const display  = user.name || user.email.split('@')[0]
  const shortId  = user.id.slice(0, 8).toUpperCase()
  const isOnline = user.last_sign_in_at
    ? Date.now() - new Date(user.last_sign_in_at).getTime() < 30 * 60 * 1000
    : false

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:     "relative",
        display:      "flex",
        flexDirection:"column",
        justifyContent:"space-between",
        background:   hov ? `rgba(255,176,0,0.05)` : PANEL,
        border:       `1px solid ${hov ? AMBER(0.28) : BORDER}`,
        overflow:     "hidden",
        transition:   "border 0.22s, background 0.22s",
        minHeight:    170,
      }}
    >
      {/* top shimmer */}
      {hov && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.55)}, transparent)` }} />
      )}

      {/* left stripe */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hov ? 2 : 1,
        background: isAdmin
          ? hov ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.45)}, transparent)`
          : hov ? `linear-gradient(to bottom, transparent, ${AMBER(0.35)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.12)}, transparent)`,
        transition: "background 0.22s, width 0.15s",
      }} />

      {/* HUD corner */}
      <div style={{ position: "absolute", top: 7, right: 7, width: 8, height: 8, borderTop: `1px solid ${isAdmin ? AMBER(0.4) : AMBER(0.15)}`, borderRight: `1px solid ${isAdmin ? AMBER(0.4) : AMBER(0.15)}` }} />

      {/* ── BODY ── */}
      <div style={{ padding: "14px 14px 10px 16px" }}>
        {/* id + role badge row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.28) }}>
            USR·{shortId}
          </span>
          <span style={{
            fontFamily:    "'IBM Plex Mono', monospace",
            fontSize:      "0.48rem",
            letterSpacing: "0.18em",
            padding:       "2px 8px",
            color:         isAdmin ? AMBER(0.85) : DIMWHITE(0.3),
            background:    isAdmin ? AMBER(0.09) : "rgba(255,255,255,0.03)",
            border:        `1px solid ${isAdmin ? AMBER(0.3) : "rgba(255,255,255,0.07)"}`,
          }}>
            {isAdmin ? "ADMIN" : "GUEST"}
          </span>
        </div>

        {/* avatar row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* avatar */}
          <div style={{
            width: 40, height: 40, flexShrink: 0,
            border: `1px solid ${isAdmin ? AMBER(0.35) : AMBER(0.12)}`,
            background: isAdmin ? AMBER(0.07) : "rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            {isAdmin
              ? <Shield style={{ width: 16, height: 16, color: AMBER(0.7) }} />
              : <User   style={{ width: 16, height: 16, color: DIMWHITE(0.3) }} />
            }
            {/* online blip */}
            {isOnline && (
              <div style={{ position: "absolute", bottom: -2, right: -2, width: 6, height: 6, borderRadius: "50%", background: GREEN(0.9), boxShadow: `0 0 5px ${GREEN(0.6)}`, border: `1px solid ${BG}`, animation: "mcpulse 2s ease-in-out infinite" }} />
            )}
          </div>

          {/* name + email */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: DIMWHITE(0.9), lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {display}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.04em", color: AMBER(0.35), marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.email}
            </div>
          </div>
        </div>
      </div>

      {/* ── META FOOTER ── */}
      <div style={{
        padding:     "8px 14px 10px 16px",
        borderTop:   `1px solid ${AMBER(0.07)}`,
        background:  "rgba(0,0,0,0.15)",
        display:     "flex",
        flexDirection:"column",
        gap:         3,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", color: AMBER(0.25) }}>JOINED</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: DIMWHITE(0.4) }}>
            {new Date(user.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", color: AMBER(0.25) }}>LAST LOGIN</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: isOnline ? GREEN(0.65) : DIMWHITE(0.35) }}>
            {user.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
              : "NEVER"}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MC INPUT
───────────────────────────────────────── */
function MCInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder: string
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div style={{ position: "relative", flex: 1 }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1,
        background: foc
          ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)`
          : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`,
        transition: "background 0.2s, width 0.15s",
      }} />
      <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: AMBER(foc ? 0.5 : 0.2), pointerEvents: "none" }} />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFoc(true)}
        onBlur={() => setFoc(false)}
        placeholder={placeholder}
        style={{
          width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
          background:   foc ? `rgba(255,176,0,0.04)` : PANEL,
          borderTop:    `1px solid ${foc ? AMBER(0.28) : AMBER(0.1)}`,
          borderRight:  `1px solid ${foc ? AMBER(0.28) : AMBER(0.1)}`,
          borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.1)}`,
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
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase/filter/CSV logic untouched
───────────────────────────────────────── */
export default function AdminUsersPage() {
  useFonts()

  const [users,      setUsers]      = useState<UserRecord[]>([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'guest'>('all')

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, role, created_at, last_sign_in_at')
        .order('created_at', { ascending: false })
      if (error) console.error('FETCH USERS ERROR:', error)
      if (data) setUsers(data as UserRecord[])
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const query = search.toLowerCase()
      const matchesSearch =
        user.email.toLowerCase().includes(query) ||
        (user.name?.toLowerCase().includes(query) ?? false)
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      return matchesSearch && matchesRole
    })
  }, [users, search, roleFilter])

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Joined At', 'Last Sign In']
    const rows = filteredUsers.map(u => [
      u.name || u.email.split('@')[0],
      u.email,
      u.role || 'guest',
      new Date(u.created_at).toLocaleString(),
      u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : 'Never',
    ])
    const csv  = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'idea_lab_users.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /* ── LOADING ── */
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "40px 0" }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>
          LOADING USERS...
        </span>
        <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`}</style>
      </div>
    )
  }

  if (!users.length) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>
          NO USERS VISIBLE
        </span>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: DIMWHITE(0.2) }}>
          Check RLS policy / admin role
        </span>
      </div>
    )
  }

  const adminCount = filteredUsers.filter(u => u.role === 'admin').length
  const guestCount = filteredUsers.filter(u => u.role !== 'admin').length

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes mcpulse  { 0%,100%{opacity:1} 50%{opacity:0.25} }
        input::placeholder  { color: ${AMBER(0.2)}; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; letter-spacing: 0.06em; }
        option { background: #0a0900; color: rgba(220,215,200,0.8); }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* ── RULE ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>
            SYS · USER REGISTRY
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Registered Users
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Users who have signed in to IDEA Lab
            </p>
          </div>

          {/* stats strip */}
          <div style={{ display: "flex", gap: 0, border: `1px solid ${AMBER(0.12)}` }}>
            {[
              { label: "TOTAL", val: filteredUsers.length },
              { label: "ADMIN", val: adminCount           },
              { label: "GUEST", val: guestCount           },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "8px 16px", borderLeft: i > 0 ? `1px solid ${AMBER(0.1)}` : "none", textAlign: "center" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.22em", color: AMBER(0.35) }}>{s.label}</div>
                <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: AMBER(0.85), lineHeight: 1.1 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTROLS ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20, alignItems: "stretch" }}>
          {/* search */}
          <MCInput value={search} onChange={setSearch} placeholder="SEARCH BY NAME OR EMAIL..." />

          {/* role filter */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)` }} />
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value as 'all' | 'admin' | 'guest')}
              style={{
                paddingLeft:   14,
                paddingRight:  28,
                paddingTop:    9,
                paddingBottom: 9,
                background:    PANEL,
                borderTop:     `1px solid ${AMBER(0.1)}`,
                borderRight:   `1px solid ${AMBER(0.1)}`,
                borderBottom:  `1px solid ${AMBER(0.1)}`,
                borderLeft:    "none",
                outline:       "none",
                color:         DIMWHITE(0.7),
                fontFamily:    "'IBM Plex Mono', monospace",
                fontSize:      "0.68rem",
                letterSpacing: "0.1em",
                cursor:        "pointer",
                appearance:    "none" as any,
              }}
            >
              <option value="all">ALL ROLES</option>
              <option value="admin">ADMIN</option>
              <option value="guest">GUEST</option>
            </select>
          </div>

          {/* export */}
          <button
            onClick={exportCSV}
            style={{
              display:       "flex",
              alignItems:    "center",
              gap:           7,
              paddingLeft:   16,
              paddingRight:  16,
              paddingTop:    9,
              paddingBottom: 9,
              background:    "transparent",
              border:        `1px solid ${AMBER(0.22)}`,
              color:         AMBER(0.6),
              fontFamily:    "'IBM Plex Mono', monospace",
              fontSize:      "0.62rem",
              letterSpacing: "0.2em",
              cursor:        "pointer",
              transition:    "background 0.18s, border-color 0.18s, color 0.18s",
            }}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background   = AMBER(0.07)
              b.style.borderColor  = AMBER(0.4)
              b.style.color        = AMBER(0.85)
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background   = "transparent"
              b.style.borderColor  = AMBER(0.22)
              b.style.color        = AMBER(0.6)
            }}
          >
            <Download style={{ width: 13, height: 13 }} />
            EXPORT CSV
          </button>
        </div>

        {/* ── RESULT COUNT ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.22em", color: AMBER(0.25) }}>
            {filteredUsers.length} RECORD{filteredUsers.length !== 1 ? "S" : ""} FOUND
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)` }} />
        </div>

        {/* ── GRID ── */}
        {filteredUsers.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>
              NO USERS MATCH FILTER
            </span>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 8 }}>
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}