
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
            clearInterval(timer);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 1;
        });
      }, 200);

      const { data } = await supabase
        .from("execom_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (data) {
        setMembers(data);
        setLoadStatus("MANIFEST_RECEIVED");
      }

      // Safe access to document fonts for SSR
      if (typeof window !== "undefined" && "fonts" in document) {
        await (document as any).fonts.ready;
      }

      setTimeout(() => setIsReady(true), 2200);
      return () => clearInterval(timer);
    }
    init();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 overflow-x-hidden font-syne cursor-crosshair">
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
                <motion.div animate={{ opacity: [0.05, 0.1, 0.05] }} transition={{ repeat: Infinity, duration: 0.5 }} className="absolute inset-0 bg-orange-600/10" />
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-orange-500 font-bold text-xs tracking-[0.3em]">{loadStatus}</h2>
                    <span className="text-2xl font-black italic text-white leading-none">{Math.min(progress, 100)}%</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <motion.div key={i} animate={{ opacity: (progress / 10) >= i ? 1 : 0.1, backgroundColor: (progress / 10) >= i ? "#ea580c" : "#fff" }} className="h-6 w-full transition-colors duration-300" style={{ boxShadow: (progress / 10) >= i ? '0 0 10px #ea580c' : 'none' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            {/* HUD Overlays */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-pulse" />
            <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-24">
              <header className="relative mb-16 md:mb-32 border-l-2 border-orange-600 pl-6 md:pl-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 bg-orange-600" />
                  <span className="text-[9px] font-mono tracking-[0.5em] text-orange-500 uppercase font-bold animate-pulse">SYSTEM_AUTH_IDENTIFIED</span>
                </div>
                <h1 className="text-[16vw] md:text-[11rem] font-black uppercase leading-[0.8] tracking-tighter italic">
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>EXE</span>
                  <span className="text-orange-600 drop-shadow-[0_0_30px_rgba(234,88,12,0.3)]">COM</span>
                </h1>
              </header>

              {/* ASYMMETRIC GRID SYSTEM */}
              <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {members.map((member, index) => {
                  const isLarge = index === 0; // Highlight the Lead
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className={`group relative bg-[#0a0a0a] border border-white/5 transition-all duration-700 hover:border-orange-600/40 
                        ${isLarge ? 'md:col-span-2 lg:col-span-1 border-orange-600/20' : ''} 
                        ${index % 3 === 0 ? 'p-8 md:p-10' : 'p-6 md:p-10'}`}
                    >
                      {/* Flex direction changes to Row on mobile for even indices to break repetition */}
                      <div className={`flex gap-6 items-center md:items-start ${index % 2 !== 0 ? 'flex-row-reverse md:flex-col' : 'flex-row md:flex-col'}`}>
                        
                        {/* Avatar Node */}
                        <div className="relative shrink-0">
                          <div className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-full bg-[#111] border border-white/10 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                            {member.image_url && (
                              <img src={member.image_url} alt="" className="h-full w-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-orange-600/5 group-hover:animate-scan pointer-events-none" />
                          </div>
                          {/* HUD Decorators for Mobile */}
                          <div className="md:hidden absolute -bottom-1 -right-1 text-[7px] font-mono text-orange-500/40 tracking-tighter">
                            MEM_REF_{member.id.slice(0, 4)}
                          </div>
                        </div>

                        {/* Content Node */}
                        <div className="flex-1 space-y-3 min-w-0">
                          <h3 className="text-lg md:text-2xl font-bold font-mono uppercase text-neutral-300 group-hover:text-white leading-tight truncate">
                            {member.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="h-[1px] w-4 bg-orange-600 shadow-[0_0_8px_#ea580c]" />
                            <p className="text-[10px] md:text-xs font-mono font-black text-orange-500 uppercase tracking-widest truncate">
                              {member.designation}
                            </p>
                          </div>
                          {/* Condensed Role Tag for Mobile */}
                          {member.role && (
                            <p className="hidden md:block pt-4 border-t border-white/5 text-[9px] font-mono text-neutral-500 uppercase leading-relaxed group-hover:text-neutral-300">
                              {member.role}
                            </p>
                          )}
                        </div>

                        {/* Numeric ID - Desktop only */}
                        <span className="hidden md:block absolute top-4 right-6 text-5xl font-black text-white/[0.02] group-hover:text-orange-600/[0.05] transition-all select-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Animated Corner Brackets */}
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10 group-hover:border-orange-600/40 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10 group-hover:border-orange-600/40 transition-colors" />
                    </motion.div>
                  );
                })}
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
