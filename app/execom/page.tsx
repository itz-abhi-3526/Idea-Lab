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
        () => {
          fetchExecom()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) return null

  return (
    <section className="relative w-full min-h-screen py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)]">
            Executive Committee
          </h1>
          <p className="mt-3 text-muted-foreground">
            Organised. Driven. Committed.
          </p>
        </motion.div>

        {/* List */}
        <div className="space-y-6">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
            >
              {/* Photo */}
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-accent/10">
                <img
                  src={member.image_url ?? "/placeholder-avatar.png"}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-center sm:text-left">
                <span className="font-semibold">
                  {member.name}
                </span>

                <span className="hidden sm:inline text-muted-foreground">
                  |
                </span>

                <span className="text-sm text-muted-foreground">
                  {member.designation}
                </span>

                {member.role && (
                  <>
                    <span className="hidden sm:inline text-muted-foreground">
                      |
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {member.role}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
