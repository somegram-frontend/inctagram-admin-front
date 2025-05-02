"use client";

import s from "./following-page.module.scss";
import { Typography } from "@honor-ui/inctagram-ui-kit";

export const FollowingPage = () => {
  return (
    <div className={s.page}>
      <div className={s.notFollowingTitle}>
        <Typography variant={"large"}>In the process of development</Typography>
      </div>
    </div>
  );
};
