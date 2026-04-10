import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Calendar, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   TYPES — verbatim
───────────────────────────────────────── */
type Event = {
  id: string
  title: string
  description: string
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null
  registration_deadline: string | null
  is_paid: boolean
  price: number | null
}

/* ─────────────────────────────────────────
   FONTS — unchanged
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "detail-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id
    l.rel = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Azeret+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   VIEWPORT HOOK  (SSR-safe)
   Only new code in this file.
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
   HELPERS — unchanged
───────────────────────────────────────── */
const MONTHS_SHORT = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
const MONTHS_LONG  = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAYS_LONG    = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function parseDate(iso: string) {
  const d = new Date(iso)
  return {
    raw:        d,
    dayName:    DAYS_LONG[d.getDay()],
    date:       d.getDate(),
    monthShort: MONTHS_SHORT[d.getMonth()],
    monthLong:  MONTHS_LONG[d.getMonth()],
    year:       d.getFullYear(),
    time:       d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    full:       d.toLocaleString(),
  }
}

/* ─────────────────────────────────────────
   GRAIN — unchanged
───────────────────────────────────────── */
function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none",
      opacity: 0.022,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px 128px",
    }} />
  )
}

/* ─────────────────────────────────────────
   TEAR LINE — unchanged
───────────────────────────────────────── */
function TearLine() {
  return (
    <div style={{ position: "relative", height: 0, zIndex: 20 }}>
      <div style={{
        position: "absolute", left: -18, top: "50%", transform: "translateY(-50%)",
        width: 36, height: 36, borderRadius: "50%",
        background: "#080808", border: "1px solid rgba(255,255,255,0.04)", zIndex: 30,
      }} />
      <div style={{
        position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)",
        width: 36, height: 36, borderRadius: "50%",
        background: "#080808", border: "1px solid rgba(255,255,255,0.04)", zIndex: 30,
      }} />
      <svg width="100%" height="2" style={{ display: "block", overflow: "visible" }}>
        <line
          x1="0" y1="1" x2="100%" y2="1"
          stroke="rgba(212,175,55,0.25)" strokeWidth="1" strokeDasharray="8 7"
        />
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────
   SHIMMER BAR — unchanged
───────────────────────────────────────── */
function ShimmerBar() {
  return (
    <div style={{ height: 3, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, #b8860b 0%, #d4af37 30%, #f5d070 50%, #d4af37 70%, #b8860b 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        animation: "shimmer 2.8s ease-in-out infinite",
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function EventDetailsPage() {
  useFonts()
  const vw = useViewport()

  /* original state — unchanged */
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /* original fetch — unchanged */
  useEffect(() => {
    if (!eventId) return
    
    const fetchEvent = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("events")
          .select("id, title, description, start_datetime, end_datetime, venue, poster_url, registration_deadline, is_paid, price")
          .eq("id", eventId)
          .maybeSingle()

        if (fetchError) {
          throw fetchError
        }

        if (!data) {
          setError("Event not found")
        } else {
          setEvent(data)
        }
      } catch (err: any) {
        console.error("Failed to fetch event:", err)
        setError(err?.message || "Failed to load event")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  /* original loading — unchanged */
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#080808",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40, height: 40, border: "1px solid rgba(212,175,55,0.3)",
            borderTopColor: "#d4af37", borderRadius: "50%",
            animation: "spin 0.9s linear infinite", margin: "0 auto 16px",
          }} />
          <span style={{
            fontFamily: "'Azeret Mono', monospace", fontSize: 11,
            letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
          }}>Loading event…</span>
        </div>
      </div>
    )
  }

  /* original not-found — unchanged */
  if (!event || error) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#080808",
      }}>
        <div style={{ textAlign: "center" }}>
          <span style={{
            fontFamily: "'Azeret Mono', monospace", fontSize: 11,
            letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
          }}>{error ?? "Event not found"}</span>
        </div>
      </div>
    )
  }

  /* original derived values — unchanged */
  const start = new Date(event.start_datetime)
  const registrationOpen =
    event.registration_deadline &&
    new Date(event.registration_deadline) > new Date()

  const d = parseDate(event.start_datetime)
  const isPast = start < new Date()

  /* responsive helpers */
  const isMobile = vw <= 600
  const isTablet = vw > 600 && vw <= 860

  /* padding that scales with screen */
  const sidePad = isMobile ? 16 : isTablet ? 24 : 40

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%);  }
          100% { transform: translateX(100%);  }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-6px) rotate(-2deg); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: #080808; }
        .reg-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 40px rgba(212,175,55,0.4) !important;
        }
        .back-btn:hover { color: rgba(255,255,255,0.9) !important; }
      `}</style>

      <Grain />

      <div style={{ minHeight: "100vh", background: "#080808", padding: "0 0 80px", position: "relative" }}>

        {/* ── BACK BUTTON
            On mobile: relative flow at top of page instead of fixed,
            so it doesn't cover the ticket content.
        ── */}
        {isMobile ? (
          <div style={{ padding: "20px 16px 0" }}>
            <button
              onClick={() => navigate(-1)}
              className="back-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 99, padding: "8px 16px 8px 12px",
                cursor: "pointer", transition: "all 0.25s",
                color: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              <ArrowLeft size={13} />
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
              }}>Back</span>
            </button>
          </div>
        ) : (
          /* original fixed position — unchanged */
          <button
            onClick={() => navigate(-1)}
            className="back-btn"
            style={{
              position: "fixed", top: 28, left: 28, zIndex: 100,
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 99, padding: "8px 16px 8px 12px",
              cursor: "pointer", transition: "all 0.25s",
              color: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            <ArrowLeft size={13} />
            <span style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: 10,
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>Back</span>
          </button>
        )}

        {/* ══════════════════════════════════════
            TICKET WRAPPER
        ══════════════════════════════════════ */}
        <div style={{
          maxWidth: 780, margin: "0 auto",
          padding: isMobile ? "20px 14px 0" : "60px 24px 0",
          animation: "riseIn 0.7s cubic-bezier(0.16,1,0.3,1) both",
        }}>

          {/* ── TICKET CONTAINER — unchanged border/shadow ── */}
          <div style={{
            position: "relative",
            borderRadius: isMobile ? 20 : 28,
            overflow: "visible",
            filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 1px rgba(212,175,55,0.15))",
          }}>

            {/* ════════ TOP HALF — POSTER ════════ */}
            <div style={{
              borderRadius: isMobile ? "20px 20px 0 0" : "28px 28px 0 0",
              overflow: "hidden",
              position: "relative",
            }}>
              <ShimmerBar />

              {/* POSTER / HERO — unchanged */}
              <div style={{
                position: "relative",
                height: isMobile ? "clamp(200px, 56vw, 280px)" : "clamp(260px, 38vw, 420px)",
                background: event.poster_url
                  ? "transparent"
                  : "linear-gradient(135deg, #1a1400 0%, #0f0f0f 40%, #1a0f00 100%)",
                overflow: "hidden",
              }}>
                {event.poster_url ? (
                  <>
                    <img
                      src={event.poster_url}
                      alt={event.title}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", display: "block",
                        filter: "brightness(0.55) saturate(0.9)",
                      }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, rgba(8,8,8,0.1) 0%, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.75) 80%, rgba(8,8,8,1) 100%)",
                    }} />
                  </>
                ) : (
                  <>
                    <div style={{
                      position: "absolute", inset: 0,
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        rgba(212,175,55,0.03) 0px,
                        rgba(212,175,55,0.03) 1px,
                        transparent 1px,
                        transparent 60px
                      )`,
                    }} />
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: 180, height: 180, borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
                      border: "1px solid rgba(212,175,55,0.1)",
                    }} />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, transparent 50%, rgba(8,8,8,1) 100%)",
                    }} />
                  </>
                )}

                {/* FLOATING DATE BADGE
                    On mobile: smaller, tighter padding, no float animation (saves space)
                ── */}
                <div style={{
                  position: "absolute",
                  top: isMobile ? 14 : 28,
                  right: isMobile ? 14 : 28,
                  background: "rgba(8,8,8,0.85)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: isMobile ? 12 : 16,
                  padding: isMobile ? "10px 13px" : "14px 18px",
                  textAlign: "center", backdropFilter: "blur(20px)",
                  animation: isMobile ? "none" : "floatBadge 4s ease-in-out infinite",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.1)",
                }}>
                  <div style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: isMobile ? 8 : 9,
                    letterSpacing: "0.3em", color: "#d4af37",
                    textTransform: "uppercase", marginBottom: 4,
                  }}>{d.monthShort}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                    fontSize: isMobile ? 32 : 42, lineHeight: 1, color: "#fff",
                    letterSpacing: "-0.02em",
                  }}>{String(d.date).padStart(2, "0")}</div>
                  <div style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: 8,
                    letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)",
                    marginTop: 3,
                  }}>{d.year}</div>
                </div>

                {/* TITLE OVERLAID ON POSTER — padding scales */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: isMobile ? `0 ${sidePad}px 20px` : `0 40px 32px`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ height: 1, width: 20, background: "#d4af37" }} />
                    <span style={{
                      fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                      letterSpacing: "0.35em", color: "rgba(212,175,55,0.8)",
                      textTransform: "uppercase",
                    }}>FISAT IDEA Lab · {d.dayName}</span>
                  </div>

                  <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: isMobile ? "clamp(1.5rem, 7vw, 2rem)" : "clamp(2rem, 5vw, 3.2rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    margin: "0 0 14px",
                    /* right-padding keeps text clear of the date badge */
                    paddingRight: isMobile ? 80 : 0,
                    maxWidth: 560,
                    textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                  }}>
                    {event.title}
                  </h1>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      padding: "5px 12px", borderRadius: 99,
                      background: registrationOpen ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                      color: registrationOpen ? "#4ade80" : "#f87171",
                      border: `1px solid ${registrationOpen ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
                      backdropFilter: "blur(8px)",
                    }}>
                      {isPast ? "● Concluded" : registrationOpen ? "● Registration Open" : "● Registration Closed"}
                    </span>
                    <span style={{
                      fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      padding: "5px 12px", borderRadius: 99,
                      background: event.is_paid ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.07)",
                      color: event.is_paid ? "#d4af37" : "rgba(255,255,255,0.45)",
                      border: `1px solid ${event.is_paid ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.1)"}`,
                      backdropFilter: "blur(8px)",
                    }}>
                      {event.is_paid ? `₹ ${event.price}` : "Free Entry"}
                    </span>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION SECTION — padding scales */}
              <div style={{
                background: "#0e0e0e",
                padding: `28px ${sidePad}px`,
                borderBottom: "none",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300, fontStyle: "italic",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.8, margin: 0, maxWidth: 580,
                }}>
                  {event.description}
                </p>
              </div>
            </div>

            {/* TEAR LINE — unchanged */}
            <div style={{ background: "#0e0e0e", padding: "0 18px" }}>
              <TearLine />
            </div>

            {/* ════════ BOTTOM HALF — STUB ════════ */}
            <div style={{
              background: "#0e0e0e",
              borderRadius: isMobile ? "0 0 20px 20px" : "0 0 28px 28px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.04)",
              borderTop: "none",
            }}>

              {/* MAIN STUB BODY
                  Desktop/tablet: 2-col grid (original)
                  Mobile: single column
              ── */}
              <div style={{
                padding: isMobile ? `28px ${sidePad}px 24px` : `36px ${sidePad}px 32px`,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "22px" : "32px 48px",
              }}>

                {/* DATE & TIME — unchanged */}
                <div>
                  <div style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                    letterSpacing: "0.35em", color: "rgba(212,175,55,0.5)",
                    textTransform: "uppercase", marginBottom: 10,
                  }}>Date & Time</div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Calendar size={14} color="#d4af37" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                      fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                      color: "rgba(255,255,255,0.8)", lineHeight: 1.5,
                    }}>
                      {start.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* VENUE — unchanged */}
                {event.venue && (
                  <div>
                    <div style={{
                      fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                      letterSpacing: "0.35em", color: "rgba(212,175,55,0.5)",
                      textTransform: "uppercase", marginBottom: 10,
                    }}>Venue</div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <MapPin size={14} color="#d4af37" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                        fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                        color: "rgba(255,255,255,0.8)", lineHeight: 1.5,
                      }}>
                        {event.venue}
                      </span>
                    </div>
                  </div>
                )}

                {/* REGISTRATION DEADLINE — unchanged */}
                {event.registration_deadline && (
                  <div>
                    <div style={{
                      fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                      letterSpacing: "0.35em", color: "rgba(212,175,55,0.5)",
                      textTransform: "uppercase", marginBottom: 10,
                    }}>Reg. Deadline</div>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                      fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                      color: "rgba(255,255,255,0.8)",
                    }}>
                      {new Date(event.registration_deadline).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {/* ADMISSION — unchanged */}
                <div>
                  <div style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                    letterSpacing: "0.35em", color: "rgba(212,175,55,0.5)",
                    textTransform: "uppercase", marginBottom: 10,
                  }}>Admission</div>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                    color: "rgba(255,255,255,0.8)",
                  }}>
                    {event.is_paid ? `Paid · ₹${event.price}` : "Complimentary"}
                  </span>
                </div>
              </div>

              {/* DIVIDER — unchanged */}
              <div style={{
                height: 1, margin: `0 ${sidePad}px`,
                background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)",
              }} />

              {/* CTA ROW — stacks on mobile */}
              <div style={{
                padding: isMobile ? `22px ${sidePad}px 28px` : `28px ${sidePad}px 36px`,
                display: "flex",
                alignItems: isMobile ? "stretch" : "center",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
                flexDirection: isMobile ? "column" : "row",
              }}>
                <div style={{ width: isMobile ? "100%" : "auto" }}>
                  {registrationOpen ? (
                    <Link
                      to={`/events/${event.id}/register`}
                      className="reg-btn"
                      style={{
                        display: "inline-flex", alignItems: "center",
                        justifyContent: isMobile ? "center" : "flex-start",
                        gap: 10, width: isMobile ? "100%" : "auto",
                        padding: "14px 32px", borderRadius: 99, textDecoration: "none",
                        background: "linear-gradient(135deg, #b8860b 0%, #d4af37 50%, #f5d070 100%)",
                        color: "#0a0800",
                        fontFamily: "'Azeret Mono', monospace", fontSize: 11,
                        fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
                        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                        boxShadow: "0 6px 24px rgba(212,175,55,0.3)",
                      }}
                    >
                      Register for Event
                      <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                      fontSize: 15, color: "rgba(255,255,255,0.25)",
                    }}>
                      Registration has closed for this event.
                    </div>
                  )}

                  <p style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                    letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)",
                    textTransform: "uppercase", marginTop: 12,
                  }}>
                    Your registration will appear in your dashboard once confirmed.
                  </p>
                </div>
              </div>

              {/* FOOTER STUB STRIP — padding scales */}
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.04)",
                padding: `14px ${sidePad}px`,
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                position: "relative", overflow: "hidden",
                flexWrap: "wrap", gap: 8,
              }}>
                {/* repeating watermark — unchanged */}
                <div style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center",
                  overflow: "hidden", opacity: 0.04, pointerEvents: "none", gap: 0,
                }}>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} style={{
                      fontFamily: "'Azeret Mono', monospace", fontSize: 11,
                      letterSpacing: "0.4em", color: "#d4af37",
                      whiteSpace: "nowrap", paddingRight: 24, textTransform: "uppercase",
                    }}>IDEA LAB · FISAT ·</span>
                  ))}
                </div>

                <span style={{
                  fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                  letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)",
                  textTransform: "uppercase", position: "relative", zIndex: 1,
                }}>
                  This ticket is unique to this event
                </span>
                <span style={{
                  fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                  letterSpacing: "0.22em", color: "rgba(212,175,55,0.3)",
                  textTransform: "uppercase", position: "relative", zIndex: 1,
                }}>
                  Powered by IDEA Lab
                </span>
              </div>
            </div>

          </div>{/* end ticket container */}
        </div>{/* end max-width wrapper */}
      </div>
    </>
  )
}