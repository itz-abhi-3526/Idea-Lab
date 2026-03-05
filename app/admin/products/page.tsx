'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const SKY      = (a = 1) => `rgba(56,189,248,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ── MCInput ── */
function MCInput({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string | number; placeholder?: string
  onChange: (v: string) => void; type?: string
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1, background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
        <input type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ width: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, background: foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)", borderTop: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderRight: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderLeft: "none", outline: "none", color: DIMWHITE(0.85), fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.04em", transition: "background 0.18s" }}
        />
      </div>
    </div>
  )
}

/* ── MCTextarea ── */
function MCTextarea({ label, value, onChange, rows = 3, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1, background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
        <textarea rows={rows} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ width: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, resize: "vertical", background: foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)", borderTop: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderRight: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderLeft: "none", outline: "none", color: DIMWHITE(0.85), fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.65, transition: "background 0.18s" }}
        />
      </div>
    </div>
  )
}

/* ── MCBoolSelect ── */
function MCBoolSelect({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)` }} />
        <select value={String(value)} onChange={e => onChange(e.target.value === "true")}
          style={{ width: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, background: "rgba(0,0,0,0.35)", borderTop: `1px solid ${AMBER(0.09)}`, borderRight: `1px solid ${AMBER(0.09)}`, borderBottom: `1px solid ${AMBER(0.09)}`, borderLeft: "none", outline: "none", color: DIMWHITE(0.75), fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.06em", cursor: "pointer", appearance: "none" as any }}
        >
          <option value="true"  style={{ background: BG }}>TRUE</option>
          <option value="false" style={{ background: BG }}>FALSE</option>
        </select>
      </div>
    </div>
  )
}

/* ── Section Rule ── */
function SRule({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0 2px" }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.35), whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.18)},transparent)` }} />
    </div>
  )
}

/* ── TYPES — unchanged ── */
type Product = {
  id: string; title: string; short_description: string | null; full_description: string | null
  category: string | null; status: string | null; price: number | null; is_paid: boolean
  demo_url: string | null; github_url: string | null; docs_url: string | null; image_url: string | null
  technologies: string | null; team_size: number | null; is_featured: boolean; is_active: boolean
}

