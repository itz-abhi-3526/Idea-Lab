module.exports=[61501,a=>{"use strict";var b,c,d,e,f=a.i(87924),g=a.i(72131),h=a.i(78560);let i="carousel",j="controller",k="portal",l="toolbar",m="loading",n="error",o="complete",p=a=>`active-slide-${a}`;p(m),p("playing"),p(n),p(o);let q="flex_center",r="no_scroll_padding",s="slide",t="prev",u="next",v="swipe",w="close",x="onPointerDown",y="onPointerMove",z="onPointerUp",A="onPointerLeave",B="onPointerCancel",C="onKeyDown",D="onWheel",E="icon",F="contain",G="cover";var H=a.i(35112);let I="yarl__";function J(...a){return a.filter(Boolean).join(" ")}function K(a){return`${I}${a}`}function L(a){return`--${I}${a}`}function M(a,b){return`${a}${b?`_${b}`:""}`}function N(a){return b=>M(a,b)}function O(a,b){var c;return null!=(c=null==a?void 0:a[b])?c:b}function P(...a){return()=>{a.forEach(a=>{a()})}}function Q(a,b,c){return()=>{let d=g.useContext(c);if(!d)throw Error(`${a} must be used within a ${b}.Provider`);return d}}function R(a){return void 0===a.type||"image"===a.type}function S(a){return"string"==typeof a?Number.parseInt(a,10):a}function T(a){if("number"==typeof a)return{pixel:a};if("string"==typeof a){let b=S(a);return a.endsWith("%")?{percent:b}:{pixel:b}}return{pixel:0}}function U(a,b){return b>0?(a%b+b)%b:0}function V(a,b){return a[U(b,a.length)]}function W(a,b){return a.length>0?V(a,b):void 0}let X=Number(g.version.split(".")[0])>=19,Y={open:!1,close:()=>{},index:0,slides:[],render:{},plugins:[],toolbar:{buttons:[w]},labels:{},animation:{fade:250,swipe:500,easing:{fade:"ease",swipe:"ease-out",navigation:"ease-in-out"}},carousel:{finite:!1,preload:2,padding:"16px",spacing:"30%",imageFit:F,imageProps:{}},controller:{ref:null,focus:!0,aria:!1,touchAction:"none",closeOnPullUp:!1,closeOnPullDown:!1,closeOnBackdropClick:!1,preventDefaultWheelX:!0,preventDefaultWheelY:!1,disableSwipeNavigation:!1},portal:{},noScroll:{disabled:!1},on:{},styles:{},className:""};function Z(a,b){return{name:a,component:b}}function $(a,b){return{module:a,children:b}}function _(a,b,c){return a.flatMap(a=>{var d;return null!=(d=function a(b,c,d){return b.module.name===c?d(b):b.children?[$(b.module,b.children.flatMap(b=>{var e;return null!=(e=a(b,c,d))?e:[]}))]:[b]}(a,b,c))?d:[]})}let aa=g.createContext(null),ab=Q("useA11yContext","A11yContext",aa);function ac({children:a}){let[b,c]=g.useState(!1),[d,e]=g.useState(!1),f=g.useMemo(()=>({focusWithin:b,trackFocusWithin:(a,b)=>{let d=d=>e=>{var f;e.currentTarget.contains(e.relatedTarget)||c(d),null==(f=d?a:b)||f(e)};return{onFocus:d(!0),onBlur:d(!1)}},autoPlaying:d,setAutoPlaying:e}),[b,d]);return g.createElement(aa.Provider,{value:f},a)}let ad=g.createContext(null),ae=Q("useDocument","DocumentContext",ad);function af({nodeRef:a,children:b}){let c=g.useMemo(()=>{let b=b=>{var c;return(null==(c=b||a.current)?void 0:c.ownerDocument)||document};return{getOwnerDocument:b,getOwnerWindow:a=>{var c;return(null==(c=b(a))?void 0:c.defaultView)||window}}},[a]);return g.createElement(ad.Provider,{value:c},b)}let ag=g.createContext(null),ah=Q("useEvents","EventsContext",ag);function ai({children:a}){let[b]=g.useState({});g.useEffect(()=>()=>{Object.keys(b).forEach(a=>delete b[a])},[b]);let c=g.useMemo(()=>{let a=(a,c)=>{var d;null==(d=b[a])||d.splice(0,b[a].length,...b[a].filter(a=>a!==c))};return{publish:(...[a,c])=>{var d;null==(d=b[a])||d.forEach(a=>a(c))},subscribe:(c,d)=>(b[c]||(b[c]=[]),b[c].push(d),()=>a(c,d)),unsubscribe:a}},[b]);return g.createElement(ag.Provider,{value:c},a)}let aj=g.createContext(null),ak=Q("useLightboxProps","LightboxPropsContext",aj);function al({children:a,...b}){return g.createElement(aj.Provider,{value:b},a)}let am=g.createContext(null),an=Q("useLightboxState","LightboxStateContext",am),ao=g.createContext(null),ap=Q("useLightboxDispatch","LightboxDispatchContext",ao);function aq(a,b){switch(b.type){case"swipe":{let{slides:c}=a,d=(null==b?void 0:b.increment)||0,e=a.globalIndex+d,f=U(e,c.length),g=W(c,f);return{slides:c,currentIndex:f,globalIndex:e,currentSlide:g,animation:d||void 0!==b.duration?{increment:d,duration:b.duration,easing:b.easing}:void 0}}case"update":if(b.slides!==a.slides||b.index!==a.currentIndex)return{slides:b.slides,currentIndex:b.index,globalIndex:b.index,currentSlide:W(b.slides,b.index)};return a;default:throw Error("Unknown action type")}}function ar({slides:a,index:b,children:c}){let[d,e]=g.useReducer(aq,{slides:a,currentIndex:b,globalIndex:b,currentSlide:W(a,b)});g.useEffect(()=>{e({type:"update",slides:a,index:b})},[a,b]);let f=g.useMemo(()=>({...d,state:d,dispatch:e}),[d,e]);return g.createElement(ao.Provider,{value:e},g.createElement(am.Provider,{value:f},c))}let as=g.createContext(null),at=Q("useTimeouts","TimeoutsContext",as);function au({children:a}){let[b]=g.useState([]);g.useEffect(()=>()=>{b.forEach(a=>window.clearTimeout(a)),b.splice(0,b.length)},[b]);let c=g.useMemo(()=>{let a=a=>{b.splice(0,b.length,...b.filter(b=>b!==a))};return{setTimeout:(c,d)=>{let e=window.setTimeout(()=>{a(e),c()},d);return b.push(e),e},clearTimeout:b=>{void 0!==b&&(a(b),window.clearTimeout(b))}}},[b]);return g.createElement(as.Provider,{value:c},a)}let av=g.forwardRef(function({label:a,className:b,icon:c,renderIcon:d,onClick:e,style:f,...h},i){let{styles:j,labels:k}=ak(),l=O(k,a);return g.createElement("button",{ref:i,type:"button",title:l,"aria-label":l,className:J(K("button"),b),onClick:e,style:{...f,...j.button},...h},d?d():g.createElement(c,{className:K(E),style:j.icon}))});function aw(a,b){var c;let d;return c=g.createElement("g",{fill:"currentColor"},g.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),b),(d=a=>g.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false",...a},c)).displayName=a,d}let ax=aw("Close",g.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),ay=aw("Previous",g.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})),az=aw("Next",g.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})),aA=aw("Loading",g.createElement(g.Fragment,null,Array.from({length:8}).map((a,b,c)=>g.createElement("line",{key:b,x1:"12",y1:"6.5",x2:"12",y2:"1.8",strokeLinecap:"round",strokeWidth:"2.6",stroke:"currentColor",strokeOpacity:1/c.length*(b+1),transform:`rotate(${360/c.length*b}, 12, 12)`})))),aB=aw("Error",g.createElement("path",{d:"M21.9,21.9l-8.49-8.49l0,0L3.59,3.59l0,0L2.1,2.1L0.69,3.51L3,5.83V19c0,1.1,0.9,2,2,2h13.17l2.31,2.31L21.9,21.9z M5,18 l3.5-4.5l2.5,3.01L12.17,15l3,3H5z M21,18.17L5.83,3H19c1.1,0,2,0.9,2,2V18.17z"})),aC=g.useEffect;function aD(){let[a,b]=g.useState(!1);return g.useEffect(()=>{var a,c;let d=null==(a=window.matchMedia)?void 0:a.call(window,"(prefers-reduced-motion: reduce)");b(null==d?void 0:d.matches);let e=a=>b(a.matches);return null==(c=null==d?void 0:d.addEventListener)||c.call(d,"change",e),()=>{var a;return null==(a=null==d?void 0:d.removeEventListener)?void 0:a.call(d,"change",e)}},[]),a}function aE(a,b){let c=g.useRef(void 0),d=g.useRef(void 0),e=aD();return aC(()=>{var f,g,h;if(a.current&&void 0!==c.current&&!e){let{keyframes:e,duration:i,easing:j,onfinish:k}=b(c.current,a.current.getBoundingClientRect(),function(a){let b=0,c=0,d=0,e=window.getComputedStyle(a).transform.match(/matrix.*\((.+)\)/);if(e){let a=e[1].split(",").map(S);6===a.length?(b=a[4],c=a[5]):16===a.length&&(b=a[12],c=a[13],d=a[14])}return{x:b,y:c,z:d}}(a.current))||{};if(e&&i){null==(f=d.current)||f.cancel(),d.current=void 0;try{d.current=null==(h=(g=a.current).animate)?void 0:h.call(g,e,{duration:i,easing:j})}catch(a){console.error(a)}d.current&&(d.current.onfinish=()=>{d.current=void 0,null==k||k()})}}c.current=void 0}),{prepareAnimation:a=>{c.current=a},isAnimationPlaying:()=>{var a;return(null==(a=d.current)?void 0:a.playState)==="running"}}}function aF(){let a=g.useRef(null),b=g.useRef(void 0),[c,d]=g.useState();return{setContainerRef:g.useCallback(c=>{a.current=c,b.current&&(b.current.disconnect(),b.current=void 0);let e=()=>{if(c){let a=window.getComputedStyle(c);d({width:Math.round(c.clientWidth-(parseFloat(a.paddingLeft)||0)-(parseFloat(a.paddingRight)||0)),height:Math.round(c.clientHeight-(parseFloat(a.paddingTop)||0)-(parseFloat(a.paddingBottom)||0))})}else d(void 0)};e(),c&&"undefined"!=typeof ResizeObserver&&(b.current=new ResizeObserver(e),b.current.observe(c))},[]),containerRef:a,containerRect:c}}function aG(){let a=g.useRef(void 0),{setTimeout:b,clearTimeout:c}=at();return g.useCallback((d,e)=>{c(a.current),a.current=b(d,e>0?e:0)},[b,c])}function aH(a){let b=g.useRef(a);return aC(()=>{b.current=a}),g.useCallback((...a)=>{var c;return null==(c=b.current)?void 0:c.call(b,...a)},[])}function aI(a,b){"function"==typeof a?a(b):a&&(a.current=b)}function aJ(a,b){return g.useMemo(()=>null==a&&null==b?null:c=>{aI(a,c),aI(b,c)},[a,b])}function aK(){let[a,b]=g.useState(!1);return aC(()=>{b("rtl"===window.getComputedStyle(window.document.documentElement).direction)},[]),a}function aL(a,b){let c=g.useRef(0),d=aG(),e=aH((...b)=>{c.current=Date.now(),a(b)});return g.useCallback((...a)=>{d(()=>{e(a)},b-(Date.now()-c.current))},[b,e,d])}let aM=N("slide"),aN=N("slide_image");function aO({slide:a,offset:b,render:c,rect:d,imageFit:e,imageProps:f,onClick:h,onLoad:i,onError:j,style:k}){var l,q,r,s,t,u,v,w;let[x,y]=g.useState(m),{publish:z}=ah(),{setTimeout:A}=at(),B=g.useRef(null);g.useEffect(()=>{0===b&&z(p(x))},[b,x,z]);let C=aH(a=>{("decode"in a?a.decode():Promise.resolve()).catch(()=>{}).then(()=>{a.parentNode&&(y(o),A(()=>{null==i||i(a)},0))})}),D=g.useCallback(a=>{B.current=a,(null==a?void 0:a.complete)&&C(a)},[C]),H=g.useCallback(a=>{C(a.currentTarget)},[C]),I=aH(()=>{y(n),null==j||j()}),L=a.imageFit===G||a.imageFit!==F&&e===G,M=(a,b)=>Number.isFinite(a)?a:b,N=M(Math.max(...(null!=(q=null==(l=a.srcSet)?void 0:l.map(a=>a.width))?q:[]).concat(a.width?[a.width]:[]).filter(Boolean)),(null==(r=B.current)?void 0:r.naturalWidth)||0),O=M(Math.max(...(null!=(t=null==(s=a.srcSet)?void 0:s.map(a=>a.height))?t:[]).concat(a.height?[a.height]:[]).filter(Boolean)),(null==(u=B.current)?void 0:u.naturalHeight)||0),P=N&&O?{maxWidth:`min(${N}px, 100%)`,maxHeight:`min(${O}px, 100%)`}:{maxWidth:"100%",maxHeight:"100%"},Q=null==(v=a.srcSet)?void 0:v.slice().sort((a,b)=>a.width-b.width).map(a=>`${a.src} ${a.width}w`).join(", "),{style:R,className:S,...T}=("function"==typeof f?f(a):f)||{};return g.createElement(g.Fragment,null,g.createElement("img",{ref:D,onLoad:H,onError:I,onClick:h,draggable:!1,className:J(K(aN()),L&&K(aN("cover")),x!==o&&K(aN("loading")),S),style:{...P,...k,...R},...T,alt:null!=(w=a.alt)?w:"",sizes:void 0,srcSet:Q,src:a.src}),x!==o&&g.createElement("div",{className:K(aM("placeholder"))},x===m&&((null==c?void 0:c.iconLoading)?c.iconLoading():g.createElement(aA,{className:J(K(E),K(aM(m)))})),x===n&&((null==c?void 0:c.iconError)?c.iconError():g.createElement(aB,{className:J(K(E),K(aM(n)))}))))}let aP=g.forwardRef(function({className:a,children:b,onFocus:c,onBlur:d,...e},f){let h=g.useRef(null),{trackFocusWithin:i}=ab();return g.createElement(af,{nodeRef:h},g.createElement("div",{ref:aJ(f,h),className:J(K("root"),a),...i(c,d),...e},b))});(b=d||(d={}))[b.NONE=0]="NONE",b[b.SWIPE=1]="SWIPE",b[b.PULL=2]="PULL",b[b.ANIMATION=3]="ANIMATION",(c=e||(e={}))[c.NONE=0]="NONE",c[c.SWIPE=1]="SWIPE",c[c.PULL=2]="PULL";let aQ=N("container"),aR=g.createContext(null),aS=Q("useController","ControllerContext",aR),aT=Z(j,function({children:a,...b}){var c;let{carousel:f,animation:h,controller:i,on:j,styles:l,render:m}=b,{closeOnPullUp:n,closeOnPullDown:o,preventDefaultWheelX:p,preventDefaultWheelY:r}=i,[E,F]=g.useState(),G=an(),H=ap(),[I,M]=g.useState(d.NONE),N=g.useRef(0),O=g.useRef(0),Q=g.useRef(1),{registerSensors:R,subscribeSensors:S}=function(){let[a]=g.useState({}),b=g.useCallback((b,c)=>{var d;null==(d=a[b])||d.forEach(a=>{c.isPropagationStopped()||a(c)})},[a]);return{registerSensors:g.useMemo(()=>({onPointerDown:a=>b(x,a),onPointerMove:a=>b(y,a),onPointerUp:a=>b(z,a),onPointerLeave:a=>b(A,a),onPointerCancel:a=>b(B,a),onKeyDown:a=>b(C,a),onKeyUp:a=>b("onKeyUp",a),onWheel:a=>b(D,a)}),[b]),subscribeSensors:g.useCallback((b,c)=>(a[b]||(a[b]=[]),a[b].unshift(c),()=>{let d=a[b];d&&d.splice(0,d.length,...d.filter(a=>a!==c))}),[a])}}(),{subscribe:U,publish:V}=ah(),W=aG(),X=aG(),Y=aG(),{containerRef:Z,setContainerRef:$,containerRect:_}=aF(),aa=aJ(function({preventDefaultWheelX:a,preventDefaultWheelY:b}){let c=g.useRef(null),d=aH(c=>{let d=Math.abs(c.deltaX)>Math.abs(c.deltaY);(d&&a||!d&&b||c.ctrlKey)&&c.preventDefault()});return g.useCallback(a=>{var b;a?a.addEventListener("wheel",d,{passive:!1}):null==(b=c.current)||b.removeEventListener("wheel",d),c.current=a},[d])}({preventDefaultWheelX:p,preventDefaultWheelY:r}),$),ab=g.useRef(null),ac=aJ(ab,void 0),{getOwnerDocument:ad}=ae(),af=aK(),ag=a=>(af?-1:1)*("number"==typeof a?a:1),ai=aH(()=>{var a;return null==(a=Z.current)?void 0:a.focus()}),aj=aH(()=>b),ak=aH(()=>G),al=g.useCallback(a=>V(t,a),[V]),am=g.useCallback(a=>V(u,a),[V]),ao=g.useCallback(()=>V(w),[V]),aq=a=>!(f.finite&&(ag(a)>0&&0===G.currentIndex||0>ag(a)&&G.currentIndex===G.slides.length-1)),ar=a=>{var b;N.current=a,null==(b=Z.current)||b.style.setProperty(L("swipe_offset"),`${Math.round(a)}px`)},as=a=>{var b,c;O.current=a,Q.current=Math.min(Math.max(function(a,b=0){let c=10**b;return Math.round((a+Number.EPSILON)*c)/c}(1-(o&&a>0?a:n&&a<0?-a:0)/60*.5,2),.5),1),null==(b=Z.current)||b.style.setProperty(L("pull_offset"),`${Math.round(a)}px`),null==(c=Z.current)||c.style.setProperty(L("pull_opacity"),`${Q.current}`)},{prepareAnimation:au}=aE(ab,(a,b,c)=>{if(ab.current&&_)return{keyframes:[{transform:`translate(0, ${a.rect.y-b.y+c.y}px)`,opacity:a.opacity},{transform:"translate(0, 0)",opacity:1}],duration:a.duration,easing:h.easing.fade}}),av=(a,b)=>{if(n||o){as(a);let c=0;ab.current&&(c=h.fade*(b?2:1),au({rect:ab.current.getBoundingClientRect(),opacity:Q.current,duration:c})),Y(()=>{as(0),M(d.NONE)},c),M(d.ANIMATION),b||ao()}},{prepareAnimation:aw,isAnimationPlaying:ax}=aE(ab,(a,b,c)=>{var d;if(ab.current&&_&&(null==(d=G.animation)?void 0:d.duration)){let d=T(f.spacing),e=(d.percent?d.percent*_.width/100:d.pixel)||0;return{keyframes:[{transform:`translate(${ag(G.globalIndex-a.index)*(_.width+e)+a.rect.x-b.x+c.x}px, 0)`},{transform:"translate(0, 0)"}],duration:G.animation.duration,easing:G.animation.easing}}}),ay=aH(a=>{var b,c;let e=a.offset||0,f=e?h.swipe:null!=(b=h.navigation)?b:h.swipe,g=e||ax()?h.easing.swipe:h.easing.navigation,{direction:i}=a,j=null!=(c=a.count)?c:1,k=d.ANIMATION,l=f*j;if(!i){let b=null==_?void 0:_.width,c=a.duration||0,d=b?f/b*Math.abs(e):f;0!==j?(c<d?l=l/d*Math.max(c,d/5):b&&(l=f/b*(b-Math.abs(e))),i=ag(e)>0?t:u):l=f/2}let m=0;i===t?aq(ag(1))?m=-j:(k=d.NONE,l=f):i===u&&(aq(ag(-1))?m=j:(k=d.NONE,l=f)),X(()=>{ar(0),M(d.NONE)},l=Math.round(l)),ab.current&&aw({rect:ab.current.getBoundingClientRect(),index:G.globalIndex}),M(k),V(v,{type:"swipe",increment:m,duration:l,easing:g})});g.useEffect(()=>{var a,b;(null==(a=G.animation)?void 0:a.increment)&&(null==(b=G.animation)?void 0:b.duration)&&W(()=>H({type:"swipe",increment:0}),G.animation.duration)},[G.animation,H,W]);let az=[S,aq,(null==_?void 0:_.width)||0,h.swipe,()=>M(d.SWIPE),a=>ar(a),(a,b)=>ay({offset:a,duration:b,count:1}),a=>ay({offset:a,count:0})],aA=[()=>{o&&M(d.PULL)},a=>as(a),a=>av(a),a=>av(a,!0)];!function({disableSwipeNavigation:a,closeOnBackdropClick:b},c,d,f,h,i,j,k,l,m,n,o,p,q,r,t){let u=g.useRef(0),v=g.useRef([]),w=g.useRef(void 0),C=g.useRef(0),D=g.useRef(e.NONE),E=g.useCallback(a=>{w.current===a.pointerId&&(w.current=void 0,D.current=e.NONE);let b=v.current;b.splice(0,b.length,...b.filter(b=>b.pointerId!==a.pointerId))},[]),F=g.useCallback(a=>{E(a),a.persist(),v.current.push(a)},[E]),G=g.useCallback(a=>v.current.find(({pointerId:b})=>a.pointerId===b),[]),H=aH(a=>{F(a)}),I=(a,b)=>n&&a>b||m&&a<-b,J=aH(a=>{let c=G(a);if(c)if(w.current===a.pointerId){let a=Date.now()-C.current,b=u.current;D.current===e.SWIPE?Math.abs(b)>.3*f||Math.abs(b)>5&&a<h?k(b,a):l(b):D.current===e.PULL&&(I(b,60)?q(b,a):r(b)),u.current=0,D.current=e.NONE}else{let{target:d}=a;b&&d instanceof HTMLElement&&d===c.target&&(d.classList.contains(K(s))||d.classList.contains(K("slide_wrapper")))&&t()}E(a)}),L=aH(b=>{let c=G(b);if(c){let f=w.current===b.pointerId;if(0===b.buttons)return void(f&&0!==u.current?J(b):E(c));let g=b.clientX-c.clientX,h=b.clientY-c.clientY;if(void 0===w.current){let c=a=>{F(b),w.current=b.pointerId,C.current=Date.now(),D.current=a};Math.abs(g)>Math.abs(h)&&Math.abs(g)>30&&d(g)?a||(c(e.SWIPE),i()):Math.abs(h)>Math.abs(g)&&I(h,30)&&(c(e.PULL),o())}else f&&(D.current===e.SWIPE?(u.current=g,j(g)):D.current===e.PULL&&(u.current=h,p(h)))}});g.useEffect(()=>P(c(x,H),c(y,L),c(z,J),c(A,J),c(B,J)),[c,H,L,J,void 0])}(i,...az,n,o,...aA,ao),function(a,b,c,e,f,h,i,j,k){let l=g.useRef(0),m=g.useRef(0),n=g.useRef(void 0),o=g.useRef(void 0),p=g.useRef(0),q=g.useRef(void 0),r=g.useRef(0),{setTimeout:s,clearTimeout:t}=at(),u=g.useCallback(()=>{n.current&&(t(n.current),n.current=void 0)},[t]),v=g.useCallback(()=>{o.current&&(t(o.current),o.current=void 0)},[t]),w=aH(()=>{a!==d.SWIPE&&(l.current=0,r.current=0,u(),v())});g.useEffect(w,[a,w]);let x=aH(a=>{o.current=void 0,l.current===a&&k(l.current)}),y=aH(b=>{if(b.ctrlKey||Math.abs(b.deltaY)>Math.abs(b.deltaX))return;let g=a=>{p.current=a,t(q.current),q.current=a>0?s(()=>{p.current=0,q.current=void 0},300):void 0};if(a===d.NONE){if(Math.abs(b.deltaX)<=1.2*Math.abs(p.current))return void g(b.deltaX);if(!c(-b.deltaX))return;if(m.current+=b.deltaX,u(),Math.abs(m.current)>30)m.current=0,g(0),r.current=Date.now(),h();else{let a=m.current;n.current=s(()=>{n.current=void 0,a===m.current&&(m.current=0)},f)}}else if(a===d.SWIPE){let a=l.current-b.deltaX;if(l.current=a=Math.min(Math.abs(a),e)*Math.sign(a),i(a),v(),Math.abs(a)>.2*e){g(b.deltaX),j(a,Date.now()-r.current);return}o.current=s(()=>x(a),2*f)}else g(b.deltaX)});g.useEffect(()=>b(D,y),[b,y])}(I,...az);let aB=aH(()=>{i.focus&&ad().querySelector(`.${K(k)} .${K(aQ())}`)&&ai()});g.useEffect(aB,[aB]);let aC=aH(()=>{var a;null==(a=j.view)||a.call(j,{index:G.currentIndex})});g.useEffect(aC,[G.globalIndex,aC]),g.useEffect(()=>P(U(t,a=>ay({direction:t,...a})),U(u,a=>ay({direction:u,...a})),U(v,a=>H(a))),[U,ay,H]);let aD=g.useMemo(()=>{let a,b;return{prev:al,next:am,close:ao,focus:ai,slideRect:_?(b=void 0!==(a=T(f.padding)).percent?_.width/100*a.percent:a.pixel,{width:Math.max(_.width-2*b,0),height:Math.max(_.height-2*b,0)}):{width:0,height:0},containerRect:_||{width:0,height:0},subscribeSensors:S,containerRef:Z,setCarouselRef:ac,toolbarWidth:E,setToolbarWidth:F}},[al,am,ao,ai,S,_,Z,ac,E,F,f.padding]);return g.useImperativeHandle(i.ref,()=>({prev:al,next:am,close:ao,focus:ai,getLightboxProps:aj,getLightboxState:ak}),[al,am,ao,ai,aj,ak]),g.createElement("div",{ref:aa,className:J(K(aQ()),K(q)),style:{...I===d.SWIPE?{[L("swipe_offset")]:`${Math.round(N.current)}px`}:null,...I===d.PULL?{[L("pull_offset")]:`${Math.round(O.current)}px`,[L("pull_opacity")]:`${Q.current}`}:null,..."none"!==i.touchAction?{[L("controller_touch_action")]:i.touchAction}:null,...l.container},tabIndex:-1,...R},_&&g.createElement(aR.Provider,{value:aD},a,null==(c=m.controls)?void 0:c.call(m)))});function aU({slide:a,offset:b}){var c,d,e,f,h;let i,j=g.useRef(null),{currentIndex:k,slides:l}=an(),{slideRect:m,focus:n}=aS(),{render:o,carousel:{imageFit:p,imageProps:r},on:{click:t},styles:{slide:u},labels:v}=ak(),{getOwnerDocument:w}=ae(),x=0!==b;return g.useEffect(()=>{var a;x&&(null==(a=j.current)?void 0:a.contains(w().activeElement))&&n()},[x,n,w]),g.createElement("div",{ref:j,className:J(K(M(s,void 0)),!x&&K(M(s,"current")),K(q)),...{inert:X?x:x?"":void 0},style:u,role:"group","aria-roledescription":O(v,"Slide"),"aria-label":(c=k+b,O(v,"{index} of {total}").replace(/\{index}/g,`${U(c,l.length)+1}`).replace(/\{total}/g,`${l.length}`))},(!(i=null==(d=o.slide)?void 0:d.call(o,{slide:a,offset:b,rect:m}))&&R(a)&&(i=g.createElement(aO,{slide:a,offset:b,render:o,rect:m,imageFit:p,imageProps:r,onClick:x?void 0:()=>null==t?void 0:t({index:k})})),i?g.createElement(g.Fragment,null,null==(e=o.slideHeader)?void 0:e.call(o,{slide:a}),(null!=(f=o.slideContainer)?f:({children:a})=>a)({slide:a,children:i}),null==(h=o.slideFooter)?void 0:h.call(o,{slide:a})):null))}function aV(){let a=ak().styles.slide;return g.createElement("div",{className:K(s),style:a})}let aW=Z(i,function({carousel:a,labels:b}){let{slides:c,currentIndex:d,globalIndex:e}=an(),{setCarouselRef:f}=aS(),{autoPlaying:h,focusWithin:j}=ab(),k=T(a.spacing),l=T(a.padding),m=function(a,b,c=0){return Math.min(a.preload,Math.max(a.finite?b.length-1:Math.floor(b.length/2),c))}(a,c,1),n=[];if(c.length>0)for(let b=d-m;b<=d+m;b+=1){let f=V(c,b),g=e-d+b,h=a.finite&&(b<0||b>c.length-1);n.push(h?{key:g}:{key:[`${g}`,R(f)?f.src:void 0].filter(Boolean).join("|"),offset:b-d,slide:f})}return g.createElement("div",{ref:f,className:J(K(M(i,void 0)),n.length>0&&K(M(i,"with_slides"))),style:{[`${L(M(i,"slides_count"))}`]:n.length,[`${L(M(i,"spacing_px"))}`]:k.pixel||0,[`${L(M(i,"spacing_percent"))}`]:k.percent||0,[`${L(M(i,"padding_px"))}`]:l.pixel||0,[`${L(M(i,"padding_percent"))}`]:l.percent||0},role:"region","aria-live":h&&!j?"off":"polite","aria-roledescription":O(b,"Carousel"),"aria-label":O(b,"Photo gallery")},n.map(({key:a,slide:b,offset:c})=>b?g.createElement(aU,{key:a,slide:b,offset:c}):g.createElement(aV,{key:a})))});function aX(){let{carousel:a}=ak(),{slides:b,currentIndex:c}=an();return{prevDisabled:0===b.length||a.finite&&0===c,nextDisabled:0===b.length||a.finite&&c===b.length-1}}function aY({label:a,icon:b,renderIcon:c,action:d,onClick:e,disabled:f,style:h}){return g.createElement(av,{label:a,icon:b,renderIcon:c,className:K(`navigation_${d}`),disabled:f,onClick:e,style:h,...function(a,b=!1){let c=g.useRef(!1);return aC(()=>{b&&c.current&&(c.current=!1,a())},[b,a]),{onFocus:g.useCallback(()=>{c.current=!0},[]),onBlur:g.useCallback(()=>{c.current=!1},[])}}(aS().focus,f)})}let aZ=Z("navigation",function({render:{buttonPrev:a,buttonNext:b,iconPrev:c,iconNext:d},styles:e}){let{prev:f,next:h,subscribeSensors:i}=aS(),{prevDisabled:j,nextDisabled:k}=aX();return!function(a){var b;let c=aK(),{publish:d}=ah(),{animation:e}=ak(),{prevDisabled:f,nextDisabled:h}=aX(),i=(null!=(b=e.navigation)?b:e.swipe)/2,j=aL(()=>d(t),i),k=aL(()=>d(u),i),l=aH(a=>{switch(a.key){case"Escape":d(w);break;case"ArrowLeft":(c?h:f)||(c?k:j)();break;case"ArrowRight":(c?f:h)||(c?j:k)()}});g.useEffect(()=>a(C,l),[a,l])}(i),g.createElement(g.Fragment,null,a?a():g.createElement(aY,{label:"Previous",action:t,icon:ay,renderIcon:c,style:e.navigationPrev,disabled:j,onClick:f}),b?b():g.createElement(aY,{label:"Next",action:u,icon:az,renderIcon:d,style:e.navigationNext,disabled:k,onClick:h}))}),a$=K("no_scroll"),a_=K(r);function a0(a,b,c){let d=window.getComputedStyle(a),e=c?"padding-left":"padding-right",f=c?d.paddingLeft:d.paddingRight,g=a.style.getPropertyValue(e);return a.style.setProperty(e,`${(S(f)||0)+b}px`),()=>{g?a.style.setProperty(e,g):a.style.removeProperty(e)}}let a1=Z("no-scroll",function({noScroll:{disabled:a},children:b}){let c=aK(),{getOwnerDocument:d,getOwnerWindow:e}=ae();return g.useEffect(()=>{if(a)return()=>{};let b=[],f=e(),{body:g,documentElement:h}=d(),i=Math.round(f.innerWidth-h.clientWidth);if(i>0){b.push(a0(g,i,c));let a=g.getElementsByTagName("*");for(let d=0;d<a.length;d+=1){let e=a[d];"style"in e&&"fixed"===f.getComputedStyle(e).getPropertyValue("position")&&!e.classList.contains(a_)&&b.push(a0(e,i,c))}}return g.classList.add(a$),()=>{g.classList.remove(a$),b.forEach(a=>a())}},[c,a,d,e]),g.createElement(g.Fragment,null,b)});function a2(a,b,c){let d=a.getAttribute(b);return a.setAttribute(b,c),()=>{d?a.setAttribute(b,d):a.removeAttribute(b)}}let a3=Z(k,function({children:a,animation:b,styles:c,className:d,on:e,portal:f,close:h,labels:i}){let[j,l]=g.useState(!1),[m,n]=g.useState(!1),o=g.useRef([]),p=g.useRef(null),{setTimeout:q}=at(),{subscribe:s}=ah(),t=aD()?0:b.fade;g.useEffect(()=>(l(!0),()=>{l(!1),n(!1)}),[]);let u=aH(()=>{o.current.forEach(a=>a()),o.current=[]}),v=aH(()=>{var a;n(!1),u(),null==(a=e.exiting)||a.call(e),q(()=>{var a;null==(a=e.exited)||a.call(e),h()},t)});g.useEffect(()=>s(w,v),[s,v]);let x=aH(a=>{var b,c,d;a.scrollTop,n(!0),null==(b=e.entering)||b.call(e);let f=null!=(d=null==(c=a.parentNode)?void 0:c.children)?d:[];for(let b=0;b<f.length;b+=1){let c=f[b];-1===["TEMPLATE","SCRIPT","STYLE"].indexOf(c.tagName)&&c!==a&&(o.current.push(a2(c,"inert","")),o.current.push(a2(c,"aria-hidden","true")))}o.current.push(()=>{var a,b;null==(b=null==(a=p.current)?void 0:a.focus)||b.call(a)}),q(()=>{var a;null==(a=e.entered)||a.call(e)},t)}),y=g.useCallback(a=>{a?x(a):u()},[x,u]);return j?(0,H.createPortal)(g.createElement(aP,{ref:y,className:J(d,K(M(k,void 0)),K(r),m&&K(M(k,"open"))),"aria-modal":!0,role:"dialog","aria-label":O(i,"Lightbox"),style:{...b.fade!==Y.animation.fade?{[L("fade_animation_duration")]:`${t}ms`}:null,...b.easing.fade!==Y.animation.easing.fade?{[L("fade_animation_timing_function")]:b.easing.fade}:null,...c.root},onFocus:a=>{p.current||(p.current=a.relatedTarget)}},a),f.root||document.body):null}),a4=Z("root",function({children:a}){return g.createElement(g.Fragment,null,a)}),a5=Z(l,function({toolbar:{buttons:a},render:{buttonClose:b,iconClose:c},styles:d}){let{close:e,setToolbarWidth:f}=aS(),{setContainerRef:h,containerRect:i}=aF();return aC(()=>{f(null==i?void 0:i.width)},[f,null==i?void 0:i.width]),g.createElement("div",{ref:h,style:d.toolbar,className:K(M(l,void 0))},null==a?void 0:a.map(a=>a===w?b?b():g.createElement(av,{key:w,label:"Close",icon:ax,renderIcon:c,onClick:e}):a))});function a6({carousel:a,animation:b,render:c,toolbar:d,controller:e,noScroll:f,on:h,plugins:i,slides:k,index:l,...m}){let{animation:n,carousel:o,render:p,toolbar:q,controller:r,noScroll:s,on:t,slides:u,index:v,plugins:w,...x}=Y,{config:y,augmentation:z}=function(a,b=[],c=[]){let d=a,e=a=>{let b=[...d];for(;b.length>0;){let c=b.pop();if((null==c?void 0:c.module.name)===a)return!0;(null==c?void 0:c.children)&&b.push(...c.children)}return!1},f=(a,b)=>{if(""===a){d=[$(b,d)];return}d=_(d,a,a=>[$(b,[a])])},g=(a,b)=>{d=_(d,a,a=>[$(a.module,[$(b,a.children)])])},h=(a,b,c)=>{d=_(d,a,a=>{var d;return[$(a.module,[...c?[$(b)]:[],...null!=(d=a.children)?d:[],...c?[]:[$(b)]])]})},i=(a,b,c)=>{d=_(d,a,a=>[...c?[$(b)]:[],a,...c?[]:[$(b)]])},k=a=>{g(j,a)},l=(a,b)=>{d=_(d,a,a=>[$(b,a.children)])},m=a=>{d=_(d,a,a=>a.children)},n=a=>{c.push(a)};return b.forEach(a=>{a({contains:e,addParent:f,append:g,addChild:h,addSibling:i,addModule:k,replace:l,remove:m,augment:n})}),{config:d,augmentation:a=>c.reduce((a,b)=>b(a),a)}}([$(a3,[$(a1,[$(aT,[$(aW),$(a5),$(aZ)])])])],i||w),A=z({animation:function(a,b={}){let{easing:c,...d}=a,{easing:e,...f}=b;return{easing:{...c,...e},...d,...f}}(n,b),carousel:{...o,...a},render:{...p,...c},toolbar:{...q,...d},controller:{...r,...e},noScroll:{...s,...f},on:{...t,...h},...x,...m});return A.open?g.createElement(al,{...A},g.createElement(ar,{slides:k||u,index:S(l||v)},g.createElement(au,null,g.createElement(ai,null,g.createElement(ac,null,function a(b,c){var d;return g.createElement(b.module.component,{key:b.module.name,...c},null==(d=b.children)?void 0:d.map(b=>a(b,c)))}($(a4,y),A)))))):null}let a7=[2,1,2,1,1,2,1,2,1,1];function a8(){let[a,b]=(0,g.useState)([]),[c,d]=(0,g.useState)(!0),[e,i]=(0,g.useState)(-1),[j,k]=(0,g.useState)("all"),[l,m]=(0,g.useState)(null);async function n(){d(!0);let{data:a,error:c}=await h.supabase.from("gallery_images").select("*").order("created_at",{ascending:!1});!c&&a&&b(a),d(!1)}(0,g.useEffect)(()=>{n()},[]);let o="featured"===j?a.filter(a=>a.is_featured):a;return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("style",{children:`
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
      `}),(0,f.jsxs)("div",{className:"gp-page",children:[(0,f.jsxs)("div",{className:"gp-hero",children:[(0,f.jsxs)("div",{className:"gp-hero-left",children:[(0,f.jsxs)("p",{className:"gp-label",children:[(0,f.jsx)("span",{className:"gp-label-dash"}),"IDEA Lab"]}),(0,f.jsxs)("h1",{className:"gp-heading",children:[(0,f.jsx)("span",{children:"Photo"}),(0,f.jsx)("span",{className:"hi",children:" Gallery"}),(0,f.jsx)("span",{className:"ghost",children:"All Moments"})]})]}),(0,f.jsxs)("div",{className:"gp-hero-right",children:[!c&&(0,f.jsxs)("span",{className:"gp-count",children:[(0,f.jsx)("em",{children:o.length})," photos"]}),(0,f.jsxs)("div",{className:"gp-filters",children:[(0,f.jsx)("button",{className:`gp-filter${"all"===j?" on":""}`,onClick:()=>k("all"),children:"All"}),(0,f.jsx)("button",{className:`gp-filter${"featured"===j?" on":""}`,onClick:()=>k("featured"),children:"Featured"})]})]})]}),(0,f.jsx)("div",{className:"gp-grid-wrap",children:c?(0,f.jsx)("div",{className:"gp-skel",children:Array.from({length:12}).map((a,b)=>(0,f.jsx)("div",{className:"gp-skel-cell",style:2===a7[b%a7.length]?{gridRow:"span 2"}:void 0},b))}):0===o.length?(0,f.jsx)("div",{className:"gp-empty",children:(0,f.jsxs)("div",{className:"gp-empty-body",children:[(0,f.jsx)("div",{className:"gp-empty-ring",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,f.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),(0,f.jsx)("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),(0,f.jsx)("polyline",{points:"21 15 16 10 5 21"})]})}),(0,f.jsx)("p",{className:"gp-empty-h",children:"No Photos Yet"}),(0,f.jsx)("p",{className:"gp-empty-p",children:"Gallery images will appear here once uploaded."})]})}):(0,f.jsx)("div",{className:"gp-grid",children:o.map((a,b)=>{let c=a7[b%a7.length];return(0,f.jsxs)("div",{className:`gp-cell${2===c?" gp-cell-tall":""}`,onClick:()=>i(b),children:[(0,f.jsx)("img",{src:a.image_url,alt:a.title??"",loading:"lazy"}),(0,f.jsx)("div",{className:"gp-notch"}),a.is_featured&&(0,f.jsx)("div",{className:"gp-featured-badge",children:"Featured"}),(0,f.jsx)("div",{className:"gp-expand",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,f.jsx)("polyline",{points:"15 3 21 3 21 9"}),(0,f.jsx)("polyline",{points:"9 21 3 21 3 15"}),(0,f.jsx)("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),(0,f.jsx)("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),(0,f.jsxs)("div",{className:"gp-cell-overlay",children:[a.title&&(0,f.jsx)("p",{className:"gp-cell-title",children:a.title}),(0,f.jsxs)("span",{className:"gp-cell-num",children:[String(b+1).padStart(2,"0")," / IDEA LAB"]})]})]},a.id)})})}),(0,f.jsx)(a6,{open:e>=0,close:()=>i(-1),slides:o.map(a=>({src:a.image_url,title:a.title??void 0})),index:e})]})]})}a.s(["default",()=>a8],61501)}];

//# sourceMappingURL=app_gallery_page_tsx_08dd9cd6._.js.map