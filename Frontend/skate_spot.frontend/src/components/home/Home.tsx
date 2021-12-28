import { Button, CircularProgress, useTheme } from '@material-ui/core'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import VideocamIcon from '@mui/icons-material/Videocam'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { request } from '../../functions/request/request'
import { useOverflowHidden } from '../../hooks/util/useOverflowHidden'
import { RoutesEnum } from '../../routes/appRoutes'
import { SpotAndSpotVideoStats } from '../../skate_spot_api/client'
import './style.scss'

const Home: React.FC = () => {
  const theme = useTheme()

  const [stats, setStats] = useState<SpotAndSpotVideoStats | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useOverflowHidden()

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
    else if (statValue !== 0 && !statValue) return '_'
    else return statValue
  }

  return (
    <div id='main' className='row mt-3'>
      <div className='col d-lg-block d-none'>
        <img className='ms-3' src='./skate.png' alt='skate-person' />
      </div>
      <div className='col d-flex align-items-center justify-content-center justify-content-lg-start'>
        <div className=' px-lg-0 px-3'>
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

          <div id='quick-actions' className='mt-2'>
            <Link to={RoutesEnum.ADD_TEMP_SPOT}>
              <Button className='me-3'>Add Spot</Button>
            </Link>
            <Link to={RoutesEnum.MAP}>
              <Button className='me-3'>View on map</Button>
            </Link>
            <Link to={RoutesEnum.SPOTS}>
              <Button className='me-3'>View as a list</Button>
            </Link>
          </div>

          <div className='mt-5'>
            <p>Community currently added:</p>
            <div
              style={{ color: theme.palette.secondary.main }}
              className='d-flex'>
              {!loading && !stats ? (
                <h3>Couldn't load the statistics</h3>
              ) : (
                <>
                  <h3 className='me-4'>
                    {renderStat(stats?.spotsCount)} Spots
                  </h3>
                  <h3>{renderStat(stats?.spotVideosCount)} Spot Videos</h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
