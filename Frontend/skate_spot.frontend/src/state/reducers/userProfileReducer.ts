import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInteractionType, UserStats } from '../../skate_spot_api/client'
import { loadStats } from '../actions/userProfileActions'

export enum UserInteractionListItem {
  SPOTS = 'Spots',
  SPOT_VIDEOS = 'SpotVideos',
}

export interface UserProfileState {
  stats: {
    loading: boolean
    value: UserStats
  }
  listItems: {
    interactionType: UserInteractionType
    what: UserInteractionListItem
  }
}

const initialState: UserProfileState = {
  stats: {
    loading: false,
    value: {
      spotStats: {
        addedCount: 0,
        commentedCount: 0,
        likedCount: 0,
      },
      spotVideoStats: {
        addedCount: 0,
        commentedCount: 0,
        likedCount: 0,
      },
    },
  },
  listItems: {
    interactionType: UserInteractionType.Added,
    what: UserInteractionListItem.SPOTS,
  },
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: initialState,
  reducers: {
    setInteractionType: (state, action: PayloadAction<UserInteractionType>) => {
      state.listItems.interactionType = action.payload
    },
    setWhat: (state, action: PayloadAction<UserInteractionListItem>) => {
      state.listItems.what = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(loadStats.pending, state => {
      state.stats.loading = true
    })
    builder.addCase(loadStats.fulfilled, (state, action) => {
      state.stats.loading = false
      //   state.stats.value = action.payload
    })
    builder.addCase(loadStats.rejected, state => {
      state.stats.loading = false
      state.stats.value = initialState.stats.value
    })
  },
})

export const userProfileActions = userProfileSlice.actions
export default userProfileSlice.reducer
