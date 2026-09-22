"use client";

/**
 * MobileBottomNav — Fixed bottom navigation for mobile (lg:hidden)
 * Preserved from Stitch home_dashboard design.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthorizedAdmin } from "@/lib/auth/admin";
import { subscribeToAuthChanges } from "@/lib/auth";

const allNavItems = [
  { href: "/", icon: "home", labelBn: "হোম" },
  { href: "/medicines", icon: "medication", labelBn: "ওষুধ" },
  { href: "/whatsapp-share", icon: "share", labelBn: "শেয়ার" },
  { href: "/admin", icon: "admin_panel_settings", labelBn: "অ্যাডমিন", adminOnly: true },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setIsAuthAdmin(isAuthorizedAdmin(user));
    });
    return () => unsubscribe();
  }, []);

  const navItems = allNavItems.filter((item) => !item.adminOnly || isAuthAdmin);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-xl z-50 px-3 flex items-center justify-around safe-bottom border-t border-[var(--color-border)] shadow-sm"
      aria-label="Mobile navigation"
    >
      {navItems.map((item, idx) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={`mobile-nav-${item.href}-${idx}`}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors ${
              isActive
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-[11px] font-medium leading-none">{item.labelBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}
