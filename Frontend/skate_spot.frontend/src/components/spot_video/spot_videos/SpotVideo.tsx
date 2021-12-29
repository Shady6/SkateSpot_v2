import React, { useState } from 'react'
import { createCommentComponent } from '../../../functions/component_creators/commentsCreator'
import {
  CommentDto,
  LikeDto,
  ObstacleType,
  SpotVideoDto,
  VideoPlatformType,
} from '../../../skate_spot_api/client'
import { spotVideoLike } from '../../../state/actions/spotVideoActions'
import { ListViewTypes } from '../../../state/generic/listViewGenerics'
import { ListItemBottomRow } from '../../spot_common/ListItemBottomRow'
import { ListItemHeader } from '../../spot_common/ListItemHeader'
import { SpotNameLink } from '../../spot_common/SpotNameLink'
import { InstagramVideo } from '../InstagramVideo'
import { YouTubeVideo } from '../YouTubeVideo'

interface Props {
  spotVideo: SpotVideoDto
}

export const SpotVideo = React.memo(
  ({ spotVideo }: Props) => {
    const [commentsOpen, setCommentsOpen] = useState(false)
    return (
      <div className='mb-4'>
        <ListItemHeader
          authorId={spotVideo.author.id}
          listItemId={spotVideo.id}
          listViewType={ListViewTypes.SPOT_VIDEOS}
          deleteFunc={(c, t) => c.delete_Spot_Video(spotVideo.id, t)}>
          {spotVideo.spot ? (
            <SpotNameLink spotName={spotVideo?.spot?.name as string} />
          ) : (
            <h4 style={{ color: 'rgb(148,148,148)' }}>[Spot deleted]</h4>
          )}
        </ListItemHeader>
        {spotVideo.platformType === VideoPlatformType.Instagram ? (
          <InstagramVideo videoId={spotVideo.embedId as string} />
        ) : (
          <YouTubeVideo videoId={spotVideo.embedId as string} />
        )}
        <p>{spotVideo.description}</p>
        <ListItemBottomRow
          listItemId={spotVideo.id as string}
          likes={spotVideo.likes as LikeDto[]}
          likeAction={spotVideoLike}
          onCommentBtnClick={() => setCommentsOpen(!commentsOpen)}
          commentsCount={spotVideo?.comments?.length || 0}
          surfaceScore={spotVideo.spot?.surfaceScore as number}
          obstacles={spotVideo.spot?.obstacles as ObstacleType[]}
          address={spotVideo.spot?.address}
          author={spotVideo?.author}
        />
        {commentsOpen &&
          createCommentComponent({
            listItemId: spotVideo.id,
            comments: spotVideo.comments as CommentDto[],
            listViewType: ListViewTypes.SPOT_VIDEOS,
          })}
        <hr />
      </div>
    )
  },
  (p, n) =>
    JSON.stringify({
      likes: p.spotVideo.likes,
      comments: p.spotVideo.comments,
    }) ===
    JSON.stringify({ likes: n.spotVideo.likes, comments: n.spotVideo.comments })
)
