"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AccountPage() {
  const router = useRouter()

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

    // 🔥 HARD RESET SESSION
    await supabase.auth.signOut()

    // 🔥 HARD REDIRECT (kills all JS memory)
    window.location.href = "/login"
  }

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading…</div>
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-2xl font-semibold">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PROFILE */}
        <div className="rounded-xl border bg-card/60 backdrop-blur p-6 space-y-4">
          <h2 className="text-lg font-medium">Profile</h2>

          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <input
              disabled
              value={email}
              className="mt-1 w-full rounded-md bg-black/40 border px-3 py-2 text-muted-foreground"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Display name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md bg-black/40 border px-3 py-2"
            />
          </div>

          <button
            onClick={updateProfile}
            disabled={saving}
            className="rounded-md bg-orange-500 px-4 py-2 font-medium text-black"
          >
            Save profile
          </button>
        </div>

        {/* PASSWORD */}
        <div className="rounded-xl border bg-card/60 backdrop-blur p-6 space-y-4">
          <h2 className="text-lg font-medium">Change password</h2>

          <div>
            <label className="text-sm text-muted-foreground">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-black/40 border px-3 py-2"
            />
          </div>

          <button
            onClick={updatePassword}
            disabled={saving}
            className="rounded-md bg-orange-500 px-4 py-2 font-medium text-black"
          >
            Update password
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
    </div>
  )
}
