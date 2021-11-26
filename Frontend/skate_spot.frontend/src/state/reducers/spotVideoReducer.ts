import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SpotVideoDto } from '../../skate_spot_api/client'
import { spotVideoLike } from '../actions/spotVideoActions'
import { ListViewTypes } from '../generic/listViewGenerics'
import {
  addDefaultCases,
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
    setVideos: (state, action: PayloadAction<SpotVideoDto[]>) => {
      listViewReducerHandlers.setItems(state, action.payload)
    },
    prependVideo: (state, action: PayloadAction<SpotVideoDto>) => {
      state.listWithCount.data.unshift(action.payload)
    },
    reset: () => {
      return listViewReducerHandlers.reset(initialState) as SpotVideoState
    },
  },
  extraReducers: builder => {
    addDefaultCases(builder, ListViewTypes.SPOT_VIDEOS)

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
