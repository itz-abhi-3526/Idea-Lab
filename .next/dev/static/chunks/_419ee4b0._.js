(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://moymftuhvkgrxsxwpcsg.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1veW1mdHVodmtncnhzeHdwY3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyNDE5MTAsImV4cCI6MjA4MTgxNzkxMH0._rLva4A1qQoA_pBLX_D3ef4Vph-I6rqBJYVIqGf5rDM"));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/events/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-qr-code/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-client] (ecmascript) <export default as Ticket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
/* ─────────────────────────────────────────
   FONTS — unchanged
───────────────────────────────────────── */ function useFonts() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFonts.useEffect": ()=>{
            const id = "events-fonts";
            if (document.getElementById(id)) return;
            const l = document.createElement("link");
            l.id = id;
            l.rel = "stylesheet";
            l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600;1,700&family=Azeret+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap";
            document.head.prepend(l);
        }
    }["useFonts.useEffect"], []);
}
_s(useFonts, "OD7bBpZva5O2jO+Puf00hKivP7c=");
/* ─────────────────────────────────────────
   VIEWPORT HOOK  (SSR-safe)
   ─ Only new code added to this file.
   ─ Used solely to switch ticket layout.
───────────────────────────────────────── */ function useViewport() {
    _s1();
    const [vw, setVw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1280);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useViewport.useEffect": ()=>{
            const update = {
                "useViewport.useEffect.update": ()=>setVw(window.innerWidth)
            }["useViewport.useEffect.update"];
            update();
            window.addEventListener("resize", update, {
                passive: true
            });
            return ({
                "useViewport.useEffect": ()=>window.removeEventListener("resize", update)
            })["useViewport.useEffect"];
        }
    }["useViewport.useEffect"], []);
    return vw;
}
_s1(useViewport, "GN4bqebEoFhF5IHNzajzXHwgmOE=");
/* ─────────────────────────────────────────
   ACCENT PALETTE — unchanged
───────────────────────────────────────── */ const ACCENTS = [
    {
        hex: "#d4af37",
        rgb: "212,175,55",
        dark: true
    },
    {
        hex: "#e07b54",
        rgb: "224,123,84",
        dark: false
    },
    {
        hex: "#7eb8c9",
        rgb: "126,184,201",
        dark: false
    },
    {
        hex: "#b09a7e",
        rgb: "176,154,126",
        dark: true
    }
];
const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
];
const DAYS = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
];
function parseDate(iso) {
    const d = new Date(iso);
    return {
        raw: d,
        date: d.getDate(),
        month: MONTHS[d.getMonth()],
        day: DAYS[d.getDay()],
        year: d.getFullYear()
    };
}
/* ─────────────────────────────────────────
   GRAIN — unchanged
───────────────────────────────────────── */ function Grain() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 999,
            pointerEvents: "none",
            opacity: 0.022,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px"
        }
    }, void 0, false, {
        fileName: "[project]/app/events/page.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c = Grain;
/* ─────────────────────────────────────────
   SHIMMER TOP BAR — unchanged
───────────────────────────────────────── */ function ShimmerBar({ accentHex, accentRgb }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 2,
            position: "relative",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(90deg, transparent, ${accentHex}, rgba(${accentRgb},0.3), transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                    animation: "shimmer 3s ease-in-out infinite"
                }
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/events/page.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c1 = ShimmerBar;
/* ─────────────────────────────────────────
   PERFORATED DIVIDER
   Added `horizontal` prop for mobile.
   Original vertical path is byte-for-byte
   identical to the source.
───────────────────────────────────────── */ function Perforation({ accentRgb, horizontal = false }) {
    if (horizontal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: "relative",
                height: 1,
                width: "100%",
                flexShrink: 0
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "100%",
                    height: "2",
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        overflow: "visible"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "14",
                        y1: "1",
                        x2: "99%",
                        y2: "1",
                        stroke: `rgba(${accentRgb},0.22)`,
                        strokeWidth: "1.5",
                        strokeDasharray: "6 5"
                    }, void 0, false, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        left: -14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#080808",
                        border: "1px solid rgba(255,255,255,0.04)",
                        zIndex: 10
                    }
                }, void 0, false, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        right: -14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#080808",
                        border: "1px solid rgba(255,255,255,0.04)",
                        zIndex: 10
                    }
                }, void 0, false, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/events/page.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this);
    }
    // original — unchanged
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: 1,
            flexShrink: 0,
            alignSelf: "stretch"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "2",
                height: "100%",
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    overflow: "visible"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "1",
                    y1: "0",
                    x2: "1",
                    y2: "100%",
                    stroke: `rgba(${accentRgb},0.22)`,
                    strokeWidth: "1.5",
                    strokeDasharray: "6 5"
                }, void 0, false, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#080808",
                    border: "1px solid rgba(255,255,255,0.04)",
                    zIndex: 10
                }
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    bottom: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#080808",
                    border: "1px solid rgba(255,255,255,0.04)",
                    zIndex: 10
                }
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/events/page.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_c2 = Perforation;
/* ─────────────────────────────────────────
   TICKET FOOTER STUB
   Extracted to avoid copy-pasting across
   the three layout branches. Identical markup.
───────────────────────────────────────── */ function TicketFooter({ accent, d, event }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 32,
            borderTop: `1px solid rgba(${accent.rgb},0.06)`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 22,
            gap: 8,
            position: "relative",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    opacity: 0.04,
                    pointerEvents: "none"
                },
                children: Array.from({
                    length: 20
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Azeret Mono', monospace",
                            fontSize: 10,
                            letterSpacing: "0.4em",
                            color: accent.hex,
                            whiteSpace: "nowrap",
                            paddingRight: 24,
                            textTransform: "uppercase"
                        },
                        children: "IDEA LAB · FISAT ·"
                    }, i, false, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__["Ticket"], {
                size: 10,
                color: `rgba(${accent.rgb},0.28)`
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "'Azeret Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: `rgba(${accent.rgb},0.28)`,
                    textTransform: "uppercase",
                    position: "relative",
                    zIndex: 1
                },
                children: [
                    event.is_paid ? `Paid · ₹${event.price}` : "Complimentary",
                    " · FISAT IDEA Lab · ",
                    d.year
                ]
            }, void 0, true, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/events/page.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_c3 = TicketFooter;
