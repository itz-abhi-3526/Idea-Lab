module.exports = [
"[project]/app/admin/gallery/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
const RED = (a = 1)=>`rgba(255,60,60,${a})`;
const GREEN = (a = 1)=>`rgba(0,255,120,${a})`;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
/* ══════════════════════════════════════════════════════
   CROP MODAL
══════════════════════════════════════════════════════ */ function CropModal({ src, onConfirm, onCancel }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [imgLoaded, setImgLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [drag, setDrag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resize, setResize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // crop box in canvas-pixel space
    const [box, setBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        w: 0,
        h: 0
    });
    const [imgDim, setImgDim] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    }) // rendered size
    ;
    const [aspect, setAspect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("free");
    const startRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    /* draw overlay */ const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img || !imgLoaded) return;
        const ctx = canvas.getContext("2d");
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // dark overlay
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // clear crop area
        ctx.clearRect(box.x, box.y, box.w, box.h);
        // border
        ctx.strokeStyle = "rgba(255,176,0,0.9)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(box.x, box.y, box.w, box.h);
        // rule-of-thirds
        ctx.strokeStyle = "rgba(255,176,0,0.25)";
        ctx.lineWidth = 0.8;
        for(let i = 1; i < 3; i++){
            ctx.beginPath();
            ctx.moveTo(box.x + box.w * i / 3, box.y);
            ctx.lineTo(box.x + box.w * i / 3, box.y + box.h);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(box.x, box.y + box.h * i / 3);
            ctx.lineTo(box.x + box.w, box.y + box.h * i / 3);
            ctx.stroke();
        }
        // corner handles
        const H = 8;
        ctx.fillStyle = "rgba(255,176,0,0.95)";
        const corners = [
            [
                box.x,
                box.y
            ],
            [
                box.x + box.w - H,
                box.y
            ],
            [
                box.x,
                box.y + box.h - H
            ],
            [
                box.x + box.w - H,
                box.y + box.h - H
            ]
        ];
        corners.forEach(([cx, cy])=>ctx.fillRect(cx, cy, H, H));
    }, [
        box,
        imgLoaded
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        draw();
    }, [
        draw
    ]);
    /* init box when image loads */ const onImgLoad = ()=>{
        const img = imgRef.current;
        const pad = 20;
        const w = img.clientWidth - pad * 2;
        const h = img.clientHeight - pad * 2;
        setBox({
            x: pad,
            y: pad,
            w,
            h
        });
        setImgDim({
            w: img.clientWidth,
            h: img.clientHeight
        });
        setImgLoaded(true);
    };
    const enforceAspect = (bx, by, bw, bh, dim)=>{
        let nw = bw, nh = bh;
        if (aspect === "1:1") {
            const s = Math.min(nw, nh);
            nw = s;
            nh = s;
        }
        if (aspect === "16:9") {
            nh = nw * 9 / 16;
        }
        if (aspect === "4:3") {
            nh = nw * 3 / 4;
        }
        const nx = Math.max(0, Math.min(bx, dim.w - nw));
        const ny = Math.max(0, Math.min(by, dim.h - nh));
        return {
            x: nx,
            y: ny,
            w: Math.max(20, nw),
            h: Math.max(20, nh)
        };
    };
    const hitHandle = (mx, my)=>{
        const H = 14;
        if (Math.abs(mx - box.x) < H && Math.abs(my - box.y) < H) return "tl";
        if (Math.abs(mx - (box.x + box.w)) < H && Math.abs(my - box.y) < H) return "tr";
        if (Math.abs(mx - box.x) < H && Math.abs(my - (box.y + box.h)) < H) return "bl";
        if (Math.abs(mx - (box.x + box.w)) < H && Math.abs(my - (box.y + box.h)) < H) return "br";
        return null;
    };
    const getXY = (e)=>{
        const rect = canvasRef.current.getBoundingClientRect();
        const src = "touches" in e ? e.touches[0] : e;
        return {
            mx: src.clientX - rect.left,
            my: src.clientY - rect.top
        };
    };
    const onDown = (e)=>{
        const { mx, my } = getXY(e);
        const handle = hitHandle(mx, my);
        startRef.current = {
            mx,
            my,
            bx: box.x,
            by: box.y,
            bw: box.w,
            bh: box.h
        };
        if (handle) {
            setResize(handle);
            setDrag(false);
        } else if (mx > box.x && mx < box.x + box.w && my > box.y && my < box.y + box.h) {
            setDrag(true);
            setResize(null);
        } else {
            setDrag(false);
            setResize(null);
        }
    };
    const onMove = (e)=>{
        if (!startRef.current) return;
        const { mx, my } = getXY(e);
        const dx = mx - startRef.current.mx;
        const dy = my - startRef.current.my;
        const { bx, by, bw, bh } = startRef.current;
        if (drag) {
            const nx = Math.max(0, Math.min(bx + dx, imgDim.w - bw));
            const ny = Math.max(0, Math.min(by + dy, imgDim.h - bh));
            setBox((b)=>({
                    ...b,
                    x: nx,
                    y: ny
                }));
        } else if (resize) {
            let nb = {
                x: bx,
                y: by,
                w: bw,
                h: bh
            };
            if (resize === "br") {
                nb.w = Math.max(20, bw + dx);
                nb.h = Math.max(20, bh + dy);
            }
            if (resize === "tr") {
                nb.w = Math.max(20, bw + dx);
                nb.h = Math.max(20, bh - dy);
                nb.y = by + dy;
            }
            if (resize === "bl") {
                nb.w = Math.max(20, bw - dx);
                nb.h = Math.max(20, bh + dy);
                nb.x = bx + dx;
            }
            if (resize === "tl") {
                nb.w = Math.max(20, bw - dx);
                nb.h = Math.max(20, bh - dy);
                nb.x = bx + dx;
                nb.y = by + dy;
            }
            setBox(enforceAspect(nb.x, nb.y, nb.w, nb.h, imgDim));
        }
    };
    const onUp = ()=>{
        setDrag(false);
        setResize(null);
        startRef.current = null;
    };
    /* apply aspect */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!imgLoaded) return;
        setBox((b)=>enforceAspect(b.x, b.y, b.w, b.h, imgDim));
    }, [
        aspect
    ]);
    /* export crop */ const applyCrop = ()=>{
        const img = imgRef.current;
        const scaleX = img.naturalWidth / img.clientWidth;
        const scaleY = img.naturalHeight / img.clientHeight;
        const off = document.createElement("canvas");
        off.width = Math.round(box.w * scaleX);
        off.height = Math.round(box.h * scaleY);
        const ctx = off.getContext("2d");
        ctx.drawImage(img, box.x * scaleX, box.y * scaleY, off.width, off.height, 0, 0, off.width, off.height);
        onConfirm(off.toDataURL("image/jpeg", 0.92));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 80,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes cropshimmer{from{left:-40%}to{left:140%}}`
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: 720,
                    background: BG,
                    border: `1px solid ${AMBER(0.22)}`,
                    boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 1,
                            overflow: "hidden",
                            background: AMBER(0.1),
                            position: "relative"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                width: "40%",
                                background: `linear-gradient(to right,transparent,${AMBER(0.65)},transparent)`,
                                animation: "cropshimmer 2.5s linear infinite"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/admin/gallery/page.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    [
                        [
                            "top:8px",
                            "left:8px",
                            "borderTop",
                            "borderLeft"
                        ],
                        [
                            "top:8px",
                            "right:8px",
                            "borderTop",
                            "borderRight"
                        ],
                        [
                            "bottom:8px",
                            "left:8px",
                            "borderBottom",
                            "borderLeft"
                        ],
                        [
                            "bottom:8px",
                            "right:8px",
                            "borderBottom",
                            "borderRight"
                        ]
                    ].map(([t, l, b1, b2], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                width: 10,
                                height: 10,
                                ...t.includes("top") ? {
                                    top: 8
                                } : {
                                    bottom: 8
                                },
                                ...l.includes("left") ? {
                                    left: 8
                                } : {
                                    right: 8
                                },
                                [b1]: `1px solid ${i < 2 ? AMBER(0.4) : AMBER(0.18)}`,
                                [b2]: `1px solid ${i < 2 ? AMBER(0.4) : AMBER(0.18)}`
                            }
                        }, i, false, {
                            fileName: "[project]/app/admin/gallery/page.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "18px 20px 20px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                    fontSize: "0.5rem",
                                                    letterSpacing: "0.3em",
                                                    color: AMBER(0.4),
                                                    marginBottom: 3
                                                },
                                                children: "SYS · CROP EDITOR"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: "1.1rem",
                                                    color: AMBER(0.9)
                                                },
                                                children: "Adjust Crop Region"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onCancel,
                                        style: {
                                            width: 26,
                                            height: 26,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.18)}`,
                                            color: AMBER(0.45),
                                            cursor: "pointer",
                                            fontFamily: "'IBM Plex Mono',monospace",
                                            fontSize: "0.65rem"
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 5,
                                    marginBottom: 12,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    [
                                        "free",
                                        "1:1",
                                        "16:9",
                                        "4:3"
                                    ].map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAspect(a),
                                            style: {
                                                fontFamily: "'IBM Plex Mono',monospace",
                                                fontSize: "0.5rem",
                                                letterSpacing: "0.18em",
                                                padding: "4px 10px",
                                                background: aspect === a ? AMBER(0.9) : "transparent",
                                                border: `1px solid ${aspect === a ? AMBER(0.9) : AMBER(0.18)}`,
                                                color: aspect === a ? BG : AMBER(0.5),
                                                cursor: "pointer",
                                                transition: "all 0.15s"
                                            },
                                            children: a.toUpperCase()
                                        }, a, false, {
                                            fileName: "[project]/app/admin/gallery/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono',monospace",
                                            fontSize: "0.44rem",
                                            color: AMBER(0.25),
                                            alignSelf: "center",
                                            marginLeft: 4
                                        },
                                        children: "DRAG CORNERS OR BOX TO REPOSITION"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: containerRef,
                                style: {
                                    position: "relative",
                                    width: "100%",
                                    background: "#000",
                                    maxHeight: 420,
                                    overflow: "hidden",
                                    cursor: drag ? "move" : resize ? "nwse-resize" : "crosshair"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        ref: imgRef,
                                        src: src,
                                        alt: "crop",
                                        onLoad: onImgLoad,
                                        style: {
                                            display: "block",
                                            width: "100%",
                                            maxHeight: 420,
                                            objectFit: "contain",
                                            userSelect: "none",
                                            pointerEvents: "none"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    imgLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                        ref: canvasRef,
                                        style: {
                                            position: "absolute",
                                            inset: 0,
                                            width: "100%",
                                            height: "100%",
                                            touchAction: "none"
                                        },
                                        onMouseDown: onDown,
                                        onMouseMove: onMove,
                                        onMouseUp: onUp,
                                        onMouseLeave: onUp,
                                        onTouchStart: onDown,
                                        onTouchMove: onMove,
                                        onTouchEnd: onUp
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: 8,
                                    marginTop: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onCancel,
                                        style: {
                                            fontFamily: "'IBM Plex Mono',monospace",
                                            fontSize: "0.58rem",
                                            letterSpacing: "0.2em",
                                            padding: "9px 18px",
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.15)}`,
                                            color: AMBER(0.4),
                                            cursor: "pointer"
                                        },
                                        children: "CANCEL"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: applyCrop,
                                        style: {
                                            fontFamily: "'IBM Plex Mono',monospace",
                                            fontSize: "0.58rem",
                                            letterSpacing: "0.2em",
                                            padding: "9px 24px",
                                            background: AMBER(0.9),
                                            border: "none",
                                            color: BG,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            boxShadow: `0 0 16px ${AMBER(0.3)}`
                                        },
                                        children: "APPLY CROP"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/gallery/page.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
/* ══════════════════════════════════════════════════════
   DELETE MODAL
══════════════════════════════════════════════════════ */ function DeleteConfirmModal({ onConfirm, onCancel }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            padding: 16
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: 360,
                background: BG,
                border: "1px solid rgba(255,60,60,0.35)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
                position: "relative",
                overflow: "hidden"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 1,
                        background: "linear-gradient(to right,transparent,rgba(255,60,60,0.55),transparent)"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/admin/gallery/page.tsx",
                    lineNumber: 239,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        top: 8,
                        left: 8,
                        width: 9,
                        height: 9,
                        borderTop: "1px solid rgba(255,60,60,0.45)",
                        borderLeft: "1px solid rgba(255,60,60,0.45)"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/admin/gallery/page.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 9,
                        height: 9,
                        borderTop: "1px solid rgba(255,60,60,0.45)",
                        borderRight: "1px solid rgba(255,60,60,0.45)"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/admin/gallery/page.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "22px 22px 20px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: "0.5rem",
                                letterSpacing: "0.3em",
                                color: "rgba(255,60,60,0.5)",
                                marginBottom: 6
                            },
                            children: "SYS · CONFIRM DELETE"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/gallery/page.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                                fontWeight: 700,
                                fontSize: "1.2rem",
                                color: "rgba(255,60,60,0.88)",
                                margin: "0 0 8px"
                            },
                            children: "Delete Image"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/gallery/page.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'IBM Plex Sans',sans-serif",
                                fontWeight: 300,
                                fontSize: "0.84rem",
                                color: DIMWHITE(0.4),
                                marginBottom: 20
                            },
                            children: "This action is permanent and cannot be undone."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/gallery/page.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: 1,
                                background: "linear-gradient(to right,rgba(255,60,60,0.12),transparent)",
                                marginBottom: 16
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/admin/gallery/page.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onCancel,
                                    onMouseEnter: ()=>setHov(true),
                                    onMouseLeave: ()=>setHov(false),
                                    style: {
                                        fontFamily: "'IBM Plex Mono',monospace",
                                        fontSize: "0.58rem",
                                        letterSpacing: "0.2em",
                                        padding: "8px 16px",
                                        background: "transparent",
                                        border: `1px solid ${hov ? AMBER(0.3) : AMBER(0.15)}`,
                                        color: hov ? AMBER(0.65) : AMBER(0.4),
                                        cursor: "pointer",
                                        transition: "all 0.18s"
                                    },
                                    children: "CANCEL"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/gallery/page.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onConfirm,
                                    style: {
                                        fontFamily: "'IBM Plex Mono',monospace",
                                        fontSize: "0.58rem",
                                        letterSpacing: "0.2em",
                                        padding: "8px 20px",
                                        background: "rgba(255,60,60,0.85)",
                                        border: "none",
                                        color: BG,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        boxShadow: "0 0 14px rgba(255,60,60,0.3)"
                                    },
                                    children: "DELETE"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/gallery/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/gallery/page.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/gallery/page.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/gallery/page.tsx",
            lineNumber: 238,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/gallery/page.tsx",
        lineNumber: 237,
        columnNumber: 5
    }, this);
}
function AdminGallery() {
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("") // final url
    ;
    const [featured, setFeatured] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [titleFoc, setTitleFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    /* crop state */ const [cropSrc, setCropSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null) // raw dataURL pre-crop
    ;
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null) // post-crop dataURL
    ;
    /* delete modal */ const [deleteFor, setDeleteFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchImages();
    }, []);
    /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */ async function fetchImages() {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("gallery_images").select("*").order("created_at", {
            ascending: false
        });
        if (data) setImages(data);
    }
    async function createImage() {
        if (!image && !preview) {
            alert("Upload an image first");
            return;
        }
        setSaving(true);
        let uploadUrl = image;
        if (preview && preview.startsWith("data:")) {
            // upload cropped dataURL to Cloudinary
            const blob = await (await fetch(preview)).blob();
            const fd = new FormData();
            fd.append("file", blob, "cropped.jpg");
            fd.append("upload_preset", "idea_lab_profiles");
            const res = await fetch(`https://api.cloudinary.com/v1_1/${("TURBOPACK compile-time value", "dvrc3jqve")}/image/upload`, {
                method: "POST",
                body: fd
            });
            const json = await res.json();
            uploadUrl = json.secure_url;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("gallery_images").insert([
            {
                title,
                image_url: uploadUrl,
                is_featured: featured
            }
        ]);
        setTitle("");
        setImage("");
        setPreview(null);
        setFeatured(true);
        setSaving(false);
        fetchImages();
    }
    async function deleteImage(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("gallery_images").delete().eq("id", id);
        setDeleteFor(null);
        fetchImages();
    }
    /* file pick → show crop modal */ async function handleFilePick(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const reader = new FileReader();
        reader.onload = (ev)=>{
            setCropSrc(ev.target?.result);
            setUploading(false);
        };
        reader.readAsDataURL(file);
        // reset input so same file can be re-picked
        e.target.value = "";
    }
    /* crop confirmed → set preview, upload later on save */ function onCropConfirm(dataUrl) {
        setPreview(dataUrl);
        setImage(dataUrl);
        setCropSrc(null);
    }
    const stats = {
        total: images.length,
        featured: images.filter((i)=>i.is_featured).length
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: BG,
            color: DIMWHITE(0.85)
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gal-container",
                style: {
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "28px 24px 48px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.58rem",
                                    letterSpacing: "0.32em",
                                    color: AMBER(0.45),
                                    whiteSpace: "nowrap"
                                },
                                children: "SYS · GALLERY CONTROL"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right,${AMBER(0.25)},transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12,
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                                            fontWeight: 700,
                                            fontSize: "clamp(1.6rem,4vw,2.4rem)",
                                            letterSpacing: "-0.01em",
                                            color: AMBER(0.9),
                                            lineHeight: 1,
                                            margin: 0
                                        },
                                        children: "Gallery Manager"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans',sans-serif",
                                            fontWeight: 300,
                                            fontSize: "0.85rem",
                                            color: DIMWHITE(0.3),
                                            marginTop: 5
                                        },
                                        children: "Upload and manage landing page images"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "gal-stats",
                                style: {
                                    display: "flex",
                                    gap: 6
                                },
                                children: Object.entries(stats).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            padding: "7px 16px",
                                            border: `1px solid ${AMBER(0.12)}`,
                                            background: PANEL
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                    fontSize: "1rem",
                                                    fontWeight: 600,
                                                    color: AMBER(0.85),
                                                    lineHeight: 1
                                                },
                                                children: v
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                    fontSize: "0.42rem",
                                                    letterSpacing: "0.22em",
                                                    color: AMBER(0.28),
                                                    marginTop: 3
                                                },
                                                children: k.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, k, true, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 372,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 370,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            overflow: "hidden",
                            background: PANEL,
                            border: `1px solid ${BORDER}`,
                            marginBottom: 28
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 1,
                                    overflow: "hidden",
                                    background: AMBER(0.1),
                                    position: "relative"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        width: "40%",
                                        background: `linear-gradient(to right,transparent,${AMBER(0.6)},transparent)`,
                                        animation: "galshimmer 2.5s linear infinite"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/gallery/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    top: 8,
                                    left: 8,
                                    width: 10,
                                    height: 10,
                                    borderTop: `1px solid ${AMBER(0.4)}`,
                                    borderLeft: `1px solid ${AMBER(0.4)}`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    width: 10,
                                    height: 10,
                                    borderTop: `1px solid ${AMBER(0.4)}`,
                                    borderRight: `1px solid ${AMBER(0.4)}`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    bottom: 8,
                                    left: 8,
                                    width: 10,
                                    height: 10,
                                    borderBottom: `1px solid ${AMBER(0.18)}`,
                                    borderLeft: `1px solid ${AMBER(0.18)}`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    bottom: 8,
                                    right: 8,
                                    width: 10,
                                    height: 10,
                                    borderBottom: `1px solid ${AMBER(0.18)}`,
                                    borderRight: `1px solid ${AMBER(0.18)}`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "20px 20px 22px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                    fontSize: "0.5rem",
                                                    letterSpacing: "0.3em",
                                                    color: AMBER(0.4),
                                                    marginBottom: 3
                                                },
                                                children: "SYS · NEW IMAGE"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: "1.1rem",
                                                    color: AMBER(0.9),
                                                    lineHeight: 1,
                                                    margin: 0
                                                },
                                                children: "Upload Image"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 393,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "gal-upload-row",
                                        style: {
                                            display: "flex",
                                            gap: 14,
                                            alignItems: "flex-start"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 8,
                                                    alignItems: "flex-start"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 110,
                                                            height: 82,
                                                            border: `1px solid ${AMBER(preview ? 0.35 : 0.18)}`,
                                                            background: AMBER(0.04),
                                                            overflow: "hidden",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            position: "relative",
                                                            flexShrink: 0
                                                        },
                                                        children: preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: preview,
                                                            alt: "Preview",
                                                            style: {
                                                                position: "absolute",
                                                                inset: 0,
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/gallery/page.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontFamily: "'IBM Plex Mono',monospace",
                                                                fontSize: "0.44rem",
                                                                letterSpacing: "0.14em",
                                                                color: AMBER(0.22),
                                                                textAlign: "center",
                                                                padding: "0 6px"
                                                            },
                                                            children: "NO IMAGE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/gallery/page.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: {
                                                            cursor: "pointer"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "file",
                                                                accept: "image/*",
                                                                onChange: handleFilePick
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                                lineNumber: 407,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                                    fontSize: "0.52rem",
                                                                    letterSpacing: "0.18em",
                                                                    padding: "7px 14px",
                                                                    background: "transparent",
                                                                    border: `1px solid ${uploading ? AMBER(0.1) : AMBER(0.22)}`,
                                                                    color: AMBER(uploading ? 0.3 : 0.6)
                                                                },
                                                                children: uploading ? "READING..." : preview ? "REPLACE ↺" : "PICK IMAGE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 17
                                                    }, this),
                                                    preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCropSrc(preview),
                                                        style: {
                                                            fontFamily: "'IBM Plex Mono',monospace",
                                                            fontSize: "0.5rem",
                                                            letterSpacing: "0.16em",
                                                            padding: "5px 12px",
                                                            background: "transparent",
                                                            border: `1px solid ${AMBER(0.22)}`,
                                                            color: AMBER(0.55),
                                                            cursor: "pointer"
                                                        },
                                                        children: "✂ RE-CROP"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 398,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                                    fontSize: "0.46rem",
                                                                    letterSpacing: "0.28em",
                                                                    color: AMBER(0.3),
                                                                    marginBottom: 3,
                                                                    paddingLeft: 10
                                                                },
                                                                children: "TITLE (OPTIONAL)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                                lineNumber: 423,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: "relative"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            position: "absolute",
                                                                            left: 0,
                                                                            top: 0,
                                                                            bottom: 0,
                                                                            width: titleFoc ? 2 : 1,
                                                                            background: titleFoc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`,
                                                                            transition: "all 0.18s"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                                        lineNumber: 425,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        placeholder: "e.g. Hackathon 2024 · Finals",
                                                                        value: title,
                                                                        onChange: (e)=>setTitle(e.target.value),
                                                                        onFocus: ()=>setTitleFoc(true),
                                                                        onBlur: ()=>setTitleFoc(false),
                                                                        style: {
                                                                            width: "100%",
                                                                            paddingLeft: 10,
                                                                            paddingRight: 10,
                                                                            paddingTop: 9,
                                                                            paddingBottom: 9,
                                                                            background: titleFoc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)",
                                                                            borderTop: `1px solid ${titleFoc ? AMBER(0.28) : AMBER(0.09)}`,
                                                                            borderRight: `1px solid ${titleFoc ? AMBER(0.28) : AMBER(0.09)}`,
                                                                            borderBottom: `1px solid ${titleFoc ? AMBER(0.28) : AMBER(0.09)}`,
                                                                            borderLeft: "none",
                                                                            outline: "none",
                                                                            color: DIMWHITE(0.85),
                                                                            fontFamily: "'IBM Plex Mono',monospace",
                                                                            fontSize: "0.75rem",
                                                                            letterSpacing: "0.04em",
                                                                            transition: "background 0.18s"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                                        lineNumber: 426,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                                lineNumber: 424,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeaturedToggle, {
                                                        value: featured,
                                                        onChange: setFeatured
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "flex-end"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SaveBtn, {
                                                            onClick: createImage,
                                                            saving: saving,
                                                            hasImage: !!preview || !!image
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/gallery/page.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/gallery/page.tsx",
                                                lineNumber: 420,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 396,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    images.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 8,
                            padding: "60px 0",
                            border: `1px solid ${AMBER(0.08)}`,
                            background: PANEL
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: AMBER(0.3),
                                    animation: "mcblink 2s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 448,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.25em",
                                    color: AMBER(0.25)
                                },
                                children: "NO IMAGES YET"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 449,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 447,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono',monospace",
                                            fontSize: "0.5rem",
                                            letterSpacing: "0.22em",
                                            color: AMBER(0.3)
                                        },
                                        children: [
                                            images.length,
                                            " IMAGE",
                                            images.length !== 1 ? "S" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            height: 1,
                                            background: `linear-gradient(to right,${AMBER(0.1)},transparent)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 455,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "gal-grid",
                                children: images.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GalleryTile, {
                                        img: img,
                                        onDelete: ()=>setDeleteFor(img.id)
                                    }, img.id, false, {
                                        fileName: "[project]/app/admin/gallery/page.tsx",
                                        lineNumber: 459,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 457,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this),
            cropSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CropModal, {
                src: cropSrc,
                onConfirm: onCropConfirm,
                onCancel: ()=>setCropSrc(null)
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 468,
                columnNumber: 9
            }, this),
            deleteFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeleteConfirmModal, {
                onConfirm: ()=>deleteImage(deleteFor),
                onCancel: ()=>setDeleteFor(null)
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 473,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/gallery/page.tsx",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
/* ── GALLERY TILE ── */ function GalleryTile({ img, onDelete }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            position: "relative",
            overflow: "hidden",
            border: `1px solid ${hov ? AMBER(0.3) : AMBER(0.1)}`,
            transition: "border 0.22s",
            aspectRatio: "4/3"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: img.image_url,
                alt: img.title ?? "",
                style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s, opacity 0.4s",
                    transform: hov ? "scale(1.04)" : "scale(1)",
                    opacity: hov ? 0.7 : 1
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 487,
                columnNumber: 7
            }, this),
            hov && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background: "linear-gradient(to top,rgba(10,9,0,0.85),transparent 60%)",
                    padding: "10px 10px 8px"
                },
                children: [
                    img.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            color: DIMWHITE(0.85),
                            marginBottom: 5,
                            lineHeight: 1.2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        children: img.title
                    }, void 0, false, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 493,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        },
                        children: [
                            img.is_featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.42rem",
                                    letterSpacing: "0.15em",
                                    padding: "2px 6px",
                                    color: AMBER(0.85),
                                    border: `1px solid ${AMBER(0.35)}`,
                                    background: AMBER(0.08)
                                },
                                children: "CAROUSEL"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 497,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onDelete,
                                style: {
                                    marginLeft: "auto",
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.48rem",
                                    letterSpacing: "0.14em",
                                    padding: "4px 10px",
                                    background: "rgba(255,60,60,0.15)",
                                    border: "1px solid rgba(255,60,60,0.45)",
                                    color: "rgba(255,60,60,0.85)",
                                    cursor: "pointer"
                                },
                                children: "DELETE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/gallery/page.tsx",
                                lineNumber: 499,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/gallery/page.tsx",
                        lineNumber: 495,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 491,
                columnNumber: 9
            }, this),
            hov && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(to right,transparent,${AMBER(0.5)},transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 507,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/gallery/page.tsx",
        lineNumber: 483,
        columnNumber: 5
    }, this);
}
/* ── FEATURED TOGGLE ── */ function FeaturedToggle({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(!value),
                style: {
                    width: 36,
                    height: 20,
                    background: value ? AMBER(0.85) : "rgba(255,255,255,0.06)",
                    border: `1px solid ${value ? AMBER(0.6) : AMBER(0.15)}`,
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.22s",
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        top: 2,
                        left: value ? 17 : 2,
                        width: 14,
                        height: 14,
                        background: value ? BG : AMBER(0.3),
                        transition: "left 0.22s, background 0.22s"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/admin/gallery/page.tsx",
                    lineNumber: 519,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 516,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.18em",
                    color: value ? AMBER(0.7) : AMBER(0.3),
                    transition: "color 0.2s"
                },
                children: value ? "SHOW IN CAROUSEL" : "CAROUSEL: OFF"
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 521,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/gallery/page.tsx",
        lineNumber: 515,
        columnNumber: 5
    }, this);
}
/* ── SAVE BTN ── */ function SaveBtn({ onClick, saving, hasImage }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: saving || !hasImage,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono',monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            padding: "10px 26px",
            background: !hasImage || saving ? AMBER(0.35) : hov ? AMBER(1) : AMBER(0.9),
            border: "none",
            color: BG,
            fontWeight: 600,
            cursor: saving || !hasImage ? "not-allowed" : "pointer",
            boxShadow: !hasImage || saving ? "none" : `0 0 ${hov ? 22 : 14}px ${AMBER(hov ? 0.38 : 0.22)}`,
            position: "relative",
            overflow: "hidden",
            transition: "all 0.18s"
        },
        children: [
            saving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "30%",
                    background: "linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)",
                    animation: "galshimmer 0.85s linear infinite"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 536,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: saving ? "SAVING..." : "SAVE IMAGE"
            }, void 0, false, {
                fileName: "[project]/app/admin/gallery/page.tsx",
                lineNumber: 537,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/gallery/page.tsx",
        lineNumber: 532,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_admin_gallery_page_tsx_5bb0fe81._.js.map