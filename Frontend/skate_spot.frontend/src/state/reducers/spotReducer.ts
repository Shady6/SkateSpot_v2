import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SpotDto } from '../../skate_spot_api/client'
import { spotLike } from '../actions/spotAcionts'
import { ListViewTypes } from '../generic/listViewGenerics'
import {
  addDefaultCases,
  listViewReducerHandlers,
  ListViewState,
} from './genericListViewReducer'

export type SpotState = ListViewState<SpotDto>

const initialState: SpotState = {
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

const spotSlice = createSlice({
  name: 'spots',
  initialState: initialState,
  reducers: {
    setSpots: (state, action: PayloadAction<SpotDto[]>) => {
      listViewReducerHandlers.setItems(state, action.payload)
    },
    reset: () => {
      return listViewReducerHandlers.reset(initialState) as SpotState
    },
  },
  extraReducers: builder => {
    addDefaultCases(builder, ListViewTypes.SPOTS)

    builder.addCase(spotLike.fulfilled, (state, action) => {
      listViewReducerHandlers.like.fulfilled(state, {
        result: action.payload.result,
        listItemId: action.payload.subjectId,
      })
    })
  },
})

export const spotActions = spotSlice.actions
export default spotSlice.reducer
