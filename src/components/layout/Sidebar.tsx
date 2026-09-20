"use client";

/**
 * Sidebar — Desktop left navigation rail (lg+ only)
 * Preserved from Stitch home_dashboard design.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "home", labelBn: "হোম ড্যাশবোর্ড" },
  { href: "/medicines", icon: "medication", labelBn: "ঔষধ ডেটাবেজ" },
  { href: "/whatsapp-share", icon: "send_to_mobile", labelBn: "হোয়াটসঅ্যাপ শেয়ার" },
  { href: "/admin", icon: "admin_panel_settings", labelBn: "সিস্টেম অ্যাডমিন" },
  { href: "#", icon: "warning", labelBn: "স্টক সতর্কতা" },
  { href: "#", icon: "verified_user", labelBn: "DGDA নিউজ" },
  { href: "/upcoming", icon: "download_for_offline", labelBn: "PWA ইন্সটল" },
];

const bottomNavItems = [
  { href: "#", icon: "settings", labelBn: "সেটিংস" },
  { href: "#", icon: "person", labelBn: "প্রোফাইল" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-surface-container-lowest border-r border-[var(--color-border)] min-h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-space-sm px-space-lg py-5 border-b border-[var(--color-border)]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)" }}
        >
          Rx
        </div>
        <div>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            ঔষধBox
          </span>
          <p className="text-[10px] text-on-surface-variant leading-tight">
            ফার্মাসিস্ট ম্যানেজমেন্ট
          </p>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-space-sm py-space-md flex flex-col gap-1 overflow-y-auto" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.href !== "#" && pathname.startsWith(item.href);

          return (
            <Link
              key={item.href + item.labelBn}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-md text-label-md transition-all
                ${isActive
                  ? "bg-primary text-on-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.labelBn}</span>
            </Link>
          );
        })}
      </nav>


      {/* Bottom nav items */}
      <div className="px-space-sm py-space-md border-t border-[var(--color-border)] flex flex-col gap-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href + item.labelBn}
            href={item.href}
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.labelBn}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
