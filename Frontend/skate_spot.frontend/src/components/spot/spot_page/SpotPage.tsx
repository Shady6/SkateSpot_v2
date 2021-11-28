import { CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import _ from 'underscore'
import { useFetchOnFilterChanged } from '../../../hooks/useFetchOnFilterChanged'
import { useFetchOnScroll } from '../../../hooks/useFetchOnScroll'
import { useSpotFromHistoryStateOrFetch } from '../../../hooks/useSpotFromHistoryStateOrFetch'
import { Routes } from '../../../routes/appRoutes'
import { ApiResponse } from '../../../skate_spot_api/apiClient'
import { getAllCommonActions } from '../../../state/actions/allCommonActions'
import { customFuncSpotVideoFetch } from '../../../state/actions/spotVideoActions'
import { ListViewTypes } from '../../../state/generic/listViewGenerics'
import { ISorting } from '../../../state/reducers/filtersReducer'
import {
  ListWithCount,
  WithSocial,
} from '../../../state/reducers/genericListViewReducer'
import { RootState, useRootState } from '../../../state/store'
import { SortPane } from '../../filters/SortPane'
import { SpotVideo } from '../../spot_video/videos_of_spot/SpotVideo'
import { SpotDetails } from './SpotDetails'

interface Props {}

export const SpotPage: React.FC<Props> = () => {
  const state = useRootState()
  const dispatch = useDispatch()
  const sorting = useSelector<RootState, ISorting>(
    state => state.filtersState.appliedFilter.sort,
    _.isEqual
  )
  const history = useHistory()
  const path = history.location.pathname.split('/')
  const spotPathPart = Routes.SPOTS.replace('/', '')
  const spotName = path[path.indexOf(spotPathPart) + 1]
  useSpotFromHistoryStateOrFetch(spotName)

  const spot = state.spotsState.listWithCount.data?.[0]

  const customFetchThunk = () =>
    customFuncSpotVideoFetch({
      fetchFunc: (client, take, skip) =>
        client.get_Spot_Videos_Of_Spot(
          spotName,
          take,
          skip,
          sorting.option,
          sorting.ascending,
          undefined
        ) as Promise<ApiResponse<ListWithCount<WithSocial>>>,
    })

  useEffect(
    () => () => {
      dispatch(getAllCommonActions().spotVideos.reset())
    },
    []
  )

  useFetchOnScroll(customFetchThunk, ListViewTypes.SPOT_VIDEOS)

  useFetchOnFilterChanged(true, ListViewTypes.SPOT_VIDEOS, customFetchThunk)

  return (
    <div className='mt-5' style={{ fontSize: '1rem' }}>
      <div className='row mt-5 mx-0'>
        <div className='col-3'></div>
        <div className='col-6'>{spot && <SpotDetails spot={spot} />}</div>
      </div>

      <div className='row mx-0'>
        <div className='col-2'>
          <SortPane listViewType={ListViewTypes.SPOT_VIDEOS} />
        </div>
        <div className='col-1'></div>
        <div className='col-6'>
          <h4 className='mb-5'>Videos</h4>
          {state.spotVideosState.listWithCount?.data?.map(t => {
            return (
              <SpotVideo key={t.createdAt as unknown as string} spotVideo={t} />
            )
          })}
          {state.spotVideosState.loading && (
            <CircularProgress color='secondary' />
          )}
        </div>
      </div>
    </div>
  )
}
