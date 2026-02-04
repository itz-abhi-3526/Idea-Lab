"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* -------------------- LOCAL EVENT TYPE (BUILD FIX) -------------------- */
/* This is intentionally wider than the Event in page.tsx */

type Event = {
  id: string
  title: string
  description: string
  event_type: string | null
  start_datetime: string
  end_datetime: string

  registration_deadline?: string | null
  venue?: string | null
  poster_url?: string | null
  capacity?: number | null

  is_active: boolean
  is_featured: boolean
  display_order: number

  is_paid?: boolean
  price?: number | null
  upi_qr_url?: string | null
}

/* -------------------- FORM STATE -------------------- */

type FormState = {
  title: string
  description: string
  event_type: string
  start_datetime: string
  end_datetime: string
  registration_deadline: string
  venue: string
  poster_url: string
  capacity: number
  is_active: boolean
  is_featured: boolean
  display_order: number

  is_paid: boolean
  price: number
  upi_qr_url: string
}

export default function AddEditEventModal({
  open,
  onClose,
  event,
}: {
  open: boolean
  onClose: () => void
  event: Event | null
}) {
  const [form, setForm] = useState<FormState | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!open) return

    setForm({
      title: event?.title ?? "",
      description: event?.description ?? "",
      event_type: event?.event_type ?? "",
      start_datetime: event?.start_datetime
        ? event.start_datetime.slice(0, 16)
        : "",
      end_datetime: event?.end_datetime
        ? event.end_datetime.slice(0, 16)
        : "",
      registration_deadline: event?.registration_deadline
        ? event.registration_deadline.slice(0, 16)
        : "",
      venue: event?.venue ?? "",
      poster_url: event?.poster_url ?? "",
      capacity: event?.capacity ?? 0,
      is_active: event?.is_active ?? true,
      is_featured: event?.is_featured ?? false,
      display_order: event?.display_order ?? 0,

      is_paid: event?.is_paid ?? false,
      price: event?.price ?? 0,
      upi_qr_url: event?.upi_qr_url ?? "",
    })
  }, [open, event])

  if (!open || !form) return null

  /* ----------------------------
     CLOUDINARY UPLOAD — POSTER
  ----------------------------- */
  const handlePosterUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "idea_lab_profiles")
      data.append("folder", "idea-lab/event-posters")

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      )

      const json = await res.json()
      if (!json.secure_url) throw new Error("Upload failed")

      setForm((prev) =>
        prev ? { ...prev, poster_url: json.secure_url } : prev
      )
    } catch {
      alert("Poster upload failed")
    } finally {
      setUploading(false)
    }
  }

  /* ----------------------------
     CLOUDINARY UPLOAD — UPI QR
  ----------------------------- */
  const handleUpiQrUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "idea_lab_profiles")
      data.append("folder", "idea-lab/upi-qr")

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      )

      const json = await res.json()
      if (!json.secure_url) throw new Error("Upload failed")

      setForm((prev) =>
        prev ? { ...prev, upi_qr_url: json.secure_url } : prev
      )
    } catch {
      alert("UPI QR upload failed")
    } finally {
      setUploading(false)
    }
  }

  /* ---------------------------- */

  const validate = () => {
    if (
      !form.title ||
      !form.description ||
      !form.event_type ||
      !form.start_datetime ||
      !form.end_datetime ||
      !form.registration_deadline ||
      !form.venue
    ) {
      alert("Please fill all required fields.")
      return false
    }

    if (form.capacity <= 0) {
      alert("Capacity must be greater than zero.")
      return false
    }

    if (form.is_paid) {
      if (form.price <= 0) {
        alert("Enter valid amount for paid event.")
        return false
      }

      if (!form.upi_qr_url) {
        alert("Upload UPI QR for paid event.")
        return false
      }
    }

    return true
  }

  const save = async () => {
    if (!validate()) return

    setSaving(true)

    const payload = {
      ...form,
      start_datetime: new Date(form.start_datetime).toISOString(),
      end_datetime: new Date(form.end_datetime).toISOString(),
      registration_deadline: new Date(
        form.registration_deadline
      ).toISOString(),
    }

    if (event) {
      await supabase.from("events").update(payload).eq("id", event.id)
    } else {
      await supabase.from("events").insert(payload)
    }

    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center px-4">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-zinc-900/90 border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8">

        {/* HEADER */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            {event ? "Edit Event" : "Create Event"}
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure event details
          </p>
        </div>

        {/* POSTER */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Event Poster</p>

          <div className="flex gap-4 items-start">
            <div className="relative w-36 h-48 rounded-2xl bg-zinc-800 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
              {form.poster_url ? (
                <img
                  src={form.poster_url}
                  alt="Poster preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-muted-foreground px-3 text-center">
                  No poster uploaded
                </span>
              )}
            </div>

            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterUpload}
                className="hidden"
              />
              <span className="px-4 py-2 rounded-xl bg-muted/80 text-sm cursor-pointer hover:bg-muted transition">
                {uploading ? "Uploading…" : "Upload / Replace"}
              </span>
            </label>
          </div>
        </div>

        {/* INPUTS */}
        {[
          ["title", "Title"],
          ["event_type", "Event Type"],
          ["venue", "Venue"],
        ].map(([key, label]) => (
          <input
            key={key}
            placeholder={label}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full h-12 rounded-xl bg-zinc-800/70 px-4 text-sm"
          />
        ))}

        {/* DATES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            ["start_datetime", "Start Date & Time"],
            ["end_datetime", "End Date & Time"],
            ["registration_deadline", "Registration Deadline"],
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex flex-col gap-1 text-xs text-muted-foreground"
            >
              {label}
              <input
                type="datetime-local"
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="h-12 rounded-xl bg-zinc-800/70 px-4 text-sm"
              />
            </label>
          ))}
        </div>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Event description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full min-h-[120px] rounded-xl bg-zinc-800/70 px-4 py-3 text-sm"
        />

        {/* TOGGLES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BooleanSelect
            label="Active"
            value={form.is_active}
            onChange={(v) =>
              setForm({ ...form, is_active: v })
            }
          />
          <BooleanSelect
            label="Featured"
            value={form.is_featured}
            onChange={(v) =>
              setForm({ ...form, is_featured: v })
            }
          />
          <BooleanSelect
            label="Paid Event"
            value={form.is_paid}
            onChange={(v) =>
              setForm({
                ...form,
                is_paid: v,
                ...(v === false && { price: 0, upi_qr_url: "" }),
              })
            }
          />
        </div>

        {/* NUMBERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm text-muted-foreground">
            Capacity
            <input
              type="number"
              value={form.capacity}
              onChange={(e) =>
                setForm({
                  ...form,
                  capacity: Number(e.target.value),
                })
              }
              className="h-12 rounded-xl bg-zinc-800/70 px-4 text-sm"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-muted-foreground">
            Display Order
            <input
              type="number"
              value={form.display_order}
              onChange={(e) =>
                setForm({
                  ...form,
                  display_order: Number(e.target.value),
                })
              }
              className="h-12 rounded-xl bg-zinc-800/70 px-4 text-sm"
            />
          </label>
        </div>

        {/* PAID EVENT CONDITIONAL */}
        {form.is_paid && (
          <div className="space-y-6 rounded-2xl border border-white/10 p-4">
            <h4 className="text-sm font-medium">Payment Details</h4>

            <label className="flex flex-col gap-1 text-sm text-muted-foreground">
              Amount (₹)
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Number(e.target.value),
                  })
                }
                className="h-12 rounded-xl bg-zinc-800/70 px-4 text-sm"
              />
            </label>

            <div className="space-y-3">
              <p className="text-sm font-medium">UPI QR Code</p>

              {form.upi_qr_url && (
                <img
                  src={form.upi_qr_url}
                  className="w-40 rounded-xl border border-white/10"
                />
              )}

              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpiQrUpload}
                  className="hidden"
                />
                <span className="px-4 py-2 rounded-xl bg-muted/80 text-sm cursor-pointer hover:bg-muted transition">
                  {uploading ? "Uploading…" : "Upload QR"}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-muted-foreground hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving || uploading}
            className="px-6 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium"
          >
            {saving ? "Saving…" : "Save Event"}
          </button>
        </div>
      </div>
    </div>
  )
}

function BooleanSelect({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-muted-foreground">
      {label}
      <select
        value={String(value)}
        onChange={(e) => onChange(e.target.value === "true")}
        className="h-12 rounded-xl bg-zinc-800/70 px-3 text-sm"
      >
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
      </select>
    </label>
  )
}
