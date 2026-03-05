"use client"

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
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1, background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
        <input type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ width:"100%", paddingLeft:10, paddingRight:10, paddingTop:8, paddingBottom:8, background:bg, borderTop:`1px solid ${border}`, borderRight:`1px solid ${border}`, borderBottom:`1px solid ${border}`, borderLeft:"none", outline:"none", color:DIMWHITE(0.85), fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.75rem", letterSpacing:"0.04em", transition:"background 0.18s" }}
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
          style={{ width:"100%", paddingLeft:10, paddingRight:10, paddingTop:8, paddingBottom:8, resize:"none", background:bg, borderTop:`1px solid ${border}`, borderRight:`1px solid ${border}`, borderBottom:`1px solid ${border}`, borderLeft:"none", outline:"none", color:DIMWHITE(0.85), fontFamily:"'IBM Plex Sans',sans-serif", fontWeight:300, fontSize:"0.82rem", lineHeight:1.65, transition:"background 0.18s" }}
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
    <div>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.46rem", letterSpacing:"0.28em", color:AMBER(0.3), marginBottom:3, paddingLeft:10 }}>{label}</div>
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:1, background:`linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)` }} />
        <select value={String(value)} onChange={e => onChange(e.target.value === "true")}
          style={{ width:"100%", paddingLeft:10, paddingRight:10, paddingTop:8, paddingBottom:8, background:"rgba(0,0,0,0.35)", borderTop:`1px solid ${AMBER(0.09)}`, borderRight:`1px solid ${AMBER(0.09)}`, borderBottom:`1px solid ${AMBER(0.09)}`, borderLeft:"none", outline:"none", color:DIMWHITE(0.75), fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.06em", cursor:"pointer", appearance:"none" as any }}
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
    <div style={{ display:"flex", alignItems:"center", gap:8, margin:"6px 0 2px" }}>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.46rem", letterSpacing:"0.28em", color:AMBER(0.35), whiteSpace:"nowrap" }}>{label}</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(to right,${AMBER(0.18)},transparent)` }} />
    </div>
  )
}

/* ─── TYPES — unchanged ─── */
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

