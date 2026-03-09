module.exports=[1194,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(46271),e=a.i(62036),f=a.i(95180),g=a.i(1299),h=a.i(38784),i=a.i(15618),j=a.i(23025),k=a.i(87532),l=a.i(33508),m=a.i(67453),n=a.i(50522),o=a.i(94392),p=a.i(80386),q=a.i(1027),r=a.i(78560),s=a.i(19812);function t(){let[a,t]=(0,c.useState)([]),[v,w]=(0,c.useState)([]),[x,y]=(0,c.useState)(null),[z,A]=(0,c.useState)(""),[B,C]=(0,c.useState)(!1),[D,E]=(0,c.useState)(!1),[F,G]=(0,c.useState)(!1),[H,I]=(0,c.useState)(!1),[J,K]=(0,c.useState)("all"),[L,M]=(0,c.useState)("name"),[N,O]=(0,c.useState)(null),[P,Q]=(0,c.useState)(!1),[R,S]=(0,c.useState)({name:"",college:"FISAT",department:"",phone:"",purpose:""}),[T,U]=(0,c.useState)(!0),[V,W]=(0,c.useState)(0),[X,Y]=(0,c.useState)(0),Z=(0,c.useRef)(null),{scrollY:$}=(0,f.useScroll)(),_=(0,g.useTransform)($,[0,260],[1,0]),aa=(0,g.useTransform)($,[0,260],[0,-40]);(0,c.useEffect)(()=>{r.supabase.auth.getUser().then(({data:a})=>y(a.user))},[]),(0,c.useEffect)(()=>{Y(0);let a=setTimeout(()=>{W(30),Y(1)},120),b=setTimeout(()=>W(70),400);return r.supabase.from("inventory_items").select("id, name, category, quantity_available").eq("is_active",!0).order("name").then(({data:a})=>{a&&t(a),W(100),Y(2),setTimeout(()=>U(!1),700)}),()=>{clearTimeout(a),clearTimeout(b)}},[]);let ab=(0,c.useCallback)(a=>{x?a():G(!0)},[x]),ac=(0,c.useCallback)(a=>{0!==a.quantity_available&&(w(b=>{let c=b.find(b=>b.id===a.id);return c?c.quantity>=a.quantity_available?b:b.map(b=>b.id===a.id?{...b,quantity:b.quantity+1}:b):[...b,{...a,quantity:1}]}),O(a.name),setTimeout(()=>O(null),2e3))},[]),ad=(0,c.useCallback)((a,b)=>{w(c=>c.map(c=>{if(c.id!==a)return c;let d=c.quantity+b;return d<1||d>c.quantity_available?c:{...c,quantity:d}}))},[]),ae=(0,c.useCallback)(a=>{w(b=>b.filter(b=>b.id!==a))},[]),af=async()=>{if(!x)return;let{name:a,department:b,phone:c,purpose:d}=R;if(a&&b&&c&&d)try{if(I(!0),!(await fetch("/api/inventory-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:x.id,requester:R,items:v.map(a=>({id:a.id,quantity:a.quantity}))})})).ok)return;w([]),C(!1),E(!1),Q(!0),setTimeout(()=>Q(!1),2500)}finally{I(!1)}},ag=["all",...Array.from(new Set(a.map(a=>a.category)))],ah=a.filter(a=>`${a.name} ${a.category}`.toLowerCase().includes(z.toLowerCase())&&("all"===J||a.category===J)).sort((a,b)=>"availability"===L?b.quantity_available-a.quantity_available:a.name.localeCompare(b.name)),ai=v.reduce((a,b)=>a+b.quantity,0),aj=v.length;return(0,b.jsxs)("div",{className:"r",children:[(0,b.jsx)("style",{children:u}),(0,b.jsx)(e.AnimatePresence,{children:T&&(0,b.jsxs)(d.motion.div,{className:"loader",initial:{opacity:1},exit:{opacity:0,transition:{duration:.55,ease:[.4,0,.2,1]}},children:[(0,b.jsx)("div",{className:"loader-orb","aria-hidden":!0}),(0,b.jsxs)(d.motion.div,{className:"loader-body",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.1},children:[(0,b.jsx)("div",{className:"ld-mark",children:(0,b.jsx)(o.Cpu,{size:18,color:"#f97316",strokeWidth:2})}),(0,b.jsxs)("div",{className:"ld-type",children:[(0,b.jsx)("span",{className:"ld-h1",children:"LAB"}),(0,b.jsx)("span",{className:"ld-h2",children:"INVENTORY"})]}),(0,b.jsx)("p",{className:"ld-sub",children:"FISAT · IDEA LAB"}),(0,b.jsx)("div",{className:"ld-bar-wrap",children:(0,b.jsx)(d.motion.div,{className:"ld-bar-fill",animate:{width:`${V}%`},transition:{duration:.45,ease:[.4,0,.2,1]}})}),(0,b.jsxs)("div",{className:"ld-phase-row",children:[(0,b.jsx)("span",{className:"ld-phase-dot",style:{background:2===X?"#22c55e":"#f97316"}}),(0,b.jsxs)("span",{className:"ld-phase-txt",children:[0===X&&"INITIALIZING...",1===X&&"QUERYING DATABASE...",2===X&&"ASSETS LOADED"]}),(0,b.jsxs)("span",{className:"ld-pct",children:[V,"%"]})]})]})]})}),(0,b.jsx)("div",{className:"bg-cover","aria-hidden":!0}),(0,b.jsx)("div",{className:"bg-grid","aria-hidden":!0}),(0,b.jsx)("div",{className:"orb","aria-hidden":!0}),(0,b.jsx)(e.AnimatePresence,{children:N&&(0,b.jsxs)(d.motion.div,{className:"toast t-orange",initial:{opacity:0,y:18,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.95},transition:{type:"spring",stiffness:380,damping:28},children:[(0,b.jsx)("div",{className:"t-ico o-ico",children:(0,b.jsx)(m.CheckCircle2,{size:13,color:"#f97316"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"t-title",children:"ADDED TO REQUEST"}),(0,b.jsx)("p",{className:"t-sub",children:N})]})]})}),(0,b.jsx)(e.AnimatePresence,{children:P&&(0,b.jsxs)(d.motion.div,{className:"toast t-green",initial:{opacity:0,y:18,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.95},transition:{type:"spring",stiffness:380,damping:28},children:[(0,b.jsx)("div",{className:"t-ico g-ico",children:(0,b.jsx)(m.CheckCircle2,{size:13,color:"#22c55e"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"t-title",children:"REQUEST SUBMITTED"}),(0,b.jsx)("p",{className:"t-sub",children:"Lab team will review shortly"})]})]})}),(0,b.jsxs)("header",{className:"hdr",children:[(0,b.jsxs)("div",{className:"hdr-l",children:[(0,b.jsx)("div",{className:"hdr-mark",children:(0,b.jsx)(o.Cpu,{size:12,color:"#f97316",strokeWidth:2.5})}),(0,b.jsx)("span",{className:"hdr-name",children:"LAB INVENTORY"}),(0,b.jsx)("span",{className:"hdr-pipe"}),(0,b.jsx)("span",{className:"hdr-sub",children:"FISAT · IDEA LAB"})]}),(0,b.jsxs)("div",{className:"hdr-r",children:[x&&(0,b.jsxs)("span",{className:"sync-tag",children:[(0,b.jsx)("span",{className:"sync-dot"}),"SYNC_ACTIVE"]}),(0,b.jsxs)("button",{className:`cart-btn ${ai>0?"cart-btn-active":""}`,onClick:()=>ab(()=>C(!0)),suppressHydrationWarning:!0,children:[(0,b.jsx)(h.ShoppingCart,{size:14,strokeWidth:2}),(0,b.jsx)("span",{children:ai>0?`${aj} ITEM${1!==aj?"S":""}`:"CART"}),(0,b.jsx)(e.AnimatePresence,{children:ai>0&&(0,b.jsx)(d.motion.span,{className:"cart-pip",initial:{scale:0},animate:{scale:1},exit:{scale:0},children:ai})})]})]})]}),(0,b.jsxs)(d.motion.section,{className:"hero",ref:Z,style:{opacity:_,y:aa},children:[(0,b.jsxs)("div",{className:"term",children:[(0,b.jsx)("span",{className:"term-cursor"})," ",(0,b.jsx)("span",{className:"term-dim",children:"[SYSTEM_REPORT]"}),(0,b.jsxs)("span",{className:"term-row",children:[(0,b.jsx)("span",{className:"term-arrow",children:">"})," DATABASE_QUERY: ",(0,b.jsx)("span",{className:"term-ok",children:"SUCCESS"})]}),(0,b.jsxs)("span",{className:"term-row",children:[(0,b.jsx)("span",{className:"term-arrow",children:">"})," ASSETS_LOCATED: ",(0,b.jsx)("span",{className:"term-ok",children:"TRUE"})]}),(0,b.jsxs)("span",{className:"term-row",children:[(0,b.jsx)("span",{className:"term-arrow",children:">"})," TERMINAL: ",(0,b.jsx)("span",{className:"term-ok",children:"FISAT_IDEA_LAB"})]})]}),(0,b.jsxs)("div",{className:"hero-eyebrow",children:[(0,b.jsx)("span",{className:"ey-pill",children:"LIVE RESOURCE DATABASE"}),(0,b.jsx)("span",{className:"ey-line"}),(0,b.jsx)("span",{className:"ey-tag",children:"SYNC_ACTIVE"})]}),(0,b.jsxs)("div",{className:"hero-type",children:[(0,b.jsx)(d.motion.h1,{className:"ht-solid",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},children:"LAB"}),(0,b.jsx)(d.motion.h1,{className:"ht-outline",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08,ease:[.16,1,.3,1]},children:"INVENTORY"})]}),(0,b.jsxs)(d.motion.p,{className:"hero-desc",initial:{opacity:0},animate:{opacity:1},transition:{delay:.3,duration:.5},children:["Browse, reserve, and request equipment for your projects.",(0,b.jsx)("br",{}),"All reservations are reviewed by lab coordinators."]})]}),(0,b.jsxs)("div",{className:"fbar",children:[(0,b.jsxs)("div",{className:"fbar-top",children:[(0,b.jsxs)("div",{className:"srch-wrap",children:[(0,b.jsx)(k.Search,{size:13,className:"srch-ico",strokeWidth:2}),(0,b.jsx)("input",{className:"srch-inp",placeholder:"SEARCH COMPONENTS, TOOLS...",value:z,onChange:a=>A(a.target.value),suppressHydrationWarning:!0}),z&&(0,b.jsx)("button",{className:"srch-clear",onClick:()=>A(""),children:(0,b.jsx)(l.X,{size:12})})]}),(0,b.jsxs)("select",{className:"sort-sel",value:L,onChange:a=>M(a.target.value),suppressHydrationWarning:!0,children:[(0,b.jsx)("option",{value:"name",children:"SORT: NAME"}),(0,b.jsx)("option",{value:"availability",children:"SORT: AVAILABILITY"})]})]}),(0,b.jsx)("div",{className:"cat-row",children:ag.map(a=>(0,b.jsx)("button",{className:`cat-btn ${J===a?"cat-on":""}`,onClick:()=>K(a),suppressHydrationWarning:!0,children:"all"===a?"ALL":a.toUpperCase()},a))}),(0,b.jsxs)("div",{className:"result-line",children:[(0,b.jsx)("span",{className:"result-count",children:ah.length}),(0,b.jsxs)("span",{className:"result-label",children:[" ASSET",1!==ah.length?"S":""," FOUND"]}),"all"!==J&&(0,b.jsxs)("span",{className:"result-cat",children:[" · ",J.toUpperCase()]})]})]}),(0,b.jsxs)("div",{className:"grid",children:[(0,b.jsx)(e.AnimatePresence,{mode:"popLayout",children:ah.map((a,c)=>{var f;let g=0===(f=a.quantity_available)?{short:"UNAVAILABLE",color:"#ef4444",bg:"rgba(239,68,68,0.10)",border:"rgba(239,68,68,0.28)"}:f<10?{short:"LIMITED",color:"#f97316",bg:"rgba(249,115,22,0.10)",border:"rgba(249,115,22,0.36)"}:{short:"AVAILABLE",color:"#22c55e",bg:"rgba(34,197,94,0.10)",border:"rgba(34,197,94,0.28)"},h=v.find(b=>b.id===a.id),j=0===a.quantity_available;return(0,b.jsxs)(d.motion.div,{className:`card ${j?"card-off":""}`,layout:!0,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,scale:.95},transition:{duration:.22,delay:Math.min(.028*c,.28)},whileHover:j?{}:{y:-3},children:[(0,b.jsx)("span",{className:"card-scan"}),(0,b.jsxs)("div",{className:"card-r1",children:[(0,b.jsx)("div",{className:`card-ico ${j?"":"card-ico-lit"}`,children:(0,b.jsx)(o.Cpu,{size:15,color:j?"#333":"#f97316",strokeWidth:2})}),(0,b.jsx)(e.AnimatePresence,{children:h&&(0,b.jsxs)(d.motion.span,{className:"incart-pill",initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.7},children:["×",h.quantity]})})]}),(0,b.jsxs)("div",{className:"card-body",children:[(0,b.jsx)("h3",{className:"card-name",children:a.name}),(0,b.jsx)("p",{className:"card-cat",children:a.category.toUpperCase()})]}),(0,b.jsxs)("div",{className:"card-meta",children:[(0,b.jsxs)("span",{className:"st-badge",style:{color:g.color,background:g.bg,borderColor:g.border},children:[(0,b.jsx)("span",{className:"st-dot",style:{background:g.color}}),g.short]}),(0,b.jsxs)("span",{className:"card-qty",children:["QTY·",String(a.quantity_available).padStart(3,"0")]})]}),(0,b.jsx)("button",{className:`card-cta ${j?"cta-off":"cta-on"}`,disabled:j,onClick:()=>ab(()=>ac(a)),suppressHydrationWarning:!0,children:j?"UNAVAILABLE":(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i.Plus,{size:11,strokeWidth:3}),"REQUEST"]})})]},a.id)})}),0===ah.length&&(0,b.jsxs)("div",{className:"empty",children:[(0,b.jsx)(o.Cpu,{size:38,style:{opacity:.1,marginBottom:14}}),(0,b.jsx)("p",{className:"empty-h",children:"NO ASSETS FOUND"}),(0,b.jsx)("p",{className:"empty-s",children:"Adjust search or category filter"})]})]}),(0,b.jsx)(e.AnimatePresence,{children:B&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(d.motion.div,{className:"overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>C(!1)}),(0,b.jsxs)(d.motion.aside,{className:"drawer",initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",stiffness:330,damping:34},children:[(0,b.jsxs)("div",{className:"dr-head",children:[(0,b.jsxs)("div",{className:"dr-head-l",children:[(0,b.jsx)("div",{className:"dr-mark",children:(0,b.jsx)(h.ShoppingCart,{size:13,color:"#f97316"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"dr-title",children:"REQUEST CART"}),(0,b.jsx)("p",{className:"dr-sub",children:0===v.length?"EMPTY":`${aj} TYPE${1!==aj?"S":""} \xb7 ${ai} UNIT${1!==ai?"S":""}`})]})]}),(0,b.jsx)("button",{className:"ico-btn",onClick:()=>C(!1),suppressHydrationWarning:!0,children:(0,b.jsx)(l.X,{size:14})})]}),(0,b.jsx)("div",{className:"dr-rule"}),(0,b.jsx)("div",{className:"dr-body",children:0===v.length?(0,b.jsxs)("div",{className:"dr-empty",children:[(0,b.jsx)(h.ShoppingCart,{size:30,style:{opacity:.12,marginBottom:10}}),(0,b.jsx)("p",{className:"dr-empty-t",children:"CART IS EMPTY"}),(0,b.jsx)("p",{className:"dr-empty-s",children:"Add items from the inventory below"})]}):(0,b.jsx)(e.AnimatePresence,{children:v.map(a=>(0,b.jsxs)(d.motion.div,{className:"dr-item",layout:!0,initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:20,height:0,marginBottom:0,padding:0},transition:{duration:.2},children:[(0,b.jsx)("div",{className:"dri-ico",children:(0,b.jsx)(o.Cpu,{size:12,color:"#f97316"})}),(0,b.jsxs)("div",{className:"dri-info",children:[(0,b.jsx)("p",{className:"dri-name",children:a.name}),(0,b.jsx)("p",{className:"dri-cat",children:a.category.toUpperCase()})]}),(0,b.jsxs)("div",{className:"dri-ctrl",children:[(0,b.jsx)("button",{className:"q-btn",onClick:()=>ad(a.id,-1),suppressHydrationWarning:!0,children:(0,b.jsx)(j.Minus,{size:9,strokeWidth:3})}),(0,b.jsx)("span",{className:"q-val",children:a.quantity}),(0,b.jsx)("button",{className:"q-btn",onClick:()=>ad(a.id,1),suppressHydrationWarning:!0,children:(0,b.jsx)(i.Plus,{size:9,strokeWidth:3})}),(0,b.jsx)("button",{className:"del-btn",onClick:()=>ae(a.id),suppressHydrationWarning:!0,children:(0,b.jsx)(l.X,{size:11})})]})]},a.id))})}),(0,b.jsxs)("div",{className:"dr-foot",children:[v.length>0&&(0,b.jsxs)("div",{className:"dr-note",children:[(0,b.jsx)(p.Terminal,{size:11,style:{flexShrink:0,color:"#f97316",marginTop:1}}),(0,b.jsx)("span",{children:"Requests are subject to coordinator approval and current availability."})]}),(0,b.jsxs)("button",{className:"cta-primary",disabled:0===v.length,onClick:()=>E(!0),suppressHydrationWarning:!0,children:["PROCEED TO DETAILS ",(0,b.jsx)(n.ChevronRight,{size:14,strokeWidth:2.5})]})]})]})]})}),(0,b.jsx)(e.AnimatePresence,{children:D&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(d.motion.div,{className:"overlay",style:{zIndex:60},initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>E(!1)}),(0,b.jsx)(d.motion.div,{className:"modal-shell",style:{zIndex:61},initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:(0,b.jsxs)(d.motion.div,{className:"modal",initial:{scale:.93,y:16},animate:{scale:1,y:0},exit:{scale:.93,y:16},onClick:a=>a.stopPropagation(),children:[(0,b.jsxs)("div",{className:"modal-hd",children:[(0,b.jsx)("div",{className:"modal-ico",children:(0,b.jsx)(q.Zap,{size:16,color:"#f97316",strokeWidth:2.5})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"modal-title",children:"REQUESTER DETAILS"}),(0,b.jsx)("p",{className:"modal-sub",children:"Complete the form to submit your request"})]}),(0,b.jsx)("button",{className:"ico-btn",style:{marginLeft:"auto"},onClick:()=>E(!1),suppressHydrationWarning:!0,children:(0,b.jsx)(l.X,{size:13})})]}),(0,b.jsx)("div",{className:"modal-rule"}),[{k:"name",l:"FULL NAME",p:"Your full name"},{k:"department",l:"DEPARTMENT",p:"e.g. ECE, CSE, ME"},{k:"phone",l:"PHONE",p:"10-digit mobile number"},{k:"purpose",l:"PROJECT / USE",p:"Describe your use case briefly"}].map(({k:a,l:c,p:d})=>(0,b.jsxs)("div",{className:"mfield",children:[(0,b.jsx)("label",{className:"mfield-l",children:c}),(0,b.jsx)("input",{className:"mfield-i",placeholder:d,value:R[a],onChange:b=>S({...R,[a]:b.target.value}),suppressHydrationWarning:!0})]},a)),(0,b.jsxs)("div",{className:"modal-acts",children:[(0,b.jsx)("button",{className:"ghost-btn",onClick:()=>E(!1),suppressHydrationWarning:!0,children:"CANCEL"}),(0,b.jsx)("button",{className:"cta-primary",style:{flex:2},disabled:H,onClick:af,suppressHydrationWarning:!0,children:H?"SUBMITTING...":"SUBMIT REQUEST"})]})]})})]})}),(0,b.jsx)(s.default,{open:F,onClose:()=>G(!1)})]})}let u=`
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
`;a.s(["default",()=>t])}];

//# sourceMappingURL=app_inventory_page_tsx_062fe4aa._.js.map