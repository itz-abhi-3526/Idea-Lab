"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useParams } from "next/navigation"
import {
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Upload,
} from "lucide-react"

/* -------------------- TYPES -------------------- */

type Event = {
  id: string
  title: string
  start_datetime: string
  venue: string | null
  registration_deadline: string
  is_paid: boolean
  price: number | null
  upi_qr_url: string | null
}

/* -------------------- FONTS -------------------- */

function useFonts() {
  useEffect(() => {
    const id = "reg-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id
    l.rel = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Azeret+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

/* -------------------- FIELD CONFIG -------------------- */

const FIELDS: { key: string; label: string; type?: string; span?: boolean }[] = [
  { key: "full_name",  label: "Full Name",   span: true },
  { key: "email",      label: "Email",        type: "email", span: true },
  { key: "phone",      label: "Phone",        type: "tel" },
  { key: "department", label: "Department" },
  { key: "year",       label: "Year" },
  { key: "section",    label: "Section" },
]

/* -------------------- GRAIN -------------------- */

function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none", opacity: 0.022,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat", backgroundSize: "128px 128px",
    }} />
  )
}

/* -------------------- SHIMMER BAR -------------------- */

function ShimmerBar() {
  return (
    <div style={{ height: 3, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, #b8860b 0%, #d4af37 35%, #f5d070 50%, #d4af37 65%, #b8860b 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
        animation: "shimmer 2.8s ease-in-out infinite",
      }} />
    </div>
  )
}

/* -------------------- INPUT FIELD -------------------- */

function Field({
  label, value, onChange, type = "text", span = false,
}: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; span?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0

  return (
    <div style={{ gridColumn: span ? "1 / -1" : undefined, position: "relative" }}>
      {/* floating label */}
      <label style={{
        position: "absolute", left: 16, zIndex: 2, pointerEvents: "none",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
        top: focused || filled ? 8 : "50%",
        transform: focused || filled ? "translateY(0)" : "translateY(-50%)",
        fontFamily: "'Azeret Mono', monospace",
        fontSize: focused || filled ? 9 : 12,
        letterSpacing: focused || filled ? "0.25em" : "0.1em",
        textTransform: "uppercase",
        color: focused ? "#d4af37" : filled ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.25)",
      }}>
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: 60,
          borderRadius: 12,
          background: focused ? "rgba(212,175,55,0.04)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`,
          padding: "24px 16px 8px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 14,
          color: "#fff",
          outline: "none",
          transition: "all 0.22s ease",
          boxShadow: focused ? "0 0 0 3px rgba(212,175,55,0.06)" : "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  )
}

/* -------------------- PAGE -------------------- */

