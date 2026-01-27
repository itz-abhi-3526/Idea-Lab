'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

/* --------------------------------
   FIXED TYPE (matches admin page)
--------------------------------- */
export type ExecomMember = {
  id: string
  name: string
  designation: string          // ✅ REQUIRED by admin page
  role: string
  image_url: string | null
  display_order: number
  is_active: boolean
}

type Props = {
  open: boolean
  onClose: () => void
  member?: ExecomMember | null
}

export default function AddExecomModal({
  open,
  onClose,
  member = null,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  /* --------------------------------
     Local form state
     (department is UI-only alias)
  --------------------------------- */
  const [form, setForm] = useState({
    name: '',
    department: '',
    role: '',
    image_url: '',
    display_order: '',
  })

  /* ----------------------------
     Prefill when editing
  ----------------------------- */
  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        department: member.designation,   // ✅ map BACK
        role: member.role,
        image_url: member.image_url || '',
        display_order: String(member.display_order),
      })
    } else {
      setForm({
        name: '',
        department: '',
        role: '',
        image_url: '',
        display_order: '',
      })
    }
  }, [member, open])

  if (!open) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  /* ----------------------------
     Cloudinary Upload (Unsigned)
  ----------------------------- */
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'idea_lab_profiles')

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      )

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error?.message || 'Upload failed')
      }

      setForm(prev => ({
        ...prev,
        image_url: json.secure_url,
      }))
    } catch (err) {
      console.error(err)
      alert('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  /* ----------------------------
     Submit
     (department → designation)
  ----------------------------- */
  const handleSubmit = async () => {
    if (!form.name || !form.department || !form.role) {
      alert('Please fill all required fields')
      return
    }

    setLoading(true)

    const payload = {
      name: form.name,
      designation: form.department,     // ✅ FIX
      role: form.role,
      image_url: form.image_url || null,
      display_order: Number(form.display_order),
    }

    const query = member
      ? supabase
          .from('execom_members')
          .update(payload)
          .eq('id', member.id)
      : supabase
          .from('execom_members')
          .insert({
            ...payload,
            is_active: true,
          })

    const { error } = await query

    setLoading(false)

    if (error) {
      console.error(error)
      alert(error.message)
      return
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-900/80 border border-white/10 shadow-2xl p-7 sm:p-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            {member ? 'Edit Execom Member' : 'Add Execom Member'}
          </h2>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-white/5 transition"
          >
            ✕
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-zinc-800 overflow-hidden ring-1 ring-white/10">
              {form.image_url ? (
                <img
                  src={form.image_url}
                  alt="Execom"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                  No Image
                </div>
              )}
            </div>

            <label className="absolute -bottom-1 -right-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs cursor-pointer shadow-lg">
                ✎
              </span>
            </label>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Profile Photo</p>
            <p className="text-xs text-muted-foreground">
              Square image · JPG or PNG
            </p>
            {uploading && (
              <p className="text-xs text-muted-foreground">
                Uploading…
              </p>
            )}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {[
            { name: 'name', placeholder: 'Full Name' },
            { name: 'department', placeholder: 'Department' },
            { name: 'role', placeholder: 'Role (e.g. Coordinator)' },
          ].map(field => (
            <input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={(form as any)[field.name]}
              onChange={handleChange}
              className="w-full h-12 rounded-xl bg-zinc-800/60 px-4 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
            />
          ))}

          <input
            name="display_order"
            type="number"
            placeholder="Display Order"
            value={form.display_order}
            onChange={handleChange}
            className="w-full h-12 rounded-xl bg-zinc-800/60 px-4 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-muted-foreground hover:bg-white/5 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="px-6 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? member
                ? 'Updating…'
                : 'Adding…'
              : member
              ? 'Update Member'
              : 'Add Member'}
          </button>
        </div>

      </div>
    </div>
  )
}
