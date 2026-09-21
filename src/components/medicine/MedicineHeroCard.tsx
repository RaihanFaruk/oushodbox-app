"use client";

/**
 * MedicineHeroCard — Bento layout hero card with Drug Identity, Matrix, Actions & Commercial Slate
 * Preserved faithfully from Stitch medicine_details design.
 */

import type { MedicineMonograph } from "@/types";

interface MedicineHeroCardProps {
  monograph: MedicineMonograph;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenWhatsAppDrawer: () => void;
  onPrint: () => void;
  onEditClick: () => void;
}

export default function MedicineHeroCard({
  monograph,
  isFavorite,
  onToggleFavorite,
  onOpenWhatsAppDrawer,
  onPrint,
  onEditClick,
}: MedicineHeroCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (8 Col): Drug Identity and Visual Token */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-space-xs">
            {monograph.isRx ? (
              <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" aria-hidden="true">
                  prescriptions
                </span>
                <span>প্রেসক্রিপশন আবশ্যক (Rx Only)</span>
              </span>
            ) : (
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" aria-hidden="true">
                  check_circle
                </span>
                <span>ওটিসি (OTC Safe)</span>
              </span>
            )}
            {monograph.darNumber && monograph.darNumber !== "তথ্য অপ্রাপ্য" && (
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" aria-hidden="true">
                  verified
                </span>
                <span>DAR: {monograph.darNumber}</span>
              </span>
            )}
          </div>

          {/* Drug Name & Generic Formulation */}
          <div>
            <div className="flex items-baseline gap-space-sm flex-wrap">
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                {monograph.tradeName}
              </h1>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">
                {monograph.tradeNameBn} ({monograph.dosageBadge})
              </span>
            </div>
            <div className="flex items-center gap-space-xs mt-1 flex-wrap">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {monograph.genericName}
              </span>
              <span className="text-outline select-none">•</span>
              <span className="text-secondary font-semibold">
                {monograph.manufacturer}
              </span>
              <span className="text-outline select-none">•</span>
              <span className="text-on-surface-variant font-medium">
                প্ল্যান্ট: {monograph.plantLocation}
              </span>
            </div>
          </div>

          {/* Pharmaceutical Metadata Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
            <div className="p-space-sm rounded-xl bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                স্ট্রেংথ ও ফর্ম
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold block mt-0.5">
                {monograph.genericName.split("+")[0]?.trim() || monograph.genericName}
              </span>
              <span className="font-body-sm text-body-sm text-outline block">
                সক্রিয় ফর্মুলেশন
              </span>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                ডোজেজ ফর্ম
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold block mt-0.5">
                {monograph.dosageBadge}
              </span>
              <span className="font-body-sm text-body-sm text-outline block">
                {monograph.packSize}
              </span>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                থেরাপিউটিক ক্লাস
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold block mt-0.5">
                {monograph.therapeuticClass}
              </span>
              <span className="font-body-sm text-body-sm text-outline block">
                {monograph.therapeuticClassEn}
              </span>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-low col-span-2 sm:col-span-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                প্যাক সাইজ বিন্যাস
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold block mt-0.5">
                {monograph.packFormatDetails}
              </span>
              <span className="font-body-sm text-body-sm text-outline block">
                {monograph.packFormatDetailsEn}
              </span>
            </div>
          </div>

          {/* Action Ribbon */}
          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <button
              type="button"
              onClick={onOpenWhatsAppDrawer}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-space-md py-2.5 rounded-xl bg-tertiary-container text-on-tertiary-container font-label-lg text-label-lg font-bold shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                share
              </span>
              <span>রোগীকে হোয়াটসঅ্যাপে প্রেসক্রিপশন পাঠান</span>
            </button>

            <button
              type="button"
              onClick={onToggleFavorite}
              className={`flex items-center justify-center gap-1.5 px-space-md py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-colors cursor-pointer ${
                isFavorite
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              <span
                className={`material-symbols-outlined text-lg ${
                  isFavorite ? "text-on-primary-container" : "text-primary"
                }`}
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                aria-hidden="true"
              >
                {isFavorite ? "bookmark" : "bookmark_border"}
              </span>
              <span>{isFavorite ? "সংরক্ষিত" : "সংরক্ষণ করুন"}</span>
            </button>

            <button
              type="button"
              onClick={onPrint}
              className="flex items-center justify-center gap-1.5 px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                print
              </span>
              <span>প্রিন্ট মেমো</span>
            </button>

            <button
              type="button"
              onClick={onEditClick}
              className="flex items-center justify-center gap-1.5 px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md font-medium hover:bg-surface-container-high transition-colors ml-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                edit_note
              </span>
              <span>ডাটা এডিট</span>
            </button>
          </div>
        </div>

        {/* Right Column (4 Col): Commercial Pricing & Packaging Visual Box */}
        <div className="lg:col-span-4 flex flex-col gap-space-md w-full">
          {/* Packaging Mock Photo Card */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-sm flex flex-col items-center">
            {/* Using standard img with unoptimized fallback for external demo photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-36 object-cover rounded-lg"
              alt={`${monograph.tradeName} clinical packaging shot`}
              src={monograph.photoUrl}
            />
            <div className="w-full flex items-center justify-between mt-space-xs px-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span>{monograph.stockStatus.split(" ")[0]} (In Stock)</span>
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                ব্যাচ: {monograph.batchNumber}
              </span>
            </div>
          </div>

          {/* Commercial Pricing Slate */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
            <div className="flex items-center justify-between pb-space-xs border-b-0">
              <span className="font-label-md text-label-md text-on-surface-variant">
                খুচরা মূল্য (Unit MRP)
              </span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {monograph.unitPriceFormatted}{" "}
                <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                  {monograph.unitPriceUnit}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between text-body-sm">
              <span className="text-on-surface-variant">প্রতি পাতা (Strip)</span>
              <span className="font-semibold text-on-surface">
                {monograph.stripPriceFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between text-body-sm">
              <span className="text-on-surface-variant">পূর্ণ বক্স মূল্য (Box)</span>
              <span className="font-semibold text-on-surface">
                {monograph.boxPriceFormatted}
              </span>
            </div>

            <div className="mt-space-xs p-space-xs rounded-lg bg-surface-container-highest flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
                  percent
                </span>
                <span className="font-label-sm text-label-sm text-on-surface font-medium">
                  ফার্মেসি মার্জিন (ট্রেড): {monograph.tradeMargin}
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-primary">
                {monograph.tradePriceFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-tertiary" aria-hidden="true">
                  check_circle
                </span>
                <span>ভ্যাট অব্যাহতিপ্রাপ্ত (Govt Exemption)</span>
              </span>
              <span className="text-secondary font-semibold">ক্যাশ মেমো ভ্যালিড</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
