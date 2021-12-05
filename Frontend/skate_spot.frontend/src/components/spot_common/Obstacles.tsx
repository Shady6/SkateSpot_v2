import Chip from '@mui/material/Chip'
import React from 'react'
import { v4 } from 'uuid'
import { ObstacleType } from '../../skate_spot_api/client'

export function Obstacles({
  obstacles,
  style,
}: {
  obstacles: ObstacleType[]
  style?: React.CSSProperties
}) {
  return (
    <div style={{ fontSize: '0.2rem' }}>
      {obstacles?.map(o => (
        <Chip
          style={style}
          label={o}
          variant='outlined'
          className='me-1'
          key={v4()}
        />
      ))}
    </div>
  )
}
