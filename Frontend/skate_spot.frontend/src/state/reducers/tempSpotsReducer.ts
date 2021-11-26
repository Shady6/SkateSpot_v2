import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TempSpotWithVerificationDto } from '../../skate_spot_api/client'
import { vote } from '../actions/tempSpotActions'
import { ListViewTypes } from '../generic/listViewGenerics'
import {
  addDefaultCases,
  listViewReducerHandlers,
  ListViewState,
} from './genericListViewReducer'

export type TempSpotState = ListViewState<TempSpotWithVerificationDto>

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
    setTempSpots: (
      state,
      action: PayloadAction<TempSpotWithVerificationDto[]>
    ) => {
      listViewReducerHandlers.setItems(state, action.payload)
    },
    reset: () => {
      return listViewReducerHandlers.reset(initialState) as TempSpotState
    },
  },
  extraReducers: builder => {
    addDefaultCases(builder, ListViewTypes.TEMP_SPOTS)

    builder.addCase(vote.fulfilled, (state, action) => {
      const tempSpot = listViewReducerHandlers.like.fulfilled(state, {
        listItemId: action.payload.tempSpotId,
        result: action.payload.result?.votes,
      }) as TempSpotWithVerificationDto

      tempSpot!.verificationProcess!.isVerified =
        action.payload.result!.verified
    })
  },
})

export const tempSpotActions = tempSpotsSlice.actions
export default tempSpotsSlice.reducer
