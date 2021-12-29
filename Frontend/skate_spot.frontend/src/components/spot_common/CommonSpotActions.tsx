import React, { useState } from 'react'
import { AddressDto, LikeDto } from '../../skate_spot_api/client'
import { likeThunkCreator } from '../../state/actions/thunk_creators/likeThunkCreator'
import CommentBtn from '../social/comment/CommentBtn'
import { LikeButtons } from '../social/comment/LikeButtons'
import { MapModal } from './MapView/MapModal'
import { ShowMapModalBtn } from './MapView/ShowMapModalBtn'

interface Props {
  likes: LikeDto[]
  listItemId: string
  likeAction: ReturnType<typeof likeThunkCreator>
  commentsCount: number
  onCommentBtnClick: () => void
  address?: AddressDto
  removeLikesBtn?: boolean
  removeCommentsBtn?: boolean
  removeMapModalBtn?: boolean
}

export const CommonSpotActions: React.FC<Props> = p => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  return (
    <div className='d-flex'>
      {p.children}

      {!p.removeLikesBtn && (
        <div className='order-1'>
          <LikeButtons
            listItemId={p.listItemId}
            likes={p.likes}
            likeAction={p.likeAction}
          />{' '}
        </div>
      )}

      {!p.removeCommentsBtn && (
        <div className='order-2'>
          <CommentBtn
            onClick={p.onCommentBtnClick}
            commentsCount={p.commentsCount}
          />
        </div>
      )}

      {!p.removeMapModalBtn && (
        <div className='order-3'>
          <ShowMapModalBtn
            disabled={!p.address}
            setIsMapModalOpen={setIsMapModalOpen}
          />
        </div>
      )}

      {p.address && (
        <MapModal
          isMapModalOpen={isMapModalOpen}
          setIsMapModalOpen={setIsMapModalOpen}
          address={p.address}
        />
      )}
    </div>
  )
}
