import { LikeSubjectType } from "../../skate_spot_api/client";
import { ListViewTypes } from "../generic/listViewGenerics";
import { fetchlistItemsThunkCreator } from "./thunk_creators/fetchlistItemsThunkCreator";
import { fetchlistItemsCustomFuncThunkCreator } from "./thunk_creators/fetchlistItemsCustomFuncThunkCreator";
import { commentThunkCreator } from "./thunk_creators/commentThunkCreator";
import { likeThunkCreator } from "./thunk_creators/likeThunkCreator";
import { deleteCommentThunkCreator } from "./thunk_creators/deleteCommentThunkCreator";
import { editCommentThunkCreator } from "./thunk_creators/editCommentThunkCreator";

export const spotVideoFetch = fetchlistItemsThunkCreator(
  ListViewTypes.SPOT_VIDEOS
);

export const customFuncSpotVideoFetch = fetchlistItemsCustomFuncThunkCreator(
  ListViewTypes.SPOT_VIDEOS
);

export const spotVideoComment = commentThunkCreator(ListViewTypes.SPOT_VIDEOS);

export const spotVideoDeleteComment = deleteCommentThunkCreator(
  ListViewTypes.SPOT_VIDEOS
);

export const spotVideoEditComment = editCommentThunkCreator(
  ListViewTypes.SPOT_VIDEOS
);

export const spotVideoLike = likeThunkCreator(
  ListViewTypes.SPOT_VIDEOS,
  LikeSubjectType.SpotVideos
);

export const spotVideoLikeComment = likeThunkCreator(
  ListViewTypes.SPOT_VIDEOS,
  LikeSubjectType.Comments
);
