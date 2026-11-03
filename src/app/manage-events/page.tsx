"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ArrowUpDown,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Home,
  Layers,
  MapPin,
  Pencil,
  Plus,
  Search,
  Shirt,
  Sparkles,
  Sprout,
  Trash2,
  Utensils,
  Droplet,
  BookOpen,
} from "lucide-react";
import { EditEventDetails, type EditEventForm } from "@/components/EditEventDetails";
import { DeleteEventDetails } from "@/components/DeleteEventDetails";
import { toast } from "@/components/ui/toast";

interface EventItem {
  id: string;
  _id?: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  joined?: number;
}

const INITIAL_DEMO_EVENTS: EventItem[] = [
  {
    id: "demo-1",
    _id: "demo-1",
    title: "Winter Clothing Distribution Drive",
    category: "Winter Clothing",
    date: "Dec 20, 2026",
    time: "10:00 AM",
    location: "Rajshahi, Bangladesh",
    description: "Distribute warm clothes to underprivileged people in our community...",
    image: "/assets/upcoming-events/blanket-distribution.jpg",
  },
  {
    id: "demo-2",
    _id: "demo-2",
    title: "Blood Donation Camp",
    category: "Blood Donation",
    date: "Dec 28, 2026",
    time: "09:00 AM",
    location: "Rajshahi College",
    description: "A community blood donation program to support local hospitals...",
    image: "/assets/events/health-eye-camp.jpg",
  },
  {
    id: "demo-3",
    _id: "demo-3",
    title: "Education Support for Underprivileged Children",
    category: "Education",
    date: "Jan 05, 2027",
    time: "02:00 PM",
    location: "Chapainawabganj",
    description: "Provide educational materials and support to deserving students...",
    image: "/assets/events/winter-clothes-distribution.jpg",
  },
];

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

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventItem[]>(INITIAL_DEMO_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);

  // Edit and Delete modal states
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<EventItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Private route guard: Redirect unauthenticated users to login
  useEffect(() => {
    if (!isPending) {
      const hasLocalUser =
        typeof window !== "undefined" && !!localStorage.getItem("unitevia_user");
      if (!session?.user && !hasLocalUser) {
        toast.add({
          title: "Access Restricted",
          description: "Please sign in or sign up to view and manage your events.",
          type: "error",
        });
        router.replace("/login");
      }
    }
  }, [isPending, session, router]);

  // Fetch live backend events
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
            id: String(item._id || item.id || `event-${index}`),
            _id: String(item._id || item.id || `event-${index}`),
            title: item.title || "Community Event",
            category: item.category || "General",
            date: item.date || "Upcoming",
            time: item.time || "10:00 AM",
            location: item.location || "Bangladesh",
            description: item.description || "Community event initiative.",
            image: item.image || "/assets/events/blanket-distribution.jpg",
            joined: item.joined || 0,
          }));
          setEvents(mapped);
        }
      })
      .catch((err) => {
        console.log("Using initial demo events:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

  // Sort
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (selectedSort === "Oldest") {
      return a.id.localeCompare(b.id);
    }
    // Default: Latest
    return b.id.localeCompare(a.id);
  });

  // Pagination (6 items per page)
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle Edit Save
  const handleSaveEdit = async (updatedData: EditEventForm) => {
    if (!editingEvent) return;
    setIsSaving(true);

    try {
      const res = await fetch(`http://localhost:5000/event/${editingEvent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedData.title,
          category: updatedData.category,
          date: updatedData.date,
          time: updatedData.time,
          location: updatedData.location,
          image: updatedData.thumbnailUrl,
          description: updatedData.description,
        }),
      });

      if (!res.ok) console.warn("Backend update returned non-ok status");
    } catch {
      console.log("Backend offline, updating local state");
    }

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === editingEvent.id
          ? {
              ...ev,
              title: updatedData.title,
              category: updatedData.category,
              date: updatedData.date,
              time: updatedData.time,
              location: updatedData.location,
              image: updatedData.thumbnailUrl,
              description: updatedData.description,
            }
          : ev
      )
    );

    setIsSaving(false);
    setEditingEvent(null);
    toast.add({
      title: "Event Updated",
      description: `"${updatedData.title}" has been successfully updated.`,
      type: "success",
    });
  };

  // Handle Delete Success
  const handleDeleteSuccess = () => {
    if (!deletingEvent) return;
    setEvents((prev) => prev.filter((ev) => ev.id !== deletingEvent.id));
    setDeletingEvent(null);
  };

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
          <span className="font-medium text-white">Manage Events</span>
        </nav>

        {/* ── Page Header ── */}
        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* Calendar Icon Box */}
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-[#062416] to-[#031109] text-[#00d99a] shadow-[0_0_25px_rgba(0,217,154,0.18)] sm:size-16">
              <Calendar className="size-7 sm:size-8" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                <span className="text-white">Manage </span>
                <span className="text-[#00d99a]">Events</span>
              </h1>
              <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                View, edit, or delete the events you have created.
              </p>
            </div>
          </div>

          {/* + Create Event Button */}
          <Link
            href="/create-event"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#00e599] px-5 text-sm font-bold text-[#032014] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition hover:bg-[#00f2aa] hover:brightness-105 active:scale-95 sm:self-center"
          >
            <Plus className="size-4 text-[#032014]" strokeWidth={2.5} />
            <span>Create Event</span>
          </Link>
        </div>

        {/* ── Search & Filter Controls Bar ── */}
        <div className="mt-7 rounded-2xl border border-emerald-500/25 bg-[#05180f]/90 p-3 shadow-[0_0_40px_rgba(0,217,154,0.05)] backdrop-blur-md sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                placeholder="Search your events..."
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
                  <option value="Latest" className="bg-[#06180f] text-white">Sort: Latest</option>
                  <option value="Oldest" className="bg-[#06180f] text-white">Sort: Oldest</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Horizontal Event Cards List ── */}
        <div className="mt-6 space-y-4">
          {paginatedEvents.map((ev) => (
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
                {/* Upcoming Badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>Upcoming</span>
                </span>

                {/* Actions row: View, Edit, Delete */}
                <div className="flex items-center gap-2">
                  {/* View */}
                  <Link
                    href={`/upcoming-events/${ev.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-[#082416]/70 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-emerald-400 hover:bg-[#0a311e]"
                  >
                    <Eye className="size-3.5 text-emerald-400" />
                    <span>View</span>
                  </Link>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => setEditingEvent(ev)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-[#082416]/70 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-emerald-400 hover:bg-[#0a311e]"
                  >
                    <Pencil className="size-3.5 text-emerald-400" />
                    <span>Edit</span>
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => setDeletingEvent(ev)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-[#280d0d]/70 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:border-red-400 hover:bg-[#381212]"
                  >
                    <Trash2 className="size-3.5 text-red-400" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {paginatedEvents.length === 0 && (
            <div className="py-16 text-center">
              <Layers className="mx-auto size-12 text-emerald-400/40" />
              <h3 className="mt-3 text-lg font-bold text-white">No events found</h3>
              <p className="mt-1 text-xs text-neutral-400">
                You haven&apos;t created any events matching this filter.
              </p>
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

      {/* ── Edit Modal ── */}
      {editingEvent && (
        <EditEventDetails
          initialValues={{
            title: editingEvent.title,
            category: editingEvent.category,
            date: editingEvent.date,
            time: editingEvent.time,
            location: editingEvent.location,
            thumbnailUrl: editingEvent.image,
            description: editingEvent.description,
          }}
          isSaving={isSaving}
          onClose={() => setEditingEvent(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deletingEvent && (
        <DeleteEventDetails
          eventId={deletingEvent.id}
          eventTitle={deletingEvent.title}
          isOpen={Boolean(deletingEvent)}
          onClose={() => setDeletingEvent(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
