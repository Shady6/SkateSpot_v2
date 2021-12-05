import React, { useEffect, useState } from 'react'
import MyMarkerClusterGroup from 'react-leaflet-markercluster'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { useClearFilters } from '../../../hooks/useClearFilters'
import { useFuncOnFilterChanged } from '../../../hooks/useFuncOnFilterChanged'
import {
  fetchSpot,
  getMarkersData,
} from '../../../state/actions/mapSpotsActions'
import {
  mapSpotsActions,
  MapSpotsState,
} from '../../../state/reducers/mapSpotsReducer'
import { RootState } from '../../../state/store'
import { ColorCodedMarker } from '../../map/ColorCodedMarker'
import Legend from '../../map/Legend'
import Map from '../../map/Map'
import { OnTopOfMapContainer } from '../../map/OnTopOfMapContainer'
import { filterBtnId, FilterBtnOnMap } from './FilterBtnOnMap'
import { filterModalId, FiltersModal } from './FiltersModal'
import { SpotInfoTooltip } from './SpotInfoTooltip'
import { SpotModal } from './SpotModal'
import './style.scss'
import { markersData } from '../../../hooks/map/useLegend'

export const spotPreviewModalId = 'spot-preview-modal'

export const SpotsMapView = () => {
  const dispatch = useDispatch()
  const state = useSelector<RootState, MapSpotsState>(
    state => state.mapSpotsReducer
  )
  const [refreshId, setRefreshId] = useState(v4())

  useClearFilters()
  useFuncOnFilterChanged(() => dispatch(getMarkersData()))

  useEffect(() => {
    setRefreshId(v4())
  }, [state.markersData.length])

  const isSpotSelected = (name: string) =>
    state.currentSpotInModal?.name == name && state.isSpotModalOpen

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Map style={{ height: '100%' }}>
        <OnTopOfMapContainer
          className='col-2'
          style={{ backgroundColor: 'transparent', top: '15%' }}>
          <FilterBtnOnMap />
          {state.isFilterModalOpen && <FiltersModal />}
        </OnTopOfMapContainer>
        {state.isSpotModalOpen && (
          <OnTopOfMapContainer
            className='col-12 col-md-5 col-lg-4 d-flex flex-column'
            hide={{
              mainContainerId: spotPreviewModalId,
              dontHideOnIds: [filterBtnId, filterModalId],
              funcToHide: () =>
                dispatch(mapSpotsActions.toggleSpotModal(false)),
            }}>
            <SpotModal />
          </OnTopOfMapContainer>
        )}
        <MyMarkerClusterGroup showCoverageOnHover={false} key={refreshId}>
          {state.markersData.length &&
            state.markersData.map(m => (
              <ColorCodedMarker
                key={m.id}
                spotMarkerData={m}
                color={
                  isSpotSelected(m.name as string)
                    ? markersData.selected.color
                    : undefined
                }
                size={isSpotSelected(m.name as string) ? 35 : undefined}
                onClick={() => {
                  if (
                    state.currentSpotInModal?.id === m.id &&
                    state.isSpotModalOpen
                  )
                    dispatch(mapSpotsActions.toggleSpotModal(false))
                  else {
                    dispatch(fetchSpot({ markerData: m }))
                    dispatch(mapSpotsActions.toggleSpotModal(true))
                  }
                }}>
                <SpotInfoTooltip marker={m} />
              </ColorCodedMarker>
            ))}
        </MyMarkerClusterGroup>
        <Legend displaySelectedMarkerLegend={true} />
      </Map>
    </div>
  )
}
