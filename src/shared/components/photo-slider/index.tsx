import { ArrowIosBack, ArrowIosForward } from "@honor-ui/inctagram-ui-kit";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import s from "./photo-slider.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  images?: string[];
  className?: string;
  dotClass?: string;
  imgClass?: string;
  clickCallback?: () => void | undefined;
  onSetActiveImageIdx?: (nextIdx: number) => void;
  activeImageIdx?: number;
};

const PhotoSlider: React.FC<Props> = ({
  images,
  className,
  dotClass,
  imgClass,
  clickCallback,
  onSetActiveImageIdx,
  activeImageIdx,
}) => {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const defaultAva = "./not-photo.jpg";
  const Arrow = ({
    direction,
    onClick,
  }: {
    direction: "prev" | "next";
    onClick: () => void;
  }) => {
    return (
      images &&
      images.length > 1 && (
        <div
          className={
            direction === "prev" ? s.customPrevArrow : s.customNextArrow
          }
          onClick={onClick}
        >
          {direction === "prev" ? <ArrowIosBack /> : <ArrowIosForward />}
        </div>
      )
    );
  };

  const handleClick = (imgSrc: string) => {
    setZoomImage(imgSrc);
    if (clickCallback) {
      clickCallback();
    }
  };

  const handleCloseZoomImage = () => {
    setZoomImage(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrow direction="prev" onClick={() => {}} />,
    nextArrow: <Arrow direction="next" onClick={() => {}} />,
    adaptiveHeight: true,
    afterChange: (idx: number) => {
      onSetActiveImageIdx?.(idx);
    },
  };

  if (!images || images.length === 0) {
    return (
      <div className={s.noImages}>
        <Image
          src={defaultAva}
          className={imgClass || ""}
          alt="No images"
          width={492}
          height={504}
        />
      </div>
    );
  }

  return (
    <div>
      <div className={!zoomImage ? s.sliderWrapper : s.slideWrapperOpacity}>
        <Slider
          {...settings}
          className={className ? className : ""}
          dotsClass={dotClass ? dotClass : "slick-dots"}
          ref={(slider) => {
            if (activeImageIdx) {
              slider?.slickGoTo(activeImageIdx);
            }
          }}
        >
          {images?.map((imgSrc) => (
            <div key={imgSrc} className={s.slide}>
              <Image
                src={imgSrc || defaultAva}
                alt="post images"
                width={492}
                height={504}
                className={imgClass || ""}
                onClick={() => handleClick(imgSrc)}
              />
            </div>
          ))}
        </Slider>
      </div>
      {zoomImage && (
        <div className={s.zoomedImageOverlay} onClick={handleCloseZoomImage}>
          <Image
            src={zoomImage}
            alt="zoomed image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </div>
  );
};

export default PhotoSlider;
