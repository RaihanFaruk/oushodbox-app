"use client";

/**
 * AdminModuleTabs — Horizontal tabs strip for admin panel modules
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import { ADMIN_MODULE_TABS } from "@/lib/mock-data";
import type { AdminModuleTabKey } from "@/types";

interface AdminModuleTabsProps {
  activeTab: AdminModuleTabKey;
  onSelectTab: (tab: AdminModuleTabKey) => void;
}

export default function AdminModuleTabs({
  activeTab,
  onSelectTab,
}: AdminModuleTabsProps) {
  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-1 overflow-x-auto border border-[var(--color-border)]">
      <div className="flex items-center gap-space-xs min-w-max">
        {ADMIN_MODULE_TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                isActive
                  ? "bg-primary-container text-on-primary-container shadow-sm font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                {tab.icon}
              </span>
              <span>
                {tab.label} ({tab.labelEn})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
