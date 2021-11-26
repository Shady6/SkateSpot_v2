import React from 'react'
import { ShowModalBtn } from '../shared/ShowModalBtn'
import ImageIcon from '@mui/icons-material/Image'

interface Props {
  setIsImageGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShowImageGalleryModalBtn: React.FC<Props> = p => {
  return (
    <ShowModalBtn setIsOpen={p.setIsImageGalleryOpen}>
      <ImageIcon />
    </ShowModalBtn>
  )
}
