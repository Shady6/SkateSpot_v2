import geocodeToDefaultAddress from '../functions/map/geocodeToDefaultAddress'
import { Coords, DefaultAddress, Geocode, IGeoLocation } from '../types/types'

export class GeoLocation implements IGeoLocation {
  coords: Coords
  address?: DefaultAddress

  constructor(coords: Coords, address?: DefaultAddress) {
    this.coords = coords
    this.address = address
  }

  getKey(i: number): string {
    return `${this.coords.lat}${this.coords.lng}-${i}`
  }
  toString(): string {
    return this.address?.display ?? ''
  }

  static FromGeocode(g: Geocode): IGeoLocation {
    return new GeoLocation(
      { lat: g.lat, lng: g.lon },
      geocodeToDefaultAddress(g)
    )
  }
}
