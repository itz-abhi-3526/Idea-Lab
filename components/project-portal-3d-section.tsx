"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Lock, Zap } from "lucide-react"

export function ProjectPortalComingSoonSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const portalRef = useRef(null)

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-background overflow-hidden"
    >
      {/* Background gradient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl opacity-15" />

        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3C/filter%3E%3Crect width='400' height='400' fill='white' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            animation: "grain 8s steps(10) infinite",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-block mb-5 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs sm:text-sm font-medium tracking-wide">
              Under Development
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-foreground"
          >
            Something Powerful
            <br />
            Is Coming
          </motion.h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-foreground text-base sm:text-lg leading-relaxed">
              Our centralized Project Portal is currently under development. It will soon enable students to showcase
              projects, collaborate in real-time, and track innovation progress from ideation to launch.
            </p>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground font-medium">
                  Development Progress
                </span>
                <span className="text-accent font-semibold">92%</span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-accent to-accent/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "92%" } : { width: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-3 pt-2 sm:pt-4"
            >
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
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="pt-2 sm:pt-4"
            >
              <button
                disabled
                className="group relative w-full sm:w-auto px-8 py-3 bg-foreground text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 opacity-60 cursor-not-allowed border border-foreground/20"
              >
                <Lock className="w-4 h-4" />
                Launch Project Portal
              </button>
              <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
                Launching Soon
              </p>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            ref={portalRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-72 sm:h-96 md:h-full min-h-72 sm:min-h-96 rounded-xl border border-accent/20 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 overflow-hidden flex items-center justify-center group"
          >
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full max-w-[220px] sm:max-w-xs relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="portalGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF8A00" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="lightRays" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#FF8A00" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.rect
                x="50"
                y="50"
                width="200"
                height="200"
                fill="url(#lightRays)"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />

              <circle
                cx="150"
                cy="150"
                r="120"
                fill="url(#portalGradient)"
                filter="url(#glow)"
              />

              <motion.circle
                cx="150"
                cy="150"
                r="110"
                fill="none"
                stroke="#FF8A00"
                strokeWidth="1.5"
                opacity="0.4"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.circle
                cx="150"
                cy="150"
                r="80"
                fill="none"
                stroke="#FF8A00"
                strokeWidth="1"
                opacity="0.5"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.circle
                cx="150"
                cy="150"
                r="50"
                fill="none"
                stroke="#FF8A00"
                strokeWidth="1.5"
                opacity="0.6"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.circle
                cx="150"
                cy="150"
                r="3"
                fill="#FF8A00"
                animate={{ r: [3, 5, 3] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </svg>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, 1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-2px, 1px); }
          60% { transform: translate(2px, 2px); }
          70% { transform: translate(-1px, -2px); }
          80% { transform: translate(1px, 1px); }
          90% { transform: translate(-2px, -1px); }
        }
      `}</style>
    </section>
  )
}
