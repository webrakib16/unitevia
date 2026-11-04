/**
 * Temporary static demo events for the "Recent Upcoming Events" carousel.
 *
 * This is the single data source for the carousel section. Later, the static
 * array will be replaced by API-fetched data (latest 6 upcoming events from
 * MongoDB/Express) without touching the UI — the carousel receives events
 * through props, so only this file or the page/server wrapper changes.
 */

export type EventCategory =
  | "Food Drive"
  | "Donation"
  | "Cleanup"
  | "Plantation"
  | "Health Camp";

export interface CommunityEvent {
  /** Stable unique id (backend-friendly: will map to Mongo _id later). */
  id: number | string;
  _id?: string;
  /** URL-safe slug for a future /events/[slug] details page. */
  slug: string;
  title: string;
  category: EventCategory;
  /** Path to the cover image under /public (e.g. /assets/events/...). */
  image: string;
  /** ISO date string (YYYY-MM-DD) of the upcoming event. */
  date: string;
  location: string;
  description: string;
  /** Organizing person / organization name. */
  organizer: string;
  /**
   * Optional extra gallery images (paths under /public) for event-detail
   * galleries. Optional so the field stays backend-schema-compatible —
   * currently provided only for the past demo events below.
   */
  gallery?: string[];
}

/** Formats an ISO event date as a consistent, timezone-stable display string. */
export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Same as {@link formatEventDate} but with the abbreviated weekday (e.g. "Sat, Oct 10, 2026"). */
export function formatEventDateWithWeekday(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export const DEMO_EVENTS: CommunityEvent[] = [
  {
    id: 1,
    slug: "community-food-distribution-drive",
    title: "Community Food Distribution Drive",
    category: "Food Drive",
    image: "/assets/banner.jpg",
    date: "2026-11-15",
    location: "Rajshahi, Bangladesh",
    description:
      "Help us distribute food to underprivileged families and make a positive impact in our community.",
    organizer: "Rajshahi Community Care",
  },
  {
    id: 2,
    slug: "winter-clothes-distribution",
    title: "Winter Clothes Distribution",
    category: "Donation",
    image: "/assets/winter-clothing-distribution.jpg",
    date: "2026-11-28",
    location: "Mirpur 10, Dhaka",
    description:
      "Collecting and distributing warm clothes, jackets, and sweaters to underprivileged families.",
    organizer: "Mirpur Youth Volunteers",
  },
  {
    id: 3,
    slug: "dhanmondi-lake-clean-up-campaign",
    title: "Dhanmondi Lake Clean-Up Campaign",
    category: "Cleanup",
    image: "/assets/community-cleanliness.jpg",
    date: "2026-12-05",
    location: "Dhanmondi, Dhaka",
    description:
      "Join us to clean our local lake and make the environment greener and healthier.",
    organizer: "Dhaka Green Team",
  },
  {
    id: 4,
    slug: "urban-tree-plantation-drive",
    title: "Urban Tree Plantation Drive",
    category: "Plantation",
    image: "/assets/green-initiatives.jpg",
    date: "2026-12-12",
    location: "University Area, Rajshahi",
    description:
      "Let's plant trees for a greener and healthier Rajshahi.",
    organizer: "Green Rajshahi Initiative",
  },
  {
    id: 5,
    slug: "blanket-distribution-for-the-needy",
    title: "Blanket Distribution for the Needy",
    category: "Donation",
    image: "/assets/winter-clothing-distribution.jpg",
    date: "2026-12-19",
    location: "Mohammadpur, Dhaka",
    description:
      "Help distribute warm blankets to homeless people and families in need.",
    organizer: "Mohammadpur Care Circle",
  },
  {
    id: 6,
    slug: "community-free-health-eye-camp",
    title: "Community Free Health & Eye Camp",
    category: "Health Camp",
    image: "/assets/blood-donation.jpg",
    date: "2026-12-26",
    location: "Charghat, Rajshahi",
    description:
      "Free health checkups and eye care services for underprivileged community members.",
    organizer: "Health for All Rajshahi",
  },
];

/**
 * Temporary static demo data for the Past Events Gallery until the backend
 * event API exists. Shaped exactly like the future API response would be
 * (url/image paths, ISO dates, category labels) so the gallery component
 * can later be fed real API data without changes.
 *
 * Contains the latest 6 completed events (date strictly before today's
 * date), sorted by event date in descending order.
 */
export const PAST_DEMO_EVENTS: CommunityEvent[] = [
  {
    id: 101,
    slug: "community-food-distribution-drive-oct-2026",
    title: "Community Food Distribution",
    category: "Food Drive",
    image: "/assets/events/community-food-distribution.jpg",
    gallery: [
      "/assets/events/community-food-distribution-drive-g1.jpg",
      "/assets/events/community-food-distribution-drive-g2.jpg",
    ],
    date: "2026-10-17",
    location: "Rajshahi, Bangladesh",
    description:
      "A successful food distribution drive for underprivileged families. Volunteers together packed and handed out essential groceries and meals across the neighborhood.",
    organizer: "Rajshahi Community Care",
  },
  {
    id: 102,
    slug: "winter-clothes-distribution-oct-2026",
    title: "Winter Clothes Distribution",
    category: "Donation",
    image: "/assets/events/winter-clothes-distribution.jpg",
    gallery: [
      "/assets/events/winter-clothes-distribution-g1.jpg",
      "/assets/events/winter-clothes-distribution-g2.jpg",
    ],
    date: "2026-10-04",
    location: "Mirpur 10, Dhaka",
    description:
      "Warm clothes, jackets, and sweaters were collected and distributed to underprivileged families ahead of the winter season.",
    organizer: "Mirpur Youth Volunteers",
  },
  {
    id: 103,
    slug: "dhanmondi-lake-clean-up-campaign-sep-2026",
    title: "Dhanmondi Lake Clean-Up",
    category: "Cleanup",
    image: "/assets/events/lake-cleanup-campaign.jpg",
    gallery: [
      "/assets/events/dhanmondi-lake-clean-up-campaign-g1.jpg",
      "/assets/events/dhanmondi-lake-clean-up-campaign-g2.jpg",
    ],
    date: "2026-09-26",
    location: "Dhanmondi, Dhaka",
    description:
      "A successful clean-up drive to make Dhanmondi Lake cleaner and greener. Volunteers came together to collect plastic waste and raise awareness about environmental protection.",
    organizer: "Dhaka Green Team",
  },
  {
    id: 104,
    slug: "urban-tree-plantation-drive-sep-2026",
    title: "Urban Tree Plantation Drive",
    category: "Plantation",
    image: "/assets/events/tree-plantation-drive.jpg",
    gallery: [
      "/assets/events/urban-tree-plantation-drive-g1.jpg",
      "/assets/events/urban-tree-plantation-drive-g2.jpg",
    ],
    date: "2026-09-05",
    location: "University Area, Rajshahi",
    description:
      "Volunteers planted young trees across the university area to make Rajshahi greener and healthier for the next generation.",
    organizer: "Green Rajshahi Initiative",
  },
  {
    id: 105,
    slug: "blanket-distribution-for-the-needy-aug-2026",
    title: "Blanket Distribution for the Needy",
    category: "Donation",
    image: "/assets/events/blanket-distribution.jpg",
    gallery: [
      "/assets/events/blanket-distribution-for-the-needy-g1.jpg",
      "/assets/events/blanket-distribution-for-the-needy-g2.jpg",
    ],
    date: "2026-08-22",
    location: "Mohammadpur, Dhaka",
    description:
      "Warm blankets were handed out to homeless people and families in need, helping everyone stay safe through the cold nights.",
    organizer: "Mohammadpur Care Circle",
  },
  {
    id: 106,
    slug: "community-free-health-eye-camp-aug-2026",
    title: "Community Free Health & Eye Camp",
    category: "Health Camp",
    image: "/assets/events/health-eye-camp.jpg",
    gallery: [
      "/assets/events/community-free-health-eye-camp-g1.jpg",
      "/assets/events/community-free-health-eye-camp-g2.jpg",
    ],
    date: "2026-08-08",
    location: "Charghat, Rajshahi",
    description:
      "Free health checkups and eye care services were provided to underprivileged community members by volunteer doctors and nurses.",
    organizer: "Health for All Rajshahi",
  },
];
