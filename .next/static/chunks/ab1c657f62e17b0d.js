(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,19840,e=>{"use strict";var t=e.i(43476),n=e.i(71645);let i=(e=1)=>`rgba(255,176,0,${e})`,o=(e=1)=>`rgba(0,255,120,${e})`,s=(e=1)=>`rgba(255,60,60,${e})`,r=(e=1)=>`rgba(220,215,200,${e})`,a="rgba(255,176,0,0.03)",l="rgba(255,176,0,0.18)";function d(){let[e,d]=(0,n.useState)([]),c=async()=>{let e=await fetch("/api/admin/requests");d(await e.json())},p=async(e,t)=>{try{if("approved"===t){let t=await fetch("/api/admin/inventory-requests/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:e})}),n=await t.json();if(!t.ok)return void alert(n?.error||"Approval failed")}else await fetch("/api/admin/requests",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,status:t})});c()}catch(e){console.error(e),alert("Something went wrong")}};return(0,n.useEffect)(()=>{c()},[]),(0,t.jsxs)("div",{style:{minHeight:"100vh",background:"#0a0900",color:r(.85)},children:[(0,t.jsx)("style",{children:`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${i(.25)}}

        .requests-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px;
        }

        .request-card {
          background: ${a};
          border: 1px solid ${l};
          padding: 16px 18px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .status-pill {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }

        .actions-flex {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          margin-top: 12px;
        }

        .btn-action {
          flex: 1;
          border: none;
          padding: 10px 16px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          cursor: pointer;
          max-width: 150px;
        }

        @media (min-width: 768px) {
          .status-pill {
            position: absolute;
            top: 16px;
            right: 18px;
            margin-bottom: 0;
          }
          .btn-action {
            padding: 6px 16px;
            font-size: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .btn-action {
            max-width: none;
          }
        }
      `}),(0,t.jsxs)("div",{className:"requests-container",children:[(0,t.jsxs)("div",{style:{marginBottom:24},children:[(0,t.jsx)("div",{style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.55rem",letterSpacing:"0.3em",color:i(.4),marginBottom:4},children:"SYS · INVENTORY"}),(0,t.jsx)("h1",{style:{fontFamily:"'IBM Plex Sans Condensed', sans-serif",fontSize:"clamp(1.4rem, 5vw, 1.8rem)",fontWeight:700,color:i(.95),margin:0},children:"Inventory Requests"})]}),0===e.length&&(0,t.jsx)("div",{style:{background:a,border:`1px solid ${l}`,padding:"40px 24px",textAlign:"center",color:i(.3),fontFamily:"'IBM Plex Mono', monospace",letterSpacing:"0.15em",fontSize:"0.7rem"},children:"NO PENDING REQUESTS"}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.map(e=>{let n="approved"===e.status?o(.8):"rejected"===e.status?s(.8):i(.8);return(0,t.jsxs)("div",{className:"request-card",children:[(0,t.jsx)("div",{className:"status-pill",style:{color:n},children:e.status.toUpperCase()}),(0,t.jsxs)("div",{style:{marginBottom:12},children:[(0,t.jsx)("div",{style:{fontFamily:"'IBM Plex Sans Condensed', sans-serif",fontSize:"1rem",fontWeight:600,color:r(.95),lineHeight:1.2},children:e.requester_name}),(0,t.jsx)("div",{style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.6rem",color:i(.4),letterSpacing:"0.12em",marginTop:2},children:e.department})]}),(0,t.jsxs)("div",{style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.68rem",color:r(.7),marginBottom:12,lineHeight:1.4},children:[(0,t.jsx)("span",{style:{color:i(.4)},children:"PURPOSE // "}),e.purpose]}),(0,t.jsx)("div",{style:{background:"rgba(0,0,0,0.2)",padding:"8px 12px",border:`1px solid ${i(.05)}`},children:e.inventory_request_items.map((n,o)=>(0,t.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",borderBottom:o===e.inventory_request_items.length-1?"none":`1px solid ${i(.03)}`,padding:"5px 0",fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.65rem",color:r(.8)},children:[(0,t.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingRight:8},children:n.inventory_items.name}),(0,t.jsxs)("span",{style:{color:i(.6),flexShrink:0},children:["QTY: ",n.quantity]})]},o))}),"submitted"===e.status&&(0,t.jsxs)("div",{className:"actions-flex",children:[(0,t.jsx)("button",{onClick:()=>p(e.id,"approved"),className:"btn-action",style:{background:o(.9),color:"#000"},children:"APPROVE"}),(0,t.jsx)("button",{onClick:()=>p(e.id,"rejected"),className:"btn-action",style:{background:s(.8),color:"#000"},children:"REJECT"})]})]},e.id)})})]})]})}e.s(["default",()=>d])}]);