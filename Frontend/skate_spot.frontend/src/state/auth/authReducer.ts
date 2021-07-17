import { ITokenResponse, TokenResponse } from "../../skate_spot_api/client"
import { AuthActions, AuthActionTypes } from "./authActionTypes"


const initialState: ITokenResponse = new TokenResponse()

export const authReducer = (state: ITokenResponse = initialState, action: AuthActions) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            return action.payload    
        default:
            return state
    }
}