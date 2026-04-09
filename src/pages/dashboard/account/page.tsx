
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "account-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap"
    document.head.prepend(l)
  }, [])
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ─────────────────────────────────────────
   CYBER FIELD — no border shorthand conflict
───────────────────────────────────────── */
interface FieldProps {
  label: string
  type?: string
  value: string
  onChange?: (v: string) => void
  disabled?: boolean
  placeholder?: string
}

function CyberField({ label, type = "text", value, onChange, disabled = false, placeholder }: FieldProps) {
  const [focused, setFocused] = useState(false)

  const borderColor = disabled
    ? "rgba(255,255,255,0.05)"
    : focused
    ? "rgba(249,115,22,0.35)"
    : "rgba(255,255,255,0.08)"

  return (
    <div className="flex flex-col gap-1.5">
      {/* label row */}
      <div className="flex items-center gap-2">
        <span
          className="text-[9px] tracking-[0.28em] uppercase"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: disabled
              ? "rgba(255,255,255,0.18)"
              : focused
              ? "rgba(249,115,22,0.6)"
              : "rgba(249,115,22,0.4)",
            transition: "color 0.25s",
          }}
        >
          {label}
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background: focused && !disabled
              ? "linear-gradient(to right, rgba(249,115,22,0.4), transparent)"
              : "linear-gradient(to right, rgba(255,255,255,0.05), transparent)",
            transition: "background 0.3s",
          }}
        />
        {!disabled && (
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              color: focused ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.12)",
              transition: "color 0.25s",
            }}
          >
            {focused ? "█" : "░"}
          </span>
        )}
        {disabled && (
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.15)",
            }}
          >
            LOCKED
          </span>
        )}
      </div>

      {/* input wrapper */}
      <div className="relative">
        {/* left neon line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background: disabled
              ? "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)"
              : focused
              ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.85), transparent)"
              : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)",
            boxShadow: focused && !disabled ? "0 0 8px rgba(249,115,22,0.35)" : "none",
            transition: "background 0.25s, box-shadow 0.25s",
          }}
        />

        <input
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => !disabled && setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-4 pr-3 py-3 text-sm outline-none"
          style={{
            background:   disabled ? "rgba(255,255,255,0.02)" : focused ? "rgba(249,115,22,0.04)" : "rgba(0,0,0,0.4)",
            borderTop:    `1px solid ${borderColor}`,
            borderRight:  `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
            borderLeft:   "none",
            borderRadius: 0,
            fontFamily:   "'Barlow', sans-serif",
            fontWeight:   300,
            fontSize:     "0.875rem",
            letterSpacing: "0.02em",
            color:        disabled ? "rgba(255,255,255,0.25)" : "#ffffff",
            cursor:       disabled ? "not-allowed" : "text",
            transition:   "background 0.25s",
          }}
        />

        {/* blinking cursor */}
        {focused && !disabled && (
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 w-[1px] h-[14px] bg-orange-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        )}

        {/* bottom scan line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          animate={{
            width: focused && !disabled ? "100%" : "0%",
            background: "linear-gradient(to right, rgba(249,115,22,0.8), transparent)",
          }}
          transition={{ duration: 0.4, ease }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   CYBER BUTTON
───────────────────────────────────────── */
function CyberButton({
  onClick, disabled, loading, label, loadingLabel,
}: {
  onClick: () => void
  disabled: boolean
  loading: boolean
  label: string
  loadingLabel: string
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{   scale: disabled ? 1 : 0.985 }}
      className="relative overflow-hidden disabled:opacity-50"
      style={{
        background:    disabled ? "rgba(249,115,22,0.6)" : "rgb(249,115,22)",
        fontFamily:    "'Barlow Condensed', sans-serif",
        fontWeight:    700,
        fontSize:      "0.9rem",
        letterSpacing: "0.2em",
        color:         "#000000",
        border:        "none",
        padding:       "0.65rem 1.5rem",
        cursor:        disabled ? "not-allowed" : "pointer",
        boxShadow:     disabled ? "none" : "0 0 20px rgba(249,115,22,0.3)",
      }}
    >
      {/* shimmer */}
      {!loading && (
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}
      {/* loading scan */}
      {loading && (
        <motion.span
          aria-hidden
          className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span className="relative z-10">
        {loading ? loadingLabel : label}
      </span>
    </motion.button>
  )
}

/* ─────────────────────────────────────────
   PANEL WRAPPER
───────────────────────────────────────── */
function CyberPanel({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:     "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        border:         "1px solid rgba(255,255,255,0.07)",
        boxShadow:      "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* top accent shimmer */}
      <div className="relative h-[1px] w-full overflow-hidden" style={{ background: "rgba(249,115,22,0.12)" }}>
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.7), transparent)" }}
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      </div>

      {/* HUD corners */}
      <div className="absolute top-3 left-3 w-3 h-3" style={{ borderTop: "1px solid rgba(249,115,22,0.35)", borderLeft: "1px solid rgba(249,115,22,0.35)" }} />
      <div className="absolute top-3 right-3 w-3 h-3" style={{ borderTop: "1px solid rgba(249,115,22,0.35)", borderRight: "1px solid rgba(249,115,22,0.35)" }} />
      <div className="absolute bottom-3 left-3 w-3 h-3" style={{ borderBottom: "1px solid rgba(249,115,22,0.18)", borderLeft: "1px solid rgba(249,115,22,0.18)" }} />
      <div className="absolute bottom-3 right-3 w-3 h-3" style={{ borderBottom: "1px solid rgba(249,115,22,0.18)", borderRight: "1px solid rgba(249,115,22,0.18)" }} />

      <div className="p-6 space-y-5">
        {/* panel header */}
        <div className="flex items-center gap-3">
          <span
            className="text-[9px] tracking-[0.28em] uppercase"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.5)" }}
          >
            {id}
          </span>
          <div className="w-px h-3 bg-white/10" />
          <h2
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    700,
              fontSize:      "clamp(1.1rem, 2.5vw, 1.4rem)",
              letterSpacing: "-0.01em",
              color:         "#ffffff",
              lineHeight:    1,
            }}
          >
            {title}
          </h2>
        </div>

        {children}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   ACCOUNT PAGE — all supabase logic untouched
