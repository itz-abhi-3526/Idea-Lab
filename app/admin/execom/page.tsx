"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AddExecomModal, {
  ExecomMember,
} from "../../../components/admin/AddExecomModal"

export default function ExecomPage() {
  const [members, setMembers] = useState<ExecomMember[]>([])
  const [loading, setLoading] = useState(true)

  const [showAdd, setShowAdd] = useState(false)
  const [editMember, setEditMember] =
    useState<ExecomMember | null>(null)

  const [search, setSearch] = useState("")

  const fetchExecom = async () => {
    setLoading(true)

    const { data } = await supabase
      .from("execom_members")
      .select("*")
      .order("display_order", { ascending: true })

    setMembers(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchExecom()

    const channel = supabase
      .channel("execom-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "execom_members",
        },
        fetchExecom
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredMembers = members.filter((m) =>
    `${m.name} ${m.designation} ${m.role ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const toggleActive = async (member: ExecomMember) => {
    await supabase
      .from("execom_members")
      .update({ is_active: !member.is_active })
      .eq("id", member.id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading">
            Execom Members
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Manage IDEA Lab executive committee
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="
            bg-accent text-accent-foreground
            px-5 py-2.5 rounded-xl
            font-medium
            hover:opacity-90 transition
            w-full sm:w-auto
          "
        >
          + Add Member
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search member..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full sm:max-w-md
          bg-input rounded-xl px-4 py-2
          outline-none
          text-foreground
          placeholder:text-muted-foreground
        "
      />

      {/* Content */}
      {loading ? (
        <p className="text-muted-foreground">
          Loading members...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="
                glass-surface soft-shadow
                rounded-2xl p-5 sm:p-6
                flex flex-col gap-4
              "
            >
              {/* Top */}
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      N/A
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium truncate">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm truncate">
                    {member.designation}
                  </p>
                  {member.role && (
                    <p className="text-muted-foreground text-sm truncate">
                      {member.role}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                <button
                  onClick={() => toggleActive(member)}
                  className={`px-3 py-1 rounded-full transition ${
                    member.is_active
                      ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
                      : "bg-green-500/15 text-green-400 hover:bg-green-500/25"
                  }`}
                >
                  {member.is_active ? "Disable" : "Enable"}
                </button>

                <button
                  onClick={() => setEditMember(member)}
                  className="text-muted-foreground hover:text-accent transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AddExecomModal
        open={showAdd || !!editMember}
        onClose={() => {
          setShowAdd(false)
          setEditMember(null)
        }}
        member={editMember}
      />
    </div>
  )
}
