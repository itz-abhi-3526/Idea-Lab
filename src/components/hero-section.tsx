import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X, Bell, Clock, MapPin, Megaphone } from "lucide-react"
import AuthHeader from "@/components/auth/AuthHeader"
import { Link } from "react-router-dom"
import { useState, useEffect, useRef, useCallback, type RefObject } from "react"
import { supabase } from "@/lib/supabase"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
   HELPERS
───────────────────────────────────────── */
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

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
   RECENTS POPUP
───────────────────────────────────────── */
function RecentsPopup({
  open,
  onClose,
  anchorRef,
}: {
  open: boolean
  onClose: () => void
  // React 19: useRef<T>(null) infers RefObject<T | null> — must include null here
  anchorRef: RefObject<HTMLButtonElement | null>
}) {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [loading, setLoading] = useState(true)
  const popupRef = useRef<HTMLDivElement>(null)

  const fetchHighlights = useCallback(async () => {
    const { data } = await supabase
      .from("highlights")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8)
    if (data) setHighlights(data)
    setLoading(false)
  }, [])

  /* fetch on open */
  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetchHighlights()
  }, [open, fetchHighlights])

  /* realtime — keeps popup fresh without reload */
  useEffect(() => {
    const channel = supabase
      .channel("recents-popup-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "highlights" }, fetchHighlights)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [fetchHighlights])

  /* close on outside click */
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, onClose, anchorRef])

  /* close on Escape */
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="rp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[105] bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            key="rp-panel"
            ref={popupRef}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[110] top-[76px] right-4 sm:right-8 w-[calc(100vw-2rem)] max-w-[420px] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-black/60">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/60">
                  Recents &amp; Highlights
                </span>
              </div>
              <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1 rounded-md hover:bg-white/8" aria-label="Close">
                <X size={14} />
              </button>
            </div>

            {/* body */}
            <div className="overflow-y-auto max-h-[min(520px,70dvh)] overscroll-contain">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14">
                  <div className="w-5 h-5 border-t-2 border-orange-500 rounded-full animate-spin" />
                  <span className="text-[9px] font-mono text-white/20 tracking-[0.3em] uppercase">Fetching…</span>
                </div>
              ) : highlights.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
                  <Bell size={22} className="text-white/10" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/20">No highlights yet</p>
                  <p className="text-[10px] text-white/15 font-mono">Check back soon for announcements &amp; events.</p>
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {highlights.map((h, i) => (
                    <motion.li
                      key={h.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-3.5 px-5 py-4 hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className={`flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center ${h.type === "announcement" ? "bg-orange-600/15 text-orange-500" : "bg-white/6 text-white/30"}`}>
                        {h.type === "announcement" ? <Megaphone size={12} /> : <Clock size={12} />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-sm ${h.type === "announcement" ? "bg-orange-600/20 text-orange-500" : "bg-white/6 text-white/35"}`}>
                            {h.type}
                          </span>
                          <span className="text-[9px] font-mono text-white/20">{timeAgo(h.created_at)}</span>
                          {h.location && (
                            <span className="flex items-center gap-1 text-[9px] font-mono text-orange-600/50">
                              <MapPin size={8} />{h.location}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] font-bold text-white/85 leading-snug tracking-tight mb-1 line-clamp-2 group-hover:text-white transition-colors">{h.title}</p>
                        <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2 font-light">{h.content}</p>
                        {h.event_date && (
                          <span className="block mt-2 text-[9px] font-mono text-orange-500/60 uppercase tracking-wider">
                            {new Date(h.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>

                      {h.image_url && (
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-white/8 self-center">
                          <img src={h.image_url} alt="" className="w-full h-full object-cover grayscale brightness-50 contrast-110 group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* footer */}
            {!loading && highlights.length > 0 && (
              <div className="px-5 py-3 border-t border-white/8 bg-black/40 flex items-center justify-between">
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{highlights.length} update{highlights.length !== 1 ? "s" : ""}</span>
                <span className="text-[9px] font-mono text-white/15 italic">// FISAT IDEA Lab</span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────
   SMOOTH SCROLL — unchanged
───────────────────────────────────────── */
const handleSmoothScroll = (id: string) => {
  const targetId = id.toLowerCase()
  const element = document.getElementById(targetId)
  if (element) {
    const bodyRect    = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const offsetPosition = (elementRect - bodyRect) - 80
    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    setTimeout(() => window.scrollTo({ top: offsetPosition, behavior: "smooth" }), 50)
  }
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [isScrolled,  setIsScrolled]  = useState(false)
  const [isOpen,      setIsOpen]      = useState(false)
  const [recentsOpen, setRecentsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState<number | null>(null)

  // Single ref on the DESKTOP button only — mobile button is independent
  // Type: RefObject<HTMLButtonElement | null>  (React 19 strict inference)
  const recentsAnchorRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* badge count — realtime */
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("highlights")
        .select("id", { count: "exact", head: true })
      setUnreadCount(typeof count === "number" && count > 0 ? count : null)
    }
    fetchCount()
    const channel = supabase
      .channel("recents-badge-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "highlights" }, fetchCount)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const handleMobileToggle  = () => { setIsOpen(v => !v);      setRecentsOpen(false) }
  const handleRecentsToggle = () => { setRecentsOpen(v => !v); setIsOpen(false) }

  const navLinks = [
    { name: "HOME",      id: "home"      },
    { name: "ABOUT",     id: "about"     },
    { name: "EVENTS",    id: "events"    },
    { name: "MACHINERY", id: "machinery" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-8 py-4"
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3 rounded-2xl border transition-all duration-500 ${
          isScrolled ? "bg-black/80 border-white/10 backdrop-blur-md shadow-2xl" : "bg-transparent border-transparent"
        }`}>

          {/* wordmark — unchanged */}
          <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0 z-[110]">
            <span className="text-[9px] sm:text-[10px] font-bold font-['Syne'] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-neutral-400 whitespace-nowrap">
              WHERE IDEAS <span className="text-orange-500">EVOLVE</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) =>
  link.id === "machinery" ? (
    <Link
      key={link.name}
      to="/machinery"
      className="text-[10px] font-bold font-['Syne'] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
    >
      {link.name}
    </Link>
  ) : (
    <button
      key={link.name}
      onClick={() => handleSmoothScroll(link.id)}
      className="text-[10px] font-bold font-['Syne'] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer"
    >
      {link.name}
    </button>
  )
)}

            {/* RECENTS — desktop, holds the ref for outside-click detection */}
            <button
              ref={recentsAnchorRef}
              onClick={handleRecentsToggle}
              className={`relative flex items-center gap-1.5 text-[10px] font-bold font-['Syne'] uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                recentsOpen ? "text-orange-500" : "text-neutral-400 hover:text-orange-400"
              }`}
            >
              <Bell size={12} className={recentsOpen ? "text-orange-500" : ""} />
              RECENTS
              {unreadCount && !recentsOpen && (
                <span className="absolute -top-1.5 -right-2.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-600 text-[7px] font-black text-black">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* MORE dropdown — unchanged */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[10px] font-black font-['Syne'] uppercase tracking-[0.3em] text-neutral-400 outline-none hover:text-orange-500 transition-colors">
                MORE <ChevronDown size={14} className="text-orange-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 border-white/10 backdrop-blur-2xl rounded-2xl p-2 min-w-[180px] shadow-2xl z-[110]">
                <DropdownMenuItem className="focus:bg-orange-500/10 focus:text-orange-500 rounded-lg cursor-pointer" onClick={() => handleSmoothScroll("incubation")}>
                  <span className="w-full font-bold uppercase tracking-widest text-[10px] py-2">INCUBATION</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* RIGHT — mobile bell + auth + hamburger */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

            {/* RECENTS mobile — standalone button, NO ref (avoids the dual-ref problem entirely) */}
            <button
              onClick={handleRecentsToggle}
              className="md:hidden relative text-neutral-400 hover:text-orange-400 transition-colors p-1 z-[110]"
              aria-label="Recents"
            >
              <Bell size={18} className={recentsOpen ? "text-orange-500" : ""} />
              {unreadCount && !recentsOpen && (
                <span className="absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-orange-600 text-[6px] font-black text-black">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            <AuthHeader />

            <button onClick={handleMobileToggle} className="md:hidden text-white p-1 z-[110] hover:bg-white/10 rounded-lg transition-colors">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU — unchanged */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 bg-black/95 border border-white/10 backdrop-blur-3xl rounded-3xl overflow-hidden md:hidden z-[100] shadow-2xl"
            >
              <div className="p-8 flex flex-col gap-6 items-center">
                {navLinks.map((link) =>
  link.id === "machinery" ? (
    <Link
      key={link.name}
      to="/machinery"
      onClick={() => setIsOpen(false)}
      className="text-[12px] font-bold font-['Syne'] uppercase tracking-[0.4em] text-neutral-400 hover:text-orange-500"
    >
      {link.name}
    </Link>
  ) : (
    <button
      key={link.name}
      onClick={() => { handleSmoothScroll(link.id); setIsOpen(false) }}
      className="text-[12px] font-bold font-['Syne'] uppercase tracking-[0.4em] text-neutral-400 hover:text-orange-500"
    >
      {link.name}
    </button>
  )
)}
                <Link to="/execom" onClick={() => setIsOpen(false)}
                  className="text-[12px] font-bold font-['Syne'] uppercase tracking-[0.4em] text-neutral-400 hover:text-orange-500">
                  EXECOM
                </Link>
                <button onClick={() => { handleSmoothScroll("incubation"); setIsOpen(false) }}
                  className="text-[12px] font-bold font-['Syne'] uppercase tracking-[0.4em] text-orange-500">
                  INCUBATION
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* RECENTS POPUP — outside nav to avoid overflow clipping */}
      <RecentsPopup
        open={recentsOpen}
        onClose={() => setRecentsOpen(false)}
        anchorRef={recentsAnchorRef}
      />
    </>
  )
}

/* ─────────────────────────────────────────
   HERO SECTION — completely unchanged
───────────────────────────────────────── */
export function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageOpacity   = useTransform(scrollYProgress, [0, 0.8], [0.7, 0])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageScale     = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black isolate py-20">
      <Navbar />

      <motion.div style={{ opacity: imageOpacity, scale: imageScale }} className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766227263/WhatsApp_Image_2025-12-20_at_2.14.36_PM_ggg2fo.jpg"
          className="w-full h-full object-cover brightness-[0.7] saturate-[0.8]"
          alt="Lab Background"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 sm:mb-8">
            <img
              src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766672158/IDEA_LAB_LOGO_high_n9bjgo.png"
              className="h-16 sm:h-24 md:h-28 w-auto brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              alt="IDEA LAB LOGO"
            />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[8px] sm:text-[11px] font-mono font-black text-orange-500 uppercase tracking-[0.6em] sm:tracking-[1.2em] mb-3 sm:mb-4">
              WELCOME TO
            </p>
            <h2 className="text-[clamp(1rem,4vw,3.2rem)] font-black font-['Syne'] tracking-[0.05em] uppercase leading-none text-neutral-400 mb-2">
              FISAT AICTE
            </h2>
            <div className="relative inline-block px-4">
              <h1 className="text-[clamp(2.2rem,10vw,8.5rem)] font-black font-['Syne'] tracking-[-0.03em] uppercase leading-[1.1] bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-sm">
                IDEA LAB
              </h1>
            </div>
            <div className="mt-6 sm:mt-8 opacity-60">
              <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-10 sm:mt-14 w-full max-w-md px-4">
            <Link to="/products" className="w-full sm:flex-1">
              <Button className="h-10 sm:h-12 w-full bg-white text-black hover:bg-orange-600 hover:text-white font-black font-['Syne'] uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all rounded-none text-[8px] sm:text-[10px] border-none group">
                Explore our Creations <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/consultancy" className="w-full sm:flex-1">
              <Button variant="outline" onClick={() => handleSmoothScroll("events")}
                className="h-10 sm:h-12 w-full sm:flex-1 border-white/20 bg-black/40 text-white hover:border-white font-black font-['Syne'] uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none text-[8px] sm:text-[10px] backdrop-blur-md transition-all">
                Get Expert Guidance
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-12 sm:h-20 bg-gradient-to-t from-orange-500/40 to-transparent z-30" />
    </section>
  )
}
