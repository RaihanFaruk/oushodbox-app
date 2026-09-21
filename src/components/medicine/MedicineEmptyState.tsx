"use client";

/**
 * MedicineEmptyState — Clean empty state for no search/filter results
 * Preserved faithfully from Stitch medicine_database design.
 */

import Link from "next/link";

interface MedicineEmptyStateProps {
  onResetFilters: () => void;
  isDatabaseEmpty?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

export default function MedicineEmptyState({
  onResetFilters,
  isDatabaseEmpty,
  isError,
  errorMessage,
  onRetry,
}: MedicineEmptyStateProps) {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-surface border border-[var(--color-border)] shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-error mb-4">
          <span className="material-symbols-outlined text-3xl" aria-hidden="true">
            cloud_off
          </span>
        </div>
        <h3 className="text-base font-bold text-on-surface">
          তথ্য লোড করতে সমস্যা হয়েছে
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mt-1 mb-5">
          {errorMessage || "সার্ভার বা ডেটাবেসের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করুন।"}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-primary-dark transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">refresh</span>
            পুনরায় চেষ্টা করুন
          </button>
        )}
      </div>
    );
  }

  if (isDatabaseEmpty) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-surface border border-dashed border-[var(--color-border)] shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
          <span className="material-symbols-outlined text-3xl text-outline" aria-hidden="true">
            medication
          </span>
        </div>
        <h3 className="text-base font-bold text-on-surface">
          ডেটাবেসে কোনো ওষুধ সংরক্ষিত নেই
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm mt-1 mb-5">
          আপনার ব্যক্তিগত মেডিসিন ডেটাবেজ বর্তমানে খালি। অ্যাডমিন প্যানেল থেকে নতুন ওষুধ যোগ করুন।
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-primary-dark transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add</span>
          প্রথম ওষুধ যোগ করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-surface border border-[var(--color-border)] shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
        <span className="material-symbols-outlined text-3xl text-outline" aria-hidden="true">
          search_off
        </span>
      </div>
      <h3 className="text-base font-bold text-on-surface">
        কোনো ওষুধ পাওয়া যায়নি
      </h3>
      <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm mt-1 mb-5">
        অনুসন্ধান বা ফিল্টারের সাথে কোনো ওষুধ মেলেনি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।
      </p>
      <button
        type="button"
        onClick={onResetFilters}
        className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-primary-dark transition-all cursor-pointer"
      >
        সকল ফিল্টার মুছুন
      </button>
    </div>
  );
}
