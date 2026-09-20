"use client";

/**
 * OfflineClient — Client UI for offline fallback page
 */

import Link from "next/link";

export default function OfflineClient() {
  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-space-md bg-surface">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-space-xl shadow-sm border border-[var(--color-border)] flex flex-col items-center text-center gap-space-md">
        {/* Offline Icon Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-4xl" aria-hidden="true">
            cloud_off
          </span>
        </div>

        {/* Headlines */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-widest">
            OFFLINE MODE
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            আপনি এখন অফলাইনে আছেন
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-md">
            ইন্টারনেট সংযোগ নেই, তবে ব্রাউজারে সংরক্ষিত ক্যাশ ও ডেটাবেজ থেকে ঔষধBox ব্যবহার চালিয়ে যেতে পারবেন।
          </p>
        </div>

        {/* Offline Capabilities Card */}
        <div className="w-full p-space-md rounded-xl bg-surface-container-low border border-[var(--color-border)] flex flex-col gap-2 text-left font-label-sm text-label-sm">
          <span className="font-semibold text-on-surface">অফলাইনে যা যা করতে পারবেন:</span>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
            <span>ক্যাশড ওষুধ রেজিস্ট্রি ও মূল্য তালিকা অনুসন্ধান</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
            <span>সংরক্ষিত প্রেসক্রিপশন স্লিপ প্রিন্ট ও প্রিভিউ</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
            <span>নতুন প্রেসক্রিপশন খসড়া তৈরি ও স্থানীয় অডিট ট্রেইল</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full pt-space-xs">
          <button
            onClick={handleReload}
            className="w-full sm:flex-1 py-2.5 px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            <span>আবার চেষ্টা করুন</span>
          </button>

          <Link
            href="/medicines"
            className="w-full sm:flex-1 py-2.5 px-space-md rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg font-medium hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5 text-center"
          >
            <span className="material-symbols-outlined text-lg">medication</span>
            <span>ক্যাশড ওষুধ ব্রাউজ করুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
