"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import QRCode from "react-qr-code"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Event = {
  id: string
  title: string
  description: string | null
  start_datetime: string
  registration_deadline: string | null
  venue: string | null

  // 🆕 Paid event support
  is_paid: boolean
  price: number | null
}

export default function EventsPage() {
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
    <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-8 py-20">

      {/* HEADER */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Explore the Events
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Tickets, passes & experiences at IDEA Lab
        </p>
      </div>

      {/* TABS */}
      <div className="flex justify-center gap-6 mb-12">
        {(["upcoming", "past"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              tab === t
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "upcoming" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      {/* TICKETS */}
      <div className="space-y-8">
        {filtered.map(event => {
          const d = new Date(event.start_datetime)

          return (
            <div
              key={event.id}
              className="
                relative overflow-hidden
                rounded-[28px]
                bg-gradient-to-br from-white/10 to-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]
              "
            >
              {/* TOP STRIP */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent via-orange-400 to-accent" />

              <div className="flex flex-col sm:flex-row">

                {/* DATE / STATUS */}
                <div className="sm:w-36 flex flex-row sm:flex-col items-center justify-center gap-4 px-6 py-5 bg-black/30 text-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {d.getDate()}
                    </div>
                    <div className="text-xs uppercase text-muted-foreground">
                      {d.toLocaleString("default", { month: "short" })}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full ${
                        isOpen(event)
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {isOpen(event) ? "Registration Open" : "Closed"}
                    </span>

                    <span
                      className={`text-[11px] px-3 py-1 rounded-full ${
                        event.is_paid
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {event.is_paid ? `₹${event.price}` : "Free"}
                    </span>
                  </div>
                </div>

                {/* MAIN INFO */}
                <div className="flex-1 px-6 py-6 space-y-3">
                  <h3 className="text-xl font-semibold">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {d.toLocaleString()}
                    </span>

                    {event.venue && (
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </span>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-sm text-muted-foreground max-w-xl">
                      {event.description}
                    </p>
                  )}

                  {isOpen(event) && (
                    <p className="text-xs text-muted-foreground">
                      Registration closes on{" "}
                      {new Date(
                        event.registration_deadline!
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* QR / ACTION */}
                <div
                  className="
                    sm:w-56 px-6 py-6
                    border-t sm:border-t-0 sm:border-l border-white/10
                    flex sm:flex-col items-center justify-between gap-4
                  "
                >
                  <div className="bg-black/40 rounded-xl p-3">
                    <QRCode
                      value={`${location.origin}/events/${event.id}`}
                      size={80}
                      bgColor="transparent"
                      fgColor="#fff"
                    />
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="
                      inline-flex items-center gap-2
                      text-accent font-medium text-sm
                      hover:underline
                    "
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
