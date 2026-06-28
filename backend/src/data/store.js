// In-memory data store — replaced by MongoDB in Week 5

const properties = [
  {
    id: "prop_001",
    name: "Riverside Pine Cottage",
    location: "Chopta, Uttarakhand",
    altitude: 2608,
    pricePerNight: 1800,
    rooms: 2,
    amenities: ["breakfast", "wifi", "guide", "bukhari"],
    description:
      "A two-room stone cottage above the Madhyamaheshwar stream, run by the Negi family for three generations.",
    host: "Ramesh Negi",
    rating: 4.7,
    reviewCount: 38,
    available: true,
    coordinates: { lat: 30.45, lng: 79.2 },
  },
  {
    id: "prop_002",
    name: "Maa Mandakini Homestay",
    location: "Sari Village, Uttarakhand",
    altitude: 1920,
    pricePerNight: 1200,
    rooms: 3,
    amenities: ["breakfast", "lunch", "dinner", "parking"],
    description:
      "Home-cooked Garhwali meals, a sunny courtyard, and a short walk to the start of the Deoria Tal trail.",
    host: "Sunita Rawat",
    rating: 4.5,
    reviewCount: 54,
    available: true,
    coordinates: { lat: 30.438, lng: 79.185 },
  },
  {
    id: "prop_003",
    name: "Tungnath View Retreat",
    location: "Tungnath Ridge, Uttarakhand",
    altitude: 2680,
    pricePerNight: 2200,
    rooms: 3,
    amenities: ["breakfast", "guide", "bukhari", "wifi"],
    description:
      "Wake up to the Chandrashila ridgeline. Three rooms, a wood-fired bukhari, and a resident guide on call.",
    host: "Gopal Bisht",
    rating: 4.9,
    reviewCount: 21,
    available: false,
    coordinates: { lat: 30.49, lng: 79.22 },
  },
]

const bookings = [
  {
    id: "book_001",
    propertyId: "prop_001",
    guestName: "Priya Sharma",
    guestEmail: "priya@example.com",
    checkIn: "2026-07-10",
    checkOut: "2026-07-13",
    guests: 2,
    roomPreference: "double",
    status: "confirmed",
    createdAt: "2026-06-20T10:30:00Z",
  },
  {
    id: "book_002",
    propertyId: "prop_002",
    guestName: "Arjun Mehta",
    guestEmail: "arjun@example.com",
    checkIn: "2026-07-15",
    checkOut: "2026-07-18",
    guests: 4,
    roomPreference: "family",
    status: "pending",
    createdAt: "2026-06-21T14:00:00Z",
  },
]

const reviews = [
  {
    id: "rev_001",
    propertyId: "prop_001",
    guestName: "Priya Sharma",
    rating: 5,
    text: "Absolutely stunning views and the host was incredibly welcoming. The bukhari kept us warm all night.",
    sentiment: "positive",
    theme: "experience",
    createdAt: "2026-05-10T09:00:00Z",
  },
  {
    id: "rev_002",
    propertyId: "prop_001",
    guestName: "Rahul Verma",
    rating: 4,
    text: "Great location, food was delicious. Wifi was a bit slow but that's expected at this altitude.",
    sentiment: "positive",
    theme: "food",
    createdAt: "2026-05-18T12:00:00Z",
  },
  {
    id: "rev_003",
    propertyId: "prop_002",
    guestName: "Sneha Iyer",
    rating: 3,
    text: "The room was clean but smaller than expected. Host was very helpful though.",
    sentiment: "neutral",
    theme: "cleanliness",
    createdAt: "2026-06-01T08:30:00Z",
  },
]

// ID counter helpers
let bookingCount = bookings.length
let reviewCount = reviews.length

module.exports = {
  properties,
  bookings,
  reviews,
  nextBookingId: () => `book_${String(++bookingCount).padStart(3, "0")}`,
  nextReviewId: () => `rev_${String(++reviewCount).padStart(3, "0")}`,
}
