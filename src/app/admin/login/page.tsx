"use client";

/**
 * Admin Login Page — /admin/login
 * Firebase Email/Password Authentication with Bengali UX & Material 3 styling
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithEmail, subscribeToAuthChanges, getAuthErrorMessage } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        router.replace("/admin");
      } else {
        setIsCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("অনুগ্রহ করে আপনার ইমেইল প্রদান করুন।");
      return;
    }
    if (!password) {
      setErrorMessage("অনুগ্রহ করে আপনার পাসওয়ার্ড প্রদান করুন।");
      return;
    }

    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
      router.replace("/admin");
    } catch (err: any) {
      const code = err?.code || "";
      setErrorMessage(getAuthErrorMessage(code));
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas text-on-surface">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">
            নিরাপত্তা যাচাই করা হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas p-space-md lg:p-margin">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl border border-[var(--color-border)] p-space-lg lg:p-space-xl flex flex-col gap-space-lg animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-on-primary shadow-md">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface mt-2">
            অ্যাডমিন লগইন
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            ঔষধBox সেন্ট্রাল কন্ট্রোল প্যানেলে প্রবেশ করুন
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="p-space-sm rounded-xl bg-error/10 border border-error/20 text-error font-body-sm text-body-sm flex items-start gap-2 animate-in slide-in-from-top duration-200"
          >
            <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">
              error
            </span>
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-email"
              className="font-label-md text-label-md font-semibold text-on-surface"
            >
              ইমেইল অ্যাড্রেস
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl pointer-events-none">
                mail
              </span>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@oushodbox.com"
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-[var(--color-border)] transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-password"
              className="font-label-md text-label-md font-semibold text-on-surface"
            >
              পাসওয়ার্ড
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl pointer-events-none">
                lock
              </span>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isLoading}
                className="w-full pl-11 pr-11 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-[var(--color-border)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors p-1"
                aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 py-3 px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-md hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-xl animate-spin">
                  progress_activity
                </span>
                <span>লগইন হচ্ছে...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">login</span>
                <span>লগইন করুন</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Back to App */}
        <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>মূল প্ল্যাটফর্মে ফিরুন</span>
          </Link>

          <span className="text-xs text-on-surface-variant/80">
            Firebase Auth Protected
          </span>
        </div>
      </div>
    </div>
  );
}
