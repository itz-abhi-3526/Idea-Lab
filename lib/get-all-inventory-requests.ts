import { supabase } from "@/lib/supabase"

export type InventoryRequest = {
  id: string
  purpose: string
  status: string
  requester_name: string
  email: string
  inventory_request_items: {
    quantity: number
    inventory_items: {
      name: string
    }[] | null
  }[]
}

export async function getAllInventoryRequests(): Promise<InventoryRequest[]> {
  const { data, error } = await supabase
    .from("inventory_requests")
    .select(`
      id,
      purpose,
      status,
      requester_name,
      email,
      inventory_request_items (
        quantity,
        inventory_items ( name )
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data ?? []
}
