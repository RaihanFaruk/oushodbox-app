/**
 * ঔষধBox — Mock / Demo Data
 *
 * ⚠️  DEMO DATA ONLY — Not real, verified, or live information.
 * All medicines, statistics, activities, and notices in this file
 * are fictional examples for UI demonstration purposes.
 *
 * DGDA notices are sample/placeholder content only.
 * They are NOT sourced from, endorsed by, or affiliated with DGDA.
 * Real data integration will replace this file in a future phase.
 */

import type {
  DatabaseMedicine,
  MedicineMonograph,
  PrescriptionShareItem,
  PrescriptionShareLog,
  AdminMedicineItem,
  AdminAuditLogItem,
  AdminModuleTab,
  UpcomingFeatureItem,
  PwaStatusMetric,
  PwaHighlightItem,
} from "@/types";

// ─── Types (inline for now) ────────────────────────────────────────────────

export type DosageForm = "TAB" | "CAP" | "SYR" | "INJ" | "CRE" | "EYE" | "Rx";
export type StockLevel = "in_stock" | "low_stock" | "out_of_stock";
export type NoticeType = "warning" | "update" | "recall" | "approval";

// ─── Filter & Sort Options from Stitch Design ─────────────────────────────

export interface FilterSelectOption {
  value: string;
  label: string;
}

export const GENERIC_FILTER_OPTIONS: FilterSelectOption[] = [
  { value: "all", label: "সকল জেনেরিক (All)" },
  { value: "paracetamol", label: "Paracetamol" },
  { value: "omeprazole", label: "Omeprazole" },
  { value: "esomeprazole", label: "Esomeprazole" },
  { value: "azithromycin", label: "Azithromycin" },
  { value: "montelukast", label: "Montelukast" },
  { value: "metformin", label: "Metformin" },
];

export const DOSAGE_FORM_FILTER_OPTIONS: FilterSelectOption[] = [
  { value: "all", label: "সকল ফরম্যাট (All)" },
  { value: "tablet", label: "ট্যাবলেট (Tablet)" },
  { value: "capsule", label: "ক্যাপসুল (Capsule)" },
  { value: "syrup", label: "সিরাপ (Syrup)" },
  { value: "injection", label: "ইনজেকশন (Injection)" },
  { value: "eye-drop", label: "আই ড্রপ (Eye Drop)" },
  { value: "ointment", label: "অয়েন্টমেন্ট (Ointment)" },
];

export const SORT_OPTIONS: FilterSelectOption[] = [
  { value: "updated", label: "সম্প্রতি হালনাগাদ (Recently Updated)" },
  { value: "alpha", label: "নাম অনুসারে (A-Z)" },
  { value: "price-low", label: "মূল্য: কম থেকে বেশি (Low to High)" },
  { value: "price-high", label: "মূল্য: বেশি থেকে কম (High to Low)" },
  { value: "discount", label: "সর্বাধিক ডিসকাউন্ট (Max Discount)" },
];

export const POPULAR_SEARCH_TERMS = [
  "Paracetamol",
  "Omeprazole",
  "Esomeprazole",
  "Azithromycin",
  "Square Pharmaceuticals",
];

// ─── Phase 4: Clinical Monograph Mock Data ────────────────────────────────
// ⚠️ DEMO / MOCK DATA ONLY — Fictional records preserved from Stitch design.
// Not real, verified medical advice or official clinical recommendations.

export function getMedicineMonograph(_id: string): MedicineMonograph | null {
  return null;
}

// ─── Phase 5: WhatsApp Share Demo Data ────────────────────────────────────
// ⚠️ DEMO / MOCK DATA ONLY — Fictional records preserved from Stitch design.

export const DEMO_SHARE_ITEMS: PrescriptionShareItem[] = [
  {
    id: "item-1",
    name: "Napa Extra",
    nameBn: "নাপা এক্সট্রা",
    generic: "প্যারাসিটামল ৫০০ মি.গ্রা. + ক্যাফেইন ৬৫ মি.গ্রা.",
    company: "Beximco",
    price: 2.5,
    priceFormatted: "৳২.৫০",
    dosageAdvice: "১টি করে দিনে ২ বার (ভরা পেটে জ্বর থাকলে)",
    colorDot: "primary",
  },
  {
    id: "item-2",
    name: "Seclo 20mg Capsule",
    nameBn: "সেক্লো ২০ মি.গ্রা.",
    generic: "ওমিপ্রাজল ২০ মি.গ্রা.",
    company: "Square",
    price: 5.0,
    priceFormatted: "৳৫.০০",
    dosageAdvice: "১টি করে দিনে ২ বার (খাবার ৩০ মিনিট আগে)",
    colorDot: "secondary",
  },
  {
    id: "item-3",
    name: "Monas 10mg Tablet",
    nameBn: "মোনাস ১০ মি.গ্রা.",
    generic: "মন্টেলুকাস্ট ১০ মি.গ্রা.",
    company: "Acme",
    price: 16.0,
    priceFormatted: "৳১৬.০০",
    dosageAdvice: "১টি করে ট্যাবলেট রাতে শোবার আগে",
    colorDot: "tertiary",
  },
];

