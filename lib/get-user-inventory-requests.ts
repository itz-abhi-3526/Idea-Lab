import { supabaseAdmin } from "@/lib/supabase-server"

export async function getUserInventoryRequests(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("inventory_requests")
    .select(`
      id,
      status,
      purpose,
      created_at,
      inventory_request_items (
        quantity,
        inventory_items (
          name
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch inventory requests")
  }

  return data
}
