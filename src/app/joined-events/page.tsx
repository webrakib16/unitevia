"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenfromClient } from "@/lib/getTokenfromClient";
import {
  ArrowUpDown,
  BookOpen,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Eye,
  Heart,
  Home,
  Layers,
  MapPin,
  Search,
  Shirt,
  Sparkles,
  Sprout,
  Trash2,
  Users,
  Utensils,
} from "lucide-react";
import { toast } from "@/components/ui/toast";

interface EventItem {
  id: string;
  _id?: string;
  title: string;
  category: string;
  rawDate?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  joined?: number;
  joinedUsers?: Array<string | { email?: string; [key: string]: unknown }>;
}

function formatEventDateSafe(dateStr: string): string {
  if (!dateStr) return "Upcoming Date";
  if (/[a-zA-Z]/.test(dateStr)) return dateStr;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, year, month, day] = match;
    const d = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  }
  return dateStr;
}

function parseEventTimestamp(dateStr: string, timeStr?: string): number {
  if (!dateStr) return Number.MAX_SAFE_INTEGER;
  let hours = 0;
  let minutes = 0;
  if (timeStr) {
    const t = timeStr.trim();
    const ampmMatch = t.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
    if (ampmMatch) {
      let h = Number(ampmMatch[1]);
      const m = Number(ampmMatch[2]);
      const mer = ampmMatch[3]?.toUpperCase();
      if (mer === "PM" && h < 12) h += 12;
      else if (mer === "AM" && h === 12) h = 0;
      hours = h;
      minutes = m;
    }
  }

  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, y, m, d] = match;
    return Date.UTC(Number(y), Number(m) - 1, Number(d), hours, minutes);
  }
  const parsed = new Date(dateStr).getTime();
  return isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}



function CategoryBadge({ category }: { category: string }) {
  const norm = category.toLowerCase();
  if (norm.includes("winter") || norm.includes("cloth")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
        <Shirt className="size-3 text-emerald-400" />
        <span>{category}</span>
      </span>
    );
  }
  if (norm.includes("blood")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/60 px-2.5 py-0.5 text-xs font-semibold text-rose-300">
        <Droplet className="size-3 fill-rose-500 text-rose-500" />
        <span>{category}</span>
      </span>
    );
  }
  if (norm.includes("edu")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 px-2.5 py-0.5 text-xs font-semibold text-purple-300">
        <BookOpen className="size-3 text-purple-400" />
        <span>{category}</span>
      </span>
    );
  }
  if (norm.includes("food")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/60 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
        <Utensils className="size-3 text-amber-400" />
        <span>{category}</span>
      </span>
    );
  }
  if (norm.includes("clean")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-950/60 px-2.5 py-0.5 text-xs font-semibold text-teal-300">
        <Sparkles className="size-3 text-teal-400" />
        <span>{category}</span>
      </span>
    );
  }
  if (norm.includes("green") || norm.includes("plant")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/30 bg-lime-950/60 px-2.5 py-0.5 text-xs font-semibold text-lime-300">
        <Sprout className="size-3 text-lime-400" />
        <span>{category}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
      <Heart className="size-3 text-emerald-400" />
      <span>{category}</span>
    </span>
  );
}

