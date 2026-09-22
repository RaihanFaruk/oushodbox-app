"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [monograph, setMonograph] = useState<MedicineMonograph | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setHasMounted(true);
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
        // Not authenticated — redirect non-admin visitors immediately to /public
        setMonograph(null);
        setIsLoading(false);
        router.replace("/public");
      }
    });

    return () => unsubscribe();
  }, [id, router]);

  if (!hasMounted || isAuthChecking || isLoading) {
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

  // If not authenticated admin, redirect already initiated via router.replace("/public")
  if (!isAuthenticated) {
    return null;
  }

  if (notFound || !monograph) {
    return <MedicineNotFound id={id} />;
  }

  return <MedicineDetailsClient monograph={monograph} />;
}
