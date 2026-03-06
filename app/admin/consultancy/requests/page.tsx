"use client"

import { useEffect, useState, useMemo } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

type ConsultationRequest = {
  id: string
  full_name: string
  email: string
  organization: string | null
  budget_range: string | null
  created_at: string
}

export default function ConsultationRequests() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState("")
  const [searchFoc,setSearchFoc]= useState(false)
  const [budgetFilter, setBudgetFilter] = useState("All")
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc")

  useEffect(() => { fetchRequests() }, [])

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  async function fetchRequests() {
    const { data, error } = await supabase
      .from("consultation_requests")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) { console.error("Error fetching requests:", error); setLoading(false); return }
    if (data) setRequests(data)
    setLoading(false)
  }

  /* ── CSV EXPORT ── */
  function exportCSV() {
    const rows = filteredSorted
    if (!rows.length) return
    const headers = ["Name", "Email", "Organization", "Budget Range", "Date"]
    const body = rows.map(r => [
      r.full_name, r.email, r.organization ?? "", r.budget_range ?? "",
      new Date(r.created_at).toLocaleDateString()
    ])
    const csv = [headers, ...body]
      .map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href = url; a.download = "consultation_requests.csv"; a.click()
    URL.revokeObjectURL(url)
  }

  /* ── BUDGET CATEGORIES ── */
  const budgetCategories = useMemo(() => {
    const cats = new Set(requests.map(r => r.budget_range ?? "Unspecified"))
    return ["All", ...Array.from(cats).sort()]
  }, [requests])

  /* ── FILTER + SORT ── */
  const filteredSorted = useMemo(() => {
    const q = search.toLowerCase()
    return requests
      .filter(r => {
        const matchSearch =
          r.full_name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          (r.organization ?? "").toLowerCase().includes(q)
        const matchBudget =
          budgetFilter === "All" || (r.budget_range ?? "Unspecified") === budgetFilter
        return matchSearch && matchBudget
      })
      .sort((a, b) => {
        const ta = new Date(a.created_at).getTime()
        const tb = new Date(b.created_at).getTime()
        return sortDir === "desc" ? tb - ta : ta - tb
      })
  }, [requests, search, budgetFilter, sortDir])

  /* ── GROUP BY BUDGET ── */
  const grouped = useMemo(() => {
    const map: Record<string, ConsultationRequest[]> = {}
    filteredSorted.forEach(r => {
      const key = r.budget_range ?? "Unspecified"
      if (!map[key]) map[key] = []
      map[key].push(r)
    })
    return map
  }, [filteredSorted])

  /* ── LOADING ── */
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`}</style>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>LOADING REQUESTS...</span>
        </div>
      </div>
    )
  }

  const showGrouped = budgetFilter === "All" && !search

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink   { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes crsshimmer{ from{left:-40%} to{left:140%} }
        input::placeholder   { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em }
        .crstable::-webkit-scrollbar { height:3px;background:${BG} }
        .crstable::-webkit-scrollbar-thumb { background:${AMBER(0.2)} }
        @media (max-width: 768px) {
          .crs-search-wrap { max-width: 100% !important; flex-basis: 100% !important; }
        }
        @media (max-width: 600px) {
          .crs-stat-strip { flex-direction: row !important; }
          .crs-toolbar > * { width: 100% !important; min-width: 0 !important; }
          .crs-hide-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          .crs-hide-tablet { display: none !important; }
          .crs-container   { padding: 18px 14px 40px !important; }
          .crs-stat-pill   { padding: 5px 10px !important; }
        }
        @media (max-width: 768px) {
          .crs-container { padding: 22px 18px 44px !important; }
        }
      `}</style>

      <div className="crs-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · CONSULTATION REQUESTS</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.25)},transparent)` }} />
        </div>

        {/* header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 22 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Consultation Requests
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>
              Incoming consultancy enquiries
            </p>
          </div>
          {/* stats strip */}
          <div className="crs-stat-strip" style={{ display: "flex", gap: 6 }}>
            <StatPill label="TOTAL"    value={requests.length} />
            <StatPill label="FILTERED" value={filteredSorted.length} dim={filteredSorted.length === requests.length} />
          </div>
        </div>

        {/* toolbar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14, alignItems: "stretch" }}>
          {/* search */}
          <div className="crs-search-wrap" style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 360 }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: searchFoc ? 2 : 1, background: searchFoc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
            <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, pointerEvents: "none" }} viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5.25" stroke={AMBER(searchFoc ? 0.5 : 0.2)} strokeWidth="1.5" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke={AMBER(searchFoc ? 0.5 : 0.2)} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              placeholder="SEARCH NAME, EMAIL, ORG..."
              value={search} onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFoc(true)} onBlur={() => setSearchFoc(false)}
              style={{ width: "100%", paddingLeft: 30, paddingRight: 10, paddingTop: 8, paddingBottom: 8, background: searchFoc ? "rgba(255,176,0,0.04)" : PANEL, borderTop: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`, borderRight: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`, borderBottom: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`, borderLeft: "none", outline: "none", color: DIMWHITE(0.8), fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.06em", transition: "background 0.2s" }}
            />
          </div>

          {/* sort toggle */}
          <SortBtn sortDir={sortDir} onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")} />

          {/* export */}
          <ExportBtn onClick={exportCSV} />
        </div>

        {/* budget filter pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
          {budgetCategories.map(cat => (
            <BudgetPill key={cat} label={cat} active={budgetFilter === cat} onClick={() => setBudgetFilter(cat)} />
          ))}
        </div>

        {/* content */}
        {filteredSorted.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>NO REQUESTS FOUND</span>
          </div>
        ) : showGrouped ? (
          /* grouped by budget */
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {Object.entries(grouped).map(([budget, rows]) => (
              <div key={budget}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: AMBER(0.5), whiteSpace: "nowrap" }}>{budget.toUpperCase()}</span>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.18)},transparent)` }} />
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.18em", color: AMBER(0.3) }}>{rows.length}</span>
                </div>
                <RequestTable rows={rows} />
              </div>
            ))}
          </div>
        ) : (
          /* flat filtered table */
          <RequestTable rows={filteredSorted} />
        )}
      </div>
    </div>
  )
}

