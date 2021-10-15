import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { TempSpotWithVerificationDto } from "../../skate_spot_api/client";
import { fetchNewTempSpots } from "../actions/tempSpotActions";

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
  reducers: {
    updateVotes: (
      state,
      action: PayloadAction<{
        tempSpotId: string;
        voterId: string;
        deletedVote: boolean;
        isReal: boolean;
      }>
    ) => {
      const { tempSpotId, voterId, deletedVote, isReal } = action.payload;
      const t = state.tempSpots.data.find((t) => t.id === tempSpotId);

      t!.verificationProcess!.votes = t!.verificationProcess!.votes!.filter(
        (v) => v.voterId !== voterId
      );
      if (!deletedVote)
        t!.verificationProcess!.votes!.push({ isReal, voterId });
    },
  },
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
      });
  },
});

export default tempSpotsSlice.reducer;
export const { updateVotes } = tempSpotsSlice.actions;
