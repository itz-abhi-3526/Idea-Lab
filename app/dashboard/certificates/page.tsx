"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Download,
  FileText,
  Calendar,
} from "lucide-react"

/* -------------------- TYPES -------------------- */

type Certificate = {
  id: string
  issued_at: string
  certificate_url: string
  event_title: string
}

/* -------------------- PAGE -------------------- */

export default function CertificatesDashboard() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("event_certificates")
        .select(`
          id,
          issued_at,
          certificate_url,
          events (
            title
          )
        `)
        .eq("user_id", user.id)
        .order("issued_at", { ascending: false })

      const mapped: Certificate[] =
        data?.map((row: any) => ({
          id: row.id,
          issued_at: row.issued_at,
          certificate_url: row.certificate_url,
          event_title: row.events?.title ?? "Event",
        })) ?? []

      setCertificates(mapped)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading certificates…
      </div>
    )
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-14 space-y-10">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          My Certificates
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Certificates you’ve earned by participating in IDEA Lab events.
        </p>
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <FileText className="w-10 h-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground max-w-sm">
            No certificates yet.  
            Complete event feedback to unlock certificates.
          </p>
        </div>
      )}

      {/* Certificates Grid */}
      {certificates.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden transition hover:shadow-2xl"
            >
              {/* Preview */}
              <a
                href={cert.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-44 flex items-center justify-center bg-gradient-to-br from-zinc-800/60 to-zinc-900/60"
              >
                <FileText className="w-12 h-12 text-muted-foreground" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </div>
                </div>
              </a>

              {/* Info */}
              <div className="p-5 space-y-3">
                <div className="text-sm font-medium leading-snug">
                  {cert.event_title}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Issued on{" "}
                  {new Date(cert.issued_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
