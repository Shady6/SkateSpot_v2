import { useEffect, useState } from 'react';
import { Client, SpotMarkerDataDto } from '../skate_spot_api/client';
import { skateSpotApiBaseUrl } from '../skate_spot_api/constants';
import { useRootState } from '../state/store';

export const useAddressDataMarkers = () => {

    const [spotMarkerData, setSpotMarkerData] = useState<SpotMarkerDataDto[]>()
    const authState = useRootState().auth

    useEffect(() => {
        (async () => {
            try {
                const client = new Client(skateSpotApiBaseUrl);
                const res = await client.get_Perma_And_Temp_Spots_Marker_Data("Bearer " + authState?.content?.jwToken ?? "")
                setSpotMarkerData(res!.content)

            }
            catch (e) {
                // TODO flash message can't display existing spots
                console.log(e)
            }
        })();
    }, [])

    return spotMarkerData
}