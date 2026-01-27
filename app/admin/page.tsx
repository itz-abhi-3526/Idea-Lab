"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type Stats = {
  execomTotal: number
  execomActive: number
  ideasTotal: number
  inventoryTotal: number
  eventsTotal: number
  eventsActive: number
  eventsUpcoming: number

  usersTotal: number
  usersActive: number

  incubationTotal: number
  incubationPending: number
}

type CalendarEvent = {
  id: string
  title: string
  start_datetime: string
  venue: string
  is_featured: boolean
  is_active: boolean
}

/* ----------------------------- */
/* Page                          */
/* ----------------------------- */

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [ideasByMonth, setIdeasByMonth] = useState<any[]>([])
  const [execomSplit, setExecomSplit] = useState<any[]>([])
  const [inventoryHealth, setInventoryHealth] = useState<any[]>([])
  const [usersActivity, setUsersActivity] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDashboard = async () => {
    setLoading(true)

    const now = new Date().toISOString()
    const activeSince = new Date(
      Date.now() - 30 * 60 * 1000
    ).toISOString()

    const [
      execomTotal,
      execomActive,
      ideasTotal,
      inventoryItems,
      eventsTotal,
      eventsActive,
      eventsUpcoming,
      usersTotal,
      usersActive,
      incubationTotal,
      incubationPending,
    ] = await Promise.all([
      supabase.from("execom_members").select("*", { count: "exact", head: true }),
      supabase
        .from("execom_members")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
      supabase.from("idea_submissions").select("*", { count: "exact", head: true }),
      supabase.from("inventory_items").select("quantity_available"),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
      supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .gt("start_datetime", now),
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("last_sign_in_at", activeSince),
      supabase
        .from("incubation_requests")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("incubation_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
    ])

    const { data: ideas } = await supabase
      .from("idea_submissions")
      .select("created_at")

    const monthMap: Record<string, number> = {}
    ideas?.forEach(i => {
      const month = new Date(i.created_at).toLocaleString("default", {
        month: "short",
      })
      monthMap[month] = (monthMap[month] || 0) + 1
    })

    setIdeasByMonth(
      Object.keys(monthMap).map(m => ({
        month: m,
        count: monthMap[m],
      }))
    )

    setExecomSplit([
      { name: "Active", value: execomActive.count ?? 0 },
      {
        name: "Inactive",
        value:
          (execomTotal.count ?? 0) - (execomActive.count ?? 0),
      },
    ])

    let criticallyLow = 0
    let low = 0
    let available = 0

    inventoryItems.data?.forEach(item => {
      if (item.quantity_available < 5) criticallyLow++
      else if (item.quantity_available < 10) low++
      else available++
    })

    setInventoryHealth([
      { name: "Critically Low", value: criticallyLow },
      { name: "Low", value: low },
      { name: "Available", value: available },
    ])

    setUsersActivity([
      { name: "Active", value: usersActive.count ?? 0 },
      {
        name: "Inactive",
        value:
          (usersTotal.count ?? 0) - (usersActive.count ?? 0),
      },
    ])

    const { data: events } = await supabase
      .from("events")
      .select("id, title, start_datetime, venue, is_featured, is_active")
      .gte("start_datetime", now)
      .order("start_datetime", { ascending: true })
      .limit(5)

    setUpcomingEvents(events ?? [])

    setStats({
      execomTotal: execomTotal.count ?? 0,
      execomActive: execomActive.count ?? 0,
      ideasTotal: ideasTotal.count ?? 0,
      inventoryTotal: inventoryItems.data?.length ?? 0,
      eventsTotal: eventsTotal.count ?? 0,
      eventsActive: eventsActive.count ?? 0,
      eventsUpcoming: eventsUpcoming.count ?? 0,
      usersTotal: usersTotal.count ?? 0,
      usersActive: usersActive.count ?? 0,
      incubationTotal: incubationTotal.count ?? 0,
      incubationPending: incubationPending.count ?? 0,
    })

    setLoading(false)
  }

  useEffect(() => {
    fetchDashboard()

    const channel = supabase
      .channel("admin-dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "idea_submissions" },
        fetchDashboard
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory_items" },
        fetchDashboard
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "execom_members" },
        fetchDashboard
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        fetchDashboard
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "incubation_requests" },
        fetchDashboard
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        fetchDashboard
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          IDEA Lab overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Stat label="Total Execom" value={stats.execomTotal} />
        <Stat label="Active Execom" value={stats.execomActive} accent />
        <Stat label="Ideas Submitted" value={stats.ideasTotal} />
        <Stat label="Inventory Items" value={stats.inventoryTotal} />
        <Stat label="Total Events" value={stats.eventsTotal} />
        <Stat label="Active Events" value={stats.eventsActive} />
        <Stat label="Upcoming Events" value={stats.eventsUpcoming} />
        <Stat label="Incubation Requests" value={stats.incubationTotal} />
        <Stat label="Pending Incubations" value={stats.incubationPending} accent />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="glass-surface rounded-2xl p-6 soft-shadow xl:col-span-2">
          <h3 className="mb-4 font-medium">
            Ideas Submitted (Monthly)
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ideasByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-surface rounded-2xl p-6 soft-shadow">
          <h3 className="mb-4 font-medium">Execom Status</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={execomSplit}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={4}
              >
                <Cell fill="#f97316" />
                <Cell fill="#475569" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-surface rounded-2xl p-6 soft-shadow">
          <h3 className="mb-4 font-medium">
            Inventory Health
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={inventoryHealth}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={4}
              >
                <Cell fill="#991b1b" />
                <Cell fill="#a16207" />
                <Cell fill="#f97316" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-surface rounded-2xl p-6 soft-shadow">
          <h3 className="mb-4 font-medium">
            User Activity (Last 30 mins)
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={usersActivity}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={4}
              >
                <Cell fill="#f97316" />
                <Cell fill="#475569" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-between text-sm text-muted-foreground mt-4">
            <span>Total Users: {stats.usersTotal}</span>
            <span className="text-accent">
              Active: {stats.usersActive}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- */
/* Stat Card                     */
/* ----------------------------- */

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div className="glass-surface rounded-2xl p-6 soft-shadow">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-2 text-3xl font-bold ${
          accent ? "text-accent" : ""
        }`}
      >
        {value}
      </p>
    </div>
  )
}
