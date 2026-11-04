"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation for empty fields (must run BEFORE any auth request)
    if (!email.trim() || !password) {
      toast.add({
        title: "Required Fields",
        description: "Please enter your email and password.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (res?.error) {
        toast.add({
          title: "Login Failed",
          description:
            res.error.message || "Invalid email or password. Please try again.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (res?.data?.user && typeof window !== "undefined") {
        localStorage.setItem("unitevia_user", JSON.stringify(res.data.user));
      }

      toast.add({
        title: "Welcome Back!",
        description: "Successfully logged in.",
        type: "success",
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong during login.";
      toast.add({
        title: "Login Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
 
  // Handle Google login
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    console.log("Google login data:", data);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#031109] px-4 py-12 text-white selection:bg-emerald-500 selection:text-black">
      {/* ── Background Dotted Particle Wave Mesh (Left Side) ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/2 h-[750px] w-[500px] -translate-y-1/2 opacity-40 lg:opacity-50"
        viewBox="0 0 500 750"
        fill="none"
      >
        <path
          d="M -50 100 C 150 150, 300 350, 50 650"
          stroke="#00d99a"
          strokeWidth="2"
          strokeDasharray="2 7"
          opacity="0.9"
        />
        <path
          d="M -30 140 C 180 200, 320 380, 70 670"
          stroke="#00d99a"
          strokeWidth="2"
          strokeDasharray="2 7"
          opacity="0.75"
        />
        <path
          d="M -10 180 C 210 240, 340 410, 90 690"
          stroke="#00d99a"
          strokeWidth="1.8"
          strokeDasharray="2 8"
          opacity="0.6"
        />
        <path
          d="M 10 220 C 230 280, 350 440, 110 710"
          stroke="#00d99a"
          strokeWidth="1.8"
          strokeDasharray="2 8"
          opacity="0.45"
        />
        <path
          d="M 30 260 C 250 320, 360 470, 130 730"
          stroke="#00d99a"
          strokeWidth="1.6"
          strokeDasharray="2 9"
          opacity="0.3"
        />
        <path
          d="M 50 300 C 270 360, 370 500, 150 750"
          stroke="#00d99a"
          strokeWidth="1.5"
          strokeDasharray="2 9"
          opacity="0.2"
        />
      </svg>

      {/* ── Background Dotted Particle Wave Mesh (Right Side) ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 h-[750px] w-[500px] -translate-y-1/2 opacity-40 lg:opacity-50"
        viewBox="0 0 500 750"
        fill="none"
      >
        <path
          d="M 550 100 C 350 150, 200 350, 450 650"
          stroke="#00d99a"
          strokeWidth="2"
          strokeDasharray="2 7"
          opacity="0.9"
        />
        <path
          d="M 530 140 C 320 200, 180 380, 430 670"
          stroke="#00d99a"
          strokeWidth="2"
          strokeDasharray="2 7"
          opacity="0.75"
        />
        <path
          d="M 510 180 C 290 240, 160 410, 410 690"
          stroke="#00d99a"
          strokeWidth="1.8"
          strokeDasharray="2 8"
          opacity="0.6"
        />
        <path
          d="M 490 220 C 270 280, 150 440, 390 710"
          stroke="#00d99a"
          strokeWidth="1.8"
          strokeDasharray="2 8"
          opacity="0.45"
        />
        <path
          d="M 470 260 C 250 320, 140 470, 370 730"
          stroke="#00d99a"
          strokeWidth="1.6"
          strokeDasharray="2 9"
          opacity="0.3"
        />
      </svg>

      {/* ── Background Ambient Radial Glows ── */}
      <div className="pointer-events-none absolute -left-40 top-1/4 size-[480px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 size-[480px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/5 blur-[120px]" />

      {/* Decorative Starry Sparkles */}
      <div className="pointer-events-none absolute left-[12%] top-[18%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute right-[14%] top-[15%] size-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      <div className="pointer-events-none absolute left-[10%] bottom-[22%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
      <div className="pointer-events-none absolute right-[11%] bottom-[20%] size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

      {/* ── Main Login Card ── */}
      <div className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-[28px] border border-emerald-500/25 bg-[#04160e]/95 p-8 shadow-[0_0_80px_rgba(0,217,154,0.08)] backdrop-blur-xl sm:rounded-[32px] sm:p-10">
        {/* Subtle Top & Bottom Border Center Highlights */}
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#00d99a] to-transparent opacity-80" />
        <div className="pointer-events-none absolute inset-x-16 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00d99a] to-transparent opacity-60" />

        {/* ── Brand Logo & Title ── */}
        <Link
          href="/"
          className="mx-auto flex items-center justify-center gap-2.5 transition hover:opacity-90"
        >
          <div className="relative size-10 sm:size-11">
            <Image
              src="/assets/logo.jpg"
              alt="Unitevia Logo"
              fill
              priority
              unoptimized
              className="rounded-full object-contain mix-blend-screen"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white sm:text-[26px]">
            Unitevia
          </span>
        </Link>

        {/* ── Heading ── */}
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-[28px]">
            <span className="text-white">Welcome </span>
            <span className="bg-gradient-to-r from-[#00d99a] to-[#00f2aa] bg-clip-text text-transparent">
              Back
            </span>
          </h1>
          <p className="mt-1.5 text-xs text-neutral-300 sm:text-sm">
            Login to your <span className="font-semibold text-white">Unitevia</span> account
          </p>
        </div>

        {/* ── Login Form ── */}
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {/* 1. Email Address */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-200 sm:text-[13px]">
              <Mail className="size-4 text-[#00d99a]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 sm:h-12 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 px-4 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/25"
            />
          </div>

          {/* 2. Password */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-200 sm:text-[13px]">
              <Lock className="size-4 text-[#00d99a]" />
              <span>Password</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 sm:h-12 w-full rounded-xl border border-emerald-500/25 bg-[#03130a]/80 pl-4 pr-11 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/25"
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

          {/* 3. Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-0.5 text-xs sm:text-[13px]">
            <label className="flex cursor-pointer select-none items-center gap-2 text-neutral-300 transition hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 rounded border-emerald-500/30 bg-[#03130a] text-[#00d99a] accent-[#00d99a] focus:ring-0"
              />
              <span>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="font-medium text-[#00d99a] transition hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* 4. Log In Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#00e599] text-sm font-bold text-[#032014] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition hover:bg-[#00f2aa] hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            <LogIn className="size-4.5 text-[#032014]" />
            <span>{loading ? "Logging in..." : "Log In"}</span>
          </button>

          {/* 5. Divider */}
          <div className="relative flex items-center py-1.5">
            <div className="h-px flex-1 bg-emerald-500/20" />
            <span className="px-3 text-xs text-neutral-400">Or</span>
            <div className="h-px flex-1 bg-emerald-500/20" />
          </div>

          {/* 6. Continue with Google Button (UI design only) */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#051c11]/80 text-sm font-medium text-white shadow-sm transition hover:border-emerald-400 hover:bg-[#08291a] active:scale-95"
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
            <span>Log in with Google</span>
          </button>
        </form>

        {/* ── Sign Up Navigation Link ── */}
        <div className="mt-6 text-center text-xs text-neutral-400 sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#00d99a] transition hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
