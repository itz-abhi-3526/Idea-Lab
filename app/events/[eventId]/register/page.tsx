"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useParams } from "next/navigation"
import {
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Upload,
} from "lucide-react"

/* -------------------- TYPES -------------------- */

type Event = {
  id: string
  title: string
  start_datetime: string
  venue: string | null
  registration_deadline: string
  is_paid: boolean
  price: number | null
  upi_qr_url: string | null
}

/* -------------------- PAGE -------------------- */

export default function EventRegisterPage() {
  const router = useRouter()
  const { eventId } = useParams<{ eventId: string }>()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    section: "",
    payment_ss_url: "",
  })

  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  /* -------------------- LOAD -------------------- */

  useEffect(() => {
    if (!eventId) return

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push(`/login?redirect=/events/${eventId}/register`)
        return
      }

      const { data: eventData } = await supabase
        .from("events")
        .select(`
          id,
          title,
          start_datetime,
          venue,
          registration_deadline,
          is_paid,
          price,
          upi_qr_url
        `)
        .eq("id", eventId)
        .maybeSingle()

      if (!eventData) {
        setError("Event not found")
        setLoading(false)
        return
      }

      const { data: existing } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (existing) setAlreadyRegistered(true)

      setEvent(eventData)
      setLoading(false)
    }

    load()
  }, [eventId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        {error ?? "Something went wrong"}
      </div>
    )
  }

  const registrationClosed =
    new Date(event.registration_deadline) < new Date()

  /* -------------------- PAYMENT UPLOAD -------------------- */

  const uploadPaymentSS = async (file: File) => {
    setUploading(true)
    setPreview(URL.createObjectURL(file))

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "idea_lab_profiles")
    data.append("folder", "idea-lab/payments")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    )

    const json = await res.json()
    setUploading(false)

    if (json.secure_url) {
      setForm((f) => ({ ...f, payment_ss_url: json.secure_url }))
    }
  }

  /* -------------------- VALIDATION -------------------- */

  const formValid =
    form.full_name &&
    form.email &&
    form.phone &&
    form.department &&
    form.year &&
    form.section &&
    (!event.is_paid || form.payment_ss_url)

  /* -------------------- REGISTER -------------------- */

  const register = async () => {
    setSubmitting(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("event_registrations").insert({
      event_id: event.id,
      user_id: user!.id,
      ...form,
    })

    setAlreadyRegistered(true)
    setSubmitting(false)
  }

  /* -------------------- UI -------------------- */

  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 border-b border-white/10">
          <h1 className="text-2xl font-semibold">Event Registration</h1>
          <p className="text-sm text-muted-foreground">
            Complete your registration
          </p>
        </div>

        {/* BODY */}
        <div className="px-8 py-8 space-y-8">

          {/* EVENT INFO */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">{event.title}</h2>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {new Date(event.start_datetime).toLocaleString()}
              </div>
              {event.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  {event.venue}
                </div>
              )}
            </div>
          </div>

          {/* STATUS */}
          {alreadyRegistered ? (
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4 flex gap-3">
              <CheckCircle className="text-green-400" />
              <p className="text-sm text-green-300">
                You’re already registered.
              </p>
            </div>
          ) : registrationClosed ? (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex gap-3">
              <XCircle className="text-red-400" />
              <p className="text-sm text-red-300">
                Registration closed.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {/* FORM */}
              {[
                ["full_name", "Full Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["department", "Department"],
                ["year", "Year"],
                ["section", "Section"],
              ].map(([k, label]) => (
                <input
                  key={k}
                  placeholder={label}
                  value={(form as any)[k]}
                  onChange={(e) =>
                    setForm({ ...form, [k]: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-black/30 px-4 text-sm outline-none focus:ring-2 focus:ring-accent/40"
                />
              ))}

              {/* PAYMENT */}
              {event.is_paid && (
                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 space-y-4">

                  <p className="text-sm font-medium text-orange-300">
                    Pay ₹{event.price} via UPI
                  </p>

                  {event.upi_qr_url && (
                    <div className="flex justify-center">
                      <img
                        src={event.upi_qr_url}
                        alt="UPI QR"
                        className="w-44 h-44 bg-white rounded-xl p-2"
                      />
                    </div>
                  )}

                  <label className="group flex flex-col items-center justify-center border border-dashed border-white/20 rounded-xl p-6 cursor-pointer hover:bg-white/5 transition">
                    <Upload className="w-6 h-6 mb-2 text-orange-400" />
                    <span className="text-xs text-muted-foreground">
                      Upload payment screenshot
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files &&
                        uploadPaymentSS(e.target.files[0])
                      }
                    />
                  </label>

                  {preview && (
                    <img
                      src={preview}
                      className="rounded-xl max-h-48 mx-auto"
                    />
                  )}
                </div>
              )}

              <button
                onClick={register}
                disabled={!formValid || submitting || uploading}
                className="w-full py-4 rounded-xl bg-accent text-accent-foreground text-sm font-medium transition disabled:opacity-50"
              >
                {submitting ? "Registering…" : "Confirm Registration"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
