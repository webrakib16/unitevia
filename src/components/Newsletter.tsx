import { ArrowRight, Lock, Mail, Send } from "lucide-react";

const DOTS = [
  { left: "8%", top: "30%" },
  { left: "15%", top: "68%" },
  { left: "38%", top: "10%" },
  { left: "62%", top: "84%" },
  { left: "80%", top: "18%" },
  { left: "93%", top: "40%" },
] as const;

export function Subscribe() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Glass container */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#0b140f] px-6 py-14 sm:px-10 md:rounded-[2rem] md:py-16">
          {/* Ambient decorations */}
          <div className="pointer-events-none absolute left-1/2 top-[-6rem] h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 size-56 rounded-full bg-[radial-gradient(circle_at_32%_32%,rgba(52,211,153,0.65),rgba(6,95,70,0.4)_45%,rgba(5,10,8,0)_72%)] opacity-90 blur-[2px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 size-48 rounded-full bg-[radial-gradient(circle_at_32%_32%,rgba(52,211,153,0.5),rgba(6,95,70,0.3)_45%,rgba(5,10,8,0)_72%)] opacity-90 blur-[2px]" />
          <div className="pointer-events-none absolute -right-24 bottom-[-8rem] size-[380px] rounded-full border border-emerald-400/10" />
          <div className="pointer-events-none absolute -left-24 top-[-8rem] size-[380px] rounded-full border border-emerald-400/10" />
          {/* Side mail tile (desktop only, like the reference) */}
          <div className="pointer-events-none absolute left-10 top-1/2 hidden -translate-y-1/2 lg:block">
            <span className="absolute -inset-4 rounded-3xl border border-emerald-400/10" />
            <span className="flex size-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-[#0f1a14] text-emerald-300">
              <Mail className="size-5" aria-hidden="true" />
            </span>
          </div>
          {DOTS.map((dot, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute size-1.5 rounded-full bg-emerald-400"
              style={{ left: dot.left, top: dot.top, opacity: 0.5 + (i % 3) * 0.2 }}
            />
          ))}

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Stay Connected
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-white [text-shadow:0_0_28px_rgba(224,255,240,0.35)]">Subscribe to</span>{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-teal-400 bg-clip-text text-transparent [text-shadow:0_0_28px_rgba(45,212,191,0.25)]">
                Local Cause Alerts
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-neutral-300 md:mt-5">
              Get notified when new community events, volunteer opportunities,
              and local initiatives are organized in your area.
            </p>

            {/* Form */}
            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row md:mt-10">
              <div className="flex flex-1 items-center gap-2 rounded-2xl border border-emerald-500/30 bg-[#0d1a13] p-2 focus-within:border-emerald-400/60">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <input
                  type="email"
                  name="email"
                  aria-label="Email address"
                  placeholder="Enter your email address"
                  className="h-10 w-full min-w-0 border-none bg-transparent px-2 text-sm text-white outline-none placeholder:text-neutral-500"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-7 py-4 text-sm font-semibold text-[#04150c] shadow-[0_0_30px_rgba(52,211,153,0.35)] transition hover:brightness-110"
              >
                <Send className="size-4" aria-hidden="true" />
                Subscribe
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Note */}
            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400 md:text-sm">
              <Lock className="size-3.5" aria-hidden="true" />
              No spam guaranteed. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
