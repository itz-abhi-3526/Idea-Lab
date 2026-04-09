
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import QRCode from "react-qr-code"
import { Calendar, MapPin, ArrowRight, Ticket, Zap } from "lucide-react"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   FONTS — unchanged
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "events-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id
    l.rel = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600;1,700&family=Azeret+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   VIEWPORT HOOK  (SSR-safe)
   ─ Only new code added to this file.
   ─ Used solely to switch ticket layout.
───────────────────────────────────────── */
function useViewport() {
  const [vw, setVw] = useState(1280)
  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update, { passive: true })
    return () => window.removeEventListener("resize", update)
  }, [])
  return vw
}

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
type Event = {
  id: string
  title: string
  description: string | null
  start_datetime: string
  registration_deadline: string | null
  venue: string | null
  is_paid: boolean
  price: number | null
}

/* ─────────────────────────────────────────
   ACCENT PALETTE — unchanged
───────────────────────────────────────── */
const ACCENTS = [
  { hex: "#d4af37", rgb: "212,175,55",  dark: true  },
  { hex: "#e07b54", rgb: "224,123,84",  dark: false },
  { hex: "#7eb8c9", rgb: "126,184,201", dark: false },
  { hex: "#b09a7e", rgb: "176,154,126", dark: true  },
]

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
const DAYS   = ["SUN","MON","TUE","WED","THU","FRI","SAT"]

function parseDate(iso: string) {
  const d = new Date(iso)
  return {
    raw:   d,
    date:  d.getDate(),
    month: MONTHS[d.getMonth()],
    day:   DAYS[d.getDay()],
    year:  d.getFullYear(),
  }
}

/* ─────────────────────────────────────────
   GRAIN — unchanged
───────────────────────────────────────── */
function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none", opacity: 0.022,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat", backgroundSize: "128px 128px",
    }} />
  )
}

