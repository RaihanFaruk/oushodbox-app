"use client";

/**
 * MedicineBreadcrumb — Breadcrumb navigation bar
 * Preserved faithfully from Stitch medicine_details design.
 */

import Link from "next/link";

interface MedicineBreadcrumbProps {
  tradeName: string;
  genericName: string;
}

export default function MedicineBreadcrumb({
  tradeName,
  genericName,
}: MedicineBreadcrumbProps) {
  return (
    <div className="flex items-center justify-between gap-space-sm flex-wrap">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md py-1 flex-wrap"
      >
        <Link href="/" className="hover:text-primary transition-colors">
          হোম
        </Link>
        <span className="material-symbols-outlined text-sm select-none" aria-hidden="true">
          chevron_right
        </span>
        <Link href="/medicines" className="hover:text-primary transition-colors">
          ওষুধ ডাটাবেস
        </Link>
        <span className="material-symbols-outlined text-sm select-none" aria-hidden="true">
          chevron_right
        </span>
        <span className="text-on-surface font-semibold">
          {tradeName} ({genericName})
        </span>
      </nav>

      <Link
        href="/medicines"
        className="inline-flex items-center gap-1 text-primary hover:underline font-label-md text-label-md"
      >
        <span className="material-symbols-outlined text-base" aria-hidden="true">
          arrow_back
        </span>
        <span>তালিকায় ফিরে যান</span>
      </Link>
    </div>
  );
}
