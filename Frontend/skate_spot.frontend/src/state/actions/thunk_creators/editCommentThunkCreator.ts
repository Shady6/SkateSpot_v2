import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../../functions/request/sendRequestWithFlashMsgOnError";
import { ApiResponse } from "../../../skate_spot_api/apiClient";
import {
  listViewSpecifics,
  ListViewTypes,
} from "../../generic/listViewGenerics";
import { RootState } from "../../store";
import { DeleteComment } from "./deleteCommentThunkCreator";

export const editCommentThunkCreator = (listType: ListViewTypes) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/editComment`,
    async (
      {
        listItemId,
        commentId,
        newText,
      }: { listItemId: string; commentId: string; newText: string },
      { getState, dispatch, rejectWithValue }
    ) => {
      const state = getState() as RootState;
      const res = await sendRequestWithFlashMsgOnError(
        dispatch,
        state.auth.content,
        (client, token) =>
          client.edit_Comment(
            listViewSpecifics[listType].commentSubjectType,
            listItemId,
            commentId,
            token,
            {
              newText,
            }
          ) as unknown as Promise<ApiResponse<any>>,
        "Couldn't edit comment, please try again later"
      );

      if (res.error) return rejectWithValue(null);
      return {
        listItemId,
        commentId,
        newText,
      };
    }
  );
};

export type EditComment = DeleteComment & { newText: string };
