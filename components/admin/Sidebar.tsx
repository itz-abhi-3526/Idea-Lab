'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Execom', href: '/admin/execom' },
  { name: 'Ideas', href: '/admin/ideas' },
  { name: 'Inventory', href: '/admin/inventory' },
  { name: 'Inventory Requests', href: '/admin/inventory/requests' },
  { name: 'Events', href: '/admin/events' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="
        w-full
        md:w-64
        lg:w-72
        border-b md:border-b-0 md:border-r
        border-border
        bg-background
        px-4 sm:px-6
        py-6 sm:py-8
        sticky top-0
        z-40
      "
    >
      <h2 className="text-lg sm:text-xl font-heading tracking-wide mb-6 sm:mb-10">
        IDEA Lab Admin
      </h2>

      <nav className="space-y-2 sm:space-y-3">
        {links.map((link) => {
          const active = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                block rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all
                ${
                  active
                    ? 'bg-card text-accent border border-accent/40'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
                }
              `}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
