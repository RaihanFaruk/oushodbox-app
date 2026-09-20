import type { Metadata } from "next";
import WhatsAppShareClient from "@/components/share/WhatsAppShareClient";

export const metadata: Metadata = {
  title: "হোয়াটসঅ্যাপ শেয়ার ও ডিজিটাল প্রেসক্রিপশন স্লিপ — ঔষধBox",
  description:
    "রোগীর ফোনে সরাসরি ওষুধের তালিকা, সেবনবিধি ও মূল্য তালিকা ডিজিটাল স্লিপ আকারে প্রেরণ করুন।",
};

export default function WhatsAppSharePage() {
  return <WhatsAppShareClient />;
}
