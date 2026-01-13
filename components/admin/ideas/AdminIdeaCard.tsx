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
    <div className="glass-surface rounded-2xl p-4 sm:p-6 soft-shadow space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-medium">
            {idea.idea_title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {idea.idea_description}
          </p>

          {idea.domain && (
            <span className="inline-block text-xs rounded-full bg-accent/15 px-3 py-1 text-accent w-fit">
              {idea.domain}
            </span>
          )}
        </div>

        <span className="text-xs sm:text-sm capitalize text-muted-foreground self-start sm:self-center">
          {idea.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
        {idea.status === "submitted" && (
          <>
            <button
              disabled={loading}
              onClick={() => updateStatus("rejected")}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition text-sm"
            >
              Reject
            </button>

            <button
              disabled={loading}
              onClick={() => updateStatus("approved")}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition text-sm"
            >
              Approve
            </button>
          </>
        )}

        {idea.status === "approved" && (
          <button
            disabled={loading}
            onClick={() => updateStatus("completed")}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 transition text-sm"
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
