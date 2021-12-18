import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequestWithFlashMsgOnError } from '../../functions/request/sendRequestWithFlashMsgOnError'
import {
  SpotDto,
  SpotMarkerDataDto,
  TempSpotDto,
} from '../../skate_spot_api/client'
import { RootState } from '../store'

// TODO remember to clear filter before calling this thunk in TempSpot creation page
export const getMarkersData = createAsyncThunk(
  'mapSpots/getMarkersData',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState

    const res = await sendRequestWithFlashMsgOnError(
      dispatch,
      state.auth.content,
      client =>
        client.get_Perma_And_Temp_Spots_Marker_Data(
          state.filtersState?.appliedFilter?.filter?.surfaceScore?.gtFiltering,
          state.filtersState?.appliedFilter?.filter?.surfaceScore?.score,
          state.filtersState?.appliedFilter?.filter?.tags
        )
    )
    if (res.error) return rejectWithValue(null)
    return res.content as SpotMarkerDataDto[]
  }
)

export const fetchSpot = createAsyncThunk(
  'mapSpots/fetchSpot',
  async (
    { markerData }: { markerData: SpotMarkerDataDto },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState

    const res = markerData.isTempSpot
      ? await sendRequestWithFlashMsgOnError(
          dispatch,
          state.auth.content,
          client => client.get_Temp_Spot(markerData.id)
        )
      : await sendRequestWithFlashMsgOnError(
          dispatch,
          state.auth.content,
          client => client.get_Spot(markerData.name as string)
        )
    if (res.error) return rejectWithValue(null)
    return res.content as TempSpotDto | SpotDto
  }
)
