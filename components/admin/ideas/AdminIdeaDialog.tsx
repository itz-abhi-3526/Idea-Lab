"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

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

export default function AdminIdeaDialog({
  idea,
  onStatusChange,
}: {
  idea: Idea
  onStatusChange: () => void
}) {
  const [loading, setLoading] = useState(false)

  const updateStatus = async (
    status: "approved" | "rejected"
  ) => {
    setLoading(true)

    const { error } = await supabase
      .from("idea_submissions")
      .update({ status })
      .eq("id", idea.id)

    setLoading(false)

    if (!error) {
      onStatusChange()
    }
  }

  return (
    <details className="relative">
      <summary className="cursor-pointer text-sm text-accent hover:underline">
        View
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-[420px] glass-surface rounded-2xl p-6 soft-shadow space-y-4">
        <div>
          <h3 className="text-lg font-medium">
            {idea.idea_title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {idea.idea_description}
          </p>

          {idea.domain && (
            <span className="inline-block mt-3 text-xs rounded-full bg-accent/15 px-3 py-1 text-accent">
              {idea.domain}
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          Status:{" "}
          <span className="capitalize">
            {idea.status}
          </span>
        </div>

        {idea.status === "submitted" && (
          <div className="flex justify-end gap-3 pt-4">
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
          </div>
        )}
      </div>
    </details>
  )
}
