"use client";

/**
 * UpcomingHeroBanner — Top header banner for Upcoming Features & PWA Roadmap
 * Faithfully migrated from Stitch upcoming_features_pwa/code.html
 */

export default function UpcomingHeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm border border-[var(--color-border)]">
      {/* Ambient background accent */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-space-md relative z-10">
        {/* Title row with rocket icon */}
        <div className="flex items-center gap-space-sm flex-wrap sm:flex-nowrap">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              rocket_launch
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm font-semibold tracking-wider text-primary uppercase">
              INNOVATION ROADMAP
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              ঔষধBox রোডম্যাপ ও আসন্ন ফিচারসমূহ
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          অত্যাধুনিক PWA অফলাইন আর্কিটেকচার এবং স্মার্ট ফার্মেসি অটোমেশন টুলস। আপনার ডিসপেনসারিকে ডিজিটালাইজ করতে আমরা যে ফিচারগুলো তৈরি করছি তার এক ঝলক।
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
          <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-tertiary text-lg" aria-hidden="true">
              verified_user
            </span>
            <span>
              ✨ ডেমো প্রিভিউ • এই ফিচারগুলো বর্তমানে পরীক্ষাধীন এবং শীঘ্রই উন্মুক্ত হবে (COMING SOON)
            </span>
          </div>
          <span className="px-space-sm py-1 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
            Sprint Alpha 3.4
          </span>
        </div>
      </div>
    </div>
  );
}
