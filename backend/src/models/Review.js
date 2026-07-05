const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    guestName:  { type: String, required: true, trim: true },
    rating:     { type: Number, required: true, min: 1, max: 5 },
    text:       { type: String, required: true },
    sentiment:  { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
    theme:      { type: String, default: "experience" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Review", ReviewSchema)
