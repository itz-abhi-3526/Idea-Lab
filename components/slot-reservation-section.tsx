"use client"
import { motion } from "framer-motion"
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-3xl p-8 md:p-12 space-y-8"
    >
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
          Idea Lab Slot Reservation
        </h3>
        <p className="text-neutral-400 text-base leading-relaxed">
          To ensure proper use, discipline, and cleanliness of Idea Lab resources, all users must reserve a time slot
          before accessing the lab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
                <Icon className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-neutral-300 text-sm md:text-base font-medium leading-snug">{item.title}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
        {/* Left: Button Section */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <Button
            className="bg-white text-black hover:bg-neutral-200 transition-all duration-300 rounded-xl px-8 py-6 h-auto text-base font-bold group border border-white/10"
            asChild
          >
            <a href="https://forms.gle/n5Ax7eYCZJHierLH6" target="_blank" rel="noopener noreferrer">
              Reserve a Slot
              <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
          <p className="text-xs text-neutral-500 italic">
            Note: Slot confirmation is subject to approval by the lab coordinators.
          </p>
        </div>

        {/* Right: QR Code Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-neutral-200/20">
            <div className="w-32 h-32 bg-white flex items-center justify-center rounded-lg">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://forms.gle/n5Ax7eYCZJHierLH6"
                alt="Scan to reserve slot"
                className="w-full h-full"
              />
            </div>
          </div>
          <p className="text-xs text-neutral-400 font-medium">Scan to Reserve</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
