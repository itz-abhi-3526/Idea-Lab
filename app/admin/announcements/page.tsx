"use client"

import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"
const RED      = (a = 1) => `rgba(255,60,60,${a})`

/* ─────────────────────────────────────────
   SHIMMER BAR
───────────────────────────────────────── */
function ShimmerBar() {
  return (
    <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, width: "40%",
        background: `linear-gradient(to right, transparent, ${AMBER(0.6)}, transparent)`,
        animation: "annshinmer 2.5s linear infinite",
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem",
        letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   POST BUTTON
───────────────────────────────────────── */
function PostBtn({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem",
        letterSpacing: "0.22em", padding: "12px 26px", border: "none",
        background: loading ? AMBER(0.5) : hov ? AMBER(1) : AMBER(0.9),
        color: BG, cursor: loading ? "not-allowed" : "pointer",
        transition: "background 0.2s",
        width: "100%", 
      }}
    >
      {loading ? "POSTING..." : "POST ANNOUNCEMENT"}
    </button>
  )
}

/* ─────────────────────────────────────────
   MODAL
───────────────────────────────────────── */
function Modal({
  open, onClose, title: modalTitle, children, actions,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions: React.ReactNode
}) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div style={{
        width: "100%", maxWidth: 480,
        background: BG,
        border: `1px solid ${AMBER(0.2)}`,
        position: "relative",
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        <ShimmerBar />

        <div style={{
          padding: "18px 20px 0",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          gap: 12,
        }}>
          <h2 style={{
            fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700,
            fontSize: "1.1rem", color: AMBER(0.9), margin: 0,
          }}>
            {modalTitle}
          </h2>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: AMBER(0.4), cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        <div style={{ padding: "20px" }}>
          {children}
        </div>

        <div style={{
          padding: "0 20px 20px",
          display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 10,
        }}>
          {actions}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   FIELD
───────────────────────────────────────── */
function Field({
  label, value, onChange, multiline = false, rows = 4,
}: {
  label: string; value: string; onChange: (v: string) => void
  multiline?: boolean; rows?: number
}) {
  const [foc, setFoc] = useState(false)
  const shared: React.CSSProperties = {
    width: "100%", padding: "10px 12px",
    background: "rgba(0,0,0,0.4)",
    border: `1px solid ${foc ? AMBER(0.5) : AMBER(0.12)}`,
    color: DIMWHITE(0.9),
    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem",
    outline: "none", transition: "all 0.2s",
    boxSizing: "border-box",
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", marginBottom: 6,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem",
        letterSpacing: "0.2em", color: AMBER(foc ? 0.8 : 0.35),
        textTransform: "uppercase",
      }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)}
          onBlur={() => setFoc(false)}
          rows={rows}
          style={{ ...shared, resize: "vertical" }}
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)}
          onBlur={() => setFoc(false)}
          style={shared}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   DIALOG BUTTON
