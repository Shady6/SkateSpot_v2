import React from 'react'
import { UserActivities } from './UserActivities'
import { UserStats } from './UserStats'

interface Props {}

export const UserProfile: React.FC<Props> = () => {
  return (
    <div className='container'>
      <UserStats />
      <UserActivities />
    </div>
  )
}
