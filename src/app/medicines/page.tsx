"use client";

/**
 * Medicine Database Page — /medicines
 * Preserved faithfully from Stitch medicine_database/code.html.
 *
 * ⚠️ DEMO DATA ONLY — Fictional records for UI demonstration.
 */

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import MedicineRegistryHeader from "@/components/medicine/MedicineRegistryHeader";
import MedicineSearch from "@/components/medicine/MedicineSearch";
import MedicineFilter from "@/components/medicine/MedicineFilter";
import MedicineBulkActions from "@/components/medicine/MedicineBulkActions";
import MedicineList from "@/components/medicine/MedicineList";
import MedicineEmptyState from "@/components/medicine/MedicineEmptyState";
import MedicineLoadingState from "@/components/medicine/MedicineLoadingState";
import MedicinePagination from "@/components/medicine/MedicinePagination";
import MedicineToast from "@/components/medicine/MedicineToast";

import { getMedicines as getFirestoreMedicines } from "@/lib/firestore/medicines";
import { saveMedicines, getMedicines as getCachedMedicines, clearMedicines } from "@/lib/pwa/db";
import { subscribeToAuthChanges, isAuthorizedAdmin } from "@/lib/auth";
import type { DatabaseMedicine, MedicineViewMode } from "@/types";
import Link from "next/link";

