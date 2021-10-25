import { GeoLocation } from "../../classes/GeoLocation";
import { DefaultAddress, Geocode, IGeoLocation } from "../../types/types";
import geocodeToDefaultAddress from "./geocodeToDefaultAddress";

const reverseGeocode = async (coords: {
  lat: number;
  lng: number;
}): Promise<IGeoLocation> => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`;
  let address: DefaultAddress | undefined = undefined;

  try {
    const response = await fetch(url);
    const jsonContent: any = await response.json();

    if (jsonContent.address) {
      const geocode: Geocode = jsonContent as Geocode;
      address = geocodeToDefaultAddress(geocode);
    }
  } catch (error) {
    console.log(error);
  } finally {
    return new GeoLocation(coords, address);
  }
};

export default reverseGeocode;
