module.exports = [
"[project]/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://moymftuhvkgrxsxwpcsg.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1veW1mdHVodmtncnhzeHdwY3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyNDE5MTAsImV4cCI6MjA4MTgxNzkxMH0._rLva4A1qQoA_pBLX_D3ef4Vph-I6rqBJYVIqGf5rDM"));
}),
"[project]/app/consultancy/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConsultancyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
/* ─────────────────────────────────────
   FONT INJECTION
───────────────────────────────────── */ function useFonts() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = "cons-fonts";
        if (document.getElementById(id)) return;
        const l = document.createElement("link");
        l.id = id;
        l.rel = "stylesheet";
        l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Barlow:wght@300;400;500;600&display=swap";
        document.head.prepend(l);
    }, []);
}
function ConsultancyPage() {
    useFonts();
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const formRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        full_name: "",
        email: "",
        phone: "",
        organization: "",
        service_id: "",
        budget_range: "",
        project_details: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchServices();
    }, []);
    /* ── DB logic — untouched ── */ async function fetchServices() {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("consultancy_services").select("*").eq("is_active", true);
        if (error) {
            console.error("Fetch services error:", error);
            return;
        }
        if (data) setServices(data);
        setLoading(false);
    }
    async function submitRequest() {
        if (!form.full_name || !form.email) {
            alert("Name and Email are required");
            return;
        }
        setSubmitting(true);
        const payload = {
            ...form,
            service_id: form.service_id || null
        };
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("consultation_requests").insert([
            payload
        ]);
        setSubmitting(false);
        if (error) {
            console.error("Insert error:", error);
            alert("Failed to submit request");
            return;
        }
        setSubmitted(true);
        setForm({
            full_name: "",
            email: "",
            phone: "",
            organization: "",
            service_id: "",
            budget_range: "",
            project_details: ""
        });
    }
    function engageService(id) {
        setActive((a)=>a === id ? null : id);
        setForm((f)=>({
                ...f,
                service_id: id
            }));
        setTimeout(()=>formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            }), 60);
    }
    /* ─── LOADING ─────────────────────────────────── */ if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: CSS
            }, void 0, false, {
                fileName: "[project]/app/consultancy/page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cp-root",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cp-noise",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/app/consultancy/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cp-loader",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-loader-ring"
                            }, void 0, false, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "cp-loader-txt",
                                children: "INITIALIZING · IDEA LAB CONSULTANCY"
                            }, void 0, false, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/consultancy/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/consultancy/page.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
    const ref = Date.now().toString(36).toUpperCase().slice(-6);
    /* ─── PAGE ────────────────────────────────────── */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: CSS
            }, void 0, false, {
                fileName: "[project]/app/consultancy/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cp-root",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cp-noise",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/app/consultancy/page.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "cp-hero",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-hero-glow",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-hero-dots",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-diagonal",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-hero-body",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cp-hero-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-badge",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-badge-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "FISAT AICTE IDEA Lab"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-badge-sep",
                                                        children: "·"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Open for Briefs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "cp-h1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-h1-outline",
                                                        children: "EXPERT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 17
                                                    }, this),
                                                    "CONSUL­TANCY"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "cp-hero-desc",
                                                children: "Precision-engineered solutions for your most complex challenges. Our specialists bridge the gap between vision and impact — from prototype to production."
                                            }, void 0, false, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-hero-meta",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-meta-item",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-meta-num",
                                                                children: services.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 156,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-meta-lbl",
                                                                children: "Active Services"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 157,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-meta-rule",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-meta-item",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-meta-num",
                                                                children: "24h"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-meta-lbl",
                                                                children: "Response Time"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-meta-rule",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-meta-item",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-meta-num",
                                                                children: "100%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-meta-lbl",
                                                                children: "Confidential"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 167,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cp-hero-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cp-status-card",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cp-sc-topline"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cp-sc-head",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-mono",
                                                            children: "// System Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-live",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "cp-sc-live-dot"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                                    lineNumber: 179,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "LIVE"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cp-sc-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-key",
                                                            children: "Intake"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-val cp-sc-green",
                                                            children: "OPEN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cp-sc-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-key",
                                                            children: "Services"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-val",
                                                            children: [
                                                                services.length,
                                                                " ACTIVE"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cp-sc-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-key",
                                                            children: "SLA"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "cp-sc-val",
                                                            children: "24H RESPONSE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cp-sc-divider"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "cp-sc-note",
                                                    children: "Select a service below or scroll to file a brief directly. Every submission is reviewed personally."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#cp-form",
                                                    className: "cp-sc-btn",
                                                    onClick: (e)=>{
                                                        e.preventDefault();
                                                        formRef.current?.scrollIntoView({
                                                            behavior: "smooth"
                                                        });
                                                    },
                                                    children: [
                                                        "File a Brief",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            viewBox: "0 0 14 14",
                                                            fill: "none",
                                                            width: "12",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M7 2v10M2 7l5 5 5-5",
                                                                stroke: "currentColor",
                                                                strokeWidth: "1.7",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 206,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/consultancy/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/consultancy/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "cp-services",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-sec-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cp-sec-rule"
                                    }, void 0, false, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "cp-sec-label",
                                        children: "Available Services"
                                    }, void 0, false, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cp-sec-rule"
                                    }, void 0, false, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            services.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-empty",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "cp-empty-glyph",
                                        children: "∅"
                                    }, void 0, false, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "cp-empty-txt",
                                        children: "No active services at the moment. Check back soon."
                                    }, void 0, false, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-grid",
                                children: services.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: `cp-card ${active === s.id ? "cp-card--active" : ""}`,
                                        style: {
                                            "--delay": `${i * 0.08}s`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-card-bar"
                                            }, void 0, false, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "cp-card-serial",
                                                children: String(i + 1).padStart(2, "0")
                                            }, void 0, false, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 19
                                            }, this),
                                            s.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-card-thumb",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: s.image_url,
                                                        alt: s.title,
                                                        loading: "lazy",
                                                        className: "cp-card-img"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-card-scrim"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-card-content",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "cp-card-title",
                                                        children: s.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 21
                                                    }, this),
                                                    s.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "cp-card-desc",
                                                        children: s.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 23
                                                    }, this),
                                                    s.features && s.features.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "cp-feats",
                                                        children: s.features.map((f, fi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "cp-feat",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "cp-feat-mark",
                                                                        children: "✦"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 262,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: f
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 263,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, fi, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 23
                                                    }, this),
                                                    s.contact_email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-contact",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-contact-lbl",
                                                                children: "Specialist"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-contact-name",
                                                                children: s.contact_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `mailto:${s.contact_email}`,
                                                                className: "cp-contact-email",
                                                                onClick: (e)=>e.stopPropagation(),
                                                                children: s.contact_email
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "cp-card-cta",
                                                        onClick: ()=>engageService(s.id),
                                                        children: [
                                                            active === s.id ? "Selected ✓" : "Request This Service",
                                                            active !== s.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                viewBox: "0 0 12 12",
                                                                fill: "none",
                                                                width: "11",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M2 10L10 2M10 2H4M10 2v6",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "1.5",
                                                                    strokeLinecap: "round"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/consultancy/page.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "cp-form-wrap",
                        id: "cp-form",
                        ref: formRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-form-glow",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cp-form-layout",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cp-form-lhs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-badge",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-badge-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Step 01"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-badge-sep",
                                                        children: "·"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Start Here"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "cp-form-title",
                                                children: [
                                                    "File",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "cp-form-title-outline",
                                                        children: "Your Brief."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "cp-form-desc",
                                                children: "Fill in your details and describe your project. Every brief is reviewed personally by our team and you'll hear back within one business day."
                                            }, void 0, false, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-process",
                                                children: [
                                                    {
                                                        n: "01",
                                                        label: "Submit Brief",
                                                        note: "Fill out the form"
                                                    },
                                                    {
                                                        n: "02",
                                                        label: "Team Review",
                                                        note: "Within 24 hours"
                                                    },
                                                    {
                                                        n: "03",
                                                        label: "Discovery Call",
                                                        note: "Align on scope"
                                                    },
                                                    {
                                                        n: "04",
                                                        label: "Proposal",
                                                        note: "Tailored quote"
                                                    }
                                                ].map((step, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-step",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-step-left",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "cp-step-n",
                                                                        children: step.n
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 334,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "cp-step-line"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 335,
                                                                        columnNumber: 46
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 333,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-step-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "cp-step-label",
                                                                        children: step.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 338,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "cp-step-note",
                                                                        children: step.note
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 339,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 337,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 325,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cp-form-panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-panel-topline"
                                            }, void 0, false, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 348,
                                                columnNumber: 15
                                            }, this),
                                            submitted ? /* SUCCESS */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-success",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-success-ring",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            width: "28",
                                                            height: "28",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M5 13l4 4L19 7",
                                                                stroke: "#22c55e",
                                                                strokeWidth: "2.2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 355,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "cp-success-h",
                                                        children: "Brief Received"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "cp-success-p",
                                                        children: "We've logged your consultation request. Our team will be in touch within 24 hours."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "cp-success-again",
                                                        onClick: ()=>setSubmitted(false),
                                                        children: "Submit Another Brief"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 17
                                            }, this) : /* FORM */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "cp-form",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-form-ref",
                                                        children: [
                                                            "// REF-",
                                                            ref,
                                                            "  ·  IDEA LAB CONSULTANCY"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "cp-lbl",
                                                                        children: [
                                                                            "Full Name ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "cp-req",
                                                                                children: "*"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                                lineNumber: 377,
                                                                                columnNumber: 59
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 377,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "cp-input",
                                                                        placeholder: "Your full name",
                                                                        value: form.full_name,
                                                                        onChange: (e)=>setForm({
                                                                                ...form,
                                                                                full_name: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 378,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "cp-lbl",
                                                                        children: [
                                                                            "Email Address ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "cp-req",
                                                                                children: "*"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                                lineNumber: 386,
                                                                                columnNumber: 63
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "cp-input",
                                                                        type: "email",
                                                                        placeholder: "you@example.com",
                                                                        value: form.email,
                                                                        onChange: (e)=>setForm({
                                                                                ...form,
                                                                                email: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 387,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "cp-lbl",
                                                                        children: "Phone"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 400,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "cp-input",
                                                                        placeholder: "+91 XXXXX XXXXX",
                                                                        value: form.phone,
                                                                        onChange: (e)=>setForm({
                                                                                ...form,
                                                                                phone: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "cp-lbl",
                                                                        children: "Organization"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 409,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "cp-input",
                                                                        placeholder: "Company / Institution",
                                                                        value: form.organization,
                                                                        onChange: (e)=>setForm({
                                                                                ...form,
                                                                                organization: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 410,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "cp-lbl",
                                                                        children: "Service"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 422,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "cp-sel-wrap",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                className: "cp-select",
                                                                                value: form.service_id,
                                                                                onChange: (e)=>setForm({
                                                                                        ...form,
                                                                                        service_id: e.target.value
                                                                                    }),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "",
                                                                                        children: "Select a service…"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                                        lineNumber: 429,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    services.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: s.id,
                                                                                            children: s.title
                                                                                        }, s.id, false, {
                                                                                            fileName: "[project]/app/consultancy/page.tsx",
                                                                                            lineNumber: 431,
                                                                                            columnNumber: 29
                                                                                        }, this))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                                lineNumber: 424,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "cp-sel-arrow",
                                                                                viewBox: "0 0 10 7",
                                                                                fill: "none",
                                                                                width: "10",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    d: "M1 1.5l4 4 4-4",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "1.5",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                                                    lineNumber: 435,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                                lineNumber: 434,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 423,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "cp-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "cp-lbl",
                                                                        children: "Estimated Budget"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 440,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: "cp-input",
                                                                        placeholder: "e.g. ₹50,000 – ₹2,00,000",
                                                                        value: form.budget_range,
                                                                        onChange: (e)=>setForm({
                                                                                ...form,
                                                                                budget_range: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 441,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "cp-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "cp-lbl",
                                                                children: "Project Details"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                className: "cp-textarea",
                                                                rows: 5,
                                                                placeholder: "Describe your project, goals, timeline, and any specific requirements…",
                                                                value: form.project_details,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        project_details: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 453,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "cp-chars",
                                                                children: [
                                                                    form.project_details.length,
                                                                    " chars"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/consultancy/page.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: `cp-submit${submitting ? " cp-submit--loading" : ""}`,
                                                        onClick: submitRequest,
                                                        disabled: submitting,
                                                        children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "cp-spinner"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                                    lineNumber: 471,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Submitting Brief…"
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                "Submit Consultation Request",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    viewBox: "0 0 14 14",
                                                                    fill: "none",
                                                                    width: "13",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M2 7h10M7 2l5 5-5 5",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "1.7",
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                                        lineNumber: 478,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/consultancy/page.tsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "cp-privacy",
                                                        children: "Your information is kept strictly confidential and used solely for consultation purposes."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/consultancy/page.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/consultancy/page.tsx",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/consultancy/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/consultancy/page.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/consultancy/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "cp-footer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cp-footer-inner",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cp-footer-mono",
                                    children: "// FISAT AICTE IDEA Lab · Consultancy Division"
                                }, void 0, false, {
                                    fileName: "[project]/app/consultancy/page.tsx",
                                    lineNumber: 496,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cp-footer-mono cp-footer-right",
                                    children: "Angamaly, Kerala · India"
                                }, void 0, false, {
                                    fileName: "[project]/app/consultancy/page.tsx",
                                    lineNumber: 497,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/consultancy/page.tsx",
                            lineNumber: 495,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/consultancy/page.tsx",
                        lineNumber: 494,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/consultancy/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
/* ═══════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════ */ const CSS = `

/* ── TOKENS ──────────────────────────────────────────── */
.cp-root {
  --bg:         #07090d;
  --bg-card:    #0c0f16;
  --bg-raise:   #121620;
  --border:     rgba(255,255,255,0.07);
  --border-hi:  rgba(255,176,0,0.30);
  --amber:      #FFB000;
  --amber-dim:  rgba(255,176,0,0.12);
  --amber-mid:  rgba(255,176,0,0.22);
  --green:      #22c55e;
  --text:       #E8EBF4;
  --text-mid:   rgba(232,235,244,0.52);
  --text-dim:   rgba(232,235,244,0.22);
  --mono:       'DM Mono', monospace;
  --display:    'Bebas Neue', sans-serif;
  --body:       'Barlow', sans-serif;
  --ease:       cubic-bezier(0.16,1,0.3,1);

  background: var(--bg);
  color: var(--text);
  font-family: var(--body);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* ── NOISE ───────────────────────────────────────────── */
.cp-noise {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  opacity: 0.022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px;
}

/* ── LOADER ──────────────────────────────────────────── */
.cp-loader {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px; position: relative; z-index: 2;
}
.cp-loader-ring {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1.5px solid rgba(255,176,0,0.12);
  border-top-color: var(--amber);
  animation: cp-spin 0.85s linear infinite;
}
@keyframes cp-spin { to { transform: rotate(360deg); } }
.cp-loader-txt {
  font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em;
  text-transform: uppercase; color: var(--text-dim);
}

/* ── HERO ────────────────────────────────────────────── */
.cp-hero {
  position: relative; overflow: hidden;
  padding: 96px 56px 80px;
  border-bottom: 1px solid var(--border);
}
.cp-hero-glow {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 90% at -5% 60%, rgba(255,176,0,0.065) 0%, transparent 65%),
    radial-gradient(ellipse 45% 55% at 95% 10%, rgba(255,100,0,0.045) 0%, transparent 60%);
}
.cp-hero-dots {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 60% 60% at 15% 55%, black, transparent 70%);
}
/* dramatic diagonal slash */
.cp-diagonal {
  position: absolute; right: -60px; top: -40px;
  width: 3px; height: 140%;
  background: linear-gradient(to bottom, transparent, rgba(255,176,0,0.18) 40%, rgba(255,176,0,0.06) 70%, transparent);
  transform: rotate(15deg); transform-origin: top;
  pointer-events: none;
}
.cp-hero-body {
  position: relative; z-index: 1;
  max-width: 1240px; margin: 0 auto;
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 48px; flex-wrap: wrap;
}
.cp-hero-left { flex: 1 1 460px; min-width: 0; }

/* badge */
.cp-badge {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--amber);
  margin-bottom: 22px;
}
.cp-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--amber); box-shadow: 0 0 9px var(--amber);
  animation: cp-pulse 2.6s ease-in-out infinite; flex-shrink: 0;
}
@keyframes cp-pulse { 0%,100%{opacity:1} 50%{opacity:0.28} }
.cp-badge-sep { opacity: 0.35; }

/* headline */
.cp-h1 {
  font-family: var(--display);
  font-size: clamp(4.2rem, 8.5vw, 9.5rem);
  line-height: 0.86; letter-spacing: 0.01em;
  color: #fff; margin: 0 0 24px;
}
.cp-h1-outline {
  -webkit-text-stroke: 1.5px rgba(255,176,0,0.65);
  color: transparent;
}
.cp-hero-desc {
  font-size: clamp(0.88rem, 1.4vw, 1.05rem); font-weight: 300;
  color: var(--text-mid); max-width: 500px;
  line-height: 1.75; margin-bottom: 38px;
}

/* meta strip */
.cp-hero-meta {
  display: inline-flex; align-items: center; gap: 28px;
  background: rgba(255,255,255,0.025);
  border: 1px solid var(--border);
  border-radius: 14px; padding: 16px 28px;
}
.cp-meta-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.cp-meta-num {
  font-family: var(--display); font-size: 2rem; color: var(--amber); line-height: 1;
}
.cp-meta-lbl {
  font-family: var(--mono); font-size: 8.5px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--text-dim);
}
.cp-meta-rule { width: 1px; height: 34px; background: var(--border); }

/* status card */
.cp-hero-right { flex-shrink: 0; }
.cp-status-card {
  position: relative; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: 16px;
  padding: 26px 24px; width: 280px;
  overflow: hidden;
}
.cp-sc-topline {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent 5%, var(--amber) 50%, transparent 95%);
  opacity: 0.75;
}
.cp-sc-head {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
}
.cp-sc-mono { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 0.12em; }
.cp-sc-live {
  display: flex; align-items: center; gap: 5px;
  font-family: var(--mono); font-size: 9px; color: var(--green); letter-spacing: 0.15em;
}
.cp-sc-live-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--green); box-shadow: 0 0 6px var(--green);
  animation: cp-pulse 1.8s ease-in-out infinite;
}
.cp-sc-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
}
.cp-sc-row:last-of-type { border-bottom: none; }
.cp-sc-key { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 0.1em; }
.cp-sc-val { font-family: var(--mono); font-size: 10px; color: var(--text); letter-spacing: 0.08em; }
.cp-sc-green { color: var(--green) !important; }
.cp-sc-divider { height: 1px; background: var(--border); margin: 14px 0; }
.cp-sc-note {
  font-size: 0.8rem; font-weight: 300; color: var(--text-mid);
  line-height: 1.6; margin-bottom: 16px;
}
.cp-sc-btn {
  display: flex; align-items: center; justify-content: center; gap: 7px;
  width: 100%; padding: 11px;
  background: var(--amber); color: #070809;
  border: none; border-radius: 9px;
  font-family: var(--display); font-size: 1rem; letter-spacing: 0.07em;
  cursor: pointer; text-decoration: none;
  transition: background 0.15s, transform 0.22s var(--ease), box-shadow 0.15s;
  box-shadow: 0 4px 22px rgba(255,176,0,0.22);
}
.cp-sc-btn:hover { background: #ffc020; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,176,0,0.35); }

/* ── SERVICES ────────────────────────────────────────── */
.cp-services {
  max-width: 1240px; margin: 0 auto;
  padding: 72px 56px; position: relative; z-index: 1;
}
.cp-sec-head {
  display: flex; align-items: center; gap: 18px; margin-bottom: 52px;
}
.cp-sec-rule { flex: 1; height: 1px; background: var(--border); }
.cp-sec-label {
  font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.24em;
  text-transform: uppercase; color: var(--text-dim); white-space: nowrap;
}

/* empty */
.cp-empty { text-align: center; padding: 64px 24px; }
.cp-empty-glyph { display: block; font-size: 3rem; color: var(--text-dim); margin-bottom: 14px; }
.cp-empty-txt { font-family: var(--mono); font-size: 11px; color: var(--text-dim); letter-spacing: 0.1em; }

/* grid */
.cp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
}

/* card */
.cp-card {
  position: relative; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.22s var(--ease), transform 0.3s var(--ease), box-shadow 0.3s;
  animation: cp-rise var(--ease) both;
  animation-duration: 0.55s;
  animation-delay: var(--delay, 0s);
}
@keyframes cp-rise { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }

.cp-card:hover {
  border-color: rgba(255,176,0,0.22);
  transform: translateY(-6px);
  box-shadow: 0 28px 70px rgba(0,0,0,0.55);
}
.cp-card--active {
  border-color: var(--amber) !important;
  box-shadow: 0 0 0 1px rgba(255,176,0,0.15), 0 28px 70px rgba(0,0,0,0.55) !important;
}

.cp-card-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent 5%, var(--amber) 50%, transparent 95%);
  opacity: 0;
  transition: opacity 0.22s;
}
.cp-card:hover .cp-card-bar,
.cp-card--active .cp-card-bar { opacity: 1; }

.cp-card-serial {
  position: absolute; top: 14px; right: 16px;
  font-family: var(--mono); font-size: 9.5px;
  color: var(--text-dim); letter-spacing: 0.12em;
}

/* thumbnail */
.cp-card-thumb {
  position: relative; aspect-ratio: 16/8; overflow: hidden;
}
.cp-card-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.65s var(--ease);
}
.cp-card:hover .cp-card-img { transform: scale(1.06); }
.cp-card-scrim {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 25%, var(--bg-card) 100%);
}

/* card body */
.cp-card-content { padding: 18px 20px 22px; }
.cp-card-title {
  font-family: var(--display); font-size: 1.9rem;
  letter-spacing: 0.02em; line-height: 1;
  color: #fff; margin-bottom: 10px;
}
.cp-card-desc {
  font-size: 0.84rem; font-weight: 300;
  color: var(--text-mid); line-height: 1.7; margin-bottom: 16px;
}

/* features */
.cp-feats { list-style: none; padding: 0; margin: 0 0 18px; display: flex; flex-direction: column; gap: 8px; }
.cp-feat { display: flex; align-items: flex-start; gap: 9px; font-size: 0.82rem; color: var(--text-mid); line-height: 1.55; }
.cp-feat-mark { color: var(--amber); font-size: 8.5px; flex-shrink: 0; margin-top: 3px; }

/* contact */
.cp-contact {
  display: flex; flex-direction: column; gap: 2px;
  padding: 10px 12px; margin-bottom: 18px;
  background: rgba(255,255,255,0.025);
  border: 1px solid var(--border); border-radius: 8px;
}
.cp-contact-lbl {
  font-family: var(--mono); font-size: 8px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--text-dim);
}
.cp-contact-name { font-size: 0.82rem; font-weight: 600; color: var(--text); }
.cp-contact-email {
  font-family: var(--mono); font-size: 11px; color: var(--amber);
  text-decoration: none; opacity: 0.8; transition: opacity 0.15s;
}
.cp-contact-email:hover { opacity: 1; }

/* card CTA */
.cp-card-cta {
  display: inline-flex; align-items: center; gap: 7px;
  background: var(--amber-dim); border: 1px solid var(--border-hi);
  border-radius: 8px; padding: 9px 15px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.07em; text-transform: uppercase;
  color: var(--amber); cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.cp-card-cta:hover { background: var(--amber-mid); border-color: var(--amber); }
.cp-card--active .cp-card-cta {
  background: var(--amber); color: #070809;
  border-color: var(--amber);
}

/* ── FORM SECTION ────────────────────────────────────── */
.cp-form-wrap {
  position: relative;
  border-top: 1px solid var(--border);
  padding: 80px 56px 100px; overflow: hidden;
}
.cp-form-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 80% 55% at 50% -10%, rgba(255,176,0,0.05), transparent 65%);
}

.cp-form-layout {
  position: relative; z-index: 1;
  max-width: 1240px; margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 64px; align-items: start;
}

/* LHS */
.cp-form-lhs { position: sticky; top: 84px; }
.cp-form-title {
  font-family: var(--display);
  font-size: clamp(3rem, 5vw, 5.2rem);
  line-height: 0.88; letter-spacing: 0.02em;
  color: #fff; margin: 0 0 22px;
}
.cp-form-title-outline {
  -webkit-text-stroke: 1.5px rgba(255,176,0,0.7);
  color: transparent;
}
.cp-form-desc {
  font-size: 0.88rem; font-weight: 300; color: var(--text-mid);
  line-height: 1.75; margin-bottom: 38px;
}

/* process */
.cp-process { display: flex; flex-direction: column; gap: 0; }
.cp-step { display: flex; gap: 16px; }
.cp-step-left { display: flex; flex-direction: column; align-items: center; }
.cp-step-n {
  font-family: var(--mono); font-size: 10px; color: var(--amber);
  letter-spacing: 0.1em; flex-shrink: 0;
  width: 26px; height: 26px; border-radius: 50%;
  border: 1px solid rgba(255,176,0,0.3);
  display: flex; align-items: center; justify-content: center;
  background: var(--amber-dim);
}
.cp-step-line {
  flex: 1; width: 1px; background: linear-gradient(to bottom, rgba(255,176,0,0.3), transparent);
  margin: 4px 0; min-height: 28px;
}
.cp-step-right { padding-bottom: 24px; }
.cp-step-label { display: block; font-size: 0.88rem; font-weight: 600; color: var(--text); }
.cp-step-note { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 0.08em; }

/* form panel */
.cp-form-panel {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 18px; overflow: hidden; position: relative;
}
.cp-panel-topline {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent 0%, var(--amber) 50%, transparent 100%);
  opacity: 0.65;
}

/* form internals */
.cp-form { padding: 32px 28px; display: flex; flex-direction: column; gap: 20px; }
.cp-form-ref {
  font-family: var(--mono); font-size: 9.5px; color: var(--text-dim);
  letter-spacing: 0.13em; margin-bottom: -4px;
}
.cp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cp-field { display: flex; flex-direction: column; gap: 7px; }
.cp-lbl {
  font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.17em;
  text-transform: uppercase; color: var(--text-dim);
}
.cp-req { color: var(--amber); }

.cp-input, .cp-textarea, .cp-select {
  background: rgba(255,255,255,0.035); border: 1px solid var(--border);
  border-radius: 9px; padding: 11px 14px;
  font-family: var(--mono); font-size: 12.5px; color: var(--text);
  outline: none; width: 100%;
  transition: border-color 0.17s, background 0.17s;
  box-sizing: border-box;
}
.cp-input::placeholder, .cp-textarea::placeholder { color: var(--text-dim); }
.cp-input:focus, .cp-textarea:focus, .cp-select:focus {
  border-color: var(--border-hi); background: var(--amber-dim);
}

.cp-sel-wrap { position: relative; }
.cp-select { appearance: none; cursor: pointer; padding-right: 36px; }
.cp-sel-arrow {
  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  pointer-events: none; color: var(--text-dim);
}

.cp-textarea { resize: vertical; min-height: 118px; line-height: 1.62; }
.cp-chars {
  font-family: var(--mono); font-size: 9px; color: var(--text-dim);
  text-align: right; margin-top: -4px; letter-spacing: 0.1em;
}

/* submit */
.cp-submit {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 14px 24px; border: none; border-radius: 11px;
  background: linear-gradient(130deg, #FFB000 0%, #e07000 100%);
  color: #06070a; font-family: var(--display); font-size: 1.15rem;
  letter-spacing: 0.07em; cursor: pointer;
  box-shadow: 0 4px 28px rgba(255,176,0,0.22);
  transition: opacity 0.15s, transform 0.22s var(--ease), box-shadow 0.15s;
}
.cp-submit:hover:not(:disabled) {
  opacity: 0.92; transform: translateY(-2px); box-shadow: 0 8px 36px rgba(255,176,0,0.38);
}
.cp-submit:active:not(:disabled) { transform: translateY(0); }
.cp-submit:disabled { opacity: 0.55; cursor: not-allowed; }
.cp-spinner {
  width: 13px; height: 13px; border-radius: 50%;
  border: 2px solid rgba(6,7,10,0.22); border-top-color: #06070a;
  animation: cp-spin 0.72s linear infinite; flex-shrink: 0;
}

.cp-privacy {
  font-family: var(--mono); font-size: 9.5px; color: var(--text-dim);
  text-align: center; line-height: 1.65; letter-spacing: 0.05em;
}

/* success */
.cp-success {
  padding: 52px 32px; display: flex; flex-direction: column;
  align-items: center; text-align: center; gap: 16px;
}
.cp-success-ring {
  width: 58px; height: 58px; border-radius: 50%;
  background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.28);
  display: flex; align-items: center; justify-content: center;
}
.cp-success-h {
  font-family: var(--display); font-size: 2.1rem; letter-spacing: 0.04em; color: #fff;
}
.cp-success-p {
  font-size: 0.88rem; font-weight: 300; color: var(--text-mid);
  max-width: 300px; line-height: 1.7;
}
.cp-success-again {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
  background: var(--amber-dim); border: 1px solid var(--border-hi);
  border-radius: 999px; color: var(--amber); padding: 9px 22px; cursor: pointer;
  transition: background 0.15s;
}
.cp-success-again:hover { background: var(--amber-mid); }

/* ── FOOTER ──────────────────────────────────────────── */
.cp-footer { border-top: 1px solid var(--border); padding: 20px 56px; position: relative; z-index: 1; }
.cp-footer-inner { max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
.cp-footer-mono { font-family: var(--mono); font-size: 9.5px; color: var(--text-dim); letter-spacing: 0.11em; font-style: italic; }

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════ */

/* ── TABLET 1024px ─────────── */
@media (max-width: 1024px) {
  .cp-hero       { padding: 80px 40px 64px; }
  .cp-services   { padding: 56px 40px; }
  .cp-form-wrap  { padding: 64px 40px 80px; }
  .cp-footer     { padding: 18px 40px; }

  .cp-form-layout { grid-template-columns: 300px 1fr; gap: 48px; }
  .cp-status-card { width: 260px; }
}

/* ── TABLET 860px ──────────── */
@media (max-width: 860px) {
  .cp-hero       { padding: 72px 24px 56px; }
  .cp-services   { padding: 48px 24px; }
  .cp-form-wrap  { padding: 56px 24px 72px; }
  .cp-footer     { padding: 16px 24px; }

  /* hero: stack */
  .cp-hero-body  { flex-direction: column; align-items: flex-start; gap: 32px; }
  .cp-hero-right { width: 100%; }
  .cp-status-card { width: 100%; }

  /* services: 2 col */
  .cp-grid { grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); }

  /* form: single col layout */
  .cp-form-layout { grid-template-columns: 1fr; gap: 40px; }
  .cp-form-lhs    { position: static; }

  /* flatten process steps to horizontal row */
  .cp-process     { flex-direction: row; flex-wrap: wrap; gap: 12px 24px; }
  .cp-step        { flex-direction: row; align-items: center; gap: 10px; }
  .cp-step-left   { flex-direction: row; align-items: center; }
  .cp-step-line   { display: none; }
  .cp-step-right  { padding-bottom: 0; }
}

/* ── MOBILE 640px ──────────── */
@media (max-width: 640px) {
  .cp-hero       { padding: 64px 16px 48px; }
  .cp-services   { padding: 40px 16px; }
  .cp-form-wrap  { padding: 48px 16px 64px; }
  .cp-footer     { padding: 14px 16px; }

  .cp-h1 { font-size: clamp(3.4rem, 15vw, 5.5rem); }

  .cp-hero-meta  { gap: 16px; padding: 12px 20px; }
  .cp-meta-num   { font-size: 1.75rem; }

  /* services: single column */
  .cp-grid { grid-template-columns: 1fr; }

  /* form: single column fields */
  .cp-row { grid-template-columns: 1fr; gap: 16px; }
  .cp-form { padding: 22px 18px; gap: 16px; }
  .cp-form-panel { border-radius: 14px; }
  .cp-form-title { font-size: clamp(2.8rem, 11vw, 3.8rem); }

  .cp-footer-inner { justify-content: center; text-align: center; }
  .cp-footer-right { display: none; }
}

/* ── SMALL MOBILE 400px ────── */
@media (max-width: 400px) {
  .cp-h1 { font-size: 3rem; }
  .cp-hero-meta  { flex-wrap: wrap; justify-content: center; gap: 12px; }
  .cp-meta-rule  { display: none; }
  .cp-form       { padding: 18px 14px; }
  .cp-card-content { padding: 14px 16px 18px; }
}

/* ── NO HOVER (touch) ──────── */
@media (hover: none) {
  .cp-card:hover       { transform: none; box-shadow: none; }
  .cp-sc-btn:hover     { transform: none; }
  .cp-submit:hover     { transform: none; }
}
`;
}),
];

//# sourceMappingURL=_787c3b01._.js.map