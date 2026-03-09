"use client"

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"

function useFonts() {
  useEffect(() => {
    const id = "machinery-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap"
    document.head.prepend(l)
  }, [])
}

const MACHINES = [
  {
    id: "M-001",
    name: "Bambu Lab X1 Carbon",
    tag: "FDM 3D PRINTER",
    headline: "Dual automated bed leveling for doubly guaranteed prints.",
    image: "https://portal.bblmw.com/x1/ai_dual.png",
    description:
      "Bambu Lab X1 utilizes two sets of independent sensors and an algorithm to measure the height of the nozzle relative to the bed. The lidar and analog force sensors crosscheck for an extra layer of redundancy in bed leveling.",
    specs: ["300 mm/s", "256×256×256mm", "0.05mm precision"],
    features: [
      {
        name: "CoreXY Motion",
        description:
          "Industrial-speed movement exceeding 300mm/s with sub-200-micron accuracy across complex geometries.",
      },
      {
        name: "Multi-Material Support",
        description:
          "Engineering-grade polymers and fiber-reinforced composites with closed-loop filament monitoring.",
      },
    ],
  },
  {
    id: "M-002",
    name: "Creality K1 Max",
    tag: "LARGE FORMAT FDM",
    headline: "Expanded workspace for large-scale production components.",
    image:
      "https://res.cloudinary.com/dudp2imxs/image/upload/v1768479850/k1-chassis_t6epbg.png",
    description:
      "The Creality K1 Max extends additive manufacturing with an exceptional 420x420x500mm build volume, enabling single-run production of large structural components and complete assemblies without segmentation.",
    specs: ["600 mm/s", "420x420x500mm", "0.1mm precision"],
    features: [
      {
        name: "Extended Build Volume",
        description:
          "420x420x500mm workspace for architectural models and large mechanical prototypes in one piece.",
      },
      {
        name: "Heated Chamber",
        description:
          "Superior layer adhesion and minimal warping for large-scale fabrication with open material ecosystem.",
      },
    ],
  },
  {
    id: "M-003",
    name: "Elegoo Saturn 4 Ultra",
    tag: "MSLA RESIN PRINTER",
    headline: "16K monochrome resolution with unmatched surface quality.",
    image:
      "https://res.cloudinary.com/dudp2imxs/image/upload/v1768479850/404_tm2qvy.jpg",
    description:
      "The Elegoo Saturn 4 introduces monochrome 4K resolution with 16K pixel density, delivering unprecedented surface finish quality and micro-detail preservation for optical and mechanical precision.",
    specs: ["16K pixels", "218x122x220mm", "0.019mm XY"],
    features: [
      {
        name: "16K Resolution",
        description:
          "Sub-50-micron feature definition with advanced exposure algorithms and dynamic LED array technology.",
      },
      {
        name: "High-Speed Curing",
        description:
          "Consistent exposure across the entire build platform, eliminating artifacts while maintaining precision.",
      },
    ],
  },
  {
    id: "M-004",
    name: "Laser Cutting System",
    tag: "CO2 LASER FABRICATOR",
    headline: "Precision cutting and engraving across unlimited materials.",
    image:
      "https://cdn.canadianmetalworking.com/a/maximizing-laser-cutting-performance-1699648217.jpg?size=1000x",
    description:
      "Our laser fabrication system delivers precision cutting and engraving across acrylic, wood, leather, and anodized metals. Direct CAD-to-cut workflow eliminates tooling overhead, reducing iteration time from days to hours.",
    specs: ["+-0.1mm accuracy", "900x600mm bed", "80W CO2"],
    features: [
      {
        name: "Material Versatility",
        description:
          "CO2 and fiber laser configurations optimized for acrylic, wood, leather, metals, and specialty materials.",
      },
      {
        name: "CAD Integration",
        description:
          "Direct workflow from design software eliminates tooling overhead with clean cuts and minimal thermal distortion.",
      },
    ],
  },
  {
    id: "M-005",
    name: "Sublimation Printer",
    tag: "DYE SUBLIMATION",
    headline: "Photographic-quality color transfer with permanent results.",
    image:
      "https://abhishekid.com/cdn/shop/files/219-Mug-Printing-Machine-Sublimation-Mug-Machine-With-Meter-Coil-11-oz_7c28ab3d-73b3-4bdd-b32e-ae5d17f70520.png?v=1729015248&width=1920",
    description:
      "The sublimation printing system enables permanent, photographic-quality color transfer onto polyester, ceramic, and coated substrates. Sublimation creates fade-resistant prints integrated into the material structure itself.",
    specs: ["2400x1200 DPI", "Full-color", "180-220 C"],
    features: [
      {
        name: "Full-Color Gradients",
        description:
          "Photo-realistic imaging with dynamic temperature and pressure optimization for material-specific results.",
      },
      {
        name: "Rapid Turnaround",
        description:
          "Perfect for merchandise prototyping, branded samples, and custom applications requiring professional finish.",
      },
    ],
  },
  {
    id: "M-006",
    name: "Precision Plotter",
    tag: "VINYL CUTTER",
    headline: "Vinyl and flex-material cutting with 0.25mm accuracy.",
    image:
      "https://img.directindustry.com/images_di/photo-mg/168629-11072005.jpg",
    description:
      "The precision plotter combines cutting accuracy within 0.25mm with real-time contour following. Supports 12-60 inch material widths for everything from precise labels to large-format applications.",
    specs: ["+-0.25mm", "12-60 inch width", "Servo motor"],
    features: [
      {
        name: "Servo Motor Control",
        description:
          "Optical registration ensures flawless reproduction of vector designs for decals and architectural graphics.",
      },
      {
        name: "Wide Format Range",
        description:
          "12-60 inch material widths enable multi-layer assemblies without manual intervention or segmentation.",
      },
    ],
  },
  {
    id: "M-007",
    name: "PCB Milling Machine",
    tag: "CIRCUIT FABRICATION",
    headline: "Direct mechanical circuit fabrication without chemical processes.",
    image:
      "https://www.elepcb.com/wp-content/uploads/2024/06/PCB-Milling-e1718613681541.jpeg",
    description:
      "The PCB milling system eliminates chemical etching, enabling direct mechanical drilling and routing. Achieves 0.1mm trace spacing with sub-100-micron positional accuracy for rapid circuit prototyping.",
    specs: ["0.1mm traces", "+-0.05mm accuracy", "Chemical-free"],
    features: [
      {
        name: "Chemical-Free Process",
        description:
          "Eliminates hazardous processes while reducing fabrication time from weeks to days with direct mechanical routing.",
      },
      {
        name: "Multi-Layer Support",
        description:
          "Via drilling, trace routing, and edge profiling in a single setup for complete custom circuit fabrication.",
      },
    ],
  },
  {
    id: "M-008",
    name: "Kavone KNC 2513",
    tag: "CNC ROUTER",
    headline: "3-axis subtractive precision across wood, acrylic, foam, and non-ferrous metals.",
    image:
      "https://5.imimg.com/data5/NA/YN/MY-6935283/atc-cnc-router-model-knl3015.jpg",
    description:
      "The Kavone KNC 2513 is a heavy-duty 3-axis CNC router with a 2500x1300mm working bed and a 3.5 kW water-cooled spindle. Helical rack-and-pinion drive on X and Y axes paired with ballscrew-driven Z delivers consistent 0.1mm repeatability across full-sheet runs — acrylic, MDF, PVC foam, granite, bakelite, and aluminium composites. DSP digital control with USB offline capability keeps production uninterrupted.",
    specs: ["2500x1300x300mm", "3.5 kW spindle", "+-0.1mm repeatability"],
    features: [
      {
        name: "Helical Rail Drive",
        description:
          "X and Y axes run on precision helical rack-and-pinion rails; Z axis uses ballscrew transmission — minimising backlash for clean, repeatable cuts across full-sheet stock.",
      },
      {
        name: "Broad Material Range",
        description:
          "Cuts, engraves, and 3D-carves acrylic, MDF, PVC foam, wood, granite, bakelite, and aluminium composites in a single setup — from signage panels to furniture components.",
      },
    ],
  },
]

