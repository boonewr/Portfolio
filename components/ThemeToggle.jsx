"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

function getPreferredTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function getThemeSnapshot() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function subscribeToTheme(callback) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const handleSystemTheme = () => {
    if (!window.localStorage.getItem("theme")) {
      applyTheme(getPreferredTheme());
      callback();
    }
  };

  applyTheme(getPreferredTheme());
  window.addEventListener("themechange", callback);
  window.addEventListener("storage", callback);
  media.addEventListener("change", handleSystemTheme);

  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", handleSystemTheme);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => "dark");
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => {
        window.localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
        window.dispatchEvent(new Event("themechange"));
      }}
      className="glass-panel focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-primary"
    >
      <SunIcon className="hidden h-4 w-4 dark:block" />
      <MoonIcon className="h-4 w-4 dark:hidden" />
    </button>
  );
}
