"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import MedicineDetailsClient from "@/components/medicine/MedicineDetailsClient";
import MedicineNotFound from "@/components/medicine/MedicineNotFound";
import { getMedicineById, buildMonographFromMedicine } from "@/lib/firestore/medicines";
import { getMedicines as getCachedMedicines } from "@/lib/pwa/db";
import { subscribeToAuthChanges, isAuthorizedAdmin } from "@/lib/auth";
import type { MedicineMonograph } from "@/types";

interface MedicineDetailContainerProps {
  id: string;
}

export default function MedicineDetailContainer({ id }: MedicineDetailContainerProps) {
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [monograph, setMonograph] = useState<MedicineMonograph | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      const authorized = isAuthorizedAdmin(user);
      setIsAuthenticated(authorized);
      setIsAuthChecking(false);

      if (authorized) {
        setIsLoading(true);
        try {
          const med = await getMedicineById(id);
          if (med) {
            setMonograph(buildMonographFromMedicine(med));
            setNotFound(false);
          } else {
            // Check cache
            const cached = await getCachedMedicines();
            const match = cached.find((m) => m.id === id);
            if (match) {
              setMonograph(buildMonographFromMedicine(match));
              setNotFound(false);
            } else {
              setNotFound(true);
            }
          }
        } catch {
          // Offline fallback
          try {
            const cached = await getCachedMedicines();
            const match = cached.find((m) => m.id === id);
            if (match) {
              setMonograph(buildMonographFromMedicine(match));
              setNotFound(false);
            } else {
              setNotFound(true);
            }
          } catch {
            setNotFound(true);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // Not authenticated — strictly block cached medicine access for signed-out sessions
        setMonograph(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [id]);

  if (isAuthChecking || isLoading) {
    return (
      <div className="flex min-h-screen bg-surface">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-primary animate-spin">
              progress_activity
            </span>
            <span className="text-sm text-on-surface-variant font-medium">
              ওষুধের তথ্য লোড হচ্ছে...
            </span>
          </div>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  // If signed out, strictly show clean signed-out state — never show cached medicine data
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-surface font-body-md text-body-md text-on-surface">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
          <main className="flex-1 p-space-md lg:p-margin flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
            <div className="p-8 rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] shadow-sm flex flex-col items-center w-full">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-3xl">lock</span>
              </div>
              <h1 className="text-xl font-bold text-on-surface">
                ব্যক্তিগত ওষুধ বিবরণ
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                এই ওষুধের বিস্তারিত বিবরণ ও রেফারেন্স মূল্য দেখতে অনুগ্রহ করে অ্যাডমিন অ্যাকাউন্টে লগইন করুন।
              </p>
              <Link
                href="/admin/login"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-dark transition-all"
              >
                <span className="material-symbols-outlined text-lg">login</span>
                <span>লগইন করুন</span>
              </Link>
            </div>
          </main>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  if (notFound || !monograph) {
    return <MedicineNotFound id={id} />;
  }

  return <MedicineDetailsClient monograph={monograph} />;
}
