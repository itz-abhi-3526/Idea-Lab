import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { userId, requester, items } = await req.json()

    if (!userId || !requester || !items?.length) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      )
    }

    const { data: request, error } = await supabase
      .from("inventory_requests")
      .insert({
        user_id: userId,
        requester_name: requester.name,
        college: requester.college,
        department: requester.department,
        phone: requester.phone,
        purpose: requester.purpose,
        status: "submitted",
      })
      .select()
      .single()

    if (error) throw error

    const rows = items.map((i: any) => ({
      request_id: request.id,
      item_id: i.id,
      quantity: i.quantity,
    }))

    const { error: itemsError } = await supabase
      .from("inventory_request_items")
      .insert(rows)

    if (itemsError) throw itemsError

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    )
  }
}
