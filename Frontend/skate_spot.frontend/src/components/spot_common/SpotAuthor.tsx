import PersonIcon from '@mui/icons-material/Person'
import React from 'react'
import { SmallUserDto } from '../../skate_spot_api/client'

export function SpotAuthor({ author }: { author: SmallUserDto }) {
  return (
    <div className='mt-2 mt-sm-0'>
      <PersonIcon /> {author?.userName}
    </div>
  )
}
