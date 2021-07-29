import { Geocode, GeoLocation } from "../../types/types"
import { useInputState } from '../../hooks/useInputState';
import geocodeToDefaultAddress from "../../functions/geocodeToDefaultAddress";

interface Props {
    setGeocodeLocations: React.Dispatch<React.SetStateAction<GeoLocation[] | null>>,
    setShowClickMarker: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddressSearch: React.FC<Props> = ({ setGeocodeLocations, setShowClickMarker }) => {
    const [addressSearchQuery, setAddressSearchQuery] = useInputState("")

    const geocodeAddress = async () => {
        if (!addressSearchQuery) return

        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=
        ${encodeURIComponent(addressSearchQuery)}&format=json&addressdetails=1`)
        if (res.status != 200) {
            // TODO flash message can't search by address right now
            return
        }
        const geocodes: Geocode[] = await res.json()
        console.log(geocodes)
        setGeocodeLocations(geocodes.map(g => ({
            coords: { lat: g.lat, lng: g.lon },
            address: geocodeToDefaultAddress(g.address)
        })))
        setShowClickMarker(false)
    }

    return (
        <div>
            <span>Search by address</span>
            <input value={addressSearchQuery} onChange={setAddressSearchQuery} type={"text"} />
            <button onClick={geocodeAddress}>Search</button>
        </div>
    )
}

export default AddressSearch
