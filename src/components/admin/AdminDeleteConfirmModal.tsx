"use client";

/**
 * AdminDeleteConfirmModal — Delete Confirmation Dialog with Audit Trail
 * Faithfully migrated from Stitch admin_panel/code.html
 */

import type { AdminMedicineItem } from "@/types";

interface AdminDeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  medicine: AdminMedicineItem | null;
}

export default function AdminDeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  medicine,
}: AdminDeleteConfirmModalProps) {
  if (!isOpen || !medicine) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-xl overflow-hidden p-space-lg flex flex-col gap-space-md border border-[var(--color-border)] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-space-sm">
          <span className="p-3 rounded-xl bg-error-container text-on-error-container shrink-0">
            <span className="material-symbols-outlined text-2xl">warning</span>
          </span>
          <div className="flex flex-col">
            <h3
              id="delete-dialog-title"
              className="font-headline-sm text-headline-sm font-bold text-on-surface"
            >
              রেকর্ড মুছে ফেলা নিশ্চিতকরণ
            </h3>
            <span className="font-label-sm text-label-sm text-error font-semibold">
              অপরিবর্তনীয় সিস্টেম অপারেশন
            </span>
          </div>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          ⚠️ আপনি কি নিশ্চিত যে &apos;<span className="font-bold text-on-surface">{medicine.tradeName} {medicine.strength}</span>&apos; রেকর্ডটি ডিলিট করতে চান? এই প্রক্রিয়াটি সম্পূর্ণ অপরিবর্তনীয় এবং ওষুধটির রেফারেন্স ডাটাবেস থেকে মুছে যাবে।
        </p>

        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-[var(--color-border)]">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            লগিং অডিট ট্রেইল:
          </span>
          <span className="font-label-sm text-label-sm text-on-surface font-mono">
            DEL_REF_REQ_2024_{medicine.id.replace(/\D/g, "") || "081"} • User: Faruk A.
          </span>
        </div>

        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <button
            onClick={onClose}
            className="px-space-md py-2 rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-all cursor-pointer font-medium"
            type="button"
          >
            বাতিল (Cancel)
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-error text-on-error font-label-lg text-label-lg shadow-sm hover:opacity-90 transition-all cursor-pointer font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">delete_forever</span>
            <span>হ্যাঁ, মুছে ফেলুন (Delete)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
