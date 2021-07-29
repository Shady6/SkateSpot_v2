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
    lat: number,
    lon: number,
    address: GeocodeAddress;
    boundingbox: string[];
}

export enum UserRoles {   
    ALL_ROLES = "All",
    SIGNED_IN_ROLES = "SignedInRoles",
    NO_ROLE = "NoRole",
    BASIC = "Basic",
    MODERATOR = "Moderator",
    ADMIN = "Admin",
    SUPER_ADMIN = "SuperAdmin"
}