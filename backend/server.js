require("dotenv").config()
const express    = require("express")
const cors       = require("cors")
const mongoose   = require("mongoose")
const { notFound, errorHandler } = require("./src/middleware/errorHandler")
const propertiesRouter = require("./src/routes/properties")
const bookingsRouter   = require("./src/routes/bookings")
const reviewsRouter    = require("./src/routes/reviews")

const app  = express()
const PORT = process.env.PORT || 5000

// ── MongoDB connection ──────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => { console.error("❌ MongoDB connection failed:", err.message); process.exit(1) })

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Health check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nest API is running",
    version: "2.0.0",
    database: mongoose.connection.readyState === 1 ? "MongoDB Atlas connected" : "disconnected",
    endpoints: { properties: "/api/properties", bookings: "/api/bookings", reviews: "/api/reviews" },
  })
})

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/properties", propertiesRouter)
app.use("/api/bookings",   bookingsRouter)
app.use("/api/reviews",    reviewsRouter)

// ── Error handling ──────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Nest API running on http://localhost:${PORT}`)
})

module.exports = app
