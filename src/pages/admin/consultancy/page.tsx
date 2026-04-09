
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ── MCInput ── */
function MCInput({ label, name, placeholder, value, onChange, type = "text" }: {
  label: string; name: string; placeholder: string
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1, background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
        <input name={name} type={type} placeholder={placeholder} value={value}
          onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ width: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, background: foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)", borderTop: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderRight: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderLeft: "none", outline: "none", color: DIMWHITE(0.85), fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.04em", transition: "background 0.18s" }}
        />
      </div>
    </div>
  )
}

/* ── MCTextarea ── */
function MCTextarea({ label, placeholder, value, onChange, rows = 3 }: {
  label: string; placeholder: string; value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: foc ? 2 : 1, background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
        <textarea rows={rows} placeholder={placeholder} value={value}
          onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ width: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, resize: "vertical", background: foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)", borderTop: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderRight: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`, borderLeft: "none", outline: "none", color: DIMWHITE(0.85), fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.65, transition: "background 0.18s" }}
        />
      </div>
    </div>
  )
}

/* ── Section Rule ── */
function SRule({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0 2px" }}>
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.35), whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.18)},transparent)` }} />
    </div>
  )
}

type Service = {
  id: string; title: string; description: string | null; image_url: string | null
  contact_name: string | null; contact_email: string | null; category: string | null
  features: string[] | null; is_active: boolean
}

export default function AdminConsultancy() {
  const [services,     setServices]     = useState<Service[]>([])
  const [title,        setTitle]        = useState("")
  const [desc,         setDesc]         = useState("")
  const [category,     setCategory]     = useState("")
  const [contactName,  setContactName]  = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [features,     setFeatures]     = useState("")
  const [imageUrl,     setImageUrl]     = useState("")
  const [uploading,    setUploading]    = useState(false)
  const [saving,       setSaving]       = useState(false)
  const [deleteFor,    setDeleteFor]    = useState<string | null>(null)

  useEffect(() => { fetchServices() }, [])

  async function fetchServices() {
    const { data } = await supabase.from("consultancy_services").select("*").order("created_at", { ascending: false })
    setServices(data || [])
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true)
    try {
      const data = new FormData(); data.append("file", file); data.append("upload_preset", "idea_lab_profiles")
      const res  = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: data })
      const json = await res.json(); if (!res.ok) throw new Error(json.error?.message)
      setImageUrl(json.secure_url)
    } catch (err) { console.error(err); alert("Image upload failed") }
    finally { setUploading(false) }
  }

  async function createService() {
    if (!title) { alert("Service title required"); return }
    setSaving(true)
    const featureArray = features.trim() === "" ? [] : features.split(",").map(f => f.trim())
    const { error } = await supabase.from("consultancy_services").insert([{
      title, description: desc, category, contact_name: contactName,
      contact_email: contactEmail, image_url: imageUrl || null, features: featureArray, is_active: true
    }])
    setSaving(false)
    if (!error) { setTitle(""); setDesc(""); setCategory(""); setContactName(""); setContactEmail(""); setFeatures(""); setImageUrl(""); fetchServices() }
  }

  async function deleteService(id: string) {
    const { error } = await supabase.from("consultancy_services").delete().eq("id", id)
    if (!error) { setDeleteFor(null); fetchServices() }
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink   { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes cnsshimmer{ from{left:-40%} to{left:140%} }
        input[type=file]     { display:none }
        input::placeholder,textarea::placeholder { color:rgba(255,176,0,0.2);font-family:'IBM Plex Mono',monospace;font-size:0.72rem }
        textarea             { resize:vertical }

        /* ── RESPONSIVE ── */
        .cns-container { padding: 28px 24px 48px }
        .cns-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px }
        .cns-panel-inner  { padding: 22px 22px 24px }
        .cns-card-row     { display: flex; align-items: flex-start; justify-content: space-between; gap: 12; flex-wrap: wrap }
        .cns-card-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0 }
        .cns-exp-inner    { display: flex; gap: 14px; flex-wrap: wrap }
        .cns-exp-text     { flex: 1; min-width: 200px }
        .cns-create-btn   { width: auto }

        @media (max-width: 768px) {
          .cns-container   { padding: 20px 18px 40px !important }
          .cns-panel-inner { padding: 18px 16px 20px !important }
        }
        @media (max-width: 600px) {
          .cns-container      { padding: 16px 14px 36px !important }
          .cns-contact-grid   { grid-template-columns: 1fr !important }
          .cns-card-row       { flex-direction: column !important; gap: 10px !important }
          .cns-card-actions   { width: 100% !important; justify-content: flex-end !important }
          .cns-exp-inner      { flex-direction: column !important }
          .cns-exp-text       { min-width: 0 !important }
          .cns-create-btn     { width: 100% !important }
          .cns-header-row     { flex-direction: column !important; align-items: flex-start !important }
        }
        @media (max-width: 400px) {
          .cns-panel-inner { padding: 14px 12px 16px !important }
        }
      `}</style>

      <div className="cns-container" style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* page rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · CONSULTANCY SERVICES</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.25)},transparent)` }} />
        </div>

        {/* header */}
        <div className="cns-header-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Consultancy Services
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Manage and publish consultancy offerings
            </p>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.47rem", letterSpacing: "0.22em", color: AMBER(0.3), padding: "7px 12px", border: `1px solid ${AMBER(0.12)}` }}>
            {services.length} SERVICE{services.length !== 1 ? "S" : ""}
          </div>
        </div>

        {/* ── CREATE PANEL ── */}
        <div style={{ position: "relative", overflow: "hidden", background: PANEL, border: `1px solid ${BORDER}`, marginBottom: 28 }}>
          <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right,transparent,${AMBER(0.6)},transparent)`, animation: "cnsshimmer 2.5s linear infinite" }} />
          </div>
          <div style={{ position: "absolute", top: 8, left: 8,  width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft:  `1px solid ${AMBER(0.4)}`  }} />
          <div style={{ position: "absolute", top: 8, right: 8, width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}`  }} />
          <div style={{ position: "absolute", bottom: 8, left: 8,  width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderLeft:  `1px solid ${AMBER(0.18)}` }} />
          <div style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderRight: `1px solid ${AMBER(0.18)}` }} />

          <div className="cns-panel-inner" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: AMBER(0.4), marginBottom: 4 }}>SYS · NEW RECORD</div>
              <h2 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>Create Service</h2>
            </div>

            <SRule label="SVC · CORE INFO" />
            <MCInput label="TITLE"    name="title"    placeholder="Service title"    value={title}    onChange={e => setTitle(e.target.value)} />
            <MCTextarea label="DESCRIPTION" placeholder="Describe the service..." value={desc} onChange={e => setDesc(e.target.value)} rows={3} />
            <MCInput label="CATEGORY" name="category" placeholder="e.g. Tech, Legal" value={category} onChange={e => setCategory(e.target.value)} />
            <MCInput label="FEATURES (comma-separated)" name="features" placeholder="Feature 1, Feature 2, Feature 3..." value={features} onChange={e => setFeatures(e.target.value)} />

            <SRule label="SVC · CONTACT" />
            <div className="cns-contact-grid">
              <MCInput label="CONTACT NAME"  name="contactName"  placeholder="Full name"  value={contactName}  onChange={e => setContactName(e.target.value)} />
              <MCInput label="CONTACT EMAIL" name="contactEmail" placeholder="email@..." type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
            </div>

            <SRule label="SVC · IMAGE" />
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 90, height: 68, flexShrink: 0, border: `1px solid ${AMBER(0.2)}`, background: AMBER(0.04), overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {imageUrl
                  ? <img src={imageUrl} alt="Preview" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.15em", color: AMBER(0.25) }}>NO IMAGE</span>
                }
              </div>
              <label style={{ cursor: "pointer" }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.18em", padding: "7px 14px", background: "transparent", border: `1px solid ${AMBER(uploading ? 0.12 : 0.2)}`, color: AMBER(uploading ? 0.3 : 0.55) }}>
                  {uploading ? "UPLOADING..." : "UPLOAD / REPLACE"}
                </div>
              </label>
            </div>

            <div style={{ height: 1, background: `linear-gradient(to right,${AMBER(0.1)},transparent)`, marginTop: 4 }} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="cns-create-btn">
                <CreateBtn onClick={createService} saving={saving} />
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICE LIST ── */}
        {services.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>NO SERVICES YET</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {services.map(s => (
              <ServiceCard key={s.id} service={s} onDelete={() => setDeleteFor(s.id)} />
            ))}
          </div>
        )}
      </div>

      {deleteFor && (
        <DeleteConfirmModal
          onConfirm={() => deleteService(deleteFor)}
          onCancel={() => setDeleteFor(null)}
        />
      )}
    </div>
  )
}

/* ── SERVICE CARD ── */
function ServiceCard({ service: s, onDelete }: { service: Service; onDelete: () => void }) {
  const [hov, setHov] = useState(false)
  const [exp, setExp] = useState(false)
  const shortId = s.id.slice(0, 8).toUpperCase()

  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", overflow: "hidden", background: hov ? "rgba(255,176,0,0.045)" : PANEL, border: `1px solid ${hov ? AMBER(0.25) : BORDER}`, transition: "border 0.22s,background 0.22s" }}
    >
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${AMBER(0.5)},transparent)` }} />}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1, background: `linear-gradient(to bottom,transparent,${AMBER(hov ? 0.75 : s.is_active ? 0.4 : 0.12)},transparent)`, transition: "all 0.22s" }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

      <div style={{ padding: "12px 16px 12px 18px" }}>
        <div className="cns-card-row">
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.2em", color: AMBER(0.28), marginBottom: 4 }}>SVC·{shortId}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
              <div style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", color: "rgba(220,215,200,0.9)", lineHeight: 1.1 }}>{s.title}</div>
              {s.category && <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.16em", padding: "2px 7px", color: AMBER(0.7), border: `1px solid ${AMBER(0.22)}` }}>{s.category.toUpperCase()}</span>}
              {!s.is_active && <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.44rem", letterSpacing: "0.16em", padding: "2px 7px", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.1)" }}>INACTIVE</span>}
            </div>
            {s.contact_email && <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.55rem", color: AMBER(0.35), marginTop: 4, wordBreak: "break-all" }}>{s.contact_name && `${s.contact_name} · `}{s.contact_email}</div>}
          </div>

          <div className="cns-card-actions">
            {s.description && (
              <ActionBtn label={exp ? "COLLAPSE" : "EXPAND"} onClick={() => setExp(!exp)} color={AMBER(0.55)} hoverBg={AMBER(0.06)} hoverBorder={AMBER(0.28)} />
            )}
            <ActionBtn label="DELETE" onClick={onDelete} color="rgba(255,60,60,0.7)" hoverBg="rgba(255,60,60,0.07)" hoverBorder="rgba(255,60,60,0.3)" />
          </div>
        </div>

        {exp && (
          <div className="cns-exp-inner" style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${AMBER(0.08)}` }}>
            {s.image_url && (
              <img src={s.image_url} alt={s.title} style={{ width: 120, height: 80, objectFit: "cover", border: `1px solid ${AMBER(0.15)}`, flexShrink: 0 }} />
            )}
            <div className="cns-exp-text">
              {s.description && <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(220,215,200,0.5)", lineHeight: 1.6, margin: "0 0 8px" }}>{s.description}</p>}
              {s.features && s.features.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
                  {s.features.map((f, i) => (
                    <span key={i} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.48rem", letterSpacing: "0.14em", padding: "2px 8px", color: AMBER(0.55), border: `1px solid ${AMBER(0.18)}` }}>{f}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── ACTION BTN ── */
function ActionBtn({ label, onClick, color, hoverBg, hoverBorder }: {
  label: string; onClick: () => void; color: string; hoverBg: string; hoverBorder: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.18em", padding: "5px 12px", background: hov ? hoverBg : "transparent", borderTop: `1px solid ${hov ? hoverBorder : BORDER}`, borderRight: `1px solid ${hov ? hoverBorder : BORDER}`, borderBottom: `1px solid ${hov ? hoverBorder : BORDER}`, borderLeft: "none", color, cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.18s", whiteSpace: "nowrap" as const }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${color},transparent)`, opacity: hov ? 1 : 0.35, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ── CREATE BTN ── */
function CreateBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} disabled={saving} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.22em", padding: "10px 26px", width: "100%", background: saving ? AMBER(0.5) : hov ? AMBER(1) : AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", boxShadow: saving ? "none" : `0 0 ${hov ? 22 : 14}px rgba(255,176,0,${hov ? 0.38 : 0.22})`, position: "relative", overflow: "hidden", transition: "all 0.18s" }}
    >
      {saving && <span style={{ position: "absolute", top: 0, bottom: 0, width: "30%", background: "linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)", animation: "cnsshimmer 0.85s linear infinite" }} />}
      <span style={{ position: "relative", zIndex: 1 }}>{saving ? "CREATING..." : "CREATE SERVICE"}</span>
    </button>
  )
}

