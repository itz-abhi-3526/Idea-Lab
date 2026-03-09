(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/admin/events/EventCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
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
function EventCard({ event, onEdit }) {
    _s();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteFor, setDeleteFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false) // ← replaces confirm()
    ;
    /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */ const toggle = async (field)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").update({
            [field]: !event[field]
        }).eq("id", event.id);
    };
    const remove = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").delete().eq("id", event.id);
        setDeleteFor(false);
    };
    const shortId = event.id.slice(0, 8).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onMouseEnter: ()=>setHov(true),
                onMouseLeave: ()=>setHov(false),
                style: {
                    position: "relative",
                    background: hov ? "rgba(255,176,0,0.045)" : PANEL,
                    border: `1px solid ${hov ? AMBER(0.25) : BORDER}`,
                    padding: "16px 18px",
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
                        fileName: "[project]/components/admin/events/EventCard.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: hov ? 2 : 1,
                            background: `linear-gradient(to bottom, transparent, ${AMBER(hov ? 0.75 : 0.4)}, transparent)`,
                            transition: "width 0.15s, background 0.22s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/EventCard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
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
                        fileName: "[project]/components/admin/events/EventCard.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 12,
                            marginBottom: 12,
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: "1 1 200px",
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.5rem",
                                            letterSpacing: "0.25em",
                                            color: AMBER(0.35),
                                            marginBottom: 5
                                        },
                                        children: [
                                            "LOG_ENTRY · ",
                                            shortId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/events/EventCard.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                            fontWeight: 700,
                                            fontSize: "1.1rem",
                                            color: DIMWHITE(0.9),
                                            lineHeight: 1.2,
                                            wordBreak: "break-word"
                                        },
                                        children: event.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/EventCard.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans', sans-serif",
                                            fontSize: "0.78rem",
                                            color: DIMWHITE(0.4),
                                            marginTop: 3
                                        },
                                        children: [
                                            event.event_type ?? "UNCLASSIFIED",
                                            " · ",
                                            event.venue ?? "REMOTE_LINK"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/events/EventCard.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/EventCard.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    textAlign: "right",
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "0.62rem",
                                            letterSpacing: "0.12em",
                                            color: AMBER(0.4)
                                        },
                                        children: new Date(event.start_datetime).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/EventCard.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: AMBER(0.28),
                                            fontSize: "0.55rem",
                                            letterSpacing: "0.1em"
                                        },
                                        children: [
                                            new Date(event.start_datetime).toLocaleTimeString("en-GB", {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            }),
                                            " UTC"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/events/EventCard.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/EventCard.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/events/EventCard.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                            marginBottom: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SysBadge, {
                                active: event.is_active,
                                label: event.is_active ? "ACTIVE" : "INACTIVE",
                                color: GREEN(0.8),
                                onClick: ()=>toggle("is_active")
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/EventCard.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SysBadge, {
                                active: event.is_featured,
                                label: "FEATURED",
                                color: AMBER(0.9),
                                onClick: ()=>toggle("is_featured")
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/EventCard.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SysBadge, {
                                active: event.is_registration_open,
                                label: event.is_registration_open ? "REG OPEN" : "REG CLOSED",
                                color: AMBER(0.6)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/EventCard.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/events/EventCard.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 1,
                            background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)`,
                            marginBottom: 12
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/EventCard.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            justifyContent: "flex-end"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                label: "EDIT_PROTOCOL",
                                onClick: onEdit,
                                color: AMBER(0.7),
                                hoverBg: AMBER(0.07),
                                hoverBorder: AMBER(0.3)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/EventCard.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                label: "PURGE",
                                onClick: ()=>setDeleteFor(true),
                                color: RED(0.7),
                                hoverBg: RED(0.07),
                                hoverBorder: RED(0.3)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/EventCard.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/events/EventCard.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/events/EventCard.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            deleteFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeleteConfirmModal, {
                onConfirm: remove,
                onCancel: ()=>setDeleteFor(false)
            }, void 0, false, {
                fileName: "[project]/components/admin/events/EventCard.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(EventCard, "zp+FA2KGmngYRPVdi9lpq36Akac=");
_c4 = EventCard;
/* ── DELETE CONFIRM MODAL ── */ function DeleteConfirmModal({ onConfirm, onCancel }) {
    _s1();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 60,
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
                border: "1px solid rgba(255,60,60,0.35)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
                position: "relative",
                overflow: "hidden"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 1,
                        background: "linear-gradient(to right,transparent,rgba(255,60,60,0.55),transparent)"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/events/EventCard.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    fileName: "[project]/components/admin/events/EventCard.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    fileName: "[project]/components/admin/events/EventCard.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "22px 22px 20px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: "0.5rem",
                                letterSpacing: "0.3em",
                                color: "rgba(255,60,60,0.5)",
                                marginBottom: 6
                            },
                            children: "SYS · CONFIRM PURGE"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/events/EventCard.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                                fontWeight: 700,
                                fontSize: "1.2rem",
                                color: "rgba(255,60,60,0.88)",
                                margin: "0 0 8px"
                            },
                            children: "Delete Event"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/events/EventCard.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'IBM Plex Sans',sans-serif",
                                fontWeight: 300,
                                fontSize: "0.84rem",
                                color: "rgba(220,215,200,0.4)",
                                marginBottom: 20
                            },
                            children: "This action is permanent and cannot be undone."
                        }, void 0, false, {
                            fileName: "[project]/components/admin/events/EventCard.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: 1,
                                background: "linear-gradient(to right,rgba(255,60,60,0.12),transparent)",
                                marginBottom: 16
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/events/EventCard.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onCancel,
                                    onMouseEnter: ()=>setHov(true),
                                    onMouseLeave: ()=>setHov(false),
                                    style: {
                                        fontFamily: "'IBM Plex Mono',monospace",
                                        fontSize: "0.58rem",
                                        letterSpacing: "0.2em",
                                        padding: "8px 16px",
                                        background: "transparent",
                                        border: `1px solid ${hov ? "rgba(255,176,0,0.3)" : "rgba(255,176,0,0.15)"}`,
                                        color: hov ? "rgba(255,176,0,0.65)" : "rgba(255,176,0,0.4)",
                                        cursor: "pointer",
                                        transition: "all 0.18s"
                                    },
                                    children: "CANCEL"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/events/EventCard.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    children: "PURGE"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/events/EventCard.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/events/EventCard.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/events/EventCard.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/events/EventCard.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/events/EventCard.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s1(DeleteConfirmModal, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c5 = DeleteConfirmModal;
/* ── ACTION BUTTON ── */ function ActionBtn({ label, onClick, color, hoverBg, hoverBorder }) {
    _s2();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            padding: "8px 16px",
            background: hov ? hoverBg : "transparent",
            borderTop: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
            borderRight: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
            borderBottom: `1px solid ${hov ? hoverBorder : "rgba(255,176,0,0.12)"}`,
            borderLeft: "none",
            color,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.18s",
            flex: "1 1 auto",
            minWidth: "100px",
            maxWidth: "160px",
            whiteSpace: "nowrap"
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
                    opacity: hov ? 1 : 0.3,
                    transition: "opacity 0.18s"
                }
            }, void 0, false, {
                fileName: "[project]/components/admin/events/EventCard.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/events/EventCard.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/events/EventCard.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s2(ActionBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c6 = ActionBtn;
/* ── SYSTEM BADGE ── */ function SysBadge({ label, active = true, color, onClick }) {
    _s3();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeBg = color.replace(/[\d.]+\)$/, "0.08)");
    const activeBorder = color.replace(/[\d.]+\)$/, "0.3)");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.18em",
            padding: "4px 10px",
            background: active ? hov && onClick ? color.replace(/[\d.]+\)$/, "0.13)") : activeBg : "rgba(255,255,255,0.03)",
            border: `1px solid ${active ? activeBorder : "rgba(255,255,255,0.08)"}`,
            color: active ? color : "rgba(220,215,200,0.3)",
            cursor: onClick ? "pointer" : "default",
            whiteSpace: "nowrap",
            transition: "background 0.18s"
        },
        children: label
    }, void 0, false, {
        fileName: "[project]/components/admin/events/EventCard.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
_s3(SysBadge, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c7 = SysBadge;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "DIMWHITE");
__turbopack_context__.k.register(_c4, "EventCard");
__turbopack_context__.k.register(_c5, "DeleteConfirmModal");
__turbopack_context__.k.register(_c6, "ActionBtn");
__turbopack_context__.k.register(_c7, "SysBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/admin/events/AddEditEventModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddEditEventModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c1 = DIMWHITE;
const BG = "#0a0900";
/* ─── MCInput ─── */ function MCInput({ label, value, onChange, type = "text", placeholder = "" }) {
    _s();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const border = foc ? AMBER(0.28) : AMBER(0.09);
    const bg = foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.46rem",
                    letterSpacing: "0.28em",
                    color: AMBER(0.3),
                    marginBottom: 3,
                    paddingLeft: 10
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            width: foc ? 2 : 1,
                            background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`,
                            transition: "all 0.18s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: type,
                        placeholder: placeholder,
                        value: value,
                        onChange: (e)=>onChange(e.target.value),
                        onFocus: ()=>setFoc(true),
                        onBlur: ()=>setFoc(false),
                        style: {
                            width: "100%",
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 8,
                            paddingBottom: 8,
                            background: bg,
                            borderTop: `1px solid ${border}`,
                            borderRight: `1px solid ${border}`,
                            borderBottom: `1px solid ${border}`,
                            borderLeft: "none",
                            outline: "none",
                            color: DIMWHITE(0.85),
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: "0.75rem",
                            letterSpacing: "0.04em",
                            transition: "background 0.18s",
                            boxSizing: "border-box"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(MCInput, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c2 = MCInput;
/* ─── MCTextarea ─── */ function MCTextarea({ label, value, onChange, rows = 4 }) {
    _s1();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const border = foc ? AMBER(0.28) : AMBER(0.09);
    const bg = foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.46rem",
                    letterSpacing: "0.28em",
                    color: AMBER(0.3),
                    marginBottom: 3,
                    paddingLeft: 10
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            width: foc ? 2 : 1,
                            background: foc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`,
                            transition: "all 0.18s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: value,
                        rows: rows,
                        placeholder: "Event description...",
                        onChange: (e)=>onChange(e.target.value),
                        onFocus: ()=>setFoc(true),
                        onBlur: ()=>setFoc(false),
                        style: {
                            width: "100%",
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 8,
                            paddingBottom: 8,
                            resize: "none",
                            background: bg,
                            borderTop: `1px solid ${border}`,
                            borderRight: `1px solid ${border}`,
                            borderBottom: `1px solid ${border}`,
                            borderLeft: "none",
                            outline: "none",
                            color: DIMWHITE(0.85),
                            fontFamily: "'IBM Plex Sans',sans-serif",
                            fontWeight: 300,
                            fontSize: "0.82rem",
                            lineHeight: 1.65,
                            transition: "background 0.18s",
                            boxSizing: "border-box"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s1(MCTextarea, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c3 = MCTextarea;
/* ─── MCBoolSelect ─── */ function MCBoolSelect({ label, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.46rem",
                    letterSpacing: "0.28em",
                    color: AMBER(0.3),
                    marginBottom: 3,
                    paddingLeft: 10
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            width: 1,
                            background: `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: String(value),
                        onChange: (e)=>onChange(e.target.value === "true"),
                        style: {
                            width: "100%",
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 8,
                            paddingBottom: 8,
                            background: "rgba(0,0,0,0.35)",
                            borderTop: `1px solid ${AMBER(0.09)}`,
                            borderRight: `1px solid ${AMBER(0.09)}`,
                            borderBottom: `1px solid ${AMBER(0.09)}`,
                            borderLeft: "none",
                            outline: "none",
                            color: DIMWHITE(0.75),
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: "0.72rem",
                            letterSpacing: "0.06em",
                            cursor: "pointer",
                            appearance: "none",
                            boxSizing: "border-box"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "true",
                                style: {
                                    background: BG
                                },
                                children: "TRUE"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "false",
                                style: {
                                    background: BG
                                },
                                children: "FALSE"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c4 = MCBoolSelect;
/* ─── Section Rule ─── */ function SRule({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            margin: "12px 0 6px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.46rem",
                    letterSpacing: "0.28em",
                    color: AMBER(0.35),
                    whiteSpace: "nowrap"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(to right,${AMBER(0.18)},transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_c5 = SRule;
function AddEditEventModal({ open, onClose, event }) {
    _s2();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddEditEventModal.useEffect": ()=>{
            if (!open) return;
            setForm({
                title: event?.title ?? "",
                description: event?.description ?? "",
                event_type: event?.event_type ?? "",
                start_datetime: event?.start_datetime ? event.start_datetime.slice(0, 16) : "",
                end_datetime: event?.end_datetime ? event.end_datetime.slice(0, 16) : "",
                registration_deadline: event?.registration_deadline ? event.registration_deadline.slice(0, 16) : "",
                venue: event?.venue ?? "",
                poster_url: event?.poster_url ?? "",
                capacity: event?.capacity ?? 0,
                is_active: event?.is_active ?? true,
                is_featured: event?.is_featured ?? false,
                display_order: event?.display_order ?? 0,
                is_paid: event?.is_paid ?? false,
                price: event?.price ?? 0,
                upi_qr_url: event?.upi_qr_url ?? ""
            });
        }
    }["AddEditEventModal.useEffect"], [
        open,
        event
    ]);
    if (!open || !form) return null;
    const handlePosterUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "idea_lab_profiles");
            data.append("folder", "idea-lab/event-posters");
            const res = await fetch(`https://api.cloudinary.com/v1_1/${("TURBOPACK compile-time value", "dvrc3jqve")}/image/upload`, {
                method: "POST",
                body: data
            });
            const json = await res.json();
            if (!json.secure_url) throw new Error("Upload failed");
            setForm((prev)=>prev ? {
                    ...prev,
                    poster_url: json.secure_url
                } : prev);
        } catch  {
            alert("Poster upload failed");
        } finally{
            setUploading(false);
        }
    };
    const handleUpiQrUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "idea_lab_profiles");
            data.append("folder", "idea-lab/upi-qr");
            const res = await fetch(`https://api.cloudinary.com/v1_1/${("TURBOPACK compile-time value", "dvrc3jqve")}/image/upload`, {
                method: "POST",
                body: data
            });
            const json = await res.json();
            if (!json.secure_url) throw new Error("Upload failed");
            setForm((prev)=>prev ? {
                    ...prev,
                    upi_qr_url: json.secure_url
                } : prev);
        } catch  {
            alert("UPI QR upload failed");
        } finally{
            setUploading(false);
        }
    };
    const validate = ()=>{
        if (!form.title || !form.description || !form.event_type || !form.start_datetime || !form.end_datetime || !form.registration_deadline || !form.venue) {
            alert("Please fill all required fields.");
            return false;
        }
        if (form.capacity < 0) {
            alert("Capacity cannot be negative.");
            return false;
        }
        if (form.is_paid) {
            if (form.price <= 0) {
                alert("Enter valid amount for paid event.");
                return false;
            }
            if (!form.upi_qr_url) {
                alert("Upload UPI QR for paid event.");
                return false;
            }
        }
        return true;
    };
    const save = async ()=>{
        if (!validate()) return;
        setSaving(true);
        const payload = {
            ...form,
            start_datetime: new Date(form.start_datetime).toISOString(),
            end_datetime: new Date(form.end_datetime).toISOString(),
            registration_deadline: new Date(form.registration_deadline).toISOString()
        };
        if (event) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").update(payload).eq("id", event.id);
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").insert(payload);
        }
        setSaving(false);
        onClose();
    };
    const isEdit = !!event;
    const busy = saving || uploading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4",
        style: {
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes evtshimmer { from{left:-40%} to{left:140%} }
        .evtscroll::-webkit-scrollbar { width:3px; background:#0a0900 }
        .evtscroll::-webkit-scrollbar-thumb { background:rgba(255,176,0,0.2) }
        input[type=file] { display:none }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0 }
        input[type=datetime-local]::-webkit-calendar-picker-indicator { filter:invert(0.6) sepia(1) saturate(3) hue-rotate(5deg); cursor:pointer; opacity:0.5 }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .form-grid-tri { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        @media (max-width: 500px) {
          .form-grid, .form-grid-tri { grid-template-columns: 1fr; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "evtscroll w-full sm:max-w-xl",
                style: {
                    background: BG,
                    border: `1px solid ${AMBER(0.18)}`,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.8)",
                    borderRadius: "12px 12px 0 0"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 1,
                            overflow: "hidden",
                            background: AMBER(0.1),
                            position: "relative"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                width: "40%",
                                background: `linear-gradient(to right,transparent,${AMBER(0.65)},transparent)`,
                                animation: "evtshimmer 2.5s linear infinite"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "20px 20px 32px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    marginBottom: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                    fontSize: "0.5rem",
                                                    letterSpacing: "0.3em",
                                                    color: AMBER(0.4),
                                                    marginBottom: 4
                                                },
                                                children: isEdit ? "SYS · EDIT_LOG" : "SYS · NEW_ENTRY"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
                                                    color: AMBER(0.9),
                                                    margin: 0
                                                },
                                                children: isEdit ? "Edit Event Protocol" : "Initialize Event"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 210,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        style: {
                                            width: 28,
                                            height: 28,
                                            flexShrink: 0,
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.15)}`,
                                            color: AMBER(0.4),
                                            cursor: "pointer"
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 214,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SRule, {
                                label: "EVT · POSTER"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 14,
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 100,
                                            height: 130,
                                            flexShrink: 0,
                                            border: `1px solid ${AMBER(0.2)}`,
                                            background: AMBER(0.04),
                                            overflow: "hidden",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative"
                                        },
                                        children: form.poster_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: form.poster_url,
                                            alt: "Poster",
                                            style: {
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                            lineNumber: 220,
                                            columnNumber: 34
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: "0.5rem",
                                                color: AMBER(0.2)
                                            },
                                            children: "VOID"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                            lineNumber: 220,
                                            columnNumber: 138
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handlePosterUpload
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 223,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono'",
                                                    fontSize: "0.55rem",
                                                    padding: "10px 16px",
                                                    border: `1px solid ${AMBER(0.2)}`,
                                                    color: AMBER(0.5)
                                                },
                                                children: uploading ? "SYNCING..." : "UPLOAD_MEDIA"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 224,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SRule, {
                                label: "EVT · METADATA"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                label: "TITLE",
                                value: form.title,
                                onChange: (v)=>setForm({
                                        ...form,
                                        title: v
                                    }),
                                placeholder: "Entry point"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        label: "EVENT TYPE",
                                        value: form.event_type,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                event_type: v
                                            }),
                                        placeholder: "Classification"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        label: "VENUE",
                                        value: form.venue,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                venue: v
                                            }),
                                        placeholder: "Coordinates"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCTextarea, {
                                label: "DESCRIPTION",
                                value: form.description,
                                onChange: (v)=>setForm({
                                        ...form,
                                        description: v
                                    })
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SRule, {
                                label: "EVT · CHRONO"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        label: "START_UTC",
                                        type: "datetime-local",
                                        value: form.start_datetime,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                start_datetime: v
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        label: "END_UTC",
                                        type: "datetime-local",
                                        value: form.end_datetime,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                end_datetime: v
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                label: "REG_DEADLINE",
                                type: "datetime-local",
                                value: form.registration_deadline,
                                onChange: (v)=>setForm({
                                        ...form,
                                        registration_deadline: v
                                    })
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SRule, {
                                label: "EVT · PARAMETERS"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        label: "MAX_CAPACITY",
                                        type: "number",
                                        value: form.capacity,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                capacity: Number(v)
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        label: "PRIORITY_VAL",
                                        type: "number",
                                        value: form.display_order,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                display_order: Number(v)
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-grid-tri",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCBoolSelect, {
                                        label: "ACTIVE",
                                        value: form.is_active,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                is_active: v
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCBoolSelect, {
                                        label: "FEATURED",
                                        value: form.is_featured,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                is_featured: v
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCBoolSelect, {
                                        label: "PAID",
                                        value: form.is_paid,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                is_paid: v,
                                                ...v === false && {
                                                    price: 0,
                                                    upi_qr_url: ""
                                                }
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            form.is_paid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 8,
                                    padding: "16px",
                                    background: AMBER(0.03),
                                    border: `1px solid ${AMBER(0.12)}`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        label: "CURRENCY_VAL (INR)",
                                        type: "number",
                                        value: form.price,
                                        onChange: (v)=>setForm({
                                                ...form,
                                                price: Number(v)
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.46rem",
                                                    color: AMBER(0.3),
                                                    marginBottom: 8
                                                },
                                                children: "UPI_UPLINK (QR)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this),
                                            form.upi_qr_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: form.upi_qr_url,
                                                style: {
                                                    width: 100,
                                                    marginBottom: 10
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 261,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    cursor: "pointer"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: handleUpiQrUpload
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "inline-block",
                                                            fontSize: "0.55rem",
                                                            padding: "8px 14px",
                                                            border: `1px solid ${AMBER(0.2)}`,
                                                            color: AMBER(0.5)
                                                        },
                                                        children: "UPLOAD_QR"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 262,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "flex-end",
                                    gap: 8,
                                    marginTop: 12,
                                    paddingTop: 16,
                                    borderTop: `1px solid ${AMBER(0.08)}`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        style: {
                                            flex: "1 1 auto",
                                            fontFamily: "'IBM Plex Mono'",
                                            fontSize: "0.6rem",
                                            padding: "12px 20px",
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.15)}`,
                                            color: AMBER(0.4)
                                        },
                                        children: "ABORT"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: save,
                                        disabled: busy,
                                        style: {
                                            flex: "2 1 auto",
                                            fontFamily: "'IBM Plex Mono'",
                                            fontSize: "0.6rem",
                                            padding: "12px 24px",
                                            background: busy ? AMBER(0.4) : AMBER(0.9),
                                            border: "none",
                                            color: BG,
                                            fontWeight: 700,
                                            position: "relative",
                                            overflow: "hidden"
                                        },
                                        children: [
                                            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: "absolute",
                                                    inset: 0,
                                                    background: "rgba(0,0,0,0.1)",
                                                    animation: "evtshimmer 0.85s infinite"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 273,
                                                columnNumber: 24
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: "relative"
                                                },
                                                children: saving ? "SAVING_DATA..." : uploading ? "SYNCING_MEDIA..." : isEdit ? "UPDATE_PROTOCOL" : "INITIALIZE_EVENT"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                                lineNumber: 274,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/events/AddEditEventModal.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
_s2(AddEditEventModal, "vk7d2jedM7QGcx/aroITjQIpGbE=");
_c6 = AddEditEventModal;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "DIMWHITE");
__turbopack_context__.k.register(_c2, "MCInput");
__turbopack_context__.k.register(_c3, "MCTextarea");
__turbopack_context__.k.register(_c4, "MCBoolSelect");
__turbopack_context__.k.register(_c5, "SRule");
__turbopack_context__.k.register(_c6, "AddEditEventModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/events/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminEventsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$events$2f$EventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/events/EventCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$events$2f$AddEditEventModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/events/AddEditEventModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
/* ─────────────────────────────────────────
   SYSTEM PALETTE
───────────────────────────────────────── */ const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const GREEN = (a = 1)=>`rgba(0,255,120,${a})`;
_c1 = GREEN;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c2 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
function AdminEventsPage() {
    _s();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editEvent, setEditEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchFoc, setSearchFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminEventsPage.useCallback[fetchEvents]": async ()=>{
            setLoading(true);
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").select("*").order("display_order", {
                ascending: true
            }).order("start_datetime", {
                ascending: false
            });
            setEvents(data ?? []);
            setLoading(false);
        }
    }["AdminEventsPage.useCallback[fetchEvents]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminEventsPage.useEffect": ()=>{
            fetchEvents();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel("events-admin-realtime").on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "events"
            }, fetchEvents).subscribe();
            return ({
                "AdminEventsPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["AdminEventsPage.useEffect"];
        }
    }["AdminEventsPage.useEffect"], [
        fetchEvents
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminEventsPage.useMemo[filtered]": ()=>{
            return events.filter({
                "AdminEventsPage.useMemo[filtered]": (e)=>`${e.title} ${e.event_type ?? ""} ${e.venue ?? ""}`.toLowerCase().includes(search.toLowerCase())
            }["AdminEventsPage.useMemo[filtered]"]);
        }
    }["AdminEventsPage.useMemo[filtered]"], [
        events,
        search
    ]);
    const now = new Date();
    const stats = {
        total: events.length,
        active: events.filter((e)=>e.is_active).length,
        upcoming: events.filter((e)=>new Date(e.start_datetime) > now).length,
        featured: events.filter((e)=>e.is_featured).length
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
        @keyframes sysblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes syspulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        input::placeholder {
          color:${AMBER(0.22)};
          font-family:'IBM Plex Mono',monospace;
          font-size:0.7rem;
          letter-spacing:0.06em
        }
        
        .events-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 22px;
        }

        .events-control-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 18px;
        }

        @media (min-width: 768px) {
          .events-stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .events-control-row {
            flex-direction: row;
            align-items: stretch;
          }
          .search-input-wrapper {
            flex: 1;
          }
          .add-event-btn {
            width: auto;
          }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/events/page.tsx",
                lineNumber: 99,
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
                                children: "SYS · EVENTS CONTROL"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 28
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                    letterSpacing: "-0.01em",
                                    color: AMBER(0.9),
                                    margin: 0
                                },
                                children: "Event Management"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'IBM Plex Sans', sans-serif",
                                    fontWeight: 300,
                                    fontSize: "0.85rem",
                                    color: DIMWHITE(0.3),
                                    marginTop: 6
                                },
                                children: "Create, edit and monitor IDEA Lab events"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "events-stats-grid",
                        children: Object.entries(stats).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: PANEL,
                                    border: `1px solid ${BORDER}`,
                                    padding: "14px 16px",
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 1,
                                            background: `linear-gradient(to bottom, transparent, ${AMBER(0.5)}, transparent)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/events/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.5rem",
                                            letterSpacing: "0.22em",
                                            color: AMBER(0.3),
                                            marginBottom: 4
                                        },
                                        children: k.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/events/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                            fontWeight: 700,
                                            fontSize: "1.3rem",
                                            color: AMBER(0.85)
                                        },
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/events/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, k, true, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "events-control-row",
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
                                            background: searchFoc ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`,
                                            transition: "all 0.2s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/events/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "SEARCH TITLE / TYPE / VENUE...",
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        onFocus: ()=>setSearchFoc(true),
                                        onBlur: ()=>setSearchFoc(false),
                                        style: {
                                            width: "100%",
                                            padding: "11px 14px",
                                            background: PANEL,
                                            borderTop: `1px solid ${BORDER}`,
                                            borderRight: `1px solid ${BORDER}`,
                                            borderBottom: `1px solid ${BORDER}`,
                                            borderLeft: "none",
                                            outline: "none",
                                            color: DIMWHITE(0.85),
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.72rem"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/events/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "add-event-btn",
                                onClick: ()=>{
                                    setEditEvent(null);
                                    setOpen(true);
                                },
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.18em",
                                    padding: "11px 22px",
                                    background: AMBER(0.9),
                                    border: "none",
                                    color: BG,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    boxShadow: `0 0 14px ${AMBER(0.2)}`,
                                    whiteSpace: "nowrap"
                                },
                                children: "+ ADD EVENT"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
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
                                    filtered.length,
                                    " EVENT",
                                    filtered.length !== 1 ? "S" : "",
                                    " FOUND"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.08)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 4,
                                    height: 4,
                                    borderRadius: "50%",
                                    background: GREEN(0.85),
                                    boxShadow: `0 0 4px ${GREEN(0.5)}`,
                                    animation: "syspulse 2s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "40px 0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: "0.7rem",
                                letterSpacing: "0.25em",
                                color: AMBER(0.35)
                            },
                            children: "LOADING EVENTS..."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/events/page.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 311,
                        columnNumber: 11
                    }, this) : filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "60px 0",
                            border: `1px solid ${AMBER(0.08)}`,
                            background: PANEL,
                            textAlign: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: "0.65rem",
                                letterSpacing: "0.25em",
                                color: AMBER(0.25)
                            },
                            children: "NO EVENTS FOUND"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/events/page.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 10
                        },
                        children: filtered.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$events$2f$EventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    event: event,
                                    onEdit: ()=>{
                                        setEditEvent(event);
                                        setOpen(true);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/events/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 17
                                }, this)
                            }, event.id, false, {
                                fileName: "[project]/app/admin/events/page.tsx",
                                lineNumber: 340,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/events/page.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/events/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$events$2f$AddEditEventModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: open,
                event: editEvent,
                onClose: ()=>{
                    setOpen(false);
                    setEditEvent(null);
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/events/page.tsx",
                lineNumber: 354,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/events/page.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(AdminEventsPage, "d6yJthHR0ZffaAetP7noAnVBnNU=");
_c3 = AdminEventsPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "DIMWHITE");
__turbopack_context__.k.register(_c3, "AdminEventsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1b1fe5e1._.js.map