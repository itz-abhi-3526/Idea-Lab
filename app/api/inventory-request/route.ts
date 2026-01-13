import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, requester, items } = body

    if (!userId || !requester || !items?.length) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      )
    }

    /* -----------------------------
       VALIDATE STOCK
    ----------------------------- */
    for (const item of items) {
      const { data: inv, error } = await supabase
        .from("inventory_items")
        .select("name, quantity_available")
        .eq("id", item.id)
        .single()

      if (error || !inv) {
        return NextResponse.json(
          { error: "Invalid inventory item" },
          { status: 400 }
        )
      }

      if (inv.quantity_available < item.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for ${inv.name}`,
          },
          { status: 400 }
        )
      }
    }

    /* -----------------------------
       CREATE REQUEST
    ----------------------------- */
    const { data: request, error: reqErr } =
      await supabase
        .from("inventory_requests")
        .insert({
          user_id: userId,
          requester_name: requester.name,
          college: requester.college,
          phone: requester.phone,
          purpose: requester.purpose,
          status: "submitted",
        })
        .select()
        .single()

    if (reqErr) {
      return NextResponse.json(
        { error: reqErr.message },
        { status: 500 }
      )
    }

    /* -----------------------------
       REQUEST ITEMS
    ----------------------------- */
    const itemsPayload = items.map((i: any) => ({
      request_id: request.id,
      item_id: i.id,
      quantity: i.quantity,
    }))

    const { error: itemsErr } = await supabase
      .from("inventory_request_items")
      .insert(itemsPayload)

    if (itemsErr) {
      return NextResponse.json(
        { error: itemsErr.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
