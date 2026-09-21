"use client";

/**
 * AdminHeroBanner — Top header banner for System Admin Panel
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import { toBengaliNumeral } from "@/lib/utils";
import { ADMIN_EMAIL } from "@/lib/auth/admin";

interface AdminHeroBannerProps {
  totalDrugs: number;
  pendingCount?: number;
  onLogout?: () => void;
  userEmail?: string;
}

export default function AdminHeroBanner({
  totalDrugs,
  pendingCount,
  onLogout,
  userEmail = ADMIN_EMAIL,
}: AdminHeroBannerProps) {
  return (
    <div className="rounded-2xl bg-surface p-5 sm:p-6 border border-[var(--color-border)] shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Identity & Title */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold tracking-wide uppercase">
              অ্যাডমিনিস্ট্রেটর
            </span>
            <span className="text-xs text-on-surface-variant">
              {userEmail}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight mt-0.5">
            মেডিসিন ম্যানেজমেন্ট ওয়ার্কস্পেস
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl">
            ওষুধের নাম, জেনেরিক, কোম্পানি ও রেফারেন্স মূল্য তালিকা ব্যবস্থাপনা।
          </p>
        </div>

        {/* Right: Metrics + Logout */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-4 py-2.5 rounded-xl bg-surface-container-low border border-[var(--color-border)] flex flex-col items-center">
            <span className="text-[11px] text-on-surface-variant font-medium">
              মোট ওষুধ
            </span>
            <span className="text-lg font-bold text-primary leading-tight">
              {toBengaliNumeral(totalDrugs)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
