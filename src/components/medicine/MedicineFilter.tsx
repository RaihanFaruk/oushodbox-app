"use client";

/**
 * MedicineFilter — 4-column multi-filter matrix strip
 * Preserved faithfully from Stitch medicine_database design.
 */

import {
  GENERIC_FILTER_OPTIONS,
  DOSAGE_FORM_FILTER_OPTIONS,
  MANUFACTURER_FILTER_OPTIONS,
  SORT_OPTIONS,
} from "@/lib/mock-data";

interface MedicineFilterProps {
  genericFilter: string;
  onGenericChange: (value: string) => void;
  dosageFormFilter: string;
  onDosageFormChange: (value: string) => void;
  manufacturerFilter: string;
  onManufacturerChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function MedicineFilter({
  genericFilter,
  onGenericChange,
  dosageFormFilter,
  onDosageFormChange,
  manufacturerFilter,
  onManufacturerChange,
  sortBy,
  onSortChange,
}: MedicineFilterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
      {/* Filter 1: Generic Group */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="genericSelect"
          className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
            science
          </span>
          <span>জেনেরিক গ্রুপ</span>
        </label>
        <select
          id="genericSelect"
          value={genericFilter}
          onChange={(e) => onGenericChange(e.target.value)}
          aria-label="জেনেরিক গ্রুপ নির্বাচন করুন"
          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all"
        >
          {GENERIC_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter 2: Dosage Form */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="dosageFormSelect"
          className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
            medication_liquid
          </span>
          <span>ডোজ ফরম</span>
        </label>
        <select
          id="dosageFormSelect"
          value={dosageFormFilter}
          onChange={(e) => onDosageFormChange(e.target.value)}
          aria-label="ডোজ ফরম নির্বাচন করুন"
          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all"
        >
          {DOSAGE_FORM_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter 3: Pharmaceutical Manufacturer */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="manufacturerSelect"
          className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
            domain
          </span>
          <span>কোম্পানি / ব্র্যান্ড</span>
        </label>
        <select
          id="manufacturerSelect"
          value={manufacturerFilter}
          onChange={(e) => onManufacturerChange(e.target.value)}
          aria-label="কোম্পানি বা ব্র্যান্ড নির্বাচন করুন"
          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all"
        >
          {MANUFACTURER_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter 4: Price Range & Sort */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="sortSelect"
          className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
            sort
          </span>
          <span>সর্টিং ও মূল্য</span>
        </label>
        <select
          id="sortSelect"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="সর্টিং ও মূল্য নির্বাচন করুন"
          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
