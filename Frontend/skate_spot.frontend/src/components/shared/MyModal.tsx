import { Box, Modal } from '@material-ui/core'
import React from 'react'

export const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  cursor: 'default',
}

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MyModal: React.FC<Props> = p => {
  return (
    <Modal
      style={{ cursor: 'pointer' }}
      open={p.isOpen}
      onClose={() => p.setIsOpen(false)}>
      {/* @ts-ignore */}
      <Box sx={ModalStyle}>{p.children}</Box>
    </Modal>
  )
}
