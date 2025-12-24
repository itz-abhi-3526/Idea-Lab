import { supabaseAdmin } from "@/lib/supabase-server"

export async function getUserIdeas(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("idea_submissions")
    .select(`
      id,
      idea_title,
      domain,
      status,
      created_at
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch user ideas")
  }

  return data
}
