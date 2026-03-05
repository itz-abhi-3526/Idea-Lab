"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import LogoutButton from "@/components/auth/LogoutButton"
import ProfilePhotoUpload from "@/components/profile/ProfilePhotoUpload"

/* ─────────────────────────────────────────
   FONTS — same as rest of site
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "dashboard-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   GREETING
───────────────────────────────────────── */
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Morning"
  if (hour < 18) return "Afternoon"
  return "Evening"
}

/* ─────────────────────────────────────────
   MOTION CONFIG
───────────────────────────────────────── */
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

/* ─────────────────────────────────────────
   CARD DATA
───────────────────────────────────────── */
const CARDS = [
  {
    id: "C-01",
    title: "My Ideas",
    description: "View and track your submitted ideas.",
    href: "/dashboard/my-ideas",
  },
  {
    id: "C-02",
    title: "Inventory Requests",
    description: "Request and monitor lab equipment.",
    href: "/dashboard/my-requests",
  },
  {
    id: "C-03",
    title: "Incubation Requests",
    description: "Track 3D printing & laser printing requests.",
    href: "/dashboard/incubation-requests",
  },
  {
    id: "C-04",
    title: "My Events",
    description: "View your registered events.",
    href: "/dashboard/events",
  },
  {
    id: "C-05",
    title: "My Certificates",
    description: "View your certificates.",
    href: "/dashboard/certificates",
  },
  {
    id: "C-06",
    title: "Account Settings",
    description: "Manage your profile and security.",
    href: "/dashboard/account",
  },
]

