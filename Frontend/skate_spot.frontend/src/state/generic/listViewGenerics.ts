import { ApiClient, ApiResponse } from "../../skate_spot_api/apiClient";
import {
  CommentDto,
  CommentSubjectType,
  TempSpotWithVerificationDto,
} from "../../skate_spot_api/client";
import {
  ListViewState,
  ListWithCount,
} from "../reducers/genericListViewReducer";
import { RootState } from "../store";
export interface IListViewSpecifics {
  spots: ListViewSpecification;
  tempSpots: ListViewSpecification;
  spotVideos: ListViewSpecification;
}

export interface ListViewSpecification {
  fetchListItems: (
    client: ApiClient,
    take: number,
    skip: number
  ) => Promise<ApiResponse<ListWithCount<any>>>;
  getSpecificState: (state: RootState) => ListViewState<any>;
  name: string;
  commentSubjectType: CommentSubjectType;
}

export const listViewSpecifics: IListViewSpecifics = {
  // @ts-ignore
  spots: undefined,
  tempSpots: {
    fetchListItems: (client: ApiClient, take: number, skip: number) =>
      client.get_Temp_Spots(take, skip) as Promise<
        ApiResponse<ListWithCount<TempSpotWithVerificationDto>>
      >,
    getSpecificState: (state: RootState) => state.tempSpotsState,
    name: "tempSpots",
    commentSubjectType: CommentSubjectType.TempSpots,
  },
  // @ts-ignore
  spotVideos: undefined,
};

export enum ListViewTypes {
  SPOTS = "spots",
  TEMP_SPOTS = "tempSpots",
  SPOT_VIDEOS = "spotVideos",
}

export interface CommentActionReturnType {
  comment: CommentDto;
  listItemId: string;
}
