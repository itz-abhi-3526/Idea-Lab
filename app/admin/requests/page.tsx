"use client"

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
          letterSpacing: "0.3em",
          color: AMBER(0.4),
          marginBottom: 4,
        }}>
          SYS · INVENTORY
        </div>
        <h1 style={{
          fontFamily: "'IBM Plex Sans Condensed', sans-serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: AMBER(0.9),
        }}>
          Inventory Requests
        </h1>
      </div>

      {/* EMPTY */}
      {requests.length === 0 && (
        <div style={{
          background: PANEL,
          border: `1px solid ${BORDER}`,
          padding: "24px",
          textAlign: "center",
          color: AMBER(0.4),
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.15em",
          fontSize: "0.7rem",
        }}>
          NO REQUESTS FOUND
        </div>
      )}

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {requests.map(req => {
          const statusColor =
            req.status === "approved" ? GREEN(0.8)
            : req.status === "rejected" ? RED(0.8)
            : AMBER(0.8)

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
              {/* STATUS PILL */}
              <div style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: statusColor,
              }}>
                {req.status.toUpperCase()}
              </div>

              {/* REQUESTER */}
              <div style={{ marginBottom: 10 }}>
                <div style={{
                  fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: DIMWHITE(0.9),
                }}>
                  {req.requester_name}
                </div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  color: AMBER(0.4),
                  letterSpacing: "0.15em",
                }}>
                  {req.department}
                </div>
              </div>

              {/* PURPOSE */}
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: DIMWHITE(0.75),
                marginBottom: 10,
              }}>
                <span style={{ color: AMBER(0.5) }}>PURPOSE:</span>{" "}
                {req.purpose}
              </div>

              {/* ITEMS */}
              <div style={{ marginBottom: 12 }}>
                {req.inventory_request_items.map((i, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: `1px solid ${AMBER(0.06)}`,
                      padding: "3px 0",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      color: DIMWHITE(0.8),
                    }}
                  >
                    <span>{i.inventory_items.name}</span>
                    <span style={{ color: AMBER(0.6) }}>
                      × {i.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              {req.status === "submitted" && (
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button
                    onClick={() => updateStatus(req.id, "approved")}
                    style={{
                      background: GREEN(0.9),
                      border: "none",
                      padding: "6px 16px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      cursor: "pointer",
                    }}
                  >
                    APPROVE
                  </button>

                  <button
                    onClick={() => updateStatus(req.id, "rejected")}
                    style={{
                      background: RED(0.85),
                      border: "none",
                      padding: "6px 16px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      cursor: "pointer",
                      color: "#000",
                    }}
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
  )
}