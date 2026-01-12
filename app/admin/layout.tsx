'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '../../components/admin/Sidebar'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

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
    return <div className="p-6">Checking access…</div>
  }

  return (
  <div className="flex min-h-screen bg-background text-foreground">
    <Sidebar />
    <main className="flex-1 p-10">
      {children}
    </main>
  </div>
)
}
