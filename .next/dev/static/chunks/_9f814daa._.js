(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/admin/AddExecomModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddExecomModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */ const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
_c = AMBER;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c1 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.18)";
/* ─────────────────────────────────────────
   CYBER INPUT
───────────────────────────────────────── */ function MCInput({ name, placeholder, value, onChange, type = "text" }) {
    _s();
    const [foc, setFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%"
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
                fileName: "[project]/components/admin/AddExecomModal.tsx",
                lineNumber: 30,
                columnNumber: 7
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
                    paddingLeft: 14,
                    paddingRight: 12,
                    paddingTop: 10,
                    paddingBottom: 10,
                    background: foc ? `rgba(255,176,0,0.04)` : "rgba(0,0,0,0.35)",
                    borderTop: `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
                    borderRight: `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
                    borderBottom: `1px solid ${foc ? AMBER(0.3) : AMBER(0.1)}`,
                    borderLeft: "none",
                    outline: "none",
                    color: DIMWHITE(0.85),
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    transition: "background 0.2s",
                    boxSizing: "border-box"
                }
            }, void 0, false, {
                fileName: "[project]/components/admin/AddExecomModal.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/AddExecomModal.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(MCInput, "5ZzhzlAmsiPR3Pie83Rc5Tpzvz4=");
_c2 = MCInput;
function AddExecomModal({ open, onClose, member = null }) {
    _s1();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        department: '',
        role: '',
        image_url: '',
        display_order: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddExecomModal.useEffect": ()=>{
            if (member) {
                setForm({
                    name: member.name,
                    department: member.designation,
                    role: member.role ?? "",
                    image_url: member.image_url || "",
                    display_order: String(member.display_order)
                });
            } else {
                setForm({
                    name: "",
                    department: "",
                    role: "",
                    image_url: "",
                    display_order: ""
                });
            }
        }
    }["AddExecomModal.useEffect"], [
        member,
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
    const handleImageUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'idea_lab_profiles');
            const res = await fetch(`https://api.cloudinary.com/v1_1/${("TURBOPACK compile-time value", "dvrc3jqve")}/image/upload`, {
                method: 'POST',
                body: data
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error?.message || 'Upload failed');
            setForm((prev)=>({
                    ...prev,
                    image_url: json.secure_url
                }));
        } catch (err) {
            console.error(err);
            alert('Image upload failed');
        } finally{
            setUploading(false);
        }
    };
    const handleSubmit = async ()=>{
        if (!form.name || !form.department) {
            alert('Please fill all required fields');
            return;
        }
        setLoading(true);
        const payload = {
            name: form.name,
            designation: form.department,
            role: form.role?.trim() || null,
            image_url: form.image_url || null,
            display_order: Number(form.display_order)
        };
        const query = member ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('execom_members').update(payload).eq('id', member.id) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('execom_members').insert({
            ...payload,
            is_active: true
        });
        const { error } = await query;
        setLoading(false);
        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }
        onClose();
    };
    const isEdit = !!member;
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
            padding: "16px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes mcblink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes shimmer { from{left:-40%} to{left:140%} }
        input[type=file] { display:none }
        .modal-scroll-area { max-height: calc(100vh - 120px); overflow-y: auto; scrollbar-width: none; }
        .modal-scroll-area::-webkit-scrollbar { display: none; }
      `
            }, void 0, false, {
                fileName: "[project]/components/admin/AddExecomModal.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: 480,
                    background: BG,
                    border: `1px solid ${BORDER}`,
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
                                animation: "shimmer 2.5s linear infinite"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/AddExecomModal.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                        lineNumber: 176,
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
                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                        lineNumber: 181,
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
                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                        lineNumber: 182,
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
                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                        lineNumber: 183,
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
                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-scroll-area",
                        style: {
                            padding: "24px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    marginBottom: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono', monospace",
                                                    fontSize: "0.52rem",
                                                    letterSpacing: "0.3em",
                                                    color: AMBER(0.4),
                                                    marginBottom: 4
                                                },
                                                children: isEdit ? "SYS · EDIT RECORD" : "SYS · NEW RECORD"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 191,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: "clamp(1.1rem, 4vw, 1.35rem)",
                                                    letterSpacing: "-0.01em",
                                                    color: AMBER(0.9),
                                                    lineHeight: 1,
                                                    margin: 0
                                                },
                                                children: isEdit ? "Edit Member" : "Add Member"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 194,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        style: {
                                            width: 28,
                                            height: 28,
                                            flexShrink: 0,
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.18)}`,
                                            color: AMBER(0.45),
                                            cursor: "pointer",
                                            fontSize: "0.75rem"
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    gap: 16,
                                    marginBottom: 24,
                                    padding: "14px",
                                    background: PANEL,
                                    border: `1px solid ${AMBER(0.1)}`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "relative",
                                            flexShrink: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 72,
                                                    height: 72,
                                                    border: `1px solid ${AMBER(0.3)}`,
                                                    overflow: "hidden",
                                                    background: AMBER(0.05),
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: form.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: form.image_url,
                                                    alt: "Preview",
                                                    style: {
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontWeight: 700,
                                                        fontSize: "1.4rem",
                                                        color: AMBER(0.3)
                                                    },
                                                    children: form.name?.charAt(0).toUpperCase() || "?"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    position: "absolute",
                                                    bottom: -4,
                                                    right: -4,
                                                    cursor: "pointer"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: handleImageUpload
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 22,
                                                            height: 22,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            background: AMBER(0.9),
                                                            color: BG,
                                                            fontSize: "0.65rem",
                                                            border: `1px solid ${AMBER(0.5)}`
                                                        },
                                                        children: "✎"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.85rem",
                                                    color: DIMWHITE(0.7),
                                                    fontWeight: 600
                                                },
                                                children: "Profile Photo"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 217,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.55rem",
                                                    color: AMBER(0.3),
                                                    fontFamily: "'IBM Plex Mono'"
                                                },
                                                children: "SQUARE · JPG/PNG"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 218,
                                                columnNumber: 15
                                            }, this),
                                            uploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.55rem",
                                                    color: AMBER(0.45),
                                                    marginTop: 4,
                                                    animation: "mcblink 0.7s infinite"
                                                },
                                                children: "UPLOADING..."
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 219,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                    marginBottom: 28
                                },
                                children: [
                                    {
                                        name: "name",
                                        label: "NAME",
                                        placeholder: "Full Name"
                                    },
                                    {
                                        name: "department",
                                        label: "DEPARTMENT",
                                        placeholder: "Designation/Branch"
                                    },
                                    {
                                        name: "role",
                                        label: "ROLE",
                                        placeholder: "e.g. Coordinator"
                                    },
                                    {
                                        name: "display_order",
                                        label: "ORDER",
                                        placeholder: "Priority (number)",
                                        type: "number"
                                    }
                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono'",
                                                    fontSize: "0.47rem",
                                                    color: AMBER(0.3),
                                                    marginBottom: 4,
                                                    paddingLeft: 14
                                                },
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 232,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MCInput, {
                                                name: f.name,
                                                placeholder: f.placeholder,
                                                value: form[f.name],
                                                onChange: handleChange,
                                                type: f.type
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 233,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, f.name, true, {
                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                lineNumber: 224,
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
                                            fontFamily: "'IBM Plex Mono'",
                                            fontSize: "0.6rem",
                                            padding: "10px 18px",
                                            background: "transparent",
                                            border: `1px solid ${AMBER(0.15)}`,
                                            color: AMBER(0.4),
                                            cursor: "pointer"
                                        },
                                        children: "CANCEL"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmit,
                                        disabled: loading || uploading,
                                        style: {
                                            flex: "1 1 auto",
                                            fontFamily: "'IBM Plex Mono'",
                                            fontSize: "0.6rem",
                                            padding: "10px 22px",
                                            background: loading || uploading ? AMBER(0.5) : AMBER(0.9),
                                            border: "none",
                                            color: BG,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            position: "relative",
                                            overflow: "hidden"
                                        },
                                        children: [
                                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: "absolute",
                                                    inset: 0,
                                                    background: `linear-gradient(to right, transparent, rgba(0,0,0,0.2), transparent)`,
                                                    animation: "shimmer 0.85s infinite"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 242,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    position: "relative",
                                                    zIndex: 1
                                                },
                                                children: loading ? "PROCESSING..." : isEdit ? "UPDATE RECORD" : "ADD TO REGISTRY"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddExecomModal.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AddExecomModal.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AddExecomModal.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/AddExecomModal.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s1(AddExecomModal, "kboIEg+hfYZA/Kmbq2Q20AfcCPA=");
_c3 = AddExecomModal;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "DIMWHITE");
__turbopack_context__.k.register(_c2, "MCInput");
__turbopack_context__.k.register(_c3, "AddExecomModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/execom/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExecomPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AddExecomModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AddExecomModal.tsx [app-client] (ecmascript)");
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
            const id = "execom-mc-fonts";
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
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
_c3 = DIMWHITE;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
/* ─────────────────────────────────────────
   MEMBER CARD
───────────────────────────────────────── */ function MemberCard({ member, onToggle, onEdit }) {
    _s1();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shortId = member.id?.toString().slice(0, 6).toUpperCase() ?? "------";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background: hov ? `rgba(255,176,0,0.05)` : PANEL,
            border: `1px solid ${hov ? AMBER(0.3) : BORDER}`,
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
                    background: `linear-gradient(to right, transparent, ${AMBER(0.6)}, transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: hov ? 2 : 1,
                    background: hov ? `linear-gradient(to bottom, transparent, ${AMBER(0.8)}, transparent)` : `linear-gradient(to bottom, transparent, ${AMBER(0.15)}, transparent)`,
                    transition: "background 0.22s, width 0.15s"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 10,
                    height: 10,
                    borderTop: `1px solid ${hov ? AMBER(0.4) : AMBER(0.15)}`,
                    borderRight: `1px solid ${hov ? AMBER(0.4) : AMBER(0.15)}`
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 52,
                            height: 52,
                            flexShrink: 0,
                            border: `1px solid ${member.is_active ? AMBER(0.3) : AMBER(0.1)}`,
                            background: AMBER(0.05),
                            overflow: "hidden",
                            position: "relative"
                        },
                        children: [
                            member.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: member.image_url,
                                alt: member.name,
                                style: {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    color: AMBER(0.4)
                                },
                                children: member.name?.charAt(0).toUpperCase() ?? "?"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            member.is_active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    bottom: 4,
                                    right: 4,
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: GREEN(0.9),
                                    boxShadow: `0 0 5px ${GREEN(0.6)}`,
                                    animation: "mcpulse 2s infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.48rem",
                                    letterSpacing: "0.2em",
                                    color: AMBER(0.25),
                                    marginBottom: 3
                                },
                                children: [
                                    "MBR·",
                                    shortId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "1.05rem",
                                    color: DIMWHITE(0.9),
                                    lineHeight: 1.1,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: member.name
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.62rem",
                                    color: AMBER(0.6),
                                    marginTop: 3,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: member.designation
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            member.role && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'IBM Plex Sans', sans-serif",
                                    fontWeight: 300,
                                    fontSize: "0.72rem",
                                    color: DIMWHITE(0.3),
                                    marginTop: 2,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: member.role
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    borderTop: `1px solid ${AMBER(0.08)}`,
                    background: "rgba(0,0,0,0.15)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 4,
                                    height: 4,
                                    borderRadius: "50%",
                                    background: member.is_active ? GREEN(0.8) : AMBER(0.2)
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.52rem",
                                    color: member.is_active ? GREEN(0.6) : AMBER(0.3)
                                },
                                children: member.is_active ? "ACTIVE" : "INACTIVE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onToggle,
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.52rem",
                                    padding: "4px 10px",
                                    background: member.is_active ? RED(0.07) : GREEN(0.07),
                                    border: `1px solid ${member.is_active ? RED(0.2) : GREEN(0.2)}`,
                                    color: member.is_active ? RED(0.8) : GREEN(0.7),
                                    cursor: "pointer"
                                },
                                children: member.is_active ? "DISABLE" : "ENABLE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onEdit,
                                style: {
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: "0.52rem",
                                    padding: "4px 10px",
                                    background: "transparent",
                                    border: `1px solid ${AMBER(0.2)}`,
                                    color: AMBER(0.55),
                                    cursor: "pointer"
                                },
                                children: "EDIT"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/execom/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s1(MemberCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c4 = MemberCard;
function ExecomPage() {
    _s2();
    useFonts();
    const [members, setMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editMember, setEditMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchFoc, setSearchFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchExecom = async ()=>{
        setLoading(true);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("execom_members").select("*").order("display_order", {
            ascending: true
        });
        setMembers(data ?? []);
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExecomPage.useEffect": ()=>{
            fetchExecom();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel("execom-realtime").on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "execom_members"
            }, fetchExecom).subscribe();
            return ({
                "ExecomPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["ExecomPage.useEffect"];
        }
    }["ExecomPage.useEffect"], []);
    const filteredMembers = members.filter((m)=>`${m.name} ${m.designation} ${m.role ?? ""}`.toLowerCase().includes(search.toLowerCase()));
    const toggleActive = async (member)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("execom_members").update({
            is_active: !member.is_active
        }).eq("id", member.id);
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
        @keyframes mcpulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes mcblink  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        input::placeholder { color: ${AMBER(0.25)}; }
        .grid-header { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .search-wrapper { position: relative; width: 100%; max-width: 360px; margin-bottom: 24px; }
        .members-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }

        @media (min-width: 768px) {
          .grid-header { flex-direction: row; align-items: flex-start; justify-content: space-between; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                style: {
                    pointerEvents: "none",
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,176,0,0.009) 3px, rgba(255,176,0,0.009) 4px)"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
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
                                children: "SYS · EXECOM REGISTRY"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right, ${AMBER(0.25)}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'IBM Plex Sans Condensed'",
                                            fontWeight: 700,
                                            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                            color: AMBER(0.9),
                                            margin: 0
                                        },
                                        children: "Execom Members"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/execom/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: "0.85rem",
                                            color: DIMWHITE(0.3),
                                            marginTop: 5
                                        },
                                        children: "Manage committee records"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/execom/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'IBM Plex Mono'",
                                            fontSize: "0.58rem",
                                            color: AMBER(0.3)
                                        },
                                        children: [
                                            filteredMembers.length,
                                            " / ",
                                            members.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/execom/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAdd(true),
                                        style: {
                                            background: AMBER(0.9),
                                            color: BG,
                                            border: "none",
                                            padding: "10px 20px",
                                            fontWeight: 700,
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.15em",
                                            cursor: "pointer"
                                        },
                                        children: "+ ADD MEMBER"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/execom/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "search-wrapper",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 2,
                                    background: searchFoc ? AMBER(0.85) : AMBER(0.18),
                                    transition: "all 0.2s"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "SEARCH MEMBER...",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                onFocus: ()=>setSearchFoc(true),
                                onBlur: ()=>setSearchFoc(false),
                                style: {
                                    width: "100%",
                                    padding: "10px 14px",
                                    background: searchFoc ? `rgba(255,176,0,0.04)` : PANEL,
                                    border: "none",
                                    borderTop: `1px solid ${AMBER(0.1)}`,
                                    borderRight: `1px solid ${AMBER(0.1)}`,
                                    borderBottom: `1px solid ${AMBER(0.1)}`,
                                    outline: "none",
                                    color: DIMWHITE(0.85),
                                    fontFamily: "'IBM Plex Mono'",
                                    fontSize: "0.7rem"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 186,
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
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono'",
                                    fontSize: "0.68rem",
                                    color: AMBER(0.35)
                                },
                                children: "LOADING REGISTRY..."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this) : filteredMembers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: "NO MEMBERS FOUND"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/execom/page.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "members-grid",
                        children: filteredMembers.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberCard, {
                                member: member,
                                onToggle: ()=>toggleActive(member),
                                onEdit: ()=>setEditMember(member)
                            }, member.id, false, {
                                fileName: "[project]/app/admin/execom/page.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/execom/page.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AddExecomModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: showAdd || !!editMember,
                onClose: ()=>{
                    setShowAdd(false);
                    setEditMember(null);
                },
                member: editMember
            }, void 0, false, {
                fileName: "[project]/app/admin/execom/page.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/execom/page.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s2(ExecomPage, "MlomWaToltHAPeAm3puO2r/qVGY=", false, function() {
    return [
        useFonts
    ];
});
_c5 = ExecomPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "AMBER");
__turbopack_context__.k.register(_c1, "GREEN");
__turbopack_context__.k.register(_c2, "RED");
__turbopack_context__.k.register(_c3, "DIMWHITE");
__turbopack_context__.k.register(_c4, "MemberCard");
__turbopack_context__.k.register(_c5, "ExecomPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_9f814daa._.js.map