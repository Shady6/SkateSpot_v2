import Login from '../components/auth/Login'
import { Logout } from '../components/auth/Logout'
import Register from '../components/auth/Register'
import Home from '../components/Home'
import { SpotPage } from '../components/spot/spot_page/SpotPage'
import { ListItemsMainPage } from '../components/spot_common/ListItemsMainPage'
import { SpotsMapView } from '../components/spot_common/MapView/SpotsMapView'
import AddTempSpotPage from '../components/temp_spot/add/AddTempSpotPage'
import { UserProfile } from '../components/user/UserProfile'
import { ListViewTypes } from '../state/generic/listViewGenerics'
import { UserRoles } from '../types/types'

export interface IRoute {
  linkName: string | null
  path: string
  exact: boolean
  component: React.FC
  accessedBy: UserRoles[]
  props?: any
  renderLink: boolean
}

export enum RouteParams {
  SPOT_NAME = ':spotName',
}

export enum Routes {
  HOME = '/',
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  ADD_TEMP_SPOT = '/temp/add',
  TEMP_SPOTS = '/temp',
  SPOTS = '/spot',
  LOGOUT = '/logout',
  MAP = '/map',
  SPOT_VIDEO = '/video',
  SPOT_DEDICATED_PAGE = `/spot/:spotName`,
  USER_PROFILE = '/user',
}

const routes: IRoute[] = [
  {
    linkName: 'Home',
    path: Routes.HOME,
    exact: true,
    component: Home,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: 'Login',
    path: Routes.LOGIN,
    exact: true,
    component: Login,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: 'Register',
    path: Routes.REGISTER,
    exact: true,
    component: Register,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: 'Add Spot',
    path: Routes.ADD_TEMP_SPOT,
    exact: true,
    component: AddTempSpotPage,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: 'Temp Spots',
    path: Routes.TEMP_SPOTS,
    exact: true,
    component: () => (
      <ListItemsMainPage listViewType={ListViewTypes.TEMP_SPOTS} />
    ),
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: 'Spots',
    path: Routes.SPOTS,
    exact: true,
    component: () => <ListItemsMainPage listViewType={ListViewTypes.SPOTS} />,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: 'Videos',
    path: Routes.SPOT_VIDEO,
    exact: true,
    component: () => (
      <ListItemsMainPage listViewType={ListViewTypes.SPOT_VIDEOS} />
    ),
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: null,
    path: Routes.SPOT_DEDICATED_PAGE,
    exact: true,
    component: SpotPage,
    accessedBy: [UserRoles.ALL],
    renderLink: false,
  },
  {
    linkName: 'Map',
    path: Routes.MAP,
    exact: true,
    component: SpotsMapView,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: 'Logout',
    path: Routes.LOGOUT,
    exact: true,
    component: Logout,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: null,
    path: Routes.USER_PROFILE,
    exact: true,
    component: UserProfile,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: false,
  },
]

export default routes