function Grain() {
  return (
    <>
      <style>{`
        @keyframes grain {
          0%,100%{transform:translate(0,0)}   10%{transform:translate(-2%,-3%)}
          20%{transform:translate(1%,2%)}     30%{transform:translate(-3%,1%)}
          40%{transform:translate(2%,-1%)}    50%{transform:translate(-1%,3%)}
          60%{transform:translate(3%,-2%)}    70%{transform:translate(-2%,1%)}
          80%{transform:translate(1%,-3%)}    90%{transform:translate(-1%,2%)}
        }
        .mach-grain { animation: grain .65s steps(1) infinite; will-change: transform; }
      `}</style>
      <div
        aria-hidden
        className="mach-grain fixed inset-0 z-[9990] pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  )
}

function Scanlines() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9989] pointer-events-none opacity-[0.012]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
        willChange: "auto",
      }}
    />
  )
}

function MachineCursor() {
  const px  = useMotionValue(-200)
  const py  = useMotionValue(-200)
  const rx  = useSpring(px, { stiffness: 90, damping: 22 })
  const ry  = useSpring(py, { stiffness: 90, damping: 22 })
  const [big,  setBig]  = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return
    setShow(true)
    const mv = (e: MouseEvent) => { px.set(e.clientX); py.set(e.clientY) }
    const ov = (e: MouseEvent) => { if ((e.target as Element)?.closest("a,button,img")) setBig(true)  }
    const ou = (e: MouseEvent) => { if ((e.target as Element)?.closest("a,button,img")) setBig(false) }
    window.addEventListener("mousemove", mv, { passive: true })
    document.addEventListener("mouseover",  ov)
    document.addEventListener("mouseout",   ou)
    return () => {
      window.removeEventListener("mousemove", mv)
      document.removeEventListener("mouseover",  ov)
      document.removeEventListener("mouseout",   ou)
    }
  }, [px, py])

  if (!show) return null
  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{ x: px, y: py, translateX: "-50%", translateY: "-50%",
          width: big ? 48 : 8, height: big ? 48 : 8,
          transition: "width .2s, height .2s" }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-orange-500/40"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%",
          width: big ? 72 : 32, height: big ? 72 : 32,
          transition: "width .25s, height .25s" }}
      />
    </>
  )
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.94])
  const titleY  = useTransform(scrollYProgress, [0, 0.6], [0, 100])

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px]"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, -80, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-3xl"
          style={{ willChange: "transform" }}
        />
      </div>

      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <style>{`
          @keyframes linesIn {
            from { transform: scaleY(0); }
            to   { transform: scaleY(1); }
          }
          .hero-vline {
            position: absolute; top: 0; bottom: 0; width: 1px;
            background: rgba(255,255,255,0.04);
            transform-origin: top;
            animation: linesIn 1.6s cubic-bezier(0.16,1,0.3,1) both;
          }
        `}</style>
        {[15, 30, 50, 70, 85].map((pct) => (
          <div key={pct} className="hero-vline" style={{ left: `${pct}%`, animationDelay: `${pct / 100}s` }} />
        ))}
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <motion.div style={{ y: titleY }} className="space-y-4 sm:space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap"
          >
            <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.9, delay: 0.4 }} className="h-px bg-orange-500/60 hidden sm:block" />
            <span className="text-orange-500/80 text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.35em] uppercase font-medium text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Precision Manufacturing Ecosystem
            </span>
            <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.9, delay: 0.4 }} className="h-px bg-orange-500/60 hidden sm:block" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(3rem, 12vw, 9rem)", lineHeight: 0.9, letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              THE LAB&apos;S<br />
              <span style={{ color: "hsl(var(--accent))", WebkitTextStroke: "0px" }}>ARSENAL</span>
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.72 }} className="space-y-4 sm:space-y-5">
            <p className="text-white/40 max-w-lg mx-auto leading-relaxed px-2" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "clamp(0.82rem, 2.5vw, 1.05rem)" }}>
              From additive manufacturing to laser precision every machine in the lab is purpose-built to collapse the gap between idea and reality. Scroll through each to explore what it does.
            </p>
            <motion.div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}>
              {MACHINES.map((m, i) => (
                <motion.span key={m.id} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 1.05 + i * 0.07 }} className="px-2.5 py-1 rounded-sm border border-white/8 text-white/28 text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "rgba(255,255,255,0.025)" }}>
                  {m.tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex flex-col items-center gap-2 pt-4 sm:pt-6">
            <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-5 h-9 rounded-full border border-white/15 flex items-center justify-center" style={{ willChange: "transform" }}>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-[3px] h-[6px] rounded-full bg-orange-500" style={{ willChange: "transform" }} />
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  )
}

