
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"

function MCInput({ name, placeholder, value, onChange, type = "text", label }: {
  name: string; placeholder: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string; label: string
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 12 }}>
        {label}
      </div>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: foc ? 2 : 1,
          background: foc
            ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)`
            : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`,
          transition: "background 0.2s, width 0.15s",
        }} />
        <input
          name={name} type={type} placeholder={placeholder} value={value}
          onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{
            width: "100%", paddingLeft: 12, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
            background:   foc ? `rgba(255,176,0,0.04)` : "rgba(0,0,0,0.35)",
            borderTop:    `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
            borderRight:  `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
            borderBottom: `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
            borderLeft:   "none", outline: "none",
            color:         DIMWHITE(0.85),
            fontFamily:   "'IBM Plex Mono', monospace",
            fontSize:     "0.78rem", letterSpacing: "0.05em",
            transition:   "background 0.2s",
            boxSizing: "border-box"
          }}
        />
      </div>
    </div>
  )
}

export type InventoryItem = {
  id: string; name: string; category: string; description: string
  quantity_total: number; quantity_available: number
  is_active: boolean; created_at: string
}

type Props = { open: boolean; onClose: () => void; item?: InventoryItem | null }

export default function AddInventoryModal({ open, onClose, item = null }: Props) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', description: '', quantity_total: '', quantity_available: '' })

  useEffect(() => {
    if (item) {
      setForm({ name: item.name, category: item.category, description: item.description, quantity_total: String(item.quantity_total), quantity_available: String(item.quantity_available) })
    } else {
      setForm({ name: '', category: '', description: '', quantity_total: '', quantity_available: '' })
    }
  }, [item, open])

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.quantity_total) { alert('Please fill required fields'); return }
    setLoading(true)
    const payload = { name: form.name, category: form.category, description: form.description, quantity_total: Number(form.quantity_total), quantity_available: Number(form.quantity_available || form.quantity_total) }
    const query = item
      ? supabase.from('inventory_items').update(payload).eq('id', item.id)
      : supabase.from('inventory_items').insert({ ...payload, is_active: true })
    const { error } = await query
    setLoading(false)
    if (error) { alert(error.message); return }
    onClose()
    location.reload()
  }

  const isEdit = !!item

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", padding: 16 }}>
      <style>{`
        @keyframes invshimmer{from{left:-40%}to{left:140%}} 
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0} 
        input::placeholder{color:rgba(255,176,0,0.2);font-family:'IBM Plex Mono',monospace;font-size:0.75rem}
        .modal-body { max-height: calc(100vh - 120px); overflow-y: auto; scrollbar-width: none; }
        .modal-body::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 480, background: BG, border: `1px solid rgba(255,176,0,0.18)`, boxShadow: `0 40px 80px rgba(0,0,0,0.7)`, position: "relative", overflow: "hidden" }}>

        <div style={{ height: 1, overflow: "hidden", background: AMBER(0.12), position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right, transparent, ${AMBER(0.7)}, transparent)`, animation: "invshimmer 2.5s linear infinite" }} />
        </div>

        <div style={{ position: "absolute", top: 8, left: 8,   width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`,  borderLeft:  `1px solid ${AMBER(0.4)}`  }} />
        <div style={{ position: "absolute", top: 8, right: 8,  width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`,  borderRight: `1px solid ${AMBER(0.4)}`  }} />
        <div style={{ position: "absolute", bottom: 8, left: 8,  width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.2)}`, borderLeft:  `1px solid ${AMBER(0.2)}` }} />
        <div style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.2)}`, borderRight: `1px solid ${AMBER(0.2)}` }} />

        <div className="modal-body" style={{ padding: "24px 24px 26px" }}>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: AMBER(0.4), marginBottom: 4 }}>
                {isEdit ? "SYS · EDIT RECORD" : "SYS · NEW RECORD"}
              </div>
              <h2 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.1rem, 4vw, 1.3rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
                {isEdit ? "Edit Item" : "Add Item"}
              </h2>
            </div>
            <button onClick={onClose}
              style={{ width: 26, height: 26, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: `1px solid ${AMBER(0.18)}`, color: AMBER(0.45), cursor: "pointer", fontSize: "0.7rem", fontFamily: "'IBM Plex Mono', monospace", transition: "border-color 0.18s, color 0.18s" }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.45); b.style.color = AMBER(0.8) }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.18); b.style.color = AMBER(0.45) }}
            >✕</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <MCInput name="name"        label="ITEM NAME"    placeholder="Item name"   value={form.name}        onChange={handleChange} />
            <MCInput name="category"    label="CATEGORY"     placeholder="Category"    value={form.category}    onChange={handleChange} />
            <MCInput name="description" label="DESCRIPTION"  placeholder="Description" value={form.description} onChange={handleChange} />
            
            <style>{`
              .qty-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
              @media (max-width: 400px) { .qty-grid { grid-template-columns: 1fr; } }
            `}</style>
            <div className="qty-grid">
              <MCInput name="quantity_total"     type="number" label="TOTAL QTY"     placeholder="Total"     value={form.quantity_total}     onChange={handleChange} />
              <MCInput name="quantity_available" type="number" label="AVAILABLE QTY" placeholder="Available" value={form.quantity_available} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={onClose}
              style={{ flex: "1 1 auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "10px 18px", background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), cursor: "pointer", transition: "border-color 0.18s, color 0.18s" }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.3); b.style.color = AMBER(0.65) }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = AMBER(0.15); b.style.color = AMBER(0.4) }}
            >CANCEL</button>

            <button onClick={handleSubmit} disabled={loading}
              style={{ flex: "1 1 auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "10px 22px", background: loading ? AMBER(0.5) : AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : `0 0 16px ${AMBER(0.25)}`, position: "relative", overflow: "hidden", transition: "background 0.18s" }}
            >
              {loading && <span style={{ position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(to right, transparent, rgba(0,0,0,0.2), transparent)`, animation: "invshimmer 0.85s linear infinite" }} />}
              <span style={{ position: "relative", zIndex: 1 }}>
                {loading ? (isEdit ? "UPDATING..." : "ADDING...") : (isEdit ? "UPDATE ITEM" : "ADD ITEM")}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
