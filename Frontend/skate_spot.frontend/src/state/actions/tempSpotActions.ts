import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../functions/sendRequestWithFlashMsgOnError";
import { LikeSubjectType } from "../../skate_spot_api/client";
import { ListViewTypes } from "../generic/listViewGenerics";
import { RootState } from "../store";
import {
  commentThunkCreator,
  fetchlistItemsThunkCreator,
  likeThunkCreator,
} from "./genericListViewActions";

export const fetchNewTempSpots = fetchlistItemsThunkCreator(
  ListViewTypes.TEMP_SPOTS
);

export const comment = commentThunkCreator(ListViewTypes.TEMP_SPOTS);

export const likeComment = likeThunkCreator(
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
