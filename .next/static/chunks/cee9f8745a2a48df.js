(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={assign:function(){return s},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return l}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});function i(e){let t={};for(let[r,a]of e.entries()){let e=t[r];void 0===e?t[r]=a:Array.isArray(e)?e.push(a):t[r]=[e,a]}return t}function o(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function l(e){let t=new URLSearchParams;for(let[r,a]of Object.entries(e))if(Array.isArray(a))for(let e of a)t.append(r,o(e));else t.set(r,o(a));return t}function s(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,a]of r.entries())e.append(t,a)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return l},formatWithValidation:function(){return p},urlObjectKeys:function(){return s}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let i=e.r(90809)._(e.r(98183)),o=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,a=e.protocol||"",n=e.pathname||"",l=e.hash||"",s=e.query||"",p=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?p=t+e.host:r&&(p=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(p+=":"+e.port)),s&&"object"==typeof s&&(s=String(i.urlQueryToSearchParams(s)));let c=e.search||s&&`?${s}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||o.test(a))&&!1!==p?(p="//"+(p||""),n&&"/"!==n[0]&&(n="/"+n)):p||(p=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),n=n.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${a}${p}${n}${c}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function p(e){return l(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let a=e.r(71645);function n(e,t){let r=(0,a.useRef)(null),n=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=i(e,a)),t&&(n.current=i(t,a))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={DecodeError:function(){return g},MiddlewareNotFoundError:function(){return w},MissingStaticPage:function(){return y},NormalizeError:function(){return b},PageNotFoundError:function(){return v},SP:function(){return f},ST:function(){return h},WEB_VITALS:function(){return i},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return p},getURL:function(){return c},isAbsoluteUrl:function(){return s},isResSent:function(){return x},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return u},stringifyError:function(){return j}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...a)=>(r||(r=!0,t=e(...a)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>l.test(e);function p(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=p();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function x(e){return e.finished||e.headersSent}function u(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let a=await e.getInitialProps(t);if(r&&x(r))return a;if(!a)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${a}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return a}let f="undefined"!=typeof performance,h=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class b extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class y extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class w extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},38982,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let a=e.r(18967),n=e.r(52817);function i(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return g},useLinkStatus:function(){return v}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let i=e.r(90809),o=e.r(43476),l=i._(e.r(71645)),s=e.r(95057),p=e.r(8372),c=e.r(18581),d=e.r(18967),x=e.r(5550);e.r(33525);let u=e.r(91949),m=e.r(38982),f=e.r(9396);function h(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}function g(t){var r;let a,n,i,[s,g]=(0,l.useOptimistic)(u.IDLE_LINK_STATUS),v=(0,l.useRef)(null),{href:y,as:w,children:j,prefetch:k=null,passHref:N,replace:C,shallow:E,scroll:_,onClick:S,onMouseEnter:L,onTouchStart:O,legacyBehavior:P=!1,onNavigate:T,ref:z,unstable_dynamicOnHover:A,...M}=t;a=j,P&&("string"==typeof a||"number"==typeof a)&&(a=(0,o.jsx)("a",{children:a}));let R=l.default.useContext(p.AppRouterContext),F=!1!==k,I=!1!==k?null===(r=k)||"auto"===r?f.FetchStrategy.PPR:f.FetchStrategy.Full:f.FetchStrategy.PPR,{href:B,as:$}=l.default.useMemo(()=>{let e=h(y);return{href:e,as:w?h(w):e}},[y,w]);if(P){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=l.default.Children.only(a)}let D=P?n&&"object"==typeof n&&n.ref:z,U=l.default.useCallback(e=>(null!==R&&(v.current=(0,u.mountLinkInstance)(e,B,R,I,F,g)),()=>{v.current&&((0,u.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,u.unmountPrefetchableInstance)(e)}),[F,B,R,I,g]),K={ref:(0,c.useMergedRef)(U,D),onClick(t){P||"function"!=typeof S||S(t),P&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!R||t.defaultPrevented||function(t,r,a,n,i,o,s){if("undefined"!=typeof window){let p,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((p=t.currentTarget.getAttribute("target"))&&"_self"!==p||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,m.isLocalURL)(r)){i&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);l.default.startTransition(()=>{d(a||r,i?"replace":"push",o??!0,n.current)})}}(t,B,$,v,C,_,T)},onMouseEnter(e){P||"function"!=typeof L||L(e),P&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),R&&F&&(0,u.onNavigationIntent)(e.currentTarget,!0===A)},onTouchStart:function(e){P||"function"!=typeof O||O(e),P&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),R&&F&&(0,u.onNavigationIntent)(e.currentTarget,!0===A)}};return(0,d.isAbsoluteUrl)($)?K.href=$:P&&!N&&("a"!==n.type||"href"in n.props)||(K.href=(0,x.addBasePath)($)),i=P?l.default.cloneElement(n,K):(0,o.jsx)("a",{...M,...K,children:a}),(0,o.jsx)(b.Provider,{value:s,children:i})}e.r(84508);let b=(0,l.createContext)(u.IDLE_LINK_STATUS),v=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},63570,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(17927),n=e.i(22016);function i({product:e,viewMode:r="grid"}){return"list"===r?(0,t.jsxs)("div",{className:"flex gap-0 overflow-hidden",children:[e.image_url&&(0,t.jsx)("div",{className:"relative flex-shrink-0 w-40 h-full min-h-[120px]",children:(0,t.jsx)("img",{src:e.image_url,className:"w-full h-full object-cover"})}),(0,t.jsxs)("div",{className:"flex flex-1 flex-col justify-between p-4 min-w-0",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex flex-wrap gap-2 mb-2",children:[e.category&&(0,t.jsx)("span",{className:"bg-purple-600 text-xs px-2 py-0.5 rounded-full text-white",children:e.category}),e.status&&(0,t.jsx)("span",{className:"bg-green-500 text-xs px-2 py-0.5 rounded-full text-white",children:e.status})]}),(0,t.jsx)("h3",{className:"text-base font-semibold text-white mb-1 truncate",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-400 line-clamp-2 mb-3",children:e.short_description}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1.5 mb-3",children:e.technologies?.slice(0,4).map(e=>(0,t.jsx)("span",{className:"text-xs bg-white/10 px-2 py-0.5 rounded",children:e},e))})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(n.default,{href:`/products/${e.id}`,className:"text-sm text-blue-400",children:"Know More →"}),e.is_paid?(0,t.jsxs)("span",{className:"text-yellow-400 font-semibold",children:["₹",e.price]}):(0,t.jsx)("span",{className:"text-green-400 text-sm",children:"Free"})]})]})]}):(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("img",{src:e.image_url,className:"w-full h-48 object-cover"}),e.category&&(0,t.jsx)("span",{className:"absolute top-3 left-3 bg-purple-600 text-xs px-3 py-1 rounded-full text-white",children:e.category}),e.status&&(0,t.jsx)("span",{className:"absolute top-3 right-3 bg-green-500 text-xs px-3 py-1 rounded-full text-white",children:e.status})]}),(0,t.jsxs)("div",{className:"p-5",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold text-white mb-2",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-gray-400 mb-4",children:e.short_description}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2 mb-4",children:e.technologies?.slice(0,4).map(e=>(0,t.jsx)("span",{className:"text-xs bg-white/10 px-2 py-1 rounded",children:e},e))}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(n.default,{href:`/products/${e.id}`,className:"text-sm text-blue-400",children:"Know More →"}),e.is_paid?(0,t.jsxs)("span",{className:"text-yellow-400 font-semibold",children:["₹",e.price]}):(0,t.jsx)("span",{className:"text-green-400 text-sm",children:"Free"})]})]})]})}let o=["All","Software","Hardware","Research","Tools","AI/ML"],l=[{label:"Newest First",value:"created_at_desc"},{label:"Oldest First",value:"created_at_asc"},{label:"Name A → Z",value:"title_asc"},{label:"Name Z → A",value:"title_desc"}];function s(){let[e,n]=(0,r.useState)([]),[s,c]=(0,r.useState)(""),[d,x]=(0,r.useState)("All"),[u,m]=(0,r.useState)("created_at_desc"),[f,h]=(0,r.useState)(!0),[g,b]=(0,r.useState)(!1),[v,y]=(0,r.useState)(!1),[w,j]=(0,r.useState)("grid"),[k,N]=(0,r.useState)(9),[C,E]=(0,r.useState)(!1),_=(0,r.useRef)(null);async function S(){h(!0);let{data:e}=await a.supabase.from("products").select("*").eq("is_active",!0);e&&n(e),h(!1),setTimeout(()=>{y(!0),setTimeout(()=>b(!0),500)},1400)}(0,r.useEffect)(()=>{let e=e=>{_.current&&!_.current.contains(e.target)&&E(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,r.useEffect)(()=>{S()},[]);let L=e.filter(e=>{let t=s.toLowerCase(),r=e.title.toLowerCase().includes(t)||(e.description||"").toLowerCase().includes(t),a="All"===d||e.category===d;return r&&a}).sort((e,t)=>{switch(u){case"created_at_desc":return new Date(t.created_at).getTime()-new Date(e.created_at).getTime();case"created_at_asc":return new Date(e.created_at).getTime()-new Date(t.created_at).getTime();case"title_asc":return e.title.localeCompare(t.title);case"title_desc":return t.title.localeCompare(e.title);default:return 0}}),O=L.slice(0,k),P=k<L.length,T=L.length-k,z=(0,r.useCallback)(()=>N(9),[]),A=l.find(e=>e.value===u);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:p}),!g&&(0,t.jsxs)("div",{className:`ldr-wrap ${v?"out":""}`,"aria-hidden":v,children:[(0,t.jsx)("div",{className:"ldr-glow ldr-glow--a"}),(0,t.jsx)("div",{className:"ldr-glow ldr-glow--b"}),(0,t.jsx)("div",{className:"pl-noise"}),(0,t.jsxs)("div",{className:"ldr-center",children:[(0,t.jsxs)("div",{className:"ldr-mark",children:[(0,t.jsxs)("svg",{className:"ldr-hex",viewBox:"0 0 56 64",fill:"none",children:[(0,t.jsx)("path",{d:"M28 2L54 17v30L28 62 2 47V17z",stroke:"url(#hexGrad)",strokeWidth:"1.5",strokeLinejoin:"round",className:"ldr-hex-path"}),(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:"hexGrad",x1:"2",y1:"2",x2:"54",y2:"62",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{stopColor:"#00D282"}),(0,t.jsx)("stop",{offset:"1",stopColor:"#4DFFCB",stopOpacity:"0.4"})]})})]}),(0,t.jsxs)("svg",{className:"ldr-ring",viewBox:"0 0 80 80",fill:"none",children:[(0,t.jsx)("circle",{cx:"40",cy:"40",r:"36",stroke:"rgba(0,210,130,0.12)",strokeWidth:"1"}),(0,t.jsx)("circle",{cx:"40",cy:"40",r:"36",stroke:"url(#ringGrad)",strokeWidth:"1.5",strokeLinecap:"round",strokeDasharray:"60 165",className:"ldr-ring-arc"}),(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:"ringGrad",x1:"4",y1:"4",x2:"76",y2:"76",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{stopColor:"#00D282"}),(0,t.jsx)("stop",{offset:"1",stopColor:"#4DFFCB",stopOpacity:"0"})]})})]})]}),(0,t.jsxs)("div",{className:"ldr-wordmark",children:[(0,t.jsx)("span",{className:"ldr-lab",children:"IDEA Lab"}),(0,t.jsx)("span",{className:"ldr-slash",children:"/"}),(0,t.jsx)("span",{className:"ldr-products",children:"Products"})]}),(0,t.jsxs)("div",{className:"ldr-bar-wrap",children:[(0,t.jsx)("div",{className:"ldr-bar-track",children:(0,t.jsx)("div",{className:"ldr-bar-fill"})}),(0,t.jsx)("span",{className:"ldr-bar-label",children:"Loading …"})]})]}),(0,t.jsx)("p",{className:"ldr-tagline",children:"// FISAT AICTE · from prototype → production"})]}),(0,t.jsxs)("div",{className:`pl-root ${g?"page-visible":"page-hidden"}`,children:[(0,t.jsx)("div",{className:"pl-noise","aria-hidden":!0}),(0,t.jsxs)("header",{className:"pl-hero",children:[(0,t.jsx)("div",{className:"pl-hero-bg","aria-hidden":!0}),(0,t.jsxs)("div",{className:"pl-hero-inner",children:[(0,t.jsxs)("div",{className:"pl-hero-text",children:[(0,t.jsxs)("span",{className:"pl-eyebrow",children:[(0,t.jsx)("span",{className:"pl-dot"}),"FISAT AICTE IDEA Lab"]}),(0,t.jsxs)("h1",{className:"pl-title",children:["Lab-Born",(0,t.jsx)("br",{}),(0,t.jsx)("em",{children:"Products."})]}),(0,t.jsx)("p",{className:"pl-tagline-txt",children:"// from prototype → production"})]}),(0,t.jsxs)("div",{className:"pl-hero-meta",children:[(0,t.jsxs)("div",{className:"pl-meta-item",children:[(0,t.jsx)("span",{className:"pl-meta-num",children:e.length}),(0,t.jsx)("span",{className:"pl-meta-label",children:"Products"})]}),(0,t.jsx)("div",{className:"pl-meta-sep"}),(0,t.jsxs)("div",{className:"pl-meta-item",children:[(0,t.jsx)("span",{className:"pl-meta-num",children:o.length-1}),(0,t.jsx)("span",{className:"pl-meta-label",children:"Categories"})]}),(0,t.jsx)("div",{className:"pl-meta-sep"}),(0,t.jsxs)("div",{className:"pl-meta-item",children:[(0,t.jsx)("span",{className:"pl-meta-num",children:e.filter(e=>"completed"===e.status).length}),(0,t.jsx)("span",{className:"pl-meta-label",children:"Completed"})]})]})]})]}),(0,t.jsxs)("div",{className:"pl-bar-wrap",children:[(0,t.jsxs)("div",{className:"pl-bar",children:[(0,t.jsxs)("label",{className:"pl-search-label",children:[(0,t.jsxs)("svg",{className:"pl-search-ico",viewBox:"0 0 16 16",fill:"none",children:[(0,t.jsx)("circle",{cx:"6.5",cy:"6.5",r:"5.25",stroke:"currentColor",strokeWidth:"1.5"}),(0,t.jsx)("line",{x1:"10.5",y1:"10.5",x2:"14",y2:"14",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),(0,t.jsx)("input",{className:"pl-search",placeholder:"Search products…",value:s,onChange:e=>{c(e.target.value),z()}}),s&&(0,t.jsx)("button",{className:"pl-clear",onClick:()=>{c(""),z()},children:"×"})]}),(0,t.jsxs)("div",{className:"pl-bar-right",children:[(0,t.jsxs)("div",{className:"pl-sort",ref:_,children:[(0,t.jsxs)("button",{className:`pl-sort-btn ${C?"open":""}`,onClick:()=>E(e=>!e),children:[(0,t.jsx)("span",{className:"pl-sort-label",children:A.label}),(0,t.jsx)("svg",{className:"pl-chev",viewBox:"0 0 10 6",fill:"none",children:(0,t.jsx)("path",{d:"M1 1l4 4 4-4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})]}),C&&(0,t.jsx)("ul",{className:"pl-sort-menu",children:l.map(e=>(0,t.jsx)("li",{children:(0,t.jsxs)("button",{className:`pl-sort-opt ${u===e.value?"on":""}`,onClick:()=>{m(e.value),E(!1)},children:[e.label,u===e.value&&(0,t.jsx)("svg",{viewBox:"0 0 10 8",fill:"none",width:"10",children:(0,t.jsx)("path",{d:"M1 4l3 3L9 1",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})]})},e.value))})]}),(0,t.jsxs)("div",{className:"pl-view",role:"group",children:[(0,t.jsx)("button",{className:`pl-vbtn ${"grid"===w?"on":""}`,onClick:()=>j("grid"),title:"Grid view",children:(0,t.jsxs)("svg",{viewBox:"0 0 14 14",fill:"currentColor",width:"12",children:[(0,t.jsx)("rect",{x:"0",y:"0",width:"6",height:"6",rx:"1.2"}),(0,t.jsx)("rect",{x:"8",y:"0",width:"6",height:"6",rx:"1.2"}),(0,t.jsx)("rect",{x:"0",y:"8",width:"6",height:"6",rx:"1.2"}),(0,t.jsx)("rect",{x:"8",y:"8",width:"6",height:"6",rx:"1.2"})]})}),(0,t.jsx)("button",{className:`pl-vbtn ${"list"===w?"on":""}`,onClick:()=>j("list"),title:"List view",children:(0,t.jsxs)("svg",{viewBox:"0 0 14 12",fill:"currentColor",width:"12",children:[(0,t.jsx)("rect",{x:"0",y:"0",width:"14",height:"3",rx:"1.2"}),(0,t.jsx)("rect",{x:"0",y:"4.5",width:"14",height:"3",rx:"1.2"}),(0,t.jsx)("rect",{x:"0",y:"9",width:"14",height:"3",rx:"1.2"})]})})]}),(0,t.jsxs)("span",{className:"pl-count",children:[(0,t.jsx)("b",{children:L.length})," ",1===L.length?"product":"products"]})]})]}),(0,t.jsx)("div",{className:"pl-cats-wrap",children:(0,t.jsx)("div",{className:"pl-cats",children:o.map(e=>(0,t.jsx)("button",{className:`pl-cat ${d===e?"on":""}`,onClick:()=>{x(e),z()},children:e},e))})})]}),(0,t.jsx)("main",{className:"pl-main",children:0===L.length?(0,t.jsxs)("div",{className:"pl-empty",children:[(0,t.jsx)("div",{className:"pl-empty-sym",children:"∅"}),(0,t.jsx)("p",{className:"pl-empty-title",children:"Nothing here"}),(0,t.jsx)("p",{className:"pl-empty-sub",children:"Adjust your search or try a different category"}),(0,t.jsx)("button",{className:"pl-empty-btn",onClick:()=>{c(""),x("All"),z()},children:"Clear all filters"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"grid"===w?"pl-grid":"pl-list",children:O.map((e,r)=>(0,t.jsxs)("div",{className:`pl-shell ${w}`,style:{animationDelay:`${.055*Math.min(r%9,8)}s`},children:[(0,t.jsx)("span",{className:"pl-shell-line","aria-hidden":!0}),(0,t.jsx)(i,{product:e,viewMode:w})]},e.id))}),P&&(0,t.jsxs)("div",{className:"pl-more",children:[(0,t.jsx)("div",{className:"pl-more-line"}),(0,t.jsxs)("button",{className:"pl-more-btn",onClick:()=>N(e=>e+9),children:[(0,t.jsxs)("span",{children:["Load ",Math.min(T,9)," more"]}),(0,t.jsx)("svg",{viewBox:"0 0 14 14",fill:"none",width:"13",children:(0,t.jsx)("path",{d:"M7 2v10M2 7l5 5 5-5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})]}),(0,t.jsx)("div",{className:"pl-more-line"})]})]})})]})]})}let p=`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

