"use client";

/**
 * WhatsAppMessageForm — Form for patient metadata, template, custom advice & dispatch actions
 * Preserved faithfully from Stitch whatsapp_share_ui design.
 */

import { SHARE_TEMPLATES, QUICK_ADVICE_PRESETS } from "@/lib/mock-data";
import type { MessageTemplateKey } from "@/types";

interface WhatsAppMessageFormProps {
  patientName: string;
  onPatientNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  template: MessageTemplateKey;
  onTemplateChange: (val: MessageTemplateKey) => void;
  advice: string;
  onAdviceChange: (val: string) => void;
  includePharmacyHeader: boolean;
  onTogglePharmacyHeader: () => void;
  includeWatermark: boolean;
  onToggleWatermark: () => void;
  onAddPresetAdvice: (preset: string) => void;
  onSendWhatsApp: () => void;
  onCopyText: () => void;
  onPrint: () => void;
}

export default function WhatsAppMessageForm({
  patientName,
  onPatientNameChange,
  phone,
  onPhoneChange,
  template,
  onTemplateChange,
  advice,
  onAdviceChange,
  includePharmacyHeader,
  onTogglePharmacyHeader,
  includeWatermark,
  onToggleWatermark,
  onAddPresetAdvice,
  onSendWhatsApp,
  onCopyText,
  onPrint,
}: WhatsAppMessageFormProps) {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-space-xs border-b border-[var(--color-border)]">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
            tune
          </span>
          <h2 className="font-label-lg text-label-lg text-on-surface font-bold">
            মেসেজ কাস্টমাইজেশন ও রোগীর তথ্য
          </h2>
        </div>
        <span className="font-label-sm text-label-sm text-secondary font-medium flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span>লাইভ সিঙ্ক চালু</span>
        </span>
      </div>

      {/* Patient Name Input */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="patientNameInput"
          className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center justify-between cursor-pointer"
        >
          <span>রোগীর নাম (বা প্রেসক্রিপশন হোল্ডার)</span>
          <span className="text-outline font-normal">বাংলা বা ইংরেজি</span>
        </label>
        <div className="relative flex items-center">
          <span
            className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-lg pointer-events-none"
            aria-hidden="true"
          >
            person
          </span>
          <input
            id="patientNameInput"
            type="text"
            value={patientName}
            onChange={(e) => onPatientNameChange(e.target.value)}
            placeholder="e.g. জনাব আব্দুল করিম"
            className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Patient WhatsApp Number */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="patientPhoneInput"
          className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center justify-between cursor-pointer"
        >
          <span>হোয়াটসঅ্যাপ মোবাইল নম্বর</span>
          <span className="text-tertiary font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-xs" aria-hidden="true">
              contact_phone
            </span>
            <span>পরিচিত নম্বর</span>
          </span>
        </label>
        <div className="relative flex items-center">
          <span
            className="material-symbols-outlined absolute left-3.5 text-tertiary text-lg pointer-events-none"
            aria-hidden="true"
          >
            chat
          </span>
          <input
            id="patientPhoneInput"
            type="text"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+880 1819-203948"
            className="w-full pl-10 pr-28 py-2.5 bg-surface-container-low rounded-xl text-on-surface font-mono text-body-md focus:ring-2 focus:ring-tertiary focus:bg-surface-container-lowest focus:outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => onPhoneChange("+880 1819-203948")}
            className="absolute right-2 px-space-xs py-1 rounded bg-surface-container text-on-surface-variant text-label-sm font-label-sm hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            নমুনা নম্বর
          </button>
        </div>
      </div>

      {/* Format Template Dropdown */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="templateSelect"
          className="font-label-sm text-label-sm text-on-surface-variant font-semibold cursor-pointer"
        >
          মেসেজ ফরম্যাট টেমপ্লেট
        </label>
        <select
          id="templateSelect"
          value={template}
          onChange={(e) => onTemplateChange(e.target.value as MessageTemplateKey)}
          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl px-space-md py-2.5 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
        >
          {SHARE_TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dosage Advice Textarea */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor="adviceTextarea"
            className="font-label-sm text-label-sm text-on-surface-variant font-semibold cursor-pointer"
          >
            ফার্মাসিস্টের বিশেষ সেবন পরামর্শ (বাংলায় লিখুন)
          </label>
          <span className="text-outline text-label-sm font-label-sm">
            প্রিভিউতে সরাসরি দেখাবে
          </span>
        </div>
        <textarea
          id="adviceTextarea"
          rows={3}
          value={advice}
          onChange={(e) => onAdviceChange(e.target.value)}
          placeholder="e.g. খাবার ৩০ মিনিট আগে সেক্লো খাবেন, নাপা ভরা পেটে জ্বর বেশি থাকলে খাবেন..."
          className="w-full p-space-md bg-surface-container-low rounded-xl text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest focus:outline-none transition-all resize-none leading-relaxed"
        />
      </div>

      {/* Quick Presets */}
      <div className="flex flex-col gap-1.5 pt-0.5">
        <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1 select-none">
          <span className="material-symbols-outlined text-sm text-secondary" aria-hidden="true">
            flash_on
          </span>
          <span>দ্রুত পরামর্শ যুক্ত করুন (ক্লিক করে নির্বাচন করুন):</span>
        </span>
        <div className="flex flex-wrap items-center gap-space-xs">
          {QUICK_ADVICE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onAddPresetAdvice(preset)}
              className="px-space-sm py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer"
            >
              + {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Pharmacy Header Toggle & Watermark Option */}
      <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs cursor-pointer select-none">
          <input
            id="headerToggle"
            type="checkbox"
            checked={includePharmacyHeader}
            onChange={onTogglePharmacyHeader}
            className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
          />
          <label htmlFor="headerToggle" className="font-label-md text-label-md text-on-surface cursor-pointer">
            ফার্মেসির নাম ও তারিখ যুক্ত করুন
          </label>
        </div>

        <div className="flex items-center gap-space-xs cursor-pointer select-none">
          <input
            id="watermarkToggle"
            type="checkbox"
            checked={includeWatermark}
            onChange={onToggleWatermark}
            className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
          />
          <label htmlFor="watermarkToggle" className="font-label-sm text-label-sm text-on-surface-variant cursor-pointer">
            ডিজিটাল প্রেসক্রিপশন ওয়াটারমার্ক
          </label>
        </div>
      </div>

      {/* Action Panel Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch gap-space-sm pt-space-xs">
        <button
          type="button"
          onClick={onSendWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-space-lg rounded-xl bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            share
          </span>
          <span>রোগীর হোয়াটসঅ্যাপে পাঠান</span>
        </button>

        <button
          type="button"
          onClick={onCopyText}
          className="flex items-center justify-center gap-1.5 py-3 px-space-md rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            content_copy
          </span>
          <span>মেসেজ টেক্সট কপি করুন</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="flex items-center justify-center gap-1.5 py-3 px-space-md rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            print
          </span>
          <span>প্রিন্ট স্লিপ / PDF</span>
        </button>
      </div>
    </div>
  );
}
