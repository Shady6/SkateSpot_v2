import { Client, ITokenRequest, TokenRequest, ITokenResponse, ApiException, TokenResponseApiResponse } from '../../skate_spot_api/client';
import { Dispatch } from "redux"
import { AuthActions, AuthActionTypes } from '../action_types/authActionTypes';
import { JWTPayload } from '../types/authTypes';
import { skateSpotApiBaseUrl } from '../../skate_spot_api/constants';

const localStorageJWTKey = "SkateSpotJWT"

export const login = (loginData: ITokenRequest) => {
    return async (dispatch: Dispatch<AuthActions>) => {
        dispatch({ type: AuthActionTypes.LOADING })
        const client = new Client(skateSpotApiBaseUrl)
        try {
            const response = await client.get_Token(new TokenRequest(loginData))
            localStorage.setItem(localStorageJWTKey, response!.content!.jwToken as string)
            dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: response.content as ITokenResponse })
        }
        catch (error) {
            console.dir(error);
            if (error instanceof ApiException) {
                const response: TokenResponseApiResponse = JSON.parse(error.response)
                dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: response!.error!.message as string })
            }
            else {
                dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: "Something went wrong." })
            }
        }
    }
}

export const setAuthStateFromLocalStorage = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        const token = localStorage.getItem(localStorageJWTKey)
        if (token) {
            try {
                const JWTPayload: JWTPayload = JSON.parse(atob(token.split(".")[1]))
                if (isTokenExpired(JWTPayload)) {
                    dispatch({
                        type: AuthActionTypes.LOGIN_SUCCESS,
                        payload: {
                            id: JWTPayload.uid,
                            userName: JWTPayload.sub,
                            email: JWTPayload.email,
                            roles: JWTPayload.roles,
                            // TODO is this needed? If yes place this information in the token (on backend side)
                            // this says if user email is verified
                            isVerified: false,
                            jwToken: token,
                            issuedOn: new Date(JWTPayload.nbf * 1000),
                            expiresOn: new Date(JWTPayload.exp * 1000)
                        }
                    })
                }
            }
            catch (e) {
                console.log("Can't set auth state from local storage. Malformed state", e)
            }
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        const jwt = localStorage.getItem(localStorageJWTKey)
        localStorage.removeItem(localStorageJWTKey)
        dispatch({
            type: AuthActionTypes.LOGOUT
        })
        if (jwt) {
            try {
                const client = new Client(skateSpotApiBaseUrl)
                await client.logout("Bearer " + jwt)
            }
            catch (e){                
                console.log("Error during logout. Local storagehad been cleared.", e)
            }
        }
    }
}

const isTokenExpired = (token: JWTPayload) => {
    return (new Date()).getTime() < token.exp * 1000
}