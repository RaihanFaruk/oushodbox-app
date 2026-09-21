"use client";

/**
 * PwaRegistration — Client component to safely register Service Worker & seed IndexedDB
 */

import { useEffect } from "react";
import { clearOldDemoCacheIfNeeded } from "@/lib/pwa/db";

export default function PwaRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 0. Safe one-time purge of legacy demo cache from IndexedDB
    clearOldDemoCacheIfNeeded().catch((err) => {
      console.warn("[PWA] Demo cache cleanup warning:", err);
    });

    // 1. Register Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[PWA] Service Worker registered with scope:", registration.scope);

            // Handle updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (
                    installingWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    console.log("[PWA] New content is available; please refresh.");
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.warn("[PWA] Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return null;
}
