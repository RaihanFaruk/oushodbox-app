"use client";

/**
 * WhatsAppLivePreview — Hyper-realistic smartphone WhatsApp preview
 * Preserved faithfully from Stitch whatsapp_share_ui design.
 */

import { toBengaliNumeral } from "@/lib/utils";
import type { PrescriptionShareItem, MessageTemplateKey } from "@/types";

interface WhatsAppLivePreviewProps {
  patientName: string;
  phone: string;
  advice: string;
  items: PrescriptionShareItem[];
  template: MessageTemplateKey;
  includePharmacyHeader: boolean;
  includeWatermark: boolean;
  totalPrice: number;
}

export default function WhatsAppLivePreview({
  patientName,
  advice,
  items,
  template,
  includePharmacyHeader,
  includeWatermark,
  totalPrice,
}: WhatsAppLivePreviewProps) {
  const displayName = patientName.trim() || "জনাব আব্দুল করিম";
  const initials = displayName.charAt(0) || "আ";

  return (
    <div className="flex flex-col gap-space-md">
      {/* Preview Header Title */}
      <div className="flex items-center justify-between px-1">
        <span className="font-label-md text-label-md text-on-surface-variant font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
            smartphone
          </span>
          <span>হোয়াটসঅ্যাপ লাইভ স্ক্রিন প্রিভিউ</span>
        </span>
        <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
          রিয়েল-টাইম
        </span>
      </div>

      {/* Smartphone Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2a3942] bg-[#0b141a]">
        {/* WhatsApp App Header */}
        <div className="bg-[#202c33] px-space-md py-space-sm flex items-center justify-between text-white border-b border-[#222d34]">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-lg text-[#aebac1]" aria-hidden="true">
              arrow_back
            </span>
            <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center font-bold text-white text-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-label-md text-label-md font-semibold text-[#e9edef] flex items-center gap-1 truncate">
                <span className="truncate">{displayName}</span>
                <span className="material-symbols-outlined text-[13px] text-[#53bdeb] shrink-0" aria-hidden="true">
                  verified
                </span>
              </span>
              <span className="text-[11px] text-[#8696a0] truncate">
                অনলাইন • ঔষধBox ডিসপেনসারি
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm text-[#aebac1]">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              videocam
            </span>
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              call
            </span>
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              more_vert
            </span>
          </div>
        </div>

        {/* WhatsApp Chat Body with Radial Dot Pattern */}
        <div
          className="relative p-space-md flex flex-col gap-space-sm bg-[#0b141a] min-h-[480px] max-h-[600px] overflow-y-auto"
          style={{
            backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          {/* Date Pill */}
          <div className="self-center my-space-xs px-space-sm py-1 rounded-lg bg-[#182229] text-[#8696a0] font-label-sm text-label-sm shadow-xs uppercase tracking-wider select-none">
            আজ • লাইভ সেশন
          </div>

          {/* Encryption Notice */}
          <div className="p-space-xs px-space-sm rounded-lg bg-[#182229]/80 text-[#ffd279] text-[11px] text-center leading-normal mb-space-xs mx-auto max-w-xs flex items-center gap-1 justify-center select-none">
            <span className="material-symbols-outlined text-xs" aria-hidden="true">
              lock
            </span>
            <span>বার্তা এবং প্রেসক্রিপশন ডেটা এন্ড-টু-এন্ড এনক্রিপ্ট করা থাকে।</span>
          </div>

          {/* Outgoing Message Bubble (Right Aligned Emerald) */}
          <div className="self-end max-w-[94%] sm:max-w-[88%] bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-xs p-space-md shadow-md flex flex-col gap-space-xs">
            {/* Header Graphic Tag */}
            <div className="flex items-center justify-between pb-1 text-[#25d366]">
              <span className="font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span>🌿 ঔষধBox ডিজিটাল প্রেসক্রিপশন স্লিপ</span>
              </span>
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                verified
              </span>
            </div>

            {/* Header Info */}
            {includePharmacyHeader && (
              <div className="text-[12px] text-[#8696a0] leading-snug">
                <p>
                  <strong className="text-[#e9edef]">ফার্মেসি:</strong> সেন্ট্রাল ড্রাগ হাউজ, ধানমন্ডি
                </p>
                <p>
                  <strong className="text-[#e9edef]">তারিখ:</strong> আজ | ঔষধBox রেজিস্ট্রি
                </p>
                <p>
                  <strong className="text-[#e9edef]">রোগী:</strong> {displayName}
                </p>
              </div>
            )}

            <div className="w-full h-px bg-[#02735e] my-1"></div>

            <p className="text-[12px] text-[#53bdeb] font-semibold">
              📋 আপনার প্রয়োজনীয় ওষুধের তালিকা ও সেবনবিধি:
            </p>

            {/* Itemized Medicine Cards */}
            {items.length === 0 ? (
              <p className="text-[12px] text-[#8696a0] italic">
                কোনো ওষুধ যুক্ত করা হয়নি।
              </p>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-[#025142] p-2 rounded-xl text-[12px] leading-relaxed flex flex-col gap-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">
                      {toBengaliNumeral(index + 1)}. {item.nameBn} ({item.name})
                    </span>
                    {template !== "list_only" && (
                      <span className="text-[#ffd279] font-mono font-bold">
                        {item.priceFormatted}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8696a0]">
                    {item.generic} ({item.company})
                  </span>

                  {template !== "compact" && (
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#53bdeb]">
                      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                        schedule
                      </span>
                      <span>{item.dosageAdvice}</span>
                    </div>
                  )}
                </div>
              ))
            )}

            <div className="w-full h-px bg-[#02735e] my-1"></div>

            {/* Summary & Subtotal */}
            {template !== "list_only" && (
              <div className="flex items-center justify-between text-[12px] font-bold">
                <span className="text-[#8696a0]">সর্বমোট আনুমানিক দাম:</span>
                <span className="text-[#25d366] text-sm font-mono">
                  ৳{toBengaliNumeral(totalPrice.toFixed(2))} (খুচরা)
                </span>
              </div>
            )}

            {/* Pharmacist Note */}
            {advice.trim() && (
              <div className="bg-[#014437] p-2 rounded-xl text-[11px] text-[#e9edef] leading-snug">
                <span className="text-[#ffd279] font-bold">💡 ফার্মাসিস্ট পরামর্শ:</span>
                <p className="mt-0.5 text-[#d1d7db] leading-relaxed">{advice}</p>
              </div>
            )}

            {/* Watermark & Timestamp */}
            <div className="flex items-center justify-between pt-1 text-[10px] text-[#8696a0]">
              <span className="flex items-center gap-1">
                {includeWatermark && (
                  <>
                    <span className="material-symbols-outlined text-[11px] text-tertiary-fixed" aria-hidden="true">
                      shield
                    </span>
                    <span>ঔষধBox ক্লিনিক্যাল প্ল্যাটফর্ম দ্বারা তৈরিকৃত</span>
                  </>
                )}
              </span>
              <div className="flex items-center gap-1">
                <span>লাইভ</span>
                <span className="material-symbols-outlined text-sm text-[#53bdeb]" aria-hidden="true">
                  done_all
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Mock Input Bar */}
        <div className="bg-[#202c33] px-space-sm py-2 flex items-center gap-space-xs text-[#8696a0]">
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            mood
          </span>
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            attach_file
          </span>
          <div className="flex-1 bg-[#2a3942] rounded-xl px-space-sm py-1.5 text-xs text-[#8696a0] select-none">
            মেসেজ লিখুন...
          </div>
          <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              mic
            </span>
          </div>
        </div>
      </div>

      {/* Quick Tips Card */}
      <div className="p-space-md rounded-2xl bg-surface-container-low shadow-sm flex items-start gap-space-sm">
        <span className="material-symbols-outlined text-primary text-xl mt-0.5" aria-hidden="true">
          lightbulb
        </span>
        <div className="flex flex-col text-on-surface">
          <span className="font-label-md text-label-md font-bold">
            ফার্মাসিস্টদের জন্য পরামর্শ
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            রোগীর হোয়াটসঅ্যাপ না থাকলে এই পুরো মেসেজটি <strong>&apos;মেসেজ টেক্সট কপি করুন&apos;</strong> বাটনে চাপ দিয়ে এসএমএস (SMS) হিসেবেও পাঠাতে পারবেন।
          </span>
        </div>
      </div>
    </div>
  );
}
