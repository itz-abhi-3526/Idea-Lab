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
          .select("*")
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
    return <div className="p-6">Loading inventory requests…</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  if (requests.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">
          Inventory Requests
        </h1>
        <p className="text-gray-400">
          You haven’t made any inventory requests yet.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Inventory Requests
      </h1>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="rounded-lg border border-gray-700 p-4 bg-black/40"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Request #{req.id.slice(0, 8)}
              </span>
              <span className="text-sm text-gray-400">
                {req.status}
              </span>
            </div>

            {req.purpose && (
              <p className="text-sm text-gray-400 mt-2">
                {req.purpose}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
