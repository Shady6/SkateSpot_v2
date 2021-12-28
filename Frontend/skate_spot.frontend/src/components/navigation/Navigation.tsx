import PlaceIcon from '@mui/icons-material/Place'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import hasRouteAccess from '../../functions/route/hasRouteAccess'
import { routes, RoutesEnum } from '../../routes/appRoutes'
import { useRootState } from '../../state/store'
import './style.scss'
import { useTheme } from '@mui/material/styles'
import { useWindowSize } from '../../hooks/useWindowSize'
import { NavigationMobile } from './NavigationMobile'

const Navigation: React.FC = () => {
  const authState = useRootState().auth
  const history = useHistory()
  const theme = useTheme()
  const windowSize = useWindowSize()

  const renderMainLinks = () =>
    routes
      .filter(r => r.renderLink)
      .map(r =>
        hasRouteAccess(r, authState) ? (
          <Link
            style={{
              fontWeight: history.location.pathname.endsWith(r.path)
                ? 700
                : 400,
            }}
            key={r.path}
            to={r.path}>
            {r.linkName}
          </Link>
        ) : null
      )
      .filter(r => r) as JSX.Element[]

  return windowSize.width && windowSize.width <= theme.breakpoints.values.md ? (
    <NavigationMobile />
  ) : (
    <div id='nav' className='d-flex justify-content-between'>
      <div>
        <b>
          <Link to={RoutesEnum.HOME}>
            <PlaceIcon /> SkateSpot
          </Link>
        </b>
        {renderMainLinks()}
      </div>

      {authState.content ? (
        <div>
          <Link to={RoutesEnum.USER_PROFILE}>{authState.content.userName}</Link>
          <Link to={RoutesEnum.LOGOUT}>Logout</Link>
        </div>
      ) : (
        <div>
          <Link to={RoutesEnum.REGISTER}>Register</Link>
          <Link to={RoutesEnum.LOGIN}>Login</Link>
        </div>
      )}
    </div>
  )
}

export default Navigation
