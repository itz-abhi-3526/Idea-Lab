"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Lock, Zap } from "lucide-react"

export function ProjectPortalSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [progress, setProgress] = useState(60)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5
        return next > 95 ? 95 : next
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-block mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs sm:text-sm font-medium tracking-wide">
              Under Development
            </span>
          </motion.div>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Project Portal
          </h2>

          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Something Powerful Is Coming
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-foreground text-base sm:text-lg leading-relaxed">
              Our centralized Project Portal is currently under development. It
              will soon enable students to showcase projects, collaborate, and
              track innovation progress.
            </p>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground font-medium">
                  Development Progress
                </span>
                <span className="text-accent font-semibold">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-accent to-accent/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${progress}%` } : {}}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-2">
              {[
                "Showcase student innovations",
                "Real-time collaboration tools",
                "Track innovation milestones",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-foreground/90"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                disabled
                className="w-full sm:w-auto px-8 py-3 bg-foreground text-background font-medium rounded-lg flex items-center justify-center gap-2 opacity-60 cursor-not-allowed border border-foreground/20"
              >
                <Lock className="w-4 h-4" />
                Launch Project Portal
              </button>
              <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
                Launching Soon
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-64 sm:h-80 md:h-full min-h-64 sm:min-h-80 rounded-xl border border-accent/20 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 overflow-hidden flex items-center justify-center"
          >
            {/* Rings */}
            <motion.div
              className="absolute w-28 h-28 sm:w-32 sm:h-32 border border-accent/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute w-44 h-44 sm:w-48 sm:h-48 border border-accent/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Floating dots */}
            {[60, -60, 80].map((offset, idx) => (
              <motion.div
                key={idx}
                className="absolute w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50"
                animate={{
                  y: [0, -offset, 0],
                  x: [0, offset / 2, 0],
                }}
                transition={{
                  duration: 6 + idx,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              className="absolute w-2 h-2 bg-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0.4, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />

            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent/40 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent/40 rounded-tl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
