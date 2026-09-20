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

// ─── Demo Pharmacist Profile ───────────────────────────────────────────────

export const DEMO_PHARMACIST = {
  name: "ডাক্তার মোহাম্মদ",              // Demo name
  nameGreeting: "শুভ সন্ধ্যা 👋",        // Greeting
  role: "ফার্মাসিস্ট",
  registrationNo: "A-14920",
  grade: "A-Grade Pharmacist",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB2Yn0knNzrvkchow5Aa81-JFpiWeRrY9CYZ8GNF14OoaLSt_2ofU9pJnRe_ekUZttsscggM1tNmIElL-DNXIal1EXZW93QWiqgcJ_VHw4b4caQdpjgN5bLkglCsQbi2bJ8_O4tP9rQOxn6GRJT40-xMxbqf8ai5BXQNFcn-P5uspUu5GaLFGSd40qlzjr3tfiMdqmhTdfxMeSznxgkcCcNsFV8ejX2sQbtjzv1zeouKlbpOfvVtiAFMw",
  welcomeText:
    "Welcome to ঔষধBox — আপনার ফার্মাসিউটিক্যাল ম্যানেজমেন্ট ও ডাটাবেজ সিস্টেম",
  syncLabel: "লাইভ সিংক চলছে",
  syncDetail: "৪,৫২৩ টি ঔষধ সিংক্রোনাইজড",
};

// ─── Demo Statistics ───────────────────────────────────────────────────────
// ⚠️ These are demo numbers — not live database counts.

export interface StatCardData {
  label: string;
  labelBn: string;
  value: string;
  unit: string;
  trend: string;
  trendIcon: string;
  trendColor: "primary" | "secondary" | "tertiary" | "warning";
  icon: string;
  iconColor: "primary" | "secondary" | "tertiary" | "warning";
  progressPct: number;
}

export const DEMO_STATS: StatCardData[] = [
  {
    label: "Total Medicines",
    labelBn: "মোট ঔষধ ডেটাবেজ",
    value: "৪,৫২৩",
    unit: "টি",
    trend: "+১৭ টি নতুন ঔষধ যোগ হয়েছে",
    trendIcon: "trending_up",
    trendColor: "tertiary",
    icon: "database",
    iconColor: "primary",
    progressPct: 84,
  },
  {
    label: "Verified Updates",
    labelBn: "সর্বশেষ আপডেটকৃত",
    value: "৩,২৪৮",
    unit: "টি",
    trend: "সব তথ্য যাচাই করা হয়েছে",
    trendIcon: "done_all",
    trendColor: "secondary",
    icon: "update",
    iconColor: "secondary",
    progressPct: 65,
  },
  {
    label: "WhatsApp Shares Today",
    labelBn: "হোয়াটসঅ্যাপ শেয়ার",
    value: "৬৮+",
    unit: "বার",
    trend: "আজকের ফার্মাসিউটিক্যাল শেয়ার",
    trendIcon: "quickreply",
    trendColor: "tertiary",
    icon: "share",
    iconColor: "tertiary",
    progressPct: 72,
  },
  {
    label: "Low Stock Alerts",
    labelBn: "কম স্টক সতর্কতা",
    value: "১২",
    unit: "টি",
    trend: "মনোযোগ প্রয়োজন",
    trendIcon: "warning",
    trendColor: "warning",
    icon: "inventory_2",
    iconColor: "warning",
    progressPct: 18,
  },
];

// ─── Demo Medicines ────────────────────────────────────────────────────────
// ⚠️ Fictional demo records — prices, stock, and details are illustrative only.

export interface DemoMedicine {
  id: string;
  tradeName: string;
  strength: string;
  extraBadge?: string;
  extraBadgeType?: "normal" | "rx" | "schedule";
  genericLabel: string;
  genericName: string;
  manufacturer: string;
  priceLabel: string;
  price: string;
  priceUnit: string;
  stockInfo: string;
  stockType: "normal" | "warning" | "error";
  dosageForm: DosageForm;
  dosageColor: "primary" | "secondary" | "tertiary" | "error";
}

export const DEMO_MEDICINES: DemoMedicine[] = [
  {
    id: "m1",
    tradeName: "Napa Extra",
    strength: "500mg+65mg",
    genericLabel: "জেনেরিক:",
    genericName: "Paracetamol + Caffeine",
    manufacturer: "Beximco Pharmaceuticals Ltd.",
    priceLabel: "৳",
    price: "৳ ২.৫০",
    priceUnit: "/ ট্যাবলেট",
    stockInfo: "স্টক: ৫০০ টি",
    stockType: "normal",
    dosageForm: "TAB",
    dosageColor: "primary",
  },
  {
    id: "m2",
    tradeName: "Seclo",
    strength: "20mg",
    extraBadge: "ক্যাপসুল ফর্ম",
    extraBadgeType: "normal",
    genericLabel: "জেনেরিক:",
    genericName: "Omeprazole",
    manufacturer: "Square Pharmaceuticals Ltd.",
    priceLabel: "৳",
    price: "৳ ৫.০০",
    priceUnit: "/ ক্যাপসুল",
    stockInfo: "স্টক: ২৪০ টি",
    stockType: "normal",
    dosageForm: "CAP",
    dosageColor: "secondary",
  },
  {
    id: "m3",
    tradeName: "Monas",
    strength: "10mg",
    extraBadge: "শ্বাস সংক্রান্ত",
    extraBadgeType: "normal",
    genericLabel: "জেনেরিক:",
    genericName: "Montelukast Sodium",
    manufacturer: "Acme Laboratories Ltd.",
    priceLabel: "৳",
    price: "৳ ১৫.০০",
    priceUnit: "/ ট্যাবলেট",
    stockInfo: "স্টক: ৬৫ টি",
    stockType: "normal",
    dosageForm: "TAB",
    dosageColor: "tertiary",
  },
  {
    id: "m4",
    tradeName: "Maxpro",
    strength: "20mg",
    extraBadge: "MUPS ট্যাবলেট",
    extraBadgeType: "normal",
    genericLabel: "জেনেরিক:",
    genericName: "Esomeprazole Magnesium",
    manufacturer: "Renata Limited",
    priceLabel: "৳",
    price: "৳ ৮.০০",
    priceUnit: "/ ট্যাবলেট",
    stockInfo: "স্টক: ৮০ টি",
    stockType: "normal",
    dosageForm: "TAB",
    dosageColor: "primary",
  },
  {
    id: "m5",
    tradeName: "Ciprocin",
    strength: "500mg",
    extraBadge: "প্রেসক্রিপশন আবশ্যক",
    extraBadgeType: "rx",
    genericLabel: "জেনেরিক:",
    genericName: "Ciprofloxacin USP (Antibiotic)",
    manufacturer: "Square Pharmaceuticals Ltd.",
    priceLabel: "৳",
    price: "৳ ১৫.০০",
    priceUnit: "/ ট্যাবলেট",
    stockInfo: "প্রেসক্রিপশনবিহীন বিক্রয় নিষিদ্ধ",
    stockType: "error",
    dosageForm: "Rx",
    dosageColor: "error",
  },
];

