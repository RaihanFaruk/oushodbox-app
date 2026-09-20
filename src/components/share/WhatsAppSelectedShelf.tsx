"use client";

/**
 * WhatsAppSelectedShelf — Micro shelf showing selected medicine chips and subtotal
 * Preserved faithfully from Stitch whatsapp_share_ui design.
 */

import Link from "next/link";
import { toBengaliNumeral } from "@/lib/utils";
import type { PrescriptionShareItem } from "@/types";

interface WhatsAppSelectedShelfProps {
  items: PrescriptionShareItem[];
  onRemoveItem: (id: string) => void;
  totalPrice: number;
}

export default function WhatsAppSelectedShelf({
  items,
  onRemoveItem,
  totalPrice,
}: WhatsAppSelectedShelfProps) {
  const getDotColorClass = (color?: string) => {
    if (color === "secondary") return "bg-secondary";
    if (color === "tertiary") return "bg-tertiary";
    return "bg-primary";
  };

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-sm flex-wrap flex-1">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold select-none">
          আইটেম লিস্ট:
        </span>

        {items.length === 0 ? (
          <span className="text-body-sm text-on-surface-variant italic">
            কোনো ওষুধ নির্বাচিত নেই। তালিকা থেকে ওষুধ যোগ করুন।
          </span>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="inline-flex items-center gap-space-xs px-space-sm py-1.5 rounded-xl bg-surface-container-low text-on-surface shadow-xs transition-all animate-in fade-in duration-150"
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${getDotColorClass(
                  item.colorDot
                )}`}
              ></span>
              <div className="flex flex-col text-left">
                <span className="font-label-md text-label-md font-semibold">
                  {item.nameBn} ({item.name})
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {item.company} • {item.priceFormatted}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                title={`${item.name} মুছে ফেলুন`}
                aria-label={`${item.name} মুছে ফেলুন`}
                className="p-0.5 rounded-full text-outline hover:text-error transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  close
                </span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Total Cost Capsule */}
      <div className="flex items-center justify-between md:justify-end gap-space-md pt-space-xs md:pt-0 border-t md:border-t-0 border-[var(--color-border)]">
        <div className="text-right">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">
            মোট আনুমানিক খুচরা মূল্য
          </span>
          <span className="font-headline-sm text-headline-sm text-primary font-bold">
            ৳{toBengaliNumeral(totalPrice.toFixed(2))}
          </span>
        </div>
        <Link
          href="/medicines"
          className="px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            add_circle
          </span>
          <span>আরও যোগ করুন</span>
        </Link>
      </div>
    </div>
  );
}
