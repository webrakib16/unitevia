"use client";

import { useEffect, useState } from "react";
import { EventsCarousel } from "@/components/Events-Carousel";
import type { CommunityEvent } from "@/data/events";

/**
 * Section wrapper for the 3D event carousel.
 *
 * Dynamically fetches the first 6 events created in the database via the API
 * (http://localhost:5000/upcoming-events). If no events exist yet, an empty
 * card slot is displayed until events are created.
 */
export function RecentEvents() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:5000/upcoming-events")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          // Take the first 6 created events
          const mapped: CommunityEvent[] = data.slice(0, 6).map((item, index) => ({
            id: item._id || item.id || index + 1,
            slug: item.slug || `event-${item._id || index + 1}`,
            title: item.title || "Community Event",
            category: item.category || "General",
            image: item.image || "/assets/events/blanket-distribution.jpg",
            date: item.date || "",
            location: item.location || "Community Location",
            description: item.description || "Community event initiative.",
            organizer: item.email || item.organizer || "Community Organizer",
          }));
          setEvents(mapped);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch events for past gallery:", err?.message);
        if (isMounted) setEvents([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

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
