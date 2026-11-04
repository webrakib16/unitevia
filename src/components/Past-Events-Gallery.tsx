"use client";

import { useEffect, useState } from "react";
import { EventsCarousel } from "@/components/Events-Carousel";
import { DEMO_EVENTS, type CommunityEvent } from "@/data/events";

/**
 * Section wrapper for the 3D event carousel.
 * Loads live event data on initial mount, handling loading and error states,
 * and falling back gracefully to validated demo events.
 */
export function RecentEvents() {
  const [events, setEvents] = useState<CommunityEvent[]>(DEMO_EVENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/upcoming-events");
        if (!res.ok) throw new Error("Network error fetching events");
        const data = await res.json();

        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const mapped: CommunityEvent[] = data.map((item, index) => ({
            id: item._id || item.id || index + 1,
            _id: String(item._id || item.id || `gallery-event-${index}`),
            slug: item.slug || `event-${index}`,
            title: item.title || "Community Event",
            category: item.category || "Food Drive",
            image: item.image || item.thumbnailUrl || "/assets/banner.jpg",
            date: item.date || "Upcoming",
            location: item.location || "Bangladesh",
            description: item.description || "Community social initiative.",
            organizer: item.organizer || item.organizerEmail || "Community Team",
          }));
          if (isMounted) setEvents(mapped);
        } else {
          if (isMounted) setEvents(DEMO_EVENTS);
        }
      } catch (err) {
        if (isMounted) {
          console.log("Gallery initial data fetch failed, using fallback:", err instanceof Error ? err.message : String(err));
          setEvents(DEMO_EVENTS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -left-40 -top-24 size-[460px] rounded-full border border-emerald-400/10" />
      <div className="pointer-events-none absolute -right-40 bottom-[-6rem] size-[460px] rounded-full border border-emerald-400/10" />

      <h2 className="relative z-10 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        Our{" "}
        <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
          Impact in Action
        </span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-neutral-300 md:mt-5 md:text-lg">
        Explore the moments, memories, and milestones from our completed community events and social initiatives.
      </p>

      <div className="relative z-10 mt-10 lg:mt-14 [overflow-x:clip]">
        <EventsCarousel events={events} loading={loading} />
      </div>
    </section>
  );
}
