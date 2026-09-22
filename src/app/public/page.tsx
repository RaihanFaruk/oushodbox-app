"use client";

import { useState, useEffect, useMemo } from "react";
import { getMedicines } from "@/lib/firestore/medicines";
import { toBengaliNumeral } from "@/lib/utils";
import { t } from "@/lib/i18n";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import type { DatabaseMedicine } from "@/types";

export default function PublicPriceListPage() {
  const [medicines, setMedicines] = useState<DatabaseMedicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedForm, setSelectedForm] = useState<string>("all");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getMedicines();
        if (mounted) {
          setMedicines(data);
        }
      } catch (err) {
        console.warn("[PublicPriceList] Failed to fetch medicines:", err);
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
  }, []);

  const filteredMedicines = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return medicines
      .filter((med) => {
        // Form shortcut filter
        if (selectedForm !== "all") {
          const badge = (med.dosageBadge || "").toLowerCase();
          const form = (med.dosageForm || "").toLowerCase();
          const target = selectedForm.toLowerCase();
          if (!badge.includes(target) && !form.includes(target)) {
            return false;
          }
        }

        // Search query matching trade name, generic name, company
        if (q) {
          const trade = (med.tradeName || "").toLowerCase();
          const generic = (med.genericName || "").toLowerCase();
          const company = (med.manufacturer || "").toLowerCase();
          return trade.includes(q) || generic.includes(q) || company.includes(q);
        }

        return true;
      })
      .sort((a, b) => (a.tradeName || "").localeCompare(b.tradeName || ""));
  }, [medicines, searchQuery, selectedForm]);

  return (
    <div className="min-h-screen bg-canvas text-on-surface flex flex-col">
      {/* Top Header — Clean, public-facing banner */}
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-[var(--color-border)] px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 max-w-5xl mx-auto w-full">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0"
            style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)" }}
          >
            Rx
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-base sm:text-lg text-on-surface leading-tight truncate">
              {t("common.appName")} • ওষুধের মূল্য তালিকা
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">
              সর্বশেষ নির্ধারিত খুচরা মূল্য (MRP) ও রেফারেন্স তালিকা
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* Search & Filter Matrix */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-[var(--color-border)] shadow-xs flex flex-col gap-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-on-surface">
                ওষুধ ও মূল্য অনুসন্ধান
              </h1>
              <p className="text-xs text-on-surface-variant">
                নাম, জেনেরিক বা প্রস্তুতকারক কোম্পানি দিয়ে তাৎক্ষণিক খুঁজুন
              </p>
            </div>
            <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg self-start sm:self-auto border border-primary/20">
              মোট ওষুধ: {toBengaliNumeral(filteredMedicines.length)}টি
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex items-center bg-surface-container-low focus-within:bg-surface rounded-xl px-3.5 py-1 border border-[var(--color-border)] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <span className="material-symbols-outlined text-primary text-xl mr-2.5 shrink-0">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ওষুধের নাম, জেনেরিক বা কোম্পানি লিখুন (যেমন: Napa, নাপা, Paracetamol)..."
              className="w-full bg-transparent py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                aria-label="অনুসন্ধান মুছুন"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Filter Shortcuts */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-medium text-on-surface-variant">শর্টকাট:</span>
            {[
              { key: "all", label: "সকল ওষুধ" },
              { key: "ট্যাবলেট", label: "ট্যাবলেট" },
              { key: "ক্যাপসুল", label: "ক্যাপসুল" },
              { key: "সিরাপ", label: "সিরাপ" },
              { key: "ইনজেকশন", label: "ইনজেকশন" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setSelectedForm(f.key)}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedForm === f.key
                    ? "bg-primary text-on-primary border-primary font-semibold shadow-xs"
                    : "bg-surface-container-low border-[var(--color-border)] text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Medicine List */}
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-surface border border-[var(--color-border)] animate-pulse flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-36 h-4 rounded" />
                    <Skeleton className="w-24 h-3 rounded" />
                  </div>
                </div>
                <Skeleton className="w-16 h-5 rounded" />
              </div>
            ))}
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl bg-surface border border-dashed border-[var(--color-border)] flex flex-col items-center justify-center gap-2.5">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">medication</span>
            </div>
            <h3 className="text-base font-bold text-on-surface">
              কোনো ওষুধ পাওয়া যায়নি
            </h3>
            <p className="text-xs text-on-surface-variant max-w-sm">
              {searchQuery
                ? `"${searchQuery}" দিয়ে কোনো ওষুধ খুঁজে পাওয়া যায়নি। অন্য বানান দিয়ে চেষ্টা করুন।`
                : "বর্তমানে কোনো ওষুধের তথ্য তালিকাভুক্ত নেই।"}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedForm("all");
                }}
                className="mt-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-semibold text-on-surface hover:bg-surface-container-low"
              >
                অনুসন্ধান ক্লিয়ার করুন
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filteredMedicines.map((med) => {
              const strengthStr = (med as any).strength || med.dosageBadge || "";
              const isOther = med.itemType === "other";
              const badgeText = isOther
                ? "OTH"
                : (med.dosageBadge || "").includes("ইনজেকশন")
                ? "INJ"
                : (med.dosageBadge || "").includes("সিরাপ")
                ? "SYR"
                : (med.dosageBadge || "").includes("ক্যাপসুল")
                ? "CAP"
                : "TAB";

              return (
                <Card
                  key={med.id}
                  hoverable
                  className="p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  {/* Left: Info */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex flex-col items-center justify-center shrink-0 text-primary font-bold text-xs">
                      <span>{badgeText}</span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-on-surface truncate">
                          {med.tradeName}
                        </span>
                        {strengthStr && (
                          <Badge variant="neutral">
                            {strengthStr}
                          </Badge>
                        )}
                        {med.dosageBadge && (
                          <span className="text-[11px] text-on-surface-variant">
                            • {med.dosageBadge}
                          </span>
                        )}
                      </div>

                      {(med.genericName || med.manufacturer) && (
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                          {med.genericName ? (
                            <span className="font-medium text-on-surface/90 truncate">
                              {med.genericName}
                            </span>
                          ) : !isOther ? (
                            <span className="font-medium text-on-surface/90 truncate">
                              জেনেরিক তথ্য নেই
                            </span>
                          ) : null}
                          {med.genericName && med.manufacturer && <span>•</span>}
                          {med.manufacturer ? (
                            <span className="text-on-surface-variant truncate">
                              {med.manufacturer}
                            </span>
                          ) : !isOther ? (
                            <span className="text-on-surface-variant truncate">
                              অনির্ধারিত কোম্পানি
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Public Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--color-border)]">
                    <span className="text-base font-bold text-primary">
                      {med.unitPriceFormatted || `৳ ${med.unitPrice.toFixed(2)}`}
                    </span>
                    {med.packSize && (
                      <span className="text-[11px] text-on-surface-variant">
                        প্যাক: {med.packSize}
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface py-4 px-4 sm:px-6 border-t border-[var(--color-border)] mt-auto text-center text-xs text-on-surface-variant">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t("common.appName")} • পাবলিক মেডিসিন প্রাইস রেফারেন্স</span>
          <span className="text-[11px]">তথ্যসূত্র: প্রস্তুতকারক ও নিবন্ধিত খুচরা মূল্য</span>
        </div>
      </footer>
    </div>
  );
}
