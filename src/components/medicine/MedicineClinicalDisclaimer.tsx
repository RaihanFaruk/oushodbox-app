/**
 * MedicineClinicalDisclaimer — Mandatory pharmaceutical & clinical disclaimer banner
 * Preserved faithfully from Stitch medicine_details design with demo indicator.
 */

export default function MedicineClinicalDisclaimer() {
  return (
    <div className="w-full p-space-md rounded-2xl bg-surface-container-highest text-on-surface flex items-start gap-space-sm shadow-sm mb-space-sm">
      <span
        className="material-symbols-outlined text-2xl text-primary shrink-0 mt-0.5"
        aria-hidden="true"
      >
        health_and_safety
      </span>
      <div className="flex flex-col">
        <h4 className="font-label-lg text-label-lg font-bold text-on-surface">
          ফার্মাসিউটিক্যালস ও ক্লিনিক্যাল ডিসক্লেইমার
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mt-0.5">
          ⚠️ <strong>দ্রষ্টব্য:</strong> এটি শুধুমাত্র ফার্মাসিস্ট ও চিকিৎসা পেশাজীবীদের তথ্যগত সহায়তার জন্য প্রস্তুতকৃত ডেমো রেজিস্ট্রি (ডেমো তথ্য — প্রকৃত চিকিৎসা পরামর্শ নয়)। সাধারণ রোগীদের ক্ষেত্রে নিবন্ধিত রেজিস্টার্ড চিকিৎসকের প্রেসক্রিপশন ও পরামর্শ ব্যতিরেকে নিজে থেকে কোনো ওষুধের ব্র্যান্ড বা মাত্রা পরিবর্তনের সুপারিশ ঔষধBox করে না।
        </p>
      </div>
    </div>
  );
}
