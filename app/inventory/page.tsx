"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ShoppingCart, Plus, Minus, Search, X,
  CheckCircle2, ChevronRight, Cpu, Terminal, Zap,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import LoginRequiredModal from "@/components/auth/LoginRequiredModal"

/* ─────────────── types ─────────────── */
type InventoryItem = { id: string; name: string; category: string; quantity_available: number }
type CartItem      = InventoryItem & { quantity: number }

function getStatus(qty: number) {
  if (qty === 0) return { short: "UNAVAILABLE", color: "#ef4444", bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.28)" }
  if (qty < 10)  return { short: "LIMITED",     color: "#f97316", bg: "rgba(249,115,22,0.10)", border: "rgba(249,115,22,0.36)" }
  return               { short: "AVAILABLE",    color: "#22c55e", bg: "rgba(34,197,94,0.10)",  border: "rgba(34,197,94,0.28)"  }
}

/* ══════════════ PAGE ══════════════ */
export default function InventoryPage() {
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
  const [toastItem,  setToastItem]  = useState<string | null>(null)
  const [submitted,  setSubmitted]  = useState(false)
  const [form, setForm] = useState({ name: "", college: "FISAT", department: "", phone: "", purpose: "" })
  const [loading,    setLoading]    = useState(true)
  const [loadPct,    setLoadPct]    = useState(0)
  const [loadPhase,  setLoadPhase]  = useState(0) // 0=init, 1=fetching, 2=done

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 260], [1, 0])
  const heroY       = useTransform(scrollY, [0, 260], [0, -40])

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)) }, [])

  useEffect(() => {
    // Animate progress bar while fetching
    let pct = 0
    setLoadPhase(0)

    // Phase 0→1: quick jump to 30 (init)
    const t1 = setTimeout(() => { setLoadPct(30); setLoadPhase(1) }, 120)
    // Phase 1→2: crawl to 70 (waiting for db)
    const t2 = setTimeout(() => setLoadPct(70), 400)

    supabase.from("inventory_items")
      .select("id, name, category, quantity_available")
      .eq("is_active", true).order("name")
      .then(({ data }) => {
        if (data) setItems(data)
        // Jump to 100, hold briefly, then reveal page
        setLoadPct(100)
        setLoadPhase(2)
        setTimeout(() => setLoading(false), 700)
      })

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  /* ── cart (original logic, unchanged) ── */
  const requireAuth = useCallback((fn: () => void) => {
    if (!user) { setShowLogin(true); return }
    fn()
  }, [user])

  const addToCart = useCallback((item: InventoryItem) => {
    if (item.quantity_available === 0) return
    setCart(prev => {
      const ex = prev.find(i => i.id === item.id)
      if (ex) {
        if (ex.quantity >= item.quantity_available) return prev
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setToastItem(item.name)
    setTimeout(() => setToastItem(null), 2000)
  }, [])

  const updateQty = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i
      const next = i.quantity + delta
      if (next < 1 || next > i.quantity_available) return i
      return { ...i, quantity: next }
    }))
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const submitRequest = async () => {
    if (!user) return
    const { name, department, phone, purpose } = form
    if (!name || !department || !phone || !purpose) return
    try {
      setSubmitting(true)
      const res = await fetch("/api/inventory-request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, requester: form, items: cart.map(i => ({ id: i.id, quantity: i.quantity })) }),
      })
      if (!res.ok) return
      setCart([]); setShowCart(false); setShowForm(false)
      setSubmitted(true); setTimeout(() => setSubmitted(false), 2500)
    } finally { setSubmitting(false) }
  }

  const categories    = ["all", ...Array.from(new Set(items.map(i => i.category)))]
  const filteredItems = items
    .filter(item => {
      const ms = `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase())
      return ms && (category === "all" || item.category === category)
    })
    .sort((a, b) => sort === "availability" ? b.quantity_available - a.quantity_available : a.name.localeCompare(b.name))
  const cartCount  = cart.reduce((s, i) => s + i.quantity, 0)
  const cartUnique = cart.length

  /* ── render ── */
  return (
    <div className="r">
      <style>{CSS}</style>

      {/* ══ LOADER ══ */}
      <AnimatePresence>
        {loading && (
          <motion.div className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}>

            <div className="loader-orb" aria-hidden />

            <motion.div className="loader-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}>

              {/* logo mark */}
              <div className="ld-mark">
                <Cpu size={18} color="#f97316" strokeWidth={2} />
              </div>

              {/* heading */}
              <div className="ld-type">
                <span className="ld-h1">LAB</span>
                <span className="ld-h2">INVENTORY</span>
              </div>

              <p className="ld-sub">FISAT · IDEA LAB</p>

              {/* progress bar */}
              <div className="ld-bar-wrap">
                <motion.div className="ld-bar-fill"
                  animate={{ width: `${loadPct}%` }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>

              {/* phase label */}
              <div className="ld-phase-row">
                <span className="ld-phase-dot" style={{ background: loadPhase === 2 ? "#22c55e" : "#f97316" }} />
                <span className="ld-phase-txt">
                  {loadPhase === 0 && "INITIALIZING..."}
                  {loadPhase === 1 && "QUERYING DATABASE..."}
                  {loadPhase === 2 && "ASSETS LOADED"}
                </span>
                <span className="ld-pct">{loadPct}%</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* solid cover — nukes any global dot/particle bg from globals.css */}
      <div className="bg-cover" aria-hidden />

      {/* line grid background */}
      <div className="bg-grid" aria-hidden />

      {/* orange ambient orb */}
      <div className="orb" aria-hidden />

      {/* ══ toasts ══ */}
      <AnimatePresence>
        {toastItem && (
          <motion.div className="toast t-orange"
            initial={{ opacity: 0, y: 18, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ type: "spring", stiffness: 380, damping: 28 }}>
            <div className="t-ico o-ico"><CheckCircle2 size={13} color="#f97316" /></div>
            <div><p className="t-title">ADDED TO REQUEST</p><p className="t-sub">{toastItem}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {submitted && (
          <motion.div className="toast t-green"
            initial={{ opacity: 0, y: 18, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ type: "spring", stiffness: 380, damping: 28 }}>
            <div className="t-ico g-ico"><CheckCircle2 size={13} color="#22c55e" /></div>
            <div><p className="t-title">REQUEST SUBMITTED</p><p className="t-sub">Lab team will review shortly</p></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HEADER ══ */}
      <header className="hdr">
        <div className="hdr-l">
          <div className="hdr-mark">
            <Cpu size={12} color="#f97316" strokeWidth={2.5} />
          </div>
          <span className="hdr-name">LAB INVENTORY</span>
          <span className="hdr-pipe" />
          <span className="hdr-sub">FISAT · IDEA LAB</span>
        </div>
        <div className="hdr-r">
          {user && (
            <span className="sync-tag">
              <span className="sync-dot" />SYNC_ACTIVE
            </span>
          )}
          <button
            className={`cart-btn ${cartCount > 0 ? "cart-btn-active" : ""}`}
            onClick={() => requireAuth(() => setShowCart(true))}
            suppressHydrationWarning
          >
            <ShoppingCart size={14} strokeWidth={2} />
            <span>{cartCount > 0 ? `${cartUnique} ITEM${cartUnique !== 1 ? "S" : ""}` : "CART"}</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span className="cart-pip"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <motion.section className="hero" ref={heroRef} style={{ opacity: heroOpacity, y: heroY }}>
        {/* terminal readout */}
        <div className="term">
          <span className="term-cursor" />&nbsp;
          <span className="term-dim">[SYSTEM_REPORT]</span>
          <span className="term-row"><span className="term-arrow">&gt;</span> DATABASE_QUERY: <span className="term-ok">SUCCESS</span></span>
          <span className="term-row"><span className="term-arrow">&gt;</span> ASSETS_LOCATED: <span className="term-ok">TRUE</span></span>
          <span className="term-row"><span className="term-arrow">&gt;</span> TERMINAL: <span className="term-ok">FISAT_IDEA_LAB</span></span>
        </div>

        <div className="hero-eyebrow">
          <span className="ey-pill">LIVE RESOURCE DATABASE</span>
          <span className="ey-line" />
          <span className="ey-tag">SYNC_ACTIVE</span>
        </div>

        <div className="hero-type">
          <motion.h1 className="ht-solid"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [.16,1,.3,1] }}>
            LAB
          </motion.h1>
          <motion.h1 className="ht-outline"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08, ease: [.16,1,.3,1] }}>
            INVENTORY
          </motion.h1>
        </div>

        <motion.p className="hero-desc"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
          Browse, reserve, and request equipment for your projects.<br />
          All reservations are reviewed by lab coordinators.
        </motion.p>
      </motion.section>

      {/* ══ FILTER BAR ══ */}
      <div className="fbar">
        <div className="fbar-top">
          <div className="srch-wrap">
            <Search size={13} className="srch-ico" strokeWidth={2} />
            <input className="srch-inp" placeholder="SEARCH COMPONENTS, TOOLS..."
              value={search} onChange={e => setSearch(e.target.value)} suppressHydrationWarning />
            {search && (
              <button className="srch-clear" onClick={() => setSearch("")}><X size={12} /></button>
            )}
          </div>
          <select className="sort-sel" value={sort} onChange={e => setSort(e.target.value)} suppressHydrationWarning>
            <option value="name">SORT: NAME</option>
            <option value="availability">SORT: AVAILABILITY</option>
          </select>
        </div>
        <div className="cat-row">
          {categories.map(c => (
            <button key={c} className={`cat-btn ${category === c ? "cat-on" : ""}`} onClick={() => setCategory(c)} suppressHydrationWarning>
              {c === "all" ? "ALL" : c.toUpperCase()}
            </button>
          ))}
        </div>
        {/* result count line */}
        <div className="result-line">
          <span className="result-count">{filteredItems.length}</span>
          <span className="result-label"> ASSET{filteredItems.length !== 1 ? "S" : ""} FOUND</span>
          {category !== "all" && <span className="result-cat"> · {category.toUpperCase()}</span>}
        </div>
      </div>

      {/* ══ GRID ══ */}
      <div className="grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const st      = getStatus(item.quantity_available)
            const inCart  = cart.find(c => c.id === item.id)
            const unavail = item.quantity_available === 0

            return (
              <motion.div key={item.id} className={`card ${unavail ? "card-off" : ""}`}
                layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22, delay: Math.min(idx * 0.028, 0.28) }}
                whileHover={unavail ? {} : { y: -3 }}>

                {/* scan line — top edge glow on hover */}
                <span className="card-scan" />

                {/* row 1: icon + in-cart pill */}
                <div className="card-r1">
                  <div className={`card-ico ${unavail ? "" : "card-ico-lit"}`}>
                    <Cpu size={15} color={unavail ? "#333" : "#f97316"} strokeWidth={2} />
                  </div>
                  <AnimatePresence>
                    {inCart && (
                      <motion.span className="incart-pill"
                        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
                        ×{inCart.quantity}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* name + category */}
                <div className="card-body">
                  <h3 className="card-name">{item.name}</h3>
                  <p className="card-cat">{item.category.toUpperCase()}</p>
                </div>

                {/* status + qty */}
                <div className="card-meta">
                  <span className="st-badge" style={{ color: st.color, background: st.bg, borderColor: st.border }}>
                    <span className="st-dot" style={{ background: st.color }} />
                    {st.short}
                  </span>
                  <span className="card-qty">QTY·{String(item.quantity_available).padStart(3, "0")}</span>
                </div>

                {/* CTA */}
                <button className={`card-cta ${unavail ? "cta-off" : "cta-on"}`}
                  disabled={unavail}
                  onClick={() => requireAuth(() => addToCart(item))}
                  suppressHydrationWarning>
                  {unavail ? "UNAVAILABLE" : <><Plus size={11} strokeWidth={3} />REQUEST</>}
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="empty">
            <Cpu size={38} style={{ opacity: 0.1, marginBottom: 14 }} />
            <p className="empty-h">NO ASSETS FOUND</p>
            <p className="empty-s">Adjust search or category filter</p>
          </div>
        )}
      </div>

      {/* ══ CART DRAWER ══ */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div className="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)} />

            <motion.aside className="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 330, damping: 34 }}>

              {/* drawer header */}
              <div className="dr-head">
                <div className="dr-head-l">
                  <div className="dr-mark"><ShoppingCart size={13} color="#f97316" /></div>
                  <div>
                    <p className="dr-title">REQUEST CART</p>
                    <p className="dr-sub">{cart.length === 0 ? "EMPTY" : `${cartUnique} TYPE${cartUnique !== 1 ? "S" : ""} · ${cartCount} UNIT${cartCount !== 1 ? "S" : ""}`}</p>
                  </div>
                </div>
                <button className="ico-btn" onClick={() => setShowCart(false)} suppressHydrationWarning><X size={14} /></button>
              </div>

              {/* orange accent rule */}
              <div className="dr-rule" />

              {/* items */}
              <div className="dr-body">
                {cart.length === 0 ? (
                  <div className="dr-empty">
                    <ShoppingCart size={30} style={{ opacity: 0.12, marginBottom: 10 }} />
                    <p className="dr-empty-t">CART IS EMPTY</p>
                    <p className="dr-empty-s">Add items from the inventory below</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map(i => (
                      <motion.div key={i.id} className="dr-item"
                        layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.2 }}>
                        <div className="dri-ico"><Cpu size={12} color="#f97316" /></div>
                        <div className="dri-info">
                          <p className="dri-name">{i.name}</p>
                          <p className="dri-cat">{i.category.toUpperCase()}</p>
                        </div>
                        <div className="dri-ctrl">
                          <button className="q-btn" onClick={() => updateQty(i.id, -1)} suppressHydrationWarning><Minus size={9} strokeWidth={3} /></button>
                          <span className="q-val">{i.quantity}</span>
                          <button className="q-btn" onClick={() => updateQty(i.id, 1)} suppressHydrationWarning><Plus size={9} strokeWidth={3} /></button>
                          <button className="del-btn" onClick={() => removeFromCart(i.id)} suppressHydrationWarning><X size={11} /></button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* footer */}
              <div className="dr-foot">
                {cart.length > 0 && (
                  <div className="dr-note">
                    <Terminal size={11} style={{ flexShrink: 0, color: "#f97316", marginTop: 1 }} />
                    <span>Requests are subject to coordinator approval and current availability.</span>
                  </div>
                )}
                <button className="cta-primary" disabled={cart.length === 0} onClick={() => setShowForm(true)} suppressHydrationWarning>
                  PROCEED TO DETAILS <ChevronRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ══ FORM MODAL ══ */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div className="overlay" style={{ zIndex: 60 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)} />
            <motion.div className="modal-shell" style={{ zIndex: 61 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="modal"
                initial={{ scale: 0.93, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 16 }}
                onClick={e => e.stopPropagation()}>

                {/* modal header */}
                <div className="modal-hd">
                  <div className="modal-ico"><Zap size={16} color="#f97316" strokeWidth={2.5} /></div>
                  <div>
                    <p className="modal-title">REQUESTER DETAILS</p>
                    <p className="modal-sub">Complete the form to submit your request</p>
                  </div>
                  <button className="ico-btn" style={{ marginLeft: "auto" }} onClick={() => setShowForm(false)} suppressHydrationWarning><X size={13} /></button>
                </div>

                <div className="modal-rule" />

                {/* fields */}
                {[
                  { k: "name",       l: "FULL NAME",     p: "Your full name" },
                  { k: "department", l: "DEPARTMENT",    p: "e.g. ECE, CSE, ME" },
                  { k: "phone",      l: "PHONE",         p: "10-digit mobile number" },
                  { k: "purpose",    l: "PROJECT / USE", p: "Describe your use case briefly" },
                ].map(({ k, l, p }) => (
                  <div key={k} className="mfield">
                    <label className="mfield-l">{l}</label>
                    <input className="mfield-i" placeholder={p}
                      value={(form as any)[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} suppressHydrationWarning />
                  </div>
                ))}

                <div className="modal-acts">
                  <button className="ghost-btn" onClick={() => setShowForm(false)} suppressHydrationWarning>CANCEL</button>
                  <button className="cta-primary" style={{ flex: 2 }} disabled={submitting} onClick={submitRequest} suppressHydrationWarning>
                    {submitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginRequiredModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
}

/* ══════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Barlow:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

.r {
  min-height:100vh;
  background:#090909;
  color:#e0dbd3;
  font-family:'Barlow',sans-serif;
  position:relative;
  overflow-x:hidden;
  /* kill any inherited global bg pattern */
  isolation:isolate;
}

/* solid cover to nuke any global dot/particle backgrounds */
.bg-cover{
  position:fixed;inset:0;
  background:#090909;
  pointer-events:none;
  z-index:0;
}

/* line grid sits on top of the cover */
.bg-grid{
  position:fixed;inset:0;pointer-events:none;z-index:1;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size:60px 60px;
}

/* ─ ambient orb ─ */
.orb{
  position:fixed;top:-200px;right:-140px;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(249,115,22,0.06) 0%,transparent 68%);
  pointer-events:none;z-index:2;
  animation:orb-drift 10s ease-in-out infinite;
}
/* second orb — bottom-left, very subtle */
.orb::after{
  content:'';
  position:fixed;bottom:-200px;left:-100px;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(249,115,22,0.03) 0%,transparent 65%);
  pointer-events:none;
}
@keyframes orb-drift{
  0%,100%{transform:translate(0,0) scale(1);}
  50%{transform:translate(-24px,36px) scale(1.06);}
}

/* ─ header ─ */
.hdr{
  position:sticky;top:0;z-index:40;
  background:rgba(9,9,9,0.96);
  backdrop-filter:blur(22px);
  border-bottom:1px solid rgba(255,255,255,0.05);
  padding:0 36px;height:58px;
  display:flex;align-items:center;justify-content:space-between;
}
.hdr-l{display:flex;align-items:center;gap:12px;}
.hdr-mark{
  width:28px;height:28px;border-radius:6px;
  border:1px solid rgba(249,115,22,0.35);
  display:flex;align-items:center;justify-content:center;
  background:rgba(249,115,22,0.05);
}
.hdr-name{
  font-family:'Barlow Condensed',sans-serif;
  font-size:15px;font-weight:800;letter-spacing:0.14em;color:#e0dbd3;
}
.hdr-pipe{width:1px;height:16px;background:rgba(255,255,255,0.08);}
.hdr-sub{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:500;letter-spacing:0.12em;color:#444;
}
.hdr-r{display:flex;align-items:center;gap:14px;}
.sync-tag{
  display:flex;align-items:center;gap:7px;
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:600;letter-spacing:0.12em;color:#555;
}
.sync-dot{
  width:6px;height:6px;border-radius:50%;
  background:#22c55e;
  box-shadow:0 0 8px #22c55e;
  animation:blink 2.2s ease-in-out infinite;
}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.25;}}

/* cart button */
.cart-btn{
  display:flex;align-items:center;gap:8px;
  background:transparent;
  border:1px solid rgba(255,255,255,0.08);
  border-radius:6px;padding:7px 16px;
  cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:700;letter-spacing:0.1em;color:#e0dbd3;
  transition:border-color 0.2s,background 0.2s,box-shadow 0.2s;
  position:relative;
}
.cart-btn:hover{border-color:rgba(249,115,22,0.4);background:rgba(249,115,22,0.05);}
.cart-btn-active{
  border-color:rgba(249,115,22,0.5)!important;
  background:rgba(249,115,22,0.08)!important;
  box-shadow:0 0 18px rgba(249,115,22,0.12);
  color:#f97316!important;
}
.cart-pip{
  position:absolute;top:-7px;right:-7px;
  background:#f97316;color:#fff;
  font-size:10px;font-weight:800;
  min-width:18px;height:18px;border-radius:9px;
  display:flex;align-items:center;justify-content:center;
  padding:0 4px;box-shadow:0 0 10px rgba(249,115,22,0.6);
}

/* ─ hero ─ */
.hero{
  position:relative;z-index:3;
  padding:56px 36px 44px;
  max-width:1380px;margin:0 auto;
}

/* terminal readout */
.term{
  position:absolute;top:48px;right:36px;
  display:none;flex-direction:column;gap:0;
  background:#0d0d0d;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:8px;padding:14px 18px;
  font-family:'Barlow Condensed',monospace;
  font-size:11px;letter-spacing:0.04em;
}
@media(min-width:860px){.term{display:flex;}}
.term-cursor{
  display:inline-block;width:7px;height:11px;
  background:#f97316;vertical-align:middle;
  animation:blink-cur 1s step-end infinite;
}
@keyframes blink-cur{0%,100%{opacity:1;}50%{opacity:0;}}
.term-dim{color:#3a3a3a;margin-bottom:6px;font-size:10px;}
.term-row{display:block;color:#666;line-height:1.9;}
.term-arrow{color:#2a2a2a;}
.term-ok{color:#f97316;}

.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;margin-bottom:20px;}
.ey-pill{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:0.12em;color:#f97316;
  border:1px solid rgba(249,115,22,0.3);border-radius:3px;padding:3px 10px;
}
.ey-line{width:28px;height:1px;background:rgba(255,255,255,0.1);}
.ey-tag{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:600;letter-spacing:0.12em;color:#444;
}

/* hero type */
.hero-type{line-height:0.92;margin-bottom:24px;user-select:none;}
.ht-solid{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(80px,11vw,130px);
  font-weight:900;letter-spacing:-0.01em;
  color:#e0dbd3;display:block;
}
.ht-outline{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(80px,11vw,130px);
  font-weight:900;letter-spacing:-0.01em;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(255,255,255,0.08);
  display:block;margin-top:-6px;
}

.hero-desc{
  font-size:14px;color:#555;line-height:1.8;
  max-width:420px;font-weight:400;
}

/* ─ filter bar ─ */
.fbar{
  position:relative;z-index:3;
  padding:0 36px 18px;
  max-width:1380px;margin:0 auto;
  display:flex;flex-direction:column;gap:10px;
}
.fbar-top{display:flex;gap:8px;align-items:center;}

/* search */
.srch-wrap{position:relative;flex:1;}
.srch-ico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#444;pointer-events:none;}
.srch-clear{
  position:absolute;right:10px;top:50%;transform:translateY(-50%);
  background:transparent;border:none;color:#444;cursor:pointer;
  display:flex;align-items:center;justify-content:center;padding:3px;
  transition:color 0.15s;
}
.srch-clear:hover{color:#e0dbd3;}
.srch-inp{
  width:100%;
  background:#0e0e0e;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:6px;padding:11px 34px 11px 36px;
  color:#e0dbd3;
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:600;letter-spacing:0.08em;
  outline:none;transition:border-color 0.2s,background 0.2s;
}
.srch-inp:focus{border-color:rgba(249,115,22,0.3);background:#111;}
.srch-inp::placeholder{color:#333;}

.sort-sel{
  background:#0e0e0e;border:1px solid rgba(255,255,255,0.06);
  border-radius:6px;padding:11px 14px;color:#e0dbd3;
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:700;letter-spacing:0.1em;
  outline:none;cursor:pointer;transition:border-color 0.2s;
  flex-shrink:0;
}
.sort-sel:focus{border-color:rgba(249,115,22,0.3);}
.sort-sel option{background:#111;}

/* category chips */
.cat-row{display:flex;gap:6px;flex-wrap:wrap;}
.cat-btn{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:0.1em;
  padding:5px 13px;border-radius:4px;
  border:1px solid rgba(255,255,255,0.06);
  background:transparent;color:#555;cursor:pointer;
  transition:all 0.15s;white-space:nowrap;
}
.cat-btn:hover{border-color:rgba(249,115,22,0.3);color:#f97316;background:rgba(249,115,22,0.04);}
.cat-on{background:#f97316!important;border-color:#f97316!important;color:#fff!important;}

/* result line */
.result-line{
  display:flex;align-items:baseline;gap:2px;
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;letter-spacing:0.08em;
}
.result-count{font-size:14px;font-weight:800;color:#f97316;}
.result-label{color:#444;font-weight:600;}
.result-cat{color:#555;font-weight:600;}

/* ─ grid ─ */
.grid{
  position:relative;z-index:3;
  padding:0 36px 80px;
  max-width:1380px;margin:0 auto;
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
  gap:12px;
}

/* ─ card ─ */
.card{
  background:#0f0f0f;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:14px;padding:20px;
  display:flex;flex-direction:column;gap:14px;
  position:relative;overflow:hidden;
  cursor:default;
  transition:border-color 0.25s,box-shadow 0.25s;
}

/* top-edge scan glow — hidden until hover */
.card-scan{
  position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(249,115,22,0),transparent);
  transition:background 0.35s;
}
.card:hover:not(.card-off) .card-scan{
  background:linear-gradient(90deg,transparent 5%,rgba(249,115,22,0.7) 50%,transparent 95%);
}
.card:hover:not(.card-off){
  border-color:rgba(249,115,22,0.22);
  box-shadow:0 0 0 1px rgba(249,115,22,0.06),0 6px 28px rgba(0,0,0,0.5),0 0 40px rgba(249,115,22,0.04);
}

.card-off{opacity:0.38;}
.card-off:hover{border-color:rgba(255,255,255,0.06)!important;box-shadow:none!important;}

.card-r1{display:flex;justify-content:space-between;align-items:center;}
.card-ico{
  width:38px;height:38px;border-radius:10px;
  background:#1a1a1a;border:1px solid rgba(255,255,255,0.06);
  display:flex;align-items:center;justify-content:center;
  transition:background 0.2s,border-color 0.2s;
}
.card-ico-lit{
  background:rgba(249,115,22,0.1);
  border-color:rgba(249,115,22,0.25);
}
.card:hover:not(.card-off) .card-ico-lit{
  background:rgba(249,115,22,0.16);
  border-color:rgba(249,115,22,0.4);
}

/* in-cart indicator — solid, impossible to miss */
.incart-pill{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:800;letter-spacing:0.06em;
  background:#f97316;color:#fff;
  border-radius:5px;padding:3px 9px;
  box-shadow:0 0 12px rgba(249,115,22,0.45);
}

.card-body{flex:1;}
.card-name{
  font-family:'Barlow Condensed',sans-serif;
  font-size:16px;font-weight:700;letter-spacing:0.02em;
  color:#e0dbd3;line-height:1.3;
}
.card-cat{
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:600;letter-spacing:0.1em;
  color:#3a3a3a;margin-top:4px;
}

.card-meta{display:flex;align-items:center;justify-content:space-between;}
.st-badge{
  display:inline-flex;align-items:center;gap:5px;
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:800;letter-spacing:0.1em;
  padding:3px 9px;border-radius:4px;
  border-width:1px;border-style:solid;
}
.st-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.card-qty{
  font-family:'Barlow Condensed',monospace;
  font-size:12px;font-weight:600;letter-spacing:0.06em;color:#333;
}

/* card CTA */
.card-cta{
  width:100%;
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:800;letter-spacing:0.12em;
  padding:10px 12px;border-radius:8px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:5px;
  transition:all 0.18s;
}
.cta-on{
  background:rgba(249,115,22,0.08);
  border:1px solid rgba(249,115,22,0.22);color:#f97316;
}
.cta-on:hover{
  background:#f97316;border-color:#f97316;color:#fff;
  box-shadow:0 4px 20px rgba(249,115,22,0.3);
}
.cta-off{
  background:transparent;
  border:1px solid rgba(255,255,255,0.05);color:#333;cursor:not-allowed;
}

/* empty */
.empty{
  grid-column:1/-1;display:flex;flex-direction:column;
  align-items:center;justify-content:center;padding:90px 20px;
  color:#2a2a2a;text-align:center;
}
.empty-h{
  font-family:'Barlow Condensed',sans-serif;
  font-size:22px;font-weight:800;letter-spacing:0.1em;color:#2a2a2a;
}
.empty-s{font-size:13px;color:#333;margin-top:8px;}

/* ─ overlay ─ */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.84);backdrop-filter:blur(10px);z-index:50;}

/* ─ drawer ─ */
.drawer{
  position:fixed;right:0;top:0;
  height:100%;width:min(420px,100vw);
  background:#0b0b0b;
  border-left:1px solid rgba(255,255,255,0.07);
  z-index:55;display:flex;flex-direction:column;overflow:hidden;
}
.dr-head{
  padding:24px 22px 18px;
  border-bottom:1px solid rgba(255,255,255,0.05);
  display:flex;align-items:center;justify-content:space-between;
  flex-shrink:0;
}
.dr-head-l{display:flex;align-items:center;gap:12px;}
.dr-mark{
  width:32px;height:32px;border-radius:8px;
  background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.dr-title{
  font-family:'Barlow Condensed',sans-serif;
  font-size:18px;font-weight:800;letter-spacing:0.1em;color:#e0dbd3;
}
.dr-sub{
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:600;letter-spacing:0.12em;color:#444;margin-top:2px;
}

/* orange rule */
.dr-rule{
  height:2px;flex-shrink:0;
  background:linear-gradient(90deg,#f97316 0%,rgba(249,115,22,0.2) 60%,transparent 100%);
}

.dr-body{flex:1;overflow-y:auto;padding:16px 20px;}
.dr-empty{
  display:flex;flex-direction:column;align-items:center;
  padding-top:60px;
}
.dr-empty-t{
  font-family:'Barlow Condensed',sans-serif;
  font-size:16px;font-weight:800;letter-spacing:0.12em;color:#2a2a2a;margin-top:8px;
}
.dr-empty-s{font-size:12px;color:#333;margin-top:5px;letter-spacing:0.03em;}

/* drawer items — fully elevated, NOT merging with bg */
.dr-item{
  display:flex;align-items:center;gap:10px;
  padding:13px 14px;
  margin-bottom:8px;
  background:#141414;
  border:1px solid rgba(255,255,255,0.07);
  border-radius:10px;
  transition:border-color 0.2s,background 0.2s;
}
.dr-item:hover{border-color:rgba(249,115,22,0.25);background:#171717;}
.dri-ico{
  width:32px;height:32px;border-radius:8px;
  background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.dri-info{flex:1;min-width:0;}
.dri-name{
  font-family:'Barlow Condensed',sans-serif;
  font-size:14px;font-weight:700;letter-spacing:0.03em;color:#e0dbd3;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.dri-cat{
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:600;letter-spacing:0.1em;color:#444;margin-top:2px;
}
.dri-ctrl{display:flex;align-items:center;gap:7px;flex-shrink:0;}
.q-btn{
  width:26px;height:26px;border-radius:6px;
  background:#1c1c1c;border:1px solid rgba(255,255,255,0.07);
  color:#777;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:border-color 0.15s,color 0.15s;
}
.q-btn:hover{border-color:rgba(249,115,22,0.4);color:#f97316;}
.q-val{
  font-family:'Barlow Condensed',sans-serif;
  font-size:16px;font-weight:800;color:#e0dbd3;
  min-width:18px;text-align:center;
}
.del-btn{
  width:26px;height:26px;border-radius:6px;
  background:transparent;border:none;color:#444;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:color 0.15s;
}
.del-btn:hover{color:#ef4444;}

.dr-foot{
  padding:14px 20px;
  border-top:1px solid rgba(255,255,255,0.05);
  flex-shrink:0;display:flex;flex-direction:column;gap:10px;
}
.dr-note{
  display:flex;align-items:flex-start;gap:8px;
  background:rgba(249,115,22,0.04);
  border:1px solid rgba(249,115,22,0.1);
  border-radius:6px;padding:10px 12px;
  font-size:11.5px;color:#555;line-height:1.65;letter-spacing:0.02em;
}

/* ─ primary CTA ─ */
.cta-primary{
  width:100%;background:#f97316;color:#fff;
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:900;letter-spacing:0.12em;
  padding:13px 16px;border-radius:8px;border:none;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
  transition:background 0.2s,box-shadow 0.2s,transform 0.15s;
}
.cta-primary:hover:not(:disabled){
  background:#e8680a;
  box-shadow:0 6px 28px rgba(249,115,22,0.38);
  transform:translateY(-1px);
}
.cta-primary:active:not(:disabled){transform:translateY(0);}
.cta-primary:disabled{opacity:0.28;cursor:not-allowed;}

/* ─ modal ─ */
.modal-shell{
  position:fixed;inset:0;
  display:flex;align-items:center;justify-content:center;padding:20px;
}
.modal{
  background:#0c0c0c;
  border:1px solid rgba(255,255,255,0.09);
  border-radius:16px;padding:28px;
  width:100%;max-width:420px;
  display:flex;flex-direction:column;gap:16px;
}
.modal-hd{display:flex;align-items:center;gap:14px;}
.modal-ico{
  width:40px;height:40px;border-radius:10px;
  background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.28);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.modal-title{
  font-family:'Barlow Condensed',sans-serif;
  font-size:20px;font-weight:900;letter-spacing:0.1em;color:#e0dbd3;
}
.modal-sub{font-size:11.5px;color:#555;margin-top:3px;letter-spacing:0.02em;}
.modal-rule{height:1px;background:rgba(255,255,255,0.05);}

.mfield{display:flex;flex-direction:column;gap:6px;}
.mfield-l{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:0.12em;color:#555;
}
.mfield-i{
  background:#141414;border:1px solid rgba(255,255,255,0.06);
  border-radius:8px;padding:11px 13px;
  color:#e0dbd3;font-family:'Barlow',sans-serif;font-size:13px;
  outline:none;transition:border-color 0.2s,background 0.2s;width:100%;
}
.mfield-i:focus{border-color:rgba(249,115,22,0.35);background:#171717;}
.mfield-i::placeholder{color:#333;}

.modal-acts{display:flex;gap:10px;}
.ghost-btn{
  flex:1;background:transparent;
  border:1px solid rgba(255,255,255,0.07);
  color:#555;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:700;letter-spacing:0.1em;
  padding:12px;border-radius:8px;
  transition:border-color 0.15s,color 0.15s;
}
.ghost-btn:hover{border-color:rgba(255,255,255,0.14);color:#e0dbd3;}

/* ─ icon btn ─ */
.ico-btn{
  width:30px;height:30px;border-radius:6px;
  background:#161616;border:1px solid rgba(255,255,255,0.06);
  color:#555;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:color 0.15s,border-color 0.15s;flex-shrink:0;
}
.ico-btn:hover{color:#e0dbd3;border-color:rgba(255,255,255,0.12);}

/* ─ toasts ─ */
.toast{
  position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
  z-index:200;background:#0d0d0d;
  border-radius:12px;padding:13px 20px;
  display:flex;align-items:center;gap:13px;
  box-shadow:0 16px 48px rgba(0,0,0,0.75);
  white-space:nowrap;min-width:260px;
}
.t-orange{border:1px solid rgba(249,115,22,0.3);box-shadow:0 16px 48px rgba(0,0,0,0.75),0 0 30px rgba(249,115,22,0.08);}
.t-green {border:1px solid rgba(34,197,94,0.25);}
.t-ico{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.o-ico{background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.22);}
.g-ico{background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.22);}
.t-title{
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:800;letter-spacing:0.1em;color:#e0dbd3;
}
.t-sub{font-family:'Barlow',sans-serif;font-size:11px;color:#555;margin-top:2px;max-width:190px;overflow:hidden;text-overflow:ellipsis;}

/* ─ scrollbar ─ */
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#1e1e1e;border-radius:3px;}

/* ─ loader ─ */
.loader{
  position:fixed;inset:0;z-index:999;
  background:#090909;
  display:flex;align-items:center;justify-content:center;
  flex-direction:column;
  /* force block any global background */
  isolation:isolate;
}
.loader-orb{
  position:absolute;top:-160px;right:-100px;
  width:480px;height:480px;border-radius:50%;
  background:radial-gradient(circle,rgba(249,115,22,0.08) 0%,transparent 70%);
  pointer-events:none;
  animation:orb-drift 6s ease-in-out infinite;
}
/* line grid inside loader */
.loader::before{
  content:'';
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size:60px 60px;
  pointer-events:none;
}
.loader-body{
  display:flex;flex-direction:column;align-items:center;
  gap:0;position:relative;z-index:1;
}
.ld-mark{
  width:52px;height:52px;border-radius:13px;
  border:1px solid rgba(249,115,22,0.35);
  background:rgba(249,115,22,0.07);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:28px;
  box-shadow:0 0 28px rgba(249,115,22,0.12);
}
.ld-type{
  display:flex;flex-direction:column;align-items:center;
  line-height:0.88;margin-bottom:10px;user-select:none;
}
.ld-h1{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(60px,10vw,100px);
  font-weight:900;letter-spacing:-0.01em;
  color:#e0dbd3;
}
.ld-h2{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(60px,10vw,100px);
  font-weight:900;letter-spacing:-0.01em;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(255,255,255,0.1);
}
.ld-sub{
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:600;letter-spacing:0.18em;
  color:#444;margin-bottom:36px;
}
.ld-bar-wrap{
  width:280px;height:2px;
  background:rgba(255,255,255,0.05);
  border-radius:2px;overflow:hidden;
  margin-bottom:14px;
}
.ld-bar-fill{
  height:100%;border-radius:2px;
  background:linear-gradient(90deg,#f97316,#fb923c);
  box-shadow:0 0 12px rgba(249,115,22,0.6);
  width:0%;
}
.ld-phase-row{
  display:flex;align-items:center;gap:8px;
  width:280px;justify-content:space-between;
}
.ld-phase-dot{
  width:6px;height:6px;border-radius:50%;flex-shrink:0;
  animation:blink 1.4s ease-in-out infinite;
}
.ld-phase-txt{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:600;letter-spacing:0.1em;color:#555;
  flex:1;
}
.ld-pct{
  font-family:'Barlow Condensed',monospace;
  font-size:11px;font-weight:700;letter-spacing:0.06em;color:#f97316;
}

/* ─ responsive ─ */
@media(max-width:640px){
  .hdr,.hero,.fbar,.grid{padding-left:16px;padding-right:16px;}
  .grid{grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:10px;padding-bottom:60px;}
  .ht-solid,.ht-outline{font-size:60px;}
  .hdr{padding:0 16px;}
  .hero{padding-top:36px;padding-bottom:28px;}
  .fbar{padding-bottom:14px;}
}
`