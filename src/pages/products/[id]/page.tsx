import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useParams } from "react-router-dom"

/* ─────────────────────────── types ─────────────────────────────── */
type Product = {
  id: string
  title: string
  short_description: string
  full_description: string
  image_url: string
  technologies: string[]
  demo_url: string
  github_url: string
  docs_url: string
  price: number
  is_paid: boolean
  category?: string
  status?: string
  team_size?: number
  created_at?: string
}

/* ─────────────────────────── component ─────────────────────────── */
export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading]  = useState(true)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => { fetchProduct() }, [])

  /* DB logic — untouched */
  async function fetchProduct() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()
    if (data) setProduct(data)
    setLoading(false)
  }

  /* ── loading skeleton ── */
  if (loading) return (
    <>
      <style>{CSS}</style>
      <div className="pd-root">
        <div className="pd-noise" aria-hidden />
        <div className="pd-loading">
          <div className="pd-skel-hero"  />
          <div className="pd-skel-title" />
          <div className="pd-skel-body"  />
          <div className="pd-skel-tags"  />
        </div>
      </div>
    </>
  )

  if (!product) return (
    <>
      <style>{CSS}</style>
      <div className="pd-root">
        <div className="pd-noise" aria-hidden />
        <div className="pd-not-found">
          <span className="pd-nf-sym">404</span>
          <p className="pd-nf-title">Product not found</p>
          <a href="/products" className="pd-back-link">← Back to Products</a>
        </div>
      </div>
    </>
  )

  const hasLinks = product.demo_url || product.github_url || product.docs_url

  return (
    <>
      <style>{CSS}</style>

      <div className="pd-root">
        <div className="pd-noise" aria-hidden />

        {/* ── BACK LINK ── */}
        <div className="pd-back-wrap">
          <a href="/products" className="pd-back">
            <svg viewBox="0 0 14 14" fill="none" width="13">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Products
          </a>
        </div>

        {/* ════════════════ HERO IMAGE ════════════════ */}
        {product.image_url && (
          <div className="pd-hero-img-wrap">
            <div className="pd-hero-bg" aria-hidden />
            <div className={`pd-hero-img-shell ${imgLoaded ? "loaded" : ""}`}>
              <img
                src={product.image_url}
                alt={product.title}
                className="pd-hero-img"
                onLoad={() => setImgLoaded(true)}
              />
              <div className="pd-hero-img-overlay" aria-hidden />
            </div>
          </div>
        )}

        {/* ════════════════ MAIN LAYOUT ════════════════ */}
        <div className="pd-layout">

          {/* ── LEFT / MAIN COLUMN ── */}
          <div className="pd-main-col">

            {/* category + status badges */}
            <div className="pd-badges">
              {product.category && (
                <span className="pd-badge pd-badge--cat">{product.category}</span>
              )}
              {product.status && (
                <span className={`pd-badge pd-badge--status pd-badge--${product.status}`}>
                  {product.status}
                </span>
              )}
            </div>

            {/* title */}
            <h1 className="pd-title">{product.title}</h1>

            {/* short description as a styled lead */}
            {product.short_description && (
              <p className="pd-lead">{product.short_description}</p>
            )}

            {/* divider */}
            <div className="pd-divider" />

            {/* full description */}
            {product.full_description && (
              <div className="pd-section">
                <h2 className="pd-section-label">About this product</h2>
                <p className="pd-body">{product.full_description}</p>
              </div>
            )}

            {/* tech stack */}
            {product.technologies && product.technologies.length > 0 && (
              <div className="pd-section">
                <h2 className="pd-section-label">Tech Stack</h2>
                <div className="pd-tech-grid">
                  {product.technologies.map((tech) => (
                    <span key={tech} className="pd-tech">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* links row (visible only on mobile, on desktop in sidebar) */}
            {hasLinks && (
              <div className="pd-links-mobile pd-section">
                <h2 className="pd-section-label">Links</h2>
                <div className="pd-link-row">
                  {product.demo_url && (
                    <a href={product.demo_url} target="_blank" rel="noopener" className="pd-link-btn pd-link-btn--primary">
                      <svg viewBox="0 0 14 14" fill="none" width="13">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M5 7h4M7 5l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {product.github_url && (
                    <a href={product.github_url} target="_blank" rel="noopener" className="pd-link-btn pd-link-btn--ghost">
                      <svg viewBox="0 0 16 16" fill="currentColor" width="14">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38l-.01-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.88-1.17-.88-1.17-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.21 1.87.86 2.33.66.07-.51.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.67 7.67 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {product.docs_url && (
                    <a href={product.docs_url} target="_blank" rel="noopener" className="pd-link-btn pd-link-btn--ghost">
                      <svg viewBox="0 0 14 14" fill="none" width="13">
                        <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      Docs
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT / SIDEBAR ── */}
          <aside className="pd-sidebar">

            {/* purchase card */}
            <div className="pd-buy-card">
              <div className="pd-buy-line" aria-hidden />

              <div className="pd-buy-inner">
                {product.is_paid ? (
                  <>
                    <div className="pd-price-row">
                      <span className="pd-price-label">Price</span>
                      <span className="pd-price">₹{product.price.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="pd-buy-note">One-time purchase · Lifetime access</p>
                    <button className="pd-buy-btn">
                      <svg viewBox="0 0 16 16" fill="none" width="15">
                        <path d="M2 2h1.5l1.8 7.5h7l1.2-5H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="7.5" cy="13" r="1" fill="currentColor"/>
                        <circle cx="12" cy="13" r="1" fill="currentColor"/>
                      </svg>
                      Buy Now — ₹{product.price.toLocaleString("en-IN")}
                    </button>
                    <p className="pd-buy-sub">Secure checkout · Instant access</p>
                  </>
                ) : (
                  <>
                    <div className="pd-price-row">
                      <span className="pd-price-label">Access</span>
                      <span className="pd-free-badge">Free</span>
                    </div>
                    <p className="pd-buy-note">Open source · No payment needed</p>
                    {product.github_url && (
                      <a href={product.github_url} target="_blank" rel="noopener" className="pd-buy-btn pd-buy-btn--free">
                        <svg viewBox="0 0 16 16" fill="currentColor" width="15">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38l-.01-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.88-1.17-.88-1.17-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.21 1.87.86 2.33.66.07-.51.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.67 7.67 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        View on GitHub
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* links card (desktop only) */}
            {hasLinks && (
              <div className="pd-sidebar-links pd-links-desktop">
                <h3 className="pd-sidebar-heading">Links</h3>
                <div className="pd-sidebar-link-list">
                  {product.demo_url && (
                    <a href={product.demo_url} target="_blank" rel="noopener" className="pd-slink">
                      <span className="pd-slink-icon">
                        <svg viewBox="0 0 14 14" fill="none" width="12">
                          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M5 7h4M7 5l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      Live Demo
                      <svg className="pd-slink-arrow" viewBox="0 0 10 10" fill="none" width="9">
                        <path d="M2 8L8 2M8 2H3.5M8 2v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </a>
                  )}
                  {product.github_url && (
                    <a href={product.github_url} target="_blank" rel="noopener" className="pd-slink">
                      <span className="pd-slink-icon">
                        <svg viewBox="0 0 16 16" fill="currentColor" width="12">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38l-.01-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.88-1.17-.88-1.17-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.21 1.87.86 2.33.66.07-.51.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.67 7.67 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                      </span>
                      GitHub Repository
                      <svg className="pd-slink-arrow" viewBox="0 0 10 10" fill="none" width="9">
                        <path d="M2 8L8 2M8 2H3.5M8 2v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </a>
                  )}
                  {product.docs_url && (
                    <a href={product.docs_url} target="_blank" rel="noopener" className="pd-slink">
                      <span className="pd-slink-icon">
                        <svg viewBox="0 0 14 14" fill="none" width="12">
                          <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                      </span>
                      Documentation
                      <svg className="pd-slink-arrow" viewBox="0 0 10 10" fill="none" width="9">
                        <path d="M2 8L8 2M8 2H3.5M8 2v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* meta info */}
            <div className="pd-sidebar-meta">
              {product.category && (
                <div className="pd-meta-row">
                  <span className="pd-meta-key">Category</span>
                  <span className="pd-meta-val">{product.category}</span>
                </div>
              )}
              {product.status && (
                <div className="pd-meta-row">
                  <span className="pd-meta-key">Status</span>
                  <span className={`pd-meta-val pd-meta-status pd-meta-status--${product.status}`}>
                    <span className="pd-meta-status-dot" />
                    {product.status}
                  </span>
                </div>
              )}
              {product.team_size && (
                <div className="pd-meta-row">
                  <span className="pd-meta-key">Team Size</span>
                  <span className="pd-meta-val">{product.team_size} members</span>
                </div>
              )}
              {product.created_at && (
                <div className="pd-meta-row">
                  <span className="pd-meta-key">Published</span>
                  <span className="pd-meta-val">
                    {new Date(product.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                </div>
              )}
            </div>

          </aside>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

/* ── tokens ─────────────────────────────────────────────────────── */
.pd-root {
  --bg:         #07090E;
  --bg-card:    #0C0F18;
  --bg-lift:    #111520;
  --border:     rgba(255,255,255,0.07);
  --border-hi:  rgba(0,210,130,0.28);
  --accent:     #00D282;
  --accent-lo:  rgba(0,210,130,0.10);
  --accent-dim: #00a865;
  --purple:     #7C5CFF;
  --gold:       #F5C842;
  --text:       #ECF0F8;
  --text-mid:   rgba(236,240,248,0.55);
  --text-dim:   rgba(236,240,248,0.24);
  --mono:       'DM Mono', monospace;
  --sans:       'Syne', sans-serif;
  --rad:        13px;
  --spring:     cubic-bezier(0.34,1.4,0.64,1);

  font-family: var(--sans);
  background:  var(--bg);
  color:       var(--text);
  min-height:  100vh;
  position:    relative;
  overflow-x:  hidden;
}

/* noise */
.pd-noise {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 120px 120px;
}

/* ── BACK ────────────────────────────────────────────────────────── */
.pd-back-wrap {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto;
  padding: 28px 56px 0;
}
.pd-back {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.10em; text-transform: uppercase;
  color: var(--text-dim); text-decoration: none;
  transition: color .15s, gap .2s var(--spring);
}
.pd-back:hover { color: var(--accent); gap: 10px; }

/* ── HERO IMAGE ──────────────────────────────────────────────────── */
.pd-hero-img-wrap {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 24px auto 0;
  padding: 0 56px;
}
.pd-hero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 50% 80% at 15% 50%, rgba(0,210,130,0.07) 0%, transparent 65%),
    radial-gradient(ellipse 35% 60% at 85% 20%, rgba(124,92,255,0.06) 0%, transparent 60%);
}
.pd-hero-img-shell {
  position: relative; border-radius: 18px; overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg-card);
  aspect-ratio: 16/6;
  opacity: 0; transition: opacity .5s ease;
}
.pd-hero-img-shell.loaded { opacity: 1; }
.pd-hero-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.pd-hero-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(7,9,14,0.85) 100%);
}

/* ── LAYOUT ──────────────────────────────────────────────────────── */
.pd-layout {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto;
  padding: 48px 56px 100px;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}

/* ── MAIN COL ────────────────────────────────────────────────────── */
.pd-badges {
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-bottom: 20px;
  animation: fadein .4s .05s both;
}
.pd-badge {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.14em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 999px;
  border: 1px solid var(--border);
}
.pd-badge--cat    { color: var(--accent); border-color: rgba(0,210,130,0.25); background: var(--accent-lo); }
.pd-badge--status { color: var(--text-mid); }
.pd-badge--completed   { color: #4DFFB0; border-color: rgba(77,255,176,0.25); background: rgba(77,255,176,0.08); }
.pd-badge--demo_ready  { color: var(--gold); border-color: rgba(245,200,66,0.25); background: rgba(245,200,66,0.08); }
.pd-badge--in_progress { color: #7C9FFF; border-color: rgba(124,159,255,0.25); background: rgba(124,159,255,0.08); }

.pd-title {
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 800; line-height: 1.05;
  letter-spacing: -0.035em; margin: 0 0 18px;
  background: linear-gradient(150deg, #fff 45%, rgba(255,255,255,0.45));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadein .4s .1s both;
  word-break: break-word;
}

.pd-lead {
  font-size: 1.1rem; font-weight: 500; line-height: 1.6;
  color: var(--text-mid); margin-bottom: 32px;
  animation: fadein .4s .15s both;
}

.pd-divider {
  width: 100%; height: 1px;
  background: linear-gradient(to right, var(--accent-lo), transparent);
  margin-bottom: 36px;
  animation: fadein .4s .2s both;
}

.pd-section { margin-bottom: 36px; animation: fadein .4s .22s both; }
.pd-section-label {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text-dim); margin-bottom: 14px; font-weight: 400;
}
.pd-body {
  font-size: 0.975rem; line-height: 1.75;
  color: var(--text-mid); white-space: pre-wrap;
}

/* tech tags */
.pd-tech-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.pd-tech {
  font-family: var(--mono); font-size: 11px;
  padding: 5px 13px; border-radius: 7px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--text-mid);
  transition: border-color .15s, color .15s, background .15s;
}
.pd-tech:hover { border-color: var(--border-hi); color: var(--accent); background: var(--accent-lo); }

/* mobile link row — hidden on desktop */
.pd-links-mobile { display: none; }
.pd-link-row { display: flex; flex-wrap: wrap; gap: 8px; }
.pd-link-btn {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  padding: 10px 20px; border-radius: 9px; text-decoration: none;
  transition: all .18s;
}
.pd-link-btn--primary { background: var(--accent); color: #07090E; }
.pd-link-btn--primary:hover { background: #00f097; }
.pd-link-btn--ghost {
  background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-mid);
}
.pd-link-btn--ghost:hover { border-color: var(--border-hi); color: var(--text); background: rgba(255,255,255,0.08); }

/* ── SIDEBAR ─────────────────────────────────────────────────────── */
.pd-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 80px; }

/* buy card */
.pd-buy-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px; overflow: hidden;
  animation: fadein .4s .12s both;
}
.pd-buy-line {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.6;
}
.pd-buy-inner { padding: 24px; }

.pd-price-row {
  display: flex; align-items: baseline;
  justify-content: space-between; margin-bottom: 6px;
}
.pd-price-label {
  font-family: var(--mono); font-size: 10px; color: var(--text-dim);
  letter-spacing: 0.14em; text-transform: uppercase;
}
.pd-price { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; color: var(--gold); }
.pd-free-badge {
  font-family: var(--mono); font-size: 13px; font-weight: 500;
  color: var(--accent); letter-spacing: 0.06em;
}
.pd-buy-note {
  font-family: var(--mono); font-size: 11px; color: var(--text-dim);
  margin-bottom: 20px; font-style: italic;
}
.pd-buy-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px 20px; border-radius: 11px; border: none;
  font-family: var(--sans); font-size: 14px; font-weight: 700;
  letter-spacing: 0.02em; cursor: pointer; text-decoration: none;
  background: linear-gradient(135deg, var(--accent) 0%, #00b36b 100%);
  color: #07090E;
  transition: opacity .18s, transform .18s var(--spring), box-shadow .18s;
  box-shadow: 0 4px 24px rgba(0,210,130,0.25);
}
.pd-buy-btn:hover {
  opacity: 0.92; transform: translateY(-1px);
  box-shadow: 0 8px 32px rgba(0,210,130,0.35);
}
.pd-buy-btn:active { transform: translateY(1px); }
.pd-buy-btn--free {
  background: rgba(255,255,255,0.06);
  color: var(--text); border: 1px solid var(--border);
  box-shadow: none;
}
.pd-buy-btn--free:hover { border-color: var(--border-hi); background: rgba(255,255,255,0.1); box-shadow: none; }
.pd-buy-sub {
  font-family: var(--mono); font-size: 10px; color: var(--text-dim);
  text-align: center; margin-top: 10px; letter-spacing: 0.06em;
}

/* sidebar links */
.pd-sidebar-links {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 14px; padding: 18px 20px;
  animation: fadein .4s .18s both;
}
.pd-sidebar-heading {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--text-dim); margin-bottom: 12px; font-weight: 400;
}
.pd-sidebar-link-list { display: flex; flex-direction: column; gap: 2px; }
.pd-slink {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: 8px; text-decoration: none;
  color: var(--text-mid); font-size: 13px; font-weight: 500;
  transition: background .14s, color .14s;
}
.pd-slink:hover { background: rgba(255,255,255,0.05); color: var(--text); }
.pd-slink-icon {
  width: 26px; height: 26px; border-radius: 7px;
  background: rgba(255,255,255,0.06); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: var(--text-dim);
}
.pd-slink-arrow { margin-left: auto; color: var(--text-dim); opacity: 0; transition: opacity .14s; }
.pd-slink:hover .pd-slink-arrow { opacity: 1; }

/* sidebar meta */
.pd-sidebar-meta {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 14px; padding: 18px 20px;
  animation: fadein .4s .24s both;
}
.pd-meta-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
}
.pd-meta-row:last-child { border-bottom: none; padding-bottom: 0; }
.pd-meta-key {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--text-dim);
}
.pd-meta-val { font-size: 12.5px; font-weight: 600; color: var(--text-mid); }
.pd-meta-status { display: flex; align-items: center; gap: 6px; }
.pd-meta-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-dim); flex-shrink: 0; }
.pd-meta-status--completed   .pd-meta-status-dot { background: var(--accent); box-shadow: 0 0 6px var(--accent); }
.pd-meta-status--demo_ready  .pd-meta-status-dot { background: var(--gold);   box-shadow: 0 0 6px var(--gold); }
.pd-meta-status--in_progress .pd-meta-status-dot { background: #7C9FFF; box-shadow: 0 0 6px #7C9FFF; animation: blink 2s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* ── SKELETON ────────────────────────────────────────────────────── */
.pd-loading {
  max-width: 1200px; margin: 0 auto; padding: 48px 56px;
  display: flex; flex-direction: column; gap: 20px;
}
.pd-skel-hero  { height: 360px; border-radius: 18px; }
.pd-skel-title { height: 56px; width: 55%; border-radius: 10px; }
.pd-skel-body  { height: 120px; border-radius: 10px; }
.pd-skel-tags  { height: 40px; width: 70%; border-radius: 10px; }
.pd-skel-hero, .pd-skel-title, .pd-skel-body, .pd-skel-tags {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.03) 0%,
    rgba(255,255,255,0.07) 50%,
    rgba(255,255,255,0.03) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* ── NOT FOUND ───────────────────────────────────────────────────── */
.pd-not-found { text-align: center; padding: 120px 20px; }
.pd-nf-sym    { display: block; font-size: 5rem; font-weight: 800; letter-spacing: -0.06em; color: var(--text-dim); }
.pd-nf-title  { font-size: 1.2rem; color: var(--text-mid); margin: 12px 0 28px; }
.pd-back-link {
  font-family: var(--mono); font-size: 12px; color: var(--accent);
  text-decoration: none; letter-spacing: 0.08em;
}

/* ── ANIMATION ───────────────────────────────────────────────────── */
@keyframes fadein {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — TABLET  (≤ 1024px)
════════════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .pd-back-wrap     { padding: 24px 40px 0; }
  .pd-hero-img-wrap { padding: 0 40px; }
  .pd-layout {
    padding: 40px 40px 80px;
    grid-template-columns: 1fr 300px;
    gap: 36px;
  }
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — SMALL TABLET  (≤ 960px)
   Sidebar collapses below content
════════════════════════════════════════════════════════════════ */
@media (max-width: 960px) {
  .pd-back-wrap     { padding: 20px 24px 0; }
  .pd-hero-img-wrap { padding: 0 24px; }

  .pd-layout {
    grid-template-columns: 1fr;
    padding: 32px 24px 72px;
    gap: 32px;
  }

  /* Sidebar unsticks and becomes a normal block */
  .pd-sidebar { position: static; }

  /* On tablet, show sidebar buy card first, then meta — reorder via order */
  .pd-buy-card     { order: 0; }
  .pd-sidebar-meta { order: 1; }

  /* Desktop links hidden → mobile links shown */
  .pd-links-desktop { display: none !important; }
  .pd-links-mobile  { display: block; }

  /* Skeleton adjusts padding */
  .pd-loading { padding: 32px 24px; }
  .pd-skel-hero { height: 220px; }
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — MOBILE  (≤ 640px)
════════════════════════════════════════════════════════════════ */
@media (max-width: 640px) {
  .pd-back-wrap     { padding: 16px 16px 0; }
  .pd-hero-img-wrap { padding: 0 16px; margin-top: 16px; }

  /* Hero image shorter on phone */
  .pd-hero-img-shell { aspect-ratio: 16/9; border-radius: 12px; }

  .pd-layout { padding: 24px 16px 60px; gap: 24px; }

  /* Title & lead */
  .pd-title { font-size: clamp(1.8rem, 7vw, 2.4rem); margin-bottom: 14px; }
  .pd-lead  { font-size: 1rem; margin-bottom: 24px; }

  /* Section spacing */
  .pd-section { margin-bottom: 28px; }

  /* Buy card inner padding */
  .pd-buy-inner { padding: 18px 16px; }
  .pd-price { font-size: 1.7rem; }
  .pd-buy-btn { padding: 13px 16px; font-size: 13px; }

  /* Sidebar meta rows — allow text to wrap */
  .pd-meta-row { align-items: flex-start; flex-wrap: wrap; gap: 4px; }
  .pd-meta-val { font-size: 12px; }

  /* Link buttons — stack on very narrow */
  .pd-link-row { flex-direction: column; }
  .pd-link-btn { width: 100%; justify-content: center; }

  /* Skeleton */
  .pd-loading { padding: 20px 16px; }
  .pd-skel-hero  { height: 180px; }
  .pd-skel-title { width: 75%; }
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — SMALL MOBILE  (≤ 400px)
════════════════════════════════════════════════════════════════ */
@media (max-width: 400px) {
  .pd-title { font-size: 1.7rem; }
  .pd-badge { font-size: 9px; padding: 3px 10px; }
  .pd-hero-img-shell { aspect-ratio: 4/3; }
  .pd-buy-inner { padding: 16px 14px; }
  .pd-price { font-size: 1.5rem; }
}

/* ════════════════════════════════════════════════════════════════
   TOUCH — remove hover transforms
════════════════════════════════════════════════════════════════ */
@media (hover: none) {
  .pd-buy-btn:hover  { transform: none; }
  .pd-back:hover     { gap: 6px; }
  .pd-slink-arrow    { opacity: 0.4; }
}
`