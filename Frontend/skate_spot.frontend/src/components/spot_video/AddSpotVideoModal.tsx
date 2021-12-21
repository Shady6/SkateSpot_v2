import { Button, CircularProgress, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendRequestWithFlashMsgOnError } from '../../functions/request/sendRequestWithFlashMsgOnError'
import { useInputState } from '../../hooks/util/useInputState'
import { VideoPlatformType } from '../../skate_spot_api/client'
import { createFlashMsgWithTimeout } from '../../state/reducers/flashMsgReducer'
import { spotVideoActions } from '../../state/reducers/spotVideoReducer'
import { useRootState } from '../../state/store'
import { MyModal } from '../shared/MyModal'
import { InstagramVideo } from './InstagramVideo'
import { YouTubeVideo } from './YouTubeVideo'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  spotName: string
}

export const AddSpotVideoModal = (p: Props) => {
  const [videoUrl, setVideoUrl, resetVideoUrl] = useInputState('')
  const [description, setDescription, resetDescription] = useInputState('')
  const [video, setVideo] = useState<{
    type: VideoPlatformType
    id: string
  } | null>(null)
  const dispatch = useDispatch()
  const state = useRootState()
  const [sendingSpot, setSendingSpot] = useState(false)

  const handleLoadClick = () => {
    setVideo(null)
    let id = ''
    try {
      if (videoUrl.indexOf('youtube') !== -1) {
        id = getYouTubeVideoId(videoUrl)
        if (id) setVideo({ type: VideoPlatformType.YouTube, id })
      } else if (videoUrl.indexOf('instagram') !== -1) {
        id = getInstagramVideoId(videoUrl)
        if (id) setVideo({ type: VideoPlatformType.Instagram, id })
      }
    } catch {
      flashInvalidUrl()
    } finally {
      if (!id) flashInvalidUrl()
    }
  }

  const getYouTubeVideoId = (videoUrl: string) => {
    let id = videoUrl.slice(videoUrl.indexOf('?v=') + 3)
    if (id.indexOf('/') !== -1) id = id.slice(0, id.indexOf('/'))
    return id
  }

  const getInstagramVideoId = (videoUrl: string) => {
    let id = videoUrl.slice(videoUrl.indexOf('/p/') + 3)
    if (id.indexOf('/') !== -1) id = id.slice(0, id.indexOf('/'))
    return id
  }

  const flashInvalidUrl = () => {
    dispatch(
      createFlashMsgWithTimeout({
        message: 'The url is invalid.',
        severity: 'warning',
      })
    )
  }

  const sendVideo = async () => {
    setSendingSpot(true)
    const res = await sendRequestWithFlashMsgOnError(
      dispatch,
      state.auth.content,
      (c, t) =>
        c.add_Spot_Video(p.spotName, t, {
          description,
          embedId: video!.id,
          platformType: video!.type,
        })
    )
    setSendingSpot(false)

    return { resContent: res.content }
  }

  const handleSpotVideoSubmit = async () => {
    const { resContent } = await sendVideo()
    if (!resContent) return
    dispatch(spotVideoActions.prependVideo(resContent))
    resetVideoUrl()
    resetDescription()
    setVideo(null)
    p.setIsOpen(false)
  }

  return (
    <MyModal isOpen={p.isOpen} setIsOpen={p.setIsOpen}>
      <div>
        <div className='d-flex'>
          <div className='col-5 me-2'>
            <TextField
              value={videoUrl}
              onChange={setVideoUrl}
              fullWidth
              label='Copy and paste link to a Instagram or YouTube video '
              variant='standard'
            />
          </div>
          <Button onClick={handleLoadClick} size='small' variant='contained'>
            Load
          </Button>
        </div>
        {video && (
          <div className='mt-4' style={{ fontSize: '1.10rem' }}>
            <p>
              This is the preview of the video. If you can see it you are good
              to go otherwise please insert correct link.
            </p>
            {video.type === VideoPlatformType.Instagram ? (
              <InstagramVideo videoId={video.id} />
            ) : (
              <YouTubeVideo videoId={video.id} />
            )}
            <div className='col-5 mt-2 mb-3'>
              <TextField
                value={description}
                onChange={setDescription}
                rows={3}
                multiline={true}
                fullWidth={true}
                variant='standard'
                label='Description'
              />
            </div>
          </div>
        )}
        <div className='mt-2'>
          <Button
            disabled={!video}
            className='me-2'
            color='primary'
            variant='contained'
            onClick={async () => {
              await handleSpotVideoSubmit()
            }}>
            {sendingSpot ? <CircularProgress /> : 'Submit'}
          </Button>
          <Button
            onClick={() => {
              setVideo(null)
              resetVideoUrl()
              resetDescription()
              p.setIsOpen(false)
            }}
            color='warning'
            variant='contained'>
            Cancel
          </Button>
        </div>
      </div>
    </MyModal>
  )
}
