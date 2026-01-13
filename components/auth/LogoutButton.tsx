"use client"

import { supabase } from "@/lib/supabase"

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
      }}
      className="
        text-sm
        px-3 py-2
        rounded-lg
        text-muted-foreground
        hover:text-foreground
        hover:bg-muted/50
        transition
        w-full sm:w-auto
        text-left sm:text-center
      "
    >
      Logout
    </button>
  )
}
