"use client";

/**
 * MobileBottomNav — Fixed bottom navigation for mobile (lg:hidden)
 * Preserved from Stitch home_dashboard design.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "home", labelBn: "হোম", path: "/" },
  { href: "/medicines", icon: "medication", labelBn: "ঔষধ", path: "/medicines" },
  { href: "/whatsapp-share", icon: "share", labelBn: "শেয়ার", path: "share" },
  { href: "#", icon: "notifications", labelBn: "নোটিফিকেশন", path: "notifications", badge: 3 },
  { href: "#", icon: "person", labelBn: "প্রোফাইল", path: "profile" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-xl z-50 px-space-sm flex items-center justify-around safe-bottom"
      style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.05)" }}
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => {
        const isActive = item.href !== "#" && pathname === item.href;
        return (
          <Link
            key={item.labelBn}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] transition-colors
              ${isActive
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {item.icon}
            </span>
            {item.badge && (
              <span
                className="absolute top-0 right-0 w-3.5 h-3.5 bg-error text-on-error rounded-full text-[9px] flex items-center justify-center font-bold"
                aria-label={`${item.badge} notifications`}
              >
                {item.badge}
              </span>
            )}
            <span className="font-label-sm text-label-sm">{item.labelBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}
