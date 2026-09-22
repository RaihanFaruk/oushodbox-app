"use client";

/**
 * TimeGreetingBadge — Soft neon time-of-day greeting badge for public visitors.
 * Displays local device time-based greetings:
 * 5:00–11:59  → "শুভ সকাল ☀️"
 * 12:00–16:59 → "শুভ দুপুর 🌤️"
 * 17:00–20:59 → "শুভ সন্ধ্যা 🌆"
 * 21:00–4:59  → "শুভ রাত্রি 🌙"
 */

import { useState, useEffect } from "react";
import { t } from "@/lib/i18n";

export interface TimeGreetingBadgeProps {
  className?: string;
}

export function getTimeGreeting(now: Date = new Date()): string {
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) {
    return t("greetings.morning");
  }
  if (hour >= 12 && hour < 17) {
    return t("greetings.afternoon");
  }
  if (hour >= 17 && hour < 21) {
    return t("greetings.evening");
  }
  return t("greetings.night");
}

export default function TimeGreetingBadge({ className = "" }: TimeGreetingBadgeProps) {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    // Read visitor's local device time on client mount
    setGreeting(getTimeGreeting());

    // Update greeting if user keeps session open across time threshold
    const interval = setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!greeting) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border select-none transition-all duration-300 bg-emerald-50/90 text-emerald-800 border-emerald-300/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/60 soft-neon-greeting ${className}`}
      role="status"
      aria-label={greeting}
    >
      <span
        className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"
        aria-hidden="true"
      />
      <span className="tracking-tight font-medium">{greeting}</span>
    </div>
  );
}
