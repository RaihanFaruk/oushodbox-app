"use client";

/**
 * MedicineClinicalTabs — 5-Tab comprehensive clinical monograph guide
 * Preserved faithfully from Stitch medicine_details design.
 */

import { useState } from "react";
import type { MedicineMonograph } from "@/types";

interface MedicineClinicalTabsProps {
  monograph: MedicineMonograph;
}

type TabKey = "indications" | "dosage" | "side-effects" | "pregnancy" | "interactions";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "indications", label: "ব্যবহার ও নির্দেশনা", icon: "assignment" },
  { key: "dosage", label: "ডোজ ও প্রয়োগবিধি", icon: "schedule" },
  { key: "side-effects", label: "পার্শ্বপ্রতিক্রিয়া ও সতর্কতা", icon: "warning" },
  { key: "pregnancy", label: "গর্ভাবস্থা ও স্তন্যদানকাল", icon: "pregnant_woman" },
  { key: "interactions", label: "ওষুধের মিথস্ক্রিয়া", icon: "sync_problem" },
];

export default function MedicineClinicalTabs({ monograph }: MedicineClinicalTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("indications");
  const { clinicalGuide } = monograph;

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
      {/* Custom Tab Strip */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs scrollbar-none border-b border-[var(--color-border)]">
        {TABS.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-space-md py-2.5 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                {t.icon}
              </span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents Area */}
      <div>
        {/* Tab 1: Indications */}
        {activeTab === "indications" && (
          <div className="flex flex-col gap-space-md animate-in fade-in duration-150">
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  clinical_notes
                </span>
                প্রাথমিক ক্লিনিক্যাল প্রয়োগ
              </span>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {clinicalGuide.indications.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  অনুমোদিত স্বাস্থ্যসমস্যা তালিকা:
                </span>
                <ul className="space-y-1.5 text-body-sm text-on-surface-variant">
                  {clinicalGuide.indications.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-primary shrink-0" aria-hidden="true">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  {clinicalGuide.indications.benefitHeading}
                </span>
                <ul className="space-y-1.5 text-body-sm text-on-surface-variant">
                  {clinicalGuide.indications.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-xs text-secondary shrink-0 mt-0.5" aria-hidden="true">
                        verified
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Dosage */}
        {activeTab === "dosage" && (
          <div className="flex flex-col gap-space-md animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border-l-4 border-primary">
                <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    person
                  </span>
                  প্রাপ্তবয়স্ক সেবনমাত্রা
                </span>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {clinicalGuide.dosage.adult}
                </p>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border-l-4 border-secondary">
                <span className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    child_care
                  </span>
                  শিশু ও কিশোর মাত্রা
                </span>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {clinicalGuide.dosage.pediatric}
                </p>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <span className="font-label-md text-label-md text-error font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  emergency
                </span>
                সর্বোচ্চ সতর্কতা সীমা
              </span>
              <p className="font-body-sm text-body-sm text-on-surface">
                {clinicalGuide.dosage.maxLimit}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {clinicalGuide.dosage.instructions}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Side Effects & Warnings */}
        {activeTab === "side-effects" && (
          <div className="flex flex-col gap-space-md animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-secondary" aria-hidden="true">
                    info
                  </span>
                  সাধারণ পার্শ্বপ্রতিক্রিয়া
                </span>
                <ul className="space-y-1.5 text-body-sm text-on-surface-variant">
                  {clinicalGuide.sideEffects.common.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-error font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-error" aria-hidden="true">
                    warning
                  </span>
                  বিরল বা মারাত্মক লক্ষণ
                </span>
                <ul className="space-y-1.5 text-body-sm text-on-surface-variant">
                  {clinicalGuide.sideEffects.severe.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-error shrink-0"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-highest border border-outline-variant flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-xl text-primary shrink-0 mt-0.5" aria-hidden="true">
                shield
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  বিশেষ সতর্কতা ও লিভার সুরক্ষা
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {clinicalGuide.sideEffects.warningNote}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pregnancy & Lactation */}
        {activeTab === "pregnancy" && (
          <div className="flex flex-col gap-space-md animate-in fade-in duration-150">
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    pregnant_woman
                  </span>
                  এফডিএ প্রেগন্যান্সি ক্যাটাগরি: {clinicalGuide.pregnancy.fdaCategory}
                </span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm font-semibold text-secondary">
                  {clinicalGuide.pregnancy.advisoryBadge}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {clinicalGuide.pregnancy.description}
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Interactions */}
        {activeTab === "interactions" && (
          <div className="flex flex-col gap-space-md animate-in fade-in duration-150">
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  sync_problem
                </span>
                ঔষধীয় মিথস্ক্রিয়া (Drug Interactions)
              </span>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                {clinicalGuide.interactions.overview}
              </p>
              <div className="space-y-2 mt-1">
                {clinicalGuide.interactions.items.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-surface-container-lowest text-body-sm">
                    <strong className="text-on-surface font-semibold">{item.drug}:</strong>{" "}
                    <span className="text-on-surface-variant">{item.effect}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
