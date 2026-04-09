import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Calendar, MapPin, CheckCircle, ArrowLeft, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "event-detail-fonts"
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
type Event = {
  id: string
  title: string
  description: string
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null
  is_paid: boolean
  price: number | null
}

/* ─────────────────────────────────────────
   CYBER TEXTAREA — no border shorthand conflict
───────────────────────────────────────── */
function CyberTextarea({
  value, onChange, placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: focused
            ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.85), transparent)"
            : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
          transition: "background 0.25s",
        }}
      />
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-4 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none"
        rows={5}
        style={{
          background:   focused ? "rgba(249,115,22,0.04)" : "rgba(0,0,0,0.4)",
          borderTop:    `1px solid ${focused ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRight:  `1px solid ${focused ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderBottom: `1px solid ${focused ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderLeft:   "none",
          borderRadius: 0,
          fontFamily:   "'Barlow', sans-serif",
          fontWeight:   300,
          transition:   "background 0.25s",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        animate={{
          width:      focused ? "100%" : "0%",
          background: "linear-gradient(to right, rgba(249,115,22,0.7), transparent)",
        }}
        transition={{ duration: 0.35, ease }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase/router logic untouched
───────────────────────────────────────── */
export default function DashboardEventDetailsPage() {
  useFonts()

  const navigate  = useNavigate()
  const { eventId } = useParams<{ eventId: string }>()

  const [event,              setEvent]              = useState<Event | null>(null)
  const [loading,            setLoading]            = useState(true)
  const [feedbackSubmitted,  setFeedbackSubmitted]  = useState(false)
  const [rating,             setRating]             = useState<number | null>(null)
  const [comments,           setComments]           = useState("")
  const [submitting,         setSubmitting]         = useState(false)

  /* ── ALL ORIGINAL LOAD LOGIC — UNCHANGED ── */
  useEffect(() => {
    if (!eventId) return

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        navigate("/login", { replace: true })
        return
      }

      const { data: reg } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (!reg) {
        navigate(`/events/${eventId}`, { replace: true })
        return
      }

      const { data: eventData } = await supabase
        .from("events")
        .select(`id, title, description, start_datetime, end_datetime, venue, poster_url, is_paid, price`)
        .eq("id", eventId)
        .single()

      setEvent(eventData)

      const { data: feedback } = await supabase
        .from("event_feedback")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (feedback) setFeedbackSubmitted(true)

      setLoading(false)
    }

    load()
  }, [eventId, router])

  /* ── ALL ORIGINAL FEEDBACK LOGIC — UNCHANGED ── */
  const submitFeedback = async () => {
    if (!rating) return alert("Please give a rating")

    setSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from("event_feedback").insert({
      event_id: event!.id,
      user_id:  user!.id,
      rating,
      comments,
    })

    setFeedbackSubmitted(true)
    setSubmitting(false)
  }

  /* ── LOADING ── */
  if (loading || !event) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#000" }}
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
            LOADING EVENT...
          </span>
        </div>
      </div>
    )
  }

  const feedbackOpenAt = new Date(event.end_datetime).getTime() + 10 * 60 * 1000
  const isFeedbackOpen = Date.now() >= feedbackOpenAt

  return (
    <section className="min-h-screen text-white" style={{ background: "#000" }}>

      {/* ── BACK BUTTON ── */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-100 opacity-70"
          style={{
            fontFamily:    "'Share Tech Mono', monospace",
            fontSize:      "0.7rem",
            letterSpacing: "0.18em",
            color:         "#ffffff",
            textDecoration: "none",
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO MY EVENTS
        </Link>
      </div>

      {/* ── HERO ── */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {event.poster_url ? (
          <img
            src={event.poster_url}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          /* no poster — dot grid atmosphere */
          <div
            className="absolute inset-0"
            style={{
              background:      "rgba(0,0,0,1)",
              backgroundImage: "radial-gradient(circle, rgba(249,115,22,0.06) 1px, transparent 1px)",
              backgroundSize:  "32px 32px",
            }}
          />
        )}

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20" />

        {/* scanlines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
          }}
        />

        {/* hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10 flex h-full items-end px-6 sm:px-12 pb-20"
        >
          <div className="max-w-4xl space-y-5">

            {/* eyebrow */}
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-orange-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span
                style={{
                  fontFamily:    "'Share Tech Mono', monospace",
                  fontSize:      "0.68rem",
                  letterSpacing: "0.3em",
                  color:         "rgba(249,115,22,0.65)",
                }}
              >
                FISAT AICTE IDEA LAB · EVT·{event.id.slice(0, 8).toUpperCase()}
              </span>
            </div>

            {/* title */}
            <h1
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    900,
                fontSize:      "clamp(2.4rem, 6vw, 5rem)",
                lineHeight:    0.92,
                letterSpacing: "-0.02em",
                color:         "#ffffff",
              }}
            >
              {event.title}
            </h1>

            {/* meta row */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(249,115,22,0.7)" }} />
                <span
                  style={{
                    fontFamily:    "'Share Tech Mono', monospace",
                    fontSize:      "0.72rem",
                    letterSpacing: "0.08em",
                    color:         "rgba(255,255,255,0.55)",
                  }}
                >
                  {new Date(event.start_datetime).toLocaleString()}
                </span>
              </div>

              {event.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(249,115,22,0.7)" }} />
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize:   "0.72rem",
                      letterSpacing: "0.08em",
                      color:      "rgba(255,255,255,0.55)",
                    }}
                  >
                    {event.venue}
                  </span>
                </div>
              )}

              {/* price badge */}
              <span
                className="px-3 py-1 text-[9px] tracking-[0.2em]"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color:      event.is_paid ? "rgba(249,115,22,0.8)" : "rgba(99,102,241,0.8)",
                  background: event.is_paid ? "rgba(249,115,22,0.1)" : "rgba(99,102,241,0.1)",
                  border:     event.is_paid ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(99,102,241,0.3)",
                }}
              >
                {event.is_paid ? `₹${event.price}` : "FREE"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative px-6 sm:px-12 py-20">
        {/* subtle bg */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-[40rem] w-[40rem] rounded-full bg-orange-500/[0.03] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── DESCRIPTION ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="space-y-5"
          >
            {/* section label */}
            <div className="flex items-center gap-3">
              <span
                className="text-[9px] tracking-[0.3em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}
              >
                SYS.ABOUT
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
            </div>

            <h2
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    700,
                fontSize:      "clamp(1.3rem, 3vw, 1.8rem)",
                letterSpacing: "-0.01em",
                color:         "#ffffff",
                lineHeight:    1,
              }}
            >
              About the Event
            </h2>

            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize:   "0.95rem",
                color:      "rgba(255,255,255,0.45)",
                lineHeight: 1.75,
              }}
            >
              {event.description}
            </p>
          </motion.div>

          {/* ── FEEDBACK ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease }}
            className="space-y-5"
          >
            {/* section label */}
            <div className="flex items-center gap-3">
              <span
                className="text-[9px] tracking-[0.3em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}
              >
                SYS.FEEDBACK
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
            </div>

            <h2
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    700,
                fontSize:      "clamp(1.3rem, 3vw, 1.8rem)",
                letterSpacing: "-0.01em",
                color:         "#ffffff",
                lineHeight:    1,
              }}
            >
              Event Feedback
            </h2>

            {/* not open yet */}
            {!isFeedbackOpen && (
              <div
                className="px-4 py-3 flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border:     "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-orange-500/40 shrink-0"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize:   "0.68rem",
                    letterSpacing: "0.1em",
                    color:      "rgba(255,255,255,0.3)",
                  }}
                >
                  FEEDBACK OPENS 10 MIN AFTER EVENT ENDS
                </p>
              </div>
            )}

            {/* submitted */}
            {isFeedbackOpen && feedbackSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="relative overflow-hidden p-5 space-y-2"
                style={{
                  background: "rgba(34,197,94,0.06)",
                  border:     "1px solid rgba(34,197,94,0.25)",
                }}
              >
                {/* top accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)" }} />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "rgba(34,197,94,0.8)" }} />
                  <span
                    style={{
                      fontFamily:    "'Share Tech Mono', monospace",
                      fontSize:      "0.72rem",
                      letterSpacing: "0.15em",
                      color:         "rgba(34,197,94,0.85)",
                    }}
                  >
                    FEEDBACK SUBMITTED
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize:   "0.82rem",
                    color:      "rgba(255,255,255,0.35)",
                  }}
                >
                  Your certificate will appear in the{" "}
                  <span style={{ color: "rgba(249,115,22,0.7)" }}>Certificates</span>{" "}
                  section once issued.
                </p>
              </motion.div>
            )}

            {/* form */}
            {isFeedbackOpen && !feedbackSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
                className="relative overflow-hidden space-y-5 p-6"
                style={{
                  background:     "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(16px)",
                  border:         "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* shimmer */}
                <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden" style={{ background: "rgba(249,115,22,0.12)" }}>
                  <motion.div
                    className="absolute inset-y-0 w-1/3"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.7), transparent)" }}
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                  />
                </div>

                {/* HUD corners */}
                <div className="absolute top-3 left-3 w-3 h-3" style={{ borderTop: "1px solid rgba(249,115,22,0.3)", borderLeft: "1px solid rgba(249,115,22,0.3)" }} />
                <div className="absolute top-3 right-3 w-3 h-3" style={{ borderTop: "1px solid rgba(249,115,22,0.3)", borderRight: "1px solid rgba(249,115,22,0.3)" }} />

                {/* rating label */}
                <span
                  style={{
                    display:       "block",
                    fontFamily:    "'Share Tech Mono', monospace",
                    fontSize:      "0.68rem",
                    letterSpacing: "0.25em",
                    color:         "rgba(249,115,22,0.5)",
                  }}
                >
                  RATE YOUR EXPERIENCE
                </span>

                {/* stars */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <motion.button
                      key={n}
                      onClick={() => setRating(n)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{   scale: 0.9  }}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      <Star
                        className="w-7 h-7"
                        style={{
                          color:      rating && rating >= n ? "rgb(249,115,22)" : "rgba(255,255,255,0.2)",
                          fill:       rating && rating >= n ? "rgb(249,115,22)" : "transparent",
                          transition: "color 0.2s, fill 0.2s",
                          filter:     rating && rating >= n ? "drop-shadow(0 0 4px rgba(249,115,22,0.5))" : "none",
                        }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* textarea */}
                <div className="space-y-1.5">
                  <span
                    style={{
                      display:       "block",
                      fontFamily:    "'Share Tech Mono', monospace",
                      fontSize:      "0.68rem",
                      letterSpacing: "0.25em",
                      color:         "rgba(249,115,22,0.4)",
                    }}
                  >
                    COMMENTS (OPTIONAL)
                  </span>
                  <CyberTextarea
                    value={comments}
                    onChange={setComments}
                    placeholder="Share your thoughts..."
                  />
                </div>

                {/* submit */}
                <motion.button
                  onClick={submitFeedback}
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.015 }}
                  whileTap={{   scale: submitting ? 1 : 0.985 }}
                  className="relative overflow-hidden w-full py-3 disabled:opacity-50"
                  style={{
                    background:    submitting ? "rgba(249,115,22,0.7)" : "rgb(249,115,22)",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontWeight:    700,
                    fontSize:      "0.95rem",
                    letterSpacing: "0.2em",
                    color:         "#000000",
                    border:        "none",
                    cursor:        submitting ? "not-allowed" : "pointer",
                    boxShadow:     submitting ? "none" : "0 0 20px rgba(249,115,22,0.3)",
                  }}
                >
                  {submitting && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-10%", "110%"] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {!submitting && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">
                    {submitting ? "SUBMITTING..." : "SUBMIT FEEDBACK"}
                  </span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}