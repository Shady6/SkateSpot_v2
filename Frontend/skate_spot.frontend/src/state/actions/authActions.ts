import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequestWithFlashMsgOnError } from '../../functions/request/sendRequestWithFlashMsgOnError'
import { ApiClient, ApiResponse } from '../../skate_spot_api/apiClient'
import {
  RegisterRequest,
  TokenRequest,
  TokenResponse,
} from '../../skate_spot_api/client'
import { History } from 'history'
import { RoutesEnum } from '../../routes/appRoutes'

export const localStorageJWTKey = 'SkateSpotJWT'

export const login = createAsyncThunk(
  'auth/login',
  async (
    { loginData, history }: { loginData: TokenRequest; history: History },
    { rejectWithValue, dispatch }
  ) => {
    const response = (await sendRequestWithFlashMsgOnError(
      dispatch,
      undefined,
      c => c.get_Token(loginData)
    )) as ApiResponse<TokenResponse>

    if (response.error) return rejectWithValue(null)

    localStorage.setItem(
      localStorageJWTKey,
      response!.content!.jwToken as string
    )
    history.push(RoutesEnum.HOME)
    return response.content
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterRequest, { rejectWithValue, dispatch }) => {
    const response = (await sendRequestWithFlashMsgOnError(
      dispatch,
      undefined,
      c => c.register(registerData)
    )) as ApiResponse<string>

    if (response.error) return rejectWithValue(null)
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  const jwt = localStorage.getItem(localStorageJWTKey)
  localStorage.removeItem(localStorageJWTKey)
  if (jwt) await new ApiClient().logout('Bearer ' + jwt)
})
