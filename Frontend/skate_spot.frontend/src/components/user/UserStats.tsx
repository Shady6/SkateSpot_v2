import { Chip, CircularProgress } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import CommentIcon from '@mui/icons-material/Comment'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemStats } from '../../skate_spot_api/client'
import { loadStats } from '../../state/actions/userProfileActions'
import { UserStatsInfo } from '../../state/reducers/userProfileReducer'
import { RootState } from '../../state/store'
import { userFilters } from './UserFilter'

interface Props {}

export const UserStats: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const state = useSelector<RootState, UserStatsInfo>(
    state => state.userProfileState.stats
  )

  useEffect(() => {
    dispatch(loadStats())
  }, [])

  const stats = (stats: ItemStats) => [
    {
      key: 'Added',
      icon: <AddIcon />,
      count: stats.addedCount,
    },
    {
      key: 'Liked',
      icon: <ThumbUpIcon />,
      count: stats.likedCount,
    },
    {
      key: 'Commented',
      icon: <CommentIcon />,
      count: stats.commentedCount,
    },
  ]

  return (
    <div className='mb-5'>
      <h1 className='mb-4'>Stats</h1>
      {state.loading ? (
        <>
          <span>Loading stats </span>
          <CircularProgress color='secondary' />
        </>
      ) : (
        <>
          <Stat label='Spots' stats={stats(state.value.spotStats)} />
          <Stat label='Spot Videos' stats={stats(state.value.spotVideoStats)} />
        </>
      )}
    </div>
  )
}

interface StatProps {
  label: string
  stats: { key: string; icon: JSX.Element; count: number }[]
}

export const Stat: React.FC<StatProps> = p => {
  return (
    <div className='mb-3'>
      <p style={{ fontSize: '1rem' }} className='m-0 mb-2 ms-1'>
        {p.label}
      </p>
      <div>
        {p.stats.map(s => (
          <Chip
            className='me-2 px-2 py-1'
            icon={s.icon}
            label={s.count}
            key={s.key}
          />
        ))}
      </div>
    </div>
  )
}