export const DEMO_AUDIT_LOGS: PrescriptionShareLog[] = [
  {
    id: "log-1",
    patientName: "কামাল হোসেন",
    phone: "+880 1819-203948",
    itemsSummary: "২টি আইটেম (Fexo, Napa)",
    itemCount: 2,
    totalPriceFormatted: "৳১৮.০০",
    status: "delivered",
    time: "আজ, ০৩:৪৫ PM",
    notes: "খাবার পর সেব্য। অতিরিক্ত জ্বর থাকলে যোগাযোগ করুন।",
  },
  {
    id: "log-2",
    patientName: "রোকেয়া বেগম",
    phone: "+880 1911-002233",
    itemsSummary: "৪টি আইটেম (Sergel, Ceevit, Napa, Bizoran)",
    itemCount: 4,
    totalPriceFormatted: "৳৭২.০০",
    status: "delivered",
    time: "আজ, ০২:২০ PM",
    notes: "খালি পেটে সার্জেল খাবেন। ভিটামিন সি দুপুরে ভরা পেটে।",
  },
  {
    id: "log-3",
    patientName: "তানভীর রহমান",
    phone: "+880 1680-123456",
    itemsSummary: "১টি আইটেম (Ventolin Inhaler)",
    itemCount: 1,
    totalPriceFormatted: "৳৩১৫.০০",
    status: "sending",
    time: "আজ, ০১:১০ PM",
    notes: "ইনহেলার ব্যবহারের সঠিক নিয়ম মেনে চলুন।",
  },
];

export const QUICK_ADVICE_PRESETS = [
  "ভরা পেটে সেব্য",
  "খালি পেটে (খাবার ৩০ মি. পূর্বে)",
  "অ্যান্টিবায়োটিক কোর্স পূর্ণ করুন",
  "প্রচুর পানি পান করুন",
];

export const SHARE_TEMPLATES = [
  { id: "standard", label: "স্ট্যান্ডার্ড সেবনবিধি ও মূল্য তালিকা" },
  { id: "compact", label: "সংক্ষিপ্ত খুচরা মূল্য স্লিপ" },
  { id: "list_only", label: "শুধুমাত্র ওষুধের তালিকা" },
  { id: "urgent", label: "জরুরি ডোজ সতর্কতাবার্তা" },
];

// ─── Phase 6: Admin Panel Demo Data ───────────────────────────────────────

export const ADMIN_MODULE_TABS: AdminModuleTab[] = [
  {
    id: "medicines",
    label: "ওষুধ ম্যানেজমেন্ট",
    labelEn: "Medicine Management",
    icon: "medication",
  },
  {
    id: "users",
    label: "ব্যবহারকারী ও রোল",
    labelEn: "User Management",
    icon: "group",
  },
  {
    id: "announcements",
    label: "নোটিশ ও অ্যানাউন্সমেন্ট",
    labelEn: "Announcements",
    icon: "campaign",
  },
  {
    id: "whatsapp",
    label: "হোয়াটসঅ্যাপ কনফিগারেশন",
    labelEn: "WhatsApp Gateway",
    icon: "chat",
  },
  {
    id: "audit",
    label: "সিস্টেম সেটিংস ও লগ",
    labelEn: "Audit Log",
    icon: "rule",
  },
];

export const DEMO_ADMIN_MEDICINES: AdminMedicineItem[] = [];

export const DEMO_ADMIN_AUDIT_LOGS: AdminAuditLogItem[] = [
  {
    id: "aud-1",
    title: "ফারুক আহমেদ (A-Grade) Napa Extra আপডেট করেছেন",
    timeAgo: "১০ মিনিট আগে",
    meta: "আইপি: ১০৩.২৪৪.৮.১০",
    icon: "verified_user",
    type: "update",
  },
  {
    id: "aud-2",
    title: "DGDA মাস্টার প্রাইস ইনডেক্স সিঙ্ক সফল",
    timeAgo: "৩৩ মিনিট আগে",
    meta: "অটো-শিডিউলড জব",
    icon: "cloud_sync",
    type: "sync",
  },
  {
    id: "aud-3",
    title: "নতুন জেনেরিক অমিল ধরা পড়েছে (Azithrocin)",
    timeAgo: "১ ঘণ্টা আগে",
    meta: "রিভিউ পেন্ডিং ট্যাগে প্রেরিত",
    icon: "flag",
    type: "flag",
  },
];

