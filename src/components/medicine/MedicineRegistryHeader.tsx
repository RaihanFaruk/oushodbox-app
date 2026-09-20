"use client";

/**
 * MedicineRegistryHeader — Top Registry Context Bar with view toggles & state simulation
 * Preserved faithfully from Stitch medicine_database design.
 */

import type { MedicineViewMode, MedicineSimState } from "@/types";

interface MedicineRegistryHeaderProps {
  viewMode: MedicineViewMode;
  onViewModeChange: (mode: MedicineViewMode) => void;
  simState: MedicineSimState;
  onToggleSimState: (state: MedicineSimState) => void;
}

export default function MedicineRegistryHeader({
  viewMode,
  onViewModeChange,
  simState,
  onToggleSimState,
}: MedicineRegistryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="flex items-center gap-space-md">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-3xl" aria-hidden="true">
            local_pharmacy
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs flex-wrap">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              ওষুধ ডাটাবেস
            </h1>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
              লাইভ ডিজিডিএ সিঙ্ক
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            বাংলাদেশ ন্যাশনাল ফর্মুলারি ও ডিজিডিএ অনুমোদিত জেনেরিক ও ব্র্যান্ড ইনভেন্টরি
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        {/* Table View Toggle */}
        <button
          type="button"
          onClick={() => {
            onViewModeChange("table");
            if (simState !== "normal") onToggleSimState("normal");
          }}
          className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            viewMode === "table" && simState === "normal"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            table_rows
          </span>
          <span className="hidden sm:inline">টেবিল ভিউ</span>
        </button>

        {/* Grid View Toggle */}
        <button
          type="button"
          onClick={() => {
            onViewModeChange("grid");
            if (simState !== "normal") onToggleSimState("normal");
          }}
          className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            viewMode === "grid" && simState === "normal"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            grid_view
          </span>
          <span className="hidden sm:inline">গ্রিড ভিউ</span>
        </button>

        {/* Empty State Simulation Button */}
        <button
          type="button"
          onClick={() =>
            onToggleSimState(simState === "empty" ? "normal" : "empty")
          }
          className={`flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm transition-colors cursor-pointer ${
            simState === "empty"
              ? "bg-secondary text-white"
              : "bg-surface-container-low text-secondary hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            search_off
          </span>
          <span>{simState === "empty" ? "স্বাভাবিক দেখুন" : "খালি ফলাফল"}</span>
        </button>

        {/* Skeleton Load Simulation Button */}
        <button
          type="button"
          onClick={() =>
            onToggleSimState(simState === "skeleton" ? "normal" : "skeleton")
          }
          className={`flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm transition-colors cursor-pointer ${
            simState === "skeleton"
              ? "bg-secondary text-white"
              : "bg-surface-container-low text-secondary hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            hourglass_empty
          </span>
          <span>{simState === "skeleton" ? "স্বাভাবিক দেখুন" : "স্কেলিটন লোড"}</span>
        </button>
      </div>
    </div>
  );
}
