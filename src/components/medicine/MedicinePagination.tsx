"use client";

/**
 * MedicinePagination — Pagination and volume indicator
 * Preserved faithfully from Stitch medicine_database design.
 */

import { toBengaliNumeral } from "@/lib/utils";

interface MedicinePaginationProps {
  totalItems: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function MedicinePagination({
  totalItems,
  currentPage = 1,
  totalPages = 24,
  onPageChange,
}: MedicinePaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
        <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
          database
        </span>
        <span>
          পাতা <strong>{toBengaliNumeral(currentPage)}</strong> এর{" "}
          <strong>{toBengaliNumeral(totalPages)}</strong> • মোট{" "}
          <strong>{toBengaliNumeral(totalItems)}</strong> টি আইটেম অন্তর্ভুক্ত
        </span>
      </div>

      <div className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          aria-label="আগের পাতা"
          className="p-2 rounded-lg bg-surface-container-low text-outline disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            chevron_left
          </span>
        </button>

        <button
          type="button"
          aria-current={currentPage === 1 ? "page" : undefined}
          onClick={() => onPageChange?.(1)}
          className={`w-8 h-8 rounded-lg font-label-md text-label-md flex items-center justify-center font-bold transition-colors ${
            currentPage === 1
              ? "bg-primary text-on-primary"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          }`}
        >
          ১
        </button>

        <button
          type="button"
          aria-current={currentPage === 2 ? "page" : undefined}
          onClick={() => onPageChange?.(2)}
          className={`w-8 h-8 rounded-lg font-label-md text-label-md flex items-center justify-center transition-colors ${
            currentPage === 2
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          }`}
        >
          ২
        </button>

        <button
          type="button"
          aria-current={currentPage === 3 ? "page" : undefined}
          onClick={() => onPageChange?.(3)}
          className={`w-8 h-8 rounded-lg font-label-md text-label-md flex items-center justify-center transition-colors ${
            currentPage === 3
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          }`}
        >
          ৩
        </button>

        <span className="px-1 text-on-surface-variant select-none">...</span>

        <button
          type="button"
          aria-current={currentPage === totalPages ? "page" : undefined}
          onClick={() => onPageChange?.(totalPages)}
          className={`w-8 h-8 rounded-lg font-label-md text-label-md flex items-center justify-center transition-colors ${
            currentPage === totalPages
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          }`}
        >
          {toBengaliNumeral(totalPages)}
        </button>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          aria-label="পরের পাতা"
          className="p-2 rounded-lg bg-surface-container-low text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
