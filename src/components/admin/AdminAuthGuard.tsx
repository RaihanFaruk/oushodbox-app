"use client";

/**
 * AdminAuthGuard — Protects /admin routes with Firebase onAuthStateChanged
 * Redirects unauthenticated users to /admin/login.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subscribeToAuthChanges, type User } from "@/lib/auth";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setCurrentUser(user);
        setIsChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isChecking || !currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">
            অ্যাডমিন অথেন্টিকেশন যাচাই করা হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
