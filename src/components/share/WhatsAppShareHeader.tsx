"use client";

/**
 * WhatsAppShareHeader — Top Context Bar, Pharmacist Badge & 3-Step Workflow Indicator
 * Preserved faithfully from Stitch whatsapp_share_ui design.
 */

import { toBengaliNumeral } from "@/lib/utils";

interface WhatsAppShareHeaderProps {
  selectedCount: number;
}

export default function WhatsAppShareHeader({
  selectedCount,
}: WhatsAppShareHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm border-l-4 border-tertiary">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="px-space-xs py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" aria-hidden="true">
                verified
              </span>
              <span>সরাসরি রোগী সংযোগ</span>
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-medium">
              ডিজিটাল প্রেসক্রিপশন স্লিপ v2.4 (ডেমো)
            </span>
          </div>

          <h1 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight mt-1">
            হোয়াটসঅ্যাপ শেয়ার ও ডিজিটাল প্রেসক্রিপশন স্লিপ
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-0.5">
            রোগীর ফোনে সরাসরি ওষুধের তালিকা, সেবনবিধি ও মূল্য তালিকা ডিজিটাল স্লিপ আকারে তাৎক্ষণিক প্রেরণ করুন।
          </p>
        </div>

        {/* Quick Pharmacist Badge Card */}
        <div className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-container-low shadow-sm self-start md:self-auto">
          <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              send_to_mobile
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              নিবন্ধিত ডিসপেনসারি
            </span>
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              সেন্ট্রাল ড্রাগ হাউজ
            </span>
            <span className="font-body-sm text-body-sm text-secondary">
              ধানমন্ডি শাখা • লাইভ কানেক্টেড
            </span>
          </div>
        </div>
      </div>

      {/* 3-Step Interactive Workflow Indicator */}
      <div className="relative z-10 mt-space-lg pt-space-md border-t border-[var(--color-border)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm sm:gap-space-md">
          {/* Step 1 (Done) */}
          <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low/80 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-label-md text-label-md font-bold shrink-0">
              ✓
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                ধাপ ০১
              </span>
              <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                ওষুধ নির্বাচন সম্পন্ন ({toBengaliNumeral(selectedCount)}টি)
              </span>
            </div>
          </div>

          {/* Step 2 (Active) */}
          <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-primary-container text-on-primary-container shadow-md">
            <div className="w-8 h-8 rounded-full bg-on-primary text-primary flex items-center justify-center font-label-md text-label-md font-bold shrink-0">
              ২
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-primary-container/80 font-semibold">
                ধাপ ০২ • বর্তমান ধাপ
              </span>
              <span className="font-label-md text-label-md text-on-primary font-bold truncate">
                মেসেজ প্রিভিউ ও কাস্টমাইজ
              </span>
            </div>
          </div>

          {/* Step 3 (Pending) */}
          <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low/50 text-on-surface-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-bold shrink-0">
              ৩
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                ধাপ ০৩
              </span>
              <span className="font-label-md text-label-md text-on-surface truncate">
                এক ক্লিকে হোয়াটসঅ্যাপে প্রেরণ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
