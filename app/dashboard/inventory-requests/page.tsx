"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart,
  Plus,
  Minus,
  Box,
  Search,
  X,
  CheckCircle2, // ✅ NEW
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import LoginRequiredModal from "@/components/auth/LoginRequiredModal"

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type InventoryItem = {
  id: string
  name: string
  category: string
  quantity_available: number
}

type CartItem = InventoryItem & {
  quantity: number
}

/* ----------------------------- */
/* Helpers                       */
/* ----------------------------- */

function availability(qty: number) {
  if (qty === 0)
    return {
      text: "Unavailable",
      class: "bg-rose-500/15 text-rose-400",
    }

  if (qty < 10)
    return {
      text: "Limited",
      class: "bg-amber-500/15 text-amber-400",
    }

  return {
    text: "Available",
    class: "bg-emerald-500/15 text-emerald-400",
  }
}

/* ----------------------------- */
/* Page                          */
/* ----------------------------- */

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<any>(null)

  const [search, setSearch] = useState("")
  const [showCart, setShowCart] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("name")

  const [form, setForm] = useState({
    name: "",
    college: "FISAT",
    department: "",
    phone: "",
    purpose: "",
  })

  // ✅ NEW – popup state
  const [addedItem, setAddedItem] = useState<InventoryItem | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    supabase
      .from("inventory_items")
      .select("id, name, category, quantity_available")
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

  const addToCart = (item: InventoryItem) => {
    if (item.quantity_available === 0) return

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        if (existing.quantity >= item.quantity_available) return prev
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })

    // ✅ NEW – trigger popup
    setAddedItem(item)
    setTimeout(() => setAddedItem(null), 1600)
  }

  const updateQty = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(i => {
        if (i.id !== id) return i
        const next = i.quantity + delta
        if (next < 1 || next > i.quantity_available) return i
        return { ...i, quantity: next }
      })
    )
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const submitRequest = async () => {
    if (!user) return
    const { name, department, phone, purpose } = form
    if (!name || !department || !phone || !purpose) return

    try {
      setSubmitting(true)
      const res = await fetch("/api/inventory-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          requester: form,
          items: cart.map(i => ({
            id: i.id,
            quantity: i.quantity,
          })),
        }),
      })

      if (!res.ok) return
      setCart([])
      setShowCart(false)
      setShowForm(false)
    } finally {
      setSubmitting(false)
    }
  }

  const categories = [
    "all",
    ...Array.from(new Set(items.map(i => i.category))),
  ]

  const filteredItems = items
    .filter(item => {
      const matchSearch = `${item.name} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchCategory =
        category === "all" || item.category === category
      return matchSearch && matchCategory
    })
    .sort((a, b) =>
      sort === "availability"
        ? b.quantity_available - a.quantity_available
        : a.name.localeCompare(b.name)
    )

  return (
    <div className="min-h-screen bg-background">

      {/* ---------------------- GOD-TIER ADD POPUP ---------------------- */}
      <AnimatePresence>
        {addedItem && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
                       bg-black/70 backdrop-blur-xl border border-white/10
                       rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">
                Added to request
              </span>
              <span className="text-xs text-muted-foreground max-w-[220px] truncate">
                {addedItem.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --------------------------------------------------------------- */}

      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-card px-4 sm:px-6 py-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-semibold">
            Lab Inventory
          </h1>

          <button
            onClick={() => requireAuth(() => setShowCart(true))}
            className="relative"
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-xs rounded-full px-2 py-0.5 text-accent-foreground">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search inventory..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-input rounded-xl pl-9 pr-4 py-2 outline-none"
            />
          </div>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-input rounded-xl px-3 py-2 text-sm"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-input rounded-xl px-3 py-2 text-sm"
          >
            <option value="name">Name</option>
            <option value="availability">Availability</option>
          </select>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map(item => {
          const a = availability(item.quantity_available)
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="glass-surface rounded-xl p-4 sm:p-5 soft-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Box className="w-5 h-5 text-accent" />
                </div>

                <h3 className="font-medium text-sm sm:text-base">
                  {item.name}
                </h3>

                <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                  {item.category}
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className={`px-3 py-1 rounded-full ${a.class}`}>
                    {a.text}
                  </span>
                  <span className="text-muted-foreground">
                    Qty: {item.quantity_available}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="sm"
                  disabled={item.quantity_available === 0}
                  onClick={() => requireAuth(() => addToCart(item))}
                >
                  Add to Request
                </Button>
              </div>
            </motion.div>
          )
        })}

        {filteredItems.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">
            No items found
          </p>
        )}
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowCart(false)}
            />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card p-4 sm:p-6 space-y-6 z-50"
            >
              <h2 className="text-lg font-semibold">Request Cart</h2>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No items added
                </p>
              ) : (
                cart.map(i => (
                  <div
                    key={i.id}
                    className="flex justify-between items-center gap-2"
                  >
                    <span className="text-sm flex-1 truncate">
                      {i.name}
                    </span>

                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(i.id, -1)}>
                        <Minus size={14} />
                      </button>

                      <span className="text-sm w-4 text-center">
                        {i.quantity}
                      </span>

                      <button onClick={() => updateQty(i.id, 1)}>
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() => removeFromCart(i.id)}
                        className="text-muted-foreground hover:text-rose-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}

              <Button
                className="w-full"
                disabled={cart.length === 0}
                onClick={() => setShowForm(true)}
              >
                Proceed
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Request Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-card rounded-xl p-6 w-full max-w-md space-y-4">
              <h3 className="font-semibold">Requester Details</h3>

              {["name", "department", "phone", "purpose"].map(k => (
                <input
                  key={k}
                  placeholder={k}
                  value={(form as any)[k]}
                  onChange={e =>
                    setForm({ ...form, [k]: e.target.value })
                  }
                  className="w-full bg-input px-4 py-2 rounded-xl outline-none"
                />
              ))}

              <Button
                className="w-full"
                disabled={submitting}
                onClick={submitRequest}
              >
                {submitting ? "Submitting..." : "Submit Request"}
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
