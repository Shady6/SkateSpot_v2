import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useClearFilters } from '../../hooks/useClearFilters'
import { useFetchOnFilterChanged } from '../../hooks/useFetchOnFilterChanged'
import { useFetchOnScroll } from '../../hooks/useFetchOnScroll'
import { SpotDto, SpotVideoDto, TempSpotDto } from '../../skate_spot_api/client'
import { getAllCommonThunks } from '../../state/actions/thunk_creators/allCommonThunks'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { ListViewState } from '../../state/reducers/genericListViewReducer'
import { RootState } from '../../state/store'
import { FilterAndSortPane } from '../filters/FilterAndSortPane'
import { Spot } from '../spot/Spot'
import { SpotVideo } from '../spot_video/spot_videos/SpotVideo'
import { TempSpot } from '../temp_spot/main/TempSpot'

interface Props {
  listViewType: ListViewTypes
}

export const ListItemsMainPage: React.FC<Props> = ({ listViewType }) => {
  const dispatch = useDispatch()
  const [pageInitialized, setPageInitialized] = useState(false)

  useEffect(() => {
    setPageInitialized(true)
    dispatch(getAllCommonThunks()[listViewType].fetchListItems())
  }, [])

  useFetchOnScroll(
    getAllCommonThunks()[listViewType].fetchListItems,
    listViewType
  )
  useClearFilters()
  useFetchOnFilterChanged(pageInitialized, listViewType)

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
      case ListViewTypes.TEMP_SPOTS:
        return (
          <TempSpot
            key={(listItem as { id: string }).id}
            tempSpot={listItem as TempSpotDto}
          />
        )
    }
  }

  return (
    <>
      <div className='row m-0 mt-5' style={{ fontSize: '1rem' }}>
        <div className='col-3'>
          <div
            className='col-3 d-none d-lg-block'
            style={{ position: 'fixed' }}>
            <FilterAndSortPane listViewType={listViewType} />
          </div>
        </div>
        <div className='col-1 d-none d-lg-block'></div>
        <div className='col-12 col-lg-6 justify-content-center d-flex'>
          {!state.loading &&
            !state.error &&
            state.listWithCount.data.length === 0 && (
              <p>There is nothing to view here 😥</p>
            )}
          {state.listWithCount.data.map(l => getListItemComponent(l))}
          {state.loading && <CircularProgress color='secondary' />}
        </div>
      </div>
    </>
  )
}
