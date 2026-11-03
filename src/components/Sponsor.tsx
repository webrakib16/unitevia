import { Asterisk, Box, Circle, Hexagon, Layers, Menu, Sparkle, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Sponsor = {
  name: string;
  icon: LucideIcon;
  /** Classes for the logo mark holder (background/color). */
  markClass: string;
  /** Classes for the icon itself (size/stroke). */
  iconClass: string;
};

const SPONSORS: Sponsor[] = [
  {
    name: "Boltshift",
    icon: Zap,
    markClass: "rounded-full bg-blue-600 text-white shadow-[0_0_14px_rgba(37,99,235,0.5)]",
    iconClass: "size-5 fill-current",
  },
  { name: "Lightbox", icon: Box, markClass: "text-teal-300", iconClass: "size-8" },
  { name: "GlobalBank", icon: Hexagon, markClass: "text-indigo-500 fill-indigo-500/40", iconClass: "size-8" },
  { name: "FeatherDev", icon: Layers, markClass: "text-green-400 fill-green-400/25", iconClass: "size-8" },
  { name: "Acme Corp", icon: Sparkle, markClass: "text-white fill-white", iconClass: "size-8" },
  { name: "Polymath", icon: Circle, markClass: "text-blue-600 stroke-[3.5]", iconClass: "size-8" },
  { name: "Nietzsche", icon: Asterisk, markClass: "text-orange-500", iconClass: "size-8" },
  { name: "Epicurious", icon: Menu, markClass: "text-violet-500 stroke-[3]", iconClass: "size-8" },
];

const DOTS = [
  { left: "4%", top: "12%" },
  { left: "9%", top: "60%" },
  { left: "20%", top: "24%" },
  { left: "33%", top: "80%" },
  { left: "52%", top: "8%" },
  { left: "70%", top: "82%" },
  { left: "84%", top: "16%" },
  { left: "95%", top: "52%" },
] as const;

export function Sponsor() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute -right-16 top-6 size-56 rounded-full bg-[radial-gradient(circle_at_32%_32%,rgba(52,211,153,0.6),rgba(6,95,70,0.35)_45%,rgba(5,10,8,0)_72%)] opacity-90 blur-[2px]" />
      <div className="pointer-events-none absolute -left-24 bottom-[-3rem] size-64 rounded-full bg-[radial-gradient(circle_at_32%_32%,rgba(52,211,153,0.55),rgba(6,95,70,0.3)_45%,rgba(5,10,8,0)_72%)] opacity-90 blur-[2px]" />
      <div className="pointer-events-none absolute -left-32 -top-32 size-[420px] rounded-full border border-emerald-400/10" />
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
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Our Official{" "}
          <span className="relative inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent">
            Sponsors
            <svg
              aria-hidden="true"
              viewBox="0 0 480 24"
              fill="none"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full md:-bottom-3 md:h-4"
            >
              <defs>
                <linearGradient id="sponsor-underline" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="rgba(52,211,153,0)" />
                  <stop offset="0.15" stopColor="#34d399" />
                  <stop offset="0.85" stopColor="#6ee7b7" />
                  <stop offset="1" stopColor="rgba(110,231,183,0)" />
                </linearGradient>
              </defs>
              <path
                d="M6 16 C 140 24, 350 2, 474 10"
                stroke="url(#sponsor-underline)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-300 md:mt-5 md:text-lg">
          We are grateful to our partners and sponsors who support our mission
          and help us create a stronger, kinder, and more compassionate community.
        </p>

        {/* Sponsor cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {SPONSORS.map(({ name, icon: Icon, markClass, iconClass }) => (
            <div
              key={name}
              className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0a130e] px-6 py-5 transition hover:border-emerald-400/40 hover:bg-[#0d1811]"
            >
              <span
                aria-hidden="true"
                className="absolute right-3 top-2.5 size-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
              />
              <span className={`flex size-9 shrink-0 items-center justify-center ${markClass}`}>
                <Icon className={`shrink-0 ${iconClass}`} aria-hidden="true" />
              </span>
              <span className="truncate text-base font-semibold text-white md:text-lg">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
