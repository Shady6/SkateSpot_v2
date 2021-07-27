export interface GeoLocation {
    coords: Coords,
    address?: DefaultAddress
}

export interface Coords {
    lat: number,
    lng: number,
}

export interface DefaultAddress {
    country: string,
    city: string,
    streetName: string,
    streetNumber: string,
    postCode: string,
}

export interface GeocodeAddress {
    road: string;
    quarter: string;
    suburb: string;
    town: string;
    city: string;
    village: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
    house_number: string;
}

export interface Geocode {
    display_name: string;
    address: GeocodeAddress;
    boundingbox: string[];
}