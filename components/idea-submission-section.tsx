"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, ArrowRight, X } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function IdeaSubmissionSection() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    const { data: sessionData } = await supabase.auth.getSession()

    const res = await fetch("/api/idea-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData.session?.access_token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      setError(err.error || "Submission failed")
      setLoading(false)
      return
    }

    setSuccess(true)
    form.reset()
    setLoading(false)
  }

  return (
    <>
      <section id="idea-submission" className="py-24 bg-background">
        <div className="text-center space-y-6">
          <Lightbulb className="mx-auto h-12 w-12 text-accent" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
              Have an Idea?
            </h2>
          <p className="text-muted-foreground">
            Got an idea worth exploring? Submit it to us and get the support you need to turn it into reality.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-lg"
          >
            Submit Your Idea
          </button>

          <p className="text-sm text-muted-foreground">
            Ideas are reviewed by IDEA Lab coordinators. Shortlisted teams will be contacted.
          </p>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-background p-8 rounded-xl w-full max-w-xl"
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

              <h3 className="text-2xl font-semibold mb-4">Idea Submission</h3>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">Idea submitted successfully!</p>}

              {!success && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="student_name" required placeholder="Your Name" className="input" />
                  <input name="email" value={email} readOnly className="input opacity-70" />
                  <input name="phone" placeholder="Phone Number" className="input" />
                  <input name="department" required placeholder="Department" className="input" />
                  <input name="year" placeholder="Semester" className="input" />
                  <input name="idea_title" required placeholder="Idea Title" className="input" />
                  <textarea name="idea_description" required placeholder="Describe your idea" className="input" />
                  <input name="domain" placeholder="Domain (AI, IoT, etc.)" className="input" />
                  <input name="team_size" type="number" min={1} placeholder="Team Size" className="input" />

                  <button
                    disabled={loading}
                    className="w-full bg-accent text-accent-foreground py-3 rounded-lg"
                  >
                    {loading ? "Submitting..." : "Submit Idea"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
