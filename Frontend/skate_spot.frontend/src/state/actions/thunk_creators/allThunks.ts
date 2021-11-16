//@ts-nocheck

import { fetchlistItemsThunkCreator } from "./fetchlistItemsThunkCreator";
import { commentThunkCreator } from "./commentThunkCreator";
import {
  DeleteComment,
  deleteCommentThunkCreator,
} from "./deleteCommentThunkCreator";
import { editCommentThunkCreator } from "./editCommentThunkCreator";
import { likeThunkCreator } from "./likeThunkCreator";
import {
  CommentActionReturnType,
  ListViewTypes,
} from "../../generic/listViewGenerics";
import { AsyncThunk } from "@reduxjs/toolkit";
import {
  ListWithCount,
  WithSocial,
} from "../../reducers/genericListViewReducer";
import { LikeDto, LikeSubjectType } from "../../../skate_spot_api/client";

export const genericThunkActions = {
  fetchListItems: fetchlistItemsThunkCreator,
  comment: commentThunkCreator,
  deleteComment: deleteCommentThunkCreator,
  editComment: editCommentThunkCreator,
  // Like comment because this thunk creator is only used for liking comments,
  // liking list objects is done separetely
  likeComment: likeThunkCreator,
};

export const getAllThunks = () => {
  let thunkActions = {} as any;
  Object.keys(ListViewTypes).forEach((listViewType) => {
    thunkActions[ListViewTypes[listViewType]] = {};
    Object.keys(genericThunkActions).forEach((genericThunkKey) => {
      if (
        genericThunkActions[genericThunkKey].name ===
        genericThunkActions.likeComment.name
      )
        thunkActions[ListViewTypes[listViewType]][genericThunkKey] =
          genericThunkActions[genericThunkKey](
            ListViewTypes[listViewType],
            LikeSubjectType.Comments
          );
      else
        thunkActions[ListViewTypes[listViewType]][genericThunkKey] =
          genericThunkActions[genericThunkKey](ListViewTypes[listViewType]);
    });
  });
  return thunkActions as {
    [index in ListViewTypes]: {
      fetchListItems: AsyncThunk<ListWithCount<WithSocial>, void, {}>;
      comment: AsyncThunk<
        CommentActionReturnType,
        {
          listItemId: string;
          text: string;
        },
        {}
      >;
      deleteComment: AsyncThunk<
        {
          listItemId: string;
          commentId: string;
        },
        DeleteComment,
        {}
      >;
      editComment: AsyncThunk<
        {
          listItemId: string;
          commentId: string;
          newText: string;
        },
        {
          listItemId: string;
          commentId: string;
          newText: string;
        },
        {}
      >;
      likeComment: AsyncThunk<
        {
          result: LikeDto[] | undefined;
          likeSubjectType: LikeSubjectType;
          subjectId: string;
          parentId: string | undefined;
        },
        {
          isPositive: boolean;
          deletedLike: boolean;
          subjectId: string;
          parentId?: string | undefined;
        },
        {}
      >;
    };
  };
};
