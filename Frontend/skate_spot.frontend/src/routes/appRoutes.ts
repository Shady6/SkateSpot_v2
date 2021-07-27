import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Home from '../components/Home';
import AddTempSpotPage from '../components/temp_spot/AddTempSpotPage';
import { UserRoles } from '../types/types';

export interface IRoute {
    linkName: string,
    path: string,
    exact: boolean,
    component: React.FC,
    accessedBy: UserRoles[]
    props?: any
}

export enum Routes {
    HOME = "/",
    LOGIN = "/auth/login",
    REGISTER = "/auth/register",
    ADD_TEMP_SPOT = "/tempSpot/add"
}

const routes: IRoute[] = [
    {
        linkName: "Home",
        path: Routes.HOME,
        exact: true,
        component: Home,
        accessedBy: [UserRoles.ALL_ROLES]
    },
    {
        linkName: "Login",
        path: Routes.LOGIN,
        exact: true,
        component: Login,
        accessedBy: [UserRoles.NO_ROLE]
    },
    {
        linkName: "Register",
        path: Routes.REGISTER,
        exact: true,
        component: Register,
        accessedBy: [UserRoles.NO_ROLE]
    },
    {
        linkName: "Add Spot",
        path: Routes.ADD_TEMP_SPOT,
        exact: true,
        component: AddTempSpotPage,
        accessedBy: [UserRoles.SIGNED_IN_ROLES]
    },
]

export default routes;