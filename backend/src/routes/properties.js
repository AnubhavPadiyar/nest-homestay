const express = require("express")
const router = express.Router()
const { properties } = require("../data/store")

/**
 * GET /api/properties
 * Returns all properties. Optionally filter by ?available=true
 */
router.get("/", (req, res) => {
  let result = [...properties]

  const { available } = req.query
  if (available !== undefined) {
    result = result.filter((p) => p.available === (available === "true"))
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  })
})

/**
 * GET /api/properties/search?q=<query>
 * Search properties by name, location, or host name
 */
router.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim()

  if (!q) {
    return res.status(400).json({
      success: false,
      error: { status: 400, message: "Query parameter 'q' is required" },
    })
  }

  const results = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.host.toLowerCase().includes(q) ||
      p.amenities.some((a) => a.toLowerCase().includes(q))
  )

  res.status(200).json({
    success: true,
    count: results.length,
    query: q,
    data: results,
  })
})

/**
 * GET /api/properties/:id
 * Returns a single property by ID
 */
router.get("/:id", (req, res, next) => {
  const property = properties.find((p) => p.id === req.params.id)

  if (!property) {
    const err = new Error(`Property with id '${req.params.id}' not found`)
    err.status = 404
    return next(err)
  }

  res.status(200).json({ success: true, data: property })
})

module.exports = router
