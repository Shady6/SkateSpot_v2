import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  SpotDto,
  SpotMarkerDataDto,
  TempSpotDto,
} from '../../skate_spot_api/client'
import { getMarkersData, fetchSpot } from '../actions/mapSpotsActions'

export interface MapSpotsState {
  loadingMarkers: boolean
  loadingSpotInModal: boolean
  currentSpotInModal: null | SpotDto | TempSpotDto
  markersData: SpotMarkerDataDto[]
  isSpotModalOpen: boolean
  isFilterModalOpen: boolean
}

const initialState: MapSpotsState = {
  loadingMarkers: false,
  loadingSpotInModal: false,
  currentSpotInModal: null,
  markersData: [],
  isSpotModalOpen: false,
  isFilterModalOpen: false,
}

const mapSpotsSlice = createSlice({
  name: 'mapSpots',
  initialState,
  reducers: {
    toggleSpotModal: (state, action: PayloadAction<boolean>) => {
      state.isSpotModalOpen = action.payload
    },
    toggleFilterModal: (state, action: PayloadAction<boolean>) => {
      state.isFilterModalOpen = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMarkersData.pending, state => {
        state.loadingMarkers = true
      })
      .addCase(getMarkersData.fulfilled, (state, action) => {
        state.loadingMarkers = false
        state.markersData = action.payload
      })
      .addCase(getMarkersData.rejected, state => {
        state.loadingMarkers = false
      })

      .addCase(fetchSpot.pending, state => {
        state.currentSpotInModal = null
        state.loadingSpotInModal = true
      })
      .addCase(fetchSpot.fulfilled, (state, action) => {
        state.loadingSpotInModal = false
        state.currentSpotInModal = action.payload
      })
      .addCase(fetchSpot.rejected, state => {
        state.loadingSpotInModal = false
      })
  },
})

export default mapSpotsSlice.reducer
export const mapSpotsActions = mapSpotsSlice.actions
