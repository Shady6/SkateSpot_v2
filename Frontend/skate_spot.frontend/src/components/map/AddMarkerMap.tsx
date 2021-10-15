import React from "react";
import { Popup } from "react-leaflet";
import MyMarkerClusterGroup from "react-leaflet-markercluster";
import addressToHtml from "../../functions/addressToHtml";
import { useAddressDataMarkers } from "../../hooks/useAddressDataMarkers";
import { Coords, DefaultAddress } from "../../types/types";
import IconMarker from "./IconMarker";
import Map from "./Map";

const AddMarkerMap: React.FC = ({ children }) => {
  const spotMarkerData = useAddressDataMarkers();

  return (
    <div>
      <Map>
        <MyMarkerClusterGroup showCoverageOnHover={false}>
          {spotMarkerData &&
            spotMarkerData.map((m) => (
              <IconMarker key={m.name} position={m!.address!.coords as Coords}>
                <Popup>
                  <b>{m.name}</b>
                  {addressToHtml(m!.address as unknown as DefaultAddress)}
                </Popup>
              </IconMarker>
            ))}
        </MyMarkerClusterGroup>
        {children}
      </Map>
    </div>
  );
};

export default AddMarkerMap;
