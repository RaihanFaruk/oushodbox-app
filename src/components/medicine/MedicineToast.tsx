"use client";

/**
 * MedicineToast — Micro-notification slot
 * Preserved faithfully from Stitch medicine_database design.
 */

interface MedicineToastProps {
  message: string | null;
}

export default function MedicineToast({ message }: MedicineToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-10 right-6 flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-xl shadow-xl z-50 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <span className="material-symbols-outlined text-primary-fixed" aria-hidden="true">
        check_circle
      </span>
      <span className="font-label-md text-label-md font-medium">{message}</span>
    </div>
  );
}
