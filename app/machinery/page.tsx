"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/* ================================================= */
/* MACHINE DATA WITH FEATURES                        */
/* ================================================= */

const MACHINES = [
  {
    chapter: "Chapter 1",
    name: "Bambu Lab X1 Carbon",
    headline: "Dual automated bed leveling for doubly guaranteed prints.",
    image:
      "https://portal.bblmw.com/x1/ai_dual.png",
    description:
      "Bambu Lab X1 utilizes two sets of independent sensors and an algorithm to measure the height of the nozzle relative to the bed. The lidar and analog force sensors crosscheck for an extra layer of redundancy in bed leveling.",
    features: [
      {
        name: "CoreXY Motion",
        description:
          "Industrial-speed movement exceeding 300mm/s with sub-200-micron accuracy across complex geometries.",
      },
      {
        name: "Multi-Material Support",
        description: "Engineering-grade polymers and fiber-reinforced composites with closed-loop filament monitoring.",
      },
    ],
  },
  {
    chapter: "Chapter 2",
    name: "Creality K1 Max",
    headline: "Expanded workspace for large-scale production components.",
    image: "https://res.cloudinary.com/dudp2imxs/image/upload/v1768479850/k1-chassis_t6epbg.png",
    description:
      "The Creality K1 Max extends additive manufacturing with an exceptional 420×420×500mm build volume, enabling single-run production of large structural components and complete assemblies without segmentation.",
    features: [
      {
        name: "Extended Build Volume",
        description: "420×420×500mm workspace for architectural models and large mechanical prototypes in one piece.",
      },
      {
        name: "Heated Chamber",
        description:
          "Superior layer adhesion and minimal warping for large-scale fabrication with open material ecosystem.",
      },
    ],
  },
  {
    chapter: "Chapter 3",
    name: "Elegoo Saturn 4 Ultra 16K",
    headline: "Monochrome 4K resolution printing with unmatched surface quality.",
    image: "https://res.cloudinary.com/dudp2imxs/image/upload/v1768479850/404_tm2qvy.jpg",
    description:
      "The Elegoo Saturn 4 introduces monochrome 4K resolution with 16K pixel density, delivering unprecedented surface finish quality and micro-detail preservation for optical and mechanical precision.",
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
    chapter: "Chapter 4",
    name: "Laser Cutting System",
    headline: "Precision cutting and engraving across unlimited materials.",
    image:
      "https://cdn.canadianmetalworking.com/a/maximizing-laser-cutting-performance-1699648217.jpg?size=1000x",
    description:
      "Our laser fabrication system delivers precision cutting and engraving across acrylic, wood, leather, and anodized metals. Direct CAD-to-cut workflow eliminates tooling overhead, reducing iteration time from days to hours.",
    features: [
      {
        name: "Material Versatility",
        description:
          "CO₂ and fiber laser configurations optimized for acrylic, wood, leather, metals, and specialty materials.",
      },
      {
        name: "CAD Integration",
        description:
          "Direct workflow from design software eliminates tooling overhead with clean cuts and minimal thermal distortion.",
      },
    ],
  },
  {
    chapter: "Chapter 5",
    name: "Sublimation Printer",
    headline: "Photographic-quality color transfer with permanent results.",
    image: "https://abhishekid.com/cdn/shop/files/219-Mug-Printing-Machine-Sublimation-Mug-Machine-With-Meter-Coil-11-oz_7c28ab3d-73b3-4bdd-b32e-ae5d17f70520.png?v=1729015248&width=1920",
    description:
      "The sublimation printing system enables permanent, photographic-quality color transfer onto polyester, ceramic, and coated substrates. Sublimation creates fade-resistant prints integrated into the material structure itself.",
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
    chapter: "Chapter 6",
    name: "Precision Plotter",
    headline: "Vinyl and flex-material cutting with 0.25mm accuracy.",
    image: "https://img.directindustry.com/images_di/photo-mg/168629-11072005.jpg",
    description:
      "The precision plotter combines cutting accuracy within 0.25mm with real-time contour following. Supports 12-60 inch material widths for everything from precise labels to large-format applications.",
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
    chapter: "Chapter 7",
    name: "PCB Milling Machine",
    headline: "Direct mechanical circuit fabrication without chemical processes.",
    image: "https://www.elepcb.com/wp-content/uploads/2024/06/PCB-Milling-e1718613681541.jpeg",
    description:
      "The PCB milling system eliminates chemical etching, enabling direct mechanical drilling and routing. Achieves 0.1mm trace spacing with sub-100-micron positional accuracy for rapid circuit prototyping.",
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
]

/* ================================================= */
/* HERO SECTION                                      */
/* ================================================= */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      ref={ref}
      className="relative h-screen w-screen overflow-hidden bg-background flex items-center justify-center"
    >
      <motion.div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, -80, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          style={{ willChange: "transform" }}
        />
      </motion.div>

      <motion.div style={{ opacity, scale }} className="relative z-10 text-center max-w-4xl px-6 sm:px-8">
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "-2px" }}
            animate={{ opacity: 1, letterSpacing: "2px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-accent uppercase text-sm sm:text-base font-semibold tracking-widest"
          >
            Precision Manufacturing Ecosystem
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            Advanced Fabrication.
            <br />
            <span className="text-accent">Infinite</span> Possibilities.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Transform your vision into reality. Harness cutting-edge fabrication technology to prototype, iterate, and
            scale production with unprecedented precision and speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center pt-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-foreground/60 text-sm"
            >
              Scroll to explore →
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

/* ================================================= */
/* MACHINE SECTION WITH IMAGE AND FEATURES          */
/* ================================================= */

function MachineSection({
  machine,
  index,
  setActive,
}: {
  machine: (typeof MACHINES)[0]
  index: number
  setActive: (i: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      if (v > 0.3 && v < 0.7) {
        setActive(index)
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, index, setActive])

  return (
    <section ref={ref} className="relative min-h-screen py-24 lg:py-32">
      {/* Top Fade */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
        className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none z-20"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <p className="text-accent uppercase text-sm font-semibold tracking-wider mb-4">{machine.chapter}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{machine.name}</h2>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Text Content */}
          <motion.div style={{ opacity: textOpacity }} className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-semibold text-foreground leading-tight"
            >
              {machine.headline}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-foreground/80 leading-relaxed font-light"
            >
              {machine.description}
            </motion.p>

            {/* Features List */}
            <motion.div className="space-y-6 pt-8">
              {machine.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="text-lg font-semibold text-accent mb-2">{feature.name}</h4>
                      <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="relative h-96 lg:h-full min-h-96">
            <motion.img
              src={machine.image || "/placeholder.svg"}
              alt={machine.name}
              className="h-full w-full object-cover rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            {/* Image Overlay Fade */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-transparent to-background/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0]) }}
        className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-background pointer-events-none z-20"
      />
    </section>
  )
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function MachineryPage() {
  const [active, setActive] = useState(0)

  return (
    <main className="bg-background text-foreground">
      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3 md:gap-4">
        {MACHINES.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              animate={{
                scale: active === i ? 1.2 : 1,
                backgroundColor: active === i ? "var(--color-accent)" : "rgba(255,107,53,0.2)",
              }}
              transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 30 }}
              className="w-2 h-2 rounded-full cursor-pointer hover:opacity-80"
            />
          </motion.div>
        ))}
      </div>

      <HeroSection />

      {MACHINES.map((machine, i) => (
        <MachineSection key={machine.name} machine={machine} index={i} setActive={setActive} />
      ))}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background flex items-center justify-center border-t border-accent/10 py-24"
      >
        <div className="text-center space-y-8 max-w-3xl px-6">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            The Future of Fabrication
          </h3>
          <p className="text-lg text-foreground/70 font-light leading-relaxed">
            Our integrated ecosystem empowers creators, engineers, and manufacturers to bring complex ideas to life with
            precision, speed, and scale. Every machine in our collection is engineered to work seamlessly together,
            creating a unified fabrication experience that transforms how products are made—from initial concept to
            final production.
          </p>
          <p className="text-base text-foreground/60 font-light">
            Welcome to the intersection of innovation and infinite possibility.
          </p>
        </div>
      </motion.footer>
    </main>
  )
}
