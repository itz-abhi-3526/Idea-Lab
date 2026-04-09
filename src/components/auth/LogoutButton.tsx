
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
        gap:           8,
        paddingLeft:   14,
        paddingRight:  12,
        paddingTop:    10,
        paddingBottom: 10,
        background:    hov ? RED(0.08) : "transparent",
        borderTop:     `1px solid ${hov ? RED(0.28) : AMBER(0.1)}`,
        borderRight:   `1px solid ${hov ? RED(0.28) : AMBER(0.1)}`,
        borderBottom:  `1px solid ${hov ? RED(0.28) : AMBER(0.1)}`,
        borderLeft:    "none",
        cursor:        "pointer",
        transition:    "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        width:         "100%",
        boxSizing:     "border-box", // Prevents overflow on mobile
      }}
    >
      {/* Left indicator stripe */}
      <div style={{
        position:   "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1,
        background: hov
          ? `linear-gradient(to bottom, transparent, ${RED(0.75)}, transparent)`
          : `linear-gradient(to bottom, transparent, ${AMBER(0.15)}, transparent)`,
        transition: "all 0.18s",
      }} />

      {/* Logout Icon */}
      <svg
        width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke={hov ? RED(0.85) : AMBER(0.3)} strokeWidth="2.5"
        strokeLinecap="square" strokeLinejoin="miter"
        style={{ flexShrink: 0, transition: "stroke 0.18s" }}
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      <span style={{
        fontFamily:    "'IBM Plex Mono', monospace",
        fontSize:      "0.6rem",
        letterSpacing: "0.22em",
        color:         hov ? RED(0.85) : AMBER(0.35),
        transition:    "color 0.18s",
        position:      "relative", 
        zIndex: 1,
        whiteSpace: "nowrap",
      }}>
        TERMINATE_SESSION
      </span>
    </button>
  )
}
