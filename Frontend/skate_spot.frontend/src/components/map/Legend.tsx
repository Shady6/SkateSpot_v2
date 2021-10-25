import React from "react";
import { useMap } from "react-leaflet";
import { useLegend } from "../../hooks/map/useLegend";

interface Props {
  displaySelectedMarkerLegend: boolean;
}

const Legend: React.FC<Props> = ({ displaySelectedMarkerLegend }) => {
  useLegend({ displaySelectedMarkerLegend, map: useMap() });
  return <></>;
};

export default Legend;
