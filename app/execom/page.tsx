"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

type ExecomMember = {
  id: string
  name: string
  designation: string
  role: string | null
  image_url: string | null
}

export default function ExecomPage() {
  const [members, setMembers] = useState<ExecomMember[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExecom = async () => {
    const { data, error } = await supabase
      .from("execom_members")
      .select("id, name, designation, role, image_url")
      .order("display_order", { ascending: true })

    if (!error && data) {
      setMembers(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchExecom()

    const channel = supabase
      .channel("execom-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "execom_members",
        },
        fetchExecom
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) return null

  return (
    <section className="relative w-full min-h-screen py-20 sm:py-24 bg-background overflow-hidden">
      {/* soft ambient wash (purely visual) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            Executive Committee
          </h1>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Organised. Driven. Committed.
          </p>

          <div className="relative h-[2px] w-24 mx-auto mt-4 overflow-hidden rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0">
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group
                flex items-center gap-4
                rounded-2xl
                border border-white/10
                bg-white/5
                p-4
                backdrop-blur-xl
                shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                transition-all
                hover:-translate-y-0.5
                hover:shadow-[0_12px_32px_rgba(0,0,0,0.28)]
              "
            >
              {/* Photo */}
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full bg-accent/10 ring-2 ring-white/10">
                <img
                  src={member.image_url ?? "/placeholder-avatar.png"}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-semibold text-sm sm:text-base truncate">
                  {member.name}
                </span>

                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  {member.designation}
                </span>

                {member.role && (
                  <span className="text-xs sm:text-sm text-muted-foreground truncate">
                    {member.role}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
