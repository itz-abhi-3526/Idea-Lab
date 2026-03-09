"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

type Image = {
  id: string
  image_url: string
  title: string | null
  created_at: string
}

// Masonry column heights — controls visual rhythm
const SPAN_PATTERN = [2, 1, 2, 1, 1, 2, 1, 2, 1, 1]

export default function GalleryPage() {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(-1)
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => { fetchImages() }, [])

  async function fetchImages() {
    setLoading(true)
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error && data) setImages(data)
    setLoading(false)
  }

  const filtered = filter === "featured"
    ? images.filter(img => (img as any).is_featured)
    : images

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .gp-page {
          background: #090909;
          min-height: 100vh;
          color: #f0ece4;
        }

        /* ── PAGE HEADER ── */
        .gp-hero {
          padding: 80px 60px 56px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }

        .gp-hero-left {}

        .gp-label {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #e8622a; margin-bottom: 16px;
        }
        .gp-label-dash { width: 26px; height: 2px; background: #e8622a; flex-shrink: 0; }

        .gp-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(3.5rem, 6vw, 6.5rem);
          line-height: 0.88; letter-spacing: -0.01em;
          text-transform: uppercase; margin: 0;
          color: #f0ece4;
        }
        .gp-heading .hi { color: #e8622a; }
        .gp-heading .ghost {
          display: block; color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.09);
          font-size: 72%; margin-top: 8px;
        }

        .gp-hero-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 20px;
          padding-bottom: 6px; flex-shrink: 0;
        }

        .gp-count {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.22); text-transform: uppercase;
        }
        .gp-count em { font-style: normal; color: rgba(255,255,255,0.6); }

        /* filter pills */
        .gp-filters { display: flex; gap: 8px; }

        .gp-filter {
          padding: 9px 20px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent; color: rgba(255,255,255,0.45);
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
          transition: all 0.2s ease;
        }
        .gp-filter:hover { border-color: rgba(232,98,42,0.4); color: rgba(255,255,255,0.7); }
        .gp-filter.on { background: #e8622a; border-color: #e8622a; color: #fff; }

        /* ── GRID ── */
        .gp-grid-wrap { padding: 48px 60px 80px; }

        .gp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 180px;
          gap: 10px;
        }

        /* span classes */
        .gp-cell-tall { grid-row: span 2; }
        .gp-cell-wide { grid-column: span 2; }

        .gp-cell {
          position: relative; overflow: hidden;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
        }

        .gp-cell img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(0.82) saturate(0.85);
          transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease;
          pointer-events: none; user-select: none;
        }
        .gp-cell:hover img { transform: scale(1.06); filter: brightness(1) saturate(1); }

        .gp-cell-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(9,9,9,0.88) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 16px;
        }
        .gp-cell:hover .gp-cell-overlay { opacity: 1; }

        .gp-cell-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #f0ece4; margin: 0 0 3px;
          transform: translateY(5px); transition: transform 0.25s ease;
        }
        .gp-cell:hover .gp-cell-title { transform: translateY(0); }

        .gp-cell-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.58rem; letter-spacing: 0.22em;
          color: #e8622a; font-weight: 600;
        }

        /* top-right orange notch */
        .gp-notch {
          position: absolute; top: 0; right: 0;
          width: 0; height: 0; border-style: solid;
          border-width: 0 20px 20px 0;
          border-color: transparent #e8622a transparent transparent;
          opacity: 0; transition: opacity 0.25s ease;
        }
        .gp-cell:hover .gp-notch { opacity: 1; }

        /* featured badge */
        .gp-featured-badge {
          position: absolute; top: 12px; left: 12px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #e8622a;
          background: rgba(9,9,9,0.75);
          border: 1px solid rgba(232,98,42,0.4);
          padding: 3px 8px;
          backdrop-filter: blur(4px);
        }

        /* expand icon on hover */
        .gp-expand {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          opacity: 0;
          width: 44px; height: 44px;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .gp-expand svg { width: 16px; height: 16px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .gp-cell:hover .gp-expand { opacity: 1; transform: translate(-50%, -50%) scale(1); }

        /* ── SKELETON ── */
        @keyframes shimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
        .gp-skel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 180px;
          gap: 10px;
        }
        .gp-skel-cell {
          background: linear-gradient(90deg, #181818 25%, #202020 50%, #181818 75%);
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
          border: 1px solid rgba(255,255,255,0.04);
        }

        /* ── EMPTY ── */
        .gp-empty {
          height: 400px; border: 1px dashed rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
        }
        .gp-empty-ring { width: 48px; height: 48px; margin: 0 auto 16px; border: 1px solid rgba(232,98,42,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .gp-empty-ring svg { width: 20px; height: 20px; stroke: rgba(232,98,42,0.6); fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .gp-empty-h { font-family: 'Barlow Condensed', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin: 0 0 6px; }
        .gp-empty-p { font-family: 'Barlow', sans-serif; font-size: 0.7rem; color: rgba(255,255,255,0.15); }
        .gp-empty-body { text-align: center; }

        /* lightbox overrides */
        .yarl__root { --yarl__color_backdrop: rgba(9,9,9,0.97); }
        .yarl__button { color: rgba(255,255,255,0.6); }
        .yarl__button:hover { color: #e8622a; }
      `}</style>

      <div className="gp-page">

        {/* ── Hero header ─────────────────────────────── */}
        <div className="gp-hero">
          <div className="gp-hero-left">
            <p className="gp-label">
              <span className="gp-label-dash" />
              IDEA Lab
            </p>
            <h1 className="gp-heading">
              <span>Photo</span>
              <span className="hi"> Gallery</span>
              <span className="ghost">All Moments</span>
            </h1>
          </div>

          <div className="gp-hero-right">
            {!loading && (
              <span className="gp-count">
                <em>{filtered.length}</em> photos
              </span>
            )}
            <div className="gp-filters">
              <button
                className={`gp-filter${filter === "all" ? " on" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`gp-filter${filter === "featured" ? " on" : ""}`}
                onClick={() => setFilter("featured")}
              >
                Featured
              </button>
            </div>
          </div>
        </div>

        {/* ── Grid ────────────────────────────────────── */}
        <div className="gp-grid-wrap">
          {loading ? (
            <div className="gp-skel">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="gp-skel-cell"
                  style={SPAN_PATTERN[i % SPAN_PATTERN.length] === 2 ? { gridRow: "span 2" } : undefined}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="gp-empty">
              <div className="gp-empty-body">
                <div className="gp-empty-ring">
                  <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <p className="gp-empty-h">No Photos Yet</p>
                <p className="gp-empty-p">Gallery images will appear here once uploaded.</p>
              </div>
            </div>
          ) : (
            <div className="gp-grid">
              {filtered.map((img, i) => {
                const span = SPAN_PATTERN[i % SPAN_PATTERN.length]
                return (
                  <div
                    key={img.id}
                    className={`gp-cell${span === 2 ? " gp-cell-tall" : ""}`}
                    onClick={() => setIndex(i)}
                  >
                    <img src={img.image_url} alt={img.title ?? ""} loading="lazy" />
                    <div className="gp-notch" />
                    {(img as any).is_featured && (
                      <div className="gp-featured-badge">Featured</div>
                    )}
                    <div className="gp-expand">
                      <svg viewBox="0 0 24 24">
                        <polyline points="15 3 21 3 21 9"/>
                        <polyline points="9 21 3 21 3 15"/>
                        <line x1="21" y1="3" x2="14" y2="10"/>
                        <line x1="3" y1="21" x2="10" y2="14"/>
                      </svg>
                    </div>
                    <div className="gp-cell-overlay">
                      {img.title && <p className="gp-cell-title">{img.title}</p>}
                      <span className="gp-cell-num">{String(i + 1).padStart(2, "0")} / IDEA LAB</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Lightbox ────────────────────────────────── */}
        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={filtered.map(img => ({ src: img.image_url, title: img.title ?? undefined }))}
          index={index}
        />
      </div>
    </>
  )
}