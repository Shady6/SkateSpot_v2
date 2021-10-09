import { createSlice } from "@reduxjs/toolkit";
import { ITempSpotWithVerificationDto } from "../../skate_spot_api/client";
import { fetchNewTempSpots } from "../actions/tempSpotActions";

export interface TempSpotsState {
  tempSpots: {
    data: ITempSpotWithVerificationDto[];
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
            ...(action.payload.data as ITempSpotWithVerificationDto[])
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
