"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const AMBER    = (a = 1) => `rgba(255,176,0,${a})`
const DIMWHITE = (a = 1) => `rgba(220,215,200,${a})`
const BG       = "#0a0900"

interface Props { open: boolean; onClose: () => void }

export default function LoginRequiredModal({ open, onClose }: Props) {
  const router = useRouter()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1,    opacity: 1, y: 0 }}
            exit={{    scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%", maxWidth: 400,
              background: BG,
              border: `1px solid ${AMBER(0.2)}`,
              boxShadow: `0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px ${AMBER(0.05)}`,
              position: "relative", overflow: "hidden",
            }}
          >
            {/* shimmer bar */}
            <div style={{ height: 1, overflow: "hidden", background: AMBER(0.1), position: "relative" }}>
              <motion.div
                style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: `linear-gradient(to right, transparent, ${AMBER(0.65)}, transparent)` }}
                animate={{ left: ["-40%", "140%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
            </div>

            {/* HUD corners */}
            <div style={{ position: "absolute", top: 8, left: 8,   width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderLeft:  `1px solid ${AMBER(0.4)}`  }} />
            <div style={{ position: "absolute", top: 8, right: 8,  width: 10, height: 10, borderTop: `1px solid ${AMBER(0.4)}`, borderRight: `1px solid ${AMBER(0.4)}`  }} />
            <div style={{ position: "absolute", bottom: 8, left: 8,  width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderLeft:  `1px solid ${AMBER(0.18)}` }} />
            <div style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderBottom: `1px solid ${AMBER(0.18)}`, borderRight: `1px solid ${AMBER(0.18)}` }} />

            <div style={{ padding: "22px 22px 20px" }}>
              {/* eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <motion.div
                  style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER(0.85), boxShadow: `0 0 5px ${AMBER(0.6)}`, flexShrink: 0 }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.28em", color: AMBER(0.45) }}>
                  AUTH · REQUIRED
                </span>
              </div>

              {/* title */}
              <h2 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: AMBER(0.9), lineHeight: 1, margin: "0 0 8px" }}>
                Login Required
              </h2>

              {/* body */}
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: DIMWHITE(0.4), lineHeight: 1.65, margin: "0 0 20px" }}>
                You must be logged in to request inventory items from IDEA Lab.
              </p>

              {/* divider */}
              <div style={{ height: 1, background: `linear-gradient(to right, ${AMBER(0.12)}, transparent)`, marginBottom: 16 }} />

              {/* actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <CancelBtn onClick={onClose} />
                <LoginBtn  onClick={() => router.push("/login")} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CancelBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = React.useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em",
        padding: "8px 16px", background: "transparent",
        border: `1px solid ${hov ? "rgba(255,176,0,0.3)" : "rgba(255,176,0,0.14)"}`,
        color: hov ? "rgba(255,176,0,0.65)" : "rgba(255,176,0,0.35)",
        cursor: "pointer", transition: "border-color 0.18s, color 0.18s",
      }}
    >CANCEL</button>
  )
}

function LoginBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = React.useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em",
        padding: "8px 20px",
        background: "rgba(255,176,0,0.9)", border: "none",
        color: "#0a0900", fontWeight: 600, cursor: "pointer",
        boxShadow: hov ? "0 0 22px rgba(255,176,0,0.4)" : "0 0 12px rgba(255,176,0,0.2)",
        transition: "box-shadow 0.18s",
      }}
    >
      {hov && (
        <span style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)", pointerEvents: "none" }} />
      )}
      <span style={{ position: "relative", zIndex: 1 }}>LOGIN →</span>
    </button>
  )
}

import React from "react"