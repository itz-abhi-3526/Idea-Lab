
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import JSZip from 'jszip'

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const SKY      = (a = 1) => `rgba(56,189,248,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
const STATUS_FALLBACK = { label: "UNKNOWN",   color: DIMWHITE(0.3), bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" }
const STATUS_CFG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  submitted: { label: "SUBMITTED", color: AMBER(0.85), bg: AMBER(0.07), border: AMBER(0.28) },
  approved:  { label: "APPROVED",  color: SKY(0.85),   bg: SKY(0.07),   border: SKY(0.28)   },
  rejected:  { label: "REJECTED",  color: RED(0.85),   bg: RED(0.07),   border: RED(0.28)   },
  completed: { label: "COMPLETED", color: GREEN(0.85), bg: GREEN(0.07), border: GREEN(0.28) },
}

/* ─────────────────────────────────────────
   TYPES — unchanged
───────────────────────────────────────── */
type IncubationRequest = {
  id: string; name: string; contact_number: string
  request_type: '3d_printing' | 'laser_printing'
  status: 'submitted' | 'approved' | 'rejected' | 'completed'
  estimated_cost: number; preferred_date: string; preferred_time: string
  created_at: string; admin_remarks: string | null
  sliced_model_screenshot_url: string | null
  payment_screenshot_url: string | null
  design_files_urls: string[] | null
}

/* ─────────────────────────────────────────
   ZIP DOWNLOAD — unchanged
───────────────────────────────────────── */
async function downloadZip(req: IncubationRequest) {
  const zip = new JSZip()
  const folder = zip.folder(`incubation-request-${req.id}`)
  if (!folder) return
  const files: { url: string; name: string }[] = []
  if (req.sliced_model_screenshot_url) files.push({ url: req.sliced_model_screenshot_url, name: 'sliced-model.png' })
  if (req.payment_screenshot_url)      files.push({ url: req.payment_screenshot_url,      name: 'payment-proof.png' })
  req.design_files_urls?.forEach((url, i) => files.push({ url, name: `design-file-${i + 1}.stl` }))
  for (const file of files) { const blob = await (await fetch(file.url)).blob(); folder.file(file.name, blob) }
  const content = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(content)
  a.download = `incubation-request-${req.id}.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

/* ─────────────────────────────────────────
   ACTION BUTTON
───────────────────────────────────────── */
function ActionBtn({ label, onClick, color, bg, border }: {
  label: string; onClick: () => void; color: string; bg: string; border: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em",
        padding: "8px 14px", background: hov ? bg : "transparent",
        borderTop: `1px solid ${border}`, borderRight: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`, borderLeft: "none",
        color, cursor: "pointer", position: "relative", overflow: "hidden",
        transition: "background 0.18s", whiteSpace: "nowrap" as const, flex: 1
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, opacity: hov ? 1 : 0.4, transition: "opacity 0.18s" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  )
}

/* ─────────────────────────────────────────
   TAB BUTTON
───────────────────────────────────────── */
function TabBtn({ label, active, onClick, count }: {
  label: string; active: boolean; onClick: () => void; count?: number
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em",
        padding: "10px 16px", flex: 1,
        background: active ? `rgba(255,176,0,0.09)` : hov ? `rgba(255,176,0,0.04)` : "transparent",
        borderTop:    `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
        borderRight:  `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
        borderBottom: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
        borderLeft:   "none",
        color: active ? AMBER(0.9) : DIMWHITE(0.3),
        cursor: "pointer", position: "relative", transition: "background 0.18s, color 0.18s",
      }}
    >
      {active && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)` }} />}
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
      {count !== undefined && (
        <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: active ? AMBER(0.85) : DIMWHITE(0.25), background: active ? AMBER(0.1) : "rgba(255,255,255,0.04)", padding: "0 5px", border: `1px solid ${active ? AMBER(0.2) : "rgba(255,255,255,0.06)"}` }}>
          {count}
        </span>
      )}
    </button>
  )
}

