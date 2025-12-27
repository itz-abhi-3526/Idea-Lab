"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type Event = {
  id: string
  title: string
  event_type: string | null
  start_datetime: string
  venue: string | null
  poster_url: string | null
  registration_link: string
  is_registration_open: boolean
  is_featured: boolean
}

const EVENT_TYPE_STYLES: Record<string, string> = {
  Workshop: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Hackathon: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Talk: "bg-green-500/15 text-green-400 border-green-500/30",
  Bootcamp: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Competition: "bg-red-500/15 text-red-400 border-red-500/30",
}

const normalizeUrl = (url: string) =>
  url.startsWith("http") ? url : `https://${url}`

export function EventSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const now = new Date()

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select(
        "id, title, event_type, start_datetime, venue, poster_url, registration_link, is_registration_open, is_featured"
      )
      .order("display_order", { ascending: true })

    setEvents(data ?? [])
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

  return (
    <section className="relative w-full py-24 md:py-32 bg-background/50">
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">

        {/* Heading */}
        <div className="mb-20 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
              Events
            </h2>
          <div className="h-1 w-28 mx-auto bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
          <p className="text-lg text-muted-foreground">
            Moments where ideas meet action
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">
            Loading events…
          </p>
        )}

        {!loading && !featuredEvent && upcomingEvents.length === 0 && (
          <p className="text-center text-muted-foreground mb-12">
            No events right now. Stay tuned!
          </p>
        )}

        {/* ⭐ FEATURED EVENT */}
        {!loading && featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-accent/10 border border-accent/30 rounded-2xl overflow-hidden"
          >
            {featuredEvent.poster_url && (
              <img
                src={featuredEvent.poster_url}
                alt={featuredEvent.title}
                className="h-72 w-full object-cover"
              />
            )}

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Star className="w-5 h-5" />
                Featured Event
              </div>

              <h3 className="text-2xl font-semibold">
                {featuredEvent.title}
              </h3>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredEvent.start_datetime).toLocaleString()}
                </div>

                {featuredEvent.venue && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {featuredEvent.venue}
                  </div>
                )}
              </div>

              {featuredEvent.is_registration_open ? (
                <a
                  href={normalizeUrl(featuredEvent.registration_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Registration Closed
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* UPCOMING EVENTS */}
        {!loading && upcomingEvents.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {upcomingEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
              >
                {event.poster_url && (
                  <img
                    src={event.poster_url}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-5 space-y-4">
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

                  <h3 className="font-semibold">{event.title}</h3>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.start_datetime).toLocaleDateString()}
                    </div>

                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </div>
                    )}
                  </div>

                  {event.is_registration_open ? (
                    <a
                      href={normalizeUrl(event.registration_link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                    >
                      Register <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Registration Closed
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/events"
            className="group flex items-center gap-2 px-6 py-3 border border-accent/30 rounded-lg bg-accent/20 hover:bg-accent/30 transition"
          >
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}
