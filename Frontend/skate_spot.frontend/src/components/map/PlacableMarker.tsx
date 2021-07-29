import React, { useState } from 'react';
import { Marker, useMapEvents } from "react-leaflet";
import reverseGeocode from '../../functions/reverseGeocode';
import { ICoordsDto } from '../../skate_spot_api/client';
import { GeoLocation } from '../../types/types';

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<GeoLocation | null>>
    showClickMarker: boolean,
    setShowClickMarker: React.Dispatch<React.SetStateAction<boolean>>
}

const PlacableMarker: React.FC<Props> = ({ setLocation, showClickMarker, setShowClickMarker }) => {

    const [markerPosition, setmarkerPosition] = useState<ICoordsDto | null>(null)

    const map = useMapEvents({
        click(e) {
            setmarkerPosition(e.latlng)
            setShowClickMarker(true)
            reverseGeocode(e.latlng).then((res: GeoLocation) => {
                setLocation(res)
            })
        },
    })

    return (markerPosition && showClickMarker) ?
        <Marker position={markerPosition} /> : null
}

export default PlacableMarker