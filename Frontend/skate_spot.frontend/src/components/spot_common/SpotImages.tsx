import React from "react";
import ImageGallery from "react-image-gallery";
import { ImageDto } from "../../skate_spot_api/client";

interface SpotImagesProps {
  images?: ImageDto[];
  height?: number;
  width?: number;
}
export const SpotImages = ({
  images,
  height = 600,
  width = 800,
}: SpotImagesProps) => {
  return images && images.length ? (
    <ImageGallery
      showThumbnails={false}
      showPlayButton={false}
      items={images!.map((i) => ({
        original: i.base64 as string,
        originalWidth: width,
        originalHeight: height,
      }))}
    />
  ) : (
    <div>No images were added for this spot.</div>
  );
};
