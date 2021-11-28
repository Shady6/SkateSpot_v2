import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { createCommentComponent } from '../../../functions/component_creators/commentsCreator'
import { tempSpotToSpot } from '../../../functions/mapper/mappingProfile'
import { goToSpotDetailPage } from '../../../functions/route/goToSpotDetailPage'
import {
  CommentDto,
  LikeDto,
  ObstacleType,
  SpotDto,
  TempSpotDto,
} from '../../../skate_spot_api/client'
import { spotLike } from '../../../state/actions/spotAcionts'
import { likeThunkCreator } from '../../../state/actions/thunk_creators/likeThunkCreator'
import { ListViewTypes } from '../../../state/generic/listViewGenerics'
import { MapSpotsState } from '../../../state/reducers/mapSpotsReducer'
import { RootState } from '../../../state/store'
import CommentBtn from '../../social/comment/CommentBtn'
import { MainLikeButtons } from '../../social/comment/MainLikeButtons'
import { SpotVideoBtn } from '../../spot_video/SpotVideoBtn'
import { vote_like_adapter } from '../../temp_spot/main/TempSpot'
import { Obstacles } from '../Obstacles'
import { SpotImages } from '../SpotImages'
import { SpotNameLink } from '../SpotNameLink'
import { SurfaceScore } from '../SurfaceScore'
import './style.scss'

export const SpotModal = () => {
  const [modalBoundsRef, modalBounds] = useMeasure()
  const modalRef = useRef<null | HTMLDivElement>(null)
  const [commentsOpen, setCommentsOpen] = useState(false)

  const state = useSelector<RootState, MapSpotsState>(
    state => state.mapSpotsReducer
  )

  useEffect(() => {
    if (modalRef.current) modalBoundsRef(modalRef.current)
  }, [modalRef])

  const history = useHistory()

  const isTempSpot = state.currentSpotInModal
    ? !!(state.currentSpotInModal as TempSpotDto).verificationProcess
    : false
  const spot = isTempSpot
    ? tempSpotToSpot(state.currentSpotInModal as TempSpotDto)
    : (state.currentSpotInModal as SpotDto)

  return (
    <>
      {state.loadingSpotInModal && (
        <CircularProgress
          size={72}
          className='align-self-center'
          style={{ marginTop: 'auto', marginBottom: 'auto' }}
        />
      )}
      {spot && !state.loadingSpotInModal && (
        <div>
          {spot.images && spot.images.length > 0 && (
            <div style={{ backgroundColor: 'black' }}>
              <SpotImages
                images={spot.images}
                height={300}
                width={modalBounds.width}
              />
            </div>
          )}
          <div className='mt-4 ms-3'>
            <SpotNameLink spotName={spot.name as string} />
            <p>{spot.description}</p>
            <div className='d-flex mt-5 mb-3'>
              <SurfaceScore surfaceScore={spot.surfaceScore as number} />
              <Obstacles obstacles={spot.obstacles as ObstacleType[]} />
            </div>

            <div className='d-flex'>
              <MainLikeButtons
                likes={spot.likes as LikeDto[]}
                listItemId={spot.id}
                likeAction={
                  isTempSpot
                    ? (vote_like_adapter as unknown as ReturnType<
                        typeof likeThunkCreator
                      >)
                    : spotLike
                }
              />
              <CommentBtn
                onClick={() => setCommentsOpen(!commentsOpen)}
                commentsCount={spot.comments?.length}
              />
              {!isTempSpot && (
                <SpotVideoBtn
                  videosCount={spot.videosCount}
                  onClick={() => goToSpotDetailPage({ history, spot })}
                />
              )}
            </div>

            {commentsOpen &&
              createCommentComponent({
                listItemId: spot.id,
                comments: spot.comments as CommentDto[],
                listViewType: isTempSpot
                  ? ListViewTypes.TEMP_SPOTS
                  : ListViewTypes.SPOTS,
              })}
          </div>
        </div>
      )}
    </>
  )
}
