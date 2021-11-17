import { LikeSubjectType } from "../../skate_spot_api/client";
import { ListViewTypes } from "../generic/listViewGenerics";
import { fetchlistItemsCustomFuncThunkCreator } from "./thunk_creators/fetchlistItemsCustomFuncThunkCreator";
import { likeThunkCreator } from "./thunk_creators/likeThunkCreator";

export const customFuncSpotVideoFetch = fetchlistItemsCustomFuncThunkCreator(
  ListViewTypes.SPOT_VIDEOS
);

export const spotVideoLike = likeThunkCreator(
  ListViewTypes.SPOT_VIDEOS,
  LikeSubjectType.SpotVideos
);
