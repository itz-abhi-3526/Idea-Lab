
import { Link } from "react-router-dom"
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react"

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const BORDER   = "rgba(255,176,0,0.14)"

export default function UnauthorizedPage() {
  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85), display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      
      {/* Background HUD Decals */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div style={{ maxWidth: 440, width: "100%", position: "relative", zIndex: 10 }}>
        
        {/* Main Card */}
        <div style={{ background: "rgba(255,176,0,0.02)", border: `1px solid ${BORDER}`, padding: "40px 32px", textAlign: "center", position: "relative" }}>
          
          {/* HUD corners */}
          <div style={{ position: "absolute", top: 8, left: 8, width: 12, height: 12, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft: `1px solid ${AMBER(0.4)}` }} />
          <div style={{ position: "absolute", top: 8, right: 8, width: 12, height: 12, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}` }} />
          
          {/* Alert Icon */}
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,60,60,0.8)" }}>
              <ShieldAlert size={32} />
            </div>
          </div>

          {/* Text Content */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.4em", color: AMBER(0.4), marginBottom: 8, textTransform: "uppercase" }}>
              Security Protocol 403
            </div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "2rem", color: AMBER(0.9), letterSpacing: "-0.02em", margin: "0 0 12px" }}>
              Access Denied
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: DIMWHITE(0.4), lineHeight: 1.6, margin: 0 }}>
              Your current authorization level is insufficient to access this terminal node. Please verify your credentials or contact a system administrator.
            </p>
          </div>

          {/* Action Row */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "12px", background: AMBER(0.9), border: "none", color: BG, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <ArrowLeft size={14} />
                RETURN TO ROOT
              </button>
            </Link>
            
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "12px", background: "transparent", border: `1px solid ${AMBER(0.2)}`, color: AMBER(0.6), fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Terminal size={14} />
                RE-AUTHENTICATE
              </button>
            </Link>
          </div>

        </div>

        {/* Bottom Decal */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10, opacity: 0.3 }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.5)})` }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.45rem", letterSpacing: "0.2em", color: AMBER(1) }}>FISAT_IDEA_LAB_SEC</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${AMBER(0.5)})` }} />
        </div>

      </div>
    </div>
  )
}
