"use client";

import PhotoSlider from "@/shared/components/photo-slider";
import { Block, Typography } from "@honor-ui/inctagram-ui-kit";
import { useState } from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import DefaultImage from "./default.jpg";

import s from "./post.module.scss";
import clsx from "clsx";

type Props = {
  avatar: string;
  images?: string[];
  username: string;
  description?: string;
  createdAt: string;
  openBanModal?: () => void;
};

export const Post = ({
  avatar,
  images,
  description,
  username,
  createdAt,
  openBanModal,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const onExpandedClick = () => setExpanded((prev) => !prev);

  const defineTheDescription = (description?: string) => {
    if (!description) return "";

    if (description.length < 70) return description;

    if (description.length > 70 && !expanded) {
      return (
        <>
          {description.slice(0, 70)}...
          <Typography
            variant="regular_link"
            onClick={onExpandedClick}
            className={s.postShowMore}
          >
            Show more
          </Typography>
        </>
      );
    }

    if (description.length > 70 && expanded) {
      return (
        <>
          {description.slice(0, 230)}
          {description.length > 230 && "..."}
          <Typography
            variant="regular_link"
            onClick={onExpandedClick}
            className={s.postShowMore}
          >
            {" "}
            Hide
          </Typography>
        </>
      );
    }

    return description;
  };

  const dotsClass = images && images?.length > 1 ? s.postDots : "";

  return (
    <div className={s.post}>
      <PhotoSlider
        images={images}
        dotClass={dotsClass}
        imgClass={clsx(
          expanded ? s.postSliderImageExpanded : s.postSliderImage,
        )}
      />

      <div className={s.postArticle}>
        <div className={s.postArticleHeader}>
          <Image
            src={avatar || DefaultImage}
            width={35}
            height={35}
            alt="avatar image"
            className={s.postUserAvatar}
          />
          <Typography variant="h3">{username}</Typography>
          {openBanModal && (
            <Block className={s.blockIcon} onClick={openBanModal} />
          )}
        </div>
        <div className={s.postArticleText}>
          <div className={s.postTimeAgo}>
            <Typography variant="small_text">
              <TimeAgo date={createdAt} live={false} />
            </Typography>
          </div>
          <Typography variant="regular_text14" className={s.postDescription}>
            {defineTheDescription(description)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
