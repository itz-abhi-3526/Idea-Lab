"use client"

import { supabase } from "@/lib/supabase"

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const UPLOAD_PRESET = "idea_lab_profiles"

export default function ProfilePhotoUpload({
  userId,
  onUploaded,
}: {
  userId: string
  onUploaded: (url: string) => void
}) {
  const handleUpload = async (file: File) => {
    try {
      const form = new FormData()
      form.append("file", file)
      form.append("upload_preset", UPLOAD_PRESET)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: form }
      )

      const data = await res.json()
      if (!data.secure_url) throw data

      // ✅ Save to public.users ONLY
      await supabase
        .from("users")
        .update({ avatar_url: data.secure_url })
        .eq("id", userId)

      onUploaded(data.secure_url)
    } catch (err) {
      console.error("Avatar upload failed:", err)
      alert("Failed to upload profile photo")
    }
  }

  return (
    <label className="text-sm text-accent cursor-pointer hover:underline">
      Change photo
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0])
          }
        }}
      />
    </label>
  )
}
