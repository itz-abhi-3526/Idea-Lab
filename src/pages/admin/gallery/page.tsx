
import { useEffect, useState, useRef, useCallback } from "react"
import { supabase } from "@/lib/supabase"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const RED      = (a = 1) => `rgba(255,60,60,${a})`
const GREEN    = (a = 1) => `rgba(0,255,120,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"
const PANEL    = "rgba(255,176,0,0.03)"
const BORDER   = "rgba(255,176,0,0.14)"

type Image = {
  id: string
  title: string | null
  image_url: string
  is_featured: boolean
}

/* ══════════════════════════════════════════════════════
   CROP MODAL
══════════════════════════════════════════════════════ */
function CropModal({
  src,
  onConfirm,
  onCancel,
}: {
  src: string
  onConfirm: (cropped: string) => void
  onCancel: () => void
}) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const imgRef      = useRef<HTMLImageElement>(null)
  const containerRef= useRef<HTMLDivElement>(null)

  const [imgLoaded, setImgLoaded] = useState(false)
  const [drag,  setDrag]  = useState(false)
  const [resize,setResize]= useState<string | null>(null)

  // crop box in canvas-pixel space
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 })   // rendered size
  const [aspect, setAspect] = useState<"free"|"1:1"|"16:9"|"4:3">("free")

  const startRef = useRef<{ mx: number; my: number; bx: number; by: number; bw: number; bh: number } | null>(null)

  /* draw overlay */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const img    = imgRef.current
    if (!canvas || !img || !imgLoaded) return
    const ctx = canvas.getContext("2d")!
    canvas.width  = img.clientWidth
    canvas.height = img.clientHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // dark overlay
    ctx.fillStyle = "rgba(0,0,0,0.55)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // clear crop area
    ctx.clearRect(box.x, box.y, box.w, box.h)
    // border
    ctx.strokeStyle = "rgba(255,176,0,0.9)"
    ctx.lineWidth   = 1.5
    ctx.strokeRect(box.x, box.y, box.w, box.h)
    // rule-of-thirds
    ctx.strokeStyle = "rgba(255,176,0,0.25)"
    ctx.lineWidth   = 0.8
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(box.x + box.w * i / 3, box.y); ctx.lineTo(box.x + box.w * i / 3, box.y + box.h); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(box.x, box.y + box.h * i / 3); ctx.lineTo(box.x + box.w, box.y + box.h * i / 3); ctx.stroke()
    }
    // corner handles
    const H = 8
    ctx.fillStyle = "rgba(255,176,0,0.95)"
    const corners = [[box.x, box.y],[box.x+box.w-H, box.y],[box.x, box.y+box.h-H],[box.x+box.w-H, box.y+box.h-H]]
    corners.forEach(([cx,cy]) => ctx.fillRect(cx, cy, H, H))
  }, [box, imgLoaded])

  useEffect(() => { draw() }, [draw])

  /* init box when image loads */
  const onImgLoad = () => {
    const img = imgRef.current!
    const pad = 20
    const w   = img.clientWidth  - pad * 2
    const h   = img.clientHeight - pad * 2
    setBox({ x: pad, y: pad, w, h })
    setImgDim({ w: img.clientWidth, h: img.clientHeight })
    setImgLoaded(true)
  }

  const enforceAspect = (bx: number, by: number, bw: number, bh: number, dim: typeof imgDim) => {
    let nw = bw, nh = bh
    if (aspect === "1:1") { const s = Math.min(nw, nh); nw = s; nh = s }
    if (aspect === "16:9") { nh = nw * 9 / 16 }
    if (aspect === "4:3")  { nh = nw * 3 / 4 }
    const nx = Math.max(0, Math.min(bx, dim.w - nw))
    const ny = Math.max(0, Math.min(by, dim.h - nh))
    return { x: nx, y: ny, w: Math.max(20, nw), h: Math.max(20, nh) }
  }

  const hitHandle = (mx: number, my: number) => {
    const H = 14
    if (Math.abs(mx - box.x) < H && Math.abs(my - box.y) < H) return "tl"
    if (Math.abs(mx - (box.x+box.w)) < H && Math.abs(my - box.y) < H) return "tr"
    if (Math.abs(mx - box.x) < H && Math.abs(my - (box.y+box.h)) < H) return "bl"
    if (Math.abs(mx - (box.x+box.w)) < H && Math.abs(my - (box.y+box.h)) < H) return "br"
    return null
  }

  const getXY = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const src  = "touches" in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent)
    return { mx: src.clientX - rect.left, my: src.clientY - rect.top }
  }

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    const { mx, my } = getXY(e)
    const handle = hitHandle(mx, my)
    startRef.current = { mx, my, bx: box.x, by: box.y, bw: box.w, bh: box.h }
    if (handle) { setResize(handle); setDrag(false) }
    else if (mx > box.x && mx < box.x+box.w && my > box.y && my < box.y+box.h) { setDrag(true); setResize(null) }
    else { setDrag(false); setResize(null) }
  }

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!startRef.current) return
    const { mx, my } = getXY(e)
    const dx = mx - startRef.current.mx
    const dy = my - startRef.current.my
    const { bx, by, bw, bh } = startRef.current

    if (drag) {
      const nx = Math.max(0, Math.min(bx + dx, imgDim.w - bw))
      const ny = Math.max(0, Math.min(by + dy, imgDim.h - bh))
      setBox(b => ({ ...b, x: nx, y: ny }))
    } else if (resize) {
      let nb = { x: bx, y: by, w: bw, h: bh }
      if (resize === "br") { nb.w = Math.max(20, bw + dx); nb.h = Math.max(20, bh + dy) }
      if (resize === "tr") { nb.w = Math.max(20, bw + dx); nb.h = Math.max(20, bh - dy); nb.y = by + dy }
      if (resize === "bl") { nb.w = Math.max(20, bw - dx); nb.h = Math.max(20, bh + dy); nb.x = bx + dx }
      if (resize === "tl") { nb.w = Math.max(20, bw - dx); nb.h = Math.max(20, bh - dy); nb.x = bx + dx; nb.y = by + dy }
      setBox(enforceAspect(nb.x, nb.y, nb.w, nb.h, imgDim))
    }
  }

  const onUp = () => { setDrag(false); setResize(null); startRef.current = null }

  /* apply aspect */
  useEffect(() => {
    if (!imgLoaded) return
    setBox(b => enforceAspect(b.x, b.y, b.w, b.h, imgDim))
  }, [aspect])

  /* export crop */
  const applyCrop = () => {
    const img = imgRef.current!
    const scaleX = img.naturalWidth  / img.clientWidth
    const scaleY = img.naturalHeight / img.clientHeight
    const off = document.createElement("canvas")
    off.width  = Math.round(box.w * scaleX)
    off.height = Math.round(box.h * scaleY)
    const ctx  = off.getContext("2d")!
    ctx.drawImage(img, box.x * scaleX, box.y * scaleY, off.width, off.height, 0, 0, off.width, off.height)
    onConfirm(off.toDataURL("image/jpeg", 0.92))
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <style>{`@keyframes cropshimmer{from{left:-40%}to{left:140%}}`}</style>

      <div style={{ width: "100%", maxWidth: 720, background: BG, border: `1px solid ${AMBER(0.22)}`, boxShadow: "0 40px 80px rgba(0,0,0,0.8)", position: "relative" }}>
        {/* shimmer bar */}
        <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right,transparent,${AMBER(0.65)},transparent)`, animation: "cropshimmer 2.5s linear infinite" }} />
        </div>
        {/* HUD corners */}
        {[["top:8px","left:8px","borderTop","borderLeft"],["top:8px","right:8px","borderTop","borderRight"],["bottom:8px","left:8px","borderBottom","borderLeft"],["bottom:8px","right:8px","borderBottom","borderRight"]].map(([t,l,b1,b2],i) => (
          <div key={i} style={{ position:"absolute", width:10, height:10, ...(t.includes("top") ? {top:8} : {bottom:8}), ...(l.includes("left") ? {left:8} : {right:8}), [b1]: `1px solid ${i<2?AMBER(0.4):AMBER(0.18)}`, [b2]: `1px solid ${i<2?AMBER(0.4):AMBER(0.18)}` }} />
        ))}

        <div style={{ padding: "18px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: AMBER(0.4), marginBottom: 3 }}>SYS · CROP EDITOR</div>
              <div style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: AMBER(0.9) }}>Adjust Crop Region</div>
            </div>
            <button onClick={onCancel} style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: `1px solid ${AMBER(0.18)}`, color: AMBER(0.45), cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem" }}>✕</button>
          </div>

          {/* aspect ratio pills */}
          <div style={{ display: "flex", gap: 5, marginBottom: 12, flexWrap: "wrap" }}>
            {(["free","1:1","16:9","4:3"] as const).map(a => (
              <button key={a} onClick={() => setAspect(a)}
                style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.18em", padding: "4px 10px", background: aspect === a ? AMBER(0.9) : "transparent", border: `1px solid ${aspect === a ? AMBER(0.9) : AMBER(0.18)}`, color: aspect === a ? BG : AMBER(0.5), cursor: "pointer", transition: "all 0.15s" }}
              >{a.toUpperCase()}</button>
            ))}
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.44rem", color: AMBER(0.25), alignSelf: "center", marginLeft: 4 }}>DRAG CORNERS OR BOX TO REPOSITION</span>
          </div>

          {/* image + crop canvas */}
          <div ref={containerRef} style={{ position: "relative", width: "100%", background: "#000", maxHeight: 420, overflow: "hidden", cursor: drag ? "move" : resize ? "nwse-resize" : "crosshair" }}>
            <img ref={imgRef} src={src} alt="crop" onLoad={onImgLoad}
              style={{ display: "block", width: "100%", maxHeight: 420, objectFit: "contain", userSelect: "none", pointerEvents: "none" }}
            />
            {imgLoaded && (
              <canvas ref={canvasRef}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: "none" }}
                onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
                onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
              />
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
            <button onClick={onCancel}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "9px 18px", background: "transparent", border: `1px solid ${AMBER(0.15)}`, color: AMBER(0.4), cursor: "pointer" }}
            >CANCEL</button>
            <button onClick={applyCrop}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "9px 24px", background: AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: "pointer", boxShadow: `0 0 16px ${AMBER(0.3)}` }}
            >APPLY CROP</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   DELETE MODAL
