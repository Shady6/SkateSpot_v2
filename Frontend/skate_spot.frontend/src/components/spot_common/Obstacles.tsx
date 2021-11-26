import Chip from '@mui/material/Chip'
import React from 'react'
import { v4 } from 'uuid'
import { ObstacleType } from '../../skate_spot_api/client'

export function Obstacles({
  obstacles,
  color,
}: {
  obstacles: ObstacleType[]
  color?: string
}) {
  return (
    <div>
      {obstacles?.map(o => (
        <Chip
          style={{ color: color || 'inherit' }}
          label={o}
          variant='outlined'
          className='me-1'
          key={v4()}
        />
      ))}
    </div>
  )
}