// ─── Demo Filter Categories ────────────────────────────────────────────────

export interface FilterCategory {
  id: string;
  labelBn: string;
  labelEn: string;
}

export const FILTER_CATEGORIES: FilterCategory[] = [
  { id: "all", labelBn: "সকল ঔষধ", labelEn: "All" },
  { id: "paracetamol", labelBn: "প্যারাসিটামল", labelEn: "Paracetamol" },
  { id: "antibiotic", labelBn: "অ্যান্টিবায়োটিক", labelEn: "Antibiotic" },
  { id: "gastric", labelBn: "গ্যাস্ট্রিক / PPI", labelEn: "Gastric / PPI" },
  { id: "diabetes", labelBn: "ডায়াবেটিসের", labelEn: "Diabetes" },
  { id: "vitamin", labelBn: "ভিটামিন ও মিনারেল", labelEn: "Vitamin" },
  { id: "pediatric", labelBn: "পেডিয়াট্রিক মেড", labelEn: "Pediatric" },
];

// ─── Demo Quick Actions ────────────────────────────────────────────────────

export interface QuickAction {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
  badgeType: "pill" | "chip" | "dot";
  badgeBg?: string;
  badgeText?: string;
  title: string;
  titleColor: string;
  description: string;
  cta: string;
  ctaColor: string;
  href: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "medicine-db",
    icon: "medication",
    iconBg: "bg-primary-fixed",
    iconColor: "text-on-primary-fixed-variant",
    badgeType: "chip",
    title: "ঔষধ ডেটাবেজ",
    titleColor: "group-hover:text-primary",
    description: "DGDA অনুমোদিত ঔষধ রেকর্ড ও জেনেরিক ইনফরমেশন খুঁজুন",
    cta: "ডেটাবেজ ব্রাউজ করুন",
    ctaColor: "text-primary",
    href: "/medicines",
  },
  {
    id: "add-medicine",
    icon: "add_circle",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed-variant",
    badge: "Admin",
    badgeType: "chip",
    badgeBg: "bg-surface-container-highest text-on-surface",
    title: "নতুন ঔষধ যোগ",
    titleColor: "group-hover:text-secondary",
    description: "ফার্মাসিউটিক্যাল ইনভেন্টরি তে নতুন ঔষধ রেকর্ড আপডেট করুন",
    cta: "এখনই যোগ করুন",
    ctaColor: "text-secondary",
    href: "/admin",
  },
  {
    id: "whatsapp-share",
    icon: "send_to_mobile",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-on-tertiary-fixed-variant",
    badge: "Instant",
    badgeType: "pill",
    badgeBg: "bg-tertiary text-on-tertiary",
    title: "হোয়াটসঅ্যাপ শেয়ার",
    titleColor: "group-hover:text-tertiary",
    description: "রোগীকে সরাসরি প্রেসক্রিপশন সাজেশন ও ঔষধ তথ্য পাঠান",
    cta: "শেয়ার শুরু করুন",
    ctaColor: "text-tertiary",
    href: "#",
  },
  {
    id: "alerts",
    icon: "warning",
    iconBg: "bg-error-container",
    iconColor: "text-on-error-container",
    badgeType: "dot",
    title: "স্টক সতর্কতা",
    titleColor: "group-hover:text-error",
    description: "DGDA নির্দেশিত ওষুধ সতর্কবার্তা, মেয়াদোত্তীর্ণ ও স্বল্পস্টক",
    cta: "সতর্কতা দেখুন",
    ctaColor: "text-error",
    href: "#",
  },
];

// ─── Demo DGDA Notices ────────────────────────────────────────────────────
// ⚠️ SAMPLE/DEMO ONLY — These notices are NOT real, not sourced from DGDA,
// not current, and not verified. For demonstration purposes only.
// Real DGDA notices will be loaded from an official API in a future phase.

export interface DgdaNotice {
  id: string;
  type: NoticeType;
  typeBadge: string;
  typeBg: string;
  typeText: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  date: string;
  actionLabel: string;
  actionColor: string;
}

export const DEMO_DGDA_NOTICES: DgdaNotice[] = [
  {
    id: "n1",
    type: "warning",
    typeBadge: "নমুনা সতর্কতা",
    typeBg: "bg-error-container",
    typeText: "text-on-error-container",
    icon: "gpp_bad",
    iconColor: "text-error",
    title: "নমুনা: ওষুধ প্রত্যাহার বিজ্ঞপ্তি [DEMO]",
    description:
      "⚠️ এটি একটি ডেমো নোটিশ। একটি কাল্পনিক ব্যাচ (ABC-2024-01) উৎপাদন মানের কারণে প্রত্যাহারের নমুনা দেখানো হচ্ছে।",
    date: "নমুনা তারিখ",
    actionLabel: "বিস্তারিত (Demo)",
    actionColor: "text-error",
  },
  {
    id: "n2",
    type: "approval",
    typeBadge: "নমুনা অনুমোদন",
    typeBg: "bg-primary-fixed",
    typeText: "text-on-primary-fixed-variant",
    icon: "verified",
    iconColor: "text-primary",
    title: "নমুনা: নতুন ঔষধ নিবন্ধন [DEMO]",
    description:
      "✅ এটি একটি ডেমো এন্ট্রি। একটি কাল্পনিক জেনেরিক ওষুধের নিবন্ধন অনুমোদনের UI নমুনা।",
    date: "নমুনা তারিখ",
    actionLabel: "বিস্তারিত (Demo)",
    actionColor: "text-primary",
  },
  {
    id: "n3",
    type: "update",
    typeBadge: "নমুনা আপডেট",
    typeBg: "bg-secondary-fixed",
    typeText: "text-on-secondary-fixed-variant",
    icon: "update",
    iconColor: "text-secondary",
    title: "নমুনা: মূল্য পরিবর্তন বিজ্ঞপ্তি [DEMO]",
    description:
      "ℹ️ এটি একটি ডেমো এন্ট্রি। কাল্পনিক ওষুধের MRP পরিবর্তনের UI নমুনা। বাস্তব তথ্য ভবিষ্যতে সংযুক্ত হবে।",
    date: "নমুনা তারিখ",
    actionLabel: "বিস্তারিত (Demo)",
    actionColor: "text-secondary",
  },
];

