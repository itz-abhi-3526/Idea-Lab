import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id")

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { data, error } = await supabaseAdmin
    .from("inventory_requests")
    .select(`
      id,
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
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
