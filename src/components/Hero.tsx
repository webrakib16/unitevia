import Image from "next/image";
import { ArrowRight, CalendarDays, Heart, Leaf, Plus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Impact statistics ────────────────────────────────────────────────────────
const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Users, value: "1,450+", label: "Active Volunteers" },
  { icon: CalendarDays, value: "180+", label: "Events Completed" },
  { icon: Heart, value: "24,000+", label: "Lives Impacted" },
  { icon: Leaf, value: "100%", label: "Community Driven" },
];

// ─── Custom Category Illustrated SVGs (Exact match to reference image) ────────

function DonationIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-7 sm:size-8">
      {/* Supporting Hands below heart */}
      <path
        d="M6 21 C6 21 8.5 24 13 25 C14 25.2 15 25 16 24 C17 25 18 25.2 19 25 C23.5 24 26 21 26 21 C26 21 24 23 21 24.5 C18 26 14 26 11 24.5 C8 23 6 21 6 21 Z"
        fill="#fbcfe8"
        opacity="0.85"
      />
      <path
        d="M7 20 C9 22 12 23.5 15.5 23.5 C16 23.5 16.5 23.5 17 23.4 C18.5 23.2 20.5 22.2 22 21 C20 22 17.5 22.5 15.5 22.5 C12 22.5 9 21 7 20 Z"
        fill="#f472b6"
      />
      {/* Left wrist/hand */}
      <path
        d="M5 24 C7 24 9.5 22 11.5 20.5 C12.5 19.8 13.5 20 14 20.5 C14.5 21 14 22 13 22.8 C10.5 24.8 8 26 5 26 Z"
        fill="#fbbf24"
      />
      {/* Right wrist/hand */}
      <path
        d="M27 24 C25 24 22.5 22 20.5 20.5 C19.5 19.8 18.5 20 18 20.5 C17.5 21 18 22 19 22.8 C21.5 24.8 24 26 27 26 Z"
        fill="#fbbf24"
      />
      {/* Glossy 3D Red Heart */}
      <path
        d="M16 8 C14.5 5 11 4 8.5 5.5 C5.5 7.3 5 11.5 7.5 14.5 L16 22 L24.5 14.5 C27 11.5 26.5 7.3 23.5 5.5 C21 4 17.5 5 16 8 Z"
        fill="url(#don-heart-grad)"
      />
      {/* Specular Highlight on left lobe */}
      <path
        d="M9.5 6.5 C11 5.5 13.2 6.2 14.2 8 C13.5 7 12 6.5 10.5 7 C9 7.5 8 9 8 10.5 C7.5 9 8.2 7.5 9.5 6.5 Z"
        fill="#ffffff"
        opacity="0.65"
      />
      <defs>
        <linearGradient id="don-heart-grad" x1="16" y1="4" x2="16" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb7185" />
          <stop offset="0.3" stopColor="#e11d48" />
          <stop offset="1" stopColor="#9f1239" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CleanlinessIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-7 sm:size-8">
      {/* Slanted Broom Handle */}
      <line x1="26" y1="5" x2="15" y2="18" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="26" y1="5" x2="22" y2="10" stroke="#bae6fd" strokeWidth="1.2" strokeLinecap="round" />
      {/* Bristle Cap / Tie Band */}
      <ellipse cx="14.5" cy="18.5" rx="3.5" ry="2" fill="#0284c7" transform="rotate(-40 14.5 18.5)" />
      {/* Flared Straw Bristle Head */}
      <path
        d="M13 18 L6 25.5 C5.5 26.2 6.2 27 7 26.8 L16 23 L14 18 Z"
        fill="url(#broom-bristles)"
      />
      {/* Bristle lines */}
      <line x1="12" y1="20" x2="7.5" y2="25.5" stroke="#0369a1" strokeWidth="0.8" opacity="0.6" />
      <line x1="14" y1="20.5" x2="10.5" y2="25" stroke="#0369a1" strokeWidth="0.8" opacity="0.6" />
      <line x1="15" y1="21.5" x2="13.5" y2="24.2" stroke="#0369a1" strokeWidth="0.8" opacity="0.6" />
      {/* Sparkles / Clean glints */}
      <path d="M7 11 L7.8 13.2 L10 14 L7.8 14.8 L7 17 L6.2 14.8 L4 14 L6.2 13.2 Z" fill="#38bdf8" />
      <circle cx="10" cy="9" r="1.2" fill="#bae6fd" />
      <circle cx="21" cy="24" r="1.2" fill="#38bdf8" />
      <defs>
        <linearGradient id="broom-bristles" x1="14" y1="18" x2="8" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.6" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GreeneryIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-7 sm:size-8">
      {/* Soil base */}
      <path d="M10 26 C12 25 15 25 16 25 C17 25 20 25 22 26 C21 27 18 27.5 16 27.5 C14 27.5 11 27 10 26 Z" fill="#15803d" opacity="0.7" />
      {/* Central Stem */}
      <path d="M16 26 C16 20 16 16 16 14" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" />
      {/* Left Leaf */}
      <path
        d="M16 18 C11 18 7 14 7 11 C10 10 14 12 16 16"
        fill="url(#leaf-l-grad)"
      />
      <path d="M16 18 C13 16 10 13.5 8 11.5" stroke="#86efac" strokeWidth="0.8" opacity="0.6" />
      {/* Right Leaf */}
      <path
        d="M16 15 C19 12 23 10 25 11 C26 14 22 18 16 19"
        fill="url(#leaf-r-grad)"
      />
      <path d="M16 16 C19.5 14.5 22.5 13 24 11.8" stroke="#86efac" strokeWidth="0.8" opacity="0.6" />
      {/* Center young bud */}
      <ellipse cx="16" cy="13.5" rx="1.8" ry="2.6" fill="#4ade80" />
      <defs>
        <linearGradient id="leaf-l-grad" x1="7" y1="11" x2="16" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="leaf-r-grad" x1="25" y1="11" x2="16" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86efac" />
          <stop offset="0.5" stopColor="#22c55e" />
          <stop offset="1" stopColor="#166534" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WinterReliefIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-7 sm:size-8">
      {/* Pompom on top */}
      <circle cx="16" cy="7" r="3.2" fill="#93c5fd" />
      <circle cx="15.2" cy="6" r="1.2" fill="#ffffff" opacity="0.7" />
      {/* Beanie Dome */}
      <path
        d="M8 20 C8 12.5 10.5 9 16 9 C21.5 9 24 12.5 24 20 Z"
        fill="url(#beanie-dome)"
      />
      {/* Knit vertical rib lines */}
      <path d="M12 11.5 C11.5 14 11.5 17 11.5 20" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.45" />
      <path d="M16 9.5 C16 13 16 17 16 20" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.45" />
      <path d="M20 11.5 C20.5 14 20.5 17 20.5 20" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.45" />
      {/* Folded Beanie Brim */}
      <rect x="6.5" y="19.5" width="19" height="5" rx="2.5" fill="#1d4ed8" />
      <rect x="6.5" y="19.5" width="19" height="5" rx="2.5" stroke="#60a5fa" strokeWidth="0.8" opacity="0.6" />
      {/* Brim rib tick marks */}
      <line x1="10" y1="20" x2="10" y2="24" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
      <line x1="13" y1="20" x2="13" y2="24" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
      <line x1="16" y1="20" x2="16" y2="24" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
      <line x1="19" y1="20" x2="19" y2="24" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
      <line x1="22" y1="20" x2="22" y2="24" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
      <defs>
        <linearGradient id="beanie-dome" x1="16" y1="9" x2="16" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BloodCampIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-7 sm:size-8">
      {/* Glossy Red Blood Droplet */}
      <path
        d="M16 4.5 C16 4.5 8 13.5 8 18.5 C8 23 11.5 26.5 16 26.5 C20.5 26.5 24 23 24 18.5 C24 13.5 16 4.5 16 4.5 Z"
        fill="url(#blood-drop-grad)"
      />
      {/* Curved Highlight on left */}
      <path
        d="M11.5 17 C11.5 13.5 14 9.5 15.5 7.5 C14.5 9.5 12.8 13 12.8 17 C12.8 19 13.5 20.8 14.5 22 C12.8 20.8 11.5 19 11.5 17 Z"
        fill="#ffffff"
        opacity="0.4"
      />
      {/* White Medical Cross */}
      <rect x="14.2" y="14" width="3.6" height="9" rx="1" fill="#ffffff" />
      <rect x="11.5" y="16.7" width="9" height="3.6" rx="1" fill="#ffffff" />
      <defs>
        <linearGradient id="blood-drop-grad" x1="16" y1="4.5" x2="16" y2="26.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f87171" />
          <stop offset="0.4" stopColor="#dc2626" />
          <stop offset="1" stopColor="#991b1b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FoodAwarenessIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-7 sm:size-8">
      {/* Yellow curved Banana */}
      <path
        d="M18 10 C21 11 25 13 26 17 C26.5 18.5 25.5 19 24 18 C22 16.5 19 14.5 17 14 Z"
        fill="#facc15"
      />
      {/* Red Apple / Tomato */}
      <circle cx="12.5" cy="14.5" r="4.2" fill="#ef4444" />
      <circle cx="11.5" cy="13" r="1.2" fill="#fca5a5" opacity="0.6" />
      {/* Orange Carrot */}
      <path
        d="M18 12 L14 17 L19 16.5 Z"
        fill="#f97316"
      />
      {/* Green Salad Leaf */}
      <path d="M14 9 C15 7 17 8 16 11 C15 10 14 10 14 9 Z" fill="#22c55e" />
      {/* Green Food Bowl */}
      <path
        d="M6 16.5 C6.5 23.5 10.5 25.5 16 25.5 C21.5 25.5 25.5 23.5 26 16.5 Z"
        fill="url(#bowl-grad)"
      />
      {/* Bowl Rim */}
      <ellipse cx="16" cy="16.5" rx="10" ry="2.2" fill="#15803d" />
      <ellipse cx="16" cy="16.3" rx="9" ry="1.5" fill="#4ade80" opacity="0.4" />
      <defs>
        <linearGradient id="bowl-grad" x1="16" y1="16.5" x2="16" y2="25.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16a34a" />
          <stop offset="1" stopColor="#14532d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EducationIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-7 sm:size-8">
      {/* Open Book Base */}
      <path
        d="M6 21 C9 20 13 20 16 22 C19 20 23 20 26 21 L25.5 26 C22.5 25 19 25 16 26.5 C13 25 9.5 25 6.5 26 Z"
        fill="#1e3a8a"
      />
      {/* Book White Pages */}
      <path
        d="M7 20 C10 19 13.5 19.2 16 21 C18.5 19.2 22 19 25 20 L24.5 24.5 C21.8 23.8 18.5 24 16 25.2 C13.5 24 10.2 23.8 7.5 24.5 Z"
        fill="#f8fafc"
      />
      {/* Book page center crease */}
      <line x1="16" y1="21" x2="16" y2="25.2" stroke="#94a3b8" strokeWidth="1" />
      {/* Graduation Cap Mortarboard Diamond */}
      <path
        d="M16 6 L26 11.5 L16 16.5 L6 11.5 Z"
        fill="url(#grad-cap-grad)"
      />
      {/* Cap Skull Under-band */}
      <path
        d="M10.5 14 L10.5 17.5 C10.5 19 13 20 16 20 C19 20 21.5 19 21.5 17.5 L21.5 14 C19.5 15.2 17.5 15.5 16 15.5 C14.5 15.5 12.5 15.2 10.5 14 Z"
        fill="#1e3a8a"
      />
      {/* Cap Top Center Button */}
      <circle cx="16" cy="11.5" r="1.2" fill="#93c5fd" />
      {/* Hanging Tassel */}
      <path d="M16 11.5 L23.5 14.5 L24 18" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="24" cy="18.5" r="1" fill="#38bdf8" />
      <defs>
        <linearGradient id="grad-cap-grad" x1="16" y1="6" x2="16" y2="16.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.6" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── 7 Categories List ────────────────────────────────────────────────────────
