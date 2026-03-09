(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/machinery/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MachineryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
"use client";
;
;
function useFonts() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFonts.useEffect": ()=>{
            const id = "machinery-fonts";
            if (document.getElementById(id)) return;
            const l = document.createElement("link");
            l.id = id;
            l.rel = "stylesheet";
            l.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap";
            document.head.prepend(l);
        }
    }["useFonts.useEffect"], []);
}
_s(useFonts, "OD7bBpZva5O2jO+Puf00hKivP7c=");
const MACHINES = [
    {
        id: "M-001",
        name: "Bambu Lab X1 Carbon",
        tag: "FDM 3D PRINTER",
        headline: "Dual automated bed leveling for doubly guaranteed prints.",
        image: "https://portal.bblmw.com/x1/ai_dual.png",
        description: "Bambu Lab X1 utilizes two sets of independent sensors and an algorithm to measure the height of the nozzle relative to the bed. The lidar and analog force sensors crosscheck for an extra layer of redundancy in bed leveling.",
        specs: [
            "300 mm/s",
            "256×256×256mm",
            "0.05mm precision"
        ],
        features: [
            {
                name: "CoreXY Motion",
                description: "Industrial-speed movement exceeding 300mm/s with sub-200-micron accuracy across complex geometries."
            },
            {
                name: "Multi-Material Support",
                description: "Engineering-grade polymers and fiber-reinforced composites with closed-loop filament monitoring."
            }
        ]
    },
    {
        id: "M-002",
        name: "Creality K1 Max",
        tag: "LARGE FORMAT FDM",
        headline: "Expanded workspace for large-scale production components.",
        image: "https://res.cloudinary.com/dudp2imxs/image/upload/v1768479850/k1-chassis_t6epbg.png",
        description: "The Creality K1 Max extends additive manufacturing with an exceptional 420x420x500mm build volume, enabling single-run production of large structural components and complete assemblies without segmentation.",
        specs: [
            "600 mm/s",
            "420x420x500mm",
            "0.1mm precision"
        ],
        features: [
            {
                name: "Extended Build Volume",
                description: "420x420x500mm workspace for architectural models and large mechanical prototypes in one piece."
            },
            {
                name: "Heated Chamber",
                description: "Superior layer adhesion and minimal warping for large-scale fabrication with open material ecosystem."
            }
        ]
    },
    {
        id: "M-003",
        name: "Elegoo Saturn 4 Ultra",
        tag: "MSLA RESIN PRINTER",
        headline: "16K monochrome resolution with unmatched surface quality.",
        image: "https://res.cloudinary.com/dudp2imxs/image/upload/v1768479850/404_tm2qvy.jpg",
        description: "The Elegoo Saturn 4 introduces monochrome 4K resolution with 16K pixel density, delivering unprecedented surface finish quality and micro-detail preservation for optical and mechanical precision.",
        specs: [
            "16K pixels",
            "218x122x220mm",
            "0.019mm XY"
        ],
        features: [
            {
                name: "16K Resolution",
                description: "Sub-50-micron feature definition with advanced exposure algorithms and dynamic LED array technology."
            },
            {
                name: "High-Speed Curing",
                description: "Consistent exposure across the entire build platform, eliminating artifacts while maintaining precision."
            }
        ]
    },
    {
        id: "M-004",
        name: "Laser Cutting System",
        tag: "CO2 LASER FABRICATOR",
        headline: "Precision cutting and engraving across unlimited materials.",
        image: "https://cdn.canadianmetalworking.com/a/maximizing-laser-cutting-performance-1699648217.jpg?size=1000x",
        description: "Our laser fabrication system delivers precision cutting and engraving across acrylic, wood, leather, and anodized metals. Direct CAD-to-cut workflow eliminates tooling overhead, reducing iteration time from days to hours.",
        specs: [
            "+-0.1mm accuracy",
            "900x600mm bed",
            "80W CO2"
        ],
        features: [
            {
                name: "Material Versatility",
                description: "CO2 and fiber laser configurations optimized for acrylic, wood, leather, metals, and specialty materials."
            },
            {
                name: "CAD Integration",
                description: "Direct workflow from design software eliminates tooling overhead with clean cuts and minimal thermal distortion."
            }
        ]
    },
    {
        id: "M-005",
        name: "Sublimation Printer",
        tag: "DYE SUBLIMATION",
        headline: "Photographic-quality color transfer with permanent results.",
        image: "https://abhishekid.com/cdn/shop/files/219-Mug-Printing-Machine-Sublimation-Mug-Machine-With-Meter-Coil-11-oz_7c28ab3d-73b3-4bdd-b32e-ae5d17f70520.png?v=1729015248&width=1920",
        description: "The sublimation printing system enables permanent, photographic-quality color transfer onto polyester, ceramic, and coated substrates. Sublimation creates fade-resistant prints integrated into the material structure itself.",
        specs: [
            "2400x1200 DPI",
            "Full-color",
            "180-220 C"
        ],
        features: [
            {
                name: "Full-Color Gradients",
                description: "Photo-realistic imaging with dynamic temperature and pressure optimization for material-specific results."
            },
            {
                name: "Rapid Turnaround",
                description: "Perfect for merchandise prototyping, branded samples, and custom applications requiring professional finish."
            }
        ]
    },
    {
        id: "M-006",
        name: "Precision Plotter",
        tag: "VINYL CUTTER",
        headline: "Vinyl and flex-material cutting with 0.25mm accuracy.",
        image: "https://img.directindustry.com/images_di/photo-mg/168629-11072005.jpg",
        description: "The precision plotter combines cutting accuracy within 0.25mm with real-time contour following. Supports 12-60 inch material widths for everything from precise labels to large-format applications.",
        specs: [
            "+-0.25mm",
            "12-60 inch width",
            "Servo motor"
        ],
        features: [
            {
                name: "Servo Motor Control",
                description: "Optical registration ensures flawless reproduction of vector designs for decals and architectural graphics."
            },
            {
                name: "Wide Format Range",
                description: "12-60 inch material widths enable multi-layer assemblies without manual intervention or segmentation."
            }
        ]
    },
    {
        id: "M-007",
        name: "PCB Milling Machine",
        tag: "CIRCUIT FABRICATION",
        headline: "Direct mechanical circuit fabrication without chemical processes.",
        image: "https://www.elepcb.com/wp-content/uploads/2024/06/PCB-Milling-e1718613681541.jpeg",
        description: "The PCB milling system eliminates chemical etching, enabling direct mechanical drilling and routing. Achieves 0.1mm trace spacing with sub-100-micron positional accuracy for rapid circuit prototyping.",
        specs: [
            "0.1mm traces",
            "+-0.05mm accuracy",
            "Chemical-free"
        ],
        features: [
            {
                name: "Chemical-Free Process",
                description: "Eliminates hazardous processes while reducing fabrication time from weeks to days with direct mechanical routing."
            },
            {
                name: "Multi-Layer Support",
                description: "Via drilling, trace routing, and edge profiling in a single setup for complete custom circuit fabrication."
            }
        ]
    },
    {
        id: "M-008",
        name: "Kavone KNC 2513",
        tag: "CNC ROUTER",
        headline: "3-axis subtractive precision across wood, acrylic, foam, and non-ferrous metals.",
        image: "https://5.imimg.com/data5/NA/YN/MY-6935283/atc-cnc-router-model-knl3015.jpg",
        description: "The Kavone KNC 2513 is a heavy-duty 3-axis CNC router with a 2500x1300mm working bed and a 3.5 kW water-cooled spindle. Helical rack-and-pinion drive on X and Y axes paired with ballscrew-driven Z delivers consistent 0.1mm repeatability across full-sheet runs — acrylic, MDF, PVC foam, granite, bakelite, and aluminium composites. DSP digital control with USB offline capability keeps production uninterrupted.",
        specs: [
            "2500x1300x300mm",
            "3.5 kW spindle",
            "+-0.1mm repeatability"
        ],
        features: [
            {
                name: "Helical Rail Drive",
                description: "X and Y axes run on precision helical rack-and-pinion rails; Z axis uses ballscrew transmission — minimising backlash for clean, repeatable cuts across full-sheet stock."
            },
            {
                name: "Broad Material Range",
                description: "Cuts, engraves, and 3D-carves acrylic, MDF, PVC foam, wood, granite, bakelite, and aluminium composites in a single setup — from signage panels to furniture components."
            }
        ]
    }
];
function Grain() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes grain {
          0%,100%{transform:translate(0,0)}   10%{transform:translate(-2%,-3%)}
          20%{transform:translate(1%,2%)}     30%{transform:translate(-3%,1%)}
          40%{transform:translate(2%,-1%)}    50%{transform:translate(-1%,3%)}
          60%{transform:translate(3%,-2%)}    70%{transform:translate(-2%,1%)}
          80%{transform:translate(1%,-3%)}    90%{transform:translate(-1%,2%)}
        }
        .mach-grain { animation: grain .65s steps(1) infinite; will-change: transform; }
      `
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "mach-grain fixed inset-0 z-[9990] pointer-events-none opacity-[0.022]",
                style: {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                }
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = Grain;
function Scanlines() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        className: "fixed inset-0 z-[9989] pointer-events-none opacity-[0.012]",
        style: {
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
            willChange: "auto"
        }
    }, void 0, false, {
        fileName: "[project]/app/machinery/page.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
_c1 = Scanlines;
function MachineCursor() {
    _s1();
    const px = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(-200);
    const py = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(-200);
    const rx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(px, {
        stiffness: 90,
        damping: 22
    });
    const ry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(py, {
        stiffness: 90,
        damping: 22
    });
    const [big, setBig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MachineCursor.useEffect": ()=>{
            if (window.matchMedia("(pointer:coarse)").matches) return;
            setShow(true);
            const mv = {
                "MachineCursor.useEffect.mv": (e)=>{
                    px.set(e.clientX);
                    py.set(e.clientY);
                }
            }["MachineCursor.useEffect.mv"];
            const ov = {
                "MachineCursor.useEffect.ov": (e)=>{
                    if (e.target?.closest("a,button,img")) setBig(true);
                }
            }["MachineCursor.useEffect.ov"];
            const ou = {
                "MachineCursor.useEffect.ou": (e)=>{
                    if (e.target?.closest("a,button,img")) setBig(false);
                }
            }["MachineCursor.useEffect.ou"];
            window.addEventListener("mousemove", mv, {
                passive: true
            });
            document.addEventListener("mouseover", ov);
            document.addEventListener("mouseout", ou);
            return ({
                "MachineCursor.useEffect": ()=>{
                    window.removeEventListener("mousemove", mv);
                    document.removeEventListener("mouseover", ov);
                    document.removeEventListener("mouseout", ou);
                }
            })["MachineCursor.useEffect"];
        }
    }["MachineCursor.useEffect"], [
        px,
        py
    ]);
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `* { cursor: none !important; }`
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference",
                style: {
                    x: px,
                    y: py,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: big ? 48 : 8,
                    height: big ? 48 : 8,
                    transition: "width .2s, height .2s"
                }
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-orange-500/40",
                style: {
                    x: rx,
                    y: ry,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: big ? 72 : 32,
                    height: big ? 72 : 32,
                    transition: "width .25s, height .25s"
                }
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(MachineCursor, "Sh516Y8BUOeFfjIm+bBP/0LUfYU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c2 = MachineCursor;
function HeroSection() {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        target: ref,
        offset: [
            "start start",
            "end start"
        ]
    });
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.6
    ], [
        1,
        0
    ]);
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.6
    ], [
        1,
        0.94
    ]);
    const titleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.6
    ], [
        0,
        100
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: "relative h-screen w-full overflow-hidden flex items-center justify-center",
        style: {
            background: "hsl(var(--background))"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "absolute inset-0 pointer-events-none overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            x: [
                                0,
                                80,
                                0
                            ],
                            y: [
                                0,
                                60,
                                0
                            ]
                        },
                        transition: {
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        className: "absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px]",
                        style: {
                            willChange: "transform"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            x: [
                                0,
                                -80,
                                0
                            ],
                            y: [
                                0,
                                -80,
                                0
                            ]
                        },
                        transition: {
                            duration: 28,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        className: "absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-3xl",
                        style: {
                            willChange: "transform"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
          @keyframes linesIn {
            from { transform: scaleY(0); }
            to   { transform: scaleY(1); }
          }
          .hero-vline {
            position: absolute; top: 0; bottom: 0; width: 1px;
            background: rgba(255,255,255,0.04);
            transform-origin: top;
            animation: linesIn 1.6s cubic-bezier(0.16,1,0.3,1) both;
          }
        `
                    }, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    [
                        15,
                        30,
                        50,
                        70,
                        85
                    ].map((pct)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-vline",
                            style: {
                                left: `${pct}%`,
                                animationDelay: `${pct / 100}s`
                            }
                        }, pct, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                style: {
                    opacity,
                    scale
                },
                className: "relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    style: {
                        y: titleY
                    },
                    className: "space-y-4 sm:space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 16
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.7,
                                delay: 0.2
                            },
                            className: "flex items-center justify-center gap-2 sm:gap-4 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        width: 0
                                    },
                                    animate: {
                                        width: 48
                                    },
                                    transition: {
                                        duration: 0.9,
                                        delay: 0.4
                                    },
                                    className: "h-px bg-orange-500/60 hidden sm:block"
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-orange-500/80 text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.35em] uppercase font-medium text-center",
                                    style: {
                                        fontFamily: "'Barlow Condensed', sans-serif"
                                    },
                                    children: "Precision Manufacturing Ecosystem"
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        width: 0
                                    },
                                    animate: {
                                        width: 48
                                    },
                                    transition: {
                                        duration: 0.9,
                                        delay: 0.4
                                    },
                                    className: "h-px bg-orange-500/60 hidden sm:block"
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                                initial: {
                                    y: "105%"
                                },
                                animate: {
                                    y: "0%"
                                },
                                transition: {
                                    duration: 0.9,
                                    delay: 0.35,
                                    ease: [
                                        0.16,
                                        1,
                                        0.3,
                                        1
                                    ]
                                },
                                style: {
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(3rem, 12vw, 9rem)",
                                    lineHeight: 0.9,
                                    letterSpacing: "-0.02em",
                                    color: "#ffffff"
                                },
                                children: [
                                    "THE LAB'S",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "hsl(var(--accent))",
                                            WebkitTextStroke: "0px"
                                        },
                                        children: "ARSENAL"
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 370,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/machinery/page.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 362,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 12
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.7,
                                delay: 0.72
                            },
                            className: "space-y-4 sm:space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/40 max-w-lg mx-auto leading-relaxed px-2",
                                    style: {
                                        fontFamily: "'Barlow', sans-serif",
                                        fontWeight: 300,
                                        fontSize: "clamp(0.82rem, 2.5vw, 1.05rem)"
                                    },
                                    children: "From additive manufacturing to laser precision every machine in the lab is purpose-built to collapse the gap between idea and reality. Scroll through each to explore what it does."
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "flex flex-wrap justify-center gap-1.5 sm:gap-2 px-4",
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        duration: 0.6,
                                        delay: 1
                                    },
                                    children: MACHINES.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            initial: {
                                                opacity: 0,
                                                scale: 0.88
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            transition: {
                                                duration: 0.4,
                                                delay: 1.05 + i * 0.07
                                            },
                                            className: "px-2.5 py-1 rounded-sm border border-white/8 text-white/28 text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase",
                                            style: {
                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                background: "rgba(255,255,255,0.025)"
                                            },
                                            children: m.tag
                                        }, m.id, false, {
                                            fileName: "[project]/app/machinery/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                delay: 1.4
                            },
                            className: "flex flex-col items-center gap-2 pt-4 sm:pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/25 text-[10px] tracking-[0.3em] uppercase",
                                    style: {
                                        fontFamily: "'Barlow Condensed', sans-serif"
                                    },
                                    children: "Scroll to explore"
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: {
                                        y: [
                                            0,
                                            8,
                                            0
                                        ]
                                    },
                                    transition: {
                                        duration: 1.8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    className: "w-5 h-9 rounded-full border border-white/15 flex items-center justify-center",
                                    style: {
                                        willChange: "transform"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        animate: {
                                            y: [
                                                0,
                                                5,
                                                0
                                            ]
                                        },
                                        transition: {
                                            duration: 1.8,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        className: "w-[3px] h-[6px] rounded-full bg-orange-500",
                                        style: {
                                            willChange: "transform"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/machinery/page.tsx",
                    lineNumber: 347,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/machinery/page.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
_s2(HeroSection, "kviHwJOkt7LD9NAR+aRBled0INQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c3 = HeroSection;
function useIsTouch() {
    _s3();
    const [touch, setTouch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsTouch.useEffect": ()=>{
            setTouch(window.matchMedia("(pointer:coarse)").matches);
        }
    }["useIsTouch.useEffect"], []);
    return touch;
}
_s3(useIsTouch, "8RK2sPWHvLOmP+RmA0P61M0/vNA=");
function MachineSection({ machine, index, setActive }) {
    _s4();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isEven = index % 2 === 0;
    const isTouch = useIsTouch();
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        target: ref,
        offset: [
            "start end",
            "end start"
        ]
    });
    const imgScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        0.92,
        1.06
    ]);
    const imgYRaw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        40,
        -40
    ]);
    const imgScaleSpring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(imgScale, {
        stiffness: 100,
        damping: 28
    });
    const imgYSpring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(imgYRaw, {
        stiffness: 100,
        damping: 28
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MachineSection.useEffect": ()=>{
            const unsub = scrollYProgress.on("change", {
                "MachineSection.useEffect.unsub": (v)=>{
                    if (v > 0.28 && v < 0.72) setActive(index);
                }
            }["MachineSection.useEffect.unsub"]);
            return ({
                "MachineSection.useEffect": ()=>unsub()
            })["MachineSection.useEffect"];
        }
    }["MachineSection.useEffect"], [
        scrollYProgress,
        index,
        setActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: "relative min-h-screen py-16 sm:py-20 lg:py-32 flex items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: index % 2 === 0 ? "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(249,115,22,0.04), transparent)" : "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(249,115,22,0.04), transparent)"
                }
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: isEven ? -20 : 20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: true,
                            margin: "-80px"
                        },
                        transition: {
                            duration: 0.6,
                            ease: [
                                0.16,
                                1,
                                0.3,
                                1
                            ]
                        },
                        className: `mb-8 sm:mb-10 flex flex-col gap-2 ${isEven ? "" : "sm:items-end"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-2 sm:gap-3 flex-wrap ${isEven ? "" : "sm:flex-row-reverse"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2.5 py-1 border border-orange-500/30 rounded-sm text-orange-500/60 text-[10px] tracking-[0.3em]",
                                        style: {
                                            fontFamily: "'Share Tech Mono', monospace"
                                        },
                                        children: machine.id
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-3.5 bg-white/12"
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/18",
                                        style: {
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontWeight: 400,
                                            fontSize: "0.72rem",
                                            letterSpacing: "0.22em"
                                        },
                                        children: String(index + 1).padStart(2, "0")
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-3.5 bg-white/12"
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-500/50 text-[10px] tracking-[0.28em] uppercase",
                                        style: {
                                            fontFamily: "'Barlow Condensed', sans-serif"
                                        },
                                        children: machine.tag
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 440,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/machinery/page.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(2rem, 6vw, 4.8rem)",
                                    lineHeight: 0.9,
                                    letterSpacing: "-0.02em",
                                    color: "#ffffff"
                                },
                                children: machine.name
                            }, void 0, false, {
                                fileName: "[project]/app/machinery/page.tsx",
                                lineNumber: 442,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:grid-flow-dense"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: `space-y-6 sm:space-y-8 ${isEven ? "" : "lg:col-start-2"}`,
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: true,
                                    margin: "-60px"
                                },
                                transition: {
                                    duration: 0.7,
                                    ease: [
                                        0.16,
                                        1,
                                        0.3,
                                        1
                                    ]
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/55 leading-relaxed",
                                        style: {
                                            fontFamily: "'Barlow', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "clamp(0.95rem, 2vw, 1.2rem)"
                                        },
                                        children: machine.headline
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 448,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: machine.specs.map((spec, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-3 py-1 rounded-sm border border-orange-500/20 text-orange-400/70 text-[11px] sm:text-xs tracking-widest",
                                                style: {
                                                    fontFamily: "'Share Tech Mono', monospace",
                                                    background: "rgba(249,115,22,0.05)"
                                                },
                                                children: spec
                                            }, i, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 449,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/40 leading-relaxed",
                                        style: {
                                            fontFamily: "'Barlow', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "clamp(0.83rem, 1.6vw, 1rem)"
                                        },
                                        children: machine.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 pt-1",
                                        children: machine.features.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: isEven ? -16 : 16
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    duration: 0.55,
                                                    delay: i * 0.08,
                                                    ease: [
                                                        0.16,
                                                        1,
                                                        0.3,
                                                        1
                                                    ]
                                                },
                                                whileHover: isTouch ? undefined : {
                                                    x: isEven ? 6 : -6
                                                },
                                                className: "relative group rounded-xl border border-white/8 p-3.5 sm:p-4 overflow-hidden",
                                                style: {
                                                    background: "rgba(255,255,255,0.025)",
                                                    backdropFilter: "blur(12px)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-gradient-to-r from-orange-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/machinery/page.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/machinery/page.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "relative z-10 text-orange-400/80 mb-1.5",
                                                        style: {
                                                            fontFamily: "'Barlow Condensed', sans-serif",
                                                            fontWeight: 600,
                                                            fontSize: "clamp(0.88rem, 1.6vw, 1.05rem)",
                                                            letterSpacing: "0.04em"
                                                        },
                                                        children: f.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/machinery/page.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "relative z-10 text-white/40 leading-relaxed",
                                                        style: {
                                                            fontFamily: "'Barlow', sans-serif",
                                                            fontWeight: 300,
                                                            fontSize: "0.85rem"
                                                        },
                                                        children: f.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/machinery/page.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 455,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/machinery/page.tsx",
                                lineNumber: 447,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: isTouch ? {} : {
                                    scale: imgScaleSpring,
                                    y: imgYSpring
                                },
                                initial: {
                                    opacity: 0
                                },
                                whileInView: {
                                    opacity: 1
                                },
                                viewport: {
                                    once: true,
                                    margin: "-40px"
                                },
                                transition: {
                                    duration: 0.8
                                },
                                className: `relative h-[280px] sm:h-[380px] lg:h-[520px] ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -inset-4 rounded-3xl blur-2xl opacity-20 lg:opacity-30",
                                        style: {
                                            background: "radial-gradient(ellipse at center, rgba(249,115,22,0.25), transparent 70%)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative h-full w-full rounded-2xl overflow-hidden border border-white/10",
                                        style: {
                                            boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                                                src: machine.image,
                                                alt: machine.name,
                                                className: "w-full h-full object-cover",
                                                whileHover: isTouch ? undefined : {
                                                    scale: 1.04
                                                },
                                                transition: {
                                                    duration: 0.6,
                                                    ease: [
                                                        0.16,
                                                        1,
                                                        0.3,
                                                        1
                                                    ]
                                                },
                                                loading: index === 0 ? "eager" : "lazy"
                                            }, void 0, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 470,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
                                            }, void 0, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 471,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-4 left-4 text-orange-500/50 text-[9px] tracking-[0.25em]",
                                                style: {
                                                    fontFamily: "'Share Tech Mono', monospace"
                                                },
                                                children: [
                                                    machine.id,
                                                    " / ACTIVE"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-4 right-4 text-white/30 text-[9px] tracking-[0.2em]",
                                                style: {
                                                    fontFamily: "'Share Tech Mono', monospace"
                                                },
                                                children: "FISAT · IDEA LAB"
                                            }, void 0, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 473,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-3 left-3 w-5 h-5 border-t border-l border-orange-500/40"
                                            }, void 0, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-3 right-3 w-5 h-5 border-t border-r border-orange-500/40"
                                            }, void 0, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 475,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-3 left-3 w-5 h-5 border-b border-l border-orange-500/40"
                                            }, void 0, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-3 right-3 w-5 h-5 border-b border-r border-orange-500/40"
                                            }, void 0, false, {
                                                fileName: "[project]/app/machinery/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/machinery/page.tsx",
                                lineNumber: 467,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/machinery/page.tsx",
        lineNumber: 422,
        columnNumber: 5
    }, this);
}
_s4(MachineSection, "YNWopsZ49ENmNLRzjmV8iP1Czdc=", false, function() {
    return [
        useIsTouch,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c4 = MachineSection;
function ScrollProgress() {
    _s5();
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const scaleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(scrollYProgress, {
        stiffness: 100,
        damping: 30
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "fixed top-0 left-0 right-0 h-[2px] origin-left z-[9988]",
        style: {
            scaleX,
            background: "linear-gradient(90deg, hsl(var(--accent)), #f97316)",
            willChange: "transform"
        }
    }, void 0, false, {
        fileName: "[project]/app/machinery/page.tsx",
        lineNumber: 490,
        columnNumber: 10
    }, this);
}
_s5(ScrollProgress, "UYAOtHxiUth0DU6Git6zGRnUBB4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c5 = ScrollProgress;
function NavDots({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 items-center",
        children: MACHINES.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                title: m.name,
                className: "relative flex items-center gap-2 group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: active === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                            initial: {
                                opacity: 0,
                                x: 8
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: 8
                            },
                            className: "absolute right-6 text-[10px] tracking-[0.18em] uppercase text-white/50 whitespace-nowrap",
                            style: {
                                fontFamily: "'Share Tech Mono', monospace"
                            },
                            children: m.id
                        }, "label", false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 500,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 498,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            width: active === i ? 20 : 4,
                            height: 4,
                            backgroundColor: active === i ? "hsl(var(--accent))" : "rgba(255,255,255,0.2)",
                            boxShadow: active === i ? "0 0 10px hsl(var(--accent))" : "none"
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 26
                        },
                        className: "rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 497,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/machinery/page.tsx",
        lineNumber: 495,
        columnNumber: 5
    }, this);
}
_c6 = NavDots;
function LabFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].footer, {
        initial: {
            opacity: 0
        },
        whileInView: {
            opacity: 1
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 1
        },
        className: "relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center border-t border-white/6 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-orange-500/[0.07] blur-[120px]"
                }, void 0, false, {
                    fileName: "[project]/app/machinery/page.tsx",
                    lineNumber: 514,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 text-center px-4 sm:px-6 max-w-4xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.8,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    },
                    className: "space-y-4 sm:space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-orange-500/60 text-xs tracking-[0.35em] uppercase",
                            style: {
                                fontFamily: "'Barlow Condensed', sans-serif"
                            },
                            children: "End of arsenal"
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 518,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(2.2rem, 8vw, 6.5rem)",
                                    lineHeight: 0.92,
                                    letterSpacing: "-0.03em",
                                    color: "#ffffff"
                                },
                                children: [
                                    "The Future of",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 521,
                                        columnNumber: 28
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "hsl(var(--accent))"
                                        },
                                        children: "Fabrication"
                                    }, void 0, false, {
                                        fileName: "[project]/app/machinery/page.tsx",
                                        lineNumber: 521,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/machinery/page.tsx",
                                lineNumber: 520,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 519,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/35 max-w-2xl mx-auto leading-relaxed",
                            style: {
                                fontFamily: "'Barlow', sans-serif",
                                fontWeight: 300,
                                fontSize: "clamp(0.88rem, 2vw, 1.1rem)"
                            },
                            children: "Our integrated ecosystem empowers creators, engineers, and manufacturers to bring complex ideas to life with precision, speed, and scale. Every machine works seamlessly together a unified fabrication experience."
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/20",
                            style: {
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: "0.75rem",
                                letterSpacing: "0.15em"
                            },
                            children: "FISAT AICTE IDEA LAB · ANGAMALY · KERALA"
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 527,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/machinery/page.tsx",
                    lineNumber: 517,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 516,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/machinery/page.tsx",
        lineNumber: 512,
        columnNumber: 5
    }, this);
}
_c7 = LabFooter;
function LoadingScreen({ onDone }) {
    _s6();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lineIdx, setLineIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [exiting, setExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const BOOT_LINES = [
        "INITIALIZING FABRICATION SYSTEMS...",
        "LOADING M-001 · BAMBU LAB X1 CARBON",
        "LOADING M-002 · CREALITY K1 MAX",
        "LOADING M-003 · ELEGOO SATURN 4 ULTRA",
        "LOADING M-004 · LASER CUTTING SYSTEM",
        "LOADING M-005 · SUBLIMATION PRINTER",
        "LOADING M-006 · PRECISION PLOTTER",
        "LOADING M-007 · PCB MILLING MACHINE",
        "LOADING M-008 · KAVONE KNC 2513 CNC ROUTER",
        "ALL SYSTEMS NOMINAL — READY"
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoadingScreen.useEffect": ()=>{
            let val = 0;
            const step = {
                "LoadingScreen.useEffect.step": ()=>{
                    const inc = val < 30 ? 3 : val < 70 ? 1.2 : val < 90 ? 0.8 : 2.5;
                    val = Math.min(100, val + inc);
                    setProgress(Math.floor(val));
                    if (val < 100) {
                        setTimeout(step, val < 30 ? 18 : val < 70 ? 28 : val < 90 ? 40 : 14);
                    } else {
                        setTimeout({
                            "LoadingScreen.useEffect.step": ()=>setExiting(true)
                        }["LoadingScreen.useEffect.step"], 380);
                        setTimeout(onDone, 1100);
                    }
                }
            }["LoadingScreen.useEffect.step"];
            setTimeout(step, 200);
        }
    }["LoadingScreen.useEffect"], [
        onDone
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoadingScreen.useEffect": ()=>{
            const idx = Math.floor(progress / 100 * (BOOT_LINES.length - 1));
            setLineIdx(Math.min(idx, BOOT_LINES.length - 1));
        }
    }["LoadingScreen.useEffect"], [
        progress
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: !exiting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden",
            style: {
                background: "hsl(var(--background))"
            },
            exit: {
                opacity: 1
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": true,
                    className: "absolute inset-0 pointer-events-none opacity-[0.018]",
                    style: {
                        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/machinery/page.tsx",
                    lineNumber: 577,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": true,
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.07), transparent)"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/machinery/page.tsx",
                    lineNumber: 578,
                    columnNumber: 11
                }, this),
                [
                    20,
                    40,
                    60,
                    80
                ].map((pct)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none",
                        style: {
                            left: `${pct}%`
                        },
                        initial: {
                            scaleY: 0
                        },
                        animate: {
                            scaleY: 1
                        },
                        transition: {
                            duration: 0.6,
                            delay: pct / 200
                        }
                    }, pct, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 581,
                        columnNumber: 13
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 sm:px-8 w-full max-w-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 16
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.6,
                                delay: 0.1
                            },
                            className: "flex flex-col items-center gap-2 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-orange-500/60 text-[9px] tracking-[0.45em] uppercase",
                                    style: {
                                        fontFamily: "'Share Tech Mono', monospace"
                                    },
                                    children: "FISAT AICTE"
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 586,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 900,
                                        fontSize: "clamp(2.4rem, 10vw, 5rem)",
                                        lineHeight: 0.9,
                                        letterSpacing: "-0.02em",
                                        color: "#ffffff"
                                    },
                                    children: "IDEA LAB"
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 587,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/20 text-[9px] tracking-[0.35em] uppercase",
                                    style: {
                                        fontFamily: "'Share Tech Mono', monospace"
                                    },
                                    children: "MACHINERY SYSTEMS"
                                }, void 0, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 588,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 585,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scaleX: 0.4
                            },
                            animate: {
                                opacity: 1,
                                scaleX: 1
                            },
                            transition: {
                                duration: 0.5,
                                delay: 0.25
                            },
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-full h-[2px] bg-white/8 rounded-full overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-y-0 left-0 rounded-full",
                                            style: {
                                                width: `${progress}%`,
                                                background: "linear-gradient(90deg, hsl(var(--accent)), #fb923c)",
                                                transition: "width 0.06s linear"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/machinery/page.tsx",
                                            lineNumber: 593,
                                            columnNumber: 17
                                        }, this),
                                        progress > 5 && progress < 99 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent",
                                            animate: {
                                                x: [
                                                    "-100%",
                                                    "900%"
                                                ]
                                            },
                                            transition: {
                                                duration: 1.2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/machinery/page.tsx",
                                            lineNumber: 595,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 592,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mt-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white/25 text-[9px] tracking-[0.22em]",
                                            style: {
                                                fontFamily: "'Share Tech Mono', monospace"
                                            },
                                            children: "SYS.BOOT"
                                        }, void 0, false, {
                                            fileName: "[project]/app/machinery/page.tsx",
                                            lineNumber: 599,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "tabular-nums",
                                            style: {
                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                fontWeight: 700,
                                                fontSize: "1.1rem",
                                                color: progress === 100 ? "hsl(var(--accent))" : "rgba(255,255,255,0.55)",
                                                transition: "color 0.3s",
                                                letterSpacing: "0.04em"
                                            },
                                            children: [
                                                String(progress).padStart(3, "0"),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/machinery/page.tsx",
                                            lineNumber: 600,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 591,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                duration: 0.4,
                                delay: 0.4
                            },
                            className: "w-full h-5 overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                    initial: {
                                        y: "110%",
                                        opacity: 0
                                    },
                                    animate: {
                                        y: "0%",
                                        opacity: 1
                                    },
                                    exit: {
                                        y: "-110%",
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.22,
                                        ease: [
                                            0.16,
                                            1,
                                            0.3,
                                            1
                                        ]
                                    },
                                    className: `text-[10px] tracking-[0.18em] ${lineIdx === BOOT_LINES.length - 1 ? "text-orange-400/80" : "text-white/30"}`,
                                    style: {
                                        fontFamily: "'Share Tech Mono', monospace"
                                    },
                                    children: BOOT_LINES[lineIdx]
                                }, lineIdx, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 606,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/machinery/page.tsx",
                                lineNumber: 605,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 604,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                duration: 0.5,
                                delay: 0.5
                            },
                            className: "flex gap-2 sm:gap-3 flex-wrap justify-center",
                            children: MACHINES.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    animate: {
                                        color: progress >= (i + 1) / MACHINES.length * 100 ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.12)",
                                        borderColor: progress >= (i + 1) / MACHINES.length * 100 ? "rgba(249,115,22,0.35)" : "rgba(255,255,255,0.07)"
                                    },
                                    transition: {
                                        duration: 0.3
                                    },
                                    className: "px-2 py-0.5 border rounded-sm text-[9px] tracking-[0.22em]",
                                    style: {
                                        fontFamily: "'Share Tech Mono', monospace"
                                    },
                                    children: m.id
                                }, m.id, false, {
                                    fileName: "[project]/app/machinery/page.tsx",
                                    lineNumber: 614,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 612,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/machinery/page.tsx",
                    lineNumber: 584,
                    columnNumber: 11
                }, this),
                exiting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0 pointer-events-none",
                            style: {
                                background: "hsl(var(--background))",
                                zIndex: 10,
                                transformOrigin: "top"
                            },
                            initial: {
                                scaleY: 1
                            },
                            animate: {
                                scaleY: 0
                            },
                            transition: {
                                duration: 0.55,
                                ease: [
                                    0.76,
                                    0,
                                    0.24,
                                    1
                                ]
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 623,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0 pointer-events-none",
                            style: {
                                background: "hsl(var(--background))",
                                zIndex: 10,
                                transformOrigin: "bottom"
                            },
                            initial: {
                                scaleY: 1
                            },
                            animate: {
                                scaleY: 0
                            },
                            transition: {
                                duration: 0.55,
                                ease: [
                                    0.76,
                                    0,
                                    0.24,
                                    1
                                ],
                                delay: 0.05
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 624,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, "loader", true, {
            fileName: "[project]/app/machinery/page.tsx",
            lineNumber: 576,
            columnNumber: 9
        }, this) : null
    }, void 0, false, {
        fileName: "[project]/app/machinery/page.tsx",
        lineNumber: 574,
        columnNumber: 5
    }, this);
}
_s6(LoadingScreen, "BRFf+1tIDyExAc+NxOgM5M9d0kM=");
_c8 = LoadingScreen;
function MachineryPage() {
    _s7();
    useFonts();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const onDone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MachineryPage.useCallback[onDone]": ()=>setLoaded(true)
    }["MachineryPage.useCallback[onDone]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !loaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingScreen, {
                onDone: onDone
            }, void 0, false, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 641,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "bg-background text-foreground overflow-x-hidden",
                style: {
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.4s ease 0.1s",
                    pointerEvents: loaded ? "auto" : "none"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MachineCursor, {}, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 646,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grain, {}, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 647,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scanlines, {}, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 648,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollProgress, {}, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 649,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavDots, {
                        active: active
                    }, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 650,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroSection, {}, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 651,
                        columnNumber: 9
                    }, this),
                    MACHINES.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MachineSection, {
                            machine: m,
                            index: i,
                            setActive: setActive
                        }, m.name, false, {
                            fileName: "[project]/app/machinery/page.tsx",
                            lineNumber: 653,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LabFooter, {}, void 0, false, {
                        fileName: "[project]/app/machinery/page.tsx",
                        lineNumber: 655,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/machinery/page.tsx",
                lineNumber: 642,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s7(MachineryPage, "Yx5lJ2EE+s6B0PSXBqWemQeEFIM=", false, function() {
    return [
        useFonts
    ];
});
_c9 = MachineryPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Grain");
__turbopack_context__.k.register(_c1, "Scanlines");
__turbopack_context__.k.register(_c2, "MachineCursor");
__turbopack_context__.k.register(_c3, "HeroSection");
__turbopack_context__.k.register(_c4, "MachineSection");
__turbopack_context__.k.register(_c5, "ScrollProgress");
__turbopack_context__.k.register(_c6, "NavDots");
__turbopack_context__.k.register(_c7, "LabFooter");
__turbopack_context__.k.register(_c8, "LoadingScreen");
__turbopack_context__.k.register(_c9, "MachineryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_machinery_page_tsx_69dd9c5c._.js.map