/* ── REQUEST TABLE ── */
function RequestTable({ rows }: { rows: ConsultationRequest[] }) {
  return (
    <div className="crstable" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
        <thead>
          <tr style={{ background: "rgba(0,0,0,0.4)" }}>
            {["#", "NAME", "EMAIL", "ORGANIZATION", "BUDGET", "DATE"].map(h => (
              <th key={h} className={h === "ORGANIZATION" ? "crs-hide-mobile" : h === "#" ? "crs-hide-tablet" : ""} style={{ padding: "8px 14px", textAlign: "left", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.47rem", letterSpacing: "0.25em", color: AMBER(0.4), fontWeight: 400, borderBottom: `1px solid rgba(255,176,0,0.1)`, whiteSpace: "nowrap" as const }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <RequestRow key={r.id} req={r} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── REQUEST ROW ── */
function RequestRow({ req: r, index }: { req: ConsultationRequest; index: number }) {
  const [hov, setHov] = useState(false)
  const shortId = r.id.slice(0, 6).toUpperCase()
  return (
    <tr
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderBottom: `1px solid rgba(255,176,0,0.05)`, background: hov ? "rgba(255,176,0,0.03)" : index % 2 === 0 ? "transparent" : "rgba(255,176,0,0.012)", transition: "background 0.18s" }}
    >
      <td className="crs-hide-tablet" style={{ padding: "9px 14px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: AMBER(0.25) }}>
        {String(index + 1).padStart(2, "0")}
      </td>
      <td style={{ padding: "9px 14px" }}>
        <div style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 600, fontSize: "0.92rem", color: DIMWHITE(0.88) }}>{r.full_name}</div>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.44rem", letterSpacing: "0.15em", color: AMBER(0.25), marginTop: 1 }}>REQ·{shortId}</div>
      </td>
      <td style={{ padding: "9px 14px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", color: AMBER(0.5) }}>
        {r.email}
      </td>
      <td className="crs-hide-mobile" style={{ padding: "9px 14px", fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.8rem", color: DIMWHITE(0.45) }}>
        {r.organization ?? <span style={{ color: AMBER(0.2) }}>—</span>}
      </td>
      <td style={{ padding: "9px 14px" }}>
        {r.budget_range
          ? <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.14em", padding: "2px 8px", color: AMBER(0.75), background: AMBER(0.06), border: `1px solid ${AMBER(0.2)}` }}>{r.budget_range}</span>
          : <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", color: AMBER(0.2) }}>—</span>
        }
      </td>
      <td style={{ padding: "9px 14px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.55rem", color: AMBER(0.35), whiteSpace: "nowrap" as const }}>
        {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
      </td>
    </tr>
  )
}

/* ── STAT PILL ── */
function StatPill({ label, value, dim = false }: { label: string; value: number; dim?: boolean }) {
  return (
    <div className="crs-stat-pill" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "7px 14px", border: `1px solid ${AMBER(0.12)}`, background: PANEL }}>
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "1rem", fontWeight: 600, color: dim ? AMBER(0.3) : AMBER(0.85), lineHeight: 1 }}>{value}</span>
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.42rem", letterSpacing: "0.22em", color: AMBER(0.28), marginTop: 3 }}>{label}</span>
    </div>
  )
}

/* ── BUDGET PILL ── */
function BudgetPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.48rem", letterSpacing: "0.18em", padding: "4px 12px", background: active ? AMBER(0.9) : hov ? AMBER(0.06) : "transparent", border: `1px solid ${active ? AMBER(0.9) : hov ? AMBER(0.3) : AMBER(0.15)}`, color: active ? BG : hov ? AMBER(0.8) : AMBER(0.4), cursor: "pointer", fontWeight: active ? 600 : 400, transition: "all 0.18s" }}
    >
      {label.toUpperCase()}
    </button>
  )
}

/* ── SORT BUTTON ── */
function SortBtn({ sortDir, onClick }: { sortDir: "desc" | "asc"; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.18em", padding: "8px 14px", background: hov ? AMBER(0.06) : PANEL, borderTop: `1px solid ${hov ? AMBER(0.28) : AMBER(0.12)}`, borderRight: `1px solid ${hov ? AMBER(0.28) : AMBER(0.12)}`, borderBottom: `1px solid ${hov ? AMBER(0.28) : AMBER(0.12)}`, borderLeft: "none", color: hov ? AMBER(0.8) : AMBER(0.45), cursor: "pointer", transition: "all 0.18s", position: "relative" }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${AMBER(hov ? 0.6 : 0.2)},transparent)`, transition: "background 0.18s" }} />
      {sortDir === "desc" ? "↓ NEWEST" : "↑ OLDEST"}
    </button>
  )
}

/* ── EXPORT BUTTON ── */
function ExportBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.18em", padding: "8px 14px", background: hov ? AMBER(0.07) : "transparent", borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`, borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`, borderBottom: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`, borderLeft: "none", color: hov ? AMBER(0.85) : AMBER(0.5), cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.18s" }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${AMBER(hov ? 0.7 : 0.25)},transparent)`, transition: "background 0.18s" }} />
      <svg style={{ width: 11, height: 11 }} viewBox="0 0 14 14" fill="none">
        <path d="M7 2v8M3 7l4 4 4-4M2 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ position: "relative", zIndex: 1 }}>EXPORT CSV</span>
    </button>
  )
}