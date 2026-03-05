'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.18)"

/* ─────────────────────────────────────────
   CYBER INPUT — no border shorthand conflict
───────────────────────────────────────── */
function MCInput({
  name, placeholder, value, onChange, type = "text",
}: {
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position:   "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1,
        background: foc
          ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)`
          : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`,
        transition: "background 0.2s, width 0.15s",
      }} />
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFoc(true)}
        onBlur={() => setFoc(false)}
        style={{
          width:         "100%",
          paddingLeft:   14,
          paddingRight:  12,
          paddingTop:    10,
          paddingBottom: 10,
          background:    foc ? `rgba(255,176,0,0.04)` : "rgba(0,0,0,0.35)",
          borderTop:     `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
          borderRight:   `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
          borderBottom:  `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
          borderLeft:    "none",
          outline:       "none",
          color:         DIMWHITE(0.85),
          fontFamily:    "'IBM Plex Mono', monospace",
          fontSize:      "0.78rem",
          letterSpacing: "0.06em",
          transition:    "background 0.2s",
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   TYPE + PROPS — unchanged
───────────────────────────────────────── */
export type ExecomMember = {
  id: string
  name: string
  designation: string
  role?: string | null
  image_url: string | null
  display_order: number
  is_active: boolean
}

type Props = {
  open: boolean
  onClose: () => void
  member?: ExecomMember | null
}

/* ─────────────────────────────────────────
   MODAL — all supabase/cloudinary/form logic untouched
───────────────────────────────────────── */
export default function AddExecomModal({ open, onClose, member = null }: Props) {
  const [loading,   setLoading]   = useState(false)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    name: '', department: '', role: '', image_url: '', display_order: '',
  })

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  useEffect(() => {
  if (member) {
    setForm({
      name:          member.name,
      department:    member.designation,
      role:          member.role ?? "",
      image_url:     member.image_url || "",
      display_order: String(member.display_order),
    })
  } else {
    setForm({
      name: "",
      department: "",
      role: "",
      image_url: "",
      display_order: "",
    })
  }
}, [member, open])

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'idea_lab_profiles')
      const res  = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error?.message || 'Upload failed')
      setForm(prev => ({ ...prev, image_url: json.secure_url }))
    } catch (err) {
      console.error(err)
      alert('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  console.log("Cloudinary cloud:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

  const handleSubmit = async () => {
    if (!form.name || !form.department) {
      alert('Please fill all required fields')
      return
    }
    setLoading(true)
    const payload = {
  name:          form.name,
  designation:   form.department,
  role:          form.role?.trim() || null,
  image_url:     form.image_url || null,
  display_order: Number(form.display_order),
}
    const query = member
      ? supabase.from('execom_members').update(payload).eq('id', member.id)
      : supabase.from('execom_members').insert({ ...payload, is_active: true })
    const { error } = await query
    setLoading(false)
    if (error) { console.error(error); alert(error.message); return }
    onClose()
  }

  const isEdit = !!member

  return (
    <div style={{
      position:        "fixed",
      inset:           0,
      zIndex:          50,
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      background:      "rgba(0,0,0,0.75)",
      backdropFilter:  "blur(8px)",
      padding:         "16px",
    }}>
      <style>{`
        @keyframes mcblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        input[type=file] { display:none }
        input::placeholder { color: ${AMBER(0.22)}; font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <div style={{
        width:          "100%",
        maxWidth:       480,
        background:     BG,
        border:         `1px solid ${BORDER}`,
        boxShadow:      `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px ${AMBER(0.06)}`,
        position:       "relative",
        overflow:       "hidden",
      }}>
        {/* top shimmer bar */}
        <div style={{ height: 1, overflow: "hidden", background: AMBER(0.12), position: "relative" }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: "40%",
            background: `linear-gradient(to right, transparent, ${AMBER(0.7)}, transparent)`,
            animation: "shimmer 2.5s linear infinite",
          }} />
          <style>{`@keyframes shimmer { from{left:-40%} to{left:140%} }`}</style>
        </div>

        {/* HUD corners */}
        <div style={{ position: "absolute", top: 8, left: 8, width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft: `1px solid ${AMBER(0.4)}` }} />
        <div style={{ position: "absolute", top: 8, right: 8, width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}` }} />
        <div style={{ position: "absolute", bottom: 8, left: 8, width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.2)}`, borderLeft: `1px solid ${AMBER(0.2)}` }} />
        <div style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.2)}`, borderRight: `1px solid ${AMBER(0.2)}` }} />

        <div style={{ padding: "24px 24px 28px" }}>

          {/* ── HEADER ── */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: AMBER(0.4), marginBottom: 4 }}>
                {isEdit ? "SYS · EDIT RECORD" : "SYS · NEW RECORD"}
              </div>
              <h2 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.35rem", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
                {isEdit ? "Edit Member" : "Add Member"}
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: `1px solid ${AMBER(0.18)}`,
                color: AMBER(0.45), cursor: "pointer", fontSize: "0.75rem",
                fontFamily: "'IBM Plex Mono', monospace",
                transition: "border-color 0.18s, color 0.18s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.45); (e.currentTarget as HTMLButtonElement).style.color = AMBER(0.8) }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.18); (e.currentTarget as HTMLButtonElement).style.color = AMBER(0.45) }}
            >
              ✕
            </button>
          </div>

          {/* ── AVATAR UPLOAD ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: "14px 14px", background: PANEL, border: `1px solid ${AMBER(0.1)}` }}>
            {/* avatar square */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 72, height: 72,
                border: `1px solid ${AMBER(0.3)}`,
                overflow: "hidden",
                background: AMBER(0.05),
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {form.image_url ? (
                  <img src={form.image_url} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: AMBER(0.3) }}>
                    {form.name?.charAt(0).toUpperCase() || "?"}
                  </span>
                )}
              </div>

              {/* upload trigger */}
              <label style={{ position: "absolute", bottom: -4, right: -4, cursor: "pointer" }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <div style={{
                  width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center",
                  background: AMBER(0.9), color: BG, fontSize: "0.65rem", fontWeight: 700,
                  border: `1px solid ${AMBER(0.5)}`,
                }}>
                  ✎
                </div>
              </label>
            </div>

            <div>
              <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 500, fontSize: "0.85rem", color: DIMWHITE(0.7), marginBottom: 3 }}>
                Profile Photo
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: AMBER(0.3) }}>
                SQUARE · JPG OR PNG
              </div>
              {uploading && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.7s ease-in-out infinite" }} />
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: AMBER(0.45) }}>UPLOADING...</span>
                </div>
              )}
            </div>
          </div>

          {/* ── FIELDS ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
            {/* field labels */}
            {[
              { name: "name",          placeholder: "Full Name",               label: "NAME"          },
              { name: "department",    placeholder: "Department",              label: "DEPARTMENT"    },
              { name: "role",          placeholder: "Role (e.g. Coordinator)", label: "ROLE"          },
              { name: "display_order", placeholder: "Display Order",           label: "ORDER", type: "number" },
            ].map(f => (
              <div key={f.name}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 14 }}>
                  {f.label}
                </div>
                <MCInput
                  name={f.name}
                  placeholder={f.placeholder}
                  value={(form as any)[f.name]}
                  onChange={handleChange}
                  type={f.type ?? "text"}
                />
              </div>
            ))}
          </div>

          {/* ── ACTIONS ── */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                fontFamily:    "'IBM Plex Mono', monospace",
                fontSize:      "0.6rem",
                letterSpacing: "0.2em",
                padding:       "9px 18px",
                background:    "transparent",
                border:        `1px solid ${AMBER(0.15)}`,
                color:         AMBER(0.4),
                cursor:        "pointer",
                transition:    "border-color 0.18s, color 0.18s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.3); (e.currentTarget as HTMLButtonElement).style.color = AMBER(0.65) }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = AMBER(0.15); (e.currentTarget as HTMLButtonElement).style.color = AMBER(0.4) }}
            >
              CANCEL
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || uploading}
              style={{
                fontFamily:    "'IBM Plex Mono', monospace",
                fontSize:      "0.6rem",
                letterSpacing: "0.2em",
                padding:       "9px 22px",
                background:    loading || uploading ? AMBER(0.5) : AMBER(0.9),
                border:        "none",
                color:         BG,
                fontWeight:    600,
                cursor:        loading || uploading ? "not-allowed" : "pointer",
                boxShadow:     loading || uploading ? "none" : `0 0 16px ${AMBER(0.25)}`,
                transition:    "background 0.18s, box-shadow 0.18s",
                position:      "relative",
                overflow:      "hidden",
              }}
            >
              {loading && (
                <span style={{
                  position: "absolute", top: 0, bottom: 0, width: "30%",
                  background: `linear-gradient(to right, transparent, rgba(0,0,0,0.2), transparent)`,
                  animation: "shimmer 0.85s linear infinite",
                }} />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                {loading
                  ? isEdit ? "UPDATING..." : "ADDING..."
                  : isEdit ? "UPDATE MEMBER" : "ADD MEMBER"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}