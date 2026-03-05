"use client"

import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Fingerprint, Network } from "lucide-react"
import { supabase } from "@/lib/supabase"

/* -------------------- TYPES -------------------- */

type ExecomMember = {
  id: string
  name: string
  designation: string
  role: string | null
  image_url: string | null
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

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
      <section className="relative w-full py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
        
        {/* CONNECTION BRIDGE: Final drop from the Portal Core */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent z-10" />

        {/* Ambient Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-bold tracking-[0.3em] uppercase font-['Outfit']">
                  Lab Administration
                </div>
                <div className="h-px w-12 bg-white/10 hidden sm:block" />
                <span className="text-[10px] font-mono text-neutral-600 tracking-widest uppercase">Verified_Nodes</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-7xl font-[800] font-['Syne'] tracking-tighter uppercase leading-[0.85] text-white">
                Executive <br/>
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
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {members.map((member) => (
              <m.div 
                key={member.id} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-orange-500/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                
                <Card className="relative overflow-hidden bg-neutral-900/40 border border-white/5 backdrop-blur-3xl rounded-[2rem] transition-all duration-500 group-hover:border-orange-500/30">
                  <CardContent className="p-8 space-y-6 relative z-10">
                    
                    {/* ID Chip Top Bar */}
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all duration-500 text-neutral-500">
                        <Fingerprint size={18} />
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-tighter">Auth_Level</p>
                        <p className="text-[10px] font-bold text-orange-500 uppercase font-['Outfit']">Level_01</p>
                      </div>
                    </div>

                    {/* Member Avatar */}
                    <div className="flex justify-center relative">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-neutral-800 group-hover:border-orange-500/50 transition-colors duration-500 ring-8 ring-black/50 shadow-2xl">
                        <img
                          src={member.image_url ?? "/placeholder-avatar.png"}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        />
                      </div>
                      <div className="absolute -bottom-2 bg-orange-500 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest font-['Syne'] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Verified
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold font-['Syne'] text-white leading-none tracking-tight">
                        {member.name}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase font-['Outfit']">
                          {member.designation}
                        </p>
                        {member.role && (
                          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-tighter">
                            &gt; {member.role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tech Footer Decal */}
                    <div className="pt-6 border-t border-white/5 flex justify-center gap-4">
                       <ShieldCheck size={14} className="text-neutral-800 group-hover:text-orange-500/50 transition-colors" />
                       <div className="h-1 w-1 rounded-full bg-neutral-800 mt-1.5" />
                       <div className="h-1 w-1 rounded-full bg-neutral-800 mt-1.5" />
                       <div className="h-1 w-1 rounded-full bg-neutral-800 mt-1.5" />
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
            className="mt-20 flex justify-center"
          >
            <Link href="/execom" prefetch={false}>
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-6 bg-white text-black rounded-2xl text-xs uppercase tracking-[0.25em] font-bold font-['Syne'] overflow-hidden transition-all duration-500 hover:bg-orange-500 hover:text-white border-none"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View All Members
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