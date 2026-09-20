"use client";

/**
 * MedicineBulkActions — Bulk selection & WhatsApp batch action panel
 * Preserved faithfully from Stitch medicine_database design.
 */

import { toBengaliNumeral } from "@/lib/utils";

interface MedicineBulkActionsProps {
  totalCount: number;
  selectedCount: number;
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
  onClearSelection: () => void;
  onShareBulkWhatsApp: () => void;
}

export default function MedicineBulkActions({
  totalCount,
  selectedCount,
  isAllSelected,
  onToggleSelectAll,
  onClearSelection,
  onShareBulkWhatsApp,
}: MedicineBulkActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-low">
      <div className="flex items-center gap-space-sm">
        <input
          id="bulkCheckbox"
          type="checkbox"
          checked={isAllSelected && totalCount > 0}
          onChange={onToggleSelectAll}
          disabled={totalCount === 0}
          className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer disabled:opacity-50"
        />
        <label
          htmlFor="bulkCheckbox"
          className="font-label-md text-label-md text-on-surface cursor-pointer select-none"
        >
          সবগুলো নির্বাচন করুন •{" "}
          <span className="font-bold text-primary">
            {toBengaliNumeral(selectedCount)}
          </span>{" "}
          টি নির্বাচিত
        </label>
      </div>

      <div className="flex items-center gap-space-sm w-full sm:w-auto">
        <button
          type="button"
          onClick={onShareBulkWhatsApp}
          disabled={selectedCount === 0}
          className="flex-1 sm:flex-none flex items-center justify-center gap-space-xs px-space-md py-2 rounded-lg bg-[#25D366] text-white font-label-md text-label-md shadow-sm hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            share
          </span>
          <span>নির্বাচিত ওষুধ হোয়াটসঅ্যাপে শেয়ার করুন</span>
        </button>
        <button
          type="button"
          onClick={onClearSelection}
          disabled={selectedCount === 0}
          className="px-space-sm py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          রিসেট
        </button>
      </div>
    </div>
  );
}
