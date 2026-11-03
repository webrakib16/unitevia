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
  Sparkles,
  Sprout,
  Users,
  Utensils,
} from "lucide-react";

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

// Fallback events if database is unreachable
const FALLBACK_REFERENCE_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Winter Clothing Distribution",
    category: "Winter Relief",
    date: "Dec 20, 2026",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "Distribute warm clothes among underprivileged families in our local community.",
    joined: 0,
    image: "/assets/upcoming-events/blanket-distribution.jpg",
  },
  {
    id: 2,
    title: "Voluntary Blood Donation Camp",
    category: "Blood Camp",
    date: "Dec 24, 2026",
    time: "09:00 AM",
    location: "Chapainawabganj",
    description:
      "A community blood donation program to support local hospitals and save lives.",
    joined: 0,
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
    joined: 0,
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
    joined: 0,
    image: "/assets/events/tree-plantation-drive.jpg",
  },
  {
    id: 5,
    title: "Food Distribution Drive",
    category: "Food Drive",
    date: "Jan 08, 2027",
    time: "11:00 AM",
    location: "Nachole, Chapainawabganj",
    description:
      "Provide nutritious meals to low-income families and ensure food support for those in need.",
    joined: 0,
    image: "/assets/events/community-food-distribution.jpg",
  },
  {
    id: 6,
    title: "Clean The City Drive",
    category: "Cleanliness",
    date: "Jan 12, 2027",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    description:
      "A clean environment is essential for a healthy and peaceful community.",
    joined: 0,
    image: "/assets/events/lake-cleanup-campaign.jpg",
  },
  {
    id: 7,
    title: "Blanket Distribution for the Needy",
    category: "Donation",
    date: "Jan 15, 2027",
    time: "10:00 AM",
    location: "Dhaka, Bangladesh",
    description:
      "Help distribute warm blankets to homeless people and families in need.",
    joined: 0,
    image: "/assets/events/blanket-distribution.jpg",
  },
];

// Helper to render matching icon per category
function CategoryIcon({ category }: { category: string }) {
  const norm = category?.toLowerCase().trim() || "";
  if (norm.includes("winter")) return <Shirt className="size-3.5 text-emerald-400" />;
  if (norm.includes("blood")) return <Droplet className="size-3.5 fill-rose-500 text-rose-500" />;
  if (norm.includes("education")) return <BookOpen className="size-3.5 text-sky-400" />;
  if (norm.includes("green") || norm.includes("plant")) return <Sprout className="size-3.5 text-emerald-400" />;
  if (norm.includes("food")) return <Utensils className="size-3.5 text-amber-400" />;
  if (norm.includes("clean")) return <Sparkles className="size-3.5 text-teal-400" />;
  if (norm.includes("donat")) return <Heart className="size-3.5 fill-rose-400 text-rose-400" />;
  return <Layers className="size-3.5 text-emerald-400" />;
}

const ITEMS_PER_PAGE = 12;

