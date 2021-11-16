import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../../functions/request/sendRequestWithFlashMsgOnError";
import { LikeSubjectType } from "../../../skate_spot_api/client";
import {
  listViewSpecifics,
  ListViewTypes,
} from "../../generic/listViewGenerics";
import { RootState } from "../../store";

export const likeThunkCreator = (
  listType: ListViewTypes,
  likeSubjectType: LikeSubjectType
) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/like${
      likeSubjectType === LikeSubjectType.Comments
        ? "/" + LikeSubjectType.Comments
        : ""
    }`,
    async (
      {
        isPositive,
        deletedLike,
        subjectId,
        parentId,
      }: {
        isPositive: boolean;
        deletedLike: boolean;
        subjectId: string;
        parentId?: string;
      },
      { getState, dispatch, rejectWithValue }
    ) => {
      const state = getState() as RootState;
      const res = await sendRequestWithFlashMsgOnError(
        dispatch,
        state.auth.content,
        (client, token) =>
          deletedLike
            ? client.delete_Like(subjectId, likeSubjectType, token)
            : client.like(likeSubjectType, subjectId, token, {
                positive: isPositive,
              }),
        `Error occured while liking, please try again later`
      );

      if (res.error) return rejectWithValue(null);
      return {
        result: res.content,
        likeSubjectType,
        subjectId,
        parentId,
      };
    }
  );
};
