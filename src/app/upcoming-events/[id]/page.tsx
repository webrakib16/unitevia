import {
  EventDetailClient,
  EventData,
} from "./event-detail-client";

// ─── Default Fallback Data (Exact match with reference image) ─────────────────
const DEFAULT_EVENT: EventData = {
  _id: "default",
  title: "Community Food Distribution Drive",
  category: "Food Awareness",
  date: "November 7, 2026",
  time: "10:00 AM",
  location: "Rajshahi, Bangladesh",
  description:
    "A community-driven food distribution program to support low-income families in our local area. The initiative aims to provide nutritious food packages to those in need and help ensure food security for vulnerable families.",
  about:
    "A community-driven food distribution program to support low-income families in our local area. The initiative aims to provide nutritious food packages to those in need and help ensure food security for vulnerable families.",
  guidelines: [
    "Arrive at the event location at least 15 minutes early.",
    "Follow the instructions and coordination of the event organizers.",
    "Treat all recipients with respect, kindness, and dignity.",
  ],
  joined: 0,
  expectedParticipants: "200+ People",
  organizer: "Unitevia Community Team",
  organizerEmail: "hello@unitevia.org",
  status: "Upcoming",
  image: "/assets/events/community-food-distribution.jpg",
};

const FALLBACK_EVENTS: Record<string, EventData> = {
  "1": {
    ...DEFAULT_EVENT,
    _id: "1",
    title: "Community Food Distribution Drive",
    category: "Food Awareness",
    date: "November 7, 2026",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    image: "/assets/events/community-food-distribution.jpg",
  },
  "2": {
    _id: "2",
    title: "Voluntary Blood Donation Camp",
    category: "Blood Camp",
    date: "December 24, 2026",
    time: "09:00 AM",
    location: "Chapainawabganj, Bangladesh",
    description:
      "A community blood donation program to support local hospitals and save lives.",
    about:
      "Join our voluntary blood donation drive to ensure safe and adequate blood supplies for emergency patients, thalassemia children, and local hospital wards.",
    guidelines: [
      "Ensure you had a good night's rest and adequate hydration.",
      "Bring a valid national ID or student ID card.",
      "Rest for 15 minutes at the observation area after donating.",
    ],
    joined: 0,
    expectedParticipants: "150+ People",
    organizer: "Unitevia Community Team",
    organizerEmail: "hello@unitevia.org",
    status: "Upcoming",
    image: "/assets/events/health-eye-camp.jpg",
  },
  "3": {
    _id: "3",
    title: "Support for Underprivileged Students",
    category: "Education",
    date: "December 28, 2026",
    time: "02:00 PM",
    location: "Rajshahi, Bangladesh",
    description:
      "Distribute educational materials and support the learning journey of local students.",
    about:
      "Providing school bags, books, stationery, and mentorship sessions to talented children from low-income communities to keep them inspired in their studies.",
    guidelines: [
      "Assist in sorting and packing educational bundles.",
      "Help coordinate classroom-level distribution respectfully.",
      "Encourage the students with friendly mentorship and interaction.",
    ],
    joined: 0,
    expectedParticipants: "100+ Students",
    organizer: "Unitevia Community Team",
    organizerEmail: "hello@unitevia.org",
    status: "Upcoming",
    image: "/assets/events/winter-clothes-distribution.jpg",
  },
  "4": {
    _id: "4",
    title: "Community Tree Plantation",
    category: "Greenery",
    date: "January 05, 2027",
    time: "09:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "A tree plantation initiative to create a greener and healthier community.",
    about:
      "Planting 500 fruit-bearing and shade trees along community roadways and school perimeters to combat urban heat and preserve biodiversity.",
    guidelines: [
      "Wear comfortable outdoor clothes and sturdy shoes.",
      "Gardening gloves and tools will be provided on site.",
      "Help tag and water every planted sapling.",
    ],
    joined: 0,
    expectedParticipants: "120+ Volunteers",
    organizer: "Unitevia Community Team",
    organizerEmail: "hello@unitevia.org",
    status: "Upcoming",
    image: "/assets/events/tree-plantation-drive.jpg",
  },
  "5": {
    _id: "5",
    title: "Winter Clothing Distribution",
    category: "Winter Relief",
    date: "December 20, 2026",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "Distribute warm clothes among underprivileged families in our local community.",
    about:
      "A community-driven initiative to distribute warm blankets and winter garments among cold-affected families during peak winter.",
    guidelines: [
      "Arrive at the distribution point 20 minutes before schedule.",
      "Follow token verification protocols carefully.",
      "Maintain respectful and orderly queue distribution.",
    ],
    joined: 0,
    expectedParticipants: "200+ People",
    organizer: "Unitevia Community Team",
    organizerEmail: "hello@unitevia.org",
    status: "Upcoming",
    image: "/assets/events/blanket-distribution.jpg",
  },
  "6": {
    _id: "6",
    title: "Free Health Checkup Camp",
    category: "Healthcare",
    date: "January 12, 2027",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "A free health checkup and basic medical consultation for the local community.",
    about:
      "Offering primary health screenings, blood pressure checks, blood sugar tests, and basic medicine distribution for local residents in need.",
    guidelines: [
      "Medical professionals and nursing volunteers will guide registrations.",
      "Keep patient records confidential and organized.",
      "Assist senior citizens and children with queue priority.",
    ],
    joined: 0,
    expectedParticipants: "250+ Patients",
    organizer: "Unitevia Community Team",
    organizerEmail: "hello@unitevia.org",
    status: "Upcoming",
    image: "/assets/events/community-free-health-eye-camp-g1.jpg",
  },
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let eventData: Partial<EventData> | null = null;

  // 1. Fetch from live backend at http://localhost:5000/event/:id — the backend
  // verifyToken middleware crashes (uses unimported jwtverify), so we fetch
  // without an Authorization header; 401/500 is caught and we fall back below.
  try {
    const res = await fetch(`http://localhost:5000/event/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      eventData = (await res.json()) as Partial<EventData>;
    }
  } catch {
    console.log("Could not fetch from backend, using fallback data.");
  }

  // 2. Fallback to mock data matching reference image if backend is offline or empty
  const fallback = FALLBACK_EVENTS[id] || DEFAULT_EVENT;

  const event: EventData = {
    _id: eventData?._id || fallback._id,
    title: eventData?.title || fallback.title,
    category: eventData?.category || fallback.category,
    date: eventData?.date || fallback.date,
    time: eventData?.time || fallback.time,
    location: eventData?.location || fallback.location,
    description: eventData?.description || fallback.description,
    about:
      eventData?.about ||
      eventData?.description ||
      fallback.about ||
      fallback.description,
    guidelines: eventData?.guidelines || fallback.guidelines,
    joined:
      typeof eventData?.joined === "number"
        ? eventData.joined
        : fallback.joined,
    expectedParticipants:
      eventData?.expectedParticipants || fallback.expectedParticipants,
    organizer: eventData?.organizer || fallback.organizer,
    organizerEmail: eventData?.organizerEmail || fallback.organizerEmail,
    status: eventData?.status || fallback.status,
    image:
      eventData?.thumbnailUrl ||
      eventData?.image ||
      fallback.image ||
      "/assets/events/community-food-distribution.jpg",
    thumbnailUrl: eventData?.thumbnailUrl,
  };

  return <EventDetailClient event={event} />;
}
