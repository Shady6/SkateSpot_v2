import { WritableDraft } from "immer/dist/internal";
import { CommentDto } from "../../skate_spot_api/client";
import { CommentActionReturnType } from "../generic/listViewGenerics";

export interface ListWithCount<T extends { id: string }> {
  data: T[];
  totalCount: number;
}

export interface ListViewState<T extends { id: string }> {
  listWithCount: ListWithCount<T>;
  paging: {
    take: number;
    skip: number;
  };
  loading: boolean;
  error: boolean;
}

type ListViewImmerState = WritableDraft<ListViewState<any>>;

export const handlers = {
  fetchListItems: {
    pending: (state: ListViewImmerState) => {
      state.loading = true;
      state.error = false;
    },
    fulfilled: (state: ListViewImmerState, payload: ListWithCount<any>) => {
      state.loading = false;
      state.error = false;

      if (payload?.data?.length !== 0) {
        state?.listWithCount?.data?.push(payload!.data);
        state.listWithCount.totalCount = payload!.totalCount;
        state.paging.skip += state.paging.take;
      }
    },
    rejected: (state: ListViewImmerState) => {
      state.error = true;
      state.loading = false;
    },
  },
  comment: {
    fulfilled: (
      state: ListViewImmerState,
      payload: CommentActionReturnType,
      comments: WritableDraft<CommentDto[] | undefined>
    ) => {
      //   const { comment, tempSpotId } = payload;
      //   const listItem = state.listWithCount.data?.find(
      //     (t) => t.id === tempSpotId
      //   );
      //   comments?.unshift(payload.comment);
    },
  },
};
