"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  ImageIcon,
  Layers,
  Link2,
  MapPin,
  Pencil,
  Save,
  Type,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EditEventForm {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  thumbnailUrl: string;
  description: string;
}

interface EditEventDetailsProps {
  initialValues: EditEventForm;
  onSave: (values: EditEventForm) => Promise<void> | void;
  onClose: () => void;
  isSaving?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Food Awareness",
  "Winter Relief",
  "Blood Camp",
  "Education",
  "Greenery",
  "Healthcare",
  "Donation",
  "Cleanliness",
];

const TIME_OPTIONS = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

export function EditEventDetails({
  initialValues,
  onSave,
  onClose,
  isSaving = false,
}: EditEventDetailsProps) {
  const [form, setForm] = useState<EditEventForm>(initialValues);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    initialValues.thumbnailUrl
  );
  const [urlInputValue, setUrlInputValue] = useState(
    initialValues.thumbnailUrl
  );

  const handleUrlChange = (val: string) => {
    setUrlInputValue(val);
    setForm((prev) => ({ ...prev, thumbnailUrl: val }));
  };

  const handleChangeImage = () => {
    setImagePreviewUrl(urlInputValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ ...form, thumbnailUrl: urlInputValue });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit Event"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* ── Modal Container (No ugly browser scrollbar, clean rounded border) ── */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[28px] border border-emerald-500/25 bg-[#04160d] shadow-[0_0_80px_rgba(0,217,154,0.12)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

        {/* ── Modal Header with Top-Right Subtle Neon Glow Waves ── */}
        <div className="relative overflow-hidden rounded-t-[28px] border-b border-emerald-500/20 px-6 py-5 sm:px-7">
          {/* Top-Right Neon Decorative Curves matching reference */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 h-36 w-56 opacity-40"
            viewBox="0 0 200 120"
            fill="none"
          >
            <path
              d="M200 10 Q140 30 110 120"
              stroke="#00d99a"
              strokeWidth="1.5"
            />
            <path
              d="M200 25 Q155 45 130 120"
              stroke="#00d99a"
              strokeWidth="1.2"
              opacity="0.7"
            />
            <path
              d="M200 40 Q170 60 150 120"
              stroke="#00d99a"
              strokeWidth="0.8"
              opacity="0.4"
            />
          </svg>

          <div className="relative z-10 flex items-start gap-4">
            {/* Pencil Icon Badge */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-[#00d99a]/25 to-[#10b981]/15 text-[#00d99a] shadow-[0_0_15px_rgba(0,217,154,0.2)]">
              <Pencil className="size-5" />
            </div>

            {/* Title & Subtitle */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Edit Event
              </h2>
              <p className="mt-0.5 text-xs text-neutral-400">
                Update the details for this community event.
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/25 bg-[#061f13] text-neutral-400 transition hover:bg-[#09291b] hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* ── Form Body with Single Seamless Inputs (No dividing vertical lines) ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5 sm:px-7 sm:py-6">

          {/* 1. Event Title */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-neutral-200">
              Event Title <span className="text-rose-400">*</span>
            </label>
            <div className="relative flex h-11 items-center rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 transition focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/20">
              <Type className="size-4 shrink-0 text-[#00d99a] mr-3" />
              <input
                type="text"
                required
                placeholder="e.g. Community Food Distribution Drive"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>

          {/* 2. Event Category & Event Date (2 Columns) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Event Category */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-neutral-200">
                Event Category <span className="text-rose-400">*</span>
              </label>
              <div className="relative flex h-11 items-center rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 transition focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/20">
                <Layers className="size-4 shrink-0 text-[#00d99a] mr-3" />
                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="h-full flex-1 appearance-none bg-transparent pr-6 text-sm text-white outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#051c11] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>

            {/* Event Date */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-neutral-200">
                Event Date <span className="text-rose-400">*</span>
              </label>
              <div className="relative flex h-11 items-center rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 transition focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/20">
                <CalendarDays className="size-4 shrink-0 text-[#00d99a] mr-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Nov 7, 2026"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="h-full flex-1 bg-transparent pr-6 text-sm text-white placeholder:text-neutral-500 outline-none"
                />
                <CalendarDays className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
          </div>

          {/* 3. Event Time & Location (2 Columns) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Event Time */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-neutral-200">
                Event Time <span className="text-rose-400">*</span>
              </label>
              <div className="relative flex h-11 items-center rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 transition focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/20">
                <Clock className="size-4 shrink-0 text-[#00d99a] mr-3" />
                <select
                  required
                  value={form.time}
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                  className="h-full flex-1 appearance-none bg-transparent pr-6 text-sm text-white outline-none"
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t} className="bg-[#051c11] text-white">
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-neutral-200">
                Location <span className="text-rose-400">*</span>
              </label>
              <div className="relative flex h-11 items-center rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 transition focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/20">
                <MapPin className="size-4 shrink-0 text-[#00d99a] mr-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajshahi, Bangladesh"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Thumbnail Image URL */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-neutral-200">
              Thumbnail Image URL <span className="text-rose-400">*</span>
            </label>
            <div className="relative flex h-11 items-center rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-3.5 transition focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/20">
              <Link2 className="size-4 shrink-0 text-[#00d99a] mr-3" />
              <input
                type="url"
                placeholder="https://example.com/event-image.jpg"
                value={urlInputValue}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>

          {/* 5. Image Preview & Change Image Button Row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            {/* Preview thumbnail */}
            <div className="relative aspect-[16/9] w-full max-w-[280px] overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#020d06] shrink-0 shadow-[0_0_15px_rgba(0,217,154,0.05)]">
              {imagePreviewUrl ? (
                <Image
                  src={imagePreviewUrl}
                  alt="Event thumbnail preview"
                  fill
                  unoptimized
                  className="object-cover object-center"
                  onError={() => setImagePreviewUrl("")}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-600">
                  <ImageIcon className="size-10" />
                </div>
              )}
            </div>

            {/* Change Image CTA & format hint */}
            <div className="flex flex-col items-start gap-2">
              <button
                type="button"
                onClick={handleChangeImage}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-[#061f13] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_12px_rgba(0,217,154,0.1)] transition hover:border-emerald-400 hover:bg-[#0a2e1d] active:scale-95"
              >
                <ImageIcon className="size-3.5 text-[#00d99a]" />
                <span>Change Image</span>
              </button>
              <p className="text-[11px] leading-tight text-neutral-400">
                Use a valid image URL
                <br />
                (JPG, PNG, WebP).
              </p>
            </div>
          </div>

          {/* 6. Description */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-neutral-200">
              Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Write a detailed description about this event..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full resize-none rounded-xl border border-emerald-500/25 bg-[#03130a]/80 p-3.5 text-xs sm:text-sm text-neutral-200 placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20"
            />
          </div>

          {/* ── Footer Actions ── */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-emerald-500/25 bg-[#04160d] px-6 py-2.5 text-xs sm:text-sm font-semibold text-neutral-200 transition hover:bg-[#072417] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00d99a] to-[#00f2aa] px-7 py-2.5 text-xs sm:text-sm font-bold text-[#032014] shadow-[0_0_20px_rgba(0,217,154,0.35)] transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="size-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
