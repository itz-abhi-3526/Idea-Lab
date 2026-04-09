
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"

/* ─── MCInput ─── */
function MCInput({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string | number; placeholder?: string
  onChange: (v: string) => void; type?: string
}) {
  const [foc, setFoc] = useState(false)
  const border = foc ? AMBER(0.28) : AMBER(0.09)
  const bg     = foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)"
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1, background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
        <input type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ width:"100%", paddingLeft:10, paddingRight:10, paddingTop:8, paddingBottom:8, background:bg, borderTop:`1px solid ${border}`, borderRight:`1px solid ${border}`, borderBottom:`1px solid ${border}`, borderLeft:"none", outline:"none", color:DIMWHITE(0.85), fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.75rem", letterSpacing:"0.04em", transition:"background 0.18s", boxSizing: "border-box" }}
        />
      </div>
    </div>
  )
}

/* ─── MCTextarea ─── */
function MCTextarea({ label, value, onChange, rows = 4 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number
}) {
  const [foc, setFoc] = useState(false)
  const border = foc ? AMBER(0.28) : AMBER(0.09)
  const bg     = foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)"
  return (
    <div>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.46rem", letterSpacing:"0.28em", color:AMBER(0.3), marginBottom:3, paddingLeft:10 }}>{label}</div>
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:foc?2:1, background:foc?`linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)`:`linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition:"all 0.18s" }} />
        <textarea value={value} rows={rows} placeholder="Event description..."
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ width:"100%", paddingLeft:10, paddingRight:10, paddingTop:8, paddingBottom:8, resize:"none", background:bg, borderTop:`1px solid ${border}`, borderRight:`1px solid ${border}`, borderBottom:`1px solid ${border}`, borderLeft:"none", outline:"none", color:DIMWHITE(0.85), fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:300, fontSize:"0.82rem", lineHeight:1.65, transition:"background 0.18s", boxSizing: "border-box" }}
        />
      </div>
    </div>
  )
}

/* ─── MCBoolSelect ─── */
function MCBoolSelect({ label, value, onChange }: {
  label: string; value: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.46rem", letterSpacing:"0.28em", color:AMBER(0.3), marginBottom:3, paddingLeft:10 }}>{label}</div>
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:1, background:`linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)` }} />
        <select value={String(value)} onChange={e => onChange(e.target.value === "true")}
          style={{ width:"100%", paddingLeft:10, paddingRight:10, paddingTop:8, paddingBottom:8, background:"rgba(0,0,0,0.35)", borderTop:`1px solid ${AMBER(0.09)}`, borderRight:`1px solid ${AMBER(0.09)}`, borderBottom:`1px solid ${AMBER(0.09)}`, borderLeft:"none", outline:"none", color:DIMWHITE(0.75), fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.06em", cursor:"pointer", appearance:"none", boxSizing: "border-box" }}
        >
          <option value="true"  style={{ background:BG }}>TRUE</option>
          <option value="false" style={{ background:BG }}>FALSE</option>
        </select>
      </div>
    </div>
  )
}

/* ─── Section Rule ─── */
function SRule({ label }: { label: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, margin:"12px 0 6px" }}>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.46rem", letterSpacing:"0.28em", color:AMBER(0.35), whiteSpace:"nowrap" }}>{label}</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(to right,${AMBER(0.18)},transparent)` }} />
    </div>
  )
}

/* ─── TYPES ─── */
type Event = {
  id: string; title: string; description: string; event_type: string | null
  start_datetime: string; end_datetime: string
  registration_deadline?: string | null; venue?: string | null
  poster_url?: string | null; capacity?: number | null
  is_active: boolean; is_featured: boolean; display_order: number
  is_paid?: boolean; price?: number | null; upi_qr_url?: string | null
}

type FormState = {
  title: string; description: string; event_type: string
  start_datetime: string; end_datetime: string; registration_deadline: string
  venue: string; poster_url: string; capacity: number
  is_active: boolean; is_featured: boolean; display_order: number
  is_paid: boolean; price: number; upi_qr_url: string
}