/* ─────────────────────────────────────────
   MAIN INFO BODY
   Extracted so all three layout branches
   share the same markup. All style values
   are identical to the original.
───────────────────────────────────────── */ function TicketBody({ event, accent, d, isOpen, isPast, titleFontSize }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 7,
                    flexWrap: "wrap",
                    marginBottom: 13
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Azeret Mono', monospace",
                            fontSize: 9,
                            letterSpacing: "0.2em",
                            padding: "4px 11px",
                            borderRadius: 99,
                            textTransform: "uppercase",
                            background: isOpen ? "rgba(34,197,94,0.09)" : "rgba(239,68,68,0.09)",
                            color: isOpen ? "#4ade80" : "#f87171",
                            border: `1px solid ${isOpen ? "rgba(34,197,94,0.17)" : "rgba(239,68,68,0.17)"}`
                        },
                        children: isPast ? "● Concluded" : isOpen ? "● Registration Open" : "● Closed"
                    }, void 0, false, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Azeret Mono', monospace",
                            fontSize: 9,
                            letterSpacing: "0.2em",
                            padding: "4px 11px",
                            borderRadius: 99,
                            textTransform: "uppercase",
                            background: event.is_paid ? `rgba(${accent.rgb},0.09)` : "rgba(255,255,255,0.04)",
                            color: event.is_paid ? accent.hex : "rgba(255,255,255,0.32)",
                            border: `1px solid ${event.is_paid ? `rgba(${accent.rgb},0.2)` : "rgba(255,255,255,0.07)"}`
                        },
                        children: event.is_paid ? `₹${event.price}` : "Free"
                    }, void 0, false, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: titleFontSize,
                    color: "#fff",
                    lineHeight: 1.18,
                    letterSpacing: "-0.02em",
                    marginBottom: 14
                },
                children: event.title
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 7
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                size: 11,
                                color: `rgba(${accent.rgb},0.5)`
                            }, void 0, false, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 300,
                                    fontSize: 12.5,
                                    color: "rgba(255,255,255,0.36)"
                                },
                                children: new Date(event.start_datetime).toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    event.venue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 7
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                size: 11,
                                color: `rgba(${accent.rgb},0.5)`
                            }, void 0, false, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 300,
                                    fontSize: 12.5,
                                    color: "rgba(255,255,255,0.36)"
                                },
                                children: event.venue
                            }, void 0, false, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 266,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            event.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                    color: "rgba(255,255,255,0.3)",
                    lineHeight: 1.72,
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: `1px solid rgba(${accent.rgb},0.07)`,
                    maxWidth: 480,
                    margin: "14px 0 0"
                },
                children: event.description
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 280,
                columnNumber: 9
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "'Azeret Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: `rgba(${accent.rgb},0.42)`,
                    marginTop: 12,
                    textTransform: "uppercase"
                },
                children: [
                    "Registration closes ",
                    new Date(event.registration_deadline).toLocaleDateString()
                ]
            }, void 0, true, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 294,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_c4 = TicketBody;
