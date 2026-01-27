"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import LogoutButton from "@/components/auth/LogoutButton"
import ProfilePhotoUpload from "@/components/profile/ProfilePhotoUpload"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Morning!"
  if (hour < 18) return "Afternoon!"
  return "Evening!"
}

export default function DashboardPage() {
  const [userId, setUserId] = useState("")
  const [name, setName] = useState("there")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [role, setRole] = useState<"admin" | "member">("member")

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        window.location.href = "/login"
        return
      }

      const user = data.user
      setUserId(user.id)

      setName(
        user.user_metadata?.display_name ||
          user.email?.split("@")[0] ||
          "there"
      )

      setEmail(user.email ?? "")
      setRole(user.user_metadata?.role === "admin" ? "admin" : "member")

      const { data: profile } = await supabase
        .from("users")
        .select("avatar_url")
        .eq("id", user.id)
        .single()

      setAvatar(profile?.avatar_url ?? null)
    }

    loadUser()
  }, [])

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 md:px-12 space-y-12">

      {/* 🔹 HEADER (GREETING ONLY) */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Good {getGreeting()} 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here’s what’s happening in the IDEA Lab today.
          </p>
        </div>

        <div className="rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm">
          <LogoutButton />
        </div>
      </div>

      {/* 🔹 PROFILE SECTION */}
      <section className="space-y-4">
        <h2 className="text-base font-medium text-muted-foreground uppercase tracking-wide">
          User Profile
        </h2>

        <div className="glass-surface rounded-2xl p-6 soft-shadow">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

            {/* Avatar */}
            <div className="h-24 w-24 rounded-full overflow-hidden border border-border bg-card shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-2xl font-medium text-muted-foreground">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>

              {/* Badges */}
              <div className="flex gap-2 justify-center sm:justify-start">
                {role === "admin" && (
                  <span className="px-3 py-1 rounded-full text-xs bg-accent/15 text-accent border border-accent/30">
                    Admin
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs bg-muted/20 text-muted-foreground border border-border">
                  Member
                </span>
              </div>

              {/* Change photo */}
              {userId && (
                <ProfilePhotoUpload
                  userId={userId}
                  onUploaded={setAvatar}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 ACTION CARDS */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="My Ideas"
          description="View and track your submitted ideas."
          href="/dashboard/my-ideas"
        />
        <DashboardCard
          title="Inventory Requests"
          description="Request and monitor lab equipment."
          href="/dashboard/my-requests"
        />
        <DashboardCard
          title="My Incubation Requests"
          description="Track 3D printing & laser printing requests."
          href="/dashboard/incubation-requests"
        />
        <DashboardCard
          title="Account Settings"
          description="Manage your profile and security."
          href="/dashboard/account"
        />
      </section>
    </div>
  )
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <div className="group rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-base font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
      <a
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2"
      >
        Open →
      </a>
    </div>
  )
}