/* ── tokens ──────────────────────────────────────────────────────── */
.pl-root, .ldr-wrap {
  --bg:          #07090E;
  --bg-card:     #0C0F18;
  --border:      rgba(255,255,255,0.07);
  --border-hi:   rgba(0,210,130,0.28);
  --accent:      #00D282;
  --accent-lo:   rgba(0,210,130,0.10);
  --text:        #ECF0F8;
  --text-mid:    rgba(236,240,248,0.55);
  --text-dim:    rgba(236,240,248,0.24);
  --mono:        'DM Mono', monospace;
  --sans:        'Syne', sans-serif;
  --rad:         13px;
  --spring:      cubic-bezier(0.34,1.4,0.64,1);
}

/* ════════════════════════════════════════════════════════════════
   FULL-PAGE LOADER
════════════════════════════════════════════════════════════════ */
.ldr-wrap {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-family: var(--sans);
  overflow: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.ldr-wrap.out {
  opacity: 0;
  pointer-events: none;
  transform: scale(1.015);
}

.ldr-glow {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(80px);
}
.ldr-glow--a {
  width: 500px; height: 400px;
  background: radial-gradient(circle, rgba(0,210,130,0.10), transparent 70%);
  top: 10%; left: -10%;
  animation: glowdrift 8s ease-in-out infinite alternate;
}
.ldr-glow--b {
  width: 400px; height: 350px;
  background: radial-gradient(circle, rgba(124,92,255,0.08), transparent 70%);
  bottom: 5%; right: -5%;
  animation: glowdrift 10s ease-in-out infinite alternate-reverse;
}
@keyframes glowdrift {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(30px, -20px) scale(1.08); }
}

