"use client"

import { motion, type Variants } from "framer-motion"
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
    <section className="relative w-full min-h-screen py-24 md:py-32"  id="about">
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-20"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              About IDEA Lab
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0"
            />

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              The FISAT AICTE IDEA Lab is a dedicated innovation space where students
              transform ideas into impactful solutions through hands-on
              experimentation, mentorship, and collaboration.
            </p>
          </div>
        </motion.div>

        {/* Journey */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-6xl mx-auto"
        >
          {/* Desktop */}
          <div className="hidden md:flex items-start justify-center relative">
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              const isHovered = hoveredIndex === index

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex-1 flex flex-col items-center relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative z-10 flex flex-col items-center text-center px-4">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center mb-4"
                      animate={{
                        backgroundColor: isHovered
                          ? "hsl(var(--accent) / 0.2)"
                          : "hsl(var(--accent) / 0.1)",
                        borderColor: isHovered
                          ? "hsl(var(--accent))"
                          : "hsl(var(--accent) / 0.3)",
                      }}
                      transition={{ duration: 0.3, ease: easeOut }}
                    >
                      <Icon className="w-9 h-9 text-accent" />
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-2">
                      {step.title}
                    </h3>

                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : -10,
                        height: isHovered ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground max-w-[200px]">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {index < journeySteps.length - 1 && (
                    <div className="absolute top-10 left-[60%] w-[calc(100%-60px)] h-[2px] bg-accent/20 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-accent/40 bg-background" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden flex-col gap-8">
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4 items-start"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
