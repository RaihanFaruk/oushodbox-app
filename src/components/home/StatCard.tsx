/**
 * StatCard — Section 4: Single statistics card
 * Preserved from Stitch home_dashboard Section 4.
 */

import type { StatCardData } from "@/lib/mock-data";

const iconColorMap: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  warning: "text-warning",
};

const trendColorMap: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  warning: "text-warning",
};

const progressColorMap: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  warning: "bg-warning",
};

interface StatCardProps {
  stat: StatCardData;
}

export default function StatCard({ stat }: StatCardProps) {
  const iconColor = iconColorMap[stat.iconColor] ?? "text-primary";
  const trendColor = trendColorMap[stat.trendColor] ?? "text-primary";
  const progressColor = progressColorMap[stat.trendColor] ?? "bg-primary";

  return (
    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between text-on-surface-variant">
        <span className="font-label-md text-label-md">{stat.labelBn}</span>
        <span className={`material-symbols-outlined ${iconColor} text-xl`} aria-hidden="true">
          {stat.icon}
        </span>
      </div>

      {/* Value */}
      <div className="mt-space-sm">
        <div className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
          {stat.value}{" "}
          <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
            {stat.unit}
          </span>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${trendColor} font-label-sm text-label-sm`}>
          <span className="material-symbols-outlined text-xs" aria-hidden="true">
            {stat.trendIcon}
          </span>
          <span>{stat.trend}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-surface-container h-1 rounded-full mt-space-sm overflow-hidden">
        <div
          className={`${progressColor} h-full rounded-full transition-all`}
          style={{ width: `${stat.progressPct}%` }}
          role="progressbar"
          aria-valuenow={stat.progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={stat.labelBn}
        />
      </div>
    </div>
  );
}
