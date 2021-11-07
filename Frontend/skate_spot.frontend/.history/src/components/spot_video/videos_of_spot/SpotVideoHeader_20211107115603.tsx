import { useState } from "react";
import { ObstacleType, SpotDto } from "../../../skate_spot_api/client";
import { MapModal } from "../../spot_common/MapView/MapModal";
import { ShowMapModalBtn } from "../../spot_common/MapView/ShowMapModalBtn";
import { Obstacles } from "../../spot_common/Obstacles";
import { SurfaceScore } from "../../spot_common/SurfaceScore";
import { AddSpotVideoModal } from "../AddSpotVideoModal";
import { AddVideoBtn } from "../AddVideoBtn";
import { ImageGalleryModal } from "../ImageGalleryModal";
import { ShowImageGalleryModalBtn } from "../ShowImageGalleryModalBtn";

interface Props {
  spot: SpotDto;
}

export const SpotVideoHeader = (p: Props) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [isAddSpotOpen, setIsAddSpotOpen] = useState(false);

  return (
    <div>
      <h3 className="me-3">Spot videos of {p.spot.name}</h3>
      <div className="d-flex">
        <div className="me-1">
          <AddVideoBtn setIsAddSpotVideoModalOpen={setIsAddSpotOpen} />
        </div>
        <div className="me-1">
          <ShowImageGalleryModalBtn
            setIsImageGalleryOpen={setIsImageGalleryOpen}
          />
        </div>
        <div className="me-3">
          <ShowMapModalBtn setIsMapModalOpen={setIsMapModalOpen} />
        </div>
        <SurfaceScore surfaceScore={p.spot.surfaceScore as number} />
        <Obstacles obstacles={p.spot.obstacles as ObstacleType[]} />
      </div>
      <AddSpotVideoModal
        isOpen={isAddSpotOpen}
        setIsOpen={setIsAddSpotOpen}
        spotName={spot.name}
      />
      <ImageGalleryModal
        images={p.spot.images}
        isOpen={isImageGalleryOpen}
        setIsOpen={setIsImageGalleryOpen}
      />
      <MapModal
        address={p.spot.address}
        isMapModalOpen={isMapModalOpen}
        setIsMapModalOpen={setIsMapModalOpen}
      />
    </div>
  );
};
