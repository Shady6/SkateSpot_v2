import { LikeSubjectType } from "../../skate_spot_api/client";
import { ListViewTypes } from "../generic/listViewGenerics";
import { likeThunkCreator } from "./thunk_creators/likeThunkCreator";

export const spotLike = likeThunkCreator(
  ListViewTypes.SPOTS,
  LikeSubjectType.Spots
);
