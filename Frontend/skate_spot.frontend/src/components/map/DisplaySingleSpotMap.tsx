import React from 'react'
import { AddressDto } from '../../skate_spot_api/client'
import { Coords } from '../../types/types'
import LeafletMarkerWrapper from './LeafletMarkerWrapper'
import Map from './Map'

interface Props {
  address: AddressDto
}

const DisplaySingleSpot: React.FC<Props> = ({ address }: Props) => {
  return (
    <div>
      <Map>
        <LeafletMarkerWrapper
          flyToMarkerZoom={16}
          animateFly={false}
          position={address!.coords as Coords}></LeafletMarkerWrapper>
      </Map>
      <p>
        {address.country} {address.city} {address.streetName && ','}{' '}
        {address.streetName} {address.streetName && address.streetNumber}
      </p>
    </div>
  )
}

export default DisplaySingleSpot
