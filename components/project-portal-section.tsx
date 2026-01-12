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
    <section ref={containerRef} className="relative py-24 px-6 md:px-12 bg-background">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium tracking-wide">
              Under Development
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground"
          >
            Project Portal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto font-light"
          >
            Something Powerful Is Coming
          </motion.p>
        </motion.div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-foreground text-lg leading-relaxed">
                Our centralized Project Portal is currently under development. It will soon enable students to showcase
                projects, collaborate, and track innovation progress.
              </p>
            </div>

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Development Progress</span>
                <span className="text-accent font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-accent to-accent/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${progress}%` } : { width: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-3 pt-4"
            >
              {[
                { icon: Zap, text: "Showcase student innovations" },
                { icon: Zap, text: "Real-time collaboration tools" },
                { icon: Zap, text: "Track innovation milestones" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-center gap-3 text-foreground/90">
                    <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                )
              })}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="pt-4"
            >
              <button
                disabled
                className="group relative w-full md:w-auto px-8 py-3 bg-foreground text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 opacity-60 cursor-not-allowed border border-foreground/20"
              >
                <Lock className="w-4 h-4" />
                Launch Project Portal
              </button>
              <p className="text-xs text-muted-foreground mt-3 text-center md:text-left">Launching Soon</p>
            </motion.div>
          </motion.div>

          {/* Right: 3D Canvas area with animated elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 md:h-full min-h-96 rounded-xl border border-accent/20 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 overflow-hidden flex items-center justify-center"
          >
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Floating 3D-like elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central rotating ring */}
              <motion.div
                className="absolute w-32 h-32 border border-accent/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Outer rotating ring (opposite direction) */}
              <motion.div
                className="absolute w-48 h-48 border border-accent/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Floating spheres */}
              {[
                { delay: 0, offset: 60, duration: 6 },
                { delay: 2, offset: -60, duration: 7 },
                { delay: 4, offset: 80, duration: 8 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50"
                  animate={{
                    y: [0, -item.offset, 0],
                    x: [0, item.offset / 2, 0],
                  }}
                  transition={{
                    duration: item.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: item.delay,
                  }}
                />
              ))}

              {/* Center pulse */}
              <motion.div
                className="absolute w-2 h-2 bg-accent rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Corner accent line */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent/40 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/40 rounded-tl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
