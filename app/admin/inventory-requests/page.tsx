import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import {
  getAllInventoryRequests,
  type InventoryRequest,
} from "@/lib/get-all-inventory-requests"

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.18)"

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
    <div style={{ minHeight: "100vh", background: BG, padding: "24px" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${AMBER(0.25)}}
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.32em",
          color: AMBER(0.45),
          marginBottom: 4,
        }}>
          SYS · INVENTORY
        </div>
        <h1 style={{
          fontFamily: "'IBM Plex Sans Condensed', sans-serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: AMBER(0.9),
          letterSpacing: "0.02em",
        }}>
          Inventory Requests Log
        </h1>
      </div>

      {/* EMPTY */}
      {requests.length === 0 && (
        <div style={{
          background: PANEL,
          border: `1px solid ${BORDER}`,
          padding: "26px",
          textAlign: "center",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: AMBER(0.45),
        }}>
          NO INVENTORY REQUESTS FOUND
        </div>
      )}

      {/* REQUEST LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {requests.map(req => {
          const statusColor =
            req.status === "approved" ? GREEN(0.8)
            : req.status === "rejected" ? RED(0.8)
            : AMBER(0.85)

          return (
            <div
              key={req.id}
              style={{
                background: PANEL,
                border: `1px solid ${BORDER}`,
                padding: "16px 18px",
                position: "relative",
              }}
            >
              {/* STATUS */}
              <div style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.22em",
                color: statusColor,
              }}>
                {req.status.toUpperCase()}
              </div>

              {/* PURPOSE */}
              <div style={{ marginBottom: 6 }}>
                <div style={{
                  fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: DIMWHITE(0.9),
                }}>
                  {req.purpose}
                </div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: AMBER(0.45),
                }}>
                  {req.requester_name} · {req.email}
                </div>
              </div>

              {/* ITEMS */}
              <div>
                {req.inventory_request_items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "3px 0",
                      borderBottom: `1px solid ${AMBER(0.06)}`,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      color: DIMWHITE(0.8),
                    }}
                  >
                    <span>
                      {item.inventory_items?.[0]?.name ?? "UNKNOWN ITEM"}
                    </span>
                    <span style={{ color: AMBER(0.6) }}>
                      × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}