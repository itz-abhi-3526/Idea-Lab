"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AccountPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        window.location.href = "/login"
        return
      }

      setEmail(data.user.email ?? "")
      setName((data.user.user_metadata?.display_name as string) ?? "")
      setLoading(false)
    }

    loadUser()
  }, [])

  const updateProfile = async () => {
    setSaving(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      data: { display_name: name },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Profile updated successfully")
    }

    setSaving(false)
  }

  const updatePassword = async () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setSaving(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Account Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PROFILE */}
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 space-y-5">
          <h2 className="text-lg font-medium">Profile</h2>

          <div>
            <label className="text-sm text-muted-foreground">
              Email
            </label>
            <input
              disabled
              value={email}
              className="mt-1 w-full rounded-lg bg-black/40 border border-border px-3 py-2 text-sm text-muted-foreground"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Display name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg bg-black/40 border border-border px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={updateProfile}
            disabled={saving}
            className="w-full sm:w-auto rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-orange-400 transition disabled:opacity-50"
          >
            Save profile
          </button>
        </div>

        {/* PASSWORD */}
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 space-y-5">
          <h2 className="text-lg font-medium">
            Change password
          </h2>

          <div>
            <label className="text-sm text-muted-foreground">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="mt-1 w-full rounded-lg bg-black/40 border border-border px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={updatePassword}
            disabled={saving}
            className="w-full sm:w-auto rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-orange-400 transition disabled:opacity-50"
          >
            Update password
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {message && (
        <p className="text-sm text-emerald-400">
          {message}
        </p>
      )}
    </div>
  )
}
