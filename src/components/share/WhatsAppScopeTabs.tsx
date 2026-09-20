"use client";

/**
 * WhatsAppScopeTabs — Sharing scope tab selectors
 * Preserved faithfully from Stitch whatsapp_share_ui design.
 */

import { toBengaliNumeral } from "@/lib/utils";
import type { ShareScopeTab } from "@/types";

interface WhatsAppScopeTabsProps {
  currentTab: ShareScopeTab;
  onTabChange: (tab: ShareScopeTab) => void;
  selectedCount: number;
}

export default function WhatsAppScopeTabs({
  currentTab,
  onTabChange,
  selectedCount,
}: WhatsAppScopeTabsProps) {
  const tabs: { id: ShareScopeTab; label: string; icon: string; badge?: string }[] = [
    {
      id: "single",
      label: "একক ওষুধ (Single Medicine)",
      icon: "medication",
    },
    {
      id: "selected",
      label: "নির্বাচিত ওষুধের তালিকা",
      icon: "playlist_add_check",
      badge: `${toBengaliNumeral(selectedCount)}টি নির্বাচিত`,
    },
    {
      id: "results",
      label: "সার্চ ফলাফল শিট (Results)",
      icon: "manage_search",
    },
    {
      id: "memo",
      label: "ফার্মেসি ক্যাশ মেমো / মূল্য তালিকা",
      icon: "receipt_long",
    },
  ];

  return (
    <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs scrollbar-none">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-space-md py-2.5 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              isActive
                ? "bg-primary text-on-primary font-bold shadow-md"
                : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-sm hover:bg-surface-container-low"
            }`}
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`px-1.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                  isActive
                    ? "bg-primary-fixed text-on-primary-fixed-variant"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
