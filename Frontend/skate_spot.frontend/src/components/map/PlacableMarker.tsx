import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";
import reverseGeocode from "../../functions/reverseGeocode";
import { ICoordsDto } from "../../skate_spot_api/client";
import { Coords, IGeoLocation } from "../../types/types";
import FaIconMarker from "./FaIconMarker";

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<IGeoLocation | null>>;
  showClickMarker: boolean;
  setShowClickMarker: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlacableMarker: React.FC<Props> = ({
  setLocation,
  showClickMarker,
  setShowClickMarker,
}) => {
  const [markerPosition, setmarkerPosition] = useState<ICoordsDto | null>(null);

  useMapEvents({
    click(e) {
      setmarkerPosition(e.latlng);
      setShowClickMarker(true);
      reverseGeocode(e.latlng).then((res: IGeoLocation) => {
        setLocation(res);
      });
    },
  });

  return markerPosition && showClickMarker ? (
    <FaIconMarker
      color={"rgb(255,100,10)"}
      position={markerPosition as Coords}
    />
  ) : null;
};

export default PlacableMarker;
