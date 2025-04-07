"use client";

import { useViewProfile } from "@/features/view-profile-page/useViewProfile";
import { Loader } from "@/shared/components/loader";
import Image from "next/image";
import { Typography } from "@honor-ui/inctagram-ui-kit";
import s from "./uploaded-photos-page.module.scss";

export const UploadedPhotosPage = () => {
  const { user, isLoading } = useViewProfile();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {user?.getPostsPhotos ? (
        <div className={s.photos}>
          {user?.getPostsPhotos?.map(
            (photo) =>
              photo?.url && (
                <Image
                  key={photo.key}
                  src={photo.url}
                  alt={photo.originalname || ""}
                  width={228}
                  height={228}
                  className={s.photo}
                />
              ),
          )}
        </div>
      ) : (
        <div className={s.notPhotosTitle}>
          <Typography variant={"large"}>Not uploaded Photos</Typography>
        </div>
      )}
    </div>
  );
};
