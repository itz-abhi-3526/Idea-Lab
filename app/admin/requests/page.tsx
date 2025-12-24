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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Requests</h1>

      {requests.map(req => (
        <div key={req.id} className="border rounded p-4 mb-4">
          <p><b>Name:</b> {req.requester_name}</p>
          <p><b>Department:</b> {req.department}</p>
          <p><b>Purpose:</b> {req.purpose}</p>

          <ul className="ml-4 list-disc">
            {req.inventory_request_items.map((i, idx) => (
              <li key={idx}>
                {i.inventory_items.name} × {i.quantity}
              </li>
            ))}
          </ul>

          <div className="flex gap-2 mt-4">
            <Button onClick={() => updateStatus(req.id, "approved")}>
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => updateStatus(req.id, "rejected")}
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