/* ─────────────────────────────────────────
   SHIMMER TOP BAR — unchanged
───────────────────────────────────────── */
function ShimmerBar({ accentHex, accentRgb }: { accentHex: string; accentRgb: string }) {
  return (
    <div style={{ height: 2, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(90deg, transparent, ${accentHex}, rgba(${accentRgb},0.3), transparent)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
        animation: "shimmer 3s ease-in-out infinite",
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   PERFORATED DIVIDER
   Added `horizontal` prop for mobile.
   Original vertical path is byte-for-byte
   identical to the source.
───────────────────────────────────────── */
function Perforation({ accentRgb, horizontal = false }: { accentRgb: string; horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div style={{ position: "relative", height: 1, width: "100%", flexShrink: 0 }}>
        <svg width="100%" height="2" style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}>
          <line
            x1="14" y1="1" x2="99%" y2="1"
            stroke={`rgba(${accentRgb},0.22)`} strokeWidth="1.5" strokeDasharray="6 5"
          />
        </svg>
        <div style={{
          position: "absolute", left: -14, top: "50%", transform: "translateY(-50%)",
          width: 28, height: 28, borderRadius: "50%",
          background: "#080808", border: "1px solid rgba(255,255,255,0.04)", zIndex: 10,
        }} />
        <div style={{
          position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)",
          width: 28, height: 28, borderRadius: "50%",
          background: "#080808", border: "1px solid rgba(255,255,255,0.04)", zIndex: 10,
        }} />
      </div>
    )
  }
  // original — unchanged
  return (
    <div style={{ position: "relative", width: 1, flexShrink: 0, alignSelf: "stretch" }}>
      <svg width="2" height="100%" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <line
          x1="1" y1="0" x2="1" y2="100%"
          stroke={`rgba(${accentRgb},0.22)`} strokeWidth="1.5" strokeDasharray="6 5"
        />
      </svg>
      <div style={{
        position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
        width: 28, height: 28, borderRadius: "50%",
        background: "#080808", border: "1px solid rgba(255,255,255,0.04)", zIndex: 10,
      }} />
      <div style={{
        position: "absolute", bottom: -14, left: "50%", transform: "translateX(-50%)",
        width: 28, height: 28, borderRadius: "50%",
        background: "#080808", border: "1px solid rgba(255,255,255,0.04)", zIndex: 10,
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   TICKET FOOTER STUB
   Extracted to avoid copy-pasting across
   the three layout branches. Identical markup.
───────────────────────────────────────── */
function TicketFooter({
  accent, d, event,
}: {
  accent: typeof ACCENTS[number]
  d: ReturnType<typeof parseDate>
  event: Event
}) {
  return (
    <div style={{
      height: 32, borderTop: `1px solid rgba(${accent.rgb},0.06)`,
      display: "flex", alignItems: "center", paddingLeft: 22, gap: 8,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        overflow: "hidden", opacity: 0.04, pointerEvents: "none",
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={{
            fontFamily: "'Azeret Mono', monospace", fontSize: 10,
            letterSpacing: "0.4em", color: accent.hex,
            whiteSpace: "nowrap", paddingRight: 24, textTransform: "uppercase",
          }}>IDEA LAB · FISAT ·</span>
        ))}
      </div>
      <Ticket size={10} color={`rgba(${accent.rgb},0.28)`} />
      <span style={{
        fontFamily: "'Azeret Mono', monospace", fontSize: 9,
        letterSpacing: "0.2em", color: `rgba(${accent.rgb},0.28)`,
        textTransform: "uppercase", position: "relative", zIndex: 1,
      }}>
        {event.is_paid ? `Paid · ₹${event.price}` : "Complimentary"} · FISAT IDEA Lab · {d.year}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN INFO BODY
   Extracted so all three layout branches
   share the same markup. All style values
   are identical to the original.
───────────────────────────────────────── */
function TicketBody({
  event, accent, d, isOpen, isPast, titleFontSize,
}: {
  event: Event
  accent: typeof ACCENTS[number]
  d: ReturnType<typeof parseDate>
  isOpen: boolean
  isPast: boolean
  titleFontSize: string
}) {
  return (
    <>
      {/* badges */}
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 13 }}>
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9, letterSpacing: "0.2em",
          padding: "4px 11px", borderRadius: 99, textTransform: "uppercase",
          background: isOpen ? "rgba(34,197,94,0.09)" : "rgba(239,68,68,0.09)",
          color: isOpen ? "#4ade80" : "#f87171",
          border: `1px solid ${isOpen ? "rgba(34,197,94,0.17)" : "rgba(239,68,68,0.17)"}`,
        }}>
          {isPast ? "● Concluded" : isOpen ? "● Registration Open" : "● Closed"}
        </span>
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9, letterSpacing: "0.2em",
          padding: "4px 11px", borderRadius: 99, textTransform: "uppercase",
          background: event.is_paid ? `rgba(${accent.rgb},0.09)` : "rgba(255,255,255,0.04)",
          color: event.is_paid ? accent.hex : "rgba(255,255,255,0.32)",
          border: `1px solid ${event.is_paid ? `rgba(${accent.rgb},0.2)` : "rgba(255,255,255,0.07)"}`,
        }}>
          {event.is_paid ? `₹${event.price}` : "Free"}
        </span>
      </div>

      {/* title */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
        fontSize: titleFontSize,
        color: "#fff", lineHeight: 1.18, letterSpacing: "-0.02em", marginBottom: 14,
      }}>
        {event.title}
      </h3>

      {/* meta */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Calendar size={11} color={`rgba(${accent.rgb},0.5)`} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: 12.5, color: "rgba(255,255,255,0.36)",
          }}>
            {new Date(event.start_datetime).toLocaleString()}
          </span>
        </span>
        {event.venue && (
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <MapPin size={11} color={`rgba(${accent.rgb},0.5)`} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 12.5, color: "rgba(255,255,255,0.36)",
            }}>
              {event.venue}
            </span>
          </span>
        )}
      </div>

      {/* description */}
      {event.description && (
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1.72, marginTop: 14, paddingTop: 14,
          borderTop: `1px solid rgba(${accent.rgb},0.07)`,
          maxWidth: 480, margin: "14px 0 0",
        }}>
          {event.description}
        </p>
      )}

      {/* deadline */}
      {isOpen && (
        <p style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9,
          letterSpacing: "0.18em", color: `rgba(${accent.rgb},0.42)`,
          marginTop: 12, textTransform: "uppercase",
        }}>
          Registration closes {new Date(event.registration_deadline!).toLocaleDateString()}
        </p>
      )}
    </>
  )
}

