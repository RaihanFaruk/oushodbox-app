"use client";

import { useEffect, useState } from "react";
import { getPriceHistory } from "@/lib/firestore/medicines";
import { toBengaliNumeral } from "@/lib/utils";
import { t } from "@/lib/i18n";
import type { PriceHistoryEntry } from "@/types";

interface MedicinePriceHistoryProps {
  medicineId: string;
}

function formatDateBn(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    const day = toBengaliNumeral(d.getDate());
    const monthNames = [
      "জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন",
      "জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"
    ];
    const month = monthNames[d.getMonth()];
    const year = toBengaliNumeral(d.getFullYear());
    return `${day} ${month}, ${year}`;
  } catch {
    return isoString;
  }
}

export default function MedicinePriceHistory({ medicineId }: MedicinePriceHistoryProps) {
  const [history, setHistory] = useState<PriceHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const entries = await getPriceHistory(medicineId);
        if (mounted) {
          setHistory(entries);
        }
      } catch (err) {
        console.warn("[MedicinePriceHistory] Failed to load history:", err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [medicineId]);

  // Requirement: Only show the price history section if there is MORE THAN ONE entry
  if (isLoading || history.length <= 1) {
    return null;
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] shadow-xs flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">
            history
          </span>
          <h3 className="font-bold text-sm sm:text-base text-on-surface">
            {t("medicineDetail.priceHistoryTitle")}
          </h3>
        </div>
        <span className="text-[11px] font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
          {t("common.recordsCount", { count: toBengaliNumeral(history.length) })}
        </span>
      </div>

      {/* History timeline list */}
      <div className="flex flex-col divide-y divide-[var(--color-border)]">
        {history.map((entry, idx) => {
          const earlierEntry = idx + 1 < history.length ? history[idx + 1] : null;
          let changeType: "increase" | "decrease" | "same" | "initial" = "initial";
          let diffText = "";

          if (earlierEntry) {
            const diff = entry.price - earlierEntry.price;
            if (diff > 0) {
              changeType = "increase";
              diffText = `+৳${toBengaliNumeral(diff.toFixed(2))}`;
            } else if (diff < 0) {
              changeType = "decrease";
              diffText = `-৳${toBengaliNumeral(Math.abs(diff).toFixed(2))}`;
            } else {
              changeType = "same";
              diffText = t("medicineDetail.priceUnchanged");
            }
          }

          return (
            <div
              key={entry.id}
              className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3 text-xs"
            >
              {/* Left: Date and note */}
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-on-surface">
                  {formatDateBn(entry.changedAt)}
                </span>
                {idx === 0 ? (
                  <span className="text-[10px] text-primary font-medium">
                    {t("medicineDetail.currentPrice")}
                  </span>
                ) : (
                  <span className="text-[10px] text-on-surface-variant">
                    {t("medicineDetail.previousPrice")}
                  </span>
                )}
              </div>

              {/* Right: Price and change badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-bold text-sm text-on-surface">
                  ৳{toBengaliNumeral(entry.price.toFixed(2))}
                </span>

                {changeType === "increase" && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                    <span>↑</span>
                    <span>{diffText}</span>
                  </span>
                )}
                {changeType === "decrease" && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <span>↓</span>
                    <span>{diffText}</span>
                  </span>
                )}
                {changeType === "initial" && (
                  <span className="text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                    {t("medicineDetail.initialPrice")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
