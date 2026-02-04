"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import EventCard from "@/components/admin/events/EventCard"
import AddEditEventModal from "@/components/admin/events/AddEditEventModal"
import { Plus } from "lucide-react"

/* -----------------------------
   TYPES
----------------------------- */
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

/* -----------------------------
   PAGE
----------------------------- */
export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [editEvent, setEditEvent] = useState<Event | null>(null)

  /* -----------------------------
     Fetch events
  ----------------------------- */
  const fetchEvents = async () => {
    setLoading(true)

    const { data } = await supabase
      .from("events")
      .select("*")
      .order("display_order", { ascending: true })
      .order("start_datetime", { ascending: false })

    setEvents(data ?? [])
    setLoading(false)
  }

  /* -----------------------------
     Realtime updates
  ----------------------------- */
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
  }, [])

  /* -----------------------------
     Derived
  ----------------------------- */
  const filtered = events.filter(e =>
    `${e.title} ${e.event_type ?? ""} ${e.venue ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const now = new Date()

  const stats = {
    total: events.length,
    active: events.filter(e => e.is_active).length,
    upcoming: events.filter(e => new Date(e.start_datetime) > now).length,
    featured: events.filter(e => e.is_featured).length,
  }

  /* -----------------------------
     UI
  ----------------------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Events
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Manage and monitor all IDEA Lab events
          </p>
        </div>

        <button
          onClick={() => {
            setEditEvent(null)
            setOpen(true)
          }}
          className="
            inline-flex items-center gap-2
            bg-accent text-accent-foreground
            px-5 py-3 rounded-xl
            font-medium
            hover:opacity-90 transition
            shadow-lg
          "
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        <Stat label="Total Events" value={stats.total} />
        <Stat label="Active" value={stats.active} />
        <Stat label="Upcoming" value={stats.upcoming} />
        <Stat label="Featured" value={stats.featured} />
      </div>

      {/* SEARCH */}
      <div className="flex justify-between items-center">
        <input
          placeholder="Search by title, type, or venue..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="
            w-full sm:max-w-md
            bg-input/70 backdrop-blur
            px-4 py-2.5 rounded-xl
            outline-none
            ring-1 ring-white/10
            focus:ring-2 focus:ring-accent
            placeholder:text-muted-foreground
          "
        />
      </div>

      {/* LIST */}
      {loading ? (
        <div className="text-muted-foreground">
          Loading events…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
          <p className="text-muted-foreground">
            No events match your search
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => {
                setEditEvent(event)
                setOpen(true)
              }}
            />
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
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

/* -----------------------------
   STAT CARD
----------------------------- */
function Stat({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="
      rounded-3xl
      bg-white/10 backdrop-blur-xl
      border border-white/10
      p-6
      shadow-lg
    ">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-3xl font-semibold mt-2">
        {value}
      </p>
    </div>
  )
}
