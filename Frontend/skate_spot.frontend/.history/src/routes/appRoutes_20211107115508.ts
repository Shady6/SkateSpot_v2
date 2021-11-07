import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/Home";
import Spots from "../components/spot/Spots";
import AddTempSpotPage from "../components/temp_spot/add/AddTempSpotPage";
import TempSpots from "../components/temp_spot/main/TempSpots";
import { UserRoles } from "../types/types";
import { Logout } from "../components/auth/Logout";
import { SpotsMapView } from "../components/spot_common/MapView/SpotsMapView";
import { SpotVideos } from "../components/spot_video/videos_of_spot/SpotVideos";
export interface IRoute {
  linkName: string | null;
  path: string;
  exact: boolean;
  component: React.FC;
  accessedBy: UserRoles[];
  props?: any;
  renderLink: boolean;
}

export enum Routes {
  HOME = "/",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  ADD_TEMP_SPOT = "/tempSpot/add",
  TEMP_SPOTS = "/tempSpot",
  SPOTS = "/spots",
  LOGOUT = "/logout",
  MAP = "/map",
  SPOT_VIDEO = "/spots/:spotName/spotVideo",
}

const routes: IRoute[] = [
  {
    linkName: "Home",
    path: Routes.HOME,
    exact: true,
    component: Home,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: "Login",
    path: Routes.LOGIN,
    exact: true,
    component: Login,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: "Register",
    path: Routes.REGISTER,
    exact: true,
    component: Register,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: "Add Spot",
    path: Routes.ADD_TEMP_SPOT,
    exact: true,
    component: AddTempSpotPage,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: true,
  },
  {
    linkName: "Temp Spots",
    path: Routes.TEMP_SPOTS,
    exact: true,
    component: TempSpots,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: "Spots",
    path: Routes.SPOTS,
    exact: true,
    component: Spots,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: null,
    path: Routes.SPOT_VIDEO,
    exact: true,
    component: SpotVideos,
    accessedBy: [UserRoles.ALL],
    renderLink: false,
  },
  {
    linkName: "Map",
    path: Routes.MAP,
    exact: true,
    component: SpotsMapView,
    accessedBy: [UserRoles.ALL],
    renderLink: true,
  },
  {
    linkName: "Logout",
    path: Routes.LOGOUT,
    exact: true,
    component: Logout,
    accessedBy: [UserRoles.SIGNED_IN],
    renderLink: true,
  },
];

export default routes;
