import { supabaseAdmin } from "@/lib/supabase-admin"

export async function getUserIdeas(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("idea_submissions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return data
}
