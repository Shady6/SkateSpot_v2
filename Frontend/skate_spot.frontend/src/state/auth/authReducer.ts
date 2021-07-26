import { ITokenResponse, TokenResponse } from '../../skate_spot_api/client';
import { AuthActions, AuthActionTypes } from './authActionTypes';

export enum AuthStateEnum{
    OK,
    FAILED,
    NONE
}

interface IAuthState{
    content?: ITokenResponse,
    error?: string
    status: AuthStateEnum
}

const initialState: IAuthState = {
    status: AuthStateEnum.NONE
};

export const authReducer = (state: IAuthState = initialState, action: AuthActions): IAuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                status: AuthStateEnum.OK,
                content: action.payload
            }
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                status: AuthStateEnum.FAILED,
                error: action.payload
            }
        default:
            return state
    }
}