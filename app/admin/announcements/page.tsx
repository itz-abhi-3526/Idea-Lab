"use client"

import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

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
        letterSpacing: "0.22em", padding: "10px 26px", border: "none",
        background: loading ? AMBER(0.5) : hov ? AMBER(1) : AMBER(0.9),
        color: BG, cursor: loading ? "not-allowed" : "pointer",
        transition: "background 0.2s",
      }}
    >
      {loading ? "POSTING..." : "POST ANNOUNCEMENT"}
    </button>
  )
}

/* ─────────────────────────────────────────
   MODAL — reusable dialog
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

  // close on overlay click
  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  // close on Escape
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
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.18s ease both",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 480,
        background: BG,
        border: `1px solid ${BORDER}`,
        position: "relative",
        animation: "modalRise 0.22s cubic-bezier(0.16,1,0.3,1) both",
        overflow: "hidden",
      }}>
        <ShimmerBar />

        {/* header */}
        <div style={{
          padding: "18px 22px 0",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          gap: 12,
        }}>
          <h2 style={{
            fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700,
            fontSize: "1.1rem", color: AMBER(0.9), margin: 0,
          }}>
            {modalTitle}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: AMBER(0.4), fontSize: 18, lineHeight: 1, padding: "2px 4px",
              transition: "color 0.15s", flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = AMBER(0.9))}
            onMouseLeave={e => (e.currentTarget.style.color = AMBER(0.4))}
          >
            ✕
          </button>
        </div>

        {/* divider */}
        <div style={{ height: 1, background: AMBER(0.08), margin: "14px 22px 0" }} />

        {/* body */}
        <div style={{ padding: "18px 22px" }}>
          {children}
        </div>

        {/* footer */}
        <div style={{
          padding: "0 22px 20px",
          display: "flex", justifyContent: "flex-end", gap: 10,
        }}>
          {actions}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   FIELD — labelled input/textarea
