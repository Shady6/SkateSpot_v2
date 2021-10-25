import React from "react";
import { Popup } from "react-leaflet";
import MyMarkerClusterGroup from "react-leaflet-markercluster";
import addressToHtml from "../../functions/map/addressToHtml";
import { useAddressDataMarkers } from "../../hooks/map/useAddressDataMarkers";
import { markersData } from "../../hooks/map/useLegend";
import { Coords, DefaultAddress } from "../../types/types";
import LeafletMarkerWrapper from "./LeafletMarkerWrapper";
import Legend from "./Legend";
import Map from "./Map";

interface Props {
  displaySelectedMarkerLegend?: boolean;
}

const MapWithSpotMarkers: React.FC<Props> = ({
  children,
  displaySelectedMarkerLegend = false,
}) => {
  const spotMarkerData = useAddressDataMarkers();
  return (
    <div>
      <Map>
        <MyMarkerClusterGroup showCoverageOnHover={false}>
          {spotMarkerData &&
            spotMarkerData.map((m) => (
              <LeafletMarkerWrapper
                color={
                  m.isTempSpot
                    ? markersData.tempSpot.color
                    : markersData.spot.color
                }
                key={m.name}
                position={m!.address!.coords as Coords}
              >
                <Popup>
                  <b>{m.name}</b>
                  {addressToHtml(m!.address as unknown as DefaultAddress)}
                </Popup>
              </LeafletMarkerWrapper>
            ))}
        </MyMarkerClusterGroup>
        {children}
        <Legend displaySelectedMarkerLegend={displaySelectedMarkerLegend} />
      </Map>
    </div>
  );
};

export default MapWithSpotMarkers;
