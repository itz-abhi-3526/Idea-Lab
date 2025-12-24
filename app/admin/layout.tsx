import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server-client"
import { getUserRole } from "@/lib/get-user-role"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const role = await getUserRole(session.user.id)

  if (role !== "admin") {
    redirect("/unauthorized")
  }

  return children
}
