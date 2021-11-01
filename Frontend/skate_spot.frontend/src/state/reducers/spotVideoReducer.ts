import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpotVideoDto } from "../../skate_spot_api/client";
import {
  spotVideoComment,
  spotVideoFetch,
  spotVideoLike,
  spotVideoLikeComment,
} from "../actions/spotVideoActions";
import {
  listViewReducerHandlers,
  ListViewState,
} from "./genericListViewReducer";

export type SpotVideoState = ListViewState<SpotVideoDto>;

const initialState: SpotVideoState = {
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

const spotVideoSlice = createSlice({
  name: "tempSpots",
  initialState: initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<SpotVideoDto[]>) => {
      listViewReducerHandlers.setItems(state, action.payload);
    },
    reset: () => {
      return listViewReducerHandlers.reset(initialState) as SpotVideoState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(spotVideoFetch.pending, (state) => {
        listViewReducerHandlers.fetchListItems.pending(state);
      })
      .addCase(spotVideoFetch.fulfilled, (state: SpotVideoState, action) => {
        listViewReducerHandlers.fetchListItems.fulfilled(state, action.payload);
      })
      .addCase(spotVideoFetch.rejected, (state) => {
        listViewReducerHandlers.fetchListItems.pending(state);
      })
      .addCase(spotVideoComment.fulfilled, (state, action) => {
        listViewReducerHandlers.comment.fulfilled(state, action.payload);
      })
      .addCase(spotVideoLike.fulfilled, (state, action) => {
        listViewReducerHandlers.like.fulfilled(state, {
          result: action.payload.result,
          listItemId: action.payload.subjectId,
        });
      })
      .addCase(spotVideoLikeComment.fulfilled, (state, action) => {
        listViewReducerHandlers.likeComment.fulfilled(state, action.payload);
      });
  },
});

export const spotVideoActions = spotVideoSlice.actions;
export default spotVideoSlice.reducer;
