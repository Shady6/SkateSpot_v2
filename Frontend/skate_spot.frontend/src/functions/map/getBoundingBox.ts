import { LatLngBoundsLiteral } from 'leaflet'
import { IGeoLocation } from '../../types/types'

const getBoundingBox = (locations: IGeoLocation[]): LatLngBoundsLiteral => {
  let bounds: LatLngBoundsLiteral = [
    [91, 91],
    [-91, -91],
  ]

  locations.forEach(g => {
    if (g.coords.lat < bounds[0][0]) bounds[0][0] = g.coords.lat
    if (g.coords.lat > bounds[1][0]) bounds[1][0] = g.coords.lat
    if (g.coords.lng < bounds[0][1]) bounds[0][1] = g.coords.lng
    if (g.coords.lng > bounds[1][1]) bounds[1][1] = g.coords.lng
  })
  return bounds
}

export default getBoundingBox