/* ─────────────────────────────────────────
   SINGLE TICKET CARD
   `vw` is the only new prop.

   DESKTOP  ≥ 861px → original layout, zero changes
   TABLET   601–860px → horizontal, QR col hidden
   MOBILE   ≤ 600px → stacked column
───────────────────────────────────────── */
function EventTicket({
  event, index, isOpen, now, vw,
}: {
  event: Event
  index: number
  isOpen: boolean
  now: Date
  vw: number
}) {
  const accent  = ACCENTS[index % ACCENTS.length]
  const d       = parseDate(event.start_datetime)
  const isPast  = d.raw < now

  const isMobile = vw <= 600
  const isTablet = vw > 600 && vw <= 860

  /* shared outer shell — unchanged values */
  const outerStyle: React.CSSProperties = {
    position: "relative", borderRadius: 22, overflow: "visible",
    opacity: isPast ? 0.48 : 1,
    animation: `riseIn 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s both`,
  }
  const glowStyle: React.CSSProperties = {
    position: "absolute", inset: -1, borderRadius: 23, zIndex: 0, pointerEvents: "none",
    background: `linear-gradient(135deg, rgba(${accent.rgb},0.16) 0%, transparent 55%)`,
  }
  const innerStyle: React.CSSProperties = {
    position: "relative", zIndex: 1, borderRadius: 22, overflow: "hidden",
    background: "linear-gradient(155deg, #131313 0%, #0c0c0c 100%)",
    border: `1px solid rgba(${accent.rgb},0.15)`,
    boxShadow: "0 24px 64px -16px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)",
  }

  /* shared View Details button — same styles everywhere */
  const viewDetailsBtn = (
    <Link
      href={`/events/${event.id}`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "9px 18px", borderRadius: 99, textDecoration: "none",
        fontFamily: "'Azeret Mono', monospace", fontSize: 9,
        letterSpacing: "0.16em", textTransform: "uppercase",
        transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
        background: isOpen && !isPast
          ? `linear-gradient(135deg, rgba(${accent.rgb},0.9), rgba(${accent.rgb},0.65))`
          : "rgba(255,255,255,0.04)",
        color: isOpen && !isPast ? (accent.dark ? "#0a0800" : "#fff") : "rgba(255,255,255,0.2)",
        border: `1px solid ${isOpen && !isPast ? `rgba(${accent.rgb},0.4)` : "rgba(255,255,255,0.06)"}`,
        boxShadow: isOpen && !isPast ? `0 4px 20px rgba(${accent.rgb},0.22)` : "none",
      }}
    >
      View Details <ArrowRight size={10} />
    </Link>
  )

  /* ══════════════════════════════════════
     MOBILE  (≤ 600px)
     Date + title side-by-side on top row,
     horizontal perforation, meta+CTA below.
     QR hidden (accessible via link).
  ══════════════════════════════════════ */
  if (isMobile) {
    return (
      <div style={outerStyle}>
        <div style={glowStyle} />
        <div style={innerStyle}>
          <ShimmerBar accentHex={accent.hex} accentRgb={accent.rgb} />

          {/* top row: date block + title/badges */}
          <div style={{
            display: "flex", alignItems: "center", gap: 20, padding: "20px 22px 18px",
            background: `linear-gradient(90deg, rgba(${accent.rgb},0.09) 0%, rgba(${accent.rgb},0.02) 100%)`,
          }}>
            {/* compact date block */}
            <div style={{
              flexShrink: 0, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 2,
            }}>
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.28em", color: accent.hex,
                textTransform: "uppercase", opacity: 0.85,
              }}>{d.day}</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                fontSize: 56, lineHeight: 0.9, color: "#fff",
                letterSpacing: "-0.03em", margin: "6px 0 5px",
              }}>{String(d.date).padStart(2, "0")}</span>
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.2em", color: "rgba(255,255,255,0.32)",
              }}>{d.month} '{String(d.year).slice(2)}</span>
            </div>

            {/* title + mini-badges beside date */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 9 }}>
                <span style={{
                  fontFamily: "'Azeret Mono', monospace", fontSize: 8, letterSpacing: "0.16em",
                  padding: "3px 9px", borderRadius: 99, textTransform: "uppercase",
                  background: isOpen ? "rgba(34,197,94,0.09)" : "rgba(239,68,68,0.09)",
                  color: isOpen ? "#4ade80" : "#f87171",
                  border: `1px solid ${isOpen ? "rgba(34,197,94,0.17)" : "rgba(239,68,68,0.17)"}`,
                }}>
                  {isPast ? "● Concluded" : isOpen ? "● Open" : "● Closed"}
                </span>
                <span style={{
                  fontFamily: "'Azeret Mono', monospace", fontSize: 8, letterSpacing: "0.16em",
                  padding: "3px 9px", borderRadius: 99, textTransform: "uppercase",
                  background: event.is_paid ? `rgba(${accent.rgb},0.09)` : "rgba(255,255,255,0.04)",
                  color: event.is_paid ? accent.hex : "rgba(255,255,255,0.32)",
                  border: `1px solid ${event.is_paid ? `rgba(${accent.rgb},0.2)` : "rgba(255,255,255,0.07)"}`,
                }}>
                  {event.is_paid ? `₹${event.price}` : "Free"}
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                fontSize: "clamp(1.05rem, 4.5vw, 1.35rem)",
                color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0,
              }}>{event.title}</h3>
            </div>
          </div>

          {/* horizontal tear */}
          <Perforation accentRgb={accent.rgb} horizontal />

          {/* body */}
          <div style={{ padding: "16px 22px 20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Calendar size={11} color={`rgba(${accent.rgb},0.5)`} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  fontSize: 12.5, color: "rgba(255,255,255,0.36)",
                }}>
                  {new Date(event.start_datetime).toLocaleString()}
                </span>
              </span>
              {event.venue && (
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <MapPin size={11} color={`rgba(${accent.rgb},0.5)`} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                    fontSize: 12.5, color: "rgba(255,255,255,0.36)",
                  }}>{event.venue}</span>
                </span>
              )}
            </div>

            {event.description && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
                fontSize: "clamp(0.9rem, 3.8vw, 1.05rem)",
                color: "rgba(255,255,255,0.3)", lineHeight: 1.72,
                marginTop: 14, paddingTop: 14,
                borderTop: `1px solid rgba(${accent.rgb},0.07)`,
                margin: "14px 0 0",
              }}>{event.description}</p>
            )}

            {isOpen && (
              <p style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.18em", color: `rgba(${accent.rgb},0.42)`,
                marginTop: 10, textTransform: "uppercase",
              }}>
                Closes {new Date(event.registration_deadline!).toLocaleDateString()}
              </p>
            )}

            {/* full-width CTA */}
            <Link
              href={`/events/${event.id}`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                marginTop: 16, padding: "10px 18px", borderRadius: 99, textDecoration: "none",
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.16em", textTransform: "uppercase",
                background: isOpen && !isPast
                  ? `linear-gradient(135deg, rgba(${accent.rgb},0.9), rgba(${accent.rgb},0.65))`
                  : "rgba(255,255,255,0.04)",
                color: isOpen && !isPast ? (accent.dark ? "#0a0800" : "#fff") : "rgba(255,255,255,0.2)",
                border: `1px solid ${isOpen && !isPast ? `rgba(${accent.rgb},0.4)` : "rgba(255,255,255,0.06)"}`,
                boxShadow: isOpen && !isPast ? `0 4px 20px rgba(${accent.rgb},0.22)` : "none",
              }}
            >
              View Details <ArrowRight size={10} />
            </Link>
          </div>

          <TicketFooter accent={accent} d={d} event={event} />
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════
     TABLET  (601–860px)
     Horizontal layout, QR col hidden.
     Date col width trimmed to 96px.
  ══════════════════════════════════════ */
  if (isTablet) {
    return (
      <div style={outerStyle}>
        <div style={glowStyle} />
        <div style={innerStyle}>
          <ShimmerBar accentHex={accent.hex} accentRgb={accent.rgb} />

          <div style={{ display: "flex" }}>
            {/* date col — slightly narrower */}
            <div style={{
              width: 96, flexShrink: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "28px 12px", gap: 2,
              background: `linear-gradient(180deg, rgba(${accent.rgb},0.09) 0%, rgba(${accent.rgb},0.02) 100%)`,
            }}>
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.28em", color: accent.hex,
                textTransform: "uppercase", opacity: 0.85,
              }}>{d.day}</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                fontSize: 62, lineHeight: 0.9, color: "#fff",
                letterSpacing: "-0.03em", margin: "8px 0 6px",
              }}>{String(d.date).padStart(2, "0")}</span>
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.2em", color: "rgba(255,255,255,0.32)",
              }}>{d.month} '{String(d.year).slice(2)}</span>
            </div>

            <Perforation accentRgb={accent.rgb} />

            {/* main info */}
            <div style={{ flex: 1, padding: "22px 24px 20px", minWidth: 0 }}>
              <TicketBody
                event={event} accent={accent} d={d}
                isOpen={isOpen} isPast={isPast}
                titleFontSize="clamp(1.15rem, 2.8vw, 1.55rem)"
              />
              <div style={{ marginTop: 16 }}>{viewDetailsBtn}</div>
            </div>
          </div>

          <TicketFooter accent={accent} d={d} event={event} />
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════
     DESKTOP  (≥ 861px)
     Original layout — zero changes.
  ══════════════════════════════════════ */
  return (
    <div style={outerStyle}>
      <div style={glowStyle} />
      <div style={innerStyle}>
        <ShimmerBar accentHex={accent.hex} accentRgb={accent.rgb} />

        <div style={{ display: "flex" }}>

          {/* DATE COLUMN — unchanged */}
          <div style={{
            width: 112, flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "30px 14px", gap: 2,
            background: `linear-gradient(180deg, rgba(${accent.rgb},0.09) 0%, rgba(${accent.rgb},0.02) 100%)`,
          }}>
            <span style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: 9,
              letterSpacing: "0.28em", color: accent.hex,
              textTransform: "uppercase", opacity: 0.85,
            }}>{d.day}</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
              fontSize: 66, lineHeight: 0.9, color: "#fff",
              letterSpacing: "-0.03em", margin: "8px 0 6px",
            }}>{String(d.date).padStart(2, "0")}</span>
            <span style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: 9,
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.32)",
            }}>{d.month} '{String(d.year).slice(2)}</span>
          </div>

          <Perforation accentRgb={accent.rgb} />

          {/* MAIN INFO — unchanged */}
          <div style={{ flex: 1, padding: "24px 28px 22px", minWidth: 0 }}>
            <TicketBody
              event={event} accent={accent} d={d}
              isOpen={isOpen} isPast={isPast}
              titleFontSize="clamp(1.2rem, 2.4vw, 1.65rem)"
            />
          </div>

          {/* QR + ACTION — unchanged */}
          <div style={{
            width: 156, flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 16, padding: "24px 20px",
            background: "rgba(0,0,0,0.28)",
            borderLeft: `1px solid rgba(${accent.rgb},0.09)`,
          }}>
            <div style={{
              padding: 10, background: "#fff", borderRadius: 12, display: "inline-flex",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}>
              <QRCode
                value={`${location.origin}/events/${event.id}`}
                size={72}
                bgColor="#ffffff"
                fgColor="#0a0a0a"
              />
            </div>
            <span style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: 8,
              letterSpacing: "0.22em", color: "rgba(255,255,255,0.14)",
              textTransform: "uppercase", textAlign: "center",
            }}>Scan to open</span>
            {viewDetailsBtn}
          </div>
        </div>

        <TicketFooter accent={accent} d={d} event={event} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE
   DB logic verbatim. Only change: vw hook
   added and threaded into EventTicket.
