"use client";

import s from "./header.module.scss";
import {
  FlagRussia,
  FlagUnitedKingdom,
  PersonOutline,
  Select,
} from "@honor-ui/inctagram-ui-kit";
import Link from "next/link";

export const Header = () => {
  const options = [
    {
      label: (
        <div className={s.flagContainer}>
          <FlagUnitedKingdom />
          <span className={s.language}> English</span>
        </div>
      ),
      value: "en",
    },
    {
      label: (
        <div className={s.flagContainer}>
          <FlagRussia />
          <span className={s.language}>Russian</span>
        </div>
      ),
      value: "ru",
    },
  ];

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>
        Somegram<span>Super</span>
        <b>Admin</b>
      </Link>
      <div className={s.register}>
        <Select
          className={s.select}
          options={options}
          placeholder={
            <div className={s.flagContainer}>
              <FlagUnitedKingdom /> &nbsp; <span> English</span>
            </div>
          }
        />
        <>
          <Link href="/src/app/(auth)" className={s.buttonForMobile}>
            <PersonOutline />
          </Link>
        </>
      </div>
    </header>
  );
};
