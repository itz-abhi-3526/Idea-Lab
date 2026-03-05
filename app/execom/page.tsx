"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

export default function ExecomPage() {
  const [members, setMembers] = useState<any[]>([])
  const [isReady, setIsReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadStatus, setLoadStatus] = useState("INITIALIZING...")

  useEffect(() => {
    async function init() {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + Math.floor(Math.random() * 15) + 1
        })
      }, 200)

      const { data } = await supabase
        .from("execom_members")
        .select("*")
        .order("display_order", { ascending: true })

      if (data) {
        setMembers(data)
        setLoadStatus("MANIFEST_RECEIVED")
      }

      if ("fonts" in document) await document.fonts.ready

      setTimeout(() => {
        setIsReady(true)
      }, 2200)

      return () => clearInterval(timer)
    }
    init()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 overflow-x-hidden font-[family-name:var(--font-syne)] cursor-crosshair">

      <AnimatePresence mode="wait">
        {!isReady ? (

          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              clipPath: "polygon(0 45%, 100% 45%, 100% 55%, 0 55%)",
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-mono"
          >

            <div className="relative w-[90%] max-w-[320px]">

              <div className="flex justify-between text-[10px] text-orange-600/60 mb-2 tracking-tighter">
                <span>FISAT_IDEA_LAB_SECURE_OS</span>
                <span>V4.0.2</span>
              </div>

              <div className="border border-white/10 p-6 bg-[#0a0a0a] relative overflow-hidden">

                <motion.div
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="absolute inset-0 bg-orange-600/10"
                />

                <div className="relative z-10">

                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-orange-500 font-bold text-xs tracking-[0.3em]">
                      {loadStatus}
                    </h2>
                    <span className="text-2xl font-black italic text-white leading-none">
                      {Math.min(progress, 100)}%
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.1 }}
                        animate={{
                          opacity: (progress / 10) >= i ? 1 : 0.1,
                          backgroundColor: (progress / 10) >= i ? "#ea580c" : "#fff"
                        }}
                        className="h-6 w-full transition-colors duration-300"
                        style={{ boxShadow: (progress / 10) >= i ? '0 0 10px #ea580c' : 'none' }}
                      />
                    ))}
                  </div>

                </div>
              </div>

              <div className="mt-4 space-y-1 opacity-40">

                <div className="flex items-center gap-2 text-[9px]">
                  <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
                  <span>DECRYPTING_PACKETS_..._SUCCESS</span>
                </div>

                <div className="flex items-center gap-2 text-[9px]">
                  <div className={`h-1 w-1 rounded-full ${progress > 60 ? 'bg-green-500' : 'bg-orange-500 animate-bounce'}`} />
                  <span>SYNCING_MEMBER_DATABASE</span>
                </div>

              </div>

            </div>
          </motion.div>

        ) : (

          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-pulse" />

            <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div
              className="fixed inset-0 opacity-[0.1] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
              }}
            />

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-24">

              <header className="relative mb-32 border-l-2 border-orange-600 pl-8">

                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-2 w-2 bg-orange-600 shadow-[0_0_15px_#ea580c]"
                  />
                  <span className="text-[10px] font-mono tracking-[0.6em] text-orange-500 uppercase font-bold animate-pulse">
                    SYSTEM_AUTH_IDENTIFIED
                  </span>
                </div>

                <h1 className="flex flex-wrap items-baseline gap-x-4 text-[12vw] md:text-[11rem] font-black uppercase leading-[0.8] tracking-tighter italic">
                  <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)' }}>EXE</span>
                  <span className="text-orange-600 drop-shadow-[0_0_50px_rgba(234,88,12,0.5)]">COM</span>
                </h1>

                <div className="mt-8 flex flex-wrap gap-8 font-mono text-[9px] text-neutral-500 uppercase tracking-[0.3em]">

                  <span className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-green-500" />
                    STATUS: OPERATIONAL
                  </span>

                  <span className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-neutral-700" />
                    ACCESS: GRANTED
                  </span>

                  <span className="flex items-center gap-2 animate-pulse">
                    <div className="h-1 w-1 bg-orange-600" />
                    SYNC_LIVE
                  </span>

                </div>

              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                {members.map((member, index) => (

                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="group relative bg-[#0a0a0a] border border-white/5 p-6 md:p-10 transition-all duration-700 hover:border-orange-600/60 hover:shadow-[0_0_40px_-15px_rgba(234,88,12,0.2)]"
                  >

                    <div className="flex justify-between items-start mb-8 md:mb-12">

                      <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 bg-[#111] border border-white/10 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative">

                        {member.image_url && (
                          <>
                            <img
                              src={member.image_url}
                              alt=""
                              className="h-full w-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 scale-110 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite]" />
                          </>
                        )}

                      </div>

                      <span className="text-7xl font-black text-white/[0.03] group-hover:text-orange-600/[0.08] transition-all duration-700 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>

                    <div className="space-y-4">

                      <h3 className="text-xl font-bold font-mono uppercase text-neutral-400 group-hover:text-white tracking-tight transition-colors">
                        {member.name}
                      </h3>

                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-5 bg-orange-600 group-hover:w-12 transition-all duration-500 shadow-[0_0_8px_#ea580c]" />
                        <p className="text-[11px] font-mono font-black text-orange-500 uppercase tracking-[0.2em]">
                          {member.designation}
                        </p>
                      </div>

                      {member.role && (
                        <p className="pt-6 border-t border-white/5 text-[9px] font-mono text-neutral-500 uppercase leading-relaxed tracking-wider group-hover:text-neutral-300 transition-colors">
                          {member.role}
                        </p>
                      )}

                    </div>

                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/5 group-hover:border-orange-600/50 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/5 group-hover:border-orange-600/50 transition-colors" />

                  </motion.div>

                ))}

              </div>

            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>

    </div>
  )
}