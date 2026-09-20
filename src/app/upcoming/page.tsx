import type { Metadata } from "next";
import UpcomingFeaturesClient from "@/components/upcoming/UpcomingFeaturesClient";

export const metadata: Metadata = {
  title: "রোডম্যাপ ও আসন্ন ফিচারসমূহ | ঔষধBox PWA",
  description:
    "অত্যাধুনিক PWA অফলাইন আর্কিটেকচার এবং স্মার্ট ফার্মেসি অটোমেশন টুলস। আপনার ডিসপেনসারিকে ডিজিটালাইজ করতে আসন্ন ফিচারসমূহের ডেমো প্রিভিউ।",
};

export default function UpcomingPage() {
  return (
    <div className="min-h-screen bg-surface py-space-lg px-space-md lg:px-space-xl">
      <UpcomingFeaturesClient />
    </div>
  );
}
