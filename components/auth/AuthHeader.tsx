"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AuthHeader() {
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Logged OUT
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

  // Logged IN
  const name =
    user.user_metadata?.display_name ||
    user.email?.charAt(0).toUpperCase() ||
    "U"

  // 🔐 ADMIN CHECK (UI ONLY)
  const isAdmin =
    user.user_metadata?.role === "admin" ||
    user.user_metadata?.is_admin === true

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 rounded-full bg-white/20 text-white flex items-center justify-center font-medium backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
      >
        {name.charAt(0)}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-white hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          {/* 🔑 ADMIN PANEL (admins only) */}
          {isAdmin && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-emerald-400 hover:bg-white/10"
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
      )}
    </div>
  )
}
