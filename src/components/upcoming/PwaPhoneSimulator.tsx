"use client";

/**
 * PwaPhoneSimulator — Pixel-perfect smartphone hardware frame with offline UI simulator
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

interface PwaPhoneSimulatorProps {
  onInstallClick?: () => void;
}

export default function PwaPhoneSimulator({
  onInstallClick,
}: PwaPhoneSimulatorProps) {
  return (
    <div className="lg:col-span-5 flex justify-center py-2">
      {/* Smartphone Outer Hardware Bezel */}
      <div className="relative w-72 sm:w-80 rounded-[2.5rem] bg-inverse-surface p-3 shadow-2xl">
        {/* Hardware Camera Notch Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-on-surface rounded-full z-30 pointer-events-none" />

        {/* Smartphone Screen Glass */}
        <div className="relative rounded-[2rem] bg-surface overflow-hidden flex flex-col h-[520px] select-none border border-[var(--color-border)]">
          {/* Simulated Mobile Status & App Bar */}
          <div className="bg-primary text-on-primary pt-6 pb-3 px-space-md flex flex-col gap-2">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-xs opacity-80 pt-1">
              <span>০৯:৪১</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">wifi</span>
                <span className="material-symbols-outlined text-sm">battery_full</span>
              </div>
            </div>

            {/* App Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">medication</span>
                <span className="font-headline-sm text-headline-sm font-bold">
                  ঔষধBox PWA
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                Offline OK
              </span>
            </div>
          </div>

          {/* Simulated App Screen Scroll Content */}
          <div className="flex-1 p-space-sm flex flex-col gap-space-sm overflow-y-auto">
            {/* Simulated Search Bar */}
            <div className="flex items-center gap-2 px-space-sm py-2 rounded-lg bg-surface-container-lowest shadow-sm text-on-surface-variant font-body-sm text-body-sm border border-[var(--color-border)]">
              <span className="material-symbols-outlined text-primary text-lg">search</span>
              <span>নাপা, সারজেল বা জেনেরিক...</span>
            </div>

            {/* Medicine Card 1: Napa Extra */}
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex flex-col gap-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface leading-tight">
                    Napa Extra 500mg
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Paracetamol + Caffeine
                  </p>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-medium">
                  ট্যাবলেট
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-[var(--color-border)]">
                <span>Beximco Pharma</span>
                <span className="font-bold text-primary">৳ ২.৫০ / পিস</span>
              </div>
            </div>

            {/* Medicine Card 2: Sergel 20mg */}
            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-[var(--color-border)] flex flex-col gap-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface leading-tight">
                    Sergel 20mg
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Esomeprazole Magnesium
                  </p>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-medium">
                  ক্যাপসুল
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-[var(--color-border)]">
                <span>Healthcare Pharma</span>
                <span className="font-bold text-primary">৳ ৭.০০ / পিস</span>
              </div>
            </div>

            {/* Simulator In-App PWA Install Banner */}
            <div className="p-space-sm rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-between gap-2 mt-auto">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-secondary text-lg shrink-0">
                  add_to_home_screen
                </span>
                <span className="font-label-sm text-label-sm text-secondary truncate font-medium">
                  হোম স্ক্রিনে আইকন রাখুন
                </span>
              </div>
              <button
                onClick={onInstallClick}
                className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                type="button"
              >
                যোগ করুন
              </button>
            </div>
          </div>

          {/* Simulated Mobile Bottom Navigation Bar */}
          <div className="bg-surface-container-lowest py-2 px-3 flex items-center justify-around shadow-inner border-t border-[var(--color-border)]">
            <div className="flex flex-col items-center text-primary">
              <span className="material-symbols-outlined text-lg">home</span>
              <span className="font-label-sm text-label-sm text-[9px] font-bold">হোম</span>
            </div>
            <div className="flex flex-col items-center text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">medication</span>
              <span className="font-label-sm text-label-sm text-[9px]">ওষুধ</span>
            </div>
            <div className="flex flex-col items-center text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">share</span>
              <span className="font-label-sm text-label-sm text-[9px]">শেয়ার</span>
            </div>
            <div className="flex flex-col items-center text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">notifications</span>
              <span className="font-label-sm text-label-sm text-[9px]">অ্যালার্ট</span>
            </div>
            <div className="flex flex-col items-center text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">person</span>
              <span className="font-label-sm text-label-sm text-[9px]">প্রোফাইল</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
