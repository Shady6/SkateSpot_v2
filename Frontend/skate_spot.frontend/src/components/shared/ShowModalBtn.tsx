import { Button } from '@material-ui/core'
import React from 'react'

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
}

export const ShowModalBtn: React.FC<Props> = ({
  setIsOpen,
  disabled,
  children,
}) => {
  return (
    <div>
      <Button
        disabled={disabled ?? false}
        onClick={() => setIsOpen(true)}
        size='small'
        variant='outlined'>
        {children}
      </Button>
    </div>
  )
}
