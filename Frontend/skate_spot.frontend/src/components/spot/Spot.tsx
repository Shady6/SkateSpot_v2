import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createCommentComponent } from '../../functions/component_creators/commentsCreator'
import { goToSpotDetailPage } from '../../functions/route/goToSpotDetailPage'
import {
  CommentDto,
  LikeDto,
  ObstacleType,
  SpotDto,
} from '../../skate_spot_api/client'
import { spotLike } from '../../state/actions/spotAcionts'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { ListItemBottomRow } from '../spot_common/ListItemBottomRow'
import { ListItemHeader } from '../spot_common/ListItemHeader'
import { SpotImages } from '../spot_common/SpotImages'
import { SpotNameLink } from '../spot_common/SpotNameLink'
import { SpotVideoBtn } from '../spot_video/SpotVideoBtn'

interface Props {
  spot: SpotDto
}

export const Spot = React.memo(
  ({ spot }: Props) => {
    const [commentsOpen, setCommentsOpen] = useState(false)
    const history = useHistory()

    return (
      <div className='mb-4'>
        <ListItemHeader
          authorId={spot.author.id}
          listItemId={spot.id}
          listViewType={ListViewTypes.SPOTS}
          deleteFunc={(c, t) => c.delete_Spot(spot.id, t)}>
          <SpotNameLink spotName={spot.name as string} />
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
              <SpotVideoBtn
                videosCount={spot.videosCount}
                onClick={() => goToSpotDetailPage({ history, spot })}
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
      </div>
    )
  },
  (p, n) =>
    JSON.stringify({ likes: p.spot.likes, comments: p.spot.comments }) ===
    JSON.stringify({ likes: n.spot.likes, comments: n.spot.comments })
)
