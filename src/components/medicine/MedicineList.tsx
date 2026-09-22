"use client";

/**
 * MedicineList — Grid view and high-density clinical Table view
 * Preserved faithfully from Stitch medicine_database design.
 */

import Link from "next/link";
import type { DatabaseMedicine, MedicineViewMode } from "@/types";
import MedicineCard from "./MedicineCard";

interface MedicineListProps {
  medicines: DatabaseMedicine[];
  viewMode: MedicineViewMode;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string) => void;
  onShareWhatsApp: (medicine: DatabaseMedicine) => void;
}

export default function MedicineList({
  medicines,
  viewMode,
  selectedIds,
  onToggleSelect,
  isAllSelected,
  onToggleSelectAll,
  favoriteIds,
  onToggleFavorite,
  onShareWhatsApp,
}: MedicineListProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg w-full">
        {medicines.map((med, idx) => (
          <MedicineCard
            key={med.id ? `${med.id}-${idx}` : `med-card-${idx}`}
            medicine={med}
            isSelected={selectedIds.has(med.id)}
            onToggleSelect={onToggleSelect}
            isFavorite={favoriteIds.has(med.id)}
            onToggleFavorite={onToggleFavorite}
            onShareWhatsApp={onShareWhatsApp}
          />
        ))}
      </div>
    );
  }

  // Table View (Alternative high-density clinical tabular mode)
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-surface-container-lowest shadow-sm">
      <table className="w-full text-left border-collapse min-w-[720px]">
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
            <th className="p-4 w-12 text-center">
              <input
                type="checkbox"
                checked={isAllSelected && medicines.length > 0}
                onChange={onToggleSelectAll}
                aria-label="সবগুলো নির্বাচন করুন"
                className="w-4 h-4 rounded text-primary cursor-pointer"
              />
            </th>
            <th className="p-4">ট্রেড নাম ও ডোজ</th>
            <th className="p-4">জেনেরিক সংমিশ্রণ</th>
            <th className="p-4">প্রস্তুতকারক</th>
            <th className="p-4 text-right">একক মূল্য</th>
            <th className="p-4 text-center">স্টক ও ছাড়</th>
            <th className="p-4 text-center">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody className="divide-y-0 text-on-surface font-body-sm text-body-sm">
          {medicines.map((med, idx) => {
            const isSelected = selectedIds.has(med.id);
            const isRowAlt = idx % 2 === 1;

            return (
              <tr
                key={med.id ? `${med.id}-${idx}` : `med-row-${idx}`}
                className={`transition-colors ${
                  isRowAlt
                    ? "bg-surface-container-low/30 hover:bg-surface-container-low/60"
                    : "hover:bg-surface-container-low/60"
                }`}
              >
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(med.id)}
                    aria-label={`${med.tradeName} নির্বাচন করুন`}
                    className="w-4 h-4 rounded text-primary cursor-pointer"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold block">
                      {med.tradeName}
                    </span>
                    {med.isRx && (
                      <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container text-[10px] font-bold">
                        Rx
                      </span>
                    )}
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {med.dosageBadge}{med.packSize ? ` • ${med.packSize.split(" ")[0]}` : ""}
                  </span>
                </td>
                <td className="p-4 font-medium max-w-xs">{med.genericName || "—"}</td>
                <td className="p-4 text-secondary">{med.manufacturer || "—"}</td>
                <td className="p-4 text-right font-bold text-on-surface">
                  {med.unitPriceFormatted}
                </td>
                <td className="p-4 text-center">
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
                    {med.discountFormatted}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onShareWhatsApp(med)}
                      title="WhatsApp এ শেয়ার করুন"
                      aria-label={`${med.tradeName} WhatsApp এ শেয়ার করুন`}
                      className="p-1.5 rounded-lg bg-[#25D366] text-white hover:opacity-90 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        share
                      </span>
                    </button>
                    <Link
                      href={`/medicines/${med.id}`}
                      title="বিস্তারিত দেখুন"
                      aria-label={`${med.tradeName} বিস্তারিত দেখুন`}
                      className="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-all"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        visibility
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
