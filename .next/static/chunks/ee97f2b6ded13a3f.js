(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,75254,e=>{"use strict";var t=e.i(71645);let r=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim(),i=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,t.forwardRef)(({color:e="currentColor",size:i=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:s="",children:l,iconNode:d,...c},p)=>(0,t.createElement)("svg",{ref:p,...a,width:i,height:i,stroke:e,strokeWidth:o?24*Number(n)/Number(i):n,className:r("lucide",s),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]])),o=(e,a)=>{let o=(0,t.forwardRef)(({className:o,...s},l)=>(0,t.createElement)(n,{ref:l,iconNode:a,className:r(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,o),...s}));return o.displayName=i(e),o};e.s(["default",()=>o],75254)},88653,e=>{"use strict";e.i(47167);var t=e.i(43476),r=e.i(71645),i=e.i(31178),a=e.i(47414),n=e.i(74008),o=e.i(21476),s=e.i(72846),l=r,d=e.i(37806);function c(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class p extends l.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,r=(0,s.isHTMLElement)(e)&&e.offsetWidth||0,i=(0,s.isHTMLElement)(e)&&e.offsetHeight||0,a=this.props.sizeRef.current;a.height=t.offsetHeight||0,a.width=t.offsetWidth||0,a.top=t.offsetTop,a.left=t.offsetLeft,a.right=r-a.width-a.left,a.bottom=i-a.height-a.top}return null}componentDidUpdate(){}render(){return this.props.children}}function x({children:e,isPresent:i,anchorX:a,anchorY:n,root:o,pop:s}){let x=(0,l.useId)(),f=(0,l.useRef)(null),h=(0,l.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:g}=(0,l.useContext)(d.MotionConfigContext),m=function(...e){return r.useCallback(function(...e){return t=>{let r=!1,i=e.map(e=>{let i=c(e,t);return r||"function"!=typeof i||(r=!0),i});if(r)return()=>{for(let t=0;t<i.length;t++){let r=i[t];"function"==typeof r?r():c(e[t],null)}}}}(...e),e)}(f,e.props?.ref??e?.ref);return(0,l.useInsertionEffect)(()=>{let{width:e,height:t,top:r,left:l,right:d,bottom:c}=h.current;if(i||!1===s||!f.current||!e||!t)return;let p="left"===a?`left: ${l}`:`right: ${d}`,m="bottom"===n?`bottom: ${c}`:`top: ${r}`;f.current.dataset.motionPopId=x;let u=document.createElement("style");g&&(u.nonce=g);let b=o??document.head;return b.appendChild(u),u.sheet&&u.sheet.insertRule(`
          [data-motion-pop-id="${x}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${p}px !important;
            ${m}px !important;
          }
        `),()=>{b.contains(u)&&b.removeChild(u)}},[i]),(0,t.jsx)(p,{isPresent:i,childRef:f,sizeRef:h,pop:s,children:!1===s?e:l.cloneElement(e,{ref:m})})}let f=({children:e,initial:i,isPresent:n,onExitComplete:s,custom:l,presenceAffectsLayout:d,mode:c,anchorX:p,anchorY:f,root:g})=>{let m=(0,a.useConstant)(h),u=(0,r.useId)(),b=!0,y=(0,r.useMemo)(()=>(b=!1,{id:u,initial:i,isPresent:n,custom:l,onExitComplete:e=>{for(let t of(m.set(e,!0),m.values()))if(!t)return;s&&s()},register:e=>(m.set(e,!1),()=>m.delete(e))}),[n,m,s]);return d&&b&&(y={...y}),(0,r.useMemo)(()=>{m.forEach((e,t)=>m.set(t,!1))},[n]),r.useEffect(()=>{n||m.size||!s||s()},[n]),e=(0,t.jsx)(x,{pop:"popLayout"===c,isPresent:n,anchorX:p,anchorY:f,root:g,children:e}),(0,t.jsx)(o.PresenceContext.Provider,{value:y,children:e})};function h(){return new Map}var g=e.i(64978);let m=e=>e.key||"";function u(e){let t=[];return r.Children.forEach(e,e=>{(0,r.isValidElement)(e)&&t.push(e)}),t}let b=({children:e,custom:o,initial:s=!0,onExitComplete:l,presenceAffectsLayout:d=!0,mode:c="sync",propagate:p=!1,anchorX:x="left",anchorY:h="top",root:b})=>{let[y,w]=(0,g.usePresence)(p),v=(0,r.useMemo)(()=>u(e),[e]),j=p&&!y?[]:v.map(m),k=(0,r.useRef)(!0),N=(0,r.useRef)(v),C=(0,a.useConstant)(()=>new Map),E=(0,r.useRef)(new Set),[S,z]=(0,r.useState)(v),[A,T]=(0,r.useState)(v);(0,n.useIsomorphicLayoutEffect)(()=>{k.current=!1,N.current=v;for(let e=0;e<A.length;e++){let t=m(A[e]);j.includes(t)?(C.delete(t),E.current.delete(t)):!0!==C.get(t)&&C.set(t,!1)}},[A,j.length,j.join("-")]);let B=[];if(v!==S){let e=[...v];for(let t=0;t<A.length;t++){let r=A[t],i=m(r);j.includes(i)||(e.splice(t,0,r),B.push(r))}return"wait"===c&&B.length&&(e=B),T(u(e)),z(v),null}let{forceRender:L}=(0,r.useContext)(i.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:A.map(e=>{let r=m(e),i=(!p||!!y)&&(v===A||j.includes(r));return(0,t.jsx)(f,{isPresent:i,initial:(!k.current||!!s)&&void 0,custom:o,presenceAffectsLayout:d,mode:c,root:b,onExitComplete:i?void 0:()=>{if(E.current.has(r)||(E.current.add(r),!C.has(r)))return;C.set(r,!0);let e=!0;C.forEach(t=>{t||(e=!1)}),e&&(L?.(),T(N.current),p&&w?.(),l&&l())},anchorX:x,anchorY:h,children:e},r)})})};e.s(["AnimatePresence",()=>b],88653)},55436,e=>{"use strict";let t=(0,e.i(75254).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",()=>t],55436)},37727,e=>{"use strict";let t=(0,e.i(75254).default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);e.s(["X",()=>t],37727)},39312,e=>{"use strict";let t=(0,e.i(75254).default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);e.s(["Zap",()=>t],39312)},46349,e=>{"use strict";let t=(0,e.i(75254).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["default",()=>t])},95468,e=>{"use strict";let t=(0,e.i(75254).default)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["CheckCircle2",()=>t],95468)},63059,e=>{"use strict";var t=e.i(46349);e.s(["ChevronRight",()=>t.default])},1928,7233,99023,96407,e=>{"use strict";var t=e.i(75254);let r=(0,t.default)("shopping-cart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);e.s(["ShoppingCart",()=>r],1928);let i=(0,t.default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",()=>i],7233);let a=(0,t.default)("minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);e.s(["Minus",()=>a],99023);var n=e.i(43476),o=e.i(71645),s=e.i(46932),l=e.i(88653),d=e.i(18566);let c=(e=1)=>`rgba(255,176,0,${e})`;function p({open:e,onClose:t}){let r=(0,d.useRouter)();return(0,n.jsx)(l.AnimatePresence,{children:e&&(0,n.jsx)(s.motion.div,{className:"fixed inset-0 z-[100] flex items-center justify-center px-4",style:{background:"rgba(0,0,0,0.85)",backdropFilter:"blur(8px)"},initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:(0,n.jsxs)(s.motion.div,{initial:{scale:.96,opacity:0,y:12},animate:{scale:1,opacity:1,y:0},exit:{scale:.96,opacity:0,y:12},transition:{duration:.25,ease:[.16,1,.3,1]},style:{width:"100%",maxWidth:420,background:"#0a0900",border:`1px solid ${c(.2)}`,boxShadow:"0 32px 64px rgba(0,0,0,0.7)",position:"relative",overflow:"hidden"},children:[(0,n.jsx)("div",{style:{height:1,overflow:"hidden",background:c(.1),position:"relative"},children:(0,n.jsx)(s.motion.div,{style:{position:"absolute",top:0,bottom:0,width:"40%",background:`linear-gradient(to right, transparent, ${c(.65)}, transparent)`},animate:{left:["-40%","140%"]},transition:{duration:2.2,repeat:1/0,ease:"linear",repeatDelay:1.5}})}),(0,n.jsx)("div",{style:{position:"absolute",top:8,left:8,width:10,height:10,borderTop:`1px solid ${c(.4)}`,borderLeft:`1px solid ${c(.4)}`}}),(0,n.jsx)("div",{style:{position:"absolute",top:8,right:8,width:10,height:10,borderTop:`1px solid ${c(.4)}`,borderRight:`1px solid ${c(.4)}`}}),(0,n.jsx)("div",{style:{position:"absolute",bottom:8,left:8,width:10,height:10,borderBottom:`1px solid ${c(.18)}`,borderLeft:`1px solid ${c(.18)}`}}),(0,n.jsx)("div",{style:{position:"absolute",bottom:8,right:8,width:10,height:10,borderBottom:`1px solid ${c(.18)}`,borderRight:`1px solid ${c(.18)}`}}),(0,n.jsxs)("div",{style:{padding:"28px 24px 24px",maxHeight:"80vh",overflowY:"auto"},children:[(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:12},children:[(0,n.jsx)(s.motion.div,{style:{width:5,height:5,borderRadius:"50%",background:c(.85),boxShadow:`0 0 5px ${c(.6)}`,flexShrink:0},animate:{opacity:[1,.2,1]},transition:{duration:1.2,repeat:1/0}}),(0,n.jsx)("span",{style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.55rem",letterSpacing:"0.28em",color:c(.45)},children:"AUTH_RESTRICTED"})]}),(0,n.jsx)("h2",{style:{fontFamily:"'IBM Plex Sans Condensed', sans-serif",fontWeight:700,fontSize:"1.4rem",color:c(.9),lineHeight:1.1,margin:"0 0 12px"},children:"Authentication Required"}),(0,n.jsx)("p",{style:{fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:300,fontSize:"0.9rem",color:((e=1)=>`rgba(220,215,200,${e})`)(.5),lineHeight:1.6,margin:"0 0 24px"},children:"Active session protocol is required to initiate inventory requests from the IDEA Lab registry. Please establish credentials to proceed."}),(0,n.jsx)("div",{style:{height:1,background:`linear-gradient(to right, ${c(.15)}, transparent)`,marginBottom:20}}),(0,n.jsx)("style",{children:`
                .modal-btn-row { display: flex; justify-content: flex-end; gap: 10px; }
                @media (max-width: 440px) {
                  .modal-btn-row { flex-direction: column-reverse; align-items: stretch; }
                }
              `}),(0,n.jsxs)("div",{className:"modal-btn-row",children:[(0,n.jsx)(x,{onClick:t}),(0,n.jsx)(f,{onClick:()=>r.push("/login")})]})]})]})})})}function x({onClick:e}){let[t,r]=(0,o.useState)(!1);return(0,n.jsx)("button",{onClick:e,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.6rem",letterSpacing:"0.2em",padding:"10px 20px",background:"transparent",border:`1px solid ${t?"rgba(255,176,0,0.3)":"rgba(255,176,0,0.14)"}`,color:t?"rgba(255,176,0,0.65)":"rgba(255,176,0,0.35)",cursor:"pointer",transition:"all 0.18s"},children:"ABORT_REQUEST"})}function f({onClick:e}){let[t,r]=(0,o.useState)(!1);return(0,n.jsxs)("button",{onClick:e,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),style:{position:"relative",overflow:"hidden",fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.6rem",letterSpacing:"0.2em",padding:"10px 24px",background:"rgba(255,176,0,0.9)",border:"none",color:"#0a0900",fontWeight:700,cursor:"pointer",boxShadow:t?"0 0 22px rgba(255,176,0,0.4)":"0 0 12px rgba(255,176,0,0.2)",transition:"box-shadow 0.18s"},children:[t&&(0,n.jsx)("span",{style:{position:"absolute",inset:0,background:"linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",pointerEvents:"none"}}),(0,n.jsx)("span",{style:{position:"relative",zIndex:1},children:"ESTABLISH_AUTH →"})]})}e.s(["default",()=>p],96407)},10542,e=>{"use strict";var t=e.i(86427),r=e.i(65566),i=e.i(71645),a=e.i(60830),n=e.i(87022);function o(e,t){let r,i=()=>{let{currentTime:i}=t,a=(null===i?0:i.value)/100;r!==a&&e(a),r=a};return n.frame.preUpdate(i,!0),()=>(0,n.cancelFrame)(i)}var s=e.i(61327),l=e.i(83920),d=e.i(25791);let c=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),p={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function x(e,t,r,i){let a=r[t],{length:n,position:o}=p[t],s=a.current,c=r.time;a.current=e[`scroll${o}`],a.scrollLength=e[`scroll${n}`]-e[`client${n}`],a.offset.length=0,a.offset[0]=0,a.offset[1]=a.scrollLength,a.progress=(0,l.progress)(0,a.scrollLength,a.current);let x=i-c;a.velocity=x>50?0:(0,d.velocityPerSecond)(a.current-s,x)}e.i(47167);var f=e.i(44230),h=e.i(15923),g=e.i(76959),m=e.i(72846);let u={start:0,center:.5,end:1};function b(e,t,r=0){let i=0;if(e in u&&(e=u[e]),"string"==typeof e){let t=parseFloat(e);e.endsWith("px")?i=t:e.endsWith("%")?e=t/100:e.endsWith("vw")?i=t/100*document.documentElement.clientWidth:e.endsWith("vh")?i=t/100*document.documentElement.clientHeight:e=t}return"number"==typeof e&&(i=t*e),r+i}let y=[0,0],w=[[0,0],[1,1]],v={x:0,y:0},j=new WeakMap,k=new WeakMap,N=new WeakMap,C=new WeakMap,E=new WeakMap,S=e=>e===document.scrollingElement?window:e;function z(e,{container:t=document.scrollingElement,trackContentSize:r=!1,...i}={}){if(!t)return a.noop;let o=N.get(t);o||(o=new Set,N.set(t,o));let l=function(e,t,r,i={}){return{measure:t=>{!function(e,t=e,r){if(r.x.targetOffset=0,r.y.targetOffset=0,t!==e){let i=t;for(;i&&i!==e;)r.x.targetOffset+=i.offsetLeft,r.y.targetOffset+=i.offsetTop,i=i.offsetParent}r.x.targetLength=t===e?t.scrollWidth:t.clientWidth,r.y.targetLength=t===e?t.scrollHeight:t.clientHeight,r.x.containerLength=e.clientWidth,r.y.containerLength=e.clientHeight}(e,i.target,r),x(e,"x",r,t),x(e,"y",r,t),r.time=t,(i.offset||i.target)&&function(e,t,r){let{offset:i=w}=r,{target:a=e,axis:n="y"}=r,o="y"===n?"height":"width",s=a!==e?function(e,t){let r={x:0,y:0},i=e;for(;i&&i!==t;)if((0,m.isHTMLElement)(i))r.x+=i.offsetLeft,r.y+=i.offsetTop,i=i.offsetParent;else if("svg"===i.tagName){let e=i.getBoundingClientRect(),t=(i=i.parentElement).getBoundingClientRect();r.x+=e.left-t.left,r.y+=e.top-t.top}else if(i instanceof SVGGraphicsElement){let{x:e,y:t}=i.getBBox();r.x+=e,r.y+=t;let a=null,n=i.parentNode;for(;!a;)"svg"===n.tagName&&(a=n),n=i.parentNode;i=a}else break;return r}(a,e):v,l=a===e?{width:e.scrollWidth,height:e.scrollHeight}:"getBBox"in a&&"svg"!==a.tagName?a.getBBox():{width:a.clientWidth,height:a.clientHeight},d={width:e.clientWidth,height:e.clientHeight};t[n].offset.length=0;let c=!t[n].interpolate,p=i.length;for(let e=0;e<p;e++){let r=function(e,t,r,i){let a=Array.isArray(e)?e:y,n=0;return"number"==typeof e?a=[e,e]:"string"==typeof e&&(a=(e=e.trim()).includes(" ")?e.split(" "):[e,u[e]?e:"0"]),(n=b(a[0],r,i))-b(a[1],t)}(i[e],d[o],l[o],s[n]);c||r===t[n].interpolatorOffsets[e]||(c=!0),t[n].offset[e]=r}c&&(t[n].interpolate=(0,f.interpolate)(t[n].offset,(0,h.defaultOffset)(i),{clamp:!1}),t[n].interpolatorOffsets=[...t[n].offset]),t[n].progress=(0,g.clamp)(0,1,t[n].interpolate(t[n].current))}(e,r,i)},notify:()=>t(r)}}(t,e,{time:0,x:c(),y:c()},i);if(o.add(l),!j.has(t)){let e=()=>{for(let e of o)e.measure(n.frameData.timestamp);n.frame.preUpdate(r)},r=()=>{for(let e of o)e.notify()},i=()=>n.frame.read(e);j.set(t,i);let a=S(t);window.addEventListener("resize",i),t!==document.documentElement&&k.set(t,(0,s.resize)(t,i)),a.addEventListener("scroll",i),i()}if(r&&!E.has(t)){let e=j.get(t),r={width:t.scrollWidth,height:t.scrollHeight};C.set(t,r);let i=n.frame.read(()=>{let i=t.scrollWidth,a=t.scrollHeight;(r.width!==i||r.height!==a)&&(e(),r.width=i,r.height=a)},!0);E.set(t,i)}let d=j.get(t);return n.frame.read(d,!1,!0),()=>{(0,n.cancelFrame)(d);let e=N.get(t);if(!e||(e.delete(l),e.size))return;let r=j.get(t);j.delete(t),r&&(S(t).removeEventListener("scroll",r),k.get(t)?.(),window.removeEventListener("resize",r));let i=E.get(t);i&&((0,n.cancelFrame)(i),E.delete(t)),C.delete(t)}}var A=e.i(30551);function T(e){return"undefined"!=typeof window&&!e&&(0,A.supportsScrollTimeline)()}let B=new Map;function L({source:e,container:t,...r}){var i;let a,n,{axis:o}=r;e&&(t=e);let s=B.get(t)??new Map;B.set(t,s);let l=r.target??"self",d=s.get(l)??{},c=o+(r.offset??[]).join(",");return d[c]||(d[c]=T(r.target)?new ScrollTimeline({source:t,axis:o}):(i={container:t,...r},a={value:0},n=z(e=>{a.value=100*e[i.axis].progress},i),{currentTime:a,cancel:n})),d[c]}function M(e,{axis:t="y",container:r=document.scrollingElement,...i}={}){var n,s;let l;if(!r)return a.noop;let d={axis:t,container:r,...i};return"function"==typeof e?(n=e,s=d,2===n.length?z(e=>{n(e[s.axis].progress,e)},s):o(n,L(s))):(l=L(d),e.attachTimeline({timeline:d.target?void 0:l,observe:e=>(e.pause(),o(t=>{e.time=e.iterationDuration*t},l))}))}var R=e.i(47414),I=e.i(74008);let P=()=>({scrollX:(0,t.motionValue)(0),scrollY:(0,t.motionValue)(0),scrollXProgress:(0,t.motionValue)(0),scrollYProgress:(0,t.motionValue)(0)}),W=e=>!!e&&!e.current;function $(e,t,r){return{factory:i=>M(i,{...t,axis:e,container:r}),times:[0,1],keyframes:[0,1],ease:e=>e,duration:1}}function q({container:e,target:t,...a}={}){let n=(0,R.useConstant)(P);if(!t&&T()){let t=e?.current||void 0;n.scrollXProgress.accelerate=$("x",a,t),n.scrollYProgress.accelerate=$("y",a,t)}let o=(0,i.useRef)(null),s=(0,i.useRef)(!1),l=(0,i.useCallback)(()=>(o.current=M((e,{x:t,y:r})=>{n.scrollX.set(t.current),n.scrollXProgress.set(t.progress),n.scrollY.set(r.current),n.scrollYProgress.set(r.progress)},{...a,container:e?.current||void 0,target:t?.current||void 0}),()=>{o.current?.()}),[e,t,JSON.stringify(a.offset)]);return(0,I.useIsomorphicLayoutEffect)(()=>{if(s.current=!1,!(W(e)||W(t)))return l();s.current=!0},[l]),(0,i.useEffect)(()=>s.current?((0,r.invariant)(!W(e),"Container ref is defined but not hydrated","use-scroll-ref"),(0,r.invariant)(!W(t),"Target ref is defined but not hydrated","use-scroll-ref"),l()):void 0,[l]),n}e.s(["useScroll",()=>q],10542)},95420,87652,e=>{"use strict";var t=e.i(44230),r=e.i(47414),i=e.i(87022),a=e.i(74008),n=e.i(86427),o=e.i(71645),s=e.i(37806);function l(e){let t=(0,r.useConstant)(()=>(0,n.motionValue)(e)),{isStatic:i}=(0,o.useContext)(s.MotionConfigContext);if(i){let[,r]=(0,o.useState)(e);(0,o.useEffect)(()=>t.on("change",r),[])}return t}function d(e,t){let r=l(t()),n=()=>r.set(t());return n(),(0,a.useIsomorphicLayoutEffect)(()=>{let t=()=>i.frame.preRender(n,!1,!0),r=e.map(e=>e.on("change",t));return()=>{r.forEach(e=>e()),(0,i.cancelFrame)(n)}}),r}e.s(["useMotionValue",()=>l],87652);function c(e,t){let i=(0,r.useConstant)(()=>[]);return d(e,()=>{i.length=0;let r=e.length;for(let t=0;t<r;t++)i[t]=e[t].get();return t(i)})}e.s(["useTransform",()=>function e(i,a,o,s){if("function"==typeof i){let e;return n.collectMotionValues.current=[],i(),e=d(n.collectMotionValues.current,i),n.collectMotionValues.current=void 0,e}if(void 0!==o&&!Array.isArray(o)&&"function"!=typeof a){var l=i,p=a,x=o,f=s;let t=(0,r.useConstant)(()=>Object.keys(x)),n=(0,r.useConstant)(()=>({}));for(let r of t)n[r]=e(l,p,x[r],f);return n}let h="function"==typeof a?a:function(...e){let r=!Array.isArray(e[0]),i=r?0:-1,a=e[0+i],n=e[1+i],o=e[2+i],s=e[3+i],l=(0,t.interpolate)(n,o,s);return r?l(a):l}(a,o,s),g=Array.isArray(i)?c(i,h):c([i],([e])=>h(e)),m=Array.isArray(i)?void 0:i.accelerate;return m&&!m.isTransformed&&"function"!=typeof a&&Array.isArray(o)&&s?.clamp!==!1&&(g.accelerate={...m,times:a,keyframes:o,isTransformed:!0,...s?.ease?{ease:s.ease}:{}}),g}],95420)},68054,e=>{"use strict";let t=(0,e.i(75254).default)("terminal",[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]);e.s(["Terminal",()=>t],68054)},66992,e=>{"use strict";let t=(0,e.i(75254).default)("cpu",[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]);e.s(["Cpu",()=>t],66992)},20800,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(46932),a=e.i(88653),n=e.i(10542),o=e.i(95420),s=e.i(1928),l=e.i(7233),d=e.i(99023),c=e.i(55436),p=e.i(37727),x=e.i(95468),f=e.i(63059),h=e.i(66992),g=e.i(68054),m=e.i(39312),u=e.i(17927),b=e.i(96407);function y(){let[e,y]=(0,r.useState)([]),[v,j]=(0,r.useState)([]),[k,N]=(0,r.useState)(null),[C,E]=(0,r.useState)(""),[S,z]=(0,r.useState)(!1),[A,T]=(0,r.useState)(!1),[B,L]=(0,r.useState)(!1),[M,R]=(0,r.useState)(!1),[I,P]=(0,r.useState)("all"),[W,$]=(0,r.useState)("name"),[q,H]=(0,r.useState)(null),[O,U]=(0,r.useState)(!1),[D,Y]=(0,r.useState)({name:"",college:"FISAT",department:"",phone:"",purpose:""}),[F,_]=(0,r.useState)(!0),[V,X]=(0,r.useState)(0),[Q,G]=(0,r.useState)(0),Z=(0,r.useRef)(null),{scrollY:J}=(0,n.useScroll)(),K=(0,o.useTransform)(J,[0,260],[1,0]),ee=(0,o.useTransform)(J,[0,260],[0,-40]);(0,r.useEffect)(()=>{u.supabase.auth.getUser().then(({data:e})=>N(e.user))},[]),(0,r.useEffect)(()=>{G(0);let e=setTimeout(()=>{X(30),G(1)},120),t=setTimeout(()=>X(70),400);return u.supabase.from("inventory_items").select("id, name, category, quantity_available").eq("is_active",!0).order("name").then(({data:e})=>{e&&y(e),X(100),G(2),setTimeout(()=>_(!1),700)}),()=>{clearTimeout(e),clearTimeout(t)}},[]);let et=(0,r.useCallback)(e=>{k?e():L(!0)},[k]),er=(0,r.useCallback)(e=>{0!==e.quantity_available&&(j(t=>{let r=t.find(t=>t.id===e.id);return r?r.quantity>=e.quantity_available?t:t.map(t=>t.id===e.id?{...t,quantity:t.quantity+1}:t):[...t,{...e,quantity:1}]}),H(e.name),setTimeout(()=>H(null),2e3))},[]),ei=(0,r.useCallback)((e,t)=>{j(r=>r.map(r=>{if(r.id!==e)return r;let i=r.quantity+t;return i<1||i>r.quantity_available?r:{...r,quantity:i}}))},[]),ea=(0,r.useCallback)(e=>{j(t=>t.filter(t=>t.id!==e))},[]),en=async()=>{if(!k)return;let{name:e,department:t,phone:r,purpose:i}=D;if(e&&t&&r&&i)try{if(R(!0),!(await fetch("/api/inventory-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:k.id,requester:D,items:v.map(e=>({id:e.id,quantity:e.quantity}))})})).ok)return;j([]),z(!1),T(!1),U(!0),setTimeout(()=>U(!1),2500)}finally{R(!1)}},eo=["all",...Array.from(new Set(e.map(e=>e.category)))],es=e.filter(e=>`${e.name} ${e.category}`.toLowerCase().includes(C.toLowerCase())&&("all"===I||e.category===I)).sort((e,t)=>"availability"===W?t.quantity_available-e.quantity_available:e.name.localeCompare(t.name)),el=v.reduce((e,t)=>e+t.quantity,0),ed=v.length;return(0,t.jsxs)("div",{className:"r",children:[(0,t.jsx)("style",{children:w}),(0,t.jsx)(a.AnimatePresence,{children:F&&(0,t.jsxs)(i.motion.div,{className:"loader",initial:{opacity:1},exit:{opacity:0,transition:{duration:.55,ease:[.4,0,.2,1]}},children:[(0,t.jsx)("div",{className:"loader-orb","aria-hidden":!0}),(0,t.jsxs)(i.motion.div,{className:"loader-body",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.1},children:[(0,t.jsx)("div",{className:"ld-mark",children:(0,t.jsx)(h.Cpu,{size:18,color:"#f97316",strokeWidth:2})}),(0,t.jsxs)("div",{className:"ld-type",children:[(0,t.jsx)("span",{className:"ld-h1",children:"LAB"}),(0,t.jsx)("span",{className:"ld-h2",children:"INVENTORY"})]}),(0,t.jsx)("p",{className:"ld-sub",children:"FISAT · IDEA LAB"}),(0,t.jsx)("div",{className:"ld-bar-wrap",children:(0,t.jsx)(i.motion.div,{className:"ld-bar-fill",animate:{width:`${V}%`},transition:{duration:.45,ease:[.4,0,.2,1]}})}),(0,t.jsxs)("div",{className:"ld-phase-row",children:[(0,t.jsx)("span",{className:"ld-phase-dot",style:{background:2===Q?"#22c55e":"#f97316"}}),(0,t.jsxs)("span",{className:"ld-phase-txt",children:[0===Q&&"INITIALIZING...",1===Q&&"QUERYING DATABASE...",2===Q&&"ASSETS LOADED"]}),(0,t.jsxs)("span",{className:"ld-pct",children:[V,"%"]})]})]})]})}),(0,t.jsx)("div",{className:"bg-cover","aria-hidden":!0}),(0,t.jsx)("div",{className:"bg-grid","aria-hidden":!0}),(0,t.jsx)("div",{className:"orb","aria-hidden":!0}),(0,t.jsx)(a.AnimatePresence,{children:q&&(0,t.jsxs)(i.motion.div,{className:"toast t-orange",initial:{opacity:0,y:18,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.95},transition:{type:"spring",stiffness:380,damping:28},children:[(0,t.jsx)("div",{className:"t-ico o-ico",children:(0,t.jsx)(x.CheckCircle2,{size:13,color:"#f97316"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"t-title",children:"ADDED TO REQUEST"}),(0,t.jsx)("p",{className:"t-sub",children:q})]})]})}),(0,t.jsx)(a.AnimatePresence,{children:O&&(0,t.jsxs)(i.motion.div,{className:"toast t-green",initial:{opacity:0,y:18,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.95},transition:{type:"spring",stiffness:380,damping:28},children:[(0,t.jsx)("div",{className:"t-ico g-ico",children:(0,t.jsx)(x.CheckCircle2,{size:13,color:"#22c55e"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"t-title",children:"REQUEST SUBMITTED"}),(0,t.jsx)("p",{className:"t-sub",children:"Lab team will review shortly"})]})]})}),(0,t.jsxs)("header",{className:"hdr",children:[(0,t.jsxs)("div",{className:"hdr-l",children:[(0,t.jsx)("div",{className:"hdr-mark",children:(0,t.jsx)(h.Cpu,{size:12,color:"#f97316",strokeWidth:2.5})}),(0,t.jsx)("span",{className:"hdr-name",children:"LAB INVENTORY"}),(0,t.jsx)("span",{className:"hdr-pipe"}),(0,t.jsx)("span",{className:"hdr-sub",children:"FISAT · IDEA LAB"})]}),(0,t.jsxs)("div",{className:"hdr-r",children:[k&&(0,t.jsxs)("span",{className:"sync-tag",children:[(0,t.jsx)("span",{className:"sync-dot"}),"SYNC_ACTIVE"]}),(0,t.jsxs)("button",{className:`cart-btn ${el>0?"cart-btn-active":""}`,onClick:()=>et(()=>z(!0)),suppressHydrationWarning:!0,children:[(0,t.jsx)(s.ShoppingCart,{size:14,strokeWidth:2}),(0,t.jsx)("span",{children:el>0?`${ed} ITEM${1!==ed?"S":""}`:"CART"}),(0,t.jsx)(a.AnimatePresence,{children:el>0&&(0,t.jsx)(i.motion.span,{className:"cart-pip",initial:{scale:0},animate:{scale:1},exit:{scale:0},children:el})})]})]})]}),(0,t.jsxs)(i.motion.section,{className:"hero",ref:Z,style:{opacity:K,y:ee},children:[(0,t.jsxs)("div",{className:"term",children:[(0,t.jsx)("span",{className:"term-cursor"})," ",(0,t.jsx)("span",{className:"term-dim",children:"[SYSTEM_REPORT]"}),(0,t.jsxs)("span",{className:"term-row",children:[(0,t.jsx)("span",{className:"term-arrow",children:">"})," DATABASE_QUERY: ",(0,t.jsx)("span",{className:"term-ok",children:"SUCCESS"})]}),(0,t.jsxs)("span",{className:"term-row",children:[(0,t.jsx)("span",{className:"term-arrow",children:">"})," ASSETS_LOCATED: ",(0,t.jsx)("span",{className:"term-ok",children:"TRUE"})]}),(0,t.jsxs)("span",{className:"term-row",children:[(0,t.jsx)("span",{className:"term-arrow",children:">"})," TERMINAL: ",(0,t.jsx)("span",{className:"term-ok",children:"FISAT_IDEA_LAB"})]})]}),(0,t.jsxs)("div",{className:"hero-eyebrow",children:[(0,t.jsx)("span",{className:"ey-pill",children:"LIVE RESOURCE DATABASE"}),(0,t.jsx)("span",{className:"ey-line"}),(0,t.jsx)("span",{className:"ey-tag",children:"SYNC_ACTIVE"})]}),(0,t.jsxs)("div",{className:"hero-type",children:[(0,t.jsx)(i.motion.h1,{className:"ht-solid",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},children:"LAB"}),(0,t.jsx)(i.motion.h1,{className:"ht-outline",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08,ease:[.16,1,.3,1]},children:"INVENTORY"})]}),(0,t.jsxs)(i.motion.p,{className:"hero-desc",initial:{opacity:0},animate:{opacity:1},transition:{delay:.3,duration:.5},children:["Browse, reserve, and request equipment for your projects.",(0,t.jsx)("br",{}),"All reservations are reviewed by lab coordinators."]})]}),(0,t.jsxs)("div",{className:"fbar",children:[(0,t.jsxs)("div",{className:"fbar-top",children:[(0,t.jsxs)("div",{className:"srch-wrap",children:[(0,t.jsx)(c.Search,{size:13,className:"srch-ico",strokeWidth:2}),(0,t.jsx)("input",{className:"srch-inp",placeholder:"SEARCH COMPONENTS, TOOLS...",value:C,onChange:e=>E(e.target.value),suppressHydrationWarning:!0}),C&&(0,t.jsx)("button",{className:"srch-clear",onClick:()=>E(""),children:(0,t.jsx)(p.X,{size:12})})]}),(0,t.jsxs)("select",{className:"sort-sel",value:W,onChange:e=>$(e.target.value),suppressHydrationWarning:!0,children:[(0,t.jsx)("option",{value:"name",children:"SORT: NAME"}),(0,t.jsx)("option",{value:"availability",children:"SORT: AVAILABILITY"})]})]}),(0,t.jsx)("div",{className:"cat-row",children:eo.map(e=>(0,t.jsx)("button",{className:`cat-btn ${I===e?"cat-on":""}`,onClick:()=>P(e),suppressHydrationWarning:!0,children:"all"===e?"ALL":e.toUpperCase()},e))}),(0,t.jsxs)("div",{className:"result-line",children:[(0,t.jsx)("span",{className:"result-count",children:es.length}),(0,t.jsxs)("span",{className:"result-label",children:[" ASSET",1!==es.length?"S":""," FOUND"]}),"all"!==I&&(0,t.jsxs)("span",{className:"result-cat",children:[" · ",I.toUpperCase()]})]})]}),(0,t.jsxs)("div",{className:"grid",children:[(0,t.jsx)(a.AnimatePresence,{mode:"popLayout",children:es.map((e,r)=>{var n;let o=0===(n=e.quantity_available)?{short:"UNAVAILABLE",color:"#ef4444",bg:"rgba(239,68,68,0.10)",border:"rgba(239,68,68,0.28)"}:n<10?{short:"LIMITED",color:"#f97316",bg:"rgba(249,115,22,0.10)",border:"rgba(249,115,22,0.36)"}:{short:"AVAILABLE",color:"#22c55e",bg:"rgba(34,197,94,0.10)",border:"rgba(34,197,94,0.28)"},s=v.find(t=>t.id===e.id),d=0===e.quantity_available;return(0,t.jsxs)(i.motion.div,{className:`card ${d?"card-off":""}`,layout:!0,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,scale:.95},transition:{duration:.22,delay:Math.min(.028*r,.28)},whileHover:d?{}:{y:-3},children:[(0,t.jsx)("span",{className:"card-scan"}),(0,t.jsxs)("div",{className:"card-r1",children:[(0,t.jsx)("div",{className:`card-ico ${d?"":"card-ico-lit"}`,children:(0,t.jsx)(h.Cpu,{size:15,color:d?"#333":"#f97316",strokeWidth:2})}),(0,t.jsx)(a.AnimatePresence,{children:s&&(0,t.jsxs)(i.motion.span,{className:"incart-pill",initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.7},children:["×",s.quantity]})})]}),(0,t.jsxs)("div",{className:"card-body",children:[(0,t.jsx)("h3",{className:"card-name",children:e.name}),(0,t.jsx)("p",{className:"card-cat",children:e.category.toUpperCase()})]}),(0,t.jsxs)("div",{className:"card-meta",children:[(0,t.jsxs)("span",{className:"st-badge",style:{color:o.color,background:o.bg,borderColor:o.border},children:[(0,t.jsx)("span",{className:"st-dot",style:{background:o.color}}),o.short]}),(0,t.jsxs)("span",{className:"card-qty",children:["QTY·",String(e.quantity_available).padStart(3,"0")]})]}),(0,t.jsx)("button",{className:`card-cta ${d?"cta-off":"cta-on"}`,disabled:d,onClick:()=>et(()=>er(e)),suppressHydrationWarning:!0,children:d?"UNAVAILABLE":(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.Plus,{size:11,strokeWidth:3}),"REQUEST"]})})]},e.id)})}),0===es.length&&(0,t.jsxs)("div",{className:"empty",children:[(0,t.jsx)(h.Cpu,{size:38,style:{opacity:.1,marginBottom:14}}),(0,t.jsx)("p",{className:"empty-h",children:"NO ASSETS FOUND"}),(0,t.jsx)("p",{className:"empty-s",children:"Adjust search or category filter"})]})]}),(0,t.jsx)(a.AnimatePresence,{children:S&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.motion.div,{className:"overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>z(!1)}),(0,t.jsxs)(i.motion.aside,{className:"drawer",initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",stiffness:330,damping:34},children:[(0,t.jsxs)("div",{className:"dr-head",children:[(0,t.jsxs)("div",{className:"dr-head-l",children:[(0,t.jsx)("div",{className:"dr-mark",children:(0,t.jsx)(s.ShoppingCart,{size:13,color:"#f97316"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"dr-title",children:"REQUEST CART"}),(0,t.jsx)("p",{className:"dr-sub",children:0===v.length?"EMPTY":`${ed} TYPE${1!==ed?"S":""} \xb7 ${el} UNIT${1!==el?"S":""}`})]})]}),(0,t.jsx)("button",{className:"ico-btn",onClick:()=>z(!1),suppressHydrationWarning:!0,children:(0,t.jsx)(p.X,{size:14})})]}),(0,t.jsx)("div",{className:"dr-rule"}),(0,t.jsx)("div",{className:"dr-body",children:0===v.length?(0,t.jsxs)("div",{className:"dr-empty",children:[(0,t.jsx)(s.ShoppingCart,{size:30,style:{opacity:.12,marginBottom:10}}),(0,t.jsx)("p",{className:"dr-empty-t",children:"CART IS EMPTY"}),(0,t.jsx)("p",{className:"dr-empty-s",children:"Add items from the inventory below"})]}):(0,t.jsx)(a.AnimatePresence,{children:v.map(e=>(0,t.jsxs)(i.motion.div,{className:"dr-item",layout:!0,initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:20,height:0,marginBottom:0,padding:0},transition:{duration:.2},children:[(0,t.jsx)("div",{className:"dri-ico",children:(0,t.jsx)(h.Cpu,{size:12,color:"#f97316"})}),(0,t.jsxs)("div",{className:"dri-info",children:[(0,t.jsx)("p",{className:"dri-name",children:e.name}),(0,t.jsx)("p",{className:"dri-cat",children:e.category.toUpperCase()})]}),(0,t.jsxs)("div",{className:"dri-ctrl",children:[(0,t.jsx)("button",{className:"q-btn",onClick:()=>ei(e.id,-1),suppressHydrationWarning:!0,children:(0,t.jsx)(d.Minus,{size:9,strokeWidth:3})}),(0,t.jsx)("span",{className:"q-val",children:e.quantity}),(0,t.jsx)("button",{className:"q-btn",onClick:()=>ei(e.id,1),suppressHydrationWarning:!0,children:(0,t.jsx)(l.Plus,{size:9,strokeWidth:3})}),(0,t.jsx)("button",{className:"del-btn",onClick:()=>ea(e.id),suppressHydrationWarning:!0,children:(0,t.jsx)(p.X,{size:11})})]})]},e.id))})}),(0,t.jsxs)("div",{className:"dr-foot",children:[v.length>0&&(0,t.jsxs)("div",{className:"dr-note",children:[(0,t.jsx)(g.Terminal,{size:11,style:{flexShrink:0,color:"#f97316",marginTop:1}}),(0,t.jsx)("span",{children:"Requests are subject to coordinator approval and current availability."})]}),(0,t.jsxs)("button",{className:"cta-primary",disabled:0===v.length,onClick:()=>T(!0),suppressHydrationWarning:!0,children:["PROCEED TO DETAILS ",(0,t.jsx)(f.ChevronRight,{size:14,strokeWidth:2.5})]})]})]})]})}),(0,t.jsx)(a.AnimatePresence,{children:A&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.motion.div,{className:"overlay",style:{zIndex:60},initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>T(!1)}),(0,t.jsx)(i.motion.div,{className:"modal-shell",style:{zIndex:61},initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:(0,t.jsxs)(i.motion.div,{className:"modal",initial:{scale:.93,y:16},animate:{scale:1,y:0},exit:{scale:.93,y:16},onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"modal-hd",children:[(0,t.jsx)("div",{className:"modal-ico",children:(0,t.jsx)(m.Zap,{size:16,color:"#f97316",strokeWidth:2.5})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"modal-title",children:"REQUESTER DETAILS"}),(0,t.jsx)("p",{className:"modal-sub",children:"Complete the form to submit your request"})]}),(0,t.jsx)("button",{className:"ico-btn",style:{marginLeft:"auto"},onClick:()=>T(!1),suppressHydrationWarning:!0,children:(0,t.jsx)(p.X,{size:13})})]}),(0,t.jsx)("div",{className:"modal-rule"}),[{k:"name",l:"FULL NAME",p:"Your full name"},{k:"department",l:"DEPARTMENT",p:"e.g. ECE, CSE, ME"},{k:"phone",l:"PHONE",p:"10-digit mobile number"},{k:"purpose",l:"PROJECT / USE",p:"Describe your use case briefly"}].map(({k:e,l:r,p:i})=>(0,t.jsxs)("div",{className:"mfield",children:[(0,t.jsx)("label",{className:"mfield-l",children:r}),(0,t.jsx)("input",{className:"mfield-i",placeholder:i,value:D[e],onChange:t=>Y({...D,[e]:t.target.value}),suppressHydrationWarning:!0})]},e)),(0,t.jsxs)("div",{className:"modal-acts",children:[(0,t.jsx)("button",{className:"ghost-btn",onClick:()=>T(!1),suppressHydrationWarning:!0,children:"CANCEL"}),(0,t.jsx)("button",{className:"cta-primary",style:{flex:2},disabled:M,onClick:en,suppressHydrationWarning:!0,children:M?"SUBMITTING...":"SUBMIT REQUEST"})]})]})})]})}),(0,t.jsx)(b.default,{open:B,onClose:()=>L(!1)})]})}let w=`
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Barlow:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

.r {
  min-height:100vh;
  background:#090909;
  color:#e0dbd3;
  font-family:'Barlow',sans-serif;
  position:relative;
  overflow-x:hidden;
  /* kill any inherited global bg pattern */
  isolation:isolate;
}

/* solid cover to nuke any global dot/particle backgrounds */
.bg-cover{
  position:fixed;inset:0;
  background:#090909;
  pointer-events:none;
  z-index:0;
}

/* line grid sits on top of the cover */
.bg-grid{
  position:fixed;inset:0;pointer-events:none;z-index:1;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size:60px 60px;
}

/* ─ ambient orb ─ */
.orb{
  position:fixed;top:-200px;right:-140px;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(249,115,22,0.06) 0%,transparent 68%);
  pointer-events:none;z-index:2;
  animation:orb-drift 10s ease-in-out infinite;
}
/* second orb — bottom-left, very subtle */
.orb::after{
  content:'';
  position:fixed;bottom:-200px;left:-100px;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(249,115,22,0.03) 0%,transparent 65%);
  pointer-events:none;
}
@keyframes orb-drift{
  0%,100%{transform:translate(0,0) scale(1);}
  50%{transform:translate(-24px,36px) scale(1.06);}
}

/* ─ header ─ */
.hdr{
  position:sticky;top:0;z-index:40;
  background:rgba(9,9,9,0.96);
  backdrop-filter:blur(22px);
  border-bottom:1px solid rgba(255,255,255,0.05);
  padding:0 36px;height:58px;
  display:flex;align-items:center;justify-content:space-between;
}
.hdr-l{display:flex;align-items:center;gap:12px;}
.hdr-mark{
  width:28px;height:28px;border-radius:6px;
  border:1px solid rgba(249,115,22,0.35);
  display:flex;align-items:center;justify-content:center;
  background:rgba(249,115,22,0.05);
}
.hdr-name{
  font-family:'Barlow Condensed',sans-serif;
  font-size:15px;font-weight:800;letter-spacing:0.14em;color:#e0dbd3;
}
.hdr-pipe{width:1px;height:16px;background:rgba(255,255,255,0.08);}
.hdr-sub{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:500;letter-spacing:0.12em;color:#444;
}
.hdr-r{display:flex;align-items:center;gap:14px;}
.sync-tag{
  display:flex;align-items:center;gap:7px;
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:600;letter-spacing:0.12em;color:#555;
}
.sync-dot{
  width:6px;height:6px;border-radius:50%;
  background:#22c55e;
  box-shadow:0 0 8px #22c55e;
  animation:blink 2.2s ease-in-out infinite;
}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.25;}}

/* cart button */
.cart-btn{
  display:flex;align-items:center;gap:8px;
  background:transparent;
  border:1px solid rgba(255,255,255,0.08);
  border-radius:6px;padding:7px 16px;
  cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:700;letter-spacing:0.1em;color:#e0dbd3;
  transition:border-color 0.2s,background 0.2s,box-shadow 0.2s;
  position:relative;
}
.cart-btn:hover{border-color:rgba(249,115,22,0.4);background:rgba(249,115,22,0.05);}
.cart-btn-active{
  border-color:rgba(249,115,22,0.5)!important;
  background:rgba(249,115,22,0.08)!important;
  box-shadow:0 0 18px rgba(249,115,22,0.12);
  color:#f97316!important;
}
.cart-pip{
  position:absolute;top:-7px;right:-7px;
  background:#f97316;color:#fff;
  font-size:10px;font-weight:800;
  min-width:18px;height:18px;border-radius:9px;
  display:flex;align-items:center;justify-content:center;
  padding:0 4px;box-shadow:0 0 10px rgba(249,115,22,0.6);
}

/* ─ hero ─ */
.hero{
  position:relative;z-index:3;
  padding:56px 36px 44px;
  max-width:1380px;margin:0 auto;
}

/* terminal readout */
.term{
  position:absolute;top:48px;right:36px;
  display:none;flex-direction:column;gap:0;
  background:#0d0d0d;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:8px;padding:14px 18px;
  font-family:'Barlow Condensed',monospace;
  font-size:11px;letter-spacing:0.04em;
}
@media(min-width:860px){.term{display:flex;}}
.term-cursor{
  display:inline-block;width:7px;height:11px;
  background:#f97316;vertical-align:middle;
  animation:blink-cur 1s step-end infinite;
}
@keyframes blink-cur{0%,100%{opacity:1;}50%{opacity:0;}}
.term-dim{color:#3a3a3a;margin-bottom:6px;font-size:10px;}
.term-row{display:block;color:#666;line-height:1.9;}
.term-arrow{color:#2a2a2a;}
.term-ok{color:#f97316;}

.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;margin-bottom:20px;}
.ey-pill{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:0.12em;color:#f97316;
  border:1px solid rgba(249,115,22,0.3);border-radius:3px;padding:3px 10px;
}
.ey-line{width:28px;height:1px;background:rgba(255,255,255,0.1);}
.ey-tag{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:600;letter-spacing:0.12em;color:#444;
}

/* hero type */
.hero-type{line-height:0.92;margin-bottom:24px;user-select:none;}
.ht-solid{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(80px,11vw,130px);
  font-weight:900;letter-spacing:-0.01em;
  color:#e0dbd3;display:block;
}
.ht-outline{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(80px,11vw,130px);
  font-weight:900;letter-spacing:-0.01em;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(255,255,255,0.08);
  display:block;margin-top:-6px;
}

.hero-desc{
  font-size:14px;color:#555;line-height:1.8;
  max-width:420px;font-weight:400;
}

/* ─ filter bar ─ */
.fbar{
  position:relative;z-index:3;
  padding:0 36px 18px;
  max-width:1380px;margin:0 auto;
  display:flex;flex-direction:column;gap:10px;
}
.fbar-top{display:flex;gap:8px;align-items:center;}

/* search */
.srch-wrap{position:relative;flex:1;}
.srch-ico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#444;pointer-events:none;}
.srch-clear{
  position:absolute;right:10px;top:50%;transform:translateY(-50%);
  background:transparent;border:none;color:#444;cursor:pointer;
  display:flex;align-items:center;justify-content:center;padding:3px;
  transition:color 0.15s;
}
.srch-clear:hover{color:#e0dbd3;}
.srch-inp{
  width:100%;
  background:#0e0e0e;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:6px;padding:11px 34px 11px 36px;
  color:#e0dbd3;
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:600;letter-spacing:0.08em;
  outline:none;transition:border-color 0.2s,background 0.2s;
}
.srch-inp:focus{border-color:rgba(249,115,22,0.3);background:#111;}
.srch-inp::placeholder{color:#333;}

.sort-sel{
  background:#0e0e0e;border:1px solid rgba(255,255,255,0.06);
  border-radius:6px;padding:11px 14px;color:#e0dbd3;
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:700;letter-spacing:0.1em;
  outline:none;cursor:pointer;transition:border-color 0.2s;
  flex-shrink:0;
}
.sort-sel:focus{border-color:rgba(249,115,22,0.3);}
.sort-sel option{background:#111;}

/* category chips */
.cat-row{display:flex;gap:6px;flex-wrap:wrap;}
.cat-btn{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:0.1em;
  padding:5px 13px;border-radius:4px;
  border:1px solid rgba(255,255,255,0.06);
  background:transparent;color:#555;cursor:pointer;
  transition:all 0.15s;white-space:nowrap;
}
.cat-btn:hover{border-color:rgba(249,115,22,0.3);color:#f97316;background:rgba(249,115,22,0.04);}
.cat-on{background:#f97316!important;border-color:#f97316!important;color:#fff!important;}

/* result line */
.result-line{
  display:flex;align-items:baseline;gap:2px;
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;letter-spacing:0.08em;
}
.result-count{font-size:14px;font-weight:800;color:#f97316;}
.result-label{color:#444;font-weight:600;}
.result-cat{color:#555;font-weight:600;}

/* ─ grid ─ */
.grid{
  position:relative;z-index:3;
  padding:0 36px 80px;
  max-width:1380px;margin:0 auto;
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
  gap:12px;
}

/* ─ card ─ */
.card{
  background:#0f0f0f;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:14px;padding:20px;
  display:flex;flex-direction:column;gap:14px;
  position:relative;overflow:hidden;
  cursor:default;
  transition:border-color 0.25s,box-shadow 0.25s;
}

/* top-edge scan glow — hidden until hover */
.card-scan{
  position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(249,115,22,0),transparent);
  transition:background 0.35s;
}
.card:hover:not(.card-off) .card-scan{
  background:linear-gradient(90deg,transparent 5%,rgba(249,115,22,0.7) 50%,transparent 95%);
}
.card:hover:not(.card-off){
  border-color:rgba(249,115,22,0.22);
  box-shadow:0 0 0 1px rgba(249,115,22,0.06),0 6px 28px rgba(0,0,0,0.5),0 0 40px rgba(249,115,22,0.04);
}

.card-off{opacity:0.38;}
.card-off:hover{border-color:rgba(255,255,255,0.06)!important;box-shadow:none!important;}

.card-r1{display:flex;justify-content:space-between;align-items:center;}
.card-ico{
  width:38px;height:38px;border-radius:10px;
  background:#1a1a1a;border:1px solid rgba(255,255,255,0.06);
  display:flex;align-items:center;justify-content:center;
  transition:background 0.2s,border-color 0.2s;
}
.card-ico-lit{
  background:rgba(249,115,22,0.1);
  border-color:rgba(249,115,22,0.25);
}
.card:hover:not(.card-off) .card-ico-lit{
  background:rgba(249,115,22,0.16);
  border-color:rgba(249,115,22,0.4);
}

/* in-cart indicator — solid, impossible to miss */
.incart-pill{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:800;letter-spacing:0.06em;
  background:#f97316;color:#fff;
  border-radius:5px;padding:3px 9px;
  box-shadow:0 0 12px rgba(249,115,22,0.45);
}

.card-body{flex:1;}
.card-name{
  font-family:'Barlow Condensed',sans-serif;
  font-size:16px;font-weight:700;letter-spacing:0.02em;
  color:#e0dbd3;line-height:1.3;
}
.card-cat{
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:600;letter-spacing:0.1em;
  color:#3a3a3a;margin-top:4px;
}

.card-meta{display:flex;align-items:center;justify-content:space-between;}
.st-badge{
  display:inline-flex;align-items:center;gap:5px;
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:800;letter-spacing:0.1em;
  padding:3px 9px;border-radius:4px;
  border-width:1px;border-style:solid;
}
.st-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.card-qty{
  font-family:'Barlow Condensed',monospace;
  font-size:12px;font-weight:600;letter-spacing:0.06em;color:#333;
}

/* card CTA */
.card-cta{
  width:100%;
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:800;letter-spacing:0.12em;
  padding:10px 12px;border-radius:8px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:5px;
  transition:all 0.18s;
}
.cta-on{
  background:rgba(249,115,22,0.08);
  border:1px solid rgba(249,115,22,0.22);color:#f97316;
}
.cta-on:hover{
  background:#f97316;border-color:#f97316;color:#fff;
  box-shadow:0 4px 20px rgba(249,115,22,0.3);
}
.cta-off{
  background:transparent;
  border:1px solid rgba(255,255,255,0.05);color:#333;cursor:not-allowed;
}

/* empty */
.empty{
  grid-column:1/-1;display:flex;flex-direction:column;
  align-items:center;justify-content:center;padding:90px 20px;
  color:#2a2a2a;text-align:center;
}
.empty-h{
  font-family:'Barlow Condensed',sans-serif;
  font-size:22px;font-weight:800;letter-spacing:0.1em;color:#2a2a2a;
}
.empty-s{font-size:13px;color:#333;margin-top:8px;}

/* ─ overlay ─ */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.84);backdrop-filter:blur(10px);z-index:50;}

/* ─ drawer ─ */
.drawer{
  position:fixed;right:0;top:0;
  height:100%;width:min(420px,100vw);
  background:#0b0b0b;
  border-left:1px solid rgba(255,255,255,0.07);
  z-index:55;display:flex;flex-direction:column;overflow:hidden;
}
.dr-head{
  padding:24px 22px 18px;
  border-bottom:1px solid rgba(255,255,255,0.05);
  display:flex;align-items:center;justify-content:space-between;
  flex-shrink:0;
}
.dr-head-l{display:flex;align-items:center;gap:12px;}
.dr-mark{
  width:32px;height:32px;border-radius:8px;
  background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.dr-title{
  font-family:'Barlow Condensed',sans-serif;
  font-size:18px;font-weight:800;letter-spacing:0.1em;color:#e0dbd3;
}
.dr-sub{
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:600;letter-spacing:0.12em;color:#444;margin-top:2px;
}

/* orange rule */
.dr-rule{
  height:2px;flex-shrink:0;
  background:linear-gradient(90deg,#f97316 0%,rgba(249,115,22,0.2) 60%,transparent 100%);
}

.dr-body{flex:1;overflow-y:auto;padding:16px 20px;}
.dr-empty{
  display:flex;flex-direction:column;align-items:center;
  padding-top:60px;
}
.dr-empty-t{
  font-family:'Barlow Condensed',sans-serif;
  font-size:16px;font-weight:800;letter-spacing:0.12em;color:#2a2a2a;margin-top:8px;
}
.dr-empty-s{font-size:12px;color:#333;margin-top:5px;letter-spacing:0.03em;}

/* drawer items — fully elevated, NOT merging with bg */
.dr-item{
  display:flex;align-items:center;gap:10px;
  padding:13px 14px;
  margin-bottom:8px;
  background:#141414;
  border:1px solid rgba(255,255,255,0.07);
  border-radius:10px;
  transition:border-color 0.2s,background 0.2s;
}
.dr-item:hover{border-color:rgba(249,115,22,0.25);background:#171717;}
.dri-ico{
  width:32px;height:32px;border-radius:8px;
  background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.dri-info{flex:1;min-width:0;}
.dri-name{
  font-family:'Barlow Condensed',sans-serif;
  font-size:14px;font-weight:700;letter-spacing:0.03em;color:#e0dbd3;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.dri-cat{
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px;font-weight:600;letter-spacing:0.1em;color:#444;margin-top:2px;
}
.dri-ctrl{display:flex;align-items:center;gap:7px;flex-shrink:0;}
.q-btn{
  width:26px;height:26px;border-radius:6px;
  background:#1c1c1c;border:1px solid rgba(255,255,255,0.07);
  color:#777;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:border-color 0.15s,color 0.15s;
}
.q-btn:hover{border-color:rgba(249,115,22,0.4);color:#f97316;}
.q-val{
  font-family:'Barlow Condensed',sans-serif;
  font-size:16px;font-weight:800;color:#e0dbd3;
  min-width:18px;text-align:center;
}
.del-btn{
  width:26px;height:26px;border-radius:6px;
  background:transparent;border:none;color:#444;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:color 0.15s;
}
.del-btn:hover{color:#ef4444;}

.dr-foot{
  padding:14px 20px;
  border-top:1px solid rgba(255,255,255,0.05);
  flex-shrink:0;display:flex;flex-direction:column;gap:10px;
}
.dr-note{
  display:flex;align-items:flex-start;gap:8px;
  background:rgba(249,115,22,0.04);
  border:1px solid rgba(249,115,22,0.1);
  border-radius:6px;padding:10px 12px;
  font-size:11.5px;color:#555;line-height:1.65;letter-spacing:0.02em;
}

/* ─ primary CTA ─ */
.cta-primary{
  width:100%;background:#f97316;color:#fff;
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:900;letter-spacing:0.12em;
  padding:13px 16px;border-radius:8px;border:none;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
  transition:background 0.2s,box-shadow 0.2s,transform 0.15s;
}
.cta-primary:hover:not(:disabled){
  background:#e8680a;
  box-shadow:0 6px 28px rgba(249,115,22,0.38);
  transform:translateY(-1px);
}
.cta-primary:active:not(:disabled){transform:translateY(0);}
.cta-primary:disabled{opacity:0.28;cursor:not-allowed;}

/* ─ modal ─ */
.modal-shell{
  position:fixed;inset:0;
  display:flex;align-items:center;justify-content:center;padding:20px;
}
.modal{
  background:#0c0c0c;
  border:1px solid rgba(255,255,255,0.09);
  border-radius:16px;padding:28px;
  width:100%;max-width:420px;
  display:flex;flex-direction:column;gap:16px;
}
.modal-hd{display:flex;align-items:center;gap:14px;}
.modal-ico{
  width:40px;height:40px;border-radius:10px;
  background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.28);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.modal-title{
  font-family:'Barlow Condensed',sans-serif;
  font-size:20px;font-weight:900;letter-spacing:0.1em;color:#e0dbd3;
}
.modal-sub{font-size:11.5px;color:#555;margin-top:3px;letter-spacing:0.02em;}
.modal-rule{height:1px;background:rgba(255,255,255,0.05);}

.mfield{display:flex;flex-direction:column;gap:6px;}
.mfield-l{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:0.12em;color:#555;
}
.mfield-i{
  background:#141414;border:1px solid rgba(255,255,255,0.06);
  border-radius:8px;padding:11px 13px;
  color:#e0dbd3;font-family:'Barlow',sans-serif;font-size:13px;
  outline:none;transition:border-color 0.2s,background 0.2s;width:100%;
}
.mfield-i:focus{border-color:rgba(249,115,22,0.35);background:#171717;}
.mfield-i::placeholder{color:#333;}

.modal-acts{display:flex;gap:10px;}
.ghost-btn{
  flex:1;background:transparent;
  border:1px solid rgba(255,255,255,0.07);
  color:#555;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:700;letter-spacing:0.1em;
  padding:12px;border-radius:8px;
  transition:border-color 0.15s,color 0.15s;
}
.ghost-btn:hover{border-color:rgba(255,255,255,0.14);color:#e0dbd3;}

/* ─ icon btn ─ */
.ico-btn{
  width:30px;height:30px;border-radius:6px;
  background:#161616;border:1px solid rgba(255,255,255,0.06);
  color:#555;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:color 0.15s,border-color 0.15s;flex-shrink:0;
}
.ico-btn:hover{color:#e0dbd3;border-color:rgba(255,255,255,0.12);}

/* ─ toasts ─ */
.toast{
  position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
  z-index:200;background:#0d0d0d;
  border-radius:12px;padding:13px 20px;
  display:flex;align-items:center;gap:13px;
  box-shadow:0 16px 48px rgba(0,0,0,0.75);
  white-space:nowrap;min-width:260px;
}
.t-orange{border:1px solid rgba(249,115,22,0.3);box-shadow:0 16px 48px rgba(0,0,0,0.75),0 0 30px rgba(249,115,22,0.08);}
.t-green {border:1px solid rgba(34,197,94,0.25);}
.t-ico{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.o-ico{background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.22);}
.g-ico{background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.22);}
.t-title{
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:800;letter-spacing:0.1em;color:#e0dbd3;
}
.t-sub{font-family:'Barlow',sans-serif;font-size:11px;color:#555;margin-top:2px;max-width:190px;overflow:hidden;text-overflow:ellipsis;}

/* ─ scrollbar ─ */
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#1e1e1e;border-radius:3px;}

/* ─ loader ─ */
.loader{
  position:fixed;inset:0;z-index:999;
  background:#090909;
  display:flex;align-items:center;justify-content:center;
  flex-direction:column;
  /* force block any global background */
  isolation:isolate;
}
.loader-orb{
  position:absolute;top:-160px;right:-100px;
  width:480px;height:480px;border-radius:50%;
  background:radial-gradient(circle,rgba(249,115,22,0.08) 0%,transparent 70%);
  pointer-events:none;
  animation:orb-drift 6s ease-in-out infinite;
}
/* line grid inside loader */
.loader::before{
  content:'';
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size:60px 60px;
  pointer-events:none;
}
.loader-body{
  display:flex;flex-direction:column;align-items:center;
  gap:0;position:relative;z-index:1;
}
.ld-mark{
  width:52px;height:52px;border-radius:13px;
  border:1px solid rgba(249,115,22,0.35);
  background:rgba(249,115,22,0.07);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:28px;
  box-shadow:0 0 28px rgba(249,115,22,0.12);
}
.ld-type{
  display:flex;flex-direction:column;align-items:center;
  line-height:0.88;margin-bottom:10px;user-select:none;
}
.ld-h1{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(60px,10vw,100px);
  font-weight:900;letter-spacing:-0.01em;
  color:#e0dbd3;
}
.ld-h2{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(60px,10vw,100px);
  font-weight:900;letter-spacing:-0.01em;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(255,255,255,0.1);
}
.ld-sub{
  font-family:'Barlow Condensed',sans-serif;
  font-size:12px;font-weight:600;letter-spacing:0.18em;
  color:#444;margin-bottom:36px;
}
.ld-bar-wrap{
  width:280px;height:2px;
  background:rgba(255,255,255,0.05);
  border-radius:2px;overflow:hidden;
  margin-bottom:14px;
}
.ld-bar-fill{
  height:100%;border-radius:2px;
  background:linear-gradient(90deg,#f97316,#fb923c);
  box-shadow:0 0 12px rgba(249,115,22,0.6);
  width:0%;
}
.ld-phase-row{
  display:flex;align-items:center;gap:8px;
  width:280px;justify-content:space-between;
}
.ld-phase-dot{
  width:6px;height:6px;border-radius:50%;flex-shrink:0;
  animation:blink 1.4s ease-in-out infinite;
}
.ld-phase-txt{
  font-family:'Barlow Condensed',sans-serif;
  font-size:11px;font-weight:600;letter-spacing:0.1em;color:#555;
  flex:1;
}
.ld-pct{
  font-family:'Barlow Condensed',monospace;
  font-size:11px;font-weight:700;letter-spacing:0.06em;color:#f97316;
}

/* ─ responsive ─ */
@media(max-width:640px){
  .hdr,.hero,.fbar,.grid{padding-left:16px;padding-right:16px;}
  .grid{grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:10px;padding-bottom:60px;}
  .ht-solid,.ht-outline{font-size:60px;}
  .hdr{padding:0 16px;}
  .hero{padding-top:36px;padding-bottom:28px;}
  .fbar{padding-bottom:14px;}
}
`;e.s(["default",()=>y])}]);