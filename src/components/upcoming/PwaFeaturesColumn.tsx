"use client";

/**
 * PwaFeaturesColumn — Left 7-column architecture showcase & PWA status
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

import { DEMO_PWA_HIGHLIGHTS } from "@/lib/mock-data";
import { usePwaStatus } from "@/components/pwa/usePwaStatus";

interface PwaFeaturesColumnProps {
  onTriggerInstallTest: () => void;
}

export default function PwaFeaturesColumn({
  onTriggerInstallTest,
}: PwaFeaturesColumnProps) {
  const { serviceWorkerActive, serviceWorkerSupported, cacheStorageAvailable } = usePwaStatus();

  const swStatusText = serviceWorkerActive
    ? "Active 🟢"
    : serviceWorkerSupported
    ? "প্রস্তুত হচ্ছে 🟡"
    : "অসমর্থিত ⚪";

  const cacheStatusText = cacheStorageAvailable ? "সক্রিয় (Available)" : "অসমর্থিত";

  return (
    <div className="lg:col-span-7 flex flex-col gap-space-md">
      <div>
        <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider">
          PWA v2.0 ইঞ্জিন
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">
          ইন্টারনেট ছাড়াই চলবে পুরো ফার্মেসি ডিসপেনসারি
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 leading-relaxed">
          বিদ্যুৎ বা ইন্টারনেট না থাকলেও ওষুধ বিক্রি বা জরুরি স্টক চেক কখনোই থামবে না। ক্লায়েন্ট-সাইড অফলাইন সিনক্রোনাইজেশন প্রযুক্তিতে ঔষধBox আপনার ডিভাইসের ব্রাউজারেই সরাসরি কার্যকর।
        </p>
      </div>

      {/* 4 Architectural Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        {DEMO_PWA_HIGHLIGHTS.map((hl) => (
          <div
            key={hl.id}
            className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-low border border-[var(--color-border)]"
          >
            <div className={`p-2 rounded-lg shrink-0 ${hl.colorClass}`}>
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                {hl.icon}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                {hl.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {hl.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PWA Status Badge Card */}
      <div className="p-space-md rounded-xl bg-surface-container flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm border border-[var(--color-border)]">
        <div className="flex items-center gap-space-sm">
          <span className="flex h-3 w-3 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                serviceWorkerActive ? "bg-tertiary" : "bg-primary"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                serviceWorkerActive ? "bg-tertiary" : "bg-primary"
              }`}
            />
          </span>
          <span className="font-semibold text-on-surface">
            সার্ভিস ওয়ার্কার: {swStatusText}
          </span>
        </div>

        <div className="flex items-center gap-space-md text-on-surface-variant">
          <span>
            ক্যাশ স্টোরেজ:{" "}
            <strong className="text-on-surface">{cacheStatusText}</strong>
          </span>
          <span>•</span>
          <span>
            ম্যানিফেস্ট:{" "}
            <strong className="text-primary font-bold">সক্রিয় (v1.0)</strong>
          </span>
        </div>

        <button
          onClick={onTriggerInstallTest}
          className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            download_done
          </span>
          <span>ইনস্টল টেস্ট রান</span>
        </button>
      </div>
    </div>
  );
}
