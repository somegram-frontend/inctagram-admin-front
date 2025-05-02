"use client";

import s from "./admin-page.module.scss";
import { Sidebar } from "@/shared/components/sidebar";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const AdminPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideSidebar = /^\/userList\/.+/.test(pathname);

  return (
    <div className={clsx(s.page, hideSidebar && s.hideSidebar)}>
      {!hideSidebar && <Sidebar />}
      <div className={s.childrenContainer}>{children}</div>
    </div>
  );
};