export default function JoinedEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Earliest");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Private route guard: Redirect unauthenticated users to login
  useEffect(() => {
    if (!isPending) {
      const hasLocalUser =
        typeof window !== "undefined" && !!localStorage.getItem("unitevia_user");
      if (!session?.user && !hasLocalUser) {
        toast.add({
          title: "Access Restricted",
          description: "Please sign in or sign up to view your joined events.",
          type: "error",
        });
        router.replace("/login");
      }
    }
  }, [isPending, session, router]);

  // Fetch backend events and keep only those containing the logged-in user's
  // email in their joinedUsers array (persisted in the DB event document).
  useEffect(() => {
    let isMounted = true;

    if (isPending) return;

    const stored = typeof window !== "undefined" ? localStorage.getItem("unitevia_user") : null;
    let storedEmail = "";
    try {
      storedEmail = stored ? JSON.parse(stored)?.email || "" : "";
    } catch {
      storedEmail = "";
    }
    const userEmail = (session?.user?.email || storedEmail).trim().toLowerCase();

    fetch("http://localhost:5000/upcoming-events")
      .then((res) => {
        if (!res.ok) throw new Error("Network error fetching events");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        if (!userEmail) {
          setEvents([]);
          return;
        }

        if (!Array.isArray(data)) return;

        const userJoined: EventItem[] = data
          .filter(
            (item) =>
              (item.joinedUsers || []).some(
                (u: { email?: string }) =>
                  u?.email?.trim().toLowerCase() === userEmail
              )
          )
          .map((item, index) => ({
            id: String(item._id || item.id || `event-${index}`),
            _id: String(item._id || item.id || `event-${index}`),
            title: item.title || "Community Event",
            category: item.category || "General",
            rawDate: item.date || "",
            date: formatEventDateSafe(item.date || ""),
            time: item.time || "10:00 AM",
            location: item.location || "Bangladesh",
            description: item.description || "Community event initiative.",
            image: item.image || "/assets/events/blanket-distribution.jpg",
            joined: typeof item.joined === "number" ? item.joined : (item.joinedUsers || []).length,
            joinedUsers: item.joinedUsers || [],
          }));

        setEvents(userJoined);
      })
      .catch((err) => {
        console.error("Joined events fetch failed:", err?.message);
        if (isMounted) setEvents([]);
      })
      .finally(() => {
        if (isMounted) setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [session?.user?.email, isPending]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
    setCurrentPage(1);
  };

  // Handle Cancel Participation — removes the user from joinedUsers via the
  // existing GET + PATCH endpoints, so the DB stays the source of truth.
  const handleCancelJoin = async (eventId: string, eventTitle: string) => {
    if (cancellingId) return;

    const stored = localStorage.getItem("unitevia_user");
    let storedUser: { email?: string } | null = null;
    try {
      storedUser = stored ? JSON.parse(stored) : null;
    } catch {
      storedUser = null;
    }
    const userEmail = (session?.user?.email || storedUser?.email || "")
      .trim()
      .toLowerCase();

    if (!userEmail) {
      toast.add({
        title: "Action Not Available",
        description: "Please log in to cancel your participation.",
        type: "error",
      });
      return;
    }

    setCancellingId(eventId);

    try {
      const token = await getTokenfromClient();
      let freshJoinedUsers: Array<string | { email?: string; [key: string]: unknown }> = [];
      let freshJoinedCount = 0;
      let foundEvent = false;

      // 1. Fetch from public /upcoming-events (no auth required, always works)
      try {
        const allRes = await fetch("http://localhost:5000/upcoming-events");
        if (allRes.ok) {
          const allEvents = await allRes.json();
          if (Array.isArray(allEvents)) {
            const matched = allEvents.find(
              (ev: { _id?: string; id?: string }) =>
                String(ev._id || ev.id) === String(eventId)
            );
            if (matched) {
              freshJoinedUsers = Array.isArray(matched.joinedUsers) ? matched.joinedUsers : [];
              freshJoinedCount = typeof matched.joined === "number" ? matched.joined : freshJoinedUsers.length;
              foundEvent = true;
            }
          }
        }
      } catch {
        // Fallback to local state
      }

      // 2. Fallback to current local state if network fetch didn't yield the event
      if (!foundEvent) {
        const localEv = events.find((ev) => ev.id === eventId);
        if (localEv) {
          freshJoinedUsers = Array.isArray(localEv.joinedUsers) ? localEv.joinedUsers : [];
          freshJoinedCount = typeof localEv.joined === "number" ? localEv.joined : freshJoinedUsers.length;
        }
      }

      // Filter out this user's email from joinedUsers
      const remaining = freshJoinedUsers.filter((u) => {
        const email = (typeof u === "string" ? u : u?.email || "").trim().toLowerCase();
        return email !== userEmail;
      });

      const newCount = Math.max(0, Math.min(freshJoinedCount - 1, remaining.length));

      // 3. Persist the updated list and count to MongoDB via PATCH /event/:id
      const patchRes = await fetch(`http://localhost:5000/event/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          joinedUsers: remaining,
          joined: newCount,
        }),
      });

      if (!patchRes.ok) {
        throw new Error(`PATCH request failed (${patchRes.status} ${patchRes.statusText})`);
      }

      // 4. Update UI + localStorage cache
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
      localStorage.removeItem(`unitevia_joined_event_${eventId}`);

      toast.add({
        title: "Participation Cancelled",
        description: `You have cancelled your participation in "${eventTitle}".`,
        type: "info",
      });
    } catch (err) {
      console.error("Cancel participation failed:", err);
      toast.add({
        title: "Cancellation Failed",
        description:
          "Could not cancel your participation right now. Please try again.",
        type: "error",
      });
    } finally {
      setCancellingId(null);
    }
  };

  // Handle Add to Calendar
  const handleAddToCalendar = (event: EventItem) => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Unitevia//Community Events//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.title.replace(/\s+/g, "_")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.add({
      title: "Calendar Event Downloaded",
      description: `"${event.title}" has been saved to your calendar file.`,
      type: "success",
    });
  };

  // Filter & Search
  const filteredEvents = events.filter((ev) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ev.title.toLowerCase().includes(q) ||
      ev.location.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q);

    const evCat = ev.category.toLowerCase().trim();
    const selCat = selectedCategory.toLowerCase().trim();

    let matchesCategory = false;
    if (selectedCategory === "All Categories") {
      matchesCategory = true;
    } else if (evCat === selCat) {
      matchesCategory = true;
    } else if (selCat === "food drive" && (evCat.includes("food") || evCat.includes("drive"))) {
      matchesCategory = true;
    } else if (selCat === "cleanliness" && (evCat.includes("clean") || evCat.includes("cleanup"))) {
      matchesCategory = true;
    } else if (selCat === "donation" && (evCat.includes("donat") || evCat.includes("relief") || evCat.includes("cloth"))) {
      matchesCategory = true;
    } else if (selCat === "winter relief" && (evCat.includes("winter") || evCat.includes("cloth"))) {
      matchesCategory = true;
    } else if (selCat === "blood camp" && evCat.includes("blood")) {
      matchesCategory = true;
    } else if (selCat === "education" && evCat.includes("edu")) {
      matchesCategory = true;
    } else if (selCat === "greenery" && (evCat.includes("green") || evCat.includes("plant"))) {
      matchesCategory = true;
    }

    return matchesSearch && matchesCategory;
  });

  // Sort: automatically ascending by actual event date (Earliest to Latest)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const timeA = parseEventTimestamp(a.rawDate || a.date, a.time);
    const timeB = parseEventTimestamp(b.rawDate || b.date, b.time);
    if (selectedSort === "Latest") {
      return timeB - timeA;
    }
    // Default: Earliest to Latest (Ascending order)
    return timeA - timeB;
  });

  // Pagination (6 items per page)
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#031109] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
          <p className="text-xs text-neutral-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  const hasLocal =
    typeof window !== "undefined" && !!localStorage.getItem("unitevia_user");
  if (!session?.user && !hasLocal) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031109] text-white selection:bg-emerald-500 selection:text-black">
      {/* ── Background Glows ── */}
      <div className="pointer-events-none absolute -left-48 top-20 size-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 bottom-32 size-[520px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-24 top-16 size-[340px] rounded-full bg-emerald-400/5 blur-[120px]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 sm:text-[13px]">
          <Link href="/" className="flex items-center gap-1.5 transition hover:text-white">
            <Home className="size-3.5 text-neutral-400" />
            <span>Home</span>
          </Link>
          <span className="text-neutral-600">&gt;</span>
          <span className="font-medium text-white">Joined Events</span>
        </nav>

        {/* ── Page Header ── */}
        <div className="mt-5 flex items-center gap-4">
          {/* Users Icon Box */}
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-[#062416] to-[#031109] text-[#00d99a] shadow-[0_0_25px_rgba(0,217,154,0.18)] sm:size-16">
            <Users className="size-7 sm:size-8" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              <span className="text-white">Joined </span>
              <span className="text-[#00d99a]">Events</span>
            </h1>
            <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
              All the events you&apos;ve joined. View details, stay updated, or cancel your participation.
            </p>
          </div>
        </div>

        {/* ── Search & Filter Controls Bar ── */}
        <div className="mt-7 rounded-2xl border border-emerald-500/25 bg-[#05180f]/90 p-3 shadow-[0_0_40px_rgba(0,217,154,0.05)] backdrop-blur-md sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                placeholder="Search your joined events..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-4 text-xs text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Category */}
              <div className="relative min-w-[160px] flex-1 sm:flex-initial">
                <Layers className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-9 pr-8 text-xs font-medium text-white transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
                >
                  <option value="All Categories" className="bg-[#06180f] text-white">All Categories</option>
                  <option value="Winter Relief" className="bg-[#06180f] text-white">Winter Relief</option>
                  <option value="Donation" className="bg-[#06180f] text-white">Donation</option>
                  <option value="Education" className="bg-[#06180f] text-white">Education</option>
                  <option value="Blood Camp" className="bg-[#06180f] text-white">Blood Camp</option>
                  <option value="Cleanliness" className="bg-[#06180f] text-white">Cleanliness</option>
                  <option value="Greenery" className="bg-[#06180f] text-white">Greenery</option>
                  <option value="Food Drive" className="bg-[#06180f] text-white">Food Drive</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>

              {/* Sort: Latest */}
              <div className="relative min-w-[140px] flex-1 sm:flex-initial">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
                <select
                  value={selectedSort}
                  onChange={handleSortChange}
                  className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-9 pr-8 text-xs font-medium text-white transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 sm:text-sm"
                >
                  <option value="Earliest" className="bg-[#06180f] text-white">Sort: Earliest</option>
                  <option value="Latest" className="bg-[#06180f] text-white">Sort: Latest</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Horizontal Event Cards List ── */}
        <div className="mt-6 space-y-4">
          {isFetching &&
            paginatedEvents.length === 0 &&
            Array.from({ length: 3 }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-[#06180f]/90 p-4 md:flex-row md:items-center"
                aria-hidden="true"
              >
                <div className="h-24 w-full shrink-0 animate-pulse rounded-xl bg-[#0a2a1a] sm:w-44" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-4 w-2/3 animate-pulse rounded-md bg-[#0a2a1a]" />
                  <div className="h-3 w-1/3 animate-pulse rounded-md bg-[#0a2a1a]" />
                  <div className="h-3 w-full animate-pulse rounded-md bg-[#0a2a1a]" />
                </div>
                <div className="h-8 w-40 shrink-0 animate-pulse rounded-xl bg-[#0a2a1a]" />
              </div>
            ))}

          {!isFetching && paginatedEvents.map((ev) => (
            <div
              key={ev.id}
              className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-[#06180f]/90 p-4 shadow-sm backdrop-blur-md transition hover:border-emerald-500/40 md:flex-row md:items-center md:justify-between"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                {/* Thumbnail */}
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-[#03140b] sm:h-24 sm:w-44">
                  <Image
                    src={ev.image || "/assets/events/blanket-distribution.jpg"}
                    alt={ev.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold text-white sm:text-lg">
                    {ev.title}
                  </h3>

                  {/* Badges row */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                    <CategoryBadge category={ev.category} />

                    <div className="flex items-center gap-1 text-xs text-neutral-300">
                      <CalendarDays className="size-3.5 text-neutral-400" />
                      <span>{ev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-neutral-300">
                      <MapPin className="size-3.5 text-neutral-400" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="mt-2 line-clamp-1 text-xs text-neutral-400">
                    {ev.description}
                  </p>
                </div>
              </div>

              {/* Right: Status & Actions */}
              <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-t border-emerald-500/10 pt-3 md:flex-col md:items-end md:border-t-0 md:pt-0">
                {/* Joined Status Badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>Joined</span>
                </span>

                {/* Actions row: View, Add to Calendar, Cancel Join */}
                <div className="flex items-center gap-2">
                  {/* View */}
                  <Link
                    href={`/upcoming-events/${ev.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-[#082416]/70 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-emerald-400 hover:bg-[#0a311e]"
                  >
                    <Eye className="size-3.5 text-emerald-400" />
                    <span>View</span>
                  </Link>

                  {/* Add to Calendar */}
                  <button
                    type="button"
                    onClick={() => handleAddToCalendar(ev)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-[#082416]/70 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-emerald-400 hover:bg-[#0a311e]"
                  >
                    <CalendarPlus className="size-3.5 text-emerald-400" />
                    <span>Add to Calendar</span>
                  </button>

                  {/* Cancel Join */}
                  <button
                    type="button"
                    disabled={cancellingId === ev.id}
                    onClick={() => handleCancelJoin(ev.id, ev.title)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-[#280d0d]/70 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:border-red-400 hover:bg-[#381212] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="size-3.5 text-red-400" />
                    <span>{cancellingId === ev.id ? "Cancelling..." : "Cancel Join"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!isFetching && paginatedEvents.length === 0 && (
            <div className="py-16 text-center">
              <Users className="mx-auto size-12 text-emerald-400/40" />
              <h3 className="mt-3 text-lg font-bold text-white">No joined events</h3>
              <p className="mt-1 text-xs text-neutral-400">
                You haven&apos;t joined any community events yet.
              </p>
              <div className="mt-4">
                <Link
                  href="/upcoming-events"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#00d99a] px-4 py-2 text-xs font-bold text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.3)] transition hover:bg-[#00f2aa]"
                >
                  Explore Upcoming Events
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer Results & Pagination ── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-neutral-400">
            Showing {sortedEvents.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, sortedEvents.length)} of {sortedEvents.length} events
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex size-9 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#051c11]/80 text-white/70 transition hover:border-emerald-400/50 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                    currentPage === pageNum
                      ? "bg-[#00d99a] text-[#032014] shadow-[0_0_12px_rgba(0,217,154,0.35)]"
                      : "border border-emerald-500/25 bg-[#051c11]/80 text-white hover:border-emerald-400/50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="flex size-9 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#051c11]/80 text-white/70 transition hover:border-emerald-400/50 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
