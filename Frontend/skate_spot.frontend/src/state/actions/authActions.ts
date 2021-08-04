import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiException, Client, ITokenRequest, ITokenResponse, TokenRequest } from '../../skate_spot_api/client';
import { skateSpotApiBaseUrl } from '../../skate_spot_api/constants';

export const localStorageJWTKey = "SkateSpotJWT"

export const login = createAsyncThunk<ITokenResponse, ITokenRequest, { rejectValue: string }>
    (
        "auth/login",
        async (loginData: ITokenRequest, { rejectWithValue }) => {
            try {
                const client = new Client(skateSpotApiBaseUrl)
                const response = await client.get_Token(new TokenRequest(loginData))
                localStorage.setItem(localStorageJWTKey, response!.content!.jwToken as string)
                return response.content as ITokenResponse
            }
            catch (e) {
                if (e instanceof ApiException)
                    return rejectWithValue(JSON.parse(e.response).error.message as string)
                else
                    throw e
            }
        }
    )

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        const jwt = localStorage.getItem(localStorageJWTKey)
        localStorage.removeItem(localStorageJWTKey)
        if (jwt) {
            const client = new Client(skateSpotApiBaseUrl)
            await client.logout("Bearer " + jwt)
        }
    }
)

export const setAuthStateFromLocalStorage = createAction<ITokenResponse>("auth/login/localStorage")


