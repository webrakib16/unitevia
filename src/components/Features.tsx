import { CalendarDays, Compass, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  /** Tile + icon color classes for this feature's accent. */
  tileClass: string;
  iconClass: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Users,
    tileClass: "border-emerald-400/30 bg-gradient-to-b from-emerald-400/25 to-emerald-600/5 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    iconClass: "text-emerald-300",
    title: "Community-Led Drives",
    description:
      "People from your neighborhood can create and organize events for social causes, volunteer initiatives, and local support.",
  },
  {
    icon: CalendarDays,
    tileClass: "border-violet-400/30 bg-gradient-to-b from-violet-400/25 to-violet-600/5 shadow-[0_0_20px_rgba(167,139,250,0.25)]",
    iconClass: "text-violet-300",
    title: "One-Click Participation",
    description:
      "Join events with just one click and engage with causes you care about in your community.",
  },
  {
    icon: ShieldCheck,
    tileClass: "border-emerald-400/30 bg-gradient-to-b from-emerald-400/25 to-emerald-600/5 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    iconClass: "text-emerald-300",
    title: "Creator Controls",
    description:
      "Easily manage and customize your events with simple tools and full control.",
  },
  {
    icon: Compass,
    tileClass: "border-amber-300/30 bg-gradient-to-b from-amber-300/25 to-amber-500/5 shadow-[0_0_20px_rgba(252,211,77,0.25)]",
    iconClass: "text-amber-300",
    title: "Upcoming Only Discovery",
    description:
      "Explore upcoming events near you and never miss a chance to be part of something meaningful.",
  },
];

const DOTS = [
  { left: "6%", top: "30%" },
  { left: "12%", top: "72%" },
  { left: "30%", top: "10%" },
  { left: "55%", top: "16%" },
  { left: "78%", top: "8%" },
  { left: "92%", top: "38%" },
  { left: "96%", top: "68%" },
] as const;

export function Features() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 -top-24 size-[460px] rounded-full border border-emerald-400/10" />
      <div className="pointer-events-none absolute -left-40 bottom-[-6rem] size-[460px] rounded-full border border-emerald-400/10" />
      {DOTS.map((dot, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute size-1.5 rounded-full bg-emerald-400"
          style={{ left: dot.left, top: dot.top, opacity: 0.5 + (i % 3) * 0.2 }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Heading */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 md:text-sm">
          Platform Features
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Built for{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            Grassroots Action
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-300 md:mt-5 md:text-lg">
          A platform designed to connect people, organize events, and create real community impact.
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, tileClass, iconClass, title, description }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0d1811] to-[#0a130e] p-6 transition hover:border-emerald-400/40"
            >
              {/* Decorative glow + corner dot */}
              <div className="pointer-events-none absolute -bottom-10 -left-8 size-28 rounded-full bg-emerald-500/10 blur-2xl" />
              <span
                aria-hidden="true"
                className="absolute right-3.5 top-3.5 size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
              />
              <span className={`flex size-12 items-center justify-center rounded-xl border ${tileClass}`}>
                <Icon className={`size-6 ${iconClass}`} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white md:text-xl">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
