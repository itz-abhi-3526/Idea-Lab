import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";

// ✅ Load env FIRST
dotenv.config();

// ✅ Create app
const app = express();

// ✅ CORS (IMPORTANT for Vercel → Render)
app.use(
  cors({
    origin: "*", // later restrict to your Vercel URL
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes); // ✅ moved here

// ✅ Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ✅ Root route
app.get("/", (_req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Render PORT
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});