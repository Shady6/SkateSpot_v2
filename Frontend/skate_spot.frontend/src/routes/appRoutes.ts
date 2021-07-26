import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Home from '../components/Home';

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
]

export default routes;