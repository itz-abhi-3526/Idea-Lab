"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function IdeaSubmissionModal({
  onClose,
}: {
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    student_name: "",
    phone: "",
    department: "",
    year: "",
    idea_title: "",
    idea_description: "",
    domain: "",
    team_size: "",
  })

  const handleSubmit = async () => {
    setLoading(true)

    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) {
      alert("Please login first")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("idea_submissions").insert({
      ...form,
      team_size: Number(form.team_size),
      user_id: auth.user.id,
      status: "pending",
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Idea submitted successfully")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-2xl bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold">Submit Your Idea</h2>

        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            placeholder={key.replace("_", " ")}
            value={value}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-md bg-accent py-2 text-sm font-medium text-white"
        >
          {loading ? "Submitting..." : "Submit Idea"}
        </button>
      </div>
    </div>
  )
}
