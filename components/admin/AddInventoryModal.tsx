'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export type InventoryItem = {
  id: string
  name: string
  category: string
  description: string
  quantity_total: number
  quantity_available: number
  is_active: boolean
  created_at: string
}

type Props = {
  open: boolean
  onClose: () => void
  item?: InventoryItem | null
}

export default function AddInventoryModal({
  open,
  onClose,
  item = null,
}: Props) {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    quantity_total: '',
    quantity_available: '',
  })

  /* ----------------------------
     Prefill for edit
  ----------------------------- */
  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        category: item.category,
        description: item.description,
        quantity_total: String(item.quantity_total),
        quantity_available: String(item.quantity_available),
      })
    } else {
      setForm({
        name: '',
        category: '',
        description: '',
        quantity_total: '',
        quantity_available: '',
      })
    }
  }, [item, open])

  if (!open) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.quantity_total) {
      alert('Please fill required fields')
      return
    }

    setLoading(true)

    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      quantity_total: Number(form.quantity_total),
      quantity_available: Number(
        form.quantity_available || form.quantity_total
      ),
    }

    const query = item
      ? supabase
          .from('inventory_items')
          .update(payload)
          .eq('id', item.id)
      : supabase
          .from('inventory_items')
          .insert({
            ...payload,
            is_active: true,
          })

    const { error } = await query

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    onClose()
    location.reload()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-surface rounded-2xl w-full max-w-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading">
            {item ? 'Edit Inventory Item' : 'Add Inventory Item'}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          <input name="name" placeholder="Item name" value={form.name} onChange={handleChange} className="w-full bg-input px-4 py-2 rounded-xl" />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full bg-input px-4 py-2 rounded-xl" />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full bg-input px-4 py-2 rounded-xl" />
          <input name="quantity_total" type="number" placeholder="Total quantity" value={form.quantity_total} onChange={handleChange} className="w-full bg-input px-4 py-2 rounded-xl" />
          <input name="quantity_available" type="number" placeholder="Available quantity" value={form.quantity_available} onChange={handleChange} className="w-full bg-input px-4 py-2 rounded-xl" />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-accent text-accent-foreground"
          >
            {loading
              ? item
                ? 'Updating...'
                : 'Adding...'
              : item
                ? 'Update Item'
                : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  )
}
