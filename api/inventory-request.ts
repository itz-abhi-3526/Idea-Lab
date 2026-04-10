import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables for inventory API")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export const config = {
  runtime: "edge",
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const body = await req.json()
    const { userId, email, requester, items } = body as {
      userId?: string
      email?: string
      requester?: { name?: string; college?: string; department?: string; phone?: string; purpose?: string }
      items?: { id: string; quantity: number }[]
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400, headers: { "Content-Type": "application/json" } })
    }
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), { status: 400, headers: { "Content-Type": "application/json" } })
    }
    if (!requester || !requester.name || !requester.college || !requester.department || !requester.phone || !requester.purpose) {
      return new Response(JSON.stringify({ error: "Missing requester details" }), { status: 400, headers: { "Content-Type": "application/json" } })
    }
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items selected" }), { status: 400, headers: { "Content-Type": "application/json" } })
    }

    for (const item of items) {
      const { data: inv, error: invError } = await supabaseAdmin
        .from("inventory_items")
        .select("name, quantity_available")
        .eq("id", item.id)
        .single()

      if (invError || !inv) {
        return new Response(JSON.stringify({ error: "Invalid inventory item" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      if (inv.quantity_available < item.quantity) {
        return new Response(JSON.stringify({ error: `Insufficient stock for ${inv.name}` }), { status: 400, headers: { "Content-Type": "application/json" } })
      }
    }

    const { data: requestData, error: requestError } = await supabaseAdmin
      .from("inventory_requests")
      .insert({
        user_id: userId,
        email,
        requester_name: requester.name,
        college: requester.college,
        department: requester.department,
        phone: requester.phone,
        purpose: requester.purpose,
        status: "submitted",
      })
      .select("id")
      .maybeSingle()

    if (requestError || !requestData) {
      return new Response(JSON.stringify({ error: requestError?.message || "Failed to create request" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    const requestItems = items.map((item) => ({
      request_id: requestData.id,
      item_id: item.id,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabaseAdmin.from("inventory_request_items").insert(requestItems)

    if (itemsError) {
      return new Response(JSON.stringify({ error: itemsError.message }), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({ success: true, requestId: requestData.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Inventory request API error:", error)
    return new Response(JSON.stringify({ error: error?.message || "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}
