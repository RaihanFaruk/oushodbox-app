"use client";

/**
 * MedicineWhatsAppDrawer — Collapsible interactive prescription summary preview card
 * Preserved faithfully from Stitch medicine_details design.
 */

import type { MedicineMonograph } from "@/types";

interface MedicineWhatsAppDrawerProps {
  monograph: MedicineMonograph;
  isOpen: boolean;
  onClose: () => void;
}

export default function MedicineWhatsAppDrawer({
  monograph,
  isOpen,
  onClose,
}: MedicineWhatsAppDrawerProps) {
  if (!isOpen) return null;

  const summaryText = `ঔষধBox প্রেসক্রিপশন সামারি (ডেমো): ${monograph.tradeName} (${monograph.genericName})। মাত্রা: চিকিৎসকের পরামর্শে নির্দেশিত অনুযায়ী। মূল্য: ${monograph.unitPriceFormatted}${monograph.unitPriceUnit}। ${monograph.manufacturer}`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(summaryText)}`;

  return (
    <div
      role="region"
      aria-label="হোয়াটসঅ্যাপ প্রেসক্রিপশন প্রিভিউ"
      className="p-space-md rounded-2xl bg-secondary-container text-on-secondary-container shadow-md animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-start justify-between gap-space-md flex-wrap sm:flex-nowrap">
        <div className="flex items-start gap-space-sm">
          <span
            className="material-symbols-outlined text-2xl text-on-secondary-container shrink-0 mt-0.5"
            aria-hidden="true"
          >
            chat
          </span>
          <div>
            <h4 className="font-label-lg text-label-lg font-bold">
              হোয়াটসঅ্যাপ ম্যাসেজ প্রিভিউ তৈরি সম্পন্ন!
            </h4>
            <p className="font-body-sm text-body-sm mt-0.5 opacity-90 leading-relaxed">
              &ldquo;{summaryText}&rdquo;
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-xs shrink-0 self-start mt-2 sm:mt-0">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-secondary font-label-md text-label-md font-bold hover:bg-surface transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>পাঠান</span>
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              open_in_new
            </span>
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="প্রিভিউ বন্ধ করুন"
            className="p-1 rounded-md hover:bg-secondary/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
