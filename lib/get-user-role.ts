import { supabaseAdmin } from "@/lib/supabase-admin"

export async function getUserRole(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role, is_active")
    .eq("user_id", userId)
    .single()

  if (error || !data || !data.is_active) {
    return null
  }

  return data.role
}
