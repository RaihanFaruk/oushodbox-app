"use client";

/**
 * MedicineNotFound — Polished Bengali error/not-found screen for invalid medicine IDs
 */

import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

interface MedicineNotFoundProps {
  id: string;
}

export default function MedicineNotFound({ id }: MedicineNotFoundProps) {
  return (
    <div className="flex min-h-screen bg-surface font-body-md text-body-md text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        <main className="flex-1 p-space-md lg:p-margin flex flex-col items-center justify-center max-w-4xl mx-auto w-full text-center">
          <div className="p-space-xl rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col items-center max-w-md w-full">
            <div className="w-20 h-20 rounded-full bg-error-container/40 flex items-center justify-center text-error mb-space-md">
              <span className="material-symbols-outlined text-5xl" aria-hidden="true">
                medication
              </span>
            </div>

            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              ওষুধটি খুঁজে পাওয়া যায়নি
            </h1>

            <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-space-lg leading-relaxed">
              আপনার অনুসন্ধানকৃত ওষুধ আইডি &ldquo;<span className="font-mono text-error font-semibold">{id}</span>&rdquo; আমাদের ডাটাবেজে অন্তর্ভুক্ত নেই।
            </p>

            <Link
              href="/medicines"
              className="inline-flex items-center gap-space-xs px-space-lg py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                arrow_back
              </span>
              <span>ওষুধ ডাটাবেসে ফিরে যান</span>
            </Link>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
