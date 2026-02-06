"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

/* -------------------- TYPES -------------------- */

type ExecomMember = {
  id: string
  name: string
  designation: string
  role: string | null
  image_url: string | null
}

/* -------------------- MOTION -------------------- */

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

/* -------------------- COMPONENT -------------------- */

export function ExecomSection() {
  const [members, setMembers] = useState<ExecomMember[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExecom = async () => {
    const { data, error } = await supabase
      .from("execom_members")
      .select("id, name, designation, role, image_url")
      .order("display_order", { ascending: true })
      .limit(6)

    if (!error && data) setMembers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchExecom()

    const channel = supabase
      .channel("execom-section-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "execom_members" },
        fetchExecom
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading || members.length === 0) return null

  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 bg-background/50 overflow-hidden">
      {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-24">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
              Executive Committee
            </h2>

            <div className="relative h-[2px] w-24 overflow-hidden rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0">
              <motion.span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <p className="text-sm sm:text-base text-muted-foreground">
              Organised. Driven. Committed.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12"
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={cardVariants}>
              <Card
                className="
                  h-full
                  relative
                  overflow-hidden
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  rounded-2xl
                  shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]
                "
              >
                {/* soft hover glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-accent/5 opacity-0 hover:opacity-100 transition-opacity"
                />

                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 relative z-10">
                  <div className="flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-accent/10 ring-2 ring-white/10"
                    >
                      <img
                        src={member.image_url ?? "/placeholder-avatar.png"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-base sm:text-lg font-semibold leading-snug">
                      {member.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {member.designation}
                    </p>

                    {member.role && (
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex justify-center"
        >
          <Link href="/execom" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full sm:w-auto
                group
                flex items-center justify-center gap-2
                px-6 py-3
                border border-accent/30
                rounded-xl
                bg-accent/15
                hover:bg-accent/25
                transition-all
                text-sm sm:text-base
              "
            >
              View Full Executive Committee
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