export default function AllEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(FALLBACK_REFERENCE_EVENTS);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [joinedMap, setJoinedMap] = useState<Record<string, boolean>>({});

  // Fetch live backend data from MongoDB via Express API
  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:5000/upcoming-events")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const mapped: EventItem[] = data.map((item, index) => ({
            id: item._id || item.id || `backend-${index}`,
            title: item.title || "Community Event",
            category: item.category || "General",
            date: item.date || "Upcoming",
            time: item.time || "10:00 AM",
            location: item.location || "Bangladesh",
            description: item.description || "Community event initiative.",
            joined: typeof item.joined === "number" ? item.joined : 0,
            image: item.image || "/assets/events/blanket-distribution.jpg",
          }));

          // Only upcoming events: exclude events whose date has passed
          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);
          const upcomingOnly = mapped.filter((ev) => {
            const evDate = new Date(ev.date);
            if (Number.isNaN(evDate.getTime())) return true;
            return evDate.getTime() >= startOfToday.getTime();
          });

          setEvents(upcomingOnly);
        }
      })
      .catch((err) => {
        console.log("Using reference events data:", err?.message);
      })
      .finally(() => {
        if (isMounted) setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync joined events from localStorage so actual join counts show up per card
  useEffect(() => {
    const syncJoined = () => {
      if (typeof window === "undefined") return;
      const map: Record<string, boolean> = {};
      events.forEach((ev) => {
        if (localStorage.getItem(`unitevia_joined_event_${ev.id}`) === "true") {
          map[String(ev.id)] = true;
        }
      });
      setJoinedMap(map);
    };

    syncJoined();
    window.addEventListener("storage", syncJoined);
    return () => window.removeEventListener("storage", syncJoined);
  }, [events]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
    setCurrentPage(1);
  };

  // Filter & Search Logic with exact matching for create-event category names
  const filteredEvents = events.filter((event) => {
    // 1. Search Query filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      event.title.toLowerCase().includes(q) ||
      event.location.toLowerCase().includes(q) ||
      event.description.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q);

    // 2. Category Filter (Case-insensitive & flexible matching with create-event category items)
    const eventCat = event.category.toLowerCase().trim();
    const selCat = selectedCategory.toLowerCase().trim();

    let matchesCategory = false;
    if (selectedCategory === "All Categories") {
      matchesCategory = true;
    } else if (eventCat === selCat) {
      matchesCategory = true;
    } else if (selCat === "food drive" && (eventCat.includes("food") || eventCat.includes("drive"))) {
      matchesCategory = true;
    } else if (selCat === "cleanliness" && (eventCat.includes("clean") || eventCat.includes("cleanup"))) {
      matchesCategory = true;
    } else if (selCat === "donation" && (eventCat.includes("donat") || eventCat.includes("relief"))) {
      matchesCategory = true;
    } else if (selCat === "winter relief" && eventCat.includes("winter")) {
      matchesCategory = true;
    } else if (selCat === "blood camp" && eventCat.includes("blood")) {
      matchesCategory = true;
    } else if (selCat === "education" && eventCat.includes("edu")) {
      matchesCategory = true;
    } else if (selCat === "greenery" && (eventCat.includes("green") || eventCat.includes("plant"))) {
      matchesCategory = true;
    }

    // 3. Date Filter
    let matchesDate = true;
    if (selectedDate !== "All Dates") {
      const now = new Date();
      const evDate = new Date(event.date);
      if (!isNaN(evDate.getTime())) {
        if (selectedDate === "This Week") {
          const diffDays = (evDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
          matchesDate = diffDays >= 0 && diffDays <= 7;
        } else if (selectedDate === "This Month") {
          matchesDate =
            evDate.getMonth() === now.getMonth() &&
            evDate.getFullYear() === now.getFullYear();
        } else if (selectedDate === "Next Month") {
          const nextMonth = (now.getMonth() + 1) % 12;
          matchesDate = evDate.getMonth() === nextMonth;
        }
      }
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  // Sort Logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const aJoined = (a.joined || 0) + (joinedMap[String(a.id)] ? 1 : 0);
    const bJoined = (b.joined || 0) + (joinedMap[String(b.id)] ? 1 : 0);

    if (selectedSort === "Most Popular") {
      return bJoined - aJoined;
    }
    if (selectedSort === "Oldest First") {
      return String(a.id).localeCompare(String(b.id));
    }
    // Default: Newest First
    return String(b.id).localeCompare(String(a.id));
  });

  // 12 Items Per Page Pagination Logic
  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Header Badge & Title ── */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#062416] px-4 py-1.5 text-xs font-semibold text-emerald-300 shadow-[0_0_15px_rgba(0,217,154,0.1)]">
            <CalendarDays className="size-3.5 text-[#00d99a]" />
            <span className="tracking-wide">UPCOMING EVENTS</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-white">Upcoming </span>
            <span className="bg-gradient-to-r from-[#00d99a] to-[#00f2aa] bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-xs text-neutral-300 sm:text-sm">
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
                placeholder="Search events by title, location or keyword..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-4 text-xs text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Category Dropdown (Matches create-event category list exactly) */}
              <div className="relative min-w-[150px] flex-1 sm:flex-initial">
                <Layers className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-9 pr-8 text-xs font-medium text-white transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
                >
                  <option value="All Categories" className="bg-[#06180f] text-white">
                    All Categories
                  </option>
                  <option value="Winter Relief" className="bg-[#06180f] text-white">
                    Winter Relief
                  </option>
                  <option value="Donation" className="bg-[#06180f] text-white">
                    Donation
                  </option>
                  <option value="Education" className="bg-[#06180f] text-white">
                    Education
                  </option>
                  <option value="Blood Camp" className="bg-[#06180f] text-white">
                    Blood Camp
                  </option>
                  <option value="Cleanliness" className="bg-[#06180f] text-white">
                    Cleanliness
                  </option>
                  <option value="Greenery" className="bg-[#06180f] text-white">
                    Greenery
                  </option>
                  <option value="Food Drive" className="bg-[#06180f] text-white">
                    Food Drive
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>

              {/* Date Filter Dropdown */}
              <div className="relative min-w-[130px] flex-1 sm:flex-initial">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-9 pr-8 text-xs font-medium text-white transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
                >
                  <option value="All Dates" className="bg-[#06180f] text-white">
                    All Dates
                  </option>
                  <option value="This Week" className="bg-[#06180f] text-white">
                    This Week
                  </option>
                  <option value="This Month" className="bg-[#06180f] text-white">
                    This Month
                  </option>
                  <option value="Next Month" className="bg-[#06180f] text-white">
                    Next Month
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>

              {/* Sort By Dropdown */}
              <div className="relative min-w-[140px] flex-1 sm:flex-initial">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedSort}
                  onChange={handleSortChange}
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

        {/* ── Events Grid (3 columns on desktop, 12 items per page) ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {isFetching &&
            paginatedEvents.length === 0 &&
            Array.from({ length: 6 }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#06180f]/95 p-3.5 sm:p-4"
                aria-hidden="true"
              >
                <div className="aspect-[16/10] w-full animate-pulse rounded-xl bg-[#0a2a1a]" />
                <div className="mt-4 h-4 w-2/3 animate-pulse rounded-md bg-[#0a2a1a]" />
                <div className="mt-3 h-3 w-1/2 animate-pulse rounded-md bg-[#0a2a1a]" />
                <div className="mt-5 flex items-center justify-between border-t border-emerald-500/15 pt-3.5">
                  <div className="h-3 w-20 animate-pulse rounded-md bg-[#0a2a1a]" />
                  <div className="h-7 w-24 animate-pulse rounded-xl bg-[#0a2a1a]" />
                </div>
              </div>
            ))}

          {!isFetching && paginatedEvents.map((event) => {
            const isUserJoined = Boolean(joinedMap[String(event.id)]);
            const volunteerCount = (event.joined || 0) + (isUserJoined ? 1 : 0);

            return (
              <article
                key={event.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#06180f]/95 p-3.5 shadow-[0_0_30px_rgba(0,217,154,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00d99a]/50 hover:shadow-[0_0_35px_rgba(0,217,154,0.12)] sm:p-4"
              >
                {/* Event Cover Image with Top Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-emerald-500/20 bg-[#03140b]">
                  <Image
                    src={event.image || "/assets/events/blanket-distribution.jpg"}
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

                {/* Event Title */}
                <h3 className="mt-4 text-base font-bold text-white transition group-hover:text-[#00d99a] sm:text-lg">
                  {event.title}
                </h3>

                {/* Meta details (Location, Time) */}
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-300">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-400">
                    <Clock className="size-3.5 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                  {event.description}
                </p>

                {/* Bottom Footer: Real Joined Count & View Event Action */}
                <div className="mt-4 flex items-center justify-between border-t border-emerald-500/15 pt-3.5">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Users className="size-3.5 text-emerald-400" />
                    <span>{volunteerCount} Joined</span>
                  </div>

                  <Link
                    href={`/upcoming-events/${event.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#00d99a] px-3.5 py-1.5 text-xs font-bold text-[#032014] shadow-[0_0_12px_rgba(0,217,154,0.3)] transition hover:bg-[#00f2aa] hover:shadow-[0_0_18px_rgba(0,217,154,0.5)]"
                  >
                    <span>View Event</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state when no events match */}
        {!isFetching && paginatedEvents.length === 0 && (
          <div className="my-16 flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-[#05180f]/80 p-8 text-center sm:p-12">
            <Layers className="size-12 text-emerald-400/60" />
            <h3 className="mt-4 text-lg font-bold text-white">No events found</h3>
            <p className="mt-1 max-w-sm text-xs text-neutral-400">
              There are currently no events matching &quot;{selectedCategory}&quot;. Try selecting another category or clear your search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All Categories");
                setSearchQuery("");
                setSelectedDate("All Dates");
                setCurrentPage(1);
              }}
              className="mt-5 rounded-xl bg-gradient-to-r from-[#00d99a] to-[#00f2aa] px-4 py-2 text-xs font-bold text-[#032014] shadow-sm transition hover:brightness-110"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Functional 12-Items Pagination ── */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {/* Previous Page Button */}
            <button
              type="button"
              aria-label="Previous Page"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#051c11]/80 text-white/70 transition hover:border-emerald-400/50 hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-4.5" />
            </button>

            {/* Dynamic Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-[#00d99a] to-[#00f2aa] text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.35)]"
                    : "border border-emerald-500/25 bg-[#051c11]/80 text-white hover:border-emerald-400/50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              type="button"
              aria-label="Next Page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#051c11]/80 text-white/70 transition hover:border-emerald-400/50 hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="size-4.5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
