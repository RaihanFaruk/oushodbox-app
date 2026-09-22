/**
 * Admin identity module for OushodBox.
 * Central source of truth for the administrator account.
 */

export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "mehj49966@gmail.com";

import type { User } from "firebase/auth";

/**
 * Check whether a given email address matches the designated administrator email.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();
}

/**
 * Check whether a given Firebase User is the authorized administrator.
 */
export function isAuthorizedAdmin(user: User | null | undefined): boolean {
  if (!user || !user.email) return false;
  return isAdminEmail(user.email);
}

