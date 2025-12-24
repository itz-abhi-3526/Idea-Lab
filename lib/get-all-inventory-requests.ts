import { supabaseAdmin } from "@/lib/supabase-server"

export async function getAllInventoryRequests() {
  const { data, error } = await supabaseAdmin
    .from("inventory_requests")
    .select(`
      id,
      requester_name,
      email,
      purpose,
      status,
      created_at,
      inventory_request_items (
        quantity,
        inventory_items (
          name
        )
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch inventory requests")
  }

  return data
}
