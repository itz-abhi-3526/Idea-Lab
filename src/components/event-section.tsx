
import { useEffect, useMemo, useState, useRef } from "react"
import { Calendar, MapPin, ArrowRight, CheckCircle, Sparkles, Radio, Activity } from "lucide-react"
import { Link } from "react-router-dom"
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

/* MAGNETIC WRAPPER */
function MagneticGridItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    <m.div onMouseMove={handleMouseMove} className={`group relative h-full ${className}`}>
      <m.div
        className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 hidden md:block"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(249, 115, 22, 0.12), transparent 80%)`
          ),
        }}
      />
      {children}
    </m.div>
  );
}

const EventSkeleton = () => (
  <div className="flex flex-col h-full rounded-2xl bg-neutral-900/20 border border-white/5 overflow-hidden animate-pulse">
    <div className="h-48 sm:h-56 bg-neutral-800/50" />
    <div className="p-5 sm:p-7 space-y-4">
      <div className="h-6 w-3/4 bg-neutral-800/50 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-1/2 bg-neutral-800/30 rounded" />
      </div>
    </div>
  </div>
);

export function EventSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [registered, setRegistered] = useState<Set<string>>(new Set())
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const now = useMemo(() => new Date(), [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data: eventsData } = await supabase.from("events").select("*").order("display_order", { ascending: true })
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: regs } = await supabase.from("event_registrations").select("event_id").eq("user_id", user.id)
      setRegistered(new Set(regs?.map((r) => r.event_id)))
    }

    if (eventsData?.length) {
      const { data: regCounts } = await supabase.from("event_registrations").select("event_id")
      const map: Record<string, number> = {}
      regCounts?.forEach((r) => { map[r.event_id] = (map[r.event_id] || 0) + 1 })
      setCounts(map)
    }
    setEvents(eventsData ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
    const channel = supabase.channel("events-landing-realtime").on("postgres_changes", { event: "*", schema: "public", table: "events" }, fetchEvents).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const upcomingEvents = useMemo(() => events.filter((e) => new Date(e.start_datetime) >= now), [events, now])
  const featuredEvent = useMemo(() => upcomingEvents.find((e) => e.is_featured) ?? null, [upcomingEvents])
  const gridEvents = useMemo(() => upcomingEvents.filter((e) => e.id !== featuredEvent?.id), [upcomingEvents, featuredEvent])

  const isEnded = (e: Event) => new Date(e.end_datetime) < new Date()
  const isSoldOut = (e: Event) => e.capacity !== null && (counts[e.id] ?? 0) >= e.capacity

  return (
    <LazyMotion features={domAnimation}>
      <section id="events" className="relative w-full py-16 sm:py-32 bg-black overflow-hidden border-t border-white/5">
        
        {/* LIGHTING EFFECTS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 sm:h-32 bg-gradient-to-b from-orange-500 to-transparent opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] sm:h-[600px] bg-orange-500/[0.02] blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="mb-12 sm:mb-24 flex flex-col items-center text-center">
            <m.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-4 sm:mb-6">
              <Radio className="text-orange-500 animate-pulse" size={12} />
              <span className="text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-orange-500/70 font-black font-['Outfit']">Live Event Feed</span>
            </m.div>

            <m.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white font-black tracking-tighter" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
              The Live Deck
            </m.h2>
            
            <m.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-neutral-500 mt-4 max-w-lg mx-auto font-['Outfit'] font-light text-sm sm:text-lg leading-relaxed">
              Real-time access to workshops and innovation sessions.
            </m.p>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <m.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                {[1, 2, 3].map((i) => <EventSkeleton key={i} />)}
              </m.div>
            ) : upcomingEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 sm:py-40 border border-white/5 bg-neutral-900/10 rounded-[2rem] text-center">
                <Activity className="w-12 h-12 text-orange-500/20 mb-6" />
                <h3 className="text-xl font-bold text-white font-['Syne']">Scanning for Uplinks...</h3>
                <p className="text-neutral-500 mt-2 text-sm">No live events detected in current sector.</p>
              </div>
            ) : (
              <m.div key="events-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 sm:space-y-24">
                
                {/* FEATURED CARD */}
                {featuredEvent && (
                  <m.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="group relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/20 backdrop-blur-3xl shadow-2xl">
                    <div className="flex flex-col lg:flex-row min-h-[400px]">
                      <div className="relative h-64 lg:h-auto lg:w-1/2 overflow-hidden">
                        {featuredEvent.poster_url && (
                          <img src={featuredEvent.poster_url} alt={featuredEvent.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/30 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <span className="px-3 py-1 bg-orange-500 text-black text-[9px] font-black uppercase tracking-tighter rounded-full flex items-center gap-1">
                            <Sparkles size={10} /> Featured
                          </span>
                        </div>
                      </div>

                      <div className="p-8 sm:p-12 lg:w-1/2 flex flex-col justify-center">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Syne'] leading-tight tracking-tighter mb-6">{featuredEvent.title}</h3>
                        
                        <div className="space-y-3 mb-10">
                          <div className="flex items-center gap-3 text-neutral-400 font-['Outfit'] text-sm">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            {new Date(featuredEvent.start_datetime).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}
                          </div>
                          {featuredEvent.venue && (
                            <div className="flex items-center gap-3 text-neutral-400 font-['Outfit'] text-sm">
                              <MapPin className="w-4 h-4 text-orange-500" />
                              <span className="truncate">{featuredEvent.venue}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          <div className={`px-4 py-2 rounded-xl text-[10px] font-bold font-['Outfit'] border text-center tracking-widest ${featuredEvent.is_paid ? "border-orange-500/30 bg-orange-500/10 text-orange-400" : "border-blue-500/30 bg-blue-500/10 text-blue-400"}`}>
                            {featuredEvent.is_paid ? `INR ${featuredEvent.price}` : "FREE ACCESS"}
                          </div>
                          <Link to={`/events/${featuredEvent.id}`} className="flex items-center justify-center gap-3 px-8 py-3 bg-white text-black rounded-xl font-black font-['Syne'] text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all">
                            Initialize Registration <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}

                {/* EVENT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                  {gridEvents.map((event, idx) => {
                    const alreadyReg = registered.has(event.id);
                    return (
                      <MagneticGridItem key={event.id} className="rounded-2xl">
                        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group/card relative flex flex-col h-full rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm overflow-hidden hover:border-orange-500/30 transition-all duration-500">
                          <div className="h-48 sm:h-56 overflow-hidden relative">
                            {event.poster_url ? <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" /> : <div className="w-full h-full bg-neutral-900" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            {event.event_type && (
                              <div className={`absolute top-4 left-4 text-[8px] px-2.5 py-1 rounded-md border backdrop-blur-xl font-black uppercase tracking-widest ${EVENT_TYPE_STYLES[event.event_type] ?? "bg-neutral-800 text-white border-white/10"}`}>
                                {event.event_type}
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <h4 className="font-bold text-white font-['Syne'] text-lg sm:text-xl leading-tight group-hover/card:text-orange-500 transition-colors mb-6">{event.title}</h4>
                            
                            <div className="space-y-2 mb-8 mt-auto">
                              <div className="flex items-center gap-2.5 text-neutral-400 text-[10px] font-['Outfit']"><Calendar size={14} className="text-orange-500/40" />{new Date(event.start_datetime).toLocaleDateString()}</div>
                              {event.venue && <div className="flex items-center gap-2.5 text-neutral-400 text-[10px] font-['Outfit']"><MapPin size={14} className="text-orange-500/40" /><span className="truncate">{event.venue}</span></div>}
                            </div>

                            <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                              <span className={`text-[10px] font-black tracking-widest uppercase ${event.is_paid ? 'text-orange-400' : 'text-blue-400'}`}>{event.is_paid ? `₹${event.price}` : "Free"}</span>
                              {alreadyReg ? (
                                <div className="text-green-400 text-[9px] font-black uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-md flex items-center gap-1.5"><CheckCircle size={10} /> Active</div>
                              ) : isEnded(event) ? (
                                <span className="text-neutral-600 text-[9px] uppercase font-black tracking-widest">Archive</span>
                              ) : isSoldOut(event) ? (
                                <span className="text-red-500/50 text-[9px] uppercase font-black tracking-widest">Full</span>
                              ) : (
                                <Link to={`/events/${event.id}`} className="text-white font-black font-['Syne'] text-[9px] uppercase tracking-[0.2em] hover:text-orange-500 transition-all flex items-center gap-1.5">Register <ArrowRight size={10} /></Link>
                              )}
                            </div>
                          </div>
                        </m.div>
                      </MagneticGridItem>
                    );
                  })}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-16 sm:mt-24 flex justify-center">
            <Link to="/events" className="group flex items-center gap-4 px-8 py-4 border border-white/10 rounded-2xl text-neutral-400 font-['Syne'] uppercase text-[10px] tracking-[0.3em] font-bold hover:border-orange-500/50 hover:text-white transition-all">
              Protocol: View All <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
