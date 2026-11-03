"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Profile, type ProfileUser } from "@/components/Profile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "@/components/ui/toast";

export function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [localUser, setLocalUser] = useState<ProfileUser | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("unitevia_user");
      }
      setLocalUser(null);
      await authClient.signOut();
      toast.add({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        type: "success",
      });
      router.push("/");
      router.refresh();
    } catch {
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const user = session?.user || localUser;
  const pathname = usePathname();

  if (pathname === "/sign-up" || pathname === "/login") {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isUpcomingActive =
    pathname === "/upcoming-events" || pathname.startsWith("/upcoming-events");

  return (
    <header
      className={`z-30 transition-colors duration-200 ${
        isHomeActive
          ? "absolute inset-x-0 top-0 bg-transparent border-none"
          : "relative bg-[#02130a] border-b border-emerald-500/10"
      }`}
    >
      <nav className="mx-auto flex h-[74px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Brand Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="relative size-9 overflow-hidden rounded-lg">
            <Image
              src="/assets/main-logo.jpg"
              alt="Unitevia Logo"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Unitevia</span>
        </Link>

        {/* ── Center Navigation Menu ── */}
        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          {/* Upcoming Events */}
          <Link
            href="/upcoming-events"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              isUpcomingActive
                ? "border border-[#00d99a]/35 bg-[#062c1b] text-[#00d99a] shadow-[0_0_12px_rgba(0,217,154,0.18)]"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            Upcoming Events
          </Link>

          {/* About */}
          <Link
            href="/upcoming-events"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-neutral-300 transition hover:text-white"
          >
            About
          </Link>
        </div>

        {/* ── Right Action Elements ── */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme toggle (dedicated component) */}
          <ThemeToggle />

          {/* Conditional Login / (Profile + Logout) */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Profile user={user} />
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Log out"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-[#062417]/80 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white shadow-[0_0_12px_rgba(0,217,154,0.1)] transition hover:border-[#00d99a]/50 hover:bg-[#0a3522] active:scale-95 disabled:opacity-50"
              >
                <LogOut className="size-3.5 sm:size-4 text-neutral-300" />
                <span>{isLoggingOut ? "..." : "Logout"}</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition hover:brightness-110"
            >
              <LogIn className="size-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
