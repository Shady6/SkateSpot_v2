import { GeoLocation } from '../../../classes/GeoLocation';
import { useInputState } from '../../../hooks/useInputState';
import { Geocode, IGeoLocation } from '../../../types/types';

interface Props {
    setGeocodeLocations: React.Dispatch<React.SetStateAction<IGeoLocation[] | null>>,
    setLocation: React.Dispatch<React.SetStateAction<IGeoLocation | null>>
    setShowClickMarker: React.Dispatch<React.SetStateAction<boolean>>,
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressSearch: React.FC<Props> = ({
    setGeocodeLocations,
    setLocation,
    setShowClickMarker,
    setShowMore }) => {
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
        const geocodes: Geocode[] = await res.json() || [];
        setGeocodeLocations(geocodes.map((g) => GeoLocation.FromGeocode(g)));
        setLocation(geocodes.length > 0 ? GeoLocation.FromGeocode(geocodes[0]) : null)
        setShowClickMarker(false);
    };

    return (
        <>
            <div className={"mb-2"}>Search by address</div>
            <input 
            className={"me-1 py-0 input"}
            value={addressSearchQuery} onChange={setAddressSearchQuery} type="text"
                onKeyDown={(e) => { if (e.key === "Enter") geocodeAddress() }} />
            <button className={"px-2 btn btn-sm btn-primary"} onClick={geocodeAddress}>Search</button>
        </>
    );
};

export default AddressSearch;
