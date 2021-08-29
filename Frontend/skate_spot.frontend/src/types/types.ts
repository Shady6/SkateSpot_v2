export interface IGeoLocation {
  coords: Coords;
  address?: DefaultAddress;

  getKey: (i: number) => string;
  toString: () => string;
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface DefaultAddress {
  display: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  postCode: string;
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
  lat: number;
  lon: number;
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
  SUPER_ADMIN = "SuperAdmin",
}

export interface JWTPayload {
  sub: string;
  jti: string;
  email: string;
  uid: string;
  ip: string;
  roles: string[];
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
