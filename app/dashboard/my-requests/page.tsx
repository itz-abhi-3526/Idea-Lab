"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import RequestTimeline from "@/components/inventory/RequestTimeline"

type Request = {
  id: string
  created_at: string
  status: string
  purpose: string
  inventory_request_items: {
    quantity: number
    inventory_items: { name: string }
  }[]
}

type Tab = "pending" | "past"

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>("pending")

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) return

      setUser(data.user)

      const { data: reqs } = await supabase
        .from("inventory_requests")
        .select(`
          id,
          created_at,
          status,
          purpose,
          inventory_request_items (
            quantity,
            inventory_items ( name )
          )
        `)
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false })

      setRequests(reqs || [])
      setLoading(false)
    }

    load()
  }, [])

  const cancelRequest = async (id: string) => {
    const res = await fetch("/api/inventory-request/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId: id,
        userId: user.id,
      }),
    })

    if (res.ok) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "cancelled" } : r
        )
      )
    }
  }

  const pendingRequests = requests.filter(
    (r) => r.status === "submitted"
  )

  const pastRequests = requests.filter(
    (r) => r.status !== "submitted"
  )

  const activeList =
    tab === "pending" ? pendingRequests : pastRequests

  if (loading) {
    return <div className="p-10">Loading requests...</div>
  }

  return (
    <div className="min-h-screen px-6 py-10 md:px-12">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          My Inventory Requests
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track the status of your equipment requests
        </p>
      </div>

      {/* TABS */}
      <div className="mb-8 flex gap-2">
        {(["pending", "past"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              tab === t
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "pending" ? "Pending Requests" : "Past Requests"}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {activeList.length === 0 && (
        <p className="text-muted-foreground">
          {tab === "pending"
            ? "No pending requests."
            : "No past requests yet."}
        </p>
      )}

      {/* REQUEST LIST */}
      <div className="space-y-6">
        {activeList.map((req) => (
          <div
            key={req.id}
            className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">
                  {req.purpose}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(req.created_at).toLocaleString()}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full capitalize ${
                  req.status === "approved"
                    ? "bg-green-500/10 text-green-400"
                    : req.status === "rejected"
                    ? "bg-red-500/10 text-red-400"
                    : req.status === "cancelled"
                    ? "bg-muted text-muted-foreground"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {req.status}
              </span>
            </div>

            {/* ITEMS */}
            <ul className="mt-4 text-sm text-muted-foreground space-y-1">
              {req.inventory_request_items.map((i, idx) => (
                <li key={idx}>
                  • {i.inventory_items.name} × {i.quantity}
                </li>
              ))}
            </ul>

            {/* TIMELINE */}
            <RequestTimeline status={req.status as any} />

            {/* ACTION */}
            {req.status === "submitted" && (
              <div className="mt-4">
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
