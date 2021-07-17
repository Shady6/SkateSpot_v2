import { Client, ITokenRequest, TokenRequest } from '../../skate_spot_api/client';
import { Dispatch } from "redux"
import { AuthActions, AuthActionTypes } from './authActionTypes'


export const login = (loginData: ITokenRequest) => {
    return async (dispatch: Dispatch<AuthActions>) => {
        const client = new Client("https://localhost:44309")
        try {
            const response = await client.get_Token(new TokenRequest(loginData))
            dispatch({type: AuthActionTypes.LOGIN_SUCCESS, payload: response})
        }
        catch (error) {
            console.dir(error)            
        }
    }
} 