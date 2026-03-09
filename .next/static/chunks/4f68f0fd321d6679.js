(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,67271,e=>{"use strict";var t,n,r,l,a=e.i(43476),i=e.i(71645),o=e.i(17927);let s="carousel",c="controller",u="portal",d="toolbar",p="loading",f="error",g="complete",m=e=>`active-slide-${e}`;m(p),m("playing"),m(f),m(g);let h="flex_center",x="no_scroll_padding",v="slide",b="prev",y="next",w="swipe",E="close",N="onPointerDown",k="onPointerMove",C="onPointerUp",M="onPointerLeave",P="onPointerCancel",L="onKeyDown",S="onWheel",j="icon",R="contain",I="cover";var _=e.i(74080);let $="yarl__";function A(...e){return e.filter(Boolean).join(" ")}function O(e){return`${$}${e}`}function B(e){return`--${$}${e}`}function T(e,t){return`${e}${t?`_${t}`:""}`}function D(e){return t=>T(e,t)}function W(e,t){var n;return null!=(n=null==e?void 0:e[t])?n:t}function z(...e){return()=>{e.forEach(e=>{e()})}}function F(e,t,n){return()=>{let r=i.useContext(n);if(!r)throw Error(`${e} must be used within a ${t}.Provider`);return r}}function U(){return"undefined"!=typeof window}function X(e){return void 0===e.type||"image"===e.type}function H(e){return"string"==typeof e?Number.parseInt(e,10):e}function Y(e){if("number"==typeof e)return{pixel:e};if("string"==typeof e){let t=H(e);return e.endsWith("%")?{percent:t}:{pixel:t}}return{pixel:0}}function K(e,t){return t>0?(e%t+t)%t:0}function V(e,t){return e[K(t,e.length)]}function G(e,t){return e.length>0?V(e,t):void 0}let q=Number(i.version.split(".")[0])>=19,J={open:!1,close:()=>{},index:0,slides:[],render:{},plugins:[],toolbar:{buttons:[E]},labels:{},animation:{fade:250,swipe:500,easing:{fade:"ease",swipe:"ease-out",navigation:"ease-in-out"}},carousel:{finite:!1,preload:2,padding:"16px",spacing:"30%",imageFit:R,imageProps:{}},controller:{ref:null,focus:!0,aria:!1,touchAction:"none",closeOnPullUp:!1,closeOnPullDown:!1,closeOnBackdropClick:!1,preventDefaultWheelX:!0,preventDefaultWheelY:!1,disableSwipeNavigation:!1},portal:{},noScroll:{disabled:!1},on:{},styles:{},className:""};function Q(e,t){return{name:e,component:t}}function Z(e,t){return{module:e,children:t}}function ee(e,t,n){return e.flatMap(e=>{var r;return null!=(r=function e(t,n,r){return t.module.name===n?r(t):t.children?[Z(t.module,t.children.flatMap(t=>{var l;return null!=(l=e(t,n,r))?l:[]}))]:[t]}(e,t,n))?r:[]})}let et=i.createContext(null),en=F("useA11yContext","A11yContext",et);function er({children:e}){let[t,n]=i.useState(!1),[r,l]=i.useState(!1),a=i.useMemo(()=>({focusWithin:t,trackFocusWithin:(e,t)=>{let r=r=>l=>{var a;l.currentTarget.contains(l.relatedTarget)||n(r),null==(a=r?e:t)||a(l)};return{onFocus:r(!0),onBlur:r(!1)}},autoPlaying:r,setAutoPlaying:l}),[t,r]);return i.createElement(et.Provider,{value:a},e)}let el=i.createContext(null),ea=F("useDocument","DocumentContext",el);function ei({nodeRef:e,children:t}){let n=i.useMemo(()=>{let t=t=>{var n;return(null==(n=t||e.current)?void 0:n.ownerDocument)||document};return{getOwnerDocument:t,getOwnerWindow:e=>{var n;return(null==(n=t(e))?void 0:n.defaultView)||window}}},[e]);return i.createElement(el.Provider,{value:n},t)}let eo=i.createContext(null),es=F("useEvents","EventsContext",eo);function ec({children:e}){let[t]=i.useState({});i.useEffect(()=>()=>{Object.keys(t).forEach(e=>delete t[e])},[t]);let n=i.useMemo(()=>{let e=(e,n)=>{var r;null==(r=t[e])||r.splice(0,t[e].length,...t[e].filter(e=>e!==n))};return{publish:(...[e,n])=>{var r;null==(r=t[e])||r.forEach(e=>e(n))},subscribe:(n,r)=>(t[n]||(t[n]=[]),t[n].push(r),()=>e(n,r)),unsubscribe:e}},[t]);return i.createElement(eo.Provider,{value:n},e)}let eu=i.createContext(null),ed=F("useLightboxProps","LightboxPropsContext",eu);function ep({children:e,...t}){return i.createElement(eu.Provider,{value:t},e)}let ef=i.createContext(null),eg=F("useLightboxState","LightboxStateContext",ef),em=i.createContext(null),eh=F("useLightboxDispatch","LightboxDispatchContext",em);function ex(e,t){switch(t.type){case"swipe":{let{slides:n}=e,r=(null==t?void 0:t.increment)||0,l=e.globalIndex+r,a=K(l,n.length),i=G(n,a);return{slides:n,currentIndex:a,globalIndex:l,currentSlide:i,animation:r||void 0!==t.duration?{increment:r,duration:t.duration,easing:t.easing}:void 0}}case"update":if(t.slides!==e.slides||t.index!==e.currentIndex)return{slides:t.slides,currentIndex:t.index,globalIndex:t.index,currentSlide:G(t.slides,t.index)};return e;default:throw Error("Unknown action type")}}function ev({slides:e,index:t,children:n}){let[r,l]=i.useReducer(ex,{slides:e,currentIndex:t,globalIndex:t,currentSlide:G(e,t)});i.useEffect(()=>{l({type:"update",slides:e,index:t})},[e,t]);let a=i.useMemo(()=>({...r,state:r,dispatch:l}),[r,l]);return i.createElement(em.Provider,{value:l},i.createElement(ef.Provider,{value:a},n))}let eb=i.createContext(null),ey=F("useTimeouts","TimeoutsContext",eb);function ew({children:e}){let[t]=i.useState([]);i.useEffect(()=>()=>{t.forEach(e=>window.clearTimeout(e)),t.splice(0,t.length)},[t]);let n=i.useMemo(()=>{let e=e=>{t.splice(0,t.length,...t.filter(t=>t!==e))};return{setTimeout:(n,r)=>{let l=window.setTimeout(()=>{e(l),n()},r);return t.push(l),l},clearTimeout:t=>{void 0!==t&&(e(t),window.clearTimeout(t))}}},[t]);return i.createElement(eb.Provider,{value:n},e)}let eE=i.forwardRef(function({label:e,className:t,icon:n,renderIcon:r,onClick:l,style:a,...o},s){let{styles:c,labels:u}=ed(),d=W(u,e);return i.createElement("button",{ref:s,type:"button",title:d,"aria-label":d,className:A(O("button"),t),onClick:l,style:{...a,...c.button},...o},r?r():i.createElement(n,{className:O(j),style:c.icon}))});function eN(e,t){var n;let r;return n=i.createElement("g",{fill:"currentColor"},i.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),t),(r=e=>i.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false",...e},n)).displayName=e,r}let ek=eN("Close",i.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),eC=eN("Previous",i.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})),eM=eN("Next",i.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})),eP=eN("Loading",i.createElement(i.Fragment,null,Array.from({length:8}).map((e,t,n)=>i.createElement("line",{key:t,x1:"12",y1:"6.5",x2:"12",y2:"1.8",strokeLinecap:"round",strokeWidth:"2.6",stroke:"currentColor",strokeOpacity:1/n.length*(t+1),transform:`rotate(${360/n.length*t}, 12, 12)`})))),eL=eN("Error",i.createElement("path",{d:"M21.9,21.9l-8.49-8.49l0,0L3.59,3.59l0,0L2.1,2.1L0.69,3.51L3,5.83V19c0,1.1,0.9,2,2,2h13.17l2.31,2.31L21.9,21.9z M5,18 l3.5-4.5l2.5,3.01L12.17,15l3,3H5z M21,18.17L5.83,3H19c1.1,0,2,0.9,2,2V18.17z"})),eS=U()?i.useLayoutEffect:i.useEffect;function ej(){let[e,t]=i.useState(!1);return i.useEffect(()=>{var e,n;let r=null==(e=window.matchMedia)?void 0:e.call(window,"(prefers-reduced-motion: reduce)");t(null==r?void 0:r.matches);let l=e=>t(e.matches);return null==(n=null==r?void 0:r.addEventListener)||n.call(r,"change",l),()=>{var e;return null==(e=null==r?void 0:r.removeEventListener)?void 0:e.call(r,"change",l)}},[]),e}function eR(e,t){let n=i.useRef(void 0),r=i.useRef(void 0),l=ej();return eS(()=>{var a,i,o;if(e.current&&void 0!==n.current&&!l){let{keyframes:l,duration:s,easing:c,onfinish:u}=t(n.current,e.current.getBoundingClientRect(),function(e){let t=0,n=0,r=0,l=window.getComputedStyle(e).transform.match(/matrix.*\((.+)\)/);if(l){let e=l[1].split(",").map(H);6===e.length?(t=e[4],n=e[5]):16===e.length&&(t=e[12],n=e[13],r=e[14])}return{x:t,y:n,z:r}}(e.current))||{};if(l&&s){null==(a=r.current)||a.cancel(),r.current=void 0;try{r.current=null==(o=(i=e.current).animate)?void 0:o.call(i,l,{duration:s,easing:c})}catch(e){console.error(e)}r.current&&(r.current.onfinish=()=>{r.current=void 0,null==u||u()})}}n.current=void 0}),{prepareAnimation:e=>{n.current=e},isAnimationPlaying:()=>{var e;return(null==(e=r.current)?void 0:e.playState)==="running"}}}function eI(){let e=i.useRef(null),t=i.useRef(void 0),[n,r]=i.useState();return{setContainerRef:i.useCallback(n=>{e.current=n,t.current&&(t.current.disconnect(),t.current=void 0);let l=()=>{if(n){let e=window.getComputedStyle(n);r({width:Math.round(n.clientWidth-(parseFloat(e.paddingLeft)||0)-(parseFloat(e.paddingRight)||0)),height:Math.round(n.clientHeight-(parseFloat(e.paddingTop)||0)-(parseFloat(e.paddingBottom)||0))})}else r(void 0)};l(),n&&"undefined"!=typeof ResizeObserver&&(t.current=new ResizeObserver(l),t.current.observe(n))},[]),containerRef:e,containerRect:n}}function e_(){let e=i.useRef(void 0),{setTimeout:t,clearTimeout:n}=ey();return i.useCallback((r,l)=>{n(e.current),e.current=t(r,l>0?l:0)},[t,n])}function e$(e){let t=i.useRef(e);return eS(()=>{t.current=e}),i.useCallback((...e)=>{var n;return null==(n=t.current)?void 0:n.call(t,...e)},[])}function eA(e,t){"function"==typeof e?e(t):e&&(e.current=t)}function eO(e,t){return i.useMemo(()=>null==e&&null==t?null:n=>{eA(e,n),eA(t,n)},[e,t])}function eB(){let[e,t]=i.useState(!1);return eS(()=>{t("rtl"===window.getComputedStyle(window.document.documentElement).direction)},[]),e}function eT(e,t){let n=i.useRef(0),r=e_(),l=e$((...t)=>{n.current=Date.now(),e(t)});return i.useCallback((...e)=>{r(()=>{l(e)},t-(Date.now()-n.current))},[t,l,r])}let eD=D("slide"),eW=D("slide_image");function ez({slide:e,offset:t,render:n,rect:r,imageFit:l,imageProps:a,onClick:o,onLoad:s,onError:c,style:u}){var d,h,x,v,b,y,w,E;let[N,k]=i.useState(p),{publish:C}=es(),{setTimeout:M}=ey(),P=i.useRef(null);i.useEffect(()=>{0===t&&C(m(N))},[t,N,C]);let L=e$(e=>{("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{e.parentNode&&(k(g),M(()=>{null==s||s(e)},0))})}),S=i.useCallback(e=>{P.current=e,(null==e?void 0:e.complete)&&L(e)},[L]),_=i.useCallback(e=>{L(e.currentTarget)},[L]),$=e$(()=>{k(f),null==c||c()}),B=e.imageFit===I||e.imageFit!==R&&l===I,T=(e,t)=>Number.isFinite(e)?e:t,D=T(Math.max(...(null!=(h=null==(d=e.srcSet)?void 0:d.map(e=>e.width))?h:[]).concat(e.width?[e.width]:[]).filter(Boolean)),(null==(x=P.current)?void 0:x.naturalWidth)||0),W=T(Math.max(...(null!=(b=null==(v=e.srcSet)?void 0:v.map(e=>e.height))?b:[]).concat(e.height?[e.height]:[]).filter(Boolean)),(null==(y=P.current)?void 0:y.naturalHeight)||0),z=D&&W?{maxWidth:`min(${D}px, 100%)`,maxHeight:`min(${W}px, 100%)`}:{maxWidth:"100%",maxHeight:"100%"},F=null==(w=e.srcSet)?void 0:w.slice().sort((e,t)=>e.width-t.width).map(e=>`${e.src} ${e.width}w`).join(", "),X=F&&r&&U()?`${Math.round(Math.min(r&&!B&&e.width&&e.height?r.height/e.height*e.width:Number.MAX_VALUE,r.width))}px`:void 0,{style:H,className:Y,...K}=("function"==typeof a?a(e):a)||{};return i.createElement(i.Fragment,null,i.createElement("img",{ref:S,onLoad:_,onError:$,onClick:o,draggable:!1,className:A(O(eW()),B&&O(eW("cover")),N!==g&&O(eW("loading")),Y),style:{...z,...u,...H},...K,alt:null!=(E=e.alt)?E:"",sizes:X,srcSet:F,src:e.src}),N!==g&&i.createElement("div",{className:O(eD("placeholder"))},N===p&&((null==n?void 0:n.iconLoading)?n.iconLoading():i.createElement(eP,{className:A(O(j),O(eD(p)))})),N===f&&((null==n?void 0:n.iconError)?n.iconError():i.createElement(eL,{className:A(O(j),O(eD(f)))}))))}let eF=i.forwardRef(function({className:e,children:t,onFocus:n,onBlur:r,...l},a){let o=i.useRef(null),{trackFocusWithin:s}=en();return i.createElement(ei,{nodeRef:o},i.createElement("div",{ref:eO(a,o),className:A(O("root"),e),...s(n,r),...l},t))});(t=r||(r={}))[t.NONE=0]="NONE",t[t.SWIPE=1]="SWIPE",t[t.PULL=2]="PULL",t[t.ANIMATION=3]="ANIMATION",(n=l||(l={}))[n.NONE=0]="NONE",n[n.SWIPE=1]="SWIPE",n[n.PULL=2]="PULL";let eU=D("container"),eX=i.createContext(null),eH=F("useController","ControllerContext",eX),eY=Q(c,function({children:e,...t}){var n;let{carousel:a,animation:o,controller:s,on:c,styles:d,render:p}=t,{closeOnPullUp:f,closeOnPullDown:g,preventDefaultWheelX:m,preventDefaultWheelY:x}=s,[j,R]=i.useState(),I=eg(),_=eh(),[$,T]=i.useState(r.NONE),D=i.useRef(0),W=i.useRef(0),F=i.useRef(1),{registerSensors:U,subscribeSensors:X}=function(){let[e]=i.useState({}),t=i.useCallback((t,n)=>{var r;null==(r=e[t])||r.forEach(e=>{n.isPropagationStopped()||e(n)})},[e]);return{registerSensors:i.useMemo(()=>({onPointerDown:e=>t(N,e),onPointerMove:e=>t(k,e),onPointerUp:e=>t(C,e),onPointerLeave:e=>t(M,e),onPointerCancel:e=>t(P,e),onKeyDown:e=>t(L,e),onKeyUp:e=>t("onKeyUp",e),onWheel:e=>t(S,e)}),[t]),subscribeSensors:i.useCallback((t,n)=>(e[t]||(e[t]=[]),e[t].unshift(n),()=>{let r=e[t];r&&r.splice(0,r.length,...r.filter(e=>e!==n))}),[e])}}(),{subscribe:H,publish:K}=es(),V=e_(),G=e_(),q=e_(),{containerRef:J,setContainerRef:Q,containerRect:Z}=eI(),ee=eO(function({preventDefaultWheelX:e,preventDefaultWheelY:t}){let n=i.useRef(null),r=e$(n=>{let r=Math.abs(n.deltaX)>Math.abs(n.deltaY);(r&&e||!r&&t||n.ctrlKey)&&n.preventDefault()});return i.useCallback(e=>{var t;e?e.addEventListener("wheel",r,{passive:!1}):null==(t=n.current)||t.removeEventListener("wheel",r),n.current=e},[r])}({preventDefaultWheelX:m,preventDefaultWheelY:x}),Q),et=i.useRef(null),en=eO(et,void 0),{getOwnerDocument:er}=ea(),el=eB(),ei=e=>(el?-1:1)*("number"==typeof e?e:1),eo=e$(()=>{var e;return null==(e=J.current)?void 0:e.focus()}),ec=e$(()=>t),eu=e$(()=>I),ed=i.useCallback(e=>K(b,e),[K]),ep=i.useCallback(e=>K(y,e),[K]),ef=i.useCallback(()=>K(E),[K]),em=e=>!(a.finite&&(ei(e)>0&&0===I.currentIndex||0>ei(e)&&I.currentIndex===I.slides.length-1)),ex=e=>{var t;D.current=e,null==(t=J.current)||t.style.setProperty(B("swipe_offset"),`${Math.round(e)}px`)},ev=e=>{var t,n;W.current=e,F.current=Math.min(Math.max(function(e,t=0){let n=10**t;return Math.round((e+Number.EPSILON)*n)/n}(1-(g&&e>0?e:f&&e<0?-e:0)/60*.5,2),.5),1),null==(t=J.current)||t.style.setProperty(B("pull_offset"),`${Math.round(e)}px`),null==(n=J.current)||n.style.setProperty(B("pull_opacity"),`${F.current}`)},{prepareAnimation:eb}=eR(et,(e,t,n)=>{if(et.current&&Z)return{keyframes:[{transform:`translate(0, ${e.rect.y-t.y+n.y}px)`,opacity:e.opacity},{transform:"translate(0, 0)",opacity:1}],duration:e.duration,easing:o.easing.fade}}),ew=(e,t)=>{if(f||g){ev(e);let n=0;et.current&&(n=o.fade*(t?2:1),eb({rect:et.current.getBoundingClientRect(),opacity:F.current,duration:n})),q(()=>{ev(0),T(r.NONE)},n),T(r.ANIMATION),t||ef()}},{prepareAnimation:eE,isAnimationPlaying:eN}=eR(et,(e,t,n)=>{var r;if(et.current&&Z&&(null==(r=I.animation)?void 0:r.duration)){let r=Y(a.spacing),l=(r.percent?r.percent*Z.width/100:r.pixel)||0;return{keyframes:[{transform:`translate(${ei(I.globalIndex-e.index)*(Z.width+l)+e.rect.x-t.x+n.x}px, 0)`},{transform:"translate(0, 0)"}],duration:I.animation.duration,easing:I.animation.easing}}}),ek=e$(e=>{var t,n;let l=e.offset||0,a=l?o.swipe:null!=(t=o.navigation)?t:o.swipe,i=l||eN()?o.easing.swipe:o.easing.navigation,{direction:s}=e,c=null!=(n=e.count)?n:1,u=r.ANIMATION,d=a*c;if(!s){let t=null==Z?void 0:Z.width,n=e.duration||0,r=t?a/t*Math.abs(l):a;0!==c?(n<r?d=d/r*Math.max(n,r/5):t&&(d=a/t*(t-Math.abs(l))),s=ei(l)>0?b:y):d=a/2}let p=0;s===b?em(ei(1))?p=-c:(u=r.NONE,d=a):s===y&&(em(ei(-1))?p=c:(u=r.NONE,d=a)),G(()=>{ex(0),T(r.NONE)},d=Math.round(d)),et.current&&eE({rect:et.current.getBoundingClientRect(),index:I.globalIndex}),T(u),K(w,{type:"swipe",increment:p,duration:d,easing:i})});i.useEffect(()=>{var e,t;(null==(e=I.animation)?void 0:e.increment)&&(null==(t=I.animation)?void 0:t.duration)&&V(()=>_({type:"swipe",increment:0}),I.animation.duration)},[I.animation,_,V]);let eC=[X,em,(null==Z?void 0:Z.width)||0,o.swipe,()=>T(r.SWIPE),e=>ex(e),(e,t)=>ek({offset:e,duration:t,count:1}),e=>ek({offset:e,count:0})],eM=[()=>{g&&T(r.PULL)},e=>ev(e),e=>ew(e),e=>ew(e,!0)];!function({disableSwipeNavigation:e,closeOnBackdropClick:t},n,r,a,o,s,c,u,d,p,f,g,m,h,x,b){let y=i.useRef(0),w=i.useRef([]),E=i.useRef(void 0),L=i.useRef(0),S=i.useRef(l.NONE),j=i.useCallback(e=>{E.current===e.pointerId&&(E.current=void 0,S.current=l.NONE);let t=w.current;t.splice(0,t.length,...t.filter(t=>t.pointerId!==e.pointerId))},[]),R=i.useCallback(e=>{j(e),e.persist(),w.current.push(e)},[j]),I=i.useCallback(e=>w.current.find(({pointerId:t})=>e.pointerId===t),[]),_=e$(e=>{R(e)}),$=(e,t)=>f&&e>t||p&&e<-t,A=e$(e=>{let n=I(e);if(n)if(E.current===e.pointerId){let e=Date.now()-L.current,t=y.current;S.current===l.SWIPE?Math.abs(t)>.3*a||Math.abs(t)>5&&e<o?u(t,e):d(t):S.current===l.PULL&&($(t,60)?h(t,e):x(t)),y.current=0,S.current=l.NONE}else{let{target:r}=e;t&&r instanceof HTMLElement&&r===n.target&&(r.classList.contains(O(v))||r.classList.contains(O("slide_wrapper")))&&b()}j(e)}),B=e$(t=>{let n=I(t);if(n){let a=E.current===t.pointerId;if(0===t.buttons)return void(a&&0!==y.current?A(t):j(n));let i=t.clientX-n.clientX,o=t.clientY-n.clientY;if(void 0===E.current){let n=e=>{R(t),E.current=t.pointerId,L.current=Date.now(),S.current=e};Math.abs(i)>Math.abs(o)&&Math.abs(i)>30&&r(i)?e||(n(l.SWIPE),s()):Math.abs(o)>Math.abs(i)&&$(o,30)&&(n(l.PULL),g())}else a&&(S.current===l.SWIPE?(y.current=i,c(i)):S.current===l.PULL&&(y.current=o,m(o)))}});i.useEffect(()=>z(n(N,_),n(k,B),n(C,A),n(M,A),n(P,A)),[n,_,B,A,void 0])}(s,...eC,f,g,...eM,ef),function(e,t,n,l,a,o,s,c,u){let d=i.useRef(0),p=i.useRef(0),f=i.useRef(void 0),g=i.useRef(void 0),m=i.useRef(0),h=i.useRef(void 0),x=i.useRef(0),{setTimeout:v,clearTimeout:b}=ey(),y=i.useCallback(()=>{f.current&&(b(f.current),f.current=void 0)},[b]),w=i.useCallback(()=>{g.current&&(b(g.current),g.current=void 0)},[b]),E=e$(()=>{e!==r.SWIPE&&(d.current=0,x.current=0,y(),w())});i.useEffect(E,[e,E]);let N=e$(e=>{g.current=void 0,d.current===e&&u(d.current)}),k=e$(t=>{if(t.ctrlKey||Math.abs(t.deltaY)>Math.abs(t.deltaX))return;let i=e=>{m.current=e,b(h.current),h.current=e>0?v(()=>{m.current=0,h.current=void 0},300):void 0};if(e===r.NONE){if(Math.abs(t.deltaX)<=1.2*Math.abs(m.current))return void i(t.deltaX);if(!n(-t.deltaX))return;if(p.current+=t.deltaX,y(),Math.abs(p.current)>30)p.current=0,i(0),x.current=Date.now(),o();else{let e=p.current;f.current=v(()=>{f.current=void 0,e===p.current&&(p.current=0)},a)}}else if(e===r.SWIPE){let e=d.current-t.deltaX;if(d.current=e=Math.min(Math.abs(e),l)*Math.sign(e),s(e),w(),Math.abs(e)>.2*l){i(t.deltaX),c(e,Date.now()-x.current);return}g.current=v(()=>N(e),2*a)}else i(t.deltaX)});i.useEffect(()=>t(S,k),[t,k])}($,...eC);let eP=e$(()=>{s.focus&&er().querySelector(`.${O(u)} .${O(eU())}`)&&eo()});i.useEffect(eP,[eP]);let eL=e$(()=>{var e;null==(e=c.view)||e.call(c,{index:I.currentIndex})});i.useEffect(eL,[I.globalIndex,eL]),i.useEffect(()=>z(H(b,e=>ek({direction:b,...e})),H(y,e=>ek({direction:y,...e})),H(w,e=>_(e))),[H,ek,_]);let eS=i.useMemo(()=>{let e,t;return{prev:ed,next:ep,close:ef,focus:eo,slideRect:Z?(t=void 0!==(e=Y(a.padding)).percent?Z.width/100*e.percent:e.pixel,{width:Math.max(Z.width-2*t,0),height:Math.max(Z.height-2*t,0)}):{width:0,height:0},containerRect:Z||{width:0,height:0},subscribeSensors:X,containerRef:J,setCarouselRef:en,toolbarWidth:j,setToolbarWidth:R}},[ed,ep,ef,eo,X,Z,J,en,j,R,a.padding]);return i.useImperativeHandle(s.ref,()=>({prev:ed,next:ep,close:ef,focus:eo,getLightboxProps:ec,getLightboxState:eu}),[ed,ep,ef,eo,ec,eu]),i.createElement("div",{ref:ee,className:A(O(eU()),O(h)),style:{...$===r.SWIPE?{[B("swipe_offset")]:`${Math.round(D.current)}px`}:null,...$===r.PULL?{[B("pull_offset")]:`${Math.round(W.current)}px`,[B("pull_opacity")]:`${F.current}`}:null,..."none"!==s.touchAction?{[B("controller_touch_action")]:s.touchAction}:null,...d.container},tabIndex:-1,...U},Z&&i.createElement(eX.Provider,{value:eS},e,null==(n=p.controls)?void 0:n.call(p)))});function eK({slide:e,offset:t}){var n,r,l,a,o;let s,c=i.useRef(null),{currentIndex:u,slides:d}=eg(),{slideRect:p,focus:f}=eH(),{render:g,carousel:{imageFit:m,imageProps:x},on:{click:b},styles:{slide:y},labels:w}=ed(),{getOwnerDocument:E}=ea(),N=0!==t;return i.useEffect(()=>{var e;N&&(null==(e=c.current)?void 0:e.contains(E().activeElement))&&f()},[N,f,E]),i.createElement("div",{ref:c,className:A(O(T(v,void 0)),!N&&O(T(v,"current")),O(h)),...{inert:q?N:N?"":void 0},style:y,role:"group","aria-roledescription":W(w,"Slide"),"aria-label":(n=u+t,W(w,"{index} of {total}").replace(/\{index}/g,`${K(n,d.length)+1}`).replace(/\{total}/g,`${d.length}`))},(!(s=null==(r=g.slide)?void 0:r.call(g,{slide:e,offset:t,rect:p}))&&X(e)&&(s=i.createElement(ez,{slide:e,offset:t,render:g,rect:p,imageFit:m,imageProps:x,onClick:N?void 0:()=>null==b?void 0:b({index:u})})),s?i.createElement(i.Fragment,null,null==(l=g.slideHeader)?void 0:l.call(g,{slide:e}),(null!=(a=g.slideContainer)?a:({children:e})=>e)({slide:e,children:s}),null==(o=g.slideFooter)?void 0:o.call(g,{slide:e})):null))}function eV(){let e=ed().styles.slide;return i.createElement("div",{className:O(v),style:e})}let eG=Q(s,function({carousel:e,labels:t}){let{slides:n,currentIndex:r,globalIndex:l}=eg(),{setCarouselRef:a}=eH(),{autoPlaying:o,focusWithin:c}=en(),u=Y(e.spacing),d=Y(e.padding),p=function(e,t,n=0){return Math.min(e.preload,Math.max(e.finite?t.length-1:Math.floor(t.length/2),n))}(e,n,1),f=[];if(n.length>0)for(let t=r-p;t<=r+p;t+=1){let a=V(n,t),i=l-r+t,o=e.finite&&(t<0||t>n.length-1);f.push(o?{key:i}:{key:[`${i}`,X(a)?a.src:void 0].filter(Boolean).join("|"),offset:t-r,slide:a})}return i.createElement("div",{ref:a,className:A(O(T(s,void 0)),f.length>0&&O(T(s,"with_slides"))),style:{[`${B(T(s,"slides_count"))}`]:f.length,[`${B(T(s,"spacing_px"))}`]:u.pixel||0,[`${B(T(s,"spacing_percent"))}`]:u.percent||0,[`${B(T(s,"padding_px"))}`]:d.pixel||0,[`${B(T(s,"padding_percent"))}`]:d.percent||0},role:"region","aria-live":o&&!c?"off":"polite","aria-roledescription":W(t,"Carousel"),"aria-label":W(t,"Photo gallery")},f.map(({key:e,slide:t,offset:n})=>t?i.createElement(eK,{key:e,slide:t,offset:n}):i.createElement(eV,{key:e})))});function eq(){let{carousel:e}=ed(),{slides:t,currentIndex:n}=eg();return{prevDisabled:0===t.length||e.finite&&0===n,nextDisabled:0===t.length||e.finite&&n===t.length-1}}function eJ({label:e,icon:t,renderIcon:n,action:r,onClick:l,disabled:a,style:o}){return i.createElement(eE,{label:e,icon:t,renderIcon:n,className:O(`navigation_${r}`),disabled:a,onClick:l,style:o,...function(e,t=!1){let n=i.useRef(!1);return eS(()=>{t&&n.current&&(n.current=!1,e())},[t,e]),{onFocus:i.useCallback(()=>{n.current=!0},[]),onBlur:i.useCallback(()=>{n.current=!1},[])}}(eH().focus,a)})}let eQ=Q("navigation",function({render:{buttonPrev:e,buttonNext:t,iconPrev:n,iconNext:r},styles:l}){let{prev:a,next:o,subscribeSensors:s}=eH(),{prevDisabled:c,nextDisabled:u}=eq();return!function(e){var t;let n=eB(),{publish:r}=es(),{animation:l}=ed(),{prevDisabled:a,nextDisabled:o}=eq(),s=(null!=(t=l.navigation)?t:l.swipe)/2,c=eT(()=>r(b),s),u=eT(()=>r(y),s),d=e$(e=>{switch(e.key){case"Escape":r(E);break;case"ArrowLeft":(n?o:a)||(n?u:c)();break;case"ArrowRight":(n?a:o)||(n?c:u)()}});i.useEffect(()=>e(L,d),[e,d])}(s),i.createElement(i.Fragment,null,e?e():i.createElement(eJ,{label:"Previous",action:b,icon:eC,renderIcon:n,style:l.navigationPrev,disabled:c,onClick:a}),t?t():i.createElement(eJ,{label:"Next",action:y,icon:eM,renderIcon:r,style:l.navigationNext,disabled:u,onClick:o}))}),eZ=O("no_scroll"),e0=O(x);function e1(e,t,n){let r=window.getComputedStyle(e),l=n?"padding-left":"padding-right",a=n?r.paddingLeft:r.paddingRight,i=e.style.getPropertyValue(l);return e.style.setProperty(l,`${(H(a)||0)+t}px`),()=>{i?e.style.setProperty(l,i):e.style.removeProperty(l)}}let e2=Q("no-scroll",function({noScroll:{disabled:e},children:t}){let n=eB(),{getOwnerDocument:r,getOwnerWindow:l}=ea();return i.useEffect(()=>{if(e)return()=>{};let t=[],a=l(),{body:i,documentElement:o}=r(),s=Math.round(a.innerWidth-o.clientWidth);if(s>0){t.push(e1(i,s,n));let e=i.getElementsByTagName("*");for(let r=0;r<e.length;r+=1){let l=e[r];"style"in l&&"fixed"===a.getComputedStyle(l).getPropertyValue("position")&&!l.classList.contains(e0)&&t.push(e1(l,s,n))}}return i.classList.add(eZ),()=>{i.classList.remove(eZ),t.forEach(e=>e())}},[n,e,r,l]),i.createElement(i.Fragment,null,t)});function e5(e,t,n){let r=e.getAttribute(t);return e.setAttribute(t,n),()=>{r?e.setAttribute(t,r):e.removeAttribute(t)}}let e4=Q(u,function({children:e,animation:t,styles:n,className:r,on:l,portal:a,close:o,labels:s}){let[c,d]=i.useState(!1),[p,f]=i.useState(!1),g=i.useRef([]),m=i.useRef(null),{setTimeout:h}=ey(),{subscribe:v}=es(),b=ej()?0:t.fade;i.useEffect(()=>(d(!0),()=>{d(!1),f(!1)}),[]);let y=e$(()=>{g.current.forEach(e=>e()),g.current=[]}),w=e$(()=>{var e;f(!1),y(),null==(e=l.exiting)||e.call(l),h(()=>{var e;null==(e=l.exited)||e.call(l),o()},b)});i.useEffect(()=>v(E,w),[v,w]);let N=e$(e=>{var t,n,r;e.scrollTop,f(!0),null==(t=l.entering)||t.call(l);let a=null!=(r=null==(n=e.parentNode)?void 0:n.children)?r:[];for(let t=0;t<a.length;t+=1){let n=a[t];-1===["TEMPLATE","SCRIPT","STYLE"].indexOf(n.tagName)&&n!==e&&(g.current.push(e5(n,"inert","")),g.current.push(e5(n,"aria-hidden","true")))}g.current.push(()=>{var e,t;null==(t=null==(e=m.current)?void 0:e.focus)||t.call(e)}),h(()=>{var e;null==(e=l.entered)||e.call(l)},b)}),k=i.useCallback(e=>{e?N(e):y()},[N,y]);return c?(0,_.createPortal)(i.createElement(eF,{ref:k,className:A(r,O(T(u,void 0)),O(x),p&&O(T(u,"open"))),"aria-modal":!0,role:"dialog","aria-label":W(s,"Lightbox"),style:{...t.fade!==J.animation.fade?{[B("fade_animation_duration")]:`${b}ms`}:null,...t.easing.fade!==J.animation.easing.fade?{[B("fade_animation_timing_function")]:t.easing.fade}:null,...n.root},onFocus:e=>{m.current||(m.current=e.relatedTarget)}},e),a.root||document.body):null}),e8=Q("root",function({children:e}){return i.createElement(i.Fragment,null,e)}),e6=Q(d,function({toolbar:{buttons:e},render:{buttonClose:t,iconClose:n},styles:r}){let{close:l,setToolbarWidth:a}=eH(),{setContainerRef:o,containerRect:s}=eI();return eS(()=>{a(null==s?void 0:s.width)},[a,null==s?void 0:s.width]),i.createElement("div",{ref:o,style:r.toolbar,className:O(T(d,void 0))},null==e?void 0:e.map(e=>e===E?t?t():i.createElement(eE,{key:E,label:"Close",icon:ek,renderIcon:n,onClick:l}):e))});function e9({carousel:e,animation:t,render:n,toolbar:r,controller:l,noScroll:a,on:o,plugins:s,slides:u,index:d,...p}){let{animation:f,carousel:g,render:m,toolbar:h,controller:x,noScroll:v,on:b,slides:y,index:w,plugins:E,...N}=J,{config:k,augmentation:C}=function(e,t=[],n=[]){let r=e,l=e=>{let t=[...r];for(;t.length>0;){let n=t.pop();if((null==n?void 0:n.module.name)===e)return!0;(null==n?void 0:n.children)&&t.push(...n.children)}return!1},a=(e,t)=>{if(""===e){r=[Z(t,r)];return}r=ee(r,e,e=>[Z(t,[e])])},i=(e,t)=>{r=ee(r,e,e=>[Z(e.module,[Z(t,e.children)])])},o=(e,t,n)=>{r=ee(r,e,e=>{var r;return[Z(e.module,[...n?[Z(t)]:[],...null!=(r=e.children)?r:[],...n?[]:[Z(t)]])]})},s=(e,t,n)=>{r=ee(r,e,e=>[...n?[Z(t)]:[],e,...n?[]:[Z(t)]])},u=e=>{i(c,e)},d=(e,t)=>{r=ee(r,e,e=>[Z(t,e.children)])},p=e=>{r=ee(r,e,e=>e.children)},f=e=>{n.push(e)};return t.forEach(e=>{e({contains:l,addParent:a,append:i,addChild:o,addSibling:s,addModule:u,replace:d,remove:p,augment:f})}),{config:r,augmentation:e=>n.reduce((e,t)=>t(e),e)}}([Z(e4,[Z(e2,[Z(eY,[Z(eG),Z(e6),Z(eQ)])])])],s||E),M=C({animation:function(e,t={}){let{easing:n,...r}=e,{easing:l,...a}=t;return{easing:{...n,...l},...r,...a}}(f,t),carousel:{...g,...e},render:{...m,...n},toolbar:{...h,...r},controller:{...x,...l},noScroll:{...v,...a},on:{...b,...o},...N,...p});return M.open?i.createElement(ep,{...M},i.createElement(ev,{slides:u||y,index:H(d||w)},i.createElement(ew,null,i.createElement(ec,null,i.createElement(er,null,function e(t,n){var r;return i.createElement(t.module.component,{key:t.module.name,...n},null==(r=t.children)?void 0:r.map(t=>e(t,n)))}(Z(e8,k),M)))))):null}let e3=[2,1,2,1,1,2,1,2,1,1];function e7(){let[e,t]=(0,i.useState)([]),[n,r]=(0,i.useState)(!0),[l,s]=(0,i.useState)(-1),[c,u]=(0,i.useState)("all"),[d,p]=(0,i.useState)(null);async function f(){r(!0);let{data:e,error:n}=await o.supabase.from("gallery_images").select("*").order("created_at",{ascending:!1});!n&&e&&t(e),r(!1)}(0,i.useEffect)(()=>{f()},[]);let g="featured"===c?e.filter(e=>e.is_featured):e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .gp-page {
          background: #090909;
          min-height: 100vh;
          color: #f0ece4;
        }

        /* ── PAGE HEADER ── */
        .gp-hero {
          padding: 80px 60px 56px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }

        .gp-hero-left {}

        .gp-label {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #e8622a; margin-bottom: 16px;
        }
        .gp-label-dash { width: 26px; height: 2px; background: #e8622a; flex-shrink: 0; }

        .gp-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(3.5rem, 6vw, 6.5rem);
          line-height: 0.88; letter-spacing: -0.01em;
          text-transform: uppercase; margin: 0;
          color: #f0ece4;
        }
        .gp-heading .hi { color: #e8622a; }
        .gp-heading .ghost {
          display: block; color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.09);
          font-size: 72%; margin-top: 8px;
        }

        .gp-hero-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 20px;
          padding-bottom: 6px; flex-shrink: 0;
        }

        .gp-count {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.22); text-transform: uppercase;
        }
        .gp-count em { font-style: normal; color: rgba(255,255,255,0.6); }

        /* filter pills */
        .gp-filters { display: flex; gap: 8px; }

        .gp-filter {
          padding: 9px 20px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent; color: rgba(255,255,255,0.45);
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
          transition: all 0.2s ease;
        }
        .gp-filter:hover { border-color: rgba(232,98,42,0.4); color: rgba(255,255,255,0.7); }
        .gp-filter.on { background: #e8622a; border-color: #e8622a; color: #fff; }

        /* ── GRID ── */
        .gp-grid-wrap { padding: 48px 60px 80px; }

        .gp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 180px;
          gap: 10px;
        }

        /* span classes */
        .gp-cell-tall { grid-row: span 2; }
        .gp-cell-wide { grid-column: span 2; }

        .gp-cell {
          position: relative; overflow: hidden;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
        }

        .gp-cell img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(0.82) saturate(0.85);
          transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease;
          pointer-events: none; user-select: none;
        }
        .gp-cell:hover img { transform: scale(1.06); filter: brightness(1) saturate(1); }

        .gp-cell-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(9,9,9,0.88) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 16px;
        }
        .gp-cell:hover .gp-cell-overlay { opacity: 1; }

        .gp-cell-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #f0ece4; margin: 0 0 3px;
          transform: translateY(5px); transition: transform 0.25s ease;
        }
        .gp-cell:hover .gp-cell-title { transform: translateY(0); }

        .gp-cell-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.58rem; letter-spacing: 0.22em;
          color: #e8622a; font-weight: 600;
        }

        /* top-right orange notch */
        .gp-notch {
          position: absolute; top: 0; right: 0;
          width: 0; height: 0; border-style: solid;
          border-width: 0 20px 20px 0;
          border-color: transparent #e8622a transparent transparent;
          opacity: 0; transition: opacity 0.25s ease;
        }
        .gp-cell:hover .gp-notch { opacity: 1; }

        /* featured badge */
        .gp-featured-badge {
          position: absolute; top: 12px; left: 12px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #e8622a;
          background: rgba(9,9,9,0.75);
          border: 1px solid rgba(232,98,42,0.4);
          padding: 3px 8px;
          backdrop-filter: blur(4px);
        }

        /* expand icon on hover */
        .gp-expand {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          opacity: 0;
          width: 44px; height: 44px;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .gp-expand svg { width: 16px; height: 16px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .gp-cell:hover .gp-expand { opacity: 1; transform: translate(-50%, -50%) scale(1); }

        /* ── SKELETON ── */
        @keyframes shimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
        .gp-skel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 180px;
          gap: 10px;
        }
        .gp-skel-cell {
          background: linear-gradient(90deg, #181818 25%, #202020 50%, #181818 75%);
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
          border: 1px solid rgba(255,255,255,0.04);
        }

        /* ── EMPTY ── */
        .gp-empty {
          height: 400px; border: 1px dashed rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
        }
        .gp-empty-ring { width: 48px; height: 48px; margin: 0 auto 16px; border: 1px solid rgba(232,98,42,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .gp-empty-ring svg { width: 20px; height: 20px; stroke: rgba(232,98,42,0.6); fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .gp-empty-h { font-family: 'Barlow Condensed', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin: 0 0 6px; }
        .gp-empty-p { font-family: 'Barlow', sans-serif; font-size: 0.7rem; color: rgba(255,255,255,0.15); }
        .gp-empty-body { text-align: center; }

        /* lightbox overrides */
        .yarl__root { --yarl__color_backdrop: rgba(9,9,9,0.97); }
        .yarl__button { color: rgba(255,255,255,0.6); }
        .yarl__button:hover { color: #e8622a; }
      `}),(0,a.jsxs)("div",{className:"gp-page",children:[(0,a.jsxs)("div",{className:"gp-hero",children:[(0,a.jsxs)("div",{className:"gp-hero-left",children:[(0,a.jsxs)("p",{className:"gp-label",children:[(0,a.jsx)("span",{className:"gp-label-dash"}),"IDEA Lab"]}),(0,a.jsxs)("h1",{className:"gp-heading",children:[(0,a.jsx)("span",{children:"Photo"}),(0,a.jsx)("span",{className:"hi",children:" Gallery"}),(0,a.jsx)("span",{className:"ghost",children:"All Moments"})]})]}),(0,a.jsxs)("div",{className:"gp-hero-right",children:[!n&&(0,a.jsxs)("span",{className:"gp-count",children:[(0,a.jsx)("em",{children:g.length})," photos"]}),(0,a.jsxs)("div",{className:"gp-filters",children:[(0,a.jsx)("button",{className:`gp-filter${"all"===c?" on":""}`,onClick:()=>u("all"),children:"All"}),(0,a.jsx)("button",{className:`gp-filter${"featured"===c?" on":""}`,onClick:()=>u("featured"),children:"Featured"})]})]})]}),(0,a.jsx)("div",{className:"gp-grid-wrap",children:n?(0,a.jsx)("div",{className:"gp-skel",children:Array.from({length:12}).map((e,t)=>(0,a.jsx)("div",{className:"gp-skel-cell",style:2===e3[t%e3.length]?{gridRow:"span 2"}:void 0},t))}):0===g.length?(0,a.jsx)("div",{className:"gp-empty",children:(0,a.jsxs)("div",{className:"gp-empty-body",children:[(0,a.jsx)("div",{className:"gp-empty-ring",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,a.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),(0,a.jsx)("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),(0,a.jsx)("polyline",{points:"21 15 16 10 5 21"})]})}),(0,a.jsx)("p",{className:"gp-empty-h",children:"No Photos Yet"}),(0,a.jsx)("p",{className:"gp-empty-p",children:"Gallery images will appear here once uploaded."})]})}):(0,a.jsx)("div",{className:"gp-grid",children:g.map((e,t)=>{let n=e3[t%e3.length];return(0,a.jsxs)("div",{className:`gp-cell${2===n?" gp-cell-tall":""}`,onClick:()=>s(t),children:[(0,a.jsx)("img",{src:e.image_url,alt:e.title??"",loading:"lazy"}),(0,a.jsx)("div",{className:"gp-notch"}),e.is_featured&&(0,a.jsx)("div",{className:"gp-featured-badge",children:"Featured"}),(0,a.jsx)("div",{className:"gp-expand",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,a.jsx)("polyline",{points:"15 3 21 3 21 9"}),(0,a.jsx)("polyline",{points:"9 21 3 21 3 15"}),(0,a.jsx)("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),(0,a.jsx)("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),(0,a.jsxs)("div",{className:"gp-cell-overlay",children:[e.title&&(0,a.jsx)("p",{className:"gp-cell-title",children:e.title}),(0,a.jsxs)("span",{className:"gp-cell-num",children:[String(t+1).padStart(2,"0")," / IDEA LAB"]})]})]},e.id)})})}),(0,a.jsx)(e9,{open:l>=0,close:()=>s(-1),slides:g.map(e=>({src:e.image_url,title:e.title??void 0})),index:l})]})]})}e.s(["default",()=>e7],67271)}]);