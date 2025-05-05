import type { Metadata } from "next";

import { AdminPage } from "@/features/admin-page/ui";

export const metadata: Metadata = {
  title: "Somegram Admin",
  description: "Somegram Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminPage>{children}</AdminPage>;
}
