import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../../functions/request/sendRequestWithFlashMsgOnError";
import {
  listViewSpecifics,
  ListViewTypes,
} from "../../generic/listViewGenerics";
import {
  ListWithCount,
  WithSocial,
} from "../../reducers/genericListViewReducer";
import { RootState } from "../../store";

export const fetchlistItemsThunkCreator = (listType: ListViewTypes) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/fetchListItems`,
    async (_, { getState, dispatch, rejectWithValue }) => {
      const globalState = getState() as RootState;
      const specificState =
        listViewSpecifics[listType].getSpecificState(globalState);
      const res = await sendRequestWithFlashMsgOnError(
        dispatch,
        globalState.auth.content,
        (client) =>
          listViewSpecifics[listType].fetchListItems(
            client,
            specificState.paging.take,
            specificState.paging.skip
          ),
        "Error occured while loading next records, please try again later."
      );

      if (res.error) return rejectWithValue(null);
      return res.content as ListWithCount<WithSocial>;
    }
  );
};
