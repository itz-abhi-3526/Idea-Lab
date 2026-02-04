import { supabase } from "@/lib/supabase"

/**
 * Generates certificates ONLY for users
 * who have submitted feedback for an event.
 */
export async function generateCertificatesForEvent(eventId: string) {
  // 1. Fetch event
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, title")
    .eq("id", eventId)
    .single()

  if (eventError || !event) {
    throw new Error("Event not found")
  }

  // 2. Fetch users who submitted feedback
  const { data: feedbackUsers, error: feedbackError } = await supabase
    .from("event_feedback")
    .select("user_id")
    .eq("event_id", eventId)

  if (feedbackError) {
    throw new Error("Failed to fetch feedback users")
  }

  if (!feedbackUsers || feedbackUsers.length === 0) {
    return { generated: 0 }
  }

  // 3. Build certificate records
  // (certificate_url is assumed to be generated beforehand)
  const certificates = feedbackUsers.map((u) => ({
    event_id: eventId,
    user_id: u.user_id,
    certificate_url: `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/idea-lab/certificates/${eventId}/${u.user_id}.pdf`,
  }))

  // 4. Insert certificates safely (NO DUPLICATES)
 const { error: insertError } = await supabase
  .from("event_certificates")
  .upsert(certificates, {
    onConflict: "event_id,user_id",
  })

  if (insertError) {
    throw new Error("Certificate insert failed")
  }

  return {
    generated: certificates.length,
  }
}
