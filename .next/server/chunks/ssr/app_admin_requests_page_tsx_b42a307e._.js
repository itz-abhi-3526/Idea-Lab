module.exports=[10306,a=>{"use strict";var b=a.i(87924),c=a.i(72131);let d=(a=1)=>`rgba(255,176,0,${a})`,e=(a=1)=>`rgba(0,255,120,${a})`,f=(a=1)=>`rgba(255,60,60,${a})`,g=(a=1)=>`rgba(220,215,200,${a})`,h="rgba(255,176,0,0.03)",i="rgba(255,176,0,0.18)";function j(){let[a,j]=(0,c.useState)([]),k=async()=>{let a=await fetch("/api/admin/requests");j(await a.json())},l=async(a,b)=>{try{if("approved"===b){let b=await fetch("/api/admin/inventory-requests/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:a})}),c=await b.json();if(!b.ok)return void alert(c?.error||"Approval failed")}else await fetch("/api/admin/requests",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:a,status:b})});k()}catch(a){console.error(a),alert("Something went wrong")}};return(0,c.useEffect)(()=>{k()},[]),(0,b.jsxs)("div",{style:{minHeight:"100vh",background:"#0a0900",color:g(.85)},children:[(0,b.jsx)("style",{children:`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${d(.25)}}

        .requests-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px;
        }

        .request-card {
          background: ${h};
          border: 1px solid ${i};
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
      `}),(0,b.jsxs)("div",{className:"requests-container",children:[(0,b.jsxs)("div",{style:{marginBottom:24},children:[(0,b.jsx)("div",{style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.55rem",letterSpacing:"0.3em",color:d(.4),marginBottom:4},children:"SYS · INVENTORY"}),(0,b.jsx)("h1",{style:{fontFamily:"'IBM Plex Sans Condensed', sans-serif",fontSize:"clamp(1.4rem, 5vw, 1.8rem)",fontWeight:700,color:d(.95),margin:0},children:"Inventory Requests"})]}),0===a.length&&(0,b.jsx)("div",{style:{background:h,border:`1px solid ${i}`,padding:"40px 24px",textAlign:"center",color:d(.3),fontFamily:"'IBM Plex Mono', monospace",letterSpacing:"0.15em",fontSize:"0.7rem"},children:"NO PENDING REQUESTS"}),(0,b.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:12},children:a.map(a=>{let c="approved"===a.status?e(.8):"rejected"===a.status?f(.8):d(.8);return(0,b.jsxs)("div",{className:"request-card",children:[(0,b.jsx)("div",{className:"status-pill",style:{color:c},children:a.status.toUpperCase()}),(0,b.jsxs)("div",{style:{marginBottom:12},children:[(0,b.jsx)("div",{style:{fontFamily:"'IBM Plex Sans Condensed', sans-serif",fontSize:"1rem",fontWeight:600,color:g(.95),lineHeight:1.2},children:a.requester_name}),(0,b.jsx)("div",{style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.6rem",color:d(.4),letterSpacing:"0.12em",marginTop:2},children:a.department})]}),(0,b.jsxs)("div",{style:{fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.68rem",color:g(.7),marginBottom:12,lineHeight:1.4},children:[(0,b.jsx)("span",{style:{color:d(.4)},children:"PURPOSE // "}),a.purpose]}),(0,b.jsx)("div",{style:{background:"rgba(0,0,0,0.2)",padding:"8px 12px",border:`1px solid ${d(.05)}`},children:a.inventory_request_items.map((c,e)=>(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",borderBottom:e===a.inventory_request_items.length-1?"none":`1px solid ${d(.03)}`,padding:"5px 0",fontFamily:"'IBM Plex Mono', monospace",fontSize:"0.65rem",color:g(.8)},children:[(0,b.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingRight:8},children:c.inventory_items.name}),(0,b.jsxs)("span",{style:{color:d(.6),flexShrink:0},children:["QTY: ",c.quantity]})]},e))}),"submitted"===a.status&&(0,b.jsxs)("div",{className:"actions-flex",children:[(0,b.jsx)("button",{onClick:()=>l(a.id,"approved"),className:"btn-action",style:{background:e(.9),color:"#000"},children:"APPROVE"}),(0,b.jsx)("button",{onClick:()=>l(a.id,"rejected"),className:"btn-action",style:{background:f(.8),color:"#000"},children:"REJECT"})]})]},a.id)})})]})]})}a.s(["default",()=>j])}];

//# sourceMappingURL=app_admin_requests_page_tsx_b42a307e._.js.map