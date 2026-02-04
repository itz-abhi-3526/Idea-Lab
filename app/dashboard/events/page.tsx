"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Calendar, MapPin } from "lucide-react"
import QRCode from "react-qr-code"

/* -------------------- TYPES -------------------- */

type UserEvent = {
  id: string
  title: string
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null

  // 🆕 Paid support
  is_paid: boolean
  price: number | null
}

type UserProfile = {
  name: string | null
  email: string
}

/* -------------------- PAGE -------------------- */

export default function UserEventsDashboard() {
  const [upcoming, setUpcoming] = useState<UserEvent[]>([])
  const [past, setPast] = useState<UserEvent[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      // user profile (public.users is SSOT)
      const { data: profile } = await supabase
        .from("public.users")
        .select("name, email")
        .eq("id", user.email)
        .single()

      setUserProfile(profile ?? { name: null, email: user.email })

      const { data } = await supabase
        .from("event_registrations")
        .select(
          `
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
        `
        )
        .eq("user_id", user.id)

      const now = new Date()
      const upcomingEvents: UserEvent[] = []
      const pastEvents: UserEvent[] = []

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading your events…
      </div>
    )
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-16 space-y-20">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          My Events
        </h1>
        <p className="text-sm text-muted-foreground">
          Your registered event tickets
        </p>
      </div>

      <EventSection
        title="Upcoming Events"
        empty="You have no upcoming events."
        events={upcoming}
        status="upcoming"
        user={userProfile}
      />

      <EventSection
        title="Past Events"
        empty="No past events yet."
        events={past}
        status="past"
        user={userProfile}
      />
    </section>
  )
}

/* -------------------- SECTION -------------------- */

function EventSection({
  title,
  empty,
  events,
  status,
  user,
}: {
  title: string
  empty: string
  events: UserEvent[]
  status: "upcoming" | "past"
  user: UserProfile | null
}) {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-medium tracking-tight">{title}</h2>

      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <EventTicket
              key={event.id}
              event={event}
              status={status}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* -------------------- TICKET -------------------- */

function EventTicket({
  event,
  status,
  user,
}: {
  event: UserEvent
  status: "upcoming" | "past"
  user: UserProfile | null
}) {
  const start = new Date(event.start_datetime)
  const end = new Date(event.end_datetime)

  const qrPayload = JSON.stringify({
    attendee: {
      name: user?.name ?? "IDEA Lab Participant",
      email: user?.email,
    },
    event: {
      id: event.id,
      title: event.title,
      venue: event.venue,
      start: start.toISOString(),
      end: end.toISOString(),
      status,
      payment: event.is_paid
        ? { type: "paid", amount: event.price }
        : { type: "free" },
    },
  })

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border backdrop-blur-xl transition shadow-lg ${
        status === "upcoming"
          ? "bg-white/10 border-orange-500/20 hover:shadow-2xl"
          : "bg-white/5 border-white/10 opacity-85"
      }`}
    >
      <div className="grid grid-cols-[96px_1fr_120px] min-h-[150px]">

        {/* DATE STRIP */}
        <div className="flex flex-col items-center justify-center bg-orange-500/10 border-r border-orange-500/20">
          <div className="text-2xl font-semibold text-orange-400">
            {start.getDate()}
          </div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {start.toLocaleString("default", { month: "short" })}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            {start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* DETAILS */}
        <div className="px-6 py-5 flex flex-col justify-center gap-2">
          <h3 className="text-base font-semibold tracking-tight">
            {event.title}
          </h3>

          {event.venue && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              {event.venue}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            {start.toLocaleString()} – {end.toLocaleTimeString()}
          </div>

          {/* PRICE BADGE */}
          <span
            className={`mt-1 inline-block text-[11px] px-2 py-0.5 rounded-full w-fit ${
              event.is_paid
                ? "bg-orange-500/20 text-orange-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {event.is_paid ? `₹${event.price}` : "Free"}
          </span>

          <span
            className={`mt-1 inline-block text-[11px] px-2 py-0.5 rounded-full w-fit ${
              status === "upcoming"
                ? "bg-orange-500/15 text-orange-400"
                : "bg-zinc-600/30 text-muted-foreground"
            }`}
          >
            {status === "upcoming" ? "Upcoming Event" : "Completed Event"}
          </span>
        </div>

        {/* QR */}
        <div className="flex items-center justify-center border-l border-orange-500/20 bg-orange-500/5">
          <div className="bg-white p-2 rounded-lg">
            <QRCode value={qrPayload} size={72} />
          </div>
        </div>
      </div>

      {/* CLICK OVERLAY */}
      <Link
        href={`/dashboard/events/${event.id}`}
        className="absolute inset-0"
        aria-label="View Event Details"
      />
    </div>
  )
}
