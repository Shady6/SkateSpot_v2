import { ApiClient, ApiResponse } from "../../skate_spot_api/apiClient";
import {
  CommentDto,
  CommentSubjectType,
  SpotDto,
  TempSpotWithVerificationDto,
} from "../../skate_spot_api/client";
import {
  ListViewState,
  ListWithCount,
  WithSocial,
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
  ) => Promise<ApiResponse<ListWithCount<WithSocial>>>;
  getSpecificState: (state: RootState) => ListViewState<WithSocial>;
  name: string;
  commentSubjectType: CommentSubjectType;
}

export const listViewSpecifics: IListViewSpecifics = {
  spots: {
    fetchListItems: (client: ApiClient, take: number, skip: number) =>
      client.get_Spots(take, skip) as Promise<
        ApiResponse<ListWithCount<SpotDto>>
      >,
    getSpecificState: (state: RootState) => state.spotsState,
    name: "spots",
    commentSubjectType: CommentSubjectType.Spots,
  },
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
