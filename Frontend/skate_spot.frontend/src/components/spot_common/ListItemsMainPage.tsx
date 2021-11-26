import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchOnScroll } from '../../hooks/useFetchOnScroll'
import {
  SpotDto,
  SpotVideoDto,
  TempSpotWithVerificationDto,
} from '../../skate_spot_api/client'
import { getAllThunks } from '../../state/actions/thunk_creators/allThunks'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { ListViewState } from '../../state/reducers/genericListViewReducer'
import { RootState } from '../../state/store'
import { FilterAndSortPane } from '../filters/FilterAndSortPane'
import { Spot } from '../spot/Spot'
import { SpotVideo } from '../spot_video/videos_of_spot/SpotVideo'
import { TempSpot } from '../temp_spot/main/TempSpot'

interface Props {
  listViewType: ListViewTypes
}

export const ListItemsMainPage: React.FC<Props> = ({ listViewType }) => {
  useFetchOnScroll(getAllThunks()[listViewType].fetchListItems, listViewType)

  const state = useSelector<RootState, ListViewState<any>>(
    // @ts-ignore
    state => state[listViewType + 'State']
  )

  const getListItemComponent = (l: any) => {
    switch (listViewType) {
      case ListViewTypes.SPOTS:
        return <Spot key={(l as { id: string }).id} spot={l as SpotDto} />
      case ListViewTypes.SPOT_VIDEOS:
        return (
          <SpotVideo
            key={(l as { id: string }).id}
            spotVideo={l as SpotVideoDto}
          />
        )
      case ListViewTypes.TEMP_SPOTS:
        return (
          <TempSpot
            key={(l as { id: string }).id}
            tempSpot={l as TempSpotWithVerificationDto}
          />
        )
    }
  }

  return (
    <>
      <div className='row m-0 mt-5' style={{ fontSize: '1rem' }}>
        <div className='col-2'>
          <FilterAndSortPane />
        </div>
        <div className='col-1'></div>
        <div className='col-6'>
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
