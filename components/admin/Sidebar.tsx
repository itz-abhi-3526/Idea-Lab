'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function useFonts() {
  useEffect(() => {
    const id = "sidebar-mc-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&display=swap"
    document.head.prepend(l)
  }, [])
}

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"

const NAV_GROUPS = [
  {
    group: "CORE",
    links: [
      { id: "01", name: "Dashboard",  href: "/admin"        },
      { id: "02", name: "Execom",     href: "/admin/execom" },
      { id: "03", name: "Users",      href: "/admin/users"  },
    ],
  },
  {
    group: "IDEAS",
    links: [
      { id: "04", name: "Ideas",      href: "/admin/ideas"  },
    ],
  },
  {
    group: "INVENTORY",
    links: [
      { id: "05", name: "Items",     href: "/admin/inventory"          },
      { id: "06", name: "Requests",  href: "/admin/inventory/requests" },
    ],
  },
  {
    group: "EVENTS",
    links: [
      { id: "07", name: "Events",         href: "/admin/events"               },
      { id: "08", name: "Registrations",  href: "/admin/events/registrations" },
      { id: "09", name: "Feedback",       href: "/admin/events/feedback"      },
    ],
  },
  {
    group: "INCUBATION",
    links: [
      { id: "10", name: "Requests",  href: "/admin/incubation-requests" },
    ],
  },
  {
    group: "ANNOUNCEMENTS",
    links: [
      { id: "11", name: "Announcement",  href: "/admin/announcements" },
    ],
  },
  {
    group: "PRODUCTS",
    links: [
      { id: "12", name: "Products",  href: "/admin/products" },
    ],
  },
]

function NavLink({ id, name, href, active, onClick }: {
  id: string; name: string; href: string; active: boolean; onClick?: () => void
}) {
  const [hov, setHov] = useState(false)

  return (
    <Link href={href} onClick={onClick} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:     "relative",
          display:      "flex",
          alignItems:   "center",
          gap:          8,
          padding:      "7px 10px 7px 10px",
          marginBottom: 1,
          overflow:     "hidden",
          background:   active ? `rgba(255,176,0,0.07)` : hov ? `rgba(255,176,0,0.025)` : "transparent",
          borderTop:    `1px solid ${active ? AMBER(0.18) : "transparent"}`,
          borderRight:  `1px solid ${active ? AMBER(0.18) : "transparent"}`,
          borderBottom: `1px solid ${active ? AMBER(0.18) : "transparent"}`,
          borderLeft:   "none",
          transition:   "background 0.18s",
        }}
      >
        {/* left stripe */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: active ? 2 : 1,
          background: active
            ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)`
            : hov
            ? `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`
            : `rgba(255,176,0,0.06)`,
          transition: "background 0.18s, width 0.15s",
        }} />

        {/* id badge */}
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem",
          letterSpacing: "0.12em", color: active ? AMBER(0.5) : AMBER(0.16),
          flexShrink: 0, minWidth: 20, transition: "color 0.18s",
        }}>
          {id}
        </span>

        {/* pip */}
        <div style={{ width: 1, height: 8, background: active ? AMBER(0.25) : AMBER(0.07), flexShrink: 0 }} />

        {/* name */}
        <span style={{
          fontFamily: "'IBM Plex Sans Condensed', sans-serif",
          fontWeight: active ? 500 : 400, fontSize: "0.82rem",
          letterSpacing: "0.02em",
          color: active ? AMBER(0.9) : hov ? DIMWHITE(0.55) : DIMWHITE(0.3),
          flex: 1, transition: "color 0.18s",
        }}>
          {name}
        </span>

        {/* active blip */}
        {active && (
          <div style={{
            width: 4, height: 4, borderRadius: "50%", flexShrink: 0,
            background: AMBER(0.9), boxShadow: `0 0 5px ${AMBER(0.7)}`,
            animation: "mcblink 2s ease-in-out infinite",
          }} />
        )}
      </div>
    </Link>
  )
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  useFonts()
  const pathname = usePathname()

  return (
    <aside style={{
      height: "100%", width: "100%",
      background: BG,
      borderRight: `1px solid rgba(255,176,0,0.13)`,
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes mcblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .mc-nav::-webkit-scrollbar { display:none }
        .mc-nav { scrollbar-width:none }
      `}</style>

      {/* scan lines overlay */}
      <div aria-hidden style={{
        pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,176,0,0.008) 3px, rgba(255,176,0,0.008) 4px)",
      }} />

      {/* right glow edge */}
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${AMBER(0.2)}, transparent)`, zIndex: 2 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* ── MINIMAL TOP STRIP — just role, no logo duplication ── */}
        <div style={{
          padding: "12px 14px",
          borderBottom: `1px solid rgba(255,176,0,0.1)`,
          background: "rgba(255,176,0,0.025)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: `rgba(0,255,120,0.85)`, boxShadow: `0 0 5px rgba(0,255,120,0.5)`, animation: "mcpulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: `rgba(0,255,120,0.55)` }}>
              SYSTEM ONLINE
            </span>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.22em", color: AMBER(0.3) }}>
            NAV · CONSOLE
          </div>
        </div>

        {/* ── GROUPED NAV ── */}
        <nav className="mc-nav" style={{ flex: 1, overflowY: "auto", padding: "8px 4px" }}>
          {NAV_GROUPS.map((group) => (
            <div key={group.group} style={{ marginBottom: 4 }}>
              {/* group label */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px 4px" }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem",
                  letterSpacing: "0.3em", color: AMBER(0.25), whiteSpace: "nowrap",
                }}>
                  {group.group}
                </span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.1)}, transparent)` }} />
              </div>

              {group.links.map(link => (
                <NavLink
                  key={link.href}
                  id={link.id}
                  name={link.name}
                  href={link.href}
                  active={pathname === link.href}
                  onClick={onNavigate}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* ── FOOTER ── */}
        <div style={{
          padding: "9px 14px",
          borderTop: `1px solid rgba(255,176,0,0.07)`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.45rem", letterSpacing: "0.18em", color: AMBER(0.18) }}>
            IDEA LAB FISAT · ADMIN v1.0
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: AMBER(0.4), animation: "mcblink 3s ease-in-out infinite" }} />
          </div>
        </div>

      </div>
    </aside>
  )
}