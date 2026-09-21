"use client";

/**
 * MedicineDetailsClient — Full clinical monograph screen client controller
 * Preserved faithfully from Stitch medicine_details/code.html.
 */

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import MedicineBreadcrumb from "./MedicineBreadcrumb";
import MedicineHeroCard from "./MedicineHeroCard";
import MedicineWhatsAppDrawer from "./MedicineWhatsAppDrawer";
import MedicineClinicalTabs from "./MedicineClinicalTabs";
import MedicineAlternativesCard from "./MedicineAlternativesCard";
import MedicinePriceHistory from "./MedicinePriceHistory";
import MedicineClinicalDisclaimer from "./MedicineClinicalDisclaimer";
import MedicineToast from "./MedicineToast";

import type { MedicineMonograph } from "@/types";

interface MedicineDetailsClientProps {
  monograph: MedicineMonograph;
}

export default function MedicineDetailsClient({
  monograph,
}: MedicineDetailsClientProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
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

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => {
      const next = !prev;
      showToast(
        next
          ? "ওষুধটি আপনার সংরক্ষিত তালিকায় যুক্ত করা হয়েছে"
          : "সংরক্ষিত তালিকা থেকে সরানো হয়েছে"
      );
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCompareBrand = (brandName: string) => {
    showToast(`${brandName} এর রেফারেন্স তথ্য প্রস্তুত`);
  };

  const handleEditClick = () => {
    showToast("ওষুধ সম্পাদনা করতে অ্যাডমিন কনসোলে যান");
  };

  return (
    <div className="flex min-h-screen bg-surface font-body-md text-body-md text-on-surface">
      {/* Desktop Left Rail Sidebar (lg+) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        <main className="flex-1 p-space-md lg:p-margin flex flex-col gap-space-lg w-full max-w-7xl mx-auto">
          {/* Breadcrumb Navigation Bar */}
          <MedicineBreadcrumb
            tradeName={monograph.tradeName}
            genericName={monograph.genericName}
          />

          {/* Main Hero Card: Bento Layout */}
          <MedicineHeroCard
            monograph={monograph}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onOpenWhatsAppDrawer={() => setIsWhatsAppOpen(true)}
            onPrint={handlePrint}
            onEditClick={handleEditClick}
          />

          {/* WhatsApp Quick Dispatch Drawer Preview */}
          <MedicineWhatsAppDrawer
            monograph={monograph}
            isOpen={isWhatsAppOpen}
            onClose={() => setIsWhatsAppOpen(false)}
          />

          {/* Content Split: 8 Col Clinical Tabs & 4 Col Alternative Brands */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Left Column (8 Col): Comprehensive Tabbed Clinical Guide */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <MedicineClinicalTabs monograph={monograph} />
            </div>

            {/* Right Column (4 Col): Alternative Equivalent Brands & Safety */}
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <MedicinePriceHistory medicineId={monograph.id} />
              <MedicineAlternativesCard
                monograph={monograph}
                onCompareBrand={handleCompareBrand}
              />
            </div>
          </div>

          {/* Mandatory Clinical Disclaimer Banner */}
          <MedicineClinicalDisclaimer />
        </main>

        {/* Desktop Footer */}
        <footer className="hidden lg:block w-full bg-surface-container-lowest py-space-md px-margin border-t border-[var(--color-border)] mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant max-w-7xl mx-auto">
            <p>
              ঔষধBox — ব্যক্তিগত মেডিসিন রেফারেন্স ও মূল্য তালিকা
            </p>
            <div className="flex items-center gap-space-md">
              <span className="text-on-surface-variant font-medium">তথ্য সহায়তায়</span>
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
