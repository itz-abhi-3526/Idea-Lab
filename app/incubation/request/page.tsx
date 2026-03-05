"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Upload, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  ChevronRight,
  AlertCircle,
  Loader2,
  Zap
} from "lucide-react"
import { supabase } from "@/lib/supabase"

/* ================= CONFIG ================= */
const GPAY_QR_URL = "https://res.cloudinary.com/dvrc3jqve/image/upload/v1769405493/unnamed_z5x3tk.jpg"
const COST_3D_PER_GRAM = 5
const COST_LASER_PER_SQFT = 150

/* ================= LOADER COMPONENT ================= */
const ProtocolLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("INITIALIZING_CORE")

  useEffect(() => {
    const statuses = [
      "ESTABLISHING_SECURE_LINK",
      "SYNCING_IDEA_LAB_RESOURCES",
      "FETCHING_PRICING_MANIFEST",
      "SYSTEM_READY"
    ]

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 12) + 4
        setStatus(statuses[Math.floor((next / 101) * statuses.length)])
        return next > 100 ? 100 : next
      })
    }, 120)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="w-full max-w-xs space-y-8 relative">
        <div className="space-y-4 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="inline-block"
          >
            <Loader2 size={32} className="text-orange-600" />
          </motion.div>
          <div className="space-y-1">
            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Loading Protocol</h2>
            <p className="font-mono text-[9px] text-orange-500 tracking-[0.3em] font-black uppercase leading-none">{status}</p>
          </div>
        </div>

        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between font-mono text-[9px] text-white/20 font-black uppercase tracking-widest">
          <span>Boot_Sequence_V2</span>
          <span className="text-white/40">{progress}%</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ================= TYPES & HELPERS ================= */
type UploadState = { file?: File; url?: string; progress: number; error?: string }

async function uploadToCloudinary(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "idea_lab_profiles")
  const res = await fetch("https://api.cloudinary.com/v1_1/dvrc3jqve/image/upload", { method: "POST", body: formData })
  if (!res.ok) throw new Error("Upload failed")
  const data = await res.json()
  return data.secure_url as string
}

async function uploadSTL(file: File) {
  const { data, error } = await supabase.storage.from("incubation-stl").upload(`${Date.now()}-${file.name}`, file)
  if (error) throw error
  const { data: url } = supabase.storage.from("incubation-stl").getPublicUrl(data.path)
  return url.publicUrl
}

