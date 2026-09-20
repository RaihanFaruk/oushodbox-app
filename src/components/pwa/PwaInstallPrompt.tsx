"use client";

/**
 * PwaInstallPrompt — Real PWA Installation component
 * Renders only when the browser provides a real `beforeinstallprompt` event.
 * If unsupported or already installed, gracefully informs the user without pretending.
 */

import { useState } from "react";
import { usePwaStatus } from "./usePwaStatus";

interface PwaInstallPromptProps {
  className?: string;
  variant?: "button" | "banner";
  onInstalled?: () => void;
}

export default function PwaInstallPrompt({
  className = "",
  variant = "button",
  onInstalled,
}: PwaInstallPromptProps) {
  const { installAvailable, promptInstall } = usePwaStatus();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInstallClick = async () => {
    if (!installAvailable) {
      setFeedback("এই ব্রাউজারে সরাসরি ইনস্টল প্রম্পট বর্তমানে উপলব্ধ নয়।");
      setTimeout(() => setFeedback(null), 4000);
      return;
    }

    const outcome = await promptInstall();
    if (outcome === "accepted") {
      setFeedback("ঔষধBox সফলভাবে ইনস্টল করা হয়েছে!");
      onInstalled?.();
    } else if (outcome === "dismissed") {
      setFeedback("ইনস্টলেশন বাতিল করা হয়েছে।");
    } else {
      setFeedback("এই ব্রাউজারে সরাসরি ইনস্টল প্রম্পট বর্তমানে উপলব্ধ নয়।");
    }

    setTimeout(() => setFeedback(null), 4000);
  };

  if (variant === "banner" && !installAvailable) {
    return null;
  }

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      {installAvailable ? (
        <button
          onClick={handleInstallClick}
          type="button"
          className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer font-medium"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            download_done
          </span>
          <span>ইনস্টল টেস্ট রান</span>
        </button>
      ) : (
        <button
          onClick={handleInstallClick}
          type="button"
          className="px-space-md py-1.5 rounded-lg bg-surface-container-highest text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant transition-colors border border-[var(--color-border)] flex items-center gap-1.5 cursor-pointer font-medium"
          title="ব্রাউজার প্রম্পট চেক করুন"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            download_done
          </span>
          <span>ইনস্টল টেস্ট রান</span>
        </button>
      )}

      {feedback && (
        <span className="mt-1.5 text-xs text-primary font-medium animate-in fade-in duration-200">
          {feedback}
        </span>
      )}
    </div>
  );
}
