const express = require("express")
const router = express.Router()
const { reviews, properties, nextReviewId } = require("../data/store")

/**
 * GET /api/reviews?propertyId=<id>
 * Returns reviews — optionally filtered by propertyId
 */
router.get("/", (req, res) => {
  let result = [...reviews]

  if (req.query.propertyId) {
    result = result.filter((r) => r.propertyId === req.query.propertyId)
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  })
})

/**
 * POST /api/reviews
 * Submit a new guest review
 * Body: { propertyId, guestName, rating, text }
 */
router.post("/", (req, res, next) => {
  const { propertyId, guestName, rating, text } = req.body

  const missing = ["propertyId", "guestName", "rating", "text"].filter((f) => !req.body[f])
  if (missing.length) {
    const err = new Error(`Missing required fields: ${missing.join(", ")}`)
    err.status = 400
    return next(err)
  }

  if (rating < 1 || rating > 5) {
    const err = new Error("Rating must be between 1 and 5")
    err.status = 400
    return next(err)
  }

  const property = properties.find((p) => p.id === propertyId)
  if (!property) {
    const err = new Error(`Property '${propertyId}' not found`)
    err.status = 404
    return next(err)
  }

  // Simple sentiment classification
  const positiveWords = ["great", "amazing", "loved", "excellent", "fantastic", "beautiful", "perfect", "wonderful", "stunning"]
  const negativeWords = ["bad", "poor", "terrible", "awful", "disappointing", "dirty", "cold", "slow", "noisy"]
  const lowerText = text.toLowerCase()
  const sentiment = positiveWords.some((w) => lowerText.includes(w))
    ? "positive"
    : negativeWords.some((w) => lowerText.includes(w))
    ? "negative"
    : "neutral"

  const newReview = {
    id: nextReviewId(),
    propertyId,
    guestName,
    rating: Number(rating),
    text,
    sentiment,
    theme: "experience",
    createdAt: new Date().toISOString(),
  }

  reviews.push(newReview)

  // Update property rating average
  const propReviews = reviews.filter((r) => r.propertyId === propertyId)
  property.rating = +(propReviews.reduce((s, r) => s + r.rating, 0) / propReviews.length).toFixed(1)
  property.reviewCount = propReviews.length

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: newReview,
  })
})

module.exports = router
