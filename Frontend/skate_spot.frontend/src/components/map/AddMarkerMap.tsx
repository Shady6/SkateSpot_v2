import React, { Children } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MyMarkerClusterGroup from 'react-leaflet-markercluster';
import { useAddressDataMarkers } from '../../hooks/useAddressDataMarkers';
import { Coords, GeoLocation } from '../../types/types';
import Map from './Map';
import PlacableMarker from './PlacableMarker';
import addressToHtml from '../../functions/addressToHtml';

// interface Props {
//     setLocation: React.Dispatch<React.SetStateAction<GeoLocation | null>>
//     troughGeocodingMarkerData?: Coords
// }

const AddMarkerMap: React.FC = ({children}) => {

    const spotMarkerData = useAddressDataMarkers()

    return (
        <div>
            <Map>
                <MyMarkerClusterGroup  showCoverageOnHover={false}>
                    {spotMarkerData && spotMarkerData.map(m =>
                        <Marker key={m.name} position={m.address.coords}>
                            <Popup>
                                <b>{m.name}</b>
                                {addressToHtml(m.address)}
                            </Popup>
                        </Marker>)}
                </MyMarkerClusterGroup>
                {children}               
            </Map>
        </div>
    )
}

export default AddMarkerMap
