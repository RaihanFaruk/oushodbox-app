/**
 * Firestore Medicine Repository / Service for ঔষধBox (OushodBox)
 * 
 * Manages CRUD operations against the 'medicines' collection in Firestore.
 * Safe for Next.js App Router and resilient to temporary offline/network disruptions.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getMedicineMonograph } from "@/lib/mock-data";
import type { DatabaseMedicine, AdminMedicineItem, MedicineMonograph } from "@/types";

export const MEDICINES_COLLECTION = "medicines";

export type MedicinePayload = Partial<DatabaseMedicine> & Record<string, any>;

/**
 * Helper to convert a Firestore DocumentSnapshot into a typed DatabaseMedicine,
 * ensuring the document ID maps directly to the medicine's `id` field.
 */
function mapDocToMedicine(docSnap: QueryDocumentSnapshot<DocumentData> | DocumentData, id: string): DatabaseMedicine & Record<string, any> {
  const data = typeof docSnap.data === "function" ? docSnap.data() : docSnap;
  const unitPrice = Number(data.unitPrice ?? data.mrp ?? 0);
  return {
    id: id || data.id,
    tradeName: data.tradeName || "",
    genericName: data.genericName || "",
    manufacturer: data.manufacturer || "",
    dosageBadge: data.dosageBadge || data.dosageForm || "ট্যাবলেট",
    isRx: Boolean(data.isRx ?? (data.status === "pending")),
    packSize: data.packSize || "",
    unitPrice,
    unitPriceFormatted: data.unitPriceFormatted || data.mrpFormatted || `৳${unitPrice.toFixed(2)}`,
    unitPriceUnit: data.unitPriceUnit || "/ট্যাবলেট",
    boxPriceFormatted: data.boxPriceFormatted || "",
    discountPct: Number(data.discountPct) || 0,
    discountFormatted: data.discountFormatted || `${data.discountPct || 0}% ছাড়`,
    stockStatus: data.stockStatus || "স্টক পর্যাপ্ত",
    lastUpdated: data.lastUpdated || "সম্প্রতি",
    updatedTimestamp: Number(data.updatedTimestamp) || Date.now(),
    genericGroup: data.genericGroup || "other",
    dosageForm: data.dosageForm || "tablet",
    manufacturerKey: data.manufacturerKey || "other",
    ...data,
  };
}

/**
 * Helper to convert a Firestore medicine record into an AdminMedicineItem.
 */
export function toAdminMedicineItem(doc: any): AdminMedicineItem {
  const mrpVal = Number(doc.mrp ?? doc.unitPrice ?? 0);
  return {
    id: String(doc.id),
    tradeName: doc.tradeName || "Unknown Drug",
    strength: doc.strength || "500mg",
    dosageForm: doc.dosageForm || "Tablet",
    genericName: doc.genericName || "Generic",
    manufacturer: doc.manufacturer || "Square Pharma",
    mrp: mrpVal,
    mrpFormatted: doc.mrpFormatted || `৳ ${mrpVal.toFixed(2)}`,
    discountPct: Number(doc.discountPct ?? 5),
    status: (doc.status === "live" || doc.status === "pending" || doc.status === "draft") ? doc.status : "live",
    iconType: (doc.iconType === "pill" || doc.iconType === "liquid" || doc.iconType === "injection") ? doc.iconType : "pill",
    notes: doc.notes || "",
    updatedAt: doc.updatedAt || doc.lastUpdated || "এখনই",
  };
}

/**
 * Convert any DatabaseMedicine (including records from Firestore) into a complete clinical monograph
 */
