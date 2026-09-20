"use client";

/**
 * AdminMedicineTable — Central Medicine Data Registry Table
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import Link from "next/link";
import { toBengaliNumeral } from "@/lib/utils";
import type { AdminMedicineItem } from "@/types";

interface AdminMedicineTableProps {
  medicines: AdminMedicineItem[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (item: AdminMedicineItem) => void;
  onDelete: (item: AdminMedicineItem) => void;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export default function AdminMedicineTable({
  medicines,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
  currentPage,
  totalCount,
  onPageChange,
}: AdminMedicineTableProps) {
  const isAllSelected =
    medicines.length > 0 && medicines.every((m) => selectedIds.has(m.id));

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-[var(--color-border)] overflow-hidden flex flex-col">
      {/* Table responsive container */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left font-body-md text-body-md border-collapse">
          <thead>
            <tr className="bg-surface-container-high/60 text-on-surface font-label-md text-label-md select-none border-b border-[var(--color-border)]">
              <th className="p-space-sm w-10 text-center">
                <input
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded accent-primary w-4 h-4 cursor-pointer"
                  type="checkbox"
                  aria-label="সব সিলেক্ট করুন"
                />
              </th>
              <th className="p-space-sm font-semibold">ওষুধের নাম ও ডোজ</th>
              <th className="p-space-sm font-semibold">জেনেরিক উপাদান</th>
              <th className="p-space-sm font-semibold">প্রস্তুতকারক কোম্পানি</th>
              <th className="p-space-sm text-right font-semibold">MRP (টাকা)</th>
              <th className="p-space-sm text-right font-semibold">ডিসকাউন্ট</th>
              <th className="p-space-sm text-center font-semibold">স্ট্যাটাস</th>
              <th className="p-space-sm text-center font-semibold">অ্যাকশনস</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-border)]">
            {medicines.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-space-xl text-center text-on-surface-variant">
                  <div className="flex flex-col items-center justify-center gap-space-xs py-8">
                    <span className="material-symbols-outlined text-4xl text-outline">
                      inventory_2
                    </span>
                    <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                      কোনো ওষুধ পাওয়া যায়নি
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      ফিল্টার পরিবর্তন করুন বা নতুন ওষুধ যুক্ত করুন।
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              medicines.map((med, idx) => {
                const isSelected = selectedIds.has(med.id);
                const isEven = idx % 2 === 1;

                return (
                  <tr
                    key={med.id}
                    className={`transition-colors group ${
                      isSelected
                        ? "bg-primary/5"
                        : isEven
                        ? "bg-surface-container-lowest/70 hover:bg-surface-container-low"
                        : "hover:bg-surface-container-low"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-space-sm text-center">
                      <input
                        checked={isSelected}
                        onChange={() => onToggleSelect(med.id)}
                        className="rounded accent-primary w-4 h-4 cursor-pointer"
                        type="checkbox"
                        aria-label={`সিলেক্ট করুন ${med.tradeName}`}
                      />
                    </td>

                    {/* Trade Name & Form */}
                    <td className="p-space-sm">
                      <div className="flex items-center gap-space-xs">
                        <span
                          className={`p-1.5 rounded-lg shrink-0 ${
                            med.iconType === "liquid"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg" aria-hidden="true">
                            {med.iconType === "liquid"
                              ? "medication_liquid"
                              : med.iconType === "injection"
                              ? "vaccines"
                              : "pill"}
                          </span>
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-lg text-label-lg font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                            {med.tradeName}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {med.strength} • {med.dosageForm}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Generic */}
                    <td className="p-space-sm text-on-surface-variant font-medium">
                      {med.genericName}
                    </td>

                    {/* Manufacturer */}
                    <td className="p-space-sm">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        {med.manufacturer}
                      </span>
                    </td>

                    {/* MRP */}
                    <td className="p-space-sm text-right font-semibold text-on-surface whitespace-nowrap">
                      {med.mrpFormatted}
                    </td>

                    {/* Discount */}
                    <td className="p-space-sm text-right font-medium text-tertiary whitespace-nowrap">
                      {toBengaliNumeral(med.discountPct)}%
                    </td>

                    {/* Status */}
                    <td className="p-space-sm text-center whitespace-nowrap">
                      {med.status === "live" && (
                        <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                          লাইভ
                        </span>
                      )}
                      {med.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-error" />
                          পেন্ডিং
                        </span>
                      )}
                      {med.status === "draft" && (
                        <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                          খসড়া
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-space-sm text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onEdit(med)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary shadow-sm transition-all cursor-pointer"
                          title="এডিট করুন"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>

                        <button
                          onClick={() => onDelete(med)}
                          className="p-1.5 rounded-lg bg-surface-container-low text-error hover:bg-error hover:text-on-error shadow-sm transition-all cursor-pointer"
                          title="ডিলিট করুন"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>

                        <Link
                          href={med.slugId ? `/medicines/${med.slugId}` : `/medicines`}
                          className="p-1.5 rounded-lg bg-surface-container-low text-secondary hover:bg-secondary hover:text-on-secondary shadow-sm transition-all inline-flex items-center justify-center"
                          title="প্রিভিউ ও বিস্তারিত"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="p-space-sm bg-surface-container-low border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          মোট {toBengaliNumeral(totalCount)}টির মধ্যে ১-{toBengaliNumeral(medicines.length)}টি প্রদর্শিত
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-space-sm py-1 rounded font-label-sm text-label-sm transition-all ${
              currentPage === 1
                ? "bg-surface-container-lowest/50 text-outline opacity-50 cursor-not-allowed"
                : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
            }`}
            type="button"
          >
            পূর্ববর্তী
          </button>

          <button
            className="px-space-sm py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm"
            type="button"
          >
            {toBengaliNumeral(currentPage)}
          </button>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-all cursor-pointer"
            type="button"
          >
            {toBengaliNumeral(currentPage + 1)}
          </button>

          <span className="px-1 text-on-surface-variant">...</span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-all cursor-pointer"
            type="button"
          >
            পরের পৃষ্ঠা
          </button>
        </div>
      </div>
    </div>
  );
}
