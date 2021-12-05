import React from 'react'
import { Tooltip } from 'react-leaflet'
import { ObstacleType, SpotMarkerDataDto } from '../../../skate_spot_api/client'
import { Obstacles } from '../Obstacles'
import { SurfaceScore } from '../SurfaceScore'

interface Props {
  marker: SpotMarkerDataDto
}

export const SpotInfoTooltip: React.FC<Props> = ({ marker }) => {
  return (
    <Tooltip className='leaflet-tooltip' direction='top' offset={[0, -30]}>
      <div style={{ color: 'white' }}>
        <p>{marker.name}</p>
        <div className='d-flex'>
          <SurfaceScore
            style={{ fontSize: '0.7rem' }}
            surfaceScore={marker.surfaceScore}
          />
          <Obstacles
            style={{ fontSize: '0.7rem', padding: 0 }}
            obstacles={marker.obstacles as ObstacleType[]}
          />
        </div>
      </div>
    </Tooltip>
  )
}
