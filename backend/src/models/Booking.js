const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema(
  {
    propertyId:     { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    guestName:      { type: String, required: true, trim: true },
    guestEmail:     { type: String, required: true, trim: true, lowercase: true },
    checkIn:        { type: String, required: true },
    checkOut:       { type: String, required: true },
    guests:         { type: Number, required: true, min: 1 },
    roomPreference: { type: String, default: "any" },
    status:         { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Booking", BookingSchema)
