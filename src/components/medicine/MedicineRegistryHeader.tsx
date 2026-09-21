"use client";

/**
 * MedicineRegistryHeader — Top Registry Context Bar with view toggles & state simulation
 * Preserved faithfully from Stitch medicine_database design.
 */

import type { MedicineViewMode, MedicineSimState } from "@/types";

interface MedicineRegistryHeaderProps {
  viewMode: MedicineViewMode;
  onViewModeChange: (mode: MedicineViewMode) => void;
  totalCount?: number;
}

export default function MedicineRegistryHeader({
  viewMode,
  onViewModeChange,
  totalCount,
}: MedicineRegistryHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-[var(--color-border)] shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">
            medication
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-bold text-on-surface tracking-tight">
              ওষুধ ডেটাবেজ
            </h1>
            {typeof totalCount === "number" && (
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                {totalCount} টি রেকর্ড
              </span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant">
            ব্যক্তিগত মেডিসিন ও রেফারেন্স প্রাইস ওয়ার্কস্পেস
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Table View Toggle */}
        <button
          type="button"
          onClick={() => onViewModeChange("table")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            viewMode === "table"
              ? "bg-primary text-white shadow-sm"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            table_rows
          </span>
          <span className="hidden sm:inline">টেবিল ভিউ</span>
        </button>

        {/* Grid View Toggle */}
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            viewMode === "grid"
              ? "bg-primary text-white shadow-sm"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            grid_view
          </span>
          <span className="hidden sm:inline">গ্রিড ভিউ</span>
        </button>
      </div>
    </div>
  );
}
