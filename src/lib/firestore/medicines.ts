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
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ADMIN_EMAIL } from "@/lib/auth/admin";
import type {
  DatabaseMedicine,
  AdminMedicineItem,
  MedicineMonograph,
  PriceHistoryEntry,
  MedicinePrivateData,
} from "@/types";

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
    manufacturer: doc.manufacturer || "অনির্ধারিত",
    mrp: mrpVal,
    mrpFormatted: doc.mrpFormatted || `৳ ${mrpVal.toFixed(2)}`,
    discountPct: Number(doc.discountPct ?? 0),
    status: (doc.status === "live" || doc.status === "pending" || doc.status === "draft") ? doc.status : "live",
    iconType: (doc.iconType === "pill" || doc.iconType === "liquid" || doc.iconType === "injection") ? doc.iconType : "pill",
    notes: doc.notes || "",
    updatedAt: doc.updatedAt || doc.lastUpdated || "সম্প্রতি",
  };
}

/**
 * Convert any DatabaseMedicine (including records from Firestore) into a complete clinical monograph
 */
export function buildMonographFromMedicine(med: DatabaseMedicine): MedicineMonograph {
  // Real Firestore medicine monograph - STRICTLY DISPLAY ONLY VERIFIED STORED FIELDS
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

const PRIVATE_FIELD_KEYS = [
  "purchasePrice",
  "margin",
  "supplierNote",
  "costPrice",
  "supplierName",
  "internalNote",
] as const;

/**
 * Strips confidential/internal business fields from top-level document payload
 * to prevent accidental exposure via public read operations.
 */
function extractPrivateFields(payload: Record<string, any>): {
  publicPayload: Record<string, any>;
  privateData: MedicinePrivateData | null;
} {
  const publicPayload = { ...payload };
  const privateData: Record<string, any> = {};
  let hasPrivate = false;

  for (const key of PRIVATE_FIELD_KEYS) {
    if (key in publicPayload) {
      if (publicPayload[key] !== undefined) {
        privateData[key] = publicPayload[key];
        hasPrivate = true;
      }
      delete publicPayload[key];
    }
  }

  return {
    publicPayload,
    privateData: hasPrivate ? (privateData as MedicinePrivateData) : null,
  };
}

/**
 * Fetch confidential/cost details for a medicine from its private subcollection.
 * Only readable by authenticated admin per Firestore security rules.
 */
export async function getMedicinePrivateData(
  medicineId: string
): Promise<MedicinePrivateData | null> {
  if (!medicineId) return null;
  try {
    const privRef = doc(db, MEDICINES_COLLECTION, medicineId, "private", "data");
    const snap = await getDoc(privRef);
    if (snap.exists()) {
      return snap.data() as MedicinePrivateData;
    }
    return null;
  } catch (err) {
    console.warn(`[Firestore] Failed to read private data for ${medicineId}:`, err);
    return null;
  }
}

/**
 * Save confidential/cost details for a medicine into its private subcollection.
 * Only writable by authenticated admin per Firestore security rules.
 */
export async function saveMedicinePrivateData(
  medicineId: string,
  privateData: MedicinePrivateData
): Promise<void> {
  if (!medicineId) return;
  const privRef = doc(db, MEDICINES_COLLECTION, medicineId, "private", "data");
  await setDoc(
    privRef,
    {
      ...privateData,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

/**
 * Add a new medicine to Firestore.
 * If data.id is provided, sets the document with that custom ID (e.g. slug).
 * Otherwise, auto-generates a new Firestore document ID.
 * Confidential fields are stripped from top-level and stored in private/data.
 */
export async function addMedicine(
  data: MedicinePayload & { id?: string }
): Promise<DatabaseMedicine & Record<string, any>> {
  try {
    const { id, ...rawPayload } = data;
    const { publicPayload, privateData } = extractPrivateFields(rawPayload);
    const timestamp = publicPayload.updatedTimestamp || Date.now();
    const cleanPayload = {
      ...publicPayload,
      updatedTimestamp: timestamp,
    };

    let finalId = id && id.trim().length > 0 ? id.trim() : "";

    if (finalId.length > 0) {
      const docRef = doc(db, MEDICINES_COLLECTION, finalId);
      await setDoc(docRef, cleanPayload);
    } else {
      const colRef = collection(db, MEDICINES_COLLECTION);
      const docRef = await addDoc(colRef, cleanPayload);
      finalId = docRef.id;
    }

    // If private fields were supplied, store in private subcollection
    if (privateData) {
      try {
        await saveMedicinePrivateData(finalId, privateData);
      } catch (privErr) {
        console.warn(`[Firestore] Failed to save private data for ${finalId}:`, privErr);
      }
    }

    // Write initial price history entry in subcollection
    try {
      const initialPrice = Number((cleanPayload as any).unitPrice ?? (cleanPayload as any).mrp ?? 0);
      const historyCol = collection(db, MEDICINES_COLLECTION, finalId, "priceHistory");
      await addDoc(historyCol, {
        price: initialPrice,
        currency: "BDT",
        changedAt: serverTimestamp(),
        changedBy: ADMIN_EMAIL,
        note: "Initial price",
      });
    } catch (historyErr) {
      console.warn(`[Firestore] Failed to record initial price history for ${finalId}:`, historyErr);
    }

    return mapDocToMedicine(cleanPayload, finalId);
  } catch (error) {
    console.error("[Firestore] Failed to add medicine:", error);
    throw error;
  }
}

/**
 * Update an existing medicine in Firestore by its ID.
 * Any private/cost fields are routed to the private/data subcollection.
 */
export async function updateMedicine(
  id: string,
  data: MedicinePayload
): Promise<boolean> {
  if (!id) return false;

  try {
    const docRef = doc(db, MEDICINES_COLLECTION, id);

    // Retrieve old price to determine if price has changed
    let oldPrice: number | null = null;
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        oldPrice = Number(docData.unitPrice ?? docData.mrp ?? 0);
      }
    } catch (e) {
      console.warn(`[Firestore] Could not fetch previous price for ${id}:`, e);
    }

    const { publicPayload, privateData } = extractPrivateFields(data);
    const updatePayload: Record<string, any> = {
      ...publicPayload,
      updatedTimestamp: publicPayload.updatedTimestamp || Date.now(),
    };

    // Prevent overwriting the document ID inside the document data
    delete updatePayload.id;
    // Backward compatibility: stop writing previousPrice to doc (subcollection is source of truth)
    delete updatePayload.previousPrice;

    await updateDoc(docRef, updatePayload);

    // If private fields were supplied, update them in private subcollection
    if (privateData) {
      try {
        await saveMedicinePrivateData(id, privateData);
      } catch (privErr) {
        console.warn(`[Firestore] Failed to update private data for ${id}:`, privErr);
      }
    }

    // If unitPrice changed, append a new entry to priceHistory
    const anyPayload = publicPayload as any;
    const hasNewPrice = anyPayload.unitPrice !== undefined || anyPayload.mrp !== undefined;
    const newPrice = Number(anyPayload.unitPrice ?? anyPayload.mrp ?? oldPrice);

    if (hasNewPrice && oldPrice !== null && newPrice !== oldPrice) {
      try {
        const historyCol = collection(db, MEDICINES_COLLECTION, id, "priceHistory");
        await addDoc(historyCol, {
          price: newPrice,
          currency: "BDT",
          changedAt: serverTimestamp(),
          changedBy: ADMIN_EMAIL,
          note: `Price updated from ${oldPrice} to ${newPrice}`,
        });
      } catch (historyErr) {
        console.warn(`[Firestore] Failed to append price history for ${id}:`, historyErr);
      }
    }

    return true;
  } catch (error) {
    console.error(`[Firestore] Failed to update medicine (${id}):`, error);
    throw error;
  }
}

/**
 * Fetch price history entries for a given medicine, ordered by changedAt descending.
 */
export async function getPriceHistory(medicineId: string): Promise<PriceHistoryEntry[]> {
  if (!medicineId) return [];

  try {
    const colRef = collection(db, MEDICINES_COLLECTION, medicineId, "priceHistory");
    const q = query(colRef, orderBy("changedAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      let changedAtStr = "";
      if (data.changedAt?.toDate) {
        changedAtStr = data.changedAt.toDate().toISOString();
      } else if (data.changedAt instanceof Date) {
        changedAtStr = data.changedAt.toISOString();
      } else if (typeof data.changedAt === "string") {
        changedAtStr = data.changedAt;
      } else if (typeof data.changedAt === "number") {
        changedAtStr = new Date(data.changedAt).toISOString();
      } else {
        changedAtStr = new Date().toISOString();
      }

      return {
        id: docSnap.id,
        price: Number(data.price ?? 0),
        currency: data.currency || "BDT",
        changedAt: changedAtStr,
        changedBy: data.changedBy || "",
        note: data.note || "",
      };
    });
  } catch (error) {
    // If index or ordering failed, attempt un-ordered fallback
    try {
      const colRef = collection(db, MEDICINES_COLLECTION, medicineId, "priceHistory");
      const snapshot = await getDocs(colRef);
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        let changedAtStr = "";
        let timestamp = 0;
        if (data.changedAt?.toDate) {
          const d = data.changedAt.toDate();
          changedAtStr = d.toISOString();
          timestamp = d.getTime();
        } else if (data.changedAt instanceof Date) {
          changedAtStr = data.changedAt.toISOString();
          timestamp = data.changedAt.getTime();
        } else if (typeof data.changedAt === "string") {
          changedAtStr = data.changedAt;
          timestamp = new Date(data.changedAt).getTime() || 0;
        } else if (typeof data.changedAt === "number") {
          changedAtStr = new Date(data.changedAt).toISOString();
          timestamp = data.changedAt;
        } else {
          changedAtStr = new Date().toISOString();
        }

        return {
          id: docSnap.id,
          price: Number(data.price ?? 0),
          currency: data.currency || "BDT",
          changedAt: changedAtStr,
          changedBy: data.changedBy || "",
          note: data.note || "",
          _sortTs: timestamp,
        };
      });
      items.sort((a, b) => b._sortTs - a._sortTs);
      return items.map(({ _sortTs, ...rest }) => rest);
    } catch (fallbackError) {
      console.warn(`[Firestore] Failed to fetch price history for ${medicineId}:`, fallbackError);
      return [];
    }
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
