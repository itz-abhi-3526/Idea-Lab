"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   TYPES — verbatim from original
───────────────────────────────────────── */
type Highlight = {
  id: string
  title: string
  content: string
  type: "event" | "announcement"
  event_date: string | null
  location: string | null
  image_url: string | null
  created_at: string
}

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "hl-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id
    l.rel = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Azeret+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const MONTHS_LONG  = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAYS_LONG    = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function timeAgo(iso: string) {
  const diff  = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days  <  7) return `${days}d ago`
  const d = new Date(iso)
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  return `${MONTHS_LONG[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

/* ─────────────────────────────────────────
   GRAIN
───────────────────────────────────────── */
function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none", opacity: 0.025,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat", backgroundSize: "128px",
    }} />
  )
}

/* ─────────────────────────────────────────
   LIVE TICKER
───────────────────────────────────────── */
function LiveTicker({ highlights }: { highlights: Highlight[] }) {
  const titles = highlights.length > 0
    ? highlights.map(h => h.title)
    : ["IDEA Lab Highlights — Stay tuned for updates"]
  const repeated = [...titles, ...titles, ...titles, ...titles]

  return (
    <div style={{
      width: "100%", height: 36,
      background: "#f97316",
      display: "flex", alignItems: "center", overflow: "hidden",
    }}>
      <div style={{
        flexShrink: 0, padding: "0 18px", height: "100%",
        display: "flex", alignItems: "center", gap: 7,
        borderRight: "1px solid rgba(0,0,0,0.2)",
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%", background: "#000",
          animation: "livePulse 1.6s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9,
          letterSpacing: "0.3em", color: "#000", textTransform: "uppercase", fontWeight: 500,
        }}>Live</span>
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div style={{
          display: "flex", whiteSpace: "nowrap",
          animation: "tickerScroll 50s linear infinite",
        }}>
          {repeated.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: 10,
              letterSpacing: "0.12em", color: "#000",
            }}>
              &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MASTHEAD
───────────────────────────────────────── */
function Masthead({ highlights }: { highlights: Highlight[] }) {
  const today = new Date()

  return (
    <div style={{ borderBottom: "3px solid rgba(255,255,255,0.9)", paddingBottom: 20, marginBottom: 0 }}>
      {/* top meta row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 18, flexWrap: "wrap", gap: 8,
      }}>
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9,
          letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
        }}>
          {DAYS_LONG[today.getDay()]}, {MONTHS_LONG[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%", background: "#f97316",
            boxShadow: "0 0 8px #f97316",
            animation: "livePulse 2s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "'Azeret Mono', monospace", fontSize: 9,
            letterSpacing: "0.25em", color: "#f97316", textTransform: "uppercase",
          }}>( · ) Realtime Updates</span>
        </div>

        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9,
          letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
        }}>
          {highlights.length} {highlights.length === 1 ? "Entry" : "Entries"}
        </span>
      </div>

      {/* masthead title — crossed by horizontal rule */}
      <div style={{ textAlign: "center", padding: "10px 0 18px", position: "relative" }}>
        <div style={{
          position: "absolute", top: "50%", left: 0, right: 0, height: 1,
          background: "rgba(255,255,255,0.12)", transform: "translateY(-50%)",
        }} />
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
          color: "#fff", letterSpacing: "-0.025em", lineHeight: 1,
          margin: 0, display: "inline",
          background: "#000", padding: "0 28px",
          position: "relative",
        }}>
          IDEA Lab Bulletin
        </h1>
      </div>

      <p style={{
        fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400,
        fontSize: 13, color: "rgba(255,255,255,0.3)",
        textAlign: "center", margin: "4px 0 0",
      }}>
        · Published by FISAT AICTE IDEA Lab · 
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────
   FEATURED CARD — hero story
───────────────────────────────────────── */
function FeaturedCard({ item }: { item: Highlight }) {
  const isAnnouncement = item.type === "announcement"

  return (
    <article style={{
      marginBottom: 52, paddingBottom: 48,
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      animation: "riseIn 0.65s cubic-bezier(0.16,1,0.3,1) both",
    }}>
      {/* image */}
      {item.image_url && (
        <div style={{
          width: "100%", height: "clamp(220px, 36vw, 420px)",
          overflow: "hidden", marginBottom: 28,
        }}>
          <img
            src={item.image_url} alt={item.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              filter: "brightness(0.6) saturate(0.85) contrast(1.05)",
            }}
          />
        </div>
      )}

      {/* meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        {/* type chip */}
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 8,
          letterSpacing: "0.3em", textTransform: "uppercase",
          padding: "3px 10px",
          background: isAnnouncement ? "#f97316" : "rgba(255,255,255,0.12)",
          color: isAnnouncement ? "#000" : "#fff",
          borderRadius: 2,
        }}>
          {isAnnouncement ? "Announcement" : "Event"}
        </span>

        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 8,
          letterSpacing: "0.25em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.35)",
        }}>Featured</span>

        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9,
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)",
        }}>{timeAgo(item.created_at)}</span>

        {item.event_date && (
          <>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: 9,
              letterSpacing: "0.1em", color: "#f97316", opacity: 0.85,
            }}>{fmtDate(item.event_date)}</span>
          </>
        )}

        {item.location && (
          <>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 11, color: "rgba(255,255,255,0.3)",
            }}>{item.location}</span>
          </>
        )}
      </div>

      {/* title */}
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 700,
        fontStyle: isAnnouncement ? "italic" : "normal",
        fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
        color: "#fff", lineHeight: 1.14, letterSpacing: "-0.025em",
        margin: "0 0 20px", maxWidth: 720,
        borderLeft: `3px solid ${isAnnouncement ? "#f97316" : "rgba(255,255,255,0.3)"}`,
        paddingLeft: 20,
      }}>
        {item.title}
      </h2>

      {/* content */}
      {item.content && (
        <p style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 400,
          fontStyle: isAnnouncement ? "italic" : "normal",
          fontSize: "clamp(0.98rem, 1.7vw, 1.1rem)",
          color: "rgba(255,255,255,0.48)",
          lineHeight: 1.85, margin: 0, maxWidth: 680,
        }}>
          {item.content}
        </p>
      )}
    </article>
  )
}

/* ─────────────────────────────────────────
   REGULAR CARD
───────────────────────────────────────── */
function HighlightCard({ item, index }: { item: Highlight; index: number }) {
  const isAnnouncement = item.type === "announcement"

  return (
    <article style={{
      paddingBottom: 36, marginBottom: 36,
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      animation: `riseIn 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s both`,
      position: "relative",
    }}>
      {/* left accent rule */}
      <div style={{
        position: "absolute", left: -24, top: 0, bottom: 36, width: 2,
        background: isAnnouncement
          ? "linear-gradient(180deg, #f97316, rgba(249,115,22,0.08))"
          : "linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.02))",
        borderRadius: 99,
      }} />

      {/* meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 8,
          letterSpacing: "0.28em", textTransform: "uppercase",
          padding: "3px 9px", borderRadius: 2,
          background: isAnnouncement ? "#f97316" : "rgba(255,255,255,0.1)",
          color: isAnnouncement ? "#000" : "#fff",
        }}>
          {isAnnouncement ? "Announcement" : "Event"}
        </span>

        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 9,
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)",
        }}>{timeAgo(item.created_at)}</span>

        {item.event_date && (
          <>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: 9,
              letterSpacing: "0.1em", color: "rgba(249,115,22,0.75)",
            }}>{fmtDate(item.event_date)}</span>
          </>
        )}

        {item.location && (
          <>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 11, color: "rgba(255,255,255,0.28)",
            }}>{item.location}</span>
          </>
        )}
      </div>

      {/* image */}
      {item.image_url && (
        <div style={{
          width: "100%", height: "clamp(160px, 24vw, 280px)",
          overflow: "hidden", marginBottom: 18,
        }}>
          <img
            src={item.image_url} alt={item.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              filter: "brightness(0.55) saturate(0.8) contrast(1.05)",
            }}
          />
        </div>
      )}

      {/* title */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 700,
        fontStyle: isAnnouncement ? "italic" : "normal",
        fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
        color: "#fff", lineHeight: 1.18, letterSpacing: "-0.02em",
        margin: "0 0 14px",
      }}>
        {item.title}
      </h3>

      {/* content */}
      {item.content && (
        <p style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 400,
          fontStyle: isAnnouncement ? "italic" : "normal",
          fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.82, margin: 0,
        }}>
          {item.content}
        </p>
      )}
    </article>
  )
}

/* ─────────────────────────────────────────
   PAGE — DB logic verbatim from original
───────────────────────────────────────── */
export default function HighlightsPage() {
  useFonts()

  // ── original state ──
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [loading, setLoading] = useState(true)

  // ── original effect + realtime subscription ──
  useEffect(() => {
    fetchHighlights()

    const channel = supabase
      .channel("highlights-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        () => { fetchHighlights() }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        () => { fetchHighlights() }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // ── original fetch ──
  async function fetchHighlights() {
    const { data, error } = await supabase
      .from("highlights")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) setHighlights(data)
    setLoading(false)
  }

  // ── original loading state ──
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#000", gap: 16,
      }}>
        <div style={{
          width: 32, height: 32,
          border: "1px solid rgba(249,115,22,0.3)",
          borderTopColor: "#f97316", borderRadius: "50%",
          animation: "spin 0.9s linear infinite",
        }} />
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 10,
          letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
        }}>Loading highlights…</span>
      </div>
    )
  }

  const featured = highlights[0] ?? null
  const rest     = highlights.slice(1)

  return (
    <>
      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.3; transform: scale(0.7); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>

      <Grain />

      <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>

        {/* LIVE TICKER */}
        <LiveTicker highlights={highlights} />

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 32px 100px" }}>

          {/* MASTHEAD */}
          <Masthead highlights={highlights} />

          {/* EMPTY STATE */}
          {highlights.length === 0 && (
            <div style={{
              textAlign: "center", padding: "80px 0",
              animation: "riseIn 0.5s ease both",
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                fontWeight: 700, fontSize: 26,
                color: "rgba(255,255,255,0.12)", margin: "0 0 20px",
              }}>No stories yet.</p>
              <div style={{
                width: 1, height: 60,
                background: "linear-gradient(180deg, #f97316, transparent)",
                margin: "0 auto",
              }} />
            </div>
          )}

          {/* FEATURED */}
          {featured && (
            <div style={{ marginTop: 44 }}>
              <FeaturedCard item={featured} />
            </div>
          )}

          {/* MORE STORIES */}
          {rest.length > 0 && (
            <div style={{ position: "relative", paddingLeft: 24 }}>
              {/* section label */}
              <div style={{
                display: "flex", alignItems: "center", gap: 14, marginBottom: 36,
              }}>
                <span style={{
                  fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                  letterSpacing: "0.35em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)", whiteSpace: "nowrap",
                }}>More Stories</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>

              {rest.map((item, i) => (
                <HighlightCard key={item.id} item={item} index={i + 1} />
              ))}
            </div>
          )}

          {/* FOOTER RULE */}
          <div style={{
            marginTop: 48, paddingTop: 24,
            borderTop: "3px double rgba(255,255,255,0.15)",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0,
            }}>
             · FISAT IDEA Lab Bulletin · Updates in realtime · 
            </p>
          </div>
        </div>
      </div>
    </>
  )
}