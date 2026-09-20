/**
 * DgdaNoticePanel — Right sidebar: Sample regulatory notice feed
 * Preserved from Stitch home_dashboard right panel.
 *
 * ⚠️ DEMO ONLY — Notices shown here are sample/placeholder content.
 * They are NOT sourced from, affiliated with, or endorsed by DGDA.
 * A verified data source will be connected in a future phase.
 */

import { DEMO_DGDA_NOTICES } from "@/lib/mock-data";

export default function DgdaNoticePanel() {
  return (
    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs text-primary">
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            verified_user
          </span>
          <h2 className="font-label-lg text-label-lg font-bold">
            নিয়ন্ত্রক বিজ্ঞপ্তি
          </h2>
        </div>
        {/* Demo label badge */}
        <span className="px-space-xs py-0.5 rounded-full bg-amber-tint text-warning font-label-sm text-label-sm font-semibold">
          ⚠️ Demo Only
        </span>
      </div>

      {/* Demo disclaimer */}
      <p className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container rounded-lg px-space-sm py-space-xs">
        নিচের তথ্যগুলো <strong>নমুনা/ডেমো</strong> মাত্র। বাস্তব DGDA বিজ্ঞপ্তি
        নয়। প্রকৃত তথ্য সংযুক্ত হবে পরবর্তী ফেজে।
      </p>

      {/* Notice list */}
      <div className="flex flex-col gap-space-sm">
        {DEMO_DGDA_NOTICES.map((notice) => (
          <div
            key={notice.id}
            className="flex flex-col gap-space-xs p-space-sm rounded-xl border border-[var(--color-border)] bg-surface"
          >
            {/* Type badge + icon row */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-1 px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${notice.typeBg} ${notice.typeText}`}
              >
                <span className={`material-symbols-outlined text-xs ${notice.iconColor}`} aria-hidden="true">
                  {notice.icon}
                </span>
                {notice.typeBadge}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {notice.date}
              </span>
            </div>

            {/* Title */}
            <p className="font-label-md text-label-md font-semibold text-on-surface leading-snug">
              {notice.title}
            </p>

            {/* Description */}
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {notice.description}
            </p>

            {/* Action */}
            <button
              type="button"
              className={`self-start font-label-sm text-label-sm font-semibold ${notice.actionColor} flex items-center gap-0.5 hover:underline`}
            >
              {notice.actionLabel}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
