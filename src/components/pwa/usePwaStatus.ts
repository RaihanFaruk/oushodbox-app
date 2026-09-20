"use client";

/**
 * usePwaStatus — Comprehensive hook for real browser PWA & offline detection
 */

import { useState, useEffect, useCallback } from "react";
import { processSyncQueue, type SyncStatus } from "@/lib/pwa/sync";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function usePwaStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [swSupported, setSwSupported] = useState<boolean>(false);
  const [swActive, setSwActive] = useState<boolean>(false);
  const [cacheSupported, setCacheSupported] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);

  const [pushSupported, setPushSupported] = useState<boolean>(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | "unsupported">("unsupported");

  // Initialize browser-only state
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Online / Offline status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      processSyncQueue().then(setSyncStatus);
    };

    const handleOffline = () => {
      setIsOnline(false);
      processSyncQueue().then(setSyncStatus);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 2. Service Worker detection
    const isSwSupported = "serviceWorker" in navigator;
    setSwSupported(isSwSupported);

    if (isSwSupported) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        setSwActive(!!reg?.active || !!navigator.serviceWorker.controller);
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setSwActive(true);
      });
    }

    // 3. Cache API detection
    setCacheSupported("caches" in window);

    // 4. Push notification detection
    const isPushSupported = "Notification" in window && "PushManager" in window;
    setPushSupported(isPushSupported);
    if (isPushSupported) {
      setPushPermission(Notification.permission);
    }

    // 5. Install prompt detection (Chrome, Edge, Android WebAPK)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Initial sync queue check
    processSyncQueue().then(setSyncStatus);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Real install prompt trigger
  const promptInstall = useCallback(async (): Promise<"accepted" | "dismissed" | "unavailable"> => {
    if (!deferredPrompt) {
      return "unavailable";
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return choice.outcome;
    } catch (err) {
      console.warn("[PWA] Install prompt error:", err);
      return "unavailable";
    }
  }, [deferredPrompt]);

  return {
    isOnline,
    isOffline: !isOnline,
    serviceWorkerSupported: swSupported,
    serviceWorkerActive: swActive,
    cacheStorageAvailable: cacheSupported,
    cacheVersion: "OUSHODBOX_STATIC_V1",
    pushSupported,
    pushPermission,
    pushReady: false, // Honest: No push backend/VAPID connected yet
    installAvailable: !!deferredPrompt,
    promptInstall,
    syncStatus,
  };
}
