import { supabase } from "@/lib/supabase"

export async function uploadSTLToSupabase(file: File) {
  const filePath = `stl/${crypto.randomUUID()}-${file.name}`

  const { error } = await supabase.storage
    .from("incubation-stl")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from("incubation-stl")
    .getPublicUrl(filePath)

  return data.publicUrl
}
