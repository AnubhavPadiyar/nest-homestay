const express  = require("express")
const router   = express.Router()
const Property = require("../models/Property")

// GET /api/properties?available=true
router.get("/", async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.available !== undefined)
      filter.available = req.query.available === "true"

    const properties = await Property.find(filter).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: properties.length, data: properties })
  } catch (err) { next(err) }
})

// GET /api/properties/search?q=
router.get("/search", async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim()
    if (!q) {
      const err = new Error("Query parameter 'q' is required")
      err.status = 400; return next(err)
    }
    const regex = new RegExp(q, "i")
    const results = await Property.find({
      $or: [{ name: regex }, { location: regex }, { host: regex }, { amenities: regex }],
    })
    res.status(200).json({ success: true, count: results.length, query: q, data: results })
  } catch (err) { next(err) }
})

// GET /api/properties/:id
router.get("/:id", async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) {
      const err = new Error(`Property '${req.params.id}' not found`)
      err.status = 404; return next(err)
    }
    res.status(200).json({ success: true, data: property })
  } catch (err) {
    if (err.name === "CastError") { err.status = 404; err.message = "Invalid property ID" }
    next(err)
  }
})

module.exports = router
