import { ChartColumnIncreasing, Heart, MapPin, ShieldCheck, UserPlus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; filled?: boolean; title: string; description: string }[] = [
  {
    icon: Users,
    title: "Create & Organize Events",
    description:
      "Easily create social development events like winter clothing distribution, education support, or community cleanups.",
  },
  {
    icon: UserPlus,
    title: "Join Meaningful Causes",
    description:
      "Discover upcoming events in your area and join to contribute your time, skills, or resources.",
  },
  {
    icon: MapPin,
    filled: true,
    title: "Local Community Impact",
    description:
      "Focus on real problems in your neighborhood and create a positive change where it matters most.",
  },
  {
    icon: Heart,
    filled: true,
    title: "Bring Good People Together",
    description:
      "Connect with like-minded individuals who care about society and want to make a difference.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Trusted Platform",
    description:
      "Verified events, transparent information, and a secure community for genuine social work.",
  },
  {
    icon: ChartColumnIncreasing,
    title: "Track Real Impact",
    description:
      "See the number of volunteers, events completed, and the lives you're helping to improve.",
  },
];

const DOTS = [
  { left: "3%", top: "18%" },
  { left: "10%", top: "48%" },
  { left: "6%", top: "78%" },
  { left: "40%", top: "4%" },
  { left: "63%", top: "6%" },
  { left: "88%", top: "14%" },
  { left: "94%", top: "42%" },
  { left: "97%", top: "72%" },
] as const;

function Burst({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 32"
      fill="none"
      className={`hidden h-6 w-4 shrink-0 text-emerald-400 sm:block md:h-8 md:w-5 ${flip ? "-scale-x-100" : ""}`}
    >
      <path d="M18 5 C 12 9, 8 12, 3 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 16 C 12 16, 7 16, 1 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 27 C 12 23, 8 20, 3 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 size-[500px] rounded-full border border-emerald-400/10" />
      <div className="pointer-events-none absolute -right-44 bottom-0 size-[500px] rounded-full border border-emerald-400/10" />
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
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
          <Burst />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Unitevia?
            </span>
          </h2>
          <Burst flip />
        </div>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-300 md:mt-5 md:text-lg">
          Unitevia makes it easy for caring people to come together, create meaningful
          events, and make a real impact in their communities.
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, filled, title, description }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0a130e] p-6 transition hover:border-emerald-400/40"
            >
              {/* Decorative glow + corner dot */}
              <div className="pointer-events-none absolute -bottom-10 -left-8 size-28 rounded-full bg-emerald-500/10 blur-2xl" />
              <span
                aria-hidden="true"
                className="absolute right-3.5 top-3.5 size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
              />
              <span className="flex size-12 items-center justify-center rounded-xl border border-emerald-400/30 bg-gradient-to-b from-emerald-400/25 to-emerald-600/5 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                <Icon className={`size-6 ${filled ? "fill-current" : ""}`} aria-hidden="true" />
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
