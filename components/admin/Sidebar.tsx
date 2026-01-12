'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Execom', href: '/admin/execom' },
  { name: 'Ideas', href: '/admin/ideas' },
  { name: 'Inventory', href: '/admin/inventory' },
  { name: 'Inventory Requests', href: '/admin/inventory/requests'},
  { name: "Events", href: "/admin/events"}
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 border-r border-border bg-background px-6 py-8">
      <h2 className="text-xl font-heading tracking-wide mb-10">
        IDEA Lab Admin
      </h2>

      <nav className="space-y-3">
        {links.map(link => {
          const active = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-xl px-4 py-3 transition-all
                ${
                  active
                    ? 'bg-card text-accent border border-accent/40'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
                }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
