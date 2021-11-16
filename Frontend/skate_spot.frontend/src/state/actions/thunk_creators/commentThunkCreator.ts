import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../../functions/request/sendRequestWithFlashMsgOnError";
import { CommentDto } from "../../../skate_spot_api/client";
import {
  CommentActionReturnType,
  listViewSpecifics,
  ListViewTypes,
} from "../../generic/listViewGenerics";
import { RootState } from "../../store";

export const commentThunkCreator = (listType: ListViewTypes) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/comment`,
    async (
      { listItemId, text }: { listItemId: string; text: string },
      { getState, dispatch, rejectWithValue }
    ) => {
      const state = getState() as RootState;
      const res = await sendRequestWithFlashMsgOnError(
        dispatch,
        state.auth.content,
        (client, token) =>
          client.comment(
            listViewSpecifics[listType].commentSubjectType,
            listItemId,
            token,
            { text }
          ),
        "Couldn't add comment, please try again later"
      );

      if (res.error) return rejectWithValue(null);
      return {
        comment: res.content as CommentDto,
        listItemId,
      } as CommentActionReturnType;
    }
  );
};
