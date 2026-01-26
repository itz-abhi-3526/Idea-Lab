"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const UPLOAD_PRESET = "idea_lab_profiles"

/* ---------- Image compression (mobile-safe) ---------- */
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }

    img.onload = () => {
      const canvas = document.createElement("canvas")

      const MAX_WIDTH = 1024
      const scale = Math.min(1, MAX_WIDTH / img.width)

      canvas.width = img.width * scale
      canvas.height = img.height * scale

      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob!], file.name.replace(/\.\w+$/, ".jpg"), {
              type: "image/jpeg",
            })
          )
        },
        "image/jpeg",
        0.8
      )
    }

    reader.readAsDataURL(file)
  })
}

export default function ProfilePhotoUpload({
  userId,
  onUploaded,
}: {
  userId: string
  onUploaded: (url: string) => void
}) {
  const [progress, setProgress] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const uploadFile = async (file: File) => {
    try {
      setProgress(0)

      const compressed = await compressImage(file)

      const form = new FormData()
      form.append("file", compressed)
      form.append("upload_preset", UPLOAD_PRESET)

      /* ---------- XMLHttpRequest for progress ---------- */
      const xhr = new XMLHttpRequest()
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
      )

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100))
        }
      }

      xhr.onload = async () => {
        if (xhr.status !== 200) {
          console.error(xhr.responseText)
          throw new Error("Upload failed")
        }

        const data = JSON.parse(xhr.responseText)
        if (!data.secure_url) throw data

        await supabase
          .from("users")
          .update({ avatar_url: data.secure_url })
          .eq("id", userId)

        setProgress(null)
        onUploaded(data.secure_url)
      }

      xhr.onerror = () => {
        throw new Error("Network error")
      }

      xhr.send(form)
    } catch (err) {
      console.error("Avatar upload failed:", err)
      setProgress(null)
      alert("Failed to upload profile photo")
    }
  }

  return (
    <div className="space-y-2">
      {/* ---------- Change Photo Button ---------- */}
    <label className="text-sm text-accent cursor-pointer hover:underline">
      Change photo
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            uploadFile(e.target.files[0])
          }
        }}
      />
    </label>

      {/* ---------- Progress Bar ---------- */}
      {progress !== null && (
        <div className="space-y-1">
          <div className="h-2 w-full overflow-hidden rounded bg-muted">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Uploading… {progress}%
          </p>
        </div>
      )}
    </div>
  )
}