───────────────────────────────────────── */
export default function EventsPage() {
  useFonts()
  const vw = useViewport()

  const [events, setEvents] = useState<Event[]>([])
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming")
  const now = new Date()

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("start_datetime", { ascending: true })
      .then(({ data }) => setEvents(data ?? []))
  }, [])

  const isOpen = (e: Event) =>
    e.registration_deadline &&
    new Date(e.registration_deadline) > now

  const filtered = events.filter(e =>
    tab === "upcoming"
      ? new Date(e.start_datetime) >= now
      : new Date(e.start_datetime) < now
  )

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%);  }
          100% { transform: translateX(100%);  }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        * { box-sizing: border-box; }
      `}</style>

      <Grain />

      <section style={{
        minHeight: "100vh",
        background: "#080808",
        padding: "88px 0 120px",
        position: "relative",
      }}>
        {/* ambient glow — unchanged */}
        <div style={{
          position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 500, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }} />

        {/* container — only change is responsive padding */}
        <div style={{
          maxWidth: 920, margin: "0 auto",
          padding: vw <= 400 ? "0 14px" : vw <= 640 ? "0 18px" : "0 24px",
          position: "relative", zIndex: 1,
        }}>

          {/* HEADER — unchanged */}
          <div style={{
            marginBottom: 72,
            animation: "riseIn 0.7s cubic-bezier(0.16,1,0.3,1) both",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <Zap size={11} color="#d4af37" />
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.38em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase",
              }}>FISAT IDEA Lab · Events & Programs</span>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(3.2rem, 8vw, 6rem)",
              lineHeight: 0.95, color: "rgba(255,255,255,0.88)",
              margin: "0 0 2px", letterSpacing: "-0.03em",
            }}>Explore the</h1>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(3.5rem, 9vw, 6.8rem)",
              lineHeight: 0.9, margin: "0 0 24px", letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #b8860b 0%, #d4af37 40%, #f5d070 65%, #d4af37 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Events.</h1>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 14.5, color: "rgba(255,255,255,0.28)",
              maxWidth: 360, lineHeight: 1.75, margin: 0,
            }}>
              Tickets, passes & experiences at IDEA Lab
            </p>

            <div style={{
              marginTop: 36, height: 1,
              background: "linear-gradient(90deg, rgba(212,175,55,0.22), transparent)",
              maxWidth: 200,
            }} />
          </div>

          {/* TABS — unchanged */}
          <div style={{
            display: "flex", gap: 4, marginBottom: 40,
            padding: 4, background: "rgba(255,255,255,0.03)",
            borderRadius: 99, width: "fit-content",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            {(["upcoming", "past"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 26px", borderRadius: 99, border: "none", cursor: "pointer",
                  fontFamily: "'Azeret Mono', monospace", fontSize: 10,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  transition: "all 0.25s ease",
                  background: tab === t
                    ? "linear-gradient(135deg, #b8860b, #d4af37)"
                    : "transparent",
                  color: tab === t ? "#0a0800" : "rgba(255,255,255,0.26)",
                  boxShadow: tab === t ? "0 4px 18px rgba(212,175,55,0.25)" : "none",
                  fontWeight: tab === t ? 500 : 300,
                }}
              >
                {t === "upcoming" ? "Upcoming" : "Past"}
              </button>
            ))}
          </div>

          {/* TICKET LIST — unchanged */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {filtered.length === 0 && (
              <div style={{
                textAlign: "center", padding: "72px 40px",
                border: "1px dashed rgba(212,175,55,0.1)", borderRadius: 22,
              }}>
                <Ticket size={28} color="rgba(212,175,55,0.15)" style={{ margin: "0 auto 14px" }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
                  color: "rgba(255,255,255,0.18)", fontSize: 18, margin: 0,
                }}>
                  No {tab} events at the moment.
                </p>
              </div>
            )}

            {filtered.map((event, i) => (
              <EventTicket
                key={event.id}
                event={event}
                index={i}
                isOpen={!!isOpen(event)}
                now={now}
                vw={vw}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
