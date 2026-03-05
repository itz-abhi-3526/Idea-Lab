"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Calendar, MapPin } from "lucide-react"
import QRCode from "react-qr-code"
import { motion, AnimatePresence } from "framer-motion"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "events-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap"
    document.head.prepend(l)
  }, [])
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
type UserEvent = {
  id: string
  title: string
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null
  is_paid: boolean
  price: number | null
}

type UserProfile = {
  name: string | null
  email: string
}

/* ─────────────────────────────────────────
   TICKET CARD
───────────────────────────────────────── */
function EventTicket({
  event,
  status,
  user,
  index,
}: {
  event: UserEvent
  status: "upcoming" | "past"
  user: UserProfile | null
  index: number
}) {
  const [hov, setHov] = useState(false)
  const start = new Date(event.start_datetime)
  const end   = new Date(event.end_datetime)
  const isPast = status === "past"

  /* ── QR payload — unchanged ── */
  const qrPayload = JSON.stringify({
    attendee: {
      name:  user?.name ?? "IDEA Lab Participant",
      email: user?.email,
    },
    event: {
      id:     event.id,
      title:  event.title,
      venue:  event.venue,
      start:  start.toISOString(),
      end:    end.toISOString(),
      status,
      payment: event.is_paid
        ? { type: "paid", amount: event.price }
        : { type: "free" },
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden"
      style={{
        background:     isPast ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        border:         hov && !isPast
          ? "1px solid rgba(249,115,22,0.35)"
          : isPast
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid rgba(249,115,22,0.15)",
        boxShadow:      hov && !isPast
          ? "0 0 0 1px rgba(249,115,22,0.08), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        opacity:    isPast ? 0.7 : 1,
        transition: "border 0.25s, box-shadow 0.25s, opacity 0.25s",
      }}
    >
      {/* top shimmer on hover */}
      {hov && !isPast && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease }}
          style={{
            background:      "linear-gradient(90deg, transparent, rgba(249,115,22,0.65), transparent)",
            transformOrigin: "left",
          }}
        />
      )}

      {/* perforated divider dots — ticket feel */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left:             "96px",
          width:            "1px",
          backgroundImage:  "repeating-linear-gradient(to bottom, transparent, transparent 6px, rgba(249,115,22,0.2) 6px, rgba(249,115,22,0.2) 8px)",
        }}
      />
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          right:            "136px",
          width:            "1px",
          backgroundImage:  "repeating-linear-gradient(to bottom, transparent, transparent 6px, rgba(249,115,22,0.2) 6px, rgba(249,115,22,0.2) 8px)",
        }}
      />

      {/* HUD corner */}
      <div
        className="absolute top-3 left-3 w-3 h-3"
        style={{
          borderTop:  `1px solid ${isPast ? "rgba(255,255,255,0.08)" : "rgba(249,115,22,0.3)"}`,
          borderLeft: `1px solid ${isPast ? "rgba(255,255,255,0.08)" : "rgba(249,115,22,0.3)"}`,
        }}
      />
      <div
        className="absolute top-3 right-3 w-3 h-3"
        style={{
          borderTop:   `1px solid ${isPast ? "rgba(255,255,255,0.08)" : "rgba(249,115,22,0.3)"}`,
          borderRight: `1px solid ${isPast ? "rgba(255,255,255,0.08)" : "rgba(249,115,22,0.3)"}`,
        }}
      />

      {/* ── THREE-COLUMN GRID ── */}
      <div className="grid min-h-[160px]" style={{ gridTemplateColumns: "96px 1fr 136px" }}>

        {/* DATE STRIP */}
        <div
          className="flex flex-col items-center justify-center gap-0.5 px-3"
          style={{
            background: isPast ? "rgba(255,255,255,0.02)" : "rgba(249,115,22,0.07)",
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize:   "2.2rem",
              lineHeight: 1,
              color:      isPast ? "rgba(255,255,255,0.3)" : "rgba(249,115,22,0.9)",
            }}
          >
            {start.getDate()}
          </span>
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.6rem",
              letterSpacing: "0.2em",
              color:         isPast ? "rgba(255,255,255,0.2)" : "rgba(249,115,22,0.55)",
            }}
          >
            {start.toLocaleString("default", { month: "short" }).toUpperCase()}
          </span>
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.58rem",
              letterSpacing: "0.08em",
              color:         "rgba(255,255,255,0.2)",
              marginTop:     "4px",
            }}
          >
            {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* DETAILS */}
        <div className="px-6 py-5 flex flex-col justify-center gap-2">
          {/* event id eyebrow */}
          <span
            className="text-[9px] tracking-[0.25em]"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color:      isPast ? "rgba(255,255,255,0.18)" : "rgba(249,115,22,0.45)",
            }}
          >
            EVT·{event.id.slice(0, 8).toUpperCase()}
          </span>

          {/* title */}
          <h3
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    700,
              fontSize:      "clamp(1.05rem, 2.5vw, 1.35rem)",
              letterSpacing: "-0.01em",
              color:         isPast ? "rgba(255,255,255,0.45)" : "#ffffff",
              lineHeight:    1.1,
            }}
          >
            {event.title}
          </h3>

          {/* venue */}
          {event.venue && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 shrink-0" style={{ color: "rgba(249,115,22,0.5)" }} />
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize:   "0.78rem",
                  color:      "rgba(255,255,255,0.35)",
                }}
              >
                {event.venue}
              </span>
            </div>
          )}

          {/* datetime */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 shrink-0" style={{ color: "rgba(249,115,22,0.5)" }} />
            <span
              style={{
                fontFamily:    "'Share Tech Mono', monospace",
                fontSize:      "0.68rem",
                letterSpacing: "0.06em",
                color:         "rgba(255,255,255,0.28)",
              }}
            >
              {start.toLocaleString()} — {end.toLocaleTimeString()}
            </span>
          </div>

          {/* badges row */}
          <div className="flex flex-wrap gap-2 mt-1">
            {/* price badge */}
            <span
              className="px-2.5 py-0.5 text-[9px] tracking-[0.18em]"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color:      event.is_paid ? "rgba(249,115,22,0.75)" : "rgba(99,102,241,0.75)",
                background: event.is_paid ? "rgba(249,115,22,0.08)" : "rgba(99,102,241,0.08)",
                border:     event.is_paid ? "1px solid rgba(249,115,22,0.2)" : "1px solid rgba(99,102,241,0.2)",
              }}
            >
              {event.is_paid ? `₹${event.price}` : "FREE"}
            </span>

            {/* status badge */}
            <span
              className="px-2.5 py-0.5 text-[9px] tracking-[0.18em]"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color:      isPast ? "rgba(255,255,255,0.25)" : "rgba(34,197,94,0.75)",
                background: isPast ? "rgba(255,255,255,0.04)" : "rgba(34,197,94,0.07)",
                border:     isPast ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(34,197,94,0.2)",
              }}
            >
              {isPast ? "COMPLETED" : "UPCOMING"}
            </span>
          </div>
        </div>

        {/* QR COLUMN */}
        <div
          className="flex items-center justify-center"
          style={{
            background: isPast ? "rgba(255,255,255,0.015)" : "rgba(249,115,22,0.04)",
          }}
        >
          <div
            className="p-2"
            style={{
              background: "#ffffff",
              border:     isPast ? "2px solid rgba(255,255,255,0.15)" : "2px solid rgba(249,115,22,0.5)",
              boxShadow:  isPast ? "none" : "0 0 16px rgba(249,115,22,0.15)",
            }}
          >
            <QRCode value={qrPayload} size={72} />
          </div>
        </div>
      </div>

      {/* CLICK OVERLAY — unchanged */}
      <Link
        href={`/dashboard/events/${event.id}`}
        className="absolute inset-0"
        aria-label="View Event Details"
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   EVENT SECTION
───────────────────────────────────────── */
function EventSection({
  title, sysId, empty, events, status, user,
}: {
  title: string
  sysId: string
  empty: string
  events: UserEvent[]
  status: "upcoming" | "past"
  user: UserProfile | null
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="space-y-5"
    >
      {/* section label */}
      <div className="flex items-center gap-3">
        <span
          className="text-[9px] tracking-[0.32em] uppercase"
          style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}
        >
          {sysId}
        </span>
        <h2
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontWeight:    700,
            fontSize:      "clamp(1.2rem, 3vw, 1.6rem)",
            letterSpacing: "-0.01em",
            color:         "#ffffff",
            lineHeight:    1,
          }}
        >
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-orange-500/15 to-transparent" />
        <span
          className="px-2 py-0.5 text-[9px] tracking-[0.18em]"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color:      "rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.04)",
            border:     "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {events.length}
        </span>
      </div>

      {events.length === 0 ? (
        <div
          className="relative py-12 flex flex-col items-center gap-3 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border:     "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="absolute top-3 left-3 w-3 h-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)" }} />
          <div className="absolute top-3 right-3 w-3 h-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }} />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-orange-500/30"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.7rem",
              letterSpacing: "0.22em",
              color:         "rgba(255,255,255,0.2)",
            }}
          >
            {empty.toUpperCase()}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event, i) => (
            <EventTicket
              key={event.id}
              event={event}
              status={status}
              user={user}
              index={i}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase logic untouched
───────────────────────────────────────── */
export default function UserEventsDashboard() {
  useFonts()

  const [upcoming,    setUpcoming]    = useState<UserEvent[]>([])
  const [past,        setPast]        = useState<UserEvent[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading,     setLoading]     = useState(true)

  /* ── ALL ORIGINAL LOAD LOGIC — UNCHANGED ── */
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from("public.users")
        .select("name, email")
        .eq("id", user.email)
        .single()

      setUserProfile(profile ?? { name: null, email: user.email ?? "" })

      const { data } = await supabase
        .from("event_registrations")
        .select(`
          events (
            id,
            title,
            start_datetime,
            end_datetime,
            venue,
            poster_url,
            is_paid,
            price
          )
        `)
        .eq("user_id", user.id)

      const now = new Date()
      const upcomingEvents: UserEvent[] = []
      const pastEvents: UserEvent[]     = []

      data?.forEach((row: any) => {
        const event = row.events
        if (!event) return
        if (new Date(event.end_datetime) > now) {
          upcomingEvents.push(event)
        } else {
          pastEvents.push(event)
        }
      })

      setUpcoming(upcomingEvents)
      setPast(pastEvents)
      setLoading(false)
    }

    load()
  }, [])

  /* ── LOADING ── */
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "hsl(var(--background))" }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-orange-500"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.7rem",
              letterSpacing: "0.25em",
              color:         "rgba(255,255,255,0.3)",
            }}
          >
            LOADING YOUR EVENTS...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-[45rem] w-[45rem] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
      </div>

      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-10 space-y-14">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span
              className="text-[9px] tracking-[0.32em] uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.55)" }}
            >
              FISAT AICTE IDEA LAB · EVENTS
            </span>
          </div>
          <h1
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(2rem, 5vw, 3.5rem)",
              lineHeight:    0.92,
              letterSpacing: "-0.02em",
              color:         "#ffffff",
            }}
          >
            My{" "}
            <span style={{ color: "rgb(249,115,22)" }}>Events</span>
          </h1>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize:   "0.9rem",
              color:      "rgba(255,255,255,0.3)",
            }}
          >
            Your registered event tickets
          </p>
        </motion.div>

        <EventSection
          title="Upcoming Events"
          sysId="SYS.UPCOMING"
          empty="You have no upcoming events."
          events={upcoming}
          status="upcoming"
          user={userProfile}
        />

        <EventSection
          title="Past Events"
          sysId="SYS.ARCHIVE"
          empty="No past events yet."
          events={past}
          status="past"
          user={userProfile}
        />

      </section>
    </div>
  )
}