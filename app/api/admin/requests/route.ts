import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/* GET ALL REQUESTS */
export async function GET() {
  const { data, error } = await supabase
    .from("inventory_requests")
    .select(`
      id,
      requester_name,
      department,
      phone,
      purpose,
      status,
      created_at,
      inventory_request_items (
        quantity,
        inventory_items ( name )
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

/* UPDATE STATUS */
export async function PATCH(req: Request) {
  const { id, status } = await req.json()

  const { error } = await supabase
    .from("inventory_requests")
    .update({ status })
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
