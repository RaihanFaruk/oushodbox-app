"use client";

/**
 * AdminAuthGuard — Secure access control for /admin
 * Strictly limits access to the designated admin: mehj49966@gmail.com
 * Immediately redirects unauthenticated visits to /admin/login.
 * Signs out and rejects any user whose email !== the admin email.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  subscribeToAuthChanges,
  logout,
  ADMIN_EMAIL,
  type User,
} from "@/lib/auth";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setIsChecking(false);
        router.replace("/admin/login");
        return;
      }

      if (user.email !== ADMIN_EMAIL) {
        await logout();
        setCurrentUser(null);
        setIsChecking(false);
        router.replace("/admin/login?error=unauthorized");
        return;
      }

      setCurrentUser(user);
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">
            নিরাপত্তা ও সেশন যাচাই করা হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  // Not authorized or not signed in — redirect is in progress
  if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
    return null;
  }

  return <>{children}</>;
}
