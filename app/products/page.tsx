"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/ProductCard"

/* ─────────────────────────── constants ─────────────────────────── */
const CATEGORIES = ["All", "Software", "Hardware", "Research", "Tools", "AI/ML"]

const SORT_OPTIONS = [
  { label: "Newest First", value: "created_at_desc" },
  { label: "Oldest First", value: "created_at_asc"  },
  { label: "Name A → Z",  value: "title_asc"        },
  { label: "Name Z → A",  value: "title_desc"       },
]

const PAGE_SIZE = 9

/* ─────────────────────────── component ─────────────────────────── */
export default function ProductsPage() {
  const [products,       setProducts]       = useState<any[]>([])
  const [search,         setSearch]         = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy,         setSortBy]         = useState("created_at_desc")
  const [loading,        setLoading]        = useState(true)
  const [pageReady,      setPageReady]      = useState(false)   // ← controls full-page loader
  const [loaderOut,      setLoaderOut]      = useState(false)   // ← triggers exit animation
  const [viewMode,       setViewMode]       = useState<"grid" | "list">("grid")
  const [visibleCount,   setVisibleCount]   = useState(PAGE_SIZE)
  const [sortOpen,       setSortOpen]       = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node))
        setSortOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  /* fetch – DB logic untouched */
  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
    if (data) setProducts(data)
    setLoading(false)

    /* give the loader a minimum of 1.4s so it doesn't flash */
    setTimeout(() => {
      setLoaderOut(true)                        // start exit animation
      setTimeout(() => setPageReady(true), 500) // unmount after fade
    }, 1400)
  }

  /* filter + sort */
  const filtered = products
    .filter((p: any) => {
      const q = search.toLowerCase()
      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      const matchCat =
        activeCategory === "All" || p.category === activeCategory
      return matchSearch && matchCat
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "created_at_desc": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "created_at_asc":  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "title_asc":       return a.title.localeCompare(b.title)
        case "title_desc":      return b.title.localeCompare(a.title)
        default: return 0
      }
    })

  const visible   = filtered.slice(0, visibleCount)
  const hasMore   = visibleCount < filtered.length
  const remaining = filtered.length - visibleCount

  const resetPagination = useCallback(() => setVisibleCount(PAGE_SIZE), [])
  const currentSort = SORT_OPTIONS.find(o => o.value === sortBy)!

  /* ──────────────────────────── render ──────────────────────────── */
  return (
    <>
      <style>{CSS}</style>

      {/* ░░░░░░░░░░░░  FULL-PAGE LOADER  ░░░░░░░░░░░░ */}
      {!pageReady && (
        <div className={`ldr-wrap ${loaderOut ? "out" : ""}`} aria-hidden={loaderOut}>

          {/* ambient glows */}
          <div className="ldr-glow ldr-glow--a" />
          <div className="ldr-glow ldr-glow--b" />

          {/* noise */}
          <div className="pl-noise" />

          {/* centre content */}
          <div className="ldr-center">

            {/* animated logo mark */}
            <div className="ldr-mark">
              <svg className="ldr-hex" viewBox="0 0 56 64" fill="none">
                <path
                  d="M28 2L54 17v30L28 62 2 47V17z"
                  stroke="url(#hexGrad)" strokeWidth="1.5"
                  strokeLinejoin="round"
                  className="ldr-hex-path"
                />
                <defs>
                  <linearGradient id="hexGrad" x1="2" y1="2" x2="54" y2="62" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00D282"/>
                    <stop offset="1" stopColor="#4DFFCB" stopOpacity="0.4"/>
                  </linearGradient>
                </defs>
              </svg>
              {/* spinning ring */}
              <svg className="ldr-ring" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" stroke="rgba(0,210,130,0.12)" strokeWidth="1"/>
                <circle
                  cx="40" cy="40" r="36"
                  stroke="url(#ringGrad)" strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="60 165"
                  className="ldr-ring-arc"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="4" y1="4" x2="76" y2="76" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00D282"/>
                    <stop offset="1" stopColor="#4DFFCB" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* wordmark */}
            <div className="ldr-wordmark">
              <span className="ldr-lab">IDEA Lab</span>
              <span className="ldr-slash">/</span>
              <span className="ldr-products">Products</span>
            </div>

            {/* progress bar */}
            <div className="ldr-bar-wrap">
              <div className="ldr-bar-track">
                <div className="ldr-bar-fill" />
              </div>
              <span className="ldr-bar-label">Loading …</span>
            </div>

          </div>

          {/* bottom tagline */}
          <p className="ldr-tagline">// FISAT AICTE · from prototype → production</p>
        </div>
      )}

      {/* ░░░░░░░░░░░░  PAGE  ░░░░░░░░░░░░ */}
      <div className={`pl-root ${pageReady ? "page-visible" : "page-hidden"}`}>
        <div className="pl-noise" aria-hidden />

        {/* ░░ HERO */}
        <header className="pl-hero">
          <div className="pl-hero-bg" aria-hidden />
          <div className="pl-hero-inner">
            <div className="pl-hero-text">
              <span className="pl-eyebrow">
                <span className="pl-dot" />
                FISAT AICTE IDEA Lab
              </span>
              <h1 className="pl-title">
                Lab-Born<br /><em>Products.</em>
              </h1>
              <p className="pl-tagline-txt">// from prototype → production</p>
            </div>

            <div className="pl-hero-meta">
              <div className="pl-meta-item">
                <span className="pl-meta-num">{products.length}</span>
                <span className="pl-meta-label">Products</span>
              </div>
              <div className="pl-meta-sep" />
              <div className="pl-meta-item">
                <span className="pl-meta-num">{CATEGORIES.length - 1}</span>
                <span className="pl-meta-label">Categories</span>
              </div>
              <div className="pl-meta-sep" />
              <div className="pl-meta-item">
                <span className="pl-meta-num">
                  {products.filter((p: any) => p.status === "completed").length}
                </span>
                <span className="pl-meta-label">Completed</span>
              </div>
            </div>
          </div>
        </header>

        {/* ░░ STICKY TOOLBAR */}
        <div className="pl-bar-wrap">
          <div className="pl-bar">

            {/* Search */}
            <label className="pl-search-label">
              <svg className="pl-search-ico" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5.25" stroke="currentColor" strokeWidth="1.5" />
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                className="pl-search"
                placeholder="Search products, tech, descriptions…"
                value={search}
                onChange={e => { setSearch(e.target.value); resetPagination() }}
              />
              {search && (
                <button className="pl-clear" onClick={() => { setSearch(""); resetPagination() }}>
                  ×
                </button>
              )}
            </label>

            <div className="pl-bar-right">
              {/* Sort dropdown */}
              <div className="pl-sort" ref={sortRef}>
                <button
                  className={`pl-sort-btn ${sortOpen ? "open" : ""}`}
                  onClick={() => setSortOpen(v => !v)}
                >
                  {currentSort.label}
                  <svg className="pl-chev" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {sortOpen && (
                  <ul className="pl-sort-menu">
                    {SORT_OPTIONS.map(opt => (
                      <li key={opt.value}>
                        <button
                          className={`pl-sort-opt ${sortBy === opt.value ? "on" : ""}`}
                          onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                        >
                          {opt.label}
                          {sortBy === opt.value && (
                            <svg viewBox="0 0 10 8" fill="none" width="10">
                              <path d="M1 4l3 3L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* View toggle */}
              <div className="pl-view" role="group">
                <button
                  className={`pl-vbtn ${viewMode === "grid" ? "on" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <svg viewBox="0 0 14 14" fill="currentColor" width="12">
                    <rect x="0" y="0" width="6" height="6" rx="1.2" />
                    <rect x="8" y="0" width="6" height="6" rx="1.2" />
                    <rect x="0" y="8" width="6" height="6" rx="1.2" />
                    <rect x="8" y="8" width="6" height="6" rx="1.2" />
                  </svg>
                </button>
                <button
                  className={`pl-vbtn ${viewMode === "list" ? "on" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <svg viewBox="0 0 14 12" fill="currentColor" width="12">
                    <rect x="0" y="0"   width="14" height="3"   rx="1.2" />
                    <rect x="0" y="4.5" width="14" height="3"   rx="1.2" />
                    <rect x="0" y="9"   width="14" height="3"   rx="1.2" />
                  </svg>
                </button>
              </div>

              {/* Count */}
              <span className="pl-count">
                <b>{filtered.length}</b> {filtered.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>

          {/* Category pills */}
          <div className="pl-cats-wrap">
            <div className="pl-cats">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`pl-cat ${activeCategory === cat ? "on" : ""}`}
                  onClick={() => { setActiveCategory(cat); resetPagination() }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ░░ CONTENT */}
        <main className="pl-main">
          {filtered.length === 0 ? (
            <div className="pl-empty">
              <div className="pl-empty-sym">∅</div>
              <p className="pl-empty-title">Nothing here</p>
              <p className="pl-empty-sub">Adjust your search or try a different category</p>
              <button
                className="pl-empty-btn"
                onClick={() => { setSearch(""); setActiveCategory("All"); resetPagination() }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "pl-grid" : "pl-list"}>
                {visible.map((product: any, i: number) => (
                  <div
                    key={product.id}
                    className={`pl-shell ${viewMode}`}
                    style={{ animationDelay: `${Math.min(i % PAGE_SIZE, 8) * 0.055}s` }}
                  >
                    <span className="pl-shell-line" aria-hidden />
                    <ProductCard product={product} viewMode={viewMode} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="pl-more">
                  <div className="pl-more-line" />
                  <button
                    className="pl-more-btn"
                    onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                  >
                    <span>Load {Math.min(remaining, PAGE_SIZE)} more</span>
                    <svg viewBox="0 0 14 14" fill="none" width="13">
                      <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="pl-more-line" />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

/* ── tokens ──────────────────────────────────────────────────────── */
.pl-root, .ldr-wrap {
  --bg:          #07090E;
  --bg-card:     #0C0F18;
  --border:      rgba(255,255,255,0.07);
  --border-hi:   rgba(0,210,130,0.28);
  --accent:      #00D282;
  --accent-lo:   rgba(0,210,130,0.10);
  --text:        #ECF0F8;
  --text-mid:    rgba(236,240,248,0.55);
  --text-dim:    rgba(236,240,248,0.24);
  --mono:        'DM Mono', monospace;
  --sans:        'Syne', sans-serif;
  --rad:         13px;
  --spring:      cubic-bezier(0.34,1.4,0.64,1);
}

/* ════════════════════════════════════════════════════════════════
   FULL-PAGE LOADER
════════════════════════════════════════════════════════════════ */
.ldr-wrap {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-family: var(--sans);
  overflow: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.ldr-wrap.out {
  opacity: 0;
  pointer-events: none;
  transform: scale(1.015);
}

/* ambient glows */
.ldr-glow {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(80px);
}
.ldr-glow--a {
  width: 500px; height: 400px;
  background: radial-gradient(circle, rgba(0,210,130,0.10), transparent 70%);
  top: 10%; left: -10%;
  animation: glowdrift 8s ease-in-out infinite alternate;
}
.ldr-glow--b {
  width: 400px; height: 350px;
  background: radial-gradient(circle, rgba(124,92,255,0.08), transparent 70%);
  bottom: 5%; right: -5%;
  animation: glowdrift 10s ease-in-out infinite alternate-reverse;
}
@keyframes glowdrift {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(30px, -20px) scale(1.08); }
}

/* centre block */
.ldr-center {
  display: flex; flex-direction: column;
  align-items: center; gap: 28px;
  animation: ldrin 0.5s var(--spring) both;
}
@keyframes ldrin {
  from { opacity:0; transform: translateY(20px); }
  to   { opacity:1; transform: none; }
}

/* mark = hex + ring stacked */
.ldr-mark {
  position: relative;
  width: 80px; height: 80px;
  display: flex; align-items: center; justify-content: center;
}
.ldr-hex {
  width: 56px; height: 64px;
  position: absolute;
  filter: drop-shadow(0 0 12px rgba(0,210,130,0.35));
}
.ldr-hex-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: hexdraw 1.1s 0.1s cubic-bezier(0.4,0,0.2,1) forwards;
}
@keyframes hexdraw {
  to { stroke-dashoffset: 0; }
}
.ldr-ring {
  width: 80px; height: 80px;
  position: absolute;
  animation: spin 1.4s linear infinite;
}
.ldr-ring-arc {
  transform-origin: 40px 40px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* wordmark */
.ldr-wordmark {
  display: flex; align-items: center; gap: 10px;
  animation: ldrin 0.5s 0.2s var(--spring) both;
}
.ldr-lab {
  font-family: var(--sans); font-size: 1.5rem; font-weight: 800;
  letter-spacing: -0.03em; color: #fff;
}
.ldr-slash {
  font-family: var(--mono); font-size: 1.2rem;
  color: var(--accent); opacity: 0.6;
}
.ldr-products {
  font-family: var(--mono); font-size: 0.85rem;
  color: var(--text-dim); letter-spacing: 0.12em;
  text-transform: uppercase; padding-top: 3px;
}

/* progress bar */
.ldr-bar-wrap {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  animation: ldrin 0.5s 0.35s var(--spring) both;
}
.ldr-bar-track {
  width: 200px; height: 2px;
  background: rgba(255,255,255,0.07);
  border-radius: 999px; overflow: hidden;
}
.ldr-bar-fill {
  height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), #4DFFCB);
  box-shadow: 0 0 8px rgba(0,210,130,0.5);
  animation: barfill 1.4s cubic-bezier(0.4,0,0.2,1) forwards;
}
@keyframes barfill {
  0%   { width: 0%;   }
  40%  { width: 55%;  }
  70%  { width: 78%;  }
  100% { width: 100%; }
}
.ldr-bar-label {
  font-family: var(--mono); font-size: 10px;
  color: var(--text-dim); letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* bottom tagline */
.ldr-tagline {
  position: absolute; bottom: 32px;
  font-family: var(--mono); font-size: 10px;
  color: var(--text-dim); letter-spacing: 0.10em;
  font-style: italic;
  animation: ldrin 0.5s 0.5s var(--spring) both;
}

/* ════════════════════════════════════════════════════════════════
   PAGE REVEAL
════════════════════════════════════════════════════════════════ */
.page-hidden { opacity: 0; pointer-events: none; }
.page-visible {
  opacity: 1; pointer-events: auto;
  animation: pagereveal 0.6s var(--spring) both;
}
@keyframes pagereveal {
  from { opacity:0; transform: translateY(12px); }
  to   { opacity:1; transform: none; }
}

/* ════════════════════════════════════════════════════════════════
   PAGE STYLES  (unchanged from previous version)
════════════════════════════════════════════════════════════════ */
.pl-root {
  font-family: var(--sans);
  background:  var(--bg);
  color:       var(--text);
  min-height:  100vh;
  position:    relative;
  overflow-x:  hidden;
}

.pl-noise {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0; opacity: 0.022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 120px 120px;
}

/* HERO */
.pl-hero {
  position: relative; padding: 80px 56px 64px;
  border-bottom: 1px solid var(--border); overflow: hidden;
}
.pl-hero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 90% at 5%  60%, rgba(0,210,130,0.09) 0%, transparent 65%),
    radial-gradient(ellipse 40% 70% at 95% 10%, rgba(124,92,255,0.07) 0%, transparent 60%);
}
.pl-hero-bg::after {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse 65% 55% at 25% 50%, black 10%, transparent 75%);
}
.pl-hero-inner {
  position: relative; max-width: 1280px; margin: 0 auto;
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 40px; flex-wrap: wrap;
}
.pl-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 18px;
}
.pl-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); box-shadow: 0 0 8px var(--accent);
  animation: blink 2.8s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
.pl-title {
  font-size: clamp(3rem, 6vw, 5rem); font-weight: 800; line-height: 0.94;
  letter-spacing: -0.04em; margin: 0;
  background: linear-gradient(150deg, #fff 40%, rgba(255,255,255,0.36));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pl-title em {
  font-style: italic;
  background: linear-gradient(130deg, var(--accent) 0%, #4DFFCB 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pl-tagline-txt {
  font-family: var(--mono); font-size: 12px;
  color: var(--text-dim); margin-top: 14px; font-style: italic;
}
.pl-hero-meta {
  display: flex; align-items: center; gap: 28px;
  background: rgba(255,255,255,0.025); border: 1px solid var(--border);
  border-radius: 16px; padding: 20px 32px; backdrop-filter: blur(14px); flex-shrink: 0;
}
.pl-meta-item { text-align: center; }
.pl-meta-num  { display: block; font-size: 2rem; font-weight: 800; letter-spacing: -0.05em; line-height: 1; }
.pl-meta-label{ display: block; font-family: var(--mono); font-size: 9px; color: var(--text-dim); letter-spacing: 0.16em; text-transform: uppercase; margin-top: 5px; }
.pl-meta-sep  { width: 1px; height: 36px; background: var(--border); }

/* STICKY BAR */
.pl-bar-wrap {
  position: sticky; top: 0; z-index: 60;
  background: rgba(7,9,14,0.80); backdrop-filter: blur(28px) saturate(1.5);
  border-bottom: 1px solid var(--border);
}
.pl-bar { max-width: 1280px; margin: 0 auto; padding: 0 56px; height: 60px; display: flex; align-items: center; gap: 12px; }
.pl-bar-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }

.pl-search-label { position: relative; display: flex; align-items: center; flex: 1; max-width: 420px; min-width: 160px; }
.pl-search-ico { position: absolute; left: 13px; width: 14px; height: 14px; color: var(--text-dim); pointer-events: none; }
.pl-search {
  width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--border);
  border-radius: 9px; padding: 8px 34px 8px 38px;
  font-family: var(--mono); font-size: 12px; color: var(--text); outline: none;
  transition: border-color .18s, background .18s;
}
.pl-search::placeholder { color: var(--text-dim); }
.pl-search:focus { border-color: var(--border-hi); background: var(--accent-lo); }
.pl-clear { position: absolute; right: 10px; background: none; border: none; cursor: pointer; color: var(--text-dim); font-size: 16px; line-height: 1; padding: 0; transition: color .15s; }
.pl-clear:hover { color: var(--text); }

.pl-sort { position: relative; }
.pl-sort-btn {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid var(--border);
  border-radius: 9px; padding: 8px 12px;
  font-family: var(--mono); font-size: 11px; color: var(--text-mid);
  cursor: pointer; white-space: nowrap; transition: border-color .15s, color .15s;
}
.pl-sort-btn:hover, .pl-sort-btn.open { border-color: var(--border-hi); color: var(--text); }
.pl-chev { width: 9px; height: 6px; transition: transform .2s; flex-shrink: 0; }
.pl-sort-btn.open .pl-chev { transform: rotate(180deg); }
.pl-sort-menu {
  position: absolute; top: calc(100% + 6px); right: 0;
  background: #111420; border: 1px solid var(--border); border-radius: 11px; padding: 6px;
  min-width: 150px; list-style: none; margin: 0; z-index: 100;
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  animation: dropin .15s var(--spring) both;
}
@keyframes dropin { from { opacity:0; transform: translateY(-6px) scale(0.97); } to { opacity:1; transform: none; } }
.pl-sort-opt {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; background: none; border: none; cursor: pointer;
  padding: 8px 10px; border-radius: 7px;
  font-family: var(--mono); font-size: 11px; color: var(--text-mid);
  transition: background .12s, color .12s;
}
.pl-sort-opt:hover { background: rgba(255,255,255,0.06); color: var(--text); }
.pl-sort-opt.on { color: var(--accent); }

.pl-view { display: flex; gap: 2px; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 9px; padding: 3px; }
.pl-vbtn { width: 30px; height: 28px; border-radius: 6px; border: none; background: transparent; color: var(--text-dim); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .15s, color .15s; }
.pl-vbtn:hover:not(.on) { color: var(--text-mid); }
.pl-vbtn.on { background: var(--accent-lo); color: var(--accent); }

.pl-count { font-family: var(--mono); font-size: 11px; color: var(--text-dim); white-space: nowrap; padding-left: 2px; }
.pl-count b { color: var(--accent); font-weight: 500; }

.pl-cats-wrap { border-top: 1px solid var(--border); }
.pl-cats { max-width: 1280px; margin: 0 auto; padding: 10px 56px 11px; display: flex; gap: 6px; flex-wrap: wrap; }
.pl-cat { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 14px; border-radius: 999px; border: 1px solid var(--border); background: transparent; color: var(--text-dim); cursor: pointer; transition: border-color .14s, color .14s, background .14s; }
.pl-cat:hover { border-color: rgba(255,255,255,0.2); color: var(--text-mid); }
.pl-cat.on { background: var(--accent); border-color: var(--accent); color: #07090E; font-weight: 600; }

/* MAIN */
.pl-main { max-width: 1280px; margin: 0 auto; padding: 44px 56px 100px; position: relative; z-index: 1; }

.pl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.pl-list { display: flex; flex-direction: column; gap: 10px; }

.pl-shell {
  position: relative; border-radius: var(--rad); border: 1px solid var(--border);
  background: var(--bg-card); overflow: hidden; animation: cardin 0.38s both;
  transition: transform 0.28s var(--spring), border-color 0.20s ease, box-shadow 0.28s ease;
}
@keyframes cardin { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: none; } }
.pl-shell:hover { border-color: var(--border-hi); box-shadow: 0 0 0 1px rgba(0,210,130,0.06), 0 24px 64px -12px rgba(0,0,0,0.55), 0 4px 16px 0px rgba(0,0,0,0.28); }
.pl-shell.grid:hover { transform: translateY(-5px); }
.pl-shell.list:hover { transform: translateX(5px); }
.pl-shell-line { position: absolute; top: 0; left: 0; right: 0; height: 1.5px; z-index: 2; background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%); opacity: 0; transition: opacity .22s; }
.pl-shell:hover .pl-shell-line { opacity: 1; }

/* EMPTY */
.pl-empty { text-align: center; padding: 100px 0 80px; }
.pl-empty-sym   { font-size: 4rem; color: var(--text-dim); line-height: 1; margin-bottom: 20px; font-weight: 300; }
.pl-empty-title { font-size: 1.1rem; font-weight: 700; color: var(--text-mid); margin-bottom: 8px; }
.pl-empty-sub   { font-family: var(--mono); font-size: 12px; color: var(--text-dim); margin-bottom: 28px; }
.pl-empty-btn { font-family: var(--mono); font-size: 11px; letter-spacing: 0.10em; text-transform: uppercase; background: var(--accent-lo); border: 1px solid var(--border-hi); border-radius: 999px; color: var(--accent); padding: 9px 22px; cursor: pointer; transition: background .15s; }
.pl-empty-btn:hover { background: rgba(0,210,130,0.18); }

/* LOAD MORE */
.pl-more { margin-top: 56px; display: flex; align-items: center; gap: 20px; }
.pl-more-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--border), transparent); }
.pl-more-btn { display: flex; align-items: center; gap: 8px; font-family: var(--sans); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 11px 28px; border-radius: 999px; background: transparent; border: 1px solid var(--border); color: var(--text-mid); cursor: pointer; white-space: nowrap; transition: border-color .18s, color .18s, background .18s; }
.pl-more-btn:hover { border-color: var(--border-hi); color: var(--accent); background: var(--accent-lo); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .pl-hero  { padding: 52px 24px 44px; }
  .pl-bar   { padding: 0 24px; }
  .pl-cats  { padding-left: 24px; padding-right: 24px; }
  .pl-main  { padding: 32px 24px 72px; }
  .pl-hero-meta { display: none; }
  .pl-grid  { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
}
@media (max-width: 600px) {
  .pl-title     { font-size: 2.6rem; }
  .pl-bar       { flex-wrap: wrap; height: auto; padding-block: 10px; }
  .pl-bar-right { margin-left: 0; }
  .pl-count     { display: none; }
  .pl-grid      { grid-template-columns: 1fr 1fr; gap: 10px; }
}
@media (max-width: 380px) {
  .pl-grid { grid-template-columns: 1fr; }
}
`