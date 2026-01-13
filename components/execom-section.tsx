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
    <section className="relative w-full py-16 sm:py-24 md:py-32 bg-background/50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-24">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
              Executive Committee
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0"
            />

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
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12"
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={cardVariants}>
              <Card className="h-full bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-accent/10">
                      <img
                        src={member.image_url ?? "/placeholder-avatar.png"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-base sm:text-lg font-semibold">
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
        <div className="flex justify-center">
          <Link href="/execom" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-3 border border-accent/30 rounded-lg bg-accent/20 hover:bg-accent/30 transition-all duration-300 text-sm sm:text-base">
              View Full Executive Committee
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}