───────────────────────────────────────── */
function Field({
  label, value, onChange, multiline = false, rows = 4,
}: {
  label: string; value: string; onChange: (v: string) => void
  multiline?: boolean; rows?: number
}) {
  const [foc, setFoc] = useState(false)
  const shared: React.CSSProperties = {
    width: "100%", padding: "9px 10px",
    background: "rgba(0,0,0,0.35)",
    border: `1px solid ${foc ? AMBER(0.45) : AMBER(0.12)}`,
    color: DIMWHITE(0.85),
    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem",
    outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box",
  }
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: "block", marginBottom: 6,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem",
        letterSpacing: "0.28em", color: AMBER(foc ? 0.7 : 0.35),
        textTransform: "uppercase", transition: "color 0.2s",
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
  const [hov, setHov] = useState(false)
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: disabled ? AMBER(0.4) : hov ? AMBER(1) : AMBER(0.85),
      color: BG, border: "none",
    },
    ghost: {
      background: "transparent",
      border: `1px solid ${AMBER(hov ? 0.4 : 0.2)}`,
      color: AMBER(hov ? 0.8 : 0.5),
    },
    danger: {
      background: hov ? "rgba(220,50,50,0.18)" : "transparent",
      border: `1px solid rgba(220,50,50,${hov ? 0.5 : 0.25})`,
      color: `rgba(220,100,80,${hov ? 1 : 0.7})`,
    },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem",
        letterSpacing: "0.18em", padding: "8px 18px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.18s",
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

  // ── original state ──
  const [title,   setTitle]   = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [announcements, setAnnouncements] = useState<any[]>([])

  // ── modal state ──
  const [deleteTarget,  setDeleteTarget]  = useState<any | null>(null)
  const [editTarget,    setEditTarget]    = useState<any | null>(null)
  const [editTitle,     setEditTitle]     = useState("")
  const [editMessage,   setEditMessage]   = useState("")
  const [editSaving,    setEditSaving]    = useState(false)
  const [successModal,  setSuccessModal]  = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // ── original fetch ──
  useEffect(() => { fetchAnnouncements() }, [])

  async function fetchAnnouncements() {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
    if (data) setAnnouncements(data)
  }

  // ── original create ──
  async function createAnnouncement() {
    setLoading(true)
    const { error } = await supabase
      .from("announcements")
      .insert([{ title, message }])
    setLoading(false)
    if (!error) {
      setTitle("")
      setMessage("")
      fetchAnnouncements()
      setSuccessModal(true)   // ← replaces alert()
    }
  }

  // ── original delete (confirm replaced by modal) ──
  async function deleteAnnouncement(id: string) {
    setDeleteLoading(true)
    await supabase
      .from("announcements")
      .update({ is_active: false })
      .eq("id", id)
    setDeleteLoading(false)
    setDeleteTarget(null)
    fetchAnnouncements()
  }

  // ── original edit (prompt replaced by modal) ──
  async function saveEdit() {
    if (!editTarget) return
    setEditSaving(true)
    await supabase
      .from("announcements")
      .update({ title: editTitle, message: editMessage })
      .eq("id", editTarget.id)
    setEditSaving(false)
    setEditTarget(null)
    fetchAnnouncements()
  }

  function openEdit(a: any) {
    setEditTarget(a)
    setEditTitle(a.title)
    setEditMessage(a.message)
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans+Condensed:wght@400;600;700&display=swap');
        @keyframes annshinmer { from{left:-40%} to{left:140%} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes modalRise { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        textarea { resize: vertical; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* ── CREATE PANEL ── */}
        <SectionLabel label="SYS · ANNOUNCEMENTS" />

        <div style={{ position: "relative", overflow: "hidden", background: PANEL, border: `1px solid ${BORDER}` }}>
          <ShimmerBar />
          <div style={{ padding: "22px 22px 24px" }}>
            <h1 style={{
              fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700,
              fontSize: "1.5rem", color: AMBER(0.9), marginBottom: 20, marginTop: 0,
            }}>
              Create Announcement
            </h1>

            <Field label="Title" value={title} onChange={setTitle} />
            <Field label="Message" value={message} onChange={setMessage} multiline rows={5} />

            <PostBtn onClick={createAnnouncement} loading={loading} />
          </div>
        </div>

        {/* ── ACTIVE RECORDS PANEL ── */}
        <div style={{ marginTop: 40 }}>
          <SectionLabel label="SYS · ACTIVE RECORDS" />

          <div style={{ position: "relative", background: PANEL, border: `1px solid ${BORDER}` }}>
            <div style={{ padding: "18px 22px" }}>

              {announcements.length === 0 && (
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: AMBER(0.3),
                }}>
                  NO ACTIVE ANNOUNCEMENTS
                </div>
              )}

              {announcements.map((a, i) => (
                <div
                  key={a.id}
                  style={{
                    padding: "16px 0",
                    borderBottom: i < announcements.length - 1 ? `1px solid ${AMBER(0.08)}` : "none",
                  }}
                >
                  <div style={{
                    fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 600,
                    color: AMBER(0.9), marginBottom: 4, fontSize: "1rem",
                  }}>
                    {a.title}
                  </div>

                  <div style={{
                    fontSize: "0.85rem", lineHeight: 1.6,
                    marginBottom: 12, color: DIMWHITE(0.65),
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>
                    {a.message}
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={() => openEdit(a)}
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem",
                        letterSpacing: "0.18em", background: "transparent",
                        border: `1px solid ${AMBER(0.3)}`, color: AMBER(0.8),
                        padding: "6px 10px", cursor: "pointer", transition: "all 0.18s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = AMBER(0.08)
                        e.currentTarget.style.borderColor = AMBER(0.6)
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.borderColor = AMBER(0.3)
                      }}
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => setDeleteTarget(a)}
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem",
                        letterSpacing: "0.18em", background: "transparent",
                        border: "1px solid rgba(220,50,50,0.25)", color: "rgba(220,100,80,0.7)",
                        padding: "6px 10px", cursor: "pointer", transition: "all 0.18s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(220,50,50,0.1)"
                        e.currentTarget.style.borderColor = "rgba(220,50,50,0.5)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.borderColor = "rgba(220,50,50,0.25)"
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MODAL — SUCCESS
      ══════════════════════════════════════ */}
      <Modal
        open={successModal}
        onClose={() => setSuccessModal(false)}
        title="Announcement Posted"
        actions={
          <DialogBtn onClick={() => setSuccessModal(false)} variant="primary">
            CLOSE
          </DialogBtn>
        }
      >
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem",
          color: DIMWHITE(0.6), lineHeight: 1.7, margin: 0,
        }}>
          Your announcement has been published and is now live.
        </p>
      </Modal>

      {/* ══════════════════════════════════════
          MODAL — CONFIRM DELETE
      ══════════════════════════════════════ */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Announcement"
        actions={
          <>
            <DialogBtn onClick={() => setDeleteTarget(null)} variant="ghost">
              CANCEL
            </DialogBtn>
            <DialogBtn
              onClick={() => deleteAnnouncement(deleteTarget.id)}
              variant="danger"
              disabled={deleteLoading}
            >
              {deleteLoading ? "DELETING..." : "CONFIRM DELETE"}
            </DialogBtn>
          </>
        }
      >
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem",
          color: DIMWHITE(0.5), lineHeight: 1.7, margin: "0 0 12px",
        }}>
          This will deactivate the following announcement:
        </p>
        {deleteTarget && (
          <div style={{
            padding: "10px 14px",
            background: "rgba(220,50,50,0.06)",
            border: "1px solid rgba(220,50,50,0.15)",
          }}>
            <div style={{
              fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 600,
              fontSize: "0.95rem", color: AMBER(0.75), marginBottom: 4,
            }}>
              {deleteTarget.title}
            </div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem",
              color: DIMWHITE(0.4), lineHeight: 1.5,
            }}>
              {deleteTarget.message}
            </div>
          </div>
        )}
      </Modal>

      {/* ══════════════════════════════════════
          MODAL — EDIT
      ══════════════════════════════════════ */}
      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Announcement"
        actions={
          <>
            <DialogBtn onClick={() => setEditTarget(null)} variant="ghost">
              CANCEL
            </DialogBtn>
            <DialogBtn
              onClick={saveEdit}
              variant="primary"
              disabled={editSaving || !editTitle || !editMessage}
            >
              {editSaving ? "SAVING..." : "SAVE CHANGES"}
            </DialogBtn>
          </>
        }
      >
        <Field label="Title" value={editTitle} onChange={setEditTitle} />
        <Field label="Message" value={editMessage} onChange={setEditMessage} multiline rows={5} />
      </Modal>

    </div>
  )
}