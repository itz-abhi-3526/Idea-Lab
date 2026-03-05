"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { supabase } from "@/lib/supabase"
import EventCard from "@/components/admin/events/EventCard"
import AddEditEventModal from "@/components/admin/events/AddEditEventModal"

/* ─────────────────────────────────────────
   SYSTEM PALETTE (MATCH INCUBATION PAGE)
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
export type Event = {
  id: string
  title: string
  description: string
  event_type: string
  start_datetime: string
  end_datetime: string
  venue: string
  poster_url: string | null
  registration_link: string | null
  is_registration_open: boolean
  is_active: boolean
  is_featured: boolean
  display_order: number
  created_at: string
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [editEvent, setEditEvent] = useState<Event | null>(null)
  const [searchFoc, setSearchFoc] = useState(false)

  const fetchEvents = useCallback(async () => {
    setLoading(true)

    const { data } = await supabase
      .from("events")
      .select("*")
      .order("display_order", { ascending: true })
      .order("start_datetime", { ascending: false })

    setEvents(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEvents()

    const channel = supabase
      .channel("events-admin-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        fetchEvents
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchEvents])

  const filtered = useMemo(() => {
    return events.filter(e =>
      `${e.title} ${e.event_type ?? ""} ${e.venue ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [events, search])

  const now = new Date()

  const stats = {
    total: events.length,
    active: events.filter(e => e.is_active).length,
    upcoming: events.filter(e => new Date(e.start_datetime) > now).length,
    featured: events.filter(e => e.is_featured).length,
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes sysblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes syspulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        input::placeholder {
          color:${AMBER(0.22)};
          font-family:'IBM Plex Mono',monospace;
          font-size:0.7rem;
          letter-spacing:0.06em
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* SYSTEM RULE */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.32em",
            color: AMBER(0.45),
            whiteSpace: "nowrap"
          }}>
            SYS · EVENTS CONTROL
          </span>
          <div style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
          }} />
        </div>

        {/* HEADER */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            letterSpacing: "-0.01em",
            color: AMBER(0.9),
            margin: 0
          }}>
            Event Management
          </h1>

          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: DIMWHITE(0.3),
            marginTop: 6
          }}>
            Create, edit and monitor IDEA Lab events
          </p>
        </div>

        {/* STATS STRIP */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 8,
          marginBottom: 22
        }}>
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} style={{
              background: PANEL,
              border: `1px solid ${BORDER}`,
              padding: "14px 16px",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 1,
                background: `linear-gradient(to bottom, transparent, ${AMBER(0.5)}, transparent)`
              }} />
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.22em",
                color: AMBER(0.3),
                marginBottom: 4
              }}>
                {k.toUpperCase()}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: AMBER(0.85)
              }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH + ADD ROW */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: searchFoc ? 2 : 1,
              background: searchFoc
                ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)`
                : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`
            }} />
            <input
              placeholder="SEARCH TITLE / TYPE / VENUE..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFoc(true)}
              onBlur={() => setSearchFoc(false)}
              style={{
                width: "100%",
                padding: "10px 12px",
                background: PANEL,
                borderTop: `1px solid ${BORDER}`,
                borderRight: `1px solid ${BORDER}`,
                borderBottom: `1px solid ${BORDER}`,
                borderLeft: "none",
                outline: "none",
                color: DIMWHITE(0.85),
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.72rem"
              }}
            />
          </div>

          <button
            onClick={() => { setEditEvent(null); setOpen(true) }}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              padding: "10px 18px",
              background: AMBER(0.9),
              border: "none",
              color: BG,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: `0 0 14px ${AMBER(0.2)}`
            }}
          >
            + ADD EVENT
          </button>
        </div>

        {/* RESULT RULE */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.22em",
            color: AMBER(0.25)
          }}>
            {filtered.length} EVENT{filtered.length !== 1 ? "S" : ""}
          </span>
          <div style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)`
          }} />
          <div style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: GREEN(0.85),
            boxShadow: `0 0 4px ${GREEN(0.5)}`,
            animation: "syspulse 2s ease-in-out infinite"
          }} />
        </div>

        {/* CONTENT */}
        {loading ? (
          <div style={{ padding: "40px 0" }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: AMBER(0.35)
            }}>
              LOADING EVENTS...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            padding: "60px 0",
            border: `1px solid ${AMBER(0.08)}`,
            background: PANEL,
            textAlign: "center"
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: AMBER(0.25)
            }}>
              NO EVENTS FOUND
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(event => (
              <div key={event.id}>
                <EventCard
                  event={event}
                  onEdit={() => {
                    setEditEvent(event)
                    setOpen(true)
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddEditEventModal
        open={open}
        event={editEvent}
        onClose={() => {
          setOpen(false)
          setEditEvent(null)
        }}
      />
    </div>
  )
}