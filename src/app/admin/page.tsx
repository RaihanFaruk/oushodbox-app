import type { Metadata } from "next";
import AdminPanelClient from "@/components/admin/AdminPanelClient";

export const metadata: Metadata = {
  title: "সিস্টেম অ্যাডমিন প্যানেল | ঔষধBox",
  description:
    "কেন্দ্রীয় ড্রাগ রেজিস্ট্রি, মাস্টার প্রাইসিং ইনডেক্স, অনুমোদনের সারি ও রিয়েলটাইম ফার্মাসিউটিক্যাল অডিট কন্ট্রোল সেন্টার।",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-surface py-space-lg px-space-md lg:px-space-xl">
      <AdminPanelClient />
    </div>
  );
}
