
import { useEffect, useState } from "react"

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.18)"

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

  /* ── LOGIC UNCHANGED ── */
  const fetchRequests = async () => {
    const res = await fetch("/api/admin/requests")
    const data = await res.json()
    setRequests(data)
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      if (status === "approved") {
        const res = await fetch(
          "/api/admin/inventory-requests/approve",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestId: id }),
          }
        )
        const json = await res.json()
        if (!res.ok) {
          alert(json?.error || "Approval failed")
          return
        }
      } else {
        await fetch("/api/admin/requests", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status }),
        })
      }
      fetchRequests()
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${AMBER(0.25)}}

        .requests-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px;
        }

        .request-card {
          background: ${PANEL};
          border: 1px solid ${BORDER};
          padding: 16px 18px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .status-pill {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }

        .actions-flex {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          margin-top: 12px;
        }

        .btn-action {
          flex: 1;
          border: none;
          padding: 10px 16px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          cursor: pointer;
          max-width: 150px;
        }

        @media (min-width: 768px) {
          .status-pill {
            position: absolute;
            top: 16px;
            right: 18px;
            margin-bottom: 0;
          }
          .btn-action {
            padding: 6px 16px;
            font-size: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .btn-action {
            max-width: none;
          }
        }
      `}</style>

      <div className="requests-container">
        {/* HEADER */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            color: AMBER(0.4),
            marginBottom: 4,
          }}>
            SYS · INVENTORY
          </div>
          <h1 style={{
            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
            fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
            fontWeight: 700,
            color: AMBER(0.95),
            margin: 0,
          }}>
            Inventory Requests
          </h1>
        </div>

        {/* EMPTY */}
        {requests.length === 0 && (
          <div style={{
            background: PANEL,
            border: `1px solid ${BORDER}`,
            padding: "40px 24px",
            textAlign: "center",
            color: AMBER(0.3),
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: "0.15em",
            fontSize: "0.7rem",
          }}>
            NO PENDING REQUESTS
          </div>
        )}

        {/* LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {requests.map(req => {
            const statusColor =
              req.status === "approved" ? GREEN(0.8)
              : req.status === "rejected" ? RED(0.8)
              : AMBER(0.8)

            return (
              <div key={req.id} className="request-card">
                {/* STATUS PILL */}
                <div className="status-pill" style={{ color: statusColor }}>
                  {req.status.toUpperCase()}
                </div>

                {/* REQUESTER */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{
                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: DIMWHITE(0.95),
                    lineHeight: 1.2
                  }}>
                    {req.requester_name}
                  </div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: AMBER(0.4),
                    letterSpacing: "0.12em",
                    marginTop: 2
                  }}>
                    {req.department}
                  </div>
                </div>

                {/* PURPOSE */}
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.68rem",
                  color: DIMWHITE(0.7),
                  marginBottom: 12,
                  lineHeight: 1.4
                }}>
                  <span style={{ color: AMBER(0.4) }}>PURPOSE // </span>
                  {req.purpose}
                </div>

                {/* ITEMS */}
                <div style={{ 
                  background: "rgba(0,0,0,0.2)", 
                  padding: "8px 12px", 
                  border: `1px solid ${AMBER(0.05)}` 
                }}>
                  {req.inventory_request_items.map((i, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: idx === req.inventory_request_items.length - 1 ? "none" : `1px solid ${AMBER(0.03)}`,
                        padding: "5px 0",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.65rem",
                        color: DIMWHITE(0.8),
                      }}
                    >
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>
                        {i.inventory_items.name}
                      </span>
                      <span style={{ color: AMBER(0.6), flexShrink: 0 }}>
                        QTY: {i.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                {req.status === "submitted" && (
                  <div className="actions-flex">
                    <button
                      onClick={() => updateStatus(req.id, "approved")}
                      className="btn-action"
                      style={{ background: GREEN(0.9), color: "#000" }}
                    >
                      APPROVE
                    </button>

                    <button
                      onClick={() => updateStatus(req.id, "rejected")}
                      className="btn-action"
                      style={{ background: RED(0.8), color: "#000" }}
                    >
                      REJECT
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
