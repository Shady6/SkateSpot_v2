import React, { useState } from "react";
import {
  TempSpotWithVerificationDto,
  ObstacleType,
  SmallUserDto,
  VerificationStatementDto,
} from "../../../skate_spot_api/client";
import MapModal from "./MapModal";
import { Obstacles } from "./Obstacles";
import { SpotAuthor } from "./SpotAuthor";
import { SpotImages } from "./SpotImages";
import { SurfaceScore } from "./SurfaceScore";
import { TempSpotDetailsBtn as ShowOnMapBtn } from "./TempSpotDetailsBtn";
import { VerificationButtons } from "./VerificationButtons";

interface Props {
  tempSpot: TempSpotWithVerificationDto;
}

export const TempSpot = React.memo(
  ({ tempSpot }: Props) => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    return (
      <div className="mb-4">
        <h4>{tempSpot.name}</h4>
        <p>{tempSpot.description}</p>
        <SpotImages tempSpot={tempSpot} />
        <div className="d-flex mt-2">
          <VerificationButtons
            tempSpotId={tempSpot.id as string}
            votes={
              tempSpot!.verificationProcess!.votes as VerificationStatementDto[]
            }
          />
          <SurfaceScore surfaceScore={tempSpot.surfaceScore as number} />
          <Obstacles obstacles={tempSpot.obstacles as ObstacleType[]} />
          <ShowOnMapBtn onClick={() => setIsMapModalOpen(true)} />
          <SpotAuthor author={tempSpot.author as SmallUserDto} />
        </div>
        <hr />
        <MapModal
          tempSpot={tempSpot}
          isOpen={isMapModalOpen}
          setIsOpen={setIsMapModalOpen}
        />
      </div>
    );
  },
  (p, n) =>
    JSON.stringify(p.tempSpot.verificationProcess?.votes) ===
    JSON.stringify(n.tempSpot.verificationProcess?.votes)
);
