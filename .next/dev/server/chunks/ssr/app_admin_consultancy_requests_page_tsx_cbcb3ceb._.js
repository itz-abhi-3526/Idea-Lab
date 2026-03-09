module.exports = [
"[project]/app/admin/consultancy/requests/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConsultationRequests
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AMBER = (a = 1)=>`rgba(255,176,0,${a})`;
const GREEN = (a = 1)=>`rgba(0,255,120,${a})`;
const DIMWHITE = (a = 1)=>`rgba(220,215,200,${a})`;
const BG = "#0a0900";
const PANEL = "rgba(255,176,0,0.03)";
const BORDER = "rgba(255,176,0,0.14)";
function ConsultationRequests() {
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchFoc, setSearchFoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [budgetFilter, setBudgetFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("desc");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchRequests();
    }, []);
    /* ── ALL ORIGINAL LOGIC — UNCHANGED ── */ async function fetchRequests() {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("consultation_requests").select("*").order("created_at", {
            ascending: false
        });
        if (error) {
            console.error("Error fetching requests:", error);
            setLoading(false);
            return;
        }
        if (data) setRequests(data);
        setLoading(false);
    }
    /* ── CSV EXPORT ── */ function exportCSV() {
        const rows = filteredSorted;
        if (!rows.length) return;
        const headers = [
            "Name",
            "Email",
            "Organization",
            "Budget Range",
            "Date"
        ];
        const body = rows.map((r)=>[
                r.full_name,
                r.email,
                r.organization ?? "",
                r.budget_range ?? "",
                new Date(r.created_at).toLocaleDateString()
            ]);
        const csv = [
            headers,
            ...body
        ].map((row)=>row.map((c)=>`"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([
            csv
        ], {
            type: "text/csv"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "consultation_requests.csv";
        a.click();
        URL.revokeObjectURL(url);
    }
    /* ── BUDGET CATEGORIES ── */ const budgetCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const cats = new Set(requests.map((r)=>r.budget_range ?? "Unspecified"));
        return [
            "All",
            ...Array.from(cats).sort()
        ];
    }, [
        requests
    ]);
    /* ── FILTER + SORT ── */ const filteredSorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = search.toLowerCase();
        return requests.filter((r)=>{
            const matchSearch = r.full_name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || (r.organization ?? "").toLowerCase().includes(q);
            const matchBudget = budgetFilter === "All" || (r.budget_range ?? "Unspecified") === budgetFilter;
            return matchSearch && matchBudget;
        }).sort((a, b)=>{
            const ta = new Date(a.created_at).getTime();
            const tb = new Date(b.created_at).getTime();
            return sortDir === "desc" ? tb - ta : ta - tb;
        });
    }, [
        requests,
        search,
        budgetFilter,
        sortDir
    ]);
    /* ── GROUP BY BUDGET ── */ const grouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = {};
        filteredSorted.forEach((r)=>{
            const key = r.budget_range ?? "Unspecified";
            if (!map[key]) map[key] = [];
            map[key].push(r);
        });
        return map;
    }, [
        filteredSorted
    ]);
    /* ── LOADING ── */ if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                background: BG,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `@keyframes mcblink{0%,100%{opacity:1}50%{opacity:0.15}}`
                }, void 0, false, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: AMBER(0.8),
                                animation: "mcblink 0.9s ease-in-out infinite"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'IBM Plex Mono',monospace",
                                fontSize: "0.68rem",
                                letterSpacing: "0.25em",
                                color: AMBER(0.35)
                            },
                            children: "LOADING REQUESTS..."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/consultancy/requests/page.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    const showGrouped = budgetFilter === "All" && !search;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: BG,
            color: DIMWHITE(0.85)
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes mcblink   { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes crsshimmer{ from{left:-40%} to{left:140%} }
        input::placeholder   { color:${AMBER(0.22)};font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.06em }
        .crstable::-webkit-scrollbar { height:3px;background:${BG} }
        .crstable::-webkit-scrollbar-thumb { background:${AMBER(0.2)} }
        @media (max-width: 768px) {
          .crs-search-wrap { max-width: 100% !important; flex-basis: 100% !important; }
        }
        @media (max-width: 600px) {
          .crs-stat-strip { flex-direction: row !important; }
          .crs-toolbar > * { width: 100% !important; min-width: 0 !important; }
          .crs-hide-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          .crs-hide-tablet { display: none !important; }
          .crs-container   { padding: 18px 14px 40px !important; }
          .crs-stat-pill   { padding: 5px 10px !important; }
        }
        @media (max-width: 768px) {
          .crs-container { padding: 22px 18px 44px !important; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "crs-container",
                style: {
                    maxWidth: 1200,
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
                                children: "SYS · CONSULTATION REQUESTS"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: 1,
                                    background: `linear-gradient(to right,${AMBER(0.25)},transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12,
                            marginBottom: 22
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
                                        children: "Consultation Requests"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 151,
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
                                        children: "Incoming consultancy enquiries"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "crs-stat-strip",
                                style: {
                                    display: "flex",
                                    gap: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatPill, {
                                        label: "TOTAL",
                                        value: requests.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatPill, {
                                        label: "FILTERED",
                                        value: filteredSorted.length,
                                        dim: filteredSorted.length === requests.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                            marginBottom: 14,
                            alignItems: "stretch"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "crs-search-wrap",
                                style: {
                                    position: "relative",
                                    flex: 1,
                                    minWidth: 200,
                                    maxWidth: 360
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: searchFoc ? 2 : 1,
                                            background: searchFoc ? `linear-gradient(to bottom,transparent,${AMBER(0.85)},transparent)` : `linear-gradient(to bottom,transparent,${AMBER(0.18)},transparent)`,
                                            transition: "all 0.18s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        style: {
                                            position: "absolute",
                                            left: 11,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            width: 12,
                                            height: 12,
                                            pointerEvents: "none"
                                        },
                                        viewBox: "0 0 16 16",
                                        fill: "none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "6.5",
                                                cy: "6.5",
                                                r: "5.25",
                                                stroke: AMBER(searchFoc ? 0.5 : 0.2),
                                                strokeWidth: "1.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "10.5",
                                                y1: "10.5",
                                                x2: "14",
                                                y2: "14",
                                                stroke: AMBER(searchFoc ? 0.5 : 0.2),
                                                strokeWidth: "1.5",
                                                strokeLinecap: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "SEARCH NAME, EMAIL, ORG...",
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        onFocus: ()=>setSearchFoc(true),
                                        onBlur: ()=>setSearchFoc(false),
                                        style: {
                                            width: "100%",
                                            paddingLeft: 30,
                                            paddingRight: 10,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            background: searchFoc ? "rgba(255,176,0,0.04)" : PANEL,
                                            borderTop: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                                            borderRight: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                                            borderBottom: `1px solid ${searchFoc ? AMBER(0.28) : AMBER(0.1)}`,
                                            borderLeft: "none",
                                            outline: "none",
                                            color: DIMWHITE(0.8),
                                            fontFamily: "'IBM Plex Mono',monospace",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.06em",
                                            transition: "background 0.2s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortBtn, {
                                sortDir: sortDir,
                                onClick: ()=>setSortDir((d)=>d === "desc" ? "asc" : "desc")
                            }, void 0, false, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExportBtn, {
                                onClick: exportCSV
                            }, void 0, false, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 5,
                            marginBottom: 20,
                            overflowX: "auto",
                            paddingBottom: 2
                        },
                        children: budgetCategories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BudgetPill, {
                                label: cat,
                                active: budgetFilter === cat,
                                onClick: ()=>setBudgetFilter(cat)
                            }, cat, false, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    filteredSorted.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.25em",
                                    color: AMBER(0.25)
                                },
                                children: "NO REQUESTS FOUND"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this) : showGrouped ? /* grouped by budget */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 18
                        },
                        children: Object.entries(grouped).map(([budget, rows])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            marginBottom: 6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                    fontSize: "0.5rem",
                                                    letterSpacing: "0.25em",
                                                    color: AMBER(0.5),
                                                    whiteSpace: "nowrap"
                                                },
                                                children: budget.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    height: 1,
                                                    background: `linear-gradient(to right,${AMBER(0.18)},transparent)`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'IBM Plex Mono',monospace",
                                                    fontSize: "0.46rem",
                                                    letterSpacing: "0.18em",
                                                    color: AMBER(0.3)
                                                },
                                                children: rows.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                                lineNumber: 210,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestTable, {
                                        rows: rows
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, budget, true, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this) : /* flat filtered table */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestTable, {
                        rows: filteredSorted
                    }, void 0, false, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
/* ── REQUEST TABLE ── */ function RequestTable({ rows }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "crstable",
        style: {
            overflowX: "auto"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            style: {
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 620
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        style: {
                            background: "rgba(0,0,0,0.4)"
                        },
                        children: [
                            "#",
                            "NAME",
                            "EMAIL",
                            "ORGANIZATION",
                            "BUDGET",
                            "DATE"
                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: h === "ORGANIZATION" ? "crs-hide-mobile" : h === "#" ? "crs-hide-tablet" : "",
                                style: {
                                    padding: "8px 14px",
                                    textAlign: "left",
                                    fontFamily: "'IBM Plex Mono',monospace",
                                    fontSize: "0.47rem",
                                    letterSpacing: "0.25em",
                                    color: AMBER(0.4),
                                    fontWeight: 400,
                                    borderBottom: `1px solid rgba(255,176,0,0.1)`,
                                    whiteSpace: "nowrap"
                                },
                                children: h
                            }, h, false, {
                                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                                lineNumber: 233,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rows.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestRow, {
                            req: r,
                            index: i
                        }, r.id, false, {
                            fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 239,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/consultancy/requests/page.tsx",
            lineNumber: 229,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
/* ── REQUEST ROW ── */ function RequestRow({ req: r, index }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const shortId = r.id.slice(0, 6).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            borderBottom: `1px solid rgba(255,176,0,0.05)`,
            background: hov ? "rgba(255,176,0,0.03)" : index % 2 === 0 ? "transparent" : "rgba(255,176,0,0.012)",
            transition: "background 0.18s"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "crs-hide-tablet",
                style: {
                    padding: "9px 14px",
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.5rem",
                    letterSpacing: "0.15em",
                    color: AMBER(0.25)
                },
                children: String(index + 1).padStart(2, "0")
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    padding: "9px 14px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'IBM Plex Sans Condensed',sans-serif",
                            fontWeight: 600,
                            fontSize: "0.92rem",
                            color: DIMWHITE(0.88)
                        },
                        children: r.full_name
                    }, void 0, false, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'IBM Plex Mono',monospace",
                            fontSize: "0.44rem",
                            letterSpacing: "0.15em",
                            color: AMBER(0.25),
                            marginTop: 1
                        },
                        children: [
                            "REQ·",
                            shortId
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    padding: "9px 14px",
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.6rem",
                    color: AMBER(0.5)
                },
                children: r.email
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "crs-hide-mobile",
                style: {
                    padding: "9px 14px",
                    fontFamily: "'IBM Plex Sans',sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: DIMWHITE(0.45)
                },
                children: r.organization ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: AMBER(0.2)
                    },
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 269,
                    columnNumber: 28
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    padding: "9px 14px"
                },
                children: r.budget_range ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "'IBM Plex Mono',monospace",
                        fontSize: "0.5rem",
                        letterSpacing: "0.14em",
                        padding: "2px 8px",
                        color: AMBER(0.75),
                        background: AMBER(0.06),
                        border: `1px solid ${AMBER(0.2)}`
                    },
                    children: r.budget_range
                }, void 0, false, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 273,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "'IBM Plex Mono',monospace",
                        fontSize: "0.5rem",
                        color: AMBER(0.2)
                    },
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 274,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                style: {
                    padding: "9px 14px",
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.55rem",
                    color: AMBER(0.35),
                    whiteSpace: "nowrap"
                },
                children: new Date(r.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                })
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
        lineNumber: 254,
        columnNumber: 5
    }, this);
}
/* ── STAT PILL ── */ function StatPill({ label, value, dim = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "crs-stat-pill",
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "7px 14px",
            border: `1px solid ${AMBER(0.12)}`,
            background: PANEL
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: dim ? AMBER(0.3) : AMBER(0.85),
                    lineHeight: 1
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.42rem",
                    letterSpacing: "0.22em",
                    color: AMBER(0.28),
                    marginTop: 3
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
/* ── BUDGET PILL ── */ function BudgetPill({ label, active, onClick }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            fontFamily: "'IBM Plex Mono',monospace",
            fontSize: "0.48rem",
            letterSpacing: "0.18em",
            padding: "4px 12px",
            background: active ? AMBER(0.9) : hov ? AMBER(0.06) : "transparent",
            border: `1px solid ${active ? AMBER(0.9) : hov ? AMBER(0.3) : AMBER(0.15)}`,
            color: active ? BG : hov ? AMBER(0.8) : AMBER(0.4),
            cursor: "pointer",
            fontWeight: active ? 600 : 400,
            transition: "all 0.18s"
        },
        children: label.toUpperCase()
    }, void 0, false, {
        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
        lineNumber: 298,
        columnNumber: 5
    }, this);
}
/* ── SORT BUTTON ── */ function SortBtn({ sortDir, onClick }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'IBM Plex Mono',monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            padding: "8px 14px",
            background: hov ? AMBER(0.06) : PANEL,
            borderTop: `1px solid ${hov ? AMBER(0.28) : AMBER(0.12)}`,
            borderRight: `1px solid ${hov ? AMBER(0.28) : AMBER(0.12)}`,
            borderBottom: `1px solid ${hov ? AMBER(0.28) : AMBER(0.12)}`,
            borderLeft: "none",
            color: hov ? AMBER(0.8) : AMBER(0.45),
            cursor: "pointer",
            transition: "all 0.18s",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: `linear-gradient(to bottom,transparent,${AMBER(hov ? 0.6 : 0.2)},transparent)`,
                    transition: "background 0.18s"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this),
            sortDir === "desc" ? "↓ NEWEST" : "↑ OLDEST"
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
        lineNumber: 311,
        columnNumber: 5
    }, this);
}
/* ── EXPORT BUTTON ── */ function ExportBtn({ onClick }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'IBM Plex Mono',monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            padding: "8px 14px",
            background: hov ? AMBER(0.07) : "transparent",
            borderTop: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`,
            borderRight: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`,
            borderBottom: `1px solid ${hov ? AMBER(0.35) : AMBER(0.18)}`,
            borderLeft: "none",
            color: hov ? AMBER(0.85) : AMBER(0.5),
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.18s"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: `linear-gradient(to bottom,transparent,${AMBER(hov ? 0.7 : 0.25)},transparent)`,
                    transition: "background 0.18s"
                }
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                style: {
                    width: 11,
                    height: 11
                },
                viewBox: "0 0 14 14",
                fill: "none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M7 2v8M3 7l4 4 4-4M2 12h10",
                    stroke: "currentColor",
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: "EXPORT CSV"
            }, void 0, false, {
                fileName: "[project]/app/admin/consultancy/requests/page.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/consultancy/requests/page.tsx",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_admin_consultancy_requests_page_tsx_cbcb3ceb._.js.map