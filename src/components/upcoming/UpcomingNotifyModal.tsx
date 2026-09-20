"use client";

/**
 * UpcomingNotifyModal — Early access notification signup modal
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

import { useState } from "react";
import type { UpcomingFeatureItem } from "@/types";

interface UpcomingNotifyModalProps {
  isOpen: boolean;
  feature: UpcomingFeatureItem | null;
  onClose: () => void;
  onSubmitSuccess: (featureTitle: string) => void;
}

export default function UpcomingNotifyModal({
  isOpen,
  feature,
  onClose,
  onSubmitSuccess,
}: UpcomingNotifyModalProps) {
  const [contact, setContact] = useState("");
  const [whatsappAlert, setWhatsappAlert] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !feature) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setContact("");
        onSubmitSuccess(feature.title);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-xl flex flex-col gap-space-md border border-[var(--color-border)] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                campaign
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm font-semibold text-primary uppercase">
                আর্লি এক্সেস টিকিট
              </span>
              <h3
                id="notify-modal-title"
                className="font-headline-sm text-headline-sm font-bold text-on-surface"
              >
                {feature.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            type="button"
            aria-label="বন্ধ করুন"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Feature Context Description */}
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {feature.description} — রিলিজ হওয়ার সাথে সাথে নোটিফিকেশন পেতে আপনার মোবাইল বা ইমেইল দিয়ে রাখুন।
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="contactInput"
              className="font-label-sm text-label-sm font-semibold text-on-surface"
            >
              মোবাইল নম্বর অথবা ইমেইল *
            </label>
            <div className="relative flex items-center">
              <span
                className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg pointer-events-none"
                aria-hidden="true"
              >
                contact_mail
              </span>
              <input
                id="contactInput"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#006948] transition-all border border-transparent focus:border-primary/20"
                placeholder="০১৭১XXXXXXX বা pharmacist@mail.com"
                required
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="whatsappAlert"
              checked={whatsappAlert}
              onChange={(e) => setWhatsappAlert(e.target.checked)}
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
              type="checkbox"
            />
            <label
              htmlFor="whatsappAlert"
              className="font-label-sm text-label-sm text-on-surface-variant cursor-pointer select-none"
            >
              হোয়াটসঅ্যাপে ডিরেক্ট টেস্ট ইনভাইটেশন লিংক পাঠান
            </label>
          </div>

          {/* Success Banner */}
          {isSuccess && (
            <div className="p-space-sm rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
                check_circle
              </span>
              <span>ধন্যবাদ! আপনার অনুরোধ সফলভাবে নথিভুক্ত হয়েছে।</span>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-space-sm pt-space-xs">
            <button
              onClick={onClose}
              className="px-space-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors cursor-pointer"
              type="button"
            >
              বাতিল
            </button>
            <button
              disabled={isSubmitting || isSuccess}
              className={`px-space-lg py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm font-semibold flex items-center gap-1.5 cursor-pointer ${
                isSubmitting || isSuccess ? "opacity-60 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                {isSubmitting ? "hourglass_top" : "notifications"}
              </span>
              <span>
                {isSubmitting
                  ? "সংরক্ষণ হচ্ছে..."
                  : isSuccess
                  ? "নথিভুক্ত হয়েছে"
                  : "আমাকে নোটিফাই করুন (Notify Me)"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