.ldr-center {
  display: flex; flex-direction: column;
  align-items: center; gap: 28px;
  animation: ldrin 0.5s var(--spring) both;
  padding: 0 24px;
  text-align: center;
}
@keyframes ldrin {
  from { opacity:0; transform: translateY(20px); }
  to   { opacity:1; transform: none; }
}

.ldr-mark {
  position: relative;
  width: 80px; height: 80px;
  display: flex; align-items: center; justify-content: center;
}
.ldr-hex {
  width: 56px; height: 64px;
  position: absolute;
  filter: drop-shadow(0 0 12px rgba(0,210,130,0.35));
}
.ldr-hex-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: hexdraw 1.1s 0.1s cubic-bezier(0.4,0,0.2,1) forwards;
}
@keyframes hexdraw { to { stroke-dashoffset: 0; } }
.ldr-ring {
  width: 80px; height: 80px;
  position: absolute;
  animation: spin 1.4s linear infinite;
}
.ldr-ring-arc { transform-origin: 40px 40px; }
@keyframes spin { to { transform: rotate(360deg); } }

.ldr-wordmark {
  display: flex; align-items: center; gap: 10px;
  animation: ldrin 0.5s 0.2s var(--spring) both;
  flex-wrap: wrap; justify-content: center;
}
.ldr-lab {
  font-family: var(--sans); font-size: 1.5rem; font-weight: 800;
  letter-spacing: -0.03em; color: #fff;
}
.ldr-slash {
  font-family: var(--mono); font-size: 1.2rem;
  color: var(--accent); opacity: 0.6;
}
.ldr-products {
  font-family: var(--mono); font-size: 0.85rem;
  color: var(--text-dim); letter-spacing: 0.12em;
  text-transform: uppercase; padding-top: 3px;
}

