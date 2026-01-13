"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type InventoryRequest = {
  id: string
  status: string
  created_at: string
  purpose: string | null
}

export default function InventoryRequestsPage() {
  const [requests, setRequests] = useState<InventoryRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setError("User not logged in")
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from("inventory_requests")
          .select("id, status, created_at, purpose")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          setError(error.message)
        } else {
          setRequests(data ?? [])
        }
      } catch {
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-muted-foreground">
          Loading inventory requests…
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-sm text-rose-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading">
          Inventory Requests
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Track all inventory requests you’ve submitted
        </p>
      </div>

      {requests.length === 0 && (
        <div className="glass-surface rounded-2xl p-8 sm:p-10 text-center">
          <p className="text-sm text-muted-foreground">
            You haven’t made any inventory requests yet.
          </p>
        </div>
      )}

      <div className="space-y-5">
        {requests.map((req) => (
          <div
            key={req.id}
            className="glass-surface rounded-2xl p-5 sm:p-6 soft-shadow space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-medium text-sm sm:text-base">
                Request #{req.id.slice(0, 8)}
              </span>

              <span className="text-xs sm:text-sm capitalize text-muted-foreground">
                {req.status}
              </span>
            </div>

            {req.purpose && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {req.purpose}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Submitted on{" "}
              {new Date(req.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
