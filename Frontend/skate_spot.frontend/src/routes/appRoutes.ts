import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/Home";
import Spots from "../components/spot/Spots";
import AddTempSpotPage from "../components/temp_spot/add/AddTempSpotPage";
import TempSpots from "../components/temp_spot/main/TempSpots";
import { UserRoles } from "../types/types";
import { Logout } from "../components/auth/Logout";
export interface IRoute {
  linkName: string;
  path: string;
  exact: boolean;
  component: React.FC;
  accessedBy: UserRoles[];
  props?: any;
}

export enum Routes {
  HOME = "/",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  ADD_TEMP_SPOT = "/tempSpot/add",
  TEMP_SPOTS = "/tempSpot",
  SPOTS = "/spots",
  LOGOUT = "/logout",
}

const routes: IRoute[] = [
  {
    linkName: "Home",
    path: Routes.HOME,
    exact: true,
    component: Home,
    accessedBy: [UserRoles.ALL],
  },
  {
    linkName: "Login",
    path: Routes.LOGIN,
    exact: true,
    component: Login,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
  },
  {
    linkName: "Register",
    path: Routes.REGISTER,
    exact: true,
    component: Register,
    accessedBy: [UserRoles.NOT_SIGNED_IN],
  },
  {
    linkName: "Add Spot",
    path: Routes.ADD_TEMP_SPOT,
    exact: true,
    component: AddTempSpotPage,
    accessedBy: [UserRoles.SIGNED_IN],
  },
  {
    linkName: "Temp Spots",
    path: Routes.TEMP_SPOTS,
    exact: true,
    component: TempSpots,
    accessedBy: [UserRoles.ALL],
  },
  {
    linkName: "Spots",
    path: Routes.SPOTS,
    exact: true,
    component: Spots,
    accessedBy: [UserRoles.ALL],
  },
  {
    linkName: "Logout",
    path: Routes.LOGOUT,
    exact: true,
    component: Logout,
    accessedBy: [UserRoles.SIGNED_IN],
  },
];

export default routes;
