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

      <div
        className="
          fixed sm:absolute
          inset-x-0 sm:inset-auto
          bottom-0 sm:bottom-auto
          right-0
          z-50
          mt-2
          w-full sm:w-[420px]
          max-h-[85vh]
          overflow-y-auto
          glass-surface
          rounded-t-2xl sm:rounded-2xl
          p-4 sm:p-6
          soft-shadow
          space-y-4
        "
      >
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

        <div className="text-xs text-muted-foreground">
          Status:{" "}
          <span className="capitalize">
            {idea.status}
          </span>
        </div>

        {idea.status === "submitted" && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
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
          </div>
        )}
      </div>
    </details>
  )
}
