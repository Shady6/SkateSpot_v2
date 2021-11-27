import { ApiClient, ApiResponse } from '../../skate_spot_api/apiClient'
import {
  CommentDto,
  CommentSubjectType,
  SpotDto,
  SpotVideoDto,
  TempSpotWithVerificationDto,
} from '../../skate_spot_api/client'
import { IAppliedFilter, IFilter } from '../reducers/filtersReducer'
import {
  ListViewState,
  ListWithCount,
  WithSocial,
} from '../reducers/genericListViewReducer'
import { RootState } from '../store'
export interface IListViewSpecifics {
  spots: ListViewSpecification
  tempSpots: ListViewSpecification
  spotVideos: ListViewSpecification
}

export interface ListViewSpecification {
  fetchListItems: (
    client: ApiClient,
    take: number,
    skip: number,
    snf: IAppliedFilter
  ) => Promise<ApiResponse<ListWithCount<WithSocial>>>
  getSpecificState: (state: RootState) => ListViewState<WithSocial>
  name: string
  commentSubjectType: CommentSubjectType
}

export const listViewSpecifics: IListViewSpecifics = {
  spots: {
    fetchListItems: (
      client: ApiClient,
      take: number,
      skip: number,
      snf: IAppliedFilter
    ) =>
      client.get_Spots(
        take,
        skip,
        snf.sort?.option,
        snf.sort?.ascending,
        snf.filter?.surfaceScore?.gtFiltering,
        snf.filter?.surfaceScore?.score,
        snf.filter?.tags
      ) as Promise<ApiResponse<ListWithCount<SpotDto>>>,
    getSpecificState: (state: RootState) => state.spotsState,
    name: 'spots',
    commentSubjectType: CommentSubjectType.Spots,
  },
  tempSpots: {
    fetchListItems: (
      client: ApiClient,
      take: number,
      skip: number,
      snf: IAppliedFilter
    ) =>
      client.get_Temp_Spots(
        take,
        skip,
        snf.sort?.option,
        snf.sort?.ascending,
        snf.filter?.surfaceScore?.gtFiltering,
        snf.filter?.surfaceScore?.score,
        snf.filter?.tags
      ) as Promise<ApiResponse<ListWithCount<TempSpotWithVerificationDto>>>,
    getSpecificState: (state: RootState) => state.tempSpotsState,
    name: 'tempSpots',
    commentSubjectType: CommentSubjectType.TempSpots,
  },
  spotVideos: {
    fetchListItems: (
      client: ApiClient,
      take: number,
      skip: number,
      snf: IAppliedFilter
    ) => {
      return client.get_Spot_Videos(
        take,
        skip,
        undefined,
        snf.sort?.option,
        snf.sort?.ascending,
        snf.filter?.surfaceScore?.gtFiltering,
        snf.filter?.surfaceScore?.score,
        snf.filter?.tags
      ) as Promise<ApiResponse<ListWithCount<SpotVideoDto>>>
    },
    getSpecificState: (state: RootState) => state.spotVideosState,
    name: 'spotVideos',
    commentSubjectType: CommentSubjectType.SpotVideos,
  },
}

export enum ListViewTypes {
  SPOTS = 'spots',
  TEMP_SPOTS = 'tempSpots',
  SPOT_VIDEOS = 'spotVideos',
}

export interface CommentActionReturnType {
  comment: CommentDto
  listItemId: string
}