export default function MedicineDatabasePage() {
  // ─── Interactive State ───────────────────────────────────────────────────
  const [medicines, setMedicines] = useState<DatabaseMedicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [genericFilter, setGenericFilter] = useState("all");
  const [dosageFormFilter, setDosageFormFilter] = useState("all");
  const [manufacturerFilter, setManufacturerFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  const [viewMode, setViewMode] = useState<MedicineViewMode>("grid");

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // ─── Data Loading: Firestore (Online) + IndexedDB (Offline) ─────────────
  const loadMedicines = useCallback(async (isAuthAdmin?: boolean) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    const online = typeof navigator !== "undefined" ? navigator.onLine : true;
    setIsOffline(!online);

    if (online && isAuthAdmin) {
      try {
        const firestoreMeds = await getFirestoreMedicines();
        setMedicines(firestoreMeds);

        // Sync fresh Firestore medicines to IndexedDB for offline access
        if (firestoreMeds.length > 0) {
          await clearMedicines();
          await saveMedicines(firestoreMeds);
        } else {
          await clearMedicines();
        }
      } catch (err: any) {
        console.warn("[Medicines] Firestore fetch failed, attempting offline cache:", err);
        try {
          const cached = await getCachedMedicines();
          if (cached && cached.length > 0) {
            setMedicines(cached);
            setIsOffline(true);
            showToast("অফলাইন মোড: সংরক্ষিত ক্যাশ থেকে ডেটা লোড হয়েছে");
          } else {
            setMedicines([]);
            setIsError(true);
            setErrorMessage("সার্ভার বা ডেটাবেসের সাথে সংযোগ স্থাপন করা যায়নি এবং কোনো অফলাইন তথ্য সংরক্ষিত নেই।");
          }
        } catch {
          setMedicines([]);
          setIsError(true);
          setErrorMessage("সার্ভার বা ডেটাবেসের সাথে সংযোগ স্থাপন করা যায়নি।");
        }
      } finally {
        setIsLoading(false);
      }
    } else if (isAuthAdmin) {
      // Offline authenticated admin session: allow viewing cached medicines
      try {
        const cached = await getCachedMedicines();
        if (cached && cached.length > 0) {
          setMedicines(cached);
          if (!online) showToast("অফলাইন মোড: ক্যাশড ডেটা ব্যবহৃত হচ্ছে");
        } else {
          setMedicines([]);
        }
      } catch (err) {
        console.warn("[Medicines] Offline cache read failed:", err);
        setMedicines([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Unauthenticated session: strictly block cached medicine access
      setMedicines([]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      const authorized = isAuthorizedAdmin(user);
      setIsAuthenticated(authorized);
      setIsAuthChecking(false);
      loadMedicines(authorized);
    });

    const handleOnline = () => {
      setIsOffline(false);
      if (isAuthenticated) loadMedicines(true);
    };
    const handleOffline = () => {
      setIsOffline(true);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      }
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, [loadMedicines]);

  // ─── Filter & Sort Logic ─────────────────────────────────────────────────
  const filteredMedicines = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return medicines
      .filter((med) => {
        // Search matching (Trade name, Generic name, Manufacturer)
        if (query) {
          const matchesTrade = (med.tradeName || "").toLowerCase().includes(query);
          const matchesGeneric = (med.genericName || "").toLowerCase().includes(query);
          const matchesManufacturer = (med.manufacturer || "").toLowerCase().includes(query);
          if (!matchesTrade && !matchesGeneric && !matchesManufacturer) return false;
        }

        // Generic group filter
        if (genericFilter !== "all") {
          const matchesGroup =
            med.genericGroup === genericFilter ||
            (med.genericName || "").toLowerCase().includes(genericFilter.toLowerCase());
          if (!matchesGroup) return false;
        }

        // Dosage form filter
        if (dosageFormFilter !== "all") {
          const form = (med.dosageForm || "").toLowerCase();
          const badge = (med.dosageBadge || "").toLowerCase();
          const filter = dosageFormFilter.toLowerCase();
          const matchesForm = form === filter || form.includes(filter) || badge.includes(filter);
          if (!matchesForm) return false;
        }

        // Manufacturer filter
        if (manufacturerFilter !== "all") {
          const mfrKey = (med.manufacturerKey || "").toLowerCase();
          const mfrName = (med.manufacturer || "").toLowerCase();
          const filter = manufacturerFilter.toLowerCase();
          const matchesMfr = mfrKey === filter || mfrKey.includes(filter) || mfrName.includes(filter);
          if (!matchesMfr) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "alpha") {
          return (a.tradeName || "").localeCompare(b.tradeName || "");
        }
        if (sortBy === "price-low") {
          return (a.unitPrice || 0) - (b.unitPrice || 0);
        }
        if (sortBy === "price-high") {
          return (b.unitPrice || 0) - (a.unitPrice || 0);
        }
        if (sortBy === "discount") {
          return (b.discountPct || 0) - (a.discountPct || 0);
        }
        // "updated" default
        return (b.updatedTimestamp || 0) - (a.updatedTimestamp || 0);
      });
  }, [medicines, searchQuery, genericFilter, dosageFormFilter, manufacturerFilter, sortBy]);

  // ─── Selection Handlers ──────────────────────────────────────────────────
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isAllSelected =
    filteredMedicines.length > 0 &&
    filteredMedicines.every((med) => selectedIds.has(med.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredMedicines.map((m) => m.id)));
    }
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    showToast("নির্বাচন বাতিল করা হয়েছে");
  };

  // ─── Favorite Handlers ───────────────────────────────────────────────────
  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("প্রিয় তালিকা থেকে সরানো হয়েছে");
      } else {
        next.add(id);
        showToast("প্রিয় তালিকায় যুক্ত করা হয়েছে");
      }
      return next;
    });
  };

  // ─── WhatsApp Sharing ───────────────────────────────────────────────────
  const shareWhatsAppDirect = (med: DatabaseMedicine) => {
    const text = `*${med.tradeName}*\nজেনেরিক: ${med.genericName}\nকোম্পানি: ${med.manufacturer}\nমূল্য: ${med.unitPriceFormatted} ${med.unitPriceUnit}\nপ্যাক: ${med.packSize || "স্ট্যান্ডার্ড"}\n_OushodBox Medicine Workspace_`;
    navigator.clipboard?.writeText(text);
    showToast(`${med.tradeName} এর বিবরণ হোয়াটসঅ্যাপে পাঠানোর জন্য কপি করা হয়েছে`);
  };

  const shareSelectedBulk = () => {
    if (selectedIds.size === 0) {
      showToast("অনুগ্রহ করে অন্তত একটি ওষুধ নির্বাচন করুন");
      return;
    }

    const selectedMeds = medicines.filter((m) =>
      selectedIds.has(m.id)
    );
    const text = `*ঔষধBox ওষুধ তালিকা (${selectedIds.size}টি)*\n${selectedMeds
      .map(
        (m, i) =>
          `${i + 1}. ${m.tradeName} (${m.genericName}) — ${m.unitPriceFormatted}`
      )
      .join("\n")}\n\n_OushodBox Medicine Workspace_`;

    navigator.clipboard?.writeText(text);
    showToast(`${selectedIds.size}টি ওষুধের তথ্য হোয়াটসঅ্যাপে শেয়ারের জন্য প্রস্তুত!`);
  };

  // ─── Filter Reset Handlers ───────────────────────────────────────────────
  const resetFilters = () => {
    setSearchQuery("");
    setGenericFilter("all");
    setDosageFormFilter("all");
    setManufacturerFilter("all");
    setSortBy("updated");
    showToast("ফিল্টার রিসেট করা হয়েছে");
  };

  return (
    <div className="flex min-h-screen bg-surface font-body-md text-body-md text-on-surface">
      {/* Desktop Left Rail Sidebar (lg+) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        <main className="flex-1 p-space-md lg:p-margin flex flex-col gap-space-lg w-full max-w-7xl mx-auto">
          {/* Top Registry Context Bar */}
          <MedicineRegistryHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalCount={filteredMedicines.length}
          />

          {/* Live Search & Intelligent Query Command Box */}
          <MedicineSearch
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onFilterToggle={() => {
              showToast("স্মার্ট ফিল্টার সক্রিয়");
            }}
            onScanClick={() => {
              showToast("বারকোড স্ক্যানার ফিচার শীঘ্রই আসছে");
            }}
          />

          {/* Multi-Filter Matrix Strip */}
          <MedicineFilter
            genericFilter={genericFilter}
            onGenericChange={(val) => setGenericFilter(val)}
            dosageFormFilter={dosageFormFilter}
            onDosageFormChange={(val) => setDosageFormFilter(val)}
            manufacturerFilter={manufacturerFilter}
            onManufacturerChange={(val) => setManufacturerFilter(val)}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Bulk WhatsApp Batch Action Panel */}
          <MedicineBulkActions
            totalCount={filteredMedicines.length}
            selectedCount={selectedIds.size}
            isAllSelected={isAllSelected}
            onToggleSelectAll={toggleSelectAll}
            onClearSelection={clearSelection}
            onShareBulkWhatsApp={shareSelectedBulk}
          />

          {/* Interactive Results Area */}
          {!isAuthChecking && !isAuthenticated ? (
            <div className="p-8 sm:p-12 text-center rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] shadow-xs flex flex-col items-center justify-center max-w-md mx-auto w-full my-8">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-3xl">lock</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">প্রাইভেট মেডিসিন ডেটাবেস</h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                ওষুধের তালিকা ও রেফারেন্স মূল্য দেখতে অনুগ্রহ করে অনুমোদিত অ্যাডমিন অ্যাকাউন্টে সাইন ইন করুন।
              </p>
              <Link
                href="/admin/login"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-dark transition-all"
              >
                <span className="material-symbols-outlined text-lg">login</span>
                <span>অ্যাডমিন লগইন</span>
              </Link>
            </div>
          ) : isLoading ? (
            <MedicineLoadingState count={6} />
          ) : isError ? (
            <MedicineEmptyState
              onResetFilters={resetFilters}
              isError={true}
              errorMessage={errorMessage || undefined}
              onRetry={loadMedicines}
            />
          ) : medicines.length === 0 ? (
            <MedicineEmptyState
              onResetFilters={resetFilters}
              isDatabaseEmpty={true}
              onRetry={loadMedicines}
            />
          ) : filteredMedicines.length === 0 ? (
            <MedicineEmptyState onResetFilters={resetFilters} />
          ) : (
            <MedicineList
              medicines={filteredMedicines}
              viewMode={viewMode}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelectOne}
              isAllSelected={isAllSelected}
              onToggleSelectAll={toggleSelectAll}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              onShareWhatsApp={shareWhatsAppDirect}
            />
          )}

          {/* Live Pagination & Inventory Volume Indicator */}
          <MedicinePagination
            totalItems={filteredMedicines.length}
            currentPage={1}
            totalPages={filteredMedicines.length > 0 ? Math.ceil(filteredMedicines.length / 6) : 1}
          />
        </main>

        {/* Desktop Footer */}
        <footer className="hidden lg:block w-full bg-surface-container-lowest py-space-md px-margin border-t border-[var(--color-border)] mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant max-w-7xl mx-auto">
            <p>
              ঔষধBox v1.2.0 • ব্যক্তিগত ফার্মাসিউটিক্যাল রেফারেন্স ও প্রাইস ওয়ার্কস্পেস
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