/* ─────────────────────────────────────────
   SINGLE TICKET CARD
   `vw` is the only new prop.

   DESKTOP  ≥ 861px → original layout, zero changes
   TABLET   601–860px → horizontal, QR col hidden
   MOBILE   ≤ 600px → stacked column
───────────────────────────────────────── */ function EventTicket({ event, index, isOpen, now, vw }) {
    const accent = ACCENTS[index % ACCENTS.length];
    const d = parseDate(event.start_datetime);
    const isPast = d.raw < now;
    const isMobile = vw <= 600;
    const isTablet = vw > 600 && vw <= 860;
    /* shared outer shell — unchanged values */ const outerStyle = {
        position: "relative",
        borderRadius: 22,
        overflow: "visible",
        opacity: isPast ? 0.48 : 1,
        animation: `riseIn 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s both`
    };
    const glowStyle = {
        position: "absolute",
        inset: -1,
        borderRadius: 23,
        zIndex: 0,
        pointerEvents: "none",
        background: `linear-gradient(135deg, rgba(${accent.rgb},0.16) 0%, transparent 55%)`
    };
    const innerStyle = {
        position: "relative",
        zIndex: 1,
        borderRadius: 22,
        overflow: "hidden",
        background: "linear-gradient(155deg, #131313 0%, #0c0c0c 100%)",
        border: `1px solid rgba(${accent.rgb},0.15)`,
        boxShadow: "0 24px 64px -16px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)"
    };
    /* shared View Details button — same styles everywhere */ const viewDetailsBtn = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/events/${event.id}`,
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 18px",
            borderRadius: 99,
            textDecoration: "none",
            fontFamily: "'Azeret Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
            background: isOpen && !isPast ? `linear-gradient(135deg, rgba(${accent.rgb},0.9), rgba(${accent.rgb},0.65))` : "rgba(255,255,255,0.04)",
            color: isOpen && !isPast ? accent.dark ? "#0a0800" : "#fff" : "rgba(255,255,255,0.2)",
            border: `1px solid ${isOpen && !isPast ? `rgba(${accent.rgb},0.4)` : "rgba(255,255,255,0.06)"}`,
            boxShadow: isOpen && !isPast ? `0 4px 20px rgba(${accent.rgb},0.22)` : "none"
        },
        children: [
            "View Details ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                size: 10
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 365,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/events/page.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
    /* ══════════════════════════════════════
     MOBILE  (≤ 600px)
     Date + title side-by-side on top row,
     horizontal perforation, meta+CTA below.
     QR hidden (accessible via link).
  ══════════════════════════════════════ */ if (isMobile) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: outerStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: glowStyle
                }, void 0, false, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 378,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: innerStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBar, {
                            accentHex: accent.hex,
                            accentRgb: accent.rgb
                        }, void 0, false, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 380,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 20,
                                padding: "20px 22px 18px",
                                background: `linear-gradient(90deg, rgba(${accent.rgb},0.09) 0%, rgba(${accent.rgb},0.02) 100%)`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flexShrink: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Azeret Mono', monospace",
                                                fontSize: 9,
                                                letterSpacing: "0.28em",
                                                color: accent.hex,
                                                textTransform: "uppercase",
                                                opacity: 0.85
                                            },
                                            children: d.day
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Cormorant Garamond', serif",
                                                fontWeight: 700,
                                                fontSize: 56,
                                                lineHeight: 0.9,
                                                color: "#fff",
                                                letterSpacing: "-0.03em",
                                                margin: "6px 0 5px"
                                            },
                                            children: String(d.date).padStart(2, "0")
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Azeret Mono', monospace",
                                                fontSize: 9,
                                                letterSpacing: "0.2em",
                                                color: "rgba(255,255,255,0.32)"
                                            },
                                            children: [
                                                d.month,
                                                " '",
                                                String(d.year).slice(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 402,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 6,
                                                flexWrap: "wrap",
                                                marginBottom: 9
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Azeret Mono', monospace",
                                                        fontSize: 8,
                                                        letterSpacing: "0.16em",
                                                        padding: "3px 9px",
                                                        borderRadius: 99,
                                                        textTransform: "uppercase",
                                                        background: isOpen ? "rgba(34,197,94,0.09)" : "rgba(239,68,68,0.09)",
                                                        color: isOpen ? "#4ade80" : "#f87171",
                                                        border: `1px solid ${isOpen ? "rgba(34,197,94,0.17)" : "rgba(239,68,68,0.17)"}`
                                                    },
                                                    children: isPast ? "● Concluded" : isOpen ? "● Open" : "● Closed"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/events/page.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Azeret Mono', monospace",
                                                        fontSize: 8,
                                                        letterSpacing: "0.16em",
                                                        padding: "3px 9px",
                                                        borderRadius: 99,
                                                        textTransform: "uppercase",
                                                        background: event.is_paid ? `rgba(${accent.rgb},0.09)` : "rgba(255,255,255,0.04)",
                                                        color: event.is_paid ? accent.hex : "rgba(255,255,255,0.32)",
                                                        border: `1px solid ${event.is_paid ? `rgba(${accent.rgb},0.2)` : "rgba(255,255,255,0.07)"}`
                                                    },
                                                    children: event.is_paid ? `₹${event.price}` : "Free"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/events/page.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 410,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontFamily: "'Cormorant Garamond', serif",
                                                fontWeight: 600,
                                                fontSize: "clamp(1.05rem, 4.5vw, 1.35rem)",
                                                color: "#fff",
                                                lineHeight: 1.2,
                                                letterSpacing: "-0.02em",
                                                margin: 0
                                            },
                                            children: event.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Perforation, {
                            accentRgb: accent.rgb,
                            horizontal: true
                        }, void 0, false, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "16px 22px 20px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 7
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 7
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    size: 11,
                                                    color: `rgba(${accent.rgb},0.5)`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/events/page.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        fontWeight: 300,
                                                        fontSize: 12.5,
                                                        color: "rgba(255,255,255,0.36)"
                                                    },
                                                    children: new Date(event.start_datetime).toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/app/events/page.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 444,
                                            columnNumber: 15
                                        }, this),
                                        event.venue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 7
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    size: 11,
                                                    color: `rgba(${accent.rgb},0.5)`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/events/page.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        fontWeight: 300,
                                                        fontSize: 12.5,
                                                        color: "rgba(255,255,255,0.36)"
                                                    },
                                                    children: event.venue
                                                }, void 0, false, {
                                                    fileName: "[project]/app/events/page.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this),
                                event.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Cormorant Garamond', serif",
                                        fontWeight: 300,
                                        fontStyle: "italic",
                                        fontSize: "clamp(0.9rem, 3.8vw, 1.05rem)",
                                        color: "rgba(255,255,255,0.3)",
                                        lineHeight: 1.72,
                                        marginTop: 14,
                                        paddingTop: 14,
                                        borderTop: `1px solid rgba(${accent.rgb},0.07)`,
                                        margin: "14px 0 0"
                                    },
                                    children: event.description
                                }, void 0, false, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, this),
                                isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Azeret Mono', monospace",
                                        fontSize: 9,
                                        letterSpacing: "0.18em",
                                        color: `rgba(${accent.rgb},0.42)`,
                                        marginTop: 10,
                                        textTransform: "uppercase"
                                    },
                                    children: [
                                        "Closes ",
                                        new Date(event.registration_deadline).toLocaleDateString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 476,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/events/${event.id}`,
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 6,
                                        marginTop: 16,
                                        padding: "10px 18px",
                                        borderRadius: 99,
                                        textDecoration: "none",
                                        fontFamily: "'Azeret Mono', monospace",
                                        fontSize: 9,
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        background: isOpen && !isPast ? `linear-gradient(135deg, rgba(${accent.rgb},0.9), rgba(${accent.rgb},0.65))` : "rgba(255,255,255,0.04)",
                                        color: isOpen && !isPast ? accent.dark ? "#0a0800" : "#fff" : "rgba(255,255,255,0.2)",
                                        border: `1px solid ${isOpen && !isPast ? `rgba(${accent.rgb},0.4)` : "rgba(255,255,255,0.06)"}`,
                                        boxShadow: isOpen && !isPast ? `0 4px 20px rgba(${accent.rgb},0.22)` : "none"
                                    },
                                    children: [
                                        "View Details ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            size: 10
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 501,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 486,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketFooter, {
                            accent: accent,
                            d: d,
                            event: event
                        }, void 0, false, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 505,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 379,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/events/page.tsx",
            lineNumber: 377,
            columnNumber: 7
        }, this);
    }
    /* ══════════════════════════════════════
     TABLET  (601–860px)
     Horizontal layout, QR col hidden.
     Date col width trimmed to 96px.
  ══════════════════════════════════════ */ if (isTablet) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: outerStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: glowStyle
                }, void 0, false, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 519,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: innerStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBar, {
                            accentHex: accent.hex,
                            accentRgb: accent.rgb
                        }, void 0, false, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 521,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 96,
                                        flexShrink: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "28px 12px",
                                        gap: 2,
                                        background: `linear-gradient(180deg, rgba(${accent.rgb},0.09) 0%, rgba(${accent.rgb},0.02) 100%)`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Azeret Mono', monospace",
                                                fontSize: 9,
                                                letterSpacing: "0.28em",
                                                color: accent.hex,
                                                textTransform: "uppercase",
                                                opacity: 0.85
                                            },
                                            children: d.day
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 531,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Cormorant Garamond', serif",
                                                fontWeight: 700,
                                                fontSize: 62,
                                                lineHeight: 0.9,
                                                color: "#fff",
                                                letterSpacing: "-0.03em",
                                                margin: "8px 0 6px"
                                            },
                                            children: String(d.date).padStart(2, "0")
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 536,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Azeret Mono', monospace",
                                                fontSize: 9,
                                                letterSpacing: "0.2em",
                                                color: "rgba(255,255,255,0.32)"
                                            },
                                            children: [
                                                d.month,
                                                " '",
                                                String(d.year).slice(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 541,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 525,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Perforation, {
                                    accentRgb: accent.rgb
                                }, void 0, false, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 547,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        padding: "22px 24px 20px",
                                        minWidth: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketBody, {
                                            event: event,
                                            accent: accent,
                                            d: d,
                                            isOpen: isOpen,
                                            isPast: isPast,
                                            titleFontSize: "clamp(1.15rem, 2.8vw, 1.55rem)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 551,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: 16
                                            },
                                            children: viewDetailsBtn
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 550,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 523,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketFooter, {
                            accent: accent,
                            d: d,
                            event: event
                        }, void 0, false, {
                            fileName: "[project]/app/events/page.tsx",
                            lineNumber: 560,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/events/page.tsx",
                    lineNumber: 520,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/events/page.tsx",
            lineNumber: 518,
            columnNumber: 7
        }, this);
    }
    /* ══════════════════════════════════════
     DESKTOP  (≥ 861px)
     Original layout — zero changes.
  ══════════════════════════════════════ */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: outerStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: glowStyle
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 572,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: innerStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBar, {
                        accentHex: accent.hex,
                        accentRgb: accent.rgb
                    }, void 0, false, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 574,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 112,
                                    flexShrink: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "30px 14px",
                                    gap: 2,
                                    background: `linear-gradient(180deg, rgba(${accent.rgb},0.09) 0%, rgba(${accent.rgb},0.02) 100%)`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Azeret Mono', monospace",
                                            fontSize: 9,
                                            letterSpacing: "0.28em",
                                            color: accent.hex,
                                            textTransform: "uppercase",
                                            opacity: 0.85
                                        },
                                        children: d.day
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 585,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontWeight: 700,
                                            fontSize: 66,
                                            lineHeight: 0.9,
                                            color: "#fff",
                                            letterSpacing: "-0.03em",
                                            margin: "8px 0 6px"
                                        },
                                        children: String(d.date).padStart(2, "0")
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Azeret Mono', monospace",
                                            fontSize: 9,
                                            letterSpacing: "0.2em",
                                            color: "rgba(255,255,255,0.32)"
                                        },
                                        children: [
                                            d.month,
                                            " '",
                                            String(d.year).slice(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 595,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Perforation, {
                                accentRgb: accent.rgb
                            }, void 0, false, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 601,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    padding: "24px 28px 22px",
                                    minWidth: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketBody, {
                                    event: event,
                                    accent: accent,
                                    d: d,
                                    isOpen: isOpen,
                                    isPast: isPast,
                                    titleFontSize: "clamp(1.2rem, 2.4vw, 1.65rem)"
                                }, void 0, false, {
                                    fileName: "[project]/app/events/page.tsx",
                                    lineNumber: 605,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 156,
                                    flexShrink: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 16,
                                    padding: "24px 20px",
                                    background: "rgba(0,0,0,0.28)",
                                    borderLeft: `1px solid rgba(${accent.rgb},0.09)`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: 10,
                                            background: "#fff",
                                            borderRadius: 12,
                                            display: "inline-flex",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: `${location.origin}/events/${event.id}`,
                                            size: 72,
                                            bgColor: "#ffffff",
                                            fgColor: "#0a0a0a"
                                        }, void 0, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 624,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 620,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Azeret Mono', monospace",
                                            fontSize: 8,
                                            letterSpacing: "0.22em",
                                            color: "rgba(255,255,255,0.14)",
                                            textTransform: "uppercase",
                                            textAlign: "center"
                                        },
                                        children: "Scan to open"
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 13
                                    }, this),
                                    viewDetailsBtn
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 613,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 576,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketFooter, {
                        accent: accent,
                        d: d,
                        event: event
                    }, void 0, false, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 640,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 573,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/events/page.tsx",
        lineNumber: 571,
        columnNumber: 5
    }, this);
}
_c5 = EventTicket;
function EventsPage() {
    _s2();
    useFonts();
    const vw = useViewport();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("upcoming");
    const now = new Date();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventsPage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").select("*").order("start_datetime", {
                ascending: true
            }).then({
                "EventsPage.useEffect": ({ data })=>setEvents(data ?? [])
            }["EventsPage.useEffect"]);
        }
    }["EventsPage.useEffect"], []);
    const isOpen = (e)=>e.registration_deadline && new Date(e.registration_deadline) > now;
    const filtered = events.filter((e)=>tab === "upcoming" ? new Date(e.start_datetime) >= now : new Date(e.start_datetime) < now);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%);  }
          100% { transform: translateX(100%);  }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        * { box-sizing: border-box; }
      `
            }, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 679,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grain, {}, void 0, false, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 692,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    minHeight: "100vh",
                    background: "#080808",
                    padding: "88px 0 120px",
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "fixed",
                            top: "20%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 700,
                            height: 500,
                            pointerEvents: "none",
                            zIndex: 0,
                            background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 701,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 920,
                            margin: "0 auto",
                            padding: vw <= 400 ? "0 14px" : vw <= 640 ? "0 18px" : "0 24px",
                            position: "relative",
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 72,
                                    animation: "riseIn 0.7s cubic-bezier(0.16,1,0.3,1) both"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            marginBottom: 22
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                size: 11,
                                                color: "#d4af37"
                                            }, void 0, false, {
                                                fileName: "[project]/app/events/page.tsx",
                                                lineNumber: 720,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'Azeret Mono', monospace",
                                                    fontSize: 9,
                                                    letterSpacing: "0.38em",
                                                    color: "rgba(212,175,55,0.6)",
                                                    textTransform: "uppercase"
                                                },
                                                children: "FISAT IDEA Lab · Events & Programs"
                                            }, void 0, false, {
                                                fileName: "[project]/app/events/page.tsx",
                                                lineNumber: 721,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 719,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontWeight: 300,
                                            fontSize: "clamp(3.2rem, 8vw, 6rem)",
                                            lineHeight: 0.95,
                                            color: "rgba(255,255,255,0.88)",
                                            margin: "0 0 2px",
                                            letterSpacing: "-0.03em"
                                        },
                                        children: "Explore the"
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 727,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontWeight: 700,
                                            fontStyle: "italic",
                                            fontSize: "clamp(3.5rem, 9vw, 6.8rem)",
                                            lineHeight: 0.9,
                                            margin: "0 0 24px",
                                            letterSpacing: "-0.03em",
                                            background: "linear-gradient(135deg, #b8860b 0%, #d4af37 40%, #f5d070 65%, #d4af37 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text"
                                        },
                                        children: "Events."
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 733,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontWeight: 300,
                                            fontSize: 14.5,
                                            color: "rgba(255,255,255,0.28)",
                                            maxWidth: 360,
                                            lineHeight: 1.75,
                                            margin: 0
                                        },
                                        children: "Tickets, passes & experiences at IDEA Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 741,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 36,
                                            height: 1,
                                            background: "linear-gradient(90deg, rgba(212,175,55,0.22), transparent)",
                                            maxWidth: 200
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 749,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 715,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 4,
                                    marginBottom: 40,
                                    padding: 4,
                                    background: "rgba(255,255,255,0.03)",
                                    borderRadius: 99,
                                    width: "fit-content",
                                    border: "1px solid rgba(255,255,255,0.06)"
                                },
                                children: [
                                    "upcoming",
                                    "past"
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTab(t),
                                        style: {
                                            padding: "8px 26px",
                                            borderRadius: 99,
                                            border: "none",
                                            cursor: "pointer",
                                            fontFamily: "'Azeret Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: "0.22em",
                                            textTransform: "uppercase",
                                            transition: "all 0.25s ease",
                                            background: tab === t ? "linear-gradient(135deg, #b8860b, #d4af37)" : "transparent",
                                            color: tab === t ? "#0a0800" : "rgba(255,255,255,0.26)",
                                            boxShadow: tab === t ? "0 4px 18px rgba(212,175,55,0.25)" : "none",
                                            fontWeight: tab === t ? 500 : 300
                                        },
                                        children: t === "upcoming" ? "Upcoming" : "Past"
                                    }, t, false, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 764,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 757,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20
                                },
                                children: [
                                    filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center",
                                            padding: "72px 40px",
                                            border: "1px dashed rgba(212,175,55,0.1)",
                                            borderRadius: 22
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__["Ticket"], {
                                                size: 28,
                                                color: "rgba(212,175,55,0.15)",
                                                style: {
                                                    margin: "0 auto 14px"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/events/page.tsx",
                                                lineNumber: 792,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "'Cormorant Garamond', serif",
                                                    fontWeight: 300,
                                                    fontStyle: "italic",
                                                    color: "rgba(255,255,255,0.18)",
                                                    fontSize: 18,
                                                    margin: 0
                                                },
                                                children: [
                                                    "No ",
                                                    tab,
                                                    " events at the moment."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/events/page.tsx",
                                                lineNumber: 793,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/events/page.tsx",
                                        lineNumber: 788,
                                        columnNumber: 15
                                    }, this),
                                    filtered.map((event, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventTicket, {
                                            event: event,
                                            index: i,
                                            isOpen: !!isOpen(event),
                                            now: now,
                                            vw: vw
                                        }, event.id, false, {
                                            fileName: "[project]/app/events/page.tsx",
                                            lineNumber: 803,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/events/page.tsx",
                                lineNumber: 786,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/events/page.tsx",
                        lineNumber: 708,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/events/page.tsx",
                lineNumber: 694,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s2(EventsPage, "gEK6XhM5SZzATF1JZSeRDPm0hko=", false, function() {
    return [
        useFonts,
        useViewport
    ];
});
_c6 = EventsPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Grain");
__turbopack_context__.k.register(_c1, "ShimmerBar");
__turbopack_context__.k.register(_c2, "Perforation");
__turbopack_context__.k.register(_c3, "TicketFooter");
__turbopack_context__.k.register(_c4, "TicketBody");
__turbopack_context__.k.register(_c5, "EventTicket");
__turbopack_context__.k.register(_c6, "EventsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_419ee4b0._.js.map