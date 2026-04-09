import { supabase } from "./supabase"

export async function uploadSTL(file: File) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const path = `${user.id}/${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from("incubation-stl")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from("incubation-stl")
    .getPublicUrl(path)

  return data.publicUrl
}
