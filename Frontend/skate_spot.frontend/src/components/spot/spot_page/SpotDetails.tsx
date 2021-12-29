import React, { useState } from 'react'
import { createCommentComponent } from '../../../functions/component_creators/commentsCreator'
import {
  CommentDto,
  LikeDto,
  ObstacleType,
  SpotDto,
} from '../../../skate_spot_api/client'
import { spotLike } from '../../../state/actions/spotAcionts'
import { ListViewTypes } from '../../../state/generic/listViewGenerics'
import { ListItemBottomRow } from '../../spot_common/ListItemBottomRow'
import { ListItemHeader } from '../../spot_common/ListItemHeader'
import { SpotImages } from '../../spot_common/SpotImages'
import { AddSpotVideoModal } from '../../spot_video/AddSpotVideoModal'
import { AddVideoBtn } from '../../spot_video/AddVideoBtn'

interface Props {
  spot: SpotDto
}

export const SpotDetails = React.memo(
  ({ spot }: Props) => {
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [isAddSpotVideoModalOpen, setIsAddSpotVideoModalOpen] =
      useState(false)

    return (
      <div className='mb-4'>
        <ListItemHeader
          authorId={spot.author.id}
          listItemId={spot.id}
          listViewType={ListViewTypes.SPOTS}
          deleteFunc={(c, t) => c.delete_Spot(spot.id, t)}>
          <h4>{spot.name}</h4>
        </ListItemHeader>
        <p>{spot.description}</p>
        <SpotImages images={spot.images} />
        <ListItemBottomRow
          commentsCount={spot?.comments?.length || 0}
          address={spot.address}
          surfaceScore={spot.surfaceScore}
          obstacles={spot.obstacles as ObstacleType[]}
          author={spot.author}
          onCommentBtnClick={() => setCommentsOpen(!commentsOpen)}
          listItemId={spot.id as string}
          likes={spot.likes as LikeDto[]}
          likeAction={spotLike}
          customActions={
            <div className='order-3'>
              <AddVideoBtn
                setIsAddSpotVideoModalOpen={setIsAddSpotVideoModalOpen}
              />
            </div>
          }
        />
        {commentsOpen &&
          createCommentComponent({
            listItemId: spot.id,
            comments: spot.comments as CommentDto[],
            listViewType: ListViewTypes.SPOTS,
          })}
        <hr />
        <AddSpotVideoModal
          isOpen={isAddSpotVideoModalOpen}
          setIsOpen={setIsAddSpotVideoModalOpen}
          spotName={spot.name as string}
        />
      </div>
    )
  },
  (p, n) =>
    JSON.stringify({ likes: p.spot.likes, comments: p.spot.comments }) ===
    JSON.stringify({ likes: n.spot.likes, comments: n.spot.comments })
)
