import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-[var(--color-border)] shadow-md flex flex-col items-center text-center gap-4 animate-in fade-in">
        {/* 404 Icon */}
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl">travel_explore</span>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-primary tracking-wider uppercase">
            ত্রুটি ৪০৪
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">
            পৃষ্ঠাটি পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            আপনার অনুরোধকৃত পৃষ্ঠাটি বিদ্যমান নেই, মুছে ফেলা হয়েছে অথবা ঠিকানা ভুল হতে পারে।
          </p>
        </div>

        {/* Action Link */}
        <div className="w-full mt-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-dark transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
