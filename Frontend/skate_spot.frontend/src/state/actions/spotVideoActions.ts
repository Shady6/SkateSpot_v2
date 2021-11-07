import { LikeSubjectType } from "../../skate_spot_api/client";
import { ListViewTypes } from "../generic/listViewGenerics";
import {
  commentThunkCreator,
  fetchlistItemsCustomFuncThunkCreator,
  fetchlistItemsThunkCreator,
  likeThunkCreator,
} from "./genericListViewActions";

export const spotVideoFetch = fetchlistItemsThunkCreator(
  ListViewTypes.SPOT_VIDEOS
);

export const customFuncSpotVideoFetch = fetchlistItemsCustomFuncThunkCreator(
  ListViewTypes.SPOT_VIDEOS
);

export const spotVideoComment = commentThunkCreator(ListViewTypes.SPOT_VIDEOS);

export const spotVideoLike = likeThunkCreator(
  ListViewTypes.SPOT_VIDEOS,
  LikeSubjectType.SpotVideos
);

export const spotVideoLikeComment = likeThunkCreator(
  ListViewTypes.SPOT_VIDEOS,
  LikeSubjectType.Comments
);
