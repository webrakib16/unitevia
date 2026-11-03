"use client";

import { EventsCarousel } from "@/components/Events-Carousel";
import { DEMO_EVENTS, type CommunityEvent } from "@/data/events";

/**
 * Section wrapper for the 3D event carousel.
 *
 * Static gallery: showcases photographs of community service events from the
 * static demo data source (src/data/events.ts) — no API integration.
 */
export function RecentEvents() {
  const events: CommunityEvent[] = DEMO_EVENTS;
  const loading = false;

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
