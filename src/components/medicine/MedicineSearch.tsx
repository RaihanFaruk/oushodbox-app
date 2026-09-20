"use client";

/**
 * MedicineSearch — Search input & popular search autocomplete pills
 * Preserved faithfully from Stitch medicine_database design.
 */

import { POPULAR_SEARCH_TERMS } from "@/lib/mock-data";

interface MedicineSearchProps {
  value: string;
  onChange: (value: string) => void;
  onFilterToggle?: () => void;
  onScanClick?: () => void;
}

export default function MedicineSearch({
  value,
  onChange,
  onFilterToggle,
  onScanClick,
}: MedicineSearchProps) {
  return (
    <div className="relative bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
      <div className="flex items-center gap-space-md">
        <div className="relative flex-1 flex items-center">
          <span
            className="material-symbols-outlined absolute left-4 text-primary text-2xl pointer-events-none"
            aria-hidden="true"
          >
            search
          </span>
          <input
            id="searchInput"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ওষুধের ট্রেড নাম, জেনেরিক নাম, বা কোম্পানি খুঁজুন... (e.g. Napa, Paracetamol, Beximco)"
            aria-label="ওষুধ অনুসন্ধান"
            className="w-full pl-12 pr-28 py-3.5 bg-surface-container-low rounded-xl text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
          />
          <div className="absolute right-3 flex items-center gap-1.5">
            <span className="px-space-xs py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-mono select-none">
              EN / বাং
            </span>
            <button
              type="button"
              onClick={onScanClick}
              title="স্ক্যান বারকোড"
              aria-label="স্ক্যান বারকোড"
              className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                barcode_scanner
              </span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onFilterToggle}
          className="hidden lg:flex items-center gap-space-xs px-space-lg py-3.5 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg shadow-sm hover:bg-primary-container transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            filter_alt
          </span>
          <span>স্মার্ট ফিল্টার</span>
        </button>
      </div>

      {/* Live Interactive Autocomplete Dropdown Pill Mock */}
      <div className="flex flex-wrap items-center gap-space-xs mt-space-sm pt-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 select-none">
          <span className="material-symbols-outlined text-sm text-secondary" aria-hidden="true">
            history
          </span>
          <span>জনপ্রিয় অনুসন্ধান:</span>
        </span>
        {POPULAR_SEARCH_TERMS.map((term) => {
          const isSelected = value.toLowerCase() === term.toLowerCase();
          return (
            <button
              key={term}
              type="button"
              onClick={() => onChange(term)}
              className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary font-semibold"
                  : "bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary"
              }`}
            >
              {term}
            </button>
          );
        })}
      </div>
    </div>
  );
}