function useIsTouch() {
  const [touch, setTouch] = useState(false)
  useEffect(() => { setTouch(window.matchMedia("(pointer:coarse)").matches) }, [])
  return touch
}

function MachineSection({ machine, index, setActive }: { machine: (typeof MACHINES)[0]; index: number; setActive: (i: number) => void }) {
  const ref     = useRef<HTMLDivElement>(null)
  const isEven  = index % 2 === 0
  const isTouch = useIsTouch()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgScale       = useTransform(scrollYProgress, [0, 1], [0.92, 1.06])
  const imgYRaw        = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imgScaleSpring = useSpring(imgScale, { stiffness: 100, damping: 28 })
  const imgYSpring     = useSpring(imgYRaw,  { stiffness: 100, damping: 28 })

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => { if (v > 0.28 && v < 0.72) setActive(index) })
    return () => unsub()
  }, [scrollYProgress, index, setActive])

  return (
    <section ref={ref} className="relative min-h-screen py-16 sm:py-20 lg:py-32 flex items-center">
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: index % 2 === 0 ? "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(249,115,22,0.04), transparent)" : "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(249,115,22,0.04), transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-8 sm:mb-10 flex flex-col gap-2 ${isEven ? "" : "sm:items-end"}`}
        >
          <div className={`flex items-center gap-2 sm:gap-3 flex-wrap ${isEven ? "" : "sm:flex-row-reverse"}`}>
            <div className="px-2.5 py-1 border border-orange-500/30 rounded-sm text-orange-500/60 text-[10px] tracking-[0.3em]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{machine.id}</div>
            <div className="w-px h-3.5 bg-white/12" />
            <span className="text-white/18" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.22em" }}>{String(index + 1).padStart(2, "0")}</span>
            <div className="w-px h-3.5 bg-white/12" />
            <span className="text-orange-500/50 text-[10px] tracking-[0.28em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{machine.tag}</span>
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 4.8rem)", lineHeight: 0.9, letterSpacing: "-0.02em", color: "#ffffff" }}>{machine.name}</h2>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>

          <motion.div className={`space-y-6 sm:space-y-8 ${isEven ? "" : "lg:col-start-2"}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-white/55 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "clamp(0.95rem, 2vw, 1.2rem)" }}>{machine.headline}</p>
            <div className="flex flex-wrap gap-2">
              {machine.specs.map((spec, i) => (
                <span key={i} className="px-3 py-1 rounded-sm border border-orange-500/20 text-orange-400/70 text-[11px] sm:text-xs tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace", background: "rgba(249,115,22,0.05)" }}>{spec}</span>
              ))}
            </div>
            <p className="text-white/40 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "clamp(0.83rem, 1.6vw, 1rem)" }}>{machine.description}</p>
            <div className="space-y-3 pt-1">
              {machine.features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: isEven ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} whileHover={isTouch ? undefined : { x: isEven ? 6 : -6 }} className="relative group rounded-xl border border-white/8 p-3.5 sm:p-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h4 className="relative z-10 text-orange-400/80 mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "clamp(0.88rem, 1.6vw, 1.05rem)", letterSpacing: "0.04em" }}>{f.name}</h4>
                  <p className="relative z-10 text-white/40 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.85rem" }}>{f.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div style={isTouch ? {} : { scale: imgScaleSpring, y: imgYSpring }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8 }} className={`relative h-[280px] sm:h-[380px] lg:h-[520px] ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}>
            <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 lg:opacity-30" style={{ background: "radial-gradient(ellipse at center, rgba(249,115,22,0.25), transparent 70%)" }} />
            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10" style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
              <motion.img src={machine.image} alt={machine.name} className="w-full h-full object-cover" whileHover={isTouch ? undefined : { scale: 1.04 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} loading={index === 0 ? "eager" : "lazy"} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute top-4 left-4 text-orange-500/50 text-[9px] tracking-[0.25em]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{machine.id} / ACTIVE</div>
              <div className="absolute bottom-4 right-4 text-white/30 text-[9px] tracking-[0.2em]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>FISAT · IDEA LAB</div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-orange-500/40" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-orange-500/40" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-orange-500/40" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-orange-500/40" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9988]" style={{ scaleX, background: "linear-gradient(90deg, hsl(var(--accent)), #f97316)", willChange: "transform" }} />
}

