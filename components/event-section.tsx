"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

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

  // 🆕 Paid support
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

    // ✅ Registered events
    if (user) {
      const { data: regs } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", user.id)

      setRegistered(new Set(regs?.map((r) => r.event_id)))
    }

    // ✅ Registration counts
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
    <section className="relative w-full py-20 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* HEADER */}
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Events
          </h2>
          <div className="h-1 w-28 mx-auto bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
          <p className="text-muted-foreground">
            Moments where ideas meet action
          </p>
        </div>

        {/* FEATURED */}
        {featuredEvent && (
          <div className="mb-20 rounded-3xl overflow-hidden border border-accent/30 bg-accent/10 backdrop-blur-xl shadow-2xl">
            {featuredEvent.poster_url && (
              <img
                src={featuredEvent.poster_url}
                alt={featuredEvent.title}
                className="h-72 w-full object-cover"
              />
            )}

            <div className="p-8 space-y-5">
              <span className="text-xs uppercase tracking-wide text-accent">
                Featured Event
              </span>

              <h3 className="text-2xl font-semibold">
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

              {/* PRICE BADGE */}
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs ${
                  featuredEvent.is_paid
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {featuredEvent.is_paid
                  ? `₹${featuredEvent.price}`
                  : "Free"}
              </span>

              <Link
                href={`/events/${featuredEvent.id}`}
                className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* GRID */}
        {!loading && upcomingEvents.length === 0 && (
          <p className="text-center text-muted-foreground">
            No events right now. Stay tuned!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => {
            const alreadyRegistered = registered.has(event.id)

            return (
              <div
                key={event.id}
                className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md overflow-hidden hover:shadow-xl transition"
              >
                {event.poster_url && (
                  <img
                    src={event.poster_url}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />
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
                      className={`text-xs px-3 py-1 rounded-full ${
                        event.is_paid
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-blue-500/20 text-blue-400"
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

                  <h4 className="font-semibold">{event.title}</h4>

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
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* VIEW ALL */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/events"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 bg-accent/20 hover:bg-accent/30 transition"
          >
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
