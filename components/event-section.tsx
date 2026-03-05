"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { Calendar, MapPin, ArrowRight, CheckCircle, Sparkles, Radio, Activity } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { m, LazyMotion, domAnimation, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"

type Event = {
  id: string
  title: string
  event_type: string | null
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null
  is_featured: boolean
  capacity: number | null
  is_paid: boolean
  price: number | null
}

const EVENT_TYPE_STYLES: Record<string, string> = {
  Workshop: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Hackathon: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Talk: "bg-green-500/10 text-green-400 border-green-500/20",
  Bootcamp: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Competition: "bg-red-500/10 text-red-400 border-red-500/20",
}

/* MAGNETIC WRAPPER WITH SPRING PHYSICS */
function MagneticGridItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High-end spring physics for smooth glow movement
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <m.div onMouseMove={handleMouseMove} className={`group relative h-full ${className}`}>
      <m.div
        className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(249, 115, 22, 0.15), transparent 80%)`
          ),
        }}
      />
      {children}
    </m.div>
  );
}

/* LOADING SKELETON COMPONENT */
const EventSkeleton = () => (
  <div className="flex flex-col h-full rounded-2xl bg-neutral-900/20 border border-white/5 overflow-hidden animate-pulse">
    <div className="h-56 bg-neutral-800/50" />
    <div className="p-7 space-y-4">
      <div className="h-6 w-3/4 bg-neutral-800/50 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-1/2 bg-neutral-800/30 rounded" />
        <div className="h-3 w-1/3 bg-neutral-800/30 rounded" />
      </div>
    </div>
  </div>
);

export function EventSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [registered, setRegistered] = useState<Set<string>>(new Set())
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  const containerRef = useRef(null)
  const now = useMemo(() => new Date(), [])

  /* BACKEND LOGIC (UNTOUCHED) */
  const fetchEvents = async () => {
    setLoading(true)
    const { data: eventsData } = await supabase
      .from("events")
      .select("id, title, event_type, start_datetime, end_datetime, venue, poster_url, is_featured, capacity, is_paid, price")
      .order("display_order", { ascending: true })

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: regs } = await supabase.from("event_registrations").select("event_id").eq("user_id", user.id)
      setRegistered(new Set(regs?.map((r) => r.event_id)))
    } else {
      setRegistered(new Set())
    }

    if (eventsData?.length) {
      const { data: regCounts } = await supabase.from("event_registrations").select("event_id")
      const map: Record<string, number> = {}
      regCounts?.forEach((r) => { map[r.event_id] = (map[r.event_id] || 0) + 1 })
      setCounts(map)
    } else {
      setCounts({})
    }
    setEvents(eventsData ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
    const channel = supabase
      .channel("events-landing-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, fetchEvents)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const upcomingEvents = useMemo(() => events.filter((e) => new Date(e.start_datetime) >= now), [events, now])
  const featuredUpcoming = useMemo(() => upcomingEvents.filter((e) => e.is_featured), [upcomingEvents])
  const nonFeaturedUpcoming = useMemo(() => upcomingEvents.filter((e) => !e.is_featured), [upcomingEvents])
  const featuredEvent = featuredUpcoming[0] ?? null
  const gridEvents = featuredUpcoming.length > 0 ? nonFeaturedUpcoming : upcomingEvents
  const isEnded = (e: Event) => new Date(e.end_datetime) < new Date()
  const isSoldOut = (e: Event) => e.capacity !== null && (counts[e.id] ?? 0) >= e.capacity

  return (
    <LazyMotion features={domAnimation}>
      <section ref={containerRef} className="relative w-full py-32 bg-black overflow-hidden -mt-1">
        
        {/* BRIDGE & VAPOR GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-orange-500 to-transparent opacity-50 hidden md:block" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-orange-500/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-24 flex flex-col items-center text-center">
            <m.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-6">
              <Radio className="text-orange-500 animate-pulse" size={14} />
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-500/70 font-bold font-['Outfit']">Live Event Feed</span>
            </m.div>

            <m.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white font-[800] tracking-tighter" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              The Live Deck
            </m.h2>
            
            <m.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-neutral-500 mt-4 max-w-xl mx-auto font-['Outfit'] font-light text-lg">
              Register for upcoming workshops, hackathons, and sessions directly from the IDEA Lab ecosystem.
            </m.p>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              /* SKELETON GRID WHILE LOADING */
              <m.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3].map((i) => <EventSkeleton key={i} />)}
              </m.div>
            ) : upcomingEvents.length === 0 ? (
              /* EMPTY STATE WITH MAGNETIC HOVER GLOW */
              <MagneticGridItem className="rounded-[2.5rem]">
                <m.div 
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="relative flex flex-col items-center justify-center py-40 px-6 rounded-[2.5rem] border border-white/5 bg-neutral-900/10 backdrop-blur-sm overflow-hidden"
                >
                  {/* LOCAL SCANNING BEAM */}
                  <m.div 
                    className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-0 pointer-events-none"
                    animate={{ top: ["-5%", "105%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.02] to-transparent pointer-events-none" />
                  <div className="relative flex flex-col items-center text-center space-y-8 z-20">
                    <div className="p-5 rounded-full bg-orange-500/5 border border-orange-500/10 ring-8 ring-orange-500/[0.02]">
                      <Activity className="w-10 h-10 text-orange-500/40" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white font-['Syne'] tracking-tight">No Events Currently Live</h3>
                      <p className="text-neutral-500 font-['Outfit'] max-w-xs text-base">
                        Stay tuned for the next wave of innovation.
                      </p>
                    </div>
                  </div>
                </m.div>
              </MagneticGridItem>
            ) : (
              <m.div key="events-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
                {/* FEATURED EVENT */}
                {featuredEvent && (
                  <m.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/20 backdrop-blur-3xl shadow-2xl">
                    <div className="grid lg:grid-cols-2 items-stretch min-h-[450px]">
                      <div className="relative overflow-hidden group">
                        {featuredEvent.poster_url && (
                          <img src={featuredEvent.poster_url} alt={featuredEvent.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-6 left-6 flex gap-2">
                          <span className="px-3 py-1 bg-orange-500 text-black text-[10px] font-bold uppercase tracking-tighter rounded-full flex items-center gap-1">
                            <Sparkles size={10} /> Featured
                          </span>
                        </div>
                      </div>

                      <div className="p-10 lg:p-14 flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                          <h3 className="text-4xl lg:text-5xl font-bold text-white font-['Syne'] leading-[1.1] tracking-tighter">{featuredEvent.title}</h3>
                          <div className="flex flex-wrap gap-6 text-neutral-400 font-['Outfit'] text-sm">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-500" />{new Date(featuredEvent.start_datetime).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                            {featuredEvent.venue && (<div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" />{featuredEvent.venue}</div>)}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 pt-4">
                          <div className={`px-5 py-2 rounded-xl text-xs font-bold font-['Outfit'] border tracking-widest ${featuredEvent.is_paid ? "border-orange-500/30 bg-orange-500/10 text-orange-400" : "border-blue-500/30 bg-blue-500/10 text-blue-400"}`}>
                            {featuredEvent.is_paid ? `INR ${featuredEvent.price}` : "FREE ACCESS"}
                          </div>
                          <Link href={`/events/${featuredEvent.id}`} className="group/btn flex items-center gap-3 px-8 py-3 bg-white text-black rounded-xl font-bold font-['Syne'] text-xs uppercase tracking-widest hover:bg-orange-500 transition-all">
                            Register Now <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {gridEvents.map((event, idx) => {
                    const alreadyRegistered = registered.has(event.id); const ended = isEnded(event); const soldOut = isSoldOut(event);
                    return (
                      <MagneticGridItem key={event.id} className="rounded-2xl">
                        <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group/card relative flex flex-col h-full rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm overflow-hidden hover:border-orange-500/30 transition-all duration-500">
                          <div className="h-56 overflow-hidden relative">
                            {event.poster_url ? <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" /> : <div className="w-full h-full bg-neutral-900" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            {event.event_type && (
                              <div className={`absolute top-4 left-4 text-[9px] px-3 py-1 rounded-lg border backdrop-blur-xl font-bold uppercase tracking-widest ${EVENT_TYPE_STYLES[event.event_type] ?? "bg-neutral-800 text-white border-white/10"}`}>
                                {event.event_type}
                              </div>
                            )}
                          </div>
                          <div className="p-7 flex flex-col flex-grow space-y-5">
                            <h4 className="font-bold text-white font-['Syne'] text-xl leading-snug group-hover/card:text-orange-500 transition-colors">{event.title}</h4>
                            <div className="space-y-3 mt-auto">
                              <div className="flex items-center gap-2.5 text-neutral-400 text-xs font-['Outfit']"><Calendar className="w-4 h-4 text-orange-500/50" />{new Date(event.start_datetime).toLocaleDateString()}</div>
                              {event.venue && (<div className="flex items-center gap-2.5 text-neutral-400 text-xs font-['Outfit']"><MapPin className="w-4 h-4 text-orange-500/50" /><span className="truncate">{event.venue}</span></div>)}
                            </div>
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                              <span className={`text-[11px] font-bold tracking-widest uppercase ${event.is_paid ? 'text-orange-400' : 'text-blue-400'}`}>{event.is_paid ? `₹${event.price}` : "Free"}</span>
                              {alreadyRegistered ? (
                                <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-lg"><CheckCircle size={12} /> Registered</div>
                              ) : ended ? (
                                <span className="text-neutral-600 text-[10px] uppercase font-bold tracking-widest">Ended</span>
                              ) : soldOut ? (
                                <span className="text-red-500/70 text-[10px] uppercase font-bold tracking-widest">Sold Out</span>
                              ) : (
                                <Link href={`/events/${event.id}`} className="flex items-center gap-2 text-white font-bold font-['Syne'] text-[10px] uppercase tracking-[0.2em] hover:text-orange-500 transition-all">Book <ArrowRight size={12} /></Link>
                              )}
                            </div>
                          </div>
                        </m.div>
                      </MagneticGridItem>
                    )
                  })}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-24 flex justify-center">
            <Link href="/events" className="group relative px-10 py-5 bg-transparent overflow-hidden transition-all">
              <div className="absolute inset-0 border border-white/10 group-hover:border-orange-500/50 rounded-2xl transition-all" />
              <div className="relative flex items-center gap-4 text-neutral-300 font-['Syne'] uppercase text-xs tracking-[0.3em] font-bold">
                Access All Lab Events <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}