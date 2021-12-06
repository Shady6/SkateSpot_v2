import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequestWithFlashMsgOnError } from '../../functions/request/sendRequestWithFlashMsgOnError'
import { RootState } from '../store'

export const loadStats = createAsyncThunk(
  'userProfile/getStats',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const globalState = getState() as RootState

    const res = await sendRequestWithFlashMsgOnError(
      dispatch,
      globalState.auth.content,
      (client, token) => client.get_User_Stats(token),
      'Error occured while fetching stats.'
    )

    if (res.error) return rejectWithValue(null)
    return res.content
  }
)
