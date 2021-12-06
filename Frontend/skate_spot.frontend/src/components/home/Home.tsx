import { Button, CircularProgress, useTheme } from '@material-ui/core'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import VideocamIcon from '@mui/icons-material/Videocam'
import { stat } from 'fs'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { request } from '../../functions/request/request'
import { SpotAndSpotVideoStats } from '../../skate_spot_api/client'
import './style.scss'

const Home: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [stats, setStats] = useState<SpotAndSpotVideoStats | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      let res = await request(c => c.get_Spot_And_Spot_Video_Stats(), undefined)
      setLoading(false)
      setStats(res.content ?? null)
    })()
  }, [])

  const renderStat = (statValue: number | undefined) => {
    if (loading) return <CircularProgress size={20} color='secondary' />
    else if (!statValue) return '_'
    else return statValue
  }

  return (
    <div id='main' className='row m-0'>
      <div className='col d-flex align-items-center'>
        <img src='./skate.png' alt='skate-person' />
      </div>
      <div className='col d-flex align-items-center'>
        <div>
          <div className='mb-5'>
            <h1 style={{ color: theme.palette.primary.main }}>
              <PlaceIcon id='title-svg' />
              SkateSpot
            </h1>
            <p>
              This website serves as a database of skateboarding spots from all
              around the world.
            </p>
          </div>

          <div>
            <p>
              <PlaceIcon className='me-3' />
              View spots in form of list or map and add your own
            </p>
          </div>
          <div>
            <p>
              <PeopleIcon className='me-3' />
              Community spots verification system. Temp spots are verified based
              on number of likes and dislikes
            </p>
          </div>
          <div>
            <p>
              <VideocamIcon className='me-3' />
              Add videos from Instagram or YouTube to spots and see others'
              people clips
            </p>
          </div>

          <div className='mt-5'>
            <Button className='me-3'>Add Spot</Button>
            <Button className='me-3'>View on map</Button>
            <Button className='me-3'>View as a list</Button>
          </div>

          <div className='mt-5'>
            <p>Community currently added:</p>
            <div
              style={{ color: theme.palette.secondary.main }}
              className='d-flex'>
              <h3 className='me-4'>{renderStat(stats?.spotsCount)} Spots</h3>
              <h3>{renderStat(stats?.spotVideosCount)} Spot Videos</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home