"use client"

import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { ArrowRight, Cpu, Zap } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

/* ----------------------------- */
/* Types & Helpers               */
/* ----------------------------- */

type InventoryItem = {
  id: string
  name: string
  category: string
  quantity_available: number
}

type Availability = "Available" | "Limited" | "Unavailable"

const availabilityStyles: Record<Availability, string> = {
  Available: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Limited: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Unavailable: "bg-rose-500/10 text-rose-400 border-rose-500/20",
}

function getAvailability(qty: number): Availability {
  if (qty === 0) return "Unavailable"
  if (qty < 10) return "Limited"
  return "Available"
}

/* ----------------------------- */
/* Component                     */
/* ----------------------------- */

export function InventorySection() {
  const router = useRouter()
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInventory = async () => {
      const { data, error } = await supabase
        .from("inventory_items")
        .select("id, name, category, quantity_available")
        .eq("is_active", true)
        .order("name")
        .limit(4)

      if (error) {
        console.error("Inventory fetch error:", error)
        return
      }

      if (data) setItems(data)
      setLoading(false)
    }

    fetchInventory()
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <section id="inventory" className="relative w-full py-16 sm:py-32 bg-black overflow-hidden border-t border-white/5">
        
        {/* CONNECTION BRIDGE */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent z-0">
          <m.div 
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full blur-[1px]"
          />
        </div>

        {/* Ambient Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-20">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase font-['Outfit']">
                  Live Resource Database
                </div>
                <div className="h-px w-8 sm:w-12 bg-white/10 hidden sm:block" />
                <span className="text-[8px] sm:text-[10px] font-mono text-neutral-600 tracking-widest uppercase hidden sm:inline">Sync_Active</span>
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-['Syne'] tracking-tighter uppercase leading-[0.9] text-white">
                Lab <br className="hidden sm:block"/>
                <span className="text-neutral-800 font-black">Inventory</span>
              </h2>
            </m.div>

            <m.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="bg-neutral-900/50 border border-white/5 p-4 rounded-2xl hidden lg:block"
            >
               <div className="font-mono text-[9px] text-neutral-500 tracking-tighter leading-relaxed">
                 [SYSTEM_REPORT]<br/>
                 &gt; DATABASE_QUERY: SUCCESS<br/>
                 &gt; ASSETS_LOCATED: TRUE<br/>
                 &gt; TERMINAL: FISAT_IDEA_LAB
               </div>
            </m.div>
          </div>

          {/* Grid Items */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 rounded-[2.5rem] bg-neutral-900/20 border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {items.map((item) => {
                const availability = getAvailability(item.quantity_available)
                return (
                  <m.div
                    key={item.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -8 }}
                    className="group relative p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-neutral-900/30 border border-white/5 backdrop-blur-3xl transition-all duration-500 hover:border-orange-500/30"
                  >
                    <div className="space-y-4 sm:space-y-6 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500 text-orange-500">
                        <Cpu size={18} />
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-black font-['Syne'] text-white leading-tight min-h-[3rem] sm:min-h-[3.5rem]">
                          {item.name}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-neutral-600 uppercase mt-2 font-['Outfit']">
                          {item.category}
                        </p>
                      </div>

                      <div className="pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full border ${availabilityStyles[availability]}`}>
                          {availability}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 font-bold">
                          QTY:{item.quantity_available.toString().padStart(3, '0')}
                        </span>
                      </div>
                    </div>
                  </m.div>
                )
              })}
            </m.div>
          )}

          {/* Action Row */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-20 px-4"
          >
            <Button
              onClick={() => router.push("/inventory")}
              className="w-full sm:w-auto bg-white text-black hover:bg-orange-600 hover:text-white transition-all duration-500 rounded-2xl px-8 sm:px-10 py-6 sm:py-7 h-auto text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black font-['Syne'] shadow-2xl group border-none"
            >
              Access Resource Hub
              <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/machinery")}
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-6 sm:py-7 bg-black text-white rounded-2xl text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black font-['Syne'] border border-white/10 transition-all duration-500 hover:border-orange-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Lab Machinery
                <Zap size={14} className="text-orange-500" />
              </span>
            </m.button>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}