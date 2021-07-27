import React, { useState } from 'react';
import AddMarkerMap from '../map/AddMarkerMap';
import { GeoLocation } from '../types/inComponentTypes';



const AddTempSpotPage: React.FC = () => {

    const [location, setLocation] = useState<GeoLocation | null>(null)    

    return (
        <div>
            <h1>Hello from temp spot</h1>
            <p>Select spot on map</p>
            <AddMarkerMap setLocation={setLocation}/>
        </div>
    )
}

export default AddTempSpotPage
