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

  const filtered = events.filter(e =>
    `${e.title} ${e.event_type} ${e.venue}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const stats = {
    total: events.length,
    active: events.filter(e => e.is_active).length,
    upcoming: events.filter(
      e => new Date(e.start_datetime) > new Date()
    ).length,
    featured: events.filter(e => e.is_featured).length,
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading">Events</h1>
          <p className="text-muted-foreground mt-2">
            Manage IDEA Lab events
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-medium"
        >
          + Add Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        className="w-full max-w-md bg-input px-4 py-2 rounded-xl outline-none"
      />

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground">Loading events...</p>
      ) : filtered.length === 0 ? (
        <div className="glass-surface rounded-2xl p-10 text-center">
          <p className="text-muted-foreground">No events found</p>
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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass-surface rounded-2xl p-5 soft-shadow">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  )
}
