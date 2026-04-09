require("dotenv").config({ path: ".env.local" })
const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const authRoutes = require("./routes/auth")

const app = express()
const basePort = process.env.PORT ? Number(process.env.PORT) : 4000
const maxPortAttempts = 10

app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), "dist")))

// API routes
app.use("/api", authRoutes)

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"))
})

function startServer(port, attempt = 1) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && attempt < maxPortAttempts) {
      const nextPort = port + 1
      console.warn(`Port ${port} is in use. Trying ${nextPort}...`)
      startServer(nextPort, attempt + 1)
    } else {
      console.error(error)
      process.exit(1)
    }
  })
}

startServer(basePort)
