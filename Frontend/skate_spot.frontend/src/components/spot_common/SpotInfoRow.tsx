import React from 'react'
import { SurfaceScore } from './SurfaceScore'
import { Obstacles } from './Obstacles'
import { ObstacleType } from '../../skate_spot_api/client'

interface Props {
  surfaceScore: number
  obstacles: ObstacleType[]
}

export const SpotInfoRow: React.FC<Props> = ({ surfaceScore, obstacles }) => {
  return (
    <div>
      <div className='d-flex flex-wrap'>
        <SurfaceScore surfaceScore={surfaceScore} />
        <Obstacles obstacles={obstacles} />
      </div>
    </div>
  )
}
