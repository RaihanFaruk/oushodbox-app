/**
 * ঔষধBox — Application Constants
 * Centralizes route paths, navigation config, and other app-wide constants.
 */

import type { NavItem } from "@/types";

// ---- Routes ---------------------------------------------------------

export const ROUTES = {
  HOME: "/",
  MEDICINES: "/medicines",
  MEDICINE_DETAIL: (id: string) => `/medicines/${id}`,
  ADMIN: "/admin",
  PROFILE: "/profile",
  UPCOMING: "/upcoming",
} as const;

// ---- Navigation -----------------------------------------------------

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    labelBn: "হোম",
    href: ROUTES.HOME,
    icon: "home",
  },
  {
    label: "Medicines",
    labelBn: "ঔষধ",
    href: ROUTES.MEDICINES,
    icon: "medication",
  },
  {
    label: "Admin",
    labelBn: "অ্যাডমিন",
    href: ROUTES.ADMIN,
    icon: "admin_panel_settings",
  },
  {
    label: "Profile",
    labelBn: "প্রোফাইল",
    href: ROUTES.PROFILE,
    icon: "person",
  },
];

// ---- Brand ----------------------------------------------------------

export const APP_NAME = "ঔষধBox";
export const APP_NAME_EN = "OushodhBox";
export const APP_TAGLINE_BN = "ফার্মাসিস্ট ম্যানেজমেন্ট প্ল্যাটফর্ম";
