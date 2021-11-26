import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequestWithFlashMsgOnError } from '../../functions/request/sendRequestWithFlashMsgOnError'
import { RootState } from '../store'

export const vote = createAsyncThunk(
  'tempSpots/vote',
  async (
    {
      tempSpotId,
      isReal,
      deletedVote,
    }: {
      tempSpotId: string
      isReal: boolean
      deletedVote: boolean
    },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState
    const res = await sendRequestWithFlashMsgOnError(
      dispatch,
      state.auth.content,
      (client, token) =>
        deletedVote
          ? client.delete_Vote(tempSpotId, token)
          : client.vote(tempSpotId, token, { isReal }),
      `Error occured while voting, please try again later`
    )

    if (res.error) return rejectWithValue(null)
    return {
      result: res.content,
      tempSpotId: tempSpotId,
    }
  }
)