/* ================= PAGE ================= */
export default function IncubationRequestPage() {
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [type, setType] = useState<"3d" | "laser">("3d")
  const [form, setForm] = useState<any>({ name: "", email: "", contact: "", weight: "", area: "", date: "", time: "" })
  const [slice, setSlice] = useState<UploadState>({ progress: 0 })
  const [stl, setStl] = useState<UploadState>({ progress: 0 })
  const [payment, setPayment] = useState<UploadState>({ progress: 0 })

  const estimatedCost = useMemo(() => {
    return type === "3d" ? Number(form.weight || 0) * COST_3D_PER_GRAM : Number(form.area || 0) * COST_LASER_PER_SQFT
  }, [form, type])

  const formProgress = useMemo(() => {
    const fields = [form.name, form.email, form.contact, form.date, form.time, slice.url, stl.url, payment.url]
    return Math.round((fields.filter(Boolean).length / fields.length) * 100)
  }, [form, slice, stl, payment])

  async function handleUpload(file: File, setter: (u: UploadState) => void, uploader: (f: File) => Promise<string>) {
    setter({ file, progress: 15 })
    try {
      const url = await uploader(file)
      setter({ file, url, progress: 100 })
    } catch (e: any) {
      setter({ file, progress: 0, error: e.message })
    }
  }

  async function submit() {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from("incubation_requests").insert({
      user_id: user?.id,
      name: form.name,
      email: form.email,
      contact_number: form.contact,
      request_type: type === "3d" ? "3d_printing" : "laser_printing",
      approx_weight_grams: type === "3d" ? form.weight : null,
      approx_area_sqft: type === "laser" ? form.area : null,
      estimated_cost: estimatedCost,
      sliced_model_screenshot_url: slice.url,
      design_files_urls: [stl.url],
      payment_screenshot_url: payment.url,
      preferred_date: form.date,
      preferred_time: form.time,
    })
    alert("Request submitted successfully")
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isAppLoading && <ProtocolLoader key="loader" onComplete={() => setIsAppLoading(false)} />}
      </AnimatePresence>

      <main className="relative min-h-screen bg-[#050505] text-white antialiased font-sans overflow-x-hidden">
        
        {/* Background Grids */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `linear-gradient(rgba(234, 88, 12, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 88, 12, 0.2) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20 space-y-12 sm:space-y-20">

          {/* Header */}
          <header className="relative border-l-4 border-orange-600 pl-4 sm:pl-8 py-2">
            <p className="font-mono text-[9px] font-black tracking-[0.4em] text-orange-500 uppercase mb-4">
              INCUBATION_PROTOCOL // REQ_FORM
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter leading-[0.9] uppercase mb-10">
              AICTE IDEA LAB <br />
              <span className="text-white/20 not-italic text-2xl sm:text-4xl md:text-5xl">INCUBATION REQUEST</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start border-t border-white/5 pt-8">
              <div className="space-y-6 sm:space-y-8">
                {[
                  { icon: <Zap className="w-3.5 h-3.5" />, text: "Official request portal for", highlight: "high-precision manufacturing." },
                  { icon: <AlertCircle className="w-3.5 h-3.5" />, text: "Use of external materials is", highlight: "strictly prohibited.", color: "text-red-500" },
                  { icon: <FileText className="w-3.5 h-3.5" />, text: "All operations utilize internal", highlight: "Idea Lab resources." }
                ].map((point, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-500 shrink-0">
                      {point.icon}
                    </div>
                    <p className="text-[11px] sm:text-[12px] font-black uppercase tracking-wider leading-tight text-white/90">
                      {point.text} <br />
                      <span className={`${point.color || 'text-orange-500'} italic text-[12px] sm:text-[13px]`}>{point.highlight}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-full flex items-center">
                <div className="w-full bg-white/[0.03] border border-white/5 p-5 sm:p-6 rounded-3xl flex items-center gap-4 sm:gap-5 relative overflow-hidden">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 shrink-0 border border-orange-500/20">
                    <Clock size={20} className="animate-pulse" />
                  </div>
                  <div className="space-y-1 relative z-10">
                    <p className="font-mono text-[8px] sm:text-[9px] font-black text-white/30 tracking-[0.2em] uppercase">LAB_COORDINATOR</p>
                    <h4 className="text-md sm:text-lg font-black italic tracking-tighter uppercase leading-none">Jithin Joseph</h4>
                    <p className="font-mono text-[10px] sm:text-xs text-orange-500 font-bold tracking-widest">+91 9895221439</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Type Selector */}
          <div className="flex bg-[#0a0a0a] border border-white/5 rounded-2xl p-1.5 w-full sm:w-fit overflow-x-auto no-scrollbar">
            {["3d", "laser"].map(v => (
              <button
                key={v}
                onClick={() => setType(v as any)}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                  type === v ? "bg-orange-600 text-black shadow-lg" : "text-white/30 hover:text-white"
                }`}
              >
                {v === "3d" ? "3D_PRINTING" : "LASER_PRINTING"}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-10 sm:gap-12">
            <section className="lg:col-span-2 space-y-10 sm:space-y-12">
              <div className="grid sm:grid-cols-2 gap-6">
                <ProtocolInput label="FULL NAME" icon={<FileText size={14}/>} onChange={v => setForm({ ...form, name: v })} />
                <ProtocolInput label="E-MAIL ADDR" icon={<FileText size={14}/>} onChange={v => setForm({ ...form, email: v })} />
                <ProtocolInput label="CONTACT NUM" icon={<FileText size={14}/>} onChange={v => setForm({ ...form, contact: v })} />
                {type === "3d" ? (
                  <ProtocolInput label="APPROX WEIGHT (GRAMS)" icon={<Zap size={14}/>} onChange={v => setForm({ ...form, weight: v })} />
                ) : (
                  <ProtocolInput label="APPROX AREA (SQ. FT)" icon={<Zap size={14}/>} onChange={v => setForm({ ...form, area: v })} />
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <ProtocolInput type="date" label="PREFERRED DATE" icon={<Calendar size={14}/>} onChange={v => setForm({ ...form, date: v })} />
                <ProtocolInput type="time" label="PREFERRED TIME" icon={<Clock size={14}/>} onChange={v => setForm({ ...form, time: v })} />
              </div>

              <div className="space-y-6">
                <h3 className="font-mono text-[9px] sm:text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">FILE_UPLOADS</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  <ProtocolUploadBox 
                    label="SLICED MODEL SCREENSHOT" 
                    state={slice} 
                    onFile={f => handleUpload(f, setSlice, uploadToCloudinary)} 
                    preview 
                  />
                  <ProtocolUploadBox 
                    label="DESIGN FILE (STL FORMAT)" 
                    state={stl} 
                    onFile={f => handleUpload(f, setStl, uploadSTL)} 
                  />
                </div>
              </div>
            </section>

            <aside className="space-y-8">
              <div className="bg-[#0a0a0a] border border-orange-500/20 rounded-3xl p-6 sm:p-8 sticky top-24">
                <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/5">
                  <p className="font-mono text-[10px] text-orange-500 font-black tracking-widest uppercase mb-2">ESTIMATED_COST</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black italic tracking-tighter tabular-nums">₹{estimatedCost}</span>
                    <span className="text-white/20 text-xs font-mono">.00</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="font-mono text-[9px] sm:text-[10px] text-white/30 font-black tracking-widest uppercase text-center">SCAN_TO_AUTHORIZE</p>
                  <div className="bg-white p-3 sm:p-4 rounded-2xl flex justify-center">
                    <img src={GPAY_QR_URL} className="w-full max-w-[140px] sm:max-w-[180px] rounded-lg grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <ProtocolUploadBox 
                    label="PAYMENT_CONFIRMATION" 
                    state={payment} 
                    onFile={f => handleUpload(f, setPayment, uploadToCloudinary)} 
                    compact
                  />
                </div>

                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/5 space-y-3">
                  <div className="flex justify-between font-mono text-[8px] sm:text-[9px] font-black text-white/40 tracking-widest">
                    <span>MANIFEST_COMPLETION</span>
                    <span className="text-orange-500">{formProgress}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${formProgress}%` }} 
                      className="h-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]" 
                    />
                  </div>
                </div>

                <button
                  onClick={submit}
                  disabled={formProgress < 100}
                  className="mt-6 sm:mt-8 w-full bg-orange-600 hover:bg-white text-black py-4 sm:py-5 rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] transition-all disabled:opacity-10 shadow-xl shadow-orange-600/10 flex items-center justify-center gap-3 group"
                >
                  SUBMIT REQUEST <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

/* ================= REUSABLE UI COMPONENTS ================= */

function ProtocolInput({ label, onChange, icon, type = "text" }: { label: string; onChange: (v: string) => void; icon: any; type?: string }) {
  return (
    <div className="space-y-2 sm:space-y-3 group">
      <label className="font-mono text-[8px] sm:text-[9px] font-black text-white/30 tracking-widest uppercase group-focus-within:text-orange-500 transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-orange-500 transition-colors">
          {icon}
        </div>
        <input
          type={type}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-4 py-3 sm:py-4 text-[11px] sm:text-xs font-bold tracking-widest focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/5 uppercase"
        />
      </div>
    </div>
  )
}

function ProtocolUploadBox({ label, state, onFile, preview, compact }: { label: string; state: UploadState; onFile: (f: File) => void; preview?: boolean; compact?: boolean }) {
  return (
    <div className={`bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-300 ${state.url ? 'border-emerald-500/20' : ''} ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="font-mono text-[8px] sm:text-[9px] font-black text-white/30 tracking-widest uppercase mb-4">
        {label}
      </div>

      {!state.file ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl py-6 sm:py-8 cursor-pointer hover:border-orange-500/30 hover:bg-orange-500/[0.02] transition-all text-[9px] sm:text-[10px] font-black tracking-widest text-white/20 uppercase group">
          <Upload className="mb-3 text-white/5 group-hover:text-orange-500 transition-colors w-5 h-5 sm:w-6 sm:h-6" />
          SELECT_RESOURCE
          <input type="file" className="hidden" onChange={e => e.target.files && onFile(e.target.files[0])} />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-orange-500">
              {state.progress === 100 ? <CheckCircle2 size={16} /> : <Upload size={16} className="animate-pulse" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] sm:text-[10px] font-black tracking-widest truncate uppercase italic">{state.file.name}</p>
              <p className="text-[8px] font-mono text-white/20">{state.progress}% UPLOAD_COMPLETE</p>
            </div>
          </div>

          {preview && state.url && <img src={state.url} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-white/10 grayscale hover:grayscale-0 transition-all" />}

          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${state.progress}%` }} className="h-full bg-orange-600" />
          </div>

          <label className="block text-[8px] sm:text-[9px] font-black text-orange-500/60 tracking-widest uppercase cursor-pointer hover:text-orange-500 underline underline-offset-4">
            REPLACE_FILE
            <input type="file" className="hidden" onChange={e => e.target.files && onFile(e.target.files[0])} />
          </label>
        </div>
      )}
    </div>
  )
}