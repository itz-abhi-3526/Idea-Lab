
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronUp } from "lucide-react"



export default function NavigationControls() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  const isHomePage = pathname === "/"
  const isAdmin = pathname.startsWith("/admin")
  const isDashboard = pathname.startsWith("/dashboard")
  const isIncubation = pathname.startsWith("/incubation")
  
  // Dynamic Theming based on section
  const isOrangeTheme = isHomePage || isAdmin || isDashboard || isIncubation
  const accentColor = isOrangeTheme ? "#f97316" : "#00D282"
  const glowColor = isOrangeTheme ? "rgba(249, 115, 22, 0.15)" : "rgba(0, 210, 130, 0.15)"

  useEffect(() => {
    if (!isHomePage) return
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    // Specific logic for incubation request
    if (pathname === "/incubation/request") {
      navigate("/")
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <style>
        {`
          :root {
            --nav-accent: ${accentColor};
            --nav-glow: ${glowColor};
          }
        `}
        {CSS}
      </style>
      
      {/* BACK BUTTON - Visible on inner pages */}
      <AnimatePresence>
        {!isHomePage && (
          <motion.button
            className={`back-btn ${isAdmin ? 'back-btn-admin' : ''} ${isDashboard ? 'back-btn-dash' : ''}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={handleBack}
            aria-label="Go Back"
          >
            <div className="back-btn-inner">
              <div className="back-btn-corners" />
              <ArrowLeft size={14} className="back-btn-ico" />
              <span className="back-btn-text">BACK</span>
            </div>
            <div className="back-btn-glow" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* BACK TO TOP - Visible on home page when scrolled down */}
      <AnimatePresence>
        {isHomePage && showScrollTop && (
          <motion.button
            className="top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <div className="top-btn-hex">
              <ChevronUp size={20} />
            </div>
            <span className="top-btn-label">TOP</span>
            <div className="top-btn-glow" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

const CSS = `
  /* --- NEXUS PROTOCOL NAVIGATION CONTROLS --- */
  
  .back-btn {
    position: fixed;
    top: 1.25rem;
    left: 1.5rem;
    z-index: 20000;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s ease;
  }

  /* Adjust for Admin Sidebar on Desktop */
  @media (min-width: 1024px) {
    .back-btn-admin {
      left: calc(16rem + 2rem); 
      top: 2rem;
    }
  }

  .back-btn-dash {
    top: 1.5rem;
    left: 2rem;
  }

  .back-btn:hover {
    transform: scale(1.02) translateX(3px);
  }

  .back-btn:active {
    transform: scale(0.96);
  }

  .back-btn-inner {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid var(--nav-accent);
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    opacity: 0.9;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .back-btn-inner:hover {
    opacity: 1;
    border-color: var(--nav-accent);
    box-shadow: 0 0 15px var(--nav-glow);
  }

  .back-btn-corners::before,
  .back-btn-corners::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-color: var(--nav-accent);
    border-style: solid;
    pointer-events: none;
    opacity: 0.8;
  }

  .back-btn-corners::before {
    top: -1px;
    left: -1px;
    border-width: 1.5px 0 0 1.5px;
  }

  .back-btn-corners::after {
    bottom: -1px;
    right: -1px;
    border-width: 0 1.5px 1.5px 0;
  }

  .back-btn-ico {
    color: var(--nav-accent);
    filter: drop-shadow(0 0 4px var(--nav-glow));
  }

  .back-btn-text {
    font-family: 'Share Tech Mono', 'Geist Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #ffffff;
    text-transform: uppercase;
  }

  .back-btn-glow {
    position: absolute;
    inset: -6px;
    background: radial-gradient(circle, var(--nav-glow), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: -1;
  }

  .back-btn:hover .back-btn-glow {
    opacity: 1;
  }

  /* --- SCROLL TO TOP --- */

  .top-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .top-btn:hover {
    transform: translateY(-6px);
  }

  .top-btn-hex {
    position: relative;
    width: 42px;
    height: 48px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(16px);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    border: 1px solid rgba(249, 115, 22, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f97316;
  }

  .top-btn:hover .top-btn-hex {
    background: rgba(249, 115, 22, 0.1);
    border-color: #f97316;
    box-shadow: 0 0 15px rgba(249, 115, 22, 0.2);
  }

  .top-btn-label {
    font-family: 'Share Tech Mono', 'Geist Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.25em;
    color: #f97316;
    opacity: 0.6;
  }

  .top-btn:hover .top-btn-label {
    opacity: 1;
  }

  .top-btn-glow {
    position: absolute;
    inset: -15px;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.08), transparent 70%);
    opacity: 0.5;
    animation: top-pulse 2.5s infinite;
    pointer-events: none;
    z-index: -1;
  }

  @keyframes top-pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.15); opacity: 0.5; }
  }

  @media (max-width: 1024px) {
    .back-btn-admin {
      top: 0.75rem; /* Further up to align with text center maybe? */
      left: 0.75rem;
      z-index: 100001; /* Extremely high to stay in nav bar */
    }
  }

  @media (max-width: 768px) {
    .back-btn { 
      top: 1rem; 
      left: 1rem; 
      scale: 0.85; 
    }
    
    /* On mobile admin, move it down slightly or make it floating more clearly */
    .back-btn-admin {
      top: 4.5rem; /* Move below the top bar on mobile as it's too cramped inside */
      left: 1.25rem;
    }

    .top-btn { bottom: 1.5rem; right: 1.5rem; scale: 0.9; }
    .back-btn-text { display: none; }
    .back-btn-inner { 
      padding: 10px; 
      border-radius: 8px; /* Square with rounded corners looks more techy than perfect circle */
      background: rgba(0,0,0,0.9);
      border-width: 2px;
    } 
    .back-btn-corners { display: none; }
  }
`
