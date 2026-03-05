"use client"

import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { X, Check, ArrowRight, Rocket, Zap } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
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
        className="relative z-10 px-10 py-5 bg-white text-black rounded-2xl font-bold font-['Syne'] text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-orange-500 hover:text-white transition-colors duration-300"
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
    const payload = Object.fromEntries(formData.entries())

    const { data: sessionData } = await supabase.auth.getSession()

    try {
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
        throw new Error(err.error || "Submission failed")
      }

      setSuccess(true)
      form.reset()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-black relative" id="idea">
        
        {/* DESIGN: AMBIENT BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <m.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/20 blur-[120px] rounded-full" 
          />
        </div>

        <section id="idea-submission" className="relative py-32 overflow-hidden border-t border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* LEFT: TEXT CONTENT */}
              <m.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-orange-500" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-orange-500 font-bold font-['Outfit']">Innovation Portal</span>
                </div>

                <h2 className="text-white font-[800] tracking-tighter leading-[1] uppercase" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                  Have a <br/>
                  <m.span animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 3, repeat: Infinity }} className="text-orange-500">Solid</m.span> <br/>
                  Idea?
                </h2>

                <p className="text-neutral-500 font-['Outfit'] font-light text-lg max-w-md leading-relaxed">
                  The IDEA Lab provides the infrastructure to turn concepts into reality. Access mentorship and high-end hardware.
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <Zap className="text-orange-500" size={20} />
                  </div>
                  <p className="text-xs text-neutral-400 font-['Outfit'] tracking-wide">
                    Submissions are currently <span className="text-white font-bold tracking-widest uppercase ml-1">Open</span> <br/>
                    <span className="text-[10px] text-neutral-600 uppercase">for the next Cohort</span>
                  </p>
                </div>
              </m.div>

              {/* RIGHT: INTERACTIVE CARD */}
              <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="relative bg-neutral-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 sm:p-16 flex flex-col items-center text-center space-y-10 overflow-hidden group shadow-2xl">
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full" />
                  <div className="relative p-6 rounded-2xl bg-black border border-orange-500/20 shadow-inner">
                    <Rocket className="w-12 h-12 text-orange-500" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white font-['Syne'] tracking-tight">Ready to Launch?</h3>
                    <p className="text-neutral-500 text-sm font-['Outfit'] max-w-xs leading-relaxed">Submit your proposal for technical review by our lab coordinators.</p>
                  </div>
                  <MagneticButton onClick={() => { setSuccess(false); setError(null); setOpen(true); }}>
                    Submit Proposal <ArrowRight size={18} />
                  </MagneticButton>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* MODAL SYSTEM: INCORPORATING YOUR FORM FIELDS */}
        <AnimatePresence>
          {open && (
            <m.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <m.div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
              <m.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative w-full max-w-3xl bg-[#050505] border border-white/10 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 sm:p-12 max-h-[85vh] overflow-y-auto scrollbar-hide">
                  
                  <div className="flex justify-between items-center mb-10">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-bold text-white font-['Syne'] uppercase tracking-tight">Idea Proposal</h3>
                      <p className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.3em]">Technical Submission Form</p>
                    </div>
                    <button onClick={() => setOpen(false)} className="p-3 rounded-full bg-white/5 text-neutral-500 hover:text-white transition-all"><X size={24} /></button>
                  </div>

                  <AnimatePresence mode="wait">
                    {success ? (
                      <m.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center space-y-8">
                        <Check className="w-16 h-16 text-green-500 mx-auto" />
                        <h4 className="text-2xl font-bold text-white font-['Syne'] uppercase">Proposal Submitted!</h4>
                        <button onClick={() => setOpen(false)} className="text-xs text-orange-500 font-bold uppercase tracking-widest border-b border-orange-500/30 pb-1">Return to Lab</button>
                      </m.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {error && <div className="sm:col-span-2 text-red-500 text-xs bg-red-500/5 border border-red-500/20 p-5 rounded-2xl">{error}</div>}
                        
                        {/* THE FIELDS FROM YOUR CODE */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Student Name</label>
                          <input name="student_name" required className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500/50 outline-none text-sm transition-all" placeholder="Your name" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Email (Read Only)</label>
                          <input name="email" value={email} readOnly className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-5 py-4 text-neutral-600 text-sm cursor-not-allowed" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Phone Number</label>
                          <input name="phone" placeholder="Phone number" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500/50 outline-none text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Department</label>
                          <input name="department" required placeholder="Department" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500/50 outline-none text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Semester</label>
                          <input name="year" placeholder="Semester" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500/50 outline-none text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Idea Title</label>
                          <input name="idea_title" required placeholder="Idea title" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500/50 outline-none text-sm transition-all" />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Description</label>
                          <textarea name="idea_description" required placeholder="Describe your idea" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-5 text-white focus:border-orange-500/50 outline-none text-sm min-h-[120px] resize-none transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Domain</label>
                          <input name="domain" placeholder="AI, IoT, etc." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500/50 outline-none text-sm transition-all" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Team Size</label>
                          <input name="team_size" type="number" min={1} placeholder="Team size" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500/50 outline-none text-sm transition-all" />
                        </div>

                        <div className="sm:col-span-2 pt-6">
                          <button type="submit" disabled={loading} className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-black font-bold font-['Syne'] uppercase tracking-[0.3em] text-[11px] rounded-2xl transition-all disabled:opacity-50">
                            {loading ? "Initializing..." : "Finalize Submission"}
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