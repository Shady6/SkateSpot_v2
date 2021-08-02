import { GeoLocation } from '../../../classes/GeoLocation';
import geocodeToDefaultAddress from '../../../functions/geocodeToDefaultAddress';
import { useInputState } from '../../../hooks/useInputState';
import { Geocode, IGeoLocation } from '../../../types/types';

interface Props {
    setGeocodeLocations: React.Dispatch<React.SetStateAction<IGeoLocation[] | null>>,
    setShowClickMarker: React.Dispatch<React.SetStateAction<boolean>>,
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressSearch: React.FC<Props> = ({ setGeocodeLocations, setShowClickMarker, setShowMore }) => {
    const [addressSearchQuery, setAddressSearchQuery] = useInputState('');

    const geocodeAddress = async () => {
        setShowMore(false)
        if (!addressSearchQuery) return;

        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=
        ${encodeURIComponent(addressSearchQuery)}&format=json&addressdetails=1`);
        if (res.status !== 200) {
            // TODO flash message can't search by address right now
            return;
        }
        const geocodes: Geocode[] = await res.json();        
        setGeocodeLocations(geocodes.map((g) => new GeoLocation(
            { lat: g.lat, lng: g.lon },
            geocodeToDefaultAddress(g))));
        setShowClickMarker(false);
    };

    return (
        <div>
            <span>Search by address</span>
            <input value={addressSearchQuery} onChange={setAddressSearchQuery} type="text"
                onKeyDown={(e) => { if (e.key === "Enter") geocodeAddress() }} />
            <button onClick={geocodeAddress}>Search</button>
        </div>
    );
};

export default AddressSearch;
