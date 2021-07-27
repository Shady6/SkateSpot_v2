import { DefaultAddress, Geocode } from '../types/types';

const reverseGeocode = async (coords: { lat: number, lng: number }):
    Promise<DefaultAddress | undefined> => {

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`;
    let address: DefaultAddress | undefined = undefined;
    
    try {
        const response = await fetch(url)
        const jsonContent: any = await response.json()

        if (jsonContent.address) {
            const geocode: Geocode = jsonContent as Geocode
            address = {
                city: geocode.address.city || geocode.address.town || geocode.address.village,
                country: geocode.address.country,
                postCode: geocode.address.postcode,
                streetName: geocode.address.road,
                streetNumber: geocode.address.house_number
            }
        }
    }
    catch (error) {
        console.error(error)
    }
    finally {
        return address;
    }
}

export default reverseGeocode