───────────────────────────────────────── */
export default function AccountPage() {
  useFonts()

  const [email,       setEmail]       = useState("")
  const [name,        setName]        = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [saving,      setSaving]      = useState(false)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState<string | null>(null)
  const [message,     setMessage]     = useState<string | null>(null)

  /* ── ALL ORIGINAL DB LOGIC — UNCHANGED ── */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        window.location.href = "/login"
        return
      }

      setEmail(data.user.email ?? "")
      setName((data.user.user_metadata?.display_name as string) ?? "")
      setLoading(false)
    }

    loadUser()
  }, [])

  const updateProfile = async () => {
    setSaving(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      data: { display_name: name },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Profile updated successfully")
    }

    setSaving(false)
  }

  const updatePassword = async () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setSaving(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  /* ── LOADING STATE ── */
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "hsl(var(--background))" }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-orange-500"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            LOADING PROFILE...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen px-4 sm:px-6 py-10 overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-[45rem] w-[45rem] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span
              className="text-[9px] tracking-[0.32em] uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.55)" }}
            >
              FISAT AICTE IDEA LAB · PORTAL
            </span>
          </div>

          <h1
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(2rem, 5vw, 3.5rem)",
              lineHeight:    0.92,
              letterSpacing: "-0.02em",
              color:         "#ffffff",
            }}
          >
            Account{" "}
            <span style={{ color: "rgb(249,115,22)" }}>Settings</span>
          </h1>
        </motion.div>

        {/* ── TWO PANELS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          {/* PROFILE PANEL */}
          <CyberPanel id="SYS.PROFILE" title="Profile">
            <CyberField
              label="Email"
              type="email"
              value={email}
              disabled
            />
            <CyberField
              label="Display Name"
              type="text"
              value={name}
              onChange={setName}
              placeholder="Your name"
            />
            <CyberButton
              onClick={updateProfile}
              disabled={saving}
              loading={saving}
              label="SAVE PROFILE"
              loadingLabel="SAVING..."
            />
          </CyberPanel>

          {/* PASSWORD PANEL */}
          <CyberPanel id="SYS.SECURITY" title="Change Password">
            <CyberField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Min. 6 characters"
            />

            {/* warning note */}
            <div
              className="flex items-start gap-2 px-3 py-2.5"
              style={{
                background: "rgba(249,115,22,0.04)",
                border:     "1px solid rgba(249,115,22,0.12)",
              }}
            >
              <span
                className="shrink-0 text-[9px] tracking-[0.2em] mt-[1px]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.55)" }}
              >
                WARN
              </span>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize:   "0.78rem",
                  color:      "rgba(255,255,255,0.3)",
                  lineHeight: 1.5,
                }}
              >
                Updating your password will sign you out and redirect to login.
              </p>
            </div>

            <CyberButton
              onClick={updatePassword}
              disabled={saving}
              loading={saving}
              label="UPDATE PASSWORD"
              loadingLabel="UPDATING..."
            />
          </CyberPanel>
        </motion.div>

        {/* ── STATUS MESSAGES ── */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0,  height: "auto" }}
              exit={{ opacity: 0,    y: -4, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  background: "rgba(239,68,68,0.06)",
                  border:     "1px solid rgba(239,68,68,0.25)",
                }}
              >
                <span
                  className="text-[9px] tracking-[0.25em] shrink-0"
                  style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(239,68,68,0.7)" }}
                >
                  ERR
                </span>
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize:   "0.75rem",
                    color:      "rgba(239,68,68,0.8)",
                  }}
                >
                  {error}
                </p>
              </div>
            </motion.div>
          )}

          {message && (
            <motion.div
              key="msg"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0,  height: "auto" }}
              exit={{ opacity: 0,    y: -4, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  background: "rgba(34,197,94,0.06)",
                  border:     "1px solid rgba(34,197,94,0.22)",
                }}
              >
                <span
                  className="text-[9px] tracking-[0.25em] shrink-0"
                  style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(34,197,94,0.65)" }}
                >
                  OK
                </span>
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize:   "0.75rem",
                    color:      "rgba(34,197,94,0.75)",
                  }}
                >
                  {message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