// ─── Phase 7: Upcoming Features & PWA Offline Demo Data ───────────────────

export const DEMO_UPCOMING_FEATURES: UpcomingFeatureItem[] = [
  {
    id: "feat-1",
    moduleNo: "MODULE #01",
    title: "স্টক ম্যানেজমেন্ট",
    titleEn: "Stock & Inventory Management",
    description:
      "লাইভ স্টক কাউন্ট, লো-স্টক অ্যালার্ম, এবং নিরাপদ ইনভেন্টরি লেভেল বজায় রাখতে অটোমেটিক রি-অর্ডার তালিকা তৈরি।",
    icon: "inventory_2",
    colorScheme: "primary",
    progressPct: 75,
    previewType: "stock_bar",
    previewData: {
      drugName: "ইনভেন্টরি আইটেম",
      remainingText: "মাত্র ১৮ পাতা অবশিষ্ট",
      fillPct: 14,
    },
  },
  {
    id: "feat-2",
    moduleNo: "MODULE #02",
    title: "এক্সপায়ারি ম্যানেজমেন্ট",
    titleEn: "Medicine Expiry Tracker",
    description:
      "৯০/৬০/৩০ দিনের মেয়াদোত্তীর্ণ সতর্কবার্তা ও ড্রাগ নষ্ট হওয়া রোধে 'ফার্স্ট-এক্সপায়ারি-ফার্স্ট-আউট' (FEFO) সেলস ট্র্যাকিং।",
    icon: "timer",
    colorScheme: "error",
    progressPct: 85,
    previewType: "expiry_badge",
    previewData: {
      drugName: "ফার্মাকোপিয়া আইটেম",
      expiryDate: "মেয়াদ শেষ: ২৮ এপ্রিল, ২০২৫",
      daysLeft: "৫৮ দিন বাকি",
    },
  },
  {
    id: "feat-3",
    moduleNo: "MODULE #03",
    title: "বারকোড ও কিউআর স্ক্যানার",
    titleEn: "Barcode / QR Scanner",
    description:
      "মোবাইল ক্যামেরা দিয়ে প্যাকেটের বারকোড বা স্ট্রিপ স্ক্যান করলেই ব্যাচ, এমআরপি এবং ওষুধের পূর্ণ তথ্যের প্রিভিউ।",
    icon: "barcode",
    colorScheme: "secondary",
    progressPct: 90,
    previewType: "barcode",
    previewData: {
      barcodeNumber: "৮ ৯ ৪ ১ ১ ০ ৩ ৯ ৭ ২ ০ ১",
    },
  },
  {
    id: "feat-4",
    moduleNo: "MODULE #04",
    title: "পিওএস ও ডিজিটাল বিলিং",
    titleEn: "POS & Thermal Receipt Billing",
    description:
      "দ্রুত ক্যাশ মেমো জেনারেশন, কাস্টম ডিসকাউন্ট ক্যালকুলেটর ও ব্লুটুথ থার্মাল প্রিন্টারে ৫০মিমি/৮০মিমি স্লিপ ছাপানো।",
    icon: "receipt_long",
    colorScheme: "tertiary",
    progressPct: 60,
    previewType: "pos_bill",
    previewData: {
      billSummary: "মোট বিল (৩টি আইটেম):",
      totalFormatted: "৳ ৪২০.০০ (১০% ছাড়)",
    },
  },
  {
    id: "feat-5",
    moduleNo: "MODULE #05",
    title: "কাস্টমার ও পেশেন্ট ম্যানেজমেন্ট",
    titleEn: "Patient CRM & Refills",
    description:
      "রোগীর ক্রনিক রোগের (ডায়াবেটিস/উচ্চ রক্তচাপ) ওষুধের হিস্ট্রি সংরক্ষণ ও নির্দিষ্ট সময় পর এসএমএস/হোয়াটসঅ্যাপে রিফিল রিমাইন্ডার।",
    icon: "person_search",
    colorScheme: "primary",
    progressPct: 70,
    previewType: "refill_alert",
    previewData: {
      patientAlert: "ক্রনিক ডিজিজ প্রেসক্রিপশন রিফিল অ্যালার্ট",
    },
  },
  {
    id: "feat-6",
    moduleNo: "MODULE #06",
    title: "সাপ্লায়ার ও কোম্পানি রিলেশন",
    titleEn: "Supplier Directory & MIO Contacts",
    description:
      "ওষুধ কোম্পানির রিপ্রেজেন্টেটিভ (MIO) ও এলাকাভিত্তিক ডিপোর সরাসরি মোবাইল নম্বর, অর্ডার শিডিউল ও পেমেন্ট হিস্ট্রি।",
    icon: "domain",
    colorScheme: "surface",
    progressPct: 80,
    previewType: "depot_schedule",
    previewData: {
      companyName: "রেজিস্টার্ড সাপ্লায়ার (ডিপো ১)",
      schedule: "অর্ডার ডে: রবিবার/বুধবার",
    },
  },
  {
    id: "feat-7",
    moduleNo: "MODULE #07",
    title: "অ্যাডভান্সড অ্যানালিটিক্স ও রিপোর্ট",
    titleEn: "Advanced Analytics & Sales",
    description:
      "ফার্মেসির বিক্রয় ট্রেন্ড, সর্বাধিক বিক্রিত জেনেরিক ও কোম্পানির ওষুধ, লাভ-ক্ষতির মার্জিন এবং সিজনাল স্বাস্থ্য ট্রেন্ডের গ্রাফিক্যাল ডেটা।",
    icon: "insights",
    colorScheme: "primary",
    progressPct: 50,
    previewType: "sparkline",
    previewData: {
      growthText: "মাসিক প্রবৃদ্ধি: +১৮.৪%",
    },
  },
  {
    id: "feat-8",
    moduleNo: "MODULE #08",
    title: "এআই ফার্মাসিস্ট অ্যাসিস্ট্যান্ট",
    titleEn: "AI Clinical Assistant & Interactions",
    description:
      "দুই বা ততোধিক ওষুধের ড্রাগ ইন্টারঅ্যাকশন পরীক্ষা, প্রেগনেন্সি ক্যাটাগরি সতর্কতা ও বিকল্প সাশ্রয়ী ফর্মুলেশন খোঁজার কৃত্রিম বুদ্ধিমত্তা।",
    icon: "neurology",
    colorScheme: "secondary",
    progressPct: 65,
    previewType: "rx_alert",
    previewData: {
      interactionAlert: "Rx Alert: ড্রাগ ইন্টারঅ্যাকশন পরীক্ষা সক্রিয়",
    },
  },
  {
    id: "feat-9",
    moduleNo: "MODULE #09",
    title: "প্রেসক্রিপশন স্ক্যানার (OCR)",
    titleEn: "OCR Prescription Reader",
    description:
      "ডাক্তারের হাতের লেখা প্রেসক্রিপশনের ছবি তুললে স্বয়ংক্রিয়ভাবে ওষুধের নাম শনাক্ত করে বিলিং তালিকায় রূপান্তর।",
    icon: "document_scanner",
    colorScheme: "tertiary",
    progressPct: 40,
    previewType: "ocr_scan",
    previewData: {
      scanAccuracy: "OCR ভিশন এআই: ৯২% নির্ভুল শনাক্তকরণ",
    },
  },
];

