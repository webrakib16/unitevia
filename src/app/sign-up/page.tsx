"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  HeartHandshake,
  Link2,
  Mail,
  Plus,
  ShieldCheck,
  User,
  UserPlus,
  Users,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Password validation rules
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.add({
        title: "Weak Password",
        description: "Please fulfill all password requirements before signing up.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoUrl.trim() || undefined,
      });

      if (res?.error) {
        toast.add({
          title: "Sign Up Failed",
          description: res.error.message || "Failed to create an account. Please try again.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (res?.data?.user && typeof window !== "undefined") {
        localStorage.setItem("unitevia_user", JSON.stringify(res.data.user));
      }

      toast.add({
        title: "Account Created Successfully!",
        description: `Welcome to Unitevia, ${name}! Redirecting...`,
        type: "success",
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong during sign up.";
      toast.add({
        title: "Sign Up Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };


  // Google sign up.
  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to initiate Google sign in.";
      toast.add({
        title: "Google Sign Up Failed",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#031109] text-white">
      {/* ── Background Top-Left Topographic Wave Curves ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 h-[340px] w-[520px] opacity-35"
        viewBox="0 0 400 300"
        fill="none"
      >
        <path d="M0 60 Q120 100 200 0" stroke="#00d99a" strokeWidth="2" />
        <path d="M0 100 Q140 140 240 0" stroke="#00d99a" strokeWidth="1.8" opacity="0.8" />
        <path d="M0 140 Q160 180 280 0" stroke="#00d99a" strokeWidth="1.5" opacity="0.6" />
        <path d="M0 180 Q180 220 320 0" stroke="#00d99a" strokeWidth="1.2" opacity="0.4" />
        <path d="M0 220 Q200 260 360 0" stroke="#00d99a" strokeWidth="1" opacity="0.25" />
      </svg>

      {/* ── Background Bottom-Right Topographic Wave Curves ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-[340px] w-[520px] opacity-35"
        viewBox="0 0 400 300"
        fill="none"
      >
        <path d="M400 240 Q280 200 200 300" stroke="#00d99a" strokeWidth="2" />
        <path d="M400 200 Q260 160 160 300" stroke="#00d99a" strokeWidth="1.8" opacity="0.8" />
        <path d="M400 160 Q240 120 120 300" stroke="#00d99a" strokeWidth="1.5" opacity="0.6" />
        <path d="M400 120 Q220 80 80 300" stroke="#00d99a" strokeWidth="1.2" opacity="0.4" />
      </svg>

      {/* ── Background Ambient Glowing Orbs ── */}
      <div className="pointer-events-none absolute -left-48 top-20 size-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 bottom-32 size-[520px] rounded-full bg-emerald-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-24 top-16 size-[340px] rounded-full bg-emerald-400/5 blur-[120px]" />

      {/* Decorative Starry Sparkles */}
      <div className="pointer-events-none absolute left-[8%] top-[12%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute right-[10%] top-[8%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute left-[5%] bottom-[25%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
      <div className="pointer-events-none absolute right-[6%] bottom-[20%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Top Center Logo ── */}
        <Link
          href="/"
          className="mb-7 flex items-center justify-center gap-3 transition hover:opacity-90 sm:mb-9"
        >
          <div className="relative size-11 sm:size-14">
            <Image
              src="/assets/logo.jpg"
              alt="Unitevia Logo"
              fill
              priority
              unoptimized
              className="rounded-full object-contain mix-blend-screen"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Unitevia
          </span>
        </Link>

        {/* ── Main Split Card Container ── */}
        <div className="relative w-full max-w-[940px] overflow-hidden rounded-[28px] border border-emerald-500/25 bg-[#04160d]/95 shadow-[0_0_80px_rgba(0,217,154,0.08)] backdrop-blur-xl sm:rounded-[32px]">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* ════════ LEFT COLUMN: Graphic & Benefits (5 cols) ════════ */}
            <div className="relative flex flex-col justify-between overflow-hidden border-b border-emerald-500/20 bg-gradient-to-b from-[#051c11]/90 via-[#04160d]/95 to-[#031109] p-8 sm:p-10 md:col-span-5 md:border-b-0 md:border-r">
              {/* Top Text & Benefits Area */}
              <div>
                {/* Headline */}
                <h1 className="text-[26px] font-extrabold leading-[1.15] tracking-tight sm:text-[32px]">
                  <span className="block text-white">Join Unitevia</span>
                  <span className="block text-white">Make a Difference</span>
                  <span className="bg-gradient-to-r from-[#00d99a] to-[#00f2aa] bg-clip-text text-transparent">
                    Together
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-4 text-[13px] leading-relaxed text-neutral-300 sm:text-sm">
                  Be part of a community that creates real social impact through meaningful events and initiatives.
                </p>

                {/* 3 Key Benefits */}
                <div className="mt-8 space-y-5">
                  {/* Benefit 1 */}
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600/25 text-[#00d99a] shadow-[0_0_14px_rgba(0,217,154,0.12)]">
                      <CalendarDays className="size-5" />
                    </div>
                    <span className="text-[13px] font-medium text-neutral-200 sm:text-sm">
                      Discover social impact events
                    </span>
                  </div>

                  {/* Benefit 2 */}
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600/25 text-[#00d99a] shadow-[0_0_14px_rgba(0,217,154,0.12)]">
                      <Plus className="size-5" />
                    </div>
                    <span className="text-[13px] font-medium text-neutral-200 sm:text-sm">
                      Create and manage your own events
                    </span>
                  </div>

                  {/* Benefit 3 */}
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600/25 text-[#00d99a] shadow-[0_0_14px_rgba(0,217,154,0.12)]">
                      <Users className="size-5" />
                    </div>
                    <span className="text-[13px] font-medium text-neutral-200 sm:text-sm">
                      Join and volunteer in your community
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Mountain & Volunteers Illustration */}
              <div className="relative -mx-8 -mb-8 mt-8 h-56 overflow-hidden sm:-mx-10 sm:-mb-10 sm:h-64 md:h-72">
                <Image
                  src="/assets/auth/signup-illustration.png"
                  alt="Unitevia community volunteers"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-top"
                />
                {/* Seamless top gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#04160d]/30 to-[#04160d]" />
              </div>
            </div>

            {/* ════════ RIGHT COLUMN: Sign Up Form (7 cols) ════════ */}
            <div className="flex flex-col justify-center p-8 sm:p-10 md:col-span-7">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-2xl tracking-tight sm:text-[28px]">
                  <span className="font-normal text-white">Create a </span>
                  <span className="font-extrabold bg-gradient-to-r from-[#00d99a] to-[#00f2aa] bg-clip-text text-transparent">
                    New Account
                  </span>
                </h2>
                <p className="mt-1.5 text-xs text-neutral-400 sm:text-sm">
                  Join Unitevia — Make a Difference Together
                </p>

                {/* Pill Badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#062416] px-5 py-1.5 text-xs font-semibold text-emerald-300 shadow-[0_0_12px_rgba(0,217,154,0.1)] sm:text-[13px]">
                  <HeartHandshake className="size-4 text-[#00d99a]" />
                  <span>Social Impact Journey</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                {/* 1. Full Name */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-200 sm:text-[13px]">
                    <User className="size-3.5 text-[#00d99a]" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-4 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/25"
                  />
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-200 sm:text-[13px]">
                    <Mail className="size-3.5 text-[#00d99a]" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-4 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/25"
                  />
                </div>

                {/* 3. Profile Photo URL */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-200 sm:text-[13px]">
                    <Link2 className="size-3.5 text-[#00d99a]" />
                    <span>Profile Photo URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Paste your profile photo URL (e.g. https://...)"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-4 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/25"
                  />
                </div>

                {/* 4. Password */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-200 sm:text-[13px]">
                    <ShieldCheck className="size-3.5 text-[#00d99a]" />
                    <span>Password</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 pl-4 pr-11 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/25"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 flex items-center justify-center text-neutral-400 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4.5" />
                      ) : (
                        <Eye className="size-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 5. Password Validation Checklist */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center gap-2 text-xs">
                    {hasUppercase ? (
                      <CheckCircle2 className="size-3.5 text-[#00d99a]" />
                    ) : (
                      <Circle className="size-3.5 text-neutral-500" />
                    )}
                    <span
                      className={
                        hasUppercase ? "text-emerald-300 font-medium" : "text-neutral-400"
                      }
                    >
                      At least 1 uppercase letter (A – Z)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {hasLowercase ? (
                      <CheckCircle2 className="size-3.5 text-[#00d99a]" />
                    ) : (
                      <Circle className="size-3.5 text-neutral-500" />
                    )}
                    <span
                      className={
                        hasLowercase ? "text-emerald-300 font-medium" : "text-neutral-400"
                      }
                    >
                      At least 1 lowercase letter (a – z)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {hasMinLength ? (
                      <CheckCircle2 className="size-3.5 text-[#00d99a]" />
                    ) : (
                      <Circle className="size-3.5 text-neutral-500" />
                    )}
                    <span
                      className={
                        hasMinLength ? "text-emerald-300 font-medium" : "text-neutral-400"
                      }
                    >
                      Minimum 6 characters in length
                    </span>
                  </div>
                </div>

                {/* 6. Sign Up Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#00e599] text-sm font-bold text-[#032014] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition hover:bg-[#00f2aa] hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UserPlus className="size-4.5 text-[#032014]" />
                  <span>{loading ? "Creating Account..." : "Sign Up"}</span>
                </button>

                {/* 7. Divider */}
                <div className="relative flex items-center py-1">
                  <div className="h-px flex-1 bg-emerald-500/20" />
                  <span className="px-3 text-xs text-neutral-400">Or</span>
                  <div className="h-px flex-1 bg-emerald-500/20" />
                </div>

                {/* 8. Continue with Google Button */}
                <button
                  onClick={handleGoogleSignUp}
                  type="button"
                  disabled={loading || googleLoading}
                  className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#051c11]/80 text-sm font-medium text-white shadow-sm transition hover:border-emerald-400 hover:bg-[#08291a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27A7.18 7.18 0 0 1 4.9 12c0-.79.14-1.57.38-2.27V6.58H1.25A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>{googleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
                </button>
              </form>

              {/* 9. Bottom Navigation Link */}
              <div className="mt-5 text-center text-sm text-neutral-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#00d99a] transition hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
