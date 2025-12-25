export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

export async function GET() {
  const { supabaseAdmin } = await import("@/lib/supabase-admin")

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
