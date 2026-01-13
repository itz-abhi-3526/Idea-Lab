"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AdminIdeaCard from "@/components/admin/ideas/AdminIdeaCard"

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type IdeaStatus =
  | "submitted"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled"

type Idea = {
  id: string
  idea_title: string
  idea_description: string
  domain: string | null
  status: IdeaStatus
  created_at: string
}

/* ----------------------------- */
/* Page                          */
/* ----------------------------- */

export default function AdminIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<
    "all" | "pending" | "ongoing" | "completed"
  >("all")

  const fetchIdeas = async () => {
    setLoading(true)

    const { data } = await supabase
      .from("idea_submissions")
      .select(
        "id, idea_title, idea_description, domain, status, created_at"
      )
      .order("created_at", { ascending: false })

    setIdeas(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchIdeas()

    const channel = supabase
      .channel("admin-ideas-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "idea_submissions",
        },
        fetchIdeas
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.idea_title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      idea.idea_description
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" &&
        idea.status === "submitted") ||
      (filter === "ongoing" &&
        idea.status === "approved") ||
      (filter === "completed" &&
        idea.status === "completed")

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: ideas.length,
    pending: ideas.filter((i) => i.status === "submitted").length,
    ongoing: ideas.filter((i) => i.status === "approved").length,
    completed: ideas.filter((i) => i.status === "completed").length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-heading">
          Ideas
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Review and manage ideas submitted to IDEA Lab
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Ongoing" value={stats.ongoing} />
        <StatCard label="Completed" value={stats.completed} />
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <input
          type="text"
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-80 rounded-xl bg-background border border-border px-4 py-2 text-sm"
        />

        <div className="flex flex-wrap gap-2">
          {[
            ["all", "All"],
            ["pending", "Pending"],
            ["ongoing", "Ongoing"],
            ["completed", "Completed"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() =>
                setFilter(
                  key as
                    | "all"
                    | "pending"
                    | "ongoing"
                    | "completed"
                )
              }
              className={`px-4 py-2 rounded-xl text-sm transition whitespace-nowrap ${
                filter === key
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas List */}
      {loading ? (
        <p className="text-muted-foreground">
          Loading ideas...
        </p>
      ) : filteredIdeas.length === 0 ? (
        <div className="glass-surface rounded-2xl p-10 text-center">
          <p className="text-muted-foreground">
            No ideas found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredIdeas.map((idea) => (
            <AdminIdeaCard
              key={idea.id}
              idea={idea}
              onStatusChange={fetchIdeas}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ----------------------------- */
/* Stat Card                     */
/* ----------------------------- */

function StatCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="glass-surface rounded-2xl p-4 sm:p-5 soft-shadow">
      <p className="text-xs sm:text-sm text-muted-foreground">
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-semibold mt-1">
        {value}
      </p>
    </div>
  )
}
