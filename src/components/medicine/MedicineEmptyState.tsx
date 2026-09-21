"use client";

/**
 * MedicineEmptyState — Clean empty state for no search/filter results
 * Preserved faithfully from Stitch medicine_database design.
 */

interface MedicineEmptyStateProps {
  onResetFilters: () => void;
  onQuickSearchNapa?: () => void;
  isDatabaseEmpty?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

export default function MedicineEmptyState({
  onResetFilters,
  onQuickSearchNapa,
  isDatabaseEmpty,
  isError,
  errorMessage,
  onRetry,
}: MedicineEmptyStateProps) {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-space-xl text-center rounded-xl bg-surface-container-lowest shadow-sm">
        <div className="w-20 h-20 rounded-full bg-error-container/30 flex items-center justify-center text-error mb-space-md">
          <span className="material-symbols-outlined text-5xl text-error" aria-hidden="true">
            cloud_off
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
          তথ্য লোড করতে সমস্যা হয়েছে
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1 mb-space-lg">
          {errorMessage || "সার্ভার বা ডেটাবেসের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করুন।"}
        </p>
        {onRetry && (
          <div className="flex flex-wrap items-center justify-center gap-space-sm">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">refresh</span>
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        )}
      </div>
    );
  }

  if (isDatabaseEmpty) {
    return (
      <div className="flex flex-col items-center justify-center p-space-xl text-center rounded-xl bg-surface-container-lowest shadow-sm">
        <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant mb-space-md">
          <span className="material-symbols-outlined text-5xl text-outline" aria-hidden="true">
            medication
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
          ডেটাবেসে কোনো ওষুধ সংরক্ষিত নেই
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1 mb-space-lg">
          বর্তমানে ঔষধBox ডেটাবেসে কোনো ওষুধ যুক্ত করা হয়নি। অ্যাডমিন প্যানেল থেকে ওষুধ যুক্ত করার পর এখানে তালিকা দেখতে পাবেন।
        </p>
        {onRetry && (
          <div className="flex flex-wrap items-center justify-center gap-space-sm">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">refresh</span>
              রিফ্রেশ করুন
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-space-xl text-center rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant mb-space-md">
        <span className="material-symbols-outlined text-5xl text-outline" aria-hidden="true">
          search_off
        </span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
        কোনো ওষুধ পাওয়া যায়নি
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1 mb-space-lg">
        আপনার অনুসন্ধানকৃত নামের সাথে মেলেনি। বানান পরীক্ষা করুন অথবা বিকল্প জেনেরিক গ্রুপ বা প্রস্তুতকারকের নাম দিয়ে চেষ্টা করুন।
      </p>
      <div className="flex flex-wrap items-center justify-center gap-space-sm">
        <button
          type="button"
          onClick={onResetFilters}
          className="px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all cursor-pointer"
        >
          সকল ফিল্টার মুছুন
        </button>
        {onQuickSearchNapa && (
          <button
            type="button"
            onClick={onQuickSearchNapa}
            className="px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            &apos;Napa&apos; দিয়ে অনুসন্ধান করুন
          </button>
        )}
      </div>
    </div>
  );
}
