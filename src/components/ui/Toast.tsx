"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

/**
 * Maps Firestore errors into human-readable Bengali messages.
 */
export function getFirestoreErrorMessage(err: any): string {
  if (!err) return "একটি ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।";

  const code = err?.code || "";
  const msg = err?.message || "";

  if (code.includes("permission-denied") || msg.includes("permission-denied") || msg.includes("Missing or insufficient permissions")) {
    return "অনুমতি নেই — শুধুমাত্র অনুমোদিত অ্যাডমিন পরিবর্তন করতে পারবেন।";
  }
  if (code.includes("unauthenticated") || msg.includes("unauthenticated")) {
    return "সেশন মেয়াদোত্তীর্ণ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।";
  }
  if (code.includes("unavailable") || msg.includes("unavailable")) {
    return "সার্ভারের সাথে সংযোগ বিচ্ছিন্ন। ইন্টারনেট সংযোগ পরীক্ষা করুন।";
  }
  if (code.includes("not-found") || msg.includes("not-found")) {
    return "অনুরোধকৃত তথ্য খুঁজে পাওয়া যায়নি।";
  }

  return "অপারেশনটি সম্পন্ন করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।";
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, message, type };

      setToasts((prev) => [...prev.slice(-2), newToast]); // keep at most 3

      const timer = setTimeout(() => {
        removeToast(id);
      }, 3500);

      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string) => showToast(message, "success"),
    [showToast]
  );

  const error = useCallback(
    (message: string) => showToast(message, "error"),
    [showToast]
  );

  const info = useCallback(
    (message: string) => showToast(message, "info"),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}

      {/* Global Toast Container */}
      <div
        role="region"
        aria-label="বিজ্ঞপ্তি"
        className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          return (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-lg border text-xs sm:text-sm font-medium transition-all animate-in fade-in slide-in-from-bottom-2 ${
                isSuccess
                  ? "bg-emerald-950 text-emerald-100 border-emerald-800"
                  : isError
                  ? "bg-rose-950 text-rose-100 border-rose-800"
                  : "bg-surface-container-highest text-on-surface border-[var(--color-border)]"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`material-symbols-outlined text-lg shrink-0 ${
                    isSuccess
                      ? "text-emerald-400"
                      : isError
                      ? "text-rose-400"
                      : "text-primary"
                  }`}
                >
                  {isSuccess ? "check_circle" : isError ? "error" : "info"}
                </span>
                <span className="truncate">{toast.message}</span>
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity shrink-0"
                aria-label="বন্ধ করুন"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
