import React from "react";
import { AddressDto } from "../../skate_spot_api/client";
import { Coords } from "../../types/types";
import IconMarker from "./IconMarker";
import Map from "./Map";

interface Props {
  address: AddressDto;
}

const DisplaySpotMap: React.FC<Props> = ({ address }: Props) => {
  return (
    <div>
      <Map>
        <IconMarker
          flyToMarkerZoom={16}
          animateFly={false}
          position={address!.coords as Coords}
        ></IconMarker>
      </Map>
      <p>
        {address.country} {address.city} {address.streetName && ","}{" "}
        {address.streetName} {address.streetName && address.streetNumber}
      </p>
    </div>
  );
};

export default DisplaySpotMap;
