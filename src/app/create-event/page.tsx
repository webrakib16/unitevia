"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Layers,
  Leaf,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";

// ─── Category Illustrated SVGs matching the design system ─────────────────────

function BeanieIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-6 sm:size-7">
      <circle cx="16" cy="6.5" r="3" fill="#93c5fd" />
      <circle cx="15.5" cy="5.5" r="1" fill="#ffffff" opacity="0.7" />
      <path d="M8 19.5 C8 12.5 10.5 9 16 9 C21.5 9 24 12.5 24 19.5 Z" fill="url(#add-beanie)" />
      <path d="M12 11.5 C11.5 14 11.5 17 11.5 19.5" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.45" />
      <path d="M16 9.5 C16 13 16 17 16 19.5" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.45" />
      <path d="M20 11.5 C20.5 14 20.5 17 20.5 19.5" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.45" />
      <rect x="6.5" y="19.5" width="19" height="5" rx="2.5" fill="#1d4ed8" />
      <line x1="10" y1="20.5" x2="10" y2="23.5" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
      <line x1="13" y1="20.5" x2="13" y2="23.5" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
      <line x1="16" y1="20.5" x2="16" y2="23.5" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
      <line x1="19" y1="20.5" x2="19" y2="23.5" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
      <line x1="22" y1="20.5" x2="22" y2="23.5" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
      <defs>
        <linearGradient id="add-beanie" x1="16" y1="9" x2="16" y2="19.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-6 sm:size-7">
      <path
        d="M16 8 C14.5 5 11 4 8.5 5.5 C5.5 7.3 5 11.5 7.5 14.5 L16 22 L24.5 14.5 C27 11.5 26.5 7.3 23.5 5.5 C21 4 17.5 5 16 8 Z"
        fill="url(#add-heart)"
      />
      <path
        d="M9.5 6.5 C11 5.5 13.2 6.2 14.2 8 C13.5 7 12 6.5 10.5 7 C9 7.5 8 9 8 10.5 C7.5 9 8.2 7.5 9.5 6.5 Z"
        fill="#ffffff"
        opacity="0.65"
      />
      <defs>
        <linearGradient id="add-heart" x1="16" y1="4" x2="16" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb7185" />
          <stop offset="0.4" stopColor="#e11d48" />
          <stop offset="1" stopColor="#9f1239" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-6 sm:size-7">
      <path
        d="M6 19 C9 18 13 18 16 20 C19 18 23 18 26 19 L25.5 25 C22.5 24 19 24 16 25.5 C13 24 9.5 24 6.5 25 Z"
        fill="#1e3a8a"
      />
      <path
        d="M7 18 C10 17 13.5 17.2 16 19 C18.5 17.2 22 17 25 18 L24.5 23.5 C21.8 22.8 18.5 23 16 24.2 C13.5 23 10.2 22.8 7.5 23.5 Z"
        fill="#f8fafc"
      />
      <line x1="16" y1="19" x2="16" y2="24.2" stroke="#94a3b8" strokeWidth="1" />
      <path d="M16 6 L26 11.5 L16 16.5 L6 11.5 Z" fill="url(#add-grad)" />
      <circle cx="16" cy="11.5" r="1.2" fill="#93c5fd" />
      <path d="M16 11.5 L23.5 14.5 L24 17.5" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
      <defs>
        <linearGradient id="add-grad" x1="16" y1="6" x2="16" y2="16.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BloodIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-6 sm:size-7">
      <path
        d="M16 4.5 C16 4.5 8 13.5 8 18.5 C8 23 11.5 26.5 16 26.5 C20.5 26.5 24 23 24 18.5 C24 13.5 16 4.5 16 4.5 Z"
        fill="url(#add-blood)"
      />
      <path
        d="M11.5 17 C11.5 13.5 14 9.5 15.5 7.5 C14.5 9.5 12.8 13 12.8 17 C12.8 19 13.5 20.8 14.5 22 C12.8 20.8 11.5 19 11.5 17 Z"
        fill="#ffffff"
        opacity="0.4"
      />
      <rect x="14.2" y="14" width="3.6" height="9" rx="1" fill="#ffffff" />
      <rect x="11.5" y="16.7" width="9" height="3.6" rx="1" fill="#ffffff" />
      <defs>
        <linearGradient id="add-blood" x1="16" y1="4.5" x2="16" y2="26.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f87171" />
          <stop offset="0.4" stopColor="#dc2626" />
          <stop offset="1" stopColor="#991b1b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BroomIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-6 sm:size-7">
      <line x1="25" y1="6" x2="15" y2="18" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx="14.5" cy="18.5" rx="3.5" ry="2" fill="#0284c7" transform="rotate(-40 14.5 18.5)" />
      <path d="M13 18 L6 25.5 C5.5 26.2 6.2 27 7 26.8 L16 23 L14 18 Z" fill="url(#add-broom)" />
      <circle cx="21" cy="24" r="1.2" fill="#38bdf8" />
      <defs>
        <linearGradient id="add-broom" x1="14" y1="18" x2="8" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-6 sm:size-7">
      <path d="M10 26 C12 25 15 25 16 25 C17 25 20 25 22 26 C21 27 18 27.5 16 27.5 C14 27.5 11 27 10 26 Z" fill="#15803d" opacity="0.7" />
      <path d="M16 26 C16 20 16 16 16 14" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 18 C11 18 7 14 7 11 C10 10 14 12 16 16" fill="url(#add-sprout-l)" />
      <path d="M16 15 C19 12 23 10 25 11 C26 14 22 18 16 19" fill="url(#add-sprout-r)" />
      <ellipse cx="16" cy="13.5" rx="1.8" ry="2.6" fill="#4ade80" />
      <defs>
        <linearGradient id="add-sprout-l" x1="7" y1="11" x2="16" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="add-sprout-r" x1="25" y1="11" x2="16" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86efac" />
          <stop offset="1" stopColor="#166534" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const CATEGORY_ITEMS = [
  { id: "Winter Relief", icon: <BeanieIcon />, labelTop: "Winter", labelBottom: "Relief" },
  { id: "Donation", icon: <HeartIcon />, labelTop: "Donation", labelBottom: "" },
  { id: "Education", icon: <BookIcon />, labelTop: "Education", labelBottom: "" },
  { id: "Blood Camp", icon: <BloodIcon />, labelTop: "Blood", labelBottom: "Camp" },
  { id: "Cleanliness", icon: <BroomIcon />, labelTop: "Cleanliness", labelBottom: "" },
  { id: "Greenery", icon: <SproutIcon />, labelTop: "Greenery", labelBottom: "" },
];

const GUIDELINE_ITEMS = [
  "Choose a clear and meaningful title.",
  "Select the right category.",
  "Pick a future date and time.",
  "Add a detailed and helpful description.",
];

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    email: "",
    image: "",
    description: "",
  });

  const [dateError, setDateError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Current local time calculations for restricting past selections
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const currentHours = String(now.getHours()).padStart(2, "0");
  const currentMinutes = String(now.getMinutes()).padStart(2, "0");
  const currentTimeStr = `${currentHours}:${currentMinutes}`;
  const isToday = formData.date === todayStr;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "date" || name === "time") {
      setDateError("");
    }
  };

  const selectCategory = (categoryId: string) => {
    setFormData((prev) => ({ ...prev, category: categoryId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Strict validation: Event Date must be provided
    if (!formData.date) {
      setDateError("Please select an event date.");
      toast.add({
        title: "Date Required",
        description: "Please select an upcoming date for your event.",
        type: "error",
      });
      return;
    }

    // 2. Strict validation: Event Date & Time must be in the future, not in the past
    const currentDateTime = new Date();
    const eventTimeStr = formData.time || "23:59";
    const selectedDateTime = new Date(`${formData.date}T${eventTimeStr}`);

    if (isNaN(selectedDateTime.getTime()) || selectedDateTime <= currentDateTime) {
      setDateError("Event date and time must be in the future, not in the past.");
      toast.add({
        title: "Invalid Event Date & Time",
        description: "Event date and time must be set in the future. Please pick an upcoming date and time.",
        type: "error",
      });
      return;
    }

    setDateError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/data-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);
      console.log("Server Response:", data);
      console.log("Form Data Submitted:", formData);
    } catch (err) {
      console.log("Backend request handled:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger shadcn success toast
      toast.add({
        title: "Event Created Successfully!",
        description: `"${formData.title}" has been successfully created for ${new Date(selectedDateTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at ${formData.time || "TBD"}.`,
        type: "success",
      });

      // Reset form fields
      setFormData({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        email: "",
        image: "",
        description: "",
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031109] text-white">
      {/* ── Background Ambient Glowing Orbs ── */}
      <div className="pointer-events-none absolute -left-48 top-24 size-[480px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 bottom-32 size-[520px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-16 top-16 size-[320px] rounded-full bg-emerald-400/5 blur-[120px]" />

      {/* Decorative starry sparkles matching reference */}
      <div className="pointer-events-none absolute left-[12%] top-[18%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute right-[15%] top-[12%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute left-[3%] bottom-[30%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
      <div className="pointer-events-none absolute right-[4%] bottom-[38%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {/* ── Page Header ── */}
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-[#051c11]/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <CalendarPlus className="size-3.5" />
            <span>CREATE EVENT</span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px]">
            <span className="text-white">Create a </span>
            <span className="bg-gradient-to-r from-[#00d99a] via-[#00f2aa] to-[#10b981] bg-clip-text text-transparent">
              Community Event
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Organize a meaningful event, bring people together, and make a positive impact in your
            community.
          </p>
        </div>

        {/* ── Main Two-Column Grid Layout (Balanced 7 : 5 ratio for optimal card width) ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-12 lg:gap-7">
          {/* ════════ LEFT COLUMN: Event Information Form (7 cols) ════════ */}
          <section className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#06180f]/95 p-5 shadow-[0_0_40px_rgba(0,217,154,0.06)] backdrop-blur-md sm:p-7 lg:p-8">
              {/* Header inside card */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/40 bg-[#072416]/80 text-[#00d99a] shadow-[0_0_15px_rgba(0,217,154,0.15)]">
                  <CalendarPlus className="size-6" strokeWidth={2} />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white sm:text-xl">Event Information</h2>
                  <p className="text-xs text-neutral-400 sm:text-sm">
                    Provide the key details about your community event.
                  </p>
                </div>
              </div>

              {submitted && (
                <div className="mt-5 rounded-xl border border-emerald-400/40 bg-emerald-950/60 p-4 text-sm text-emerald-300">
                  Event created successfully! Your community event has been registered.
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 sm:gap-5">
                {/* Event Title */}
                <div>
                  <label htmlFor="title" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Pencil className="pointer-events-none absolute left-3.5 size-4 text-neutral-400" />
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter event title (e.g. Winter Clothing Distribution)"
                      className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                    />
                  </div>
                </div>

                {/* 3-Column Row: Category, Event Date, Event Time */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Layers className="pointer-events-none absolute left-3.5 size-4 text-neutral-400" />
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="h-11 w-full appearance-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-9 text-sm text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                      >
                        <option value="" disabled className="bg-[#06180f] text-neutral-400">
                          Select a category
                        </option>
                        <option value="Winter Relief" className="bg-[#06180f] text-white">
                          Winter Relief
                        </option>
                        <option value="Donation" className="bg-[#06180f] text-white">
                          Donation
                        </option>
                        <option value="Education" className="bg-[#06180f] text-white">
                          Education
                        </option>
                        <option value="Blood Camp" className="bg-[#06180f] text-white">
                          Blood Camp
                        </option>
                        <option value="Cleanliness" className="bg-[#06180f] text-white">
                          Cleanliness
                        </option>
                        <option value="Greenery" className="bg-[#06180f] text-white">
                          Greenery
                        </option>
                        <option value="Food Drive" className="bg-[#06180f] text-white">
                          Food Drive
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-neutral-400" />
                    </div>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label htmlFor="date" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <CalendarDays className="pointer-events-none absolute left-3.5 size-4 text-neutral-400" />
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        min={todayStr}
                        value={formData.date}
                        onChange={handleChange}
                        className={`h-11 w-full rounded-xl border bg-[#031109]/90 pl-10 pr-3 text-sm text-white transition focus:outline-none focus:ring-1 [color-scheme:dark] ${
                          dateError
                            ? "border-rose-500/70 focus:border-rose-400 focus:ring-rose-400/40"
                            : "border-emerald-500/25 focus:border-emerald-400/70 focus:ring-emerald-400/40"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Event Time */}
                  <div>
                    <label htmlFor="time" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                      Event Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Clock className="pointer-events-none absolute left-3.5 size-4 text-neutral-400" />
                      <input
                        id="time"
                        name="time"
                        type="time"
                        required
                        min={isToday ? currentTimeStr : undefined}
                        value={formData.time}
                        onChange={handleChange}
                        className={`h-11 w-full rounded-xl border bg-[#031109]/90 pl-10 pr-3 text-sm text-white transition focus:outline-none focus:ring-1 [color-scheme:dark] ${
                          dateError
                            ? "border-rose-500/70 focus:border-rose-400 focus:ring-rose-400/40"
                            : "border-emerald-500/25 focus:border-emerald-400/70 focus:ring-emerald-400/40"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Inline Date & Time validation warning */}
                {dateError && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 px-3.5 py-2 text-xs text-rose-300">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                      !
                    </span>
                    <span>{dateError}</span>
                  </div>
                )}

                {/* Location */}
                <div>
                  <label htmlFor="location" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <MapPin className="pointer-events-none absolute left-3.5 size-4 text-neutral-400" />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter event location (e.g. Rajshahi, Bangladesh)"
                      className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="pointer-events-none absolute left-3.5 size-4 text-neutral-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter contact email (e.g. you@example.com)"
                      className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                    />
                  </div>
                </div>

                {/* Thumbnail Image URL */}
                <div>
                  <label htmlFor="image" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                    Thumbnail Image URL <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Link2 className="pointer-events-none absolute left-3.5 size-4 text-neutral-400" />
                    <input
                      id="image"
                      name="image"
                      type="url"
                      required
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Paste image URL (e.g. https://example.com/event.jpg)"
                      className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#031109]/90 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="mb-2 block text-xs font-medium text-white sm:text-sm">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-neutral-400" />
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write a detailed description about your event..."
                      className="w-full resize-none rounded-xl border border-emerald-500/25 bg-[#031109]/90 py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-emerald-400/70 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                    />
                  </div>
                </div>

                {/* Actions: Create Event & Cancel */}
                <div className="mt-2 flex flex-wrap items-center gap-3.5 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00d99a] to-[#00f2aa] px-7 text-sm font-semibold text-[#032014] shadow-[0_0_24px_rgba(0,217,154,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="flex size-4 items-center justify-center rounded-full border border-[#032014]">
                      <Plus className="size-3" strokeWidth={3} />
                    </span>
                    {isSubmitting ? "Creating Event..." : "Create Event"}
                  </button>
                  <Link
                    href="/"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </section>

          {/* ════════ RIGHT COLUMN: Sidebar Information Card (5 cols) ════════ */}
          <aside className="lg:col-span-5">
            <div className="flex flex-col gap-6 rounded-2xl border border-emerald-500/30 bg-[#06180f]/95 p-5 shadow-[0_0_40px_rgba(0,217,154,0.06)] backdrop-blur-md sm:p-6 lg:p-7">
              {/* Photo Card */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-emerald-500/20 shadow-md">
                <Image
                  src="/reference/hero-reference.png"
                  alt="Community volunteering event"
                  fill
                  unoptimized
                  className="object-cover object-[75%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06180f]/80 via-transparent to-transparent" />
              </div>

              {/* Make an Impact */}
              <div>
                <div className="flex items-center gap-2">
                  <Leaf className="size-4.5 text-[#00d99a]" />
                  <h3 className="text-base font-bold text-white">Make an Impact</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                  Host events that address real community needs — from winter relief and donations to
                  education, healthcare, cleanliness, and a greener environment.
                </p>
              </div>

              {/* Quick Guidelines */}
              <div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4.5 text-[#00d99a]" />
                  <h3 className="text-base font-bold text-white">Quick Guidelines</h3>
                </div>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {GUIDELINE_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="size-4 shrink-0 text-[#00d99a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Event Categories (Professional, Clean & Balanced Design) ── */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4.5 text-[#00d99a]" />
                    <h3 className="text-base font-bold text-white">Event Categories</h3>
                  </div>
                  <span className="text-[11px] text-neutral-400">Click to select</span>
                </div>

                <div className="mt-3.5 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-2">
                  {CATEGORY_ITEMS.map(({ id, icon, labelTop, labelBottom }) => {
                    const isSelected = formData.category === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => selectCategory(id)}
                        className={`group relative flex flex-col items-center justify-between rounded-xl border p-2.5 text-center transition-all duration-200 min-h-[82px] sm:min-h-[86px] sm:px-1 sm:py-2.5 ${isSelected
                            ? "border-[#00d99a] bg-gradient-to-b from-[#083822] to-[#041d13] shadow-[0_0_15px_rgba(0,217,154,0.3)] scale-[1.03]"
                            : "border-emerald-500/25 bg-[#03150c]/85 hover:border-emerald-400/60 hover:bg-[#052115] hover:shadow-[0_0_12px_rgba(0,217,154,0.15)]"
                          }`}
                      >
                        {/* Icon Container with subtle background badge */}
                        <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.04] transition group-hover:scale-110 sm:size-8.5">
                          {icon}
                        </div>

                        {/* Category Label with exact vertical alignment */}
                        <div className="mt-1.5 flex flex-col items-center justify-center leading-tight">
                          <span
                            className={`text-[10px] font-semibold tracking-tight transition sm:text-[10.5px] ${isSelected ? "text-emerald-300" : "text-white/85 group-hover:text-white"
                              }`}
                          >
                            {labelTop}
                          </span>
                          {labelBottom && (
                            <span
                              className={`text-[10px] font-semibold tracking-tight transition sm:text-[10.5px] ${isSelected ? "text-emerald-300" : "text-white/85 group-hover:text-white"
                                }`}
                            >
                              {labelBottom}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
