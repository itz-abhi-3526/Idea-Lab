"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type InventoryItem = {
  name: string
}

type InventoryRequestItem = {
  quantity: number
  inventory_items: InventoryItem | InventoryItem[] | null
}

type Request = {
  id: string
  created_at: string
  status: string
  purpose: string
  inventory_request_items: InventoryRequestItem[]
}

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("inventory_requests")
        .select(`
          id,
          status,
          purpose,
          created_at,
          inventory_request_items (
            quantity,
            inventory_items (
              name
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Inventory fetch error:", error)
      } else if (data) {
        setRequests(data)
      }

      setLoading(false)
    }

    fetchRequests()
  }, [])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Inventory Requests</h1>

      {requests.length === 0 && (
        <p className="text-muted-foreground">No requests found.</p>
      )}

      {requests.map((req) => (
        <div
          key={req.id}
          className="rounded-lg border p-4 shadow-sm space-y-3"
        >
          <div className="flex justify-between">
            <p className="font-medium">{req.purpose}</p>
            <span className="text-sm capitalize">{req.status}</span>
          </div>

          <ul className="list-disc ml-6 text-sm">
            {req.inventory_request_items.flatMap((item, idx) => {
              const normalizedItems: InventoryItem[] = Array.isArray(
                item.inventory_items
              )
                ? item.inventory_items
                : item.inventory_items
                ? [item.inventory_items]
                : []

              return normalizedItems.map((inv, i) => (
                <li key={`${idx}-${i}`}>
                  {inv.name} × {item.quantity}
                </li>
              ))
            })}
          </ul>

          <p className="text-xs text-muted-foreground">
            Submitted on {new Date(req.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}
