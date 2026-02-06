"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, X } from "lucide-react"
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
      {/* SECTION */}
      <section
        id="idea-submission"
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-background"
      >
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-5 sm:space-y-6"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lightbulb className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-accent" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            Have an Idea?
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground">
            Got an idea worth exploring? Submit it to us and get the support you
            need to turn it into reality.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl
                       bg-accent text-accent-foreground
                       shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                       overflow-hidden"
          >
            <span className="relative z-10">Submit Your Idea</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Ideas are reviewed by IDEA Lab coordinators. Shortlisted teams will be
            contacted.
          </p>
        </motion.div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Sheet / dialog */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="
                relative
                w-full
                sm:max-w-xl
                h-[92vh] sm:h-auto
                rounded-t-3xl sm:rounded-2xl
                bg-background/80 backdrop-blur-xl
                border border-white/10
                shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                p-5 sm:p-8
                overflow-y-auto
              "
            >
              {/* handle */}
              <div className="sm:hidden mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />

              {/* Close */}
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Idea Submission
              </h3>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-red-500 text-sm mb-2"
                  >
                    {error}
                  </motion.p>
                )}

                {success && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-green-500 text-sm mb-2"
                  >
                    Idea submitted successfully!
                  </motion.p>
                )}
              </AnimatePresence>

              {!success && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <input
                    name="student_name"
                    required
                    placeholder="Your Name"
                    className="input text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />
                  <input
                    name="email"
                    value={email}
                    readOnly
                    className="input opacity-70 text-base sm:text-sm"
                  />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    className="input text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />
                  <input
                    name="department"
                    required
                    placeholder="Department"
                    className="input text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />
                  <input
                    name="year"
                    placeholder="Semester"
                    className="input text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />
                  <input
                    name="idea_title"
                    required
                    placeholder="Idea Title"
                    className="input text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />
                  <textarea
                    name="idea_description"
                    required
                    placeholder="Describe your idea"
                    className="input min-h-[120px] text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />
                  <input
                    name="domain"
                    placeholder="Domain (AI, IoT, etc.)"
                    className="input text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />
                  <input
                    name="team_size"
                    type="number"
                    min={1}
                    placeholder="Team Size"
                    className="input text-base sm:text-sm focus:ring-2 focus:ring-accent/40"
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                    className="w-full rounded-xl bg-accent text-accent-foreground py-3 text-base sm:text-sm shadow-lg disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit Idea"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
