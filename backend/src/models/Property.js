const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema(
  {
    name:           { type: String, required: true, trim: true },
    location:       { type: String, required: true },
    altitude:       { type: Number },
    pricePerNight:  { type: Number, required: true, min: 0 },
    rooms:          { type: Number, default: 1 },
    amenities:      [{ type: String }],
    description:    { type: String },
    host:           { type: String, required: true },
    rating:         { type: Number, default: 0, min: 0, max: 5 },
    reviewCount:    { type: Number, default: 0 },
    available:      { type: Boolean, default: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Property", PropertySchema)
