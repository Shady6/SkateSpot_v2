import { createSlice } from '@reduxjs/toolkit'
import { TempSpotDto } from '../../skate_spot_api/client'
import { vote } from '../actions/tempSpotActions'
import { ListViewTypes } from '../generic/listViewGenerics'
import {
  addExtraReducerDefaultCases,
  listViewReducerHandlers,
  ListViewState,
  reducerDefaultCases,
} from './genericListViewReducer'

export type TempSpotState = ListViewState<TempSpotDto>

const initialState: TempSpotState = {
  listWithCount: {
    data: [],
    totalCount: 0,
  },
  paging: {
    take: 5,
    skip: 0,
  },
  loading: false,
  error: false,
}

const tempSpotsSlice = createSlice({
  name: 'tempSpots',
  initialState: initialState,
  reducers: {
    ...reducerDefaultCases(initialState),
  },
  extraReducers: builder => {
    addExtraReducerDefaultCases(builder, ListViewTypes.TEMP_SPOTS)

    builder.addCase(vote.fulfilled, (state, action) => {
      const tempSpot = listViewReducerHandlers.like.fulfilled(state, {
        listItemId: action.payload.tempSpotId,
        result: action.payload.result?.votes,
      }) as TempSpotDto

      tempSpot!.verificationProcess!.isVerified =
        action.payload.result!.verified
    })
  },
})

export const tempSpotActions = tempSpotsSlice.actions
export default tempSpotsSlice.reducer
