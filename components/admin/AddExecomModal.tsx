'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export type ExecomMember = {
  id: string
  name: string
  designation: string
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

  const [form, setForm] = useState({
    name: '',
    designation: '',
    role: '',
    image_url: '',
    display_order: '',
  })

  /* ----------------------------
     Prefill form when editing
  ----------------------------- */
  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        designation: member.designation,
        role: member.role,
        image_url: member.image_url || '',
        display_order: String(member.display_order),
      })
    } else {
      setForm({
        name: '',
        designation: '',
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

  const handleSubmit = async () => {
    if (!form.name || !form.designation || !form.role) {
      alert('Please fill all required fields')
      return
    }

    setLoading(true)

    const payload = {
      name: form.name,
      designation: form.designation,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 sm:px-6">
      <div className="glass-surface rounded-2xl w-full max-w-md sm:max-w-lg p-5 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-heading">
            {member ? 'Edit Execom Member' : 'Add Execom Member'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3 sm:space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-input rounded-xl px-4 py-2 text-sm sm:text-base outline-none"
          />

          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            className="w-full bg-input rounded-xl px-4 py-2 text-sm sm:text-base outline-none"
          />

          <input
            name="role"
            placeholder="Role (eg: Co-ordinator)"
            value={form.role}
            onChange={handleChange}
            className="w-full bg-input rounded-xl px-4 py-2 text-sm sm:text-base outline-none"
          />

          <input
            name="image_url"
            placeholder="Image URL (Cloudinary)"
            value={form.image_url}
            onChange={handleChange}
            className="w-full bg-input rounded-xl px-4 py-2 text-sm sm:text-base outline-none"
          />

          <input
            name="display_order"
            type="number"
            placeholder="Display Order"
            value={form.display_order}
            onChange={handleChange}
            className="w-full bg-input rounded-xl px-4 py-2 text-sm sm:text-base outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 sm:pt-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm sm:text-base"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition text-sm sm:text-base"
          >
            {loading
              ? member
                ? 'Updating...'
                : 'Adding...'
              : member
              ? 'Update Member'
              : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  )
}
