(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64704,e=>{"use strict";var a=e.i(43476),r=e.i(71645),s=e.i(17927);function i(){(0,r.useEffect)(()=>{let e="cons-fonts";if(document.getElementById(e))return;let a=document.createElement("link");a.id=e,a.rel="stylesheet",a.href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Barlow:wght@300;400;500;600&display=swap",document.head.prepend(a)},[]);let[e,i]=(0,r.useState)([]),[c,o]=(0,r.useState)(!0),[n,p]=(0,r.useState)(!1),[l,d]=(0,r.useState)(!1),[m,x]=(0,r.useState)(null),g=(0,r.useRef)(null),[h,f]=(0,r.useState)({full_name:"",email:"",phone:"",organization:"",service_id:"",budget_range:"",project_details:""});async function b(){let{data:e,error:a}=await s.supabase.from("consultancy_services").select("*").eq("is_active",!0);a?console.error("Fetch services error:",a):(e&&i(e),o(!1))}async function u(){if(!h.full_name||!h.email)return void alert("Name and Email are required");d(!0);let e={...h,service_id:h.service_id||null},{error:a}=await s.supabase.from("consultation_requests").insert([e]);if(d(!1),a){console.error("Insert error:",a),alert("Failed to submit request");return}p(!0),f({full_name:"",email:"",phone:"",organization:"",service_id:"",budget_range:"",project_details:""})}if((0,r.useEffect)(()=>{b()},[]),c)return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("style",{children:t}),(0,a.jsxs)("div",{className:"cp-root",children:[(0,a.jsx)("div",{className:"cp-noise","aria-hidden":!0}),(0,a.jsxs)("div",{className:"cp-loader",children:[(0,a.jsx)("div",{className:"cp-loader-ring"}),(0,a.jsx)("span",{className:"cp-loader-txt",children:"INITIALIZING · IDEA LAB CONSULTANCY"})]})]})]});let v=Date.now().toString(36).toUpperCase().slice(-6);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("style",{children:t}),(0,a.jsxs)("div",{className:"cp-root",children:[(0,a.jsx)("div",{className:"cp-noise","aria-hidden":!0}),(0,a.jsxs)("section",{className:"cp-hero",children:[(0,a.jsx)("div",{className:"cp-hero-glow","aria-hidden":!0}),(0,a.jsx)("div",{className:"cp-hero-dots","aria-hidden":!0}),(0,a.jsx)("div",{className:"cp-diagonal","aria-hidden":!0}),(0,a.jsxs)("div",{className:"cp-hero-body",children:[(0,a.jsxs)("div",{className:"cp-hero-left",children:[(0,a.jsxs)("div",{className:"cp-badge",children:[(0,a.jsx)("span",{className:"cp-badge-dot"}),(0,a.jsx)("span",{children:"FISAT AICTE IDEA Lab"}),(0,a.jsx)("span",{className:"cp-badge-sep",children:"·"}),(0,a.jsx)("span",{children:"Open for Briefs"})]}),(0,a.jsxs)("h1",{className:"cp-h1",children:[(0,a.jsx)("span",{className:"cp-h1-outline",children:"EXPERT"}),(0,a.jsx)("br",{}),"CONSUL­TANCY"]}),(0,a.jsx)("p",{className:"cp-hero-desc",children:"Precision-engineered solutions for your most complex challenges. Our specialists bridge the gap between vision and impact — from prototype to production."}),(0,a.jsxs)("div",{className:"cp-hero-meta",children:[(0,a.jsxs)("div",{className:"cp-meta-item",children:[(0,a.jsx)("span",{className:"cp-meta-num",children:e.length}),(0,a.jsx)("span",{className:"cp-meta-lbl",children:"Active Services"})]}),(0,a.jsx)("span",{className:"cp-meta-rule","aria-hidden":!0}),(0,a.jsxs)("div",{className:"cp-meta-item",children:[(0,a.jsx)("span",{className:"cp-meta-num",children:"24h"}),(0,a.jsx)("span",{className:"cp-meta-lbl",children:"Response Time"})]}),(0,a.jsx)("span",{className:"cp-meta-rule","aria-hidden":!0}),(0,a.jsxs)("div",{className:"cp-meta-item",children:[(0,a.jsx)("span",{className:"cp-meta-num",children:"100%"}),(0,a.jsx)("span",{className:"cp-meta-lbl",children:"Confidential"})]})]})]}),(0,a.jsx)("div",{className:"cp-hero-right",children:(0,a.jsxs)("div",{className:"cp-status-card",children:[(0,a.jsx)("div",{className:"cp-sc-topline"}),(0,a.jsxs)("div",{className:"cp-sc-head",children:[(0,a.jsx)("span",{className:"cp-sc-mono",children:"// System Status"}),(0,a.jsxs)("span",{className:"cp-sc-live",children:[(0,a.jsx)("span",{className:"cp-sc-live-dot"}),"LIVE"]})]}),(0,a.jsxs)("div",{className:"cp-sc-row",children:[(0,a.jsx)("span",{className:"cp-sc-key",children:"Intake"}),(0,a.jsx)("span",{className:"cp-sc-val cp-sc-green",children:"OPEN"})]}),(0,a.jsxs)("div",{className:"cp-sc-row",children:[(0,a.jsx)("span",{className:"cp-sc-key",children:"Services"}),(0,a.jsxs)("span",{className:"cp-sc-val",children:[e.length," ACTIVE"]})]}),(0,a.jsxs)("div",{className:"cp-sc-row",children:[(0,a.jsx)("span",{className:"cp-sc-key",children:"SLA"}),(0,a.jsx)("span",{className:"cp-sc-val",children:"24H RESPONSE"})]}),(0,a.jsx)("div",{className:"cp-sc-divider"}),(0,a.jsx)("p",{className:"cp-sc-note",children:"Select a service below or scroll to file a brief directly. Every submission is reviewed personally."}),(0,a.jsxs)("a",{href:"#cp-form",className:"cp-sc-btn",onClick:e=>{e.preventDefault(),g.current?.scrollIntoView({behavior:"smooth"})},children:["File a Brief",(0,a.jsx)("svg",{viewBox:"0 0 14 14",fill:"none",width:"12",children:(0,a.jsx)("path",{d:"M7 2v10M2 7l5 5 5-5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})]})]})})]})]}),(0,a.jsxs)("section",{className:"cp-services",children:[(0,a.jsxs)("div",{className:"cp-sec-head",children:[(0,a.jsx)("div",{className:"cp-sec-rule"}),(0,a.jsx)("span",{className:"cp-sec-label",children:"Available Services"}),(0,a.jsx)("div",{className:"cp-sec-rule"})]}),0===e.length?(0,a.jsxs)("div",{className:"cp-empty",children:[(0,a.jsx)("span",{className:"cp-empty-glyph",children:"∅"}),(0,a.jsx)("p",{className:"cp-empty-txt",children:"No active services at the moment. Check back soon."})]}):(0,a.jsx)("div",{className:"cp-grid",children:e.map((e,r)=>(0,a.jsxs)("article",{className:`cp-card ${m===e.id?"cp-card--active":""}`,style:{"--delay":`${.08*r}s`},children:[(0,a.jsx)("div",{className:"cp-card-bar"}),(0,a.jsx)("span",{className:"cp-card-serial",children:String(r+1).padStart(2,"0")}),e.image_url&&(0,a.jsxs)("div",{className:"cp-card-thumb",children:[(0,a.jsx)("img",{src:e.image_url,alt:e.title,loading:"lazy",className:"cp-card-img"}),(0,a.jsx)("div",{className:"cp-card-scrim"})]}),(0,a.jsxs)("div",{className:"cp-card-content",children:[(0,a.jsx)("h2",{className:"cp-card-title",children:e.title}),e.description&&(0,a.jsx)("p",{className:"cp-card-desc",children:e.description}),e.features&&e.features.length>0&&(0,a.jsx)("ul",{className:"cp-feats",children:e.features.map((e,r)=>(0,a.jsxs)("li",{className:"cp-feat",children:[(0,a.jsx)("span",{className:"cp-feat-mark",children:"✦"}),(0,a.jsx)("span",{children:e})]},r))}),e.contact_email&&(0,a.jsxs)("div",{className:"cp-contact",children:[(0,a.jsx)("span",{className:"cp-contact-lbl",children:"Specialist"}),(0,a.jsx)("span",{className:"cp-contact-name",children:e.contact_name}),(0,a.jsx)("a",{href:`mailto:${e.contact_email}`,className:"cp-contact-email",onClick:e=>e.stopPropagation(),children:e.contact_email})]}),(0,a.jsxs)("button",{className:"cp-card-cta",onClick:()=>{var a;return a=e.id,void(x(e=>e===a?null:a),f(e=>({...e,service_id:a})),setTimeout(()=>g.current?.scrollIntoView({behavior:"smooth",block:"start"}),60))},children:[m===e.id?"Selected ✓":"Request This Service",m!==e.id&&(0,a.jsx)("svg",{viewBox:"0 0 12 12",fill:"none",width:"11",children:(0,a.jsx)("path",{d:"M2 10L10 2M10 2H4M10 2v6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})]})]})]},e.id))})]}),(0,a.jsxs)("section",{className:"cp-form-wrap",id:"cp-form",ref:g,children:[(0,a.jsx)("div",{className:"cp-form-glow","aria-hidden":!0}),(0,a.jsxs)("div",{className:"cp-form-layout",children:[(0,a.jsxs)("div",{className:"cp-form-lhs",children:[(0,a.jsxs)("div",{className:"cp-badge",children:[(0,a.jsx)("span",{className:"cp-badge-dot"}),(0,a.jsx)("span",{children:"Step 01"}),(0,a.jsx)("span",{className:"cp-badge-sep",children:"·"}),(0,a.jsx)("span",{children:"Start Here"})]}),(0,a.jsxs)("h2",{className:"cp-form-title",children:["File",(0,a.jsx)("br",{}),(0,a.jsx)("span",{className:"cp-form-title-outline",children:"Your Brief."})]}),(0,a.jsx)("p",{className:"cp-form-desc",children:"Fill in your details and describe your project. Every brief is reviewed personally by our team and you'll hear back within one business day."}),(0,a.jsx)("div",{className:"cp-process",children:[{n:"01",label:"Submit Brief",note:"Fill out the form"},{n:"02",label:"Team Review",note:"Within 24 hours"},{n:"03",label:"Discovery Call",note:"Align on scope"},{n:"04",label:"Proposal",note:"Tailored quote"}].map((e,r,s)=>(0,a.jsxs)("div",{className:"cp-step",children:[(0,a.jsxs)("div",{className:"cp-step-left",children:[(0,a.jsx)("span",{className:"cp-step-n",children:e.n}),r<s.length-1&&(0,a.jsx)("div",{className:"cp-step-line"})]}),(0,a.jsxs)("div",{className:"cp-step-right",children:[(0,a.jsx)("span",{className:"cp-step-label",children:e.label}),(0,a.jsx)("span",{className:"cp-step-note",children:e.note})]})]},r))})]}),(0,a.jsxs)("div",{className:"cp-form-panel",children:[(0,a.jsx)("div",{className:"cp-panel-topline"}),n?(0,a.jsxs)("div",{className:"cp-success",children:[(0,a.jsx)("div",{className:"cp-success-ring",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",width:"28",height:"28",children:(0,a.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"#22c55e",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,a.jsx)("h3",{className:"cp-success-h",children:"Brief Received"}),(0,a.jsx)("p",{className:"cp-success-p",children:"We've logged your consultation request. Our team will be in touch within 24 hours."}),(0,a.jsx)("button",{className:"cp-success-again",onClick:()=>p(!1),children:"Submit Another Brief"})]}):(0,a.jsxs)("div",{className:"cp-form",children:[(0,a.jsxs)("div",{className:"cp-form-ref",children:["// REF-",v,"  ·  IDEA LAB CONSULTANCY"]}),(0,a.jsxs)("div",{className:"cp-row",children:[(0,a.jsxs)("div",{className:"cp-field",children:[(0,a.jsxs)("label",{className:"cp-lbl",children:["Full Name ",(0,a.jsx)("span",{className:"cp-req",children:"*"})]}),(0,a.jsx)("input",{className:"cp-input",placeholder:"Your full name",value:h.full_name,onChange:e=>f({...h,full_name:e.target.value})})]}),(0,a.jsxs)("div",{className:"cp-field",children:[(0,a.jsxs)("label",{className:"cp-lbl",children:["Email Address ",(0,a.jsx)("span",{className:"cp-req",children:"*"})]}),(0,a.jsx)("input",{className:"cp-input",type:"email",placeholder:"you@example.com",value:h.email,onChange:e=>f({...h,email:e.target.value})})]})]}),(0,a.jsxs)("div",{className:"cp-row",children:[(0,a.jsxs)("div",{className:"cp-field",children:[(0,a.jsx)("label",{className:"cp-lbl",children:"Phone"}),(0,a.jsx)("input",{className:"cp-input",placeholder:"+91 XXXXX XXXXX",value:h.phone,onChange:e=>f({...h,phone:e.target.value})})]}),(0,a.jsxs)("div",{className:"cp-field",children:[(0,a.jsx)("label",{className:"cp-lbl",children:"Organization"}),(0,a.jsx)("input",{className:"cp-input",placeholder:"Company / Institution",value:h.organization,onChange:e=>f({...h,organization:e.target.value})})]})]}),(0,a.jsxs)("div",{className:"cp-row",children:[(0,a.jsxs)("div",{className:"cp-field",children:[(0,a.jsx)("label",{className:"cp-lbl",children:"Service"}),(0,a.jsxs)("div",{className:"cp-sel-wrap",children:[(0,a.jsxs)("select",{className:"cp-select",value:h.service_id,onChange:e=>f({...h,service_id:e.target.value}),children:[(0,a.jsx)("option",{value:"",children:"Select a service…"}),e.map(e=>(0,a.jsx)("option",{value:e.id,children:e.title},e.id))]}),(0,a.jsx)("svg",{className:"cp-sel-arrow",viewBox:"0 0 10 7",fill:"none",width:"10",children:(0,a.jsx)("path",{d:"M1 1.5l4 4 4-4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]}),(0,a.jsxs)("div",{className:"cp-field",children:[(0,a.jsx)("label",{className:"cp-lbl",children:"Estimated Budget"}),(0,a.jsx)("input",{className:"cp-input",placeholder:"e.g. ₹50,000 – ₹2,00,000",value:h.budget_range,onChange:e=>f({...h,budget_range:e.target.value})})]})]}),(0,a.jsxs)("div",{className:"cp-field",children:[(0,a.jsx)("label",{className:"cp-lbl",children:"Project Details"}),(0,a.jsx)("textarea",{className:"cp-textarea",rows:5,placeholder:"Describe your project, goals, timeline, and any specific requirements…",value:h.project_details,onChange:e=>f({...h,project_details:e.target.value})}),(0,a.jsxs)("span",{className:"cp-chars",children:[h.project_details.length," chars"]})]}),(0,a.jsx)("button",{className:`cp-submit${l?" cp-submit--loading":""}`,onClick:u,disabled:l,children:l?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"cp-spinner"}),"Submitting Brief…"]}):(0,a.jsxs)(a.Fragment,{children:["Submit Consultation Request",(0,a.jsx)("svg",{viewBox:"0 0 14 14",fill:"none",width:"13",children:(0,a.jsx)("path",{d:"M2 7h10M7 2l5 5-5 5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})]})}),(0,a.jsx)("p",{className:"cp-privacy",children:"Your information is kept strictly confidential and used solely for consultation purposes."})]})]})]})]}),(0,a.jsx)("footer",{className:"cp-footer",children:(0,a.jsxs)("div",{className:"cp-footer-inner",children:[(0,a.jsx)("span",{className:"cp-footer-mono",children:"// FISAT AICTE IDEA Lab · Consultancy Division"}),(0,a.jsx)("span",{className:"cp-footer-mono cp-footer-right",children:"Angamaly, Kerala · India"})]})})]})]})}let t=`

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
`;e.s(["default",()=>i])}]);