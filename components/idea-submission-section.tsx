"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, X, Check } from "lucide-react"
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
        className="relative py-20 overflow-hidden bg-background"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lightbulb className="mx-auto h-12 w-12 text-accent" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            Submit your idea
          </h2>

          <p className="text-muted-foreground">
            Share your concept and get direct access to IDEA Lab support and
            mentorship.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSuccess(false)
              setError(null)
              setOpen(true)
            }}
            className="relative inline-flex items-center justify-center px-8 py-3 rounded-xl
                       bg-accent text-accent-foreground
                       shadow-[0_18px_40px_rgba(0,0,0,0.45)]
                       overflow-hidden"
          >
            <span className="relative z-10">Submit your idea</span>
          </motion.button>

          <p className="text-xs text-muted-foreground">
            All submissions are reviewed by IDEA Lab coordinators.
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

            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 80, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="
                relative
                w-full
                sm:max-w-3xl
                h-[92vh] sm:h-auto
                rounded-t-3xl sm:rounded-2xl
                bg-background/80 backdrop-blur-xl
                border border-white/10
                shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                p-6 sm:p-8
                overflow-y-auto
              "
            >
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

              <h3 className="text-2xl font-semibold mb-6">
                Idea submission
              </h3>

              {/* ---------- SUCCESS STATE (SIRI STYLE) ---------- */}
              <AnimatePresence mode="wait">
                {success && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="relative mb-10">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-accent/30 blur-2xl"
                      />

                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-full border border-accent/30 flex items-center justify-center bg-background"
                      >
                        <Check className="w-10 h-10 text-accent" />
                      </motion.div>
                    </div>

                    <h4 className="text-xl font-semibold mb-2">
                      Idea submitted successfully
                    </h4>

                    <p className="text-sm text-muted-foreground max-w-md">
                      Your idea has been received by the IDEA Lab team. You will
                      be contacted if your proposal is shortlisted.
                    </p>
                  </motion.div>
                )}

                {!success && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mb-4"
                      >
                        {error}
                      </motion.p>
                    )}

                    <form
                      onSubmit={handleSubmit}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {/* Personal */}
                      <input
                        name="student_name"
                        required
                        placeholder="Your name"
                        className="input focus:ring-2 focus:ring-accent/40"
                      />
                      <input
                        name="email"
                        value={email}
                        readOnly
                        className="input opacity-70"
                      />

                      <input
                        name="phone"
                        placeholder="Phone number"
                        className="input focus:ring-2 focus:ring-accent/40"
                      />
                      <input
                        name="department"
                        required
                        placeholder="Department"
                        className="input focus:ring-2 focus:ring-accent/40"
                      />

                      <input
                        name="year"
                        placeholder="Semester"
                        className="input focus:ring-2 focus:ring-accent/40"
                      />
                      <input
                        name="idea_title"
                        required
                        placeholder="Idea title"
                        className="input focus:ring-2 focus:ring-accent/40"
                      />

                      <textarea
                        name="idea_description"
                        required
                        placeholder="Describe your idea"
                        className="input min-h-[120px] sm:col-span-2 focus:ring-2 focus:ring-accent/40"
                      />

                      <input
                        name="domain"
                        placeholder="Domain (AI, IoT, etc.)"
                        className="input focus:ring-2 focus:ring-accent/40"
                      />
                      <input
                        name="team_size"
                        type="number"
                        min={1}
                        placeholder="Team size"
                        className="input focus:ring-2 focus:ring-accent/40"
                      />

                      <div className="sm:col-span-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          disabled={loading}
                          className="w-full rounded-xl bg-accent text-accent-foreground py-3 shadow-lg disabled:opacity-60"
                        >
                          {loading ? "Submitting…" : "Submit idea"}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
