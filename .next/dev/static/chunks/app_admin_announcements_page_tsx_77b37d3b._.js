(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/announcements/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAnnouncements
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
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c1 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
const RED = (a = 1)=>`rgba(255,60,60,${a})`;
_c2 = RED;
/* ─────────────────────────────────────────
   SHIMMER BAR
───────────────────────────────────────── */ function ShimmerBar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                background: `linear-gradient(to right, transparent, ${AMBER(0.6)}, transparent)`,
                animation: "annshinmer 2.5s linear infinite"
            }
        }, void 0, false, {
            fileName: "[project]/app/admin/announcements/page.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/announcements/page.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c3 = ShimmerBar;
/* ─────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────── */ function SectionLabel({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/announcements/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c4 = SectionLabel;
/* ─────────────────────────────────────────
   POST BUTTON
───────────────────────────────────────── */ function PostBtn({ onClick, loading }) {
    _s();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: loading,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            padding: "12px 26px",
            border: "none",
            background: loading ? AMBER(0.5) : hov ? AMBER(1) : AMBER(0.9),
            color: BG,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            width: "100%"
        },
        children: loading ? "POSTING..." : "POST ANNOUNCEMENT"
    }, void 0, false, {
        fileName: "[project]/app/admin/announcements/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(PostBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c5 = PostBtn;
/* ─────────────────────────────────────────
   MODAL
───────────────────────────────────────── */ function Modal({ open, onClose, title: modalTitle, children, actions }) {
    _s1();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleOverlay = (e)=>{
        if (e.target === overlayRef.current) onClose();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            if (!open) return;
            const handler = {
                "Modal.useEffect.handler": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["Modal.useEffect.handler"];
            window.addEventListener("keydown", handler);
            return ({
                "Modal.useEffect": ()=>window.removeEventListener("keydown", handler)
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        open,
        onClose
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: overlayRef,
        onClick: handleOverlay,
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: 480,
                background: BG,
                border: `1px solid ${AMBER(0.2)}`,
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBar, {}, void 0, false, {
                    fileName: "[project]/app/admin/announcements/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "18px 20px 0",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                color: AMBER(0.9),
                                margin: 0
                            },
                            children: modalTitle
                        }, void 0, false, {
                            fileName: "[project]/app/admin/announcements/page.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                background: "transparent",
                                border: "none",
                                color: AMBER(0.4),
                                cursor: "pointer",
                                fontSize: 20
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/announcements/page.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/announcements/page.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "20px"
                    },
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/admin/announcements/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "0 20px 20px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        gap: 10
                    },
                    children: actions
                }, void 0, false, {
                    fileName: "[project]/app/admin/announcements/page.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/announcements/page.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/announcements/page.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s1(Modal, "rmj6vZ+Vy6O1wOWphXugz2fiTMw=");
_c6 = Modal;
/* ─────────────────────────────────────────
   FIELD
───────────────────────────────────────── */ function Field({ label, value, onChange, multiline = false, rows = 4 }) {
    _s2();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shared = {
        width: "100%",
        padding: "10px 12px",
        background: "rgba(0,0,0,0.4)",
        border: `1px solid ${foc ? AMBER(0.5) : AMBER(0.12)}`,
        color: DIMWHITE(0.9),
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.8rem",
        outline: "none",
        transition: "all 0.2s",
        boxSizing: "border-box"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    display: "block",
                    marginBottom: 6,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.2em",
                    color: AMBER(foc ? 0.8 : 0.35),
                    textTransform: "uppercase"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            multiline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                onFocus: ()=>setFoc(true),
                onBlur: ()=>setFoc(false),
                rows: rows,
                style: {
                    ...shared,
                    resize: "vertical"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                onFocus: ()=>setFoc(true),
                onBlur: ()=>setFoc(false),
                style: shared
            }, void 0, false, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/announcements/page.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s2(Field, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c7 = Field;
/* ─────────────────────────────────────────
   DIALOG BUTTON
───────────────────────────────────────── */ function DialogBtn({ onClick, children, variant = "primary", disabled = false }) {
    const styles = {
        primary: {
            background: disabled ? AMBER(0.5) : AMBER(0.9),
            color: BG,
            border: "none"
        },
        ghost: {
            background: "transparent",
            border: `1px solid ${AMBER(0.2)}`,
            color: AMBER(0.5)
        },
        danger: {
            background: "transparent",
            border: `1px solid ${RED(0.3)}`,
            color: RED(0.7)
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            padding: "10px 20px",
            cursor: disabled ? "not-allowed" : "pointer",
            flex: 1,
            minWidth: "100px",
            transition: "all 0.18s",
            ...styles[variant]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/admin/announcements/page.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
_c8 = DialogBtn;
function AdminAnnouncements() {
    _s3();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [announcements, setAnnouncements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [deleteTarget, setDeleteTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editTarget, setEditTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editTitle, setEditTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editMessage, setEditMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editSaving, setEditSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successModal, setSuccessModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteLoading, setDeleteLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAnnouncements.useEffect": ()=>{
            fetchAnnouncements();
        }
    }["AdminAnnouncements.useEffect"], []);
    async function fetchAnnouncements() {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("announcements").select("*").eq("is_active", true).order("created_at", {
            ascending: false
        });
        if (data) setAnnouncements(data);
    }
    async function createAnnouncement() {
        if (!title || !message) return;
        setLoading(true);
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("announcements").insert([
            {
                title,
                message
            }
        ]);
        setLoading(false);
        if (!error) {
            setTitle("");
            setMessage("");
            fetchAnnouncements();
            setSuccessModal(true);
        }
    }
    async function deleteAnnouncement(id) {
        setDeleteLoading(true);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("announcements").update({
            is_active: false
        }).eq("id", id);
        setDeleteLoading(false);
        setDeleteTarget(null);
        fetchAnnouncements();
    }
    async function saveEdit() {
        if (!editTarget) return;
        setEditSaving(true);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("announcements").update({
            title: editTitle,
            message: editMessage
        }).eq("id", editTarget.id);
        setEditSaving(false);
        setEditTarget(null);
        fetchAnnouncements();
    }
    function openEdit(a) {
        setEditTarget(a);
        setEditTitle(a.title);
        setEditMessage(a.message);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: BG,
            color: DIMWHITE(0.85)
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes annshinmer { from{left:-40%} to{left:140%} }
        .main-ann-container { width: 100%; max-width: 800px; margin: 0 auto; padding: 28px 16px 60px; }
        
        @media (min-width: 768px) {
          .ann-actions-row { justify-content: flex-end !important; }
          .ann-actions-row > button { flex: none !important; width: 100px; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "main-ann-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                        label: "SYS · ANNOUNCEMENTS"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            overflow: "hidden",
                            background: PANEL,
                            border: `1px solid ${BORDER}`,
                            marginBottom: 40
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBar, {}, void 0, false, {
                                fileName: "[project]/app/admin/announcements/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "22px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed'",
                                            fontWeight: 700,
                                            fontSize: "clamp(1.2rem, 5vw, 1.5rem)",
                                            color: AMBER(0.95),
                                            margin: "0 0 20px"
                                        },
                                        children: "Create Announcement"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/announcements/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Title",
                                        value: title,
                                        onChange: setTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/announcements/page.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Message",
                                        value: message,
                                        onChange: setMessage,
                                        multiline: true,
                                        rows: 4
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/announcements/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostBtn, {
                                        onClick: createAnnouncement,
                                        loading: loading
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/announcements/page.tsx",
                                        lineNumber: 309,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/announcements/page.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                        label: "SYS · ACTIVE RECORDS"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: PANEL,
                            border: `1px solid ${BORDER}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "12px 20px"
                            },
                            children: [
                                announcements.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "20px 0",
                                        textAlign: "center",
                                        fontSize: "0.7rem",
                                        color: AMBER(0.3),
                                        fontFamily: "'IBM Plex Mono'"
                                    },
                                    children: "NO ACTIVE ANNOUNCEMENTS DETECTED"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/announcements/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                announcements.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "16px 0",
                                            borderBottom: i < announcements.length - 1 ? `1px solid ${AMBER(0.08)}` : "none"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans Condensed'",
                                                    fontWeight: 600,
                                                    color: AMBER(0.9),
                                                    marginBottom: 6,
                                                    fontSize: "1.05rem"
                                                },
                                                children: a.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/announcements/page.tsx",
                                                lineNumber: 326,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.85rem",
                                                    lineHeight: 1.6,
                                                    marginBottom: 14,
                                                    color: DIMWHITE(0.6),
                                                    fontFamily: "inherit"
                                                },
                                                children: a.message
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/announcements/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ann-actions-row",
                                                style: {
                                                    display: "flex",
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogBtn, {
                                                        variant: "ghost",
                                                        onClick: ()=>openEdit(a),
                                                        children: "EDIT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/announcements/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogBtn, {
                                                        variant: "danger",
                                                        onClick: ()=>setDeleteTarget(a),
                                                        children: "DELETE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/announcements/page.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/announcements/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, a.id, true, {
                                        fileName: "[project]/app/admin/announcements/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/announcements/page.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Modal, {
                open: successModal,
                onClose: ()=>setSuccessModal(false),
                title: "Mission Status",
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogBtn, {
                    onClick: ()=>setSuccessModal(false),
                    children: "CLOSE"
                }, void 0, false, {
                    fileName: "[project]/app/admin/announcements/page.tsx",
                    lineNumber: 345,
                    columnNumber: 105
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontSize: "0.85rem",
                        color: DIMWHITE(0.5),
                        margin: 0
                    },
                    children: "The announcement has been broadcast successfully to the live system feed."
                }, void 0, false, {
                    fileName: "[project]/app/admin/announcements/page.tsx",
                    lineNumber: 346,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Modal, {
                open: !!deleteTarget,
                onClose: ()=>setDeleteTarget(null),
                title: "Delete Announcement",
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogBtn, {
                            onClick: ()=>setDeleteTarget(null),
                            variant: "ghost",
                            children: "CANCEL"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/announcements/page.tsx",
                            lineNumber: 350,
                            columnNumber: 113
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogBtn, {
                            onClick: ()=>deleteAnnouncement(deleteTarget.id),
                            variant: "danger",
                            disabled: deleteLoading,
                            children: deleteLoading ? "DELETING..." : "CONFIRM"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/announcements/page.tsx",
                            lineNumber: 350,
                            columnNumber: 196
                        }, void 0)
                    ]
                }, void 0, true),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "0.85rem",
                            color: DIMWHITE(0.5),
                            marginBottom: 12
                        },
                        children: "Terminate the following record?"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    deleteTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "12px",
                            background: "rgba(220,50,50,0.05)",
                            border: `1px solid ${RED(0.2)}`,
                            fontSize: "0.9rem",
                            color: AMBER(0.8)
                        },
                        children: deleteTarget.title
                    }, void 0, false, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 352,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Modal, {
                open: !!editTarget,
                onClose: ()=>setEditTarget(null),
                title: "Modify Record",
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogBtn, {
                            onClick: ()=>setEditTarget(null),
                            variant: "ghost",
                            children: "CANCEL"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/announcements/page.tsx",
                            lineNumber: 356,
                            columnNumber: 103
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogBtn, {
                            onClick: saveEdit,
                            disabled: editSaving,
                            children: editSaving ? "SAVING..." : "UPDATE"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/announcements/page.tsx",
                            lineNumber: 356,
                            columnNumber: 184
                        }, void 0)
                    ]
                }, void 0, true),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Title",
                        value: editTitle,
                        onChange: setEditTitle
                    }, void 0, false, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Message",
                        value: editMessage,
                        onChange: setEditMessage,
                        multiline: true,
                        rows: 5
                    }, void 0, false, {
                        fileName: "[project]/app/admin/announcements/page.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/announcements/page.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/announcements/page.tsx",
        lineNumber: 285,
        columnNumber: 5
    }, this);
}
_s3(AdminAnnouncements, "dEZ6sLE9VwRuaiAGrJEpVx+QZV0=");
_c9 = AdminAnnouncements;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "DIMWHITE");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "ShimmerBar");
__turbopack_context__.k.register(_c4, "SectionLabel");
__turbopack_context__.k.register(_c5, "PostBtn");
__turbopack_context__.k.register(_c6, "Modal");
__turbopack_context__.k.register(_c7, "Field");
__turbopack_context__.k.register(_c8, "DialogBtn");
__turbopack_context__.k.register(_c9, "AdminAnnouncements");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_announcements_page_tsx_77b37d3b._.js.map