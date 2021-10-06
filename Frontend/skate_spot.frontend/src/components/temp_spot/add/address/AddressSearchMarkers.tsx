import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import getBoundingBox from "../../../../functions/getBoundingBox";
import { IGeoLocation } from "../../../../types/types";
import FaIconMarker from "../../../map/FaIconMarker";

interface Props {
  showMore: boolean;
  fromGeocodeLocations: IGeoLocation[] | null;
  setHoveredAddress: React.Dispatch<React.SetStateAction<number | null>>;
  hoveredAddress: number | null;
  pickAddress: (i: number) => void;
  location: IGeoLocation | null;
}

const AddressSearchMarkers: React.FC<Props> = ({
  showMore,
  fromGeocodeLocations,
  setHoveredAddress,
  hoveredAddress,
  pickAddress,
  location,
}) => {
  const map = useMap();

  useEffect(() => {
    if (showMore && fromGeocodeLocations) {
      map.fitBounds(getBoundingBox(fromGeocodeLocations), {
        animate: true,
        duration: 1.5,
        padding: [4, 4],
      });
    }
  }, [showMore, fromGeocodeLocations]);

  const render = () => {
    if (showMore)
      return fromGeocodeLocations?.map((l, i) => {
        const isHovered = hoveredAddress === i;
        return (
          <FaIconMarker
            size={isHovered ? 40 : 30}
            text={`${(i + 1).toString()}`}
            color={isHovered ? "red" : "rgb(255,100,10)"}
            position={l.coords}
            key={l.getKey(i)}
            onMouseEnter={(_) => setHoveredAddress(i)}
            onMouseLeave={(_) => setHoveredAddress(null)}
            onClick={(_) => pickAddress(i)}
          />
        );
      });
    else
      return (
        <FaIconMarker
          color={"rgb(255,100,10)"}
          position={location!.coords}
          flyToMarker={true}
        />
      );
  };

  return <div>{render()}</div>;
};

export default AddressSearchMarkers;
