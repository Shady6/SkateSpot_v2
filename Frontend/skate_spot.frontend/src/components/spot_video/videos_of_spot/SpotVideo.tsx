import React, { useState } from 'react'
import { createCommentComponent } from '../../../functions/component_creators/commentsCreator'
import {
  CommentDto,
  LikeDto,
  SmallUserDto,
  SpotVideoDto,
  VideoPlatformType,
} from '../../../skate_spot_api/client'
import { spotVideoLike } from '../../../state/actions/spotVideoActions'
import { ListViewTypes } from '../../../state/generic/listViewGenerics'
import CommentBtn from '../../social/comment/CommentBtn'
import { LikeButtons } from '../../social/comment/LikeButtons'
import { CommonSpotActions } from '../../spot_common/CommonSpotActions'
import { ListItemActions } from '../../spot_common/ListItemActions'
import { ListItemBottomRow } from '../../spot_common/ListItemBottomRow'
import { SpotAuthor as SpotVideoAuthor } from '../../spot_common/SpotAuthor'
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
        <div>
          <div className='text-end mb-2'>
            <ListItemActions
              authorId={spotVideo.author.id}
              listItemId={spotVideo.id}
              listViewType={ListViewTypes.SPOT_VIDEOS}
              deleteFunc={(c, t) => c.delete_Spot_Video(spotVideo.id, t)}
            />
          </div>
          {spotVideo.platformType === VideoPlatformType.Instagram ? (
            <InstagramVideo videoId={spotVideo.embedId as string} />
          ) : (
            <YouTubeVideo videoId={spotVideo.embedId as string} />
          )}
        </div>
        <p>{spotVideo.description}</p>
        <div className='d-flex flex-wrap justify-content-between mt-2'>
          <CommonSpotActions
            listItemId={spotVideo.id as string}
            likes={spotVideo.likes as LikeDto[]}
            likeAction={spotVideoLike}
            onCommentBtnClick={() => setCommentsOpen(!commentsOpen)}
            commentsCount={spotVideo?.comments?.length || 0}
            removeMapModalBtn={true}
          />
          <SpotVideoAuthor author={spotVideo.author as SmallUserDto} />
        </div>

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
