import { useEffect } from 'react';
import reverseGeocode from '../functions/reverseGeocode';
import { GeoLocation } from '../types/types';

export const useReverseGeocoding = (
    marker: L.Marker<any> | null,
    updateGeoLocState: React.Dispatch<React.SetStateAction<GeoLocation | null>>
) => {
    useEffect(() => {
        if (!marker)
            return
        const latlng = marker.getLatLng()
        const location: GeoLocation = {
            coords: {
                lat: latlng.lat,
                lng: latlng.lng,
            },
        };
        (async () => {
            location.address = await reverseGeocode(latlng)
        })();

        updateGeoLocState(location)
    }, [marker])
}