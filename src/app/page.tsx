"use client";

/**
 * ঔষধBox Home Dashboard
 * Phase 2 — Migrated from Stitch home_dashboard/code.html
 *
 * Layout:
 *  - Desktop: Sidebar (left) + main content area (right)
 *  - Mobile: Full-width scrollable content + fixed bottom nav
 */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Layout
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// Home sections
import GreetingBanner from "@/components/home/GreetingBanner";
import SearchBar from "@/components/home/SearchBar";
import QuickActionCard from "@/components/home/QuickActionCard";
import StatCard from "@/components/home/StatCard";
import MedicineListItem, {
  databaseMedicineToHomeItem,
  type HomeMedicineItem,
} from "@/components/home/MedicineListItem";
import DgdaNoticePanel from "@/components/home/DgdaNoticePanel";
import RecentActivityPanel from "@/components/home/RecentActivityPanel";
import PwaInstallPanel from "@/components/home/PwaInstallPanel";

// Data
import {
  DEMO_STATS,
  QUICK_ACTIONS,
} from "@/lib/mock-data";
import { getMedicines as getFirestoreMedicines } from "@/lib/firestore/medicines";
import { getMedicines as getCachedMedicines } from "@/lib/pwa/db";

export default function HomePage() {
  const [medicineListOpacity, setMedicineListOpacity] = useState(1);
  const [notifCount] = useState(3);
  const [medicines, setMedicines] = useState<HomeMedicineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const medicineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadHomeMedicines() {
      setIsLoading(true);
      try {
        const docs = await getFirestoreMedicines();
        if (isMounted) {
          setMedicines(docs.slice(0, 6).map(databaseMedicineToHomeItem));
        }
      } catch {
        try {
          const cached = await getCachedMedicines();
          if (isMounted) {
            setMedicines(cached.slice(0, 6).map(databaseMedicineToHomeItem));
          }
        } catch {
          if (isMounted) setMedicines([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadHomeMedicines();
    return () => {
      isMounted = false;
    };
  }, []);

  // Search feedback: flash opacity like the original Stitch JS
  function handleSearch(query: string) {
    setMedicineListOpacity(0.5);
    setTimeout(() => setMedicineListOpacity(1), 300);
  }

  return (
    <div className="flex min-h-dvh bg-canvas">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top Header (mobile + desktop) ─────────────────── */}
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-[var(--color-border)] px-space-margin-mobile lg:px-margin py-3 flex items-center justify-between">
          {/* Mobile: logo */}
          <div className="flex items-center gap-space-sm lg:hidden">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)" }}
            >
              Rx
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              ঔষধBox
            </span>
          </div>

          {/* Desktop: page title */}
          <div className="hidden lg:flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-lg" aria-hidden="true">home</span>
            <h1 className="font-label-lg text-label-lg font-semibold text-on-surface">হোম ড্যাশবোর্ড</h1>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-space-sm">
            {/* Notification bell */}
            <button
              type="button"
              className="relative p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              aria-label={`${notifCount}টি নতুন নোটিফিকেশন`}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">notifications</span>
              {notifCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full text-[9px] flex items-center justify-center font-bold">
                  {notifCount}
                </span>
              )}
            </button>

            {/* Settings (desktop only) */}
            <button
              type="button"
              className="hidden lg:flex p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              aria-label="সেটিংস"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">settings</span>
            </button>
          </div>
        </header>

        {/* ── Main content ───────────────────────────────────── */}
        <main className="flex-1 px-space-margin-mobile lg:px-margin py-space-md lg:py-space-lg flex flex-col gap-space-md pb-20 lg:pb-space-lg">

          {/* 1. Greeting Banner */}
          <GreetingBanner />

          {/* 2. Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* 3. Quick Actions Grid */}
          <section aria-label="দ্রুত কার্যক্রম">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {QUICK_ACTIONS.map((action) => (
                <QuickActionCard key={action.id} action={action} />
              ))}
            </div>
          </section>

          {/* 4. Statistics Row */}
          <section aria-label="পরিসংখ্যান">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
              {DEMO_STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </section>

          {/* 5 + 6. Main 12-col content layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">

            {/* LEFT 8 cols: Medicine list */}
            <section className="lg:col-span-8 flex flex-col gap-space-md" aria-label="সাম্প্রতিক ঔষধ তালিকা">
              {/* Section header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">medication</span>
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    সাম্প্রতিক ঔষধ রেকর্ড
                  </h2>
                </div>
                <Link
                  href="/medicines"
                  className="flex items-center gap-0.5 font-label-sm text-label-sm text-primary font-semibold hover:underline"
                >
                  সব দেখুন
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
                </Link>
              </div>

              {/* Medicine records */}
              <div
                ref={medicineContainerRef}
                id="medicine-records-container"
                className="flex flex-col gap-space-sm transition-opacity duration-300"
                style={{ opacity: medicineListOpacity }}
                aria-live="polite"
                aria-label="ঔষধ তালিকা"
              >
                {isLoading ? (
                  <div className="p-8 text-center text-on-surface-variant font-body-sm flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-2xl text-primary">progress_activity</span>
                    <span>ঔষধ তালিকা লোড হচ্ছে...</span>
                  </div>
                ) : medicines.length > 0 ? (
                  medicines.map((medicine) => (
                    <MedicineListItem key={medicine.id} medicine={medicine} />
                  ))
                ) : (
                  <div className="p-8 text-center rounded-xl bg-surface-container-lowest border border-dashed border-[var(--color-border)]">
                    <span className="material-symbols-outlined text-3xl text-outline mb-2">medication</span>
                    <p className="font-headline-sm text-on-surface font-semibold">কোনো ঔষধ পাওয়া যায়নি</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">ডেটাবেসে কোনো রেকর্ড নেই। এডমিন প্যানেল থেকে ঔষধ যোগ করুন।</p>
                    <Link
                      href="/admin"
                      className="mt-4 inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-on-primary text-label-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                      এডমিন প্যানেলে যান
                    </Link>
                  </div>
                )}
              </div>

              {/* Load more / All medicines */}
              <Link
                href="/medicines"
                className="w-full py-3 rounded-xl border border-[var(--color-border)] text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-all flex items-center justify-center gap-space-xs"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">database</span>
                সকল ঔষধ ডাটাবেস দেখুন
              </Link>
            </section>

            {/* RIGHT 4 cols: Activity + Notices + PWA */}
            <aside className="lg:col-span-4 flex flex-col gap-space-md" aria-label="সহায়তা প্যানেল">
              <RecentActivityPanel />
              <DgdaNoticePanel />
              <PwaInstallPanel />
            </aside>
          </div>
        </main>

        {/* ── Desktop Footer ─────────────────────────────────── */}
        <footer className="hidden lg:block w-full bg-surface-container-lowest py-space-md px-margin border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
            <p>
              ঔষধBox v1.2.0 — ফার্মাসিউটিক্যাল ম্যানেজমেন্ট সিস্টেম — তথ্যসূত্র: DGDA নিবন্ধিত
            </p>
            <div className="flex items-center gap-space-md">
              <span className="text-primary font-medium">বাংলাদেশ: ঢাকা-১২০৮</span>
              <span className="text-secondary font-medium">Rx লাইসেন্স প্রাপ্ত</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
}
