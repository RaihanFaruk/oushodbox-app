import type { Metadata } from "next";
import OfflineClient from "@/components/pwa/OfflineClient";

export const metadata: Metadata = {
  title: "অফলাইন মোড | ঔষধBox",
  description: "ইন্টারনেট সংযোগ বিচ্ছিন্ন। সংরক্ষিত তথ্য থেকে অ্যাপ ব্যবহার করুন।",
};

export default function OfflinePage() {
  return <OfflineClient />;
}