const CATEGORIES: { icon: React.ReactNode; label: string }[] = [
  { icon: <DonationIcon />, label: "Donation" },
  { icon: <CleanlinessIcon />, label: "Cleanliness" },
  { icon: <GreeneryIcon />, label: "Greenery" },
  { icon: <WinterReliefIcon />, label: "Winter Relief" },
  { icon: <BloodCampIcon />, label: "Blood Camp" },
  { icon: <FoodAwarenessIcon />, label: "Food Awareness" },
  { icon: <EducationIcon />, label: "Education" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#02130a] min-h-[580px] lg:h-[calc(100svh-72px)] lg:max-h-[760px] xl:max-h-[820px]">
      {/* ── Background Photograph ──
          Positioned to preserve the natural framing from the reference image:
          - Volunteer & elderly woman nicely framed on the right
          - Unitevia banner fully visible on the right edge
          - Golden sunlight filtering through the trees with ample headroom
          - Foreground leaves visible in bottom-left */}
      <div className="absolute inset-0">
        <Image
          src="/reference/hero-reference.png"
          alt="Unitevia community volunteers relief distribution"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-right lg:object-[82%_25%] xl:object-[80%_20%]"
        />
      </div>

      {/* ── Deep Forest-Green Gradient Overlays ──
          Deep emerald dark-green on the left (0% to ~38%) so text is 100% crisp and readable,
          then smoothly feathering out across 38% to 68% so the golden-hour light and subjects shine. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,19,10,0.92)_0%,rgba(2,19,10,0.85)_45%,rgba(2,19,10,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(2,19,10,0.98)_0%,rgba(2,19,10,0.96)_28%,rgba(2,19,10,0.88)_38%,rgba(2,19,10,0.6)_50%,rgba(2,19,10,0.18)_65%,rgba(2,19,10,0)_78%)]" />

      {/* Top subtle vignette under navbar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(2,19,10,0.65)_0%,rgba(2,19,10,0)_100%)]" />

      {/* Bottom ambient shade blending into the bottom wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,rgba(2,19,10,0)_0%,rgba(2,19,10,0.45)_50%,rgba(2,19,10,0.95)_100%)]" />

      {/* ── Main Content Container ── */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-[160px] pt-7 sm:px-8 sm:pt-9 lg:px-10 lg:pb-[145px] lg:pt-11 xl:px-12">
        <div className="max-w-[530px] lg:max-w-[580px]">
          {/* Main Heading */}
          <h1 className="text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] text-white sm:text-[48px] lg:text-[56px] xl:text-[64px]">
            Stronger
            <br />
            <span className="bg-gradient-to-r from-[#00d99a] via-[#00f2aa] to-[#00d99a] bg-clip-text text-transparent">
              Communities
            </span>
            <br />
            <span className="whitespace-nowrap">Brighter Tomorrows</span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[450px] text-[13px] leading-[1.6] text-white/75 sm:text-[14px] lg:text-[14.5px]">
            Create, discover, and join meaningful social development events in your
            neighborhood. From winter relief and food distribution to education,
            healthcare, and environmental initiatives — together we build a kinder,
            stronger society.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5">
            {/* Primary button: solid mint-green pill with dark text and glow */}
            <a
              href="/events"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#00d99a] to-[#00f2aa] px-6 text-[14px] font-semibold text-[#032014] shadow-[0_0_24px_rgba(0,217,154,0.35)] transition hover:brightness-110 sm:text-[14.5px]"
            >
              Explore Upcoming Events
              <ArrowRight className="size-4 shrink-0" strokeWidth={2.5} />
            </a>
            {/* Secondary button: dark-tinted pill with mint-green border */}
            <a
              href="/create-event"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#00d99a]/60 bg-[#032014]/60 px-5 text-[14px] font-semibold text-white shadow-[0_0_15px_rgba(0,217,154,0.1)] transition hover:border-[#00d99a] hover:bg-[#032014]/90 sm:text-[14.5px]"
            >
              <span className="flex size-[18px] items-center justify-center rounded-full border border-white/80">
                <Plus className="size-2.5" strokeWidth={2.5} />
              </span>
              Create Event
            </a>
          </div>

          {/* Impact Statistics — All 4 in ONE single horizontal row on desktop */}
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-4 lg:flex-nowrap lg:gap-x-3.5 xl:gap-x-5">
            {STATS.map(({ icon: Icon, value, label }, index) => (
              <div key={label} className="flex items-center gap-2">
                {index > 0 && (
                  <span
                    className="hidden h-6 w-px bg-white/15 lg:block shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] border border-[#00d99a]/50 bg-[#02180e]/80 text-[#00d99a] shadow-[0_0_10px_rgba(0,217,154,0.12)]">
                  <Icon className="size-[17px]" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-bold leading-none text-white sm:text-[15px]">
                    {value}
                  </span>
                  <span className="mt-1 block text-[10px] leading-none text-white/60 whitespace-nowrap sm:text-[10.5px]">
                    {label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Curved Shape & Category Strip ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" aria-hidden="true">
        {/* SVG Curve rising smoothly from left to right */}
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-36 w-full sm:h-44 lg:h-52"
        >
          <defs>
            <linearGradient id="hero-wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#02160d" stopOpacity="0.97" />
              <stop offset="0.45" stopColor="#031f13" stopOpacity="0.98" />
              <stop offset="1" stopColor="#042617" stopOpacity="0.99" />
            </linearGradient>
            <linearGradient id="hero-wave-deep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#031e13" />
              <stop offset="1" stopColor="#010d06" />
            </linearGradient>
          </defs>

          {/* Secondary background wave for depth */}
          <path
            d="M0 185 C 380 200, 620 150, 880 130 C 1120 115, 1320 95, 1440 85 L1440 200 L0 200 Z"
            fill="url(#hero-wave-deep)"
            opacity="0.8"
          />

          {/* Main curved foreground shape */}
          <path
            d="M0 165 C 380 185, 540 140, 750 110 C 960 80, 1200 65, 1440 60 L1440 200 L0 200 Z"
            fill="url(#hero-wave)"
          />

          {/* Glowing mint-green curve crest */}
          <path
            d="M0 165 C 380 185, 540 140, 750 110 C 960 80, 1200 65, 1440 60"
            fill="none"
            stroke="#00d99a"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className="drop-shadow-[0_0_8px_rgba(0,217,154,0.6)]"
          />
        </svg>

        {/* 7 Category cards — right-aligned on desktop, horizontal scroll on mobile */}
        <div className="pointer-events-auto relative flex items-end gap-2.5 overflow-x-auto px-4 pb-4 pt-4 sm:justify-end sm:gap-3.5 sm:px-8 sm:pb-6 lg:gap-4 lg:px-10 lg:pb-7 xl:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map(({ icon, label }) => (
            <div key={label} className="flex shrink-0 flex-col items-center gap-1.5">
              <span className="flex size-[50px] items-center justify-center rounded-[12px] border border-[#00d99a]/55 bg-[#031d12]/90 shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition hover:scale-105 hover:border-[#00d99a] sm:size-[56px] sm:rounded-[13px] lg:size-[60px]">
                {icon}
              </span>
              <span className="whitespace-nowrap text-[10.5px] font-medium text-white/90 text-center sm:text-[11px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
