"use client";

/**
 * Sidebar — Desktop left navigation rail (lg+ only)
 * Preserved from Stitch home_dashboard design.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_EMAIL } from "@/lib/auth/admin";
import { t } from "@/lib/i18n";

const navItems = [
  { href: "/", icon: "home", labelBn: "হোম ড্যাশবোর্ড" },
  { href: "/medicines", icon: "medication", labelBn: "ঔষধ ডেটাবেজ" },
  { href: "/whatsapp-share", icon: "share", labelBn: "হোয়াটসঅ্যাপ শেয়ার" },
  { href: "/admin", icon: "admin_panel_settings", labelBn: "অ্যাডমিন প্যানেল" },
  { href: "/upcoming", icon: "offline_pin", labelBn: "অফলাইন ও PWA" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[250px] shrink-0 flex-col bg-surface border-r border-[var(--color-border)] min-h-screen sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)]">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
          Rx
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-on-surface">
            {t("common.appName")}
          </span>
          <span className="text-[11px] text-on-surface-variant leading-tight">
            মেডিসিন ওয়ার্কস্পেস
          </span>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.labelBn}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom workspace status */}
      <div className="p-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-low border border-[var(--color-border)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-on-surface truncate">
              {ADMIN_EMAIL}
            </span>
            <span className="text-[10px] text-on-surface-variant">
              {t("admin.privateWorkspaceBadge")}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
