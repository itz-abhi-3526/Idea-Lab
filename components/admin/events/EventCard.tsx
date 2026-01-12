"use client"

import { supabase } from "@/lib/supabase"
import { Event } from "@/app/admin/events/page"

export default function EventCard({
  event,
  onEdit,
}: {
  event: Event
  onEdit: () => void
}) {
  const toggle = async (field: "is_active" | "is_featured") => {
    await supabase
      .from("events")
      .update({ [field]: !event[field] })
      .eq("id", event.id)
  }

  const remove = async () => {
    if (!confirm("Delete this event?")) return
    await supabase.from("events").delete().eq("id", event.id)
  }

  return (
    <div className="glass-surface rounded-2xl p-6 soft-shadow space-y-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium">{event.title}</h3>
          <p className="text-sm text-muted-foreground">
            {event.event_type} • {event.venue}
          </p>
        </div>

        <span className="text-xs text-muted-foreground">
          {new Date(event.start_datetime).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge
          active={event.is_active}
          onClick={() => toggle("is_active")}
        >
          {event.is_active ? "Active" : "Inactive"}
        </Badge>

        <Badge
          active={event.is_featured}
          onClick={() => toggle("is_featured")}
        >
          Featured
        </Badge>

        <Badge active={event.is_registration_open}>
          {event.is_registration_open ? "Registration Open" : "Closed"}
        </Badge>
      </div>

      <div className="flex justify-end gap-4 text-sm">
        <button
          onClick={onEdit}
          className="text-muted-foreground hover:text-accent"
        >
          Edit
        </button>

        <button
          onClick={remove}
          className="text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

function Badge({
  children,
  active = true,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <span
      onClick={onClick}
      className={`px-3 py-1 rounded-full cursor-pointer ${
        active
          ? "bg-accent/15 text-accent"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {children}
    </span>
  )
}
