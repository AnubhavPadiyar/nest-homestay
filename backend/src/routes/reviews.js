const express  = require("express")
const router   = express.Router()
const Review   = require("../models/Review")
const Property = require("../models/Property")

const positiveWords = ["great","amazing","loved","excellent","fantastic","beautiful","perfect","wonderful","stunning","incredible","awesome"]
const negativeWords = ["bad","poor","terrible","awful","disappointing","dirty","cold","slow","noisy","worst","horrible"]

// GET /api/reviews?propertyId=
router.get("/", async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.propertyId) filter.propertyId = req.query.propertyId
    const reviews = await Review.find(filter).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: reviews.length, data: reviews })
  } catch (err) { next(err) }
})

// POST /api/reviews
router.post("/", async (req, res, next) => {
  try {
    const { propertyId, guestName, rating, text } = req.body
    const missing = ["propertyId","guestName","rating","text"].filter(f => !req.body[f])
    if (missing.length) {
      const err = new Error(`Missing required fields: ${missing.join(", ")}`)
      err.status = 400; return next(err)
    }
    if (rating < 1 || rating > 5) {
      const err = new Error("Rating must be between 1 and 5")
      err.status = 400; return next(err)
    }
    const property = await Property.findById(propertyId)
    if (!property) {
      const err = new Error(`Property '${propertyId}' not found`)
      err.status = 404; return next(err)
    }

    const lower = text.toLowerCase()
    const sentiment = positiveWords.some(w => lower.includes(w)) ? "positive"
      : negativeWords.some(w => lower.includes(w)) ? "negative" : "neutral"

    const review = await Review.create({ propertyId, guestName, rating: Number(rating), text, sentiment, theme: "experience" })

    // Update property rating
    const allReviews = await Review.find({ propertyId })
    property.rating = +(allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    property.reviewCount = allReviews.length
    await property.save()

    res.status(201).json({ success: true, message: "Review submitted successfully", data: review })
  } catch (err) {
    if (err.name === "CastError") { err.status = 404; err.message = "Invalid property ID" }
    next(err)
  }
})

module.exports = router
