import React from 'react';
import { Popup } from 'react-leaflet';
import MyMarkerClusterGroup from 'react-leaflet-markercluster';
import addressToHtml from '../../functions/addressToHtml';
import { useAddressDataMarkers } from '../../hooks/useAddressDataMarkers';
import FaIconMarker from './FaIconMarker';
import Map from './Map';

const AddMarkerMap: React.FC = ({children}) => {

    const spotMarkerData = useAddressDataMarkers()

    return (
        <div>
            <Map>
                <MyMarkerClusterGroup  showCoverageOnHover={false}>
                    {spotMarkerData && spotMarkerData.map(m =>
                        <FaIconMarker key={m.name} position={m.address.coords}>
                            <Popup>
                                <b>{m.name}</b>
                                {addressToHtml(m.address)}
                            </Popup>
                        </FaIconMarker>)}
                </MyMarkerClusterGroup>
                {children}               
            </Map>
        </div>
    )
}

export default AddMarkerMap
