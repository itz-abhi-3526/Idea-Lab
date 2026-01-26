"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Event } from "@/app/admin/events/page"

type FormState = {
  title: string
  description: string
  event_type: string
  start_datetime: string
  end_datetime: string
  venue: string
  poster_url: string
  registration_link: string
  is_registration_open: boolean
  is_active: boolean
  is_featured: boolean
  display_order: number
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
      venue: event?.venue ?? "",
      poster_url: event?.poster_url ?? "",
      registration_link: event?.registration_link ?? "",
      is_registration_open: event?.is_registration_open ?? true,
      is_active: event?.is_active ?? true,
      is_featured: event?.is_featured ?? false,
      display_order: event?.display_order ?? 0,
    })
  }, [open, event])

  if (!open || !form) return null

  /* ----------------------------
     Cloudinary Upload (Unsigned)
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
      if (!res.ok) {
        throw new Error(json.error?.message || "Upload failed")
      }

      setForm({ ...form, poster_url: json.secure_url })
    } catch (err) {
      console.error(err)
      alert("Poster upload failed")
    } finally {
      setUploading(false)
    }
  }

  const validate = () => {
    const missing = Object.entries(form).filter(
      ([, v]) =>
        v === "" ||
        v === null ||
        v === undefined ||
        (typeof v === "number" && isNaN(v))
    )

    if (missing.length > 0) {
      alert("All fields are required.")
      return false
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-zinc-900/80 border border-white/10 shadow-2xl p-6 space-y-6">

        {/* Header */}
        <h2 className="text-xl font-semibold tracking-tight">
          {event ? "Edit Event" : "Add Event"}
        </h2>

        {/* Poster Upload (RECTANGULAR) */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Event Poster</p>

          <div className="flex gap-4 items-start">
            <div className="relative w-32 h-44 rounded-xl bg-zinc-800/60 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
              {form.poster_url ? (
                <img
                  src={form.poster_url}
                  alt="Poster preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-muted-foreground text-center px-2">
                  No poster uploaded
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterUpload}
                  className="hidden"
                />
                <span className="inline-block px-4 py-2 rounded-xl bg-muted text-sm cursor-pointer">
                  {uploading ? "Uploading…" : "Upload / Replace"}
                </span>
              </label>

              <p className="text-xs text-muted-foreground max-w-[220px]">
                Recommended: vertical poster, JPG or PNG.
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        {[
          ["title", "Title"],
          ["event_type", "Event Type"],
          ["venue", "Venue"],
          ["poster_url", "Poster URL (auto-filled)"],
          ["registration_link", "Registration Link"],
        ].map(([key, label]) => (
          <input
            key={key}
            required
            placeholder={label}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full h-12 rounded-xl bg-zinc-800/60 px-4 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
          />
        ))}

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="datetime-local"
            value={form.start_datetime}
            onChange={(e) =>
              setForm({ ...form, start_datetime: e.target.value })
            }
            className="h-12 rounded-xl bg-zinc-800/60 px-4 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
          />
          <input
            type="datetime-local"
            value={form.end_datetime}
            onChange={(e) =>
              setForm({ ...form, end_datetime: e.target.value })
            }
            className="h-12 rounded-xl bg-zinc-800/60 px-4 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full min-h-[110px] rounded-xl bg-zinc-800/60 px-4 py-3 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
        />

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <BooleanSelect
            label="Active"
            value={form.is_active}
            onChange={(v) => setForm({ ...form, is_active: v })}
          />
          <BooleanSelect
            label="Featured"
            value={form.is_featured}
            onChange={(v) =>
              setForm({ ...form, is_featured: v })
            }
          />
          <BooleanSelect
            label="Registration Open"
            value={form.is_registration_open}
            onChange={(v) =>
              setForm({
                ...form,
                is_registration_open: v,
              })
            }
          />
        </div>

        {/* Display Order */}
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
            className="h-12 rounded-xl bg-zinc-800/60 px-4 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
          />
        </label>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-muted-foreground hover:bg-white/5 transition"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving || uploading}
            className="px-6 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
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
        className="h-12 rounded-xl bg-zinc-800/60 px-3 text-sm outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-accent transition"
      >
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
      </select>
    </label>
  )
}
