import React, { useEffect, useState } from 'react'
import MyMarkerClusterGroup from 'react-leaflet-markercluster'
import { useDispatch, useSelector } from 'react-redux'
import useMeasure from 'react-use-measure'
import { v4 } from 'uuid'
import { markersData } from '../../../hooks/map/useLegend'
import { useClearFilters } from '../../../hooks/useClearFilters'
import { useFuncOnFilterChanged } from '../../../hooks/useFuncOnFilterChanged'
import { useOverflowHidden } from '../../../hooks/util/useOverflowHidden'
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

export const spotPreviewModalId = 'spot-preview-modal'

export const SpotsMapView = () => {
  const dispatch = useDispatch()
  const state = useSelector<RootState, MapSpotsState>(
    state => state.mapSpotsState
  )
  const [refreshId, setRefreshId] = useState(v4())

  useClearFilters()
  useFuncOnFilterChanged(() => dispatch(getMarkersData()))
  useOverflowHidden()

  useEffect(() => {
    setRefreshId(v4())
  }, [state.markersData.length])

  const [setRefCurrent, filterBtnBounds] = useMeasure()

  useEffect(() => {
    document.body.style.marginTop = '0rem'

    return () => {
      document.body.style.marginTop = '4rem'
    }
  }, [])

  const isSpotSelected = (name: string) =>
    state.currentSpotInModal?.name == name && state.isSpotModalOpen

  return (
    <div style={{ height: '100%', position: 'relative', paddingTop: '4rem' }}>
      <Map style={{ height: '100%' }}>
        <OnTopOfMapContainer
          setRefCurrent={setRefCurrent}
          style={{ backgroundColor: 'transparent', top: '15%' }}>
          <FilterBtnOnMap />
        </OnTopOfMapContainer>
        <OnTopOfMapContainer
          className='col-12 col-md-5 col-xl-3'
          style={{ top: `calc(15% + ${filterBtnBounds.height}px + 1rem)` }}>
          {state.isFilterModalOpen && <FiltersModal />}
        </OnTopOfMapContainer>
        {state.isSpotModalOpen && (
          <OnTopOfMapContainer
            className='col-12 col-md-5 col-xl-4 d-flex flex-column'
            hide={{
              mainContainerId: spotPreviewModalId,
              dontHideOnIds: [filterBtnId, filterModalId],
              funcToHide: () =>
                dispatch(mapSpotsActions.toggleSpotModal(false)),
            }}>
            <SpotModal />
          </OnTopOfMapContainer>
        )}
        {/* @ts-ignore    */}
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
