"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import AuthHeader from "@/components/auth/AuthHeader"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/**
 * THE ULTIMATE SCROLL LOGIC
 * Calculates absolute position from the document root to bypass 
 * sticky/overflow issues.
 */
const handleSmoothScroll = (id: string) => {
  // Use lowercase to match the section IDs in page.tsx
  const targetId = id.toLowerCase();
  const element = document.getElementById(targetId);
  
  if (element) {
    // 1. Calculate the absolute vertical position
    // We get the distance from the top of the viewport + current scroll
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - 80; // Navbar height offset

    // 2. The "Double-Tap" Fix: 
    // We use window.scrollTo twice or with a slight timeout to 
    // override any Framer Motion scroll-locks.
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // Backup: If the browser tries to stop the scroll, this reinforces it
    setTimeout(() => {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }, 50); 
  }
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "EVENTS", id: "events" },
    { name: "INVENTORY", id: "inventory" }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-8 py-4"
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3 rounded-2xl border transition-all duration-500 ${
        isScrolled 
        ? "bg-black/80 border-white/10 backdrop-blur-md shadow-2xl" 
        : "bg-transparent border-transparent"
      }`}>
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0 z-[110]">
          <span className="text-[9px] sm:text-[10px] font-bold font-['Syne'] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-neutral-400 whitespace-nowrap">
            WHERE IDEAS <span className="text-orange-500">EVOLVE</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleSmoothScroll(link.id)}
              className="text-[10px] font-bold font-['Syne'] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-[10px] font-black font-['Syne'] uppercase tracking-[0.3em] text-neutral-400 outline-none hover:text-orange-500 transition-colors">
              MORE <ChevronDown size={14} className="text-orange-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 border-white/10 backdrop-blur-2xl rounded-2xl p-2 min-w-[180px] shadow-2xl z-[110]">
              <DropdownMenuItem className="focus:bg-orange-500/10 focus:text-orange-500 rounded-lg cursor-pointer">
                <Link href="/execom" className="w-full font-bold uppercase tracking-widest text-[10px] py-2">EXECOM</Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="focus:bg-orange-500/10 focus:text-orange-500 rounded-lg cursor-pointer"
                onClick={() => handleSmoothScroll('incubation')}
              >
                <span className="w-full font-bold uppercase tracking-widest text-[10px] py-2">INCUBATION</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <AuthHeader />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-1 z-[110] hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-4 right-4 bg-black/95 border border-white/10 backdrop-blur-3xl rounded-3xl overflow-hidden md:hidden z-[100] shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => { handleSmoothScroll(link.id); setIsOpen(false); }}
                  className="text-[12px] font-bold font-['Syne'] uppercase tracking-[0.4em] text-neutral-400 hover:text-orange-500"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => { handleSmoothScroll('incubation'); setIsOpen(false); }}
                className="text-[12px] font-bold font-['Syne'] uppercase tracking-[0.4em] text-orange-500"
              >
                INCUBATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.7, 0]) 
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <section id="home" ref={containerRef} className="relative h-[110vh] flex flex-col justify-center overflow-hidden bg-black isolate">
      <Navbar />

      <motion.div style={{ opacity: imageOpacity, scale: imageScale }} className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766227263/WhatsApp_Image_2025-12-20_at_2.14.36_PM_ggg2fo.jpg"
          className="w-full h-full object-cover brightness-[0.7] saturate-[0.8]" 
          alt="Lab Background"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <img 
               src="https://res.cloudinary.com/dudp2imxs/image/upload/v1766672158/IDEA_LAB_LOGO_high_n9bjgo.png" 
               className="h-20 sm:h-24 md:h-28 w-auto brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
               alt="IDEA LAB LOGO" 
            />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[10px] sm:text-[11px] font-mono font-black text-orange-500 uppercase tracking-[0.8em] sm:tracking-[1.2em] mb-4">
              WELCOME TO
            </p>

            <h2 className="text-[clamp(1.2rem,4vw,3.2rem)] font-black font-['Syne'] tracking-[0.05em] uppercase leading-none text-neutral-400 mb-2">
              FISAT AICTE
            </h2>

            <div className="relative inline-block px-4">
              <h1 className="text-[clamp(2.5rem,10vw,8.5rem)] font-black font-['Syne'] tracking-[-0.03em] uppercase leading-[1.1] 
                bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-sm">
                IDEA LAB
              </h1>
            </div>

            <div className="mt-8 opacity-60">
               <div className="h-[1px] w-32 sm:w-48 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-14 w-full max-w-md px-4">
            <Link href="/products" className="flex-1">
            <Button 
              className="h-10 sm:h-12 flex-1 bg-white text-black hover:bg-orange-600 hover:text-white font-black font-['Syne'] uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all rounded-none text-[8px] sm:text-[10px] border-none group"
            >
              Explore the Products <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={() => handleSmoothScroll('events')}
              className="h-10 sm:h-12 flex-1 border-white/20 bg-black/40 text-white hover:border-white font-black font-['Syne'] uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none text-[8px] sm:text-[10px] backdrop-blur-md transition-all"
            >
              Recent Events
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-orange-500/40 to-transparent z-30" />
    </section>
  )
}