import React from "react";
import ImageGallery from "react-image-gallery";
import { ImageDto } from "../../skate_spot_api/client";

interface SpotImagesProps {
  images?: ImageDto[];
}
export const SpotImages = ({ images }: SpotImagesProps) => {
  return images && images.length ? (
    <ImageGallery
      showThumbnails={false}
      showPlayButton={false}
      items={images!.map((i) => ({
        original: i.base64 as string,
        originalWidth: 800,
        originalHeight: 600,
      }))}
    />
  ) : (
    <div>No images were added for this spot.</div>
  );
};
