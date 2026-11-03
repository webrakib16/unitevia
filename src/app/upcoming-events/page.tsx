"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpDown,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplet,
  Heart,
  Layers,
  MapPin,
  Search,
  Shirt,
  Sprout,
  Users,
  Utensils,
} from "lucide-react";

// ─── Initial Reference Events ─────────────────────────────────────────────────
export interface EventItem {
  id: number | string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  joined: number;
  image: string;
}

const REFERENCE_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Winter Clothing Distribution",
    category: "Winter Relief",
    date: "Dec 20, 2026",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "Distribute warm clothes among underprivileged families in our local community.",
    joined: 120,
    image: "/assets/upcoming-events/blanket-distribution.jpg",
  },
  {
    id: 2,
    title: "Voluntary Blood Dontation Camp",
    category: "Blood Camp",
    date: "Dec 24, 2026",
    time: "09:00 AM",
    location: "Chapainawabganj",
    description:
      "A community blood donation program to support local hospitals and save lives.",
    joined: 78,
    image: "/assets/events/health-eye-camp.jpg",
  },
  {
    id: 3,
    title: "Support for Underprivileged Students",
    category: "Education",
    date: "Dec 28, 2026",
    time: "02:00 PM",
    location: "Rajshahi, Bangladesh",
    description:
      "Distribute educational materials and support the learning journey of local students.",
    joined: 64,
    image: "/assets/events/winter-clothes-distribution.jpg",
  },
  {
    id: 4,
    title: "Community Tree Plantation",
    category: "Greenery",
    date: "Jan 05, 2027",
    time: "09:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "A tree plantation initiative to create a greener and healthier community.",
    joined: 92,
    image: "/assets/events/tree-plantation-drive.jpg",
  },
  {
    id: 5,
    title: "Food Distribution Drive",
    category: "Food Awareness",
    date: "Jan 08, 2027",
    time: "11:00 AM",
    location: "Nachole, Chapainawabganj",
    description:
      "Provide nutritious meals to low-income families and ensure food support for those in need.",
    joined: 140,
    image: "/assets/events/community-food-distribution.jpg",
  },
  {
    id: 6,
    title: "Free Health Checkup Camp",
    category: "Healthcare",
    date: "Jan 12, 2027",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "A free health checkup and basic medical consultation for the local community.",
    joined: 110,
    image: "/assets/events/community-free-health-eye-camp-g1.jpg",
  },
];

// Helper to render matching icon per category
function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case "Winter Relief":
      return <Shirt className="size-3.5 text-emerald-400" />;
    case "Blood Camp":
      return <Droplet className="size-3.5 fill-rose-500 text-rose-500" />;
    case "Education":
      return <BookOpen className="size-3.5 text-sky-400" />;
    case "Greenery":
      return <Sprout className="size-3.5 text-emerald-400" />;
    case "Food Awareness":
    case "Food Drive":
      return <Utensils className="size-3.5 text-amber-400" />;
    case "Healthcare":
    case "Health Camp":
      return <Heart className="size-3.5 fill-rose-400 text-rose-400" />;
    default:
      return <Layers className="size-3.5 text-emerald-400" />;
  }
}

