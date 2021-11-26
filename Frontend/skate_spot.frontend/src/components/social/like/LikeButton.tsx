import { Button } from '@material-ui/core'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import React from 'react'

export interface LikeButtonProps {
  likesCount: number
  isPositive: boolean
  onClick: () => void
  highlited?: boolean
}

export function LikeButton({
  likesCount,
  isPositive,
  onClick,
  highlited = false,
}: LikeButtonProps) {
  return (
    <Button
      onClick={async () => await onClick()}
      size='small'
      variant={highlited ? 'contained' : 'outlined'}
      color={isPositive ? 'success' : 'warning'}
      className='me-1'>
      {isPositive ? <ThumbUpIcon /> : <ThumbDownIcon />}{' '}
      <span className='ms-1'>{likesCount}</span>
    </Button>
  )
}
