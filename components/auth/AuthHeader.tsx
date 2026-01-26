"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AuthHeader() {
  const [user, setUser] = useState<any>(null)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)

      if (data.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("avatar_url")
          .eq("id", data.user.id)
          .single()

        setAvatar(profile?.avatar_url ?? null)
      }
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        supabase
          .from("users")
          .select("avatar_url")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setAvatar(data?.avatar_url ?? null)
          })
      } else {
        setAvatar(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  /* ---------------- LOGGED OUT ---------------- */
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <button className="rounded-full px-4 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition">
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className="rounded-full px-4 py-2 text-sm font-medium text-black bg-white hover:bg-gray-100 transition">
            Sign up
          </button>
        </Link>
      </div>
    )
  }

  /* ---------------- LOGGED IN ---------------- */
  const name =
    user.user_metadata?.display_name ||
    user.email?.charAt(0).toUpperCase() ||
    "U"

  const isAdmin =
    user.user_metadata?.role === "admin" ||
    user.user_metadata?.is_admin === true

  return (
    <div className="relative">
      {/* AVATAR */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative h-9 w-9 rounded-full overflow-hidden transition
          ${
            isAdmin
              ? "p-[2px] bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
              : "bg-white/20"
          }`}
      >
        <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt="Profile"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <span className="text-white font-medium">
              {name.charAt(0)}
            </span>
          )}
        </div>
      </button>

      {/* DROPDOWN */}
      <div
        className={`absolute right-0 mt-2 w-44 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden
          transition-all duration-200 origin-top-right
          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
      >
        <Link
          href="/dashboard"
          className="block px-4 py-2 text-sm text-white hover:bg-white/10"
          onClick={() => setOpen(false)}
        >
          Dashboard
        </Link>

        {isAdmin && (
          <Link
            href="/admin"
            className="block px-4 py-2 text-sm text-amber-400 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Admin Panel
          </Link>
        )}

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.href = "/"
          }}
          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
