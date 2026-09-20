"use client";

/**
 * WhatsAppAuditTable — Recent prescription dispatch history table
 * Preserved faithfully from Stitch whatsapp_share_ui design.
 */

import { toBengaliNumeral } from "@/lib/utils";
import type { PrescriptionShareLog } from "@/types";

interface WhatsAppAuditTableProps {
  logs: PrescriptionShareLog[];
  onResendLog: (log: PrescriptionShareLog) => void;
  onViewAllLogs: () => void;
}

export default function WhatsAppAuditTable({
  logs,
  onResendLog,
  onViewAllLogs,
}: WhatsAppAuditTableProps) {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-[var(--color-border)] flex-wrap gap-2">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
            history
          </span>
          <div>
            <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
              আজকের প্রেরিত প্রেসক্রিপশন লগ
            </h3>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              আজ মোট {toBengaliNumeral(logs.length + 11)} জন রোগীকে তথ্য পাঠানো হয়েছে
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onViewAllLogs}
          className="text-primary font-label-md text-label-md font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>সকল লগ দেখুন</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Mini Audit Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-md text-body-md min-w-[650px]">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-2.5 px-space-md rounded-l-xl">রোগীর নাম</th>
              <th className="py-2.5 px-space-md">মোবাইল নম্বর</th>
              <th className="py-2.5 px-space-md">ওষুধের সংখ্যা</th>
              <th className="py-2.5 px-space-md text-right">মূল্য</th>
              <th className="py-2.5 px-space-md text-center">স্ট্যাটাস</th>
              <th className="py-2.5 px-space-md text-right rounded-r-xl">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y-0 text-on-surface">
            {logs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-surface-container-low/50 transition-colors"
              >
                <td className="py-3 px-space-md font-semibold">{log.patientName}</td>
                <td className="py-3 px-space-md font-mono text-body-sm text-on-surface-variant">
                  {log.phone}
                </td>
                <td className="py-3 px-space-md text-on-surface-variant">
                  {log.itemsSummary}
                </td>
                <td className="py-3 px-space-md text-right font-mono font-bold text-primary">
                  {log.totalPriceFormatted}
                </td>
                <td className="py-3 px-space-md text-center">
                  {log.status === "delivered" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-xs" aria-hidden="true">
                        done_all
                      </span>
                      <span>ডেলিভার্ড</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-xs" aria-hidden="true">
                        schedule
                      </span>
                      <span>সেন্ডিং</span>
                    </span>
                  )}
                </td>
                <td className="py-3 px-space-md text-right">
                  <button
                    type="button"
                    onClick={() => onResendLog(log)}
                    title="পুনরায় পাঠান ও ফর্মে লোড করুন"
                    aria-label={`${log.patientName} এর তথ্য পুনরায় লোড করুন`}
                    className="p-1 rounded-lg text-outline hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">
                      forward
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
