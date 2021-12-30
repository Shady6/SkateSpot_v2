import { IconButton, useTheme } from '@material-ui/core'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import React from 'react'

interface Props {}

export const FilterBtn = (props: Props) => {
  const theme = useTheme()
  return (
    <IconButton
      style={{
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        background: '#1f8dc0',
        opacity: 0.7,
      }}>
      <FilterAltIcon />
    </IconButton>
  )
}