// ─── Demo Recent Activity ─────────────────────────────────────────────────
// ⚠️ Fictional demo activity log — not real user actions.

export interface ActivityItem {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  detail: string;
  time: string;
  dotColor: string;
}

export const DEMO_ACTIVITIES: ActivityItem[] = [
  {
    id: "a1",
    icon: "share",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-on-tertiary-fixed-variant",
    title: "WhatsApp শেয়ার",
    detail: "Napa Extra 500mg — রোগী মোবাইলে পাঠানো হয়েছে",
    time: "৫ মিনিট আগে",
    dotColor: "bg-tertiary",
  },
  {
    id: "a2",
    icon: "search",
    iconBg: "bg-primary-fixed",
    iconColor: "text-on-primary-fixed-variant",
    title: "ঔষধ অনুসন্ধান",
    detail: "Seclo 20mg Capsule — স্টক চেক করা হয়েছে",
    time: "১২ মিনিট আগে",
    dotColor: "bg-primary",
  },
  {
    id: "a3",
    icon: "add_circle",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed-variant",
    title: "নতুন ঔষধ যোগ",
    detail: "Monas 10mg ডেটাবেজে আপডেট করা হয়েছে",
    time: "১ ঘণ্টা আগে",
    dotColor: "bg-secondary",
  },
  {
    id: "a4",
    icon: "inventory_2",
    iconBg: "bg-amber-tint",
    iconColor: "text-warning",
    title: "স্টক সতর্কতা",
    detail: "Ciprocin 500mg — স্টক কম হওয়ার বিজ্ঞপ্তি",
    time: "২ ঘণ্টা আগে",
    dotColor: "bg-warning",
  },
];

// ─── PWA Demo Status ──────────────────────────────────────────────────────

export const PWA_DEMO_STATUS = {
  cacheSize: "4.8 MB (IndexedDB)",
  syncStatus: "সফলভাবে সম্পন্ন",
  lastSync: "আজ, সকাল ৯:১৫",
  features: [
    "অফলাইনে লাইভ সার্চ কাজ করে",
    "হোমস্ক্রিনে ইনস্টল ফার্মাসিউটিক্যাল",
    "ব্যাকগ্রাউন্ড সার্ভিসওয়ার্কার আপডেট",
    "পুশ নোটিফিকেশন ও অ্যালার্ট সাপোর্ট",
  ],
};

// ─── Phase 3: Demo Medicine Database Registry ─────────────────────────────
// ⚠️ MOCK / DEMO DATA ONLY — Fictional records preserved from Stitch design.
// Not real, verified, or live information.

