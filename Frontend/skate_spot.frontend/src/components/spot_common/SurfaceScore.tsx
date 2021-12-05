import { Chip } from '@material-ui/core'
import TextureIcon from '@mui/icons-material/Texture'
import React from 'react'

export function SurfaceScore({
  surfaceScore,
  style,
}: {
  surfaceScore: number
  style?: React.CSSProperties
}) {
  return (
    <div className='me-1'>
      <Chip
        style={style}
        variant='outlined'
        label={`${surfaceScore}/10`}
        icon={<TextureIcon style={{ color: style?.color || 'inherit' }} />}
      />
    </div>
  )
}
