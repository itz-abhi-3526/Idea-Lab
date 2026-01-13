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
      is_registration_open:
        event?.is_registration_open ?? true,
      is_active: event?.is_active ?? true,
      is_featured: event?.is_featured ?? false,
      display_order: event?.display_order ?? 0,
    })
  }, [open, event])

  if (!open || !form) return null

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
      start_datetime: new Date(
        form.start_datetime
      ).toISOString(),
      end_datetime: new Date(
        form.end_datetime
      ).toISOString(),
    }

    if (event) {
      await supabase
        .from("events")
        .update(payload)
        .eq("id", event.id)
    } else {
      await supabase.from("events").insert(payload)
    }

    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center px-3 sm:px-6">
      <div
        className="
          glass-surface
          rounded-t-2xl sm:rounded-2xl
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-y-auto
          p-4 sm:p-6
          space-y-4
        "
      >
        <h2 className="text-lg sm:text-xl font-heading">
          {event ? "Edit Event" : "Add Event"}
        </h2>

        {[
          ["title", "Title"],
          ["event_type", "Event Type"],
          ["venue", "Venue"],
          ["poster_url", "Poster URL"],
          ["registration_link", "Registration Link"],
        ].map(([key, label]) => (
          <input
            key={key}
            required
            placeholder={label}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value,
              })
            }
            className="w-full bg-input px-4 py-2 rounded-xl outline-none text-sm sm:text-base"
          />
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="datetime-local"
            required
            value={form.start_datetime}
            onChange={(e) =>
              setForm({
                ...form,
                start_datetime: e.target.value,
              })
            }
            className="bg-input px-4 py-2 rounded-xl outline-none text-sm sm:text-base"
          />

          <input
            type="datetime-local"
            required
            value={form.end_datetime}
            onChange={(e) =>
              setForm({
                ...form,
                end_datetime: e.target.value,
              })
            }
            className="bg-input px-4 py-2 rounded-xl outline-none text-sm sm:text-base"
          />
        </div>

        <textarea
          required
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full bg-input px-4 py-2 rounded-xl outline-none min-h-[90px] text-sm sm:text-base"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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

        <label className="flex flex-col text-xs sm:text-sm text-muted-foreground gap-1">
          Display Order
          <input
            type="number"
            required
            placeholder="Lower number = higher priority"
            value={form.display_order}
            onChange={(e) =>
              setForm({
                ...form,
                display_order: Number(e.target.value),
              })
            }
            className="bg-input px-4 py-2 rounded-xl outline-none text-foreground text-sm sm:text-base"
          />
        </label>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2 sm:pt-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto text-muted-foreground text-sm sm:text-base"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="w-full sm:w-auto bg-accent text-accent-foreground px-4 py-2 rounded-xl disabled:opacity-50 text-sm sm:text-base"
          >
            {saving ? "Saving..." : "Save"}
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
    <label className="flex flex-col text-xs sm:text-sm text-muted-foreground gap-1">
      {label}
      <select
        required
        value={String(value)}
        onChange={(e) =>
          onChange(e.target.value === "true")
        }
        className="bg-input px-3 py-2 rounded-xl text-foreground text-sm sm:text-base"
      >
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
      </select>
    </label>
  )
}
