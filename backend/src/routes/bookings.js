const express = require("express")
const router = express.Router()
const { bookings, properties, nextBookingId } = require("../data/store")

/**
 * GET /api/bookings
 * Returns all bookings
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  })
})

/**
 * GET /api/bookings/:id
 * Returns a single booking by ID
 */
router.get("/:id", (req, res, next) => {
  const booking = bookings.find((b) => b.id === req.params.id)

  if (!booking) {
    const err = new Error(`Booking '${req.params.id}' not found`)
    err.status = 404
    return next(err)
  }

  res.status(200).json({ success: true, data: booking })
})

/**
 * POST /api/bookings
 * Create a new booking inquiry
 * Body: { propertyId, guestName, guestEmail, checkIn, checkOut, guests, roomPreference }
 */
router.post("/", (req, res, next) => {
  const { propertyId, guestName, guestEmail, checkIn, checkOut, guests, roomPreference } = req.body

  // Validation
  const missing = ["propertyId", "guestName", "guestEmail", "checkIn", "checkOut", "guests"].filter(
    (f) => !req.body[f]
  )
  if (missing.length) {
    const err = new Error(`Missing required fields: ${missing.join(", ")}`)
    err.status = 400
    return next(err)
  }

  // Check property exists
  const property = properties.find((p) => p.id === propertyId)
  if (!property) {
    const err = new Error(`Property '${propertyId}' not found`)
    err.status = 404
    return next(err)
  }

  const newBooking = {
    id: nextBookingId(),
    propertyId,
    guestName,
    guestEmail,
    checkIn,
    checkOut,
    guests: Number(guests),
    roomPreference: roomPreference || "any",
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  bookings.push(newBooking)

  res.status(201).json({
    success: true,
    message: "Booking inquiry created successfully",
    data: newBooking,
  })
})

/**
 * PATCH /api/bookings/:id
 * Update booking status — confirmed | pending | cancelled
 */
router.patch("/:id", (req, res, next) => {
  const idx = bookings.findIndex((b) => b.id === req.params.id)

  if (idx === -1) {
    const err = new Error(`Booking '${req.params.id}' not found`)
    err.status = 404
    return next(err)
  }

  const { status } = req.body
  const validStatuses = ["pending", "confirmed", "cancelled"]

  if (!status || !validStatuses.includes(status)) {
    const err = new Error(`Status must be one of: ${validStatuses.join(", ")}`)
    err.status = 400
    return next(err)
  }

  bookings[idx] = { ...bookings[idx], status }

  res.status(200).json({
    success: true,
    message: `Booking status updated to '${status}'`,
    data: bookings[idx],
  })
})

/**
 * DELETE /api/bookings/:id
 * Delete a booking
 */
router.delete("/:id", (req, res, next) => {
  const idx = bookings.findIndex((b) => b.id === req.params.id)

  if (idx === -1) {
    const err = new Error(`Booking '${req.params.id}' not found`)
    err.status = 404
    return next(err)
  }

  bookings.splice(idx, 1)

  res.status(204).send()
})

module.exports = router
