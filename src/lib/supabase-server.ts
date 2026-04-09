import { createServerClient } from "@supabase/ssr"
import { supabaseUrl, supabaseAnonKey } from "./supabase"

export function createSupabaseServerClient(req: any, res: any) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return req.cookies?.[name]
      },
      set(name: string, value: string, options: any) {
        res.cookie(name, value, options)
      },
      remove(name: string, options: any) {
        res.clearCookie(name, options)
      },
    },
  })
}