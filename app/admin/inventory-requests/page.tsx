import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import {
  getAllInventoryRequests,
  type InventoryRequest,
} from "@/lib/get-all-inventory-requests"

export default async function AdminInventoryRequestsPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const requests: InventoryRequest[] = await getAllInventoryRequests()

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">
        Inventory Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No inventory requests found.
        </p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="rounded-xl border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-medium">
                    {req.purpose}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {req.requester_name} · {req.email}
                  </p>
                </div>

                <span className="text-xs capitalize rounded-full border px-2 py-1">
                  {req.status}
                </span>
              </div>

              <ul className="mt-3 list-disc pl-6 text-sm text-muted-foreground">
                {req.inventory_request_items.map((item, idx) => (
                  <li key={idx}>
                    {item.inventory_items?.[0]?.name ?? "Unknown item"} ×{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}