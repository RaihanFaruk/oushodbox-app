"use client";

/**
 * OushodBox — Personal Medicine Reference & Price Workspace
 * Modern, calm, mobile-first home dashboard.
 * Zero demo data, real Firestore integration, instant global search.
 */

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Layout Components
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// Modal & Firestore
import AdminAddMedicineModal from "@/components/admin/AdminAddMedicineModal";
import {
  getMedicines as getFirestoreMedicines,
  addMedicine,
  toAdminMedicineItem,
} from "@/lib/firestore/medicines";
import { getMedicines as getCachedMedicines, saveMedicines as setCachedMedicines } from "@/lib/pwa/db";
import { subscribeToAuthChanges, isAuthorizedAdmin } from "@/lib/auth";
import { toBengaliNumeral, shareToWhatsApp } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { getFirestoreErrorMessage } from "@/components/ui/Toast";
import type { DatabaseMedicine, AdminMedicineItem } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const [medicines, setMedicines] = useState<DatabaseMedicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Quick Add Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show brief toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  }, []);

  // Online / Offline listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const onOnline = () => setIsOnline(true);
      const onOffline = () => setIsOnline(false);
      window.addEventListener("online", onOnline);
      window.addEventListener("offline", onOffline);
      return () => {
        window.removeEventListener("online", onOnline);
        window.removeEventListener("offline", onOffline);
      };
    }
  }, []);

  // Fetch medicines from Firestore (fallback to IndexedDB)
  const fetchMedicines = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFirestoreMedicines();
      setMedicines(data);
      // Sync to cache
      setCachedMedicines(data).catch(() => {});
    } catch {
      try {
        const cached = await getCachedMedicines();
        setMedicines(cached);
      } catch {
        setMedicines([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      const email = user?.email || null;
      setUserEmail(email);
      const authorized = isAuthorizedAdmin(user);
      setIsAuthAdmin(authorized);
      setIsAuthChecking(false);
      if (authorized) {
        fetchMedicines();
      } else {
        // Unauthenticated or unauthorized — strictly block cached medicine access
        setMedicines([]);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [fetchMedicines]);

  // Handle Quick Add Medicine
  const handleSaveMedicine = async (data: Partial<AdminMedicineItem>) => {
    if (!userEmail) {
      router.push("/admin");
      return;
    }
    setIsSubmitting(true);
    try {
      await addMedicine(data);
      setIsAddModalOpen(false);
      showToast(`"${data.tradeName}" সফলভাবে সংরক্ষণ করা হয়েছে`);
      await fetchMedicines();
    } catch (err: any) {
      showToast(`সংরক্ষণ ব্যর্থ হয়েছে: ${getFirestoreErrorMessage(err)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Instant global search filter
  const filteredMedicines = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return medicines;
    return medicines.filter((m) => {
      const trade = (m.tradeName || "").toLowerCase();
      const generic = (m.genericName || "").toLowerCase();
      const company = (m.manufacturer || "").toLowerCase();
      const dosage = (m.dosageBadge || m.dosageForm || "").toLowerCase();
      return (
        trade.includes(q) ||
        generic.includes(q) ||
        company.includes(q) ||
        dosage.includes(q)
      );
    });
  }, [medicines, searchQuery]);

  // Real statistics derived from actual data
  const totalCount = medicines.length;
  const uniqueCompanies = useMemo(() => {
    const set = new Set(
      medicines.map((m) => m.manufacturer?.trim()).filter(Boolean)
    );
    return set.size;
  }, [medicines]);

  // Single-tap WhatsApp share
  const handleWhatsAppShare = (med: DatabaseMedicine) => {
    const strengthStr = (med as any).strength || med.dosageBadge || "";
    shareToWhatsApp(
      `${med.tradeName} ${strengthStr}`.trim(),
      med.genericName || "—",
      med.manufacturer || "—",
      med.unitPriceFormatted || `৳ ${med.unitPrice.toFixed(2)}`
    );
  };

  return (
    <div className="flex min-h-dvh bg-canvas">
      {/* Desktop Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Workspace Top Header */}
        <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-[var(--color-border)] px-space-margin-mobile lg:px-margin py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-xs"
              style={{
                background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
              }}
            >
              Rx
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {t("common.appName")}
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-on-surface-variant font-medium">
                {t("common.appSubtitle")}
              </span>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sync & Connectivity Status */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isOnline
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="hidden xs:inline">
                {isOnline ? t("common.online") : t("common.offline")}
              </span>
            </div>

            {/* Quick Add Medicine button (admin only) */}
            {isAuthAdmin && (
              <button
                type="button"
                onClick={() => {
                  if (userEmail) {
                    setIsAddModalOpen(true);
                  } else {
                    router.push("/admin");
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>{t("home.addNewMedicine")}</span>
              </button>
            )}
          </div>
        </header>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 right-4 z-50 bg-on-surface text-surface px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium transition-all animate-in fade-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-emerald-400 text-lg">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 px-space-margin-mobile lg:px-margin py-5 sm:py-6 flex flex-col gap-6 pb-24 lg:pb-8 max-w-7xl mx-auto w-full">
          {/* Workspace Search Hero */}
          <section
            className="rounded-2xl bg-surface-container-lowest p-4 sm:p-6 border border-[var(--color-border)] shadow-xs flex flex-col gap-4"
            aria-label="ওষুধ অনুসন্ধান"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-on-surface">
                  {t("home.title")}
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                  {t("home.subtitle")}
                </p>
              </div>
              <div className="text-xs text-on-surface-variant font-medium bg-surface-container-low px-3 py-1.5 rounded-lg self-start sm:self-auto border border-[var(--color-border)]">
                {t("home.totalSaved")}{" "}
                <span className="font-bold text-primary">
                  {toBengaliNumeral(totalCount)}
                </span>
              </div>
            </div>

            {/* Dominant Live Search Input */}
            <div className="relative flex items-center bg-surface-container-low focus-within:bg-surface rounded-xl px-4 py-1 border border-[var(--color-border)] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-xs">
              <span className="material-symbols-outlined text-primary text-2xl mr-3 shrink-0">
                search
              </span>
              <input
                id="workspace-medicine-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="যেমন: Napa, নাপা, Paracetamol, প্যারাসিটামল, Square, Beximco..."
                className="w-full bg-transparent py-3 text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                  aria-label="অনুসন্ধান মুছুন"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>

            {/* Fast Quick Filter Tags */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-on-surface-variant">
              <span className="font-medium text-on-surface">{t("home.shortcutsLabel")}</span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  searchQuery === ""
                    ? "bg-primary text-on-primary border-primary font-semibold"
                    : "bg-surface-container-low border-[var(--color-border)] hover:bg-surface-container"
                }`}
              >
                {t("home.allMedicines")}
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery("ট্যাবলেট")}
                className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-[var(--color-border)] hover:bg-surface-container transition-all"
              >
                {t("home.tablet")}
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery("ক্যাপসুল")}
                className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-[var(--color-border)] hover:bg-surface-container transition-all"
              >
                {t("home.capsule")}
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery("সিরাপ")}
                className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-[var(--color-border)] hover:bg-surface-container transition-all"
              >
                {t("home.syrup")}
              </button>
            </div>
          </section>

          {/* Real Metrics Overview */}
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4" aria-label="পরিসংখ্যান">
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-[var(--color-border)] shadow-xs flex flex-col">
              <span className="text-xs text-on-surface-variant font-medium">
                মোট সংরক্ষিত ওষুধ
              </span>
              <span className="text-2xl font-bold text-on-surface mt-1">
                {isLoading ? "..." : toBengaliNumeral(totalCount)}
              </span>
              <span className="text-[11px] text-emerald-600 font-medium mt-0.5">
                রিয়েল ফায়ারস্টোর ডেটা
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest border border-[var(--color-border)] shadow-xs flex flex-col">
              <span className="text-xs text-on-surface-variant font-medium">
                প্রস্তুতকারক কোম্পানি
              </span>
              <span className="text-2xl font-bold text-on-surface mt-1">
                {isLoading ? "..." : toBengaliNumeral(uniqueCompanies)}
              </span>
              <span className="text-[11px] text-on-surface-variant mt-0.5">
                কোম্পানির তালিকা
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-surface-container-lowest border border-[var(--color-border)] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs text-on-surface-variant font-medium">
                  দ্রুত কার্যপ্রণালী
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <Link
                    href="/medicines"
                    className="flex-1 text-center py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
                  >
                    সম্পূর্ণ ডাটাবেস
                  </Link>
                  <Link
                    href="/whatsapp-share"
                    className="flex-1 text-center py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-700 transition-colors"
                  >
                    হোয়াটসঅ্যাপ
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Medicine List & Results */}
          <section className="flex flex-col gap-3" aria-label="ওষুধ তালিকা">
            {/* Header / Active status */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  {searchQuery ? "filter_list" : "history"}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  {searchQuery
                    ? `অনুসন্ধান ফলাফল (${toBengaliNumeral(filteredMedicines.length)}টি ওষুধ)`
                    : "সাম্প্রতিক সংরক্ষিত ওষুধ"}
                </h2>
              </div>
              <Link
                href="/medicines"
                className="text-xs sm:text-sm text-primary font-semibold hover:underline flex items-center gap-0.5"
              >
                <span>সব দেখুন</span>
                <span className="material-symbols-outlined text-base">
                  chevron_right
                </span>
              </Link>
            </div>

            {/* List Container */}
            {isLoading ? (
              /* Loading Skeletons */
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="p-4 rounded-xl bg-surface-container-lowest border border-[var(--color-border)] animate-pulse flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high" />
                      <div className="flex flex-col gap-1.5">
                        <div className="w-32 h-4 rounded bg-surface-container-high" />
                        <div className="w-24 h-3 rounded bg-surface-container" />
                      </div>
                    </div>
                    <div className="w-16 h-5 rounded bg-surface-container-high" />
                  </div>
                ))}
              </div>
            ) : !isAuthChecking && !isAuthAdmin ? (
              /* Signed Out State */
              <div className="p-8 sm:p-12 text-center rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] shadow-xs flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">lock</span>
                </div>
                <div className="max-w-md">
                  <h3 className="text-lg font-bold text-on-surface">
                    ব্যক্তিগত মেডিসিন ও মূল্য রেফারেন্স
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                    OushodBox একটি ব্যক্তিগত ওয়ার্কস্পেস। আপনার সংরক্ষিত ওষুধ ও মূল্য তালিকা দেখতে অ্যাডমিন অ্যাকাউন্টে সাইন ইন করুন।
                  </p>
                </div>
                <div className="flex items-center gap-2.5 mt-2 flex-wrap justify-center">
                  <Link
                    href="/public"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-sm font-semibold border border-[var(--color-border)] transition-all"
                  >
                    <span className="material-symbols-outlined text-base">list_alt</span>
                    <span>পাবলিক মূল্য তালিকা</span>
                  </Link>
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-dark transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-base">login</span>
                    <span>অ্যাডমিন লগইন</span>
                  </Link>
                </div>
              </div>
            ) : totalCount === 0 ? (
              /* Empty State when Database has Zero Medicines */
              <div className="p-8 sm:p-12 text-center rounded-2xl bg-surface-container-lowest border border-dashed border-[var(--color-border)] flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-outline">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    medication
                  </span>
                </div>
                <div className="max-w-md">
                  <h3 className="text-lg font-bold text-on-surface">
                    আপনার ওষুধ ডেটাবেস বর্তমানে খালি
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                    ওষুধের নাম, প্রস্তুতকারক কোম্পানি ও রেফারেন্স মূল্য তালিকা সহজে সংরক্ষণ করতে আপনার প্রথম ওষুধটি যুক্ত করুন।
                  </p>
                </div>
                {isAuthAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      if (userEmail) {
                        setIsAddModalOpen(true);
                      } else {
                        router.push("/admin");
                      }
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-dark transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    <span>প্রথম ওষুধ যোগ করুন</span>
                  </button>
                )}
              </div>
            ) : filteredMedicines.length === 0 ? (
              /* No Search Match State */
              <div className="p-8 text-center rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                  search_off
                </span>
                <p className="text-sm font-semibold text-on-surface">
                  &ldquo;{searchQuery}&rdquo; দিয়ে কোনো ওষুধ পাওয়া যায়নি
                </p>
                <p className="text-xs text-on-surface-variant">
                  বানান সঠিক কিনা যাচাই করুন অথবা অন্য নাম দিয়ে চেষ্টা করুন।
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                >
                  অনুসন্ধান ক্লিয়ার করুন
                </button>
              </div>
            ) : (
              /* Render Real Medicine Cards / Rows */
              <div className="flex flex-col gap-2.5">
                {filteredMedicines.slice(0, 10).map((med) => {
                  const strengthStr =
                    (med as any).strength || med.dosageBadge || "";
                  const isCapsule =
                    (med.dosageBadge || "").includes("ক্যাপসুল") ||
                    med.dosageForm === "capsule";
                  const isLiquid =
                    (med.dosageBadge || "").includes("সিরাপ") ||
                    med.dosageForm === "syrup";
                  const isInjection =
                    (med.dosageBadge || "").includes("ইনজেকশন") ||
                    med.dosageForm === "injection";

                  const badgeText = isInjection
                    ? "INJ"
                    : isLiquid
                    ? "SYR"
                    : isCapsule
                    ? "CAP"
                    : "TAB";

                  return (
                    <div
                      key={med.id}
                      className="group p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low border border-[var(--color-border)] transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      {/* Left: Icon + Info */}
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-high flex flex-col items-center justify-center shrink-0 text-primary font-bold text-xs">
                          <span>{badgeText}</span>
                          <span className="material-symbols-outlined text-sm -mt-0.5">
                            {isInjection
                              ? "vaccines"
                              : isLiquid
                              ? "water_drop"
                              : "medication"}
                          </span>
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              href={`/medicines/${med.id}`}
                              className="font-bold text-sm sm:text-base text-on-surface group-hover:text-primary transition-colors truncate"
                            >
                              {med.tradeName}
                            </Link>
                            {strengthStr && (
                              <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                                {strengthStr}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                            <span className="truncate">
                              {med.genericName || "জেনেরিক তথ্য নেই"}
                            </span>
                            <span className="text-outline/50">•</span>
                            <span className="font-medium text-on-surface/80 truncate">
                              {med.manufacturer || "অনির্ধারিত কোম্পানি"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Fast Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--color-border)]">
                        {/* Price Display */}
                        <div className="flex flex-col sm:items-end">
                          <span className="text-base font-bold text-primary leading-tight">
                            {med.unitPriceFormatted ||
                              `৳ ${med.unitPrice.toFixed(2)}`}
                          </span>
                          {med.packSize && (
                            <span className="text-[11px] text-on-surface-variant">
                              প্যাক: {med.packSize}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          {/* WhatsApp 1-tap Share */}
                          <button
                            type="button"
                            onClick={() => handleWhatsAppShare(med)}
                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                            title="হোয়াটসঅ্যাপে শেয়ার করুন"
                            aria-label={`${med.tradeName} হোয়াটসঅ্যাপে শেয়ার`}
                          >
                            <span className="material-symbols-outlined text-lg">
                              share
                            </span>
                          </button>

                          {/* View details */}
                          <Link
                            href={`/medicines/${med.id}`}
                            className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
                            title="বিস্তারিত বিবরণ"
                            aria-label={`${med.tradeName} বিস্তারিত`}
                          >
                            <span className="material-symbols-outlined text-lg">
                              visibility
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredMedicines.length > 10 && (
                  <Link
                    href="/medicines"
                    className="mt-2 py-2.5 text-center text-xs sm:text-sm font-semibold text-primary hover:bg-surface-container-low rounded-xl border border-[var(--color-border)] transition-colors"
                  >
                    আরও {toBengaliNumeral(filteredMedicines.length - 10)}টি ওষুধ দেখতে ডেটাবেসে যান
                  </Link>
                )}
              </div>
            )}
          </section>
        </main>

        {/* Minimal Footer */}
        <footer className="hidden lg:block w-full bg-surface-container-lowest py-3 px-margin border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between text-xs text-on-surface-variant max-w-7xl mx-auto">
            <p>
              ঔষধBox — ব্যক্তিগত মেডিসিন রেফারেন্স ও মূল্য তালিকা ওয়ার্কস্পেস
            </p>
            <div className="flex items-center gap-3">
              <span>{isOnline ? "ক্লাউড সিঙ্ক সক্রিয়" : "অফলাইন মোড"}</span>
              {isAuthAdmin && (
                <>
                  <span>•</span>
                  <Link href="/admin" className="hover:text-primary font-medium">
                    অ্যাডমিন কনসোল
                  </Link>
                </>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* Quick Add Medicine Modal (admin only) */}
      {isAuthAdmin && (
        <AdminAddMedicineModal
          isOpen={isAddModalOpen}
          onClose={() => {
            if (!isSubmitting) setIsAddModalOpen(false);
          }}
          onSave={handleSaveMedicine}
          editingMedicine={null}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
