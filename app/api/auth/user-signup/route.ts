export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { supabaseAdmin } = await import("@/lib/supabase-admin")

  const { email, password, role } = await req.json()

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message || "User creation failed" },
      { status: 400 }
    )
  }

  await supabaseAdmin.from("user_roles").insert({
    user_id: data.user.id,
    role,
  })

  return NextResponse.json({ success: true })
}
