import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequestWithFlashMsgOnError } from '../../../functions/request/sendRequestWithFlashMsgOnError'
import { ApiClient, ApiResponse } from '../../../skate_spot_api/apiClient'
import {
  listViewSpecifics,
  ListViewTypes,
} from '../../generic/listViewGenerics'
import {
  ListWithCount,
  WithSocial,
} from '../../reducers/genericListViewReducer'
import { RootState } from '../../store'

export const fetchlistItemsCustomFuncThunkCreator = (
  listType: ListViewTypes
) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/fetchListItems`,
    async (
      {
        fetchFunc,
      }: {
        fetchFunc: (
          client: ApiClient,
          take: number,
          skip: number
        ) => Promise<ApiResponse<ListWithCount<WithSocial>>>
      },
      { getState, dispatch, rejectWithValue }
    ) => {
      const globalState = getState() as RootState
      const specificState =
        listViewSpecifics[listType].getSpecificState(globalState)
      const res = await sendRequestWithFlashMsgOnError(
        dispatch,
        globalState.auth.content,
        client =>
          fetchFunc(
            client,
            specificState.paging.take,
            specificState.paging.skip
          ),
        'Error occured while loading next records, please try again later.'
      )

      if (res.error) return rejectWithValue(null)
      return res.content as ListWithCount<WithSocial>
    }
  )
}
