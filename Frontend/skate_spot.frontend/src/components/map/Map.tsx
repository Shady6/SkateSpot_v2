import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface Props {
  whenReady?: () => void;
}

const Map: React.FC<Props> = ({ children, whenReady }) => {
  return (
    <MapContainer
      style={{ height: 600 }}
      center={{ lat: 12.12, lng: 12.12 }}
      zoom={2}
      whenReady={() => whenReady && whenReady()}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