export const DEMO_PWA_METRICS: PwaStatusMetric = {
  serviceWorkerStatus: "Active 🟢",
  cacheSizeFormatted: "৬৪.২ MB",
  manifestVersion: "Valid v2.0",
  isOnline: true,
};

export const DEMO_PWA_HIGHLIGHTS: PwaHighlightItem[] = [
  {
    id: "hl-1",
    title: "এক ক্লিকে ফোনে ইন্সটল",
    description: "হোম স্ক্রিনে সরাসরি ইনস্টলযোগ্য WebAPK লাইটওয়েট অ্যাপ্লিকেশন।",
    icon: "touch_app",
    colorClass: "bg-primary text-on-primary",
  },
  {
    id: "hl-2",
    title: "অফলাইন ফার্স্ট ডাটাবেস",
    description: "IndexedDB ক্যাশে স্থানীয়ভাবে সংরক্ষিত পুরো ফার্মাকোপিয়া।",
    icon: "cloud_off",
    colorClass: "bg-secondary text-on-secondary",
  },
  {
    id: "hl-3",
    title: "পুশ নোটিফিকেশন",
    description: "ডিজিডিএ (DGDA) ড্রাগ প্রাইস ও নতুন ব্র্যান্ড আপডেটের জরুরি নোটিশ।",
    icon: "notifications_active",
    colorClass: "bg-tertiary text-on-tertiary",
  },
  {
    id: "hl-4",
    title: "ডার্ক ও লাইট মোড",
    description: "রাতের শিফটে ডিসপেনসারিতে চোখ ভালো রাখতে অটোনোমাস থিম।",
    icon: "dark_mode",
    colorClass: "bg-surface-container-highest text-on-surface",
  },
];



