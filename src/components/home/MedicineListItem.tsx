"use client";

/**
 * MedicineListItem — Section 5: Single medicine row card
 * Preserved from Stitch home_dashboard medicine list.
 */

import type { DemoMedicine } from "@/lib/mock-data";
import { shareToWhatsApp } from "@/lib/utils";

const dosageColorMap: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
};

const extraBadgeBgMap: Record<string, string> = {
  normal: "bg-secondary-container text-on-secondary-container",
  rx: "bg-error-container text-on-error-container font-semibold",
  schedule: "bg-amber-tint text-warning font-semibold",
};

interface MedicineListItemProps {
  medicine: DemoMedicine;
}

export default function MedicineListItem({ medicine }: MedicineListItemProps) {
  const dosageColor = dosageColorMap[medicine.dosageColor] ?? "text-primary";

  function handleShare() {
    shareToWhatsApp(
      `${medicine.tradeName} ${medicine.strength}`,
      medicine.genericName,
      medicine.manufacturer,
      medicine.price
    );
  }

  return (
    <div className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
      {/* Left: Icon + Info */}
      <div className="flex items-start gap-space-md min-w-0">
        {/* Dosage form icon block */}
        <div className={`w-12 h-12 rounded-xl bg-surface-container-high flex flex-col items-center justify-center shrink-0 ${dosageColor}`}>
          <span className="font-label-sm text-label-sm font-bold leading-none">
            {medicine.dosageForm}
          </span>
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            {medicine.dosageForm === "Rx" ? "science" : medicine.dosageForm === "CAP" ? "medication" : "pill"}
          </span>
        </div>

        {/* Medicine details */}
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {medicine.tradeName}
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              {medicine.strength}
            </span>
            {medicine.extraBadge && (
              <span
                className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm ${
                  extraBadgeBgMap[medicine.extraBadgeType ?? "normal"]
                }`}
              >
                {medicine.extraBadge}
              </span>
            )}
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant truncate">
            <strong className="font-medium text-on-surface">{medicine.genericLabel}</strong>{" "}
            {medicine.genericName}
          </p>
          <span className="font-label-sm text-label-sm text-outline">
            {medicine.manufacturer}
          </span>
        </div>
      </div>

      {/* Right: Price + Share button */}
      <div className="flex items-center justify-between sm:justify-end gap-space-md shrink-0 border-t border-[var(--color-border)] sm:border-t-0 pt-2 sm:pt-0">
        <div className="text-left sm:text-right">
          <div className="font-headline-sm text-headline-sm font-bold text-primary">
            {medicine.price}{" "}
            <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
              {medicine.priceUnit}
            </span>
          </div>
          <div
            className={`font-label-sm text-label-sm ${
              medicine.stockType === "error"
                ? "text-error"
                : medicine.stockType === "warning"
                ? "text-warning"
                : "text-outline"
            }`}
          >
            {medicine.stockInfo}
          </div>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-tertiary text-on-tertiary font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
          aria-label={`${medicine.tradeName} WhatsApp এ শেয়ার করুন`}
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">share</span>
          <span>শেয়ার</span>
        </button>
      </div>
    </div>
  );
}
