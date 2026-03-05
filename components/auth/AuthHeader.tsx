"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

function useFonts() {
  useEffect(() => {
    const id = "auth-header-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id; l.rel = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&display=swap"
    document.head.prepend(l)
  }, [])
}

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`

export default function AuthHeader() {
  useFonts()

  const [user,   setUser]   = useState<any>(null)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [open,   setOpen]   = useState(false)

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      if (data.user) {
        const { data: profile } = await supabase
          .from("users").select("avatar_url").eq("id", data.user.id).single()
        setAvatar(profile?.avatar_url ?? null)
      }
    }
    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase.from("users").select("avatar_url").eq("id", session.user.id).single()
          .then(({ data }) => { setAvatar(data?.avatar_url ?? null) })
      } else {
        setAvatar(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  /* ── LOGGED OUT ── */
  if (!user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <style>{`@keyframes ahblink{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>

        <Link href="/login" style={{ textDecoration: "none" }}>
          <button
            style={{
              fontFamily:    "'IBM Plex Mono', monospace",
              fontSize:      "0.6rem",
              letterSpacing: "0.18em",
              padding:       "7px 16px",
              background:    "transparent",
              borderTop:     "1px solid rgba(255,255,255,0.15)",
              borderRight:   "1px solid rgba(255,255,255,0.15)",
              borderBottom:  "1px solid rgba(255,255,255,0.15)",
              borderLeft:    "none",
              color:         DIMWHITE(0.65),
              cursor:        "pointer",
              transition:    "border-color 0.18s, color 0.18s",
              position:      "relative",
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(255,255,255,0.35)"; b.style.color = DIMWHITE(0.9) }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(255,255,255,0.15)"; b.style.color = DIMWHITE(0.65) }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)" }} />
            LOGIN
          </button>
        </Link>

        <Link href="/signup" style={{ textDecoration: "none" }}>
          <button
            style={{
              fontFamily:    "'IBM Plex Mono', monospace",
              fontSize:      "0.6rem",
              letterSpacing: "0.18em",
              padding:       "7px 16px",
              background:    AMBER(0.9),
              border:        "none",
              color:         "#0a0900",
              fontWeight:    600,
              cursor:        "pointer",
              boxShadow:     `0 0 12px ${AMBER(0.25)}`,
              transition:    "box-shadow 0.18s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${AMBER(0.45)}`}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 12px ${AMBER(0.25)}`}
          >
            SIGN UP
          </button>
        </Link>
      </div>
    )
  }

  /* ── LOGGED IN ── */
  const name    = user.user_metadata?.display_name || user.email?.charAt(0).toUpperCase() || "U"
  const isAdmin = user.user_metadata?.role === "admin" || user.user_metadata?.is_admin === true

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @keyframes ahblink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes ahpulse  { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>

      {/* ── AVATAR BUTTON ── */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position:   "relative",
          width:      36,
          height:     36,
          background: "transparent",
          border:     `1px solid ${isAdmin ? AMBER(0.55) : "rgba(255,255,255,0.18)"}`,
          boxShadow:  isAdmin ? `0 0 10px ${AMBER(0.25)}` : "none",
          cursor:     "pointer",
          padding:    0,
          overflow:   "hidden",
          transition: "border-color 0.2s, box-shadow 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.borderColor = isAdmin ? AMBER(0.8) : "rgba(255,255,255,0.4)"
          b.style.boxShadow   = isAdmin ? `0 0 16px ${AMBER(0.4)}` : "none"
        }}
        onMouseLeave={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.borderColor = isAdmin ? AMBER(0.55) : "rgba(255,255,255,0.18)"
          b.style.boxShadow   = isAdmin ? `0 0 10px ${AMBER(0.25)}` : "none"
        }}
      >
        {avatar ? (
          <img src={avatar} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: isAdmin ? `rgba(255,176,0,0.1)` : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: isAdmin ? AMBER(0.85) : DIMWHITE(0.55) }}>
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* admin glow corner */}
        {isAdmin && (
          <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 8px 8px 0", borderColor: `transparent ${AMBER(0.7)} transparent transparent` }} />
        )}
      </button>

      {/* ── DROPDOWN ── */}
      <div style={{
        position:       "absolute",
        right:          0,
        top:            "calc(100% + 6px)",
        width:          180,
        background:     "rgba(10,9,0,0.96)",
        backdropFilter: "blur(16px)",
        border:         `1px solid rgba(255,176,0,0.18)`,
        boxShadow:      `0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px ${AMBER(0.04)}`,
        overflow:       "hidden",
        zIndex:         50,
        transformOrigin:"top right",
        transform:      open ? "scale(1) translateY(0)"  : "scale(0.95) translateY(-6px)",
        opacity:        open ? 1 : 0,
        pointerEvents:  open ? "auto" : "none",
        transition:     "transform 0.18s ease, opacity 0.18s ease",
      }}>
        {/* top shimmer */}
        <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.45)}, transparent)` }} />

        {/* user info row */}
        <div style={{ padding: "10px 12px 8px", borderBottom: `1px solid rgba(255,176,0,0.08)` }}>
          <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 600, fontSize: "0.82rem", color: DIMWHITE(0.8), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
            {isAdmin && (
              <>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: AMBER(0.85), boxShadow: `0 0 4px ${AMBER(0.6)}`, animation: "ahpulse 2s ease-in-out infinite" }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.22em", color: AMBER(0.6) }}>ADMIN</span>
              </>
            )}
            {!isAdmin && (
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.22em", color: DIMWHITE(0.25) }}>GUEST</span>
            )}
          </div>
        </div>

        {/* menu items */}
        <DropItem label="Dashboard"  href="/dashboard" onClick={() => setOpen(false)} />

        {isAdmin && (
          <DropItem label="Admin Panel" href="/admin" onClick={() => setOpen(false)} accent />
        )}

        <div style={{ height: 1, background: `linear-gradient(to right, transparent, rgba(255,60,60,0.15), transparent)`, margin: "2px 0" }} />

        <button
          onClick={async () => { await supabase.auth.signOut(); window.location.href = "/" }}
          style={{
            display:       "block",
            width:         "100%",
            textAlign:     "left",
            padding:       "9px 12px",
            background:    "transparent",
            border:        "none",
            fontFamily:    "'IBM Plex Mono', monospace",
            fontSize:      "0.62rem",
            letterSpacing: "0.14em",
            color:         "rgba(255,60,60,0.65)",
            cursor:        "pointer",
            transition:    "background 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,60,60,0.07)"; b.style.color = "rgba(255,60,60,0.9)" }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = "rgba(255,60,60,0.65)" }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  )
}

function DropItem({ label, href, onClick, accent = false }: { label: string; href: string; onClick: () => void; accent?: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href={href} onClick={onClick} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding:       "9px 12px",
          background:    hov ? (accent ? `rgba(255,176,0,0.07)` : "rgba(255,255,255,0.04)") : "transparent",
          fontFamily:    "'IBM Plex Mono', monospace",
          fontSize:      "0.62rem",
          letterSpacing: "0.14em",
          color:         accent ? AMBER(hov ? 0.9 : 0.6) : DIMWHITE(hov ? 0.8 : 0.45),
          transition:    "background 0.15s, color 0.15s",
          position:      "relative",
        }}
      >
        {hov && accent && (
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${AMBER(0.7)}, transparent)` }} />
        )}
        {label}
      </div>
    </Link>
  )
}