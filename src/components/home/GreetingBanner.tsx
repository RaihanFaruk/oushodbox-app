"use client";

/**
 * GreetingBanner — Section 1: Pharmacist greeting + live sync badge + PWA button
 * Preserved from Stitch home_dashboard Section 1.
 */

import { DEMO_PHARMACIST } from "@/lib/mock-data";
import { triggerPwaInstall, getGreeting } from "@/lib/utils";
import Image from "next/image";

export default function GreetingBanner() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md lg:p-space-lg shadow-sm">
      {/* Decorative blurred circle */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: "var(--color-primary)", opacity: 0.05, filter: "blur(48px)" }} />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md relative z-10">
        {/* Left: Avatar + Name */}
        <div className="flex items-start sm:items-center gap-space-md">
          <div className="relative shrink-0">
            <Image
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm"
              src={DEMO_PHARMACIST.avatarUrl}
              alt="Demo pharmacist avatar"
              width={64}
              height={64}
              unoptimized
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center text-[10px]">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                verified
              </span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                {getGreeting()} {DEMO_PHARMACIST.name}
              </span>
              <span className="font-label-lg text-label-lg text-primary font-semibold">
                {DEMO_PHARMACIST.role}
              </span>
              <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                নিবন্ধন নং: {DEMO_PHARMACIST.registrationNo} ({DEMO_PHARMACIST.grade})
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              {DEMO_PHARMACIST.welcomeText}
            </p>
          </div>
        </div>

        {/* Right: Live Sync badge + PWA Install button */}
        <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm self-start lg:self-center">
          {/* Live sync indicator */}
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary" />
            </span>
            <span className="font-semibold text-tertiary">{DEMO_PHARMACIST.syncLabel}</span>
            <span className="text-outline">•</span>
            <span className="text-on-surface-variant">{DEMO_PHARMACIST.syncDetail}</span>
          </div>

          {/* PWA Install button */}
          <button
            type="button"
            onClick={triggerPwaInstall}
            className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm hover:opacity-90 transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              install_mobile
            </span>
            <span>PWA ইন্সটল করুন</span>
          </button>
        </div>
      </div>
    </section>
  );
}