function NavDots({ active }: { active: number }) {
  return (
    <div className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 items-center">
      {MACHINES.map((m, i) => (
        <motion.div key={i} title={m.name} className="relative flex items-center gap-2 group">
          <AnimatePresence>
            {active === i && (
              <motion.span key="label" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="absolute right-6 text-[10px] tracking-[0.18em] uppercase text-white/50 whitespace-nowrap" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{m.id}</motion.span>
            )}
          </AnimatePresence>
          <motion.div animate={{ width: active === i ? 20 : 4, height: 4, backgroundColor: active === i ? "hsl(var(--accent))" : "rgba(255,255,255,0.2)", boxShadow: active === i ? "0 0 10px hsl(var(--accent))" : "none" }} transition={{ type: "spring", stiffness: 300, damping: 26 }} className="rounded-full" />
        </motion.div>
      ))}
    </div>
  )
}

function LabFooter() {
  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center border-t border-white/6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-orange-500/[0.07] blur-[120px]" />
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="space-y-4 sm:space-y-6">
          <span className="text-orange-500/60 text-xs tracking-[0.35em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>End of arsenal</span>
          <div className="overflow-hidden">
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 8vw, 6.5rem)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "#ffffff" }}>
              The Future of<br /><span style={{ color: "hsl(var(--accent))" }}>Fabrication</span>
            </h3>
          </div>
          <p className="text-white/35 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "clamp(0.88rem, 2vw, 1.1rem)" }}>
            Our integrated ecosystem empowers creators, engineers, and manufacturers to bring complex ideas to life with precision, speed, and scale. Every machine works seamlessly together a unified fabrication experience.
          </p>
          <p className="text-white/20" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em" }}>FISAT AICTE IDEA LAB · ANGAMALY · KERALA</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [lineIdx,  setLineIdx]  = useState(0)
  const [exiting,  setExiting]  = useState(false)

  const BOOT_LINES = [
    "INITIALIZING FABRICATION SYSTEMS...",
    "LOADING M-001 · BAMBU LAB X1 CARBON",
    "LOADING M-002 · CREALITY K1 MAX",
    "LOADING M-003 · ELEGOO SATURN 4 ULTRA",
    "LOADING M-004 · LASER CUTTING SYSTEM",
    "LOADING M-005 · SUBLIMATION PRINTER",
    "LOADING M-006 · PRECISION PLOTTER",
    "LOADING M-007 · PCB MILLING MACHINE",
    "LOADING M-008 · KAVONE KNC 2513 CNC ROUTER",
    "ALL SYSTEMS NOMINAL — READY",
  ]

  useEffect(() => {
    let val = 0
    const step = () => {
      const inc = val < 30 ? 3 : val < 70 ? 1.2 : val < 90 ? 0.8 : 2.5
      val = Math.min(100, val + inc)
      setProgress(Math.floor(val))
      if (val < 100) {
        setTimeout(step, val < 30 ? 18 : val < 70 ? 28 : val < 90 ? 40 : 14)
      } else {
        setTimeout(() => setExiting(true), 380)
        setTimeout(onDone, 1100)
      }
    }
    setTimeout(step, 200)
  }, [onDone])

  useEffect(() => {
    const idx = Math.floor((progress / 100) * (BOOT_LINES.length - 1))
    setLineIdx(Math.min(idx, BOOT_LINES.length - 1))
  }, [progress])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div key="loader" className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden" style={{ background: "hsl(var(--background))" }} exit={{ opacity: 1 }}>
          <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.018]" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)" }} />
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.07), transparent)" }} />

          {[20, 40, 60, 80].map(pct => (
            <motion.div key={pct} className="absolute top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none" style={{ left: `${pct}%` }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: pct / 200 }} />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 sm:px-8 w-full max-w-lg">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col items-center gap-2 text-center">
              <span className="text-orange-500/60 text-[9px] tracking-[0.45em] uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>FISAT AICTE</span>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem, 10vw, 5rem)", lineHeight: 0.9, letterSpacing: "-0.02em", color: "#ffffff" }}>IDEA LAB</h1>
              <span className="text-white/20 text-[9px] tracking-[0.35em] uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>MACHINERY SYSTEMS</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="w-full">
              <div className="relative w-full h-[2px] bg-white/8 rounded-full overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, hsl(var(--accent)), #fb923c)", transition: "width 0.06s linear" }} />
                {progress > 5 && progress < 99 && (
                  <motion.div className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" animate={{ x: ["-100%", "900%"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                )}
              </div>
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-white/25 text-[9px] tracking-[0.22em]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>SYS.BOOT</span>
                <span className="tabular-nums" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: progress === 100 ? "hsl(var(--accent))" : "rgba(255,255,255,0.55)", transition: "color 0.3s", letterSpacing: "0.04em" }}>{String(progress).padStart(3, "0")}%</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="w-full h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p key={lineIdx} initial={{ y: "110%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-110%", opacity: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className={`text-[10px] tracking-[0.18em] ${lineIdx === BOOT_LINES.length - 1 ? "text-orange-400/80" : "text-white/30"}`} style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  {BOOT_LINES[lineIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex gap-2 sm:gap-3 flex-wrap justify-center">
              {MACHINES.map((m, i) => (
                <motion.span key={m.id} animate={{ color: progress >= ((i + 1) / MACHINES.length) * 100 ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.12)", borderColor: progress >= ((i + 1) / MACHINES.length) * 100 ? "rgba(249,115,22,0.35)" : "rgba(255,255,255,0.07)" }} transition={{ duration: 0.3 }} className="px-2 py-0.5 border rounded-sm text-[9px] tracking-[0.22em]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  {m.id}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {exiting && (
            <>
              <motion.div className="absolute inset-0 pointer-events-none" style={{ background: "hsl(var(--background))", zIndex: 10, transformOrigin: "top" }} initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }} />
              <motion.div className="absolute inset-0 pointer-events-none" style={{ background: "hsl(var(--background))", zIndex: 10, transformOrigin: "bottom" }} initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 }} />
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function MachineryPage() {
  useFonts()
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const onDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <LoadingScreen onDone={onDone} />}
      <main
        className="bg-background text-foreground overflow-x-hidden"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease 0.1s", pointerEvents: loaded ? "auto" : "none" }}
      >
        <MachineCursor />
        <Grain />
        <Scanlines />
        <ScrollProgress />
        <NavDots active={active} />
        <HeroSection />
        {MACHINES.map((m, i) => (
          <MachineSection key={m.name} machine={m} index={i} setActive={setActive} />
        ))}
        <LabFooter />
      </main>
    </>
  )
}