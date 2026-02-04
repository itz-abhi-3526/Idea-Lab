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
  { name: 'Users', href: '/admin/users' },
  { name: 'Incubation Requests', href: '/admin/incubation-requests' },
  { name: 'Event Registrations', href: '/admin/events/registrations' },
  { name: 'Event Feedback', href: '/admin/events/feedback' },
]

export default function Sidebar({
  onNavigate,
}: {
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className="
        h-full
        w-full
        lg:w-72
        bg-background
        border-border
        px-4 sm:px-6
        py-4 sm:py-6
      "
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-heading tracking-wide">
          IDEA Lab Admin
        </h2>
      </div>

      {/* Scrollable Nav (important for mobile) */}
      <nav className="space-y-2 sm:space-y-3 overflow-y-auto max-h-[calc(100vh-5rem)] pr-1">
        {links.map((link) => {
          const active = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
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
