import Image from "next/image";
import type { ReactNode } from "react";

type Feature = {
  title: string;
  description: string;
  /** Square 3D render from /public/features-gallery used as the card artwork. */
  image: string;
};

/* ─── Wave-shaped glow at the bottom of each card ─── */

function CardBottomWave() {
  return (
    <svg
      viewBox="0 0 320 64"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="feat-wave" x1="0" y1="0" x2="320" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="1" stopColor="#a7f3d0" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 46 C55 62 115 26 165 34 C225 44 282 22 320 40 L320 64 L0 64 Z"
        fill="url(#feat-wave)"
        opacity="0.55"
      />
      <path
        d="M0 46 C55 62 115 26 165 34 C225 44 282 22 320 40"
        stroke="#a7f3d0"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

/* ─── Ambient dotted particle waves (left & right of the section) ─── */

function ParticleWave({ side }: { side: "left" | "right" }) {
  const scaleX = side === "right" ? -1 : 1;
  const waveYs = [46, 66, 88, 112];
  return (
    <svg
      viewBox="0 0 220 150"
      className={`pointer-events-none absolute top-0 hidden opacity-60 lg:block ${side === "left" ? "left-0" : "right-0"}`}
      style={{ transform: `scaleX(${scaleX})`, height: "170px", width: "240px" }}
      aria-hidden="true"
    >
      {waveYs.map((y, i) => (
        <path
          key={y + i * 100}
          d={`M0 ${y} C 40 ${y - 22}, 90 ${y + 16}, 130 ${y - 6} S 205 ${y - 26}, 225 ${y - 10}`}
          stroke="#34d399"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.1 9"
          fill="none"
          opacity={0.75 - i * 0.13}
        />
      ))}
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    title: "Winter Clothing",
    description: "Organize and join winter clothing distribution events.",
    image: "/features-gallery/winter-clothing.jpg",
  },
  {
    title: "Blood Donation",
    description: "Support life-saving blood donation drives in your area.",
    image: "/features-gallery/blood-donation.jpg",
  },
  {
    title: "Education",
    description: "Contribute to education initiatives and support underprivileged learners.",
    image: "/features-gallery/education.jpg",
  },
  {
    title: "Support",
    description: "Stand beside vulnerable people through community aid.",
    image: "/features-gallery/support.jpg",
  },
  {
    title: "Healthcare",
    description: "Join healthcare camps and awareness programs for a healthier community.",
    image: "/features-gallery/healthcare.jpg",
  },
];

export function Features() {
  return (
    <section className="relative overflow-hidden bg-[#050a08] px-4 py-16 sm:px-6 md:py-24">
      {/* Dark depth gradient behind the cards */}
      <div className="pointer-events-none absolute inset-x-0 top-10 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(6,26,17,0.55),rgba(4,10,7,0)_70%)]" />

      {/* Ambient dotted particle waves */}
      <ParticleWave side="left" />
      <ParticleWave side="right" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-[#0a1c12]/90 px-5 py-2 text-sm font-semibold text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.25)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <path d="m12 2 8.5 4.77L12 11.53 3.5 6.77 12 2Z" />
            <path d="m3.5 11.5 8.5 4.77 8.5-4.77" />
            <path d="m3.5 16.23 8.5 4.77 8.5-4.77" />
          </svg>
          <span>Platform Features</span>
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Build for{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            Grassroots Action
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-300 md:mt-5 md:text-lg">
          Everything you need to create, discover, and join meaningful social development events in
          your community.
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid gap-5 text-left sm:grid-cols-2 md:grid-cols-3 lg:mt-14 lg:grid-cols-5">
          {FEATURES.map(({ image, title, description }) => (
            <div
              key={title}
              className="relative flex flex-col overflow-hidden rounded-[26px] border border-emerald-500/35 bg-gradient-to-b from-[#0b1b13]/95 to-[#07110c] shadow-[0_0_30px_rgba(16,185,129,0.14)] transition hover:border-emerald-400/60"
            >
              {/* Top edge highlight glow */}
              <div className="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />

              {/* Category artwork */}
              <div className="relative">
                <Image
                  src={image}
                  alt={title}
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover"
                  unoptimized
                />
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-1 flex-col px-4 pb-8 pt-4 text-center">
                <h3 className="text-lg font-bold text-white md:text-[22px]">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">{description}</p>
              </div>

              {/* Bottom glow wave */}
              <CardBottomWave />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
