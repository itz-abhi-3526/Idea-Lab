"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import IdeaTimeline from "@/components/ideas/IdeaTimeline"

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

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current")
  const [loading, setLoading] = useState(true)

  /* ----------------------------- */
  /* Fetch Ideas                   */
  /* ----------------------------- */

  const fetchIdeas = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setIdeas([])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from("idea_submissions")
      .select(
        "id, idea_title, idea_description, domain, status, created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setIdeas(data ?? [])
    setLoading(false)
  }

  /* ----------------------------- */
  /* Cancel Idea                   */
  /* ----------------------------- */

  const cancelIdea = async (id: string) => {
    const { error } = await supabase
      .from("idea_submissions")
      .update({ status: "cancelled" })
      .eq("id", id)

    if (!error) {
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id
            ? { ...idea, status: "cancelled" }
            : idea
        )
      )
    }
  }

  /* ----------------------------- */
  /* Effects                       */
  /* ----------------------------- */

  useEffect(() => {
    fetchIdeas()
  }, [])

  const current = ideas.filter((i) => i.status === "submitted")
  const previous = ideas.filter((i) => i.status !== "submitted")

  /* ----------------------------- */
  /* UI                            */
  /* ----------------------------- */

  if (loading) {
    return (
      <div className="px-4 py-10 sm:px-6">
        <p className="text-muted-foreground">
          Loading your ideas...
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-heading">
          My Ideas
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Track the status of ideas you’ve submitted
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-2 rounded-xl text-sm transition ${
            activeTab === "current"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Current Ideas
        </button>

        <button
          onClick={() => setActiveTab("previous")}
          className={`px-4 py-2 rounded-xl text-sm transition ${
            activeTab === "previous"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Previous Ideas
        </button>
      </div>

      {/* Ideas */}
      <div className="space-y-5">
        {(activeTab === "current" ? current : previous).length === 0 && (
          <div className="glass-surface rounded-2xl p-8 sm:p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No{" "}
              {activeTab === "current" ? "active" : "previous"}{" "}
              ideas.
            </p>
          </div>
        )}

        {(activeTab === "current" ? current : previous).map((idea) => (
          <div
            key={idea.id}
            className="glass-surface rounded-2xl p-5 sm:p-6 soft-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-2">
                <h3 className="font-medium text-base sm:text-lg">
                  {idea.idea_title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {idea.idea_description}
                </p>

                {idea.domain && (
                  <span className="inline-block text-xs rounded-full bg-accent/15 px-3 py-1 text-accent">
                    {idea.domain}
                  </span>
                )}
              </div>

              <span className="text-sm capitalize text-muted-foreground">
                {idea.status}
              </span>
            </div>

            <IdeaTimeline status={idea.status} />

            {idea.status === "submitted" && (
              <div className="pt-2 text-right">
                <button
                  onClick={() => cancelIdea(idea.id)}
                  className="px-4 py-2 rounded-xl text-sm bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition"
                >
                  Cancel Idea
                </button>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Submitted on{" "}
              {new Date(idea.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