export function buildMonographFromMedicine(med: DatabaseMedicine): MedicineMonograph {
  // Predefined rich monographs (e.g. napa-extra, seclo-20)
  const predefined = getMedicineMonograph(med.id);
  if (predefined) {
    return {
      ...predefined,
      ...med,
      unitPriceFormatted: med.unitPriceFormatted || predefined.unitPriceFormatted,
      boxPriceFormatted: med.boxPriceFormatted || predefined.boxPriceFormatted,
    };
  }

  // Custom or newly created Firestore medicine - STRICTLY DISPLAY ONLY VERIFIED STORED FIELDS
  const anyMed = med as any;
  const unitPrice = Number(med.unitPrice || anyMed.mrp || 0);
  const docClinical = anyMed.clinicalGuide;

  return {
    ...med,
    // Verified fields or explicit unstated indicators (no fabricated license/batch/plant)
    tradeNameBn: anyMed.tradeNameBn || med.tradeName,
    darNumber: anyMed.darNumber || "তথ্য অপ্রাপ্য",
    plantLocation: anyMed.plantLocation || "তথ্য অপ্রাপ্য",
    therapeuticClass: anyMed.therapeuticClass || "Pharmaceutical Formulation",
    therapeuticClassEn: anyMed.therapeuticClassEn || "Pharmaceutical Formulation",
    packFormatDetails: anyMed.packFormatDetails || med.packSize || "স্ট্যান্ডার্ড প্যাক",
    packFormatDetailsEn: anyMed.packFormatDetailsEn || med.packSize || "Standard Pack",
    photoUrl:
      anyMed.photoUrl ||
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2nnk_VysSB2ZfrI-v6uFpJ1lIzquhwnGA7tLViMWAmuG_Bprk4FlWpSLr51l8JCgC92q6AeOd3F7mQnMUvjCzS-uvN9__G2JwQtS20do1CklQvKGyOmnC3j-ekvR0LEk7xlGs11_GiRldS0ztUlP9owgkMm-yZyh9JIhCcb-arifeLHZ0RRwdL6TqBJ_vuZsvuQbzqbhjftUQ3Do8dqZe5e_XZFeFFybpjPxwwnCbUVsln9EJIYIkWw",
    batchNumber: anyMed.batchNumber || "তথ্য অপ্রাপ্য",
    stripPriceFormatted: anyMed.stripPriceFormatted || med.boxPriceFormatted || (unitPrice > 0 ? `৳${(unitPrice * 10).toFixed(2)}` : "তথ্য অপ্রাপ্য"),
    tradeMargin: anyMed.tradeMargin || "তথ্য অপ্রাপ্য",
    tradePriceFormatted: anyMed.tradePriceFormatted || "তথ্য অপ্রাপ্য",

    // Safety Rating: DO NOT fabricate clinical scores or claim safe without clinical data
    safetyRating: anyMed.safetyRating || {
      label: "ক্লিনিক্যাল রেটিং তথ্য অপ্রাপ্য",
      score: 0,
      scoreLabel: "অনির্ধারিত",
    },

    // Clinical Guide: DO NOT fabricate indications, dosage, contraindications, side effects, warnings, FDA category, recommendations, pregnancy, or drug interactions
    clinicalGuide: {
      indications: {
        overview:
          docClinical?.indications?.overview ||
          "Clinical information is not available yet.",
        items:
          Array.isArray(docClinical?.indications?.items) && docClinical.indications.items.length > 0
            ? docClinical.indications.items
            : ["Clinical information is not available yet."],
        benefitHeading:
          docClinical?.indications?.benefitHeading ||
          "ক্লিনিক্যাল তথ্য:",
        benefits:
          Array.isArray(docClinical?.indications?.benefits) && docClinical.indications.benefits.length > 0
            ? docClinical.indications.benefits
            : ["Clinical information is not available yet."],
      },
      dosage: {
        adult:
          docClinical?.dosage?.adult ||
          "Clinical information is not available yet.",
        pediatric:
          docClinical?.dosage?.pediatric ||
          "Clinical information is not available yet.",
        maxLimit:
          docClinical?.dosage?.maxLimit ||
          "Clinical information is not available yet.",
        instructions:
          docClinical?.dosage?.instructions ||
          "চিকিৎসক বা রেজিস্টার্ড ফার্মাসিস্টের পরামর্শ অনুযায়ী সেব্য।",
      },
      sideEffects: {
        common:
          Array.isArray(docClinical?.sideEffects?.common) && docClinical.sideEffects.common.length > 0
            ? docClinical.sideEffects.common
            : ["Clinical information is not available yet."],
        severe:
          Array.isArray(docClinical?.sideEffects?.severe) && docClinical.sideEffects.severe.length > 0
            ? docClinical.sideEffects.severe
            : ["Clinical information is not available yet."],
        warningNote:
          docClinical?.sideEffects?.warningNote ||
          "Clinical information is not available yet. চিকিৎসকের সুস্পষ্ট পরামর্শ মেনে চলুন।",
      },
      pregnancy: {
        fdaCategory:
          docClinical?.pregnancy?.fdaCategory ||
          "N/A",
        advisoryBadge:
          docClinical?.pregnancy?.advisoryBadge ||
          "তথ্য অনির্ধারিত",
        description:
          docClinical?.pregnancy?.description ||
          "Clinical information is not available yet. গর্ভাবস্থায় বা স্তন্যদানকালে কোনো ওষুধ সেবনের পূর্বে চিকিৎসকের পরামর্শ গ্রহণ আবশ্যক।",
      },
      interactions: {
        overview:
          docClinical?.interactions?.overview ||
          "Clinical information is not available yet.",
        items:
          Array.isArray(docClinical?.interactions?.items)
            ? docClinical.interactions.items
            : [],
      },
    },

    alternatives: Array.isArray(anyMed.alternatives) ? anyMed.alternatives : [],
  };
}

