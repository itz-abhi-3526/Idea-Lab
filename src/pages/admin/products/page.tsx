
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

/* ── TYPES ── */
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
    const { error } = await supabase.from("products").delete().eq("id", id)
    setDeleting(false)
    if (error) { console.error(error); alert(error.message); return }
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

        .prd-header-flex { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .prd-stats-bar { display: flex; align-items: center; gap: 10px; }
        .prd-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }

        @media (min-width: 768px) {
          .prd-header-flex { flex-direction: row; align-items: flex-start; justify-content: space-between; }
        }

        @media (max-width: 480px) {
          .prd-stats-bar { width: 100%; justify-content: space-between; }
          .prd-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 16px 48px" }}>

        {/* rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · PRODUCT REGISTRY</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.25)},transparent)` }} />
        </div>

        {/* header row */}
        <div className="prd-header-flex">
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Products
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Manage IDEA Lab products and projects
            </p>
          </div>
          <div className="prd-stats-bar">
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
          <div className="prd-grid">
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

      {p.image_url && (
        <div style={{ height: 140, overflow: "hidden", position: "relative", borderBottom: `1px solid ${AMBER(0.08)}` }}>
          <img src={p.image_url} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,0,0.7), transparent)" }} />
        </div>
      )}

      <div style={{ padding: "12px 14px 12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.2em", color: AMBER(0.28) }}>PRD·{shortId}</span>
          {p.is_featured && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.16em", padding: "1px 6px", color: AMBER(0.8), background: AMBER(0.08), border: `1px solid ${AMBER(0.22)}` }}>FEAT</span>}
          {p.is_paid && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.16em", padding: "1px 6px", color: SKY(0.8), background: SKY(0.06), border: `1px solid ${SKY(0.2)}` }}>PAID</span>}
          {!p.is_active && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.16em", padding: "1px 6px", color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>INACTIVE</span>}
        </div>

        <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: DIMWHITE(0.9), lineHeight: 1.1, marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {p.title}
        </div>

        {p.short_description && (
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: DIMWHITE(0.38), lineHeight: 1.5, marginBottom: 8, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>
            {p.short_description}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {p.category && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.15em", padding: "2px 7px", color: AMBER(0.55), border: `1px solid ${AMBER(0.18)}` }}>{p.category.toUpperCase()}</span>}
          {p.status && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.15em", padding: "2px 7px", color: GREEN(0.6), border: `1px solid ${GREEN(0.2)}` }}>{p.status.toUpperCase()}</span>}
          {p.price != null && p.is_paid && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.15em", padding: "2px 7px", color: SKY(0.7), border: `1px solid ${SKY(0.2)}` }}>Rs{p.price}</span>}
        </div>

        <div style={{ height: 1, background: `linear-gradient(to right,${AMBER(0.08)},transparent)`, marginBottom: 10 }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
          <CardActionBtn label="EDIT" onClick={onEdit} color={AMBER(0.7)} hoverBg={AMBER(0.07)} hoverBorder={AMBER(0.3)} />
          <CardActionBtn label="DELETE" onClick={onDelete} color={RED(0.7)} hoverBg={RED(0.07)} hoverBorder={RED(0.3)} />
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
      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "9px 18px", background: hov ? AMBER(1) : AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: "pointer", boxShadow: `0 0 ${hov ? 22 : 12}px ${AMBER(hov ? 0.4 : 0.22)}`, transition: "background 0.18s, box-shadow 0.18s", whiteSpace: "nowrap" }}
    >
      + ADD PRODUCT
    </button>
  )
}

/* ── DELETE CONFIRM MODAL ── */
function DeleteConfirmModal({ onConfirm, onCancel, deleting }: {
  onConfirm: () => void; onCancel: () => void; deleting: boolean
}) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)", padding:16 }}>
      <div style={{ width:"100%", maxWidth:360, background:"#0a0900", border:`1px solid ${RED(0.35)}`, boxShadow:`0 32px 64px rgba(0,0,0,0.7)`, position:"relative", overflow:"hidden" }}>
        <div style={{ padding:"22px 22px 20px" }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", letterSpacing:"0.3em", color:RED(0.5), marginBottom:6 }}>SYS · CONFIRM DELETE</div>
          <h3 style={{ fontFamily:"'IBM Plex Sans Condensed',sans-serif", fontWeight:700, fontSize:"1.2rem", color:RED(0.88), margin:"0 0 8px" }}>Delete Product</h3>
          <p style={{ fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:300, fontSize:"0.84rem", color:DIMWHITE(0.4), marginBottom:22 }}>Permanent action cannot be undone.</p>
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
            <button onClick={onCancel} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.2em", padding:"8px 16px", background:"transparent", border:`1px solid ${AMBER(0.15)}`, color:AMBER(0.4), cursor:"pointer" }}>CANCEL</button>
            <button onClick={onConfirm} disabled={deleting} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.2em", padding:"8px 20px", background:deleting ? RED(0.5) : RED(0.85), border:"none", color:"#0a0900", fontWeight:600, cursor:deleting?"not-allowed":"pointer" }}>
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
  const blank = { title: "", short_description: "", full_description: "", category: "", status: "", price: "", is_paid: false, demo_url: "", github_url: "", docs_url: "", image_url: "", technologies: "", team_size: "", is_featured: false, is_active: true }
  const [form, setForm] = useState<any>(blank)
  const [saving, setSaving] = useState(false)
  const [imgLoad, setImgLoad] = useState(false)

  useEffect(() => {
    if (product) {
      setForm({ ...product, technologies: Array.isArray(product.technologies) ? (product.technologies as any[]).join(", ") : product.technologies || "" })
    } else { setForm(blank) }
  }, [product, open])

  if (!open) return null

  async function uploadImage(e: any) {
    const file = e.target.files?.[0]; if (!file) return; setImgLoad(true)
    const data = new FormData(); data.append("file", file); data.append("upload_preset", "idea_lab_profiles")
    const res  = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: data })
    const json = await res.json(); setForm((prev: any) => ({ ...prev, image_url: json.secure_url })); setImgLoad(false)
  }

  async function save() {
    setSaving(true)
    const payload = { title: form.title, short_description: form.short_description, full_description: form.full_description, category: form.category, status: form.status, price: form.price ? Number(form.price) : null, is_paid: form.is_paid, demo_url: form.demo_url, github_url: form.github_url, docs_url: form.docs_url, image_url: form.image_url, technologies: form.technologies ? form.technologies.split(",").map((t: string) => t.trim()) : [], team_size: form.team_size ? Number(form.team_size) : null, is_featured: form.is_featured, is_active: form.is_active }
    let error
    if (product) { const res = await supabase.from("products").update(payload).eq("id", product.id).select(); error = res.error }
    else { const res = await supabase.from("products").insert(payload).select(); error = res.error }
    setSaving(false); if (error) { alert(error.message); return }; onClose()
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
      <div className="prdscroll" style={{ width: "100%", maxWidth: 600, maxHeight: "95vh", overflowY: "auto", background: BG, border: `1px solid ${AMBER(0.2)}`, boxShadow: `0 40px 80px rgba(0,0,0,0.7)`, position: "relative" }}>
        <div style={{ height: 1, background: AMBER(0.1) }} />
        <div style={{ padding: "24px 20px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: AMBER(0.4) }}>SYS · {product ? "EDIT RECORD" : "NEW RECORD"}</div>
              <h2 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: AMBER(0.9), margin: 0 }}>{product ? "Edit Product" : "Add Product"}</h2>
            </div>
            <button onClick={onClose} style={{ background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), cursor: "pointer", width: 28, height: 28 }}>X</button>
          </div>

          <SRule label="PRD · IMAGE" />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ width: 100, height: 70, border: `1px solid ${AMBER(0.2)}`, background: "#000", flexShrink: 0 }}>
              {form.image_url && <img src={form.image_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </div>
            <label style={{ cursor: "pointer", flex: 1, minWidth: 160 }}>
              <input type="file" accept="image/*" onChange={uploadImage} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", border: `1px solid ${AMBER(0.2)}`, padding: "10px", textAlign: "center" }}>{imgLoad ? "UPLOADING..." : "UPLOAD / REPLACE IMAGE"}</div>
            </label>
          </div>

          <MCInput label="TITLE" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="Product title" />
          <MCTextarea label="SHORT DESC" value={form.short_description || ""} onChange={v => setForm({ ...form, short_description: v })} rows={2} />
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            <MCInput label="CATEGORY" value={form.category || ""} onChange={v => setForm({ ...form, category: v })} />
            <MCInput label="STATUS" value={form.status || ""} onChange={v => setForm({ ...form, status: v })} />
          </div>

          <MCInput label="TECHNOLOGIES" value={form.technologies || ""} onChange={v => setForm({ ...form, technologies: v })} placeholder="React, Node..." />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 10 }}>
            <MCInput label="TEAM SIZE" type="number" value={form.team_size || ""} onChange={v => setForm({ ...form, team_size: v })} />
            <MCBoolSelect label="FEATURED" value={form.is_featured} onChange={v => setForm({ ...form, is_featured: v })} />
            <MCBoolSelect label="ACTIVE" value={form.is_active} onChange={v => setForm({ ...form, is_active: v })} />
          </div>

          <SRule label="PRD · PRICING & LINKS" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            <MCBoolSelect label="PAID" value={form.is_paid} onChange={v => setForm({ ...form, is_paid: v })} />
            <MCInput label="PRICE (RS)" type="number" value={form.price || ""} onChange={v => setForm({ ...form, price: v })} />
          </div>
          
          <MCInput label="DEMO URL" value={form.demo_url || ""} onChange={v => setForm({ ...form, demo_url: v })} />
          <MCInput label="GITHUB" value={form.github_url || ""} onChange={v => setForm({ ...form, github_url: v })} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
            <button onClick={onClose} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", padding: "10px 20px", border: `1px solid ${AMBER(0.2)}`, background: "transparent", color: AMBER(0.5) }}>CANCEL</button>
            <button onClick={save} disabled={saving} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", padding: "10px 24px", background: AMBER(0.9), color: "#000", fontWeight: 700, border: "none" }}>{saving ? "SAVING..." : "SAVE PRODUCT"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
