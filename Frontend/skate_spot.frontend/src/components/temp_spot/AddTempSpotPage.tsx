import React, { useState } from 'react';
import { IGeoLocation } from '../../types/types';
import MapAddress from './address/MapAddress';
import ImageUpload from './image/ImageUpload';

const AddTempSpotPage: React.FC = () => {
    
    const [location, setLocation] = useState<IGeoLocation | null>(null)

    return (
        <div>
            <MapAddress location={location} setLocation={setLocation} />
            <ImageUpload />
        </div>
    )
}

export default AddTempSpotPage