/* ─────────────────────────────────────────
   REQUEST CARD
───────────────────────────────────────── */
function RequestCard({ req, onApprove, onReject, onComplete, onDownload, onRemark }: {
  req: IncubationRequest
  onApprove: () => void; onReject: () => void; onComplete: () => void
  onDownload: () => void; onRemark: () => void
}) {
  const [hov, setHov] = useState(false)
  const cfg     = STATUS_CFG[req.status] ?? STATUS_FALLBACK
  const shortId = req.id.slice(0, 8).toUpperCase()
  const typeLabel = req.request_type === '3d_printing' ? '3D PRINTING' : 'LASER PRINTING'

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
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: hov ? 2 : 1, background: `linear-gradient(to bottom, transparent, ${cfg.color}, transparent)`, opacity: hov ? 0.85 : 0.35, transition: "opacity 0.22s, width 0.15s" }} />
      
      <div style={{ padding: "16px 18px 14px 20px" }}>
        <div className="card-inner-flex">

          {/* ── LEFT ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.28) }}>INC·{shortId}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.18em", padding: "1px 7px", color: AMBER(0.6), border: `1px solid ${AMBER(0.2)}`, background: AMBER(0.05) }}>{typeLabel}</span>
            </div>

            {/* name */}
            <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: DIMWHITE(0.9), lineHeight: 1.1, marginBottom: 8 }}>
              {req.name}
            </div>

            {/* details */}
            {[
              { k: "CONTACT", v: req.contact_number },
              { k: "SLOT",    v: `${req.preferred_date} · ${req.preferred_time}` },
              { k: "CREATED", v: new Date(req.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
            ].map(d => (
              <div key={d.k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.14em", color: AMBER(0.3), minWidth: 60 }}>{d.k}</span>
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: DIMWHITE(0.55), overflow: "hidden", textOverflow: "ellipsis" }}>{d.v}</span>
              </div>
            ))}

            {/* admin remark */}
            {req.admin_remarks && (
              <div style={{ marginTop: 12, padding: "10px 12px", background: AMBER(0.05), border: `1px solid ${AMBER(0.15)}`, borderLeft: "none", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, ${AMBER(0.7)}, transparent)` }} />
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.47rem", letterSpacing: "0.2em", color: AMBER(0.45), marginBottom: 4 }}>ADMIN REMARK</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: AMBER(0.7), lineHeight: 1.5 }}>{req.admin_remarks}</div>
              </div>
            )}

            {/* download + remark buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <button
                onClick={onDownload}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em",
                  padding: "9px 16px", background: AMBER(0.9), border: "none",
                  color: BG, fontWeight: 700, cursor: "pointer",
                  boxShadow: `0 0 12px ${AMBER(0.2)}`, flex: 1, minWidth: '140px'
                }}
              >
                ↓ DOWNLOAD ZIP
              </button>

              <button
                onClick={onRemark}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em",
                  padding: "9px 16px", background: "transparent",
                  borderTop: `1px solid ${AMBER(0.18)}`, borderRight: `1px solid ${AMBER(0.18)}`,
                  borderBottom: `1px solid ${AMBER(0.18)}`, borderLeft: "none",
                  color: AMBER(0.5), cursor: "pointer", flex: 1, minWidth: '140px'
                }}
              >
                {req.admin_remarks ? 'EDIT REMARK' : 'ADD REMARK'}
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="card-right-section">
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", padding: "4px 12px", color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, whiteSpace: "nowrap" }}>
              {cfg.label}
            </span>

            <div style={{ display: "flex", alignItems: "baseline", gap: 6, padding: "8px 14px", background: "rgba(0,0,0,0.25)", border: `1px solid ${AMBER(0.08)}`, width: '100%', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.15em", color: AMBER(0.3) }}>EST COST</span>
              <span style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: AMBER(0.85) }}>₹{req.estimated_cost}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "row", gap: 6, width: '100%' }}>
              {req.status !== 'approved'  && <ActionBtn label="APPROVE"  onClick={onApprove}  color={SKY(0.8)}   bg={SKY(0.08)}   border={SKY(0.28)}   />}
              {req.status !== 'rejected'  && <ActionBtn label="REJECT"   onClick={onReject}   color={RED(0.8)}   bg={RED(0.08)}   border={RED(0.28)}   />}
              {req.status !== 'completed' && <ActionBtn label="COMPLETE" onClick={onComplete} color={GREEN(0.8)} bg={GREEN(0.08)} border={GREEN(0.28)} />}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .card-inner-flex { display: flex; flex-direction: column; gap: 20px; }
        .card-right-section { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
        
        @media (min-width: 768px) {
          .card-inner-flex { flex-direction: row; justify-content: space-between; }
          .card-right-section { align-items: flex-end; min-width: 180px; width: auto; }
          .card-right-section > div:last-child { flex-direction: column; align-items: flex-end; }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function AdminIncubationRequestsPage() {
  const [requests,    setRequests]    = useState<IncubationRequest[]>([])
  const [loading,     setLoading]     = useState(true)
  const [tab,         setTab]         = useState<'pending' | 'past'>('pending')
  const [search,      setSearch]      = useState('')
  const [remarksFor,  setRemarksFor]  = useState<IncubationRequest | null>(null)
  const [remarksText, setRemarksText] = useState('')
  const [rejectFor,   setRejectFor]   = useState<IncubationRequest | null>(null)
  const [searchFoc,   setSearchFoc]   = useState(false)

  const fetchRequests = async () => {
    const { data } = await supabase.from('incubation_requests').select('*').order('created_at', { ascending: false })
    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchRequests()
    const channel = supabase.channel('admin-incubation-requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incubation_requests' }, fetchRequests)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const filteredRequests = useMemo(() => {
    return requests
      .filter(r => tab === 'pending' ? r.status === 'submitted' : r.status !== 'submitted')
      .filter(r => `${r.name} ${r.contact_number}`.toLowerCase().includes(search.toLowerCase()))
  }, [requests, tab, search])

  const updateStatus = async (req: IncubationRequest, status: IncubationRequest['status']) => {
    await supabase.from('incubation_requests').update({ status }).eq('id', req.id)
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status } : r))
    if (status !== 'submitted') { setTimeout(() => setTab('past'), 150) }
  }

  const saveRemarks = async () => {
    if (!remarksFor) return
    await supabase.from('incubation_requests').update({ admin_remarks: remarksText }).eq('id', remarksFor.id)
    setRequests(prev => prev.map(r => r.id === remarksFor.id ? { ...r, admin_remarks: remarksText } : r))
    setRemarksFor(null); setRemarksText('')
  }

  const deleteRemarks = async () => {
    if (!remarksFor) return
    await supabase.from('incubation_requests').update({ admin_remarks: null }).eq('id', remarksFor.id)
    setRequests(prev => prev.map(r => r.id === remarksFor.id ? { ...r, admin_remarks: null } : r))
    setRemarksFor(null); setRemarksText('')
  }

  const pendingCount = requests.filter(r => r.status === 'submitted').length
  const pastCount    = requests.filter(r => r.status !== 'submitted').length

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        input::placeholder { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em }
        
        .tab-search-flex { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .tabs-row { display: flex; gap: 4px; }
        .search-container { position: relative; width: 100%; }

        @media (min-width: 768px) {
          .tab-search-flex { flex-direction: row; align-items: stretch; gap: 12px; }
          .tabs-row { flex: none; width: auto; }
          .search-container { flex: 1; }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 16px 48px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: 'nowrap' }}>SYS · INCUBATION REQUESTS</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
            Incubation Requests
          </h1>
          <p style={{ fontFamily: "'IBM Plex Sans'", fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 6 }}>
            Review, approve, and manage project incubation
          </p>
        </div>

        <div className="tab-search-flex">
          <div className="tabs-row">
            <TabBtn label="PENDING" active={tab === 'pending'} onClick={() => setTab('pending')} count={pendingCount} />
            <TabBtn label="PAST"    active={tab === 'past'}    onClick={() => setTab('past')}    count={pastCount}    />
          </div>

          <div className="search-container">
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: searchFoc ? 2 : 1, background: searchFoc ? AMBER(0.85) : AMBER(0.18), transition: "all 0.2s" }} />
            <input
              placeholder="SEARCH NAME OR CONTACT..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFoc(true)}
              onBlur={() => setSearchFoc(false)}
              style={{
                width: "100%", padding: "10px 14px",
                background: searchFoc ? `rgba(255,176,0,0.04)` : PANEL,
                borderTop: `1px solid ${AMBER(0.1)}`, borderRight: `1px solid ${AMBER(0.1)}`,
                borderBottom: `1px solid ${AMBER(0.1)}`, borderLeft: "none",
                outline: "none", color: DIMWHITE(0.85), fontFamily: "'IBM Plex Mono'", fontSize: "0.7rem", letterSpacing: "0.05em"
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.5rem", letterSpacing: "0.22em", color: AMBER(0.25) }}>
            {filteredRequests.length} RECORD{filteredRequests.length !== 1 ? "S" : ""} FOUND
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)` }} />
        </div>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "40px 0" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.8), animation: "mcblink 0.9s infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.68rem", color: AMBER(0.35) }}>LOADING...</span>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div style={{ padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL, textAlign: "center" }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.65rem", color: AMBER(0.25) }}>NO REQUESTS FOUND</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredRequests.map(req => (
              <RequestCard
                key={req.id} req={req}
                onApprove={() => updateStatus(req, 'approved')}
                onReject={() => setRejectFor(req)}
                onComplete={() => updateStatus(req, 'completed')}
                onDownload={() => downloadZip(req)}
                onRemark={() => { setRemarksFor(req); setRemarksText(req.admin_remarks || '') }}
              />
            ))}
          </div>
        )}
      </div>

      {rejectFor && (
        <RejectModal
          onConfirm={() => { updateStatus(rejectFor, 'rejected'); setRejectFor(null) }}
          onCancel={() => setRejectFor(null)}
        />
      )}

      {remarksFor && (
        <RemarksModal
          remarksFor={remarksFor} remarksText={remarksText}
          onChange={setRemarksText} onSave={saveRemarks}
          onDelete={deleteRemarks} onCancel={() => setRemarksFor(null)}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   MODALS (Corrected for Responsive)
───────────────────────────────────────── */
function RejectModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 360, background: BG, border: `1px solid ${RED(0.3)}`, padding: "24px", position: "relative" }}>
        <h3 style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "1.2rem", color: RED(0.85), margin: "0 0 10px" }}>Confirm Rejection</h3>
        <p style={{ fontSize: "0.85rem", color: DIMWHITE(0.4), marginBottom: 20 }}>Are you sure you want to reject this request? This action is permanent.</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onCancel} style={{ background: "transparent", border: `1px solid ${AMBER(0.2)}`, color: AMBER(0.4), padding: "8px 16px", cursor: "pointer", fontSize: '0.6rem' }}>CANCEL</button>
          <button onClick={onConfirm} style={{ background: RED(0.85), border: "none", color: "#000", padding: "8px 20px", fontWeight: 700, cursor: "pointer", fontSize: '0.6rem' }}>REJECT</button>
        </div>
      </div>
    </div>
  )
}

