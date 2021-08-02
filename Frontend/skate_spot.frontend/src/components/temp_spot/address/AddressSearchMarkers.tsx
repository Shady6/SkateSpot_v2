import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import getBoundingBox from '../../../functions/getBoundingBox';
import { IGeoLocation } from '../../../types/types';
import FaIconMarker from '../../map/FaIconMarker';

interface Props {
    showClickData: boolean,
    showMore: boolean,
    fromGeocodeLocations: IGeoLocation[] | null
}

const AddressSearchMarkers: React.FC<Props> = ({
    showClickData,
    showMore,
    fromGeocodeLocations }) => {

    const map = useMap()

    useEffect(() => {
        if (showMore && fromGeocodeLocations) {                        
            map.fitBounds(getBoundingBox(fromGeocodeLocations),
                {
                    animate: true,
                    duration: 1.5,
                    padding: [4, 4]
                })
        }

    }, [showMore, fromGeocodeLocations])    

    const renderMarkers = () => {
        if (!showClickData) {
            console.log(fromGeocodeLocations?.map(g => g.coords))
            if (showMore)
                return fromGeocodeLocations?.map((l, i) =>
                    <FaIconMarker
                        text={`${(i+1).toString()}`}
                        color={"rgb(255,100,10)"}
                        position={l.coords} key={l.getKey(i)} />)
            else
                return <FaIconMarker
                    color={"rgb(255,100,10)"}
                    position={fromGeocodeLocations![0].coords}
                    flyToMarker={true} />
        }
    }

    return (
        <div>
            {renderMarkers()}
        </div>
    )
}

export default AddressSearchMarkers