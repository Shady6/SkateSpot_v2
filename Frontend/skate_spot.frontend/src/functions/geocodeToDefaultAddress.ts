import { DefaultAddress, Geocode } from '../types/types';

const geocodeToDefaultAddress = (g: Geocode): DefaultAddress => {
    return {
        city: g.address.city || g.address.town || g.address.village,
        country: g.address.country,
        postCode: g.address.postcode,
        streetName: g.address.road,
        streetNumber: g.address.house_number,
        display: g.display_name
    }
}

export default geocodeToDefaultAddress