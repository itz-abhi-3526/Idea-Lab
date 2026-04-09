export async function uploadImageToCloudinary(file: File) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", uploadPreset)
  formData.append("folder", "incubation")

  const res = await fetch(
    `https://idea-lab-backend.onrender.com/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!res.ok) {
    throw new Error("Cloudinary upload failed")
  }

  const data = await res.json()
  return data.secure_url as string
}
