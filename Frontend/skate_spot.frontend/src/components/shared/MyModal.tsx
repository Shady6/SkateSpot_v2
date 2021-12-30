import { Box, IconButton, Modal } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import './modal.scss'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  opacity?: number
}

export const MyModal: React.FC<Props> = p => {
  return (
    <Modal
      style={{ cursor: 'pointer', opacity: p.opacity ?? 0.9 }}
      open={p.isOpen}
      onClose={() => p.setIsOpen(false)}>
      <Box id='modal-skatespot'>
        <IconButton
          onClick={() => p.setIsOpen(false)}
          className='d-flex ms-auto'>
          <CloseIcon />
        </IconButton>
        {p.children}
      </Box>
    </Modal>
  )
}
