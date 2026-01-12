"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import RequestTimeline from "@/components/inventory/RequestTimeline"

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type RequestStatus =
  | "submitted"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled"

type Item = {
  name: string
  quantity: number
}

type Request = {
  id: string
  created_at: string
  status: RequestStatus
  purpose: string
  items: Item[]
}

/* ----------------------------- */
/* Page                          */
/* ----------------------------- */

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [activeTab, setActiveTab] = useState<"current" | "previous">(
    "current"
  )
  const [loading, setLoading] = useState(true)

  /* ----------------------------- */
  /* Fetch Requests                */
  /* ----------------------------- */

  const fetchRequests = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setRequests([])
      setLoading(false)
      return
    }

    const { data: requestRows, error: reqErr } =
      await supabase
        .from("inventory_requests")
        .select("id, created_at, status, purpose")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .returns<
          {
            id: string
            created_at: string
            status: RequestStatus
            purpose: string
          }[]
        >()

    if (reqErr || !requestRows) {
      console.error(reqErr)
      setRequests([])
      setLoading(false)
      return
    }

    if (requestRows.length === 0) {
      setRequests([])
      setLoading(false)
      return
    }

    const requestIds = requestRows.map((r) => r.id)

    const { data: itemRows } = await supabase
      .from("inventory_request_items")
      .select(
        `
        request_id,
        quantity,
        inventory_items (
          name
        )
      `
      )
      .in("request_id", requestIds)
      .returns<
        {
          request_id: string
          quantity: number
          inventory_items: { name: string } | null
        }[]
      >()

    const itemsByRequest: Record<string, Item[]> = {}

    itemRows?.forEach((row) => {
      if (!itemsByRequest[row.request_id]) {
        itemsByRequest[row.request_id] = []
      }

      itemsByRequest[row.request_id].push({
        name: row.inventory_items?.name ?? "Unknown item",
        quantity: row.quantity,
      })
    })

    const final: Request[] = requestRows.map((r) => ({
      id: r.id,
      created_at: r.created_at,
      status: r.status,
      purpose: r.purpose,
      items: itemsByRequest[r.id] ?? [],
    }))

    setRequests(final)
    setLoading(false)
  }

  /* ----------------------------- */
  /* Cancel Request                */
  /* ----------------------------- */

  const cancelRequest = async (id: string) => {
    const { error } = await supabase
      .from("inventory_requests")
      .update({ status: "cancelled" })
      .eq("id", id)

    if (!error) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "cancelled" } : r
        )
      )
    }
  }

  /* ----------------------------- */
  /* Effects                       */
  /* ----------------------------- */

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
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const current = requests.filter(
    (r) => r.status === "submitted"
  )
  const previous = requests.filter(
    (r) => r.status !== "submitted"
  )

  /* ----------------------------- */
  /* UI                            */
  /* ----------------------------- */

  if (loading) {
    return (
      <div className="p-10">
        <p className="text-muted-foreground">
          Loading inventory requests...
        </p>
      </div>
    )
  }

  return (
    /* ✅ THIS FIXES YOUR ALIGNMENT ISSUE */
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading">
          My Inventory Requests
        </h1>
        <p className="text-muted-foreground mt-2">
          Track the status of items you’ve requested
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === "current"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Current Requests
        </button>

        <button
          onClick={() => setActiveTab("previous")}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === "previous"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Previous Requests
        </button>
      </div>

      {/* Requests */}
      <div className="space-y-6">
        {(activeTab === "current" ? current : previous)
          .length === 0 && (
          <div className="glass-surface rounded-2xl p-10 text-center">
            <p className="text-muted-foreground">
              No{" "}
              {activeTab === "current"
                ? "active"
                : "previous"}{" "}
              inventory requests.
            </p>
          </div>
        )}

        {(activeTab === "current"
          ? current
          : previous
        ).map((req) => (
          <div
            key={req.id}
            className="glass-surface rounded-2xl p-6 soft-shadow space-y-4"
          >
            <div className="flex justify-between">
              <p className="font-medium">
                {req.purpose}
              </p>
              <span className="text-sm capitalize text-muted-foreground">
                {req.status}
              </span>
            </div>

            <ul className="text-sm space-y-1">
              {req.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <RequestTimeline status={req.status} />

            {req.status === "submitted" && (
              <div className="pt-3 text-right">
                <button
                  onClick={() => cancelRequest(req.id)}
                  className="px-4 py-2 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition"
                >
                  Cancel Request
                </button>
              </div>
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
