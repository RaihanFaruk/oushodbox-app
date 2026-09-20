"use client";

/**
 * AdminMonitoringGrid — Server audit log, brand distribution donut, and WhatsApp gateway monitor
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import type { AdminAuditLogItem } from "@/types";

interface AdminMonitoringGridProps {
  auditLogs: AdminAuditLogItem[];
  onRefreshToken: () => void;
}

export default function AdminMonitoringGrid({
  auditLogs,
  onRefreshToken,
}: AdminMonitoringGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
      {/* Col 1: Server Audit Log */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[var(--color-border)] flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            লাইভ সার্ভার অডিট লগ
          </span>
          <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
            সচল
          </span>
        </div>

        <div className="flex flex-col gap-space-xs font-body-sm text-body-sm overflow-y-auto max-h-[220px]">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-space-xs rounded-lg bg-surface-container-low flex items-start gap-space-xs"
            >
              <span
                className={`material-symbols-outlined text-base mt-0.5 shrink-0 ${
                  log.type === "flag"
                    ? "text-error"
                    : log.type === "sync"
                    ? "text-secondary"
                    : log.type === "delete"
                    ? "text-error"
                    : "text-primary"
                }`}
                aria-hidden="true"
              >
                {log.icon}
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-semibold text-on-surface leading-snug">
                  {log.title}
                </span>
                <span className="text-on-surface-variant text-label-sm mt-0.5">
                  {log.timeAgo} • {log.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 2: Brand Distribution Donut Chart */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[var(--color-border)] flex flex-col justify-between gap-space-sm">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              ব্র্যান্ড ড্রাগ ডিস্ট্রিবিউশন
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              ফার্মা শেয়ার
            </span>
          </div>

          <div className="flex items-center justify-center p-space-sm">
            <svg
              className="w-36 h-36 transform -rotate-90"
              viewBox="0 0 160 160"
              aria-label="ব্র্যান্ড ড্রাগ ডিস্ট্রিবিউশন চার্ট"
            >
              <circle
                className="text-surface-container"
                cx="80"
                cy="80"
                fill="transparent"
                r="60"
                stroke="currentColor"
                strokeWidth="16"
              />
              {/* Square 38% */}
              <circle
                className="text-primary"
                cx="80"
                cy="80"
                fill="transparent"
                r="60"
                stroke="currentColor"
                strokeDasharray="376.99"
                strokeDashoffset="150"
                strokeWidth="16"
              />
              {/* Beximco 31% */}
              <circle
                className="text-secondary"
                cx="80"
                cy="80"
                fill="transparent"
                r="60"
                stroke="currentColor"
                strokeDasharray="376.99"
                strokeDashoffset="260"
                strokeWidth="16"
              />
              {/* Other 31% */}
              <circle
                className="text-tertiary"
                cx="80"
                cy="80"
                fill="transparent"
                r="60"
                stroke="currentColor"
                strokeDasharray="376.99"
                strokeDashoffset="330"
                strokeWidth="16"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-space-xs text-center font-label-sm text-label-sm">
          <div className="p-1 rounded bg-surface-container-low border border-[var(--color-border)]">
            <span className="block text-primary font-bold">Square 38%</span>
          </div>
          <div className="p-1 rounded bg-surface-container-low border border-[var(--color-border)]">
            <span className="block text-secondary font-bold">Beximco 31%</span>
          </div>
          <div className="p-1 rounded bg-surface-container-low border border-[var(--color-border)]">
            <span className="block text-tertiary font-bold">অন্যান্য 31%</span>
          </div>
        </div>
      </div>

      {/* Col 3: WhatsApp Gateway Monitor */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[var(--color-border)] flex flex-col justify-between gap-space-sm">
        <div>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            হোয়াটসঅ্যাপ গেটওয়ে রেডি
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            ফার্মেসি রোগীদের প্রেসক্রিপশন এবং ড্রাগ ভেরিফিকেশন লিংক সরাসরি প্রেরণ সক্রিয়।
          </p>

          <div className="mt-space-sm p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-[var(--color-border)]">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface font-semibold">
                দৈনিক কোটা (Daily SMS/WhatsApp)
              </span>
              <span className="text-tertiary font-bold">৮,৪২০ / ১০,০০০</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: "84.2%" }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onRefreshToken}
          className="w-full py-space-xs rounded-lg bg-surface-container-low text-primary font-label-lg text-label-lg hover:bg-surface-container transition-all flex items-center justify-center gap-1 cursor-pointer font-medium border border-[var(--color-border)]"
          type="button"
        >
          <span className="material-symbols-outlined text-base">settings</span>
          <span>গেটওয়ে টোকেন রিফ্রেশ করুন</span>
        </button>
      </div>
    </div>
  );
}
