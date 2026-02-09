"use client"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  {
    icon: CheckCircle,
    title: "Mandatory for all students",
  },
  {
    icon: CheckCircle,
    title: "Accountability for equipment and workspace",
  },
  {
    icon: CheckCircle,
    title: "Access only during approved slots",
  },
]

export function SlotReservationSection() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="
          relative
          overflow-hidden
          bg-neutral-900/50 backdrop-blur-xl
          border border-neutral-800/60
          rounded-3xl
          p-6 sm:p-8 md:p-12
          space-y-8
          shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        "
      >
        {/* soft ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
        />

        <div className="space-y-3 sm:space-y-4 relative z-10">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            Idea Lab Slot Reservation
          </h3>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            To ensure proper use, discipline, and cleanliness of Idea Lab resources,
            all users must reserve a time slot before accessing the lab.
          </p>
        </div>

        {/* highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
          {highlights.map((item, index) => {
            const Icon = item.icon

            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  flex items-start gap-3 sm:gap-4
                  rounded-2xl
                  border border-neutral-800/60
                  bg-neutral-900/40
                  backdrop-blur
                  p-4 sm:p-5
                "
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
                  <Icon className="w-4 h-4 text-orange-500" />
                </div>

                <p className="text-neutral-200 text-sm sm:text-base font-medium leading-snug">
                  {item.title}
                </p>
              </m.div>
            )
          })}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4 relative z-10">
          {/* CTA */}
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <m.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto"
              transition={{ duration: 0.2 }}
            >
              <Button
                className="
                  bg-white text-black
                  hover:bg-neutral-200
                  transition-all duration-300
                  rounded-xl
                  px-6 sm:px-8
                  py-5 sm:py-6
                  h-auto
                  text-sm sm:text-base
                  font-bold
                  group
                  border border-white/10
                  w-full md:w-auto
                  shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                "
                asChild
              >
                <a
                  href="https://forms.gle/n5Ax7eYCZJHierLH6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve a Slot
                  <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </m.div>

            <p className="text-xs text-neutral-500 italic text-center md:text-left">
              Note: Slot confirmation is subject to approval by the lab coordinators.
            </p>
          </div>

          {/* QR block */}
          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2 sm:gap-3"
          >
            <div
              className="
                relative
                bg-white
                rounded-2xl
                p-3 sm:p-4
                shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                border border-neutral-200/20
              "
            >
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />

              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://forms.gle/n5Ax7eYCZJHierLH6"
                  alt="Scan to reserve slot"
                  className="w-full h-full"
                />
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-medium">
              Scan to Reserve
            </p>
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  )
}
