"use client"

import Link from "next/link"
import { Mail, MapPin, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-background/80 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-14 sm:py-20">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">

          {/* Identity */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold font-[family-name:var(--font-heading)]">
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
              <a
                href="https://www.instagram.com/idealab_fisat/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:bg-accent/20 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/idealab-fisat/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:bg-accent/20 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-accent transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="hover:text-accent transition">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/execom" className="hover:text-accent transition">
                  ExeCom
                </Link>
              </li>
              <li>
                <Link href="#coordinator" className="hover:text-accent transition">
                  Incubation Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span>
                  Federal Institute of Science and Technology (FISAT),
                  Hormis Nagar, Angamaly, Kerala, India
                </span>
              </li>
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-accent" />
                idealab@fisat.ac.in
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} FISAT AICTE IDEA Lab. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
