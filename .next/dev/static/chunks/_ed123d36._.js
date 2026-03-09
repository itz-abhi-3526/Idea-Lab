(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/admin/AddInventoryModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddInventoryModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c1 = DIMWHITE;
const BG = "#0a0900";
function MCInput({ name, placeholder, value, onChange, type = "text", label }) {
    _s();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.47rem",
                    letterSpacing: "0.28em",
                    color: AMBER(0.3),
                    marginBottom: 3,
                    paddingLeft: 12
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                lineNumber: 18,
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
                            background: foc ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`,
                            transition: "background 0.2s, width 0.15s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: name,
                        type: type,
                        placeholder: placeholder,
                        value: value,
                        onChange: onChange,
                        onFocus: ()=>setFoc(true),
                        onBlur: ()=>setFoc(false),
                        style: {
                            width: "100%",
                            paddingLeft: 12,
                            paddingRight: 12,
                            paddingTop: 9,
                            paddingBottom: 9,
                            background: foc ? `rgba(255,176,0,0.04)` : "rgba(0,0,0,0.35)",
                            borderTop: `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
                            borderRight: `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
                            borderBottom: `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
                            borderLeft: "none",
                            outline: "none",
                            color: DIMWHITE(0.85),
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.78rem",
                            letterSpacing: "0.05em",
                            transition: "background 0.2s",
                            boxSizing: "border-box"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/AddInventoryModal.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(MCInput, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c2 = MCInput;
function AddInventoryModal({ open, onClose, item = null }) {
    _s1();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        category: '',
        description: '',
        quantity_total: '',
        quantity_available: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddInventoryModal.useEffect": ()=>{
            if (item) {
                setForm({
                    name: item.name,
                    category: item.category,
                    description: item.description,
                    quantity_total: String(item.quantity_total),
                    quantity_available: String(item.quantity_available)
                });
            } else {
                setForm({
                    name: '',
                    category: '',
                    description: '',
                    quantity_total: '',
                    quantity_available: ''
                });
            }
        }
    }["AddInventoryModal.useEffect"], [
        item,
        open
    ]);
    if (!open) return null;
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleSubmit = async ()=>{
        if (!form.name || !form.category || !form.quantity_total) {
            alert('Please fill required fields');
            return;
        }
        setLoading(true);
        const payload = {
            name: form.name,
            category: form.category,
            description: form.description,
            quantity_total: Number(form.quantity_total),
            quantity_available: Number(form.quantity_available || form.quantity_total)
        };
        const query = item ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_items').update(payload).eq('id', item.id) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_items').insert({
            ...payload,
            is_active: true
        });
        const { error } = await query;
        setLoading(false);
        if (error) {
            alert(error.message);
            return;
        }
        onClose();
        location.reload();
    };
    const isEdit = !!item;
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
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes invshimmer{from{left:-40%}to{left:140%}} 
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0} 
        input::placeholder{color:rgba(255,176,0,0.2);font-family:'IBM Plex Mono',monospace;font-size:0.75rem}
        .modal-body { max-height: calc(100vh - 120px); overflow-y: auto; scrollbar-width: none; }
        .modal-body::-webkit-scrollbar { display: none; }
      `
            }, void 0, false, {
                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: 480,
                    background: BG,
                    border: `1px solid rgba(255,176,0,0.18)`,
                    boxShadow: `0 40px 80px rgba(0,0,0,0.7)`,
                    position: "relative",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 1,
                            overflow: "hidden",
                            background: AMBER(0.12),
                            position: "relative"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                width: "40%",
                                background: `linear-gradient(to right, transparent, ${AMBER(0.7)}, transparent)`,
                                animation: "invshimmer 2.5s linear infinite"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AddInventoryModal.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            width: 10,
                            height: 10,
                            borderBottom: `1px solid ${AMBER(0.2)}`,
                            borderLeft: `1px solid ${AMBER(0.2)}`
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            width: 10,
                            height: 10,
                            borderBottom: `1px solid ${AMBER(0.2)}`,
                            borderRight: `1px solid ${AMBER(0.2)}`
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-body",
                        style: {
                            padding: "24px 24px 26px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    marginBottom: 22
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono', monospace",
                                                    fontSize: "0.5rem",
                                                    letterSpacing: "0.3em",
                                                    color: AMBER(0.4),
                                                    marginBottom: 4
                                                },
                                                children: isEdit ? "SYS · EDIT RECORD" : "SYS · NEW RECORD"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
                                                    letterSpacing: "-0.01em",
                                                    color: AMBER(0.9),
                                                    lineHeight: 1,
                                                    margin: 0
                                                },
                                                children: isEdit ? "Edit Item" : "Add Item"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        style: {
                                            width: 26,
                                            height: 26,
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.18)}`,
                                            color: AMBER(0.45),
                                            cursor: "pointer",
                                            fontSize: "0.7rem",
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            transition: "border-color 0.18s, color 0.18s"
                                        },
                                        onMouseEnter: (e)=>{
                                            const b = e.currentTarget;
                                            b.style.borderColor = AMBER(0.45);
                                            b.style.color = AMBER(0.8);
                                        },
                                        onMouseLeave: (e)=>{
                                            const b = e.currentTarget;
                                            b.style.borderColor = AMBER(0.18);
                                            b.style.color = AMBER(0.45);
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        name: "name",
                                        label: "ITEM NAME",
                                        placeholder: "Item name",
                                        value: form.name,
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        name: "category",
                                        label: "CATEGORY",
                                        placeholder: "Category",
                                        value: form.category,
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                        name: "description",
                                        label: "DESCRIPTION",
                                        placeholder: "Description",
                                        value: form.description,
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                        children: `
              .qty-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
              @media (max-width: 400px) { .qty-grid { grid-template-columns: 1fr; } }
            `
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "qty-grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                                name: "quantity_total",
                                                type: "number",
                                                label: "TOTAL QTY",
                                                placeholder: "Total",
                                                value: form.quantity_total,
                                                onChange: handleChange
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                                name: "quantity_available",
                                                type: "number",
                                                label: "AVAILABLE QTY",
                                                placeholder: "Available",
                                                value: form.quantity_available,
                                                onChange: handleChange
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                                lineNumber: 145,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "flex-end",
                                    gap: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        style: {
                                            flex: "1 1 auto",
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.58rem",
                                            letterSpacing: "0.2em",
                                            padding: "10px 18px",
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.15)}`,
                                            color: AMBER(0.4),
                                            cursor: "pointer",
                                            transition: "border-color 0.18s, color 0.18s"
                                        },
                                        onMouseEnter: (e)=>{
                                            const b = e.currentTarget;
                                            b.style.borderColor = AMBER(0.3);
                                            b.style.color = AMBER(0.65);
                                        },
                                        onMouseLeave: (e)=>{
                                            const b = e.currentTarget;
                                            b.style.borderColor = AMBER(0.15);
                                            b.style.color = AMBER(0.4);
                                        },
                                        children: "CANCEL"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmit,
                                        disabled: loading,
                                        style: {
                                            flex: "1 1 auto",
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.58rem",
                                            letterSpacing: "0.2em",
                                            padding: "10px 22px",
                                            background: loading ? AMBER(0.5) : AMBER(0.9),
                                            border: "none",
                                            color: BG,
                                            fontWeight: 600,
                                            cursor: loading ? "not-allowed" : "pointer",
                                            boxShadow: loading ? "none" : `0 0 16px ${AMBER(0.25)}`,
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: "background 0.18s"
                                        },
                                        children: [
                                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: "absolute",
                                                    top: 0,
                                                    bottom: 0,
                                                    width: "30%",
                                                    background: `linear-gradient(to right, transparent, rgba(0,0,0,0.2), transparent)`,
                                                    animation: "invshimmer 0.85s linear infinite"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                                lineNumber: 159,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: "relative",
                                                    zIndex: 1
                                                },
                                                children: loading ? isEdit ? "UPDATING..." : "ADDING..." : isEdit ? "UPDATE ITEM" : "ADD ITEM"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                                lineNumber: 160,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AddInventoryModal.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AddInventoryModal.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/AddInventoryModal.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s1(AddInventoryModal, "E7p+m2bdJfRxip5lSAgCwXWMqDs=");
_c3 = AddInventoryModal;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "DIMWHITE");
__turbopack_context__.k.register(_c2, "MCInput");
__turbopack_context__.k.register(_c3, "AddInventoryModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/inventory/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InventoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AddInventoryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AddInventoryModal.tsx [app-client] (ecmascript)");
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
            const id = "inventory-mc-fonts";
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
/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */ const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const GREEN = (a = 1)=>`rgba(0,255,120,${a})`;
_c1 = GREEN;
const RED = (a = 1)=>`rgba(255,60,60,${a})`;
_c2 = RED;
const YELLOW = (a = 1)=>`rgba(255,200,80,${a})`;
_c3 = YELLOW;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c4 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
/* ─────────────────────────────────────────
   MC INPUT
───────────────────────────────────────── */ function MCInput({ value, onChange, placeholder }) {
    _s1();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mc-input-container",
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
                    background: foc ? `linear-gradient(to bottom, transparent, ${AMBER(0.85)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.18)}, transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/inventory/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                onFocus: ()=>setFoc(true),
                onBlur: ()=>setFoc(false),
                placeholder: placeholder,
                style: {
                    width: "100%",
                    padding: "9px 12px 9px 14px",
                    background: foc ? `rgba(255,176,0,0.04)` : PANEL,
                    borderTop: `1px solid ${AMBER(0.1)}`,
                    borderRight: `1px solid ${AMBER(0.1)}`,
                    borderBottom: `1px solid ${AMBER(0.1)}`,
                    borderLeft: "none",
                    outline: "none",
                    color: DIMWHITE(0.8),
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/inventory/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/inventory/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s1(MCInput, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c5 = MCInput;
function InventoryPage() {
    _s2();
    useFonts();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editItem, setEditItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchItems = async ()=>{
        setLoading(true);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("inventory_items").select("*").order("created_at", {
            ascending: false
        });
        setItems(data ?? []);
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InventoryPage.useEffect": ()=>{
            fetchItems();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel("inventory-realtime").on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "inventory_items"
            }, fetchItems).subscribe();
            return ({
                "InventoryPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["InventoryPage.useEffect"];
        }
    }["InventoryPage.useEffect"], []);
    const toggleActive = async (item)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("inventory_items").update({
            is_active: !item.is_active
        }).eq("id", item.id);
    };
    const filteredItems = items.filter((item)=>`${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase()));
    const stats = {
        total: items.length,
        active: items.filter((i)=>i.is_active).length,
        low: items.filter((i)=>i.quantity_available < 10).length,
        critical: items.filter((i)=>i.quantity_available < 5).length
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
        .mc-input-container { width: 100%; max-width: 320px; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); border: 1px solid ${AMBER(0.12)}; margin-bottom: 18px; }
        .stats-item { padding: 12px 18px; border-bottom: 1px solid ${AMBER(0.12)}; }
        .stats-item:nth-child(even) { border-left: 1px solid ${AMBER(0.12)}; }
        .stats-item:nth-last-child(-n+2) { border-bottom: none; }
        
        .desktop-table { display: none; }
        .mobile-cards { display: flex; flex-direction: column; gap: 10px; }

        @media (min-width: 768px) {
          .stats-grid { display: flex; }
          .stats-item { border-bottom: none !important; border-left: 1px solid ${AMBER(0.12)}; flex: 1; }
          .stats-item:first-child { border-left: none; }
          .desktop-table { display: block; overflow-x: auto; border: 1px solid ${BORDER}; }
          .mobile-cards { display: none; }
        }

        @media (max-width: 480px) {
          .mc-input-container { max-width: none; }
          .header-flex { flex-direction: column; align-items: stretch !important; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/inventory/page.tsx",
                lineNumber: 143,
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
                                children: "SYS · INVENTORY REGISTRY"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/page.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/inventory/page.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-flex",
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 16,
                            marginBottom: 22
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed'",
                                            fontWeight: 700,
                                            fontSize: "clamp(1.6rem,4vw,2.4rem)",
                                            color: AMBER(0.9),
                                            lineHeight: 1,
                                            margin: 0
                                        },
                                        children: "Inventory"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans'",
                                            fontSize: "0.85rem",
                                            color: DIMWHITE(0.3),
                                            marginTop: 6
                                        },
                                        children: "Manage items, stock levels and availability"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/inventory/page.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowAdd(true),
                                style: {
                                    padding: "10px 20px",
                                    background: AMBER(0.9),
                                    color: BG,
                                    border: "none",
                                    fontFamily: "'IBM Plex Mono'",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.22em",
                                    fontWeight: 700,
                                    cursor: "pointer"
                                },
                                children: "+ ADD ITEM"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/page.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/inventory/page.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stats-grid",
                        children: [
                            [
                                "TOTAL",
                                stats.total
                            ],
                            [
                                "ACTIVE",
                                stats.active
                            ],
                            [
                                "LOW",
                                stats.low
                            ],
                            [
                                "CRITICAL",
                                stats.critical
                            ]
                        ].map(([l, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stats-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono'",
                                            fontSize: "0.47rem",
                                            letterSpacing: "0.22em",
                                            color: AMBER(0.35)
                                        },
                                        children: l
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed'",
                                            fontWeight: 700,
                                            fontSize: "1.25rem",
                                            color: AMBER(0.85)
                                        },
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, l, true, {
                                fileName: "[project]/app/admin/inventory/page.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/inventory/page.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 18
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                            value: search,
                            onChange: setSearch,
                            placeholder: "SEARCH ITEMS OR CATEGORY..."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/inventory/page.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/inventory/page.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'IBM Plex Mono'",
                            fontSize: "0.65rem",
                            letterSpacing: "0.25em",
                            color: AMBER(0.35)
                        },
                        children: "LOADING INVENTORY..."
                    }, void 0, false, {
                        fileName: "[project]/app/admin/inventory/page.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this) : filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                letterSpacing: "0.25em",
                                color: AMBER(0.25)
                            },
                            children: "NO ITEMS FOUND"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/inventory/page.tsx",
                            lineNumber: 233,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/inventory/page.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "desktop-table",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        fontFamily: "'IBM Plex Mono'"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    background: "rgba(255,176,0,0.05)"
                                                },
                                                children: [
                                                    "ITEM",
                                                    "CATEGORY",
                                                    "TOTAL",
                                                    "AVAILABLE",
                                                    "HEALTH",
                                                    "STATUS",
                                                    "ACTION"
                                                ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            padding: "10px 14px",
                                                            fontSize: "0.55rem",
                                                            letterSpacing: "0.22em",
                                                            color: AMBER(0.4),
                                                            textAlign: "left",
                                                            borderBottom: `1px solid ${AMBER(0.15)}`
                                                        },
                                                        children: h
                                                    }, h, false, {
                                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                            lineNumber: 242,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: filteredItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        borderBottom: `1px solid ${AMBER(0.06)}`
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 14px"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontFamily: "'IBM Plex Sans Condensed'",
                                                                        fontWeight: 700
                                                                    },
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/inventory/page.tsx",
                                                                    lineNumber: 255,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "0.55rem",
                                                                        color: AMBER(0.35)
                                                                    },
                                                                    children: item.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/inventory/page.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 14px"
                                                            },
                                                            children: item.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 14px"
                                                            },
                                                            children: item.quantity_total
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 14px"
                                                            },
                                                            children: item.quantity_available
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 14px"
                                                            },
                                                            children: health(item.quantity_available)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 14px"
                                                            },
                                                            children: item.is_active ? "ACTIVE" : "INACTIVE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: "10px 14px",
                                                                display: "flex",
                                                                gap: 10
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setEditItem(item),
                                                                    style: actionBtn(),
                                                                    children: "EDIT"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/inventory/page.tsx",
                                                                    lineNumber: 264,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>toggleActive(item),
                                                                    style: actionBtn(item.is_active ? RED(0.7) : GREEN(0.7)),
                                                                    children: item.is_active ? "DISABLE" : "ENABLE"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/inventory/page.tsx",
                                                                    lineNumber: 265,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.id, true, {
                                                    fileName: "[project]/app/admin/inventory/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/inventory/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/inventory/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/page.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mobile-cards",
                                children: filteredItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: PANEL,
                                            border: `1px solid ${BORDER}`,
                                            padding: '14px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "'IBM Plex Mono'",
                                                            fontSize: '0.5rem',
                                                            color: AMBER(0.4)
                                                        },
                                                        children: item.category?.toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "'IBM Plex Mono'",
                                                            fontSize: '0.5rem'
                                                        },
                                                        children: health(item.quantity_available)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                lineNumber: 279,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans Condensed'",
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem',
                                                    marginBottom: '4px'
                                                },
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.65rem",
                                                    color: DIMWHITE(0.4),
                                                    marginBottom: '12px'
                                                },
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                lineNumber: 284,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr',
                                                    gap: '8px',
                                                    padding: '10px 0',
                                                    borderTop: `1px solid ${AMBER(0.06)}`,
                                                    borderBottom: `1px solid ${AMBER(0.06)}`,
                                                    marginBottom: '12px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '0.5rem',
                                                                    color: AMBER(0.3)
                                                                },
                                                                children: "TOTAL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                                lineNumber: 288,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '0.9rem'
                                                                },
                                                                children: item.quantity_total
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '0.5rem',
                                                                    color: AMBER(0.3)
                                                                },
                                                                children: "AVAILABLE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                                lineNumber: 292,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '0.9rem'
                                                                },
                                                                children: item.quantity_available
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                lineNumber: 286,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setEditItem(item),
                                                        style: {
                                                            ...actionBtn(),
                                                            flex: 1,
                                                            padding: '8px'
                                                        },
                                                        children: "EDIT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleActive(item),
                                                        style: {
                                                            ...actionBtn(item.is_active ? RED(0.7) : GREEN(0.7)),
                                                            flex: 1,
                                                            padding: '8px'
                                                        },
                                                        children: item.is_active ? "DISABLE" : "ENABLE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/inventory/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/admin/inventory/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/inventory/page.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AddInventoryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        open: showAdd || !!editItem,
                        onClose: ()=>{
                            setShowAdd(false);
                            setEditItem(null);
                        },
                        item: editItem
                    }, void 0, false, {
                        fileName: "[project]/app/admin/inventory/page.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/inventory/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/inventory/page.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s2(InventoryPage, "OeBld9Zboivr4uYvZHX8ykhbGGY=", false, function() {
    return [
        useFonts
    ];
});
_c6 = InventoryPage;
/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */ const actionBtn = (color = AMBER(0.6))=>({
        background: "transparent",
        border: `1px solid ${color}`,
        color,
        padding: "4px 10px",
        fontSize: "0.55rem",
        letterSpacing: "0.2em",
        cursor: "pointer",
        fontFamily: "'IBM Plex Mono'"
    });
const health = (a)=>a < 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: RED(0.8)
        },
        children: "CRITICAL"
    }, void 0, false, {
        fileName: "[project]/app/admin/inventory/page.tsx",
        lineNumber: 338,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0)) : a < 10 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: YELLOW(0.8)
        },
        children: "LOW"
    }, void 0, false, {
        fileName: "[project]/app/admin/inventory/page.tsx",
        lineNumber: 340,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: GREEN(0.8)
        },
        children: "OK"
    }, void 0, false, {
        fileName: "[project]/app/admin/inventory/page.tsx",
        lineNumber: 341,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "YELLOW");
__turbopack_context__.k.register(_c4, "DIMWHITE");
__turbopack_context__.k.register(_c5, "MCInput");
__turbopack_context__.k.register(_c6, "InventoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_ed123d36._.js.map