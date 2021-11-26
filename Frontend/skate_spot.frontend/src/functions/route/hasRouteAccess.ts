import { IRoute } from '../../routes/appRoutes'
import { AuthState } from '../../state/reducers/authReducer'
import { UserRoles } from '../../types/types'

const hasRouteAccess = (route: IRoute, authState: AuthState) => {
  return (
    route.accessedBy.includes(UserRoles.ALL) ||
    (route.accessedBy.includes(UserRoles.SIGNED_IN) && authState.content) ||
    (!authState.content &&
      route.accessedBy.includes(UserRoles.NOT_SIGNED_IN)) ||
    (authState.content &&
      route.accessedBy.some(r =>
        authState.content?.roles?.some(ur => ur === r)
      ))
  )
}

export default hasRouteAccess
