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

  const fetchItems = async () => {
    setLoading(true)

    const { data } = await supabase
      .from("inventory_items")
      .select("*")
      .order("created_at", { ascending: false })

    setItems(data ?? [])
    setLoading(false)
  }

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
        fetchItems
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const toggleActive = async (item: InventoryItem) => {
    await supabase
      .from("inventory_items")
      .update({ is_active: !item.is_active })
      .eq("id", item.id)
  }

  const filteredItems = items.filter((item) =>
    `${item.name} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading">
              Inventory Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage inventory items and availability
            </p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-medium"
          >
            + Add Item
          </button>
        </div>

        <div className="max-w-xl">
          <input
            placeholder="Search items or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-input px-4 py-2 rounded-xl outline-none"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">
          Loading inventory...
        </p>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block glass-surface rounded-2xl overflow-hidden">
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
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.quantity_total}</td>
                    <td className="px-6 py-4">{item.quantity_available}</td>
                    <td className="px-6 py-4">
                      <AvailabilityHealth available={item.quantity_available} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge active={item.is_active} />
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => setEditItem(item)}
                        className="text-muted-foreground hover:text-accent"
                      >
                        Edit
                      </button>
                      <ToggleButton item={item} onClick={toggleActive} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE / TABLET CARDS */}
          <div className="grid gap-4 lg:hidden">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-surface rounded-2xl p-5 space-y-3"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-accent/15 text-accent">
                    {item.category}
                  </span>
                  <AvailabilityHealth available={item.quantity_available} />
                  <StatusBadge active={item.is_active} />
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total: {item.quantity_total}</span>
                  <span>Available: {item.quantity_available}</span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setEditItem(item)}
                    className="text-sm text-muted-foreground hover:text-accent"
                  >
                    Edit
                  </button>
                  <ToggleButton item={item} onClick={toggleActive} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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

function ToggleButton({
  item,
  onClick,
}: {
  item: InventoryItem
  onClick: (item: InventoryItem) => void
}) {
  return (
    <button
      onClick={() => onClick(item)}
      className={`px-3 py-1 rounded-full text-xs transition ${
        item.is_active
          ? "bg-red-500/15 text-red-400"
          : "bg-green-500/15 text-green-400"
      }`}
    >
      {item.is_active ? "Disable" : "Enable"}
    </button>
  )
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs ${
        active
          ? "bg-green-500/15 text-green-400"
          : "bg-red-500/15 text-red-400"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  )
}

function AvailabilityHealth({ available }: { available: number }) {
  if (available < 5)
    return (
      <span className="px-3 py-1 rounded-full text-xs bg-red-500/15 text-red-400">
        Critically Low
      </span>
    )

  if (available < 10)
    return (
      <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/15 text-yellow-400">
        Low
      </span>
    )

  return (
    <span className="px-3 py-1 rounded-full text-xs bg-green-500/15 text-green-400">
      Available
    </span>
  )
}
