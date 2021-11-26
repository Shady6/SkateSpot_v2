import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequestWithFlashMsgOnError } from '../../../functions/request/sendRequestWithFlashMsgOnError'
import { ApiResponse } from '../../../skate_spot_api/apiClient'
import {
  listViewSpecifics,
  ListViewTypes,
} from '../../generic/listViewGenerics'
import { RootState } from '../../store'

export const deleteCommentThunkCreator = (listType: ListViewTypes) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/deleteComment`,
    async (
      { listItemId, commentId }: DeleteComment,
      { getState, dispatch, rejectWithValue }
    ) => {
      const state = getState() as RootState

      const res = await sendRequestWithFlashMsgOnError(
        dispatch,
        state.auth.content,
        (client, token) =>
          client.delete_Comment(
            listItemId,
            listViewSpecifics[listType].commentSubjectType,
            commentId,
            token
          ) as unknown as Promise<ApiResponse<any>>,
        "Couldn't delete comment, please try again later"
      )

      if (res.error) return rejectWithValue(null)
      return {
        listItemId,
        commentId,
      }
    }
  )
}

export type DeleteComment = { listItemId: string; commentId: string }
