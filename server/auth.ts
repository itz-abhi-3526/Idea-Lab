import express from "express"
import { supabaseAdmin } from "../../lib/supabase-admin"

const router = express.Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(401).json({ error: error.message })
  }

  return res.json({ user: data.user })
})

export default router