export default function EventRegisterPage() {
  useFonts()

  const router = useRouter()
  const { eventId } = useParams<{ eventId: string }>()

  // ── original state ──
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    section: "",
    payment_ss_url: "",
  })

  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  // ── original load ──
  useEffect(() => {
    if (!eventId) return

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push(`/login?redirect=/events/${eventId}/register`)
        return
      }

      const { data: eventData } = await supabase
        .from("events")
        .select(`id, title, start_datetime, venue, registration_deadline, is_paid, price, upi_qr_url`)
        .eq("id", eventId)
        .maybeSingle()

      if (!eventData) {
        setError("Event not found")
        setLoading(false)
        return
      }

      const { data: existing } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (existing) setAlreadyRegistered(true)

      setEvent(eventData)
      setLoading(false)
    }

    load()
  }, [eventId, router])

  // ── original loading state ──
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#080808",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 36, height: 36, border: "1px solid rgba(212,175,55,0.25)",
            borderTopColor: "#d4af37", borderRadius: "50%",
            animation: "spin 0.9s linear infinite", margin: "0 auto 14px",
          }} />
          <span style={{
            fontFamily: "'Azeret Mono', monospace", fontSize: 10,
            letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
          }}>Loading…</span>
        </div>
      </div>
    )
  }

  // ── original error state ──
  if (error || !event) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#080808",
      }}>
        <span style={{
          fontFamily: "'Azeret Mono', monospace", fontSize: 10,
          letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
        }}>{error ?? "Something went wrong"}</span>
      </div>
    )
  }

  // ── original derived values ──
  const registrationClosed = new Date(event.registration_deadline) < new Date()

  // ── original upload ──
  const uploadPaymentSS = async (file: File) => {
    setUploading(true)
    setPreview(URL.createObjectURL(file))

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "idea_lab_profiles")
    data.append("folder", "idea-lab/payments")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    )
    const json = await res.json()
    setUploading(false)
    if (json.secure_url) setForm(f => ({ ...f, payment_ss_url: json.secure_url }))
  }

  // ── original validation ──
  const formValid =
    form.full_name &&
    form.email &&
    form.phone &&
    form.department &&
    form.year &&
    form.section &&
    (!event.is_paid || form.payment_ss_url)

  // ── original register ──
  const register = async () => {
    setSubmitting(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from("event_registrations").insert({
      event_id: event.id,
      user_id: user!.id,
      ...form,
    })
    setAlreadyRegistered(true)
    setSubmitting(false)
  }

  /* -------------------- UI -------------------- */

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%);  }
          100% { transform: translateX(100%);  }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        * { box-sizing: border-box; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #111 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 40px rgba(212,175,55,0.35) !important;
        }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .upload-zone:hover { background: rgba(212,175,55,0.05) !important; border-color: rgba(212,175,55,0.3) !important; }
      `}</style>

      <Grain />

      <section style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        position: "relative",
      }}>
        {/* ambient glow */}
        <div style={{
          position: "fixed", top: "30%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 400, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }} />

        <div style={{
          width: "100%", maxWidth: 560, position: "relative", zIndex: 1,
          animation: "riseIn 0.65s cubic-bezier(0.16,1,0.3,1) both",
        }}>

          {/* ── CARD ── */}
          <div style={{
            borderRadius: 28,
            overflow: "hidden",
            background: "linear-gradient(160deg, #141414 0%, #0d0d0d 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 60px 120px -30px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.04)",
            filter: "drop-shadow(0 0 1px rgba(212,175,55,0.08))",
          }}>
            <ShimmerBar />

            {/* ── EVENT INFO HEADER ── */}
            <div style={{ padding: "32px 36px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {/* eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ height: 1, width: 16, background: "#d4af37" }} />
                <span style={{
                  fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                  letterSpacing: "0.35em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase",
                }}>Event Registration</span>
              </div>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 16px",
              }}>
                {event.title}
              </h1>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Calendar size={12} color="#d4af37" />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                    fontSize: 13, color: "rgba(255,255,255,0.4)",
                  }}>
                    {new Date(event.start_datetime).toLocaleString()}
                  </span>
                </div>
                {event.venue && (
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <MapPin size={12} color="#d4af37" />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                      fontSize: 13, color: "rgba(255,255,255,0.4)",
                    }}>
                      {event.venue}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ── BODY ── */}
            <div style={{ padding: "32px 36px 36px" }}>

              {/* ── ALREADY REGISTERED ── */}
              {alreadyRegistered ? (
                <div style={{
                  borderRadius: 16, padding: "20px 24px",
                  background: "rgba(34,197,94,0.06)",
                  border: "1px solid rgba(34,197,94,0.18)",
                  display: "flex", alignItems: "flex-start", gap: 14,
                  animation: "fadeIn 0.4s ease both",
                }}>
                  <CheckCircle size={20} color="#4ade80" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                      fontSize: 17, color: "#4ade80", margin: "0 0 4px",
                    }}>You're registered.</p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                      fontSize: 13, color: "rgba(74,222,128,0.6)", margin: 0,
                    }}>Your spot has been confirmed for this event.</p>
                  </div>
                </div>

              ) : registrationClosed ? (
                /* ── CLOSED ── */
                <div style={{
                  borderRadius: 16, padding: "20px 24px",
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.18)",
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <XCircle size={20} color="#f87171" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                      fontSize: 17, color: "#f87171", margin: "0 0 4px",
                    }}>Registration closed.</p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                      fontSize: 13, color: "rgba(248,113,113,0.6)", margin: 0,
                    }}>The deadline for this event has passed.</p>
                  </div>
                </div>

              ) : (
                /* ── FORM ── */
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

                  {/* fields grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 24,
                  }}>
                    {FIELDS.map(({ key, label, type, span }) => (
                      <Field
                        key={key}
                        label={label}
                        type={type}
                        span={span}
                        value={(form as any)[key]}
                        onChange={v => setForm({ ...form, [key]: v })}
                      />
                    ))}
                  </div>

                  {/* ── PAYMENT SECTION ── */}
                  {event.is_paid && (
                    <div style={{
                      borderRadius: 18, overflow: "hidden",
                      border: "1px solid rgba(212,175,55,0.2)",
                      background: "rgba(212,175,55,0.04)",
                      marginBottom: 24,
                    }}>
                      {/* payment header */}
                      <div style={{
                        padding: "18px 24px",
                        borderBottom: "1px solid rgba(212,175,55,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}>
                        <div>
                          <div style={{
                            fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                            letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)",
                            textTransform: "uppercase", marginBottom: 4,
                          }}>Payment Required</div>
                          <div style={{
                            fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                            fontSize: 22, color: "#d4af37", letterSpacing: "-0.01em",
                          }}>₹{event.price}</div>
                        </div>
                        <div style={{
                          fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                          letterSpacing: "0.2em", color: "rgba(212,175,55,0.4)",
                          textTransform: "uppercase",
                        }}>via UPI</div>
                      </div>

                      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* QR code */}
                        {event.upi_qr_url && (
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{
                              padding: 12, background: "#fff",
                              borderRadius: 14, display: "inline-flex",
                              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                            }}>
                              <img
                                src={event.upi_qr_url}
                                alt="UPI QR"
                                style={{ width: 160, height: 160, display: "block" }}
                              />
                            </div>
                          </div>
                        )}

                        {/* upload zone */}
                        <label
                          className="upload-zone"
                          style={{
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center",
                            gap: 8, padding: "24px 16px",
                            border: "1px dashed rgba(212,175,55,0.2)",
                            borderRadius: 14, cursor: "pointer",
                            background: "transparent",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Upload size={18} color={uploading ? "#d4af37" : "rgba(212,175,55,0.5)"} />
                          <span style={{
                            fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                            letterSpacing: "0.25em", textTransform: "uppercase",
                            color: uploading ? "#d4af37" : "rgba(255,255,255,0.25)",
                          }}>
                            {uploading ? "Uploading…" : form.payment_ss_url ? "Screenshot uploaded ✓" : "Upload payment screenshot"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={e => e.target.files && uploadPaymentSS(e.target.files[0])}
                          />
                        </label>

                        {/* preview */}
                        {preview && (
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <img
                              src={preview}
                              style={{
                                maxHeight: 180, borderRadius: 12,
                                border: "1px solid rgba(212,175,55,0.15)",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* divider */}
                  <div style={{
                    height: 1, marginBottom: 20,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                  }} />

                  {/* submit */}
                  <button
                    onClick={register}
                    disabled={!formValid || submitting || uploading}
                    className="submit-btn"
                    style={{
                      width: "100%", height: 56, borderRadius: 14,
                      border: "none", cursor: "pointer",
                      background: "linear-gradient(135deg, #b8860b 0%, #d4af37 50%, #f5d070 100%)",
                      color: "#0a0800",
                      fontFamily: "'Azeret Mono', monospace",
                      fontSize: 11, fontWeight: 500, letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                      boxShadow: "0 6px 24px rgba(212,175,55,0.25)",
                    }}
                  >
                    {submitting ? "Registering…" : "Confirm Registration"}
                  </button>

                  <p style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                    letterSpacing: "0.15em", color: "rgba(255,255,255,0.15)",
                    textTransform: "uppercase", textAlign: "center", marginTop: 14,
                  }}>
                    Your registration will appear in your dashboard once confirmed.
                  </p>
                </div>
              )}
            </div>

            {/* ── FOOTER STRIP ── */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              padding: "14px 36px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center",
                overflow: "hidden", opacity: 0.04, pointerEvents: "none",
              }}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: 11,
                    letterSpacing: "0.4em", color: "#d4af37",
                    whiteSpace: "nowrap", paddingRight: 24,
                  }}>IDEA LAB · FISAT ·</span>
                ))}
              </div>
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.22em", color: "rgba(255,255,255,0.12)",
                textTransform: "uppercase", position: "relative", zIndex: 1,
              }}>FISAT IDEA Lab</span>
              <span style={{
                fontFamily: "'Azeret Mono', monospace", fontSize: 9,
                letterSpacing: "0.22em", color: "rgba(212,175,55,0.25)",
                textTransform: "uppercase", position: "relative", zIndex: 1,
              }}>Powered by IDEA Lab</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}