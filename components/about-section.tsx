"use client"

import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion"
import { Compass, Hammer, CheckCircle, Sparkles } from "lucide-react"
import { useState, useRef, useEffect } from "react"

/* ─────────────────────────────────────────
   FONTS & DATA (LOCKED)
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "about-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id = id
    l.rel = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap"
    document.head.prepend(l)
  }, [])
}

const journeySteps = [
  { icon: Compass, title: "Explore", description: "Identify real-world problems and promising ideas through research and discovery.", glowColor: "249,115,22" },
  { icon: Hammer, title: "Build", description: "Design and prototype using IDEA Lab resources, tools, and cutting-edge technology.", glowColor: "245,158,11" },
  { icon: CheckCircle, title: "Validate", description: "Test, iterate, and refine solutions with expert mentorship and feedback.", glowColor: "234,88,12" },
  { icon: Sparkles, title: "Impact", description: "Create solutions that generate real-world value and make a difference.", glowColor: "239,68,68" },
]

/* ─────────────────────────────────────────
   ANTIGRAVITY FIELD (LOCKED)
───────────────────────────────────────── */
function AntiGravityField({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current; const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext("2d")!
    const initParticles = () => {
      canvas.width = section.offsetWidth; canvas.height = section.offsetHeight
      particlesRef.current = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.8 + 0.5, density: (Math.random() * 20) + 10,
      }))
    }
    initParticles()
    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = canvas.width + 10; if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10; if (p.y > canvas.height + 10) p.y = -10
        let dx = mouse.current.x - p.x; let dy = mouse.current.y - p.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 180) {
          let force = (180 - distance) / 180
          p.x -= (dx / distance) * force * p.density * 0.6; p.y -= (dy / distance) * force * p.density * 0.6
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)"; ctx.fill()
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j]; let dx2 = p.x - p2.x; let dy2 = p.y - p2.y; let dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          if (dist2 < 130) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - dist2/800})`; ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke()
          }
        }
      }
      requestAnimationFrame(animate)
    }
    window.addEventListener("mousemove", onMouseMove); window.addEventListener("resize", initParticles)
    animate()
    return () => { window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("resize", initParticles) }
  }, [sectionRef])
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-70" />
}

/* ─────────────────────────────────────────
   JOURNEY STEP COMPONENT (PINPOINT SCROLL)
───────────────────────────────────────── */
function JourneyStep({ step, index, scrollYProgress }: { step: typeof journeySteps[0], index: number, scrollYProgress: MotionValue<number> }) {
  const [hovered, setHovered] = useState(false)
  const [isCurrentlyActive, setIsCurrentlyActive] = useState(false)
  
  // Create a precise range for each step
  // Total steps = 4. 1/4 = 0.25. 
  // We want the box to open when the line is roughly in the middle of each step's segment.
  const start = index * 0.25
  const end = (index + 1) * 0.25
  const center = (start + end) / 2
  
  // Buffer: Box opens 10% before center and closes 10% after center
  const rangeStart = center - 0.1
  const rangeEnd = center + 0.1

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Trigger: Only open if scroll progress is within this specific step's "active zone"
      setIsCurrentlyActive(latest >= rangeStart && latest <= rangeEnd)
    })
  }, [scrollYProgress, rangeStart, rangeEnd])

  const Icon = step.icon
  const isEven = index % 2 === 0
  const showState = isCurrentlyActive || hovered

  return (
    <div className="relative w-full flex justify-center items-center mb-24 last:mb-0">
      {/* CENTRAL DOT PIN */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
        <m.div 
          animate={{ 
            scale: showState ? 1.8 : 1,
            backgroundColor: showState ? `rgb(${step.glowColor})` : 'rgba(255,255,255,0.2)',
            boxShadow: showState ? `0 0 30px rgb(${step.glowColor})` : '0 0 0px transparent'
          }}
          className="w-3 h-3 rounded-full border border-black transition-all duration-500"
        />
      </div>

      <div className={`w-full flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
        <m.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full md:w-[42%] group relative"
        >
          <div className={`p-6 rounded-2xl border transition-all duration-700 
              ${showState ? 'bg-neutral-900 border-white/20 shadow-2xl' : 'bg-neutral-900/40 border-white/5'} backdrop-blur-xl`}>
            
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-white/5 transition-colors duration-500" 
                   style={{ color: showState ? `rgb(${step.glowColor})` : '#666' }}>
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-bold text-white font-['Syne'] uppercase tracking-tight">
                  {step.title}
              </h3>
            </div>

            <AnimatePresence>
              {showState && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-neutral-400 font-['Outfit'] text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                    {step.description}
                  </p>
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
   MAIN SECTION (LOCKED)
───────────────────────────────────────── */
export function AboutSection() {
  useFonts()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  })

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} id="about" className="relative w-full py-32 bg-black overflow-hidden">
        <AntiGravityField sectionRef={sectionRef} />

        <div className="relative z-10 w-full px-6 max-w-5xl mx-auto">
          {/* HEADER (LOCKED) */}
          <div className="flex flex-col items-center text-center mb-32">
            <m.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/50" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-500/70 font-medium font-['Outfit']">Our Innovation Space</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/50" />
            </m.div>

            <m.h2 
              className="text-white font-[800] tracking-tighter" 
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              About IDEA Lab
            </m.h2>
            
            <p className="text-neutral-500 mt-6 max-w-xl mx-auto font-['Outfit'] font-light text-lg">
              The FISAT AICTE IDEA Lab is a dedicated innovation space where students transform ideas into impactful solutions through hands-on experimentation, mentorship, and collaboration.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            {/* STRAIGHT LINE (LOCKED) */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px hidden md:block">
              <svg width="2" height="100%" className="overflow-visible">
                <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="8 8" />
                <m.line
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke="rgb(249,115,22)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
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