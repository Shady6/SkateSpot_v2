import React from 'react'
import { Link } from 'react-router-dom'
import hasRouteAccess from '../../functions/route/hasRouteAccess'
import routes from '../../routes/appRoutes'
import { useRootState } from '../../state/store'
import { Routes } from '../../routes/appRoutes'
import './style.scss'
import PlaceIcon from '@mui/icons-material/Place'
import Login from '../auth/Login'

const Navigation: React.FC = () => {
  const authState = useRootState().auth

  const renderLinks = () =>
    routes
      .filter(r => r.renderLink)
      .map(r =>
        hasRouteAccess(r, authState) ? (
          <Link to={r.path}>{r.linkName}</Link>
        ) : null
      )

  return (
    <div id='nav' className='d-flex justify-content-between'>
      <div>
        <b>
          <Link to={Routes.HOME}>
            <PlaceIcon /> SkateSpot
          </Link>
        </b>
        {renderLinks()}
      </div>

      {authState.content ? (
        <div>
          <Link to={Routes.USER_PROFILE}>{authState.content.userName}</Link>
          <Link to={Routes.LOGOUT}>Logout</Link>
        </div>
      ) : (
        <div>
          <Link to={Routes.REGISTER}>Register</Link>
          <Link to={Routes.LOGIN}>Login</Link>
        </div>
      )}
    </div>
  )
}

export default Navigation
