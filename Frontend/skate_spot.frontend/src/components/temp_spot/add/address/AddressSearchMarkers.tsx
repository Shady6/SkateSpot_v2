import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import getBoundingBox from '../../../../functions/map/getBoundingBox'
import { IGeoLocation } from '../../../../types/types'
import LeafletMarkerWrapper from '../../../map/LeafletMarkerWrapper'
import { markersData } from '../../../../hooks/map/useLegend'

interface Props {
  showMore: boolean
  fromGeocodeLocations: IGeoLocation[] | null
  setHoveredAddress: React.Dispatch<React.SetStateAction<number | null>>
  hoveredAddress: number | null
  pickAddress: (i: number) => void
  location: IGeoLocation | null
}

const AddressSearchMarkers: React.FC<Props> = ({
  showMore,
  fromGeocodeLocations,
  setHoveredAddress,
  hoveredAddress,
  pickAddress,
  location,
}) => {
  const map = useMap()

  useEffect(() => {
    if (showMore && fromGeocodeLocations) {
      map.fitBounds(getBoundingBox(fromGeocodeLocations), {
        animate: true,
        duration: 1.5,
        padding: [4, 4],
      })
    }
  }, [showMore, fromGeocodeLocations])

  const render = () => {
    if (showMore)
      return fromGeocodeLocations?.map((l, i) => {
        const isHovered = hoveredAddress === i
        return (
          <LeafletMarkerWrapper
            size={isHovered ? 40 : 30}
            text={`${(i + 1).toString()}`}
            color={markersData.selected.color}
            position={l.coords}
            key={l.getKey(i)}
            onMouseEnter={_ => setHoveredAddress(i)}
            onMouseLeave={_ => setHoveredAddress(null)}
            onClick={_ => pickAddress(i)}
          />
        )
      })
    else
      return (
        <LeafletMarkerWrapper
          color={markersData.selected.color}
          position={location!.coords}
          flyToMarkerZoom={12}
        />
      )
  }

  return <div>{render()}</div>
}

export default AddressSearchMarkers
