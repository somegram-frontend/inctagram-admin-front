import type { Metadata } from "next";

import "./globals.css";
import "@honor-ui/inctagram-ui-kit/css";
import { ProviderWrapper } from "@/features/profider-wrapper";
import { Header } from "./_shared/ui/header";

import s from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Somegram Admin",
  description: "Somegram Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <Header />
          <div className={s.childrenContainer}>{children}</div>
        </ProviderWrapper>
      </body>
    </html>
  );
}
