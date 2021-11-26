import React, { useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import { CoordsDto } from '../../skate_spot_api/client'
import { Coords, IGeoLocation } from '../../types/types'
import LeafletMarkerWrapper from './LeafletMarkerWrapper'
import reverseGeocode from '../../functions/map/reverseGeocode'
import { markersData } from '../../hooks/map/useLegend'

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<IGeoLocation | null>>
  showClickMarker: boolean
  setShowClickMarker: React.Dispatch<React.SetStateAction<boolean>>
}

const PlacableMarker: React.FC<Props> = ({
  setLocation,
  showClickMarker,
  setShowClickMarker,
}) => {
  const [markerPosition, setmarkerPosition] = useState<CoordsDto | null>(null)

  useMapEvents({
    click(e) {
      setmarkerPosition(e.latlng)
      setShowClickMarker(true)
      reverseGeocode(e.latlng).then((res: IGeoLocation) => {
        setLocation(res)
      })
    },
  })

  return markerPosition && showClickMarker ? (
    <LeafletMarkerWrapper
      color={markersData.selected.color}
      position={markerPosition as Coords}
    />
  ) : null
}

export default PlacableMarker