function RemarksModal({ remarksFor, remarksText, onChange, onSave, onDelete, onCancel }: {
  remarksFor: IncubationRequest; remarksText: string
  onChange: (v: string) => void; onSave: () => void
  onDelete: () => void; onCancel: () => void
}) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", padding: 12 }}>
      <div style={{ width: "100%", maxWidth: 480, background: BG, border: `1px solid ${AMBER(0.2)}`, padding: "24px", position: "relative", maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.5rem", color: AMBER(0.4), marginBottom: 4 }}>SYS · ADMIN REMARKS</div>
        <h3 style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "1.3rem", color: AMBER(0.9), marginBottom: 16 }}>{remarksFor.admin_remarks ? 'Edit Remark' : 'Add Remark'}</h3>
        
        <textarea
          value={remarksText}
          onChange={e => onChange(e.target.value)}
          placeholder="Enter remarks…"
          rows={5}
          style={{
            width: "100%", background: "rgba(0,0,0,0.3)", border: `1px solid ${AMBER(0.1)}`,
            color: DIMWHITE(0.85), padding: "12px", outline: "none", fontFamily: "inherit",
            fontSize: "0.9rem", resize: "none", marginBottom: 20
          }}
        />

        <div style={{ display: "flex", flexWrap: 'wrap', gap: 12, justifyContent: "space-between", alignItems: 'center' }}>
          {remarksFor.admin_remarks ? (
            <button onClick={onDelete} style={{ background: "transparent", border: "none", color: RED(0.6), cursor: "pointer", fontSize: '0.6rem', textDecoration: 'underline' }}>DELETE REMARK</button>
          ) : <div />}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onCancel} style={{ background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), padding: "10px 18px", fontSize: '0.6rem' }}>CANCEL</button>
            <button onClick={onSave} style={{ background: AMBER(0.9), border: "none", color: "#000", padding: "10px 22px", fontWeight: 700, fontSize: '0.6rem' }}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  )
}
