"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "unitevia_theme";

/**
 * Dedicated theme toggle component.
 *
 * Cycles Light → Dark → System. The resolved class ("light" / "dark") is
 * applied to <html>; System mode follows the OS preference live. The mode is
 * persisted in localStorage, and layout.tsx pre-paints the resolved class to
 * avoid theme flashing and hydration mismatches.
 *
 * Note: the project previously had no theme infrastructure (dark was
 * hardcoded on <html>), so this component owns all of the toggle logic and
 * the Navbar only renders it.
 */

// Theme mode lives in localStorage and is read through an external store so
// the component never calls setState synchronously inside an effect.
function subscribeThemeMode(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("unitevia-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("unitevia-theme-change", callback);
  };
}

function getThemeModeSnapshot(): ThemeMode {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

function getThemeModeServerSnapshot(): ThemeMode {
  return "system";
}

const noopSubscribe = () => () => {};
const mountedSnapshot = () => true;
const mountedServerSnapshot = () => false;

export function ThemeToggle() {
  const mode = useSyncExternalStore(
    subscribeThemeMode,
    getThemeModeSnapshot,
    getThemeModeServerSnapshot
  );
  // mounted must flip on the client only — no setState-in-effect
  const mounted = useSyncExternalStore(
    noopSubscribe,
    mountedSnapshot,
    mountedServerSnapshot
  );

  // Apply the resolved theme to <html> and keep system mode in sync with the OS
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const resolved =
        mode === "system" ? (media.matches ? "dark" : "light") : mode;
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
    };

    apply();

    if (mode === "system") {
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    }
  }, [mode]);

  const cycleMode = () => {
    const next: ThemeMode =
      mode === "light" ? "dark" : mode === "dark" ? "system" : "light";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore persistence failures
    }
    // Notify subscribers so the external-store snapshot updates
    window.dispatchEvent(new Event("unitevia-theme-change"));
  };

  // Pre-hydration pose mirrors the SSR snapshot ("system" → Monitor)
  const Icon = !mounted
    ? Monitor
    : mode === "light"
      ? Sun
      : mode === "dark"
        ? Moon
        : Monitor;

  const label =
    mode === "light"
      ? "Theme: Light (click for Dark)"
      : mode === "dark"
        ? "Theme: Dark (click for System)"
        : "Theme: System (click for Light)";

  return (
    <button
      type="button"
      onClick={cycleMode}
      aria-label={label}
      title={label}
      className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-neutral-300 transition hover:bg-white/10 hover:text-white"
    >
      <Icon className="size-4" />
    </button>
  );
}