export default function AllEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(REFERENCE_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);

  // Optional: Fetch live backend data if available, fallback smoothly to reference data
  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:5000/upcoming-events")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Normalize backend items if needed and append or merge
          const mapped = data.map((item, index) => ({
            id: item._id || item.id || `backend-${index}`,
            title: item.title || "Community Event",
            category: item.category || "General",
            date: item.date || "Upcoming",
            time: item.time || "10:00 AM",
            location: item.location || "Bangladesh",
            description: item.description || "Community event initiative.",
            joined: item.joined || Math.floor(Math.random() * 50) + 40,
            image: item.image || "/assets/events/blanket-distribution.jpg",
          }));
          setEvents(mapped);
        }
      })
      .catch((err) => {
        // Fallback to reference mock data when backend is not running
        console.log("Using reference events data:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter & Search Logic
  const filteredEvents = events.filter((event) => {
    // 1. Search Query filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      event.title.toLowerCase().includes(q) ||
      event.location.toLowerCase().includes(q) ||
      event.description.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q);

    // 2. Category Filter
    const matchesCategory =
      selectedCategory === "All Categories" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort Logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (selectedSort === "Most Popular") {
      return b.joined - a.joined;
    }
    if (selectedSort === "Oldest First") {
      return Number(a.id) - Number(b.id);
    }
    // Default: Newest First
    return Number(b.id) - Number(a.id);
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031109] text-white">
      {/* ── Background Ambient Glowing Orbs ── */}
      <div className="pointer-events-none absolute -left-48 top-20 size-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 bottom-32 size-[520px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-24 top-16 size-[340px] rounded-full bg-emerald-400/5 blur-[120px]" />

      {/* Decorative Starry Sparkles */}
      <div className="pointer-events-none absolute left-[10%] top-[14%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute right-[12%] top-[10%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute left-[4%] bottom-[25%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
      <div className="pointer-events-none absolute right-[5%] bottom-[30%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {/* ── Page Header ── */}
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-[#051c11]/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <CalendarDays className="size-3.5" />
            <span>UPCOMING EVENTS</span>
          </div>

          {/* Main Heading */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
            <span className="text-white">Upcoming </span>
            <span className="bg-gradient-to-r from-[#00d99a] via-[#00f2aa] to-[#10b981] bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Discover and join meaningful community events happening soon in your area.
          </p>
        </div>

        {/* ── Search & Filter Controls Bar ── */}
        <div className="mt-8 rounded-2xl border border-emerald-500/25 bg-[#05180f]/90 p-3 shadow-[0_0_40px_rgba(0,217,154,0.05)] backdrop-blur-md sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, location or keyword..."
                className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Category Dropdown */}
              <div className="relative min-w-[150px] flex-1 sm:flex-initial">
                <Layers className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-9 pr-8 text-xs font-medium text-white transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
                >
                  <option value="All Categories" className="bg-[#06180f] text-white">
                    All Categories
                  </option>
                  <option value="Winter Relief" className="bg-[#06180f] text-white">
                    Winter Relief
                  </option>
                  <option value="Blood Camp" className="bg-[#06180f] text-white">
                    Blood Camp
                  </option>
                  <option value="Education" className="bg-[#06180f] text-white">
                    Education
                  </option>
                  <option value="Greenery" className="bg-[#06180f] text-white">
                    Greenery
                  </option>
                  <option value="Food Awareness" className="bg-[#06180f] text-white">
                    Food Awareness
                  </option>
                  <option value="Healthcare" className="bg-[#06180f] text-white">
                    Healthcare
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>

              {/* Date Filter Dropdown */}
              <div className="relative min-w-[130px] flex-1 sm:flex-initial">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-9 pr-8 text-xs font-medium text-white transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
                >
                  <option value="All Dates" className="bg-[#06180f] text-white">
                    All Dates
                  </option>
                  <option value="This Month" className="bg-[#06180f] text-white">
                    This Month
                  </option>
                  <option value="Upcoming" className="bg-[#06180f] text-white">
                    Upcoming
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative min-w-[140px] flex-1 sm:flex-initial">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-9 pr-8 text-xs font-medium text-white transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
                >
                  <option value="Newest First" className="bg-[#06180f] text-white">
                    Newest First
                  </option>
                  <option value="Oldest First" className="bg-[#06180f] text-white">
                    Oldest First
                  </option>
                  <option value="Most Popular" className="bg-[#06180f] text-white">
                    Most Popular
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Events Grid (3 columns on desktop) ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {sortedEvents.map((event) => (
            <article
              key={event.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#06180f]/95 p-3.5 shadow-[0_0_30px_rgba(0,217,154,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00d99a]/50 hover:shadow-[0_0_35px_rgba(0,217,154,0.12)] sm:p-4"
            >
              {/* Event Cover Image with Top Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-emerald-500/20 bg-[#03140b]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06180f]/80 via-transparent to-transparent" />

                {/* Top-Left Category Badge */}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#03140b]/85 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                  <CategoryIcon category={event.category} />
                  <span>{event.category}</span>
                </div>

                {/* Top-Right Date Badge */}
                <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#03140b]/85 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                  <CalendarDays className="size-3.5 text-[#00d99a]" />
                  <span>{event.date}</span>
                </div>
              </div>

              {/* Event Details Content */}
              <div className="flex flex-1 flex-col pt-3.5">
                {/* Title */}
                <h3 className="line-clamp-1 text-base font-bold text-white transition group-hover:text-emerald-300 sm:text-lg">
                  {event.title}
                </h3>

                {/* Location & Time Row */}
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0 text-[#00d99a]" />
                    <span className="truncate">{event.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 shrink-0 text-[#00d99a]" />
                    <span>{event.time}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                  {event.description}
                </p>

                {/* Card Footer: Joined Count & View Event Action */}
                <div className="mt-auto flex items-center justify-between border-t border-emerald-500/15 pt-3.5">
                  <span className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                    <Users className="size-4 text-[#00d99a]" />
                    <span>{event.joined} Joined</span>
                  </span>

                  <Link
                    href={`/upcoming-events/${event.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00d99a] to-[#00f2aa] px-4 py-1.5 text-xs font-semibold text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.25)] transition hover:brightness-110"
                  >
                    <span>View Event</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Pagination Controls Bar ── */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            type="button"
            aria-label="Previous Page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#051c11]/80 text-white/70 transition hover:border-emerald-400/50 hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-4.5" />
          </button>

          {/* Page 1 (Active) */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold transition ${
              currentPage === 1
                ? "bg-gradient-to-r from-[#00d99a] to-[#00f2aa] text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.35)]"
                : "border border-emerald-500/25 bg-[#051c11]/80 text-white hover:border-emerald-400/50"
            }`}
          >
            1
          </button>

          {/* Page 2 */}
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold transition ${
              currentPage === 2
                ? "bg-gradient-to-r from-[#00d99a] to-[#00f2aa] text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.35)]"
                : "border border-emerald-500/25 bg-[#051c11]/80 text-white hover:border-emerald-400/50"
            }`}
          >
            2
          </button>

          {/* Page 3 */}
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold transition ${
              currentPage === 3
                ? "bg-gradient-to-r from-[#00d99a] to-[#00f2aa] text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.35)]"
                : "border border-emerald-500/25 bg-[#051c11]/80 text-white hover:border-emerald-400/50"
            }`}
          >
            3
          </button>

          {/* Ellipsis */}
          <span className="flex size-10 items-center justify-center text-sm font-semibold text-neutral-500">
            ...
          </span>

          {/* Page 8 */}
          <button
            type="button"
            onClick={() => setCurrentPage(8)}
            className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold transition ${
              currentPage === 8
                ? "bg-gradient-to-r from-[#00d99a] to-[#00f2aa] text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.35)]"
                : "border border-emerald-500/25 bg-[#051c11]/80 text-white hover:border-emerald-400/50"
            }`}
          >
            8
          </button>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next Page"
            disabled={currentPage === 8}
            onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
            className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#051c11]/80 text-white/70 transition hover:border-emerald-400/50 hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-4.5" />
          </button>
        </div>
      </main>
    </div>
  );
}