/* ── PAGE ── */
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [open,     setOpen]     = useState(false)
  const [editing,  setEditing]  = useState<Product | null>(null)
  const [deleteFor, setDeleteFor] = useState<string | null>(null)
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => { loadProducts() }, [])

  async function loadProducts() {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })
    if (error) { console.error(error); return }
    setProducts(data || [])
  }

  async function deleteProduct(id: string) {

  setDeleting(true)

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()

  setDeleting(false)

  if (error) {
    console.error(error)
    alert(error.message)
    return
  }

  console.log("Deleted:", data)

  setDeleteFor(null)
  loadProducts()
}

  function closeModal() { setOpen(false); setEditing(null); loadProducts() }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes prdshimmer { from{left:-40%} to{left:140%} }
        @keyframes mcpulse  { 0%,100%{opacity:1} 50%{opacity:0.25} }
        input[type=file]    { display:none }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none;margin:0 }
        input::placeholder,textarea::placeholder { color:rgba(255,176,0,0.2);font-family:'IBM Plex Mono',monospace;font-size:0.72rem }
        option { background:#0a0900 }
        select { appearance:none }
        .prdscroll::-webkit-scrollbar { width:3px;background:#0a0900 }
        .prdscroll::-webkit-scrollbar-thumb { background:rgba(255,176,0,0.2) }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · PRODUCT REGISTRY</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.25)},transparent)` }} />
        </div>

        {/* header row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Products
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Manage IDEA Lab products and projects
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.22em", color: AMBER(0.3), padding: "7px 12px", border: `1px solid ${AMBER(0.12)}` }}>
              {products.length} PRODUCT{products.length !== 1 ? "S" : ""}
            </div>
            <AddBtn onClick={() => { setEditing(null); setOpen(true) }} />
          </div>
        </div>

        {/* grid */}
        {products.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>NO PRODUCTS FOUND</span>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
            {products.map(p => (
              <ProductCard
                key={p.id} product={p}
                onEdit={() => { setEditing(p); setOpen(true) }}
                onDelete={() => setDeleteFor(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      {deleteFor && (
        <DeleteConfirmModal
          deleting={deleting}
          onConfirm={() => deleteProduct(deleteFor)}
          onCancel={() => setDeleteFor(null)}
        />
      )}
      <ProductModal open={open} product={editing} onClose={closeModal} />
    </div>
  )
}

/* ── PRODUCT CARD ── */
function ProductCard({ product: p, onEdit, onDelete }: {
  product: Product; onEdit: () => void; onDelete: () => void
}) {
  const [hov, setHov] = useState(false)
  const shortId = p.id.slice(0, 8).toUpperCase()

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "relative", overflow: "hidden", background: hov ? "rgba(255,176,0,0.05)" : PANEL, border: `1px solid ${hov ? AMBER(0.25) : BORDER}`, transition: "border 0.22s, background 0.22s" }}
    >
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${AMBER(0.5)},transparent)` }} />}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1, background: `linear-gradient(to bottom,transparent,${p.is_active ? AMBER(hov ? 0.8 : 0.3) : "rgba(255,255,255,0.1)"},transparent)`, transition: "all 0.22s" }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

      {/* image */}
      {p.image_url && (
        <div style={{ height: 130, overflow: "hidden", position: "relative", borderBottom: `1px solid ${AMBER(0.08)}` }}>
          <img src={p.image_url} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,0,0.7), transparent)" }} />
        </div>
      )}

      <div style={{ padding: "12px 14px 12px 16px" }}>
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.2em", color: AMBER(0.28) }}>PRD·{shortId}</span>
          {p.is_featured && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.16em", padding: "1px 6px", color: AMBER(0.8), background: AMBER(0.08), border: `1px solid ${AMBER(0.22)}` }}>FEAT</span>
          )}
          {p.is_paid && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.16em", padding: "1px 6px", color: SKY(0.8), background: SKY(0.06), border: `1px solid ${SKY(0.2)}` }}>PAID</span>
          )}
          {!p.is_active && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.16em", padding: "1px 6px", color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>INACTIVE</span>
          )}
        </div>

        {/* title */}
        <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: DIMWHITE(0.9), lineHeight: 1.1, marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {p.title}
        </div>

        {/* short desc */}
        {p.short_description && (
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: DIMWHITE(0.38), lineHeight: 1.5, marginBottom: 8, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>
            {p.short_description}
          </div>
        )}

        {/* meta row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {p.category && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.15em", padding: "2px 7px", color: AMBER(0.55), border: `1px solid ${AMBER(0.18)}` }}>
              {p.category.toUpperCase()}
            </span>
          )}
          {p.status && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.15em", padding: "2px 7px", color: GREEN(0.6), border: `1px solid ${GREEN(0.2)}` }}>
              {p.status.toUpperCase()}
            </span>
          )}
          {p.price != null && p.is_paid && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.15em", padding: "2px 7px", color: SKY(0.7), border: `1px solid ${SKY(0.2)}` }}>
              Rs{p.price}
            </span>
          )}
        </div>

        {/* divider + actions */}
        <div style={{ height: 1, background: `linear-gradient(to right,${AMBER(0.08)},transparent)`, marginBottom: 10 }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
          <CardActionBtn label="EDIT"   onClick={onEdit}   color={AMBER(0.7)} hoverBg={AMBER(0.07)} hoverBorder={AMBER(0.3)} />
          <CardActionBtn label="DELETE" onClick={onDelete} color={RED(0.7)}   hoverBg={RED(0.07)}   hoverBorder={RED(0.3)}   />
        </div>
      </div>
    </div>
  )
}

