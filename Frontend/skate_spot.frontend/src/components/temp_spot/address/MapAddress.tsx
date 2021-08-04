import React, { useState } from 'react';
import { IGeoLocation } from '../../../types/types';
import AddMarkerMap from '../../map/AddMarkerMap';
import PlacableMarker from '../../map/PlacableMarker';
import AddressSearch from './AddressSearch';
import AddressSearchMarkers from './AddressSearchMarkers';
import AddressSearchResults from './AddressSearchResults';
import ClickSearchResult from './ClickSearchResult';

const MapAddress: React.FC = () => {
    const [location, setLocation] = useState<IGeoLocation | null>(null)
    const [fromGeocodeLocations, setFromGeocodeLocations] = useState<IGeoLocation[] | null>(null)
    const [showClickData, setShowClickData] = useState<boolean>(true)
    const [showMore, setShowMore] = useState(false)
    const [hoveredAddress, setHoveredAddress] = useState<number | null>(null)

    const pickAddress = (i: number) => {
        setShowMore(false)
        setLocation(fromGeocodeLocations![i])
    }

    return (
        <div>
            <p>Select spot on map</p>
            <AddMarkerMap >
                <PlacableMarker
                    showClickMarker={showClickData} setShowClickMarker={setShowClickData}
                    setLocation={setLocation} />
                <AddressSearchMarkers
                    showClickData={showClickData}
                    showMore={showMore}
                    fromGeocodeLocations={fromGeocodeLocations}
                    setHoveredAddress={setHoveredAddress}
                    hoveredAddress={hoveredAddress}
                    pickAddress={pickAddress}
                    location={location} />
            </AddMarkerMap>
            <AddressSearch
                setGeocodeLocations={setFromGeocodeLocations}
                setLocation={setLocation}
                setShowClickMarker={setShowClickData}
                setShowMore={setShowMore} />
            <ClickSearchResult
                location={location}
                showClickData={showClickData} />
            <AddressSearchResults
                showClickData={showClickData}
                fromGeocodeLocations={fromGeocodeLocations}
                showMore={showMore}
                setShowMore={setShowMore}
                hoveredAddress={hoveredAddress}
                setHoveredAddress={setHoveredAddress}
                location={location}
                pickAddress={pickAddress} />
        </div>
    )
}

export default MapAddress