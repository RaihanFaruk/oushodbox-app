import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PwaRegistration from "@/components/pwa/PwaRegistration";
import OfflineBanner from "@/components/pwa/OfflineBanner";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ঔষধBox — মেডিসিন রেফারেন্স ও প্রাইজ ওয়ার্কস্পেস",
  description:
    "ওষুধের নাম, কোম্পানি, রেফারেন্স মূল্য ও হালনাগাদ তথ্য তাৎক্ষণিক খোঁজা ও মনে রাখার পার্সোনাল ওয়ার্কস্পেস।",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ঔষধBox",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "medicine",
    "Bangladesh",
    "medicine database",
    "ঔষধ",
    "drug price",
    "drug lookup",
  ],
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Hind Siliguri for Bengali script */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols for icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-canvas text-on-surface antialiased font-sans">
        <ToastProvider>
          <PwaRegistration />
          <OfflineBanner />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