/* ── Card Action Btn ── */
function CardActionBtn({ label, onClick, color, hoverBg, hoverBorder }: {
  label: string; onClick: () => void; color: string; hoverBg: string; hoverBorder: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", padding: "5px 12px", background: hov ? hoverBg : "transparent", borderTop: `1px solid ${hov ? hoverBorder : BORDER}`, borderRight: `1px solid ${hov ? hoverBorder : BORDER}`, borderBottom: `1px solid ${hov ? hoverBorder : BORDER}`, borderLeft: "none", color, cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.18s" }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${color},transparent)`, opacity: hov ? 1 : 0.3, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ── Add Button ── */
function AddBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "9px 18px", background: hov ? AMBER(1) : AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: "pointer", boxShadow: `0 0 ${hov ? 22 : 12}px ${AMBER(hov ? 0.4 : 0.22)}`, transition: "background 0.18s, box-shadow 0.18s" }}
    >
      + ADD PRODUCT
    </button>
  )
}

/* ── DELETE CONFIRM MODAL ── */
function DeleteConfirmModal({ onConfirm, onCancel, deleting }: {
  onConfirm: () => void; onCancel: () => void; deleting: boolean
}) {
  const A = (a = 1) => `rgba(255,176,0,${a})`
  const R = (a = 1) => `rgba(255,60,60,${a})`
  const D = (a = 1) => `rgba(220,215,200,${a})`
  const [hovC, setHovC] = useState(false)
  return (
    <div style={{ position:"fixed", inset:0, zIndex:60, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)", padding:16 }}>
      <div style={{ width:"100%", maxWidth:360, background:"#0a0900", border:`1px solid ${R(0.35)}`, boxShadow:`0 32px 64px rgba(0,0,0,0.7)`, position:"relative", overflow:"hidden" }}>
        <div style={{ height:1, background:`linear-gradient(to right,transparent,${R(0.55)},transparent)` }} />
        <div style={{ position:"absolute", top:8, left:8,  width:9, height:9, borderTop:`1px solid ${R(0.45)}`, borderLeft: `1px solid ${R(0.45)}`  }} />
        <div style={{ position:"absolute", top:8, right:8, width:9, height:9, borderTop:`1px solid ${R(0.45)}`, borderRight:`1px solid ${R(0.45)}`  }} />
        <div style={{ padding:"22px 22px 20px" }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", letterSpacing:"0.3em", color:R(0.5), marginBottom:6 }}>SYS · CONFIRM DELETE</div>
          <h3 style={{ fontFamily:"'IBM Plex Sans Condensed',sans-serif", fontWeight:700, fontSize:"1.2rem", color:R(0.88), margin:"0 0 8px" }}>Delete Product</h3>
          <p style={{ fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:300, fontSize:"0.84rem", color:D(0.4), marginBottom:22 }}>
            This action is permanent and cannot be undone.
          </p>
          <div style={{ height:1, background:`linear-gradient(to right,${R(0.12)},transparent)`, marginBottom:16 }} />
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
            <button onClick={onCancel}
              onMouseEnter={() => setHovC(true)} onMouseLeave={() => setHovC(false)}
              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.2em", padding:"8px 16px", background:"transparent", border:`1px solid ${hovC ? A(0.3) : A(0.15)}`, color:hovC ? A(0.65) : A(0.4), cursor:"pointer", transition:"all 0.18s" }}
            >CANCEL</button>
            <button onClick={onConfirm} disabled={deleting}
              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.2em", padding:"8px 20px", background:deleting ? R(0.5) : R(0.85), border:"none", color:"#0a0900", fontWeight:600, cursor:deleting?"not-allowed":"pointer", position:"relative", overflow:"hidden", boxShadow:deleting?"none":`0 0 14px ${R(0.3)}`, transition:"all 0.18s" }}
            >
              {deleting ? "DELETING..." : "DELETE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


/* ── PRODUCT MODAL ── */
function ProductModal({ open, onClose, product }: {
  open: boolean; onClose: () => void; product: Product | null
}) {
  const blank = {
    title: "", short_description: "", full_description: "",
    category: "", status: "", price: "", is_paid: false,
    demo_url: "", github_url: "", docs_url: "", image_url: "",
    technologies: "", team_size: "", is_featured: false, is_active: true,
  }

  const [form,    setForm]    = useState<any>(blank)
  const [saving,  setSaving]  = useState(false)
  const [imgLoad, setImgLoad] = useState(false)

  useEffect(() => {
    if (product) {
      setForm({ ...product, technologies: Array.isArray(product.technologies) ? (product.technologies as any[]).join(", ") : product.technologies || "" })
    } else {
      setForm(blank)
    }
  }, [product, open])

  if (!open) return null

  /* cloudinary upload — unchanged */
  async function uploadImage(e: any) {
    const file = e.target.files?.[0]; if (!file) return; setImgLoad(true)
    const data = new FormData()
    data.append("file", file); data.append("upload_preset", "idea_lab_profiles")
    const res  = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: data })
    const json = await res.json()
    setForm((prev: any) => ({ ...prev, image_url: json.secure_url }))
    setImgLoad(false)
  }

  /* save — unchanged */
  async function save() {
    setSaving(true)
    const payload = {
      title: form.title, short_description: form.short_description, full_description: form.full_description,
      category: form.category, status: form.status,
      price: form.price ? Number(form.price) : null,
      is_paid: form.is_paid, demo_url: form.demo_url, github_url: form.github_url,
      docs_url: form.docs_url, image_url: form.image_url,
      technologies: form.technologies ? form.technologies.split(",").map((t: string) => t.trim()) : [],
      team_size: form.team_size ? Number(form.team_size) : null,
      is_featured: form.is_featured, is_active: form.is_active,
    }
    let error
    if (product) { const res = await supabase.from("products").update(payload).eq("id", product.id).select(); error = res.error }
    else         { const res = await supabase.from("products").insert(payload).select(); error = res.error }
    setSaving(false)
    if (error) { alert(error.message); return }
    onClose()
  }

  const isEdit = !!product

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <style>{`
        @keyframes prdshimmer { from{left:-40%} to{left:140%} }
        .prdscroll::-webkit-scrollbar { width:3px;background:#0a0900 }
        .prdscroll::-webkit-scrollbar-thumb { background:rgba(255,176,0,0.2) }
        .prdscroll { scrollbar-width:thin;scrollbar-color:rgba(255,176,0,0.2) #0a0900 }
      `}</style>

      <div className="prdscroll" style={{ width: "100%", maxWidth: 580, maxHeight: "92vh", overflowY: "auto", background: BG, border: `1px solid ${AMBER(0.2)}`, boxShadow: `0 40px 80px rgba(0,0,0,0.7)`, position: "relative" }}>

        {/* shimmer bar */}
        <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right,transparent,${AMBER(0.65)},transparent)`, animation: "prdshimmer 2.5s linear infinite" }} />
        </div>

        {/* HUD corners */}
        <div style={{ position: "absolute", top: 8, left: 8,   width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft:  `1px solid ${AMBER(0.4)}`  }} />
        <div style={{ position: "absolute", top: 8, right: 8,  width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}`  }} />
        <div style={{ position: "absolute", bottom: 8, left: 8,  width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderLeft:  `1px solid ${AMBER(0.18)}` }} />
        <div style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderRight: `1px solid ${AMBER(0.18)}` }} />

        <div style={{ padding: "22px 22px 28px", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: AMBER(0.4), marginBottom: 4 }}>
                {isEdit ? "SYS · EDIT RECORD" : "SYS · NEW RECORD"}
              </div>
              <h2 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
                {isEdit ? "Edit Product" : "Add Product"}
              </h2>
            </div>
            <button onClick={onClose}
              style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: `1px solid ${AMBER(0.18)}`, color: AMBER(0.45), cursor: "pointer", fontSize: "0.65rem", fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.45); b.style.color = AMBER(0.8) }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.18); b.style.color = AMBER(0.45) }}
            >X</button>
          </div>

          {/* IMAGE */}
          <SRule label="PRD · IMAGE" />
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 110, height: 80, flexShrink: 0, border: `1px solid ${AMBER(0.2)}`, background: AMBER(0.04), overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              {form.image_url
                ? <img src={form.image_url} alt="Preview" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.15em", color: AMBER(0.25), textAlign: "center", padding: "0 6px" }}>NO IMAGE</span>
              }
            </div>
            <label style={{ cursor: "pointer" }}>
              <input type="file" accept="image/*" onChange={uploadImage} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.18em", padding: "8px 14px", background: "transparent", border: `1px solid ${AMBER(0.2)}`, color: AMBER(imgLoad ? 0.4 : 0.55) }}>
                {imgLoad ? "UPLOADING..." : "UPLOAD / REPLACE"}
              </div>
            </label>
          </div>

          {/* CORE */}
          <SRule label="PRD · CORE INFO" />
          <MCInput label="TITLE" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="Product title" />
          <MCTextarea label="SHORT DESCRIPTION" value={form.short_description || ""} onChange={v => setForm({ ...form, short_description: v })} rows={2} placeholder="Brief one-liner..." />
          <MCTextarea label="FULL DESCRIPTION"  value={form.full_description  || ""} onChange={v => setForm({ ...form, full_description: v })}  rows={4} placeholder="Detailed description..." />

          {/* CLASSIFICATION */}
          <SRule label="PRD · CLASSIFICATION" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <MCInput label="CATEGORY" value={form.category || ""} onChange={v => setForm({ ...form, category: v })} placeholder="e.g. Web App" />
            <MCInput label="STATUS"   value={form.status   || ""} onChange={v => setForm({ ...form, status: v })}   placeholder="e.g. Live, Beta" />
          </div>
          <MCInput label="TECHNOLOGIES (comma-separated)" value={form.technologies || ""} onChange={v => setForm({ ...form, technologies: v })} placeholder="React, Supabase, Python..." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <MCInput       label="TEAM SIZE"   type="number" value={form.team_size || ""}  onChange={v => setForm({ ...form, team_size: v })} placeholder="0" />
            <MCBoolSelect  label="FEATURED"    value={form.is_featured}  onChange={v => setForm({ ...form, is_featured: v })} />
            <MCBoolSelect  label="ACTIVE"      value={form.is_active}    onChange={v => setForm({ ...form, is_active: v })} />
          </div>

          {/* PRICING */}
          <SRule label="PRD · PRICING" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <MCBoolSelect label="PAID"         value={form.is_paid} onChange={v => setForm({ ...form, is_paid: v, ...(!v && { price: "" }) })} />
            <MCInput      label="PRICE (Rs)"   type="number" value={form.price || ""} onChange={v => setForm({ ...form, price: v })} placeholder="0" />
          </div>

          {/* LINKS */}
          <SRule label="PRD · LINKS" />
          <MCInput label="DEMO URL"   value={form.demo_url   || ""} onChange={v => setForm({ ...form, demo_url: v })}   placeholder="https://..." />
          <MCInput label="GITHUB URL" value={form.github_url || ""} onChange={v => setForm({ ...form, github_url: v })} placeholder="https://github.com/..." />
          <MCInput label="DOCS URL"   value={form.docs_url   || ""} onChange={v => setForm({ ...form, docs_url: v })}   placeholder="https://..." />

          {/* actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8, paddingTop: 16, borderTop: `1px solid ${AMBER(0.08)}` }}>
            <button onClick={onClose}
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "9px 18px", background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), cursor: "pointer" }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.3); b.style.color = AMBER(0.65) }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.15); b.style.color = AMBER(0.4) }}
            >CANCEL</button>

            <button onClick={save} disabled={saving}
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "9px 22px", background: saving ? AMBER(0.5) : AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", position: "relative", overflow: "hidden", boxShadow: saving ? "none" : `0 0 16px ${AMBER(0.25)}` }}
            >
              {saving && <span style={{ position: "absolute", top: 0, bottom: 0, width: "30%", background: "linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)", animation: "prdshimmer 0.85s linear infinite" }} />}
              <span style={{ position: "relative", zIndex: 1 }}>
                {saving ? "SAVING..." : isEdit ? "SAVE PRODUCT" : "ADD PRODUCT"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}