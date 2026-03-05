"use client"

import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion"
import { Compass, Hammer, CheckCircle, Sparkles } from "lucide-react"
import { useState, useRef, useEffect } from "react"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "about-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id
    l.rel = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const journeySteps = [
  {
    icon: Compass,
    title: "Explore",
    description:
      "Identify real-world problems and promising ideas through research and discovery.",
    glowColor: "249,115,22",
    accent: "#f97316",
    num: "01",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Design and prototype using IDEA Lab resources, tools, and cutting-edge technology.",
    glowColor: "245,158,11",
    accent: "#f59e0b",
    num: "02",
  },
  {
    icon: CheckCircle,
    title: "Validate",
    description:
      "Test, iterate, and refine solutions with expert mentorship and feedback.",
    glowColor: "234,88,12",
    accent: "#ea580c",
    num: "03",
  },
  {
    icon: Sparkles,
    title: "Impact",
    description:
      "Create solutions that generate real-world value and make a difference.",
    glowColor: "239,68,68",
    accent: "#ef4444",
    num: "04",
  },
]

/* ─────────────────────────────────────────
   CSS BACKGROUND — zero JS, zero lag
───────────────────────────────────────── */
const bgCSS = `
@keyframes drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.1); } }
@keyframes drift2 { 0%,100% { transform: translate(0,0) scale(1.05); } 50% { transform: translate(-30px,40px) scale(0.95); } }
@keyframes drift3 { 0%,100% { transform: translate(0,0) scale(0.9); } 50% { transform: translate(20px,20px) scale(1.15); } }
@keyframes gridScroll { from { background-position: 0 0; } to { background-position: 40px 40px; } }
@keyframes fadeSlideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes pulsePin { 0%,100%{ box-shadow: 0 0 0 0 rgba(249,115,22,0); } 50%{ box-shadow: 0 0 0 8px rgba(249,115,22,0); } }
`

/* ─────────────────────────────────────────
   JOURNEY STEP
───────────────────────────────────────── */
function JourneyStep({ step, index, scrollYProgress }) {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const start = index * 0.25
  const end = (index + 1) * 0.25
  const center = (start + end) / 2

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(v >= center - 0.1 && v <= center + 0.1)
    })
  }, [scrollYProgress, center])

  const Icon = step.icon
  const isEven = index % 2 === 0
  const show = active || hovered

  return (
    <div className="relative w-full flex justify-center items-center mb-20 last:mb-0">
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
        <m.div
          animate={{
            scale: show ? 2 : 1,
            backgroundColor: show ? `rgb(${step.glowColor})` : "rgba(255,255,255,0.15)",
            boxShadow: show
              ? `0 0 24px 4px rgba(${step.glowColor},0.5)`
              : "0 0 0px transparent",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ width: 10, height: 10, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)" }}
        />
      </div>

      {/* Card */}
      <div className={`w-full flex ${isEven ? "md:justify-start" : "md:justify-end"}`}>
        <m.div
          initial={{ opacity: 0, x: isEven ? -32 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full md:w-[44%]"
        >
          <div
            style={{
              background: show
                ? "rgba(20,20,20,0.95)"
                : "rgba(12,12,12,0.6)",
              borderColor: show
                ? `rgba(${step.glowColor},0.35)`
                : "rgba(255,255,255,0.06)",
              boxShadow: show
                ? `0 8px 40px rgba(${step.glowColor},0.12), inset 0 0 0 1px rgba(${step.glowColor},0.1)`
                : "none",
              transition: "all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 16,
              padding: "1.5rem",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Step number + icon row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    padding: "0.5rem",
                    borderRadius: 10,
                    background: show
                      ? `rgba(${step.glowColor},0.15)`
                      : "rgba(255,255,255,0.05)",
                    color: show ? `rgb(${step.glowColor})` : "#555",
                    transition: "all 0.4s ease",
                  }}
                >
                  <Icon size={18} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {step.title}
                </h3>
              </div>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  color: show ? `rgb(${step.glowColor})` : "rgba(255,255,255,0.2)",
                  transition: "color 0.4s ease",
                }}
              >
                {step.num}
              </span>
            </div>

            {/* Expandable description */}
            <AnimatePresence>
              {show && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "circOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      marginTop: "0.875rem",
                      paddingTop: "0.875rem",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: "rgba(200,200,200,0.75)",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export function AboutSection() {
  useFonts()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  })

  return (
    <LazyMotion features={domAnimation}>
      <style>{bgCSS}</style>

      <section
        ref={sectionRef}
        id="about"
        style={{ position: "relative", width: "100%", padding: "8rem 0", background: "#000", overflow: "hidden" }}
      >
        {/* ── CSS ATMOSPHERE LAYER (no JS, no lag) ── */}
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "gridScroll 12s linear infinite",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {/* Ambient blobs — GPU composited, no repaints */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 70%)",
            animation: "drift1 18s ease-in-out infinite",
            willChange: "transform",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "5%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)",
            animation: "drift2 22s ease-in-out infinite",
            willChange: "transform",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)",
            animation: "drift3 26s ease-in-out infinite",
            willChange: "transform",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── CONTENT ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "6rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ height: 1, width: 32, background: "linear-gradient(to right, transparent, rgba(249,115,22,0.5))" }} />
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(249,115,22,0.7)",
                  fontWeight: 500,
                }}
              >
                Our Innovation Space
              </span>
              <div style={{ height: 1, width: 32, background: "linear-gradient(to left, transparent, rgba(249,115,22,0.5))" }} />
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#fff",
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                lineHeight: 1.05,
              }}
            >
              About IDEA Lab
            </h2>

            {/* Decorative underline */}
            <div
              style={{
                marginTop: "1rem",
                width: 56,
                height: 3,
                borderRadius: 99,
                background: "linear-gradient(90deg, #f97316, #ef4444)",
              }}
            />

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(160,160,160,0.9)",
                maxWidth: 560,
                marginTop: "1.5rem",
              }}
            >
              The FISAT AICTE IDEA Lab is a dedicated innovation space where students transform
              ideas into impactful solutions through hands-on experimentation, mentorship, and
              collaboration.
            </p>
          </m.div>

          {/* Journey timeline */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 1,
                display: "none",
              }}
              className="md:!block"
            >
              <svg
                width="2"
                height="100%"
                style={{ overflow: "visible", display: "block" }}
              >
                <line
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
                <m.line
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke="rgb(249,115,22)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  style={{ pathLength }}
                />
              </svg>
            </div>

            {journeySteps.map((step, i) => (
              <JourneyStep
                key={i}
                step={step}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}

export default AboutSection