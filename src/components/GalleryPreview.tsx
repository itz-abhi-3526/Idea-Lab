
import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { supabase } from "@/lib/supabase"
import { Link } from "react-router-dom"

type Image = {
  id: string
  image_url: string
  title: string | null
}

const RATIOS = [1.4, 1, 1.2, 1, 1.3, 1.1]

export default function GalleryPreview() {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => { fetchImages() }, [])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    const onScroll = () => setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())))
    emblaApi.on("select", onSelect)
    emblaApi.on("scroll", onScroll)
    return () => { emblaApi.off("select", onSelect); emblaApi.off("scroll", onScroll) }
  }, [emblaApi])

  async function fetchImages() {
    setLoading(true)
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(10)
    if (!error && data) setImages(data)
    setLoading(false)
  }

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const isEmpty = !loading && images.length === 0
  const fewImages = images.length > 0 && images.length <= 3

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

        .gs {
          /* exact match to site bg */
          background: #0c0c0c;
          position: relative;
          overflow: hidden;
        }

        /* ── CONTINUITY: vertical center-line that bleeds top & bottom ── */
        .gs-vline {
          position: absolute;
          left: 50%;
          top: -1px;
          bottom: -1px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.07) 0%,
            rgba(255,255,255,0.04) 40%,
            rgba(255,255,255,0.04) 60%,
            rgba(255,255,255,0.07) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* small orange dot on the line — mid-section anchor */
        .gs-vline-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #e8622a;
          box-shadow: 0 0 10px rgba(232,98,42,0.5);
          z-index: 1;
          pointer-events: none;
        }

        /* ── CONTINUITY: top fade-in from previous section ── */
        .gs-fade-top {
          position: absolute; top: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to bottom, rgba(12,12,12,0.6), transparent);
          pointer-events: none; z-index: 2;
        }

        /* ── CONTINUITY: bottom fade-out into next section ── */
        .gs-fade-bottom {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(12,12,12,0.6), transparent);
          pointer-events: none; z-index: 2;
        }

        /* ── top border rule — same as all sections ── */
        .gs-border-top {
          position: absolute; top: 0; left: 60px; right: 60px;
          height: 1px;
          background: rgba(255,255,255,0.07);
          z-index: 3;
        }

        .gs-inner { position: relative; z-index: 3; }

        /* META STRIP */
        .gs-meta {
          display: flex; align-items: center; justify-content: space-between;
          padding: 32px 60px 0;
        }

        .gs-label {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.28em; text-transform: uppercase; color: #e8622a;
        }
        .gs-label-line { width: 28px; height: 2px; background: #e8622a; flex-shrink: 0; }

        .gs-counter {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.15em; color: rgba(255,255,255,0.25);
        }
        .gs-counter em { font-style: normal; color: rgba(255,255,255,0.6); }

        /* TITLE ROW */
        .gs-title-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          padding: 18px 60px 36px;
        }

        .gs-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(4rem, 7vw, 7rem);
          font-weight: 900; line-height: 0.88;
          letter-spacing: -0.01em; text-transform: uppercase;
          color: #f0ece4; margin: 0;
        }
        .gs-title .hi  { color: #e8622a; display: block; }
        .gs-title .ghost {
          display: block; color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.09);
          font-size: 75%; margin-top: 6px;
        }

        .gs-nav { display: flex; flex-direction: column; align-items: flex-end; gap: 14px; padding-bottom: 6px; }

        .gs-progress-track { width: 180px; height: 1px; background: rgba(255,255,255,0.1); position: relative; overflow: hidden; }
        .gs-progress-fill  { position: absolute; left: 0; top: 0; height: 100%; background: #e8622a; transition: width 0.08s linear; }

        .gs-nav-btns { display: flex; gap: 10px; }

        .gs-btn {
          width: 50px; height: 50px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent; color: rgba(255,255,255,0.55);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .gs-btn:hover { background: #e8622a; border-color: #e8622a; color: #fff; }
        .gs-btn:disabled { opacity: 0.25; pointer-events: none; }
        .gs-btn svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

        /* CAROUSEL */
        .gs-carousel-wrap { padding: 0 60px; }

        .gs-embla { overflow: hidden; cursor: grab; }
        .gs-embla:active { cursor: grabbing; }

        .gs-track { display: flex; gap: 12px; height: 340px; }
        .gs-track.gs-stretch .gs-slide { flex: 1 1 0 !important; min-width: 0; width: auto !important; }

        .gs-slide {
          flex: 0 0 auto;
          position: relative; overflow: hidden;
          background: #111; border: 1px solid rgba(255,255,255,0.05);
        }

        .gs-slide img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(0.82) saturate(0.85);
          transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease;
          pointer-events: none; user-select: none;
        }
        .gs-slide:hover img { transform: scale(1.06); filter: brightness(1) saturate(1.05); }

        .gs-slide-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(12,12,12,0.9) 0%, rgba(12,12,12,0.2) 45%, transparent 68%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 20px;
        }
        .gs-slide:hover .gs-slide-overlay { opacity: 1; }

        .gs-slide-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #f0ece4; margin: 0 0 4px;
          transform: translateY(6px); transition: transform 0.25s ease 0.04s;
        }
        .gs-slide:hover .gs-slide-title { transform: translateY(0); }

        .gs-slide-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.22em; color: #e8622a; font-weight: 600;
        }

        .gs-notch {
          position: absolute; top: 0; right: 0;
          width: 0; height: 0; border-style: solid;
          border-width: 0 22px 22px 0;
          border-color: transparent #e8622a transparent transparent;
          opacity: 0; transition: opacity 0.25s ease;
        }
        .gs-slide:hover .gs-notch { opacity: 1; }

        /* BOTTOM */
        .gs-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 60px 56px;
        }

        .gs-dots { display: flex; gap: 5px; align-items: center; }
        .gs-dot {
          height: 3px; border-radius: 2px; border: none; padding: 0;
          cursor: pointer; background: rgba(255,255,255,0.18);
          transition: all 0.32s cubic-bezier(0.34,1.56,0.64,1);
        }
        .gs-dot.on { background: #e8622a; }

        .gs-cta { display: flex; align-items: center; gap: 20px; }
        .gs-cta-note { font-family: 'Barlow', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.22); letter-spacing: 0.04em; }

        .gs-cta-btn {
          display: inline-flex; align-items: center; gap: 11px;
          padding: 13px 28px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(232,98,42,0.5);
          background: transparent; color: #e8622a;
          cursor: pointer; position: relative; overflow: hidden;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: color 0.25s ease;
        }
        .gs-cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #e8622a; transform: translateX(-101%); transition: transform 0.26s ease;
        }
        .gs-cta-btn:hover::before { transform: translateX(0); }
        .gs-cta-btn:hover { color: #fff; }
        .gs-cta-btn span, .gs-cta-btn svg { position: relative; z-index: 1; }
        .gs-cta-btn svg { width: 13px; height: 13px; stroke: currentColor; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

        /* SKELETON */
        @keyframes shimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
        .gs-skel { display: flex; gap: 12px; height: 340px; }
        .gs-skel-item {
          flex: 1; height: 100%;
          background: linear-gradient(90deg, #161616 25%, #1e1e1e 50%, #161616 75%);
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
          border: 1px solid rgba(255,255,255,0.04);
        }

        /* EMPTY */
        .gs-empty { height: 340px; border: 1px dashed rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; }
        .gs-empty-ring { width: 42px; height: 42px; margin: 0 auto 14px; border: 1px solid rgba(232,98,42,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .gs-empty-ring svg { width: 18px; height: 18px; stroke: rgba(232,98,42,0.6); fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .gs-empty-h { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin: 0 0 5px; }
        .gs-empty-p { font-family: 'Barlow', sans-serif; font-size: 0.68rem; color: rgba(255,255,255,0.14); }
        .gs-empty-body { text-align: center; }
      `}</style>

      <section className="gs">

        {/* Continuity elements */}
        <div className="gs-border-top" />
        <div className="gs-vline" />
        <div className="gs-vline-dot" />
        <div className="gs-fade-top" />
        <div className="gs-fade-bottom" />

        <div className="gs-inner">

          {/* Meta strip */}
          <div className="gs-meta">
            <div className="gs-label">
              <span className="gs-label-line" />
              Lab Gallery
            </div>
            {!loading && !isEmpty && (
              <div className="gs-counter">
                <em>{String(selectedIndex + 1).padStart(2, "0")}</em>
                &nbsp;/&nbsp;
                {String(images.length).padStart(2, "0")}
              </div>
            )}
          </div>

          {/* Title + Nav */}
          <div className="gs-title-row">
            <h2 className="gs-title">
              <span>Captured</span>
              <span className="hi">Moments</span>
              <span className="ghost">In Focus</span>
            </h2>

            <div className="gs-nav">
              <div className="gs-progress-track">
                <div className="gs-progress-fill" style={{ width: `${progress * 100}%` }} />
              </div>
              <div className="gs-nav-btns">
                <button className="gs-btn" onClick={scrollPrev} disabled={isEmpty || loading} aria-label="Previous">
                  <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button className="gs-btn" onClick={scrollNext} disabled={isEmpty || loading} aria-label="Next">
                  <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel / Skeleton / Empty */}
          <div className="gs-carousel-wrap">
            {loading ? (
              <div className="gs-skel">
                {[0,1,2,3].map(i => <div key={i} className="gs-skel-item" />)}
              </div>
            ) : isEmpty ? (
              <div className="gs-empty">
                <div className="gs-empty-body">
                  <div className="gs-empty-ring">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                  <p className="gs-empty-h">No Featured Photos Yet</p>
                  <p className="gs-empty-p">Featured gallery images will appear here.</p>
                </div>
              </div>
            ) : (
              <div className="gs-embla" ref={emblaRef}>
                <div className={`gs-track${fewImages ? " gs-stretch" : ""}`}>
                  {images.map((img, i) => (
                    <div
                      className="gs-slide"
                      key={img.id}
                      style={!fewImages ? { width: `${RATIOS[i % RATIOS.length] * 280}px` } : undefined}
                    >
                      <img src={img.image_url} alt={img.title ?? "Gallery image"} draggable={false} />
                      <div className="gs-slide-overlay">
                        {img.title && <p className="gs-slide-title">{img.title}</p>}
                        <span className="gs-slide-num">{String(i + 1).padStart(2, "0")} / IDEA LAB</span>
                      </div>
                      <div className="gs-notch" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="gs-bottom">
            <div className="gs-dots">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  className={`gs-dot${i === selectedIndex ? " on" : ""}`}
                  style={{ width: i === selectedIndex ? 34 : 6 }}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="gs-cta">
              {!isEmpty && <span className="gs-cta-note">{images.length} featured photos</span>}
              <Link to="/gallery" className="gs-cta-btn">
                <span>View All Photos</span>
                <svg viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
