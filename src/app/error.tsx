"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] shadow-md flex flex-col items-center text-center gap-4 animate-in fade-in">
        {/* Error Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl">error</span>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">
            একটি অপ্রত্যাশিত সমস্যা হয়েছে
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            সিস্টেমের কোনো একটি অংশে সমস্যা দেখা দিয়েছে। আমরা কোনো সংবেদনশীল তথ্য প্রদর্শন করছি না। অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা হোমপেজে ফিরে যান।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            className="w-full justify-center"
          >
            <span className="material-symbols-outlined text-lg mr-1.5">refresh</span>
            <span>আবার চেষ্টা করুন</span>
          </Button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface border border-[var(--color-border)] text-sm font-semibold transition-all"
          >
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
