import { createSlice } from "@reduxjs/toolkit";
import { TempSpotWithVerificationDto } from "../../skate_spot_api/client";
import { comment, fetchNewTempSpots, vote } from "../actions/tempSpotActions";

export interface TempSpotsState {
  tempSpots: {
    data: TempSpotWithVerificationDto[];
    totalCount: number;
  };
  paging: {
    take: number;
    skip: number;
  };
  loading: boolean;
  error: boolean;
}

const initialState: TempSpotsState = {
  tempSpots: {
    data: [],
    totalCount: 0,
  },
  paging: {
    take: 10,
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
      .addCase(fetchNewTempSpots.fulfilled, (state: TempSpotsState, action) => {
        state.loading = false;
        state.error = false;

        if (action.payload.data?.length !== 0) {
          state.tempSpots.data.push(
            ...(action.payload.data as TempSpotWithVerificationDto[])
          );
          state.tempSpots.totalCount = action.payload.totalCount as number;
          state.paging.skip += state.paging.take;
        }
      })
      .addCase(fetchNewTempSpots.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(vote.fulfilled, (state, action) => {
        const { voteResult, tempSpotId } = action.payload;
        const tempSpot = state.tempSpots.data.find((t) => t.id === tempSpotId);
        tempSpot!.verificationProcess!.votes = voteResult.votes;
        tempSpot!.verificationProcess!.isVerified = voteResult.verified;
      })
      .addCase(comment.fulfilled, (state, action) => {
        const { comment, tempSpotId } = action.payload;
        const tempSpot = state.tempSpots.data.find((t) => t.id === tempSpotId);
        tempSpot?.verificationProcess?.discussion?.push(comment);
      });
  },
});

export default tempSpotsSlice.reducer;
