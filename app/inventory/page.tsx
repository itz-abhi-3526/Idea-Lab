"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import LoginRequiredModal from "@/components/auth/LoginRequiredModal"

type InventoryItem = {
  id: string
  name: string
  category: string
  image_url: string | null
  quantity_available: number
}

type CartItem = InventoryItem & {
  quantity: number
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<any>(null)

  const [showCart, setShowCart] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: "",
    college: "FISAT",
    department: "",
    phone: "",
    purpose: "",
  })

  /* ---------- AUTH ---------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  /* ---------- FETCH INVENTORY ---------- */
  useEffect(() => {
    supabase
      .from("inventory_items")
      .select("id, name, category, image_url, quantity_available")
      .eq("is_active", true)
      .order("name")
      .then(({ data }) => {
        if (data) setItems(data)
      })
  }, [])

  const requireAuth = (fn: () => void) => {
    if (!user) {
      setShowLogin(true)
      return
    }
    fn()
  }

  /* ---------- CART ---------- */
  const addToCart = (item: InventoryItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity: Math.max(1, i.quantity + delta) }
          : i
      )
    )
  }

  /* ---------- SUBMIT ---------- */
  const submitRequest = async () => {
    if (!user) return

    const { name, department, phone, purpose } = form
    if (!name || !department || !phone || !purpose) {
      alert("Fill all fields")
      return
    }

    try {
      setSubmitting(true)

      const res = await fetch("/api/inventory-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          requester: form,
          items: cart.map((i) => ({
            id: i.id,
            quantity: i.quantity,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Failed")
        return
      }

      alert("Request submitted successfully")
      setCart([])
      setShowCart(false)
      setShowForm(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b bg-card p-4 flex justify-between">
        <h1 className="text-xl font-semibold">Lab Inventory</h1>

        <button
          onClick={() => requireAuth(() => setShowCart(true))}
          className="relative"
        >
          <ShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded p-4">
            <img
              src={item.image_url || "/placeholder.svg"}
              className="h-32 mx-auto"
            />
            <h3 className="mt-2 font-medium">{item.name}</h3>
            <Button
              className="mt-3 w-full"
              onClick={() => requireAuth(() => addToCart(item))}
            >
              Add to Request
            </Button>
          </div>
        ))}
      </div>

      {/* CART */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50"
              onClick={() => setShowCart(false)}
            />
            <motion.div className="fixed right-0 top-0 h-full w-96 bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">
                Request Cart
              </h2>

              {cart.map((i) => (
                <div key={i.id} className="flex justify-between mb-2">
                  <span>{i.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => updateQty(i.id, -1)}>
                      <Minus size={14} />
                    </button>
                    {i.quantity}
                    <button onClick={() => updateQty(i.id, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <Button
                className="mt-6 w-full"
                onClick={() => setShowForm(true)}
              >
                Proceed
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FORM */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="bg-card p-6 rounded w-full max-w-md">
              <h3 className="mb-4 font-semibold">
                Requester Details
              </h3>

              {["name", "department", "phone", "purpose"].map((k) => (
                <input
                  key={k}
                  placeholder={k}
                  value={(form as any)[k]}
                  onChange={(e) =>
                    setForm({ ...form, [k]: e.target.value })
                  }
                  className="mb-3 w-full p-2 border rounded"
                />
              ))}

              <Button
                className="w-full"
                disabled={submitting}
                onClick={submitRequest}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>

      <LoginRequiredModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  )
}
