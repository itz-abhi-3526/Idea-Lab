"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  ChevronDown,
  ChevronUp,
  Download,
  Search,
} from "lucide-react"

/* ----------------------------- Types ----------------------------- */

type EventRow = {
  id: string
  title: string
  start_datetime: string
  is_paid: boolean
  price: number | null
}

type FeedbackRow = {
  id: string
  rating: number
  comments: string | null
  submitted_at: string
  users: {
    name: string | null
    email: string | null
  }[]
}

/* ----------------------------- Page ----------------------------- */

export default function AdminEventFeedbackPage() {
  const [events, setEvents] = useState<EventRow[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [feedbacks, setFeedbacks] = useState<
    Record<string, FeedbackRow[]>
  >({})

  const [loadingEvent, setLoadingEvent] = useState<string | null>(
    null
  )

  /* ----------------------- Load events ----------------------- */

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("events")
        .select("id,title,start_datetime,is_paid,price")
        .order("start_datetime", { ascending: false })

      setEvents(data ?? [])
      setLoading(false)
    }

    load()
  }, [])

  /* ----------------------- Search ----------------------- */

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase()

    return events.filter((e) =>
      e.title.toLowerCase().includes(q)
    )
  }, [events, search])

  /* ----------------------- Load feedback per event ----------------------- */

  const loadFeedback = async (eventId: string) => {
    if (feedbacks[eventId]) return

    setLoadingEvent(eventId)

    const { data } = await supabase
      .from("event_feedback")
      .select(
        `
          id,
          rating,
          comments,
          submitted_at,
          users:users (
            name,
            email
          )
        `
      )
      .eq("event_id", eventId)
      .order("submitted_at", { ascending: false })

    setFeedbacks((p) => ({
      ...p,
      [eventId]: (data ?? []) as FeedbackRow[],
    }))

    setLoadingEvent(null)
  }

  /* ----------------------- CSV export ----------------------- */

  const exportCsv = (event: EventRow) => {
    const rows = feedbacks[event.id] ?? []

    if (!rows.length) return

    const header = [
      "Name",
      "Email",
      "Rating",
      "Comment",
      "Submitted At",
    ]

    const body = rows.map((r) => [
      r.users?.[0]?.name ?? "",
      r.users?.[0]?.email ?? "",
      r.rating,
      r.comments ?? "",
      new Date(r.submitted_at).toLocaleString(),
    ])

    const csv =
      [header, ...body]
        .map((r) =>
          r
            .map((c) =>
              `"${String(c).replace(/"/g, '""')}"`
            )
            .join(",")
        )
        .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `${event.title}-feedback.csv`
    a.click()

    URL.revokeObjectURL(url)
  }

  /* ----------------------- UI ----------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  return (
    <div className="px-6 py-10 space-y-8">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Event Feedback
        </h1>
        <p className="text-sm text-muted-foreground">
          View and export feedback submitted for events
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-sm focus:outline-none"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {filteredEvents.map((event) => {
          const open = expanded === event.id
          const rows = feedbacks[event.id] ?? []

          return (
            <div
              key={event.id}
              className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
            >
              {/* TILE HEADER */}
              <div className="flex items-center justify-between px-6 py-5">

                <div className="space-y-1">
                  <p className="text-base font-medium">
                    {event.title}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {new Date(
                        event.start_datetime
                      ).toLocaleString()}
                    </span>

                    {event.is_paid && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400">
                        Paid ₹{event.price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">

                  {open && rows.length > 0 && (
                    <button
                      onClick={() => exportCsv(event)}
                      className="flex items-center gap-2 text-sm text-accent hover:opacity-80"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (open) {
                        setExpanded(null)
                      } else {
                        setExpanded(event.id)
                        loadFeedback(event.id)
                      }
                    }}
                    className="p-2 rounded-xl hover:bg-white/10 transition"
                  >
                    {open ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                </div>
              </div>

              {/* DROPDOWN */}
              {open && (
                <div className="border-t border-white/10 px-6 py-5">

                  {loadingEvent === event.id ? (
                    <div className="text-sm text-muted-foreground">
                      Loading feedback…
                    </div>
                  ) : rows.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      No feedback submitted for this event.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-muted-foreground border-b border-white/10">
                            <th className="py-2 pr-4">Name</th>
                            <th className="py-2 pr-4">Email</th>
                            <th className="py-2 pr-4">Rating</th>
                            <th className="py-2 pr-4">Comment</th>
                            <th className="py-2">Submitted</th>
                          </tr>
                        </thead>

                        <tbody>
                          {rows.map((f) => (
                            <tr
                              key={f.id}
                              className="border-b border-white/5 last:border-0"
                            >
                              <td className="py-2 pr-4">
                                {f.users?.[0]?.name ?? "—"}
                              </td>
                              <td className="py-2 pr-4 text-muted-foreground">
                                {f.users?.[0]?.email ?? "—"}
                              </td>
                              <td className="py-2 pr-4">
                                ⭐ {f.rating}
                              </td>
                              <td className="py-2 pr-4 max-w-[380px] whitespace-pre-wrap break-words">
                                {f.comments || "—"}
                              </td>
                              <td className="py-2 text-muted-foreground">
                                {new Date(
                                  f.submitted_at
                                ).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {filteredEvents.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No events found.
          </div>
        )}
      </div>
    </div>
  )
}
