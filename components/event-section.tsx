"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { LazyMotion, domAnimation, m } from "framer-motion"

type Event = {
  id: string
  title: string
  event_type: string | null
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null
  is_featured: boolean
  capacity: number | null

  is_paid: boolean
  price: number | null
}

const EVENT_TYPE_STYLES: Record<string, string> = {
  Workshop: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Hackathon: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Talk: "bg-green-500/15 text-green-400 border-green-500/30",
  Bootcamp: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Competition: "bg-red-500/15 text-red-400 border-red-500/30",
}

export function EventSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [registered, setRegistered] = useState<Set<string>>(new Set())
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  const now = new Date()

  const fetchEvents = async () => {
    setLoading(true)

    const { data: eventsData } = await supabase
      .from("events")
      .select(
        "id, title, event_type, start_datetime, end_datetime, venue, poster_url, is_featured, capacity, is_paid, price"
      )
      .order("display_order", { ascending: true })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: regs } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", user.id)

      setRegistered(new Set(regs?.map((r) => r.event_id)))
    }

    if (eventsData?.length) {
      const { data: regCounts } = await supabase
        .from("event_registrations")
        .select("event_id")

      const map: Record<string, number> = {}
      regCounts?.forEach((r) => {
        map[r.event_id] = (map[r.event_id] || 0) + 1
      })

      setCounts(map)
    }

    setEvents(eventsData ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()

    const channel = supabase
      .channel("events-landing-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        fetchEvents
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const featuredEvent = events.find(
    (e) => e.is_featured && new Date(e.start_datetime) >= now
  )

  const upcomingEvents = events.filter(
    (e) => new Date(e.start_datetime) >= now && !e.is_featured
  )

  const isEnded = (e: Event) => new Date(e.end_datetime) < now
  const isSoldOut = (e: Event) =>
    e.capacity !== null && (counts[e.id] ?? 0) >= e.capacity

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-20 overflow-hidden bg-background/50">
        {/* ambient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/4 top-0 h-[32rem] w-[32rem] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* HEADER */}
          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
              Events
            </h2>

            <div className="relative h-[2px] w-28 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0">
              <m.span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <p className="text-muted-foreground">
              Moments where ideas meet action
            </p>
          </m.div>

          {/* FEATURED */}
          {featuredEvent && (
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-20 relative rounded-3xl overflow-hidden
                         border border-accent/30
                         bg-accent/10 backdrop-blur-xl
                         shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            >
              {featuredEvent.poster_url && (
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={featuredEvent.poster_url}
                    alt={featuredEvent.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              )}

              <div className="p-8 space-y-5">

                <span className="inline-flex text-xs uppercase tracking-wide text-accent">
                  Featured Event
                </span>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {featuredEvent.title}
                </h3>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(
                      featuredEvent.start_datetime
                    ).toLocaleString()}
                  </div>

                  {featuredEvent.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {featuredEvent.venue}
                    </div>
                  )}
                </div>

                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs border ${
                    featuredEvent.is_paid
                      ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
                      : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                  }`}
                >
                  {featuredEvent.is_paid
                    ? `₹${featuredEvent.price}`
                    : "Free"}
                </span>

                <Link
                  href={`/events/${featuredEvent.id}`}
                  className="inline-flex items-center gap-2 text-accent font-medium group"
                >
                  <span className="relative">
                    View Details
                    <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </m.div>
          )}

          {/* EMPTY */}
          {!loading && upcomingEvents.length === 0 && (
            <p className="text-center text-muted-foreground">
              No events right now. Stay tuned!
            </p>
          )}

          {/* GRID */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {upcomingEvents.map((event) => {
              const alreadyRegistered = registered.has(event.id)

              return (
                <m.div
                  key={event.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl overflow-hidden
                             bg-white/5 backdrop-blur-xl
                             border border-white/10
                             shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                >
                  {event.poster_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.poster_url}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      />
                    </div>
                  )}

                  <div className="p-5 space-y-4">

                    <div className="flex flex-wrap items-center gap-2">
                      {event.event_type && (
                        <span
                          className={`text-xs px-3 py-1 rounded-full border ${
                            EVENT_TYPE_STYLES[event.event_type] ??
                            "bg-muted text-muted-foreground border-white/10"
                          }`}
                        >
                          {event.event_type}
                        </span>
                      )}

                      <span
                        className={`text-xs px-3 py-1 rounded-full border ${
                          event.is_paid
                            ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
                            : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {event.is_paid ? `₹${event.price}` : "Free"}
                      </span>

                      {alreadyRegistered && (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle className="w-3 h-3" />
                          Registered
                        </span>
                      )}
                    </div>

                    <h4 className="font-semibold leading-snug">
                      {event.title}
                    </h4>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(
                          event.start_datetime
                        ).toLocaleDateString()}
                      </div>

                      {event.venue && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.venue}
                        </div>
                      )}
                    </div>

                    {isEnded(event) ? (
                      <p className="text-xs text-muted-foreground">
                        Event Ended
                      </p>
                    ) : isSoldOut(event) ? (
                      <p className="text-xs text-muted-foreground">
                        Sold Out
                      </p>
                    ) : (
                      <Link
                        href={`/events/${event.id}`}
                        className="inline-flex items-center gap-2 text-sm text-accent group"
                      >
                        <span className="relative">
                          View Details
                          <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </m.div>
              )
            })}
          </m.div>

          {/* VIEW ALL */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/events"
              className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl
                         border border-accent/30
                         bg-accent/15 backdrop-blur
                         hover:bg-accent/25 transition"
            >
              <span className="relative z-10">
                View All Events
              </span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  )
}
