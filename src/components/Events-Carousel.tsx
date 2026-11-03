"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  MapPin,
  Plus,
  Sprout,
  Stethoscope,
  Utensils,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CommunityEvent } from "@/data/events";
import { cn } from "@/lib/utils";

interface EventsCarouselProps {
  events: CommunityEvent[];
  loading?: boolean;
}

const CATEGORY_BADGE: Record<string, { icon: LucideIcon; badgeClass: string }> = {
  "Food Drive": { icon: Utensils, badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30" },
  "Food Awareness": { icon: Utensils, badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30" },
  Donation: { icon: Heart, badgeClass: "bg-rose-500/15 text-rose-300 border-rose-400/30" },
  "Winter Relief": { icon: Heart, badgeClass: "bg-blue-500/15 text-blue-300 border-blue-400/30" },
  "Blood Camp": { icon: Heart, badgeClass: "bg-rose-500/15 text-rose-300 border-rose-400/30" },
  Education: { icon: Leaf, badgeClass: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
  Greenery: { icon: Sprout, badgeClass: "bg-lime-500/15 text-lime-300 border-lime-400/30" },
  Plantation: { icon: Sprout, badgeClass: "bg-lime-500/15 text-lime-300 border-lime-400/30" },
  Cleanup: { icon: Leaf, badgeClass: "bg-teal-500/15 text-teal-300 border-teal-400/30" },
  "Health Camp": { icon: Stethoscope, badgeClass: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
  Healthcare: { icon: Stethoscope, badgeClass: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
};

function safeFormatDate(dateStr: string) {
  if (!dateStr) return "Upcoming Event";
  if (/[a-zA-Z]/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat("en-US", {
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

/** Placement for |offset| slots: 1 = beside the center, 2 = outer, 0 = center. */
const SLOTS: Record<0 | 1 | 2, { x: number; rotateY: number; scale: number; opacity: number; zIndex: number }> = {
  0: { x: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 30 },
  1: { x: 68, rotateY: -14, scale: 0.86, opacity: 0.75, zIndex: 20 },
  2: { x: 146, rotateY: -26, scale: 0.72, opacity: 0.4, zIndex: 10 },
};

export function EventsCarousel({ events, loading = false }: EventsCarouselProps) {
  const [active, setActive] = useState(0);
  // Visible slots: 5 desktop / 3 tablet / 1 mobile. SSR default = desktop (5).
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    const compute = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setVisible(5);
      else if (window.matchMedia("(max-width: 639px)").matches) setVisible(1);
      else setVisible(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const count = events.length;

  // If there is no data, render an empty placeholder card
  if (count === 0) {
    return (
      <div className="relative mx-auto flex h-110 w-full max-w-6xl items-center justify-center sm:h-107.5 lg:h-[480px]">
        <div className="w-[300px] select-none rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0e1a13] to-[#0a130e] p-6 text-center shadow-[0_15px_40px_-15px_rgba(0,0,0,0.7)] sm:w-[340px]">
          <div className="flex aspect-[16/10] w-full flex-col items-center justify-center rounded-xl border border-dashed border-emerald-500/30 bg-[#05140b]/60">
            <CalendarDays className="size-10 text-emerald-400/60" />
            <p className="mt-2 text-xs font-medium text-emerald-300/70">
              {loading ? "Loading events..." : "No events available yet"}
            </p>
          </div>
          <div className="mt-5 text-center">
            <h3 className="text-lg font-semibold text-white">Empty Gallery</h3>
            <p className="mt-1 text-xs text-neutral-400">
              Create an event using the form to showcase it here in the gallery.
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                href="/create-event"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-4 py-2 text-xs font-semibold text-[#04150c] shadow-[0_0_15px_rgba(16,185,129,0.3)] transition hover:brightness-110"
              >
                <Plus className="size-3.5" />
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signed loop offset of card i relative to the active card (wraps around, e.g. −2…+3 for 6 cards).
  const half = Math.floor(visible / 2);
  const offsetOf = (i: number) => {
    if (count <= 1) return 0;
    let o = (((i - active) % count) + count) % count;
    if (o > count / 2) o -= count;
    return o;
  };

  const go = (dir: 1 | -1) => {
    if (count <= 1) return;
    setActive((a) => (((a + dir) % count) + count) % count);
  };

  return (
    <div className="relative">
      {/* 3D stage */}
      <div className="relative mx-auto h-110 w-full max-w-6xl perspective-[1600px] sm:h-107.5 lg:h-[480px]">
        {events.map((event, i) => {
          const offset = offsetOf(i);
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const hidden = absOffset > half; // off-stage card (only the 6th on desktop)
          const slot = SLOTS[(absOffset > 2 ? 2 : absOffset) as 0 | 1 | 2];
          const dir = offset === 0 ? 0 : offset < 0 ? -1 : 1;
          const transform = `translate(-50%, -50%) translateX(${dir * slot.x}%) rotateY(${-dir * slot.rotateY}deg) scale(${slot.scale})`;
          const { icon: CategoryIcon, badgeClass } =
            CATEGORY_BADGE[event.category] ?? {
              icon: Sprout,
              badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
            };

          return (
            <div
              key={event.id}
              role="button"
              tabIndex={isActive ? undefined : 0}
              aria-label={isActive ? undefined : `Show ${event.title}`}
              onClick={() => !isActive && setActive(i)}
              onKeyDown={(e) => {
                if (!isActive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              className={cn(
                "absolute left-1/2 top-1/2 w-[290px] cursor-pointer select-none rounded-2xl border transition-all duration-500 ease-out will-change-transform sm:w-[330px]",
                isActive
                  ? "cursor-default border-emerald-400/60 bg-gradient-to-b from-[#0e1a13] to-[#0a130e] shadow-[0_25px_60px_-15px_rgba(16,185,129,0.35)]"
                  : "border-emerald-500/20 bg-gradient-to-b from-[#0b140f] to-[#090f0b] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.7)] hover:border-emerald-400/40",
                hidden && !isActive && "pointer-events-none",
              )}
              style={{ transform, opacity: hidden ? 0 : slot.opacity, zIndex: hidden ? 0 : slot.zIndex }}
            >
              {/* Cover image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={event.image || "/assets/events/blanket-distribution.jpg"}
                  alt={event.title}
                  fill
                  unoptimized
                  sizes="(max-width: 639px) 90vw, 340px"
                  className={cn(
                    "object-cover transition-opacity duration-500",
                    !isActive && "opacity-80",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a130e] via-transparent to-transparent" />
                {CategoryIcon && (
                  <span
                    className={cn(
                      "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm",
                      badgeClass,
                    )}
                  >
                    <CategoryIcon className="size-3.5" aria-hidden="true" />
                    {event.category}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-300/90">
                  <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
                  {safeFormatDate(event.date)}
                </p>
                <h3
                  className={cn(
                    "mt-1.5 font-semibold text-white",
                    isActive ? "text-lg sm:text-xl" : "text-base sm:text-lg",
                  )}
                >
                  {event.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-200/70">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{event.location}</span>
                </p>
                <p
                  className={cn(
                    "mt-2 text-[13px] leading-relaxed text-neutral-400 transition-opacity duration-500",
                    !isActive && "opacity-70",
                  )}
                >
                  {event.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-emerald-500/15 pt-3">
                  <p className="flex min-w-0 items-center gap-1.5 text-xs text-neutral-400">
                    <Users className="size-3.5 shrink-0 text-emerald-300/80" aria-hidden="true" />
                    <span className="truncate">{event.organizer || "Community Organizer"}</span>
                  </p>
                  {isActive && (
                    <Link
                      href={`/upcoming-events/${event.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-4 py-1.5 text-xs font-semibold text-[#04150c] transition hover:brightness-110"
                    >
                      View Event
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Desktop / tablet side arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous event"
              onClick={() => go(-1)}
              className="absolute left-1 top-1/2 z-40 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-500/30 bg-[#0b140f]/80 text-emerald-300 backdrop-blur transition hover:border-emerald-400/60 hover:bg-[#0f1a14] sm:left-3 md:flex"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next event"
              onClick={() => go(1)}
              className="absolute right-1 top-1/2 z-40 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-500/30 bg-[#0b140f]/80 text-emerald-300 backdrop-blur transition hover:border-emerald-400/60 hover:bg-[#0f1a14] sm:right-3 md:flex"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Mobile carousel arrows */}
      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            aria-label="Previous event"
            onClick={() => go(-1)}
            className="flex size-10 items-center justify-center rounded-full border border-emerald-500/30 bg-[#0b140f] text-emerald-300 transition hover:border-emerald-400/60"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next event"
            onClick={() => go(1)}
            className="flex size-10 items-center justify-center rounded-full border border-emerald-500/30 bg-[#0b140f] text-emerald-300 transition hover:border-emerald-400/60"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Dots (all breakpoints) */}
      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {events.map((event, i) => (
            <button
              key={event.id}
              type="button"
              aria-label={`Go to ${event.title}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-emerald-400" : "w-1.5 bg-emerald-500/30 hover:bg-emerald-500/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
