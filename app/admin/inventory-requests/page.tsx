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

  const requests: InventoryRequest[] =
    await getAllInventoryRequests()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <h1 className="text-xl sm:text-2xl font-semibold">
        Inventory Requests
      </h1>

      {requests.length === 0 ? (
        <div className="glass-surface rounded-2xl p-8 text-center text-sm text-muted-foreground">
          No inventory requests found.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
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
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="font-medium">
                    {req.purpose}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {req.requester_name} · {req.email}
                  </p>
                </div>

                <span className="self-start text-xs capitalize rounded-full border px-3 py-1 text-muted-foreground">
                  {req.status}
                </span>
              </div>

              {/* Items */}
              <ul className="space-y-1 text-sm text-muted-foreground">
                {req.inventory_request_items.map(
                  (item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-4"
                    >
                      <span className="truncate">
                        {item.inventory_items?.[0]
                          ?.name ?? "Unknown item"}
                      </span>
                      <span className="shrink-0">
                        × {item.quantity}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
