(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/inventory/requests/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InventoryRequestsPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
const dynamic = "force-dynamic";
;
;
const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const GREEN = (a = 1)=>`rgba(0,255,120,${a})`;
_c1 = GREEN;
const RED = (a = 1)=>`rgba(255,60,60,${a})`;
_c2 = RED;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c3 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
const STATUS_FALLBACK = {
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
        color: GREEN(0.85),
        bg: GREEN(0.07),
        border: GREEN(0.28)
    },
    rejected: {
        label: "REJECTED",
        color: RED(0.85),
        bg: RED(0.07),
        border: RED(0.28)
    },
    cancelled: {
        label: "CANCELLED",
        color: DIMWHITE(0.3),
        bg: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.08)"
    },
    completed: {
        label: "COMPLETED",
        color: "rgba(56,189,248,0.85)",
        bg: "rgba(56,189,248,0.07)",
        border: "rgba(56,189,248,0.28)"
    }
};
/* ── ACTION BUTTON ── */ function ActionBtn({ label, onClick, color, bg, border }) {
    _s();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            padding: "10px 18px",
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
                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/inventory/requests/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(ActionBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c4 = ActionBtn;
/* ── REQUEST CARD ── */ function RequestCard({ req, onApprove, onReject }) {
    _s1();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cfg = STATUS_CFG[req.status] ?? STATUS_FALLBACK;
    const shortId = req.id.slice(0, 8).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        className: "req-card",
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
                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                lineNumber: 87,
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
                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 18px 14px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-header-flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.47rem",
                                            letterSpacing: "0.2em",
                                            color: AMBER(0.28),
                                            marginBottom: 4
                                        },
                                        children: [
                                            "REQ·",
                                            shortId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                            fontWeight: 700,
                                            fontSize: "1.05rem",
                                            color: DIMWHITE(0.9),
                                            lineHeight: 1.1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        children: req.requester_name
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.55rem",
                                            letterSpacing: "0.08em",
                                            color: AMBER(0.3),
                                            marginTop: 3
                                        },
                                        children: new Date(req.created_at).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-badge",
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.5rem",
                                    letterSpacing: "0.2em",
                                    padding: "3px 10px",
                                    color: cfg.color,
                                    background: cfg.bg,
                                    border: `1px solid ${cfg.border}`,
                                    whiteSpace: "nowrap"
                                },
                                children: cfg.label
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            margin: "12px 0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "3px 0",
                                    borderBottom: `1px solid ${AMBER(0.1)}`,
                                    marginBottom: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.48rem",
                                            letterSpacing: "0.22em",
                                            color: AMBER(0.3)
                                        },
                                        children: "ITEM"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.48rem",
                                            letterSpacing: "0.22em",
                                            color: AMBER(0.3)
                                        },
                                        children: "QTY"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            req.inventory_request_items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "4px 0",
                                        borderBottom: `1px solid ${AMBER(0.05)}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'IBM Plex Sans', sans-serif",
                                                fontWeight: 300,
                                                fontSize: "0.82rem",
                                                color: DIMWHITE(0.55),
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                paddingRight: 8
                                            },
                                            children: item.inventory_items.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.65rem",
                                                color: AMBER(0.65),
                                                flexShrink: 0
                                            },
                                            children: [
                                                "×",
                                                item.quantity
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    req.status === "submitted" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-action-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                label: "REJECT",
                                onClick: onReject,
                                color: RED(0.8),
                                bg: RED(0.08),
                                border: RED(0.28)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                label: "APPROVE",
                                onClick: onApprove,
                                color: GREEN(0.8),
                                bg: GREEN(0.08),
                                border: GREEN(0.28)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/inventory/requests/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s1(RequestCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c5 = RequestCard;
function InventoryRequestsPage() {
    _s2();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchRequests = async ()=>{
        setLoading(true);
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("inventory_requests").select(`
        id, requester_name, status, created_at,
        inventory_request_items:inventory_request_items!inventory_request_items_request_id_fkey (
          id, quantity,
          inventory_items:inventory_items!inventory_request_items_item_id_fkey (
            id, name, quantity_available
          )
        )
      `).order("created_at", {
            ascending: false
        });
        if (error) {
            console.error("FETCH ERROR", error);
            setLoading(false);
            return;
        }
        setRequests(data);
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InventoryRequestsPage.useEffect": ()=>{
            fetchRequests();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel("realtime-req").on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "inventory_requests"
            }, fetchRequests).subscribe();
            return ({
                "InventoryRequestsPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["InventoryRequestsPage.useEffect"];
        }
    }["InventoryRequestsPage.useEffect"], []);
    const approveRequest = async (req)=>{
        const res = await fetch("/api/admin/inventory-requests/approve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                requestId: req.id
            })
        });
        if (!res.ok) alert("Approval failed");
    };
    const rejectRequest = async (id)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("inventory_requests").update({
            status: "rejected"
        }).eq("id", id);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                background: BG
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
                    fileName: "[project]/app/admin/inventory/requests/page.tsx",
                    lineNumber: 181,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.68rem",
                        color: AMBER(0.35),
                        marginLeft: 10
                    },
                    children: "INITIALIZING REQUEST LOG..."
                }, void 0, false, {
                    fileName: "[project]/app/admin/inventory/requests/page.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/inventory/requests/page.tsx",
            lineNumber: 180,
            columnNumber: 7
        }, this);
    }
    const pending = requests.filter((r)=>r.status === "submitted").length;
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
        
        .header-flex { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .stats-bar { display: flex; border: 1px solid ${AMBER(0.12)}; width: fit-content; }
        .card-header-flex { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
        .card-action-row { display: flex; gap: 8px; margin-top: 14px; border-top: 1px solid ${AMBER(0.08)}; padding-top: 14px; }

        @media (min-width: 768px) {
          .header-flex { flex-direction: row; justify-content: space-between; }
          .card-action-row { justify-content: flex-end; }
          .card-action-row > button { flex: none; width: 120px; }
        }

        @media (max-width: 480px) {
          .card-header-flex { flex-direction: column; }
          .status-badge { align-self: flex-start; margin-top: 8px; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                lineNumber: 191,
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
                                children: "SYS · INVENTORY REQUESTS"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed'",
                                            fontWeight: 700,
                                            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                            color: AMBER(0.95),
                                            margin: 0
                                        },
                                        children: "Inventory Requests"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: "0.85rem",
                                            color: DIMWHITE(0.3),
                                            marginTop: 5
                                        },
                                        children: "Manage incoming borrowing permissions"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stats-bar",
                                children: [
                                    {
                                        label: "TOTAL",
                                        val: requests.length
                                    },
                                    {
                                        label: "PENDING",
                                        val: pending,
                                        alert: pending > 0
                                    }
                                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "8px 18px",
                                            borderLeft: i ? `1px solid ${AMBER(0.1)}` : "none",
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.47rem",
                                                    color: s.alert ? RED(0.6) : AMBER(0.35)
                                                },
                                                children: s.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "1.2rem",
                                                    color: s.alert ? RED(0.85) : AMBER(0.85)
                                                },
                                                children: s.val
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.label, true, {
                                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: requests.map((req)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestCard, {
                                req: req,
                                onApprove: ()=>approveRequest(req),
                                onReject: ()=>rejectRequest(req.id)
                            }, req.id, false, {
                                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/inventory/requests/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/inventory/requests/page.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/inventory/requests/page.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
_s2(InventoryRequestsPage, "xfHXOKKZheZhGZuiYWz2Mb7A1KU=");
_c6 = InventoryRequestsPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "DIMWHITE");
__turbopack_context__.k.register(_c4, "ActionBtn");
__turbopack_context__.k.register(_c5, "RequestCard");
__turbopack_context__.k.register(_c6, "InventoryRequestsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_inventory_requests_page_tsx_a96b5b6a._.js.map