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
      <div className="absolute top-6 right-6 z-20">
        <AuthHeader />
      </div>

      {/* Main content */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-8"
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
              className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/70">
              Where Ideas Come to Life
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/40" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white max-w-4xl"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              IDEA Lab FISAT
            </span>
          </motion.h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            A collaborative innovation space where students design, build,
            and transform ideas into impactful solutions
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#about">
              <Button size="lg" className="bg-white text-black group">
                Explore the Lab
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>

            <a href="#idea-submission">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/30 hover:bg-white/10"
              >
                Submit Your Idea
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
