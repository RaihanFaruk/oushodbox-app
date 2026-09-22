"use client";

/**
 * MedicineCard — Clinical medicine registry card
 * Preserved faithfully from Stitch medicine_database design.
 */

import Link from "next/link";
import type { DatabaseMedicine } from "@/types";

interface MedicineCardProps {
  medicine: DatabaseMedicine;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShareWhatsApp: (medicine: DatabaseMedicine) => void;
}

export default function MedicineCard({
  medicine,
  isSelected,
  onToggleSelect,
  isFavorite,
  onToggleFavorite,
  onShareWhatsApp,
}: MedicineCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col gap-space-sm">
        {/* Card Header: Checkbox + Name + Badges + Favorite */}
        <div className="flex items-start justify-between gap-space-xs">
          <div className="flex items-start gap-space-sm">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(medicine.id)}
              aria-label={`${medicine.tradeName} নির্বাচন করুন`}
              className="medicine-select-checkbox mt-1 w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs flex-wrap">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {medicine.tradeName}
                </h2>
                {medicine.isRx ? (
                  <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                    Rx Only
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-medium">
                    {medicine.dosageBadge}
                  </span>
                )}
              </div>
              {medicine.manufacturer ? (
                <span className="font-body-sm text-body-sm text-secondary font-medium">
                  {medicine.manufacturer}
                </span>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(medicine.id)}
            title={isFavorite ? "প্রিয় তালিকা থেকে সরান" : "প্রিয় তালিকায় যুক্ত করুন"}
            aria-label={isFavorite ? "প্রিয় তালিকা থেকে সরান" : "প্রিয় তালিকায় যুক্ত করুন"}
            className={`transition-colors cursor-pointer p-1 rounded-lg hover:bg-surface-container ${
              isFavorite ? "text-primary" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              aria-hidden="true"
            >
              {isFavorite ? "star" : "star"}
            </span>
          </button>
        </div>

        {/* Generic Composition & Pack Size */}
        {(medicine.genericName || medicine.packSize) && (
          <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
            {medicine.genericName && (
              <>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                  {medicine.itemType === "other" ? "উপাদান / স্পেসিফিকেশন:" : "জেনেরিক উপাদান:"}
                </span>
                <p className="font-body-sm text-body-sm text-on-surface font-medium line-clamp-2">
                  {medicine.genericName}
                </p>
              </>
            )}
            {medicine.packSize && (
              <div className="flex items-center gap-space-xs mt-1">
                <span className="material-symbols-outlined text-xs text-primary" aria-hidden="true">
                  inventory_2
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  প্যাক সাইজ: {medicine.packSize}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Pricing & Discount */}
        <div className="flex items-baseline justify-between pt-1">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              {medicine.unitPriceFormatted}{" "}
              <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                {medicine.unitPriceUnit}
              </span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {medicine.boxPriceFormatted}
            </span>
          </div>
          <span className="px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
            {medicine.discountFormatted}
          </span>
        </div>

        {/* Stock & Timestamp */}
        <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-xs">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-tertiary" aria-hidden="true">
              check_circle
            </span>
            <span>{medicine.stockStatus}</span>
          </span>
          <span className="opacity-75">{medicine.lastUpdated}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-space-sm pt-space-md mt-space-sm">
        <Link
          href={`/medicines/${medicine.id}`}
          className="flex items-center justify-center gap-1 py-2 px-space-sm rounded-lg bg-surface-container-low text-primary font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            info
          </span>
          <span>বিস্তারিত দেখুন</span>
        </Link>
        <button
          type="button"
          onClick={() => onShareWhatsApp(medicine)}
          className="flex items-center justify-center gap-1 py-2 px-space-sm rounded-lg bg-[#25D366] text-white font-label-md text-label-md shadow-sm hover:opacity-90 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            share
          </span>
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
