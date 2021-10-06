import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/Home";
import AddTempSpotPage from "../components/temp_spot/add/AddTempSpotPage";
import { UserRoles } from "../types/types";
import TempSpots from "../components/temp_spot/main/TempSpots";
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
];

export default routes;
