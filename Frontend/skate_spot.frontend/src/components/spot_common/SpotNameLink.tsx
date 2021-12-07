import React from 'react'
import { Link } from 'react-router-dom'
import { RouteParams, RoutesEnum } from '../../routes/appRoutes'

interface Props {
  spotName: string
}

export const SpotNameLink: React.FC<Props> = ({ spotName }) => {
  return (
    <Link
      style={{ textDecoration: 'none', color: '#9abeff' }}
      to={RoutesEnum.SPOT_DEDICATED_PAGE.replace(
        RouteParams.SPOT_NAME,
        spotName
      )}>
      <h4>{spotName}</h4>
    </Link>
  )
}
