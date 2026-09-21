/**
 * Firebase Authentication Service for ঔষধBox (OushodBox)
 * Handles Email/Password authentication and session subscription.
 */

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export type { User, Unsubscribe };

/**
 * Sign in with email and password.
 * Passwords are never stored in client storage.
 */
export async function loginWithEmail(email: string, password: string):Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return userCredential.user;
}

/**
 * Sign out current user.
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * Subscribe to Firebase authentication state changes.
 */
export function subscribeToAuthChanges(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get current authenticated user synchronously if already resolved.
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Map Firebase Auth error codes into clear Bengali messages.
 */
export function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। অনুগ্রহ করে যাচাই করুন।";
    case "auth/invalid-email":
      return "প্রদত্ত ইমেইল ঠিকানাটির ফরম্যাট সঠিক নয়।";
    case "auth/user-disabled":
      return "এই অ্যাডমিন অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে।";
    case "auth/too-many-requests":
      return "একাধিকবার ব্যর্থ চেষ্টার কারণে অ্যাকাউন্ট সাময়িকভাবে স্থগিত করা হয়েছে। কিছুক্ষণ পর পুনরায় চেষ্টা করুন।";
    case "auth/network-request-failed":
      return "ইন্টারনেট সংযোগ বিচ্ছিন্ন অথবা ধীরগতির। নেটওয়ার্ক চেক করুন।";
    case "auth/internal-error":
      return "অভ্যন্তরীণ সার্ভার ত্রুটি। কিছু সময় পর চেষ্টা করুন।";
    default:
      return "লগইন সম্পন্ন করা সম্ভব হয়নি। পুনরায় চেষ্টা করুন।";
  }
}
