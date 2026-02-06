"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, MapPin, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-background/80 backdrop-blur-xl">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-14 sm:py-20">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12"
        >

          {/* Identity */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold font-[family-name:var(--font-heading)] tracking-tight">
              FISAT AICTE IDEA Lab
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              The AICTE IDEA Lab at FISAT serves as a multidisciplinary innovation
              and prototyping hub where students explore ideas, build solutions,
              and develop practical engineering skills through hands-on learning
              and collaboration.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/idealab_fisat/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-accent/20 transition"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/company/idealab-fisat/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-accent/20 transition"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/events", label: "Events" },
                { href: "/inventory", label: "Inventory" },
                { href: "/execom", label: "ExeCom" },
                { href: "#coordinator", label: "Incubation Request" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="relative inline-block text-muted-foreground hover:text-accent transition"
                  >
                    <span className="relative z-10">
                      {item.label}
                    </span>
                    <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent scale-x-0 hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>
                  Federal Institute of Science and Technology (FISAT),
                  Hormis Nagar, Angamaly, Kerala, India
                </span>
              </li>
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                idealab@fisat.ac.in
              </li>
            </ul>
          </div>

        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground text-center sm:text-left"
        >
          <p>
            © {new Date().getFullYear()} FISAT AICTE IDEA Lab. All rights reserved.
          </p>
        </motion.div>

      </div>
    </footer>
  )
}
