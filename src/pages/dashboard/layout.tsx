
import { useEffect, useState } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { supabase } from "@/lib/supabase"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login", { replace: true })
      } else {
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login", { replace: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  if (loading) {
    return <div className="p-6">Checking session...</div>
  }

  return <Outlet />
}

