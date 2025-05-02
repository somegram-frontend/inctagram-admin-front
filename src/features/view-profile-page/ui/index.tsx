"use client";

import s from "./view-profile-page.module.scss";
import {
  ArrowBackOutline,
  Button,
  Tabs,
  Typography,
} from "@honor-ui/inctagram-ui-kit";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Path } from "@/shared/const/path";
import Image from "next/image";
import { format } from "date-fns";
import { useViewProfile } from "../lib/useViewProfile";
import { Loader } from "@/shared/components/loader";

export const ViewProfilePage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const initialPath = pathName.split("/").pop() || Path.User.UploadedPhotos;

  const [path, setPath] = useState("/" + initialPath);

  console.log("path", path);

  const { user, isLoading } = useViewProfile();

  const setPathHandler = (value: string) => {
    setPath(value);
    router.push(pathName.replace(path, value));
  };

  const creationDate = user?.createdAt
    ? format(new Date(user.createdAt), "dd.MM.yyyy")
    : "Unknown";

  return (
    <div className={s.page}>
      <Button
        className={s.backBtn}
        variant={"secondary"}
        onClick={() => router.push(Path.Admin.UserList)}
      >
        <ArrowBackOutline />
        Back to Users List
      </Button>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={s.userInfo}>
            <div className={s.userInfoHeader}>
              <div className={s.userInfoHeaderAvatar}>
                {user?.getAvatar?.url ? (
                  <Image
                    width={60}
                    height={60}
                    src={user?.getAvatar?.url}
                    alt="avatar"
                  />
                ) : (
                  <Typography>{user?.username?.[0]?.toUpperCase()}</Typography>
                )}
              </div>
              <div className={s.userInfoHeaderContent}>
                <Typography variant={"h1"} className={s.userName}>
                  {user?.username}
                </Typography>
                <Typography
                  variant={"regular_text14"}
                  as={"a"}
                  href={user?.profileLink || ""}
                  className={s.link}
                >
                  {user?.profileLink}
                </Typography>
              </div>
            </div>
            <div className={s.userInfoContent}>
              <div className={s.userInfoContentItem}>
                <Typography
                  variant={"regular_text14"}
                  className={s.userInfoContentItemLabel}
                >
                  UserID:
                </Typography>
                <Typography
                  variant={"regular_text16"}
                  className={s.userInfoContentItemValue}
                >
                  {user?.id}
                </Typography>
              </div>
              <div className={s.userInfoContentItem}>
                <Typography
                  variant={"regular_text14"}
                  className={s.userInfoContentItemLabel}
                >
                  Profile Creation Date
                </Typography>
                <Typography
                  variant={"regular_text16"}
                  className={s.userInfoContentItemValue}
                >
                  {creationDate}
                </Typography>
              </div>
            </div>
          </div>
          <Tabs
            className={s.tabs}
            value={path}
            onValueChange={setPathHandler}
            tabs={[
              {
                text: "Uploaded Photos",
                value: Path.User.UploadedPhotos,
              },
              {
                text: "Payments",
                value: Path.User.Payments,
              },
              {
                text: "Followers",
                value: Path.User.Followers,
              },
              {
                text: "Following",
                value: Path.User.Following,
              },
            ]}
          />
          <div className={s.childrenContainer}>{children}</div>
        </>
      )}
    </div>
  );
};
