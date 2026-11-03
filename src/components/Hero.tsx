"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Heart, MapPin, Plus, Users } from "lucide-react";

const STATS = [
  { icon: Users, value: "1,240+", label: "Active Members" },
  { icon: CalendarDays, value: "320+", label: "Events Organized" },
  { icon: Heart, value: "5,600+", label: "People Helped" },
  { icon: MapPin, value: "28+", label: "Communities" },
];

const SATELLITE_NODES = [
  {
    title: "Winter Clothing\nDistribution",
    image: "/assets/winter-clothing-distribution.jpg",
    className: "lg:top-[22px] lg:left-[345px] xl:top-[25px] xl:left-[390px]",
  },
  {
    title: "Blood\nDonation",
    image: "/assets/blood-donation.jpg",
    className: "lg:top-[120px] lg:left-[415px] xl:top-[135px] xl:left-[470px]",
  },
  {
    title: "Education\nSupport",
    image: "/assets/education-support.jpg",
    className: "lg:top-[245px] lg:left-[445px] xl:top-[265px] xl:left-[505px]",
  },
  {
    title: "Green\nInitiatives",
    image: "/assets/green-initiatives.jpg",
    className: "lg:top-[370px] lg:left-[415px] xl:top-[395px] xl:left-[470px]",
  },
  {
    title: "Community\nCleanliness",
    image: "/assets/community-cleanliness.jpg",
    className: "lg:top-[468px] lg:left-[345px] xl:top-[505px] xl:left-[390px]",
  },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#040e08] min-h-[760px] lg:min-h-[850px] xl:min-h-[900px]">
      {/* ── ONE continuous full-width mountain background ── */}
      <div className="absolute inset-0">
        <Image
          src="/assets/banner.jpg"
          alt="Mountain forest landscape"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── Uniform subtle dark overlay (mountain visible throughout, no split, no panel) ── */}
      <div className="pointer-events-none absolute inset-0 bg-black/[0.45] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.50)_32%,rgba(0,0,0,0.32)_58%,rgba(0,0,0,0.16)_82%,rgba(0,0,0,0.08)_100%)]" />

      {/* Soft top vignette for navbar blending */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Bottom atmospheric fade to page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050a08] via-[#050a08]/50 to-transparent" />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pb-12 pt-28 sm:px-6 sm:pt-32 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:pb-16 lg:pt-36 xl:gap-12">

        {/* ════ LEFT COLUMN ════ */}
        <div className="max-w-xl lg:max-w-[520px] xl:max-w-[560px] shrink-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-sm sm:text-sm">
            <Users className="size-4 text-[#00d99a] shrink-0" />
            <span>Social Development &amp; Community Events Platform</span>
          </div>

          {/* Heading: Exactly 2 lines on desktop, serif font */}
          <h1 className="mt-6 font-serif font-bold text-[38px] leading-[1.12] tracking-tight text-white sm:text-[48px] lg:text-[52px] xl:text-[58px]">
            <span className="block whitespace-nowrap">Together For A</span>
            <span className="block mt-1 font-serif italic font-bold bg-gradient-to-r from-[#00d99a] via-[#22c55e] to-[#00f2aa] bg-clip-text text-transparent whitespace-nowrap">
              Brighter Tomorrow
            </span>
          </h1>

          {/* Green swoosh underline */}
          <svg
            viewBox="0 0 300 16"
            fill="none"
            className="mt-1 h-3.5 w-56 sm:w-64 drop-shadow-[0_0_6px_rgba(0,217,154,0.6)]"
            aria-hidden="true"
          >
            <path
              d="M4 11 C 80 2, 220 2, 296 13"
              stroke="#00d99a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Description */}
          <p className="mt-5 max-w-[450px] text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
            Create, discover, and join meaningful community events — from
            winter clothing distribution to blood donation, education,
            healthcare, support, and more.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-full bg-[#00d99a] px-5 py-3 text-sm font-bold text-[#031a0f] transition hover:bg-[#00f2aa] active:scale-95 sm:px-6 sm:py-3.5"
            >
              <CalendarDays className="size-4" />
              <span>Explore Upcoming Events</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10 active:scale-95 sm:px-6 sm:py-3.5"
            >
              <Plus className="size-4 text-[#00d99a]" strokeWidth={2.5} />
              <span>Create Event</span>
            </Link>
          </div>

          {/* Statistics row: All 4 in ONE horizontal row */}
          <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-4 gap-2 sm:gap-4 lg:gap-5 max-w-[520px] xl:max-w-[560px]">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-start">
                <Icon className="size-5 text-[#00d99a]" strokeWidth={2} />
                <span className="mt-2 text-lg sm:text-xl xl:text-2xl font-bold tracking-tight text-white leading-tight">
                  {value}
                </span>
                <span className="mt-1 text-[11px] sm:text-xs text-neutral-400 font-medium whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ════ RIGHT COLUMN — Orbital circle composition ════ */}
        <div className="relative mt-10 flex items-center justify-center lg:mt-0 lg:flex-1">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute size-[400px] rounded-full bg-emerald-500/8 blur-[80px] lg:size-[460px]" />

          {/* ── Desktop orbital layout (lg+) ── */}
          <div className="hidden lg:block relative w-[580px] xl:w-[660px] h-[550px] xl:h-[600px]">

            {/* Central circle — slightly increased size */}
            <div className="absolute left-0 xl:left-2 top-1/2 -translate-y-1/2 size-[350px] lg:size-[370px] xl:size-[410px] rounded-full overflow-hidden ring-[3.5px] ring-[#00d99a] shadow-[0_0_35px_rgba(0,217,154,0.3)] z-10">
              <Image
                src="/assets/Img.jpg"
                alt="Unitevia volunteer helping elderly person with winter clothing"
                fill
                priority
                unoptimized
                className="object-cover object-[55%_30%]"
              />
            </div>

            {/* SVG connecting arc and dots */}
            <svg
              className="pointer-events-none absolute inset-0 size-full overflow-visible z-[5]"
              viewBox="0 0 660 600"
              fill="none"
              aria-hidden="true"
            >
              {/* C-shaped arc to the right of the central circle */}
              <path
                d="M 372 50 C 530 150, 530 450, 372 540"
                stroke="#00d99a"
                strokeWidth="1.8"
                strokeOpacity="0.5"
                className="drop-shadow-[0_0_6px_rgba(0,217,154,0.5)]"
              />
              {/* Junction dots at each satellite position */}
              <circle cx="372" cy="50" r="3.5" fill="#00d99a" fillOpacity="0.8" />
              <circle cx="465" cy="150" r="3.5" fill="#00d99a" fillOpacity="0.8" />
              <circle cx="495" cy="295" r="3.5" fill="#00d99a" fillOpacity="0.8" />
              <circle cx="465" cy="440" r="3.5" fill="#00d99a" fillOpacity="0.8" />
              <circle cx="372" cy="540" r="3.5" fill="#00d99a" fillOpacity="0.8" />
            </svg>

            {/* Satellite nodes — positioned along the C-arc outside the central circle */}
            {SATELLITE_NODES.map((node) => {
              const lines = node.title.split("\n");
              return (
                <Link
                  key={node.title}
                  href="/upcoming-events"
                  className={`group absolute ${node.className} z-20 flex items-center gap-2.5 transition-transform hover:scale-105`}
                >
                  <div className="relative size-[52px] xl:size-[58px] shrink-0 overflow-hidden rounded-full ring-2 ring-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    <Image
                      src={node.image}
                      alt={lines.join(" ")}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col leading-tight">
                    {lines.map((line) => (
                      <span
                        key={line}
                        className="whitespace-nowrap text-xs xl:text-[13px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] group-hover:text-[#00d99a] transition"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ── Mobile / Tablet: central circle + pill grid ── */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <div className="relative size-[270px] sm:size-[310px] rounded-full overflow-hidden ring-[3.5px] ring-[#00d99a] shadow-[0_0_30px_rgba(0,217,154,0.25)]">
              <Image
                src="/assets/Img.jpg"
                alt="Unitevia volunteer helping elderly person with winter clothing"
                fill
                priority
                unoptimized
                className="object-cover object-[55%_30%]"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SATELLITE_NODES.map((node) => {
                const label = node.title.replace("\n", " ");
                return (
                  <Link
                    key={node.title}
                    href="/upcoming-events"
                    className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-black/40 px-3 py-1.5 backdrop-blur-sm transition hover:border-[#00d99a]"
                  >
                    <div className="relative size-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/80">
                      <Image
                        src={node.image}
                        alt={label}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-white">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
