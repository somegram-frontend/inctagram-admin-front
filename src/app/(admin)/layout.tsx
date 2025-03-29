import type {Metadata} from "next";

import {Sidebar} from "@/shared/components/sidebar";

import s from './layout.module.scss'

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
    <div className={s.layout}>
      <Sidebar />
      <div className={s.childrenContainer}>
        {children}
      </div>
    </div>
  );
}