══════════════════════════════════════════════════════ */
function DeleteConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 360, background: BG, border: "1px solid rgba(255,60,60,0.35)", boxShadow: "0 32px 64px rgba(0,0,0,0.7)", position: "relative", overflow: "hidden" }}>
        <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(255,60,60,0.55),transparent)" }} />
        <div style={{ position: "absolute", top: 8, left: 8,   width: 9, height: 9, borderTop: "1px solid rgba(255,60,60,0.45)", borderLeft:  "1px solid rgba(255,60,60,0.45)" }} />
        <div style={{ position: "absolute", top: 8, right: 8,  width: 9, height: 9, borderTop: "1px solid rgba(255,60,60,0.45)", borderRight: "1px solid rgba(255,60,60,0.45)" }} />
        <div style={{ padding: "22px 22px 20px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,60,60,0.5)", marginBottom: 6 }}>SYS · CONFIRM DELETE</div>
          <h3 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "rgba(255,60,60,0.88)", margin: "0 0 8px" }}>Delete Image</h3>
          <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.84rem", color: DIMWHITE(0.4), marginBottom: 20 }}>This action is permanent and cannot be undone.</p>
          <div style={{ height: 1, background: "linear-gradient(to right,rgba(255,60,60,0.12),transparent)", marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={onCancel} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 16px", background: "transparent", border: `1px solid ${hov ? AMBER(0.3) : AMBER(0.15)}`, color: hov ? AMBER(0.65) : AMBER(0.4), cursor: "pointer", transition: "all 0.18s" }}
            >CANCEL</button>
            <button onClick={onConfirm}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", padding: "8px 20px", background: "rgba(255,60,60,0.85)", border: "none", color: BG, fontWeight: 600, cursor: "pointer", boxShadow: "0 0 14px rgba(255,60,60,0.3)" }}
            >DELETE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function AdminGallery() {
  const [images,   setImages]   = useState<Image[]>([])
  const [title,    setTitle]    = useState("")
  const [image,    setImage]    = useState("")       // final url
  const [featured, setFeatured] = useState(true)
  const [uploading,setUploading]= useState(false)
  const [saving,   setSaving]   = useState(false)
  const [titleFoc, setTitleFoc] = useState(false)

  /* crop state */
  const [cropSrc,  setCropSrc]  = useState<string | null>(null)   // raw dataURL pre-crop
  const [preview,  setPreview]  = useState<string | null>(null)   // post-crop dataURL

  /* delete modal */
  const [deleteFor,setDeleteFor]= useState<string | null>(null)

  useEffect(() => { fetchImages() }, [])

  /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */
  async function fetchImages() {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false })
    if (data) setImages(data)
  }

  async function createImage() {
    if (!image && !preview) { alert("Upload an image first"); return }
    setSaving(true)
    let uploadUrl = image
    if (preview && preview.startsWith("data:")) {
      // upload cropped dataURL to Cloudinary
      const blob = await (await fetch(preview)).blob()
      const fd   = new FormData()
      fd.append("file", blob, "cropped.jpg")
      fd.append("upload_preset", "idea_lab_profiles")
      const res  = await fetch(`https://idea-lab-backend.onrender.com/api/upload`, { method: "POST", body: fd })
      const json = await res.json()
      uploadUrl  = json.secure_url
    }
    await supabase.from("gallery_images").insert([{ title, image_url: uploadUrl, is_featured: featured }])
    setTitle(""); setImage(""); setPreview(null); setFeatured(true)
    setSaving(false)
    fetchImages()
  }

  async function deleteImage(id: string) {
    await supabase.from("gallery_images").delete().eq("id", id)
    setDeleteFor(null)
    fetchImages()
  }

  /* file pick → show crop modal */
  async function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCropSrc(ev.target?.result as string)
      setUploading(false)
    }
    reader.readAsDataURL(file)
    // reset input so same file can be re-picked
    e.target.value = ""
  }

  /* crop confirmed → set preview, upload later on save */
  function onCropConfirm(dataUrl: string) {
    setPreview(dataUrl)
    setImage(dataUrl)
    setCropSrc(null)
  }

  const stats = {
    total:    images.length,
    featured: images.filter(i => i.is_featured).length,
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: DIMWHITE(0.85) }}>
      <style>{`
        @keyframes mcblink    { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes galshimmer { from{left:-40%} to{left:140%} }
        input[type=file]      { display:none }
        input::placeholder    { color:rgba(255,176,0,0.2);font-family:'IBM Plex Mono',monospace;font-size:0.72rem }
        .gal-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:8px }
        @media(max-width:600px) {
          .gal-container { padding:16px 14px 36px !important }
          .gal-grid      { grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:6px }
          .gal-upload-row{ flex-direction:column !important }
          .gal-stats     { flex-direction:row !important }
        }
      `}</style>

      <div className="gal-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.32em", color: AMBER(0.45), whiteSpace: "nowrap" }}>SYS · GALLERY CONTROL</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.25)},transparent)` }} />
        </div>

        {/* header + stats */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.01em", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>Gallery Manager</h1>
            <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.3), marginTop: 5 }}>Upload and manage landing page images</p>
          </div>
          <div className="gal-stats" style={{ display: "flex", gap: 6 }}>
            {Object.entries(stats).map(([k, v]) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "7px 16px", border: `1px solid ${AMBER(0.12)}`, background: PANEL }}>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "1rem", fontWeight: 600, color: AMBER(0.85), lineHeight: 1 }}>{v}</span>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.42rem", letterSpacing: "0.22em", color: AMBER(0.28), marginTop: 3 }}>{k.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── UPLOAD PANEL ── */}
        <div style={{ position: "relative", overflow: "hidden", background: PANEL, border: `1px solid ${BORDER}`, marginBottom: 28 }}>
          <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right,transparent,${AMBER(0.6)},transparent)`, animation: "galshimmer 2.5s linear infinite" }} />
          </div>
          <div style={{ position: "absolute", top: 8, left: 8,   width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft:  `1px solid ${AMBER(0.4)}`  }} />
          <div style={{ position: "absolute", top: 8, right: 8,  width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}`  }} />
          <div style={{ position: "absolute", bottom: 8, left: 8,   width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderLeft:  `1px solid ${AMBER(0.18)}` }} />
          <div style={{ position: "absolute", bottom: 8, right: 8,  width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderRight: `1px solid ${AMBER(0.18)}` }} />

          <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: AMBER(0.4), marginBottom: 3 }}>SYS · NEW IMAGE</div>
              <h2 style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: AMBER(0.9), lineHeight: 1, margin: 0 }}>Upload Image</h2>
            </div>

            <div className="gal-upload-row" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              {/* image pick + preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                {/* preview box */}
                <div style={{ width: 110, height: 82, border: `1px solid ${AMBER(preview ? 0.35 : 0.18)}`, background: AMBER(0.04), overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                  {preview
                    ? <img src={preview} alt="Preview" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.44rem", letterSpacing: "0.14em", color: AMBER(0.22), textAlign: "center", padding: "0 6px" }}>NO IMAGE</span>
                  }
                </div>
                <label style={{ cursor: "pointer" }}>
                  <input type="file" accept="image/*" onChange={handleFilePick} />
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.18em", padding: "7px 14px", background: "transparent", border: `1px solid ${uploading ? AMBER(0.1) : AMBER(0.22)}`, color: AMBER(uploading ? 0.3 : 0.6) }}>
                    {uploading ? "READING..." : preview ? "REPLACE ↺" : "PICK IMAGE"}
                  </div>
                </label>
                {preview && (
                  <button onClick={() => setCropSrc(preview)}
                    style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.16em", padding: "5px 12px", background: "transparent", border: `1px solid ${AMBER(0.22)}`, color: AMBER(0.55), cursor: "pointer" }}
                  >✂ RE-CROP</button>
                )}
              </div>

              {/* title + featured */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {/* title input */}
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.46rem", letterSpacing: "0.28em", color: AMBER(0.3), marginBottom: 3, paddingLeft: 10 }}>TITLE (OPTIONAL)</div>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: titleFoc ? 2 : 1, background: titleFoc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`, transition: "all 0.18s" }} />
                    <input placeholder="e.g. Hackathon 2024 · Finals" value={title} onChange={e => setTitle(e.target.value)}
                      onFocus={() => setTitleFoc(true)} onBlur={() => setTitleFoc(false)}
                      style={{ width: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 9, paddingBottom: 9, background: titleFoc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)", borderTop: `1px solid ${titleFoc ? AMBER(0.28) : AMBER(0.09)}`, borderRight: `1px solid ${titleFoc ? AMBER(0.28) : AMBER(0.09)}`, borderBottom: `1px solid ${titleFoc ? AMBER(0.28) : AMBER(0.09)}`, borderLeft: "none", outline: "none", color: DIMWHITE(0.85), fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.04em", transition: "background 0.18s" }}
                    />
                  </div>
                </div>

                {/* featured toggle */}
                <FeaturedToggle value={featured} onChange={setFeatured} />

                {/* save btn */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <SaveBtn onClick={createImage} saving={saving} hasImage={!!preview || !!image} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── GALLERY GRID ── */}
        {images.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "60px 0", border: `1px solid ${AMBER(0.08)}`, background: PANEL }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.3), animation: "mcblink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: AMBER(0.25) }}>NO IMAGES YET</span>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.22em", color: AMBER(0.3) }}>{images.length} IMAGE{images.length !== 1 ? "S" : ""}</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${AMBER(0.1)},transparent)` }} />
            </div>
            <div className="gal-grid">
              {images.map(img => (
                <GalleryTile key={img.id} img={img} onDelete={() => setDeleteFor(img.id)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* crop modal */}
      {cropSrc && (
        <CropModal src={cropSrc} onConfirm={onCropConfirm} onCancel={() => setCropSrc(null)} />
      )}

      {/* delete modal */}
      {deleteFor && (
        <DeleteConfirmModal onConfirm={() => deleteImage(deleteFor)} onCancel={() => setDeleteFor(null)} />
      )}
    </div>
  )
}

/* ── GALLERY TILE ── */
function GalleryTile({ img, onDelete }: { img: Image; onDelete: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", overflow: "hidden", border: `1px solid ${hov ? AMBER(0.3) : AMBER(0.1)}`, transition: "border 0.22s", aspectRatio: "4/3" }}
    >
      <img src={img.image_url} alt={img.title ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s, opacity 0.4s", transform: hov ? "scale(1.04)" : "scale(1)", opacity: hov ? 0.7 : 1 }} />

      {/* overlay on hover */}
      {hov && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(to top,rgba(10,9,0,0.85),transparent 60%)", padding: "10px 10px 8px" }}>
          {img.title && (
            <div style={{ fontFamily: "'IBM Plex Sans Condensed',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: DIMWHITE(0.85), marginBottom: 5, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.title}</div>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {img.is_featured && (
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.42rem", letterSpacing: "0.15em", padding: "2px 6px", color: AMBER(0.85), border: `1px solid ${AMBER(0.35)}`, background: AMBER(0.08) }}>CAROUSEL</span>
            )}
            <button onClick={onDelete}
              style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.48rem", letterSpacing: "0.14em", padding: "4px 10px", background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.45)", color: "rgba(255,60,60,0.85)", cursor: "pointer" }}
            >DELETE</button>
          </div>
        </div>
      )}

      {/* top shimmer on hover */}
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${AMBER(0.5)},transparent)` }} />}
    </div>
  )
}

