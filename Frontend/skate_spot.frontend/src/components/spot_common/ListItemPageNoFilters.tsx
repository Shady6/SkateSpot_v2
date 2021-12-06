import { CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchOnScroll } from '../../hooks/useFetchOnScroll'
import { ApiClient, ApiResponse } from '../../skate_spot_api/apiClient'
import {
  SpotDto,
  SpotVideoDto,
  UserInteractionType,
} from '../../skate_spot_api/client'
import { getAllCommonActions } from '../../state/actions/allCommonActions'
import { getAllCommonThunks } from '../../state/actions/thunk_creators/allCommonThunks'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import {
  ListViewState,
  ListWithCount,
  WithSocial,
} from '../../state/reducers/genericListViewReducer'
import { RootState } from '../../state/store'
import { Spot } from '../spot/Spot'
import { SpotVideo } from '../spot_video/spot_videos/SpotVideo'

interface Props {
  listViewType: ListViewTypes
  fetchFunc: (
    client: ApiClient,
    take: number,
    skip: number
  ) => Promise<ApiResponse<ListWithCount<WithSocial>>>
  userInteractionType: UserInteractionType
}

export const ListItemPageNoFilters: React.FC<Props> = ({
  listViewType,
  fetchFunc,
  userInteractionType,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCommonActions()[listViewType].reset())
    dispatch(
      getAllCommonThunks()[listViewType].fetchListItemsCustomFunc({ fetchFunc })
    )
  }, [listViewType, userInteractionType])

  useFetchOnScroll(
    getAllCommonThunks()[listViewType].fetchListItemsCustomFunc({ fetchFunc }),
    listViewType
  )

  const state = useSelector<RootState, ListViewState<any>>(
    // @ts-ignore
    state => state[listViewType + 'State']
  )

  const getListItemComponent = (listItem: any) => {
    switch (listViewType) {
      case ListViewTypes.SPOTS:
        return (
          <Spot
            key={(listItem as { id: string }).id}
            spot={listItem as SpotDto}
          />
        )
      case ListViewTypes.SPOT_VIDEOS:
        return (
          <SpotVideo
            key={(listItem as { id: string }).id}
            spotVideo={listItem as SpotVideoDto}
          />
        )
    }
  }

  return (
    <div className='container m-0 mt-5' style={{ fontSize: '1rem' }}>
      {!state.loading &&
        !state.error &&
        state.listWithCount.data.length === 0 && (
          <p>There is nothing to view here 😥</p>
        )}
      {state.listWithCount.data.map(l => getListItemComponent(l))}
      {state.loading && (
        <>
          <span>Loading activities </span>
          <CircularProgress color='secondary' />
        </>
      )}
    </div>
  )
}
