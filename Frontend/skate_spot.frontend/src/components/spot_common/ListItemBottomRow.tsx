import React from 'react'
import {
  AddressDto,
  LikeDto,
  ObstacleType,
  SmallUserDto,
} from '../../skate_spot_api/client'
import { likeThunkCreator } from '../../state/actions/thunk_creators/likeThunkCreator'
import { CommonSpotActions } from './CommonSpotActions'
import { SpotAuthor } from './SpotAuthor'
import { SpotInfoRow } from './SpotInfoRow'

interface Props {
  likes: LikeDto[]
  listItemId: string
  likeAction: ReturnType<typeof likeThunkCreator>
  commentsCount: number
  onCommentBtnClick: () => void
  address?: AddressDto
  customActions?: JSX.Element
  author: SmallUserDto
  surfaceScore?: number
  obstacles?: ObstacleType[]
  removeLikesBtn?: boolean
  removeCommentsBtn?: boolean
  removeMapModalBtn?: boolean
}

export const ListItemBottomRow: React.FC<Props> = p => {
  return (
    <div className='mt-2'>
      {p.surfaceScore && p.obstacles && (
        <SpotInfoRow surfaceScore={p.surfaceScore} obstacles={p.obstacles} />
      )}
      <div className='d-flex flex-wrap justify-content-between mt-2'>
        <CommonSpotActions
          likes={p.likes}
          listItemId={p.listItemId}
          likeAction={p.likeAction}
          commentsCount={p.commentsCount}
          onCommentBtnClick={p.onCommentBtnClick}
          address={p.address}
          removeLikesBtn={p.removeLikesBtn}
          removeCommentsBtn={p.removeCommentsBtn}
          removeMapModalBtn={p.removeMapModalBtn}>
          {p.customActions}
        </CommonSpotActions>

        <SpotAuthor author={p.author} />
      </div>
    </div>
  )
}
