"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Box } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type InventoryItem = {
  id: string
  name: string
  category: string
  quantity_available: number
}

type Availability = "Available" | "Limited" | "Unavailable"

const availabilityStyles: Record<Availability, string> = {
  Available:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Limited:
    "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Unavailable:
    "bg-rose-500/10 text-rose-400 border-rose-500/30",
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
      const { data } = await supabase
        .from("inventory_items")
        .select("id, name, category, quantity_available")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(4)

      if (data) setItems(data)
      setLoading(false)
    }

    fetchInventory()
  }, [])

  return (
    <section className="relative w-full py-16 sm:py-20 bg-background overflow-hidden">
      {/* Ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 sm:space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            IDEA Lab Inventory
          </h2>

          <div className="relative h-[2px] w-20 sm:w-28 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0">
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Tools, components, and equipment available for your ideas.
          </p>
        </motion.div>

        {/* Inventory cards / skeletons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {/* Real items */}
          {items.map((item) => {
            const availability = getAvailability(item.quantity_available)

            return (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                whileHover={{ y: -6 }}
                className="
                  relative
                  rounded-2xl
                  bg-background/60
                  backdrop-blur-xl
                  border border-white/10
                  p-4 sm:p-6
                  shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                  flex flex-col
                  justify-between
                "
              >
                {/* Top */}
                <div className="space-y-3 sm:space-y-4 relative z-10">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Box className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>

                  <h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-2">
                    {item.name}
                  </h3>

                  <span className="inline-block w-fit text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                    {item.category}
                  </span>
                </div>

                {/* Bottom */}
                <div className="pt-4 sm:pt-6 flex items-center justify-between text-xs sm:text-sm relative z-10">
                  <span
                    className={`px-3 py-1 rounded-full border ${availabilityStyles[availability]}`}
                  >
                    {availability}
                  </span>

                  <span className="text-muted-foreground">
                    Qty: {item.quantity_available}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* Skeleton preview when loading or empty */}
          {(loading || items.length === 0) &&
            Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
                className="
                  relative
                  rounded-2xl
                  bg-background/40
                  border border-white/10
                  p-4 sm:p-6
                  backdrop-blur-xl
                  overflow-hidden
                "
              >
                <div className="space-y-4 animate-pulse">
                  <div className="w-10 h-10 rounded-lg bg-white/10" />
                  <div className="h-4 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/10" />

                  <div className="pt-6 flex justify-between">
                    <div className="h-4 w-20 rounded bg-white/10" />
                    <div className="h-4 w-12 rounded bg-white/10" />
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 justify-center pt-2 sm:pt-0"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/inventory")}
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              px-6 py-3
              bg-accent text-accent-foreground
              rounded-xl
              shadow-[0_14px_30px_rgba(0,0,0,0.35)]
              hover:opacity-90 transition
              text-sm sm:text-base
            "
          >
            View Full Inventory
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/machinery")}
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              px-6 py-3
              border border-accent/40
              text-accent
              rounded-xl
              hover:bg-accent/10 transition
              text-sm sm:text-base
            "
          >
            Explore Lab Machinery
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
