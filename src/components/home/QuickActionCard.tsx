/**
 * QuickActionCard — Section 3: Single quick action card (4-card grid)
 * Preserved from Stitch home_dashboard Section 3.
 */

import Link from "next/link";
import type { QuickAction } from "@/lib/mock-data";

interface QuickActionCardProps {
  action: QuickAction;
}

export default function QuickActionCard({ action }: QuickActionCardProps) {
  return (
    <Link
      href={action.href}
      className="group relative flex flex-col justify-between p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all shadow-sm hover:shadow-md"
    >
      {/* Icon row */}
      <div className="flex items-center justify-between mb-space-sm">
        <div
          className={`w-12 h-12 rounded-xl ${action.iconBg} ${action.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">
            {action.icon}
          </span>
        </div>

        {action.badgeType === "dot" && (
          <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse" aria-hidden="true" />
        )}
        {action.badgeType === "pill" && action.badgeBg && (
          <span className={`px-space-xs py-0.5 rounded-full ${action.badgeBg} font-label-sm text-label-sm`}>
            {action.badge}
          </span>
        )}
        {action.badgeType === "chip" && action.badge && (
          <span className={`px-space-xs py-0.5 rounded ${action.badgeBg} font-label-sm text-label-sm`}>
            {action.badge}
          </span>
        )}
        {action.badgeType === "chip" && !action.badge && (
          <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform" aria-hidden="true">
            arrow_forward
          </span>
        )}
      </div>

      {/* Text */}
      <div>
        <h2
          className={`font-headline-sm text-headline-sm text-on-surface font-semibold ${action.titleColor} transition-colors`}
        >
          {action.title}
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          {action.description}
        </p>
      </div>

      {/* CTA */}
      <div className={`mt-space-sm pt-space-xs flex items-center gap-1 font-label-sm text-label-sm ${action.ctaColor} font-semibold`}>
        <span>{action.cta}</span>
        <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
      </div>
    </Link>
  );
}
