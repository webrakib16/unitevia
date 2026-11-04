"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Droplet,
  Heart,
  MapPin,
  Recycle,
  Shirt,
  Sparkles,
  Sprout,
  Utensils,
} from "lucide-react";

interface GalleryEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const DEFAULT_GALLERY_EVENTS: GalleryEvent[] = [
  {
    id: "1",
    title: "Winter Clothes Distribution",
    category: "Winter Relief",
    date: "Sat, Dec 20, 2026",
    location: "Rajshahi, Bangladesh",
    description: "Distribute warm clothes to underprivileged people in our community.",
    image: "/assets/upcoming-events/blanket-distribution.jpg",
  },
  {
    id: "2",
    title: "Blanket Distribution for the Needy",
    category: "Donation",
    date: "Sun, Nov 16, 2026",
    location: "Mohammadpur, Dhaka",
    description: "A blanket distribution drive to support homeless and underprivileged families.",
    image: "/assets/events/blanket-distribution.jpg",
  },
  {
    id: "3",
    title: "Community Blood Donation Camp",
    category: "Blood Camp",
    date: "Fri, Nov 20, 2026",
    location: "Rajshahi Medical College",
    description: "A community blood donation program to support local hospitals and save lives.",
    image: "/assets/events/health-eye-camp.jpg",
  },
  {
    id: "4",
    title: "Education Support for Children",
    category: "Education",
    date: "Wed, Nov 25, 2026",
    location: "Chapainawabganj, Bangladesh",
    description: "Provide educational materials and learning support to deserving students.",
    image: "/assets/events/winter-clothes-distribution.jpg",
  },
  {
    id: "5",
    title: "Urban Tree Plantation Drive",
    category: "Greenery",
    date: "Tue, Dec 1, 2026",
    location: "Rajshahi, Bangladesh",
    description: "A tree plantation initiative to make our community greener and healthier.",
    image: "/assets/events/tree-plantation-drive.jpg",
  },
  {
    id: "6",
    title: "Community Clean-Up Campaign",
    category: "Cleanliness",
    date: "Sat, Dec 6, 2026",
    location: "Dhanmondi Lake, Dhaka",
    description: "A community cleanup drive to keep our surroundings clean and healthy.",
    image: "/assets/events/lake-cleanup-campaign.jpg",
  },
];

function CategoryBadge({ category }: { category: string }) {
  const norm = category.toLowerCase();
  if (norm.includes("winter")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-950/80 px-2.5 py-1 text-[11px] font-semibold text-sky-300 backdrop-blur-md">
        <Shirt className="size-3 text-sky-400" />
        <span>Winter Relief</span>
      </span>
    );
  }
  if (norm.includes("blood")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/80 px-2.5 py-1 text-[11px] font-semibold text-rose-300 backdrop-blur-md">
        <Droplet className="size-3 fill-rose-500 text-rose-500" />
        <span>Blood Camp</span>
      </span>
    );
  }
  if (norm.includes("donat")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-950/80 px-2.5 py-1 text-[11px] font-semibold text-rose-300 backdrop-blur-md">
        <Heart className="size-3 fill-rose-400 text-rose-400" />
        <span>Donation</span>
      </span>
    );
  }
  if (norm.includes("edu")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/80 px-2.5 py-1 text-[11px] font-semibold text-purple-300 backdrop-blur-md">
        <BookOpen className="size-3 text-purple-400" />
        <span>Education</span>
      </span>
    );
  }
  if (norm.includes("clean")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/80 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
        <Recycle className="size-3 text-amber-400" />
        <span>Cleanliness</span>
      </span>
    );
  }
  if (norm.includes("green") || norm.includes("plant")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
        <Sprout className="size-3 text-emerald-400" />
        <span>Greenery</span>
      </span>
    );
  }
  if (norm.includes("food")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-950/80 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
        <Utensils className="size-3 text-amber-400" />
        <span>Food Drive</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
      <Sparkles className="size-3 text-emerald-400" />
      <span>{category}</span>
    </span>
  );
}

