"use client";

/**
 * UpcomingFeatureCard — Individual Innovation Bento Card with custom preview slot
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

import { toBengaliNumeral } from "@/lib/utils";
import type { UpcomingFeatureItem } from "@/types";

interface UpcomingFeatureCardProps {
  feature: UpcomingFeatureItem;
  onSelect: (feature: UpcomingFeatureItem) => void;
}

export default function UpcomingFeatureCard({
  feature,
  onSelect,
}: UpcomingFeatureCardProps) {
  // Icon and accent colors
  const getIconContainerStyle = () => {
    switch (feature.colorScheme) {
      case "error":
        return "bg-error-container/40 text-error";
      case "secondary":
        return "bg-secondary-fixed/40 text-on-secondary-fixed-variant";
      case "tertiary":
        return "bg-tertiary-container/20 text-tertiary";
      case "surface":
        return "bg-surface-container-highest text-on-surface";
      default:
        return "bg-primary-container/10 text-primary";
    }
  };

  const getModuleTagStyle = () => {
    switch (feature.colorScheme) {
      case "error":
        return "text-error";
      case "secondary":
        return "text-secondary";
      case "tertiary":
        return "text-tertiary";
      case "surface":
        return "text-on-surface-variant";
      default:
        return "text-primary";
    }
  };

  return (
    <div
      onClick={() => onSelect(feature)}
      className="group flex flex-col justify-between p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm border border-[var(--color-border)] cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(feature);
        }
      }}
    >
      <div className="flex flex-col gap-space-md">
        {/* Top: Icon & COMING SOON pill */}
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform ${getIconContainerStyle()}`}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {feature.icon}
            </span>
          </div>
          <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider">
            COMING SOON
          </span>
        </div>

        {/* Module info */}
        <div className="flex flex-col gap-1">
          <span
            className={`font-label-sm text-label-sm font-bold tracking-widest uppercase ${getModuleTagStyle()}`}
          >
            {feature.moduleNo}
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {feature.title}
          </h3>
          <p className="font-label-md text-label-md text-secondary">
            {feature.titleEn}
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant pt-1 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Dynamic Mini Visual Preview Slot */}
        <div className="mt-1">
          {/* 1. Stock Bar */}
          {feature.previewType === "stock_bar" && (
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex flex-col gap-1.5">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>{feature.previewData?.drugName || "নমুনা ঔষধ ফরম্যুলেশন"}</span>
                <span className="text-error font-semibold">
                  {feature.previewData?.remainingText || "মাত্র ১৮ পাতা অবশিষ্ট"}
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-error h-full rounded-full"
                  style={{ width: `${feature.previewData?.fillPct || 14}%` }}
                />
              </div>
            </div>
          )}

          {/* 2. Expiry Badge */}
          {feature.previewType === "expiry_badge" && (
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">
                {feature.previewData?.drugName || "নমুনা ক্যাপসুল"}
              </span>
              <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold">
                {feature.previewData?.daysLeft || "৫৮ দিন বাকি"}
              </span>
            </div>
          )}

          {/* 3. Barcode */}
          {feature.previewType === "barcode" && (
            <div className="p-space-xs rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex items-center justify-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-lg text-primary">barcode</span>
              <span className="font-label-sm text-label-sm font-mono tracking-widest">
                {feature.previewData?.barcodeNumber || "৮ ৯ ৪ ১ ১ ০ ৩ ৯ ৭ ২ ০ ১"}
              </span>
            </div>
          )}

          {/* 4. POS Cash Memo */}
          {feature.previewType === "pos_bill" && (
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">
                {feature.previewData?.billSummary || "মোট বিল (৩টি আইটেম):"}
              </span>
              <span className="font-bold text-primary">
                {feature.previewData?.totalFormatted || "৳ ৪২০.০০ (১০% ছাড়)"}
              </span>
            </div>
          )}

          {/* 5. Refill Alert */}
          {feature.previewType === "refill_alert" && (
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base shrink-0">
                notifications_active
              </span>
              <span className="font-label-sm text-label-sm text-on-surface truncate">
                {feature.previewData?.patientAlert || "আব্দুল করিম: আগামী ৫ তারিখে ইনসুলিন রিফিল"}
              </span>
            </div>
          )}

          {/* 6. Depot Schedule */}
          {feature.previewType === "depot_schedule" && (
            <div className="flex items-center justify-between px-space-sm py-space-xs rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] font-label-sm text-label-sm">
              <span className="text-on-surface font-medium">
                {feature.previewData?.companyName || "Square Pharma (ডিপো ১)"}
              </span>
              <span className="text-secondary font-medium">
                {feature.previewData?.schedule || "অর্ডার ডে: রবিবার/বুধবার"}
              </span>
            </div>
          )}

          {/* 7. Sparkline */}
          {feature.previewType === "sparkline" && (
            <div className="p-space-xs rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                {feature.previewData?.growthText || "মাসিক প্রবৃদ্ধি: +১৮.৪%"}
              </span>
              <svg
                className="w-24 h-6 text-primary shrink-0"
                fill="none"
                viewBox="0 0 100 24"
                aria-hidden="true"
              >
                <path
                  d="M0 20 L20 16 L40 18 L60 8 L80 11 L100 2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          )}

          {/* 8. Rx Clinical Alert */}
          {feature.previewType === "rx_alert" && (
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-base shrink-0">
                smart_toy
              </span>
              <span className="font-label-sm text-label-sm text-on-surface truncate">
                {feature.previewData?.interactionAlert || "Rx Alert: Ciprofloxacin + Antacid ইন্টারঅ্যাকশন সনাক্ত!"}
              </span>
            </div>
          )}

          {/* 9. OCR Scan */}
          {feature.previewType === "ocr_scan" && (
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex items-center justify-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-base text-tertiary">
                check_circle
              </span>
              <span className="font-label-sm text-label-sm font-medium truncate">
                {feature.previewData?.scanAccuracy || "OCR ভিশন এআই: ৯২% নির্ভুল শনাক্তকরণ"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Progress & Action Button */}
      <div className="flex items-center justify-between pt-space-md mt-space-md border-t border-[var(--color-border)]">
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          অগ্রগতি: {toBengaliNumeral(feature.progressPct)}% প্রস্তুত
        </span>
        <button
          className="flex items-center gap-1 font-label-md text-label-md text-primary font-semibold group-hover:translate-x-1 transition-transform cursor-pointer"
          type="button"
          aria-label={`নোটিফাই করুন ${feature.title}`}
        >
          <span>নোটিফাই করুন</span>
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
