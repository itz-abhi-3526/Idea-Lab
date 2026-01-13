"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import AuthHeader from "@/components/auth/AuthHeader"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766227263/WhatsApp_Image_2025-12-20_at_2.14.36_PM_ggg2fo.jpg"
          alt="IdeaLab FISAT"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Auth header */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <AuthHeader />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <img
              src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766672158/IDEA_LAB_LOGO_high_n9bjgo.png"
              alt="IDEA Lab Logo"
              className="h-20 sm:h-24 md:h-32 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/70">
              Where Ideas Come to Life
            </span>
            <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/40" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance max-w-4xl text-white font-[family-name:var(--font-heading)] leading-tight"
          >
            Welcome to <br />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              FISAT AICTE IDEA Lab
            </span>
          </motion.h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed px-2 sm:px-0">
            A collaborative innovation space where students design, build,
            and transform ideas into impactful solutions
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
            <a href="#about" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black group">
                Explore the Lab
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>

            <a href="#idea-submission" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10"
              >
                Submit Your Idea
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
