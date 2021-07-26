import { ITokenResponse } from '../../skate_spot_api/client';

interface LoginSuccessAction {type: AuthActionTypes.LOGIN_SUCCESS, payload: ITokenResponse}
interface LoginFailureAction {type: AuthActionTypes.LOGIN_FAILURE, payload: string}

export type AuthActions = LoginSuccessAction | LoginFailureAction

export enum AuthActionTypes {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE"
}