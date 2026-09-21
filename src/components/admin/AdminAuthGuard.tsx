"use client";

/**
 * AdminAuthGuard — Secure access control for /admin
 * Strictly limits access to the designated admin: mehj49966@gmail.com
 * Handles automatic session recovery, passwordless Google auth, and in-place unlock.
 * Completely eliminates public /admin/login route.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  subscribeToAuthChanges,
  isAuthorizedAdmin,
  loginWithGoogle,
  loginWithEmail,
  logout,
  getAuthErrorMessage,
  ADMIN_EMAIL,
  type User,
} from "@/lib/auth";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleAuth = async () => {
    setIsAuthenticating(true);
    setErrorMessage(null);
    try {
      const user = await loginWithGoogle();
      if (user.email !== ADMIN_EMAIL) {
        await logout();
        setErrorMessage(`অননুমোদিত অ্যাকাউন্ট (${user.email})। শুধুমাত্র ${ADMIN_EMAIL} প্রবেশ করতে পারবেন।`);
      }
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setErrorMessage(getAuthErrorMessage(err?.code || ""));
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || isAuthenticating) return;

    setIsAuthenticating(true);
    setErrorMessage(null);
    try {
      const user = await loginWithEmail(ADMIN_EMAIL, password);
      if (user.email !== ADMIN_EMAIL) {
        await logout();
        setErrorMessage(`অননুমোদিত অ্যাকাউন্ট। শুধুমাত্র ${ADMIN_EMAIL} প্রবেশ করতে পারবেন।`);
      }
    } catch (err: any) {
      setErrorMessage(getAuthErrorMessage(err?.code || ""));
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setErrorMessage(null);
    } catch (err) {
      console.error("[AdminAuthGuard] Sign out error:", err);
    }
  };

  // 1. Initial Auth Check (Loading State)
  if (isChecking) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">
            অ্যাডমিন নিরাপত্তা ও সেশন যাচাই করা হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  // 2. User is signed in with an unauthorized email address
  if (currentUser && !isAuthorizedAdmin(currentUser)) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-surface p-space-md">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-lg border border-error/20 p-space-xl flex flex-col items-center text-center gap-space-md animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
            <span className="material-symbols-outlined text-4xl">gpp_bad</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-error/10 text-error font-label-sm text-label-sm font-bold uppercase tracking-wider">
            Access Denied
          </span>

          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            অননুমোদিত প্রবেশাধিকার
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            আপনার বর্তমান অ্যাকাউন্ট (<span className="font-mono font-semibold text-error">{currentUser.email || "অজানা"}</span>)
            এই অ্যাডমিন প্যানেলে প্রবেশের জন্য অনুমোদিত নয়। শুধুমাত্র <span className="font-mono font-semibold text-primary">{ADMIN_EMAIL}</span> প্রবেশ করতে পারবেন।
          </p>

          <div className="flex flex-col sm:flex-row gap-space-sm w-full mt-2">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex-1 py-2.5 px-space-md rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md font-semibold cursor-pointer"
            >
              লগআউট করুন
            </button>
            <Link
              href="/"
              className="flex-1 py-2.5 px-space-md rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-label-md font-semibold text-center flex items-center justify-center"
            >
              মূল পেজে ফিরুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. User is unauthenticated (Restricted Admin Authorization Screen — In-Place, No /admin/login Page)
  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-surface p-space-md">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl border border-[var(--color-border)] p-space-lg lg:p-space-xl flex flex-col gap-space-md animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-on-primary shadow-md">
              <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-xs text-xs font-semibold">
              সুরক্ষিত অ্যাডমিন কন্ট্রোল
            </span>
            <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">
              অ্যাডমিন অ্যাক্সেস যাচাই
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              এই কন্ট্রোল প্যানেল শুধুমাত্র নির্ধারিত প্রশাসক (<strong className="text-on-surface">{ADMIN_EMAIL}</strong>) এর জন্য সংরক্ষিত।
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div
              role="alert"
              className="p-space-sm rounded-xl bg-error/10 border border-error/20 text-error font-body-sm text-body-sm flex items-start gap-2 animate-in slide-in-from-top duration-200"
            >
              <span className="material-symbols-outlined text-base shrink-0 mt-0.5">error</span>
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Auth Options */}
          <div className="flex flex-col gap-space-sm mt-1">
            {/* 1-Click Google Passwordless Sign In */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isAuthenticating}
              className="w-full py-3 px-space-md rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold border border-[var(--color-border)] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google দিয়ে প্রবেশ করুন (Passwordless)</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[var(--color-border)]"></div>
              <span className="flex-shrink mx-3 text-xs text-on-surface-variant/70 font-medium">অথবা</span>
              <div className="flex-grow border-t border-[var(--color-border)]"></div>
            </div>

            {/* In-Place Password Unlock Modal/Form */}
            {!showPasswordInput ? (
              <button
                type="button"
                onClick={() => setShowPasswordInput(true)}
                className="w-full py-2.5 px-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md font-medium border border-dashed border-[var(--color-border)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">lock</span>
                <span>মাস্টার পাসওয়ার্ড দিয়ে আনলক করুন</span>
              </button>
            ) : (
              <form onSubmit={handlePasswordAuth} className="flex flex-col gap-space-sm animate-in fade-in duration-200">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-lg pointer-events-none">
                    lock
                  </span>
                  <input
                    type={showPasswordText ? "text" : "password"}
                    required
                    autoFocus
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="অ্যাডমিন পাসওয়ার্ড..."
                    disabled={isAuthenticating}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 border border-[var(--color-border)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText((p) => !p)}
                    className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1"
                    aria-label={showPasswordText ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPasswordText ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isAuthenticating || !password}
                    className="flex-1 py-2.5 px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isAuthenticating ? (
                      <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-base">vpn_key</span>
                    )}
                    <span>আনলক করুন</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordInput(false);
                      setPassword("");
                      setErrorMessage(null);
                    }}
                    className="px-3 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container-high transition-colors"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Back Link */}
          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>মূল প্ল্যাটফর্মে ফিরুন</span>
            </Link>
            <span>Firebase Security Rules Protected</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authorized Admin is Verified -> Render Admin Panel
  return <>{children}</>;
}
