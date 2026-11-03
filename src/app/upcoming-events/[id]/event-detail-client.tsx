"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { EditEventDetails, type EditEventForm } from "@/components/EditEventDetails";
import { DeleteEventDetails } from "@/components/DeleteEventDetails";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Layers,
  Mail,
  MapPin,
  Pencil,
  Share2,
  Trash2,
  Users,
  Zap,
} from "lucide-react";

export interface EventData {
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  about?: string;
  guidelines?: string[];
  joined: number;
  expectedParticipants?: string;
  organizer?: string;
  organizerEmail?: string;
  status?: string;
  image?: string;
  thumbnailUrl?: string;
}

function FoodBowlIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M11 4 C13 5 15.5 6.5 16 9 C16.5 10 15.5 10.5 14.5 10 C13.5 9 11.5 7.5 10.5 7 Z"
        fill="#ca8a04"
      />
      <circle cx="8" cy="8" r="2.5" fill="#dc2626" />
      <path
        d="M4 10 C4.5 14.5 7 16 10 16 C13 16 15.5 14.5 16 10 Z"
        fill="#14532d"
      />
      <ellipse cx="10" cy="10" rx="6" ry="1.2" fill="#16a34a" />
    </svg>
  );
}

export function EventDetailClient({ event: initialEvent }: { event: EventData }) {
  const router = useRouter();
  const [currentEvent, setCurrentEvent] = useState<EventData>(initialEvent);
  const [joinedOverride, setJoinedOverride] = useState(false);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Build initial form values from the current event (used by EditEventDetails)
  const getEditFormValues = (): EditEventForm => ({
    title: currentEvent.title,
    category: currentEvent.category,
    date: currentEvent.date,
    time: currentEvent.time,
    location: currentEvent.location,
    thumbnailUrl: currentEvent.thumbnailUrl || currentEvent.image || "",
    description: currentEvent.about || currentEvent.description,
  });

  // Handle Edit submission — called by EditEventDetails component
  const handleSaveEdit = async (values: EditEventForm) => {
    setIsUpdating(true);

    const updatedData: EventData = {
      ...currentEvent,
      title: values.title.trim() || currentEvent.title,
      category: values.category,
      date: values.date.trim() || currentEvent.date,
      time: values.time.trim() || currentEvent.time,
      location: values.location.trim() || currentEvent.location,
      description: values.description.trim() || currentEvent.description,
      about: values.description.trim() || currentEvent.about,
      thumbnailUrl: values.thumbnailUrl.trim() || currentEvent.thumbnailUrl,
      image: values.thumbnailUrl.trim() || currentEvent.image,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/event/${currentEvent._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: updatedData.title,
            category: updatedData.category,
            date: updatedData.date,
            time: updatedData.time,
            location: updatedData.location,
            description: updatedData.description,
            image: updatedData.image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Event update failed (${response.status} ${response.statusText}).`
        );
      }
      setCurrentEvent(updatedData);
      setIsEditModalOpen(false);
      toast.add({
        title: "Event Updated Successfully!",
        description: `"${updatedData.title}" details have been updated.`,
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Event Update Failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not update this event. Please try again.",
        type: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };
   
  // Subscribe to localStorage to check if user has already joined (1 user only join 1 time per event)
  const isStoredJoined = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return (
        localStorage.getItem(`unitevia_joined_event_${currentEvent._id}`) ===
        "true"
      );
    },
    () => false
  );

  const isJoined = isStoredJoined || joinedOverride;
  const volunteersCount = (currentEvent.joined || 0) + (isJoined ? 1 : 0);

  const handleJoin = () => {
    if (isJoined) {
      toast.add({
        title: "Already Joined",
        description: `You have already joined "${currentEvent.title}".`,
        type: "info",
      });
      return;
    }

    const storageKey = `unitevia_joined_event_${currentEvent._id}`;
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, "true");
    }

    setJoinedOverride(true);

    // Trigger shadcn success toast
    toast.add({
      title: "Joined Successfully!",
      description: `You have successfully joined "${currentEvent.title}". We look forward to seeing you there!`,
      type: "success",
    });
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.clipboard && window.location.href) {
          await navigator.clipboard.writeText(window.location.href);
          toast.add({
            title: "Link Copied!",
            description: "Event link has been copied to your clipboard.",
            type: "success",
          });
        }
      } catch {
        toast.add({
          title: "Share",
          description: `Event URL: ${window.location.href}`,
          type: "info",
        });
      }
    }
  };

  // Split title for mint gradient highlight on the second half
  const titleParts = currentEvent.title.split(" ");
  const halfIdx = Math.max(1, Math.ceil(titleParts.length / 2));
  const firstPart = titleParts.slice(0, halfIdx).join(" ");
  const secondPart = titleParts.slice(halfIdx).join(" ");

  const guidelines = currentEvent.guidelines || [
    "Arrive at the event location at least 15 minutes early.",
    "Follow the instructions and coordination of the event organizers.",
    "Treat all recipients with respect, kindness, and dignity.",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031109] text-white">
      {/* ── Background Ambient Glowing Orbs ── */}
      <div className="pointer-events-none absolute -left-48 top-24 size-[480px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 bottom-48 size-[520px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-16 top-16 size-[320px] rounded-full bg-emerald-400/5 blur-[120px]" />

      {/* Decorative Starry Sparkles */}
      <div className="pointer-events-none absolute left-[8%] top-[12%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute right-[10%] top-[8%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute left-[5%] bottom-[30%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
      <div className="pointer-events-none absolute right-[6%] bottom-[20%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* ── Top Header: Back Link + Edit & Delete Action Buttons ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#051c11]/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(0,217,154,0.12)] backdrop-blur-md transition hover:border-emerald-400/60 hover:bg-[#072818]"
          >
            <ArrowLeft className="size-3.5 text-emerald-400" />
            <span>Back to Upcoming Events</span>
          </Link>

          {/* Action Group: Edit & Delete Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-[#051c11]/85 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-[0_0_15px_rgba(0,217,154,0.1)] backdrop-blur-md transition hover:border-emerald-400 hover:bg-[#072d1a] hover:text-white"
            >
              <Pencil className="size-3.5 text-[#00d99a]" />
              <span>Edit Event</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/35 bg-[#170609]/85 px-4 py-2 text-xs font-semibold text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)] backdrop-blur-md transition hover:border-rose-400/70 hover:bg-[#26090e] hover:text-rose-300"
            >
              <Trash2 className="size-3.5 text-rose-400" />
              <span>Delete Event</span>
            </button>
          </div>
        </div>

        {/* ── 1. Top Hero Card ── */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-[#04160d]/90 shadow-[0_0_50px_rgba(0,217,154,0.08)] backdrop-blur-md">
          {/* Top Half: Banner with Text & Integrated Photograph */}
          <div className="relative flex flex-col justify-between overflow-hidden md:min-h-[290px] md:flex-row">
            {/* Integrated Cover Photo with Smooth Vignette / Gradient Overlay */}
            <div className="relative h-56 w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[60%]">
              <Image
                src={
                  currentEvent.thumbnailUrl ||
                  currentEvent.image ||
                  "/assets/events/community-food-distribution.jpg"
                }
                alt={currentEvent.title}
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
              {/* Desktop smooth gradient fading to the dark background */}
              <div className="absolute inset-0 hidden bg-gradient-to-r from-[#04160d] via-[#04160d]/75 to-transparent md:block" />
              {/* Mobile gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04160d] via-transparent to-transparent md:hidden" />
            </div>

            {/* Left Content Area */}
            <div className="relative z-10 flex max-w-xl flex-col justify-center p-6 sm:p-8 md:p-10">
              {/* Category Pill */}
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#00d99a] px-3.5 py-1 text-xs font-bold text-[#032014] shadow-[0_0_15px_rgba(0,217,154,0.3)]">
                <FoodBowlIcon />
                <span>{currentEvent.category}</span>
              </div>

              {/* Title with Gradient Highlight */}
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.15]">
                <span className="text-white">{firstPart} </span>
                <span className="bg-gradient-to-r from-[#00d99a] via-[#00f2aa] to-[#10b981] bg-clip-text text-transparent">
                  {secondPart}
                </span>
              </h1>

              {/* Location & Date Meta Row */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-neutral-300 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 shrink-0 text-[#00d99a]" />
                  <span>{currentEvent.location}</span>
                </span>
                <span className="hidden h-3.5 w-px bg-emerald-500/35 sm:block" />
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 shrink-0 text-[#00d99a]" />
                  <span>{currentEvent.date}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar inside Top Card */}
          <div className="relative z-10 flex flex-col gap-4 border-t border-emerald-500/20 bg-[#03130b]/85 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
            {/* Left: Volunteers Count */}
            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#082215] text-[#00d99a] shadow-[0_0_12px_rgba(0,217,154,0.15)]">
                <Users className="size-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white sm:text-base">
                  {volunteersCount} Volunteers Joined
                </div>
                <div className="text-xs text-neutral-400">
                  {isJoined
                    ? "You have joined this initiative!"
                    : "Be the first to join and make a difference!"}
                </div>
              </div>
            </div>

            {/* Right: Share, Join, Edit, Delete Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share Event"
                className="flex size-11 items-center justify-center rounded-full border border-emerald-500/30 bg-[#061f13] text-[#00d99a] shadow-[0_0_12px_rgba(0,217,154,0.1)] transition hover:border-emerald-400 hover:bg-[#0a2e1d] active:scale-95"
              >
                <Share2 className="size-4.5" />
              </button>

              {/* Join Event Button */}
              {isJoined ? (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-[#082818] px-7 py-3 text-sm font-bold text-[#00d99a] shadow-[0_0_15px_rgba(0,217,154,0.15)]"
                >
                  <CheckCircle2 className="size-4 text-[#00d99a]" />
                  <span>Joined</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleJoin}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00d99a] to-[#00f2aa] px-7 py-3 text-sm font-bold text-[#032014] shadow-[0_0_20px_rgba(0,217,154,0.35)] transition hover:brightness-110 hover:shadow-[0_0_25px_rgba(0,217,154,0.5)] active:scale-95"
                >
                  <Users className="size-4" />
                  <span>Join Event</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── 2. Lower Two-Column Section ── */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ════════ LEFT COLUMN: Main Details (8 cols) ════════ */}
          <div className="rounded-3xl border border-emerald-500/25 bg-[#04160d]/90 p-6 backdrop-blur-md sm:p-8 lg:col-span-8">
            {/* 1. About This Social Initiative */}
            <div>
              <div className="flex items-center gap-2.5 text-base font-bold text-white sm:text-lg">
                <BookOpen className="size-5 text-[#00d99a]" />
                <h2>About This Social Initiative</h2>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-neutral-300 sm:text-sm">
                {currentEvent.about ||
                  currentEvent.description ||
                  "A community-driven food distribution program to support low-income families in our local area. The initiative aims to provide nutritious food packages to those in need and help ensure food security for vulnerable families."}
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-emerald-500/15" />

            {/* 2. Volunteer Guidelines */}
            <div>
              <div className="flex items-center gap-2.5 text-base font-bold text-white sm:text-lg">
                <Users className="size-5 text-[#00d99a]" />
                <h2>Volunteer Guidelines</h2>
              </div>
              <ul className="mt-3.5 space-y-2.5">
                {guidelines.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-neutral-300 sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#00d99a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-emerald-500/15" />

            {/* 3. Event Details */}
            <div>
              <div className="flex items-center gap-2.5 text-base font-bold text-white sm:text-lg">
                <CalendarDays className="size-5 text-[#00d99a]" />
                <h2>Event Details</h2>
              </div>

              {/* Row 1: Date, Time, Location (3 cols) */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Event Date */}
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-[#03130b]/80 p-3.5 shadow-[0_0_15px_rgba(0,217,154,0.03)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#072417] text-[#00d99a]">
                    <CalendarDays className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-neutral-400">
                      Event Date
                    </div>
                    <div className="truncate text-xs font-bold text-white sm:text-sm">
                      {currentEvent.date}
                    </div>
                  </div>
                </div>

                {/* Event Time */}
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-[#03130b]/80 p-3.5 shadow-[0_0_15px_rgba(0,217,154,0.03)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#072417] text-[#00d99a]">
                    <Clock className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-neutral-400">
                      Event Time
                    </div>
                    <div className="truncate text-xs font-bold text-white sm:text-sm">
                      {currentEvent.time}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-[#03130b]/80 p-3.5 shadow-[0_0_15px_rgba(0,217,154,0.03)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#072417] text-[#00d99a]">
                    <MapPin className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-neutral-400">
                      Location
                    </div>
                    <div className="truncate text-xs font-bold text-white sm:text-sm">
                      {currentEvent.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Category, Expected Participants (2 cols) */}
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Category */}
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-[#03130b]/80 p-3.5 shadow-[0_0_15px_rgba(0,217,154,0.03)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#072417] text-[#00d99a]">
                    <Layers className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-neutral-400">
                      Category
                    </div>
                    <div className="truncate text-xs font-bold text-white sm:text-sm">
                      {currentEvent.category}
                    </div>
                  </div>
                </div>

                {/* Expected Participants */}
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-[#03130b]/80 p-3.5 shadow-[0_0_15px_rgba(0,217,154,0.03)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#072417] text-[#00d99a]">
                    <Users className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-neutral-400">
                      Expected Participants
                    </div>
                    <div className="truncate text-xs font-bold text-white sm:text-sm">
                      {currentEvent.expectedParticipants || "200+ People"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════ RIGHT COLUMN: Sidebar (4 cols) ════════ */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* 1. Event Status Card */}
            <div className="flex items-center justify-between rounded-3xl border border-emerald-500/25 bg-[#04160d]/90 p-5 shadow-[0_0_30px_rgba(0,217,154,0.05)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#072417] text-[#00d99a]">
                  <Zap className="size-5" />
                </div>
                <span className="text-sm font-bold text-white">Event Status</span>
              </div>
              <span className="rounded-full border border-emerald-500/35 bg-[#0d3822] px-4 py-1.5 text-xs font-semibold text-[#00d99a] shadow-[0_0_10px_rgba(0,217,154,0.15)]">
                {currentEvent.status || "Upcoming"}
              </span>
            </div>

            {/* 2. Initiative Organizer Card */}
            <div className="flex flex-col gap-5 rounded-3xl border border-emerald-500/25 bg-[#04160d]/90 p-6 shadow-[0_0_30px_rgba(0,217,154,0.05)] backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center gap-2.5 text-base font-bold text-white">
                <Users className="size-5 text-[#00d99a]" />
                <h2>Initiative Organizer</h2>
              </div>

              {/* Profile Details */}
              <div className="flex items-center gap-4">
                {/* Circular Unitevia Avatar */}
                <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-full bg-white p-2 shadow-md">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-7"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2C7.5 2 4 6 4 10.5C4 16 12 22 12 22C12 22 20 16 20 10.5C20 6 16.5 2 12 2Z"
                      fill="#059669"
                    />
                    <path
                      d="M12 2C12 7 8 11 4 11C4 7 8 2 12 2Z"
                      fill="#10b981"
                      opacity="0.8"
                    />
                    <path
                      d="M12 2C12 7 16 11 20 11C20 7 16 2 12 2Z"
                      fill="#34d399"
                      opacity="0.8"
                    />
                  </svg>
                  <span className="text-[8px] font-black tracking-tight text-[#064e3b]">
                    Unitevia
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-white sm:text-base">
                    {currentEvent.organizer || "Unitevia Community Team"}
                  </div>
                  <a
                    href={`mailto:${currentEvent.organizerEmail || "hello@unitevia.org"}`}
                    className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400 transition hover:text-emerald-300"
                  >
                    <Mail className="size-3.5 shrink-0 text-[#00d99a]" />
                    <span className="truncate">
                      {currentEvent.organizerEmail || "hello@unitevia.org"}
                    </span>
                  </a>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/25 bg-[#062416] px-4 py-2 text-xs font-medium text-emerald-300 shadow-[0_0_12px_rgba(0,217,154,0.08)]">
                <CheckCircle2 className="size-4 text-[#00d99a]" />
                <span>Verified Platform Member</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ════════ EDIT EVENT MODAL — using EditEventDetails component ════════ */}
      {isEditModalOpen && (
        <EditEventDetails
          initialValues={getEditFormValues()}
          isSaving={isUpdating}
          onSave={handleSaveEdit}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* ════════ DELETE EVENT MODAL — using DeleteEventDetails component ════════ */}
      <DeleteEventDetails
        isOpen={isDeleteModalOpen}
        eventId={currentEvent._id}
        eventTitle={currentEvent.title}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => router.push("/upcoming-events")}
      />
    </div>
  );
}
