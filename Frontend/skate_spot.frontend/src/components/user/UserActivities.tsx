import React from 'react'
import { useSelector } from 'react-redux'
import { ApiResponse } from '../../skate_spot_api/apiClient'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import {
  ListWithCount,
  WithSocial,
} from '../../state/reducers/genericListViewReducer'
import {
  UserInteractionListItem,
  UserProfileState,
} from '../../state/reducers/userProfileReducer'
import { RootState } from '../../state/store'
import { ListItemPageNoFilters } from '../spot_common/ListItemPageNoFilters'
import { UserFilter } from './UserFilter'

interface Props {}

export const UserActivities: React.FC<Props> = () => {
  const state = useSelector<RootState, UserProfileState>(
    state => state.userProfileState
  )
  const token = useSelector<RootState, string | undefined>(
    state => state.auth.content?.jwToken
  )

  return (
    <div>
      <h1>Activites</h1>
      <div style={{ paddingBottom: '10rem' }}>
        <ListItemPageNoFilters
          fetchFunc={(cli, take, skip) =>
            state.listItems.what === UserInteractionListItem.SPOTS
              ? (cli.get_User_Related_Spots(
                  state.listItems.interactionType,
                  take,
                  skip,
                  'Bearer ' + token
                ) as Promise<ApiResponse<ListWithCount<WithSocial>>>)
              : (cli.get_User_Related_Spot_Videos(
                  state.listItems.interactionType,
                  take,
                  skip,
                  'Bearer ' + token
                ) as Promise<ApiResponse<ListWithCount<WithSocial>>>)
          }
          userInteractionType={state.listItems.interactionType}
          listViewType={
            state.listItems.what === UserInteractionListItem.SPOTS
              ? ListViewTypes.SPOTS
              : ListViewTypes.SPOT_VIDEOS
          }
        />
      </div>

      <UserFilter />
    </div>
  )
}
