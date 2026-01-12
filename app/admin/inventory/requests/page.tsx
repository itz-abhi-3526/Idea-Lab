"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* ----------------------------
   Types
----------------------------- */
type RequestItem = {
  id: string
  quantity: number
  inventory_items: {
    id: string
    name: string
    quantity_available: number
  }
}

type InventoryRequest = {
  id: string
  requester_name: string
  created_at: string
  status: "submitted" | "approved" | "rejected"
  inventory_request_items: RequestItem[]
}

/* ----------------------------
   Page
----------------------------- */
export default function InventoryRequestsPage() {
  const [requests, setRequests] =
    useState<InventoryRequest[]>([])
  const [loading, setLoading] = useState(true)

  /* ----------------------------
     Fetch Requests
  ----------------------------- */
  const fetchRequests = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("inventory_requests")
      .select(`
        id,
        requester_name,
        status,
        created_at,
        inventory_request_items:inventory_request_items!inventory_request_items_request_id_fkey (
          id,
          quantity,
          inventory_items:inventory_items!inventory_request_items_item_id_fkey (
            id,
            name,
            quantity_available
          )
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Fetch error:", error)
      setRequests([])
      setLoading(false)
      return
    }

    const normalized: InventoryRequest[] = (data ?? []).map(
      (r: any) => ({
        id: r.id,
        requester_name: r.requester_name,
        created_at: r.created_at,
        status: r.status,
        inventory_request_items:
          r.inventory_request_items ?? [],
      })
    )

    setRequests(normalized)
    setLoading(false)
  }

  /* ----------------------------
     Realtime Subscription
  ----------------------------- */
  useEffect(() => {
    fetchRequests()

    const channel = supabase
      .channel("inventory-requests-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "inventory_requests",
        },
        fetchRequests
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "inventory_items",
        },
        fetchRequests
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  /* ----------------------------
     Approve Request
  ----------------------------- */
  const approveRequest = async (req: InventoryRequest) => {
    // 1️⃣ Validate stock
    for (const item of req.inventory_request_items) {
      const inv = item.inventory_items

      if (inv.quantity_available < item.quantity) {
        alert(`Insufficient stock for ${inv.name}`)
        return
      }
    }

    // 2️⃣ Deduct inventory
    for (const item of req.inventory_request_items) {
      const inv = item.inventory_items

      const { error } = await supabase
        .from("inventory_items")
        .update({
          quantity_available:
            inv.quantity_available - item.quantity,
        })
        .eq("id", inv.id)

      if (error) {
        alert(`Failed updating ${inv.name}`)
        return
      }
    }

    // 3️⃣ Mark request approved
    const { error } = await supabase
      .from("inventory_requests")
      .update({ status: "approved" })
      .eq("id", req.id)

    if (error) {
      alert(error.message)
      return
    }

    // ❗ No local state mutation
    // Realtime will refetch & sync UI
  }

  /* ----------------------------
     Reject Request
  ----------------------------- */
  const rejectRequest = async (id: string) => {
    const { error } = await supabase
      .from("inventory_requests")
      .update({ status: "rejected" })
      .eq("id", id)

    if (error) {
      alert(error.message)
      return
    }

    // ❗ No local state mutation
  }

  /* ----------------------------
     UI
  ----------------------------- */
  if (loading) {
    return (
      <p className="text-muted-foreground">
        Loading inventory requests...
      </p>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="glass-surface rounded-2xl p-10 text-center">
        <h2 className="text-xl font-heading">
          No Requests Pending
        </h2>
        <p className="text-muted-foreground mt-2">
          Inventory requests will appear here once users submit them.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-heading">
          Inventory Requests
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and approve inventory borrowing requests
        </p>
      </div>

      <div className="space-y-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="glass-surface rounded-2xl p-6 soft-shadow space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-lg">
                  {req.requester_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(req.created_at).toLocaleString()}
                </p>
              </div>

              <StatusPill status={req.status} />
            </div>

            {/* Items */}
            <div className="space-y-2">
              {req.inventory_request_items.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {
                        item.inventory_items
                          .name
                      }
                    </span>
                    <span className="font-medium">
                      × {item.quantity}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Actions */}
            {req.status === "submitted" && (
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() =>
                    rejectRequest(req.id)
                  }
                  className="px-4 py-2 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    approveRequest(req)
                  }
                  className="px-4 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition"
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------
   Status Pill
----------------------------- */
function StatusPill({
  status,
}: {
  status: InventoryRequest["status"]
}) {
  const styles = {
    approved:
      "bg-emerald-500/15 text-emerald-400",
    rejected:
      "bg-rose-500/15 text-rose-400",
    submitted:
      "bg-amber-500/15 text-amber-400",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() +
        status.slice(1)}
    </span>
  )
}