.ldr-bar-wrap {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  animation: ldrin 0.5s 0.35s var(--spring) both;
  width: 100%;
}
.ldr-bar-track {
  width: min(200px, 80vw); height: 2px;
  background: rgba(255,255,255,0.07);
  border-radius: 999px; overflow: hidden;
}
.ldr-bar-fill {
  height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), #4DFFCB);
  box-shadow: 0 0 8px rgba(0,210,130,0.5);
  animation: barfill 1.4s cubic-bezier(0.4,0,0.2,1) forwards;
}
@keyframes barfill {
  0%   { width: 0%;   }
  40%  { width: 55%;  }
  70%  { width: 78%;  }
  100% { width: 100%; }
}
.ldr-bar-label {
  font-family: var(--mono); font-size: 10px;
  color: var(--text-dim); letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ldr-tagline {
  position: absolute; bottom: 24px;
  font-family: var(--mono); font-size: 10px;
  color: var(--text-dim); letter-spacing: 0.10em;
  font-style: italic;
  animation: ldrin 0.5s 0.5s var(--spring) both;
  padding: 0 16px; text-align: center;
}

/* ════════════════════════════════════════════════════════════════
   PAGE REVEAL
════════════════════════════════════════════════════════════════ */
.page-hidden { opacity: 0; pointer-events: none; }
.page-visible {
  opacity: 1; pointer-events: auto;
  animation: pagereveal 0.6s var(--spring) both;
}
@keyframes pagereveal {
  from { opacity:0; transform: translateY(12px); }
  to   { opacity:1; transform: none; }
}

/* ════════════════════════════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════════════════════════════ */
.pl-root {
  font-family: var(--sans);
  background:  var(--bg);
  color:       var(--text);
  min-height:  100vh;
  position:    relative;
  overflow-x:  hidden;
}

.pl-noise {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0; opacity: 0.022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 120px 120px;
}

/* ════════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════════ */
.pl-hero {
  position: relative; padding: 80px 56px 64px;
  border-bottom: 1px solid var(--border); overflow: hidden;
}
.pl-hero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 90% at 5%  60%, rgba(0,210,130,0.09) 0%, transparent 65%),
    radial-gradient(ellipse 40% 70% at 95% 10%, rgba(124,92,255,0.07) 0%, transparent 60%);
}
.pl-hero-bg::after {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse 65% 55% at 25% 50%, black 10%, transparent 75%);
}
.pl-hero-inner {
  position: relative; max-width: 1280px; margin: 0 auto;
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 40px; flex-wrap: wrap;
}
.pl-hero-text { flex: 1; min-width: 0; }
.pl-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 18px;
}
.pl-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); box-shadow: 0 0 8px var(--accent);
  animation: blink 2.8s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
