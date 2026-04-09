
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "login-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@300;400&family=Share+Tech+Mono&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   GLITCH TEXT
   Randomly corrupts characters on interval
───────────────────────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&"

function GlitchText({ text, className = "", style = {} }: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  const [display, setDisplay] = useState(text)
  const rafRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let iterations = 0
    const original = text.split("")

    const scramble = () => {
      setDisplay(
        original
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iterations) return original[i]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join("")
      )
      iterations += 0.5
      if (iterations < original.length) {
        rafRef.current = setTimeout(scramble, 30)
      } else {
        setDisplay(text)
        // re-trigger glitch every 4-6s
        rafRef.current = setTimeout(() => {
          iterations = 0
          scramble()
        }, 4000 + Math.random() * 2000)
      }
    }

    rafRef.current = setTimeout(scramble, 800)
    return () => { if (rafRef.current) clearTimeout(rafRef.current) }
  }, [text])

  return (
    <span className={className} style={style}>
      {display}
    </span>
  )
}

/* ─────────────────────────────────────────
   CYBER GRID BACKGROUND
   Perspective grid + floating particles + glitch slices
───────────────────────────────────────── */
function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    // floating data particles
    const particles = Array.from({ length: 55 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vy: -(Math.random() * 0.4 + 0.1), // float upward
      vx: (Math.random() - 0.5) * 0.15,
      r:  Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    let frame = 0

    const draw = () => {
      frame++
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // perspective grid lines (bottom to horizon)
      const horizon   = H * 0.52
      const gridLines = 10
      const speed     = (frame * 0.4) % (H / gridLines)

      ctx.strokeStyle = "rgba(249,115,22,0.07)"
      ctx.lineWidth   = 0.8

      // horizontal grid lines receding into horizon
      for (let i = 0; i <= gridLines; i++) {
        const y = horizon + (i / gridLines) * (H - horizon) + speed
        if (y > H) continue
        const progress = (y - horizon) / (H - horizon)
        ctx.globalAlpha = progress * 0.18
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // vertical grid lines converging to vanishing point
      const vp = { x: W / 2, y: horizon }
      for (let i = -8; i <= 8; i++) {
        const targetX = vp.x + i * (W / 14)
        ctx.globalAlpha = 0.08
        ctx.beginPath()
        ctx.moveTo(vp.x, horizon)
        ctx.lineTo(targetX, H)
        ctx.stroke()
      }

      ctx.globalAlpha = 1

      // connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.hypot(dx, dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(249,115,22,${0.055 * (1 - d / 110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${p.alpha})`
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

/* ─────────────────────────────────────────
   GLITCH SLICE OVERLAY
   Occasional horizontal slices that shift
───────────────────────────────────────── */
function GlitchSlices() {
  const [slices, setSlices] = useState<{ top: number; h: number; x: number; key: number }[]>([])

  useEffect(() => {
    const trigger = () => {
      const count = Math.floor(Math.random() * 3) + 1
      const newSlices = Array.from({ length: count }, (_, i) => ({
        top:  Math.random() * 90,
        h:    Math.random() * 2 + 1,
        x:    (Math.random() - 0.5) * 12,
        key:  Date.now() + i,
      }))
      setSlices(newSlices)
      setTimeout(() => setSlices([]), 120)
    }

    const iv = setInterval(trigger, 2800 + Math.random() * 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {slices.map(s => (
        <div
          key={s.key}
          className="absolute left-0 right-0 bg-orange-500/[0.06]"
          style={{
            top:    `${s.top}%`,
            height: `${s.h}px`,
            transform: `translateX(${s.x}px)`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   CYBER INPUT FIELD
───────────────────────────────────────── */
interface FieldProps {
  label: string
  type: string
  value: string
  placeholder: string
  onChange: (v: string) => void
  required?: boolean
}

function CyberField({ label, type, value, placeholder, onChange, required }: FieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      {/* label row */}
      <div className="flex items-center gap-2">
        <span
          className="text-orange-500/50 text-[9px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          {label}
        </span>
        <motion.div
          className="flex-1 h-px"
          animate={{
            background: focused
              ? "linear-gradient(to right, rgba(249,115,22,0.5), transparent)"
              : "linear-gradient(to right, rgba(255,255,255,0.06), transparent)",
          }}
          transition={{ duration: 0.3 }}
        />
        {/* corner bracket */}
        <span
          className="text-orange-500/30 text-[10px]"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          {focused ? "█" : "░"}
        </span>
      </div>

      {/* input wrapper */}
      <div className="relative">
        {/* left neon border */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          animate={{
            background: focused
              ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.9), transparent)"
              : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)",
            boxShadow: focused ? "0 0 8px rgba(249,115,22,0.4)" : "none",
          }}
          transition={{ duration: 0.25 }}
        />

        <input
          type={type}
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full pl-4 pr-3 py-3 text-sm text-white placeholder-white/15 outline-none rounded-none"
          style={{
            background:    focused ? "rgba(249,115,22,0.04)" : "rgba(0,0,0,0.35)",
            borderTop:     focused ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(255,255,255,0.06)",
            borderRight:   focused ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(255,255,255,0.06)",
            borderBottom:  focused ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(255,255,255,0.06)",
            borderLeft:    "none",
            fontFamily:    "'Barlow', sans-serif",
            fontWeight:    300,
            letterSpacing: "0.02em",
            transition:    "background 0.25s",
          }}
        />

        {/* typing cursor line when focused */}
        {focused && (
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 w-[1px] h-[14px] bg-orange-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        )}

        {/* bottom scan line on focus */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          animate={{
            width:      focused ? "100%" : "0%",
            background: "linear-gradient(to right, rgba(249,115,22,0.8), transparent)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────── */
export default function LoginPage() {
  useFonts()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    navigate("/", { replace: true })
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* animated bg canvas */}
      <CyberBackground />
      {/* glitch slice overlay */}
      <GlitchSlices />

      {/* scanlines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
        }}
      />

      {/* ── CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md"
        style={{ zIndex: 10 }}
      >
        {/* outer neon glow */}
        <motion.div
          className="absolute -inset-3 rounded-none pointer-events-none"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(ellipse at center, rgba(249,115,22,0.18), transparent 70%)",
            filter: "blur(16px)",
          }}
        />

        {/* card */}
        <div
          className="relative"
          style={{
            background:     "rgba(0,0,0,0.7)",
            backdropFilter: "blur(28px)",
            border:         "1px solid rgba(249,115,22,0.18)",
            boxShadow:
              "0 0 0 1px rgba(249,115,22,0.06), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* top accent bar with animated shimmer */}
          <div className="relative h-[2px] w-full overflow-hidden" style={{ background: "rgba(249,115,22,0.15)" }}>
            <motion.div
              className="absolute inset-y-0 w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.9), transparent)" }}
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
            />
          </div>

          {/* corner HUD decorations */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-orange-500/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-orange-500/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-orange-500/20" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-orange-500/20" />

          <div className="px-7 sm:px-9 pt-9 pb-9 space-y-8">

            {/* ── HEADING ── */}
            <div className="space-y-3">
              {/* system badge */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1,  x: 0   }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <div
                  className="px-2 py-0.5 border border-orange-500/35 text-orange-500/65 text-[9px] tracking-[0.3em]"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  SYS.AUTH
                </div>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-orange-500"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span
                  className="text-orange-500/40 text-[9px] tracking-[0.2em]"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  FISAT AICTE IDEA LAB
                </span>
              </motion.div>

              {/* glitch heading */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1,  y: 0  }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlitchText
                  text="WELCOME BACK"
                  style={{
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontWeight:    900,
                    fontSize:      "clamp(2.2rem, 6vw, 3.4rem)",
                    lineHeight:    0.92,
                    letterSpacing: "-0.02em",
                    color:         "#ffffff",
                    display:       "block",
                  }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-white/30"
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em" }}
              >
                AUTHENTICATE TO ACCESS PORTAL
              </motion.p>
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleLogin} className="space-y-5">

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1,  y: 0  }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CyberField
                  label="Email"
                  type="email"
                  value={email}
                  placeholder="you@fisat.ac.in"
                  onChange={setEmail}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1,  y: 0  }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <CyberField
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={setPassword}
                  required
                />
              </motion.div>

              {/* error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0,  height: "auto" }}
                    exit={{ opacity: 0,    y: -4, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-2 border border-red-500/25"
                      style={{ background: "rgba(239,68,68,0.06)" }}
                    >
                      <span
                        className="text-red-400/70 text-[9px] tracking-[0.25em] shrink-0"
                        style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      >
                        ERR
                      </span>
                      <span
                        className="text-red-400/80 text-xs"
                        style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      >
                        {error}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* submit button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1,  y: 0  }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.015 }}
                  whileTap={{  scale: loading ? 1 : 0.985 }}
                  className="relative w-full py-3 overflow-hidden disabled:opacity-50"
                  style={{
                    background:    loading ? "rgba(249,115,22,0.7)" : "rgb(249,115,22)",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontWeight:    700,
                    fontSize:      "1rem",
                    letterSpacing: "0.2em",
                    color:         "#000000",
                    border:        "none",
                    cursor:        loading ? "not-allowed" : "pointer",
                    boxShadow:     loading ? "none" : "0 0 24px rgba(249,115,22,0.35)",
                  }}
                >
                  {/* shimmer sweep */}
                  {!loading && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.55 }}
                    />
                  )}

                  {/* loading scan line */}
                  {loading && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-10%", "110%"] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <span className="relative z-10">
                    {loading ? "AUTHENTICATING..." : "SIGN  IN"}
                  </span>
                </motion.button>
              </motion.div>
            </form>

            {/* ── FOOTER ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="flex-1 h-px bg-white/8" />
              <p
                className="text-white/50 text-xs text-center whitespace-nowrap"
                style={{ fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.08em" }}
              >
                NO ACCOUNT?{" "}
                <a
                  href="/signup"
                  className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors duration-200"
                >
                  CREATE ONE
                </a>
              </p>
              <div className="flex-1 h-px bg-white/8" />
            </motion.div>

          </div>

          {/* bottom accent bar */}
          <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)" }} />
        </div>
      </motion.div>
    </div>
  )
}
