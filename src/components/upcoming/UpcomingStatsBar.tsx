"use client";

/**
 * UpcomingStatsBar — 4-card quick metrics bar for upcoming roadmap
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

export default function UpcomingStatsBar() {
  const stats = [
    {
      id: "stat-1",
      value: "০৯টি",
      label: "নতুন মডিউল পাইপলাইনে",
      icon: "pending_actions",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      id: "stat-2",
      value: "PWA v2.0",
      label: "অফলাইন ইঞ্জিন সক্রিয়",
      icon: "install_mobile",
      iconBg: "bg-secondary/10 text-secondary",
    },
    {
      id: "stat-3",
      value: "৪,২৮০+",
      label: "ফার্মাসিস্ট প্রি-রেজিস্টার্ড",
      icon: "group",
      iconBg: "bg-tertiary/10 text-tertiary",
    },
    {
      id: "stat-4",
      value: "Q2, ২০২৫",
      label: "প্রত্যাশিত রিলিজ সাইকেল",
      icon: "update",
      iconBg: "bg-primary-fixed-dim/20 text-on-primary-fixed-variant",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-[var(--color-border)]"
        >
          <div className={`p-2 rounded-lg shrink-0 ${stat.iconBg}`}>
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {stat.icon}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {stat.value}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
