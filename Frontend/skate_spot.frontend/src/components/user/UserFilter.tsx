import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import CommentIcon from '@mui/icons-material/Comment'
import RoomIcon from '@mui/icons-material/Room'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import VideocamIcon from '@mui/icons-material/Videocam'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserInteractionType } from '../../skate_spot_api/client'
import {
  UserInteractionListItem,
  userProfileActions,
  UserProfileState,
} from '../../state/reducers/userProfileReducer'
import { RootState } from '../../state/store'

export const userFilters = {
  listItems: [
    {
      label: 'Spots',
      icon: <RoomIcon />,
      value: UserInteractionListItem.SPOTS,
    },
    {
      label: 'Videos',
      icon: <VideocamIcon />,
      value: UserInteractionListItem.SPOT_VIDEOS,
    },
  ],
  interactions: [
    {
      label: 'Added',
      icon: <AddIcon />,
      value: UserInteractionType.Added,
    },
    {
      label: 'Liked',
      icon: <ThumbUpIcon />,
      value: UserInteractionType.Liked,
    },
    {
      label: 'Commented',
      icon: <CommentIcon />,
      value: UserInteractionType.Commented,
    },
  ],
}

interface Props {}

export const UserFilter: React.FC<Props> = () => {
  const state = useSelector<RootState, UserProfileState>(
    state => state.userProfileState
  )
  const dispatch = useDispatch()
  return (
    <div
      className='w-100'
      style={{ position: 'fixed', bottom: 0, left: 0, zIndex: 100 }}>
      <BottomNavigation
        onChange={(_, x) => dispatch(userProfileActions.setWhat(x))}
        value={state.listItems.what}
        showLabels>
        {userFilters.listItems.map(x => (
          <BottomNavigationAction
            key={x.value}
            value={x.value}
            label={x.label}
            icon={x.icon}
          />
        ))}
      </BottomNavigation>
      <BottomNavigation
        onChange={(_, x) => dispatch(userProfileActions.setInteractionType(x))}
        value={state.listItems.interactionType}
        showLabels>
        {userFilters.interactions.map(x => (
          <BottomNavigationAction
            key={x.value}
            value={x.value}
            label={x.label}
            icon={x.icon}
          />
        ))}
      </BottomNavigation>
    </div>
  )
}
