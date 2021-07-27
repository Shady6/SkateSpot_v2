import L from 'leaflet';
import React, { useState } from 'react';
import { useReverseGeocoding } from '../../hooks/useReverseGeocoding';
import { GeoLocation } from '../../types/types';
import Map from './Map';

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<GeoLocation | null>>
}

const AddMarkerMap: React.FC<Props> = ({ setLocation }) => {

    const [addedSpotMarker, setAddedSpotMarker] = useState<L.Marker<any> | null>(null)

    useReverseGeocoding(addedSpotMarker, setLocation)

    const addNewMarkerAndRemovePrevious = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        map: L.Map
    ) => {
        if (addedSpotMarker) {
            map.removeLayer(addedSpotMarker)
        }

        const latlng = map.mouseEventToLatLng(e.nativeEvent)
        const marker = L.marker(latlng)
        map.addLayer(marker);
        setAddedSpotMarker(marker);
    }

    return (
        <div>
            <Map mapClickHandler={addNewMarkerAndRemovePrevious} />
        </div>
    )
}

export default AddMarkerMap
