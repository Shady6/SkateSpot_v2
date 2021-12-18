import React from 'react'
import { Login } from '../components/auth/Login'
import { Logout } from '../components/auth/Logout'
import { Register } from '../components/auth/Register'
import Home from '../components/home/Home'
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

export enum RoutesEnum {
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

export const routes: IRoute[] = [
  {
    linkName: 'SkateSpot',
    path: RoutesEnum.HOME,
    exact: true,
    component: Home,
    accessedBy: [UserRoles.ALL],
    renderLink: false,
  },
  {
    linkName: 'Login',
    path: RoutesEnum.LOGIN,
    exact: true,
    component: Login,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
    renderLink: false,
  },
  {
    linkName: 'Register',
    path: RoutesEnum.REGISTER,
    exact: true,
    component: Register,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
    renderLink: false,
  },
  {
    linkName: 'Add Spot',
    path: RoutesEnum.ADD_TEMP_SPOT,
    exact: true,
    component: AddTempSpotPage,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: 'Temp Spots',
    path: RoutesEnum.TEMP_SPOTS,
    exact: true,
    component: () => (
      <ListItemsMainPage listViewType={ListViewTypes.TEMP_SPOTS} />
    ),
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: 'Spots',
    path: RoutesEnum.SPOTS,
    exact: true,
    component: () => <ListItemsMainPage listViewType={ListViewTypes.SPOTS} />,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: 'Videos',
    path: RoutesEnum.SPOT_VIDEO,
    exact: true,
    component: () => (
      <ListItemsMainPage listViewType={ListViewTypes.SPOT_VIDEOS} />
    ),
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: null,
    path: RoutesEnum.SPOT_DEDICATED_PAGE,
    exact: true,
    component: SpotPage,
    accessedBy: [UserRoles.ALL],
    renderLink: false,
  },
  {
    linkName: 'Map',
    path: RoutesEnum.MAP,
    exact: true,
    component: SpotsMapView,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: null,
    path: RoutesEnum.USER_PROFILE,
    exact: true,
    component: UserProfile,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: false,
  },
  {
    linkName: 'Logout',
    path: RoutesEnum.LOGOUT,
    exact: true,
    component: Logout,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: false,
  },
]
