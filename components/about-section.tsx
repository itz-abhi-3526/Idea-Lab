"use client"

import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion"
import { Compass, Hammer, CheckCircle, Sparkles, LucideIcon } from "lucide-react"
import { useState, useRef, useEffect } from "react"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "about-fonts"
    if (typeof document === 'undefined' || document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id
    l.rel = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap"
    document.head.prepend(l)
  }, [])
}

interface Step {
  icon: LucideIcon
  title: string
  description: string
  glowColor: string
  num: string
}

const journeySteps: Step[] = [
  {
    icon: Compass,
    title: "Explore",
    description: "Identify real-world problems and promising ideas through research and discovery.",
    glowColor: "249,115,22",
    num: "01",
  },
  {
    icon: Hammer,
    title: "Build",
    description: "Design and prototype using IDEA Lab resources, tools, and cutting-edge technology.",
    glowColor: "245,158,11",
    num: "02",
  },
  {
    icon: CheckCircle,
    title: "Validate",
    description: "Test, iterate, and refine solutions with expert mentorship and feedback.",
    glowColor: "234,88,12",
    num: "03",
  },
  {
    icon: Sparkles,
    title: "Impact",
    description: "Create solutions that generate real-world value and make a difference.",
    glowColor: "239,68,68",
    num: "04",
  },
]

const bgCSS = `
@keyframes drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }
@keyframes gridScroll { from { background-position: 0 0; } to { background-position: 40px 40px; } }
`

/* ─────────────────────────────────────────
   JOURNEY STEP
───────────────────────────────────────── */
interface JourneyStepProps {
  step: Step
  index: number
  scrollYProgress: MotionValue<number>
}

function JourneyStep({ step, index, scrollYProgress }: JourneyStepProps) {
  const [hovered, setHovered] = useState(false)
  
  // Hooks must be at the top level
  const start = index * 0.2
  const end = (index + 1) * 0.2
  
  // We apply this scale to the card to make the hook "active" and used
  const activeScale = useTransform(scrollYProgress, [start, end, end + 0.1], [0.95, 1, 0.95])

  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <div className="relative w-full flex justify-center items-center mb-12 md:mb-20 last:mb-0">
      <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
        <m.div
          style={{ 
            width: 10, height: 10, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: hovered ? `rgb(${step.glowColor})` : "rgba(255,255,255,0.15)",
            scale: hovered ? 1.5 : 1
          }}
        />
      </div>

      <div className={`w-full flex ${isEven ? "md:justify-start" : "md:justify-end"}`}>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full md:w-[46%]"
          style={{ scale: activeScale }} // hook is now utilized
        >
          <div
            style={{
              background: "rgba(15,15,15,0.7)",
              borderColor: hovered ? `rgba(${step.glowColor},0.4)` : "rgba(255,255,255,0.08)",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 20,
              padding: "1.5rem",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "all 0.3s ease",
              boxShadow: hovered ? `0 10px 30px rgba(${step.glowColor},0.1)` : "none"
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div style={{ padding: "0.6rem", borderRadius: 12, background: `rgba(${step.glowColor}, 0.1)`, color: `rgb(${step.glowColor})` }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#fff" }}>{step.title}</h3>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: `rgba(${step.glowColor}, 0.5)` }}>{step.num}</span>
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{step.description}</p>
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
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 30 })

  return (
    <LazyMotion features={domAnimation}>
      <style>{bgCSS}</style>

      <section
        ref={sectionRef}
        id="about"
        style={{ position: "relative", width: "100%", padding: "6rem 0", background: "#000", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          
          {/* ── Header Correction ── */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.6rem", letterSpacing: "0.4em", color: "#f97316", textTransform: "uppercase" }}>Innovation Excellence</span>
            
            {/* Corrected font-size clamp to prevent wrapping */}
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 8vw, 2.8rem)", color: "#fff", marginTop: "1rem" }}>About IDEA Lab</h2>
            
            <div style={{ width: 60, height: 4, background: "#f97316", margin: "1.5rem auto", borderRadius: 2 }} />
            <p style={{ fontFamily: "'Outfit'", fontWeight: 300, fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto" }}>
              A dedicated innovation space where students transform ideas into impactful solutions through experimentation and mentorship.
            </p>
          </m.div>

          <div style={{ position: "relative" }}>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] hidden md:block">
              <svg width="2" height="100%" style={{ overflow: "visible" }}>
                <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(255,255,255,0.1)" strokeDasharray="8 8" />
                <m.line x1="1" y1="0" x2="1" y2="100%" stroke="#f97316" strokeDasharray="8 8" style={{ pathLength }} />
              </svg>
            </div>

            {journeySteps.map((step, i) => (
              <JourneyStep key={i} step={step} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}

export default AboutSection