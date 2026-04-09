
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AddInventoryModal, {
  InventoryItem,
} from "../../../components/admin/AddInventoryModal"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const id = "inventory-mc-fonts"
    if (document.getElementById(id)) return
    const l = document.createElement("link")
    l.id   = id
    l.rel  = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400&display=swap"
    document.head.prepend(l)
  }, [])
}

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const YELLOW   = (a = 1) => `rgba(255,200,80,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

/* ─────────────────────────────────────────
   MC INPUT
───────────────────────────────────────── */
function MCInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  const [foc, setFoc] = useState(false)
  return (
    <div className="mc-input-container" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: foc ? 2 : 1,
          background: foc
            ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)`
            : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`,
        }}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFoc(true)}
        onBlur={() => setFoc(false)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "9px 12px 9px 14px",
          background: foc ? `rgba(255,176,0,0.04)` : PANEL,
          borderTop: `1px solid ${AMBER(0.1)}`,
          borderRight: `1px solid ${AMBER(0.1)}`,
          borderBottom: `1px solid ${AMBER(0.1)}`,
          borderLeft: "none",
          outline: "none",
          color: DIMWHITE(0.8),
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.06em",
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function InventoryPage() {
  useFonts()

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
      .on("postgres_changes", { event: "*", schema: "public", table: "inventory_items" }, fetchItems)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
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

  const stats = {
    total: items.length,
    active: items.filter((i) => i.is_active).length,
    low: items.filter((i) => i.quantity_available < 10).length,
    critical: items.filter((i) => i.quantity_available < 5).length,
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        .mc-input-container { width: 100%; max-width: 320px; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); border: 1px solid ${AMBER(0.12)}; margin-bottom: 18px; }
        .stats-item { padding: 12px 18px; border-bottom: 1px solid ${AMBER(0.12)}; }
        .stats-item:nth-child(even) { border-left: 1px solid ${AMBER(0.12)}; }
        .stats-item:nth-last-child(-n+2) { border-bottom: none; }
        
        .desktop-table { display: none; }
        .mobile-cards { display: flex; flex-direction: column; gap: 10px; }

        @media (min-width: 768px) {
          .stats-grid { display: flex; }
          .stats-item { border-bottom: none !important; border-left: 1px solid ${AMBER(0.12)}; flex: 1; }
          .stats-item:first-child { border-left: none; }
          .desktop-table { display: block; overflow-x: auto; border: 1px solid ${BORDER}; }
          .mobile-cards { display: none; }
        }

        @media (max-width: 480px) {
          .mc-input-container { max-width: none; }
          .header-flex { flex-direction: column; align-items: stretch !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 16px 48px" }}>

        {/* ── RULE ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: 'nowrap' }}>
            SYS · INVENTORY REGISTRY
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)` }} />
        </div>

        {/* ── HEADER ── */}
        <div className="header-flex" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 22 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>
              Inventory
            </h1>
            <p style={{ fontFamily: "'IBM Plex Sans'", fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 6 }}>
              Manage items, stock levels and availability
            </p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            style={{
              padding: "10px 20px",
              background: AMBER(0.9),
              color: BG,
              border: "none",
              fontFamily: "'IBM Plex Mono'",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            + ADD ITEM
          </button>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="stats-grid">
          {[
            ["TOTAL", stats.total],
            ["ACTIVE", stats.active],
            ["LOW", stats.low],
            ["CRITICAL", stats.critical],
          ].map(([l, v]) => (
            <div key={l as string} className="stats-item">
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.47rem", letterSpacing: "0.22em", color: AMBER(0.35) }}>{l}</div>
              <div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: "1.25rem", color: AMBER(0.85) }}>{v}</div>
            </div>
          ))}
        </div>

        {/* ── CONTROLS ── */}
        <div style={{ marginBottom: 18 }}>
          <MCInput value={search} onChange={setSearch} placeholder="SEARCH ITEMS OR CATEGORY..." />
        </div>

        {/* ── CONTENT ── */}
        {loading ? (
          <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.35) }}>
            LOADING INVENTORY...
          </span>
        ) : filteredItems.length === 0 ? (
          <div style={{ padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL, textAlign: "center" }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>
              NO ITEMS FOUND
            </span>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="desktop-table">
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'IBM Plex Mono'" }}>
                <thead>
                  <tr style={{ background: "rgba(255,176,0,0.05)" }}>
                    {["ITEM","CATEGORY","TOTAL","AVAILABLE","HEALTH","STATUS","ACTION"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", fontSize: "0.55rem", letterSpacing: "0.22em", color: AMBER(0.4), textAlign: "left", borderBottom: `1px solid ${AMBER(0.15)}` }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => (
                    <tr key={item.id} style={{ borderBottom: `1px solid ${AMBER(0.06)}` }}>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700 }}>{item.name}</div>
                        <div style={{ fontSize: "0.55rem", color: AMBER(0.35) }}>{item.description}</div>
                      </td>
                      <td style={{ padding: "10px 14px" }}>{item.category}</td>
                      <td style={{ padding: "10px 14px" }}>{item.quantity_total}</td>
                      <td style={{ padding: "10px 14px" }}>{item.quantity_available}</td>
                      <td style={{ padding: "10px 14px" }}>{health(item.quantity_available)}</td>
                      <td style={{ padding: "10px 14px" }}>{item.is_active ? "ACTIVE" : "INACTIVE"}</td>
                      <td style={{ padding: "10px 14px", display: "flex", gap: 10 }}>
                        <button onClick={() => setEditItem(item)} style={actionBtn()}>EDIT</button>
                        <button onClick={() => toggleActive(item)} style={actionBtn(item.is_active ? RED(0.7) : GREEN(0.7))}>
                          {item.is_active ? "DISABLE" : "ENABLE"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="mobile-cards">
              {filteredItems.map(item => (
                <div key={item.id} style={{ background: PANEL, border: `1px solid ${BORDER}`, padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: '0.5rem', color: AMBER(0.4) }}>{item.category?.toUpperCase()}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: '0.5rem' }}>{health(item.quantity_available)}</span>
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ fontSize: "0.65rem", color: DIMWHITE(0.4), marginBottom: '12px' }}>{item.description}</div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '10px 0', borderTop: `1px solid ${AMBER(0.06)}`, borderBottom: `1px solid ${AMBER(0.06)}`, marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.5rem', color: AMBER(0.3) }}>TOTAL</div>
                      <div style={{ fontSize: '0.9rem' }}>{item.quantity_total}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.5rem', color: AMBER(0.3) }}>AVAILABLE</div>
                      <div style={{ fontSize: '0.9rem' }}>{item.quantity_available}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setEditItem(item)} style={{ ...actionBtn(), flex: 1, padding: '8px' }}>EDIT</button>
                    <button onClick={() => toggleActive(item)} style={{ ...actionBtn(item.is_active ? RED(0.7) : GREEN(0.7)), flex: 1, padding: '8px' }}>
                      {item.is_active ? "DISABLE" : "ENABLE"}
                    </button>
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
    </div>
  )
}

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const actionBtn = (color = AMBER(0.6)) => ({
  background: "transparent",
  border: `1px solid ${color}`,
  color,
  padding: "4px 10px",
  fontSize: "0.55rem",
  letterSpacing: "0.2em",
  cursor: "pointer",
  fontFamily: "'IBM Plex Mono'",
})

const health = (a: number) =>
  a < 5
    ? <span style={{ color: RED(0.8) }}>CRITICAL</span>
    : a < 10
    ? <span style={{ color: YELLOW(0.8) }}>LOW</span>
    : <span style={{ color: GREEN(0.8) }}>OK</span>
