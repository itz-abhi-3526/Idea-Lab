"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

const STATUS_FALLBACK = { label: "UNKNOWN", color: DIMWHITE(0.3), bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" }

const STATUS_CFG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  submitted: { label: "SUBMITTED", color: AMBER(0.85),  bg: AMBER(0.07),  border: AMBER(0.28)  },
  approved:  { label: "APPROVED",  color: GREEN(0.85),  bg: GREEN(0.07),  border: GREEN(0.28)  },
  rejected:  { label: "REJECTED",  color: RED(0.85),    bg: RED(0.07),    border: RED(0.28)    },
  cancelled: { label: "CANCELLED", color: DIMWHITE(0.3),bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" },
  completed: { label: "COMPLETED", color: "rgba(56,189,248,0.85)", bg: "rgba(56,189,248,0.07)", border: "rgba(56,189,248,0.28)" },
}

/* ── TYPES — unchanged ── */
type RequestItem = {
  id: string
  quantity: number
  inventory_items: { id: string; name: string; quantity_available: number }
}

type InventoryRequest = {
  id: string
  requester_name: string
  created_at: string
  status: "submitted" | "approved" | "rejected"
  inventory_request_items: RequestItem[]
}

/* ── ACTION BUTTON ── */
function ActionBtn({ label, onClick, color, bg, border }: {
  label: string; onClick: () => void
  color: string; bg: string; border: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em",
        padding: "8px 18px", background: hov ? bg : "transparent",
        borderTop: `1px solid ${border}`, borderRight: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`, borderLeft: "none",
        color, cursor: "pointer", position: "relative", overflow: "hidden",
        transition: "background 0.18s",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, opacity: hov ? 1 : 0.4, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ── REQUEST CARD ── */
function RequestCard({ req, onApprove, onReject }: {
  req: InventoryRequest; onApprove: () => void; onReject: () => void
}) {
  const [hov, setHov] = useState(false)
  const cfg     = STATUS_CFG[req.status] ?? STATUS_FALLBACK
  const shortId = req.id.slice(0, 8).toUpperCase()

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        background: hov ? `rgba(255,176,0,0.045)` : PANEL,
        border: `1px solid ${hov ? AMBER(0.25) : BORDER}`,
        transition: "border 0.22s, background 0.22s",
      }}
    >
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${AMBER(0.5)}, transparent)` }} />}

      {/* left stripe — status colour */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1, background: `linear-gradient(to bottom, transparent, ${cfg.color}, transparent)`, opacity: hov ? 0.85 : 0.35, transition: "opacity 0.22s, width 0.15s" }} />

      <div style={{ position: "absolute", top: 8, right: 8, width: 9, height: 9, borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`, transition: "border-color 0.22s" }} />

      <div style={{ padding: "16px 18px 14px 20px" }}>

        {/* header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.28), marginBottom: 4 }}>
              REQ·{shortId}
            </div>
            <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: DIMWHITE(0.9), lineHeight: 1.1 }}>
              {req.requester_name}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", color: AMBER(0.3), marginTop: 3 }}>
              {new Date(req.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              {" · "}
              {new Date(req.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          {/* status badge */}
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", padding: "3px 10px", color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, flexShrink: 0, whiteSpace: "nowrap" }}>
            {cfg.label}
          </span>
        </div>

        {/* items table */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${AMBER(0.1)}`, marginBottom: 4 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.22em", color: AMBER(0.3) }}>ITEM</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.22em", color: AMBER(0.3) }}>QTY</span>
          </div>
          {req.inventory_request_items.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: `1px solid ${AMBER(0.05)}` }}>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: DIMWHITE(0.55) }}>
                {item.inventory_items.name}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: AMBER(0.65) }}>
                ×{item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* actions */}
        {req.status === "submitted" && (
          <>
            <div style={{ height: 1, background: `linear-gradient(to right, ${AMBER(0.1)}, transparent)`, margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
              <ActionBtn label="REJECT"  onClick={onReject}  color={RED(0.8)}   bg={RED(0.08)}   border={RED(0.28)}   />
              <ActionBtn label="APPROVE" onClick={onApprove} color={GREEN(0.8)} bg={GREEN(0.08)} border={GREEN(0.28)} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ── PAGE — all supabase/fetch logic untouched ── */
export default function InventoryRequestsPage() {
  const [requests, setRequests] = useState<InventoryRequest[]>([])
  const [loading,  setLoading]  = useState(true)

  const fetchRequests = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("inventory_requests")
      .select(`
        id, requester_name, status, created_at,
        inventory_request_items:inventory_request_items!inventory_request_items_request_id_fkey (
          id, quantity,
          inventory_items:inventory_items!inventory_request_items_item_id_fkey (
            id, name, quantity_available
          )
        )
      `)
      .order("created_at", { ascending: false })

    if (error) { console.error("FETCH INVENTORY REQUESTS ERROR", error); setRequests([]); setLoading(false); return }

    setRequests((data ?? []).map((r: any) => ({
      id: r.id, requester_name: r.requester_name, created_at: r.created_at,
      status: r.status, inventory_request_items: r.inventory_request_items ?? [],
    })))
    setLoading(false)
  }

  useEffect(() => {
    fetchRequests()
    const channel = supabase
      .channel("inventory-requests-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "inventory_requests" }, fetchRequests)
      .on("postgres_changes", { event: "*", schema: "public", table: "inventory_items"    }, fetchRequests)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const approveRequest = async (req: InventoryRequest) => {
    const res  = await fetch("/api/admin/inventory-requests/approve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ requestId: req.id }) })
    const json = await res.json()
    if (!res.ok) alert(json?.error || "Approval failed")
  }

  const rejectRequest = async (id: string) => {
    await supabase.from("inventory_requests").update({ status: "rejected" }).eq("id", id)
  }

  /* ── LOADING ── */
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "40px 0" }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>LOADING REQUESTS...</span>
        <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`}</style>
      </div>
    )
  }

  /* ── EMPTY ── */
  if (requests.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 24px", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>NO INVENTORY REQUESTS FOUND</span>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: DIMWHITE(0.2) }}>Requests will appear here once users submit them.</span>
        <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`}</style>
      </div>
    )
  }

  const pending = requests.filter(r => r.status === "submitted").length

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}} @keyframes mcpulse{0%,100%{opacity:1}50%{opacity:0.25}}`}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · INVENTORY REQUESTS</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        {/* header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Inventory Requests
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Review and approve inventory borrowing requests
            </p>
          </div>

          {/* stats strip */}
          <div style={{ display: "flex", gap: 0, border: `1px solid ${AMBER(0.12)}` }}>
            {[
              { label: "TOTAL",   val: requests.length },
              { label: "PENDING", val: pending,          alert: pending > 0 },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "8px 18px", borderLeft: i > 0 ? `1px solid ${AMBER(0.1)}` : "none", textAlign: "center" as const }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.22em", color: (s as any).alert && pending > 0 ? RED(0.6) : AMBER(0.35) }}>{s.label}</div>
                <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: (s as any).alert && pending > 0 ? RED(0.85) : AMBER(0.85), lineHeight: 1.1 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* result count + live */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.22em", color: AMBER(0.25) }}>
            {requests.length} REQUEST{requests.length !== 1 ? "S" : ""}
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)` }} />
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: `rgba(0,255,120,0.85)`, boxShadow: `0 0 4px rgba(0,255,120,0.5)`, animation: "mcpulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: `rgba(0,255,120,0.45)` }}>LIVE</span>
          </div>
        </div>

        {/* cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {requests.map(req => (
            <RequestCard
              key={req.id}
              req={req}
              onApprove={() => approveRequest(req)}
              onReject={() => rejectRequest(req.id)}
            />
          ))}
        </div>

      </div>
    </div>
  )
}