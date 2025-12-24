import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: req.headers.get("authorization") ?? "",
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }

  const { error } = await supabaseAdmin
    .from("idea_submissions")
    .insert({
      student_name: body.student_name,
      email: body.email,
      phone: body.phone,
      department: body.department,
      year: body.year,
      idea_title: body.idea_title,
      idea_description: body.idea_description,
      domain: body.domain,
      team_size: body.team_size,
      status: "submitted",
      user_id: user.id, // ✅ GUARANTEED LINK
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
