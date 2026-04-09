
import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowRight, Fingerprint, Network, ShieldCheck } from "lucide-react"
import { supabase } from "@/lib/supabase"

/* -------------------- TYPES -------------------- */

type ExecomMember = {
  id: string
  name: string
  designation: string
  role: string | null
  image_url: string | null
}

/* -------------------- COMPONENT -------------------- */

export function ExecomSection() {
  const [members, setMembers] = useState<ExecomMember[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExecom = async () => {
    const { data, error } = await supabase
      .from("execom_members")
      .select("id, name, designation, role, image_url")
      .order("display_order", { ascending: true })
      .limit(6)

    if (!error && data) setMembers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchExecom()
    const channel = supabase
      .channel("execom-section-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "execom_members" }, fetchExecom)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  if (loading || members.length === 0) return null

  return (
    <LazyMotion features={domAnimation}>
      <section id="execom" className="relative w-full py-16 sm:py-24 md:py-32 bg-black overflow-hidden border-t border-white/5">
        
        {/* CONNECTION BRIDGE */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent z-10" />

        {/* Ambient Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-20">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase font-['Outfit']">
                  Lab Administration
                </div>
                <div className="h-px w-8 sm:w-12 bg-white/10 hidden sm:block" />
                <span className="text-[8px] sm:text-[10px] font-mono text-neutral-600 tracking-widest uppercase hidden sm:inline">Verified_Nodes</span>
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-['Syne'] tracking-tighter uppercase leading-[0.9] text-white">
                Executive <br className="hidden sm:block"/>
                <span className="text-neutral-800 font-black">Committee</span>
              </h2>
            </m.div>

            <m.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="hidden lg:flex items-center gap-4 text-neutral-500 font-mono text-[10px]"
            >
              <Network size={16} className="text-orange-500/50" />
              <span className="tracking-tighter uppercase">Protocol: LEADERSHIP_HUB_V1</span>
            </m.div>
          </div>

          {/* Cards Grid */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {members.map((member) => (
              <m.div 
                key={member.id} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="group relative"
              >
                {/* Mobile Glow Optimized */}
                <div className="absolute inset-0 bg-orange-500/10 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                <Card className="relative h-full overflow-hidden bg-neutral-900/40 border border-white/5 backdrop-blur-3xl rounded-[2rem] transition-all duration-500 group-hover:border-orange-500/30">
                  <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8 relative z-10 flex flex-col h-full">
                    
                    {/* ID Chip Top Bar */}
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all duration-500 text-neutral-500">
                        <Fingerprint size={18} />
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-mono text-neutral-600 uppercase tracking-tighter">Auth_Level</p>
                        <p className="text-[10px] font-bold text-orange-500 uppercase font-['Outfit']">Level_01</p>
                      </div>
                    </div>

                    {/* Member Avatar */}
                    <div className="flex justify-center relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-neutral-800 group-hover:border-orange-500/50 transition-colors duration-500 ring-4 sm:ring-8 ring-black/50 shadow-2xl bg-neutral-900">
                        <img
                          src={member.image_url ?? "/placeholder-avatar.png"}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        />
                      </div>
                      <div className="absolute -bottom-1 sm: -bottom-2 bg-orange-500 text-black px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest font-['Syne'] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                        Verified
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center space-y-3 flex-grow">
                      <h3 className="text-lg sm:text-xl font-black font-['Syne'] text-white leading-tight tracking-tight">
                        {member.name}
                      </h3>
                      <div className="space-y-1.5">
                        <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-orange-500 uppercase font-['Outfit']">
                          {member.designation}
                        </p>
                        {member.role && (
                          <p className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-tighter">
                            &gt; {member.role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tech Footer Decal */}
                    <div className="pt-6 border-t border-white/5 flex justify-center items-center gap-3 sm:gap-4 mt-auto">
                       <ShieldCheck size={14} className="text-neutral-800 group-hover:text-orange-500/50 transition-colors" />
                       <div className="flex gap-1.5">
                         <div className="h-1 w-1 rounded-full bg-neutral-800 group-hover:bg-orange-500/50 transition-colors" />
                         <div className="h-1 w-1 rounded-full bg-neutral-800 group-hover:bg-orange-500/50 transition-colors" />
                         <div className="h-1 w-1 rounded-full bg-neutral-800 group-hover:bg-orange-500/50 transition-colors" />
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </m.div>

          {/* CTA Hub */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-20 flex justify-center px-4"
          >
            <Link to="/execom" className="w-full sm:w-auto">
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 bg-white text-black rounded-2xl text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-black font-['Syne'] overflow-hidden transition-all duration-500 hover:bg-orange-600 hover:text-white"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  View Full Registry
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </m.button>
            </Link>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  )
}