/**
 * Fetch all medicines from the Firestore 'medicines' collection.
 * Sorted by updatedTimestamp descending if available.
 */
export async function getMedicines(): Promise<DatabaseMedicine[]> {
  try {
    const colRef = collection(db, MEDICINES_COLLECTION);
    const q = query(colRef, orderBy("updatedTimestamp", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => mapDocToMedicine(docSnap, docSnap.id));
  } catch (error) {
    // Fallback without ordering if composite index is not yet built
    try {
      const colRef = collection(db, MEDICINES_COLLECTION);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((docSnap) => mapDocToMedicine(docSnap, docSnap.id));
    } catch (fallbackError) {
      console.warn("[Firestore] Failed to fetch medicines collection:", fallbackError);
      throw fallbackError;
    }
  }
}

/**
 * Fetch a single medicine by its ID / slug from Firestore.
 */
export async function getMedicineById(id: string): Promise<DatabaseMedicine | null> {
  if (!id) return null;

  try {
    const docRef = doc(db, MEDICINES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return mapDocToMedicine(docSnap, docSnap.id);
    }

    // Secondary query check if document was stored with a matching 'id' field
    const colRef = collection(db, MEDICINES_COLLECTION);
    const q = query(colRef, where("id", "==", id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docMatch = snapshot.docs[0];
      return mapDocToMedicine(docMatch, docMatch.id);
    }

    return null;
  } catch (error) {
    console.warn(`[Firestore] Failed to get medicine by ID (${id}):`, error);
    return null;
  }
}

/**
 * Add a new medicine to Firestore.
 * If data.id is provided, sets the document with that custom ID (e.g. slug).
 * Otherwise, auto-generates a new Firestore document ID.
 */
export async function addMedicine(
  data: MedicinePayload & { id?: string }
): Promise<DatabaseMedicine & Record<string, any>> {
  try {
    const { id, ...payload } = data;
    const timestamp = payload.updatedTimestamp || Date.now();
    const cleanPayload = {
      ...payload,
      updatedTimestamp: timestamp,
    };

    if (id && id.trim().length > 0) {
      const docRef = doc(db, MEDICINES_COLLECTION, id.trim());
      await setDoc(docRef, cleanPayload);
      return mapDocToMedicine(cleanPayload, id.trim());
    } else {
      const colRef = collection(db, MEDICINES_COLLECTION);
      const docRef = await addDoc(colRef, cleanPayload);
      return mapDocToMedicine(cleanPayload, docRef.id);
    }
  } catch (error) {
    console.error("[Firestore] Failed to add medicine:", error);
    throw error;
  }
}

/**
 * Update an existing medicine in Firestore by its ID.
 */
export async function updateMedicine(
  id: string,
  data: MedicinePayload
): Promise<boolean> {
  if (!id) return false;

  try {
    const docRef = doc(db, MEDICINES_COLLECTION, id);
    const updatePayload: Record<string, any> = {
      ...data,
      updatedTimestamp: data.updatedTimestamp || Date.now(),
    };

    // Prevent overwriting the document ID inside the document data
    delete updatePayload.id;

    await updateDoc(docRef, updatePayload);
    return true;
  } catch (error) {
    console.error(`[Firestore] Failed to update medicine (${id}):`, error);
    throw error;
  }
}

/**
 * Delete a medicine document from Firestore by its ID.
 */
export async function deleteMedicine(id: string): Promise<boolean> {
  if (!id) return false;

  try {
    const docRef = doc(db, MEDICINES_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`[Firestore] Failed to delete medicine (${id}):`, error);
    throw error;
  }
}
