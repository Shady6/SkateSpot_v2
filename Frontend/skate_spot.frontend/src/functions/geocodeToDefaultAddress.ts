import { DefaultAddress, GeocodeAddress } from '../types/types';

const geocodeToDefaultAddress = (g: GeocodeAddress): DefaultAddress => {
    return {
        city: g.city || g.town || g.village,
        country: g.country,
        postCode: g.postcode,
        streetName: g.road,
        streetNumber: g.house_number
    }
}

export default geocodeToDefaultAddress