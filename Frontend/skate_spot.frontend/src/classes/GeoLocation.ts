import { Coords, DefaultAddress, IGeoLocation } from '../types/types';

export class GeoLocation implements IGeoLocation{    
    coords: Coords;
    address?: DefaultAddress;

    constructor(coords: Coords, address?: DefaultAddress){
        this.coords = coords
        this.address = address
    }

    getKey(i: number): string {return  `${this.coords.lat}${this.coords.lng}-${i}`}
    toString(): string {return this.address?.display ?? ""}      
}