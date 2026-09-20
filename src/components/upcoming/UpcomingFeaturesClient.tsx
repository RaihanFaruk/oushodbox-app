"use client";

/**
 * UpcomingFeaturesClient — Master client controller for Upcoming Features & PWA Offline Sync
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

import { useState } from "react";
import { DEMO_UPCOMING_FEATURES } from "@/lib/mock-data";
import type { UpcomingFeatureItem } from "@/types";

import UpcomingHeroBanner from "./UpcomingHeroBanner";
import UpcomingStatsBar from "./UpcomingStatsBar";
import UpcomingFeatureGrid from "./UpcomingFeatureGrid";
import PwaFeaturesColumn from "./PwaFeaturesColumn";
import PwaPhoneSimulator from "./PwaPhoneSimulator";
import UpcomingNotifyModal from "./UpcomingNotifyModal";
import { usePwaStatus } from "@/components/pwa/usePwaStatus";

export default function UpcomingFeaturesClient() {
  const [selectedFeature, setSelectedFeature] = useState<UpcomingFeatureItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { promptInstall, installAvailable } = usePwaStatus();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4500);
  };

  const handleSelectFeature = (feature: UpcomingFeatureItem) => {
    setSelectedFeature(feature);
  };

  const handleNotifySuccess = (title: string) => {
    showToast(`'${title}' ফিচারের জন্য আপনার আর্লি এক্সেস রিকোয়েস্ট গ্রহণ করা হয়েছে!`);
  };

  const handleTriggerInstallTest = async () => {
    if (!installAvailable) {
      showToast("এই ব্রাউজারে সরাসরি ইনস্টল প্রম্পট বর্তমানে উপলব্ধ নয়।");
      return;
    }

    const outcome = await promptInstall();
    if (outcome === "accepted") {
      showToast("ঔষধBox সফলভাবে ইনস্টল করা হয়েছে!");
    } else if (outcome === "dismissed") {
      showToast("ইনস্টলেশন বাতিল করা হয়েছে।");
    } else {
      showToast("এই ব্রাউজারে সরাসরি ইনস্টল প্রম্পট বর্তমানে উপলব্ধ নয়।");
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg max-w-7xl mx-auto">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-inverse-surface text-inverse-on-surface shadow-2xl animate-in slide-in-from-bottom-5 duration-300 max-w-md border border-outline/20">
          <span className="material-symbols-outlined text-primary text-xl shrink-0">
            check_circle
          </span>
          <span className="font-label-md text-label-md font-medium">
            {toastMessage}
          </span>
        </div>
      )}

      {/* 1. Upcoming Hero Banner */}
      <UpcomingHeroBanner />

      {/* 2. Quick Metrics Bar */}
      <UpcomingStatsBar />

      {/* 3. 9 Innovation Bento Feature Cards */}
      <UpcomingFeatureGrid
        features={DEMO_UPCOMING_FEATURES}
        onSelectFeature={handleSelectFeature}
      />

      {/* 4. PWA Offline Architecture & Smartphone Simulator Showcase */}
      <section className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-[var(--color-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <PwaFeaturesColumn onTriggerInstallTest={handleTriggerInstallTest} />
          <PwaPhoneSimulator onInstallClick={handleTriggerInstallTest} />
        </div>
      </section>

      {/* 5. Early Access / Notify Me Modal */}
      <UpcomingNotifyModal
        isOpen={!!selectedFeature}
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onSubmitSuccess={handleNotifySuccess}
      />
    </div>
  );
}