/* ── DELETE CONFIRM MODAL ── */
function DeleteConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 360, background: BG, border: "1px solid rgba(255,60,60,0.35)", boxShadow: "0 32px 64px rgba(0,0,0,0.7)", position: "relative", overflow: "hidden" }}>
        <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(255,60,60,0.55),transparent)" }} />
        <div style={{ position: "absolute", top: 8, left: 8,   width: 9, height: 9, borderTop: "1px solid rgba(255,60,60,0.45)", borderLeft:  "1px solid rgba(255,60,60,0.45)" }} />
        <div style={{ position: "absolute", top: 8, right: 8,  width: 9, height: 9, borderTop: "1px solid rgba(255,60,60,0.45)", borderRight: "1px solid rgba(255,60,60,0.45)" }} />
        <div style={{ padding: "22px 22px 20px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,60,60,0.5)", marginBottom: 6 }}>SYS · CONFIRM DELETE</div>
          <h3 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "rgba(255,60,60,0.88)", margin: "0 0 8px" }}>Delete Service</h3>
          <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.84rem", color: DIMWHITE(0.4), marginBottom: 20 }}>This action is permanent and cannot be undone.</p>
          <div style={{ height: 1, background: "linear-gradient(to right,rgba(255,60,60,0.12),transparent)", marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={onCancel}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 16px", background: "transparent", border: `1px solid ${hov ? AMBER(0.3) : AMBER(0.15)}`, color: hov ? AMBER(0.65) : AMBER(0.4), cursor: "pointer", transition: "all 0.18s" }}
            >CANCEL</button>
            <button onClick={onConfirm}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 20px", background: "rgba(255,60,60,0.85)", border: "none", color: BG, fontWeight: 600, cursor: "pointer", boxShadow: "0 0 14px rgba(255,60,60,0.3)" }}
            >DELETE</button>
          </div>
        </div>
      </div>
    </div>
  )
}
