import React, { useState } from "react";
import { useAddressDataMarkers } from "../../../hooks/map/useAddressDataMarkers";
import Map from "../../map/Map";
import MyMarkerClusterGroup from "react-leaflet-markercluster";
import { ColorCodedMarker } from "../../map/ColorCodedMarker";
import Legend from "../../map/Legend";
import { SpotModal } from "./SpotModal";
import { SpotMarkerDataDto } from "../../../skate_spot_api/client";

interface Props {}

export const SpotsMapView = (props: Props) => {
  const spotMarkerData = useAddressDataMarkers();
  const [selectedSpot, setSelectedSpot] = useState<SpotMarkerDataDto | null>(
    null
  );

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <Map style={{ height: "100%" }}>
        {selectedSpot && (
          <SpotModal
            markerData={selectedSpot}
            setSelectedSpot={setSelectedSpot}
          />
        )}
        {/* @ts-ignore */}
        <MyMarkerClusterGroup showCoverageOnHover={false}>
          {spotMarkerData &&
            spotMarkerData.map((m) => (
              <ColorCodedMarker
                key={m.name}
                spotMarkerData={m}
                onClick={() => {
                  if (selectedSpot?.id === m.id) setSelectedSpot(null);
                  else setSelectedSpot(m);
                }}
              ></ColorCodedMarker>
            ))}
        </MyMarkerClusterGroup>
        <Legend />
      </Map>
    </div>
  );
};
