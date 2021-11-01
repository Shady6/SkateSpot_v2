import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpotDto } from "../../skate_spot_api/client";
import {
  spotComment,
  spotFetch,
  spotLike,
  spotLikeComment,
} from "../actions/spotAcionts";
import {
  listViewReducerHandlers,
  ListViewState,
} from "./genericListViewReducer";

export type SpotState = ListViewState<SpotDto>;

const initialState: SpotState = {
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

const spotSlice = createSlice({
  name: "spots",
  initialState: initialState,
  reducers: {
    setSpots: (state, action: PayloadAction<SpotDto[]>) => {
      listViewReducerHandlers.setItems(state, action.payload);
    },
    reset: () => {
      return listViewReducerHandlers.reset(initialState) as SpotState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(spotFetch.pending, (state) => {
        listViewReducerHandlers.fetchListItems.pending(state);
      })
      .addCase(spotFetch.fulfilled, (state: SpotState, action) => {
        listViewReducerHandlers.fetchListItems.fulfilled(state, action.payload);
      })
      .addCase(spotFetch.rejected, (state) => {
        listViewReducerHandlers.fetchListItems.pending(state);
      })
      .addCase(spotComment.fulfilled, (state, action) => {
        listViewReducerHandlers.comment.fulfilled(state, action.payload);
      })
      .addCase(spotLike.fulfilled, (state, action) => {
        listViewReducerHandlers.like.fulfilled(state, {
          result: action.payload.result,
          listItemId: action.payload.subjectId,
        });
      })
      .addCase(spotLikeComment.fulfilled, (state, action) => {
        listViewReducerHandlers.likeComment.fulfilled(state, action.payload);
      });
  },
});

export const spotActions = spotSlice.actions;
export default spotSlice.reducer;