/* ── FEATURED TOGGLE ── */
function FeaturedToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button onClick={() => onChange(!value)}
        style={{ width: 36, height: 20, background: value ? AMBER(0.85) : "rgba(255,255,255,0.06)", border: `1px solid ${value ? AMBER(0.6) : AMBER(0.15)}`, position: "relative", cursor: "pointer", transition: "all 0.22s", flexShrink: 0 }}
      >
        <div style={{ position: "absolute", top: 2, left: value ? 17 : 2, width: 14, height: 14, background: value ? BG : AMBER(0.3), transition: "left 0.22s, background 0.22s" }} />
      </button>
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.18em", color: value ? AMBER(0.7) : AMBER(0.3), transition: "color 0.2s" }}>
        {value ? "SHOW IN CAROUSEL" : "CAROUSEL: OFF"}
      </span>
    </div>
  )
}

/* ── SAVE BTN ── */
function SaveBtn({ onClick, saving, hasImage }: { onClick: () => void; saving: boolean; hasImage: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} disabled={saving || !hasImage}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.22em", padding: "10px 26px", background: (!hasImage || saving) ? AMBER(0.35) : hov ? AMBER(1) : AMBER(0.9), border: "none", color: BG, fontWeight: 600, cursor: saving || !hasImage ? "not-allowed" : "pointer", boxShadow: (!hasImage || saving) ? "none" : `0 0 ${hov ? 22 : 14}px ${AMBER(hov ? 0.38 : 0.22)}`, position: "relative", overflow: "hidden", transition: "all 0.18s" }}
    >
      {saving && <span style={{ position: "absolute", top: 0, bottom: 0, width: "30%", background: "linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)", animation: "galshimmer 0.85s linear infinite" }} />}
      <span style={{ position: "relative", zIndex: 1 }}>{saving ? "SAVING..." : "SAVE IMAGE"}</span>
    </button>
  )
}