.pl-title {
  font-size: clamp(2.4rem, 6vw, 5rem); font-weight: 800; line-height: 0.94;
  letter-spacing: -0.04em; margin: 0;
  background: linear-gradient(150deg, #fff 40%, rgba(255,255,255,0.36));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pl-title em {
  font-style: italic;
  background: linear-gradient(130deg, var(--accent) 0%, #4DFFCB 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pl-tagline-txt {
  font-family: var(--mono); font-size: 12px;
  color: var(--text-dim); margin-top: 14px; font-style: italic;
}
.pl-hero-meta {
  display: flex; align-items: center; gap: 28px;
  background: rgba(255,255,255,0.025); border: 1px solid var(--border);
  border-radius: 16px; padding: 20px 32px; backdrop-filter: blur(14px); flex-shrink: 0;
}
.pl-meta-item { text-align: center; }
.pl-meta-num  { display: block; font-size: 2rem; font-weight: 800; letter-spacing: -0.05em; line-height: 1; }
.pl-meta-label{ display: block; font-family: var(--mono); font-size: 9px; color: var(--text-dim); letter-spacing: 0.16em; text-transform: uppercase; margin-top: 5px; }
.pl-meta-sep  { width: 1px; height: 36px; background: var(--border); flex-shrink: 0; }

/* ════════════════════════════════════════════════════════════════
   STICKY TOOLBAR
════════════════════════════════════════════════════════════════ */
.pl-bar-wrap {
  position: sticky; top: 0; z-index: 60;
  background: rgba(7,9,14,0.88); backdrop-filter: blur(28px) saturate(1.5);
  border-bottom: 1px solid var(--border);
}
.pl-bar {
  max-width: 1280px; margin: 0 auto;
  padding: 0 56px; height: 60px;
  display: flex; align-items: center; gap: 12px;
}
.pl-bar-right {
  display: flex; align-items: center; gap: 10px; margin-left: auto; flex-shrink: 0;
}

/* Search */
.pl-search-label {
  position: relative; display: flex; align-items: center;
  flex: 1; max-width: 420px; min-width: 0;
}
.pl-search-ico {
  position: absolute; left: 13px; width: 14px; height: 14px;
  color: var(--text-dim); pointer-events: none; flex-shrink: 0;
}
.pl-search {
  width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--border);
  border-radius: 9px; padding: 8px 34px 8px 38px;
  font-family: var(--mono); font-size: 12px; color: var(--text); outline: none;
  transition: border-color .18s, background .18s;
  min-width: 0;
}
.pl-search::placeholder { color: var(--text-dim); }
.pl-search:focus { border-color: var(--border-hi); background: var(--accent-lo); }
.pl-clear {
  position: absolute; right: 10px; background: none; border: none;
  cursor: pointer; color: var(--text-dim); font-size: 16px;
  line-height: 1; padding: 0; transition: color .15s;
}
.pl-clear:hover { color: var(--text); }

/* Sort */
.pl-sort { position: relative; flex-shrink: 0; }
.pl-sort-btn {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.04); border: 1px solid var(--border);
  border-radius: 9px; padding: 8px 10px;
  font-family: var(--mono); font-size: 11px; color: var(--text-mid);
  cursor: pointer; white-space: nowrap; transition: border-color .15s, color .15s;
}
.pl-sort-btn:hover, .pl-sort-btn.open { border-color: var(--border-hi); color: var(--text); }
.pl-sort-label { /* can be hidden on very small screens via media query */ }
.pl-chev { width: 9px; height: 6px; transition: transform .2s; flex-shrink: 0; }
.pl-sort-btn.open .pl-chev { transform: rotate(180deg); }
.pl-sort-menu {
  position: absolute; top: calc(100% + 6px); right: 0;
  background: #111420; border: 1px solid var(--border); border-radius: 11px; padding: 6px;
  min-width: 150px; list-style: none; margin: 0; z-index: 100;
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  animation: dropin .15s var(--spring) both;
}
@keyframes dropin { from { opacity:0; transform: translateY(-6px) scale(0.97); } to { opacity:1; transform: none; } }
.pl-sort-opt {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; background: none; border: none; cursor: pointer;
  padding: 8px 10px; border-radius: 7px;
  font-family: var(--mono); font-size: 11px; color: var(--text-mid);
  transition: background .12s, color .12s;
}
.pl-sort-opt:hover { background: rgba(255,255,255,0.06); color: var(--text); }
.pl-sort-opt.on { color: var(--accent); }

