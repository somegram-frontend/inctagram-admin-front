import type { Metadata } from "next";

import "./globals.css";
import { Header } from "./_shared/ui/header";
import '@honor-ui/inctagram-ui-kit/css'

export const metadata: Metadata = {
  title: "Inctagram Admin",
  description: "Inctagram Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
