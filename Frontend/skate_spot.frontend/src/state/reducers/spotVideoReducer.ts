import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SpotVideoDto } from '../../skate_spot_api/client'
import { spotVideoLike } from '../actions/spotVideoActions'
import { ListViewTypes } from '../generic/listViewGenerics'
import { reducerDefaultCases } from './genericListViewReducer'
import {
  addExtraReducerDefaultCases,
  listViewReducerHandlers,
  ListViewState,
} from './genericListViewReducer'

export type SpotVideoState = ListViewState<SpotVideoDto>

const initialState: SpotVideoState = {
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

const spotVideoSlice = createSlice({
  name: 'spotVideo',
  initialState: initialState,
  reducers: {
    ...reducerDefaultCases(initialState),
    prependVideo: (state, action: PayloadAction<SpotVideoDto>) => {
      state.listWithCount.data.unshift(action.payload)
    },
  },
  extraReducers: builder => {
    addExtraReducerDefaultCases(builder, ListViewTypes.SPOT_VIDEOS)

    builder.addCase(spotVideoLike.fulfilled, (state, action) => {
      listViewReducerHandlers.like.fulfilled(state, {
        result: action.payload.result,
        listItemId: action.payload.subjectId,
      })
    })
  },
})

export const spotVideoActions = spotVideoSlice.actions
export default spotVideoSlice.reducer
