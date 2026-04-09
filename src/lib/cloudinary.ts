export async function uploadImageToCloudinary(file: File) {

  const formData = new FormData()
  formData.append("file", file)

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
  return data.url as string
}
