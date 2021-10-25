import React, { useState } from "react";
import { IGeoLocation } from "../../../../types/types";
import MapWithSpotMarkers from "../../../map/MapWithSpotMarkers";
import PlacableMarker from "../../../map/PlacableMarker";
import AddressSearch from "./AddressSearch";
import AddressSearchMarkers from "./AddressSearchMarkers";
import AddressSearchResults from "./AddressSearchResults";
import ClickSearchResult from "./ClickSearchResult";

const MapAddress: React.FC<{
  location: IGeoLocation | null;
  setLocation: React.Dispatch<React.SetStateAction<IGeoLocation | null>>;
}> = ({ location, setLocation }) => {
  const [fromGeocodeLocations, setFromGeocodeLocations] = useState<
    IGeoLocation[] | null
  >(null);
  const [showClickData, setShowClickData] = useState<boolean>(true);
  const [showMore, setShowMore] = useState(false);
  const [hoveredAddress, setHoveredAddress] = useState<number | null>(null);

  const pickAddress = (i: number) => {
    setShowMore(false);
    setLocation(fromGeocodeLocations![i]);
  };

  return (
    <>
      <p>Select spot on map</p>
      <MapWithSpotMarkers displaySelectedMarkerLegend={true}>
        <PlacableMarker
          showClickMarker={showClickData}
          setShowClickMarker={setShowClickData}
          setLocation={setLocation}
        />
        {!showClickData && location && (
          <AddressSearchMarkers
            showMore={showMore}
            fromGeocodeLocations={fromGeocodeLocations}
            setHoveredAddress={setHoveredAddress}
            hoveredAddress={hoveredAddress}
            pickAddress={pickAddress}
            location={location}
          />
        )}
      </MapWithSpotMarkers>
      <div className={"mt-2"}>
        <AddressSearch
          setGeocodeLocations={setFromGeocodeLocations}
          setLocation={setLocation}
          setShowClickMarker={setShowClickData}
          setShowMore={setShowMore}
        />
      </div>
      {showClickData && location && <ClickSearchResult location={location} />}
      {!showClickData && (
        <AddressSearchResults
          fromGeocodeLocations={fromGeocodeLocations}
          showMore={showMore}
          setShowMore={setShowMore}
          hoveredAddress={hoveredAddress}
          setHoveredAddress={setHoveredAddress}
          location={location}
          pickAddress={pickAddress}
        />
      )}
    </>
  );
};

export default MapAddress;