/* View toggle */
.pl-view {
  display: flex; gap: 2px; background: rgba(255,255,255,0.04);
  border: 1px solid var(--border); border-radius: 9px; padding: 3px; flex-shrink: 0;
}
.pl-vbtn {
  width: 30px; height: 28px; border-radius: 6px; border: none;
  background: transparent; color: var(--text-dim); cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: background .15s, color .15s;
}
.pl-vbtn:hover:not(.on) { color: var(--text-mid); }
.pl-vbtn.on { background: var(--accent-lo); color: var(--accent); }

/* Count */
.pl-count {
  font-family: var(--mono); font-size: 11px;
  color: var(--text-dim); white-space: nowrap; padding-left: 2px;
}
.pl-count b { color: var(--accent); font-weight: 500; }

/* Category pills */
.pl-cats-wrap { border-top: 1px solid var(--border); overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
.pl-cats-wrap::-webkit-scrollbar { display: none; }
.pl-cats {
  max-width: 1280px; margin: 0 auto;
  padding: 10px 56px 11px;
  display: flex; gap: 6px; flex-wrap: nowrap;
}
.pl-cat {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 5px 14px; border-radius: 999px;
  border: 1px solid var(--border); background: transparent; color: var(--text-dim);
  cursor: pointer; transition: border-color .14s, color .14s, background .14s;
  white-space: nowrap; flex-shrink: 0;
}
.pl-cat:hover { border-color: rgba(255,255,255,0.2); color: var(--text-mid); }
.pl-cat.on { background: var(--accent); border-color: var(--accent); color: #07090E; font-weight: 600; }

/* ════════════════════════════════════════════════════════════════
   MAIN CONTENT
════════════════════════════════════════════════════════════════ */
.pl-main {
  max-width: 1280px; margin: 0 auto;
  padding: 44px 56px 100px; position: relative; z-index: 1;
}

.pl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.pl-list { display: flex; flex-direction: column; gap: 10px; }

.pl-shell {
  position: relative; border-radius: var(--rad); border: 1px solid var(--border);
  background: var(--bg-card); overflow: hidden; animation: cardin 0.38s both;
  transition: transform 0.28s var(--spring), border-color 0.20s ease, box-shadow 0.28s ease;
}
@keyframes cardin { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: none; } }
.pl-shell:hover { border-color: var(--border-hi); box-shadow: 0 0 0 1px rgba(0,210,130,0.06), 0 24px 64px -12px rgba(0,0,0,0.55), 0 4px 16px 0px rgba(0,0,0,0.28); }
.pl-shell.grid:hover { transform: translateY(-5px); }
.pl-shell.list:hover { transform: translateX(5px); }
.pl-shell-line {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px; z-index: 2;
  background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%);
  opacity: 0; transition: opacity .22s;
}
.pl-shell:hover .pl-shell-line { opacity: 1; }

