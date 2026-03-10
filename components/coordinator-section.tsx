"use client"

import { LazyMotion, domAnimation, m } from "framer-motion"
import { Mail, Phone, MapPin, ShieldCheck, Cpu, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

function ContactItem({
  icon: Icon,
  label,
  href,
}: {
  icon: any
  label: string
  href?: string
}) {
  return (
    <m.div
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-4 transition-all justify-center md:justify-start"
    >
      <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all duration-300 text-orange-500">
        <Icon size={18} />
      </div>

      {href ? (
        <a href={href} className="text-sm font-['Outfit'] font-light text-neutral-400 group-hover:text-white transition-colors truncate">
          {label}
        </a>
      ) : (
        <span className="text-sm font-['Outfit'] font-light text-neutral-400 group-hover:text-white transition-colors truncate">
          {label}
        </span>
      )}
    </m.div>
  )
}

export function CoordinatorSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative w-full py-20 sm:py-32 bg-black text-white overflow-hidden border-t border-white/[0.05]"
        id="coordinator"
      >
        {/* CONTINUATION BRIDGE */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent">
            <m.div 
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"
            />
        </div>

        {/* AMBIENT BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-orange-500/[0.03] blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.05] sm:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
            
            {/* LEFT: CONTENT AREA */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="w-8 h-px bg-orange-500 hidden sm:block" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-orange-500 font-black font-['Outfit']">Incubation Office</span>
              </div>

              <h2 className="text-white font-black tracking-tighter leading-[1.1] uppercase" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                Incubation & <br className="hidden sm:block"/>
                <span className="text-neutral-600">Fabrication Support</span>
              </h2>

              <p className="text-neutral-500 font-['Outfit'] font-light text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                Open to <span className="text-white font-medium">FISAT students</span> and industry partners. Leverage our ecosystem for prototyping, 3D printing, and product development.
              </p>

              <div className="space-y-4 pt-2">
                 <div className="flex items-center justify-center lg:justify-start gap-3 text-neutral-400 group">
                    <ShieldCheck className="text-orange-500" size={18} />
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold font-['Outfit'] group-hover:text-white transition-colors">Direct Technical Mentorship</span>
                 </div>
                 <div className="flex items-center justify-center lg:justify-start gap-3 text-neutral-400 group">
                    <Cpu className="text-orange-500" size={18} />
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold font-['Outfit'] group-hover:text-white transition-colors">Advanced Prototyping Access</span>
                 </div>
              </div>

              <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                <Button
                  className="w-full sm:w-auto bg-white text-black hover:bg-orange-600 hover:text-white transition-all duration-500 rounded-2xl px-8 sm:px-10 py-6 sm:py-7 h-auto text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black font-['Syne'] shadow-2xl group"
                  asChild
                >
                  <a href="/incubation/request" target="_blank" rel="noopener noreferrer">
                    Submit Incubation Request
                    <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
              </m.div>
            </m.div>

            

          </div>
        </div>
      </section>
    </LazyMotion>
  )
}