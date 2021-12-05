import React from 'react'
import { Link } from 'react-router-dom'
import hasRouteAccess from '../functions/route/hasRouteAccess'
import routes from '../routes/appRoutes'
import { useRootState } from '../state/store'
import { Routes } from '../routes/appRoutes'

const Navigation: React.FC = () => {
  const authState = useRootState().auth

  const renderLinks = () =>
    routes
      .filter(r => r.renderLink)
      .map(r =>
        hasRouteAccess(r, authState) ? (
          <li className={'me-5'} key={r.linkName}>
            <Link to={r.path}>{r.linkName}</Link>
          </li>
        ) : null
      )

  return (
    <ul className={'d-flex'}>
      {renderLinks()}
      {authState.content && (
        <li>
          <Link to={Routes.USER_PROFILE}>{authState.content.userName}</Link>
        </li>
      )}
    </ul>
  )
}

export default Navigation
