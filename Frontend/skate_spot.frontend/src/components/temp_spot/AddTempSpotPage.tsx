import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import addressToHtml from '../../functions/addressToHtml';
import geocodeToDefaultAddress from '../../functions/geocodeToDefaultAddress';
import { useInputState } from '../../hooks/useInputState';
import { Geocode, GeoLocation, DefaultAddress } from '../../types/types';
import AddMarkerMap from '../map/AddMarkerMap';
import PlacableMarker from '../map/PlacableMarker';
import AddressSearch from './AddressSearch';

const AddTempSpotPage: React.FC = () => {

    const [location, setLocation] = useState<GeoLocation | null>(null)
    const [fromGeocodeLocations, setFromGeocodeLocations] = useState<GeoLocation[] | null>(null)
    const [showClickData, setShowClickMarker] = useState<boolean>(true)

    const renderAddressFromClick = () => {
        if (location?.address)
            return addressToHtml(location?.address)
        return <p>No address found for this spot</p>
    }

    return (
        <div>
            <p>Select spot on map</p>
            <AddMarkerMap >
                <PlacableMarker
                    showClickMarker={showClickData} setShowClickMarker={setShowClickMarker}
                    setLocation={setLocation} />
                {/* Show one marker if user wants to see more show more */}
                {!showClickData && <Marker position={fromGeocodeLocations![0].coords} />}

            </AddMarkerMap>
            <AddressSearch
                setGeocodeLocations={setFromGeocodeLocations}
                setShowClickMarker={setShowClickMarker} />
            {/* TODO make this clearer and move showing locations from address search to own component */}
            {showClickData && renderAddressFromClick()}
            {!showClickData && fromGeocodeLocations?.map((g, i) => <div key={g.coords.lat + i}>                
                {addressToHtml(g.address as DefaultAddress)}
            </div>)}
        </div>
    )
}

export default AddTempSpotPage