export const DEMO_DATABASE_MEDICINES: DatabaseMedicine[] = [
  {
    id: "napa-extra",
    tradeName: "Napa Extra",
    genericName: "Paracetamol 500mg + Caffeine 65mg",
    manufacturer: "Beximco Pharma",
    dosageBadge: "ট্যাবলেট",
    isRx: false,
    packSize: "১০x১০'স স্ট্রিপ (১০০ ট্যাবলেট)",
    unitPrice: 2.5,
    unitPriceFormatted: "৳২.৫০",
    unitPriceUnit: "/ট্যাবলেট",
    boxPriceFormatted: "৳২৫০.০০/বক্স",
    discountPct: 4,
    discountFormatted: "৪% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ১২০ বক্স)",
    lastUpdated: "আজ, ১০:১৫ AM",
    updatedTimestamp: 1716200000000,
    genericGroup: "paracetamol",
    dosageForm: "tablet",
    manufacturerKey: "beximco",
  },
  {
    id: "seclo-20",
    tradeName: "Seclo 20",
    genericName: "Omeprazole 20mg",
    manufacturer: "Square Pharmaceuticals",
    dosageBadge: "ক্যাপসুল",
    isRx: false,
    packSize: "৬x১০'স স্ট্রিপ (৬০ ক্যাপসুল)",
    unitPrice: 5.0,
    unitPriceFormatted: "৳৫.০০",
    unitPriceUnit: "/ক্যাপসুল",
    boxPriceFormatted: "৳৩০০.০০/বক্স",
    discountPct: 5,
    discountFormatted: "৫% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৮৫ বক্স)",
    lastUpdated: "গতকাল, ৪:৩০ PM",
    updatedTimestamp: 1716100000000,
    genericGroup: "omeprazole",
    dosageForm: "capsule",
    manufacturerKey: "square",
  },
  {
    id: "monas-10",
    tradeName: "Monas 10",
    genericName: "Montelukast 10mg",
    manufacturer: "Acme Laboratories",
    dosageBadge: "চিউয়েবল",
    isRx: false,
    packSize: "৩x১০'স ব্লিস্টার প্যাক",
    unitPrice: 16.0,
    unitPriceFormatted: "৳১৬.০০",
    unitPriceUnit: "/ট্যাবলেট",
    boxPriceFormatted: "৳৪৮০.০০/বক্স",
    discountPct: 2,
    discountFormatted: "২% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৪৫ বক্স)",
    lastUpdated: "২ দিন আগে",
    updatedTimestamp: 1716000000000,
    genericGroup: "montelukast",
    dosageForm: "tablet",
    manufacturerKey: "acme",
  },
  {
    id: "maxpro-20",
    tradeName: "Maxpro 20",
    genericName: "Esomeprazole Magnesium Trihydrate 20mg",
    manufacturer: "Renata Limited",
    dosageBadge: "ট্যাবলেট",
    isRx: false,
    packSize: "১০x১০'স স্ট্রিপ (১০০ ট্যাবলেট)",
    unitPrice: 7.0,
    unitPriceFormatted: "৳৭.০০",
    unitPriceUnit: "/ট্যাবলেট",
    boxPriceFormatted: "৳৭০০.০০/বক্স",
    discountPct: 5,
    discountFormatted: "৫% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৯৫ বক্স)",
    lastUpdated: "৩ দিন আগে",
    updatedTimestamp: 1715900000000,
    genericGroup: "esomeprazole",
    dosageForm: "tablet",
    manufacturerKey: "renata",
  },
  {
    id: "azithrocin-500",
    tradeName: "Azithrocin 500",
    genericName: "Azithromycin 500mg",
    manufacturer: "Beximco Pharma",
    dosageBadge: "Rx Only",
    isRx: true,
    packSize: "৩x৪'স স্ট্রিপ (১২ ট্যাবলেট)",
    unitPrice: 35.0,
    unitPriceFormatted: "৳৩৫.০০",
    unitPriceUnit: "/ট্যাবলেট",
    boxPriceFormatted: "৳৪২০.০০/বক্স",
    discountPct: 3,
    discountFormatted: "৩% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৩০ বক্স)",
    lastUpdated: "৪ দিন আগে",
    updatedTimestamp: 1715800000000,
    genericGroup: "azithromycin",
    dosageForm: "tablet",
    manufacturerKey: "beximco",
  },
  {
    id: "fenadin-120",
    tradeName: "Fenadin 120",
    genericName: "Fexofenadine Hydrochloride 120mg",
    manufacturer: "Square Pharmaceuticals",
    dosageBadge: "ট্যাবলেট",
    isRx: false,
    packSize: "৫x১০'স অ্যালু স্ট্রিপ",
    unitPrice: 9.0,
    unitPriceFormatted: "৳৯.০০",
    unitPriceUnit: "/ট্যাবলেট",
    boxPriceFormatted: "৳৪৫০.০০/বক্স",
    discountPct: 5,
    discountFormatted: "৫% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৭০ বক্স)",
    lastUpdated: "১ সপ্তাহ আগে",
    updatedTimestamp: 1715700000000,
    genericGroup: "fexofenadine",
    dosageForm: "tablet",
    manufacturerKey: "square",
  },
  {
    id: "comet-500",
    tradeName: "Comet 500",
    genericName: "Metformin Hydrochloride 500mg",
    manufacturer: "Square Pharmaceuticals",
    dosageBadge: "ট্যাবলেট",
    isRx: false,
    packSize: "১০x১০'স স্ট্রিপ (১০০ ট্যাবলেট)",
    unitPrice: 4.5,
    unitPriceFormatted: "৳৪.৫০",
    unitPriceUnit: "/ট্যাবলেট",
    boxPriceFormatted: "৳৪৫০.০০/বক্স",
    discountPct: 4,
    discountFormatted: "৪% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৮০ বক্স)",
    lastUpdated: "৫ দিন আগে",
    updatedTimestamp: 1715750000000,
    genericGroup: "metformin",
    dosageForm: "tablet",
    manufacturerKey: "square",
  },
  {
    id: "t-day-syrup",
    tradeName: "T-Day Syrup",
    genericName: "Levocetirizine Dihydrochloride 2.5mg/5ml",
    manufacturer: "Square Pharmaceuticals",
    dosageBadge: "সিরাপ",
    isRx: false,
    packSize: "৬০ মি.লি বোতল",
    unitPrice: 55.0,
    unitPriceFormatted: "৳৫৫.০০",
    unitPriceUnit: "/বোতল",
    boxPriceFormatted: "৳৫৫.০০/বোতল",
    discountPct: 5,
    discountFormatted: "৫% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৫০ বোতল)",
    lastUpdated: "আজ, ১১:০০ AM",
    updatedTimestamp: 1716205000000,
    genericGroup: "levocetirizine",
    dosageForm: "syrup",
    manufacturerKey: "square",
  },
  {
    id: "ceftron-1g",
    tradeName: "Ceftron 1g IM/IV",
    genericName: "Ceftriaxone Sodium 1g",
    manufacturer: "Square Pharmaceuticals",
    dosageBadge: "ইনজেকশন",
    isRx: true,
    packSize: "১ ভায়াল কম্বিপ্যাক",
    unitPrice: 190.0,
    unitPriceFormatted: "৳১৯০.০০",
    unitPriceUnit: "/ভায়াল",
    boxPriceFormatted: "৳১৯০.০০/ভায়াল",
    discountPct: 2,
    discountFormatted: "২% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ২৫ ভায়াল)",
    lastUpdated: "গতকাল, ১২:১৫ PM",
    updatedTimestamp: 1716120000000,
    genericGroup: "ceftriaxone",
    dosageForm: "injection",
    manufacturerKey: "square",
  },
  {
    id: "optal-eye-drop",
    tradeName: "Optal Eye Drop",
    genericName: "Olopatadine Hydrochloride 0.1%",
    manufacturer: "Incepta Pharma",
    dosageBadge: "আই ড্রপ",
    isRx: false,
    packSize: "৫ মি.লি ড্রপার বোতল",
    unitPrice: 110.0,
    unitPriceFormatted: "৳১১০.০০",
    unitPriceUnit: "/বোতল",
    boxPriceFormatted: "৳১১০.০০/বোতল",
    discountPct: 3,
    discountFormatted: "৩% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৪০ বোতল)",
    lastUpdated: "৩ দিন আগে",
    updatedTimestamp: 1715910000000,
    genericGroup: "olopatadine",
    dosageForm: "eye-drop",
    manufacturerKey: "incepta",
  },
  {
    id: "neosprin-ointment",
    tradeName: "Neosprin Ointment",
    genericName: "Neomycin + Bacitracin + Polymyxin B",
    manufacturer: "Opsonin Pharma",
    dosageBadge: "মলম",
    isRx: false,
    packSize: "১০ গ্রাম টিউব",
    unitPrice: 45.0,
    unitPriceFormatted: "৳৪৫.০০",
    unitPriceUnit: "/টিউব",
    boxPriceFormatted: "৳৪৫.০০/টিউব",
    discountPct: 5,
    discountFormatted: "৫% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৬০ টিউব)",
    lastUpdated: "৪ দিন আগে",
    updatedTimestamp: 1715820000000,
    genericGroup: "neomycin",
    dosageForm: "ointment",
    manufacturerKey: "opsonin",
  },
  {
    id: "sergel-20",
    tradeName: "Sergel 20",
    genericName: "Esomeprazole Magnesium 20mg",
    manufacturer: "Eskayef (SK+F)",
    dosageBadge: "ক্যাপসুল",
    isRx: false,
    packSize: "৭x১৪'স স্ট্রিপ (৯৮ ক্যাপসুল)",
    unitPrice: 7.0,
    unitPriceFormatted: "৳৭.০০",
    unitPriceUnit: "/ক্যাপসুল",
    boxPriceFormatted: "৳৬৮৬.০০/বক্স",
    discountPct: 6,
    discountFormatted: "৬% ছাড়",
    stockStatus: "স্টক পর্যাপ্ত (ইনভেন্টরি: ৫০ বক্স)",
    lastUpdated: "১ দিন আগে",
    updatedTimestamp: 1716150000000,
    genericGroup: "esomeprazole",
    dosageForm: "capsule",
    manufacturerKey: "eskayef",
  },
];

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

