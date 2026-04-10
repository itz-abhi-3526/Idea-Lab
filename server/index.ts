import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Fix: Added .js extensions. Even in TS, ESM imports often require the 
// extension of the compiled output to resolve correctly in Node.
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import inventoryRoutes from "./routes/inventory.js";

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
app.use("/api", uploadRoutes);
app.use("/api", inventoryRoutes);

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