"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, ArrowRight, Star } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Event = {
  id: string
  title: string
  description: string | null
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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

  const now = new Date()

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("start_datetime", { ascending: true })

    setEvents(data ?? [])
  }

  useEffect(() => {
    fetchEvents()

    const channel = supabase
      .channel("events-page-realtime")
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

  const pastEvents = events.filter(
    (e) => new Date(e.start_datetime) < now
  )

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)]">
          Events
        </h1>
        <div className="h-1 w-28 mx-auto mt-4 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
      </div>

      {/* FEATURED */}
      {featuredEvent && (
        <div className="mb-20 bg-accent/10 border border-accent/30 rounded-2xl overflow-hidden">
          {featuredEvent.poster_url && (
            <img
              src={featuredEvent.poster_url}
              className="h-72 w-full object-cover"
              alt={featuredEvent.title}
            />
          )}

          <div className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Star className="w-5 h-5" />
              Featured Event
            </div>

            <h2 className="text-2xl font-semibold">
              {featuredEvent.title}
            </h2>

            {featuredEvent.description && (
              <p className="text-muted-foreground">
                {featuredEvent.description}
              </p>
            )}

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
        </div>
      )}

      {/* TABS */}
      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-lg text-sm ${
            activeTab === "upcoming"
              ? "bg-accent/20 text-accent"
              : "text-muted-foreground"
          }`}
        >
          Upcoming Events
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-lg text-sm ${
            activeTab === "past"
              ? "bg-accent/20 text-accent"
              : "text-muted-foreground"
          }`}
        >
          Past Events
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {(activeTab === "upcoming" ? upcomingEvents : pastEvents).map(
          (event) => (
            <div
              key={event.id}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
            >
              {event.poster_url && (
                <img
                  src={event.poster_url}
                  className="h-48 w-full object-cover"
                  alt={event.title}
                />
              )}

              <div className="p-5 space-y-4">
                {event.event_type && (
                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full border ${
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
                    {new Date(event.start_datetime).toLocaleString()}
                  </div>

                  {event.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </div>
                  )}
                </div>

                {activeTab === "upcoming" ? (
                  event.is_registration_open ? (
                    <a
                      href={normalizeUrl(event.registration_link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                    >
                      Register Now <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Registration Closed
                    </p>
                  )
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Event Ended
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
