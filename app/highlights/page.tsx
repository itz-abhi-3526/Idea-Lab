"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type Highlight = {
  id: string
  title: string
  content: string
  type: "event" | "announcement"
  event_date: string | null
  location: string | null
  image_url: string | null
  created_at: string
}

/* ─────────────────────────────────────────
   FONTS & HELPERS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "hl-fonts"
    if (typeof document === 'undefined' || document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id; l.rel = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Azeret+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const MONTHS_LONG  = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAYS_LONG    = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function timeAgo(iso: string) {
  const diff  = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  const d = new Date(iso)
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`
}

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */
function LiveTicker({ highlights }: { highlights: Highlight[] }) {
  const titles = highlights.length > 0 ? highlights.map(h => h.title) : ["Connecting to Lab Data Stream..."]
  const repeated = [...titles, ...titles, ...titles]

  return (
    <div className="fixed top-0 left-0 w-full h-9 bg-orange-600 z-[100] flex items-center overflow-hidden border-b border-black/10">
      <div className="flex-shrink-0 px-4 h-full bg-orange-600 flex items-center gap-2 border-r border-black/20 z-10 shadow-xl">
        <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black">Live</span>
      </div>
      <div className="flex-1 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-ticker-scroll pl-[100%]">
          {repeated.map((t, i) => (
            <span key={i} className="font-mono text-[10px] font-bold text-black mx-6 uppercase tracking-wider">
              — {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Masthead({ highlights }: { highlights: Highlight[] }) {
  const today = new Date()
  return (
    <header className="border-b-4 border-white/90 pb-6 mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
        <span>{DAYS_LONG[today.getDay()]}, {MONTHS_LONG[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</span>
        <div className="flex items-center gap-2 text-orange-500">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse" />
          <span>Realtime Laboratory Updates</span>
        </div>
        <span>Vol. {today.getFullYear() % 100} / Ed. {highlights.length}</span>
      </div>
      
      <div className="text-center relative py-4">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
        <h1 className="relative inline-block bg-black px-4 sm:px-10 font-serif font-black italic text-4xl sm:text-7xl md:text-8xl tracking-tighter text-white leading-none">
          IDEA Lab <br className="sm:hidden" /> Bulletin
        </h1>
      </div>
      <p className="text-center font-serif italic text-xs text-white/30 mt-4 tracking-widest uppercase">
        · Peer Reviewed Innovations · Published by FISAT AICTE ·
      </p>
    </header>
  )
}

function MainStory({ item }: { item: Highlight }) {
  if (!item) return null
  return (
    <article className="mb-16 border-b border-white/10 pb-12 animate-rise-in">
      {item.image_url && (
        <div className="aspect-[16/9] overflow-hidden mb-8 rounded-sm">
          <img src={item.image_url} alt="" className="w-full h-full object-cover grayscale brightness-75 contrast-125 hover:grayscale-0 transition-all duration-700" />
        </div>
      )}
      <div className="flex items-center gap-3 mb-6">
        <span className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm ${item.type === 'announcement' ? 'bg-orange-600 text-black' : 'bg-white/10 text-white'}`}>
          {item.type}
        </span>
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{timeAgo(item.created_at)}</span>
      </div>
      <h2 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-white leading-[0.95] tracking-tighter mb-6 max-w-4xl italic">
        {item.title}
      </h2>
      <p className="font-serif text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl">
        {item.content}
      </p>
    </article>
  )
}

function RegularStory({ item, index }: { item: Highlight; index: number }) {
  return (
    <article 
      className="relative pl-8 mb-12 border-b border-white/5 pb-12 opacity-0 animate-rise-in" 
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div className={`absolute left-0 top-0 bottom-12 w-0.5 rounded-full ${item.type === 'announcement' ? 'bg-orange-600' : 'bg-white/20'}`} />
      <div className="flex flex-wrap items-center gap-3 mb-4 text-[9px] font-mono uppercase tracking-widest">
        <span className={item.type === 'announcement' ? 'text-orange-500' : 'text-white/40'}>{item.type}</span>
        <span className="text-white/10">/</span>
        <span className="text-white/20">{timeAgo(item.created_at)}</span>
        {item.location && <span className="text-orange-600/50">@ {item.location}</span>}
      </div>
      <div className="grid md:grid-cols-[1fr_200px] gap-8 items-start">
        <div>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight mb-4 leading-tight">
            {item.title}
          </h3>
          <p className="font-serif text-sm text-white/40 leading-relaxed line-clamp-3">
            {item.content}
          </p>
        </div>
        {item.image_url && (
          <div className="hidden md:block aspect-square overflow-hidden rounded-sm border border-white/5">
            <img src={item.image_url} alt="" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
          </div>
        )}
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function HighlightsPage() {
  useFonts()
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHighlights()
    const channel = supabase.channel("highlights-live").on("postgres_changes", { event: "*", schema: "public", table: "highlights" }, () => fetchHighlights()).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function fetchHighlights() {
    const { data } = await supabase.from("highlights").select("*").order("created_at", { ascending: false })
    if (data) setHighlights(data)
    setLoading(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-t-2 border-orange-600 rounded-full animate-spin" />
      <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">Fetching Archives...</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-orange-600 selection:text-black">
      <style>{`
        @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @keyframes rise-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-ticker-scroll { animation: ticker-scroll 40s linear infinite; }
        .animate-rise-in { animation: rise-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Static Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[1000] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <LiveTicker highlights={highlights} />

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-32">
        <Masthead highlights={highlights} />

        {highlights.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="font-serif italic text-3xl text-white/10 tracking-widest uppercase">Registry Empty</h2>
            <div className="w-px h-24 bg-gradient-to-b from-orange-600 to-transparent mx-auto mt-8" />
          </div>
        ) : (
          <>
            <MainStory item={highlights[0]} />
            <div className="mt-20">
              <div className="flex items-center gap-4 mb-12 border-t border-white/10 pt-12">
                <span className="font-mono text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Classified_Archives</span>
              </div>
              {highlights.slice(1).map((item, i) => (
                <RegularStory key={item.id} item={item} index={i} />
              ))}
            </div>
          </>
        )}

        <footer className="mt-24 pt-12 border-t-[3px] border-double border-white/10 text-center">
          <p className="font-serif italic text-sm text-white/20 tracking-widest uppercase">
            // End of Line · FISAT IDEA Lab Intelligence · Updates in Realtime
          </p>
        </footer>
      </main>
    </div>
  )
}