export const MANUFACTURER_FILTER_OPTIONS: FilterSelectOption[] = [
  { value: "all", label: "সকল প্রস্তুতকারক (All)" },
  { value: "square", label: "Square Pharmaceuticals" },
  { value: "beximco", label: "Beximco Pharma" },
  { value: "incepta", label: "Incepta Pharma" },
  { value: "renata", label: "Renata Limited" },
  { value: "opsonin", label: "Opsonin Pharma" },
  { value: "eskayef", label: "Eskayef (SK+F)" },
  { value: "acme", label: "Acme Laboratories" },
];

export const SORT_OPTIONS: FilterSelectOption[] = [
  { value: "updated", label: "সম্প্রতি হালনাগাদ (Recently Updated)" },
  { value: "alpha", label: "নাম অনুসারে (A-Z)" },
  { value: "price-low", label: "মূল্য: কম থেকে বেশি (Low to High)" },
  { value: "price-high", label: "মূল্য: বেশি থেকে কম (High to Low)" },
  { value: "discount", label: "সর্বাধিক ডিসকাউন্ট (Max Discount)" },
];

export const POPULAR_SEARCH_TERMS = [
  "Napa Extra",
  "Seclo 20",
  "Paracetamol",
  "Azithromycin",
  "Square Pharmaceuticals",
];

// ─── Phase 4: Clinical Monograph Mock Data ────────────────────────────────
// ⚠️ DEMO / MOCK DATA ONLY — Fictional records preserved from Stitch design.
// Not real, verified medical advice or official clinical recommendations.

