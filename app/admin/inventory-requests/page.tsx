import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server-client"
import { getAllInventoryRequests } from "@/lib/get-all-inventory-requests"

export default async function AdminInventoryRequestsPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const requests = await getAllInventoryRequests()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Inventory Requests
      </h1>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="rounded-lg border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium">
                  {req.purpose}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {req.requester_name} · {req.email}
                </p>
              </div>

              <span className="text-xs rounded-full border px-2 py-1">
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
    </div>
  )
}
