'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '../../components/admin/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      if (user.user_metadata?.role !== 'admin') {
        router.replace('/')
        return
      }

      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return <div className="p-6 text-sm text-muted-foreground">Checking access…</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">

      {/* ================================================= */}
      {/* Mobile / Tablet Top Bar                           */}
      {/* ================================================= */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden h-14 flex items-center justify-between px-4 bg-background/80 backdrop-blur-xl border-b border-accent/10">
        <span className="font-semibold text-sm">IDEA Lab Admin</span>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-accent/10 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ================================================= */}
      {/* Desktop Sidebar                                  */}
      {/* ================================================= */}
      <aside className="hidden lg:block w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* ================================================= */}
      {/* Mobile / Tablet Sidebar Drawer                   */}
      {/* ================================================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-background/90 backdrop-blur-xl border-r border-accent/10 lg:hidden"
            >
              <div className="h-14 flex items-center justify-between px-4 border-b border-accent/10">
                <span className="font-semibold text-sm">IDEA Lab Admin</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-accent/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================================================= */}
      {/* Main Content                                     */}
      {/* ================================================= */}
      <main className="flex-1 pt-14 lg:pt-0 p-6 sm:p-8 lg:p-10">
        {children}
      </main>
    </div>
  )
}
