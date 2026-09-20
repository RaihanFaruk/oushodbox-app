"use client";

/**
 * PwaInstallPanel — Right sidebar: PWA install panel with tabs
 * Preserved from Stitch home_dashboard Section 7.
 * Tab switching logic converted from vanilla JS to React useState.
 */

import { useState } from "react";
import { PWA_DEMO_STATUS } from "@/lib/mock-data";
import { triggerPwaInstall as triggerInstall } from "@/lib/utils";
type TabId = "status" | "instructions";

export default function PwaInstallPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("status");

  return (
    <section className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
      {/* Section header */}
      <div className="flex items-center gap-space-sm">
        <span
          className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            download_for_offline
          </span>
        </span>
        <div>
          <h2 className="font-label-lg text-label-lg font-bold text-on-surface">
            PWA ইন্সটলেশন
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            ঔষধBox আপনার ফোনে ইন্সটল করুন
          </p>
        </div>
      </div>

      {/* PWA feature checkmarks */}
      <div className="grid grid-cols-2 gap-space-xs font-label-sm text-label-sm text-on-surface">
        {PWA_DEMO_STATUS.features.map((feat, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-base" aria-hidden="true">
              check_circle
            </span>
            <span>{feat}</span>
          </div>
        ))}
      </div>

      {/* Interactive Tabbed Demo Mockup */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-[var(--color-border)]">
        {/* Tab header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-space-xs">
          <span className="font-label-md text-label-md font-bold text-on-surface">
            ইন্সটলেশন স্ট্যাটাস ও নির্দেশিকা
          </span>
          <span className="flex h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
        </div>

        {/* Tab switcher */}
        <div
          className="flex bg-surface-container-low p-1 rounded-lg text-center font-label-sm text-label-sm"
          role="tablist"
          aria-label="PWA installation tabs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "status"}
            aria-controls="tab-status-panel"
            id="btn-tab-status"
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              activeTab === "status"
                ? "bg-surface-container-lowest font-semibold text-primary shadow-sm"
                : "text-on-surface-variant"
            }`}
          >
            সিংক স্ট্যাটাস
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "instructions"}
            aria-controls="tab-instructions-panel"
            id="btn-tab-instructions"
            onClick={() => setActiveTab("instructions")}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              activeTab === "instructions"
                ? "bg-surface-container-lowest font-semibold text-primary shadow-sm"
                : "text-on-surface-variant"
            }`}
          >
            ইন্সটল নির্দেশিকা
          </button>
        </div>

        {/* Tab 1: Sync Status */}
        {activeTab === "status" && (
          <div
            id="tab-status-panel"
            role="tabpanel"
            aria-labelledby="btn-tab-status"
            className="flex flex-col gap-space-xs pt-1"
          >
            <div className="flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">ক্যাশড ডেটা:</span>
              <span className="font-semibold text-on-surface">{PWA_DEMO_STATUS.cacheSize}</span>
            </div>
            <div className="flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">সার্ভিসওয়ার্কার:</span>
              <span className="text-tertiary font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">check</span>
                {PWA_DEMO_STATUS.syncStatus}
              </span>
            </div>
            <div className="flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">সর্বশেষ আপডেট:</span>
              <span className="text-on-surface">{PWA_DEMO_STATUS.lastSync}</span>
            </div>
            <button
              type="button"
              onClick={triggerInstall}
              className="mt-space-xs w-full py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 hover:bg-primary-dark active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                download_for_offline
              </span>
              <span>ঔষধBox ইন্সটল করুন</span>
            </button>
          </div>
        )}

        {/* Tab 2: Instructions */}
        {activeTab === "instructions" && (
          <div
            id="tab-instructions-panel"
            role="tabpanel"
            aria-labelledby="btn-tab-instructions"
            className="flex flex-col gap-space-xs pt-1"
          >
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              ইন্সটল করতে ব্রাউজার মেনু খুলুন, তারপর{" "}
              <strong className="text-on-surface">&ldquo;Install&rdquo;</strong> সিলেক্ট করুন
              অথবা Android এ ব্রাউজার মেনু থেকে{" "}
              <strong className="text-on-surface">&ldquo;Add to Home screen&rdquo;</strong> নির্বাচন করুন।
            </p>
            <div className="p-space-xs bg-surface-container rounded font-label-sm text-label-sm text-secondary">
              একবার ইন্সটল করলে অফলাইনেও ব্যবহার করা যাবে!
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
