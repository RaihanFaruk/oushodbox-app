/**
 * ঔষধBox (OushodBox) — IndexedDB Offline Storage Foundation
 * Lightweight native IndexedDB manager without external dependencies.
 */

import type { DatabaseMedicine } from "@/types";

const DB_NAME = "oushodbox-offline";
const DB_VERSION = 1;

export const STORES = {
  MEDICINES: "medicines",
  METADATA: "metadata",
  SYNC_QUEUE: "syncQueue",
} as const;

export interface SyncQueueItem {
  id?: number;
  type: "CREATE_MEDICINE" | "UPDATE_MEDICINE" | "DELETE_MEDICINE" | "SHARE_PRESCRIPTION";
  payload: Record<string, unknown>;
  timestamp: number;
  status: "pending" | "failed";
}

function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // 1. Medicines Store
      if (!db.objectStoreNames.contains(STORES.MEDICINES)) {
        db.createObjectStore(STORES.MEDICINES, { keyPath: "id" });
      }

      // 2. Metadata Store
      if (!db.objectStoreNames.contains(STORES.METADATA)) {
        db.createObjectStore(STORES.METADATA, { keyPath: "key" });
      }

      // 3. Sync Queue Store for offline mutations
      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.warn("[IndexedDB] Failed to open database:", request.error);
      resolve(null);
    };
  });
}

// ─── Medicines Operations ──────────────────────────────────────────────────

export async function saveMedicines(medicines: DatabaseMedicine[]): Promise<void> {
  const db = await openDB();
  if (!db) return;

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.MEDICINES, "readwrite");
      const store = tx.objectStore(STORES.MEDICINES);

      medicines.forEach((med) => {
        store.put(med);
      });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    } catch (e) {
      console.warn("[IndexedDB] saveMedicines error:", e);
      resolve();
    }
  });
}

export async function getMedicines(): Promise<DatabaseMedicine[]> {
  const db = await openDB();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.MEDICINES, "readonly");
      const store = tx.objectStore(STORES.MEDICINES);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve([]);
    } catch (e) {
      console.warn("[IndexedDB] getMedicines error:", e);
      resolve([]);
    }
  });
}

export async function clearMedicines(): Promise<void> {
  const db = await openDB();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.MEDICINES, "readwrite");
      const store = tx.objectStore(STORES.MEDICINES);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function deleteCachedMedicine(id: string): Promise<void> {
  const db = await openDB();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.MEDICINES, "readwrite");
      const store = tx.objectStore(STORES.MEDICINES);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

// ─── Metadata Operations ───────────────────────────────────────────────────

export async function saveMetadata(key: string, value: unknown): Promise<void> {
  const db = await openDB();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.METADATA, "readwrite");
      const store = tx.objectStore(STORES.METADATA);
      store.put({ key, value, updatedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function getMetadata<T = unknown>(key: string): Promise<T | null> {
  const db = await openDB();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.METADATA, "readonly");
      const store = tx.objectStore(STORES.METADATA);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result ? (request.result.value as T) : null);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

// ─── Sync Queue Operations (Offline Mutations) ─────────────────────────────

export async function addToSyncQueue(
  action: Omit<SyncQueueItem, "id">
): Promise<number | null> {
  const db = await openDB();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.SYNC_QUEUE, "readwrite");
      const store = tx.objectStore(STORES.SYNC_QUEUE);
      const request = store.add(action);

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  const db = await openDB();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.SYNC_QUEUE, "readonly");
      const store = tx.objectStore(STORES.SYNC_QUEUE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

export async function clearSyncQueue(): Promise<void> {
  const db = await openDB();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.SYNC_QUEUE, "readwrite");
      const store = tx.objectStore(STORES.SYNC_QUEUE);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