/* ─── MODAL — all supabase / cloudinary / validation logic unchanged ─── */
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
      venue:        event?.venue       ?? "",
      poster_url:   event?.poster_url  ?? "",
      capacity:     event?.capacity    ?? 0,
      is_active:    event?.is_active   ?? true,
      is_featured:  event?.is_featured ?? false,
      display_order:event?.display_order ?? 0,
      is_paid:    event?.is_paid  ?? false,
      price:      event?.price    ?? 0,
      upi_qr_url: event?.upi_qr_url ?? "",
    })
  }, [open, event])

  if (!open || !form) return null

  /* cloudinary uploads */
  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true)
    try {
      const data = new FormData()
      data.append("file", file); data.append("upload_preset", "idea_lab_profiles"); data.append("folder", "idea-lab/event-posters")
      const res  = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: data })
      const json = await res.json(); if (!json.secure_url) throw new Error("Upload failed")
      setForm(prev => prev ? { ...prev, poster_url: json.secure_url } : prev)
    } catch { alert("Poster upload failed") } finally { setUploading(false) }
  }

  const handleUpiQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true)
    try {
      const data = new FormData()
      data.append("file", file); data.append("upload_preset", "idea_lab_profiles"); data.append("folder", "idea-lab/upi-qr")
      const res  = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: data })
      const json = await res.json(); if (!json.secure_url) throw new Error("Upload failed")
      setForm(prev => prev ? { ...prev, upi_qr_url: json.secure_url } : prev)
    } catch { alert("UPI QR upload failed") } finally { setUploading(false) }
  }

  const validate = () => {
    if (!form.title || !form.description || !form.event_type || !form.start_datetime || !form.end_datetime || !form.registration_deadline || !form.venue) { alert("Please fill all required fields."); return false }
    if (form.capacity <= 0) { alert("Capacity must be greater than zero."); return false }
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
    else        { await supabase.from("events").insert(payload) }
    setSaving(false); onClose()
  }

  const isEdit = !!event
  const busy   = saving || uploading

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)" }}
    >
      <style>{`
        @keyframes evtshimmer { from{left:-40%} to{left:140%} }
        .evtscroll::-webkit-scrollbar { width:3px; background:#0a0900 }
        .evtscroll::-webkit-scrollbar-thumb { background:rgba(255,176,0,0.2) }
        input[type=file] { display:none }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0 }
        input[type=datetime-local]::-webkit-calendar-picker-indicator { filter:invert(0.6) sepia(1) saturate(3) hue-rotate(5deg); cursor:pointer; opacity:0.5 }
        .evtscroll textarea::placeholder, .evtscroll input::placeholder { color:rgba(255,176,0,0.2); font-family:"IBM Plex Mono",monospace; font-size:0.72rem }
        .evtscroll option { background:#0a0900 }
      `}</style>

      <div className="evtscroll w-full sm:max-w-xl" style={{ background: BG, border: `1px solid ${AMBER(0.18)}`, borderBottom: "none", maxHeight: "92vh", overflowY: "auto", position: "relative", boxShadow: "0 -20px 60px rgba(0,0,0,0.7)" }}>

        {/* shimmer bar */}
        <div style={{ height:1, overflow:"hidden", background:AMBER(0.1), position:"relative" }}>
          <div style={{ position:"absolute", top:0, bottom:0, width:"40%", background:`linear-gradient(to right,transparent,${AMBER(0.65)},transparent)`, animation:"evtshimmer 2.5s linear infinite" }} />
        </div>

        {/* HUD corners */}
        <div style={{ position:"absolute", top:8, left:8,  width:10, height:10, borderTop:`1px solid ${AMBER(0.4)}`, borderLeft:`1px solid ${AMBER(0.4)}`  }} />
        <div style={{ position:"absolute", top:8, right:8, width:10, height:10, borderTop:`1px solid ${AMBER(0.4)}`, borderRight:`1px solid ${AMBER(0.4)}` }} />

        <div style={{ padding: "22px 22px 28px", display:"flex", flexDirection:"column", gap:12 }}>

          {/* header */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
            <div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.5rem", letterSpacing:"0.3em", color:AMBER(0.4), marginBottom:4 }}>
                {isEdit ? "SYS \u00b7 EDIT EVENT" : "SYS \u00b7 CREATE EVENT"}
              </div>
              <h2 style={{ fontFamily:"'IBM Plex Sans Condensed',sans-serif", fontWeight:700, fontSize:"1.3rem", letterSpacing:"-0.01em", color:AMBER(0.9), lineHeight:1, margin:0 }}>
                {isEdit ? "Edit Event" : "Create Event"}
              </h2>
            </div>
            <button onClick={onClose}
              style={{ width:26, height:26, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:`1px solid ${AMBER(0.18)}`, color:AMBER(0.45), cursor:"pointer", fontSize:"0.65rem", fontFamily:"'IBM Plex Mono',monospace", flexShrink:0 }}
            >X</button>
          </div>

          {/* poster */}
          <SRule label="EVT \u00b7 POSTER" />
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ width:100, height:136, flexShrink:0, border:`1px solid ${AMBER(0.2)}`, background:AMBER(0.04), overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              {form.poster_url
                ? <img src={form.poster_url} alt="Poster" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
                : <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.48rem", letterSpacing:"0.15em", color:AMBER(0.25), textAlign:"center", padding:"0 6px" }}>NO POSTER</span>
              }
            </div>
            <label style={{ cursor:"pointer" }}>
              <input type="file" accept="image/*" onChange={handlePosterUpload} />
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.18em", padding:"8px 14px", background:"transparent", border:`1px solid ${AMBER(0.2)}`, color:AMBER(0.55) }}>
                {uploading ? "UPLOADING..." : "UPLOAD / REPLACE"}
              </div>
            </label>
          </div>

          {/* core info */}
          <SRule label="EVT \u00b7 CORE INFO" />
          <MCInput label="TITLE"       value={form.title}      onChange={v => setForm({ ...form, title: v })}      placeholder="Event title" />
          <MCInput label="EVENT TYPE"  value={form.event_type} onChange={v => setForm({ ...form, event_type: v })} placeholder="Workshop, Hackathon..." />
          <MCInput label="VENUE"       value={form.venue}      onChange={v => setForm({ ...form, venue: v })}      placeholder="Location" />
          <MCTextarea label="DESCRIPTION" value={form.description} onChange={v => setForm({ ...form, description: v })} rows={4} />

          {/* schedule */}
          <SRule label="EVT \u00b7 SCHEDULE" />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <MCInput label="START DATE + TIME" type="datetime-local" value={form.start_datetime}         onChange={v => setForm({ ...form, start_datetime: v })} />
            <MCInput label="END DATE + TIME"   type="datetime-local" value={form.end_datetime}           onChange={v => setForm({ ...form, end_datetime: v })} />
          </div>
          <MCInput label="REGISTRATION DEADLINE" type="datetime-local" value={form.registration_deadline} onChange={v => setForm({ ...form, registration_deadline: v })} />

          {/* settings */}
          <SRule label="EVT \u00b7 SETTINGS" />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <MCInput label="CAPACITY"      type="number" value={form.capacity}      onChange={v => setForm({ ...form, capacity: Number(v) })} />
            <MCInput label="DISPLAY ORDER" type="number" value={form.display_order} onChange={v => setForm({ ...form, display_order: Number(v) })} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <MCBoolSelect label="ACTIVE"     value={form.is_active}   onChange={v => setForm({ ...form, is_active: v })} />
            <MCBoolSelect label="FEATURED"   value={form.is_featured} onChange={v => setForm({ ...form, is_featured: v })} />
            <MCBoolSelect label="PAID EVENT" value={form.is_paid}     onChange={v => setForm({ ...form, is_paid: v, ...(v === false && { price: 0, upi_qr_url: "" }) })} />
          </div>

          {/* payment section — conditional */}
          {form.is_paid && (
            <>
              <SRule label="EVT \u00b7 PAYMENT" />
              <div style={{ padding:"14px", background:AMBER(0.04), border:`1px solid ${AMBER(0.14)}`, position:"relative" }}>
                <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:`linear-gradient(to bottom,transparent,${AMBER(0.6)},transparent)` }} />
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <MCInput label="AMOUNT (Rs)" type="number" value={form.price} onChange={v => setForm({ ...form, price: Number(v) })} placeholder="0" />
                  <div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.46rem", letterSpacing:"0.28em", color:AMBER(0.3), marginBottom:8, paddingLeft:10 }}>UPI QR CODE</div>
                    {form.upi_qr_url && <img src={form.upi_qr_url} style={{ width:120, border:`1px solid ${AMBER(0.2)}`, marginBottom:10, display:"block" }} />}
                    <label style={{ cursor:"pointer" }}>
                      <input type="file" accept="image/*" onChange={handleUpiQrUpload} />
                      <div style={{ display:"inline-block", fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.18em", padding:"7px 14px", border:`1px solid ${AMBER(0.2)}`, color:AMBER(0.55), background:"transparent" }}>
                        {uploading ? "UPLOADING..." : "UPLOAD QR"}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* actions */}
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:8, paddingTop:16, borderTop:`1px solid ${AMBER(0.08)}` }}>
            <button onClick={onClose}
              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.2em", padding:"9px 18px", background:"transparent", border:`1px solid ${AMBER(0.15)}`, color:AMBER(0.4), cursor:"pointer" }}
            >CANCEL</button>

            <button onClick={save} disabled={busy}
              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.2em", padding:"9px 22px", background:busy ? AMBER(0.5) : AMBER(0.9), border:"none", color:BG, fontWeight:600, cursor:busy?"not-allowed":"pointer", position:"relative", overflow:"hidden", boxShadow:busy?"none":`0 0 16px ${AMBER(0.25)}` }}
            >
              {busy && <span style={{ position:"absolute", top:0, bottom:0, width:"30%", background:"linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)", animation:"evtshimmer 0.85s linear infinite" }} />}
              <span style={{ position:"relative", zIndex:1 }}>
                {saving ? "SAVING..." : uploading ? "UPLOADING..." : isEdit ? "SAVE EVENT" : "CREATE EVENT"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}