"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Request = {
  id: string
  requester_name: string
  department: string
  phone: string
  purpose: string
  status: string
  inventory_request_items: {
    quantity: number
    inventory_items: { name: string }
  }[]
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])

  const fetchRequests = async () => {
    const res = await fetch("/api/admin/requests")
    const data = await res.json()
    setRequests(data)
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    fetchRequests()
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">
        Inventory Requests
      </h1>

      {requests.length === 0 && (
        <div className="glass-surface rounded-2xl p-8 text-center text-muted-foreground">
          No requests found
        </div>
      )}

      {requests.map(req => (
        <div
          key={req.id}
          className="
            glass-surface
            rounded-2xl
            p-5
            sm:p-6
            soft-shadow
            space-y-4
          "
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-medium">
                {req.requester_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {req.department}
              </p>
            </div>

            <span className="text-xs capitalize text-muted-foreground">
              {req.status}
            </span>
          </div>

          {/* Purpose */}
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              Purpose:
            </span>{" "}
            {req.purpose}
          </p>

          {/* Items */}
          <ul className="space-y-1 text-sm">
            {req.inventory_request_items.map((i, idx) => (
              <li
                key={idx}
                className="flex justify-between gap-4"
              >
                <span className="truncate">
                  {i.inventory_items.name}
                </span>
                <span className="text-muted-foreground shrink-0">
                  × {i.quantity}
                </span>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:justify-end">
            <Button
              className="w-full sm:w-auto"
              onClick={() =>
                updateStatus(req.id, "approved")
              }
            >
              Approve
            </Button>

            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={() =>
                updateStatus(req.id, "rejected")
              }
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
