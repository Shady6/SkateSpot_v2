import React from 'react'
import { Popup } from 'react-leaflet'
import MyMarkerClusterGroup from 'react-leaflet-markercluster'
import addressToHtml from '../../functions/map/addressToHtml'
import { useAddressDataMarkers } from '../../hooks/map/useAddressDataMarkers'
import { DefaultAddress } from '../../types/types'
import Legend from './Legend'
import Map from './Map'
import { ColorCodedMarker } from './ColorCodedMarker'

interface Props {
  displaySelectedMarkerLegend?: boolean
  style?: any
}

const MapWithSpotMarkers: React.FC<Props> = ({
  children,
  displaySelectedMarkerLegend = false,
}) => {
  const spotMarkerData = useAddressDataMarkers()
  return (
    <div>
      <Map>
        {/* @ts-ignore */}
        <MyMarkerClusterGroup showCoverageOnHover={false}>
          {spotMarkerData &&
            spotMarkerData.map(m => (
              <ColorCodedMarker key={m.name} spotMarkerData={m}>
                <Popup>
                  <b>{m.name}</b>
                  {addressToHtml(m!.address as unknown as DefaultAddress)}
                </Popup>
              </ColorCodedMarker>
            ))}
        </MyMarkerClusterGroup>
        {children}
        <Legend displaySelectedMarkerLegend={displaySelectedMarkerLegend} />
      </Map>
    </div>
  )
}

export default MapWithSpotMarkers
