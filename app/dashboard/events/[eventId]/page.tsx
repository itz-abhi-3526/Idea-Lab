"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import {
  Calendar,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Star,
} from "lucide-react"
import Link from "next/link"

/* -------------------- TYPES -------------------- */

type Event = {
  id: string
  title: string
  description: string
  start_datetime: string
  end_datetime: string
  venue: string | null
  poster_url: string | null

  // 🆕 pricing
  is_paid: boolean
  price: number | null
}

/* -------------------- PAGE -------------------- */

export default function DashboardEventDetailsPage() {
  const router = useRouter()
  const { eventId } = useParams<{ eventId: string }>()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [comments, setComments] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!eventId) return

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data: reg } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (!reg) {
        router.push(`/events/${eventId}`)
        return
      }

      const { data: eventData } = await supabase
        .from("events")
        .select(
          `
          id,
          title,
          description,
          start_datetime,
          end_datetime,
          venue,
          poster_url,
          is_paid,
          price
        `
        )
        .eq("id", eventId)
        .single()

      setEvent(eventData)

      const { data: feedback } = await supabase
        .from("event_feedback")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (feedback) setFeedbackSubmitted(true)

      setLoading(false)
    }

    load()
  }, [eventId, router])

  if (loading || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  const feedbackOpenAt =
    new Date(event.end_datetime).getTime() + 10 * 60 * 1000

  const isFeedbackOpen = Date.now() >= feedbackOpenAt

  const submitFeedback = async () => {
    if (!rating) return alert("Please give a rating")

    setSubmitting(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("event_feedback").insert({
      event_id: event.id,
      user_id: user!.id,
      rating,
      comments,
    })

    setFeedbackSubmitted(true)
    setSubmitting(false)
  }

  return (
    <section className="min-h-screen bg-black text-white">

      {/* BACK */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Events
        </Link>
      </div>

      {/* HERO */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {event.poster_url && (
          <img
            src={event.poster_url}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

        <div className="relative z-10 flex h-full items-end px-6 sm:px-12 pb-20">
          <div className="max-w-4xl space-y-6">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-400" />
                {new Date(event.start_datetime).toLocaleString()}
              </div>

              {event.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  {event.venue}
                </div>
              )}

              {/* 🆕 PRICE BADGE */}
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                  event.is_paid
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {event.is_paid ? `₹${event.price}` : "Free"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 sm:px-12 py-20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* DESCRIPTION */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">About the Event</h2>
            <p className="text-white/70 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* FEEDBACK */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Event Feedback</h2>

            {!isFeedbackOpen && (
              <p className="text-sm text-white/60">
                Feedback will open 10 minutes after the event ends.
              </p>
            )}

            {isFeedbackOpen && feedbackSubmitted && (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5 space-y-1">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Feedback submitted successfully
                </div>
                <p className="text-xs text-white/60">
                  Your certificate will appear in the{" "}
                  <strong>Certificates</strong> section once issued.
                </p>
              </div>
            )}

            {isFeedbackOpen && !feedbackSubmitted && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6">

                <p className="text-sm text-white/70">
                  Rate your experience
                </p>

                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className={`transition ${
                        rating && rating >= n
                          ? "text-orange-400"
                          : "text-white/40 hover:text-orange-300"
                      }`}
                    >
                      <Star className="w-7 h-7" />
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Share your thoughts (optional)"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full min-h-[120px] rounded-2xl bg-black/40 border border-white/10 p-4 text-sm text-white outline-none focus:border-orange-500/40"
                />

                <button
                  onClick={submitFeedback}
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-orange-600 transition disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit Feedback"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
