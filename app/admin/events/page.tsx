"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import EventCard from "@/components/admin/events/EventCard"
import AddEditEventModal from "@/components/admin/events/AddEditEventModal"

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
    `${e.title} ${e.event_type} ${e.venue}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const now = new Date()

  const stats = {
    total: events.length,
    active: events.filter(e => e.is_active).length,
    upcoming: events.filter(
      e => new Date(e.start_datetime) > now
    ).length,
    featured: events.filter(e => e.is_featured).length,
  }

  /* -----------------------------
     UI
  ----------------------------- */
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading">
            Events
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Manage IDEA Lab events
          </p>
        </div>

        <button
          onClick={() => {
            setEditEvent(null)
            setOpen(true)
          }}
          className="
            bg-accent text-accent-foreground
            px-5 py-2.5 rounded-xl
            font-medium
            hover:opacity-90 transition
            w-full sm:w-auto
          "
        >
          + Add Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Total" value={stats.total} />
        <Stat label="Active" value={stats.active} />
        <Stat label="Upcoming" value={stats.upcoming} />
        <Stat label="Featured" value={stats.featured} />
      </div>

      {/* Search */}
      <input
        placeholder="Search events..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="
          w-full sm:max-w-md
          bg-input px-4 py-2 rounded-xl
          outline-none
          placeholder:text-muted-foreground
        "
      />

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground">
          Loading events...
        </p>
      ) : filtered.length === 0 ? (
        <div className="glass-surface rounded-2xl p-10 text-center">
          <p className="text-muted-foreground">
            No events found
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

      {/* Add / Edit Modal */}
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
   Stat Card
----------------------------- */
function Stat({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="glass-surface rounded-2xl p-5 soft-shadow">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
      <p className="text-2xl font-semibold mt-1">
        {value}
      </p>
    </div>
  )
}
