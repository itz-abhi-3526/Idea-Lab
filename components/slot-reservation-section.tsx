"use client"

import { LazyMotion, domAnimation, m } from "framer-motion"
import { CheckCircle, ExternalLink, CalendarDays, ScanLine, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  {
    icon: CheckCircle,
    title: "Mandatory Access Control",
    description: "Slot reservation is required for all FISAT students before entry.",
  },
  {
    icon: Clock,
    title: "Approved Timeframes",
    description: "Access is granted strictly during your confirmed reservation window.",
  },
  {
    icon: CalendarDays,
    title: "Asset Accountability",
    description: "Users are responsible for equipment maintenance during their slot.",
  },
]

export function SlotReservationSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-20 bg-black overflow-hidden">
        
        {/* SECTION CONNECTOR BRIDGE - This makes it flow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent z-0">
          <m.div 
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 -translate-x-1/2 w-1 h-4 bg-orange-500 blur-[2px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden bg-neutral-900/30 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 sm:p-12 md:p-16 shadow-2xl"
          >
            {/* Ambient leak from the top to blend the sections */}
            <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-64 bg-orange-500/[0.07] blur-[120px] pointer-events-none" />

            <div className="grid lg:grid-cols-5 gap-12 items-start relative z-10">
              
              {/* LEFT: TEXT CONTENT */}
              <div className="lg:col-span-3 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-bold tracking-[0.3em] uppercase font-['Outfit']">
                    Protocol: LAB-ACCESS-01
                  </div>
                  
                  <h3 className="text-4xl sm:text-5xl font-[800] font-['Syne'] tracking-tighter uppercase leading-none text-white">
                    Lab Slot <br/>
                    <span className="text-neutral-700 font-bold">Reservation</span>
                  </h3>

                  <p className="text-neutral-400 text-lg font-['Outfit'] font-light max-w-xl leading-relaxed">
                    To maintain industrial discipline and equipment integrity, all users must secure a confirmed window through the reservation portal.
                  </p>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {highlights.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <Icon className="w-5 h-5 text-orange-500 mb-3" />
                        <h4 className="text-white text-[11px] font-bold uppercase tracking-widest font-['Syne'] mb-2">{item.title}</h4>
                        <p className="text-[10px] text-neutral-500 font-['Outfit'] leading-relaxed">{item.description}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <Button
                    className="bg-white text-black hover:bg-orange-500 hover:text-white transition-all duration-500 rounded-2xl px-10 py-7 h-auto text-xs uppercase tracking-[0.2em] font-bold font-['Syne'] w-full sm:w-auto shadow-xl"
                    asChild
                  >
                    <a href="https://forms.gle/n5Ax7eYCZJHierLH6" target="_blank" rel="noopener noreferrer">
                      Secure Time Slot
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* RIGHT: QR SCANNER BLOCK */}
              <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center h-full">
                <div className="relative p-4 group">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-orange-500/50" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-orange-500/50" />
                  
                  <div className="bg-white p-4 rounded-xl shadow-2xl relative">
                    <div className="w-40 h-40 sm:w-48 sm:h-48">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://forms.gle/n5Ax7eYCZJHierLH6"
                        alt="QR Code"
                        className="w-full h-full mix-blend-multiply opacity-90"
                      />
                    </div>
                    {/* The Scan Line */}
                    <m.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.5)] z-20 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}