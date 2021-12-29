import { CircularProgress, IconButton } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { getAllCommonActions } from '../../../state/actions/allCommonActions'
import { spotLike } from '../../../state/actions/spotAcionts'
import { likeThunkCreator } from '../../../state/actions/thunk_creators/likeThunkCreator'
import { ListViewTypes } from '../../../state/generic/listViewGenerics'
import { WithSocial } from '../../../state/reducers/genericListViewReducer'
import {
  mapSpotsActions,
  MapSpotsState,
} from '../../../state/reducers/mapSpotsReducer'
import { RootState } from '../../../state/store'
import { SpotVideoBtn } from '../../spot_video/SpotVideoBtn'
import { vote_like_adapter } from '../../temp_spot/main/TempSpot'
import { ListItemBottomRow } from '../ListItemBottomRow'
import { ListItemHeader } from '../ListItemHeader'
import { SpotImages } from '../SpotImages'
import { SpotNameLink } from '../SpotNameLink'
import './style.scss'

export const SpotModal = () => {
  const dispatch = useDispatch()
  const [modalBoundsRef, modalBounds] = useMeasure()
  const modalRef = useRef<null | HTMLDivElement>(null)
  const [commentsOpen, setCommentsOpen] = useState(false)

  const state = useSelector<RootState, MapSpotsState>(
    state => state.mapSpotsState
  )
  const spotFromState = useSelector<RootState, SpotDto | null>(
    state => state.spotsState.listWithCount.data?.[0]
  )
  const tempSpotFromState = useSelector<RootState, TempSpotDto | null>(
    state => state.tempSpotsState.listWithCount.data?.[0]
  )

  useEffect(() => {
    if (modalRef.current) modalBoundsRef(modalRef.current)
  }, [modalRef])

  const history = useHistory()

  const isTempSpot = state.currentSpotInModal
    ? !!(state.currentSpotInModal as TempSpotDto).verificationProcess
    : false
  const spot =
    spotFromState || tempSpotFromState
      ? isTempSpot
        ? tempSpotToSpot(tempSpotFromState as TempSpotDto)
        : (spotFromState as SpotDto)
      : null

  useEffect(() => {
    const actions =
      getAllCommonActions()[
        isTempSpot ? ListViewTypes.TEMP_SPOTS : ListViewTypes.SPOTS
      ]
    if (state.currentSpotInModal)
      dispatch(actions.setItems([state.currentSpotInModal as WithSocial]))

    return () => {
      dispatch(actions.reset())
    }
  }, [state.currentSpotInModal])

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
        <div style={{ position: 'relative' }}>
          {spot.images && spot.images.length > 0 && (
            <div style={{ backgroundColor: 'black' }}>
              <SpotImages
                images={spot.images}
                height={300}
                width={modalBounds.width}
              />
            </div>
          )}
          <div
            className={`${
              spot.images && spot.images.length ? 'mt-3' : 'mt-5'
            } ms-3`}>
            <ListItemHeader
              authorId={spot.author.id}
              listItemId={spot.id}
              listViewType={ListViewTypes.TEMP_SPOTS}
              deleteFunc={(c, t) =>
                isTempSpot
                  ? c.delete_Temp_Spot(spot.id, t)
                  : c.delete_Spot(spot.id, t)
              }>
              {isTempSpot ? (
                <h4>{spot.name}</h4>
              ) : (
                <SpotNameLink spotName={spot.name as string} />
              )}
            </ListItemHeader>

            <p>{spot.description}</p>

            <ListItemBottomRow
              likes={spot.likes as LikeDto[]}
              listItemId={spot.id}
              likeAction={
                isTempSpot
                  ? (vote_like_adapter as unknown as ReturnType<
                      typeof likeThunkCreator
                    >)
                  : spotLike
              }
              surfaceScore={spot.surfaceScore}
              obstacles={spot.obstacles as ObstacleType[]}
              onCommentBtnClick={() => setCommentsOpen(!commentsOpen)}
              commentsCount={spot.comments!.length}
              removeMapModalBtn={true}
              author={spot.author}
              customActions={
                !isTempSpot ? (
                  <div className='order-3'>
                    <SpotVideoBtn
                      videosCount={spot.videosCount}
                      onClick={() => goToSpotDetailPage({ history, spot })}
                    />
                  </div>
                ) : undefined
              }
            />

            {commentsOpen &&
              createCommentComponent({
                listItemId: spot.id,
                comments: spot.comments as CommentDto[],
                listViewType: isTempSpot
                  ? ListViewTypes.TEMP_SPOTS
                  : ListViewTypes.SPOTS,
              })}
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <IconButton
              onClick={_ => dispatch(mapSpotsActions.toggleSpotModal(false))}
              className='mt-2 ms-2 p-0'>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}
    </>
  )
}
