(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/products/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminProductsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
'use client';
;
;
const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
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
/* ── MCInput ── */ function MCInput({ label, value, onChange, type = "text", placeholder = "" }) {
    _s();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 23,
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
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 25,
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
                            background: foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)",
                            borderTop: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`,
                            borderRight: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`,
                            borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`,
                            borderLeft: "none",
                            outline: "none",
                            color: DIMWHITE(0.85),
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.75rem",
                            letterSpacing: "0.04em",
                            transition: "background 0.18s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(MCInput, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c5 = MCInput;
/* ── MCTextarea ── */ function MCTextarea({ label, value, onChange, rows = 3, placeholder = "" }) {
    _s1();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 43,
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
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        rows: rows,
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
                            resize: "vertical",
                            background: foc ? "rgba(255,176,0,0.04)" : "rgba(0,0,0,0.35)",
                            borderTop: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`,
                            borderRight: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`,
                            borderBottom: `1px solid ${foc ? AMBER(0.28) : AMBER(0.09)}`,
                            borderLeft: "none",
                            outline: "none",
                            color: DIMWHITE(0.85),
                            fontFamily: "'IBM Plex Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: "0.82rem",
                            lineHeight: 1.65,
                            transition: "background 0.18s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s1(MCTextarea, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c6 = MCTextarea;
/* ── MCBoolSelect ── */ function MCBoolSelect({ label, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 60,
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
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 62,
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
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.72rem",
                            letterSpacing: "0.06em",
                            cursor: "pointer",
                            appearance: "none"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "true",
                                style: {
                                    background: BG
                                },
                                children: "TRUE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "false",
                                style: {
                                    background: BG
                                },
                                children: "FALSE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c7 = MCBoolSelect;
/* ── Section Rule ── */ function SRule({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            margin: "6px 0 2px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.46rem",
                    letterSpacing: "0.28em",
                    color: AMBER(0.35),
                    whiteSpace: "nowrap"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(to right,${AMBER(0.18)},transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_c8 = SRule;
function AdminProductsPage() {
    _s2();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteFor, setDeleteFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminProductsPage.useEffect": ()=>{
            loadProducts();
        }
    }["AdminProductsPage.useEffect"], []);
    async function loadProducts() {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").select("*").order("created_at", {
            ascending: false
        });
        if (error) {
            console.error(error);
            return;
        }
        setProducts(data || []);
    }
    async function deleteProduct(id) {
        setDeleting(true);
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").delete().eq("id", id);
        setDeleting(false);
        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }
        setDeleteFor(null);
        loadProducts();
    }
    function closeModal() {
        setOpen(false);
        setEditing(null);
        loadProducts();
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
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes prdshimmer { from{left:-40%} to{left:140%} }
        @keyframes mcpulse  { 0%,100%{opacity:1} 50%{opacity:0.25} }
        input[type=file]    { display:none }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none;margin:0 }
        input::placeholder,textarea::placeholder { color:rgba(255,176,0,0.2);font-family:'IBM Plex Mono',monospace;font-size:0.72rem }
        option { background:#0a0900 }
        select { appearance:none }
        .prdscroll::-webkit-scrollbar { width:3px;background:#0a0900 }
        .prdscroll::-webkit-scrollbar-thumb { background:rgba(255,176,0,0.2) }

        .prd-header-flex { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .prd-stats-bar { display: flex; align-items: center; gap: 10px; }
        .prd-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }

        @media (min-width: 768px) {
          .prd-header-flex { flex-direction: row; align-items: flex-start; justify-content: space-between; }
        }

        @media (max-width: 480px) {
          .prd-stats-bar { width: 100%; justify-content: space-between; }
          .prd-grid { grid-template-columns: 1fr; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 121,
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
                                children: "SYS · PRODUCT REGISTRY"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right,${AMBER(0.25)},transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prd-header-flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                            fontWeight: 700,
                                            fontSize: "clamp(1.6rem,4vw,2.4rem)",
                                            letterSpacing: "-0.01em",
                                            color: AMBER(0.9),
                                            lineHeight: 1,
                                            margin: 0
                                        },
                                        children: "Products"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/products/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "0.85rem",
                                            color: DIMWHITE(0.3),
                                            marginTop: 5
                                        },
                                        children: "Manage IDEA Lab products and projects"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/products/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prd-stats-bar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.47rem",
                                            letterSpacing: "0.22em",
                                            color: AMBER(0.3),
                                            padding: "7px 12px",
                                            border: `1px solid ${AMBER(0.12)}`
                                        },
                                        children: [
                                            products.length,
                                            " PRODUCT",
                                            products.length !== 1 ? "S" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/products/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddBtn, {
                                        onClick: ()=>{
                                            setEditing(null);
                                            setOpen(true);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/products/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.25em",
                                    color: AMBER(0.25)
                                },
                                children: "NO PRODUCTS FOUND"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prd-grid",
                        children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                product: p,
                                onEdit: ()=>{
                                    setEditing(p);
                                    setOpen(true);
                                },
                                onDelete: ()=>setDeleteFor(p.id)
                            }, p.id, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            deleteFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeleteConfirmModal, {
                deleting: deleting,
                onConfirm: ()=>deleteProduct(deleteFor),
                onCancel: ()=>setDeleteFor(null)
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductModal, {
                open: open,
                product: editing,
                onClose: closeModal
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_s2(AdminProductsPage, "C+uCUB/TnViZgFMsCGt7cLPNmWk=");
_c9 = AdminProductsPage;
/* ── PRODUCT CARD ── */ function ProductCard({ product: p, onEdit, onDelete }) {
    _s3();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shortId = p.id.slice(0, 8).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            position: "relative",
            overflow: "hidden",
            background: hov ? "rgba(255,176,0,0.05)" : PANEL,
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
                    background: `linear-gradient(to right,transparent,${AMBER(0.5)},transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 218,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: hov ? 2 : 1,
                    background: `linear-gradient(to bottom,transparent,${p.is_active ? AMBER(hov ? 0.8 : 0.3) : "rgba(255,255,255,0.1)"},transparent)`,
                    transition: "all 0.22s"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 219,
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
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            p.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 140,
                    overflow: "hidden",
                    position: "relative",
                    borderBottom: `1px solid ${AMBER(0.08)}`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: p.image_url,
                        alt: p.title,
                        style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.85
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(10,9,0,0.7), transparent)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "12px 14px 12px 16px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.46rem",
                                    letterSpacing: "0.2em",
                                    color: AMBER(0.28)
                                },
                                children: [
                                    "PRD·",
                                    shortId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            p.is_featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.44rem",
                                    letterSpacing: "0.16em",
                                    padding: "1px 6px",
                                    color: AMBER(0.8),
                                    background: AMBER(0.08),
                                    border: `1px solid ${AMBER(0.22)}`
                                },
                                children: "FEAT"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 232,
                                columnNumber: 29
                            }, this),
                            p.is_paid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.44rem",
                                    letterSpacing: "0.16em",
                                    padding: "1px 6px",
                                    color: SKY(0.8),
                                    background: SKY(0.06),
                                    border: `1px solid ${SKY(0.2)}`
                                },
                                children: "PAID"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 233,
                                columnNumber: 25
                            }, this),
                            !p.is_active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.44rem",
                                    letterSpacing: "0.16em",
                                    padding: "1px 6px",
                                    color: "rgba(255,255,255,0.25)",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)"
                                },
                                children: "INACTIVE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 234,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                            fontWeight: 700,
                            fontSize: "1rem",
                            color: DIMWHITE(0.9),
                            lineHeight: 1.1,
                            marginBottom: 5,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        children: p.title
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    p.short_description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'IBM Plex Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: "0.78rem",
                            color: DIMWHITE(0.38),
                            lineHeight: 1.5,
                            marginBottom: 8,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical"
                        },
                        children: p.short_description
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 242,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                            marginBottom: 10
                        },
                        children: [
                            p.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.46rem",
                                    letterSpacing: "0.15em",
                                    padding: "2px 7px",
                                    color: AMBER(0.55),
                                    border: `1px solid ${AMBER(0.18)}`
                                },
                                children: p.category.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 248,
                                columnNumber: 26
                            }, this),
                            p.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.46rem",
                                    letterSpacing: "0.15em",
                                    padding: "2px 7px",
                                    color: GREEN(0.6),
                                    border: `1px solid ${GREEN(0.2)}`
                                },
                                children: p.status.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 249,
                                columnNumber: 24
                            }, this),
                            p.price != null && p.is_paid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.46rem",
                                    letterSpacing: "0.15em",
                                    padding: "2px 7px",
                                    color: SKY(0.7),
                                    border: `1px solid ${SKY(0.2)}`
                                },
                                children: [
                                    "Rs",
                                    p.price
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 250,
                                columnNumber: 44
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 1,
                            background: `linear-gradient(to right,${AMBER(0.08)},transparent)`,
                            marginBottom: 10
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardActionBtn, {
                                label: "EDIT",
                                onClick: onEdit,
                                color: AMBER(0.7),
                                hoverBg: AMBER(0.07),
                                hoverBorder: AMBER(0.3)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardActionBtn, {
                                label: "DELETE",
                                onClick: onDelete,
                                color: RED(0.7),
                                hoverBg: RED(0.07),
                                hoverBorder: RED(0.3)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_s3(ProductCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c10 = ProductCard;
/* ── Card Action Btn ── */ function CardActionBtn({ label, onClick, color, hoverBg, hoverBorder }) {
    _s4();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            padding: "5px 12px",
            background: hov ? hoverBg : "transparent",
            borderTop: `1px solid ${hov ? hoverBorder : BORDER}`,
            borderRight: `1px solid ${hov ? hoverBorder : BORDER}`,
            borderBottom: `1px solid ${hov ? hoverBorder : BORDER}`,
            borderLeft: "none",
            color,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.18s"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: `linear-gradient(to bottom,transparent,${color},transparent)`,
                    opacity: hov ? 1 : 0.3,
                    transition: "opacity 0.18s"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
}
_s4(CardActionBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c11 = CardActionBtn;
/* ── Add Button ── */ function AddBtn({ onClick }) {
    _s5();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            padding: "9px 18px",
            background: hov ? AMBER(1) : AMBER(0.9),
            border: "none",
            color: BG,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: `0 0 ${hov ? 22 : 12}px ${AMBER(hov ? 0.4 : 0.22)}`,
            transition: "background 0.18s, box-shadow 0.18s",
            whiteSpace: "nowrap"
        },
        children: "+ ADD PRODUCT"
    }, void 0, false, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
_s5(AddBtn, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c12 = AddBtn;
/* ── DELETE CONFIRM MODAL ── */ function DeleteConfirmModal({ onConfirm, onCancel, deleting }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 100,
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
                background: "#0a0900",
                border: `1px solid ${RED(0.35)}`,
                boxShadow: `0 32px 64px rgba(0,0,0,0.7)`,
                position: "relative",
                overflow: "hidden"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "22px 22px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: "0.5rem",
                            letterSpacing: "0.3em",
                            color: RED(0.5),
                            marginBottom: 6
                        },
                        children: "SYS · CONFIRM DELETE"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            color: RED(0.88),
                            margin: "0 0 8px"
                        },
                        children: "Delete Product"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "'IBM Plex Sans',sans-serif",
                            fontWeight: 300,
                            fontSize: "0.84rem",
                            color: DIMWHITE(0.4),
                            marginBottom: 22
                        },
                        children: "Permanent action cannot be undone."
                    }, void 0, false, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 300,
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
                                style: {
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.58rem",
                                    letterSpacing: "0.2em",
                                    padding: "8px 16px",
                                    background: "transparent",
                                    border: `1px solid ${AMBER(0.15)}`,
                                    color: AMBER(0.4),
                                    cursor: "pointer"
                                },
                                children: "CANCEL"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onConfirm,
                                disabled: deleting,
                                style: {
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.58rem",
                                    letterSpacing: "0.2em",
                                    padding: "8px 20px",
                                    background: deleting ? RED(0.5) : RED(0.85),
                                    border: "none",
                                    color: "#0a0900",
                                    fontWeight: 600,
                                    cursor: deleting ? "not-allowed" : "pointer"
                                },
                                children: deleting ? "DELETING..." : "DELETE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/products/page.tsx",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/products/page.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/products/page.tsx",
                lineNumber: 297,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/admin/products/page.tsx",
            lineNumber: 296,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
_c13 = DeleteConfirmModal;
/* ── PRODUCT MODAL ── */ function ProductModal({ open, onClose, product }) {
    _s6();
    const blank = {
        title: "",
        short_description: "",
        full_description: "",
        category: "",
        status: "",
        price: "",
        is_paid: false,
        demo_url: "",
        github_url: "",
        docs_url: "",
        image_url: "",
        technologies: "",
        team_size: "",
        is_featured: false,
        is_active: true
    };
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(blank);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imgLoad, setImgLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductModal.useEffect": ()=>{
            if (product) {
                setForm({
                    ...product,
                    technologies: Array.isArray(product.technologies) ? product.technologies.join(", ") : product.technologies || ""
                });
            } else {
                setForm(blank);
            }
        }
    }["ProductModal.useEffect"], [
        product,
        open
    ]);
    if (!open) return null;
    async function uploadImage(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setImgLoad(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "idea_lab_profiles");
        const res = await fetch(`https://api.cloudinary.com/v1_1/${("TURBOPACK compile-time value", "dvrc3jqve")}/image/upload`, {
            method: "POST",
            body: data
        });
        const json = await res.json();
        setForm((prev)=>({
                ...prev,
                image_url: json.secure_url
            }));
        setImgLoad(false);
    }
    async function save() {
        setSaving(true);
        const payload = {
            title: form.title,
            short_description: form.short_description,
            full_description: form.full_description,
            category: form.category,
            status: form.status,
            price: form.price ? Number(form.price) : null,
            is_paid: form.is_paid,
            demo_url: form.demo_url,
            github_url: form.github_url,
            docs_url: form.docs_url,
            image_url: form.image_url,
            technologies: form.technologies ? form.technologies.split(",").map((t)=>t.trim()) : [],
            team_size: form.team_size ? Number(form.team_size) : null,
            is_featured: form.is_featured,
            is_active: form.is_active
        };
        let error;
        if (product) {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").update(payload).eq("id", product.id).select();
            error = res.error;
        } else {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").insert(payload).select();
            error = res.error;
        }
        setSaving(false);
        if (error) {
            alert(error.message);
            return;
        }
        ;
        onClose();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 12
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "prdscroll",
            style: {
                width: "100%",
                maxWidth: 600,
                maxHeight: "95vh",
                overflowY: "auto",
                background: BG,
                border: `1px solid ${AMBER(0.2)}`,
                boxShadow: `0 40px 80px rgba(0,0,0,0.7)`,
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 1,
                        background: AMBER(0.1)
                    }
                }, void 0, false, {
                    fileName: "[project]/app/admin/products/page.tsx",
                    lineNumber: 349,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "24px 20px 28px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.5rem",
                                                letterSpacing: "0.3em",
                                                color: AMBER(0.4)
                                            },
                                            children: [
                                                "SYS · ",
                                                product ? "EDIT RECORD" : "NEW RECORD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/products/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                                fontWeight: 700,
                                                fontSize: "1.4rem",
                                                color: AMBER(0.9),
                                                margin: 0
                                            },
                                            children: product ? "Edit Product" : "Add Product"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/products/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 353,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    style: {
                                        background: "transparent",
                                        border: `1px solid ${AMBER(0.15)}`,
                                        color: AMBER(0.4),
                                        cursor: "pointer",
                                        width: 28,
                                        height: 28
                                    },
                                    children: "X"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SRule, {
                            label: "PRD · IMAGE"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 12,
                                flexWrap: "wrap"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 100,
                                        height: 70,
                                        border: `1px solid ${AMBER(0.2)}`,
                                        background: "#000",
                                        flexShrink: 0
                                    },
                                    children: form.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: form.image_url,
                                        style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/products/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 34
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        cursor: "pointer",
                                        flex: 1,
                                        minWidth: 160
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "image/*",
                                            onChange: uploadImage
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/products/page.tsx",
                                            lineNumber: 366,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.55rem",
                                                border: `1px solid ${AMBER(0.2)}`,
                                                padding: "10px",
                                                textAlign: "center"
                                            },
                                            children: imgLoad ? "UPLOADING..." : "UPLOAD / REPLACE IMAGE"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/products/page.tsx",
                                            lineNumber: 367,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 361,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                            label: "TITLE",
                            value: form.title,
                            onChange: (v)=>setForm({
                                    ...form,
                                    title: v
                                }),
                            placeholder: "Product title"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 371,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCTextarea, {
                            label: "SHORT DESC",
                            value: form.short_description || "",
                            onChange: (v)=>setForm({
                                    ...form,
                                    short_description: v
                                }),
                            rows: 2
                        }, void 0, false, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 372,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                    label: "CATEGORY",
                                    value: form.category || "",
                                    onChange: (v)=>setForm({
                                            ...form,
                                            category: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                    label: "STATUS",
                                    value: form.status || "",
                                    onChange: (v)=>setForm({
                                            ...form,
                                            status: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                            label: "TECHNOLOGIES",
                            value: form.technologies || "",
                            onChange: (v)=>setForm({
                                    ...form,
                                    technologies: v
                                }),
                            placeholder: "React, Node..."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                    label: "TEAM SIZE",
                                    type: "number",
                                    value: form.team_size || "",
                                    onChange: (v)=>setForm({
                                            ...form,
                                            team_size: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 382,
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
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCBoolSelect, {
                                    label: "ACTIVE",
                                    value: form.is_active,
                                    onChange: (v)=>setForm({
                                            ...form,
                                            is_active: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 381,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SRule, {
                            label: "PRD · PRICING & LINKS"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCBoolSelect, {
                                    label: "PAID",
                                    value: form.is_paid,
                                    onChange: (v)=>setForm({
                                            ...form,
                                            is_paid: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                    label: "PRICE (RS)",
                                    type: "number",
                                    value: form.price || "",
                                    onChange: (v)=>setForm({
                                            ...form,
                                            price: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                            label: "DEMO URL",
                            value: form.demo_url || "",
                            onChange: (v)=>setForm({
                                    ...form,
                                    demo_url: v
                                })
                        }, void 0, false, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 393,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                            label: "GITHUB",
                            value: form.github_url || "",
                            onChange: (v)=>setForm({
                                    ...form,
                                    github_url: v
                                })
                        }, void 0, false, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 10,
                                marginTop: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    style: {
                                        fontFamily: "'IBM Plex Mono', monospace",
                                        fontSize: "0.6rem",
                                        padding: "10px 20px",
                                        border: `1px solid ${AMBER(0.2)}`,
                                        background: "transparent",
                                        color: AMBER(0.5)
                                    },
                                    children: "CANCEL"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: save,
                                    disabled: saving,
                                    style: {
                                        fontFamily: "'IBM Plex Mono', monospace",
                                        fontSize: "0.6rem",
                                        padding: "10px 24px",
                                        background: AMBER(0.9),
                                        color: "#000",
                                        fontWeight: 700,
                                        border: "none"
                                    },
                                    children: saving ? "SAVING..." : "SAVE PRODUCT"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/products/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/products/page.tsx",
                            lineNumber: 396,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/products/page.tsx",
                    lineNumber: 350,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/products/page.tsx",
            lineNumber: 348,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/products/page.tsx",
        lineNumber: 347,
        columnNumber: 5
    }, this);
}
_s6(ProductModal, "dZrroS9jo6A6UxfRRC6EFnFks0s=");
_c14 = ProductModal;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "SKY");
__turbopack_context__.k.register(_c4, "DIMWHITE");
__turbopack_context__.k.register(_c5, "MCInput");
__turbopack_context__.k.register(_c6, "MCTextarea");
__turbopack_context__.k.register(_c7, "MCBoolSelect");
__turbopack_context__.k.register(_c8, "SRule");
__turbopack_context__.k.register(_c9, "AdminProductsPage");
__turbopack_context__.k.register(_c10, "ProductCard");
__turbopack_context__.k.register(_c11, "CardActionBtn");
__turbopack_context__.k.register(_c12, "AddBtn");
__turbopack_context__.k.register(_c13, "DeleteConfirmModal");
__turbopack_context__.k.register(_c14, "ProductModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_products_page_tsx_599c8f53._.js.map