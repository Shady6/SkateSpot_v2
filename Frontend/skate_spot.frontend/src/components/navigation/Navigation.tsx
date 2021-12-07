import PlaceIcon from '@mui/icons-material/Place'
import React from 'react'
import { Link } from 'react-router-dom'
import hasRouteAccess from '../../functions/route/hasRouteAccess'
import { routes, RoutesEnum } from '../../routes/appRoutes'
import { useRootState } from '../../state/store'
import './style.scss'

const Navigation: React.FC = () => {
  const authState = useRootState().auth

  const renderLinks = () =>
    routes
      .filter(r => r.renderLink)
      .map(r =>
        hasRouteAccess(r, authState) ? (
          <Link key={r.path} to={r.path}>
            {r.linkName}
          </Link>
        ) : null
      )

  return (
    <div id='nav' className='d-flex justify-content-between'>
      <div>
        <b>
          <Link to={RoutesEnum.HOME}>
            <PlaceIcon /> SkateSpot
          </Link>
        </b>
        {renderLinks()}
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
