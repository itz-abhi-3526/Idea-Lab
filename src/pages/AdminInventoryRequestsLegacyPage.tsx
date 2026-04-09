
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { getAllInventoryRequests, type InventoryRequest } from "@/lib/get-all-inventory-requests"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

export default function AdminInventoryRequestsLegacyPage() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState<InventoryRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/login", { replace: true })
        return
      }

      const data = await getAllInventoryRequests()
      setRequests(data)
      setLoading(false)
    }

    load()
  }, [navigate])

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.25em", color: AMBER(0.55) }}>
          LOADING INVENTORY REQUESTS...
        </span>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${AMBER(0.25)}}

        .log-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px 48px;
        }

        .request-log-card {
          background: ${PANEL};
          border: 1px solid ${BORDER};
          padding: 16px 18px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .log-status {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          margin-bottom: 8px;
        }

        @media (min-width: 768px) {
          .log-status {
            position: absolute;
            top: 16px;
            right: 18px;
            margin-bottom: 0;
          }
          .log-container {
            padding: 28px 24px 60px;
          }
        }
      `}</style>

      <div className="log-container">
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
            fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
            fontWeight: 700,
            color: AMBER(0.9),
            letterSpacing: "0.02em",
            margin: 0,
          }}>
            Inventory Requests Log
          </h1>
        </div>

        {requests.length === 0 && (
          <div style={{
            background: PANEL,
            border: `1px solid ${BORDER}`,
            padding: "40px 24px",
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: AMBER(0.3),
          }}>
            NO ARCHIVED REQUESTS FOUND
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {requests.map(req => {
            const statusColor =
              req.status === "approved" ? GREEN(0.8)
              : req.status === "rejected" ? RED(0.8)
              : AMBER(0.85)

            return (
              <div key={req.id} className="request-log-card">
                <div className="log-status" style={{ color: statusColor }}>
                  {req.status.toUpperCase()}
                </div>

                <div style={{ marginBottom: 10 }}>
                  <div style={{
                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: DIMWHITE(0.95),
                    lineHeight: 1.2,
                    marginBottom: 4,
                  }}>
                    {req.purpose}
                  </div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: AMBER(0.4),
                    wordBreak: "break-all",
                  }}>
                    {req.requester_name} · <span style={{ color: AMBER(0.25) }}>{req.email}</span>
                  </div>
                </div>

                <div style={{
                  background: "rgba(0,0,0,0.2)",
                  padding: "10px 12px",
                  border: `1px solid ${AMBER(0.05)}`,
                }}>
                  {req.inventory_request_items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px 0",
                        borderBottom: idx === req.inventory_request_items.length - 1 ? "none" : `1px solid ${AMBER(0.04)}`,
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.65rem",
                        color: DIMWHITE(0.8),
                      }}
                    >
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 10 }}>
                        {item.inventory_items?.[0]?.name ?? "UNKNOWN_OBJECT"}
                      </span>
                      <span style={{ color: AMBER(0.5), flexShrink: 0 }}>
                        [x{item.quantity}]
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