export function getMedicineMonograph(id: string): MedicineMonograph | null {
  const med = DEMO_DATABASE_MEDICINES.find(
    (m) => m.id.toLowerCase() === id.toLowerCase()
  );

  if (!med) return null;

  // Specific high-fidelity monograph for Napa Extra (Source of Truth)
  if (med.id === "napa-extra") {
    return {
      ...med,
      tradeNameBn: "নাপা এক্সট্রা",
      darNumber: "023-345-081",
      plantLocation: "টঙ্গী, গাজীপুর",
      therapeuticClass: "ব্যথানাশক ও জ্বর নিবারক",
      therapeuticClassEn: "Analgesic & Antipyretic",
      packFormatDetails: "১০ × ১০ ট্যাবলেট বক্স",
      packFormatDetailsEn: "Blister Pack (100 Tablets)",
      photoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB2nnk_VysSB2ZfrI-v6uFpJ1lIzquhwnGA7tLViMWAmuG_Bprk4FlWpSLr51l8JCgC92q6AeOd3F7mQnMUvjCzS-uvN9__G2JwQtS20do1CklQvKGyOmnC3j-ekvR0LEk7xlGs11_GiRldS0ztUlP9owgkMm-yZyh9JIhCcb-arifeLHZ0RRwdL6TqBJ_vuZsvuQbzqbhjftUQ3Do8dqZe5e_XZFeFFybpjPxwwnCbUVsln9EJIYIkWw",
      batchNumber: "BX-2409A",
      stripPriceFormatted: "৳২৫.০০",
      tradeMargin: "১২.৫%",
      tradePriceFormatted: "৳২.১৮ / পিস",
      safetyRating: {
        label: "কিডনি ও গ্যাস্ট্রিক সেফটি",
        score: 82,
        scoreLabel: "উচ্চ সহনশীল",
      },
      clinicalGuide: {
        indications: {
          overview:
            "নাপা এক্সট্রা (প্যারাসিটামল ৫০০ মি.গ্রা. + ক্যাফেইন ৬৫ মি.গ্রা.) মূলত মৃদু থেকে মাঝারি ধরনের তীব্র ব্যথানাশক এবং শরীরের তাপমাত্রা কমানোর জন্য নির্দেশিত। ক্যাফেইন প্যারাসিটামলের ব্যথানাশক ক্ষমতাকে প্রায় ৩৫-৪০% বৃদ্ধি করে।",
          items: [
            "তীব্র মাথাব্যথা ও মাইগ্রেন ব্যথা",
            "দাঁতের ব্যথা ও মাড়ির প্রদাহ",
            "ইনফ্লুয়েঞ্জা ও ভাইরাল জ্বরজনিত শরীরের ব্যথা",
            "মাসিকজনিত তীব্র পেটে ব্যথা (ডাইসমেনোরিয়া)",
            "পেশীর টান ও বাতজনিত অস্থিসন্ধির ব্যথা",
          ],
          benefitHeading: "ক্লিনিক্যাল কার্যকারিতা বিশ্লেষণ:",
          benefits: [
            "প্যারাসিটামল প্রোস্টাগ্ল্যান্ডিন সংশ্লেষণ প্রতিরোধ করে কেন্দ্রীয় স্নায়ুতন্ত্রের পেইন রিসেপ্টর ব্লক করে।",
            "ক্যাফেইন সেরিব্রাল ভাস্কুলার সংকোচন ঘটিয়ে মাইগ্রেন প্রশমনে দ্রুত অনুঘটক হিসেবে কাজ করে।",
            "খাওয়ার ১৫-৩০ মিনিটের মধ্যেই রক্তে সক্রিয় মাত্রা অর্জিত হয়।",
          ],
        },
        dosage: {
          adult:
            "১-২টি ট্যাবলেট প্রতি ৪-৬ ঘণ্টা পরপর (প্রয়োজন অনুযায়ী)। ২৪ ঘণ্টায় সর্বাধিক ৮টি ট্যাবলেট (৪০০০ মি.গ্রা. প্যারাসিটামল) গ্রহণ করা যাবে না।",
          pediatric:
            "১২ বছরের কম বয়সী শিশুদের জন্য নির্দেশিত নয় (ক্যাফেইন উপস্থিতির কারণে চিকিৎসকের বিশেষ পরামর্শ ব্যতীত)।",
          maxLimit:
            "একক মাত্রায় ২টি এবং দৈনিক সর্বাধিক ৪ গ্রাম প্যারাসিটামল অতিক্রম করা যাবে না।",
          instructions:
            "পর্যাপ্ত পরিমাণ পানিসহ মুখে সেব্য। খালি পেটে বা খাবারের পর গ্রহণ করা যায়।",
        },
        sideEffects: {
          common: [
            "অতিরিক্ত সেবনে বুক ধড়ফড় করা (ক্যাফেইনের কারণে)",
            "ঘুমের ব্যাঘাত বা অনিদ্রা (রাতে সেবনে)",
            "মৃদু গ্যাস্ট্রিক অস্বস্তি বা বুকজ্বালা",
          ],
          severe: [
            "লিভারের এনজাইম বৃদ্ধি ও হেপাটোটক্সিসিটি (অতিরিক্ত মাত্রায়)",
            "অ্যালার্জিক প্রতিক্রিয়া (চুলকানি, র‍্যাশ বা ত্বকে লালচে দাগ)",
          ],
          warningNote:
            "দীর্ঘদিন উচ্চমাত্রায় গ্রহণ করলে লিভার ও কিডনি জটিলতার ঝুঁকি থাকে। অ্যালকোহল সেবীদের ক্ষেত্রে অতিরিক্ত সতর্কতা অবলম্বন করা প্রয়োজন।",
        },
        pregnancy: {
          fdaCategory: "B",
          advisoryBadge: "সতর্কতামূলক সেবনযোগ্য",
          description:
            "প্যারাসিটামল গর্ভাবস্থায় তুলনামূলকভাবে নিরাপদ হিসেবে বিবেচিত হলেও, ক্যাফেইনের উচ্চ মাত্রা গর্ভস্থ ভ্রূণের ওজন কমার ঝুঁকি বাড়াতে পারে। গর্ভাবস্থায় চিকিৎসকের সুস্পষ্ট লিখিত প্রেসক্রিপশন ছাড়া দীর্ঘদিন ধরে Napa Extra গ্রহণ করা অনুচিত। স্তন্যদানকারী মায়েদের ক্ষেত্রে ক্যাফেইন মাতৃদুগ্ধে প্রবেশ করতে পারে, যার ফলে নবজাতকের ঘুমে ব্যাঘাত ঘটতে পারে।",
        },
        interactions: {
          overview:
            "অন্যান্য ওষুধের সাথে একযোগে ব্যবহারের পূর্বে নিম্নলিখিত মিথস্ক্রিয়াগুলো পর্যালোচনা করুন:",
          items: [
            {
              drug: "ওয়ারফারিন (Warfarin)",
              effect:
                "দীর্ঘদিন Napa Extra সেবনে রক্ত জমাট বাঁধার সূচকে পরিবর্তন এসে রক্তক্ষরণের ঝুঁকি বাড়তে পারে।",
            },
            {
              drug: "কোলস্টাইরামিন (Cholestyramine)",
              effect: "প্যারাসিটামলের শোষণ মাত্রা উল্লেখযোগ্যভাবে কমিয়ে দেয়।",
            },
            {
              drug: "মেটোক্লোপ্রামাইড (Metoclopramide)",
              effect: "প্যারাসিটামল রক্তে দ্রুত শোষণ হতে সহায়তা করে।",
            },
          ],
        },
      },
      alternatives: [
        { name: "Fast Plus", manufacturer: "Square Pharmaceuticals", price: "৳২.৫০" },
        { name: "Ace Plus", manufacturer: "Square Pharmaceuticals", price: "৳২.৫০" },
        { name: "Renova Extra", manufacturer: "Opsonin Pharma", price: "৳২.২৫" },
        { name: "Pyrex Plus", manufacturer: "Incepta Pharmaceuticals", price: "৳২.৫০" },
      ],
    };
  }

  // Seclo 20 (Omeprazole)
  if (med.id === "seclo-20") {
    return {
      ...med,
      tradeNameBn: "সেকলো ২০",
      darNumber: "023-112-045",
      plantLocation: "কালিয়াকৈর, গাজীপুর",
      therapeuticClass: "প্রোটন পাম্প ইনহিবিটর (PPI)",
      therapeuticClassEn: "Proton Pump Inhibitor (Antacid)",
      packFormatDetails: "৬ × ১০ ক্যাপসুল স্ট্রিপ",
      packFormatDetailsEn: "Alu-Alu Blister (60 Capsules)",
      photoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB2nnk_VysSB2ZfrI-v6uFpJ1lIzquhwnGA7tLViMWAmuG_Bprk4FlWpSLr51l8JCgC92q6AeOd3F7mQnMUvjCzS-uvN9__G2JwQtS20do1CklQvKGyOmnC3j-ekvR0LEk7xlGs11_GiRldS0ztUlP9owgkMm-yZyh9JIhCcb-arifeLHZ0RRwdL6TqBJ_vuZsvuQbzqbhjftUQ3Do8dqZe5e_XZFeFFybpjPxwwnCbUVsln9EJIYIkWw",
      batchNumber: "SQ-9902C",
      stripPriceFormatted: "৳৫০.০০",
      tradeMargin: "১২.৫%",
      tradePriceFormatted: "৳৪.৩৮ / পিস",
      safetyRating: {
        label: "লিভার ও কার্ডিয়াক সেফটি",
        score: 88,
        scoreLabel: "উচ্চ নিরাপদ",
      },
      clinicalGuide: {
        indications: {
          overview:
            "সেকলো ২০ (ওমিপ্রাজল ২০ মি.গ্রা.) পাকস্থলীর এসিড উৎপাদন কমিয়ে গ্যাস্ট্রিক আলসার, ডিওডেনাল আলসার এবং জিইআরডি (GERD) নিরাময়ে কাজ করে।",
          items: [
            "গ্যাস্ট্রোইসোফেজিয়াল রিফ্লাক্স ডিজিজ (GERD)",
            "পেপটিক ও ডিওডেনাল আলসার",
            "অতিরিক্ত এসিডিটি ও বুকজ্বালা",
            "এনএসএআইডি (ব্যথানাশক) জনিত আলসার প্রতিরোধ",
            "জলিঙ্গার-এলিসন সিনড্রোম",
          ],
          benefitHeading: "ক্লিনিক্যাল কার্যকারিতা বিশ্লেষণ:",
          benefits: [
            "পাকস্থলীর প্যারাইটাল কোষের H+/K+ ATPase এনজাইম ব্লক করে এসিড নিঃসরণ বন্ধ করে।",
            "২৪ ঘণ্টা পর্যন্ত একটানা এসিড নিয়ন্ত্রণে কার্যকর।",
            "খাবার গ্রহণের ৩০ মিনিট পূর্বে সেবনে সর্বোচ্চ কার্যকারিতা পাওয়া যায়।",
          ],
        },
        dosage: {
          adult: "প্রতিদিন সকালে ১টি ক্যাপসুল (২০ মি.গ্রা.) খাবারের ৩০ মিনিট পূর্বে।",
          pediatric: "চিকিৎসকের পরামর্শ ব্যতিরেকে শিশুদের ক্ষেত্রে প্রযোজ্য নয়।",
          maxLimit: "দিনে সর্বোচ্চ ৪০ মি.গ্রা. (প্রয়োজনে চিকিৎসকের নির্দেশ অনুযায়ী)।",
          instructions: "ক্যাপসুলটি চিবানো বা গুঁড়ো করা যাবে না, এক গ্লাস পানিসহ গিলে খেতে হবে।",
        },
        sideEffects: {
          common: ["মাথাব্যথা", "পেট ফাঁপা বা ডায়রিয়া", "কোষ্ঠকাঠিন্য"],
          severe: ["দীর্ঘমেয়াদে ভিটামিন বি১২ এবং ম্যাগনেসিয়াম ঘাটতি", "অস্টিওপোরোসিস ঝুঁকি"],
          warningNote: "দীর্ঘদিন একটানা পিপিআই সেবনের পূর্বে চিকিৎসকের পরামর্শ গ্রহণ করুন।",
        },
        pregnancy: {
          fdaCategory: "C",
          advisoryBadge: "ডাক্তারের পরামর্শে সেব্য",
          description: "গর্ভাবস্থায় সুস্পষ্ট প্রয়োজন ব্যতীত ওমিপ্রাজল সেবন অনুচিত।",
        },
        interactions: {
          overview: "নিম্নলিখিত ওষুধগুলোর সাথে মিথস্ক্রিয়া লক্ষ্য করা যায়:",
          items: [
            { drug: "ক্লোপিডোগ্রেল (Clopidogrel)", effect: "ক্লোপিডোগ্রেলের রক্ত তরলকারী কার্যকারিতা কমিয়ে দিতে পারে।" },
            { drug: "ডায়াজিপাম (Diazepam)", effect: "ডায়াজিপামের নির্গমন ধীর করে রক্তে মাত্রা বৃদ্ধি করতে পারে।" },
            { drug: "কেটোকোনাজল (Ketoconazole)", effect: "এসিড হ্রাসের কারণে কেটোকোনাজলের শোষণ কমে যায়।" },
          ],
        },
      },
      alternatives: [
        { name: "Ome-20", manufacturer: "Beximco Pharma", price: "৳৫.০০" },
        { name: "Losectil 20", manufacturer: "Eskayef (SK+F)", price: "৳৫.০০" },
        { name: "Gsec 20", manufacturer: "Incepta Pharma", price: "৳৫.০০" },
        { name: "Proceptin 20", manufacturer: "Renata Limited", price: "৳৫.০০" },
      ],
    };
  }

  // Generic fallback monograph for any other medicine
  return {
    ...med,
    tradeNameBn: med.tradeName,
    darNumber: "023-887-190",
    plantLocation: "ঢাকা, বাংলাদেশ",
    therapeuticClass: "ফার্মাসিউটিক্যাল ফর্মুলেশন",
    therapeuticClassEn: "Pharmaceutical Formulation",
    packFormatDetails: med.packSize,
    packFormatDetailsEn: med.packSize,
    photoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2nnk_VysSB2ZfrI-v6uFpJ1lIzquhwnGA7tLViMWAmuG_Bprk4FlWpSLr51l8JCgC92q6AeOd3F7mQnMUvjCzS-uvN9__G2JwQtS20do1CklQvKGyOmnC3j-ekvR0LEk7xlGs11_GiRldS0ztUlP9owgkMm-yZyh9JIhCcb-arifeLHZ0RRwdL6TqBJ_vuZsvuQbzqbhjftUQ3Do8dqZe5e_XZFeFFybpjPxwwnCbUVsln9EJIYIkWw",
    batchNumber: "BX-DEMO-01",
    stripPriceFormatted: `৳${(med.unitPrice * 10).toFixed(2)}`,
    tradeMargin: "১২.৫%",
    tradePriceFormatted: `৳${(med.unitPrice * 0.875).toFixed(2)} / পিস`,
    safetyRating: {
      label: "সাধারণ সহনশীলতা",
      score: 85,
      scoreLabel: "নিরাপদ",
    },
    clinicalGuide: {
      indications: {
        overview: `${med.tradeName} (${med.genericName}) চিকিৎসকের পরামর্শ অনুযায়ী নির্দিষ্ট থেরাপিউটিক নির্দেশনায় সেব্য।`,
        items: [
          "চিকিৎসকের প্রেসক্রিপশন অনুযায়ী অনুমোদিত রোগ নিরাময়ে",
          "উপসর্গ অনুযায়ী নির্দিষ্ট মাত্রায় সেবনযোগ্য",
          "ল্যাবরেটরি টেস্ট ও ডায়াগনসিসের পর নির্ধারিত মেয়াদে",
        ],
        benefitHeading: "ক্লিনিক্যাল কার্যকারিতা:",
        benefits: [
          "বাংলাদেশ জাতীয় ফর্মুলারি ও ডিজিডিএ গাইডলাইন অনুযায়ী মাননিয়ন্ত্রিত।",
          "নির্দিষ্ট থেরাপিউটিক লক্ষ্যে সক্রিয় উপাদানের সঠিক শোষণ নিশ্চিত করে।",
        ],
      },
      dosage: {
        adult: "চিকিৎসকের সুনির্দিষ্ট প্রেসক্রিপশন ও নির্দেশনা অনুযায়ী সেব্য।",
        pediatric: "শিশুদের ক্ষেত্রে বয়স ও ওজন অনুযায়ী পেডিয়াট্রিশিয়ানের পরামর্শ আবশ্যক।",
        maxLimit: "নির্দেশিত দৈনিক সর্বোচ্চ মাত্রা কোনো অবস্থাতেই অতিক্রম করবেন না।",
        instructions: "পর্যাপ্ত পরিমাণ পানিসহ সেবন করুন। ডোজ মিস হলে দ্রুত গ্রহণ করুন।",
      },
      sideEffects: {
        common: ["মৃদু বমিভাব", "মাথাব্যথা", "পেটে অস্বস্তি"],
        severe: ["মারাত্মক অ্যালার্জিক প্রতিক্রিয়া", "শ্বাসকষ্ট বা ফুসকুড়ি"],
        warningNote: "কোনো অপ্রত্যাশিত পার্শ্বপ্রতিক্রিয়া দেখা দিলে দ্রুত চিকিৎসকের সাথে যোগাযোগ করুন।",
      },
      pregnancy: {
        fdaCategory: med.isRx ? "C" : "B",
        advisoryBadge: "সতর্কতামূলক সেবনযোগ্য",
        description: "গর্ভাবস্থায় ও স্তন্যদানকালে চিকিৎসকের সুস্পষ্ট পরামর্শ ছাড়া সেবন অনুচিত।",
      },
      interactions: {
        overview: "অন্য কোনো নিয়মিত ওষুধ সেবনরত থাকলে চিকিৎসকের সাথে পরামর্শ করুন:",
        items: [
          { drug: "অ্যান্টাসিড (Antacids)", effect: "কিছু ওষুধের শোষণ মাত্রা হ্রাস করতে পারে।" },
          { drug: "অ্যালকোহল (Alcohol)", effect: "পার্শ্বপ্রতিক্রিয়ার ঝুঁকি বাড়াতে পারে।" },
        ],
      },
    },
    alternatives: [
      { name: "বিকল্প ব্র্যান্ড ১", manufacturer: "Square Pharmaceuticals", price: med.unitPriceFormatted },
      { name: "বিকল্প ব্র্যান্ড ২", manufacturer: "Beximco Pharma", price: med.unitPriceFormatted },
      { name: "বিকল্প ব্র্যান্ড ৩", manufacturer: "Incepta Pharma", price: med.unitPriceFormatted },
      { name: "বিকল্প ব্র্যান্ড ৪", manufacturer: "Renata Limited", price: med.unitPriceFormatted },
    ],
  };
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

export const DEMO_ADMIN_MEDICINES: AdminMedicineItem[] = [
  {
    id: "adm-1",
    tradeName: "Napa Extra",
    strength: "500mg + 65mg",
    dosageForm: "Tablet",
    genericName: "Paracetamol + Caffeine",
    manufacturer: "Beximco Pharma",
    mrp: 2.50,
    mrpFormatted: "৳ ২.৫০",
    discountPct: 4,
    status: "live",
    iconType: "pill",
    slugId: "napa-extra",
    notes: "জনপ্রিয় ব্যথানাশক ওষুধ। দিনে সর্বোচ্চ ৮টি ট্যাবলেট সেব্য।",
    updatedAt: "আজ, ১০:১৫ AM",
  },
  {
    id: "adm-2",
    tradeName: "Seclo 20mg Cap",
    strength: "20mg",
    dosageForm: "Capsule",
    genericName: "Omeprazole 20mg",
    manufacturer: "Square Pharma",
    mrp: 5.00,
    mrpFormatted: "৳ ৫.০০",
    discountPct: 5,
    status: "live",
    iconType: "liquid",
    slugId: "seclo-20",
    notes: "গ্যাস্ট্রিক ও এসিডিটি নিরাময়ে কার্যকরী। সকালে খালি পেটে সেব্য।",
    updatedAt: "আজ, ০৯:৪০ AM",
  },
  {
    id: "adm-3",
    tradeName: "Ciprocin 500mg Tab",
    strength: "500mg",
    dosageForm: "Tablet",
    genericName: "Ciprofloxacin",
    manufacturer: "Square Pharma",
    mrp: 15.00,
    mrpFormatted: "৳ ১৫.০০",
    discountPct: 3,
    status: "live",
    iconType: "pill",
    slugId: "ciprocin-500",
    notes: "ব্রড-স্পেকট্রাম অ্যান্টিবায়োটিক। পূর্ণ কোর্স সম্পন্ন করা আবশ্যক।",
    updatedAt: "গতকাল, ০৪:২০ PM",
  },
  {
    id: "adm-4",
    tradeName: "Azithrocin 500mg",
    strength: "500mg",
    dosageForm: "Tablet",
    genericName: "Azithromycin",
    manufacturer: "Incepta Pharma",
    mrp: 35.00,
    mrpFormatted: "৳ ৩৫.০০",
    discountPct: 0,
    status: "pending",
    iconType: "pill",
    slugId: "azithrocin-500",
    notes: "নতুন জেনেরিক অমিল পাওয়া গিয়েছে, ডিজিডিএ ক্লিয়ারেন্সের অপেক্ষায়।",
    updatedAt: "১ ঘণ্টা আগে",
  },
  {
    id: "adm-5",
    tradeName: "Monas 10mg Tab",
    strength: "10mg",
    dosageForm: "Tablet",
    genericName: "Montelukast Sodium",
    manufacturer: "Acme Laboratories",
    mrp: 16.00,
    mrpFormatted: "৳ ১৬.০০",
    discountPct: 6,
    status: "live",
    iconType: "pill",
    slugId: "monas-10",
    notes: "শ্বাসকষ্ট ও অ্যালার্জিক রাইনাইটিসের জন্য রাতে ১টি ট্যাবলেট।",
    updatedAt: "গতকাল, ০২:১৫ PM",
  },
  {
    id: "adm-6",
    tradeName: "Fexo 120mg Tab",
    strength: "120mg",
    dosageForm: "Tablet",
    genericName: "Fexofenadine HCl",
    manufacturer: "Square Pharma",
    mrp: 9.00,
    mrpFormatted: "৳ ৯.০০",
    discountPct: 5,
    status: "live",
    iconType: "pill",
    slugId: "fexo-120",
    notes: "নন-সিডেটিভ অ্যান্টিহিস্টামিন। হাঁচি ও চুলকানি নিবারক।",
    updatedAt: "৩ দিন আগে",
  },
  {
    id: "adm-7",
    tradeName: "Maxpro 20mg Cap",
    strength: "20mg",
    dosageForm: "Capsule",
    genericName: "Esomeprazole Magnesium",
    manufacturer: "Renata Ltd",
    mrp: 7.00,
    mrpFormatted: "৳ ৭.০০",
    discountPct: 4,
    status: "live",
    iconType: "liquid",
    slugId: "maxpro-20",
    notes: "নেক্সিয়াম জেনেরিক প্রোটন পাম্প ইনহিবিটর।",
    updatedAt: "৪ দিন আগে",
  },
  {
    id: "adm-8",
    tradeName: "Renova 500mg Tab",
    strength: "500mg",
    dosageForm: "Tablet",
    genericName: "Paracetamol",
    manufacturer: "Renata Ltd",
    mrp: 1.20,
    mrpFormatted: "৳ ১.২০",
    discountPct: 2,
    status: "draft",
    iconType: "pill",
    slugId: "renova-500",
    notes: "খসড়া এন্ট্রি — নতুন প্যাকেজিং বারকোড সংযোজন বাকি।",
    updatedAt: "৫ দিন আগে",
  },
];

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
      drugName: "Napa Extra 500mg",
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
      drugName: "Seclo 20mg Cap",
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
      patientAlert: "আব্দুল করিম: আগামী ৫ তারিখে ইনসুলিন রিফিল",
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
      companyName: "Square Pharma (ডিপো ১)",
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
      interactionAlert: "Rx Alert: Ciprofloxacin + Antacid ইন্টারঅ্যাকশন সনাক্ত!",
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



