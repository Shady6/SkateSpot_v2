import { Client, ITokenRequest, TokenRequest, ITokenResponse, ApiException, TokenResponseApiResponse } from '../../skate_spot_api/client';
import { Dispatch } from "redux"
import { AuthActions, AuthActionTypes } from './authActionTypes';


export const login = (loginData: ITokenRequest) => {
    return async (dispatch: Dispatch<AuthActions>) => {
        const client = new Client("https://localhost:44309")
        try {
            const response = await client.get_Token(new TokenRequest(loginData))
            localStorage.setItem("SkateSpotJWT", response!.content!.jwToken as string)
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

interface JWTPayload {
    sub: string,
    jti: string,
    email: string,
    uid: string,
    ip: string,
    roles: string[],
    nbf: number,
    exp: number,
    iss: string,
    aud: string
}

export const setAuthStateFromLocalStorage = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        const token = localStorage.getItem("SkateSpotJWT")
        if (token) {
            try {
                const JWTPayload: JWTPayload = JSON.parse(atob(token.split(".")[1]))
                if ((new Date()).getTime() < JWTPayload.exp * 1000) {
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
                console.error("Can't set auth state from local storage. Malformed state", e)
            }
        }
    }
}