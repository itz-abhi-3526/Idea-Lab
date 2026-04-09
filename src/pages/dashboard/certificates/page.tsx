
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Download, FileText, Calendar } from "lucide-react"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "certs-fonts"
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
   TYPES — unchanged
───────────────────────────────────────── */
type Certificate = {
  id: string
  issued_at: string
  certificate_url: string
  event_title: string
}

/* ─────────────────────────────────────────
   CERTIFICATE CARD
───────────────────────────────────────── */
function CertCard({ cert, index }: { cert: Certificate; index: number }) {
  const [hov, setHov] = useState(false)
  const shortId = cert.id.slice(0, 8).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden flex flex-col"
      style={{
        background:     "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        border:         hov ? "1px solid rgba(249,115,22,0.35)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow:      hov
          ? "0 0 0 1px rgba(249,115,22,0.08), 0 20px 50px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        transition: "border 0.25s, box-shadow 0.25s",
      }}
    >
      {/* top shimmer */}
      {hov && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease }}
          style={{
            background:      "linear-gradient(90deg, transparent, rgba(249,115,22,0.7), transparent)",
            transformOrigin: "left",
          }}
        />
      )}

      {/* left accent stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] z-10"
        style={{
          background: hov
            ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.6), transparent)"
            : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)",
          transition: "background 0.25s",
        }}
      />

      {/* HUD corners */}
      <div className="absolute top-2.5 left-5 w-3 h-3 z-10" style={{ borderTop: `1px solid ${hov ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.1)"}`, borderLeft: `1px solid ${hov ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.1)"}`, transition: "border-color 0.25s" }} />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 z-10" style={{ borderTop: `1px solid ${hov ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.1)"}`, borderRight: `1px solid ${hov ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.1)"}`, transition: "border-color 0.25s" }} />

      {/* ── PREVIEW AREA ── */}
      <a
        href={cert.certificate_url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden"
        style={{ height: "160px" }}
      >
        {/* bg grid */}
        <div
          className="absolute inset-0"
          style={{
            background:      "rgba(0,0,0,0.4)",
            backgroundImage: "radial-gradient(circle, rgba(249,115,22,0.06) 1px, transparent 1px)",
            backgroundSize:  "18px 18px",
          }}
        />

        {/* certificate icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hov ? 1.1 : 1, opacity: hov ? 0.4 : 0.25 }}
            transition={{ duration: 0.3 }}
          >
            <FileText
              className="w-14 h-14"
              style={{ color: "rgba(249,115,22,0.8)" }}
            />
          </motion.div>
        </div>

        {/* scan line animation */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.4), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* hover download overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2"
            style={{
              background:  "rgb(249,115,22)",
              fontFamily:  "'Barlow Condensed', sans-serif",
              fontWeight:  700,
              fontSize:    "0.8rem",
              letterSpacing: "0.18em",
              color:       "#000",
            }}
          >
            <Download className="w-3.5 h-3.5" />
            DOWNLOAD
          </div>
        </motion.div>
      </a>

      {/* divider */}
      <div
        className="h-[1px] mx-5"
        style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.2), transparent)" }}
      />

      {/* ── INFO ── */}
      <div className="px-5 pl-6 py-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* id */}
          <span
            className="text-[9px] tracking-[0.28em]"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(249,115,22,0.45)" }}
          >
            CERT·{shortId}
          </span>

          {/* title */}
          <h3
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    700,
              fontSize:      "clamp(0.95rem, 2vw, 1.1rem)",
              letterSpacing: "-0.01em",
              color:         "#ffffff",
              lineHeight:    1.2,
            }}
          >
            {cert.event_title}
          </h3>
        </div>

        {/* issued date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 shrink-0" style={{ color: "rgba(249,115,22,0.5)" }} />
          <span
            style={{
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.68rem",
              letterSpacing: "0.08em",
              color:         "rgba(255,255,255,0.25)",
            }}
          >
            {new Date(cert.issued_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   PAGE — all supabase logic untouched
───────────────────────────────────────── */
export default function CertificatesDashboard() {
  useFonts()

  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading,      setLoading]      = useState(true)

  /* ── ALL ORIGINAL LOAD LOGIC — UNCHANGED ── */
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("event_certificates")
        .select(`
          id,
          issued_at,
          certificate_url,
          events (
            title
          )
        `)
        .eq("user_id", user.id)
        .order("issued_at", { ascending: false })

      const mapped: Certificate[] =
        data?.map((row: any) => ({
          id:              row.id,
          issued_at:       row.issued_at,
          certificate_url: row.certificate_url,
          event_title:     row.events?.title ?? "Event",
        })) ?? []

      setCertificates(mapped)
      setLoading(false)
    }

    load()
  }, [])

  /* ── LOADING ── */
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
              fontFamily:    "'Share Tech Mono', monospace",
              fontSize:      "0.7rem",
              letterSpacing: "0.25em",
              color:         "rgba(255,255,255,0.3)",
            }}
          >
            LOADING CERTIFICATES...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-[45rem] w-[45rem] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
      </div>

      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-10 space-y-10">

        {/* ── HEADER ── */}
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
              FISAT AICTE IDEA LAB · CREDENTIALS
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
            My{" "}
            <span style={{ color: "rgb(249,115,22)" }}>Certificates</span>
          </h1>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize:   "0.9rem",
              color:      "rgba(255,255,255,0.3)",
            }}
          >
            Certificates you've earned by participating in IDEA Lab events.
          </p>
        </motion.div>

        {/* ── EMPTY STATE ── */}
        {certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="relative overflow-hidden py-24 flex flex-col items-center gap-5"
            style={{
              background:     "rgba(255,255,255,0.02)",
              backdropFilter: "blur(12px)",
              border:         "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute top-3 left-3 w-3 h-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)" }} />
            <div className="absolute top-3 right-3 w-3 h-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }} />

            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FileText className="w-10 h-10" style={{ color: "rgba(249,115,22,0.4)" }} />
            </motion.div>

            <div className="flex flex-col items-center gap-1.5">
              <span
                style={{
                  fontFamily:    "'Share Tech Mono', monospace",
                  fontSize:      "0.72rem",
                  letterSpacing: "0.22em",
                  color:         "rgba(255,255,255,0.2)",
                }}
              >
                NO CERTIFICATES FOUND
              </span>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize:   "0.82rem",
                  color:      "rgba(255,255,255,0.2)",
                  textAlign:  "center",
                  maxWidth:   "280px",
                }}
              >
                Complete event feedback to unlock certificates.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── GRID ── */}
        {certificates.length > 0 && (
          <>
            {/* count row */}
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontFamily:    "'Share Tech Mono', monospace",
                  fontSize:      "0.68rem",
                  letterSpacing: "0.22em",
                  color:         "rgba(255,255,255,0.2)",
                }}
              >
                {certificates.length} CERTIFICATE{certificates.length !== 1 ? "S" : ""} ISSUED
              </span>
              <div className="flex-1 h-px bg-white/[0.04]" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {certificates.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} />
              ))}
            </motion.div>
          </>
        )}

      </section>
    </div>
  )
}
