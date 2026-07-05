require("dotenv").config({ path: require("path").join(__dirname, "../../.env") })
const mongoose = require("mongoose")
const Property = require("../models/Property")
const Booking  = require("../models/Booking")
const Review   = require("../models/Review")

const properties = [
  {
    name: "Riverside Pine Cottage",
    location: "Chopta, Uttarakhand",
    altitude: 2608,
    pricePerNight: 1800,
    rooms: 2,
    amenities: ["breakfast", "wifi", "guide", "bukhari"],
    description: "A two-room stone cottage above the Madhyamaheshwar stream, run by the Negi family for three generations.",
    host: "Ramesh Negi",
    rating: 4.7,
    reviewCount: 2,
    available: true,
    coordinates: { lat: 30.45, lng: 79.2 },
  },
  {
    name: "Maa Mandakini Homestay",
    location: "Sari Village, Uttarakhand",
    altitude: 1920,
    pricePerNight: 1200,
    rooms: 3,
    amenities: ["breakfast", "lunch", "dinner", "parking"],
    description: "Home-cooked Garhwali meals, a sunny courtyard, and a short walk to the Deoria Tal trail.",
    host: "Sunita Rawat",
    rating: 4.5,
    reviewCount: 1,
    available: true,
    coordinates: { lat: 30.438, lng: 79.185 },
  },
  {
    name: "Tungnath View Retreat",
    location: "Tungnath Ridge, Uttarakhand",
    altitude: 2680,
    pricePerNight: 2200,
    rooms: 3,
    amenities: ["breakfast", "guide", "bukhari", "wifi"],
    description: "Wake up to the Chandrashila ridgeline. Three rooms, a wood-fired bukhari, and a resident guide on call.",
    host: "Gopal Bisht",
    rating: 4.9,
    reviewCount: 0,
    available: false,
    coordinates: { lat: 30.49, lng: 79.22 },
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ Connected to MongoDB Atlas")

    // Clear existing data
    await Property.deleteMany({})
    await Booking.deleteMany({})
    await Review.deleteMany({})
    console.log("🗑  Cleared existing data")

    // Insert properties
    const insertedProps = await Property.insertMany(properties)
    console.log(`🏠 Inserted ${insertedProps.length} properties`)

    // Insert bookings using real ObjectIds
    const bookings = [
      {
        propertyId: insertedProps[0]._id,
        guestName: "Priya Sharma",
        guestEmail: "priya@example.com",
        checkIn: "2026-07-10",
        checkOut: "2026-07-13",
        guests: 2,
        roomPreference: "double",
        status: "confirmed",
      },
      {
        propertyId: insertedProps[1]._id,
        guestName: "Arjun Mehta",
        guestEmail: "arjun@example.com",
        checkIn: "2026-07-15",
        checkOut: "2026-07-18",
        guests: 4,
        roomPreference: "family",
        status: "pending",
      },
    ]
    await Booking.insertMany(bookings)
    console.log(`📅 Inserted ${bookings.length} bookings`)

    // Insert reviews
    const reviews = [
      {
        propertyId: insertedProps[0]._id,
        guestName: "Priya Sharma",
        rating: 5,
        text: "Absolutely stunning views and the host was incredibly welcoming.",
        sentiment: "positive",
        theme: "experience",
      },
      {
        propertyId: insertedProps[0]._id,
        guestName: "Rahul Verma",
        rating: 4,
        text: "Great location, food was delicious. Wifi was a bit slow but expected at altitude.",
        sentiment: "positive",
        theme: "food",
      },
      {
        propertyId: insertedProps[1]._id,
        guestName: "Sneha Iyer",
        rating: 3,
        text: "Room was clean but smaller than expected. Host was very helpful.",
        sentiment: "neutral",
        theme: "cleanliness",
      },
    ]
    await Review.insertMany(reviews)
    console.log(`⭐ Inserted ${reviews.length} reviews`)

    console.log("✅ Seed complete!")
    process.exit(0)
  } catch (err) {
    console.error("❌ Seed failed:", err.message)
    process.exit(1)
  }
}

seed()
