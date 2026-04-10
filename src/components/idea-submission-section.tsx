
import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { X, Check, ArrowRight, Rocket, Zap } from "lucide-react"
import { supabase } from "@/lib/supabase"

/* MAGNETIC BUTTON COMPONENT */
function MagneticButton({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <m.div 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className={`relative group ${className}`}
    >
      <m.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 hidden md:block"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]: number[]) => `radial-gradient(120px circle at ${x + 16}px ${y + 16}px, rgba(249, 115, 22, 0.25), transparent 80%)`
          ),
        }}
      />
      <m.button
        type="button"
        onClick={onClick}
        style={{ 
          x: useTransform(smoothX, [-100, 100], [-10, 10]), 
          y: useTransform(smoothY, [-100, 100], [-10, 10]) 
        }}
        className="relative z-10 w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-bold font-['Syne'] text-[10px] sm:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-500 hover:text-white transition-colors duration-300"
      >
        {children}
      </m.button>
    </m.div>
  );
}

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
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError("Please login before submitting your idea.")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.from("idea_submissions").insert({
        student_name: payload.student_name ?? "",
        email: email || payload.email,
        phone: payload.phone ?? "",
        department: payload.department ?? "",
        year: payload.year ?? "",
        idea_title: payload.idea_title ?? "",
        idea_description: payload.idea_description ?? "",
        domain: payload.domain ?? "",
        team_size: Number(payload.team_size) || 0,
        status: "submitted",
        user_id: user.id,
      })

      if (error) {
        throw error
      }

      setSuccess(true)
      form.reset()
    } catch (err: any) {
      setError(err.message || "Submission failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-black relative overflow-hidden" id="idea">
        
        {/* AMBIENT BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <m.div 
            animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-orange-500/10 blur-[100px] rounded-full" 
          />
        </div>

        <section id="idea-submission" className="relative py-20 sm:py-32 border-t border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* LEFT CONTENT */}
              <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-8 h-px bg-orange-500 hidden sm:block" />
                  <span className="text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-orange-500 font-black font-['Outfit']">Innovation Portal</span>
                </div>

                <h2 className="text-white font-black tracking-tighter leading-[1] uppercase" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 8vw, 4.5rem)" }}>
                  Have a <br className="hidden sm:block"/>
                  <m.span animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 4, repeat: Infinity }} className="text-orange-500">Solid</m.span> <br className="hidden sm:block"/>
                  Idea?
                </h2>

                <p className="text-neutral-500 font-['Outfit'] font-light text-sm sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                  The IDEA Lab provides the infrastructure to turn concepts into reality. Access mentorship and high-end hardware.
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <Zap className="text-orange-500" size={18} />
                  </div>
                  <p className="text-[10px] sm:text-xs text-neutral-400 font-['Outfit'] tracking-wide text-left">
                    Submissions are currently <span className="text-white font-bold tracking-widest uppercase ml-1">Open</span> <br/>
                    <span className="text-[9px] text-neutral-600 uppercase">for the next cohort</span>
                  </p>
                </div>
              </m.div>

              {/* RIGHT CARD */}
              <m.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="relative bg-neutral-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-16 flex flex-col items-center text-center space-y-8 sm:space-y-10 overflow-hidden shadow-2xl">
                  <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-64 sm:h-64 bg-orange-500/10 blur-[80px] rounded-full" />
                  <div className="relative p-5 sm:p-6 rounded-2xl bg-black border border-orange-500/20">
                    <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne'] tracking-tight">Ready to Launch?</h3>
                    <p className="text-neutral-500 text-xs sm:text-sm font-['Outfit'] max-w-xs leading-relaxed mx-auto">Submit your proposal for technical review by our lab coordinators.</p>
                  </div>
                  <MagneticButton className="w-full sm:w-auto" onClick={() => { setSuccess(false); setError(null); setOpen(true); }}>
                    Submit Proposal <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* MODAL SYSTEM */}
        <AnimatePresence>
          {open && (
            <m.div className="fixed inset-0 z-[200] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <m.div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
              <m.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative w-full max-w-3xl bg-[#080808] border border-white/10 rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
                <div className="p-6 sm:p-12 max-h-[90vh] overflow-y-auto scrollbar-hide">
                  
                  <div className="flex justify-between items-start mb-8 sm:mb-10">
                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne'] uppercase tracking-tight">Idea Proposal</h3>
                      <p className="text-[8px] sm:text-[10px] text-orange-500 font-black uppercase tracking-[0.3em]">Technical Submission Form</p>
                    </div>
                    <button onClick={() => setOpen(false)} className="p-2 sm:p-3 rounded-full bg-white/5 text-neutral-500 hover:text-white transition-all"><X size={20} /></button>
                  </div>

                  <AnimatePresence mode="wait">
                    {success ? (
                      <m.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 sm:py-24 text-center space-y-6">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                          <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white font-['Syne'] uppercase">Proposal Transmitted</h4>
                        <button onClick={() => setOpen(false)} className="text-[10px] text-orange-500 font-black uppercase tracking-widest border-b border-orange-500/30 pb-1">Return to Lab</button>
                      </m.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        {error && <div className="sm:col-span-2 text-red-500 text-[10px] bg-red-500/5 border border-red-500/10 p-4 rounded-xl font-mono">{error}</div>}
                        
                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Student Name</label>
                          <input name="student_name" required className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm transition-all" placeholder="Enter Full Name" />
                        </div>

                        <div className="space-y-2 opacity-60">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Auth Email</label>
                          <input name="email" value={email} readOnly className="w-full bg-transparent border border-white/5 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-neutral-500 text-xs sm:text-sm cursor-not-allowed" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Phone Link</label>
                          <input name="phone" required placeholder="+91 00000 00000" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Department</label>
                          <input name="department" required placeholder="Major / Stream" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Semester Cycle</label>
                          <input name="year" required placeholder="Current Semester" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Project Code Name</label>
                          <input name="idea_title" required placeholder="Idea Title" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm transition-all" />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Concept Brief</label>
                          <textarea name="idea_description" required placeholder="Explain the project scope and hardware requirements..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 sm:px-5 sm:py-5 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm min-h-[140px] resize-none transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Technical Domain</label>
                          <input name="domain" placeholder="AI / Robotics / IoT" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-black ml-1">Core Team Size</label>
                          <input name="team_size" type="number" min={1} required placeholder="Member Count" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-white focus:border-orange-500/40 outline-none text-xs sm:text-sm transition-all" />
                        </div>

                        <div className="sm:col-span-2 pt-6">
                          <button type="submit" disabled={loading} className="group relative w-full py-5 bg-orange-500 hover:bg-orange-600 text-black font-black font-['Syne'] uppercase tracking-[0.3em] text-[10px] sm:text-[11px] rounded-2xl transition-all disabled:opacity-50 overflow-hidden">
                            <span className="relative z-10">{loading ? "Synchronizing..." : "Submit to Lab"}</span>
                            {loading && <m.div className="absolute inset-0 bg-white/20" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />}
                          </button>
                        </div>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
