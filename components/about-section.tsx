"use client"

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion"
import {
  Compass,
  Hammer,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"

/* -------------------- DATA -------------------- */

const journeySteps = [
  {
    icon: Compass,
    title: "Explore",
    description:
      "Identify real-world problems and promising ideas through research and discovery.",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Design and prototype using IDEA Lab resources, tools, and cutting-edge technology.",
  },
  {
    icon: CheckCircle,
    title: "Validate",
    description:
      "Test, iterate, and refine solutions with expert mentorship and feedback.",
  },
  {
    icon: Sparkles,
    title: "Impact",
    description:
      "Create solutions that generate real-world value and make a difference.",
  },
]

/* -------------------- MOTION -------------------- */

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

/* -------------------- COMPONENT -------------------- */

export function AboutSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative w-full py-16 sm:py-24 md:py-32 overflow-hidden"
        id="about"
      >
        {/* ambient background wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-24">

          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-12 sm:mb-20"
          >
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">

              <m.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight"
              >
                About IDEA Lab
              </m.h2>

              <m.div
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
                className="relative h-[2px] rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0"
              >
                {/* shimmer */}
                <m.span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
              </m.div>

              <m.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl"
              >
                The FISAT AICTE IDEA Lab is a dedicated innovation space where students
                transform ideas into impactful solutions through hands-on
                experimentation, mentorship, and collaboration.
              </m.p>

            </div>
          </m.div>

          {/* Journey */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-6xl mx-auto"
          >

            {/* Desktop timeline */}
            <div className="hidden md:flex items-start justify-center relative">

              {/* connecting rail */}
              <div
                aria-hidden
                className="absolute left-0 right-0 top-10 lg:top-12 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
              />

              {journeySteps.map((step, index) => {
                const Icon = step.icon
                const isHovered = hoveredIndex === index

                return (
                  <m.div
                    key={index}
                    variants={itemVariants}
                    className="flex-1 flex flex-col items-center relative group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative z-10 flex flex-col items-center text-center px-3 lg:px-4">

                      {/* glass icon pod */}
                      <m.div
                        className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl
                                   bg-background/60 backdrop-blur-xl
                                   border border-accent/25
                                   shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                                   flex items-center justify-center mb-4"
                        animate={{
                          scale: isHovered ? 1.08 : 1,
                          borderColor: isHovered
                            ? "hsl(var(--accent))"
                            : "hsl(var(--accent) / 0.25)",
                        }}
                        transition={{ duration: 0.25, ease: easeOut }}
                      >
                        {/* breathing glow */}
                        <m.div
                          aria-hidden
                          className="absolute inset-0 rounded-2xl bg-accent/10 blur-xl"
                          animate={{ opacity: isHovered ? 0.6 : 0.25 }}
                          transition={{ duration: 0.25, ease: easeOut }}
                        />

                        <Icon className="relative z-10 w-7 h-7 lg:w-9 lg:h-9 text-accent" />
                      </m.div>

                      <m.h3
                        animate={{ y: isHovered ? -2 : 0 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        className="text-lg lg:text-xl font-semibold mb-2"
                      >
                        {step.title}
                      </m.h3>

                      {/* ⚠️ only opacity / translate – no height animation */}
                      <m.div
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : -6,
                        }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        className="overflow-hidden pointer-events-none"
                      >
                        <p className="text-sm text-muted-foreground max-w-[220px]">
                          {step.description}
                        </p>
                      </m.div>
                    </div>

                    {/* connector arrow */}
                    {index < journeySteps.length - 1 && (
                      <m.div
                        aria-hidden
                        animate={{ opacity: isHovered ? 1 : 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-8 lg:top-10 left-[60%] w-[calc(100%-60px)] h-[2px] bg-accent/20 flex items-center justify-center"
                      >
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-accent/50 bg-background rounded-full" />
                      </m.div>
                    )}
                  </m.div>
                )
              })}
            </div>

            {/* Mobile stacked cards */}
            <div className="flex md:hidden flex-col gap-6 sm:gap-8">
              {journeySteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <m.div
                    key={index}
                    variants={itemVariants}
                    className="relative rounded-2xl border border-accent/15
                               bg-background/60 backdrop-blur-xl
                               shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                               p-4 flex gap-4 items-start"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                  >
                    <div className="relative w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </m.div>
                )
              })}
            </div>

          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
