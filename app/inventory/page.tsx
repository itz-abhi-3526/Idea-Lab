"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart,
  Plus,
  Minus,
  Box,
  Search,
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

  /* -----------------------------
     Auth
  ----------------------------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  /* -----------------------------
     Fetch inventory
  ----------------------------- */
  useEffect(() => {
    supabase
      .from("inventory_items")
      .select(
        "id, name, category, quantity_available"
      )
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

  /* -----------------------------
     Cart logic
  ----------------------------- */
  const addToCart = (item: InventoryItem) => {
    if (item.quantity_available === 0) {
      alert("Item is unavailable")
      return
    }

    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id
      )

      if (existing) {
        if (
          existing.quantity >=
          item.quantity_available
        ) {
          alert(
            "Requested quantity exceeds availability"
          )
          return prev
        }

        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
              }
            : i
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i

        const next = i.quantity + delta

        if (next < 1) return i

        if (next > i.quantity_available) {
          alert(
            "Requested quantity exceeds availability"
          )
          return i
        }

        return { ...i, quantity: next }
      })
    )
  }

  /* -----------------------------
     Submit request
  ----------------------------- */
  const submitRequest = async () => {
    if (!user) return

    const { name, department, phone, purpose } =
      form

    if (!name || !department || !phone || !purpose) {
      alert("Fill all fields")
      return
    }

    try {
      setSubmitting(true)

      const res = await fetch(
        "/api/inventory-request",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            requester: form,
            items: cart.map((i) => ({
              id: i.id,
              quantity: i.quantity,
            })),
          }),
        }
      )

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

  /* -----------------------------
     Derived
  ----------------------------- */
  const categories = [
  "all",
  ...Array.from(
    new Set(items.map(i => i.category))
  ),
]

const filteredItems = items
  .filter(item => {
    const matchSearch =
      `${item.name} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchCategory =
      category === "all" ||
      item.category === category

    return matchSearch && matchCategory
  })
  .sort((a, b) => {
    if (sort === "availability") {
      return b.quantity_available - a.quantity_available
    }
    return a.name.localeCompare(b.name)
  })

  /* -----------------------------
     UI
  ----------------------------- */
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-card px-6 py-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Lab Inventory
          </h1>

          <button
            onClick={() =>
              requireAuth(() =>
                setShowCart(true)
              )
            }
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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search inventory..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-input rounded-xl pl-9 pr-4 py-2 outline-none"
          />
        </div>
      </div>
            <div className="flex gap-4 max-w-md">
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
    <option value="name">Sort: Name</option>
    <option value="availability">
      Sort: Availability
    </option>
  </select>
</div>

      {/* Inventory grid */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const a = availability(
            item.quantity_available
          )

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="glass-surface rounded-xl p-5 soft-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Box className="w-5 h-5 text-accent" />
                </div>

                <h3 className="font-medium">
                  {item.name}
                </h3>

                <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                  {item.category}
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span
                    className={`px-3 py-1 rounded-full ${a.class}`}
                  >
                    {a.text}
                  </span>

                  <span className="text-muted-foreground">
                    Qty: {item.quantity_available}
                  </span>
                </div>

                <Button
                  className="w-full"
                  disabled={
                    item.quantity_available === 0
                  }
                  onClick={() =>
                    requireAuth(() =>
                      addToCart(item)
                    )
                  }
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

      {/* CART */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60"
              onClick={() =>
                setShowCart(false)
              }
            />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="fixed right-0 top-0 h-full w-96 bg-card p-6 space-y-6"
            >
              <h2 className="text-lg font-semibold">
                Request Cart
              </h2>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No items added
                </p>
              ) : (
                cart.map((i) => (
                  <div
                    key={i.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">
                      {i.name}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(i.id, -1)
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <span className="text-sm">
                        {i.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(i.id, 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}

              <Button
                className="w-full"
                disabled={cart.length === 0}
                onClick={() =>
                  setShowForm(true)
                }
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
            <div className="bg-card rounded-xl p-6 w-full max-w-md space-y-4">
              <h3 className="font-semibold">
                Requester Details
              </h3>

              {["name", "department", "phone", "purpose"].map(
                (k) => (
                  <input
                    key={k}
                    placeholder={k}
                    value={(form as any)[k]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [k]: e.target.value,
                      })
                    }
                    className="w-full bg-input px-4 py-2 rounded-xl outline-none"
                  />
                )
              )}

              <Button
                className="w-full"
                disabled={submitting}
                onClick={submitRequest}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Request"}
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
