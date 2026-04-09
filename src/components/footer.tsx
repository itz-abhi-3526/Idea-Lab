
import { Link } from "react-router-dom"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { Mail, MapPin, Instagram, Linkedin, Terminal, Activity, WifiOff } from "lucide-react"

export function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <footer className="relative w-full overflow-hidden border-t border-white/5 bg-black">
        
        {/* Background Decals */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-24 relative z-10">
          
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16"
          >
            {/* BRANDING: The Root Node */}
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-500">
                  <Terminal size={18} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">Root_Directory</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-[800] font-['Syne'] tracking-tighter uppercase text-white leading-none">
                  FISAT AICTE <br />
                  <span className="text-neutral-800">IDEA LAB</span>
                </h3>
                <p className="text-sm font-['Outfit'] font-light text-neutral-500 leading-relaxed max-w-sm">
                  A multidisciplinary innovation hub. Converting theoretical concepts into functional industrial prototypes through advanced engineering.
                </p>
              </div>

              {/* Secure Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/idealab_fisat/" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/idealab-fisat/" }
                ].map((social, i) => (
                  <m.a
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.1)" }}
                    href={social.href}
                    target="_blank"
                    className="p-3 rounded-xl border border-white/5 bg-neutral-900/50 text-neutral-400 hover:text-orange-500 transition-colors"
                  >
                    <social.icon size={18} />
                  </m.a>
                ))}
              </div>
            </div>

            {/* NAVIGATION: Node Access */}
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-[10px] font-mono font-bold text-neutral-600 uppercase tracking-[0.3em]">Access_Nodes</h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home_System" },
                  { href: "/events", label: "Event_Logs" },
                  { href: "/inventory", label: "Asset_Registry" },
                  { href: "/execom", label: "Admin_Directory" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="group flex items-center gap-2 text-xs font-bold font-['Syne'] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                    >
                      <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT: Transmission Info */}
            <div className="md:col-span-4 space-y-6">
              <h4 className="text-[10px] font-mono font-bold text-neutral-600 uppercase tracking-[0.3em]">Signal_Origin</h4>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <MapPin size={18} className="text-orange-500 shrink-0" />
                  <span className="text-xs font-['Outfit'] text-neutral-400 leading-snug">
                    Federal Institute of Science and Technology, <br />
                    Hormis Nagar, Angamaly, Kerala
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <Mail size={18} className="text-orange-500 shrink-0" />
                  <span className="text-xs font-mono text-neutral-400 group hover:text-white transition-colors cursor-pointer">
                    idealab@fisat.ac.in
                  </span>
                </li>
                <li className="flex gap-4 items-center pt-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Server_Online</span>
                  </div>
                </li>
              </ul>
            </div>
          </m.div>

          {/* FINAL SHUTDOWN BAR */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-neutral-600">
              <p className="text-[10px] font-mono uppercase tracking-widest">
                © {new Date().getFullYear()} FISAT_IDEA_LAB // v2.0.4
              </p>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-700">
                 <Activity size={12} />
                 <span>Latency: 24ms</span>
               </div>
               <div className="h-4 w-px bg-white/5 hidden sm:block" />
               <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-tighter">
                 [ Connection_End ]
               </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Scanline */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-orange-500/20 to-transparent blur-sm" />
      </footer>
    </LazyMotion>
  )
}
