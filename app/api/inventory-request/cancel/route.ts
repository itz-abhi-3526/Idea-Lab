import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { requestId, userId } = await req.json()

    if (!requestId || !userId) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const { error } = await supabase
      .from("inventory_requests")
      .update({ status: "cancelled" })
      .eq("id", requestId)
      .eq("user_id", userId)
      .eq("status", "submitted")

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
