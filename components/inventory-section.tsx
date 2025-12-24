"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import LoginRequiredModal from "@/components/auth/LoginRequiredModal"
import { useRouter } from "next/navigation"

type InventoryItem = {
  id: string
  name: string
  category: string
  quantity_available: number
  image_url: string | null
}

type Availability = "Available" | "Limited" | "Unavailable"

const availabilityStyles: Record<Availability, string> = {
  Available: "bg-green-500/10 text-green-400 border-green-500/30",
  Limited: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Unavailable: "bg-red-500/10 text-red-400 border-red-500/30",
}

function getAvailability(qty: number): Availability {
  if (qty === 0) return "Unavailable"
  if (qty < 10) return "Limited"
  return "Available"
}

export function InventorySection() {
  const router = useRouter()
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    const fetchInventory = async () => {
      const { data } = await supabase
        .from("inventory_items")
        .select("id, name, category, quantity_available, image_url")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(4)

      if (data) setItems(data)
      setLoading(false)
    }

    fetchInventory()
  }, [])

  const handleViewInventory = () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    router.push("/inventory")
  }

  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-5">IDEA Lab Inventory</h2>
          <div className="h-1 w-28 mx-auto bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
          <p className="text-muted-foreground mt-3">
            Grab what you need. Build something cool.
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">
            Loading inventory…
          </p>
        )}

        {!loading && items.length === 0 && (
          <p className="text-center text-muted-foreground">
            No inventory available
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const availability = getAvailability(item.quantity_available)

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="relative h-40 bg-muted">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold truncate">
                    {item.name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent border border-accent/30">
                      {item.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded border ${availabilityStyles[availability]}`}
                    >
                      {availability}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handleViewInventory}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg"
          >
            View Full Inventory
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  )
}
