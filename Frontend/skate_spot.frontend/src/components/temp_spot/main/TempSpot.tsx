import React, { useState } from 'react'
import { createCommentComponent } from '../../../functions/component_creators/commentsCreator'
import {
  CommentDto,
  ObstacleType,
  TempSpotDto,
} from '../../../skate_spot_api/client'
import { vote } from '../../../state/actions/tempSpotActions'
import { likeThunkCreator } from '../../../state/actions/thunk_creators/likeThunkCreator'
import { ListViewTypes } from '../../../state/generic/listViewGenerics'
import { ListItemBottomRow } from '../../spot_common/ListItemBottomRow'
import { ListItemHeader } from '../../spot_common/ListItemHeader'
import { SpotImages } from '../../spot_common/SpotImages'

interface Props {
  tempSpot: TempSpotDto
}

export const vote_like_adapter = ({
  isPositive,
  deletedLike,
  subjectId,
}: {
  isPositive: boolean
  deletedLike: boolean
  subjectId: string
}) => {
  return vote({
    tempSpotId: subjectId,
    isReal: isPositive,
    deletedVote: deletedLike,
  })
}

export const TempSpot = React.memo(
  ({ tempSpot }: Props) => {
    const [commentsOpen, setCommentsOpen] = useState(false)

    return (
      <div className='mb-4'>
        <ListItemHeader
          authorId={tempSpot.author.id}
          listItemId={tempSpot.id}
          listViewType={ListViewTypes.TEMP_SPOTS}
          deleteFunc={(c, t) => c.delete_Temp_Spot(tempSpot.id, t)}>
          <h4>{tempSpot.name}</h4>
        </ListItemHeader>
        <p>{tempSpot.description}</p>
        <SpotImages images={tempSpot.images} />
        <ListItemBottomRow
          listItemId={tempSpot.id as string}
          commentsCount={tempSpot.verificationProcess?.discussion?.length || 0}
          address={tempSpot.address}
          surfaceScore={tempSpot.surfaceScore}
          obstacles={tempSpot.obstacles as ObstacleType[]}
          author={tempSpot.author}
          onCommentBtnClick={() => setCommentsOpen(!commentsOpen)}
          likeAction={
            vote_like_adapter as unknown as ReturnType<typeof likeThunkCreator>
          }
          likes={tempSpot!.verificationProcess!.votes!.map(v => ({
            userId: v.voterId,
            positive: v.isReal,
          }))}
        />
        {commentsOpen &&
          createCommentComponent({
            listItemId: tempSpot.id,
            comments: tempSpot.verificationProcess.discussion as CommentDto[],
            listViewType: ListViewTypes.TEMP_SPOTS,
          })}
        <hr />
      </div>
    )
  },
  (p, n) =>
    JSON.stringify(p.tempSpot.verificationProcess) ===
    JSON.stringify(n.tempSpot.verificationProcess)
)
