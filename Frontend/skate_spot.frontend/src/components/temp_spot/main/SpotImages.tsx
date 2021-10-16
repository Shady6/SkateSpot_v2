import React from "react";
import ImageGallery from "react-image-gallery";
import { TempSpotWithVerificationDto } from "../../../skate_spot_api/client";

interface SpotImagesProps {
  tempSpot: TempSpotWithVerificationDto;
}
export const SpotImages = ({ tempSpot }: SpotImagesProps) => {
  return tempSpot.images && tempSpot.images.length ? (
    <ImageGallery
      showThumbnails={false}
      showPlayButton={false}
      items={tempSpot.images!.map((i) => ({
        original: i.base64 as string,
        originalWidth: 800,
        originalHeight: 600,
      }))}
    />
  ) : (
    <div>No images were added for this temp spot.</div>
  );
};
