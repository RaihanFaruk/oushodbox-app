"use client";

/**
 * Medicine Database Page — /medicines
 * Preserved faithfully from Stitch medicine_database/code.html.
 *
 * ⚠️ DEMO DATA ONLY — Fictional records for UI demonstration.
 */

import { useState, useMemo, useEffect, useRef } from "react";
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

import { DEMO_DATABASE_MEDICINES } from "@/lib/mock-data";
import { saveMedicines, getMedicines } from "@/lib/pwa/db";
import type { DatabaseMedicine, MedicineViewMode, MedicineSimState } from "@/types";

export default function MedicineDatabasePage() {
  // ─── Interactive State ───────────────────────────────────────────────────
  const [medicines, setMedicines] = useState<DatabaseMedicine[]>(DEMO_DATABASE_MEDICINES);
  const [searchQuery, setSearchQuery] = useState("");
  const [genericFilter, setGenericFilter] = useState("all");
  const [dosageFormFilter, setDosageFormFilter] = useState("all");
  const [manufacturerFilter, setManufacturerFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  const [viewMode, setViewMode] = useState<MedicineViewMode>("grid");
  const [simState, setSimState] = useState<MedicineSimState>("normal");

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(["napa-extra"]));
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
    // Offline caching & recovery via IndexedDB
    if (typeof window !== "undefined") {
      if (navigator.onLine) {
        saveMedicines(DEMO_DATABASE_MEDICINES).catch((err) => {
          console.warn("[PWA IndexedDB] Cache sync warning:", err);
        });
      } else {
        getMedicines()
          .then((cached) => {
            if (cached && cached.length > 0) {
              setMedicines(cached);
            }
          })
          .catch((err) => {
            console.warn("[PWA IndexedDB] Offline load warning:", err);
          });
      }
    }

    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // ─── Filter & Sort Logic ─────────────────────────────────────────────────
  const filteredMedicines = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return medicines.filter((med) => {
      // Search matching (Trade name, Generic name, Manufacturer)
      if (query) {
        const matchesTrade = med.tradeName.toLowerCase().includes(query);
        const matchesGeneric = med.genericName.toLowerCase().includes(query);
        const matchesManufacturer = med.manufacturer.toLowerCase().includes(query);
        if (!matchesTrade && !matchesGeneric && !matchesManufacturer) return false;
      }

      // Generic group filter
      if (genericFilter !== "all") {
        const matchesGroup =
          med.genericGroup === genericFilter ||
          med.genericName.toLowerCase().includes(genericFilter);
        if (!matchesGroup) return false;
      }

      // Dosage form filter
      if (dosageFormFilter !== "all") {
        if (med.dosageForm !== dosageFormFilter) return false;
      }

      // Manufacturer filter
      if (manufacturerFilter !== "all") {
        if (med.manufacturerKey !== manufacturerFilter) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "alpha") {
        return a.tradeName.localeCompare(b.tradeName);
      }
      if (sortBy === "price-low") {
        return a.unitPrice - b.unitPrice;
      }
      if (sortBy === "price-high") {
        return b.unitPrice - a.unitPrice;
      }
      if (sortBy === "discount") {
        return b.discountPct - a.discountPct;
      }
      // "updated" default
      return b.updatedTimestamp - a.updatedTimestamp;
    });
  }, [searchQuery, genericFilter, dosageFormFilter, manufacturerFilter, sortBy]);

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

  // ─── WhatsApp Sharing (Demo / Local Utility) ─────────────────────────────
  const shareWhatsAppDirect = (med: DatabaseMedicine) => {
    const text = `*ঔষধBox তথ্য (ডেমো)*\nওষুধ: ${med.tradeName}\nজেনেরিক: ${med.genericName}\nপ্রস্তুতকারক: ${med.manufacturer}\nমূল্য: ${med.unitPriceFormatted} ${med.unitPriceUnit}\nপ্যাক: ${med.packSize}\n(DGDA লাইসেন্সকৃত ফার্মেসি ডিরেক্টরি)`;
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
    const names = selectedMeds.map((m) => m.tradeName).join(", ");
    const text = `*ঔষধBox ব্যাচ তথ্য (ডেমো)*\nনির্বাচিত ওষুধসমূহ (${selectedIds.size}টি):\n${selectedMeds
      .map(
        (m, i) =>
          `${i + 1}. ${m.tradeName} (${m.genericName}) — ${m.unitPriceFormatted}`
      )
      .join("\n")}\n\n(DGDA লাইসেন্সকৃত ফার্মেসি ডিরেক্টরি)`;

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
    setSimState("normal");
    showToast("ফিল্টার রিসেট করা হয়েছে");
  };

  const setQuickSearchNapa = () => {
    setSearchQuery("Napa");
    setGenericFilter("all");
    setDosageFormFilter("all");
    setManufacturerFilter("all");
    setSimState("normal");
    showToast("অনুসন্ধান করা হচ্ছে: Napa");
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
            simState={simState}
            onToggleSimState={setSimState}
          />

          {/* Live Search & Intelligent Query Command Box */}
          <MedicineSearch
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              if (simState !== "normal") setSimState("normal");
            }}
            onFilterToggle={() => {
              showToast("স্মার্ট ফিল্টার সক্রিয়");
            }}
            onScanClick={() => {
              showToast("বারকোড স্ক্যানার প্রস্তুত (ডেমো)");
            }}
          />

          {/* Multi-Filter Matrix Strip */}
          <MedicineFilter
            genericFilter={genericFilter}
            onGenericChange={(val) => {
              setGenericFilter(val);
              if (simState !== "normal") setSimState("normal");
            }}
            dosageFormFilter={dosageFormFilter}
            onDosageFormChange={(val) => {
              setDosageFormFilter(val);
              if (simState !== "normal") setSimState("normal");
            }}
            manufacturerFilter={manufacturerFilter}
            onManufacturerChange={(val) => {
              setManufacturerFilter(val);
              if (simState !== "normal") setSimState("normal");
            }}
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
          {simState === "skeleton" ? (
            <MedicineLoadingState count={6} />
          ) : simState === "empty" || filteredMedicines.length === 0 ? (
            <MedicineEmptyState
              onResetFilters={resetFilters}
              onQuickSearchNapa={setQuickSearchNapa}
            />
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
