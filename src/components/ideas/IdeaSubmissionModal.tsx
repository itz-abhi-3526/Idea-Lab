
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-0 sm:px-4">
      {/* Container - Stacks to bottom on mobile, centers on desktop */}
      <div
        className="
          w-full
          sm:max-w-xl
          max-h-[95vh]
          sm:max-h-[90vh]
          overflow-hidden
          rounded-t-[2rem] sm:rounded-2xl
          bg-card
          flex flex-col
          shadow-2xl
        "
      >
        {/* Fixed Header */}
        <div className="p-6 pb-2 border-b border-white/5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Idea Proposal
          </h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Technical Submission Protocol
          </p>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(form).map(([key, value]) => (
              <div key={key} className={key === 'idea_description' ? 'sm:col-span-2' : ''}>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1 mb-1 block">
                  {key.replace("_", " ")}
                </label>
                {key === 'idea_description' ? (
                  <textarea
                    rows={4}
                    placeholder={`Enter ${key.replace("_", " ")}`}
                    value={value}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none focus:border-accent transition-all resize-none"
                  />
                ) : (
                  <input
                    type={key === 'team_size' ? 'number' : 'text'}
                    placeholder={`Enter ${key.replace("_", " ")}`}
                    value={value}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none focus:border-accent transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Action Footer */}
        <div className="p-6 bg-muted/20 border-t border-white/5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="
              order-2 sm:order-1
              w-full sm:w-1/3
              rounded-xl
              border border-white/10
              px-4 py-3
              text-xs font-bold uppercase tracking-widest
              text-muted-foreground
              hover:bg-white/5
              transition-all
            "
          >
            Abort
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              order-1 sm:order-2
              w-full sm:flex-1
              rounded-xl
              bg-white
              text-black
              px-4 py-3
              text-xs font-bold uppercase tracking-[0.2em]
              hover:bg-accent hover:text-white
              disabled:opacity-60
              transition-all
              shadow-lg
            "
          >
            {loading ? "Transmitting..." : "Initialize Submission"}
          </button>
        </div>
      </div>
    </div>
  )
}
