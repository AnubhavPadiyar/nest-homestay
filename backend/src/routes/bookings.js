const express  = require("express")
const router   = express.Router()
const Booking  = require("../models/Booking")
const Property = require("../models/Property")

// GET /api/bookings
router.get("/", async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("propertyId", "name location pricePerNight").sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: bookings.length, data: bookings })
  } catch (err) { next(err) }
})

// GET /api/bookings/:id
router.get("/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("propertyId", "name location")
    if (!booking) {
      const err = new Error(`Booking '${req.params.id}' not found`)
      err.status = 404; return next(err)
    }
    res.status(200).json({ success: true, data: booking })
  } catch (err) {
    if (err.name === "CastError") { err.status = 404; err.message = "Invalid booking ID" }
    next(err)
  }
})

// POST /api/bookings
router.post("/", async (req, res, next) => {
  try {
    const { propertyId, guestName, guestEmail, checkIn, checkOut, guests, roomPreference } = req.body
    const missing = ["propertyId","guestName","guestEmail","checkIn","checkOut","guests"].filter(f => !req.body[f])
    if (missing.length) {
      const err = new Error(`Missing required fields: ${missing.join(", ")}`)
      err.status = 400; return next(err)
    }
    const property = await Property.findById(propertyId)
    if (!property) {
      const err = new Error(`Property '${propertyId}' not found`)
      err.status = 404; return next(err)
    }
    const booking = await Booking.create({ propertyId, guestName, guestEmail, checkIn, checkOut, guests: Number(guests), roomPreference: roomPreference || "any" })
    res.status(201).json({ success: true, message: "Booking inquiry created successfully", data: booking })
  } catch (err) { next(err) }
})

// PATCH /api/bookings/:id
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body
    const valid = ["pending", "confirmed", "cancelled"]
    if (!status || !valid.includes(status)) {
      const err = new Error(`Status must be one of: ${valid.join(", ")}`)
      err.status = 400; return next(err)
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!booking) {
      const err = new Error(`Booking '${req.params.id}' not found`)
      err.status = 404; return next(err)
    }
    res.status(200).json({ success: true, message: `Booking status updated to '${status}'`, data: booking })
  } catch (err) {
    if (err.name === "CastError") { err.status = 404; err.message = "Invalid booking ID" }
    next(err)
  }
})

// DELETE /api/bookings/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) {
      const err = new Error(`Booking '${req.params.id}' not found`)
      err.status = 404; return next(err)
    }
    res.status(204).send()
  } catch (err) {
    if (err.name === "CastError") { err.status = 404; err.message = "Invalid booking ID" }
    next(err)
  }
})

module.exports = router
