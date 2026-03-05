"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

const AMBER = (a = 1) => `rgba(255,176,0,${a})`
const RED   = (a = 1) => `rgba(255,60,60,${a})`

export default function LogoutButton() {
  const [hov, setHov] = useState(false)

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
      }}
      style={{
        position:      "relative",
        display:       "flex",
        alignItems:    "center",
        gap:           7,
        paddingLeft:   12,
        paddingRight:  12,
        paddingTop:    7,
        paddingBottom: 7,
        background:    hov ? RED(0.07) : "transparent",
        borderTop:     `1px solid ${hov ? RED(0.28) : AMBER(0.1)}`,
        borderRight:   `1px solid ${hov ? RED(0.28) : AMBER(0.1)}`,
        borderBottom:  `1px solid ${hov ? RED(0.28) : AMBER(0.1)}`,
        borderLeft:    "none",
        cursor:        "pointer",
        transition:    "background 0.18s, border-color 0.18s",
        width:         "100%",
      }}
    >
      {/* left stripe */}
      <div style={{
        position:   "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1,
        background: hov
          ? `linear-gradient(to bottom, transparent, ${RED(0.7)}, transparent)`
          : `linear-gradient(to bottom, transparent, ${AMBER(0.15)}, transparent)`,
        transition: "background 0.18s, width 0.15s",
      }} />

      {/* icon */}
      <svg
        width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke={hov ? RED(0.75) : AMBER(0.3)} strokeWidth="2"
        strokeLinecap="square" strokeLinejoin="miter"
        style={{ flexShrink: 0, transition: "stroke 0.18s" }}
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      <span style={{
        fontFamily:    "'IBM Plex Mono', monospace",
        fontSize:      "0.58rem",
        letterSpacing: "0.2em",
        color:         hov ? RED(0.75) : AMBER(0.3),
        transition:    "color 0.18s",
        position:      "relative", zIndex: 1,
      }}>
        LOGOUT
      </span>
    </button>
  )
}