"use client"

import { useEffect, useState } from "react"
import IdeaTimeline from "@/components/ideas/IdeaTimeline"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Idea = {
  id: string
  idea_title: string
  idea_description: string
  domain: string | null
  status: "submitted" | "approved" | "rejected" | "completed"
  created_at: string
}

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadIdeas = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from("idea_submissions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setIdeas(data || [])
      setLoading(false)
    }

    loadIdeas()
  }, [])

  return (
    <div className="min-h-screen bg-background px-6 py-12 md:px-12">
      {/* header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Ideas
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track the status of ideas you’ve submitted to IDEA Lab.
        </p>
      </div>

      {/* content */}
      {loading ? (
        <p className="text-sm text-muted-foreground">
          Loading your ideas…
        </p>
      ) : ideas.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            You haven’t submitted any ideas yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">
                  {idea.idea_title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {idea.idea_description}
                </p>

                {idea.domain && (
                  <span className="mt-1 w-fit rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                    {idea.domain}
                  </span>
                )}
              </div>

              <IdeaTimeline status={idea.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
