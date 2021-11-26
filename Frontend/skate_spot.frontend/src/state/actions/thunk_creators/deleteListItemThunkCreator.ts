import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequestWithFlashMsgOnError } from '../../../functions/request/sendRequestWithFlashMsgOnError'
import { ApiClient, ApiResponse } from '../../../skate_spot_api/apiClient'
import {
  listViewSpecifics,
  ListViewTypes,
} from '../../generic/listViewGenerics'
import { RootState } from '../../store'

export const deleteListItemThunkCreator = (listType: ListViewTypes) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/deleteListItem`,
    async (
      {
        listItemId,
        deleteFunc,
      }: {
        listItemId: string
        deleteFunc: (client: ApiClient, token: string) => Promise<void>
      },
      { getState, dispatch, rejectWithValue }
    ) => {
      const state = getState() as RootState
      const res = await sendRequestWithFlashMsgOnError(
        dispatch,
        state.auth.content,
        (client, token) =>
          deleteFunc(client, token) as unknown as Promise<ApiResponse<any>>
      )

      if (res.error) return rejectWithValue(null)
      return {
        listItemId,
      }
    }
  )
}
