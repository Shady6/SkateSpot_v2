import React from 'react'
import { markersData } from '../../hooks/map/useLegend'
import { SpotMarkerDataDto } from '../../skate_spot_api/client'
import { Coords } from '../../types/types'
import LeafletMarkerWrapper from './LeafletMarkerWrapper'

interface Props {
  spotMarkerData: SpotMarkerDataDto
  onMouseEnter?: (e: L.LeafletMouseEvent) => void
  onMouseLeave?: (e: L.LeafletMouseEvent) => void
  onClick?: (e: L.LeafletMouseEvent) => void
  color?: string
  size?: number
}

export const ColorCodedMarker: React.FC<Props> = p => {
  return (
    <LeafletMarkerWrapper
      color={
        p.color
          ? p.color
          : p.spotMarkerData.isTempSpot
          ? markersData.tempSpot.color
          : markersData.spot.color
      }
      position={p.spotMarkerData!.address!.coords as Coords}
      onClick={p.onClick}
      onMouseEnter={p.onMouseEnter}
      onMouseLeave={p.onMouseLeave}
      size={p.size}>
      {p.children}
    </LeafletMarkerWrapper>
  )
}
