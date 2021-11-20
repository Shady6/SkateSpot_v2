//@ts-nocheck

import { LikeSubjectType } from "../../../skate_spot_api/client";
import { ListViewTypes } from "../../generic/listViewGenerics";
import { commentThunkCreator } from "./commentThunkCreator";
import { deleteCommentThunkCreator } from "./deleteCommentThunkCreator";
import { deleteListItemThunkCreator } from "./deleteListItemThunkCreator";
import { editCommentThunkCreator } from "./editCommentThunkCreator";
import { fetchlistItemsThunkCreator } from "./fetchlistItemsThunkCreator";
import { likeThunkCreator } from "./likeThunkCreator";

export const genericThunkActions = {
  fetchListItems: fetchlistItemsThunkCreator,
  comment: commentThunkCreator,
  deleteComment: deleteCommentThunkCreator,
  editComment: editCommentThunkCreator,
  // liking list objects is done separetely
  likeComment: likeThunkCreator,
  deleteListItem: deleteListItemThunkCreator,
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
      fetchListItems: ReturnType<typeof fetchlistItemsThunkCreator>;
      comment: ReturnType<typeof commentThunkCreator>;
      deleteComment: ReturnType<typeof deleteCommentThunkCreator>;
      editComment: ReturnType<typeof editCommentThunkCreator>;
      likeComment: ReturnType<typeof likeThunkCreator>;
      deleteListItem: ReturnType<typeof deleteListItemThunkCreator>;
    };
  };
};
