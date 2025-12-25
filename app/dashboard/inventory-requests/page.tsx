"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

type InventoryItem = {
  name: string
}

type InventoryRequestItem = {
  quantity: number
  inventory_items: InventoryItem | InventoryItem[] | null
}

type InventoryRequest = {
  id: string
  status: string
  created_at: string
  purpose: string | null
  inventory_request_items?: InventoryRequestItem[]
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
          .select(`
            id,
            status,
            created_at,
            purpose,
            inventory_request_items (
              quantity,
              inventory_items ( name )
            )
          `)
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

  const cancelRequest = async (requestId: string) => {
    await fetch("/api/inventory-request/cancel", {
      method: "POST",
      body: JSON.stringify({ requestId }),
    })

    setRequests((prev) =>
      prev.filter((req) => req.id !== requestId)
    )
  }

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
            className="rounded-lg border border-gray-700 p-4 bg-black/40 space-y-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Request #{req.id.slice(0, 8)}
              </span>
              <span className="text-sm text-gray-400 capitalize">
                {req.status}
              </span>
            </div>

            {/* Purpose */}
            {req.purpose && (
              <p className="text-sm text-gray-400">
                {req.purpose}
              </p>
            )}

            {/* Timeline */}
            {req.inventory_request_items &&
              req.inventory_request_items.length > 0 && (
                <ul className="ml-4 list-disc text-sm text-gray-300 space-y-1">
                  {req.inventory_request_items.flatMap(
                    (item, idx) => {
                      const items = Array.isArray(
                        item.inventory_items
                      )
                        ? item.inventory_items
                        : item.inventory_items
                        ? [item.inventory_items]
                        : []

                      return items.map((inv, i) => (
                        <li key={`${idx}-${i}`}>
                          {inv.name} × {item.quantity}
                        </li>
                      ))
                    }
                  )}
                </ul>
              )}

            {/* Cancel Button */}
            {req.status === "pending" && (
              <div className="pt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => cancelRequest(req.id)}
                >
                  Cancel Request
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
