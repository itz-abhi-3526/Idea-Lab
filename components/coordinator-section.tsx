"use client"
import { motion } from "framer-motion"
import { Mail, Phone, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SlotReservationSection } from "./slot-reservation-section"

function ContactItem({ icon: Icon, label, href }: { icon: any; label: string; href?: string }) {
  const content = (
    <>
      <div className="w-10 h-10 rounded-full bg-neutral-800/50 flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
        <Icon className="w-4 h-4 text-neutral-500 group-hover:text-orange-500 transition-colors" />
      </div>
      <span className="text-sm md:text-base font-medium text-neutral-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </>
  )

  return (
    <div className="group flex items-center gap-4 transition-all">
      {href ? (
        <a href={href} className="flex items-center gap-4 w-full">
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4 w-full cursor-default">{content}</div>
      )}
    </div>
  )
}

export function CoordinatorSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black text-white overflow-hidden" id="coordinator">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
        >
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-xs font-bold tracking-widest uppercase">
                Service Portal
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight leading-[1.1]">
                IDEA Lab <br />
                <span className="text-neutral-500">Incubation Request</span>
              </h2>
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-md font-light">
              Access our specialized incubation facilities for professional 3D printing and precision laser printing
              services.<br />
            </p>

            <Button
              className="bg-white text-black hover:bg-neutral-200 transition-all duration-300 rounded-xl px-10 py-7 h-auto text-base font-bold group border border-white/10"
              asChild
            >
              <a href="https://forms.gle/MYEyCnLBowgu4Avr8" target="_blank" rel="noopener noreferrer">
                Submit Project Request
                <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>

          <div className="lg:col-span-7 bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-3xl p-8 md:p-12 space-y-12">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
              <div className="relative group">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-neutral-800 group-hover:border-orange-500/50 transition-colors duration-500">
                  <img
                    src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766381472/IMG-20251218-WA0096_wtyhpd.jpg"
                    alt="Mr. Jithin Joseph"
                    className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-110"
                  />
                </div>
                <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold">Project Coordinator</h3>
                  <h4 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
                    Mr. Jithin Joseph
                  </h4>
                  <p className="text-neutral-400 font-medium tracking-wide italic">FISAT AICTE IDEA Lab</p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <ContactItem icon={Mail} label="jithinjoseph@fisat.ac.in" href="mailto:jithinjoseph@fisat.ac.in" />
                  <ContactItem icon={Phone} label="+91 9895221439" />
                  <ContactItem icon={MapPin} label="FISAT, Angamaly" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <SlotReservationSection />
      </div>
    </section>
  )
}
