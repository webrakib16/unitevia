"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LogIn, Moon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Profile, type ProfileUser } from "@/components/Profile";

export function Navbar() {
  // Get the current session user using the authClient
  const { data: session } = authClient.useSession();
  const [localUser, setLocalUser] = useState<ProfileUser | null>(null);

  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = localStorage.getItem("unitevia_user");
        if (stored) {
          setLocalUser(JSON.parse(stored));
        } else {
          setLocalUser(null);
        }
      } catch {
        setLocalUser(null);
      }
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const user = session?.user || localUser;
  console.log("Navbar session user:", user);

  const pathname = usePathname();

  if (pathname === "/sign-up" || pathname === "/login") {
    return null;
  }

  const isUpcomingActive =
    pathname === "/upcoming-events" || pathname.startsWith("/upcoming-events");

  return (
    <header className="relative z-10 border-b border-white/5 bg-black/20">
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
          <Image
            src="/assets/logo.jpg"
            alt="Unitevia logo"
            width={44}
            height={44}
            priority
            unoptimized
            className="size-10 rounded-full"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-base font-bold tracking-tight text-white sm:text-lg">Unitevia</p>
            <p className="truncate text-[11px] font-medium text-emerald-100/60">
              People. Purpose. Progress.
            </p>
          </div>
        </Link>

        {/* Center action */}
        <Link
          href="/upcoming-events"
          className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition md:inline-flex md:px-5 ${isUpcomingActive
              ? "border border-emerald-400/60 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
              : "border border-white/10 bg-white/[0.04] text-neutral-200 hover:bg-white/10"
            }`}
        >
          <CalendarDays className="size-4 text-emerald-400" />
          Upcoming Events
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Toggle theme"
            className="rounded-full p-2.5 text-neutral-400 transition hover:bg-white/5 hover:text-white"
          >
            <Moon className="size-5" />
          </button>

          {user ? (
            <Profile user={user} />
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition hover:brightness-110 sm:px-6"
            >
              <LogIn className="size-4" />
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
