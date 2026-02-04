"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Download,
} from "lucide-react"

/* -------------------- TYPES -------------------- */

type Event = {
  id: string
  title: string
  start_datetime: string
  is_paid: boolean
  price: number | null
}

type Registration = {
  id: string
  full_name: string
  email: string
  phone: string
  department: string
  year: string
  section: string
  payment_ss_url: string | null
}

/* -------------------- PAGE -------------------- */

export default function AdminEventRegistrationsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [registrations, setRegistrations] = useState<
    Record<string, Registration[]>
  >({})
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  /* -------------------- LOAD EVENTS -------------------- */

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("events")
        .select("id, title, start_datetime, is_paid, price")
        .order("start_datetime", { ascending: false })

      setEvents(data ?? [])
      setLoading(false)
    }

    load()
  }, [])

  /* -------------------- LOAD REGISTRATIONS -------------------- */

  const loadRegistrations = async (eventId: string) => {
    if (registrations[eventId]) return registrations[eventId]

    const { data } = await supabase
      .from("event_registrations")
      .select(`
        id,
        full_name,
        email,
        phone,
        department,
        year,
        section,
        payment_ss_url
      `)
      .eq("event_id", eventId)

    const rows = data ?? []

    setRegistrations((prev) => ({
      ...prev,
      [eventId]: rows,
    }))

    return rows
  }

  /* -------------------- CSV EXPORT -------------------- */

  const exportCSV = async (event: Event) => {
    const rows = await loadRegistrations(event.id)

    if (!rows.length) {
      alert("No registrations to export.")
      return
    }

    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Department",
      "Year",
      "Section",
      "Payment Screenshot URL",
    ]

    const csvContent = [
      headers.join(","),
      ...rows.map((r) =>
        [
          r.full_name,
          r.email,
          r.phone,
          r.department,
          r.year,
          r.section,
          r.payment_ss_url ?? "",
        ]
          .map((v) => `"${v.replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${event.title
      .replace(/\s+/g, "_")
      .toLowerCase()}_registrations.csv`
    link.click()

    URL.revokeObjectURL(url)
  }

  /* -------------------- FILTER -------------------- */

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading events…
      </div>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-10">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Event Registrations
        </h1>
        <p className="text-sm text-muted-foreground">
          Search events, view participants, export registrations
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Search events…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 rounded-xl bg-white/10 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      {/* EVENTS */}
      <div className="space-y-6">
        {filteredEvents.map((event) => {
          const open = expanded === event.id
          const regs = registrations[event.id] ?? []

          return (
            <div
              key={event.id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
            >
              {/* EVENT TILE */}
              <div className="flex items-center justify-between px-6 py-5">

                {/* LEFT */}
                <div className="space-y-1">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.start_datetime).toLocaleString()}
                  </p>
                  <span
                    className={`inline-block text-[11px] px-2 py-0.5 rounded-full ${
                      event.is_paid
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {event.is_paid
                      ? `Paid ₹${event.price}`
                      : "Free"}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => exportCSV(event)}
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>

                  <button
                    onClick={async () => {
                      setExpanded(open ? null : event.id)
                      if (!open) await loadRegistrations(event.id)
                    }}
                  >
                    {open ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* REGISTRATIONS */}
              {open && (
                <div className="border-t border-white/10 overflow-x-auto">
                  {regs.length === 0 ? (
                    <p className="px-6 py-6 text-sm text-muted-foreground">
                      No registrations yet.
                    </p>
                  ) : (
                    <table className="min-w-full text-sm">
                      <thead className="bg-black/40">
                        <tr>
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-left">Email</th>
                          <th className="px-4 py-3 text-left">Phone</th>
                          <th className="px-4 py-3 text-left">Class</th>
                          <th className="px-4 py-3 text-left">Payment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regs.map((r) => (
                          <tr
                            key={r.id}
                            className="border-t border-white/10"
                          >
                            <td className="px-4 py-3">{r.full_name}</td>
                            <td className="px-4 py-3">{r.email}</td>
                            <td className="px-4 py-3">{r.phone}</td>
                            <td className="px-4 py-3">
                              {r.department} {r.year} {r.section}
                            </td>
                            <td className="px-4 py-3">
                              {r.payment_ss_url ? (
                                <a
                                  href={r.payment_ss_url}
                                  target="_blank"
                                  className="inline-flex items-center gap-1 text-accent hover:underline"
                                >
                                  View SS
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
