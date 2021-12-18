import React, { useEffect } from 'react'
import { Popup } from 'react-leaflet'
import MyMarkerClusterGroup from 'react-leaflet-markercluster'
import { useDispatch, useSelector } from 'react-redux'
import addressToHtml from '../../functions/map/addressToHtml'
import { SpotMarkerDataDto } from '../../skate_spot_api/client'
import { getMarkersData } from '../../state/actions/mapSpotsActions'
import { RootState } from '../../state/store'
import { DefaultAddress } from '../../types/types'
import { ColorCodedMarker } from './ColorCodedMarker'
import Legend from './Legend'
import Map from './Map'

interface Props {
  displaySelectedMarkerLegend?: boolean
  style?: any
}

const MapWithSpotMarkers: React.FC<Props> = ({
  children,
  displaySelectedMarkerLegend = false,
}) => {
  const dispatch = useDispatch()
  const spotMarkersData = useSelector<RootState, SpotMarkerDataDto[]>(
    state => state.mapSpotsState.markersData
  )

  useEffect(() => {
    dispatch(getMarkersData())
  }, [])

  return (
    <div>
      <Map>
        {/* @ts-ignore */}
        <MyMarkerClusterGroup showCoverageOnHover={false}>
          {spotMarkersData.length &&
            spotMarkersData.map(m => (
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
