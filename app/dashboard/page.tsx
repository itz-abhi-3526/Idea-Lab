"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import LogoutButton from "@/components/auth/LogoutButton"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "morning"
  if (hour < 18) return "afternoon"
  return "evening"
}

export default function DashboardPage() {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        window.location.href = "/login"
        return
      }

      setName(
        data.user.user_metadata?.display_name ||
        data.user.email?.split("@")[0] ||
        "there"
      )
    }

    loadUser()
  }, [])

  return (
    <div className="min-h-screen bg-background px-6 py-12 md:px-12">
      {/* HEADER */}
      <div className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Good {getGreeting()}, {name} 👋
          </h1>

          <p className="text-sm text-muted-foreground">
            Here’s what’s happening in the IDEA Lab today.
          </p>
        </div>

        <div className="self-start rounded-full border border-border/60 bg-card/60 backdrop-blur-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-border transition">
          <LogoutButton />
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* MY IDEAS */}
        <div className="group rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <h3 className="text-base font-medium">My Ideas</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            View and track your submitted ideas.
          </p>

          <a
            href="/dashboard/my-ideas"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition group-hover:gap-2"
          >
            View ideas →
          </a>
        </div>

        {/* INVENTORY */}
        <div className="group rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <h3 className="text-base font-medium">
            Inventory Requests
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Request and monitor lab equipment.
          </p>

          <a
            href="/dashboard/my-requests"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition group-hover:gap-2"
          >
            View requests →
          </a>
        </div>

        {/* ACCOUNT */}
        <div className="group rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <h3 className="text-base font-medium">
            Account Settings
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your profile and security.
          </p>

          <a
            href="/dashboard/account"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition group-hover:gap-2"
          >
            Manage account →
          </a>
        </div>
      </div>
    </div>
  )
}
