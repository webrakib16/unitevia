"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  PlusCircle,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export interface ProfileUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ProfileProps {
  user: ProfileUser;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

export function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("unitevia_user");
      }
      await authClient.signOut();
      toast.add({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        type: "success",
      });
      setIsOpen(false);
      router.push("/login");
      router.refresh();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to log out. Please try again.";
      toast.add({
        title: "Logout Error",
        description: msg,
        type: "error",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const displayName = user?.name?.trim() || "Dolore expedita dese";
  const displayEmail = user?.email?.trim() || "mypit@mailinator.com";
  const avatarSrc = user?.image || DEFAULT_AVATAR;

  return (
    <div className="relative flex items-center gap-3" ref={containerRef}>
      {/* ── 1. Avatar & Chevron Trigger ── */}
      <div className="relative group/avatar">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={`Toggle profile menu for ${displayName}`}
          title={displayName}
          className="group flex items-center gap-1.5 focus:outline-none"
        >
          {/* Avatar with glowing green ring */}
          <div className="relative size-10 overflow-hidden rounded-full ring-2 ring-[#00d99a] shadow-[0_0_12px_rgba(0,217,154,0.35)] transition group-hover:brightness-110">
            <Image
              src={avatarSrc}
              alt={displayName}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Upward chevron when open, downward chevron when closed */}
          {isOpen ? (
            <ChevronUp className="size-4 text-white transition-transform" />
          ) : (
            <ChevronDown className="size-4 text-white transition-transform" />
          )}
        </button>

        {/* ── Hover Display Name Tooltip (Requirement: On hovering over profile picture, show display name) ── */}
        {!isOpen && (
          <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap rounded-lg border border-emerald-500/30 bg-[#061e12]/95 px-2.5 py-1 text-xs font-semibold text-emerald-300 opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-150 group-hover/avatar:opacity-100 group-hover/avatar:translate-y-0.5">
            {displayName}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-l border-t border-emerald-500/30 bg-[#061e12]" />
          </div>
        )}

        {/* ── 2. Dropdown Menu Card ── */}
        {isOpen && (
          <div
            role="menu"
            aria-orientation="vertical"
            className="absolute -right-16 sm:-right-8 top-full mt-3.5 z-50 w-72 sm:w-80 rounded-2xl border border-[#00d99a] bg-[#051a10] p-4 text-white shadow-[0_0_30px_rgba(0,217,154,0.25),0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in-0 zoom-in-95 duration-150"
          >
            {/* Top triangle notch pointing directly up to the avatar */}
            <div className="absolute -top-1.5 right-[78px] sm:right-[46px] size-3 rotate-45 border-l border-t border-[#00d99a] bg-[#051a10]" />

            {/* Top User Info Section */}
            <div className="relative z-10 flex items-center gap-3 px-1 py-1">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#00d99a]/60 bg-emerald-950">
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-white leading-tight">
                  {displayName}
                </p>
                <p className="truncate text-xs text-neutral-400 mt-0.5">
                  {displayEmail}
                </p>
              </div>
            </div>

            {/* Thin Horizontal Divider */}
            <div className="relative z-10 my-3.5 h-px bg-white/10" />

            {/* Navigation Links */}
            <div className="relative z-10 space-y-1.5">
              {/* Create Event (Highlighted Pill as in reference screenshot) */}
              <Link
                href="/create-event"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-[#0c2f1e] px-3.5 py-2.5 text-sm font-medium text-white shadow-[0_0_12px_rgba(0,217,154,0.1)] transition hover:bg-[#103a25] hover:border-emerald-400/40"
              >
                <PlusCircle className="size-5 text-[#00d99a] shrink-0" />
                <span>Create Event</span>
              </Link>

              {/* Manage Events */}
              <Link
                href="/manage-events"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Settings className="size-5 text-[#a78bfa] shrink-0" />
                <span>Manage Events</span>
              </Link>

              {/* Joined Events */}
              <Link
                href="/joined-events"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                <CheckCircle2 className="size-5 text-[#00d99a] shrink-0" />
                <span>Joined Events</span>
              </Link>
            </div>

            {/* Thin Horizontal Divider */}
            <div className="relative z-10 my-3.5 h-px bg-white/10" />

            {/* Logout Item in Dropdown (Red/Salmon colored) */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="relative z-10 flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium text-[#f87171] transition hover:bg-rose-500/10 hover:text-[#fca5a5] disabled:opacity-50"
            >
              <LogOut className="size-5 shrink-0 text-[#f87171]" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        )}
      </div>

      {/* ── 3. Dedicated Logout Button Beside Avatar ── */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-emerald-400/40 hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-50"
      >
        <LogOut className="size-4 text-neutral-300" />
        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </button>
    </div>
  );
}
