"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface Props {
  open: boolean
  onClose: () => void
}

export default function LoginRequiredModal({ open, onClose }: Props) {
  const router = useRouter()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-white">
              Login required
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              You must be logged in to request inventory items from IDEA Lab.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={() => router.push("/login")}
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-black hover:bg-orange-400"
              >
                Login
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
