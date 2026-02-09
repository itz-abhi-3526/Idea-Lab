import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json()

    if (!requestId) {
      return NextResponse.json(
        { error: "requestId missing" },
        { status: 400 }
      )
    }

    const { data: request, error } = await supabaseAdmin
      .from("inventory_requests")
      .select(`
        id,
        status,
        inventory_request_items:inventory_request_items!inventory_request_items_request_id_fkey (
          id,
          quantity,
          inventory_items:inventory_items!inventory_request_items_item_id_fkey (
            id,
            quantity_available,
            name
          )
        )
      `)
      .eq("id", requestId)
      .maybeSingle()

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!request) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      )
    }

    if (request.status !== "submitted") {
      return NextResponse.json(
        { error: "Request already processed" },
        { status: 400 }
      )
    }

    const items = request.inventory_request_items ?? []

    if (items.length === 0) {
      return NextResponse.json(
        { error: "No items found for this request" },
        { status: 400 }
      )
    }

    /* -----------------------
       Validate stock
    ----------------------- */

    for (const item of items as any[]) {
      const inv = item.inventory_items   // ✅ SINGLE OBJECT

      if (!inv) {
        return NextResponse.json(
          { error: "Invalid inventory reference" },
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

    /* -----------------------
       Deduct stock
    ----------------------- */

    for (const item of items as any[]) {
      const inv = item.inventory_items

      const newQty =
        inv.quantity_available - item.quantity

      const { error: updErr } = await supabaseAdmin
        .from("inventory_items")
        .update({
          quantity_available: newQty,
        })
        .eq("id", inv.id)

      if (updErr) {
        console.error(updErr)
        return NextResponse.json(
          { error: "Failed updating inventory" },
          { status: 500 }
        )
      }
    }

    /* -----------------------
       Mark request approved
    ----------------------- */

    const { error: statusErr } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "approved" })
      .eq("id", requestId)

    if (statusErr) {
      console.error(statusErr)
      return NextResponse.json(
        { error: "Failed updating request status" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    )
  }
}

