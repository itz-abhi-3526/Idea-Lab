"use client"

import { supabase } from "@/lib/supabase"

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
      }}
      className="text-sm text-muted-foreground hover:text-foreground transition"
    >
      Logout
    </button>
  )
}
