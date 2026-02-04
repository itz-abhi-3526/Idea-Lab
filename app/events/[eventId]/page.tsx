"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Event = {
  id: string
  title: string
  description: string
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null
  registration_deadline: string | null

  // 🆕 Paid support
  is_paid: boolean
  price: number | null
}

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const router = useRouter()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId) return

    supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .maybeSingle()
      .then(({ data }) => {
        setEvent(data)
        setLoading(false)
      })
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading event…
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Event not found
      </div>
    )
  }

  const start = new Date(event.start_datetime)
  const registrationOpen =
    event.registration_deadline &&
    new Date(event.registration_deadline) > new Date()

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-10 relative">

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* TICKET CARD */}
      <div
        className="
          relative w-full max-w-4xl
          rounded-[32px]
          overflow-hidden
          bg-gradient-to-br from-white/10 to-white/5
          backdrop-blur-2xl
          border border-white/10
          shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]
        "
      >
        {/* TOP STRIP */}
        <div className="h-1 bg-gradient-to-r from-accent via-orange-400 to-accent" />

        {/* HEADER */}
        <div className="px-8 pt-10 pb-8 grid sm:grid-cols-[1fr_220px] gap-8 items-center">

          {/* TITLE */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {event.title}
            </h1>

            <p className="text-sm text-muted-foreground max-w-xl">
              {event.description}
            </p>

            {/* STATUS + PRICE */}
            <div className="flex flex-wrap items-center gap-3">
              {registrationOpen ? (
                <span className="inline-flex px-4 py-1.5 rounded-full text-xs bg-green-500/20 text-green-400">
                  Registration Open
                </span>
              ) : (
                <span className="inline-flex px-4 py-1.5 rounded-full text-xs bg-red-500/20 text-red-400">
                  Registration Closed
                </span>
              )}

              <span
                className={`inline-flex px-4 py-1.5 rounded-full text-xs ${
                  event.is_paid
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {event.is_paid ? `₹${event.price}` : "Free"}
              </span>
            </div>
          </div>

          {/* POSTER PREVIEW */}
          {event.poster_url && (
            <div className="hidden sm:block">
              <img
                src={event.poster_url}
                alt={event.title}
                className="w-full h-40 rounded-2xl object-cover border border-white/10"
              />
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-dashed border-white/15" />

        {/* BODY */}
        <div className="px-8 py-10 grid sm:grid-cols-2 gap-10">

          {/* LEFT INFO */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">
                Date & Time
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-accent" />
                {start.toLocaleString()}
              </div>
            </div>

            {event.venue && (
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">
                  Venue
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  {event.venue}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT CTA */}
          <div className="flex flex-col justify-center gap-4">
            {registrationOpen ? (
              <Link
                href={`/events/${event.id}/register`}
                className="
                  inline-flex items-center justify-center gap-3
                  px-8 py-4 rounded-2xl
                  bg-accent text-accent-foreground
                  font-medium text-sm
                  hover:opacity-90 transition
                "
              >
                Register for Event
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="text-sm text-muted-foreground">
                Registration has closed for this event.
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Your registration will appear in your dashboard once confirmed.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 border-t border-white/10 text-center text-xs text-muted-foreground">
          This ticket is unique to this event · Powered by IDEA Lab
        </div>
      </div>
    </section>
  )
}
