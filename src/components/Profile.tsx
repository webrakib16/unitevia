"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Pencil,
  PlusCircle,
  Settings,
  CheckCircle2,
  User,
  X,
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
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
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
      router.push("/");
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

  // ── Profile view & update (uses Better Auth's existing update-user API) ──
  const openUpdateModal = () => {
    setUpdateName(user?.name?.trim() || "");
    setUpdateImage(user?.image || "");
    setIsOpen(false);
    setIsUpdateOpen(true);
  };

  const handleSaveProfile = async () => {
    if (isSavingProfile) return;
    if (!updateName.trim()) {
      toast.add({
        title: "Name Required",
        description: "Please enter your display name.",
        type: "error",
      });
      return;
    }
    setIsSavingProfile(true);
    try {
      const res = await authClient.updateUser({
        name: updateName.trim(),
        image: updateImage.trim() || undefined,
      });
      if (res?.error) {
        throw new Error(res.error.message || "Failed to update profile.");
      }

      // Keep the localStorage user cache in sync
      try {
        const stored = localStorage.getItem("unitevia_user");
        if (stored) {
          const cached = JSON.parse(stored);
          cached.name = updateName.trim();
          if (updateImage.trim()) cached.image = updateImage.trim();
          localStorage.setItem("unitevia_user", JSON.stringify(cached));
          window.dispatchEvent(new Event("storage"));
        }
      } catch {
        // cache sync is best-effort
      }

      toast.add({
        title: "Profile Updated",
        description: "Your name and profile picture have been updated.",
        type: "success",
      });
      setIsUpdateOpen(false);
      router.refresh();
    } catch (err) {
      toast.add({
        title: "Profile Update Failed",
        description:
          err instanceof Error
            ? err.message
            : "Could not update your profile. Please try again.",
        type: "error",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

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
            className="absolute right-0 top-full mt-3.5 z-50 w-72 sm:w-80 rounded-2xl border border-[#00d99a] bg-[#051a10] p-4 text-white shadow-[0_0_30px_rgba(0,217,154,0.25),0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in-0 zoom-in-95 duration-150"
          >
            {/* Top triangle notch pointing directly up to the avatar */}
            <div className="absolute -top-1.5 right-7 sm:right-8 size-3 rotate-45 border-l border-t border-[#00d99a] bg-[#051a10]" />

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

              {/* Update Profile */}
              <button
                type="button"
                onClick={openUpdateModal}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                <User className="size-5 text-[#a78bfa] shrink-0" />
                <span>Update Profile</span>
              </button>
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

        {/* ── Update Profile Modal ── */}
        {isUpdateOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Update Profile"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="relative w-full max-w-[440px] rounded-[26px] p-px bg-gradient-to-br from-emerald-400/70 via-emerald-500/30 to-emerald-900/20 shadow-[0_0_60px_rgba(0,0,0,0.85)]">
              <div className="relative w-full rounded-[25px] bg-[#08150f] p-6 sm:p-7 text-white">
                {/* Header */}
                <div className="flex items-start gap-3.5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/40 bg-[#072416]/80 text-[#00d99a]">
                    <Pencil className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                      Update Profile
                    </h2>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Update your display name and profile picture.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUpdateOpen(false)}
                    aria-label="Close"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/25 bg-[#061f13] text-neutral-400 transition hover:bg-[#09291b] hover:text-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Avatar preview */}
                <div className="mt-5 flex items-center gap-3.5">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#00d99a]/60 bg-emerald-950">
                    <Image
                      src={updateImage || DEFAULT_AVATAR}
                      alt="Profile preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <p className="min-w-0 flex-1 truncate text-xs text-neutral-400">
                    {displayEmail}
                  </p>
                </div>

                {/* Name */}
                <div className="mt-4">
                  <label htmlFor="profile-name" className="mb-1.5 block text-xs font-semibold text-neutral-200">
                    Display Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    placeholder="Your display name"
                    className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20"
                  />
                </div>

                {/* Photo URL */}
                <div className="mt-3.5">
                  <label htmlFor="profile-image" className="mb-1.5 block text-xs font-semibold text-neutral-200">
                    Profile Picture URL
                  </label>
                  <input
                    id="profile-image"
                    type="url"
                    value={updateImage}
                    onChange={(e) => setUpdateImage(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20"
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUpdateOpen(false)}
                    className="rounded-full border border-emerald-500/25 bg-[#04160d] px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-200 transition hover:bg-[#072417] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00d99a] to-[#00f2aa] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#032014] shadow-[0_0_20px_rgba(0,217,154,0.35)] transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Pencil className="size-3.5" />
                    <span>{isSavingProfile ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
