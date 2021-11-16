import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../functions/request/sendRequestWithFlashMsgOnError";
import { LikeSubjectType } from "../../skate_spot_api/client";
import { ListViewTypes } from "../generic/listViewGenerics";
import { RootState } from "../store";
import { commentThunkCreator } from "./thunk_creators/commentThunkCreator";
import { deleteCommentThunkCreator } from "./thunk_creators/deleteCommentThunkCreator";
import { editCommentThunkCreator } from "./thunk_creators/editCommentThunkCreator";
import { fetchlistItemsThunkCreator } from "./thunk_creators/fetchlistItemsThunkCreator";
import { likeThunkCreator } from "./thunk_creators/likeThunkCreator";

export const tempSpotFetch = fetchlistItemsThunkCreator(
  ListViewTypes.TEMP_SPOTS
);

export const tempSpotComment = commentThunkCreator(ListViewTypes.TEMP_SPOTS);

export const tempSpotDeleteComment = deleteCommentThunkCreator(
  ListViewTypes.TEMP_SPOTS
);

export const tempSpotEditComment = editCommentThunkCreator(
  ListViewTypes.TEMP_SPOTS
);

export const tempSpotLikeComment = likeThunkCreator(
  ListViewTypes.TEMP_SPOTS,
  LikeSubjectType.Comments
);

export const vote = createAsyncThunk(
  "tempSpots/vote",
  async (
    {
      tempSpotId,
      isReal,
      deletedVote,
    }: {
      tempSpotId: string;
      isReal: boolean;
      deletedVote: boolean;
    },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const res = await sendRequestWithFlashMsgOnError(
      dispatch,
      state.auth.content,
      (client, token) =>
        deletedVote
          ? client.delete_Vote(tempSpotId, token)
          : client.vote(tempSpotId, token, { isReal }),
      `Error occured while voting, please try again later`
    );

    if (res.error) return rejectWithValue(null);
    return {
      result: res.content,
      tempSpotId: tempSpotId,
    };
  }
);
