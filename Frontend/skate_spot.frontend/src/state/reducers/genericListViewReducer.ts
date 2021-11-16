import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import {
  CommentDto,
  LikeDto,
  LikeSubjectType,
  VerificationStatementDto,
} from "../../skate_spot_api/client";
import { getAllThunks } from "../actions/thunk_creators/allThunks";
import { DeleteComment } from "../actions/thunk_creators/deleteCommentThunkCreator";
import { EditComment } from "../actions/thunk_creators/editCommentThunkCreator";
import {
  CommentActionReturnType,
  ListViewTypes,
} from "../generic/listViewGenerics";

export interface WithId {
  id?: string;
}

type NormalLikes = {
  likes: LikeDto[] | undefined;
};
type VoteLikes = {
  verificationProcess: {
    votes: VerificationStatementDto[] | undefined;
  };
};

type NormalComments = {
  comments: CommentDto[] | undefined;
};

type VoteComments = {
  verificationProcess: {
    discussion: CommentDto[] | undefined;
  };
};

export type WithLikes = NormalLikes | VoteLikes;

export type WithComments = NormalComments | VoteComments;

export type WithSocial = WithId & WithLikes & WithComments;

export interface ListWithCount<T extends WithSocial> {
  data: T[];
  totalCount: number;
}

export interface ListViewState<T extends WithSocial> {
  listWithCount: ListWithCount<T>;
  paging: {
    take: number;
    skip: number;
  };
  loading: boolean;
  error: boolean;
}

type ListViewImmerState = WritableDraft<ListViewState<WithSocial>>;

export const listViewReducerHandlers = {
  fetchListItems: {
    pending: (state: ListViewImmerState) => {
      state.loading = true;
      state.error = false;
    },
    fulfilled: (
      state: ListViewImmerState,
      payload: ListWithCount<WithSocial>
    ) => {
      state.loading = false;
      state.error = false;

      if (payload?.data?.length !== 0) {
        state?.listWithCount?.data?.push(...payload!.data);
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
      payload: CommentActionReturnType
    ) => {
      const { comment, listItemId } = payload;
      const listItem = state.listWithCount.data?.find(
        (t) => t.id === listItemId
      );

      if ((listItem as VoteComments).verificationProcess)
        (listItem as VoteComments).verificationProcess.discussion?.unshift(
          comment
        );
      else (listItem as NormalComments).comments?.unshift(comment);
    },
  },
  deleteComment: {
    fulfilled: (state: ListViewImmerState, payload: DeleteComment) => {
      const { commentId, listItemId } = payload;
      const listItem = state.listWithCount.data?.find(
        (t) => t.id === listItemId
      );

      let comment =
        (listItem as VoteComments).verificationProcess?.discussion?.find(
          (c) => c.id === commentId
        ) ||
        (listItem as NormalComments).comments?.find((c) => c.id === commentId);

      comment!.text = "";
      comment!.isDeleted = true;
      comment!.author = { id: "", userName: undefined };
      comment!.authorId = undefined;
    },
  },
  editComment: {
    fulfilled: (state: ListViewImmerState, payload: EditComment) => {
      const { commentId, listItemId, newText } = payload;
      const listItem = state.listWithCount.data?.find(
        (t) => t.id === listItemId
      );

      let comment =
        (listItem as VoteComments).verificationProcess?.discussion?.find(
          (c) => c.id === commentId
        ) ||
        (listItem as NormalComments).comments?.find((c) => c.id === commentId);

      comment!.text = newText;
    },
  },
  like: {
    fulfilled: (
      state: ListViewImmerState,
      payload: {
        result: LikeDto[] | VerificationStatementDto[] | undefined;
        listItemId: string;
      }
    ) => {
      const { result, listItemId } = payload;
      const listItem = state.listWithCount.data?.find(
        (t) => t.id === listItemId
      );

      if ((listItem as VoteLikes).verificationProcess)
        (listItem as VoteLikes).verificationProcess.votes =
          result as VerificationStatementDto[];
      else (listItem as NormalLikes).likes = result as LikeDto[];

      return listItem;
    },
  },
  likeComment: {
    fulfilled: (
      state: ListViewImmerState,
      payload: {
        result: LikeDto[] | undefined;
        likeSubjectType: LikeSubjectType;
        subjectId: string;
        parentId: string | undefined;
      }
    ) => {
      const { result, subjectId, parentId } = payload;
      const listItem = state.listWithCount.data?.find((t) => t.id === parentId);
      let comment: CommentDto | undefined;
      if ((listItem as VoteComments).verificationProcess)
        comment = (
          listItem as VoteComments
        ).verificationProcess.discussion?.find((c) => c.id === subjectId);
      else
        comment = (listItem as NormalComments).comments?.find(
          (c) => c.id === subjectId
        );

      comment!.likes = result;
    },
  },
  setItems: (state: ListViewImmerState, payload: WithSocial[]) => {
    state.listWithCount = {
      data: payload,
      // Total count is not important here, since this action is only needed
      // to properly dispatch comment, like etc. actions on pages, where we dont use
      // fetch action
      totalCount: 0,
    };
  },
  reset: (defaultState: ListViewState<WithSocial>) => {
    return defaultState;
  },
};

export const addDefaultCases = (
  builder: ActionReducerMapBuilder<ListViewImmerState>,
  listViewType: ListViewTypes
) => {
  const thunks = getAllThunks()[listViewType];
  builder
    .addCase(thunks.fetchListItems.pending, (state) => {
      listViewReducerHandlers.fetchListItems.pending(state);
    })
    .addCase(thunks.fetchListItems.fulfilled, (state, action) => {
      listViewReducerHandlers.fetchListItems.fulfilled(state, action.payload);
    })
    .addCase(thunks.fetchListItems.rejected, (state) => {
      listViewReducerHandlers.fetchListItems.rejected(state);
    })
    .addCase(thunks.comment.fulfilled, (state, action) => {
      listViewReducerHandlers.comment.fulfilled(state, action.payload);
    })
    .addCase(thunks.deleteComment.fulfilled, (state, action) => {
      listViewReducerHandlers.deleteComment.fulfilled(state, action.payload);
    })
    .addCase(thunks.editComment.fulfilled, (state, action) => {
      listViewReducerHandlers.editComment.fulfilled(state, action.payload);
    })
    .addCase(thunks.likeComment.fulfilled, (state, action) => {
      listViewReducerHandlers.likeComment.fulfilled(state, action.payload);
    });
};
