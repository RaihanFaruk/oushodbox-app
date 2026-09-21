/**
 * ঔষধBox — Global Type Definitions
 * These types will grow as features are implemented.
 */

// ---- Medicine -------------------------------------------------------

export type MedicineSchedule = "OTC" | "Schedule_H" | "Narcotic" | "Prescription";

export interface Medicine {
  id: string;
  tradeName: string;          // e.g. "Napa Extra"
  tradeNameBn?: string;       // Bengali trade name
  genericName: string;        // e.g. "Paracetamol + Caffeine"
  genericNameBn?: string;
  manufacturer: string;
  strength: string;           // e.g. "500mg + 65mg"
  dosageForm: string;         // e.g. "Tablet", "Syrup"
  packSize: string;           // e.g. "10×10 tabs"
  unitPrice: number;          // BDT
  darNumber?: string;         // DAR registration number
  schedule: MedicineSchedule;
  inStock: boolean;
  stockQuantity?: number;
  expiryDate?: string;        // ISO date string
  category?: string;
  activeIngredients?: string[];
  contraindications?: string[];
  sideEffects?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// ---- Database Medicine (Phase 3 Medicine Registry) -------------------

export interface DatabaseMedicine {
  id: string;                    // slug id for routing (e.g. 'napa-extra')
  tradeName: string;             // e.g. 'Napa Extra'
  genericName: string;           // e.g. 'Paracetamol 500mg + Caffeine 65mg'
  manufacturer: string;          // e.g. 'Beximco Pharma'
  dosageBadge: string;           // e.g. 'ট্যাবলেট', 'ক্যাপসুল', 'চিউয়েবল', 'Rx Only'
  isRx: boolean;                 // true if prescription only
  packSize: string;              // e.g. "১০x১০'স স্ট্রিপ (১০০ ট্যাবলেট)"
  unitPrice: number;             // numeric price for sorting
  unitPriceFormatted: string;    // e.g. '৳২.৫০'
  unitPriceUnit: string;         // e.g. '/ট্যাবলেট', '/ক্যাপসুল'
  boxPriceFormatted: string;     // e.g. '৳২৫০.০০/বক্স'
  discountPct: number;           // numeric discount for sorting
  discountFormatted: string;     // e.g. '৪% ছাড়'
  stockStatus: string;           // e.g. 'স্টক পর্যাপ্ত (ইনভেন্টরি: ১২০ বক্স)'
  lastUpdated: string;           // e.g. 'আজ, ১০:১৫ AM'
  updatedTimestamp: number;      // for sorting recently updated
  genericGroup: string;          // filter key: 'paracetamol', 'omeprazole', etc.
  dosageForm: string;            // filter key: 'tablet', 'capsule', etc.
  manufacturerKey: string;       // filter key: 'beximco', 'square', etc.
}

export interface PriceHistoryEntry {
  id: string;
  price: number;
  currency: string;
  changedAt: string;
  changedBy: string;
  note?: string;
}

export interface MedicinePrivateData {
  purchasePrice?: number;
  margin?: number;
  supplierNote?: string;
  costPrice?: number;
  supplierName?: string;
  internalNote?: string;
  updatedAt?: string;
}

export type MedicineViewMode = "grid" | "table";
export type MedicineSimState = "normal" | "empty" | "skeleton";

// ---- Clinical Monograph (Phase 4 Medicine Details) -------------------

export interface AlternativeBrand {
  name: string;
  manufacturer: string;
  price: string;
}

export interface DrugInteraction {
  drug: string;
  effect: string;
}

export interface MedicineClinicalGuide {
  indications: {
    overview: string;
    items: string[];
    benefitHeading: string;
    benefits: string[];
  };
  dosage: {
    adult: string;
    pediatric: string;
    maxLimit: string;
    instructions: string;
  };
  sideEffects: {
    common: string[];
    severe: string[];
    warningNote: string;
  };
  pregnancy: {
    fdaCategory: string;
    advisoryBadge: string;
    description: string;
  };
  interactions: {
    overview: string;
    items: DrugInteraction[];
  };
}

export interface MedicineMonograph extends DatabaseMedicine {
  tradeNameBn: string;
  darNumber: string;
  plantLocation: string;
  therapeuticClass: string;
  therapeuticClassEn: string;
  packFormatDetails: string;
  packFormatDetailsEn: string;
  photoUrl: string;
  batchNumber: string;
  stripPriceFormatted: string;
  tradeMargin: string;
  tradePriceFormatted: string;
  safetyRating: {
    label: string;
    score: number;
    scoreLabel: string;
  };
  clinicalGuide: MedicineClinicalGuide;
  alternatives: AlternativeBrand[];
}

// ---- WhatsApp Share & Prescription Slip Generator (Phase 5) ---------

export type ShareScopeTab = "single" | "selected" | "results" | "memo";

export type MessageTemplateKey = "standard" | "compact" | "list_only" | "urgent";

export interface PrescriptionShareItem {
  id: string;
  name: string;
  nameBn: string;
  generic: string;
  company: string;
  price: number;
  priceFormatted: string;
  dosageAdvice: string;
  colorDot?: "primary" | "secondary" | "tertiary";
}

export interface PrescriptionShareLog {
  id: string;
  patientName: string;
  phone: string;
  itemsSummary: string;
  itemCount: number;
  totalPriceFormatted: string;
  status: "delivered" | "sending";
  time: string;
  notes?: string;
}

// ---- Admin Panel (Phase 6) ------------------------------------------

export type AdminMedicineStatus = "live" | "pending" | "draft";

export interface AdminMedicineItem {
  id: string;
  tradeName: string;
  strength: string;
  dosageForm: string;        // e.g. "Tablet", "Capsule", "Syrup", "Injection", "Drop"
  genericName: string;
  manufacturer: string;
  mrp: number;
  mrpFormatted: string;
  discountPct: number;
  status: AdminMedicineStatus;
  iconType: "pill" | "liquid" | "injection";
  notes?: string;
  slugId?: string;
  updatedAt?: string;
}

export interface AdminAuditLogItem {
  id: string;
  title: string;
  timeAgo: string;
  meta: string;
  icon: string;
  type: "update" | "sync" | "flag" | "create" | "delete";
}

export type AdminModuleTabKey = "medicines" | "users" | "announcements" | "whatsapp" | "audit";

export interface AdminModuleTab {
  id: AdminModuleTabKey;
  label: string;
  labelEn: string;
  icon: string;
  badge?: string;
}

// ---- Upcoming Features & PWA Offline Sync (Phase 7) -----------------

export type FeaturePreviewType =
  | "stock_bar"
  | "expiry_badge"
  | "barcode"
  | "pos_bill"
  | "refill_alert"
  | "depot_schedule"
  | "sparkline"
  | "rx_alert"
  | "ocr_scan";

export interface UpcomingFeatureItem {
  id: string;
  moduleNo: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  colorScheme: "primary" | "secondary" | "tertiary" | "error" | "surface";
  progressPct: number;
  previewType: FeaturePreviewType;
  previewData?: Record<string, string | number>;
}

export interface PwaStatusMetric {
  serviceWorkerStatus: string;
  cacheSizeFormatted: string;
  manifestVersion: string;
  isOnline: boolean;
}

export interface PwaHighlightItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
}



// ---- User / Pharmacist ----------------------------------------------

export type UserRole = "pharmacist" | "admin" | "viewer";

export interface User {
  id: string;
  name: string;
  nameBn?: string;
  email: string;
  role: UserRole;
  registrationNumber?: string;  // e.g. "A-14920"
  grade?: string;               // e.g. "A-Grade Pharmacist"
  avatarUrl?: string;
  isVerified: boolean;
}

// ---- Shared UI Types ------------------------------------------------

export interface NavItem {
  label: string;
  labelBn: string;
  href: string;
  icon: string; // Material Symbol name
}

export interface StockStatus {
  level: "in_stock" | "low_stock" | "out_of_stock";
  label: string;
  labelBn: string;
}
