import { createSlice } from "@reduxjs/toolkit";
import { TempSpotWithVerificationDto } from "../../skate_spot_api/client";
import {
  tempSpotComment,
  tempSpotFetch,
  tempSpotLikeComment,
  vote,
} from "../actions/tempSpotActions";
import {
  listViewReducerHandlers,
  ListViewState,
} from "./genericListViewReducer";

export type TempSpotState = ListViewState<TempSpotWithVerificationDto>;

const initialState: TempSpotState = {
  listWithCount: {
    data: [],
    totalCount: 0,
  },
  paging: {
    take: 5,
    skip: 0,
  },
  loading: false,
  error: false,
};

const tempSpotsSlice = createSlice({
  name: "tempSpots",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tempSpotFetch.pending, (state) => {
        listViewReducerHandlers.fetchListItems.pending(state);
      })
      .addCase(tempSpotFetch.fulfilled, (state: TempSpotState, action) => {
        listViewReducerHandlers.fetchListItems.fulfilled(state, action.payload);
      })
      .addCase(tempSpotFetch.rejected, (state) => {
        listViewReducerHandlers.fetchListItems.pending(state);
      })
      .addCase(vote.fulfilled, (state, action) => {
        const tempSpot = listViewReducerHandlers.like.fulfilled(state, {
          listItemId: action.payload.tempSpotId,
          result: action.payload.result?.votes,
        }) as TempSpotWithVerificationDto;

        tempSpot!.verificationProcess!.isVerified =
          action.payload.result!.verified;
      })
      .addCase(tempSpotComment.fulfilled, (state, action) => {
        listViewReducerHandlers.comment.fulfilled(state, action.payload);
      })
      .addCase(tempSpotLikeComment.fulfilled, (state, action) => {
        listViewReducerHandlers.likeComment.fulfilled(state, action.payload);
      });
  },
});

export default tempSpotsSlice.reducer;
