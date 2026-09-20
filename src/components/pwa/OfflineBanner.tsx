"use client";

/**
 * OfflineBanner — Non-blocking notification banner for offline & reconnection events
 */

import { useState, useEffect } from "react";
import { usePwaStatus } from "./usePwaStatus";

export default function OfflineBanner() {
  const { isOffline, isOnline } = usePwaStatus();
  const [wasOffline, setWasOffline] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setWasOffline(true);
      setShowReconnected(false);
    } else if (wasOffline && isOnline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOffline, isOnline, wasOffline]);

  if (isOffline) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="fixed top-0 left-0 right-0 z-50 bg-error text-on-error px-space-md py-2 text-center font-label-sm text-label-sm shadow-md flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300"
      >
        <span className="material-symbols-outlined text-base" aria-hidden="true">
          cloud_off
        </span>
        <span className="font-semibold">
          অফলাইন মোড সক্রিয় — সংরক্ষিত ক্যাশ ও ডেটাবেজ ব্যবহার করা হচ্ছে
        </span>
      </aside>
    );
  }

  if (showReconnected) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="fixed top-0 left-0 right-0 z-50 bg-tertiary text-on-tertiary px-space-md py-2 text-center font-label-sm text-label-sm shadow-md flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300"
      >
        <span className="material-symbols-outlined text-base" aria-hidden="true">
          cloud_done
        </span>
        <span className="font-semibold">
          ইন্টারনেট সংযোগ পুনরুদ্ধার হয়েছে — লাইভ সিঙ্ক সক্রিয়
        </span>
      </aside>
    );
  }

  return null;
}
