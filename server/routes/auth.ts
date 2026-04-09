import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabase-admin"; // ✅ FIXED PATH

const router = Router();

router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    return res.json({ user: data.user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;