/* Empty */
.pl-empty { text-align: center; padding: 100px 20px 80px; }
.pl-empty-sym   { font-size: 4rem; color: var(--text-dim); line-height: 1; margin-bottom: 20px; font-weight: 300; }
.pl-empty-title { font-size: 1.1rem; font-weight: 700; color: var(--text-mid); margin-bottom: 8px; }
.pl-empty-sub   { font-family: var(--mono); font-size: 12px; color: var(--text-dim); margin-bottom: 28px; }
.pl-empty-btn {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.10em; text-transform: uppercase;
  background: var(--accent-lo); border: 1px solid var(--border-hi);
  border-radius: 999px; color: var(--accent); padding: 9px 22px;
  cursor: pointer; transition: background .15s;
}
.pl-empty-btn:hover { background: rgba(0,210,130,0.18); }

/* Load more */
.pl-more { margin-top: 56px; display: flex; align-items: center; gap: 20px; }
.pl-more-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--border), transparent); }
.pl-more-btn {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--sans); font-size: 12px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 11px 28px; border-radius: 999px;
  background: transparent; border: 1px solid var(--border); color: var(--text-mid);
  cursor: pointer; white-space: nowrap;
  transition: border-color .18s, color .18s, background .18s;
}
.pl-more-btn:hover { border-color: var(--border-hi); color: var(--accent); background: var(--accent-lo); }

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — TABLET  (≤ 1024px)
════════════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .pl-hero  { padding: 64px 40px 52px; }
  .pl-bar   { padding: 0 40px; }
  .pl-cats  { padding-left: 40px; padding-right: 40px; }
  .pl-main  { padding: 36px 40px 80px; }
  .pl-grid  { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — SMALL TABLET  (≤ 900px)
════════════════════════════════════════════════════════════════ */
@media (max-width: 900px) {
  .pl-hero  { padding: 52px 24px 44px; }
  .pl-bar   { padding: 0 20px; gap: 8px; }
  .pl-cats  { padding-left: 20px; padding-right: 20px; }
  .pl-main  { padding: 28px 20px 72px; }

  /* hero meta moves below text, shows inline */
  .pl-hero-inner { flex-direction: column; align-items: flex-start; gap: 24px; }
  .pl-hero-meta {
    width: 100%; justify-content: center;
    padding: 16px 24px; gap: 20px; border-radius: 12px;
  }
  .pl-meta-num { font-size: 1.6rem; }

  .pl-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — MOBILE  (≤ 640px)
════════════════════════════════════════════════════════════════ */
@media (max-width: 640px) {
  /* Hero */
  .pl-hero { padding: 44px 16px 36px; }
  .pl-title { font-size: clamp(2.2rem, 9vw, 3rem); }
  .pl-hero-meta { gap: 12px; padding: 14px 16px; }
  .pl-meta-num { font-size: 1.4rem; }
  .pl-meta-sep { height: 28px; }

  /* Toolbar — two rows */
  .pl-bar {
    flex-wrap: wrap; height: auto;
    padding: 10px 16px 0; gap: 8px;
  }
  .pl-search-label {
    flex: 1 1 100%; /* full row */
    max-width: 100%;
  }
  .pl-bar-right {
    flex: 1 1 100%; /* full row */
    margin-left: 0;
    padding-bottom: 10px;
    justify-content: flex-start;
    gap: 8px;
  }
  .pl-count { margin-left: auto; }

  /* Hide sort label text, show icon-only button */
  .pl-sort-label { display: none; }
  .pl-sort-btn { padding: 8px 10px; }

  /* Category pills */
  .pl-cats { padding-left: 16px; padding-right: 16px; gap: 5px; }
  .pl-cat { font-size: 9px; padding: 5px 11px; }

  /* Cards */
  .pl-main { padding: 20px 16px 64px; }
  .pl-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }

  /* Load more */
  .pl-more { gap: 12px; margin-top: 40px; }
  .pl-more-btn { padding: 10px 20px; font-size: 11px; }

  /* Empty state */
  .pl-empty { padding: 60px 16px 50px; }
  .pl-empty-sym { font-size: 3rem; }
}

/* ════════════════════════════════════════════════════════════════
   RESPONSIVE — SMALL MOBILE  (≤ 400px)
════════════════════════════════════════════════════════════════ */
@media (max-width: 400px) {
  .pl-title { font-size: 2rem; }
  .pl-grid  { grid-template-columns: 1fr; }

  /* Meta strip: tighten */
  .pl-hero-meta { gap: 10px; padding: 12px 12px; }
  .pl-meta-num  { font-size: 1.25rem; }
  .pl-meta-label{ font-size: 8px; }

  /* Loader tagline */
  .ldr-tagline { font-size: 9px; letter-spacing: 0.06em; }
}

/* ════════════════════════════════════════════════════════════════
   TOUCH — remove hover transforms on touch devices
════════════════════════════════════════════════════════════════ */
@media (hover: none) {
  .pl-shell.grid:hover { transform: none; }
  .pl-shell.list:hover { transform: none; }
  .pl-shell:hover .pl-shell-line { opacity: 0; }
}
`;e.s(["default",()=>s],63570)}]);