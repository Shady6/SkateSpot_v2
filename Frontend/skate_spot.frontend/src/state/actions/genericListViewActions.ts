import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../functions/sendRequestWithFlashMsgOnError";
import { CommentDto, LikeSubjectType } from "../../skate_spot_api/client";
import {
  CommentActionReturnType,
  listViewSpecifics,
  ListViewTypes,
} from "../generic/listViewGenerics";
import { RootState } from "../store";

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
      return res.content;
    }
  );
};

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

export const likeThunkCreator = (
  listType: ListViewTypes,
  likeSubjectType: LikeSubjectType
) => {
  return createAsyncThunk(
    `${listViewSpecifics[listType].name}/like/${
      likeSubjectType === LikeSubjectType.Comments
        ? LikeSubjectType.Comments
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
