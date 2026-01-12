"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

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
/* Component                     */
/* ----------------------------- */

export default function AdminIdeaCard({
  idea,
  onStatusChange,
}: {
  idea: Idea
  onStatusChange: () => void
}) {
  const [loading, setLoading] = useState(false)

  const updateStatus = async (status: IdeaStatus) => {
    setLoading(true)

    await supabase
      .from("idea_submissions")
      .update({ status })
      .eq("id", idea.id)

    setLoading(false)
    onStatusChange()
  }

  return (
    <div className="glass-surface rounded-2xl p-6 soft-shadow space-y-4">
      {/* Header */}
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">
            {idea.idea_title}
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            {idea.idea_description}
          </p>

          {idea.domain && (
            <span className="inline-block mt-2 text-xs rounded-full bg-accent/15 px-3 py-1 text-accent">
              {idea.domain}
            </span>
          )}
        </div>

        <span className="text-sm capitalize text-muted-foreground">
          {idea.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {/* Submitted → Approve / Reject */}
        {idea.status === "submitted" && (
          <>
            <button
              disabled={loading}
              onClick={() => updateStatus("rejected")}
              className="px-4 py-2 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition"
            >
              Reject
            </button>

            <button
              disabled={loading}
              onClick={() => updateStatus("approved")}
              className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition"
            >
              Approve
            </button>
          </>
        )}

        {/* Approved → Mark Completed */}
        {idea.status === "approved" && (
          <button
            disabled={loading}
            onClick={() => updateStatus("completed")}
            className="px-4 py-2 rounded-xl bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 transition"
          >
            Mark as Completed
          </button>
        )}
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground">
        Submitted on{" "}
        {new Date(idea.created_at).toLocaleString()}
      </p>
    </div>
  )
}
