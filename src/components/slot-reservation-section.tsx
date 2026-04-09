
import { LazyMotion, domAnimation, m } from "framer-motion"
import { CheckCircle, ExternalLink, CalendarDays, Clock } from "lucide-react"
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
      <section id="reservation" className="relative w-full py-16 sm:py-24 bg-black overflow-hidden">
        
        {/* SECTION CONNECTOR BRIDGE */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent z-0">
          <m.div 
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 -translate-x-1/2 w-1 h-4 bg-orange-500 blur-[2px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden bg-neutral-900/30 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-16 shadow-2xl"
          >
            {/* Ambient leak */}
            <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-64 bg-orange-500/[0.05] blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
              
              {/* LEFT: TEXT CONTENT */}
              <div className="lg:col-span-3 space-y-6 sm:space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase font-['Outfit']">
                    Protocol: LAB-ACCESS-01
                  </div>
                  
                  <h3 className="text-3xl sm:text-5xl font-black font-['Syne'] tracking-tighter uppercase leading-tight text-white">
                    Lab Slot <br className="hidden sm:block"/>
                    <span className="text-neutral-700 font-bold">Reservation</span>
                  </h3>

                  <p className="text-neutral-500 text-sm sm:text-lg font-['Outfit'] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    To maintain industrial discipline and equipment integrity, all users must secure a confirmed window through the reservation portal.
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
                  {highlights.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-colors hover:bg-white/[0.04]">
                        <Icon className="w-5 h-5 text-orange-500 mb-3" />
                        <h4 className="text-white text-[10px] font-black uppercase tracking-widest font-['Syne'] mb-2">{item.title}</h4>
                        <p className="text-[10px] text-neutral-500 font-['Outfit'] leading-relaxed">{item.description}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full sm:w-auto bg-white text-black hover:bg-orange-600 hover:text-white transition-all duration-500 rounded-2xl px-10 py-6 sm:py-7 h-auto text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black font-['Syne'] shadow-xl group"
                    asChild
                  >
                    <a href="https://forms.gle/n5Ax7eYCZJHierLH6" target="_blank" rel="noopener noreferrer">
                      Secure Time Slot
                      <ExternalLink className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* RIGHT: QR SCANNER BLOCK */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center">
                <div className="relative p-3 sm:p-4 group">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-orange-500/50" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-orange-500/50" />
                  
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-2xl relative overflow-hidden">
                    <div className="w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://forms.gle/n5Ax7eYCZJHierLH6"
                        alt="Slot Reservation QR"
                        className="w-full h-full mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* The Scan Line */}
                    <m.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.6)] z-20 pointer-events-none"
                    />
                  </div>
                </div>
                <p className="mt-6 text-[8px] uppercase tracking-[0.4em] text-neutral-600 font-black font-['Outfit'] lg:hidden">
                  Scan to Authenticate
                </p>
              </div>

            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
