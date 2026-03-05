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
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import LoginRequiredModal from "@/components/auth/LoginRequiredModal"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "inventory-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap"
    document.head.prepend(l)
  }, [])
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
type InventoryItem = {
  id: string
  name: string
  category: string
  quantity_available: number
}

type CartItem = InventoryItem & { quantity: number }

/* ─────────────────────────────────────────
   AVAILABILITY — unchanged logic, new style
───────────────────────────────────────── */
function availability(qty: number) {
  if (qty === 0)  return { text: "UNAVAILABLE", color: "rgba(239,68,68,0.8)",   bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.25)"  }
  if (qty < 10)   return { text: "LIMITED",     color: "rgba(251,191,36,0.85)", bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.25)" }
  return            { text: "AVAILABLE",   color: "rgba(34,197,94,0.85)",  bg: "rgba(34,197,94,0.07)",   border: "rgba(34,197,94,0.25)"  }
}

/* ─────────────────────────────────────────
   CYBER FIELD (for form, no shorthand conflict)
───────────────────────────────────────── */
function CyberInput({
  placeholder, value, onChange, type = "text",
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: focused
            ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.85), transparent)"
            : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
          transition: "background 0.25s",
        }}
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-4 pr-3 py-2.5 text-sm text-white placeholder-white/20 outline-none"
        style={{
          background:   focused ? "rgba(249,115,22,0.04)" : "rgba(0,0,0,0.35)",
          borderTop:    `1px solid ${focused ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.07)"}`,
          borderRight:  `1px solid ${focused ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.07)"}`,
          borderBottom: `1px solid ${focused ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.07)"}`,
          borderLeft:   "none",
          borderRadius: 0,
          fontFamily:   "'Barlow', sans-serif",
          fontWeight:   300,
          transition:   "background 0.25s",
        }}
      />
      {/* bottom scan line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        animate={{
          width:      focused ? "100%" : "0%",
          background: "linear-gradient(to right, rgba(249,115,22,0.7), transparent)",
        }}
        transition={{ duration: 0.35, ease }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   INVENTORY ITEM CARD
───────────────────────────────────────── */
function ItemCard({
  item,
  onAdd,
  inCart,
}: {
  item: InventoryItem
  onAdd: () => void
  inCart: number
}) {
  const [hov, setHov] = useState(false)
  const av = availability(item.quantity_available)
  const disabled = item.quantity_available === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden flex flex-col justify-between"
      style={{
        background:     "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        border:         hov ? "1px solid rgba(249,115,22,0.28)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow:      hov ? "0 0 0 1px rgba(249,115,22,0.07), 0 16px 40px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.2)",
        transition:     "border 0.25s, box-shadow 0.25s",
        minHeight:      "200px",
      }}
    >
      {/* top shimmer */}
      {hov && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.55), transparent)", transformOrigin: "left" }}
        />
      )}

      {/* left stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: hov
            ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.55), transparent)"
            : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)",
          transition: "background 0.25s",
        }}
      />

      {/* HUD corner */}
      <div
        className="absolute top-2.5 right-2.5 w-3 h-3"
        style={{
          borderTop:   `1px solid ${hov ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"}`,
          borderRight: `1px solid ${hov ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"}`,
          transition: "border-color 0.25s",
        }}
      />

      {/* in-cart badge */}
      {inCart > 0 && (
        <div
          className="absolute top-2.5 left-5 px-1.5 py-0.5 text-[8px] tracking-[0.2em]"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color:      "rgba(249,115,22,0.8)",
            background: "rgba(249,115,22,0.1)",
            border:     "1px solid rgba(249,115,22,0.25)",
          }}
        >
          ×{inCart} IN CART
        </div>
      )}

      <div className="p-5 pl-6 space-y-3">
        {/* icon */}
        <div
          className="w-9 h-9 flex items-center justify-center"
          style={{
            background: "rgba(249,115,22,0.08)",
            border:     "1px solid rgba(249,115,22,0.18)",
          }}
        >
          <Box className="w-4 h-4" style={{ color: "rgba(249,115,22,0.7)" }} />
        </div>

        {/* name */}
        <h3
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontWeight:    700,
            fontSize:      "clamp(0.95rem, 2vw, 1.1rem)",
            letterSpacing: "-0.01em",
            color:         disabled ? "rgba(255,255,255,0.35)" : "#ffffff",
            lineHeight:    1.15,
          }}
        >
          {item.name}
        </h3>

        {/* category */}
        <span
          className="inline-block px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color:      "rgba(249,115,22,0.55)",
            background: "rgba(249,115,22,0.06)",
            border:     "1px solid rgba(249,115,22,0.15)",
          }}
        >
          {item.category}
        </span>
      </div>

      <div className="px-5 pl-6 pb-5 space-y-3">
        {/* availability + qty */}
        <div className="flex items-center justify-between">
          <span
            className="px-2.5 py-0.5 text-[9px] tracking-[0.2em]"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color:      av.color,
              background: av.bg,
              border:     `1px solid ${av.border}`,
            }}
          >
            {av.text}
          </span>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize:   "0.68rem",
              color:      "rgba(255,255,255,0.25)",
              letterSpacing: "0.12em",
            }}
          >
            QTY:{item.quantity_available}
          </span>
        </div>

        {/* add button */}
        <motion.button
          onClick={onAdd}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{   scale: disabled ? 1 : 0.97  }}
          className="relative w-full py-2 overflow-hidden disabled:opacity-40"
          style={{
            background:    disabled ? "rgba(255,255,255,0.04)" : "rgb(249,115,22)",
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontWeight:    700,
            fontSize:      "0.8rem",
            letterSpacing: "0.2em",
            color:         disabled ? "rgba(255,255,255,0.3)" : "#000000",
            border:        disabled ? "1px solid rgba(255,255,255,0.08)" : "none",
            cursor:        disabled ? "not-allowed" : "pointer",
            boxShadow:     disabled ? "none" : hov ? "0 0 16px rgba(249,115,22,0.3)" : "none",
            transition:    "box-shadow 0.25s",
          }}
        >
          {!disabled && (
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.45 }}
            />
          )}
          <span className="relative z-10">
            {disabled ? "UNAVAILABLE" : "ADD TO REQUEST"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all logic unchanged
───────────────────────────────────────── */
export default function InventoryPage() {
  useFonts()

  const [items,      setItems]      = useState<InventoryItem[]>([])
  const [cart,       setCart]       = useState<CartItem[]>([])
  const [user,       setUser]       = useState<any>(null)
  const [search,     setSearch]     = useState("")
  const [showCart,   setShowCart]   = useState(false)
  const [showForm,   setShowForm]   = useState(false)
  const [showLogin,  setShowLogin]  = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [category,   setCategory]   = useState("all")
  const [sort,       setSort]       = useState("name")
  const [addedItem,  setAddedItem]  = useState<InventoryItem | null>(null)

  const [form, setForm] = useState({
    name: "", college: "FISAT", department: "", phone: "", purpose: "",
  })

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user) })
  }, [])

  useEffect(() => {
    supabase
      .from("inventory_items")
      .select("id, name, category, quantity_available")
      .eq("is_active", true)
      .order("name")
      .then(({ data }) => { if (data) setItems(data) })
  }, [])

  const requireAuth = (fn: () => void) => {
    if (!user) { setShowLogin(true); return }
    fn()
  }

  const addToCart = (item: InventoryItem) => {
    if (item.quantity_available === 0) return
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        if (existing.quantity >= item.quantity_available) return prev
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setAddedItem(item)
    setTimeout(() => setAddedItem(null), 1600)
  }

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i
      const next = i.quantity + delta
      if (next < 1 || next > i.quantity_available) return i
      return { ...i, quantity: next }
    }))
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
          items: cart.map(i => ({ id: i.id, quantity: i.quantity })),
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

  const categories = ["all", ...Array.from(new Set(items.map(i => i.category)))]

  const filteredItems = items
    .filter(item => {
      const matchSearch = `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase())
      const matchCat    = category === "all" || item.category === category
      return matchSearch && matchCat
    })
    .sort((a, b) =>
      sort === "availability"
        ? b.quantity_available - a.quantity_available
        : a.name.localeCompare(b.name)
    )

  const totalCartItems = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-[45rem] w-[45rem] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
      </div>

      {/* ── ADD TO CART TOAST ── */}
      <AnimatePresence>
        {addedItem && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{ opacity: 0,    y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3"
            style={{
              background:     "rgba(0,0,0,0.8)",
              backdropFilter: "blur(20px)",
              border:         "1px solid rgba(34,197,94,0.3)",
              boxShadow:      "0 0 20px rgba(34,197,94,0.1)",
            }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center shrink-0"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              <CheckCircle2 className="w-4 h-4" style={{ color: "rgba(34,197,94,0.85)" }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#ffffff", lineHeight: 1.1 }}>
                Added to request
              </p>
              <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", maxWidth: 220 }} className="truncate">
                {addedItem.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STICKY HEADER ── */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-6 py-4 space-y-4"
        style={{
          background:     "rgba(0,0,0,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom:   "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-orange-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span
                className="text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}
              >
                FISAT AICTE IDEA LAB
              </span>
            </div>
            <h1
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    900,
                fontSize:      "clamp(1.4rem, 3vw, 2rem)",
                letterSpacing: "-0.02em",
                color:         "#ffffff",
                lineHeight:    1,
              }}
            >
              Lab <span style={{ color: "rgb(249,115,22)" }}>Inventory</span>
            </h1>
          </div>

          {/* cart button */}
          <motion.button
            onClick={() => requireAuth(() => setShowCart(true))}
            whileHover={{ scale: 1.05 }}
            whileTap={{   scale: 0.95 }}
            className="relative flex items-center gap-2 px-4 py-2"
            style={{
              background: "rgba(249,115,22,0.08)",
              border:     "1px solid rgba(249,115,22,0.25)",
              color:      "rgba(249,115,22,0.8)",
              cursor:     "pointer",
            }}
          >
            <ShoppingCart size={16} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
              REQUEST
            </span>
            {cart.length > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[10px]"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  background: "rgb(249,115,22)",
                  color:      "#000",
                  fontWeight: 700,
                }}
              >
                {totalCartItems}
              </span>
            )}
          </motion.button>
        </div>

        {/* search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          {/* search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.25)" }} />
            <input
              placeholder="Search inventory..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 outline-none"
              style={{
                background:   "rgba(0,0,0,0.4)",
                border:       "1px solid rgba(255,255,255,0.08)",
                borderRadius: 0,
                fontFamily:   "'Barlow', sans-serif",
                fontWeight:   300,
              }}
            />
          </div>

          {/* category select */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-3 py-2.5 text-sm outline-none"
            style={{
              background:   "rgba(0,0,0,0.4)",
              border:       "1px solid rgba(255,255,255,0.08)",
              borderRadius: 0,
              color:        "rgba(255,255,255,0.7)",
              fontFamily:   "'Share Tech Mono', monospace",
              fontSize:     "0.72rem",
              letterSpacing: "0.1em",
            }}
          >
            {categories.map(c => (
              <option key={c} value={c} style={{ background: "#0a0a0a" }}>
                {c === "all" ? "ALL CATEGORIES" : c.toUpperCase()}
              </option>
            ))}
          </select>

          {/* sort select */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2.5 text-sm outline-none"
            style={{
              background:   "rgba(0,0,0,0.4)",
              border:       "1px solid rgba(255,255,255,0.08)",
              borderRadius: 0,
              color:        "rgba(255,255,255,0.7)",
              fontFamily:   "'Share Tech Mono', monospace",
              fontSize:     "0.72rem",
              letterSpacing: "0.1em",
            }}
          >
            <option value="name"         style={{ background: "#0a0a0a" }}>SORT: NAME</option>
            <option value="availability" style={{ background: "#0a0a0a" }}>SORT: AVAILABILITY</option>
          </select>
        </div>
      </div>

      {/* ── INVENTORY GRID ── */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* result count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-2"
        >
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.68rem",
              letterSpacing: "0.22em",
              color:         "rgba(255,255,255,0.2)",
            }}
          >
            {filteredItems.length} ITEMS FOUND
          </span>
          <div className="flex-1 h-px bg-white/[0.04]" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item, i) => (
            <ItemCard
              key={item.id}
              item={item}
              onAdd={() => requireAuth(() => addToCart(item))}
              inCart={cart.find(c => c.id === item.id)?.quantity ?? 0}
            />
          ))}

          {filteredItems.length === 0 && (
            <div
              className="col-span-full py-16 flex flex-col items-center gap-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                border:     "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-orange-500/30"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)" }}>
                NO ITEMS FOUND
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── CART DRAWER ── */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.65)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />

            <motion.div
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-50 flex flex-col"
              style={{
                background:     "rgba(0,0,0,0.85)",
                backdropFilter: "blur(24px)",
                borderLeft:     "1px solid rgba(249,115,22,0.2)",
              }}
            >
              {/* drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[9px] tracking-[0.28em]"
                      style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.55)" }}
                    >
                      SYS.CART
                    </span>
                    <motion.div
                      className="w-1 h-1 rounded-full bg-orange-500"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  </div>
                  <h2
                    style={{
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      fontWeight:    700,
                      fontSize:      "1.4rem",
                      letterSpacing: "-0.01em",
                      color:         "#ffffff",
                      lineHeight:    1,
                    }}
                  >
                    Request Cart
                  </h2>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2"
                  style={{ color: "rgba(255,255,255,0.35)", cursor: "pointer", background: "none", border: "none" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* cart items */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-12">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-orange-500/30"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)" }}>
                      NO ITEMS ADDED
                    </p>
                  </div>
                ) : (
                  cart.map(i => (
                    <div
                      key={i.id}
                      className="flex items-center justify-between gap-3 p-3"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border:     "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        className="flex-1 truncate"
                        style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}
                      >
                        {i.name}
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => updateQty(i.id, -1)}
                          className="w-6 h-6 flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}
                        >
                          <Minus size={10} />
                        </button>
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "#fff", minWidth: 16, textAlign: "center" }}>
                          {i.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(i.id, 1)}
                          className="w-6 h-6 flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}
                        >
                          <Plus size={10} />
                        </button>
                        <button
                          onClick={() => removeFromCart(i.id)}
                          className="w-6 h-6 flex items-center justify-center"
                          style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "rgba(239,68,68,0.6)", cursor: "pointer" }}
                        >
                          <X size={10} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* proceed button */}
              <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <motion.button
                  onClick={() => setShowForm(true)}
                  disabled={cart.length === 0}
                  whileHover={{ scale: cart.length === 0 ? 1 : 1.015 }}
                  whileTap={{   scale: cart.length === 0 ? 1 : 0.985 }}
                  className="relative w-full py-3 overflow-hidden disabled:opacity-40"
                  style={{
                    background:    cart.length === 0 ? "rgba(249,115,22,0.3)" : "rgb(249,115,22)",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontWeight:    700,
                    fontSize:      "0.95rem",
                    letterSpacing: "0.2em",
                    color:         "#000000",
                    border:        "none",
                    cursor:        cart.length === 0 ? "not-allowed" : "pointer",
                    boxShadow:     cart.length > 0 ? "0 0 20px rgba(249,115,22,0.25)" : "none",
                  }}
                >
                  {cart.length > 0 && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">PROCEED  →</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── REQUEST FORM MODAL ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{ scale: 0.96,    opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-md"
              style={{
                background:     "rgba(0,0,0,0.85)",
                backdropFilter: "blur(24px)",
                border:         "1px solid rgba(249,115,22,0.2)",
                boxShadow:      "0 40px 80px rgba(0,0,0,0.6)",
              }}
            >
              {/* top shimmer */}
              <div className="relative h-[1px] overflow-hidden" style={{ background: "rgba(249,115,22,0.15)" }}>
                <motion.div
                  className="absolute inset-y-0 w-1/3"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.8), transparent)" }}
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
              </div>

              {/* HUD corners */}
              <div className="absolute top-3 left-3 w-3 h-3" style={{ borderTop: "1px solid rgba(249,115,22,0.4)", borderLeft: "1px solid rgba(249,115,22,0.4)" }} />
              <div className="absolute top-3 right-3 w-3 h-3" style={{ borderTop: "1px solid rgba(249,115,22,0.4)", borderRight: "1px solid rgba(249,115,22,0.4)" }} />

              <div className="px-7 py-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] tracking-[0.28em]" style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}>
                      SYS.REQUEST
                    </span>
                    <motion.div className="w-1 h-1 rounded-full bg-orange-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                  </div>
                  <h3
                    style={{
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      fontWeight:    700,
                      fontSize:      "1.5rem",
                      letterSpacing: "-0.01em",
                      color:         "#ffffff",
                      lineHeight:    1,
                    }}
                  >
                    Requester Details
                  </h3>
                </div>

                {(["name", "department", "phone", "purpose"] as const).map(k => (
                  <CyberInput
                    key={k}
                    placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                    value={form[k]}
                    onChange={v => setForm({ ...form, [k]: v })}
                  />
                ))}

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 text-[10px] tracking-[0.2em]"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color:      "rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.04)",
                      border:     "1px solid rgba(255,255,255,0.08)",
                      cursor:     "pointer",
                    }}
                  >
                    CANCEL
                  </button>
                  <motion.button
                    onClick={submitRequest}
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.015 }}
                    whileTap={{   scale: submitting ? 1 : 0.985 }}
                    className="relative flex-1 py-2.5 overflow-hidden disabled:opacity-50"
                    style={{
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      fontWeight:    700,
                      fontSize:      "0.9rem",
                      letterSpacing: "0.2em",
                      color:         "#000000",
                      background:    "rgb(249,115,22)",
                      border:        "none",
                      cursor:        submitting ? "not-allowed" : "pointer",
                      boxShadow:     "0 0 16px rgba(249,115,22,0.25)",
                    }}
                  >
                    {submitting && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-10%", "110%"] }}
                        transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    <span className="relative z-10">{submitting ? "SUBMITTING..." : "SUBMIT"}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LOGIN MODAL — unchanged ── */}
      <LoginRequiredModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  )
}