"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Mail } from "lucide-react";
import { toast } from "@/components/ui/toast";

function FacebookIcon() {
  return (
    <svg className="size-4 fill-current text-emerald-400" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="size-4 stroke-current text-emerald-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="size-4 fill-current text-emerald-400" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="size-4 fill-current text-emerald-400" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  if (pathname === "/sign-up" || pathname === "/login") {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.add({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        type: "error",
      });
      return;
    }

    toast.add({
      title: "Subscribed Successfully!",
      description: "Thank you for subscribing to our community updates.",
      type: "success",
    });
    setEmail("");
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-emerald-500/15 bg-gradient-to-b from-[#031109] via-[#020d06] to-[#010804] text-white">
      {/* ── Background Subtle Ambient Waves & Glows ── */}
      <div className="pointer-events-none absolute -left-40 top-0 size-[450px] rounded-full bg-emerald-500/5 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[450px] rounded-full bg-emerald-500/5 blur-[140px]" />

      {/* Decorative mountain landscape silhouette at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-20">
        <svg
          viewBox="0 0 1440 240"
          fill="none"
          className="h-full w-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M0 240L60 210C120 180 240 120 360 130C480 140 600 220 720 210C840 200 960 100 1080 90C1200 80 1320 160 1380 200L1440 240H0Z"
            fill="#00d99a"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* ── Top 4 Columns ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* 1. Brand Column (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 transition hover:opacity-90">
              <div className="relative size-10">
                <Image
                  src="/assets/logo.jpg"
                  alt="Unitevia Logo"
                  fill
                  priority
                  unoptimized
                  className="rounded-full object-contain mix-blend-screen"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Unitevia
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-300 sm:text-sm">
              A social development event platform that brings people together to create real change in our communities.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-emerald-500/25 bg-[#051c11]/80 transition hover:border-emerald-400 hover:bg-[#072918]"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-emerald-500/25 bg-[#051c11]/80 transition hover:border-emerald-400 hover:bg-[#072918]"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex size-9 items-center justify-center rounded-full border border-emerald-500/25 bg-[#051c11]/80 transition hover:border-emerald-400 hover:bg-[#072918]"
              >
                <YoutubeIcon />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-full border border-emerald-500/25 bg-[#051c11]/80 transition hover:border-emerald-400 hover:bg-[#072918]"
              >
                <GithubIcon />
              </a>
            </div>
          </div>

          {/* 2. Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <div>
              <h4 className="text-base font-bold text-white">Quick Links</h4>
              <div className="mt-1 h-0.5 w-8 rounded-full bg-[#00d99a]" />
            </div>

            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-1.5 text-xs text-neutral-300 transition hover:text-white sm:text-sm"
                >
                  <ChevronRight className="size-3.5 text-[#00d99a] transition group-hover:translate-x-0.5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="group inline-flex items-center gap-1.5 text-xs text-neutral-300 transition hover:text-white sm:text-sm"
                >
                  <ChevronRight className="size-3.5 text-[#00d99a] transition group-hover:translate-x-0.5" />
                  <span>Upcoming Events</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/create-event"
                  className="group inline-flex items-center gap-1.5 text-xs text-neutral-300 transition hover:text-white sm:text-sm"
                >
                  <ChevronRight className="size-3.5 text-[#00d99a] transition group-hover:translate-x-0.5" />
                  <span>Create Event</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-events"
                  className="group inline-flex items-center gap-1.5 text-xs text-neutral-300 transition hover:text-white sm:text-sm"
                >
                  <ChevronRight className="size-3.5 text-[#00d99a] transition group-hover:translate-x-0.5" />
                  <span>Manage Events</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/joined-events"
                  className="group inline-flex items-center gap-1.5 text-xs text-neutral-300 transition hover:text-white sm:text-sm"
                >
                  <ChevronRight className="size-3.5 text-[#00d99a] transition group-hover:translate-x-0.5" />
                  <span>Joined Events</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Categories (2 cols) */}
          <div className="lg:col-span-2">
            <div>
              <h4 className="text-base font-bold text-white">Categories</h4>
              <div className="mt-1 h-0.5 w-8 rounded-full bg-[#00d99a]" />
            </div>

            <ul className="mt-5 space-y-2.5 text-xs text-neutral-300 sm:text-sm">
              <li>
                <Link
                  href="/upcoming-events"
                  className="transition hover:text-[#00d99a]"
                >
                  Winter Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="transition hover:text-[#00d99a]"
                >
                  Blood Donation
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="transition hover:text-[#00d99a]"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="transition hover:text-[#00d99a]"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="transition hover:text-[#00d99a]"
                >
                  Healthcare
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Stay Connected (3 cols) */}
          <div className="lg:col-span-3">
            <div>
              <h4 className="text-base font-bold text-white">Stay Connected</h4>
              <div className="mt-1 h-0.5 w-8 rounded-full bg-[#00d99a]" />
            </div>

            <p className="mt-5 text-xs leading-relaxed text-neutral-300 sm:text-sm">
              Get updates about upcoming events and community initiatives.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex items-center rounded-2xl border border-emerald-500/30 bg-[#051c11]/90 p-1 pl-3.5 shadow-sm transition focus-within:border-emerald-400">
                <Mail className="size-4 shrink-0 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-2.5 text-xs text-white placeholder:text-neutral-500 outline-none sm:text-sm"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-[#00e599] px-4 py-2 text-xs font-bold text-[#032014] shadow-sm transition hover:bg-[#00f2aa] hover:brightness-105 active:scale-95"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Bottom Copyright Bar ── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-emerald-500/15 pt-6 text-xs text-neutral-400 sm:flex-row">
          <p>© 2026 Unitevia. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-neutral-600">|</span>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
            <span className="text-neutral-600">|</span>
            <Link href="/contact" className="transition hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
