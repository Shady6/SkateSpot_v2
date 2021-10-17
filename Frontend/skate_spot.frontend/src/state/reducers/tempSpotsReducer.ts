import { createSlice } from "@reduxjs/toolkit";
import { TempSpotWithVerificationDto } from "../../skate_spot_api/client";
import {
  comment,
  fetchNewTempSpots,
  likeComment,
  vote,
} from "../actions/tempSpotActions";
import { ListViewState } from "./genericListViewReducer";

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
      .addCase(fetchNewTempSpots.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchNewTempSpots.fulfilled, (state: TempSpotState, action) => {
        state.loading = false;
        state.error = false;

        if (action.payload?.data?.length !== 0) {
          state?.listWithCount?.data?.push(...action!.payload!.data);
          state.listWithCount.totalCount = action!.payload!.totalCount;
          state.paging.skip += state.paging.take;
        }
      })
      .addCase(fetchNewTempSpots.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(vote.fulfilled, (state, action) => {
        const { result, tempSpotId } = action.payload;
        const tempSpot = state.listWithCount.data?.find(
          (t) => t.id === tempSpotId
        );
        tempSpot!.verificationProcess!.votes = result!.votes;
        tempSpot!.verificationProcess!.isVerified = result!.verified;
      })
      .addCase(comment.fulfilled, (state, action) => {
        const { comment, listItemId: tempSpotId } = action.payload;
        const tempSpot = state.listWithCount.data?.find(
          (t) => t.id === tempSpotId
        );
        tempSpot?.verificationProcess?.discussion?.unshift(comment);
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const { result, subjectId, parentId } = action.payload;
        const tempSpot = state.listWithCount.data?.find(
          (t) => t.id === parentId
        );
        const comment = tempSpot!.verificationProcess!.discussion?.find(
          (c) => c.id === subjectId
        );
        comment!.likes = result;
      });
  },
});

export default tempSpotsSlice.reducer;
