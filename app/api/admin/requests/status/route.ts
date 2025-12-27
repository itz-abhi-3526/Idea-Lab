import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("inventory_requests")
    .select("status")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const totalRequests = data.length
  const pendingRequests = data.filter(
    (r) => r.status === "pending"
  ).length
  const approvedRequests = data.filter(
    (r) => r.status === "approved"
  ).length
  const rejectedRequests = data.filter(
    (r) => r.status === "rejected"
  ).length

  return NextResponse.json({
    totalRequests,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
  })
}
