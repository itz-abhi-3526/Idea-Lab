(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/admin/ideas/AdminIdeaCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminIdeaCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
───────────────────────────────────────── */ const STATUS_CFG = {
    submitted: {
        label: "SUBMITTED",
        color: AMBER(0.8),
        bg: AMBER(0.07),
        border: AMBER(0.28)
    },
    approved: {
        label: "APPROVED",
        color: SKY(0.8),
        bg: SKY(0.07),
        border: SKY(0.28)
    },
    rejected: {
        label: "REJECTED",
        color: RED(0.8),
        bg: RED(0.07),
        border: RED(0.28)
    },
    completed: {
        label: "COMPLETED",
        color: GREEN(0.8),
        bg: GREEN(0.07),
        border: GREEN(0.28)
    },
    cancelled: {
        label: "CANCELLED",
        color: DIMWHITE(0.3),
        bg: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.08)"
    }
};
const STATUS_FALLBACK = {
    label: "UNKNOWN",
    color: DIMWHITE(0.3),
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.08)"
};
/* ─────────────────────────────────────────
   ACTION BUTTON
───────────────────────────────────────── */ function ActionBtn({ label, onClick, disabled, color, bg, border }) {
    _s();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            padding: "8px 18px",
            background: hov && !disabled ? bg : "transparent",
            borderTop: `1px solid ${border}`,
            borderRight: `1px solid ${border}`,
            borderBottom: `1px solid ${border}`,
            borderLeft: "none",
            color: disabled ? DIMWHITE(0.25) : color,
            cursor: disabled ? "not-allowed" : "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.18s, color 0.18s",
            opacity: disabled ? 0.5 : 1,
            flex: "1 1 auto"
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
                    opacity: hov && !disabled ? 1 : 0.4,
                    transition: "opacity 0.18s"
                }
            }, void 0, false, {
                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(ActionBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c5 = ActionBtn;
function AdminIdeaCard({ idea, onStatusChange }) {
    _s1();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const updateStatus = async (status)=>{
        setLoading(true);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("idea_submissions").update({
            status
        }).eq("id", idea.id);
        setLoading(false);
        onStatusChange();
    };
    const cfg = STATUS_CFG[idea.status] ?? STATUS_FALLBACK;
    const shortId = idea.id.slice(0, 8).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            position: "relative",
            background: hov ? `rgba(255,176,0,0.045)` : PANEL,
            border: `1px solid ${hov ? AMBER(0.25) : BORDER}`,
            overflow: "hidden",
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
                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                lineNumber: 127,
                columnNumber: 9
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
                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 9,
                    height: 9,
                    borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`,
                    borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.15)}`,
                    transition: "border-color 0.22s"
                }
            }, void 0, false, {
                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 18px 14px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12,
                            marginBottom: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    minWidth: 200,
                                    flex: "1 1 0"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.47rem",
                                            letterSpacing: "0.2em",
                                            color: AMBER(0.28),
                                            marginBottom: 5
                                        },
                                        children: [
                                            "IDEA·",
                                            shortId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                            fontWeight: 700,
                                            fontSize: "clamp(1rem, 4vw, 1.2rem)",
                                            letterSpacing: "0.01em",
                                            color: DIMWHITE(0.92),
                                            lineHeight: 1.15,
                                            margin: 0
                                        },
                                        children: idea.idea_title
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flexShrink: 0,
                                    padding: "3px 10px",
                                    background: cfg.bg,
                                    border: `1px solid ${cfg.border}`,
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.5rem",
                                    letterSpacing: "0.2em",
                                    color: cfg.color,
                                    whiteSpace: "nowrap"
                                },
                                children: cfg.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "'IBM Plex Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: "0.85rem",
                            color: DIMWHITE(0.45),
                            lineHeight: 1.7,
                            margin: "0 0 12px"
                        },
                        children: idea.idea_description
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    idea.domain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 12
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: "0.5rem",
                                letterSpacing: "0.18em",
                                padding: "3px 10px",
                                color: AMBER(0.7),
                                background: AMBER(0.07),
                                border: `1px solid ${AMBER(0.22)}`
                            },
                            children: idea.domain.toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 1,
                            background: `linear-gradient(to right, ${AMBER(0.1)}, transparent)`,
                            margin: "12px 0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    gap: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'IBM Plex Mono', monospace",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.1em",
                                        color: AMBER(0.28)
                                    },
                                    children: [
                                        "SUBMITTED · ",
                                        new Date(idea.created_at).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 6,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    idea.status === "submitted" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                                label: "REJECT",
                                                onClick: ()=>updateStatus("rejected"),
                                                disabled: loading,
                                                color: RED(0.8),
                                                bg: RED(0.08),
                                                border: RED(0.28)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                                label: "APPROVE",
                                                onClick: ()=>updateStatus("approved"),
                                                disabled: loading,
                                                color: GREEN(0.8),
                                                bg: GREEN(0.08),
                                                border: GREEN(0.28)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    idea.status === "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                        label: "MARK COMPLETED",
                                        onClick: ()=>updateStatus("completed"),
                                        disabled: loading,
                                        color: SKY(0.8),
                                        bg: SKY(0.08),
                                        border: SKY(0.28)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/ideas/AdminIdeaCard.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s1(AdminIdeaCard, "+0uI7O80m5pEscSayDj+LnSd37g=");
_c6 = AdminIdeaCard;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "SKY");
__turbopack_context__.k.register(_c4, "DIMWHITE");
__turbopack_context__.k.register(_c5, "ActionBtn");
__turbopack_context__.k.register(_c6, "AdminIdeaCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/ideas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminIdeasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ideas$2f$AdminIdeaCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/ideas/AdminIdeaCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */ function useFonts() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFonts.useEffect": ()=>{
            const id = "ideas-mc-fonts";
            if (document.getElementById(id)) return;
            const l = document.createElement("link");
            l.id = id;
            l.rel = "stylesheet";
            l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400&display=swap";
            document.head.prepend(l);
        }
    }["useFonts.useEffect"], []);
}
_s(useFonts, "OD7bBpZva5O2jO+Puf00hKivP7c=");
const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c1 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
/* ─────────────────────────────────────────
   FILTER TABS
───────────────────────────────────────── */ const FILTERS = [
    {
        key: "all",
        label: "ALL"
    },
    {
        key: "pending",
        label: "PENDING"
    },
    {
        key: "ongoing",
        label: "ONGOING"
    },
    {
        key: "completed",
        label: "COMPLETED"
    }
];
function AdminIdeasPage() {
    _s1();
    useFonts();
    const [ideas, setIdeas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [searchFoc, setSearchFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchIdeas = async ()=>{
        setLoading(true);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("idea_submissions").select("id, idea_title, idea_description, domain, status, created_at").order("created_at", {
            ascending: false
        });
        setIdeas(data ?? []);
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminIdeasPage.useEffect": ()=>{
            fetchIdeas();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel("admin-ideas-realtime").on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "idea_submissions"
            }, fetchIdeas).subscribe();
            return ({
                "AdminIdeasPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["AdminIdeasPage.useEffect"];
        }
    }["AdminIdeasPage.useEffect"], []);
    const filteredIdeas = ideas.filter((idea)=>{
        const matchesSearch = idea.idea_title.toLowerCase().includes(search.toLowerCase()) || idea.idea_description.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || filter === "pending" && idea.status === "submitted" || filter === "ongoing" && idea.status === "approved" || filter === "completed" && idea.status === "completed";
        return matchesSearch && matchesFilter;
    });
    const stats = {
        total: ideas.length,
        pending: ideas.filter((i)=>i.status === "submitted").length,
        ongoing: ideas.filter((i)=>i.status === "approved").length,
        completed: ideas.filter((i)=>i.status === "completed").length
    };
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
        @keyframes shimmer { from{left:-40%} to{left:140%} }
        input::placeholder { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em; }
        
        /* The Orientation Fix */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 24px;
        }

        .controls-flex {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .tabs-row {
          display: flex;
          gap: 4px;
          flex-wrap: wrap; /* Fixes buttons squashing */
        }

        @media (min-width: 768px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
          .controls-flex { flex-direction: row; align-items: stretch; }
          .search-input-wrapper { flex: 1; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/ideas/page.tsx",
                lineNumber: 104,
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
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.58rem",
                                    letterSpacing: "0.32em",
                                    color: AMBER(0.45),
                                    whiteSpace: "nowrap"
                                },
                                children: "SYS · IDEA PIPELINE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                    letterSpacing: "-0.01em",
                                    color: AMBER(0.9),
                                    lineHeight: 1,
                                    margin: 0
                                },
                                children: "Ideas"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'IBM Plex Sans', sans-serif",
                                    fontWeight: 300,
                                    fontSize: "0.85rem",
                                    color: DIMWHITE(0.3),
                                    marginTop: 5
                                },
                                children: "Review and manage ideas submitted to IDEA Lab"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stats-grid",
                        children: [
                            {
                                label: "TOTAL",
                                val: stats.total,
                                active: filter === "all"
                            },
                            {
                                label: "PENDING",
                                val: stats.pending,
                                active: filter === "pending"
                            },
                            {
                                label: "ONGOING",
                                val: stats.ongoing,
                                active: filter === "ongoing"
                            },
                            {
                                label: "COMPLETED",
                                val: stats.completed,
                                active: filter === "completed"
                            }
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFilter(s.label.toLowerCase()),
                                style: {
                                    position: "relative",
                                    padding: "12px 16px",
                                    background: s.active ? `rgba(255,176,0,0.07)` : PANEL,
                                    border: `1px solid ${s.active ? AMBER(0.3) : BORDER}`,
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    transition: "border 0.2s, background 0.2s"
                                },
                                children: [
                                    s.active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 1,
                                            background: `linear-gradient(to right, transparent, ${AMBER(0.6)}, transparent)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: s.active ? 2 : 1,
                                            background: s.active ? `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.12)}, transparent)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.48rem",
                                            letterSpacing: "0.28em",
                                            color: s.active ? AMBER(0.55) : AMBER(0.28),
                                            marginBottom: 5
                                        },
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                            fontWeight: 700,
                                            fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                                            color: s.active ? AMBER(0.9) : DIMWHITE(0.55),
                                            lineHeight: 1
                                        },
                                        children: s.val
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, s.label, true, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "controls-flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-input-wrapper",
                                style: {
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: searchFoc ? 2 : 1,
                                            background: searchFoc ? AMBER(0.85) : AMBER(0.18),
                                            transition: "background 0.2s, width 0.15s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "SEARCH IDEAS...",
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        onFocus: ()=>setSearchFoc(true),
                                        onBlur: ()=>setSearchFoc(false),
                                        style: {
                                            width: "100%",
                                            paddingLeft: 14,
                                            paddingRight: 12,
                                            paddingTop: 9,
                                            paddingBottom: 9,
                                            background: searchFoc ? `rgba(255,176,0,0.04)` : PANEL,
                                            borderTop: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                                            borderRight: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                                            borderBottom: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                                            borderLeft: "none",
                                            outline: "none",
                                            color: DIMWHITE(0.8),
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.06em",
                                            transition: "background 0.2s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tabs-row",
                                children: FILTERS.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterBtn, {
                                        label: f.label,
                                        active: filter === f.key,
                                        onClick: ()=>setFilter(f.key)
                                    }, f.key, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 192,
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
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.5rem",
                                    letterSpacing: "0.22em",
                                    color: AMBER(0.25)
                                },
                                children: [
                                    filteredIdeas.length,
                                    " RECORD",
                                    filteredIdeas.length !== 1 ? "S" : "",
                                    " FOUND"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 4,
                                            height: 4,
                                            borderRadius: "50%",
                                            background: `rgba(0,255,120,0.85)`,
                                            boxShadow: `0 0 4px rgba(0,255,120,0.5)`,
                                            animation: "mcpulse 2s ease-in-out infinite"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.47rem",
                                            letterSpacing: "0.2em",
                                            color: `rgba(0,255,120,0.45)`
                                        },
                                        children: "LIVE"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/ideas/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 236,
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
                                    animation: "mcblink 0.9s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.68rem",
                                    letterSpacing: "0.25em",
                                    color: AMBER(0.35)
                                },
                                children: "LOADING PIPELINE..."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this) : filteredIdeas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: AMBER(0.3),
                                    animation: "mcblink 2s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.25em",
                                    color: AMBER(0.25)
                                },
                                children: "NO IDEAS FOUND"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: filteredIdeas.map((idea)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$ideas$2f$AdminIdeaCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                idea: idea,
                                onStatusChange: fetchIdeas
                            }, idea.id, false, {
                                fileName: "[project]/app/admin/ideas/page.tsx",
                                lineNumber: 265,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/ideas/page.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/ideas/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/ideas/page.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s1(AdminIdeasPage, "uaGNMfH8VVv/Ri3gePnk1Wi8aHc=", false, function() {
    return [
        useFonts
    ];
});
_c2 = AdminIdeasPage;
/* ─────────────────────────────────────────
   FILTER BUTTON
───────────────────────────────────────── */ function FilterBtn({ label, active, onClick }) {
    _s2();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            padding: "9px 14px",
            background: active ? `rgba(255,176,0,0.09)` : hov ? `rgba(255,176,0,0.04)` : "transparent",
            borderTop: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
            borderRight: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
            borderBottom: `1px solid ${active ? AMBER(0.32) : AMBER(0.1)}`,
            borderLeft: "none",
            color: active ? AMBER(0.9) : DIMWHITE(0.3),
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.18s, color 0.18s",
            position: "relative",
            flex: "1 0 auto"
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
                fileName: "[project]/app/admin/ideas/page.tsx",
                lineNumber: 310,
                columnNumber: 9
            }, this),
            label
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/ideas/page.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
_s2(FilterBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c3 = FilterBtn;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "DIMWHITE");
__turbopack_context__.k.register(_c2, "AdminIdeasPage");
__turbopack_context__.k.register(_c3, "FilterBtn");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8ac0716a._.js.map