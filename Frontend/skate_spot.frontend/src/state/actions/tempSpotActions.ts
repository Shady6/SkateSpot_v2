import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestWithFlashMsgOnError } from "../../functions/sendRequestWithFlashMsgOnError";
import {
  CommentSubjectType,
  TempSpotWithVerificationDtoWithTotalCount,
  VoteResult,
} from "../../skate_spot_api/client";
import { RootState } from "../store";
import { CommentDto } from "../../skate_spot_api/client";

export const fetchNewTempSpots = createAsyncThunk(
  "tempSpots/fetch",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const res = await sendRequestWithFlashMsgOnError(
      dispatch,
      state.auth.content,
      (client) =>
        client.get_Temp_Spots(
          state.tempSpotsState.paging.take,
          state.tempSpotsState.paging.skip
        ),
      "Error occured while loading next temp spots, please try again later."
    );

    if (res.error) return rejectWithValue(null);
    return res.content as TempSpotWithVerificationDtoWithTotalCount;
  }
);

export const vote = createAsyncThunk(
  "tempSpots/vote",
  async (
    {
      tempSpotId,
      isReal,
      deletedVote,
    }: { tempSpotId: string; isReal: boolean; deletedVote: boolean },
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
      "Error occured while voting, please try again later."
    );

    if (res.error) return rejectWithValue(null);
    return {
      voteResult: res.content as VoteResult,
      tempSpotId: tempSpotId,
    };
  }
);

export const comment = createAsyncThunk(
  "tempSpots/comment",
  async (
    { tempSpotId, text }: { tempSpotId: string; text: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const res = await sendRequestWithFlashMsgOnError(
      dispatch,
      state.auth.content,
      (client, token) =>
        client.comment(CommentSubjectType.TempSpots, tempSpotId, token, {
          text: text,
        }),
      "Couldn't add comment, please try again later."
    );

    if (res.error) return rejectWithValue(null);
    return { comment: res.content as CommentDto, tempSpotId };
  }
);
