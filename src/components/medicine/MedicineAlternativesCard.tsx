"use client";

/**
 * MedicineAlternativesCard — Equivalent generic brands & risk assessment safety chart
 * Preserved faithfully from Stitch medicine_details design.
 */

import { useState } from "react";
import type { MedicineMonograph } from "@/types";

interface MedicineAlternativesCardProps {
  monograph: MedicineMonograph;
  onCompareBrand?: (brandName: string) => void;
}

export default function MedicineAlternativesCard({
  monograph,
  onCompareBrand,
}: MedicineAlternativesCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { alternatives, safetyRating } = monograph;

  const displayList = expanded ? alternatives : alternatives.slice(0, 4);

  return (
    <div className="flex flex-col gap-space-md">
      {/* Brand Alternatives Container */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col">
        <div className="flex items-center justify-between pb-space-sm border-b-0">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
              swap_horiz
            </span>
            <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
              বিকল্প জেনেরিক ব্র্যান্ড
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-secondary font-medium">
            একই কম্বিনেশন
          </span>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
          {monograph.tradeName} এর অনুরূপ শক্তি ({monograph.genericName}) বিশিষ্ট অন্যান্য বিশ্বস্ত প্রস্তুতকারকের ওষুধ:
        </p>

        {/* List of Alternatives */}
        {alternatives.length > 0 ? (
          <div className="flex flex-col gap-space-xs">
            {displayList.map((alt, idx) => (
              <div
                key={idx}
                className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high/60 transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    {alt.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {alt.manufacturer}
                  </span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-md text-label-md font-bold text-primary">
                    {alt.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => onCompareBrand?.(alt.name)}
                    className="px-space-xs py-1 rounded bg-surface-container-lowest text-secondary font-label-sm text-label-sm hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer"
                  >
                    রেফারেন্স
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body-sm text-body-sm text-on-surface-variant p-space-sm rounded-xl bg-surface-container-low">
            বিকল্প ব্র্যান্ডের তথ্য বর্তমানে ডেটাবেসে সংরক্ষিত নেই।
          </p>
        )}

        {alternatives.length > 4 && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-space-sm w-full py-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>
              {expanded
                ? "সংক্ষিপ্ত রূপ দেখুন"
                : `সকল বিকল্প ব্র্যান্ড দেখুন (${alternatives.length}টি)`}
            </span>
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              {expanded ? "expand_less" : "expand_more"}
            </span>
          </button>
        )}
      </div>

      {/* Quick Safety Indicator Graphic Card - Only rendered when verified clinical rating exists */}
      {safetyRating && safetyRating.score > 0 && (
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            রিস্ক অ্যাসেসমেন্ট
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              {safetyRating.label}
            </span>
            <span className="font-label-sm text-label-sm text-tertiary font-bold">
              {safetyRating.scoreLabel}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden mt-1">
            <div
              className="h-full bg-tertiary rounded-full transition-all duration-500"
              style={{ width: `${safetyRating.score}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
