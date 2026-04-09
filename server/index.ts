import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ CORS (VERY IMPORTANT for Vercel → Render)
app.use(
  cors({
    origin: "*", // later you can restrict to your Vercel URL
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api", authRoutes);

// ✅ Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ✅ Root route (optional)
app.get("/", (_req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Render PORT (DO NOT CHANGE)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});