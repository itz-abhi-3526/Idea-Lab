"use client"

import { motion } from "framer-motion"
import { Mail, Phone, ExternalLink, MapPin } from "lucide-react"
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
  const content = (
    <>
      <motion.div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
                   bg-neutral-800/60 backdrop-blur
                   flex items-center justify-center
                   group-hover:bg-orange-500/10 transition-colors"
        whileHover={{ scale: 1.08 }}
      >
        <Icon className="w-4 h-4 text-neutral-500 group-hover:text-orange-500 transition-colors" />
      </motion.div>

      <span className="text-sm sm:text-base font-medium text-neutral-300 group-hover:text-white transition-colors break-all">
        {label}
      </span>
    </>
  )

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex items-center gap-3 sm:gap-4 transition-all"
    >
      {href ? (
        <a href={href} className="flex items-center gap-3 sm:gap-4 w-full">
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3 sm:gap-4 w-full cursor-default">
          {content}
        </div>
      )}
    </motion.div>
  )
}

export function CoordinatorSection() {
  return (
    <section
      className="relative w-full py-16 sm:py-24 md:py-32 bg-black text-white overflow-hidden"
      id="coordinator"
    >
      {/* ambient glows */}
      <div className="absolute top-0 left-1/4 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
        >
          {/* LEFT */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10 text-center lg:text-left">
            <div className="space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-xs font-bold tracking-widest uppercase">
                Service Portal
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight leading-tight">
                IDEA Lab <br />
                <span className="text-neutral-500">
                  Incubation & Fabrication Support
                </span>
              </h2>
            </div>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
              Open to <span className="text-white font-medium">FISAT students</span>, startups,
              innovators, and industry partners — leverage IDEA Lab’s incubation
              ecosystem for prototyping, 3D printing, laser cutting, and
              product development support.
            </p>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block w-full sm:w-auto"
            >
              <Button
                className="bg-white text-black hover:bg-neutral-200 transition-all duration-300 rounded-xl px-8 sm:px-10 py-6 sm:py-7 h-auto text-sm sm:text-base font-bold group border border-white/10 w-full sm:w-auto shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                asChild
              >
                <a
                  href="/incubation/request"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit Incubation Request
                  <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-neutral-900/50 backdrop-blur-xl border border-neutral-800/60 rounded-3xl p-5 sm:p-8 md:p-12 space-y-10 sm:space-y-12 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col md:flex-row gap-10 sm:gap-12 items-center md:items-start text-center md:text-left">
              {/* Avatar */}
              <motion.div
                className="relative group"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-neutral-800 group-hover:border-orange-500/50 transition-colors duration-500">
                  <img
                    src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766381472/IMG-20251218-WA0096_wtyhpd.jpg"
                    alt="Mr. Jithin Joseph"
                    className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110"
                  />
                </div>

                <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>

              {/* Info */}
              <div className="space-y-6 sm:space-y-8 flex-1">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold">
                    Project Coordinator
                  </h3>

                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
                    Mr. Jithin Joseph
                  </h4>

                  <p className="text-neutral-400 font-medium tracking-wide italic">
                    FISAT AICTE IDEA Lab
                  </p>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08 } },
                  }}
                  className="grid grid-cols-1 gap-4 sm:gap-5"
                >
                  <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}>
                    <ContactItem
                      icon={Mail}
                      label="jithinjoseph@fisat.ac.in"
                      href="mailto:jithinjoseph@fisat.ac.in"
                    />
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}>
                    <ContactItem icon={Phone} label="+91 9895221439" />
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}>
                    <ContactItem icon={MapPin} label="FISAT, Angamaly" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
