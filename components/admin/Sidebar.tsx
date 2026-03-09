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
      { id: "01", name: "Dashboard",   href: "/admin"        },
      { id: "02", name: "Execom",      href: "/admin/execom" },
      { id: "03", name: "Users",       href: "/admin/users"  },
    ],
  },
  {
    group: "IDEAS",
    links: [
      { id: "04", name: "Ideas",       href: "/admin/ideas"  },
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
      { id: "07", name: "Events",           href: "/admin/events"               },
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
  {
    group: "CONSULTANCY",
    links: [
      { id: "13", name: "Consultancy",  href: "/admin/consultancy" },
      { id: "14", name: "Requests",      href: "/admin/consultancy/requests" },
    ],
  },
  {
    group: "IDEA Gallery",
    links: [
      { id: "15", name: "Gallery",  href: "/admin/gallery" },
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
          padding:      "9px 12px",
          marginBottom: 1,
          overflow:     "hidden",
          background:   active ? `rgba(255,176,0,0.08)` : hov ? `rgba(255,176,0,0.03)` : "transparent",
          borderRight:  `1px solid ${active ? AMBER(0.2) : "transparent"}`,
          transition:   "background 0.18s",
        }}
      >
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: active ? 3 : 1,
          background: active
            ? `linear-gradient(to bottom, ${AMBER(0.4)}, ${AMBER(0.9)}, ${AMBER(0.4)})`
            : hov
            ? `rgba(255,176,0,0.2)`
            : `rgba(255,176,0,0.06)`,
          transition: "background 0.18s, width 0.15s",
        }} />

        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem",
          letterSpacing: "0.12em", color: active ? AMBER(0.7) : AMBER(0.2),
          flexShrink: 0, minWidth: 22, transition: "color 0.18s",
        }}>
          {id}
        </span>

        <div style={{ width: 1, height: 10, background: active ? AMBER(0.3) : AMBER(0.1), flexShrink: 0 }} />

        <span style={{
          fontFamily: "'IBM Plex Sans Condensed', sans-serif",
          fontWeight: active ? 600 : 400, fontSize: "0.85rem",
          letterSpacing: "0.02em",
          color: active ? AMBER(0.95) : hov ? DIMWHITE(0.6) : DIMWHITE(0.35),
          flex: 1, transition: "color 0.18s",
        }}>
          {name}
        </span>

        {active && (
          <div style={{
            width: 4, height: 4, borderRadius: "50%", flexShrink: 0,
            background: AMBER(0.9), boxShadow: `0 0 6px ${AMBER(0.6)}`,
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
      background: "#0a0900", // Solid background to prevent dashboard bleed-through
      borderRight: `1px solid rgba(255,176,0,0.15)`,
      display: "flex", flexDirection: "column",
      position: "relative", 
      overflow: "hidden",
      zIndex: 200, // HIGHER than dashboard header
    }}>
      <style>{`
        @keyframes mcblink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .mc-nav::-webkit-scrollbar { display:none }
        .mc-nav { 
          scrollbar-width:none;
          -ms-overflow-style: none;
          touch-action: pan-y;
        }
      `}</style>

      {/* scan lines overlay */}
      <div aria-hidden style={{
        pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,176,0,0.01) 3px, rgba(255,176,0,0.01) 4px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        <div style={{
          padding: "14px 16px",
          borderBottom: `1px solid rgba(255,176,0,0.12)`,
          background: "rgba(255,176,0,0.035)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: `rgba(0,255,120,0.9)`, boxShadow: `0 0 5px rgba(0,255,120,0.4)`, animation: "mcpulse 2s infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: `rgba(0,255,120,0.6)` }}>
              SYSTEM ACTIVE
            </span>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: AMBER(0.35) }}>
            NAV · CONSOLE v1.0
          </div>
        </div>

        <nav className="mc-nav" style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {NAV_GROUPS.map((group) => (
            <div key={group.group} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px 4px" }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem",
                  letterSpacing: "0.35em", color: AMBER(0.25), whiteSpace: "nowrap",
                  textTransform: "uppercase"
                }}>
                  {group.group}
                </span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.12)}, transparent)` }} />
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

        <div style={{
          padding: "12px 16px",
          borderTop: `1px solid rgba(255,176,0,0.07)`,
          background: "rgba(10,9,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.45rem", letterSpacing: "0.15em", color: AMBER(0.15) }}>
            IDEA LAB FISAT
          </span>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: AMBER(0.2) }} />
        </div>

      </div>
    </aside>
  )
}