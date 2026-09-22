import type { Metadata } from "next";

// Prevent all search engines from indexing any page under /admin/
// This covers /admin and /admin/login without repeating per-page.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
