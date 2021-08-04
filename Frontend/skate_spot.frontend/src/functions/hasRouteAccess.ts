import { IRoute } from '../routes/appRoutes';
import { AuthState } from '../state/reducers/authReducer';
import { UserRoles } from '../types/types';

const hasRouteAccess = (route: IRoute, authState: AuthState) => {
    return route.accessedBy.includes(UserRoles.ALL_ROLES) ||
        (route.accessedBy.includes(UserRoles.SIGNED_IN_ROLES) && authState.content) ||
        (!authState.content && route.accessedBy.includes(UserRoles.NO_ROLE)) ||
        (authState.content && route.accessedBy.some(r => authState.content?.roles?.some(ur => ur === r)));
}

export default hasRouteAccess