function formatCardDate(dateStr: string) {
  if (!dateStr) return "Upcoming Date";
  // If already formatted like "Sat, Dec 20, 2026"
  if (dateStr.includes(",")) return dateStr;
  try {
    const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(d);
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export function RecentEventGallery() {
  const [events, setEvents] = useState<GalleryEvent[]>(DEFAULT_GALLERY_EVENTS);

  // Fetch live backend events from MongoDB via Express API
  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:5000/upcoming-events?limit=6")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Keep only future events, show the 6 soonest upcoming by event date
          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);

          const candidates = data
            .map((item) => {
              const d = new Date(item.date);
              return {
                item,
                // Unknown dates sort last
                time: Number.isNaN(d.getTime())
                  ? Number.MAX_SAFE_INTEGER
                  : d.getTime(),
              };
            })
            .filter((entry) => entry.time >= startOfToday.getTime())
            .sort((a, b) => a.time - b.time)
            .slice(0, 6);

          const mapped: GalleryEvent[] = candidates.map(({ item }, index) => ({
            id: String(item._id || item.id || `gallery-${index}`),
            title: item.title || "Community Event",
            category: item.category || "General",
            date: formatCardDate(item.date),
            location: item.location || "Bangladesh",
            description: item.description || "Join us in making a difference in the community.",
            image: item.image || "/assets/events/blanket-distribution.jpg",
          }));

          setEvents(mapped);
        }
      })
      .catch((err) => {
        console.log("Using default gallery events:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      {/* ── Ambient Glows ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div className="flex-1 text-center md:text-left">
            {/* Title with decorative horizontal accent lines */}
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <div className="hidden h-0.5 w-10 rounded-full bg-gradient-to-r from-transparent to-[#00d99a] sm:block" />
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                <span className="text-white">Recent Upcoming </span>
                <span className="text-[#00d99a]">Events</span>
              </h2>
              <div className="hidden h-0.5 w-10 rounded-full bg-gradient-to-l from-transparent to-[#00d99a] sm:block" />
            </div>

            <p className="mt-2 text-xs text-neutral-300 sm:text-sm">
              Latest community events happening soon in your area. Get involved today.
            </p>
          </div>

          {/* View All Events Link */}
          <Link
            href="/upcoming-events"
            className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#00d99a] transition hover:text-emerald-300 sm:text-sm"
          >
            <span>View All Events</span>
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── 6-Card Grid (3 columns x 2 rows) ── */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {events.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#06180f]/95 p-3.5 shadow-[0_0_30px_rgba(0,217,154,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00d99a]/50 hover:shadow-[0_0_35px_rgba(0,217,154,0.12)] sm:p-4"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-emerald-500/20 bg-[#03140b]">
                <Image
                  src={event.image || "/assets/events/blanket-distribution.jpg"}
                  alt={event.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06180f]/90 via-transparent to-transparent" />

                {/* Top-Left Category Badge */}
                <div className="absolute left-3 top-3">
                  <CategoryBadge category={event.category} />
                </div>

                {/* Bottom-Left Date Badge */}
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#03140b]/85 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                  <CalendarDays className="size-3.5 text-[#00d99a]" />
                  <span>{event.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col pt-4">
                <h3 className="line-clamp-1 text-base font-bold text-white transition group-hover:text-[#00d99a] sm:text-lg">
                  {event.title}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-300">
                  <MapPin className="size-3.5 shrink-0 text-neutral-400" />
                  <span className="truncate">{event.location}</span>
                </div>

                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                  {event.description}
                </p>

                {/* Bottom Action: View Event Button */}
                <div className="mt-5 pt-1">
                  <Link
                    href={`/upcoming-events/${event.id}`}
                    className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00d99a] text-xs font-bold text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.25)] transition hover:bg-[#00f2aa] hover:brightness-105 active:scale-95 sm:text-sm"
                  >
                    <span>View Event</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default RecentEventGallery;
