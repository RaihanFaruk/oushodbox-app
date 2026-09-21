"use client";

/**
 * AdminHeroBanner — Top header banner for System Admin Panel
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import { toBengaliNumeral } from "@/lib/utils";

interface AdminHeroBannerProps {
  totalDrugs: number;
  pendingCount: number;
  registeredUsers?: number;
  systemHealth?: number;
  onLogout?: () => void;
  userEmail?: string;
}

export default function AdminHeroBanner({
  totalDrugs,
  pendingCount,
  registeredUsers = 128,
  systemHealth = 100,
  onLogout,
  userEmail,
}: AdminHeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-space-lg border border-[var(--color-border)]">
      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md relative z-10">
        {/* Left: Badges, Title & Subtitle */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold tracking-wide uppercase">
              সুপার অ্যাডমিন (Super Admin)
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-medium">
              DGDA সিঙ্ক একটিভ
            </span>
            <span className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-semibold">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              সিস্টেম সংস্করণ v1.2.0-PRO
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              ডেমো কন্ট্রোল সেন্টার
            </span>
            {onLogout && (
              <button
                onClick={onLogout}
                type="button"
                className="px-2.5 py-0.5 rounded-full bg-error/10 text-error hover:bg-error hover:text-on-error font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1 cursor-pointer border border-error/20"
                title={userEmail ? `লগড-ইন: ${userEmail}` : "লগআউট করুন"}
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>লগআউট</span>
              </button>
            )}
          </div>

          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            🛠️ ঔষধBox সিস্টেম অ্যাডমিন প্যানেল
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            কেন্দ্রীয় ড্রাগ রেজিস্ট্রি, মাস্টার প্রাইসিং ইনডেক্স, অনুমোদনের সারি ও রিয়েলটাইম ফার্মাসিউটিক্যাল অডিট কন্ট্রোল সেন্টার।
          </p>
        </div>

        {/* Right: 4-Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
          {/* Total Medicines */}
          <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col min-w-[120px]">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              মোট ওষুধ
            </span>
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              {toBengaliNumeral(totalDrugs)}
            </span>
            <span className="font-label-sm text-label-sm text-tertiary mt-0.5">
              ↑ ১২টি নতুন যুক্ত
            </span>
          </div>

          {/* Pending Verification */}
          <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col min-w-[120px]">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              পেন্ডিং ভেরিফিকেশন
            </span>
            <span className="font-headline-md text-headline-md text-error font-bold tracking-tight">
              {toBengaliNumeral(pendingCount)}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
              {pendingCount > 0 ? "অ্যাকশন প্রয়োজন" : "সব অনুমোদিত"}
            </span>
          </div>

          {/* Registered Users */}
          <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col min-w-[120px]">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              নিবন্ধিত ব্যবহারকারী
            </span>
            <span className="font-headline-md text-headline-md text-secondary font-bold tracking-tight">
              {toBengaliNumeral(registeredUsers)}
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">
              ফার্মাসিস্ট ও স্টাফ
            </span>
          </div>

          {/* System Health */}
          <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col min-w-[120px]">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              সিস্টেম হেলথ
            </span>
            <span className="font-headline-md text-headline-md text-tertiary font-bold tracking-tight">
              {toBengaliNumeral(systemHealth)}%
            </span>
            <span className="font-label-sm text-label-sm text-tertiary mt-0.5">
              জিরো লেটেন্সি
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
