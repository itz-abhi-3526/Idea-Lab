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
    <section className="w-full py-16 sm:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">

        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
            IDEA Lab Inventory
          </h2>

          <div className="h-1 w-20 sm:w-28 mx-auto bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Tools, components, and equipment available for your ideas.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-sm sm:text-base text-muted-foreground">
            Loading inventory…
          </p>
        )}

        {/* Empty */}
        {!loading && items.length === 0 && (
          <p className="text-center text-sm sm:text-base text-muted-foreground">
            No inventory available
          </p>
        )}

        {/* Inventory Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => {
            const availability = getAvailability(item.quantity_available)

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="
                  glass-surface
                  rounded-xl
                  p-4 sm:p-6
                  soft-shadow
                  flex flex-col
                  justify-between
                "
              >
                {/* Top */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Box className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Category */}
                  <span className="inline-block w-fit text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                    {item.category}
                  </span>
                </div>

                {/* Bottom */}
                <div className="pt-4 sm:pt-6 flex items-center justify-between text-xs sm:text-sm">
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
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 sm:pt-0">
          <button
            onClick={() => router.push("/inventory")}
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              px-6 py-3
              bg-accent text-accent-foreground
              rounded-lg
              hover:opacity-90 transition
              text-sm sm:text-base
            "
          >
            View Full Inventory
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => router.push("/machinery")}
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              px-6 py-3
              border border-accent/40
              text-accent
              rounded-lg
              hover:bg-accent/10 transition
              text-sm sm:text-base
            "
          >
            Explore Lab Machinery
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
