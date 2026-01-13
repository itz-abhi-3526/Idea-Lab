"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.replace("/")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-black" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="
          relative
          w-full
          max-w-sm sm:max-w-md
          rounded-2xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6 sm:p-8
          shadow-2xl
        "
      >
        {/* Heading */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Welcome back!
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          <div>
            <label className="text-xs sm:text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@fisat.ac.in"
              className="
                mt-1
                w-full
                rounded-lg
                bg-black/40
                border border-white/10
                px-3 py-2
                text-sm
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                mt-1
                w-full
                rounded-lg
                bg-black/40
                border border-white/10
                px-3 py-2
                text-sm
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-orange-500
              px-4 py-2.5
              text-sm font-medium
              text-black
              hover:bg-orange-400
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-orange-400 hover:underline"
          >
            Create one
          </a>
        </p>
      </motion.div>
    </div>
  )
}