export default function AddEditEventModal({ open, onClose, event }: {
  open: boolean; onClose: () => void; event: Event | null
}) {
  const [form,      setForm]      = useState<FormState | null>(null)
  const [saving,    setSaving]    = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!open) return
    setForm({
      title:                 event?.title ?? "",
      description:           event?.description ?? "",
      event_type:            event?.event_type ?? "",
      start_datetime:        event?.start_datetime        ? event.start_datetime.slice(0, 16)        : "",
      end_datetime:          event?.end_datetime          ? event.end_datetime.slice(0, 16)          : "",
      registration_deadline: event?.registration_deadline ? event.registration_deadline.slice(0, 16) : "",
      venue:         event?.venue       ?? "",
      poster_url:    event?.poster_url  ?? "",
      capacity:      event?.capacity    ?? 0,
      is_active:     event?.is_active   ?? true,
      is_featured:   event?.is_featured ?? false,
      display_order: event?.display_order ?? 0,
      is_paid:     event?.is_paid  ?? false,
      price:       event?.price    ?? 0,
      upi_qr_url:  event?.upi_qr_url ?? "",
    })
  }, [open, event])

  if (!open || !form) return null

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true)
    try {
      const data = new FormData()
      data.append("file", file); 
      const res  = await fetch(`https://idea-lab-backend.onrender.com/api/upload`, { method: "POST", body: data })
      const json = await res.json(); if (!json.url) throw new Error("Upload failed")
setForm(prev => prev ? { ...prev, poster_url: json.url } : prev)
    } catch { alert("Poster upload failed") } finally { setUploading(false) }
  }

  const handleUpiQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true)
    try {
      const data = new FormData()
      data.append("file", file); 
      const res  = await fetch(`https://idea-lab-backend.onrender.com/api/upload`, { method: "POST", body: data })
      const json = await res.json(); if (!json.url) throw new Error("Upload failed")
setForm(prev => prev ? { ...prev, upi_qr_url: json.url } : prev)
    } catch { alert("UPI QR upload failed") } finally { setUploading(false) }
  }

  const validate = () => {
    if (!form.title || !form.description || !form.event_type || !form.start_datetime || !form.end_datetime || !form.registration_deadline || !form.venue) { alert("Please fill all required fields."); return false }
    if (form.capacity < 0) { alert("Capacity cannot be negative."); return false }
    if (form.is_paid) {
      if (form.price <= 0) { alert("Enter valid amount for paid event."); return false }
      if (!form.upi_qr_url) { alert("Upload UPI QR for paid event."); return false }
    }
    return true
  }

  const save = async () => {
    if (!validate()) return; setSaving(true)
    const payload = { ...form, start_datetime: new Date(form.start_datetime).toISOString(), end_datetime: new Date(form.end_datetime).toISOString(), registration_deadline: new Date(form.registration_deadline).toISOString() }
    if (event) { await supabase.from("events").update(payload).eq("id", event.id) }
    else         { await supabase.from("events").insert(payload) }
    setSaving(false); onClose()
  }

  const isEdit = !!event
  const busy   = saving || uploading

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
    >
      <style>{`
        @keyframes evtshimmer { from{left:-40%} to{left:140%} }
        .evtscroll::-webkit-scrollbar { width:3px; background:#0a0900 }
        .evtscroll::-webkit-scrollbar-thumb { background:rgba(255,176,0,0.2) }
        input[type=file] { display:none }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0 }
        input[type=datetime-local]::-webkit-calendar-picker-indicator { filter:invert(0.6) sepia(1) saturate(3) hue-rotate(5deg); cursor:pointer; opacity:0.5 }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .form-grid-tri { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        @media (max-width: 500px) {
          .form-grid, .form-grid-tri { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="evtscroll w-full sm:max-w-xl" style={{ background: BG, border: `1px solid ${AMBER(0.18)}`, maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "0 20px 80px rgba(0,0,0,0.8)", borderRadius: "12px 12px 0 0" }}>

        {/* top shimmer */}
        <div style={{ height:1, overflow:"hidden", background:AMBER(0.1), position:"relative" }}>
          <div style={{ position:"absolute", top:0, bottom:0, width:"40%", background:`linear-gradient(to right,transparent,${AMBER(0.65)},transparent)`, animation:"evtshimmer 2.5s linear infinite" }} />
        </div>

        <div style={{ padding: "20px 20px 32px", display:"flex", flexDirection:"column", gap:12 }}>

          {/* header */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
            <div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", letterSpacing:"0.3em", color:AMBER(0.4), marginBottom:4 }}>
                {isEdit ? "SYS · EDIT_LOG" : "SYS · NEW_ENTRY"}
              </div>
              <h2 style={{ fontFamily:"'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize:"clamp(1.1rem, 4vw, 1.4rem)", color: AMBER(0.9), margin:0 }}>
                {isEdit ? "Edit Event Protocol" : "Initialize Event"}
              </h2>
            </div>
            <button onClick={onClose} style={{ width:28, height:28, flexShrink:0, background:"transparent", border:`1px solid ${AMBER(0.15)}`, color:AMBER(0.4), cursor:"pointer" }}>✕</button>
          </div>

          <SRule label="EVT · POSTER" />
          <div style={{ display:"flex", flexWrap: "wrap", gap:14, alignItems:"center" }}>
            <div style={{ width:100, height:130, flexShrink:0, border:`1px solid ${AMBER(0.2)}`, background:AMBER(0.04), overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              {form.poster_url ? <img src={form.poster_url} alt="Poster" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <span style={{ fontSize: "0.5rem", color: AMBER(0.2) }}>VOID</span>}
            </div>
            <label style={{ cursor:"pointer" }}>
              <input type="file" accept="image/*" onChange={handlePosterUpload} />
              <div style={{ fontFamily:"'IBM Plex Mono'", fontSize:"0.55rem", padding:"10px 16px", border:`1px solid ${AMBER(0.2)}`, color:AMBER(0.5) }}>
                {uploading ? "SYNCING..." : "UPLOAD_MEDIA"}
              </div>
            </label>
          </div>

          <SRule label="EVT · METADATA" />
          <MCInput label="TITLE" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="Entry point" />
          <div className="form-grid">
            <MCInput label="EVENT TYPE" value={form.event_type} onChange={v => setForm({ ...form, event_type: v })} placeholder="Classification" />
            <MCInput label="VENUE" value={form.venue} onChange={v => setForm({ ...form, venue: v })} placeholder="Coordinates" />
          </div>
          <MCTextarea label="DESCRIPTION" value={form.description} onChange={v => setForm({ ...form, description: v })} />

          <SRule label="EVT · CHRONO" />
          <div className="form-grid">
            <MCInput label="START_UTC" type="datetime-local" value={form.start_datetime} onChange={v => setForm({ ...form, start_datetime: v })} />
            <MCInput label="END_UTC" type="datetime-local" value={form.end_datetime} onChange={v => setForm({ ...form, end_datetime: v })} />
          </div>
          <MCInput label="REG_DEADLINE" type="datetime-local" value={form.registration_deadline} onChange={v => setForm({ ...form, registration_deadline: v })} />

          <SRule label="EVT · PARAMETERS" />
          <div className="form-grid">
            <MCInput label="MAX_CAPACITY" type="number" value={form.capacity} onChange={v => setForm({ ...form, capacity: Number(v) })} />
            <MCInput label="PRIORITY_VAL" type="number" value={form.display_order} onChange={v => setForm({ ...form, display_order: Number(v) })} />
          </div>
          <div className="form-grid-tri">
            <MCBoolSelect label="ACTIVE" value={form.is_active} onChange={v => setForm({ ...form, is_active: v })} />
            <MCBoolSelect label="FEATURED" value={form.is_featured} onChange={v => setForm({ ...form, is_featured: v })} />
            <MCBoolSelect label="PAID" value={form.is_paid} onChange={v => setForm({ ...form, is_paid: v, ...(v === false && { price: 0, upi_qr_url: "" }) })} />
          </div>

          {form.is_paid && (
            <div style={{ marginTop: 8, padding:"16px", background:AMBER(0.03), border:`1px solid ${AMBER(0.12)}` }}>
              <MCInput label="CURRENCY_VAL (INR)" type="number" value={form.price} onChange={v => setForm({ ...form, price: Number(v) })} />
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize:"0.46rem", color:AMBER(0.3), marginBottom:8 }}>UPI_UPLINK (QR)</div>
                {form.upi_qr_url && <img src={form.upi_qr_url} style={{ width:100, marginBottom:10 }} />}
                <label style={{ cursor:"pointer" }}>
                  <input type="file" accept="image/*" onChange={handleUpiQrUpload} />
                  <div style={{ display:"inline-block", fontSize:"0.55rem", padding:"8px 14px", border:`1px solid ${AMBER(0.2)}`, color:AMBER(0.5) }}>UPLOAD_QR</div>
                </label>
              </div>
            </div>
          )}

          <div style={{ display:"flex", flexWrap: "wrap", justifyContent:"flex-end", gap:8, marginTop:12, paddingTop:16, borderTop:`1px solid ${AMBER(0.08)}` }}>
            <button onClick={onClose} style={{ flex: "1 1 auto", fontFamily:"'IBM Plex Mono'", fontSize:"0.6rem", padding:"12px 20px", background:"transparent", border:`1px solid ${AMBER(0.15)}`, color:AMBER(0.4) }}>ABORT</button>
            <button onClick={save} disabled={busy} style={{ flex: "2 1 auto", fontFamily:"'IBM Plex Mono'", fontSize:"0.6rem", padding:"12px 24px", background:busy ? AMBER(0.4) : AMBER(0.9), border:"none", color:BG, fontWeight:700, position: "relative", overflow: "hidden" }}>
              {busy && <span style={{ position:"absolute", inset: 0, background:"rgba(0,0,0,0.1)", animation:"evtshimmer 0.85s infinite" }} />}
              <span style={{ position:"relative" }}>{saving ? "SAVING_DATA..." : uploading ? "SYNCING_MEDIA..." : isEdit ? "UPDATE_PROTOCOL" : "INITIALIZE_EVENT"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
