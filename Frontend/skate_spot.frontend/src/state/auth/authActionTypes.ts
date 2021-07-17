import { ITokenResponse } from "../../skate_spot_api/client";

interface LoginSuccessAction {type: AuthActionTypes.LOGIN_SUCCESS, payload: ITokenResponse}

export type AuthActions = LoginSuccessAction

export enum AuthActionTypes {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE"
}