───────────────────────────────────────── */
function DialogBtn({
  onClick, children, variant = "primary", disabled = false,
}: {
  onClick: () => void; children: React.ReactNode
  variant?: "primary" | "ghost" | "danger"; disabled?: boolean
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: disabled ? AMBER(0.5) : AMBER(0.9), color: BG, border: "none" },
    ghost: { background: "transparent", border: `1px solid ${AMBER(0.2)}`, color: AMBER(0.5) },
    danger: { background: "transparent", border: `1px solid ${RED(0.3)}`, color: RED(0.7) },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem",
        padding: "10px 20px", cursor: disabled ? "not-allowed" : "pointer",
        flex: 1, minWidth: "100px", transition: "all 0.18s",
        ...styles[variant],
      }}
    >
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function AdminAnnouncements() {
  const [title,   setTitle]   = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [announcements, setAnnouncements] = useState<any[]>([])

  const [deleteTarget,  setDeleteTarget]  = useState<any | null>(null)
  const [editTarget,    setEditTarget]    = useState<any | null>(null)
  const [editTitle,     setEditTitle]     = useState("")
  const [editMessage,   setEditMessage]   = useState("")
  const [editSaving,    setEditSaving]    = useState(false)
  const [successModal,  setSuccessModal]  = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => { fetchAnnouncements() }, [])

  async function fetchAnnouncements() {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
    if (data) setAnnouncements(data)
  }

  async function createAnnouncement() {
    if (!title || !message) return
    setLoading(true)
    const { error } = await supabase.from("announcements").insert([{ title, message }])
    setLoading(false)
    if (!error) {
      setTitle(""); setMessage(""); fetchAnnouncements(); setSuccessModal(true)
    }
  }

  async function deleteAnnouncement(id: string) {
    setDeleteLoading(true)
    await supabase.from("announcements").update({ is_active: false }).eq("id", id)
    setDeleteLoading(false); setDeleteTarget(null); fetchAnnouncements()
  }

  async function saveEdit() {
    if (!editTarget) return
    setEditSaving(true)
    await supabase.from("announcements").update({ title: editTitle, message: editMessage }).eq("id", editTarget.id)
    setEditSaving(false); setEditTarget(null); fetchAnnouncements()
  }

  function openEdit(a: any) {
    setEditTarget(a); setEditTitle(a.title); setEditMessage(a.message)
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes annshinmer { from{left:-40%} to{left:140%} }
        .main-ann-container { width: 100%; max-width: 800px; margin: 0 auto; padding: 28px 16px 60px; }
        
        @media (min-width: 768px) {
          .ann-actions-row { justify-content: flex-end !important; }
          .ann-actions-row > button { flex: none !important; width: 100px; }
        }
      `}</style>

      <div className="main-ann-container">
        <SectionLabel label="SYS · ANNOUNCEMENTS" />

        <div style={{ position: "relative", overflow: "hidden", background: PANEL, border: `1px solid ${BORDER}`, marginBottom: 40 }}>
          <ShimmerBar />
          <div style={{ padding: "22px" }}>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "clamp(1.2rem, 5vw, 1.5rem)", color: AMBER(0.95), margin: "0 0 20px" }}>
              Create Announcement
            </h1>

            <Field label="Title" value={title} onChange={setTitle} />
            <Field label="Message" value={message} onChange={setMessage} multiline rows={4} />

            <PostBtn onClick={createAnnouncement} loading={loading} />
          </div>
        </div>

        <SectionLabel label="SYS · ACTIVE RECORDS" />

        <div style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
          <div style={{ padding: "12px 20px" }}>

            {announcements.length === 0 && (
              <div style={{ padding: "20px 0", textAlign: "center", fontSize: "0.7rem", color: AMBER(0.3), fontFamily: "'IBM Plex Mono'" }}>
                NO ACTIVE ANNOUNCEMENTS DETECTED
              </div>
            )}

            {announcements.map((a, i) => (
              <div key={a.id} style={{ padding: "16px 0", borderBottom: i < announcements.length - 1 ? `1px solid ${AMBER(0.08)}` : "none" }}>
                <div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 600, color: AMBER(0.9), marginBottom: 6, fontSize: "1.05rem" }}>
                  {a.title}
                </div>

                <div style={{ fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 14, color: DIMWHITE(0.6), fontFamily: "inherit" }}>
                  {a.message}
                </div>

                <div className="ann-actions-row" style={{ display: "flex", gap: 10 }}>
                  <DialogBtn variant="ghost" onClick={() => openEdit(a)}>EDIT</DialogBtn>
                  <DialogBtn variant="danger" onClick={() => setDeleteTarget(a)}>DELETE</DialogBtn>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal open={successModal} onClose={() => setSuccessModal(false)} title="Mission Status" actions={<DialogBtn onClick={() => setSuccessModal(false)}>CLOSE</DialogBtn>}>
        <p style={{ fontSize: "0.85rem", color: DIMWHITE(0.5), margin: 0 }}>The announcement has been broadcast successfully to the live system feed.</p>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Announcement" actions={<><DialogBtn onClick={() => setDeleteTarget(null)} variant="ghost">CANCEL</DialogBtn><DialogBtn onClick={() => deleteAnnouncement(deleteTarget.id)} variant="danger" disabled={deleteLoading}>{deleteLoading ? "DELETING..." : "CONFIRM"}</DialogBtn></>}>
        <p style={{ fontSize: "0.85rem", color: DIMWHITE(0.5), marginBottom: 12 }}>Terminate the following record?</p>
        {deleteTarget && <div style={{ padding: "12px", background: "rgba(220,50,50,0.05)", border: `1px solid ${RED(0.2)}`, fontSize: "0.9rem", color: AMBER(0.8) }}>{deleteTarget.title}</div>}
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Modify Record" actions={<><DialogBtn onClick={() => setEditTarget(null)} variant="ghost">CANCEL</DialogBtn><DialogBtn onClick={saveEdit} disabled={editSaving}>{editSaving ? "SAVING..." : "UPDATE"}</DialogBtn></>}>
        <Field label="Title" value={editTitle} onChange={setEditTitle} />
        <Field label="Message" value={editMessage} onChange={setEditMessage} multiline rows={5} />
      </Modal>

    </div>
  )
}