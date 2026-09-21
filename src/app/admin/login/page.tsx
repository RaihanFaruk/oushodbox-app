"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  loginWithGoogle,
  loginWithEmail,
  logout,
  subscribeToAuthChanges,
  isAuthorizedAdmin,
  ADMIN_EMAIL,
  getAuthErrorMessage,
} from "@/lib/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setErrorMessage("This account is not authorized.");
    }
  }, [searchParams]);

  // If already authenticated as admin, redirect to /admin
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user && isAuthorizedAdmin(user)) {
        router.replace("/admin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);
    try {
      const user = await loginWithGoogle();
      if (user.email !== ADMIN_EMAIL) {
        await logout();
        setErrorMessage("This account is not authorized.");
        return;
      }
      router.replace("/admin");
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setErrorMessage(getAuthErrorMessage(err?.code || ""));
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const user = await loginWithEmail(email, password);
      if (user.email !== ADMIN_EMAIL) {
        await logout();
        setErrorMessage("This account is not authorized.");
        return;
      }
      router.replace("/admin");
    } catch (err: any) {
      setErrorMessage(getAuthErrorMessage(err?.code || ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] shadow-lg flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm"
          style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)" }}
        >
          Rx
        </div>
        <h1 className="text-xl font-bold text-on-surface">অ্যাডমিন লগইন</h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          OushodBox প্রাইভেট ম্যানেজমেন্ট কনসোল
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs sm:text-sm flex items-start gap-2 animate-in fade-in"
        >
          <span className="material-symbols-outlined text-base shrink-0 mt-0.5">error</span>
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Google 1-Click Sign-in */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isLoading}
        className="w-full py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-sm font-semibold border border-[var(--color-border)] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xs disabled:opacity-50"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
        <span>Google দিয়ে সাইন ইন</span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-[11px] text-on-surface-variant uppercase font-medium">
          অথবা ইমেইল/পাসওয়ার্ড
        </span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* Email/Password Fallback */}
      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <Input
          label="অ্যাডমিন ইমেইল"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          leftIcon={<span className="material-symbols-outlined text-base">mail</span>}
        />

        <Input
          label="পাসওয়ার্ড"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          leftIcon={<span className="material-symbols-outlined text-base">lock</span>}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full mt-1"
        >
          লগইন করুন
        </Button>
      </form>

      {/* Back to Home Link */}
      <div className="text-center pt-1 border-t border-[var(--color-border)]">
        <Link
          href="/"
          className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>মূল পাতায় ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <span className="material-symbols-outlined text-3xl text-primary animate-spin">
              progress_activity
            </span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
