/**
 * RecentActivityPanel — Right sidebar: Recent pharmacist actions feed
 * Preserved from Stitch home_dashboard right panel.
 * ⚠️ DEMO DATA ONLY — Not real activity log.
 */

import { DEMO_ACTIVITIES } from "@/lib/mock-data";

export default function RecentActivityPanel() {
  return (
    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs text-secondary">
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            history
          </span>
          <h2 className="font-label-lg text-label-lg font-bold text-on-surface">
            সাম্প্রতিক কার্যক্রম
          </h2>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          [Demo]
        </span>
      </div>

      {/* Activity list */}
      <div className="flex flex-col gap-space-sm">
        {DEMO_ACTIVITIES.map((activity, idx) => (
          <div key={activity.id} className="flex items-start gap-space-sm">
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center shrink-0 pt-1">
              <div
                className={`w-2 h-2 rounded-full ${activity.dotColor} shrink-0`}
                aria-hidden="true"
              />
              {idx < DEMO_ACTIVITIES.length - 1 && (
                <div className="w-px flex-1 bg-border mt-1 min-h-[1.5rem]" aria-hidden="true" />
              )}
            </div>

            {/* Icon + Content */}
            <div className="flex items-start gap-space-sm flex-1 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg ${activity.iconBg} ${activity.iconColor} flex items-center justify-center shrink-0`}
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  {activity.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-label-md font-semibold text-on-surface">
                  {activity.title}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug truncate">
                  {activity.detail}
                </p>
                <p className="font-label-sm text-label-sm text-outline mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all */}
      <button
        type="button"
        className="w-full py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
      >
        সব কার্যক্রম দেখুন
      </button>
    </div>
  );
}
