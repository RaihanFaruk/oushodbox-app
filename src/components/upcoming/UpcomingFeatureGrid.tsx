"use client";

/**
 * UpcomingFeatureGrid — 9 Innovation Bento Cards Grid
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

import type { UpcomingFeatureItem } from "@/types";
import UpcomingFeatureCard from "./UpcomingFeatureCard";

interface UpcomingFeatureGridProps {
  features: UpcomingFeatureItem[];
  onSelectFeature: (feature: UpcomingFeatureItem) => void;
}

export default function UpcomingFeatureGrid({
  features,
  onSelectFeature,
}: UpcomingFeatureGridProps) {
  return (
    <div className="flex flex-col gap-space-md">
      {/* Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
            পরবর্তী প্রজন্মের ইনোভেশন গ্রিড
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            যেকোনো ফিচারের উপর ক্লিক করে আর্লি এক্সেসের রিমাইন্ডার সেট করুন
          </p>
        </div>
        <span className="self-start sm:self-auto px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
          রিয়েল-টাইম আর্কিটেকচার
        </span>
      </div>

      {/* 9-Card Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
        {features.map((feature) => (
          <UpcomingFeatureCard
            key={feature.id}
            feature={feature}
            onSelect={onSelectFeature}
          />
        ))}
      </div>
    </div>
  );
}