/* ─────────────────────────────────────────
   DASHBOARD CARD
───────────────────────────────────────── */
function DashboardCard({
  id, title, description, href, index,
}: {
  id: string
  title: string
  description: string
  href: string
  index: number
}) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden"
      style={{
        background:     "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        border:         hov
          ? "1px solid rgba(249,115,22,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hov
          ? "0 0 0 1px rgba(249,115,22,0.1), 0 20px 50px rgba(0,0,0,0.4), 0 0 40px rgba(249,115,22,0.06)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        transition: "border 0.25s, box-shadow 0.25s",
      }}
    >
      {/* top shimmer on hover */}
      {hov && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(249,115,22,0.7), transparent)",
            transformOrigin: "left",
          }}
        />
      )}

      {/* left accent stripe */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        animate={{
          background: hov
            ? "linear-gradient(to bottom, transparent, rgba(249,115,22,0.7), transparent)"
            : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
        }}
        transition={{ duration: 0.25 }}
      />

      {/* corner bracket — top right */}
      <div
        className="absolute top-3 right-3 w-3 h-3"
        style={{
          borderTop:   `1px solid ${hov ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.12)"}`,
          borderRight: `1px solid ${hov ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.12)"}`,
          transition: "border-color 0.25s",
        }}
      />

      <div className="p-6 pl-7">
        {/* id badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-[9px] tracking-[0.28em]"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color: hov ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.2)",
              transition: "color 0.25s",
            }}
          >
            {id}
          </span>
          <motion.div
            className="w-1 h-1 rounded-full"
            animate={{ background: hov ? "rgb(249,115,22)" : "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.25 }}
          />
        </div>

        {/* title */}
        <h3
          className="mb-2"
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontWeight:    700,
            fontSize:      "clamp(1.1rem, 2vw, 1.35rem)",
            letterSpacing: "-0.01em",
            color:         "#ffffff",
            lineHeight:    1.1,
          }}
        >
          {title}
        </h3>

        {/* description */}
        <p
          className="mb-5 leading-relaxed"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize:   "0.85rem",
            color:      "rgba(255,255,255,0.38)",
          }}
        >
          {description}
        </p>

        {/* open link */}
        <a
          href={href}
          className="inline-flex items-center gap-1.5 group/link"
          style={{
            fontFamily:    "'Share Tech Mono', monospace",
            fontSize:      "0.7rem",
            letterSpacing: "0.22em",
            color:         hov ? "rgb(249,115,22)" : "rgba(255,255,255,0.35)",
            transition:    "color 0.2s",
            textDecoration: "none",
          }}
        >
          OPEN
          <motion.span
            animate={{ x: hov ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </a>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   DASHBOARD PAGE — all DB logic untouched
───────────────────────────────────────── */
export default function DashboardPage() {
  useFonts()

  const [userId, setUserId] = useState("")
  const [name,   setName]   = useState("there")
  const [email,  setEmail]  = useState("")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [role,   setRole]   = useState<"admin" | "member">("member")

  /* ── ALL ORIGINAL DB LOGIC — UNCHANGED ── */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        window.location.href = "/login"
        return
      }

      const user = data.user
      setUserId(user.id)

      setName(
        user.user_metadata?.display_name ||
          user.email?.split("@")[0] ||
          "there"
      )

      setEmail(user.email ?? "")
      setRole(user.user_metadata?.role === "admin" ? "admin" : "member")

      const { data: profile } = await supabase
        .from("users")
        .select("avatar_url")
        .eq("id", user.id)
        .single()

      setAvatar(profile?.avatar_url ?? null)
    }

    loadUser()
  }, [])

  return (
    <div
      className="relative min-h-screen px-4 py-8 sm:px-6 md:px-12 overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/[0.03] blur-3xl" />
        {/* scanlines */}
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
          }}
        />
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-10">

        {/* ══════════════════════════════
            HEADER
        ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-start justify-between gap-4"
        >
          <div className="space-y-1">
            {/* eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-orange-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span
                className="text-[9px] tracking-[0.32em] uppercase text-orange-500/60"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
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
              Good {getGreeting()},{" "}
              <span style={{ color: "rgb(249,115,22)" }}>
                {name}
              </span>
            </h1>

            <p
              className="pt-1"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize:   "0.9rem",
                color:      "rgba(255,255,255,0.35)",
              }}
            >
              Here's what's happening in the IDEA Lab today.
            </p>
          </div>

          {/* logout */}
          <div
            className="shrink-0 px-4 py-2 border border-white/8"
            style={{
              background:    "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
            }}
          >
            <LogoutButton />
          </div>
        </motion.div>

        {/* ══════════════════════════════
            PROFILE SECTION
        ══════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          {/* section label */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[9px] tracking-[0.32em] uppercase text-orange-500/50"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              USER PROFILE
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
          </div>

          <div
            className="relative overflow-hidden p-6"
            style={{
              background:     "rgba(255,255,255,0.025)",
              backdropFilter: "blur(20px)",
              border:         "1px solid rgba(255,255,255,0.07)",
              boxShadow:      "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)",
              }}
            />

            {/* HUD corners */}
            <div
              className="absolute top-3 left-3 w-3 h-3"
              style={{
                borderTop:  "1px solid rgba(249,115,22,0.35)",
                borderLeft: "1px solid rgba(249,115,22,0.35)",
              }}
            />
            <div
              className="absolute top-3 right-3 w-3 h-3"
              style={{
                borderTop:   "1px solid rgba(249,115,22,0.35)",
                borderRight: "1px solid rgba(249,115,22,0.35)",
              }}
            />

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

              {/* Avatar */}
              <div
                className="relative h-20 w-20 rounded-none overflow-hidden shrink-0"
                style={{
                  border:     "1px solid rgba(249,115,22,0.3)",
                  boxShadow:  "0 0 20px rgba(249,115,22,0.1)",
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="h-full w-full flex items-center justify-center"
                    style={{ background: "rgba(249,115,22,0.08)" }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize:   "1.8rem",
                        color:      "rgba(249,115,22,0.7)",
                      }}
                    >
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {/* scan line over avatar */}
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-orange-500/30 pointer-events-none"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Profile info */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <h3
                    style={{
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      fontWeight:    700,
                      fontSize:      "clamp(1.3rem, 3vw, 1.8rem)",
                      letterSpacing: "-0.01em",
                      color:         "#ffffff",
                      lineHeight:    1,
                    }}
                  >
                    {name}
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize:   "0.72rem",
                      color:      "rgba(255,255,255,0.3)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {email}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                  {role === "admin" && (
                    <span
                      className="px-3 py-1 text-[9px] tracking-[0.22em] uppercase"
                      style={{
                        fontFamily:  "'Share Tech Mono', monospace",
                        background:  "rgba(249,115,22,0.1)",
                        border:      "1px solid rgba(249,115,22,0.35)",
                        color:       "rgba(249,115,22,0.85)",
                      }}
                    >
                      ADMIN
                    </span>
                  )}
                  <span
                    className="px-3 py-1 text-[9px] tracking-[0.22em] uppercase"
                    style={{
                      fontFamily:  "'Share Tech Mono', monospace",
                      background:  "rgba(255,255,255,0.04)",
                      border:      "1px solid rgba(255,255,255,0.1)",
                      color:       "rgba(255,255,255,0.35)",
                    }}
                  >
                    MEMBER
                  </span>
                </div>

                {/* Change photo — original component, unchanged */}
                {userId && (
                  <ProfilePhotoUpload
                    userId={userId}
                    onUploaded={setAvatar}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════
            ACTION CARDS
        ══════════════════════════════ */}
        <section>
          {/* section label */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[9px] tracking-[0.32em] uppercase text-orange-500/50"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              QUICK ACCESS
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CARDS.map((card, i) => (
              <DashboardCard
                key={card.id}
                {...card}
                index={i}
              />
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  )
}