"use client";

/**
 * WhatsAppShareClient — Client-side state manager for WhatsApp prescription dispatch
 * Preserved faithfully from Stitch whatsapp_share_ui design.
 */

import { useState, useMemo, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import MedicineToast from "@/components/medicine/MedicineToast";

import WhatsAppShareHeader from "./WhatsAppShareHeader";
import WhatsAppScopeTabs from "./WhatsAppScopeTabs";
import WhatsAppSelectedShelf from "./WhatsAppSelectedShelf";
import WhatsAppMessageForm from "./WhatsAppMessageForm";
import WhatsAppLivePreview from "./WhatsAppLivePreview";
import WhatsAppAuditTable from "./WhatsAppAuditTable";

import { DEMO_SHARE_ITEMS, DEMO_AUDIT_LOGS } from "@/lib/mock-data";
import { toBengaliNumeral } from "@/lib/utils";
import type {
  PrescriptionShareItem,
  PrescriptionShareLog,
  ShareScopeTab,
  MessageTemplateKey,
} from "@/types";

export default function WhatsAppShareClient() {
  const [items, setItems] = useState<PrescriptionShareItem[]>(DEMO_SHARE_ITEMS);
  const [patientName, setPatientName] = useState("জনাব আব্দুল করিম");
  const [phone, setPhone] = useState("+880 1819-203948");
  const [template, setTemplate] = useState<MessageTemplateKey>("standard");
  const [advice, setAdvice] = useState(
    "খাবার ৩০ মিনিট আগে সেক্লো খাবেন, নাপা ভরা পেটে জ্বর বেশি থাকলে খাবেন। পর্যাপ্ত পানি পান করুন।"
  );
  const [includePharmacyHeader, setIncludePharmacyHeader] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [scopeTab, setScopeTab] = useState<ShareScopeTab>("selected");
  const [logs, setLogs] = useState<PrescriptionShareLog[]>(DEMO_AUDIT_LOGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price, 0);
  }, [items]);

  // Remove medicine item
  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      const next = prev.filter((i) => i.id !== id);
      if (target) {
        showToast(`${target.name} তালিকা থেকে সরানো হয়েছে`);
      }
      return next;
    });
  };

  // Add preset advice
  const handleAddPresetAdvice = (preset: string) => {
    setAdvice((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return preset;
      if (trimmed.includes(preset)) return trimmed;
      return `${trimmed} • ${preset}`;
    });
    showToast(`"${preset}" পরামর্শে যুক্ত করা হয়েছে`);
  };

  // Generate plain text for copying or wa.me
  const generateMessageText = () => {
    const lines: string[] = [];

    lines.push("🌿 *ঔষধBox ডিজিটাল প্রেসক্রিপশন স্লিপ* 🌿");
    if (includePharmacyHeader) {
      lines.push("ফার্মেসি: সেন্ট্রাল ড্রাগ হাউজ, ধানমন্ডি");
      lines.push("তারিখ: আজ | লাইভ রেজিস্ট্রি");
      lines.push(`রোগী: ${patientName.trim() || "রোগীর নাম"}`);
    }
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push("📋 *আপনার প্রয়োজনীয় ওষুধের তালিকা ও সেবনবিধি:*");

    items.forEach((item, index) => {
      lines.push(
        `${toBengaliNumeral(index + 1)}. *${item.nameBn} (${item.name})*`
      );
      lines.push(`   জেনেরিক: ${item.generic} (${item.company})`);
      if (template !== "list_only") {
        lines.push(`   মূল্য: ${item.priceFormatted}`);
      }
      if (template !== "compact") {
        lines.push(`   সেবনবিধি: ${item.dosageAdvice}`);
      }
    });

    lines.push("━━━━━━━━━━━━━━━━━━━━");
    if (template !== "list_only") {
      lines.push(
        `💰 *সর্বমোট আনুমানিক দাম:* ৳${toBengaliNumeral(
          totalPrice.toFixed(2)
        )} (খুচরা)`
      );
    }

    if (advice.trim()) {
      lines.push(`💡 *ফার্মাসিস্ট পরামর্শ:* ${advice.trim()}`);
    }

    if (includeWatermark) {
      lines.push("🛡️ _ঔষধBox ক্লিনিক্যাল প্ল্যাটফর্ম দ্বারা তৈরিকৃত (ডেমো)_");
    }

    return lines.join("\n");
  };

  // Copy to clipboard
  const handleCopyText = () => {
    const text = generateMessageText();
    navigator.clipboard?.writeText(text);
    showToast("প্রেসক্রিপশন টেক্সট সফলভাবে কপি করা হয়েছে!");
  };

  // Dispatch to WhatsApp
  const handleSendWhatsApp = () => {
    const text = generateMessageText();
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Add entry to audit log
    const newLog: PrescriptionShareLog = {
      id: `log-${Date.now()}`,
      patientName: patientName.trim() || "রোগীর নাম",
      phone: phone || "নম্বর উল্লেখ নেই",
      itemsSummary: `${items.length}টি আইটেম (${items
        .map((i) => i.name)
        .slice(0, 2)
        .join(", ")})`,
      itemCount: items.length,
      totalPriceFormatted: `৳${toBengaliNumeral(totalPrice.toFixed(2))}`,
      status: "delivered",
      time: "আজ, এইমাত্র",
      notes: advice,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`${patientName} এর জন্য হোয়াটসঅ্যাপ প্রেসক্রিপশন প্রেরণ সম্পন্ন!`);
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Re-send / Load log into form
  const handleResendLog = (log: PrescriptionShareLog) => {
    setPatientName(log.patientName);
    setPhone(log.phone);
    if (log.notes) {
      setAdvice(log.notes);
    }
    showToast(`${log.patientName} এর প্রেসক্রিপশন তথ্য ফর্মে লোড করা হয়েছে`);
  };

  return (
    <div className="flex min-h-screen bg-surface font-body-md text-body-md text-on-surface">
      {/* Desktop Left Rail Sidebar (lg+) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        <main className="flex-1 p-space-md lg:p-margin flex flex-col gap-space-lg w-full max-w-7xl mx-auto">
          {/* Top Context Header & 3-Step Workflow */}
          <WhatsAppShareHeader selectedCount={items.length} />

          {/* Sharing Scope Tabs */}
          <WhatsAppScopeTabs
            currentTab={scopeTab}
            onTabChange={setScopeTab}
            selectedCount={items.length}
          />

          {/* Selected Medicines Micro Shelf */}
          <WhatsAppSelectedShelf
            items={items}
            onRemoveItem={handleRemoveItem}
            totalPrice={totalPrice}
          />

          {/* Workspace Split Grid (7 cols form + 5 cols live preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Left Panel: Form */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <WhatsAppMessageForm
                patientName={patientName}
                onPatientNameChange={setPatientName}
                phone={phone}
                onPhoneChange={setPhone}
                template={template}
                onTemplateChange={setTemplate}
                advice={advice}
                onAdviceChange={setAdvice}
                includePharmacyHeader={includePharmacyHeader}
                onTogglePharmacyHeader={() =>
                  setIncludePharmacyHeader((prev) => !prev)
                }
                includeWatermark={includeWatermark}
                onToggleWatermark={() => setIncludeWatermark((prev) => !prev)}
                onAddPresetAdvice={handleAddPresetAdvice}
                onSendWhatsApp={handleSendWhatsApp}
                onCopyText={handleCopyText}
                onPrint={handlePrint}
              />
            </div>

            {/* Right Panel: Hyper-realistic WhatsApp Live Preview */}
            <div className="lg:col-span-5 flex flex-col gap-space-md sticky top-6">
              <WhatsAppLivePreview
                patientName={patientName}
                phone={phone}
                advice={advice}
                items={items}
                template={template}
                includePharmacyHeader={includePharmacyHeader}
                includeWatermark={includeWatermark}
                totalPrice={totalPrice}
              />
            </div>
          </div>

          {/* Historical Shared Prescriptions Drawer (Bottom Shelf) */}
          <WhatsAppAuditTable
            logs={logs}
            onResendLog={handleResendLog}
            onViewAllLogs={() =>
              showToast("সকল প্রেসক্রিপশন অডিট হিস্টোরি (১৪টি রেকর্ড)")
            }
          />
        </main>

        {/* Desktop Footer */}
        <footer className="hidden lg:block w-full bg-surface-container-lowest py-space-md px-margin border-t border-[var(--color-border)] mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant max-w-7xl mx-auto">
            <p>
              ঔষধBox v1.2.0 • বাংলাদেশ ফার্মাসিউটিক্যাল ডিরেক্টরি • তথ্যের উৎস: DGDA নির্দেশিকা (ডেমো) • শুধুমাত্র তথ্যগত সহায়তায়
            </p>
            <div className="flex items-center gap-space-md">
              <span className="text-primary font-medium">হটলাইন: ১৬২৬৩</span>
              <span className="text-secondary font-medium">Rx সেফটি ভেরিফাইড</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Fixed Bottom Navigation (lg:hidden) */}
      <MobileBottomNav />

      {/* Toast Notification Slot */}
      <MedicineToast message={toastMessage} />
    </div>
  );
}
