import React from 'react'
import MyMarkerClusterGroup, {
  MarkerClusterGroup,
} from 'react-leaflet-markercluster'
import { useDispatch, useSelector } from 'react-redux'
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
import { FilterBtnOnMap } from './FilterBtnOnMap'
import { FiltersModal } from './FiltersModal'
import { SpotModal } from './SpotModal'
import './style.scss'
import { v4 } from 'uuid'

export const SpotsMapView = () => {
  const dispatch = useDispatch()
  const state = useSelector<RootState, MapSpotsState>(
    state => state.mapSpotsReducer
  )

  useClearFilters()
  useFuncOnFilterChanged(() => dispatch(getMarkersData()))

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
              id: 'spot-preview-modal',
              funcToHide: () =>
                dispatch(mapSpotsActions.toggleSpotModal(false)),
            }}>
            <SpotModal />
          </OnTopOfMapContainer>
        )}
        <MyMarkerClusterGroup showCoverageOnHover={false} key={v4()}>
          {state.markersData.length &&
            state.markersData.map(m => (
              <ColorCodedMarker
                key={m.id}
                spotMarkerData={m}
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
                }}></ColorCodedMarker>
            ))}
        </MyMarkerClusterGroup>
        <Legend />
      </Map>
    </div>
  )
}
