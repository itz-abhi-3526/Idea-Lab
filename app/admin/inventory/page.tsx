"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AddInventoryModal, {
  InventoryItem,
} from "../../../components/admin/AddInventoryModal"

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] =
    useState<InventoryItem | null>(null)

  /* ----------------------------
     Fetch inventory items
  ----------------------------- */
  const fetchItems = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setItems(data)
    }

    setLoading(false)
  }

  /* ----------------------------
     Realtime subscription
  ----------------------------- */
  useEffect(() => {
    fetchItems()

    const channel = supabase
      .channel("inventory-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "inventory_items",
        },
        () => {
          fetchItems()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  /* ----------------------------
     Toggle active
     (DB is source of truth)
  ----------------------------- */
  const toggleActive = async (item: InventoryItem) => {
    const { error } = await supabase
      .from("inventory_items")
      .update({ is_active: !item.is_active })
      .eq("id", item.id)

    if (error) {
      alert(error.message)
      return
    }

    // ❗ Do NOT mutate state here
    // Realtime will refetch & sync UI
  }

  /* ----------------------------
     Search filter
  ----------------------------- */
  const filteredItems = items.filter((item) =>
    `${item.name} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-6">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading">
              Inventory Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage inventory items and availability
            </p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="
              bg-accent text-accent-foreground
              px-5 py-2.5 rounded-xl
              font-medium
              hover:opacity-90 transition
            "
          >
            + Add Item
          </button>
        </div>

        {/* Search */}
        <div className="max-w-xl">
          <input
            placeholder="Search items or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-input px-4 py-2 rounded-xl
              outline-none
              placeholder:text-muted-foreground
            "
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-muted-foreground">
          Loading inventory...
        </p>
      ) : (
        <div className="glass-surface rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-border">
              <tr className="text-sm text-muted-foreground">
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Available</th>
                <th className="px-6 py-4">Health</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border/50 hover:bg-card/40 transition"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {item.category}
                  </td>

                  <td className="px-6 py-4">
                    {item.quantity_total}
                  </td>

                  <td className="px-6 py-4">
                    {item.quantity_available}
                  </td>

                  <td className="px-6 py-4">
                    <AvailabilityHealth
                      available={item.quantity_available}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                        item.is_active
                          ? "bg-green-500/15 text-green-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {item.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => setEditItem(item)}
                      className="text-muted-foreground hover:text-accent transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleActive(item)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition ${
                        item.is_active
                          ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
                          : "bg-green-500/15 text-green-400 hover:bg-green-500/25"
                      }`}
                    >
                      {item.is_active
                        ? "Disable"
                        : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <AddInventoryModal
        open={showAdd || !!editItem}
        onClose={() => {
          setShowAdd(false)
          setEditItem(null)
        }}
        item={editItem}
      />
    </div>
  )
}

/* ----------------------------
   Availability Health
----------------------------- */
function AvailabilityHealth({
  available,
}: {
  available: number
}) {
  if (available < 5) {
    return (
      <span className="px-3 py-1 rounded-full text-sm bg-red-500/15 text-red-400 whitespace-nowrap">
        Critically Low
      </span>
    )
  }

  if (available < 10) {
    return (
      <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/15 text-yellow-400 whitespace-nowrap">
        Low
      </span>
    )
  }

  return (
    <span className="px-3 py-1 rounded-full text-sm bg-green-500/15 text-green-400 whitespace-nowrap">
        Available
      </span>
  )
}
