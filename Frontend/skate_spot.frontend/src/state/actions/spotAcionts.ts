import { LikeSubjectType } from "../../skate_spot_api/client";
import { ListViewTypes } from "../generic/listViewGenerics";
import {
  commentThunkCreator,
  fetchlistItemsThunkCreator,
  likeThunkCreator,
} from "./genericListViewActions";

export const spotFetch = fetchlistItemsThunkCreator(ListViewTypes.SPOTS);

export const spotComment = commentThunkCreator(ListViewTypes.SPOTS);

export const spotLike = likeThunkCreator(
  ListViewTypes.SPOTS,
  LikeSubjectType.Spots
);

export const spotLikeComment = likeThunkCreator(
  ListViewTypes.SPOTS,
  LikeSubjectType.Comments
);
