import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Home from '../components/Home';
import AddTempSpotPage from '../components/temp_spot/AddTempSpotPage';

export interface IRoute {
    path: string,
    name: string,
    exact: boolean,
    component: any,
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
        path: "/",
        name: Routes.HOME,
        exact: true,
        component: Home
    },
    {
        path: Routes.LOGIN,
        name: "Login",
        exact: true,
        component: Login
    },
    {
        path: Routes.REGISTER,
        name: "Register",
        exact: true,
        component: Register
    },
    {
        path: Routes.ADD_TEMP_SPOT,
        name: "Temp Spot Add Page",
        exact: true,
        component: AddTempSpotPage
    },
]

export default routes;