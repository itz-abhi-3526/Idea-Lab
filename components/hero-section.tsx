"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import AuthHeader from "@/components/auth/AuthHeader"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden isolate">

      {/* Cinematic background layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <motion.img
          src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766227263/WhatsApp_Image_2025-12-20_at_2.14.36_PM_ggg2fo.jpg"
          alt="IdeaLab FISAT"
          className="w-full h-full object-cover will-change-transform"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* depth + cinematic wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

        {/* subtle moving light field */}
        <motion.div
          className="absolute -inset-[30%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* soft aurora blobs */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <motion.div
          className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-white/4 blur-3xl"
          animate={{ y: [0, 25, 0], x: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Auth header */}
      <motion.div
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AuthHeader />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Logo */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.85, y: 10 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <motion.img
              src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766672158/IDEA_LAB_LOGO_high_n9bjgo.png"
              alt="IDEA Lab Logo"
              className="h-20 sm:h-24 md:h-32 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* glow ring */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full blur-2xl bg-white/10 -z-10"
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.28em] uppercase text-white/70">
              Where Ideas Come to Life
            </span>
            <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/40" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance max-w-4xl text-white font-[family-name:var(--font-heading)] leading-tight"
          >
            Welcome to <br />
            <span className="relative inline-block bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              FISAT AICTE IDEA Lab

              {/* subtle animated underline shimmer */}
              <motion.span
                aria-hidden
                className="absolute left-0 right-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed px-2 sm:px-0"
          >
            A collaborative innovation space where students design, build,
            and transform ideas into impactful solutions
          </motion.p>

          {/* CTA group */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="pt-2 sm:pt-4"
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-4 py-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">

                <a href="#about" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto relative overflow-hidden bg-white text-black"
                    >
                      <span className="relative z-10 flex items-center">
                        Explore the Lab
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>

                      {/* liquid highlight sweep */}
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                    </Button>
                  </motion.div>
                </a>

                <a href="#idea-submission" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto relative overflow-hidden bg-transparent text-white border-white/30 hover:bg-white/10"
                    >
                      <span className="relative z-10">
                        Submit Your Idea
                      </span>

                      {/* soft glow on hover */}
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />
                    </Button>
                  </motion.div>
                </a>

              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
