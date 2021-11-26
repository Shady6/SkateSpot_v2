import { Chip } from '@material-ui/core'
import TextureIcon from '@mui/icons-material/Texture'
import React from 'react'

export function SurfaceScore({
  surfaceScore,
  color = '',
}: {
  surfaceScore: number
  color?: string
}) {
  return (
    <div className='me-1'>
      <Chip
        style={{ color: color || 'inherit' }}
        variant='outlined'
        label={`${surfaceScore}/10`}
        icon={<TextureIcon style={{ color: color || 'inherit' }} />}
      />
    </div>
  )
}
