(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/incubation-requests/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminIncubationRequestsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jszip/lib/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */ const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const GREEN = (a = 1)=>`rgba(0,255,120,${a})`;
_c1 = GREEN;
const RED = (a = 1)=>`rgba(255,60,60,${a})`;
_c2 = RED;
const SKY = (a = 1)=>`rgba(56,189,248,${a})`;
_c3 = SKY;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c4 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */ const STATUS_FALLBACK = {
    label: "UNKNOWN",
    color: DIMWHITE(0.3),
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.08)"
};
const STATUS_CFG = {
    submitted: {
        label: "SUBMITTED",
        color: AMBER(0.85),
        bg: AMBER(0.07),
        border: AMBER(0.28)
    },
    approved: {
        label: "APPROVED",
        color: SKY(0.85),
        bg: SKY(0.07),
        border: SKY(0.28)
    },
    rejected: {
        label: "REJECTED",
        color: RED(0.85),
        bg: RED(0.07),
        border: RED(0.28)
    },
    completed: {
        label: "COMPLETED",
        color: GREEN(0.85),
        bg: GREEN(0.07),
        border: GREEN(0.28)
    }
};
/* ─────────────────────────────────────────
   ZIP DOWNLOAD — unchanged
───────────────────────────────────────── */ async function downloadZip(req) {
    const zip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
    const folder = zip.folder(`incubation-request-${req.id}`);
    if (!folder) return;
    const files = [];
    if (req.sliced_model_screenshot_url) files.push({
        url: req.sliced_model_screenshot_url,
        name: 'sliced-model.png'
    });
    if (req.payment_screenshot_url) files.push({
        url: req.payment_screenshot_url,
        name: 'payment-proof.png'
    });
    req.design_files_urls?.forEach((url, i)=>files.push({
            url,
            name: `design-file-${i + 1}.stl`
        }));
    for (const file of files){
        const blob = await (await fetch(file.url)).blob();
        folder.file(file.name, blob);
    }
    const content = await zip.generateAsync({
        type: 'blob'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `incubation-request-${req.id}.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
}
/* ─────────────────────────────────────────
   ACTION BUTTON
───────────────────────────────────────── */ function ActionBtn({ label, onClick, color, bg, border }) {
    _s();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            padding: "8px 14px",
            background: hov ? bg : "transparent",
            borderTop: `1px solid ${border}`,
            borderRight: `1px solid ${border}`,
            borderBottom: `1px solid ${border}`,
            borderLeft: "none",
            color,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.18s",
            whiteSpace: "nowrap",
            flex: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
                    opacity: hov ? 1 : 0.4,
                    transition: "opacity 0.18s"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/incubation-requests/page.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(ActionBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c5 = ActionBtn;
/* ─────────────────────────────────────────
   TAB BUTTON
───────────────────────────────────────── */ function TabBtn({ label, active, onClick, count }) {
    _s1();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            padding: "10px 16px",
            flex: 1,
            background: active ? `rgba(255,176,0,0.09)` : hov ? `rgba(255,176,0,0.04)` : "transparent",
            borderTop: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
            borderRight: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
            borderBottom: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
            borderLeft: "none",
            color: active ? AMBER(0.9) : DIMWHITE(0.3),
            cursor: "pointer",
            position: "relative",
            transition: "background 0.18s, color 0.18s"
        },
        children: [
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 116,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            count !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: active ? AMBER(0.85) : DIMWHITE(0.25),
                    background: active ? AMBER(0.1) : "rgba(255,255,255,0.04)",
                    padding: "0 5px",
                    border: `1px solid ${active ? AMBER(0.2) : "rgba(255,255,255,0.06)"}`
                },
                children: count
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/incubation-requests/page.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s1(TabBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c6 = TabBtn;
/* ─────────────────────────────────────────
   REQUEST CARD
───────────────────────────────────────── */ function RequestCard({ req, onApprove, onReject, onComplete, onDownload, onRemark }) {
    _s2();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cfg = STATUS_CFG[req.status] ?? STATUS_FALLBACK;
    const shortId = req.id.slice(0, 8).toUpperCase();
    const typeLabel = req.request_type === '3d_printing' ? '3D PRINTING' : 'LASER PRINTING';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            position: "relative",
            overflow: "hidden",
            background: hov ? `rgba(255,176,0,0.045)` : PANEL,
            border: `1px solid ${hov ? AMBER(0.25) : BORDER}`,
            transition: "border 0.22s, background 0.22s"
        },
        children: [
            hov && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(to right, transparent, ${AMBER(0.5)}, transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 151,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: hov ? 2 : 1,
                    background: `linear-gradient(to bottom, transparent, ${cfg.color}, transparent)`,
                    opacity: hov ? 0.85 : 0.35,
                    transition: "opacity 0.22s, width 0.15s"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 18px 14px 20px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-inner-flex",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                minWidth: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        marginBottom: 8,
                                        flexWrap: "wrap"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.47rem",
                                                letterSpacing: "0.2em",
                                                color: AMBER(0.28)
                                            },
                                            children: [
                                                "INC·",
                                                shortId
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.47rem",
                                                letterSpacing: "0.18em",
                                                padding: "1px 7px",
                                                color: AMBER(0.6),
                                                border: `1px solid ${AMBER(0.2)}`,
                                                background: AMBER(0.05)
                                            },
                                            children: typeLabel
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        color: DIMWHITE(0.9),
                                        lineHeight: 1.1,
                                        marginBottom: 8
                                    },
                                    children: req.name
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                [
                                    {
                                        k: "CONTACT",
                                        v: req.contact_number
                                    },
                                    {
                                        k: "SLOT",
                                        v: `${req.preferred_date} · ${req.preferred_time}`
                                    },
                                    {
                                        k: "CREATED",
                                        v: new Date(req.created_at).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })
                                    }
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 8,
                                            marginBottom: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono', monospace",
                                                    fontSize: "0.52rem",
                                                    letterSpacing: "0.14em",
                                                    color: AMBER(0.3),
                                                    minWidth: 60
                                                },
                                                children: d.k
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans', sans-serif",
                                                    fontWeight: 300,
                                                    fontSize: "0.8rem",
                                                    color: DIMWHITE(0.55),
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                },
                                                children: d.v
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, d.k, true, {
                                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this)),
                                req.admin_remarks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 12,
                                        padding: "10px 12px",
                                        background: AMBER(0.05),
                                        border: `1px solid ${AMBER(0.15)}`,
                                        borderLeft: "none",
                                        position: "relative"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                bottom: 0,
                                                width: 2,
                                                background: `linear-gradient(to bottom, transparent, ${AMBER(0.7)}, transparent)`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.47rem",
                                                letterSpacing: "0.2em",
                                                color: AMBER(0.45),
                                                marginBottom: 4
                                            },
                                            children: "ADMIN REMARK"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'IBM Plex Sans', sans-serif",
                                                fontWeight: 300,
                                                fontSize: "0.8rem",
                                                color: AMBER(0.7),
                                                lineHeight: 1.5
                                            },
                                            children: req.admin_remarks
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 187,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 8,
                                        marginTop: 16,
                                        flexWrap: "wrap"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onDownload,
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.55rem",
                                                letterSpacing: "0.15em",
                                                padding: "9px 16px",
                                                background: AMBER(0.9),
                                                border: "none",
                                                color: BG,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                boxShadow: `0 0 12px ${AMBER(0.2)}`,
                                                flex: 1,
                                                minWidth: '140px'
                                            },
                                            children: "↓ DOWNLOAD ZIP"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onRemark,
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.55rem",
                                                letterSpacing: "0.15em",
                                                padding: "9px 16px",
                                                background: "transparent",
                                                borderTop: `1px solid ${AMBER(0.18)}`,
                                                borderRight: `1px solid ${AMBER(0.18)}`,
                                                borderBottom: `1px solid ${AMBER(0.18)}`,
                                                borderLeft: "none",
                                                color: AMBER(0.5),
                                                cursor: "pointer",
                                                flex: 1,
                                                minWidth: '140px'
                                            },
                                            children: req.admin_remarks ? 'EDIT REMARK' : 'ADD REMARK'
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card-right-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'IBM Plex Mono', monospace",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.15em",
                                        padding: "4px 12px",
                                        color: cfg.color,
                                        background: cfg.bg,
                                        border: `1px solid ${cfg.border}`,
                                        whiteSpace: "nowrap"
                                    },
                                    children: cfg.label
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: 6,
                                        padding: "8px 14px",
                                        background: "rgba(0,0,0,0.25)",
                                        border: `1px solid ${AMBER(0.08)}`,
                                        width: '100%',
                                        justifyContent: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.48rem",
                                                letterSpacing: "0.15em",
                                                color: AMBER(0.3)
                                            },
                                            children: "EST COST"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                                fontWeight: 700,
                                                fontSize: "1.2rem",
                                                color: AMBER(0.85)
                                            },
                                            children: [
                                                "₹",
                                                req.estimated_cost
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 6,
                                        width: '100%'
                                    },
                                    children: [
                                        req.status !== 'approved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                            label: "APPROVE",
                                            onClick: onApprove,
                                            color: SKY(0.8),
                                            bg: SKY(0.08),
                                            border: SKY(0.28)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 46
                                        }, this),
                                        req.status !== 'rejected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                            label: "REJECT",
                                            onClick: onReject,
                                            color: RED(0.8),
                                            bg: RED(0.08),
                                            border: RED(0.28)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 233,
                                            columnNumber: 46
                                        }, this),
                                        req.status !== 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                            label: "COMPLETE",
                                            onClick: onComplete,
                                            color: GREEN(0.8),
                                            bg: GREEN(0.08),
                                            border: GREEN(0.28)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                            lineNumber: 234,
                                            columnNumber: 46
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .card-inner-flex { display: flex; flex-direction: column; gap: 20px; }
        .card-right-section { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
        
        @media (min-width: 768px) {
          .card-inner-flex { flex-direction: row; justify-content: space-between; }
          .card-right-section { align-items: flex-end; min-width: 180px; width: auto; }
          .card-right-section > div:last-child { flex-direction: column; align-items: flex-end; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/incubation-requests/page.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s2(RequestCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c7 = RequestCard;
function AdminIncubationRequestsPage() {
    _s3();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pending');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [remarksFor, setRemarksFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [remarksText, setRemarksText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rejectFor, setRejectFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchFoc, setSearchFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchRequests = async ()=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('incubation_requests').select('*').order('created_at', {
            ascending: false
        });
        setRequests(data || []);
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminIncubationRequestsPage.useEffect": ()=>{
            fetchRequests();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('admin-incubation-requests').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'incubation_requests'
            }, fetchRequests).subscribe();
            return ({
                "AdminIncubationRequestsPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["AdminIncubationRequestsPage.useEffect"];
        }
    }["AdminIncubationRequestsPage.useEffect"], []);
    const filteredRequests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminIncubationRequestsPage.useMemo[filteredRequests]": ()=>{
            return requests.filter({
                "AdminIncubationRequestsPage.useMemo[filteredRequests]": (r)=>tab === 'pending' ? r.status === 'submitted' : r.status !== 'submitted'
            }["AdminIncubationRequestsPage.useMemo[filteredRequests]"]).filter({
                "AdminIncubationRequestsPage.useMemo[filteredRequests]": (r)=>`${r.name} ${r.contact_number}`.toLowerCase().includes(search.toLowerCase())
            }["AdminIncubationRequestsPage.useMemo[filteredRequests]"]);
        }
    }["AdminIncubationRequestsPage.useMemo[filteredRequests]"], [
        requests,
        tab,
        search
    ]);
    const updateStatus = async (req, status)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('incubation_requests').update({
            status
        }).eq('id', req.id);
        setRequests((prev)=>prev.map((r)=>r.id === req.id ? {
                    ...r,
                    status
                } : r));
        if (status !== 'submitted') {
            setTimeout(()=>setTab('past'), 150);
        }
    };
    const saveRemarks = async ()=>{
        if (!remarksFor) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('incubation_requests').update({
            admin_remarks: remarksText
        }).eq('id', remarksFor.id);
        setRequests((prev)=>prev.map((r)=>r.id === remarksFor.id ? {
                    ...r,
                    admin_remarks: remarksText
                } : r));
        setRemarksFor(null);
        setRemarksText('');
    };
    const deleteRemarks = async ()=>{
        if (!remarksFor) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('incubation_requests').update({
            admin_remarks: null
        }).eq('id', remarksFor.id);
        setRequests((prev)=>prev.map((r)=>r.id === remarksFor.id ? {
                    ...r,
                    admin_remarks: null
                } : r));
        setRemarksFor(null);
        setRemarksText('');
    };
    const pendingCount = requests.filter((r)=>r.status === 'submitted').length;
    const pastCount = requests.filter((r)=>r.status !== 'submitted').length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: BG,
            color: DIMWHITE(0.85)
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1400,
                    margin: "0 auto",
                    padding: "28px 16px 48px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono'",
                                    fontSize: "0.58rem",
                                    letterSpacing: "0.32em",
                                    color: AMBER(0.45),
                                    whiteSpace: 'nowrap'
                                },
                                children: "SYS · INCUBATION REQUESTS"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'IBM Plex Sans Condensed'",
                                    fontWeight: 700,
                                    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                    color: AMBER(0.9),
                                    lineHeight: 1,
                                    margin: 0
                                },
                                children: "Incubation Requests"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'IBM Plex Sans'",
                                    fontSize: "0.85rem",
                                    color: DIMWHITE(0.3),
                                    marginTop: 6
                                },
                                children: "Review, approve, and manage project incubation"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tab-search-flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tabs-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabBtn, {
                                        label: "PENDING",
                                        active: tab === 'pending',
                                        onClick: ()=>setTab('pending'),
                                        count: pendingCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabBtn, {
                                        label: "PAST",
                                        active: tab === 'past',
                                        onClick: ()=>setTab('past'),
                                        count: pastCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: searchFoc ? 2 : 1,
                                            background: searchFoc ? AMBER(0.85) : AMBER(0.18),
                                            transition: "all 0.2s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "SEARCH NAME OR CONTACT...",
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        onFocus: ()=>setSearchFoc(true),
                                        onBlur: ()=>setSearchFoc(false),
                                        style: {
                                            width: "100%",
                                            padding: "10px 14px",
                                            background: searchFoc ? `rgba(255,176,0,0.04)` : PANEL,
                                            borderTop: `1px solid ${AMBER(0.1)}`,
                                            borderRight: `1px solid ${AMBER(0.1)}`,
                                            borderBottom: `1px solid ${AMBER(0.1)}`,
                                            borderLeft: "none",
                                            outline: "none",
                                            color: DIMWHITE(0.85),
                                            fontFamily: "'IBM Plex Mono'",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.05em"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono'",
                                    fontSize: "0.5rem",
                                    letterSpacing: "0.22em",
                                    color: AMBER(0.25)
                                },
                                children: [
                                    filteredRequests.length,
                                    " RECORD",
                                    filteredRequests.length !== 1 ? "S" : "",
                                    " FOUND"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 369,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "40px 0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: AMBER(0.8),
                                    animation: "mcblink 0.9s infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 377,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono'",
                                    fontSize: "0.68rem",
                                    color: AMBER(0.35)
                                },
                                children: "LOADING..."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 378,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this) : filteredRequests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "60px 0",
                            border: `1px solid ${AMBER(0.08)}`,
                            background: PANEL,
                            textAlign: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'IBM Plex Mono'",
                                fontSize: "0.65rem",
                                color: AMBER(0.25)
                            },
                            children: "NO REQUESTS FOUND"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 382,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 10
                        },
                        children: filteredRequests.map((req)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestCard, {
                                req: req,
                                onApprove: ()=>updateStatus(req, 'approved'),
                                onReject: ()=>setRejectFor(req),
                                onComplete: ()=>updateStatus(req, 'completed'),
                                onDownload: ()=>downloadZip(req),
                                onRemark: ()=>{
                                    setRemarksFor(req);
                                    setRemarksText(req.admin_remarks || '');
                                }
                            }, req.id, false, {
                                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                lineNumber: 387,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/incubation-requests/page.tsx",
                        lineNumber: 385,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            rejectFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RejectModal, {
                onConfirm: ()=>{
                    updateStatus(rejectFor, 'rejected');
                    setRejectFor(null);
                },
                onCancel: ()=>setRejectFor(null)
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 401,
                columnNumber: 9
            }, this),
            remarksFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RemarksModal, {
                remarksFor: remarksFor,
                remarksText: remarksText,
                onChange: setRemarksText,
                onSave: saveRemarks,
                onDelete: deleteRemarks,
                onCancel: ()=>setRemarksFor(null)
            }, void 0, false, {
                fileName: "[project]/app/admin/incubation-requests/page.tsx",
                lineNumber: 408,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/incubation-requests/page.tsx",
        lineNumber: 310,
        columnNumber: 5
    }, this);
}
_s3(AdminIncubationRequestsPage, "CBmyxQ7wB+Nqt1LP122VztnTpwY=");
_c8 = AdminIncubationRequestsPage;
/* ─────────────────────────────────────────
   MODALS (Corrected for Responsive)
───────────────────────────────────────── */ function RejectModal({ onConfirm, onCancel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            padding: 16
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: 360,
                background: BG,
                border: `1px solid ${RED(0.3)}`,
                padding: "24px",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        fontFamily: "'IBM Plex Sans Condensed'",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: RED(0.85),
                        margin: "0 0 10px"
                    },
                    children: "Confirm Rejection"
                }, void 0, false, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 425,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontSize: "0.85rem",
                        color: DIMWHITE(0.4),
                        marginBottom: 20
                    },
                    children: "Are you sure you want to reject this request? This action is permanent."
                }, void 0, false, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 426,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            style: {
                                background: "transparent",
                                border: `1px solid ${AMBER(0.2)}`,
                                color: AMBER(0.4),
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontSize: '0.6rem'
                            },
                            children: "CANCEL"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 428,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            style: {
                                background: RED(0.85),
                                border: "none",
                                color: "#000",
                                padding: "8px 20px",
                                fontWeight: 700,
                                cursor: "pointer",
                                fontSize: '0.6rem'
                            },
                            children: "REJECT"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 429,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 427,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/incubation-requests/page.tsx",
            lineNumber: 424,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/incubation-requests/page.tsx",
        lineNumber: 423,
        columnNumber: 5
    }, this);
}
_c9 = RejectModal;
function RemarksModal({ remarksFor, remarksText, onChange, onSave, onDelete, onCancel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            padding: 12
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: 480,
                background: BG,
                border: `1px solid ${AMBER(0.2)}`,
                padding: "24px",
                position: "relative",
                maxHeight: '90vh',
                overflowY: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: "'IBM Plex Mono'",
                        fontSize: "0.5rem",
                        color: AMBER(0.4),
                        marginBottom: 4
                    },
                    children: "SYS · ADMIN REMARKS"
                }, void 0, false, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 444,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        fontFamily: "'IBM Plex Sans Condensed'",
                        fontWeight: 700,
                        fontSize: "1.3rem",
                        color: AMBER(0.9),
                        marginBottom: 16
                    },
                    children: remarksFor.admin_remarks ? 'Edit Remark' : 'Add Remark'
                }, void 0, false, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 445,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: remarksText,
                    onChange: (e)=>onChange(e.target.value),
                    placeholder: "Enter remarks…",
                    rows: 5,
                    style: {
                        width: "100%",
                        background: "rgba(0,0,0,0.3)",
                        border: `1px solid ${AMBER(0.1)}`,
                        color: DIMWHITE(0.85),
                        padding: "12px",
                        outline: "none",
                        fontFamily: "inherit",
                        fontSize: "0.9rem",
                        resize: "none",
                        marginBottom: 20
                    }
                }, void 0, false, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 447,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        flexWrap: 'wrap',
                        gap: 12,
                        justifyContent: "space-between",
                        alignItems: 'center'
                    },
                    children: [
                        remarksFor.admin_remarks ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onDelete,
                            style: {
                                background: "transparent",
                                border: "none",
                                color: RED(0.6),
                                cursor: "pointer",
                                fontSize: '0.6rem',
                                textDecoration: 'underline'
                            },
                            children: "DELETE REMARK"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 461,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 462,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onCancel,
                                    style: {
                                        background: "transparent",
                                        border: `1px solid ${AMBER(0.15)}`,
                                        color: AMBER(0.4),
                                        padding: "10px 18px",
                                        fontSize: '0.6rem'
                                    },
                                    children: "CANCEL"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 464,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onSave,
                                    style: {
                                        background: AMBER(0.9),
                                        border: "none",
                                        color: "#000",
                                        padding: "10px 22px",
                                        fontWeight: 700,
                                        fontSize: '0.6rem'
                                    },
                                    children: "SAVE"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/incubation-requests/page.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/incubation-requests/page.tsx",
                    lineNumber: 459,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/incubation-requests/page.tsx",
            lineNumber: 443,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/incubation-requests/page.tsx",
        lineNumber: 442,
        columnNumber: 5
    }, this);
}
_c10 = RemarksModal;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "SKY");
__turbopack_context__.k.register(_c4, "DIMWHITE");
__turbopack_context__.k.register(_c5, "ActionBtn");
__turbopack_context__.k.register(_c6, "TabBtn");
__turbopack_context__.k.register(_c7, "RequestCard");
__turbopack_context__.k.register(_c8, "AdminIncubationRequestsPage");
__turbopack_context__.k.register(_c9, "RejectModal");
__turbopack_context__.k.register(_c10, "RemarksModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_incubation-requests_page_tsx_d48e39c2._.js.map