import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("inventory_requests")
    .select(`
      id,
      status,
      purpose,
      created_at,
      user_id,
      inventory_request_items (
        quantity,
        inventory_items (
          name
        )
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch inventory requests" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
